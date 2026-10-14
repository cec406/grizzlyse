/* ============================================================
   GitCI/CD Hero - graph.js
   SVG visualisers: live commit graph, the three states of Git,
   and conceptual branch/merge diagrams.
   ============================================================ */
(function (GH) {
  'use strict';

  var LANE_COLORS = ['#38bdf8', '#a855f7', '#34d399', '#fbbf24', '#f472b6', '#22d3ee', '#fb7185', '#a3e635'];

  function escape(s) { return GH.esc(s); }

  /* ---------------------------------------------------------- */
  /* Live / static commit graph                                 */
  /* ---------------------------------------------------------- */
  GH.renderGitGraph = function (container, repoOrSnap, opts) {
    if (!container) return;
    opts = opts || {};
    var snap = repoOrSnap && repoOrSnap.snapshot ? repoOrSnap.snapshot() : repoOrSnap;
    if (!snap || !snap.commits || !snap.commits.length) {
      container.innerHTML = '<p class="muted small">No commits yet — the graph appears once you commit.</p>';
      return;
    }
    var commits = snap.commits;
    var rowH = opts.rowH || 44, laneW = opts.laneW || 26, padX = 22, padY = 26;
    var maxLane = 0;
    commits.forEach(function (c) { maxLane = Math.max(maxLane, c.lane); });
    var gutter = padX + (maxLane + 1) * laneW + 14;
    var labelW = opts.labelW || 300;
    var W = gutter + labelW, H = padY * 2 + commits.length * rowH;
    var idx = {};
    commits.forEach(function (c, i) { idx[c.sha] = i; });
    function X(lane) { return padX + lane * laneW; }
    function Y(i) { return padY + i * rowH; }

    var edges = '', nodes = '';
    commits.forEach(function (c, i) {
      var color = LANE_COLORS[c.lane % LANE_COLORS.length];
      var x1 = X(c.lane), y1 = Y(i);
      (c.parents || []).forEach(function (p) {
        var j = idx[p]; if (j == null) return;
        var x2 = X(commits[j].lane), y2 = Y(j);
        var d = x1 === x2 ? 'M' + x1 + ' ' + y1 + ' L' + x2 + ' ' + y2
          : 'M' + x1 + ' ' + y1 + ' C' + x1 + ' ' + (y1 + rowH) + ' ' + x2 + ' ' + (y2 - rowH) + ' ' + x2 + ' ' + y2;
        edges += '<path d="' + d + '" fill="none" stroke="' + color + '" stroke-width="2.5" opacity="0.75"/>';
      });
    });
    commits.forEach(function (c, i) {
      var color = LANE_COLORS[c.lane % LANE_COLORS.length];
      var x = X(c.lane), y = Y(i);
      var isHead = snap.head === c.sha;
      nodes += '<circle cx="' + x + '" cy="' + y + '" r="' + (isHead ? 9 : 7) + '" fill="' + color + '"' + (isHead ? ' stroke="#fff" stroke-width="2.5"' : '') + '/>';
      var deco = (c.deco || []).map(function (d) {
        var cls = d.type === 'head' ? 'deco-head' : d.type === 'tag' ? 'deco-tag' : d.type === 'remote' ? 'deco-remote' : 'deco-branch';
        return '<tspan class="' + cls + '"> ' + escape(d.label) + ' </tspan>';
      }).join('');
      nodes += '<text x="' + (gutter) + '" y="' + (y + 5) + '" fill="#dbe3f5" font-size="13" font-family="monospace">' +
        '<tspan fill="#7f8cb0">' + c.sha.slice(0, 7) + '</tspan> ' + escape((c.message || '').slice(0, 40)) + deco + '</text>';
    });
    container.innerHTML = '<div class="graphwrap"><svg viewBox="0 0 ' + W + ' ' + H + '" class="graphs-svg">' + edges + nodes + '</svg></div>';
  };

  /* ---------------------------------------------------------- */
  /* The three states of Git                                    */
  /* ---------------------------------------------------------- */
  GH.renderStates = function (container) {
    if (!container) return;
    container.innerHTML =
      '<div class="states-diagram">' +
        '<div class="state-box"><div class="sb-title">Working Directory</div><div class="sb-sub">files you edit</div><div class="sb-files">app.js<span class="dot"></span>README.md</div></div>' +
        '<div class="state-arrow"><b>git add</b><span>&rarr;</span></div>' +
        '<div class="state-box mid"><div class="sb-title">Staging Area</div><div class="sb-sub">the index &mdash; what will be committed</div><div class="sb-files">app.js</div></div>' +
        '<div class="state-arrow"><b>git commit</b><span>&rarr;</span></div>' +
        '<div class="state-box repo"><div class="sb-title">Repository</div><div class="sb-sub">permanent history (.git)</div><div class="sb-files">&#9679; &#9679; &#9679;</div></div>' +
      '</div>' +
      '<p class="viz-note">Your edits live in the working directory. <code>git add</code> copies them into the staging area (a snapshot you are preparing). <code>git commit</code> records the staged snapshot permanently. This is why you can stage some changes and not others.</p>';
  };

  /* ---------------------------------------------------------- */
  /* Branch / merge conceptual diagram                          */
  /* ---------------------------------------------------------- */
  GH.renderFlow = function (container, opts) {
    if (!container) return;
    opts = opts || {};
    var W = 620, H = 240, rowY = { main: 150, feat: 60 };
    function node(x, y, label, color, badge) {
      return '<circle cx="' + x + '" cy="' + y + '" r="14" fill="' + color + '"/>' +
        '<text x="' + x + '" y="' + (y + 4) + '" text-anchor="middle" font-size="11" fill="#06121f" font-family="monospace">' + label + '</text>' +
        (badge ? '<text x="' + x + '" y="' + (y - 22) + '" text-anchor="middle" font-size="11" fill="#93a1c0">' + badge + '</text>' : '');
    }
    function edge(x1, y1, x2, y2, color) {
      return '<path d="M' + x1 + ' ' + y1 + ' C' + x1 + ' ' + (y1 + (y2 - y1) / 2) + ' ' + x2 + ' ' + (y2 - (y2 - y1) / 2) + ' ' + x2 + ' ' + y2 + '" fill="none" stroke="' + color + '" stroke-width="3" opacity="0.8"/>';
    }
    var mainC = '#38bdf8', featC = '#a855f7';
    var html = '<svg viewBox="0 0 ' + W + ' ' + H + '" class="graphs-svg">';
    html += '<text x="10" y="' + (rowY.main + 4) + '" font-size="12" fill="#8fd6ff" font-family="monospace">main</text>';
    html += '<text x="10" y="' + (rowY.feat + 4) + '" font-size="12" fill="#c9b3ff" font-family="monospace">feature</text>';
    html += '<line x1="70" y1="' + rowY.main + '" x2="' + (W - 30) + '" y2="' + rowY.main + '" stroke="' + mainC + '" stroke-width="3" opacity="0.35"/>';
    html += '<line x1="200" y1="' + rowY.feat + '" x2="470" y2="' + rowY.feat + '" stroke="' + featC + '" stroke-width="3" opacity="0.35"/>';
    html += node(110, rowY.main, 'A', mainC);
    html += node(200, rowY.main, 'B', mainC);
    html += node(360, rowY.main, 'D', mainC);
    html += node(470, rowY.main, 'M', '#fbbf24', 'merge commit');
    html += node(210, rowY.feat, 'C', featC, 'git switch -c feature');
    html += node(370, rowY.feat, 'E', featC);
    html += edge(110, rowY.main, 200, rowY.main, mainC);
    html += edge(200, rowY.main, 360, rowY.main, mainC);
    html += edge(360, rowY.main, 470, rowY.main, mainC);
    html += edge(200, rowY.main, 210, rowY.feat, featC);
    html += edge(210, rowY.feat, 370, rowY.feat, featC);
    html += edge(370, rowY.feat, 470, rowY.main, featC);
    html += '<text x="' + (W - 20) + '" y="' + (rowY.main + 44) + '" text-anchor="end" font-size="11" fill="#93a1c0">git merge feature</text>';
    html += '</svg>';
    container.innerHTML = '<div class="graphwrap">' + html + '</div>' +
      '<p class="viz-note">Branching copies a pointer, not the files. Commits C and E happened on <code>feature</code> while D happened on <code>main</code>. The merge commit M has two parents, tying both histories together.</p>';
  };
})(window.GH);
