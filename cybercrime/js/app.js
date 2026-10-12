/* ============================================================
   CODEWATCH — App (screens & routing)
   Routes: title | hq | mission | manual | guide | exam | cert
   ============================================================ */
'use strict';

var curRoute = "title";
var tickerTimer = null;
var tickerIdx = 0;

/* ---------------- routing ---------------- */
function go(route) {
  curRoute = route;
  renderRoute(true);
}
function renderRoute() {
  var app = document.getElementById("app");
  clear(app);
  document.documentElement.lang = state.lang;
  if (curRoute === "title") renderTitle(app);
  else if (curRoute === "hq") renderHQ(app);
  else {
    stopTicker();
    if (curRoute === "mission") renderMissionScreen(app);
    else if (curRoute === "manual") renderManual(app);
    else if (curRoute === "guide") renderGuide(app);
    else if (curRoute === "archive") renderArchive(app);
    else if (curRoute === "drill") renderDrill(app);
    else if (curRoute === "lab") renderLab(app);
    else if (curRoute === "exam") renderExam(app);
    else if (curRoute === "cert") renderCert(app);
    else renderTitle(app);
  }
}

/* ---------------- shared chrome ---------------- */
function buildTopbar(app, opts) {
  opts = opts || {};
  var bar = el("div", "topbar");
  var brand = el("span", "brand", "CODEWATCH");
  brand.addEventListener("click", function () { stopTicker(); go("hq"); });
  bar.appendChild(brand);
  if (opts.caseId) bar.appendChild(el("span", "caseid", opts.caseId));
  bar.appendChild(el("span", "grow"));

  var langs = ["en", "es", "ru"];
  langs.forEach(function (l) {
    var b = el("button", "tbtn", l.toUpperCase());
    if (state.lang === l) b.style.color = "#35d0ba";
    b.addEventListener("click", function () { setLang(l); });
    bar.appendChild(b);
  });
  var man = el("button", "tbtn", "📖 " + t("fieldManual"));
  man.addEventListener("click", function () { stopTicker(); go("manual"); });
  bar.appendChild(man);
  var arch = el("button", "tbtn", "📁 " + t("archive"));
  arch.addEventListener("click", function () { stopTicker(); go("archive"); });
  bar.appendChild(arch);
  var guide = el("button", "tbtn", "🧭 " + t("careerGuide"));
  guide.addEventListener("click", function () { stopTicker(); go("guide"); });
  bar.appendChild(guide);
  var setBtn = el("button", "tbtn", "⚙");
  setBtn.addEventListener("click", openSettings);
  bar.appendChild(setBtn);
  var rescue = el("button", "tbtn rescue", "🆘 " + t("reportHelp"));
  rescue.addEventListener("click", openRescue);
  bar.appendChild(rescue);
  app.appendChild(bar);
}
function openRescue() {
  openModal(function (m, close) {
    m.appendChild(el("h3", null, t("resTitle")));
    m.appendChild(el("p", "dim", t("resIntro")));
    var lines = [
      { n: "🧸", k: ["resChild"] },
      { n: "🧸", k: ["resChildEs"] },
      { n: "🧸", k: ["resChildRu"] },
      { n: "🫂", k: ["resKid"] },
      { n: "🫂", k: ["resKidEs"] },
      { n: "🫂", k: ["resKidRu"] },
      { n: "🎣", k: ["resScam"] },
      { n: "🎣", k: ["resScamEs"] },
      { n: "🎣", k: ["resScamRu"] },
      { n: "👵", k: ["resScamElder"] },
      { n: "👵", k: ["resScamElderEs"] },
      { n: "👵", k: ["resScamElderRu"] },
      { n: "⚡", k: ["resInfra"] },
      { n: "🚨", k: ["resTraffic"] },
      { n: "💙", k: ["resCrisis"] },
      { n: "🛟", k: ["resOffHelp"] }
    ];
    lines.forEach(function (L) {
      var d = el("div", "res-line");
      d.appendChild(el("span", "rn", L.n + " "));
      d.appendChild(document.createTextNode(I18N.en[L.k[0]]));
      m.appendChild(d);
    });
    m.appendChild(el("p", "faint mt", "Lines shown in all languages so you can share them with anyone. / Líneas en todos los idiomas para compartirlas con cualquiera. / Строки на всех языках, чтобы поделиться с кем угодно."));
    var ok = el("button", "btn mt", t("resClose"));
    ok.addEventListener("click", close);
    m.appendChild(ok);
  });
}
function openSettings() {
  openModal(function (m, close) {
    m.appendChild(el("h3", null, t("settings")));
    var row1 = el("div", "set-row");
    row1.appendChild(el("span", null, t("language")));
    var sel = el("select");
    [["en", "English"], ["es", "Español"], ["ru", "Русский"]].forEach(function (p) {
      var o = el("option", null, p[1]); o.value = p[0];
      if (state.lang === p[0]) o.selected = true;
      sel.appendChild(o);
    });
    sel.addEventListener("change", function () { setLang(sel.value); });
    row1.appendChild(sel);
    m.appendChild(row1);

    function switchRow(label, key, onChange) {
      var row = el("div", "set-row");
      row.appendChild(el("span", null, label));
      var sw = el("label", "switch");
      var cb = el("input"); cb.type = "checkbox"; cb.checked = !!state.settings[key];
      var track = el("span", "track");
      cb.addEventListener("change", function () {
        state.settings[key] = cb.checked;
        saveState(); applyScanlines();
        if (onChange) onChange();
      });
      sw.appendChild(cb); sw.appendChild(track);
      row.appendChild(sw);
      m.appendChild(row);
    }
        switchRow(t("scanlines"), "scanlines");
    switchRow(t("sound"), "sound", function () { applyAudio(); SFX.chime(); });
    switchRow(t("ambience"), "ambience", applyAudio);
    switchRow(t("rain"), "rain");

    var rowX = el("div", "set-row");
    rowX.appendChild(el("span", null, t("exportSave")));
    var exp = el("button", "btn", "⮷");
    exp.addEventListener("click", function () {
      var data = JSON.stringify(state);
      var ta = m.querySelector("#io-area");
      ta.value = data;
      if (navigator.clipboard) {
        navigator.clipboard.writeText(data).then(function () { toast(t("copied")); }, function () {});
      }
    });
    rowX.appendChild(exp);
    m.appendChild(rowX);

    m.appendChild(el("p", "faint", t("backupNote")));

    var rowY = el("div", "set-row");
    rowY.appendChild(el("span", null, t("importSave")));
    var imp = el("button", "btn", "⮵");
    imp.addEventListener("click", function () {
      var ta = m.querySelector("#io-area");
      try {
        var s = JSON.parse(ta.value);
        if (!s || s.v !== 2) throw new Error("bad");
        state = s; saveState(); applyScanlines(); close(); renderRoute();
        toast("✔ " + t("continueGame"));
      } catch (e) { toast("✖ " + t("invalidSave")); }
    });
    rowY.appendChild(imp);
    m.appendChild(rowY);

    var ta = el("textarea"); ta.id = "io-area"; ta.placeholder = "{ ... }";
    m.appendChild(ta);

    var rowU = el("div", "set-row");
    rowU.appendChild(el("span", null, "🔓 " + t("unlockAll")));
    var unl = el("button", "btn primary", "🔓");
    unl.addEventListener("click", function () {
      openModal(function (m2, close2) {
        m2.appendChild(el("h3", null, "🔓 " + t("unlockAll")));
        m2.appendChild(el("p", "dim", t("unlockAllConfirm")));
        var yes = el("button", "btn danger", t("yes"));
        yes.addEventListener("click", function () { close2(); close(); unlockEverything(); });
        yes.style.marginRight = "8px";
        var no = el("button", "btn ghost", t("close"));
        no.addEventListener("click", close2);
        m2.appendChild(yes); m2.appendChild(no);
      });
    });
    rowU.appendChild(unl);
    m.appendChild(rowU);

    var rowR = el("div", "set-row");
    rowR.appendChild(el("span", null, t("resetSave")));
    var rst = el("button", "btn danger", "🗑");
    rst.addEventListener("click", function () {
      if (confirm(t("resetConfirm"))) {
        state = defaultState(); saveState(); applyScanlines(); close(); go("title");
      }
    });
    rowR.appendChild(rst);
    m.appendChild(rowR);
  });
}

