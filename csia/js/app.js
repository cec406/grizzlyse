/* ============================================================
   Cyber Aware - app.js  (boot)
   ============================================================ */
(function (CY) {
  'use strict';
  function start() {
    try { CY.App.boot(); }
    catch (e) {
      document.body.innerHTML = '<pre style="color:#f88;padding:24px;font:13px monospace">Cyber Aware failed to start:\n' + (e && e.stack || e) + '</pre>';
      throw e;
    }
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', start);
  else start();
})(window.CY);
