/* ============================================================
   GRIZZLY RANGE - practice-mode deep links
   Finds the app's own sandbox / practice control.
   ============================================================ */

(function (global) {
  'use strict';

  function visible(el) {
    if (!el) return false;
    if (el.offsetParent === null && !el.getClientRects().length) return false;
    return true;
  }

  function byText(doc, re) {
    var nodes = Array.prototype.slice.call(doc.querySelectorAll('button, a, [role="button"], .tab, .nav-item, .nav a'));
    return nodes.filter(function (el) {
      return visible(el) && re.test((el.textContent || '').replace(/\s+/g, ' ').trim());
    })[0] || null;
  }

  function find(machine, doc) {
    if (!machine || !doc) return null;
    if (machine.id === 'gsehack') return doc.querySelector('#cmd') || byText(doc, /terminal|start|help/i);
    if (machine.id === 'compsci') return doc.querySelector('#sandboxBtn') || byText(doc, /free.?play|sandbox/i);
    if (machine.id === 'gitcicd') return byText(doc, /git sandbox/i) || byText(doc, /sandbox/i);
    if (machine.id === 'cybercrime') return byText(doc, /quick drills/i) || byText(doc, /new case file/i);
    if (machine.id === 'csia') return byText(doc, /tool box/i) || byText(doc, /tools/i);
    return byText(doc, /sandbox|practice|start/i);
  }

  function trigger(machine, doc) {
    if (!machine || !doc) return null;

    if (machine.id === 'cybercrime') {
      function step(n) {
        if (!doc) return;
        var boot = doc.querySelector('.bootfx');
        if (boot) { try { boot.click(); } catch (e) {} }
        setTimeout(function () {
          var start = byText(doc, /new case file/i);
          if (start) { try { start.click(); } catch (e) {} }
          setTimeout(function () {
            var q = byText(doc, /quick drills/i) || byText(doc, /skills lab/i);
            if (q) { try { q.click(); } catch (e) {} }
            else if (n < 8) step(n + 1);
          }, 700);
        }, 450);
      }
      step(0);
      return 'case dashboard / quick drills';
    }

    var el = find(machine, doc);
    if (!el) return null;
    if (machine.id === 'gsehack' && el.tagName === 'INPUT') {
      var tries = 0;
      (function focusTerminal() {
        var input = doc.querySelector('#cmd');
        if (input && !input.disabled) {
          input.focus();
          try { input.scrollIntoView({ block: 'center', behavior: 'smooth' }); } catch (e) {}
          return;
        }
        if (tries++ < 24) setTimeout(focusTerminal, 250);
      })();
      return 'terminal';
    }
    try { el.click(); } catch (e) { return null; }
    return ((el.textContent || '').replace(/\s+/g, ' ').trim() || 'practice').slice(0, 48);
  }

  global.rangePracticeControl = find;
  global.rangePractice = trigger;
})(window);
