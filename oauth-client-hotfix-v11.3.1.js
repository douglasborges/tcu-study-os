(() => {
  'use strict';

  // Correção v11.3.1: o Client ID copiado para a v11.3 tinha "rt" invertido.
  // Este patch não contém client secret e só ajusta o client_id antes do primeiro uso do GIS.
  const CORRECT_CLIENT_ID = '242070309786-1rn9vsc4fo0coaq3e3mptrlf1m9f0kt3.apps.googleusercontent.com';
  let patched = false;

  function patchGoogleIdentity() {
    if (patched) return true;
    const oauth2 = window.google?.accounts?.oauth2;
    if (!oauth2 || typeof oauth2.initTokenClient !== 'function') return false;

    const originalInitTokenClient = oauth2.initTokenClient.bind(oauth2);
    oauth2.initTokenClient = options => originalInitTokenClient({
      ...(options || {}),
      client_id: CORRECT_CLIENT_ID
    });

    patched = true;
    window.__TCU_GOOGLE_CLIENT_ID_FIXED__ = true;
    return true;
  }

  patchGoogleIdentity();

  document.addEventListener('load', event => {
    const target = event.target;
    if (!(target instanceof HTMLScriptElement)) return;
    if (!String(target.src || '').includes('accounts.google.com/gsi/client')) return;
    patchGoogleIdentity();
  }, true);
})();
