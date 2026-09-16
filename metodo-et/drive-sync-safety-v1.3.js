(() => {
  'use strict';

  if (window.__METODO_ET_DRIVE_TEXT_GUARD__) return;
  window.__METODO_ET_DRIVE_TEXT_GUARD__ = true;

  const descriptor = Object.getOwnPropertyDescriptor(Node.prototype, 'textContent');
  if (!descriptor?.get || !descriptor?.set) return;

  Object.defineProperty(Node.prototype, 'textContent', {
    configurable: descriptor.configurable,
    enumerable: descriptor.enumerable,
    get: descriptor.get,
    set(value) {
      // O sincronizador atualiza o aviso da tela Dados por MutationObserver.
      // No Safari/Web App, reatribuir exatamente o mesmo texto gera outra
      // mutação e pode criar um ciclo infinito. A StudyOS estável evita
      // escritas de DOM quando o valor não mudou; aplicamos a mesma proteção.
      if (this?.nodeType === Node.ELEMENT_NODE && this.classList?.contains('warning')) {
        const next = value == null ? '' : String(value);
        const current = descriptor.get.call(this);
        if (current === next) return;
      }
      return descriptor.set.call(this, value);
    }
  });
})();
