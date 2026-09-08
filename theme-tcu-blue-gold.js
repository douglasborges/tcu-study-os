(() => {
  'use strict';

  const VERSION_LABEL = 'v11.3.1 — Azul & Dourado + Drive leve + OAuth corrigido';
  const ICON_SRC = 'assets/icons/logo-v11-azul-dourado.png?v=11.3.1';
  const COLOR_MAP = new Map([
    ['#74ff52', '#FFCB05'],
    ['#00d8a6', '#26247B'],
    ['#b7ff63', '#F5D86E'],
    ['#1bbd72', '#4B49A6'],
    ['#0fae8d', '#7775C7'],
    ['#d8ff7a', '#D8B94D'],
    ['#7be4ff', '#9EA0E6'],
    ['#a5ff9d', '#008C44']
  ]);

  function replaceThemeColors(value) {
    let next = String(value || '');
    COLOR_MAP.forEach((to, from) => {
      next = next.replaceAll(from, to).replaceAll(from.toUpperCase(), to);
    });
    return next;
  }

  function recolorInlineStyles(root = document) {
    if (!root || typeof root.querySelectorAll !== 'function') return;
    root.querySelectorAll('.cycle-pizza[style], .cycle-legend i[style]').forEach(el => {
      const current = el.getAttribute('style') || '';
      const next = replaceThemeColors(current);
      if (next !== current) el.setAttribute('style', next);
    });
  }

  function refreshLogo() {
    document.querySelectorAll('img.logo').forEach(img => {
      if (!img.getAttribute('src')?.includes('logo-v11-azul-dourado.png')) {
        img.setAttribute('src', ICON_SRC);
      }
    });
  }

  function refreshVersionLabel() {
    const badge = document.querySelector('.app-version');
    if (!badge) return;
    const parts = badge.textContent.split(' · ');
    const env = parts.length > 1 ? parts.at(-1) : '';
    const next = env ? `${VERSION_LABEL} · ${env}` : VERSION_LABEL;
    if (badge.textContent !== next) badge.textContent = next;
  }

  let scheduled = false;
  function applyThemeFixes() {
    scheduled = false;
    recolorInlineStyles(document);
    refreshLogo();
    refreshVersionLabel();
  }

  function scheduleThemeFixes() {
    if (scheduled) return;
    scheduled = true;
    requestAnimationFrame(applyThemeFixes);
  }

  document.addEventListener('DOMContentLoaded', () => {
    applyThemeFixes();
    const target = document.getElementById('app') || document.body;
    const observer = new MutationObserver(scheduleThemeFixes);
    observer.observe(target, { childList: true, subtree: true });
  });
})();
