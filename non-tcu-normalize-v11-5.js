(() => {
  'use strict';

  // O app legado compara títulos usando String.prototype.normalize().
  // Para que a etiqueta visual [NÃO TCU] não gere tópicos duplicados,
  // ela fica invisível apenas durante normalizações/comparações internas.
  if (window.__TCU_NON_TCU_NORMALIZE_PATCHED__) return;
  window.__TCU_NON_TCU_NORMALIZE_PATCHED__ = true;

  const nativeNormalize = String.prototype.normalize;
  String.prototype.normalize = function(form) {
    return nativeNormalize.call(this, form).replace(/\s*\[nao tcu\]/gi, '');
  };
})();