/* ---------------- title ---------------- */
function renderTitle(app) {
  var scr = el("div", "title-screen");
  scr.appendChild(el("div", "title-badge", "NCIB TRAINING DIVISION // FICTIONAL BUREAU"));
  var h1 = el("h1", null, "CODE");
  h1.appendChild(el("span", "accent", "WATCH"));
  scr.appendChild(h1);
  scr.appendChild(el("p", "title-sub", t("tagline")));

  var menu = el("div", "title-menu");
  var hasSave = state.xp > 0 || Object.keys(state.missions).length > 0;
  var bNew = el("button", "btn primary big", hasSave ? "▶ " + t("continueGame") : "▶ " + t("newGame"));
  bNew.addEventListener("click", function () { stopTicker(); go("hq"); });
  menu.appendChild(bNew);
  var bGuide = el("button", "btn", "🧭 " + t("careerGuide"));
  bGuide.addEventListener("click", function () { go("guide"); });
  menu.appendChild(bGuide);
  var bSet = el("button", "btn", "⚙ " + t("settings"));
  bSet.addEventListener("click", openSettings);
  menu.appendChild(bSet);
  scr.appendChild(menu);

  var langRow = el("div", "title-lang");
  [["en", "EN"], ["es", "ES"], ["ru", "RU"]].forEach(function (p) {
    var b = el("button", "tbtn", p[1]);
    if (state.lang === p[0]) b.style.color = "#35d0ba";
    b.addEventListener("click", function () { setLang(p[0]); });
    langRow.appendChild(b);
  });
  scr.appendChild(langRow);

  var dis = el("div", "title-disclaimer");
  dis.appendChild(el("div", null, t("disclaimer")));
  dis.appendChild(el("div", "mt", "🆘 " + t("resIntro")));
  scr.appendChild(dis);
  app.appendChild(scr);

  playBootFX();

  var rescue = el("button", "tbtn rescue", "🆘 " + t("reportHelp"));
  rescue.style.position = "fixed"; rescue.style.right = "16px"; rescue.style.bottom = "16px";
  rescue.addEventListener("click", openRescue);
  app.appendChild(rescue);
}

/* ---------------- track selection ---------------- */
function trackBadge(code) {
  if (code === "core") return t("trackCoreBadge");
  return code === "A" ? t("trackGuardianBadge") : t("trackSentinelBadge");
}
function openTrackSelect() {
  openModal(function (m, close) {
    m.appendChild(el("h3", null, "🧭 " + t("trackSelectTitle")));
    m.appendChild(el("p", "dim", t("trackSelectSub")));
    var grid = el("div", "cards mt");
    function trackCard(code, icon, name, blurb) {
      var card = el("div", "mission-card");
      card.appendChild(el("div", "micon", icon));
      card.appendChild(el("div", "mcode", trackBadge(code)));
      card.appendChild(el("div", "mtitle", name));
      card.appendChild(el("div", "mtag", blurb));
      var btn = el("button", "btn primary mt", "➤ " + t("chooseTrack"));
      btn.addEventListener("click", function () { close(); setTrack(code); });
      card.appendChild(btn);
      return card;
    }
    grid.appendChild(trackCard("A", TRACKS.guardian.icon, t("trackGuardianName"), t("trackGuardianBlurb")));
    grid.appendChild(trackCard("B", TRACKS.sentinel.icon, t("trackSentinelName"), t("trackSentinelBlurb")));
    m.appendChild(grid);
    var not = el("button", "btn ghost mt", t("close"));
    not.addEventListener("click", close);
    m.appendChild(not);
  });
}

