/* ============================================================
   GitCI/CD Hero - ci.js
   A GitHub-Actions-flavoured YAML subset parser, a workflow
   runner that simulates jobs/steps/matrix/artifacts, and a
   pipeline visualiser.

   API:
     GH.parseYaml(text)              -> JS value or throws
     GH.runWorkflow(wf, ctx)         -> run result object
     GH.renderPipeline(el, run)      -> paints the visualiser
     GH.WORKFLOW_TEMPLATES           -> starter YAML strings
   ============================================================ */
(function (GH) {
  'use strict';

  /* ============================================================ */
  /* YAML SUBSET PARSER                                            */
  /* ============================================================ */
  function stripComment(line) {
    var q = null;
    for (var i = 0; i < line.length; i++) {
      var c = line[i];
      if (q) { if (c === q) q = null; continue; }
      if (c === '"' || c === "'") { q = c; continue; }
      if (c === '#' && (i === 0 || line[i - 1] === ' ' || line[i - 1] === '\t')) return line.slice(0, i);
    }
    return line;
  }
  function parseScalar(s) {
    s = s.trim();
    if (s === '' ) return null;
    if ((s[0] === '"' && s[s.length - 1] === '"') || (s[0] === "'" && s[s.length - 1] === "'")) return s.slice(1, -1);
    if (s === 'true' || s === 'True') return true;
    if (s === 'false' || s === 'False') return false;
    if (s === 'null' || s === '~') return null;
    if (/^-?\d+$/.test(s)) return parseInt(s, 10);
    if (/^-?\d*\.\d+$/.test(s)) return parseFloat(s);
    if (s[0] === '[' && s[s.length - 1] === ']') return splitTop(s.slice(1, -1)).map(parseScalar);
    if (s[0] === '{' && s[s.length - 1] === '}') {
      var o = {}; splitTop(s.slice(1, -1)).forEach(function (p) { var i = p.indexOf(':'); o[p.slice(0, i).trim()] = parseScalar(p.slice(i + 1)); }); return o;
    }
    return s;
  }
  function splitTop(s) {
    var out = [], depth = 0, q = null, cur = '';
    for (var i = 0; i < s.length; i++) {
      var c = s[i];
      if (q) { cur += c; if (c === q) q = null; continue; }
      if (c === '"' || c === "'") { q = c; cur += c; continue; }
      if (c === '[' || c === '{') depth++;
      if (c === ']' || c === '}') depth--;
      if (c === ',' && depth === 0) { out.push(cur); cur = ''; continue; }
      cur += c;
    }
    if (cur.trim() !== '') out.push(cur);
    return out;
  }
  function isKeyLine(t) { return /^[^:#][^:]*:(\s|$)/.test(t) || /^["'][^"']*["']\s*:/.test(t); }

  GH.parseYaml = function (text) {
    var raw = String(text == null ? '' : text).replace(/\r/g, '').split('\n');
    var lines = [];
    raw.forEach(function (l) {
      var nc = stripComment(l);
      var indent = nc.length - nc.replace(/^\s+/, '').length;
      var t = nc.trim();
      if (t === '') return;
      lines.push({ indent: indent, text: t });
    });
    var pos = 0;

    function node(indent) {
      if (pos >= lines.length) return null;
      var l = lines[pos];
      if (l.indent < indent) return null;
      if (l.text === '-' || l.text.indexOf('- ') === 0) return sequence(l.indent);
      if (isKeyLine(l.text)) return mapping(l.indent);
      pos++;
      return parseScalar(l.text);
    }
    function sequence(indent) {
      var arr = [];
      while (pos < lines.length && lines[pos].indent === indent && (lines[pos].text === '-' || lines[pos].text.indexOf('- ') === 0)) {
        var content = lines[pos].text === '-' ? '' : lines[pos].text.slice(2);
        if (content.trim() === '') {
          pos++;
          arr.push(pos < lines.length && lines[pos].indent > indent ? node(lines[pos].indent) : null);
        } else {
          lines[pos] = { indent: indent + 2, text: content.trim() };   // virtual re-indent
          arr.push(node(indent + 2));
        }
      }
      return arr;
    }
    function mapping(indent) {
      var obj = {};
      while (pos < lines.length && lines[pos].indent === indent && isKeyLine(lines[pos].text)) {
        var lt = lines[pos].text;
        var ci = lt.indexOf(':');
        var key = lt.slice(0, ci).trim().replace(/^["']|["']$/g, '');
        var rest = lt.slice(ci + 1).trim();
        pos++;
        if (rest === '|' || rest === '>' || rest === '|-' || rest === '>-' || /^[|>]/.test(rest)) {
          obj[key] = blockScalar(indent, rest[0]);
        } else if (rest === '') {
          obj[key] = pos < lines.length && lines[pos].indent > indent ? node(lines[pos].indent) : null;
        } else {
          obj[key] = parseScalar(rest);
        }
      }
      return obj;
    }
    function blockScalar(indent, style) {
      var collected = [];
      var minIndent = Infinity;
      var start = pos;
      while (pos < lines.length && lines[pos].indent > indent) { minIndent = Math.min(minIndent, lines[pos].indent); pos++; }
      var rawSlice = raw.slice();
      // easier: recollect from raw with original text preserved
      pos = start;
      var out = [];
      while (pos < lines.length && lines[pos].indent > indent) {
        out.push(lines[pos].text);
        pos++;
      }
      return style === '>' ? out.join(' ') : out.join('\n');
    }
    var result = node(lines.length ? lines[0].indent : 0);
    return result == null ? {} : result;
  };

  /* ============================================================ */
  /* WORKFLOW RUNNER                                               */
  /* ============================================================ */
  function fileList(files) { return Object.keys(files || {}); }
  function hasTest(files) {
    var names = fileList(files);
    return names.some(function (n) { return /(^|\/)(test|tests|__tests__)\//.test(n) || /\.(test|spec)\.[a-z]+$/.test(n); });
  }
  function runShell(cmd, ctx, log) {
    var c = cmd.trim();
    var first = c.split(/\s+/)[0];
    function out(s) { log.push(s); }
    if (/^echo\b/.test(c)) { out(c.replace(/^echo\s+/, '').replace(/^["']|["']$/g, '')); return true; }
    if (/^ls\b/.test(c)) { out(fileList(ctx.files).join('  ') || '(empty)'); return true; }
    if (/^cat\s+(\S+)/.test(c)) { var f = c.match(/^cat\s+(\S+)/)[1]; if (ctx.files[f] != null) { out(ctx.files[f]); return true; } out('cat: ' + f + ': No such file or directory'); return false; }
    if (/^npm (ci|install|i)\b/.test(c)) { if (!ctx.files['package.json']) { out('npm ERR! enoent Could not read package.json'); return false; } out('added ' + (ctx.files['package.json'].match(/"dependencies"/) ? '42' : '1') + ' packages in 2s'); return true; }
    if (/^npm (test|t)\b/.test(c)) {
      out('> project@1.0.0 test');
      if (!hasTest(ctx.files)) { out('No test files found, exiting with code 1'); return false; }
      out('  \u2713 all tests passed'); out('3 passing (20ms)'); return true;
    }
    if (/^npm run (\S+)/.test(c)) { var s = c.match(/^npm run (\S+)/)[1]; if (!ctx.files['package.json']) { out('npm ERR! Missing script: "' + s + '"'); return false; } out('> project@1.0.0 ' + s); out('build complete'); return true; }
    if (/^node\s+(\S+)/.test(c)) { var f2 = c.match(/^node\s+(\S+)/)[1]; if (ctx.files[f2] == null) { out("Error: Cannot find module '" + f2 + "'"); return false; } out('(program ran)'); return true; }
    if (/^python3?\s+(\S+)/.test(c)) { var f3 = c.match(/^python3?\s+(\S+)/)[1]; if (ctx.files[f3] == null) { out("python: can't open file '" + f3 + "'"); return false; } out('(script ran)'); return true; }
    if (/^make\b/.test(c)) { out('make: Nothing to be done or build complete'); return true; }
    if (/^docker build/.test(c)) { out('Successfully built image'); return true; }
    if (/^git\b/.test(c)) { out(''); return true; }
    if (/^exit\s+1/.test(c)) { out('exit 1'); return false; }
    if (/^false$/.test(c)) return false;
    if (/^true$/.test(c)) return true;
    out('(ran) ' + c);
    return true;
  }

  function normaliseOn(wf) {
    var on = wf.on != null ? wf.on : wf[true];   // YAML can parse 'on' as boolean true
    return on;
  }
  function globMatchPath(pat, path) {
    if (String(pat).indexOf('*') === -1) return pat === path;
    var re = new RegExp('^' + String(pat).split('**').map(function (seg) {
      return seg.split('*').map(function (s) { return s.replace(/[.+?^${}()|[\]\\]/g, '\\$&'); }).join('[^/]*');
    }).join('.*') + '$');
    return re.test(path);
  }
  function triggers(on, event, ctx) {
    if (on == null) return true;
    if (typeof on === 'string') return on === event;
    if (Array.isArray(on)) return on.indexOf(event) !== -1;
    if (typeof on === 'object') {
      if (!Object.prototype.hasOwnProperty.call(on, event)) return false;
      var ev = on[event];
      if (ev && typeof ev === 'object') {
        if (ev.branches && ctx && ctx.branch && !ev.branches.some(function (b) { return globMatchPath(b, ctx.branch); })) return false;
        if (ev.paths && ctx && ctx.changed && ctx.changed.length && !ctx.changed.some(function (f) { return ev.paths.some(function (p) { return globMatchPath(p, f); }); })) return false;
      }
      return true;
    }
    return true;
  }

  GH.runWorkflow = function (wf, ctx) {
    ctx = ctx || {};
    ctx.files = ctx.files || {};
    ctx.event = ctx.event || 'push';
    ctx.branch = ctx.branch || 'main';
    var result = { ok: true, jobs: [], artifacts: [], event: ctx.event, branch: ctx.branch, skipped: false, logs: [] };

    var ev = normaliseOn(wf);
    if (!triggers(ev, ctx.event, ctx)) { result.skipped = true; result.reason = 'workflow not triggered by ' + ctx.event + (ctx.branch ? ' on ' + ctx.branch : ''); return result; }

    var env = (wf.env && typeof wf.env === 'object') ? wf.env : {};
    var jobsObj = wf.jobs || {};
    var jobs = [];
    var completed = {};
    Object.keys(jobsObj).forEach(function (jid) {
      var job = jobsObj[jid] || {};
      var needs = job.needs ? (Array.isArray(job.needs) ? job.needs : [job.needs]) : [];
      var gate = needs.every(function (n) { return completed[n] === 'success'; });
      var matrix = job.strategy && job.strategy.matrix ? expandMatrix(job.strategy.matrix) : [null];
      var jobEntries = [];
      matrix.forEach(function (combo) {
        var r = runJob(job, jid, combo, ctx, env, !gate);
        jobEntries.push(r);
      });
      completed[jid] = jobEntries.every(function (j) { return j.status === 'success'; }) ? 'success' : (jobEntries.some(function (j) { return j.status === 'success'; }) ? 'success' : 'failure');
      if (jobEntries.some(function (j) { return j.status === 'failure'; })) completed[jid] = 'failure';
      if (!gate) completed[jid] = 'skipped';
      jobs.push({ id: jid, name: job.name || jid, needs: needs, entries: jobEntries, gated: !gate });
    });
    result.jobs = jobs;
    result.ok = jobs.every(function (j) { return j.entries.every(function (e) { return e.status !== 'failure'; }); });
    result.artifacts = [];
    jobs.forEach(function (j) { j.entries.forEach(function (e) { (e.artifacts || []).forEach(function (a) { result.artifacts.push(a); }); }); });
    return result;
  };

  function expandMatrix(matrix) {
    var keys = Object.keys(matrix);
    var combos = [{}];
    keys.forEach(function (k) {
      var vals = Array.isArray(matrix[k]) ? matrix[k] : [matrix[k]];
      var next = [];
      combos.forEach(function (c) { vals.forEach(function (v) { var o = {}; Object.keys(c).forEach(function (x) { o[x] = c[x]; }); o[k] = v; next.push(o); }); });
      combos = next;
    });
    return combos;
  }

  function runJob(job, jid, combo, ctx, env, gated) {
    var entry = { id: jid, name: job.name || jid, combo: combo, status: 'success', steps: [], logs: [], artifacts: [], runsOn: job['runs-on'] || job.runsOn || 'ubuntu-latest' };
    if (gated) { entry.status = 'skipped'; entry.steps = [{ name: '(job skipped: needs not satisfied)', status: 'skipped' }]; return entry; }
    var steps = job.steps || [];
    var jobEnv = {};
    Object.keys(env).forEach(function (k) { jobEnv[k] = env[k]; });
    if (job.env) Object.keys(job.env).forEach(function (k) { jobEnv[k] = job.env[k]; });
    if (combo) Object.keys(combo).forEach(function (k) { jobEnv[k] = combo[k]; });
    var meetFail = job['continue-on-error'] ? false : true;

    for (var i = 0; i < steps.length; i++) {
      var st = steps[i] || {};
      var name = st.name || st.uses || (st.run ? String(st.run).split('\n')[0].slice(0, 42) : 'step ' + (i + 1));
      var rec = { name: name, uses: st.uses || null, run: st.run || null, status: 'success', log: [] };
      if (st.uses) {
        var act = String(st.uses);
        if (/^actions\/checkout@/.test(act)) { rec.log.push('Syncing repository: ' + (ctx.files && Object.keys(ctx.files).length) + ' file(s)'); rec.log.push("Checking out branch '" + ctx.branch + "'"); }
        else if (/^actions\/setup-node@/.test(act)) { rec.log.push('Found Node ' + ((st.with && st.with['node-version']) || '20')); rec.log.push('Setting up Node ' + ((st.with && st.with['node-version']) || '20')); }
        else if (/^actions\/cache@/.test(act)) { rec.log.push('Cache restored from key: ' + (st.with && st.with.key ? st.with.key : 'deps') + (Math.random() < 0.5 ? ' (hit)' : ' (miss)')); }
        else if (/^actions\/setup-python@/.test(act)) { rec.log.push('Setting up Python ' + ((st.with && st.with['python-version']) || '3.12')); }
        else if (/upload-artifact@/.test(act)) { var an = (st.with && st.with.name) || 'artifact'; entry.artifacts.push(an); rec.log.push('Uploaded artifact: ' + an); }
        else if (/download-artifact@/.test(act)) { rec.log.push('Downloaded artifact'); }
        else if (/docker\/(build-push-action|login-action)@/.test(act)) { rec.log.push('Docker: building and pushing image'); }
        else if (/deploy-pages@|gh-pages|peaceiris\/actions-gh-pages@/.test(act)) { rec.log.push('Deploying to GitHub Pages'); }
        else if (/codecov|coveralls/.test(act)) { rec.log.push('Uploading coverage'); }
        else if (/github\/codeql-action/.test(act)) { rec.log.push('Running CodeQL security analysis'); }
        else if (/aquasecurity\/trivy-action/.test(act)) { rec.log.push('Trivy: vulnerability scan'); }
        else { rec.log.push('Using ' + act); }
      } else if (st.run) {
        var lines = String(st.run).split('\n');
        for (var li = 0; li < lines.length; li++) {
          if (!lines[li].trim()) continue;
          var ok = runShell(lines[li], ctx, rec.log);
          if (!ok) { rec.status = 'failure'; break; }
        }
      }
      entry.steps.push(rec);
      if (rec.status === 'failure') { entry.status = 'failure'; if (meetFail) break; }
    }
    return entry;
  }

  GH.triggeredBy = triggers2;
  function triggers2(wf, event, ctx) { return triggers(normaliseOn(wf), event, ctx); }

  /* ============================================================ */
  /* PIPELINE VISUALISER                                           */
  /* ============================================================ */
  var ICON = { success: '&#10003;', failure: '&#10007;', skipped: '&#8226;' };
  GH.renderPipeline = function (el, run) {
    if (!el) return;
    if (!run) { el.innerHTML = '<p class="muted">Run the workflow to see the pipeline.</p>'; return; }
    if (run.skipped) { el.innerHTML = '<div class="pipe-skipped">Pipeline did not run — ' + GH.esc(run.reason || 'not triggered') + '</div>'; return; }
    var html = '<div class="pipeline">';
    run.jobs.forEach(function (job, ji) {
      if (ji > 0) html += '<div class="pipe-arrow">&rarr;</div>';
      html += '<div class="job-card ' + (job.gated ? 'skipped' : job.entries.every(function (e) { return e.status === 'success'; }) ? 'ok' : 'bad') + '">';
      html += '<div class="job-head"><b>' + GH.esc(job.name) + '</b>' + (job.needs.length ? '<span class="chip">needs: ' + job.needs.join(', ') + '</span>' : '') + '</div>';
      job.entries.forEach(function (entry) {
        html += '<div class="job-entry">';
        if (entry.combo) html += '<div class="matrix-chip">' + Object.keys(entry.combo).map(function (k) { return k + '=' + entry.combo[k]; }).join(' &middot; ') + '</div>';
        html += '<div class="runner">' + GH.esc(entry.runsOn) + '</div>';
        entry.steps.forEach(function (st) {
          html += '<div class="pstep ' + st.status + '"><span class="picon">' + ICON[st.status] + '</span>' +
            '<span class="pname">' + GH.esc(st.name) + (st.uses ? ' <span class="chip">uses</span>' : '') + '</span></div>';
          (st.log || []).forEach(function (l) { if (l !== '') html += '<div class="plog">' + GH.esc(l) + '</div>'; });
        });
        (entry.artifacts || []).forEach(function (a) { html += '<div class="artifact">&#128230; artifact: ' + GH.esc(a) + '</div>'; });
        html += '</div>';
      });
      html += '</div>';
    });
    html += '</div>';
    html += '<div class="pipe-summary ' + (run.ok ? 'ok' : 'bad') + '">' + (run.ok ? '&#10003; All jobs passed' : '&#10007; Pipeline failed') +
      ' &middot; event: <b>' + GH.esc(run.event) + '</b> on <b>' + GH.esc(run.branch) + '</b>' +
      (run.artifacts.length ? ' &middot; artifacts: ' + run.artifacts.length : '') + '</div>';
    el.innerHTML = html;
  };

  /* ---------- starter workflow templates ---------- */
  GH.WORKFLOW_TEMPLATES = {
    empty: 'name: CI\non:\n  push:\n\njobs:\n  build:\n    runs-on: ubuntu-latest\n    steps:\n      - uses: actions/checkout@v4\n      - run: echo "Hello, pipeline"\n',
    node: 'name: Node CI\non:\n  push:\n    branches: [ main ]\n  pull_request:\n\njobs:\n  test:\n    runs-on: ubuntu-latest\n    steps:\n      - uses: actions/checkout@v4\n      - uses: actions/setup-node@v4\n        with:\n          node-version: 20\n      - run: npm ci\n      - run: npm test\n',
    buildtest: 'name: Build & Test\non: [push, pull_request]\n\njobs:\n  build:\n    runs-on: ubuntu-latest\n    steps:\n      - uses: actions/checkout@v4\n      - uses: actions/setup-node@v4\n        with:\n          node-version: 20\n      - run: npm ci\n      - run: npm run build\n      - uses: actions/upload-artifact@v4\n        with:\n          name: dist\n          path: dist\n\n  test:\n    needs: build\n    runs-on: ubuntu-latest\n    steps:\n      - uses: actions/checkout@v4\n      - run: npm ci\n      - run: npm test\n',
    matrix: 'name: Matrix\non: [push]\n\njobs:\n  test:\n    runs-on: ubuntu-latest\n    strategy:\n      matrix:\n        node: [18, 20, 22]\n        os: [ubuntu-latest, windows-latest]\n    steps:\n      - uses: actions/checkout@v4\n      - run: npm test\n',
    deploy: 'name: Deploy\non:\n  push:\n    branches: [ main ]\n\njobs:\n  build:\n    runs-on: ubuntu-latest\n    steps:\n      - uses: actions/checkout@v4\n      - run: npm ci\n      - run: npm run build\n\n  deploy:\n    needs: build\n    runs-on: ubuntu-latest\n    steps:\n      - uses: actions/download-artifact@v4\n      - uses: deploy-pages@v4\n'
  };
})(window.GH);
