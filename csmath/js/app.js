/* ============================================================
   CSMath Hero - boot
   ============================================================ */
(function (MH) {
  'use strict';
  function start() {
    try {
      MH.App.boot();
    } catch (e) {
      document.body.innerHTML = '<pre style="color:#f88;padding:24px;font:13px monospace">' +
        'CSMath Hero failed to start:\n' + (e && e.stack || e) + '</pre>';
      throw e;
    }
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', start);
  else start();
})(window.MH);