/* ---------------- HQ ---------------- */
function renderHQ(app) {
  buildTopbar(app);
  var wrap = el("div", "wrap");
  app.appendChild(wrap);

  var grid = el("div", "hq-grid mt");
  wrap.appendChild(grid);

  /* left column */
  var left = el("div");
  var rankP = el("div", "panel rankbox");
  var rIdx = rankIndex(state.xp);
  var next = RANK_THRESHOLDS[rIdx + 1];
  rankP.appendChild(el("div", "faint", t("rank")));
  rankP.appendChild(el("div", "rank-name", "★ " + t(RANK_KEYS[rIdx])));
  var bar = el("div", "xpbar");
  var fill = el("div", "fill");
  var pct = next ? Math.min(100, Math.round(100 * (state.xp - RANK_THRESHOLDS[rIdx]) / (next - RANK_THRESHOLDS[rIdx]))) : 100;
  fill.style.width = pct + "%";
  bar.appendChild(fill);
  rankP.appendChild(bar);
  rankP.appendChild(el("div", "stat-row", ""));
  var r1 = el("div", "stat-row");
  r1.appendChild(el("span", "dim", t("xp")));
  r1.appendChild(el("span", null, state.xp + (next ? " / " + next : "")));
  rankP.appendChild(r1);
  if (!next) rankP.appendChild(el("div", "faint", t("maxRank")));
  else {
    var rn = el("div", "stat-row");
    rn.appendChild(el("span", "faint", t("nextRank") + ": " + t(RANK_KEYS[rIdx + 1])));
    rankP.appendChild(rn);
  }
  var closed = 0;
  displayOrder().forEach(function (e) { if (missionProg(e.id).doneOnce) closed++; });
  var r2 = el("div", "stat-row");
  r2.appendChild(el("span", "dim", t("casesClosed")));
  r2.appendChild(el("span", null, closed + " / " + displayOrder().length));
  rankP.appendChild(r2);
  var r3 = el("div", "stat-row");
  r3.appendChild(el("span", "dim", t("certStatus")));
  r3.appendChild(el("span", null, state.exam.passed ? "🎓 " + t("yes") : t("notCertified")));
  rankP.appendChild(r3);
  if (state.track) {
    var rs = el("div", "stat-row");
    rs.appendChild(el("span", "dim", t("trackSpecialty")));
    rs.appendChild(el("span", null, TRACKS[TRACK_FOR[state.track]].icon + " " + t(TRACK_FOR[state.track] === "guardian" ? "trackGuardianName" : "trackSentinelName")));
    rankP.appendChild(rs);
  }
  left.appendChild(rankP);

  if (state.track && rotationUnlocked() && !dualComplete()) {
    var rotP = el("div", "panel");
    rotP.appendChild(el("h3", null, "🏆 " + t("trackDualGoal")));
    var rotRow = el("div", "stat-row");
    var otherFlow = TRACK_FOR[state.track] === "guardian" ? TRACKS.sentinel.flow : TRACKS.guardian.flow;
    var otherDone = 0;
    otherFlow.forEach(function (id) { if (missionProg(id).doneOnce) otherDone++; });
    rotRow.appendChild(el("span", "dim", t("trackOtherOpen")));
    rotRow.appendChild(el("span", null, otherDone + " / " + otherFlow.length));
    rotP.appendChild(rotRow);
    left.appendChild(rotP);
  }
  if (state.track && dualComplete()) {
    var dualP = el("div", "panel");
    dualP.appendChild(el("h3", null, "🏆 " + t("trackDualGoal")));
    dualP.appendChild(el("span", "good", "✔ " + t("yes") + " — " + t("certifiedDual")));
    left.appendChild(dualP);
  }

  var toolsP = el("div", "panel");
  toolsP.appendChild(el("h3", null, t("tools")));
  if (!state.tools.length) toolsP.appendChild(el("div", "faint", t("noTools")));
  state.tools.forEach(function (id) {
    var def = TOOLS[id];
    if (!def) return;
    var chip = el("span", "tool-chip", def.icon + " " + def.name);
    chip.addEventListener("click", function () { toast(def.icon + " " + def.name + " — " + def.desc); });
    toolsP.appendChild(chip);
  });
  left.appendChild(toolsP);

  var drillP = el("div", "panel");
  drillP.appendChild(el("h3", null, "⚡ " + t("drillsTitle")));
  drillP.appendChild(el("p", "faint", t("drillsIntro")));
  var drillBtn = el("button", "btn", "⚡ " + t("drillsTitle"));
  drillBtn.addEventListener("click", startDrills);
  drillP.appendChild(drillBtn);
  left.appendChild(drillP);

  var labP = el("div", "panel");
  labP.appendChild(el("h3", null, "🧪 " + t("labTitle")));
  labP.appendChild(el("p", "faint", t("labIntro")));
  var labBtn = el("button", "btn", "🧪 " + t("labTitle"));
  labBtn.addEventListener("click", function () { go("lab"); });
  labP.appendChild(labBtn);
  left.appendChild(labP);

  var anyP = el("div", "panel");
  anyP.appendChild(el("h3", null, "🗂 " + t("anyCase")));
  anyP.appendChild(el("p", "faint", t("anyCaseNote")));
  var sel = el("select");
  var order = ["m1", "m2"].concat(TRACKS.guardian.flow, TRACKS.sentinel.flow, ["m7", "m9"]);
  order.forEach(function (id) {
    var mm = missionById(id);
    if (!mm) return;
    var o = el("option", null, mm.icon + " " + mm.code);
    o.value = id;
    sel.appendChild(o);
  });
  var goBtn = el("button", "btn", "➤ " + t("start"));
  goBtn.addEventListener("click", function () {
    if (sel.value) startMission(sel.value, true);
  });
  goBtn.style.marginTop = "8px";
  anyP.appendChild(sel); anyP.appendChild(goBtn);
  left.appendChild(anyP);

  var achP = el("div", "panel");
  achP.appendChild(el("h3", null, t("achievements")));
  var achRow = el("div", "ach-row");
  ACH_DEFS.forEach(function (a) {
    var got = state.ach.indexOf(a.id) !== -1;
    var c = el("div", "ach-card" + (got ? " got" : " locked"));
    c.appendChild(el("div", "aic", got ? a.icon : "🔒"));
    c.appendChild(el("div", null, a.name));
    c.appendChild(el("div", "faint", a.desc));
    achRow.appendChild(c);
  });
  achP.appendChild(achRow);
  left.appendChild(achP);
  grid.appendChild(left);

  /* right column: missions */
  var right = el("div");
  var mp = el("div", "panel");
  mp.appendChild(el("h3", null, t("missions")));

  if (!state.track) {
    var selP = el("div", "panel mt");
    selP.style.background = "var(--panel2)";
    selP.appendChild(el("h3", null, "🧭 " + t("trackSelectTitle")));
    selP.appendChild(el("p", "dim", t("trackSelectSub")));
    selP.appendChild(el("p", "faint", t("trackNoFlow")));
    var choose = el("button", "btn primary", "🧭 " + t("trackSelectTitle"));
    choose.disabled = !missionProg("m2").doneOnce;
    choose.addEventListener("click", openTrackSelect);
    selP.appendChild(choose);
    mp.appendChild(selP);
  }

  var cards = el("div", "cards");
  displayOrder().forEach(function (entry) {
    var m = missionById(entry.id);
    var status = missionStatus(m.id);
    var prog = missionProg(m.id);
    var code = trackCode(m.id);
    var card = el("div", "mission-card" + (status === "locked" ? " locked" : ""));
    card.appendChild(el("div", "micon", status === "locked" ? "🔒" : m.icon));
    card.appendChild(el("div", "mcode", m.code));
    card.appendChild(el("div", "mtitle", m.title));
    card.appendChild(el("div", "mtag", m.tag[state.lang] || m.tag.en));
    var foot = el("div", "mfoot");
    foot.appendChild(el("span", "stars", trackBadge(code) + " · " + "★".repeat(m.difficulty) + "☆".repeat(5 - m.difficulty)));
    var st = el("span", null, "");
    if (status === "done") { st.className = "badge-done"; st.textContent = "✔ " + (prog.bestStars ? "★".repeat(prog.bestStars) + " " : "") + t("completed"); }
    else if (status === "available" && prog.step > 0) st.textContent = "⏸ " + t("resume");
    else if (status === "available") st.textContent = "▶ " + t("start");
    else { st.className = "badge-locked"; st.textContent = code === "core" ? t("locked") : trackBadge(code); }
    foot.appendChild(st);
    card.appendChild(foot);
    if (status !== "locked") {
      card.addEventListener("click", function (m2) { return function () { startMission(m2); }; }(m.id));
    } else {
      card.addEventListener("click", function (mid, c) {
        return function () {
          if (c === "core" || !state.track) toast("🔒 " + (c === "core" ? t("trackNoFlow") : t("locked")));
          else toast("🔒 " + t("trackLocked"));
        };
      }(m.id, code));
    }
    cards.appendChild(card);
  });
  mp.appendChild(cards);

  /* exam card */
  var examCard = el("div", "mission-card" + (allMissionsDone() ? "" : " locked"));
  examCard.appendChild(el("div", "micon", allMissionsDone() ? "🎓" : "🔒"));
  examCard.appendChild(el("div", "mcode", "FINAL CERTIFICATION"));
  examCard.appendChild(el("div", "mtitle", t("examTitle")));
  examCard.appendChild(el("div", "mtag", t("examIntro")));
  var efoot = el("div", "mfoot");
  efoot.appendChild(el("span", "stars", state.exam.passed ? "🎓 " + t("yes") : ""));
  efoot.appendChild(el("span", "badge-done", allMissionsDone() ? (state.exam.passed ? "✔ " + t("completed") : "▶ " + t("start")) : "🔒 " + t("locked")));
  examCard.appendChild(efoot);
  examCard.addEventListener("click", function () {
    if (allMissionsDone()) startExam();
    else toast("🔒 " + t("examLocked"));
  });
  mp.appendChild(examCard);

  var examWrap = el("div", "mt");
  examWrap.appendChild(mp);
  right.appendChild(examWrap);
  grid.appendChild(right);

  /* ticker */
  var ticker = el("div", "ticker");
  ticker.appendChild(el("b", null, "📡 "));
  var tickText = el("span", null, t("ticker1"));
  ticker.appendChild(tickText);
  app.appendChild(ticker);
  stopTicker();
  tickerTimer = setInterval(function () {
    tickerIdx = (tickerIdx + 1) % 6;
    tickText.textContent = t("ticker" + (tickerIdx + 1));
  }, 6000);
}
function stopTicker() { if (tickerTimer) { clearInterval(tickerTimer); tickerTimer = null; } }

