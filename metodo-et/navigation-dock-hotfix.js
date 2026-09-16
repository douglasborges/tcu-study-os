(() => {
  'use strict';

  const ROUTES = new Set(['today','progress','subjects','solid','planning','history','data','reminders','motivation']);

  function routeFrom(anchor) {
    const href = anchor?.getAttribute?.('href') || '';
    if (!href.startsWith('#')) return null;
    const route = href.slice(1) || 'today';
    return ROUTES.has(route) ? route : null;
  }

  function disableMainFocusTrap() {
    const main = document.getElementById('main');
    if (!main || main.dataset.dockFocusFix === '1') return;
    main.dataset.dockFocusFix = '1';
    main.focus = () => {};
  }

  function dispatchRoute() {
    disableMainFocusTrap();
    window.dispatchEvent(new Event('hashchange'));
  }

  document.addEventListener('click', event => {
    if (event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
    const anchor = event.target.closest?.('a[href^="#"]');
    const route = routeFrom(anchor);
    if (!route) return;

    event.preventDefault();
    const nextHash = `#${route}`;
    if (location.hash !== nextHash) history.pushState({ metodoETRoute: route }, '', nextHash);
    else history.replaceState({ metodoETRoute: route }, '', nextHash);
    dispatchRoute();
  }, true);

  window.addEventListener('popstate', () => dispatchRoute());

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', disableMainFocusTrap, { once: true });
  else disableMainFocusTrap();
})();
