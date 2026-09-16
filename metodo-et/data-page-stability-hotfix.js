(() => {
  'use strict';

  const TRIGGERS = [
    'O Drive não é sincronizado automaticamente nesta versão.',
    'Backup automático disponível.'
  ];

  function driveStatusCopy() {
    try {
      const status = window.MetodoETDriveSync?.status?.();
      const code = status?.code || '';
      if (code === 'synced') return 'Google Drive conectado. Alterações são salvas localmente e sincronizadas automaticamente.';
      if (code === 'dirty') return 'Há alterações locais aguardando sincronização com o Google Drive.';
      if (code === 'offline') return 'Sem internet: seus dados continuam salvos neste dispositivo e serão sincronizados quando a conexão voltar.';
      if (code === 'auth') return 'A autorização anterior foi reconhecida, mas o Google exige uma nova confirmação. Use “Reconectar Drive”.';
      if (code === 'connecting' || code === 'syncing') return 'Sincronização com o Google Drive em andamento.';
      if (code === 'error') return 'O Google Drive encontrou um erro. Seus dados locais permanecem preservados.';
    } catch {}
    return 'Sincronização automática com o Google Drive disponível nesta instalação.';
  }

  function stabilizeDataCopy() {
    if (location.hash !== '#data') return;
    const desired = driveStatusCopy();
    document.querySelectorAll('#main .warning').forEach(el => {
      const current = String(el.textContent || '').trim();
      const isDriveNotice = TRIGGERS.some(t => current.includes(t)) ||
        current.includes('Google Drive conectado.') ||
        current.includes('alterações locais aguardando sincronização') ||
        current.includes('Sem internet: seus dados continuam salvos') ||
        current.includes('A autorização anterior foi reconhecida') ||
        current.includes('Sincronização automática com o Google Drive') ||
        current.includes('Sincronização com o Google Drive em andamento') ||
        current.includes('O Google Drive encontrou um erro');
      if (!isDriveNotice || current === desired) return;
      el.textContent = desired;
    });
  }

  let queued = false;
  function schedule() {
    if (queued) return;
    queued = true;
    queueMicrotask(() => {
      queued = false;
      stabilizeDataCopy();
    });
  }

  function boot() {
    const main = document.querySelector('#main');
    if (main) {
      const observer = new MutationObserver(schedule);
      observer.observe(main, { childList: true, subtree: true });
    }
    window.addEventListener('hashchange', schedule);
    window.addEventListener('popstate', schedule);
    schedule();
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', boot, { once: true });
  else boot();
})();