/* ---------------- mission screen ---------------- */
function renderMissionScreen(app) {
  if (!missionRT) { go("hq"); return; }
  var m = curMission();
  buildTopbar(app, { caseId: m.code + " · " + t("step") + " " + (missionRT.idx + 1) + "/" + m.steps.length });
  var wrap = el("div", "wrap");
  app.appendChild(wrap);
  var panel = el("div", "panel mt");
  wrap.appendChild(panel);
  renderStepInto(panel);

  /* restart + abort row */
  var row = el("div", "navrow no-print");
  var restart = el("button", "tbtn", "↺ " + t("restartMission"));
  restart.addEventListener("click", function () {
    openModal(function (mm, close) {
      mm.appendChild(el("h3", null, t("restartMission") + "?"));
      mm.appendChild(el("p", "dim", "Progress in this case file will reset." + (missionProg(missionRT.mid).doneOnce ? " XP is not re-earned on replays." : "")));
      var ok = el("button", "btn danger", "↺");
      ok.addEventListener("click", function () {
        delete state.missions[missionRT.mid];
        saveState();
        close();
        startMission(missionRT.mid);
        toast("↺ " + t("missionRestarted"));
      });
      ok.style.marginRight = "8px";
      var no = el("button", "btn ghost", t("close"));
      no.addEventListener("click", close);
      mm.appendChild(ok); mm.appendChild(no);
    });
  });
  row.appendChild(restart);
  panel.appendChild(row);
}

/* ---------------- manual ---------------- */
function renderManual(app) {
  buildTopbar(app);
  var wrap = el("div", "wrap");
  app.appendChild(wrap);
  var p = el("div", "panel mt");
  p.appendChild(el("h3", null, "📖 " + t("fieldManual")));
  p.appendChild(el("p", "faint", state.manual.length + " / " + MANUAL.length + " — " + (state.manual.length < MANUAL.length ? t("manualLocked") : t("translatedAll"))));
  var grid = el("div", "manual-grid");
  var cats = [];
  MANUAL.forEach(function (e) { if (cats.indexOf(e.cat) === -1) cats.push(e.cat); });
  cats.forEach(function (cat) {
    MANUAL.filter(function (e) { return e.cat === cat; }).forEach(function (e) {
      var unlocked = state.manual.indexOf(e.id) !== -1;
      var c = el("div", "man-card" + (unlocked ? "" : " locked"));
      c.appendChild(el("div", "cat", cat));
      c.appendChild(el("div", "term-word", unlocked ? e.en : "▓▓▓▓▓▓"));
      if (unlocked) {
        c.appendChild(el("div", null, e.def));
        c.appendChild(el("div", "langs", "ES: " + e.es + " · RU: " + e.ru));
      } else {
        c.appendChild(el("div", "faint", "🔒 " + t("manualLocked")));
      }
      grid.appendChild(c);
    });
  });
  p.appendChild(grid);
  wrap.appendChild(p);
}

