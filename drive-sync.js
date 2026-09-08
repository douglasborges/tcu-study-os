(() => {
  'use strict';

  const CLIENT_ID = '242070309786-1rn9vsc4fo0coaq3e3mprtlf1m9f0kt3.apps.googleusercontent.com';
  const SCOPE = 'https://www.googleapis.com/auth/drive.file';
  const STORE_KEY = 'tcu-study-os-pwa-v1';
  const META_KEY = 'tcu-study-os-drive-sync-meta-v2';
  const DEVICE_KEY = 'tcu-study-os-drive-device-v1';
  const REMOTE_FILE_NAME = 'TCU Study OS - Dados.json';
  const REMOTE_FORMAT = 'tcu-study-os-cloud-v1';
  const REMOTE_APP_PROPERTY = 'cloud-v1';
  const SAVE_DEBOUNCE_MS = 1800;
  const REMOTE_CHECK_MS = 5 * 60 * 1000;

  let accessToken = '';
  let tokenExpiresAt = 0;
  let tokenClient = null;
  let gsiPromise = null;
  let authWaiter = null;
  let syncing = false;
  let suppressLocalSignal = false;
  let saveTimer = null;
  let remoteTimer = null;
  let button = null;
  let uiState = { code: 'disconnected', detail: 'Seus estudos estão salvos neste dispositivo.' };

  const nativeSetItem = Storage.prototype.setItem;
  const nativeRemoveItem = Storage.prototype.removeItem;
  let meta = loadMeta();

  function loadMeta() {
    try {
      return JSON.parse(localStorage.getItem(META_KEY) || '{}') || {};
    } catch {
      return {};
    }
  }

  function saveMeta(patch = {}) {
    meta = { ...meta, ...patch };
    nativeSetItem.call(localStorage, META_KEY, JSON.stringify(meta));
    renderButton();
  }

  function nowISO() {
    return new Date().toISOString();
  }

  function validDateMs(value) {
    const n = Date.parse(value || '');
    return Number.isFinite(n) ? n : 0;
  }

  function parseState(raw = localStorage.getItem(STORE_KEY) || '') {
    if (!raw) return null;
    try {
      const parsed = JSON.parse(raw);
      return parsed && typeof parsed === 'object' ? parsed : null;
    } catch {
      return null;
    }
  }

  function hasMeaningfulLocalData(state) {
    if (!state || typeof state !== 'object') return false;
    return Boolean(
      (Array.isArray(state.sessions) && state.sessions.length) ||
      (Array.isArray(state.errors) && state.errors.length) ||
      (Array.isArray(state.nightReviews) && state.nightReviews.length) ||
      (Array.isArray(state.reviewSessions) && state.reviewSessions.length)
    );
  }

  function deviceId() {
    let id = localStorage.getItem(DEVICE_KEY);
    if (!id) {
      id = `dev_${Date.now().toString(36)}_${Math.random().toString(36).slice(2, 10)}`;
      nativeSetItem.call(localStorage, DEVICE_KEY, id);
    }
    return id;
  }

  function setUI(code, detail = '') {
    uiState = { code, detail };
    renderButton();
  }

  function statusLabel() {
    const labels = {
      disconnected: '☁ Conectar Drive',
      connecting: '☁ Conectando…',
      syncing: '☁ Sincronizando…',
      synced: '☁ Sincronizado',
      dirty: '☁ Pendente',
      offline: '☁ Offline',
      auth: '☁ Reconectar Drive',
      error: '☁ Erro no Drive'
    };
    return labels[uiState.code] || labels.disconnected;
  }

  function mountButton() {
    if (button && document.contains(button)) return button;
    button = document.createElement('button');
    button.type = 'button';
    button.className = 'drive-sync-floating';
    button.addEventListener('click', handleSyncButton);
    document.body.appendChild(button);
    renderButton();
    return button;
  }

  function renderButton() {
    if (!button || !document.contains(button)) return;
    const label = statusLabel();
    if (button.textContent !== label) button.textContent = label;
    if (button.dataset.state !== uiState.code) button.dataset.state = uiState.code;
    const title = uiState.detail || label;
    if (button.title !== title) button.title = title;
    const aria = `${label}. ${uiState.detail || ''}`.trim();
    if (button.getAttribute('aria-label') !== aria) button.setAttribute('aria-label', aria);
  }

  function loadGoogleIdentity() {
    if (window.google?.accounts?.oauth2) return Promise.resolve();
    if (gsiPromise) return gsiPromise;

    gsiPromise = new Promise((resolve, reject) => {
      const existing = document.querySelector('script[data-tcu-gsi="1"]');
      if (existing) {
        existing.addEventListener('load', resolve, { once: true });
        existing.addEventListener('error', () => reject(new Error('Falha ao carregar a autenticação do Google.')), { once: true });
        return;
      }

      const script = document.createElement('script');
      script.src = 'https://accounts.google.com/gsi/client';
      script.async = true;
      script.defer = true;
      script.dataset.tcuGsi = '1';
      script.onload = () => resolve();
      script.onerror = () => reject(new Error('Falha ao carregar a autenticação do Google.'));
      document.head.appendChild(script);
    }).then(() => {
      if (!window.google?.accounts?.oauth2) {
        throw new Error('A autenticação do Google não ficou disponível.');
      }
    });

    return gsiPromise;
  }

  async function initTokenClient() {
    if (tokenClient) return tokenClient;
    await loadGoogleIdentity();

    tokenClient = google.accounts.oauth2.initTokenClient({
      client_id: CLIENT_ID,
      scope: SCOPE,
      callback: response => {
        if (!authWaiter) return;
        const waiter = authWaiter;
        authWaiter = null;

        if (!response?.access_token || response.error) {
          waiter.reject(new Error(response?.error_description || response?.error || 'Não foi possível autorizar o Google Drive.'));
          return;
        }

        accessToken = response.access_token;
        const seconds = Math.max(60, Number(response.expires_in || 3600));
        tokenExpiresAt = Date.now() + (seconds - 45) * 1000;
        saveMeta({ authorizedOnce: true });
        waiter.resolve(accessToken);
      },
      error_callback: error => {
        if (!authWaiter) return;
        const waiter = authWaiter;
        authWaiter = null;
        waiter.reject(new Error(error?.message || error?.type || 'A janela de autenticação foi fechada.'));
      }
    });

    return tokenClient;
  }

  async function requestToken(interactive = true) {
    if (accessToken && Date.now() < tokenExpiresAt) return accessToken;
    if (!navigator.onLine) throw new Error('Sem internet. Seus registros continuam salvos localmente.');

    const client = await initTokenClient();
    if (authWaiter) return authWaiter.promise;

    let resolvePromise;
    let rejectPromise;
    const promise = new Promise((resolve, reject) => {
      resolvePromise = resolve;
      rejectPromise = reject;
    });
    authWaiter = { resolve: resolvePromise, reject: rejectPromise, promise };

    const prompt = interactive
      ? (meta.authorizedOnce ? 'select_account' : 'consent')
      : '';

    try {
      client.requestAccessToken({ prompt });
    } catch (error) {
      authWaiter = null;
      rejectPromise(error);
    }
    return promise;
  }

  async function apiFetch(url, options = {}) {
    if (!accessToken || Date.now() >= tokenExpiresAt) {
      throw new Error('A sessão do Google expirou. Clique em Reconectar Drive.');
    }

    const headers = new Headers(options.headers || {});
    headers.set('Authorization', `Bearer ${accessToken}`);
    const response = await fetch(url, { ...options, headers });

    if (response.status === 401) {
      accessToken = '';
      tokenExpiresAt = 0;
      throw new Error('A sessão do Google expirou. Clique em Reconectar Drive.');
    }

    if (!response.ok) {
      let detail = '';
      try {
        const body = await response.json();
        detail = body?.error?.message || body?.error_description || '';
      } catch {
        detail = await response.text().catch(() => '');
      }
      throw new Error(detail || `Google Drive respondeu com erro ${response.status}.`);
    }

    return response;
  }

  async function getRemoteFileById(id) {
    if (!id) return null;
    try {
      const fields = encodeURIComponent('id,name,modifiedTime,appProperties');
      const response = await apiFetch(`https://www.googleapis.com/drive/v3/files/${encodeURIComponent(id)}?fields=${fields}`);
      return await response.json();
    } catch (error) {
      if (/404|not found|File not found/i.test(String(error?.message || ''))) return null;
      throw error;
    }
  }

  async function findRemoteFile() {
    if (meta.remoteFileId) {
      const byId = await getRemoteFileById(meta.remoteFileId).catch(() => null);
      if (byId) return byId;
      saveMeta({ remoteFileId: null });
    }

    const params = new URLSearchParams({
      q: `trashed=false and appProperties has { key='tcuStudyOS' and value='${REMOTE_APP_PROPERTY}' }`,
      spaces: 'drive',
      pageSize: '10',
      orderBy: 'modifiedTime desc',
      fields: 'files(id,name,modifiedTime,createdTime,appProperties)'
    });

    const response = await apiFetch(`https://www.googleapis.com/drive/v3/files?${params.toString()}`);
    const data = await response.json();
    const file = Array.isArray(data.files) && data.files.length ? data.files[0] : null;
    if (file) saveMeta({ remoteFileId: file.id });
    return file;
  }

  function buildCloudPayload(updatedAt = nowISO()) {
    const state = parseState();
    if (!state) throw new Error('Os dados locais do Study OS não puderam ser lidos.');

    return {
      format: REMOTE_FORMAT,
      schemaVersion: 1,
      updatedAt,
      deviceId: deviceId(),
      state
    };
  }

  function decodeCloudPayload(data, fallbackUpdatedAt = '') {
    if (data?.format === REMOTE_FORMAT && data.state && typeof data.state === 'object') {
      return {
        state: data.state,
        updatedAt: data.updatedAt || fallbackUpdatedAt,
        deviceId: data.deviceId || ''
      };
    }

    if (data && typeof data === 'object' && (Array.isArray(data.disciplines) || Array.isArray(data.sessions))) {
      return { state: data, updatedAt: fallbackUpdatedAt, deviceId: '' };
    }

    throw new Error('O arquivo do Drive não contém um backup válido do TCU Study OS.');
  }

  async function createRemoteFile() {
    const payload = buildCloudPayload();
    const metadata = {
      name: REMOTE_FILE_NAME,
      mimeType: 'application/json',
      description: 'Sincronização automática do TCU Study OS.',
      appProperties: { tcuStudyOS: REMOTE_APP_PROPERTY }
    };

    const boundary = `tcu_study_os_${Date.now()}_${Math.random().toString(36).slice(2)}`;
    const body = new Blob([
      `--${boundary}\r\n`,
      'Content-Type: application/json; charset=UTF-8\r\n\r\n',
      JSON.stringify(metadata),
      `\r\n--${boundary}\r\n`,
      'Content-Type: application/json; charset=UTF-8\r\n\r\n',
      JSON.stringify(payload),
      `\r\n--${boundary}--\r\n`
    ]);

    const response = await apiFetch('https://www.googleapis.com/upload/drive/v3/files?uploadType=multipart&fields=id,name,modifiedTime', {
      method: 'POST',
      headers: { 'Content-Type': `multipart/related; boundary=${boundary}` },
      body
    });

    const file = await response.json();
    saveMeta({
      remoteFileId: file.id,
      everSynced: true,
      dirty: false,
      lastSyncAt: nowISO(),
      localUpdatedAt: payload.updatedAt,
      lastRemoteUpdatedAt: file.modifiedTime || payload.updatedAt
    });
    return file;
  }

  async function downloadRemoteFile(file) {
    const response = await apiFetch(`https://www.googleapis.com/drive/v3/files/${encodeURIComponent(file.id)}?alt=media`);
    const raw = await response.text();

    let data;
    try {
      data = JSON.parse(raw);
    } catch {
      throw new Error('O arquivo de sincronização do Drive está corrompido ou não é JSON.');
    }

    return decodeCloudPayload(data, file.modifiedTime || '');
  }

  async function uploadLocalToRemote(file) {
    const payload = buildCloudPayload();
    const response = await apiFetch(`https://www.googleapis.com/upload/drive/v3/files/${encodeURIComponent(file.id)}?uploadType=media&fields=id,modifiedTime`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json; charset=UTF-8' },
      body: JSON.stringify(payload)
    });

    const result = await response.json().catch(() => ({}));
    saveMeta({
      remoteFileId: file.id,
      everSynced: true,
      dirty: false,
      lastSyncAt: nowISO(),
      localUpdatedAt: payload.updatedAt,
      lastRemoteUpdatedAt: result.modifiedTime || payload.updatedAt
    });
  }

  function applyRemoteState(remote) {
    const raw = JSON.stringify(remote.state);
    suppressLocalSignal = true;
    try {
      nativeSetItem.call(localStorage, STORE_KEY, raw);
    } finally {
      suppressLocalSignal = false;
    }

    saveMeta({
      everSynced: true,
      dirty: false,
      lastSyncAt: nowISO(),
      localUpdatedAt: remote.updatedAt || nowISO(),
      lastRemoteUpdatedAt: remote.updatedAt || nowISO()
    });

    setUI('synced', 'Dados do Google Drive aplicados. Atualizando a tela…');
    setTimeout(() => location.reload(), 250);
  }

  function chooseRemoteOnConflict(message) {
    return window.confirm(`${message}\n\nOK = usar a versão do Google Drive.\nCancelar = manter este dispositivo e enviar esta versão ao Drive.`);
  }

  async function reconcile(file, { initial = false } = {}) {
    const remote = await downloadRemoteFile(file);
    const localState = parseState();
    if (!localState) throw new Error('Os dados locais não puderam ser lidos.');

    const remoteMs = validDateMs(remote.updatedAt || file.modifiedTime);
    const localMs = validDateMs(meta.localUpdatedAt);
    const lastRemoteMs = validDateMs(meta.lastRemoteUpdatedAt);
    const dirty = Boolean(meta.dirty);

    if (!meta.everSynced) {
      if (hasMeaningfulLocalData(localState)) {
        const useRemote = chooseRemoteOnConflict('Este dispositivo já possui registros locais e o Drive também possui uma base do Study OS.');
        if (useRemote) applyRemoteState(remote);
        else await uploadLocalToRemote(file);
      } else {
        applyRemoteState(remote);
      }
      return;
    }

    const remoteChanged = remoteMs > lastRemoteMs + 500;

    if (dirty && remoteChanged) {
      const useRemote = chooseRemoteOnConflict('Foram encontradas alterações tanto neste dispositivo quanto no Google Drive.');
      if (useRemote) applyRemoteState(remote);
      else await uploadLocalToRemote(file);
      return;
    }

    if (dirty) {
      await uploadLocalToRemote(file);
      return;
    }

    if (remoteChanged || (initial && remoteMs > localMs + 500)) {
      applyRemoteState(remote);
      return;
    }

    saveMeta({
      remoteFileId: file.id,
      everSynced: true,
      dirty: false,
      lastSyncAt: nowISO(),
      lastRemoteUpdatedAt: remote.updatedAt || file.modifiedTime || meta.lastRemoteUpdatedAt
    });
  }

  async function syncNow({ initial = false, interactiveAuth = false } = {}) {
    if (syncing) return;
    if (!navigator.onLine) {
      setUI('offline', 'Sem internet. Seus registros continuam salvos neste dispositivo.');
      return;
    }

    syncing = true;
    setUI(interactiveAuth ? 'connecting' : 'syncing', interactiveAuth ? 'Abrindo sua conta Google…' : 'Sincronizando seus estudos…');

    try {
      if (!accessToken || Date.now() >= tokenExpiresAt) {
        await requestToken(interactiveAuth);
      }

      const file = await findRemoteFile();
      if (!file) await createRemoteFile();
      else await reconcile(file, { initial });

      setUI('synced', `Última sincronização: ${new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })}.`);
    } catch (error) {
      const message = String(error?.message || error || 'Falha ao sincronizar.');

      if (/sessão do Google expirou|autorizar|token|auth/i.test(message)) {
        setUI('auth', message);
      } else if (!navigator.onLine) {
        setUI('offline', 'Sem internet. Seus dados locais estão preservados.');
      } else {
        setUI('error', message);
      }

      console.error('[TCU Study OS Drive Sync]', error);
    } finally {
      syncing = false;
    }
  }

  async function handleSyncButton() {
    const needsAuth = !accessToken || Date.now() >= tokenExpiresAt;
    await syncNow({ initial: true, interactiveAuth: needsAuth });
  }

  function scheduleUpload() {
    clearTimeout(saveTimer);

    if (!navigator.onLine) {
      setUI('offline', 'Alteração salva localmente; será sincronizada quando houver internet.');
      return;
    }

    if (!accessToken || Date.now() >= tokenExpiresAt) {
      setUI('dirty', 'Alteração salva localmente. Clique para reconectar e enviar ao Drive.');
      return;
    }

    saveTimer = setTimeout(() => syncNow({ initial: false, interactiveAuth: false }), SAVE_DEBOUNCE_MS);
  }

  function noteLocalChange() {
    if (suppressLocalSignal) return;
    const changedAt = nowISO();
    saveMeta({ dirty: true, localUpdatedAt: changedAt });
    setUI(navigator.onLine ? 'dirty' : 'offline', navigator.onLine ? 'Alteração salva neste dispositivo; sincronização pendente.' : 'Alteração salva neste dispositivo; sincroniza quando a internet voltar.');
    scheduleUpload();
  }

  function patchLocalStorage() {
    if (window.__TCU_DRIVE_STORAGE_PATCHED__) return;
    window.__TCU_DRIVE_STORAGE_PATCHED__ = true;

    Storage.prototype.setItem = function(key, value) {
      nativeSetItem.call(this, key, value);
      if (this === localStorage && key === STORE_KEY && !suppressLocalSignal) queueMicrotask(noteLocalChange);
    };

    Storage.prototype.removeItem = function(key) {
      nativeRemoveItem.call(this, key);
      if (this === localStorage && key === STORE_KEY && !suppressLocalSignal) queueMicrotask(noteLocalChange);
    };
  }

  function startRemoteTimer() {
    clearInterval(remoteTimer);
    remoteTimer = setInterval(() => {
      if (document.visibilityState !== 'visible' || !navigator.onLine || syncing || meta.dirty || !accessToken || Date.now() >= tokenExpiresAt) return;
      syncNow({ initial: true, interactiveAuth: false });
    }, REMOTE_CHECK_MS);
  }

  function boot() {
    patchLocalStorage();
    mountButton();

    if (!navigator.onLine) {
      setUI('offline', 'Sem internet. Seus registros continuam salvos localmente.');
    } else if (meta.dirty) {
      setUI('dirty', 'Há alterações locais esperando sincronização.');
    } else if (meta.authorizedOnce) {
      setUI('auth', 'Clique para reconectar ao Google Drive nesta sessão.');
    } else {
      setUI('disconnected', 'Clique para ativar a sincronização com o Google Drive.');
    }

    startRemoteTimer();
  }

  window.addEventListener('online', () => {
    if (meta.dirty) setUI('dirty', 'Internet voltou. Clique para sincronizar com o Drive.');
    else if (accessToken && Date.now() < tokenExpiresAt) setUI('synced', 'Conectado ao Google Drive.');
    else setUI(meta.authorizedOnce ? 'auth' : 'disconnected', 'Clique para conectar ao Google Drive.');
  });

  window.addEventListener('offline', () => {
    setUI('offline', 'Sem internet. Seus registros continuam salvos localmente.');
  });

  document.addEventListener('visibilitychange', () => {
    if (document.visibilityState === 'visible' && navigator.onLine && !syncing && !meta.dirty && accessToken && Date.now() < tokenExpiresAt) {
      syncNow({ initial: true, interactiveAuth: false });
    }
  });

  window.TCUStudyDriveSync = {
    sync: () => syncNow({ initial: true, interactiveAuth: true }),
    status: () => ({ ...uiState, meta: { ...meta } })
  };

  const start = () => {
    if ('requestIdleCallback' in window) requestIdleCallback(boot, { timeout: 1200 });
    else setTimeout(boot, 300);
  };

  if (document.readyState === 'complete') start();
  else window.addEventListener('load', start, { once: true });
})();