/* ---------------- career guide ---------------- */
function renderGuide(app) {
  buildTopbar(app);
  var wrap = el("div", "wrap");
  app.appendChild(wrap);
  var p = el("div", "panel mt");
  p.appendChild(el("h3", null, "🧭 " + t("guideTitle")));
  p.appendChild(el("p", "dim", t("guideBack")));

  function section(title, items) {
    p.appendChild(el("div", "guide-h", title));
    items.forEach(function (it) {
      var d = el("div", "check-li", it);
      p.appendChild(d);
    });
  }
  section("1 · EDUCATION", [
    "🎓 Any bachelor's works; favorites: computer science, cybersecurity, criminal justice, accounting/finance (for financial crimes), data science.",
    "🔬 Alternative path: military service (Air Force/Army/Navy Cyber, USCYBERCOM) or community college + certifications — many feds rise this way."
  ]);
  section("2 · SKILLS TO BUILD (FREE/LEGAL)", [
    "🐧 Linux fundamentals + networking (how packets, DNS, and TLS actually work).",
    "🐍 Python or PowerShell scripting for automation and parsing.",
    "🔍 Free tools to learn TODAY: Autopsy (disk forensics), Wireshark (traffic), Volatility (memory), YARA (file signatures).",
    "🏋️ Legal practice ranges: picoCTF, TryHackMe (blue/team paths), CyberDefenders, Splunk/BOTS free editions. CTFs are the legal gym.",
    "🌐 Languages are a superpower: Spanish and Russian open entire crime-series portfolios. Keep this game's Language Desk habit."
  ]);
  section("3 · CERTIFICATIONS THAT SIGNAL REAL SKILLS", [
    "📜 Entry: CompTIA Security+, Network+, GCFE or CFCE (forensics), EnCE.",
    "📜 Advanced: GCFA (advanced forensics), GCIH (incident handling), GREM (malware), GNFA (network forensics).",
    "📜 Financial side: CFE (Certified Fraud Examiner) — fraud skills transfer everywhere."
  ]);
  section("4 · WHO HIRES CYBERCRIME FIGHTERS (US)", [
    "🏛 FBI — Forensic Examiner / Computer Scientist / Special Agent (cyber) — fbi.gov/work-for-us",
    "🛡 CISA — cyber defense, ICS defense, vulnerability analysis — cisa.gov/careers",
    "🚁 HSI (Homeland Security Investigations) — cyber crimes & child exploitation — ice.gov/careers",
    "🕵️ Secret Service — financial cybercrime, e-crimes task forces — secretservice.gov",
    "🧸 NCMEC — analysts on the child-safety front line — missingkids.org careers",
    "👮 State/local: ICAC task forces, state fusion centers, county digital forensics labs — often the fastest entry point.",
    "🎖️ Military & intelligence: USAF/Army/USN Cyber, NSOCM, CIA digital innovation — for cyber operations tracks."
  ]);
  section("5 · ETHICS — THE PART THAT MAKES YOU THE GOOD GUY", [
    "⚖️ Never investigate people on your own. No scanning strangers, no 'testing' sites, no vigilante stings. L shining = authorization.",
    "🧸 If you encounter child-exploitation material by accident: don't save/forward/delete it yourself — report (CyberTipline) and preserve for authorities.",
    "🧠 If you struggle with harmful urges: confidential help exists (Stop It Now, 1-888-773-8368). Asking early is strength.",
    "🤝 Report scams, fraud, and threats — most victims never do. Every report builds the pattern that catches the network."
  ]);
  section("6 · START THIS WEEK", [
    "📅 Day 1: install Linux (or WSL), do a TryHackMe intro path.",
    "📅 Day 3: hash three files, read one real CISA alert (cisa.gov/news-events).",
    "📅 Day 5: read a federal cybersecurity job posting; list every requirement and check your gaps.",
    "📅 Ongoing: keep a case-notes habit. Investigators are hired for their writing as much as their hacking."
  ]);
  section("7 · THE TWO FORKS (mirrors this game)", [
    "🕊️ GUARDIAN — Protective missions: crimes against children, human trafficking, elder & financial fraud, victims-first forensics. Real homes: NCMEC + ICAC task forces, HSI trafficking & child-exploitation units, FBI Violent Crimes Against Children, state DOJ labs. Certs: CFCE/CCE, HTCIA, OVC victim-centered trainings, CFE (fraud).",
    "🛰️ SENTINEL — National security: espionage implants, APT hunting, counterintelligence, ICS/grid defense, defense industrial base protection. Real homes: FBI Cyber Division & Counterintelligence, CISA threat hunting, HSI Cyber Crimes Center, USCYBERCOM / DIB analysts, CTI (cyber threat intel) teams. Certs: GCIH, GCFA, GCTI, GREM.",
    "🏆 DUAL: cross-trained specialists are rare and prized — an ICAC analyst who also reads APT indicators, a threat hunter who understands victim trauma responses. Let your case files decide where you start; let passion decide what you finish."
  ]);
  section("8 · LANGUAGES ARE FULL-ON WEAPONS", [
    "🇪🇸 SPANISH: the language of victims, of LATAM fraud rings, of trafficking corridors, of border-adjacent evidence. Your Guardian case files (Porch Light, Hidden Harbor) are Spanish-heavy on purpose — that is the real job.",
    "🇷🇺 RUSSIAN: the language of ransomware 'support numbers', APT config strings, dark-market shop talk, and state-adjacent crews. Your Sentinel case files (Deadbolt, Ghost Market, Firebreak) are Russian-heavy for the same reason.",
    "📚 Keep it sharp: free duolingo/Coursera, plus translate real headlines; a polyglot analyst walks into rooms few others can."
  ]);
  wrap.appendChild(p);
}

/* ---------------- archive ---------------- */
function renderArchive(app) {
  buildTopbar(app);
  var wrap = el("div", "wrap");
  app.appendChild(wrap);
  var p = el("div", "panel mt");
  p.appendChild(el("h3", null, "📁 " + t("archive")));
  var done = displayOrder().filter(function (e) { return missionProg(e.id).doneOnce; });
  if (!done.length) {
    p.appendChild(el("p footer dim", t("archiveEmpty")));
  } else {
    var cards = el("div", "cards");
    done.forEach(function (e) {
      var m = missionById(e.id);
      var prog = missionProg(e.id);
      var card = el("div", "mission-card");
      card.appendChild(el("div", "micon", m.icon));
      card.appendChild(el("div", "mcode", m.code));
      card.appendChild(el("div", "mtitle", m.title));
      var foot = el("div", "mfoot");
      foot.appendChild(el("span", "stars", trackBadge(trackCode(m.id)) + " · " + "★".repeat(prog.bestStars || 1) + "☆".repeat(3 - (prog.bestStars || 1))));
      foot.appendChild(el("span", "badge-done", "📂 " + t("caseFile")));
      card.appendChild(foot);
      card.addEventListener("click", function (id) { return function () { openArchiveCase(id); }; }(m.id));
      cards.appendChild(card);
    });
    p.appendChild(cards);
  }
  wrap.appendChild(p);
}
function openArchiveCase(id) {
  var m = missionById(id);
  if (!m) return;
  openModal(function (mm, close) {
    mm.appendChild(el("h3", null, m.code));
    var brief = null, debrief = null;
    m.steps.forEach(function (s) {
      if (s.type === "brief") brief = s;
      if (s.type === "debrief") debrief = s;
    });
    if (brief) {
      mm.appendChild(el("div", "guide-h", m.title + " — briefing"));
      brief.body.forEach(function (para) { mm.appendChild(el("p", "dim", para)); });
    }
    if (debrief) {
      mm.appendChild(el("div", "guide-h", t("debrief")));
      debrief.body.forEach(function (para) { mm.appendChild(el("p", "dim", para)); });
      if (debrief.notes && debrief.notes.length) {
        mm.appendChild(el("p", "faint", "📖 " + t("noteUnlocked") + ": " + debrief.notes.map(function (id2) {
          var e = null; MANUAL.forEach(function (x) { if (x.id === id2) e = x; }); return e ? e.en : id2;
        }).join(", ")));
      }
    }
    var ok = el("button", "btn", t("close"));
    ok.addEventListener("click", close);
    mm.appendChild(ok);
  });
}

/* ---------------- quick drills ---------------- */
var drillRT = null;
function startDrills() {
  drillRT = { qs: shuffle(EXAM_POOL).slice(0, 5), i: 0, score: 0, done: false, earned: 0 };
  go("drill");
}
function renderDrill(app) {
  buildTopbar(app);
  var wrap = el("div", "wrap");
  app.appendChild(wrap);
  var p = el("div", "panel mt");
  wrap.appendChild(p);

  if (!drillRT) {
    p.appendChild(el("h3", null, "⚡ " + t("drillsTitle")));
    p.appendChild(el("p", "dim", t("drillsIntro")));
    var start = el("button", "btn primary", "⚡ " + t("drillsTitle"));
    start.addEventListener("click", startDrills);
    p.appendChild(start);
    return;
  }

  if (drillRT.done) {
    p.appendChild(el("h3", null, "⚡ " + t("drillsDone")));
    p.appendChild(el("div", "exam-prog", t("examScore") + ": " + drillRT.score + " / " + drillRT.qs.length + " · +" + drillRT.earned + " XP"));
    var again = el("button", "btn primary mt", "⚡ " + t("drillsTitle"));
    again.addEventListener("click", function () { startDrills(); });
    var exit = el("button", "btn mt", t("drillsExit"));
    exit.addEventListener("click", function () { drillRT = null; go("hq"); });
    again.style.marginRight = "8px";
    p.appendChild(again); p.appendChild(exit);
    return;
  }

  var q = drillRT.qs[drillRT.i];
  p.appendChild(el("div", "exam-prog", (t("examQuestion") + " " + (drillRT.i + 1) + " / " + drillRT.qs.length).toUpperCase()));
  p.appendChild(el("div", "exam-q", q.q));
  var answered = false;
  var letters = "ABCD".split("");
  q.opts.forEach(function (o, i) {
    var b = el("button", "opt", "");
    b.appendChild(el("span", "key", letters[i] + "."));
    b.appendChild(document.createTextNode(o));
    b.addEventListener("click", function () {
      if (answered) return;
      answered = true;
      var good = i === q.correct;
      b.classList.add(good ? "good" : "bad");
      beep(good);
      if (good) {
        drillRT.score++;
        var qid = "q" + drillRT.qs.indexOf(q);
        if (!state.drills) state.drills = {};
        if (!state.drills[qid]) {
          state.drills[qid] = true;
          drillRT.earned += 15;
          addXP(15);
          toast("+15 " + t("xp"));
        }
      }
      var kids = p.querySelectorAll(".opt");
      for (var k = 0; k < kids.length; k++) if (kids[k] !== b) kids[k].disabled = true;
      showFB(p, good, good ? t("correctHead") : t("wrongHead"), q.why);
      var nb = el("button", "btn primary mt", drillRT.i < drillRT.qs.length - 1 ? t("next") : t("drillsDone"));
      nb.addEventListener("click", function () {
        drillRT.i++;
        if (drillRT.i >= drillRT.qs.length) drillRT.done = true;
        renderRoute();
      });
      p.appendChild(nb);
    });
    p.appendChild(b);
  });
}

/* ---------------- skills lab ---------------- */
var LABS = [
  { id: "l1", icon: "🧾", title: "Lab 01 · Hash like an examiner", tool: "the real HashLab",
    why: "Every 'hash match' in the case files is this exact command in real life.",
    steps: [
      "Windows: `certutil -hashfile file.docx SHA256` · Linux: `sha256sum file.docx` · mac: `shasum -a 256 file.docx`",
      "Hash any file twice — rename it between hashes. The hash never changes. Edit ONE character and it becomes a total stranger.",
      "PowerShell bonus: `Get-FileHash file.docx -Algorithm SHA256`"
    ] },
  { id: "l2", icon: "🔎", title: "Lab 02 · Expose metadata", tool: "the real MetaScope",
    why: "Files lie; metadata doesn't — and this is why Watchtower's sergeant got burned.",
    steps: [
      "Install ExifTool (free, exiftool.org): `exiftool photo.jpg` — or Windows: right-click → Properties → Details.",
      "Check a photo YOU took. Find the GPS coordinates if your camera had location on.",
      "Scrub it clean before sharing: `exiftool -gps:all= photo.jpg`"
    ] },
  { id: "l3", icon: "📧", title: "Lab 03 · Read an email's passport", tool: "the real LogLens",
    why: "The county-gov look-alike from Cold Chain dies at exactly this step.",
    steps: [
      "Gmail: open any message → ⋮ → 'Show original'. Outlook: File → Properties → Internet headers.",
      "Read the 'Received:' chain BOTTOM-UP — the lowest one is the true first hop.",
      "Check `Authentication-Results` for SPF/DKIM/DMARC — and whether Reply-To matches From."
    ] },
  { id: "l4", icon: "📊", title: "Lab 04 · Your first packet capture", tool: "Wireshark (free)",
    why: "Beacon telemetry without the felony — watch your own traffic.",
    steps: [
      "Install Wireshark (wireshark.org). Capture 60 seconds of your own browsing.",
      "Filter: `dns` — watch domains resolve to IPs in real time. That's C2-spotting vision.",
      "Try filter `tls` — you see WHO you talk to, not WHAT. That's why implants hide in TLS."
    ] },
  { id: "l5", icon: "🧵", title: "Lab 05 · Strings — the analyst's crowbar", tool: "binutils / Sysinternals",
    why: "The exact triage move from the Cold Chain and Firebreak terminals.",
    steps: [
      "Linux/mac: `strings suspicious.file | grep -i http` · Windows: Sysinternals Strings.exe.",
      "Run it on any installer or PDF you already own. Embedded URLs, registry paths, error strings fall out instantly.",
      "Note what human-readable strings reveal about a binary's intentions — no execution needed (static analysis)."
    ] },
  { id: "l6", icon: "🐧", title: "Lab 06 · Linux survival kit", tool: "WSL / any Linux",
    why: "The forensic workbench terminal is this, gamified — and interviews are in this dialect.",
    steps: [
      "Windows: `wsl --install` gives you Ubuntu in one command. mac/Linux: you're already there.",
      "Daily 15 minutes: `ls -la`, `cd`, `cat`, `grep -i needle file.txt`, `find . -name '*.log'`, `man grep`.",
      "Chain them: `find . -name '*.log' | xargs grep -li error` — that's analyst speed."
    ] },
  { id: "l7", icon: "🗄️", title: "Lab 07 · Disk forensics with Autopsy", tool: "Autopsy (free)",
    why: "The federal daily driver — the interface real examiners open every morning.",
    steps: [
      "Download Autopsy (sleuthkit.org). New case → add a data source: a USB stick you own.",
      "Run ingest modules: hash lookup, keyword search, recent activity, file type detection.",
      "Study the timeline it builds — that's the artifact of every case file you've read here."
    ] },
  { id: "l8", icon: "🧬", title: "Lab 08 · Memory forensics with Volatility", tool: "Volatility 3 (free)",
    why: "Firebreak's live-memory work, at home, completely legal.",
    steps: [
      "Get Volatility 3 (github.com/volatilityfoundation) + a practice memory image (they publish free samples).",
      "`vol -f sample.mem windows.info` — fingerprint the machine the way Firebreak's workbench did.",
      "Then `windows.pslist` and `windows.netscan` — catch the hidden beacon yourself."
    ] },
  { id: "l9", icon: "🏋️", title: "Lab 09 · The free ranges", tool: "picoCTF · TryHackMe · CyberDefenders",
    why: "The gyms where analysts are actually built — legal, guided, hands-on.",
    steps: [
      "picoCTF (free, beginner CTF by Carnegie Mellon) — start with the forensics challenges.",
      "TryHackMe blue-team learning paths and CyberDefenders investigations — real artifacts, guided.",
      "One evening a week. Log what you solve — that log becomes interview stories."
    ] }
];
function renderRich(parent, text) {
  var parts = text.split("`");
  parts.forEach(function (seg, i) {
    if (!seg) return;
    if (i % 2 === 1) parent.appendChild(el("span", "labcmd", seg));
    else parent.appendChild(document.createTextNode(seg));
  });
}
function renderLab(app) {
  buildTopbar(app);
  var wrap = el("div", "wrap");
  app.appendChild(wrap);
  var p = el("div", "panel mt");
  p.appendChild(el("h3", null, "🧪 " + t("labTitle")));
  p.appendChild(el("p", "dim", t("labIntro")));
  var safe = el("div", "callout sens");
  safe.appendChild(el("b", null, "🎯 "));
  safe.appendChild(document.createTextNode(t("labSafety")));
  p.appendChild(safe);
  var done = LABS.filter(function (l) { return state.labs && state.labs[l.id]; }).length;
  p.appendChild(el("div", "exam-prog", (t("labTitle") + ": " + done + " / " + LABS.length).toUpperCase()));
  var grid = el("div", "cards mt");
  LABS.forEach(function (lab) {
    var isDone = state.labs && state.labs[lab.id];
    var card = el("div", "man-card");
    card.appendChild(el("div", "cat", lab.tool));
    card.appendChild(el("div", "term-word", lab.icon + " " + lab.title));
    card.appendChild(el("div", "dim", lab.why));
    lab.steps.forEach(function (s) {
      var d = el("div", "check-li");
      renderRich(d, s);
      card.appendChild(d);
    });
    var btn = el("button", "btn mt" + (isDone ? "" : " primary"), isDone ? "✔ " + t("labDoneTag") : "☑ " + t("labCheck"));
    btn.disabled = !!isDone;
    btn.addEventListener("click", function () {
      if (recordLab(lab.id)) renderRoute();
    });
    card.appendChild(btn);
    grid.appendChild(card);
  });
  p.appendChild(grid);
  var back = el("button", "btn mt", t("backToHQ"));
  back.addEventListener("click", function () { go("hq"); });
  p.appendChild(back);
  wrap.appendChild(p);
}

/* ---------------- exam ---------------- */
var examRT = null;
function startExam() {
  var pool = shuffle(EXAM_POOL).slice(0, 12);
  examRT = { qs: pool, i: 0, score: 0, done: false };
  go("exam");
}
function renderExam(app) {
  buildTopbar(app);
  var wrap = el("div", "wrap");
  app.appendChild(wrap);
  var p = el("div", "panel mt");
  wrap.appendChild(p);

  if (!examRT) { startExam(); return; }

  if (examRT.done) {
    var passed = examRT.score >= 9;
    p.appendChild(el("h3", null, "🎓 " + t("examTitle")));
    p.appendChild(el("div", "exam-prog", t("examScore") + ": " + examRT.score + " / 12"));
    p.appendChild(el("p", "mt", passed ? t("examPassed") : t("examFailed")));
    p.appendChild(el("p", "faint", t("examIntro")));

    state.exam.attempts++;
    if (examRT.score > state.exam.best) state.exam.best = examRT.score;
    if (passed && !state.exam.passed) {
      state.exam.passed = true;
      addXP(300);
      awardAch("certified");
      if (state.track) toast("🛰️ " + t("trackRotation"), true);
    }
    saveState();

    if (passed) {
      var nameRow = el("div", "set-row");
      nameRow.appendChild(el("span", null, t("yourName")));
      var nameInput = el("input");
      nameInput.type = "text";
      nameInput.value = state.certName || "";
      nameInput.addEventListener("input", function () { state.certName = nameInput.value; saveState(); });
      nameRow.appendChild(nameInput);
      p.appendChild(nameRow);
      var goCert = el("button", "btn primary mt", "🎓 " + t("print"));
      goCert.addEventListener("click", function () { go("cert"); });
      p.appendChild(goCert);
    }
    var again = el("button", "btn mt", "↺ " + t("retake"));
    again.addEventListener("click", function () { startExam(); });
    p.appendChild(again);
    return;
  }

  var q = examRT.qs[examRT.i];
  p.appendChild(el("div", "exam-prog", (t("examQuestion") + " " + (examRT.i + 1) + " / 12").toUpperCase()));
  p.appendChild(el("div", "exam-q", q.q));
  var answered = false;
  var letters = "ABCD".split("");
  q.opts.forEach(function (o, i) {
    var b = el("button", "opt", "");
    b.appendChild(el("span", "key", letters[i] + "."));
    b.appendChild(document.createTextNode(o));
    b.addEventListener("click", function () {
      if (answered) return;
      answered = true;
      var good = i === q.correct;
      if (good) examRT.score++;
      b.classList.add(good ? "good" : "bad");
      beep(good);
      var kids = p.querySelectorAll(".opt");
      for (var k = 0; k < kids.length; k++) {
        if (kids[k] !== b) kids[k].disabled = true;
      }
      showFB(p, good, good ? t("correctHead") : t("wrongHead"), q.why);
      var nextBtn = el("button", "btn primary mt", examRT.i < 11 ? t("next") : t("submit"));
      nextBtn.addEventListener("click", function () {
        examRT.i++;
        if (examRT.i >= 12) examRT.done = true;
        renderRoute();
      });
      p.appendChild(nextBtn);
    });
    p.appendChild(b);
  });
}

/* ---------------- certificate ---------------- */
function renderCert(app) {
  buildTopbar(app);
  var wrap = el("div", "wrap");
  app.appendChild(wrap);
  var p = el("div", "panel mt");
  wrap.appendChild(p);
  var cert = el("div", "cert");
  cert.appendChild(el("div", "seal", dualComplete() ? "🏆" : "🛡️"));
  cert.appendChild(el("div", "faint", "NATIONAL CYBER INVESTIGATION BUREAU — TRAINING DIVISION (FICTIONAL)"));
  var titleKey = dualComplete() ? "certifiedDual" : "certified";
  cert.appendChild(el("h2", null, t(titleKey)));
  cert.appendChild(el("div", "name", state.certName || "—"));
  var done = 0;
  displayOrder().forEach(function (e) { if (missionProg(e.id).doneOnce) done++; });
  cert.appendChild(el("div", "dim", t("casesClosed") + ": " + done + " / " + displayOrder().length + " · XP " + state.xp + " · " + t("achievements") + ": " + state.ach.length + "/" + ACH_DEFS.length));
  if (state.track) cert.appendChild(el("div", "dim", t("trackSpecialty") + ": " + t(TRACK_FOR[state.track] === "guardian" ? "trackGuardianName" : "trackSentinelName")));
  cert.appendChild(el("div", "faint mt", "Completed this specialization's case files and passed the final certification examination of this training simulation. Fictional credential — for motivation, not for résumés. The real ones are in the Career Guide."));
  p.appendChild(cert);
  var row = el("div", "navrow no-print");
  var pr = el("button", "btn primary", "🖨 " + t("print"));
  pr.addEventListener("click", function () { window.print(); });
  var back = el("button", "btn", t("backToHQ"));
  back.addEventListener("click", function () { go("hq"); });
  row.appendChild(back); row.appendChild(pr);
  p.appendChild(row);
}

/* ---------------- ambient fx: code rain + boot sequence ---------------- */
var rainRAF = null;
function initRain() {
  try {
    if (rainRAF || document.getElementById("fx-rain")) return;
    if (window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    var c = document.createElement("canvas");
    if (typeof c.getContext !== "function") return;
    c.id = "fx-rain";
    document.body.appendChild(c);
    var g = c.getContext("2d");
    // the rain literally spells in all three case languages
    var chars = "01<>{}[]/\\|=+*#ABCDEFabcdefАБВГДЕЖЗИКЛМНОПРСТУФХЦЧШЩÑÁÉÍÓÚÜñ";
    var fontsize = 14, cols = 0, drops = [], W = 0, H = 0;
    var raf = window.requestAnimationFrame || function () { return 0; };
    function resize() {
      W = c.width = window.innerWidth; H = c.height = window.innerHeight;
      cols = Math.max(1, Math.floor(W / fontsize));
      drops = [];
      for (var i = 0; i < cols; i++) drops[i] = Math.floor(Math.random() * H / fontsize);
    }
    resize();
    window.addEventListener("resize", resize);
    var last = 0;
    function frame(ts) {
      rainRAF = raf(frame);
      if (ts - last < 66) return;
      last = ts;
      if (document.hidden) return;
      if (!state || !state.settings || !state.settings.rain) { g.clearRect(0, 0, W, H); return; }
      g.fillStyle = "rgba(10,14,20,0.32)";
      g.fillRect(0, 0, W, H);
      g.font = fontsize + "px monospace";
      for (var i = 0; i < drops.length; i++) {
        var ch = chars[Math.floor(Math.random() * chars.length)];
        var y = drops[i] * fontsize;
        g.fillStyle = Math.random() < 0.045 ? "rgba(125,232,216,0.9)" : "rgba(53,208,186,0.5)";
        g.fillText(ch, i * fontsize, y);
        drops[i] = (y > H && Math.random() > 0.975) ? 0 : drops[i] + 1;
      }
    }
    rainRAF = raf(frame);
  } catch (e) {}
}
var bootShown = false;
function playBootFX() {
  if (bootShown) return;
  bootShown = true;
  if (window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
  try {
    var ov = el("div", "bootfx");
    var lines = [
      "NCIB FIELD TERMINAL v3.1",
      "boot: integrity check .......... OK",
      "mount: /evidence (read-only) ... OK",
      "load: hashlab / metascope ...... OK",
      "load: polyglot [ES · RU] ....... OK",
      "link: NCMEC · IC3 · CISA ....... OK",
      "operator profile: RECRUIT",
      "welcome to the bureau."
    ];
    var i = 0;
    function next() {
      if (i >= lines.length) {
        setTimeout(function () {
          ov.classList.add("done");
          setTimeout(function () { if (ov.parentNode) ov.parentNode.removeChild(ov); }, 650);
        }, 420);
        return;
      }
      ov.appendChild(el("div", "bline", lines[i++]));
      SFX.blip();
      setTimeout(next, 150 + Math.random() * 130);
    }
    ov.addEventListener("click", function () {
      ov.classList.add("done");
      setTimeout(function () { if (ov.parentNode) ov.parentNode.removeChild(ov); }, 550);
    });
    document.body.appendChild(ov);
    setTimeout(next, 220);
  } catch (e) {}
}

/* ---------------- boot ---------------- */
function boot() {
  MISSIONS = MISSIONS_A.concat(MISSIONS_B, MISSIONS_C, MISSIONS_D);
  state = loadState();
  applyScanlines();
  applyAudio();
  initRain();
  var toasts = el("div"); toasts.id = "toasts";
  document.body.appendChild(toasts);
  renderRoute();
}
window.addEventListener("DOMContentLoaded", boot);
