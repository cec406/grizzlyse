// Audio setup: detect Russian TTS voices, test them, install guides.
import { esc } from '../ui.js';
import { russianVoices, isAvailable, speak, onVoicesReady } from '../audio.js';
import { settings, setSettings } from '../state.js';
import { play, confetti } from '../fun.js';

export function render() {
  const s = settings();
  return `
  <section class="audio-setup">
    <h1>Настро́йка зву́ка <small>audio setup</small></h1>
    <p class="lead">The whole app works with no audio. But a Russian voice makes pronunciation 10× easier. This page finds yours.</p>
    <div class="voice-box">
      <h2>Detected voices</h2>
      <div data-slot="voices"><p class="hint">Detecting…</p></div>
      <div class="btn-row">
        <button type="button" class="primary" data-action="test">🔊 Test Russian voice — «Привет, как дела?»</button>
        <button type="button" class="primary" data-action="slow">🐢 Slow voice — «Я учу русский язык»</button>
      </div>
      <div class="hint-box" data-slot="status"></div>
    </div>

    <h2 class="sec">Install a Russian voice</h2>
    <p class="lead">If no Russian voice is present, install one for free. Russian text-to-speech comes with the OS on every platform.</p>
    <details class="guide" open>
      <summary>Windows 10 / 11</summary>
      <ol>
        <li>Settings → <b>Time &amp; Language</b> → <b>Language &amp; region</b> → <b>Add a language</b> → add <b>Russian</b>.</li>
        <li>After install, click Russian → <b>Language options</b> → <b>Speech</b> → download the speech pack.</li>
        <li>Restart Chrome. Refresh this page — the voice should appear above.</li>
      </ol>
    </details>
    <details class="guide">
      <summary>macOS</summary>
      <ol>
        <li>System Settings → <b>Accessibility</b> → <b>Spoken Content</b> → <b>System Voice</b> → <b>Manage Voices…</b></li>
        <li>Install the <b>Milena</b> (Russian) voice.</li>
        <li>Chrome's built-in voices may not include it — System Settings voice works in Safari; install Google's offline voices in Chrome if missing.</li>
      </ol>
    </details>
    <details class="guide">
      <summary>Linux (Chrome)</summary>
      <ol>
        <li>Install a speech engine: <code>sudo apt install speech-dispatcher espeak-ng</code></li>
        <li>Enable it: <code>sudo systemctl enable speech-dispatcher</code></li>
        <li>Install a Russian voice for espeak-ng: usually included (espeak-ng data). Reinstall/restart Chrome afterwards.</li>
        <li>You can also run <code>spd-say -l ru "Привет"</code> in a terminal to test the engine.</li>
      </ol>
    </details>
    <details class="guide">
      <summary>Android (Chrome)</summary>
      <ol>
        <li>Install <b>Google Speech Services</b> from Play Store (usually preinstalled).</li>
        <li>Settings → Accessibility → Text-to-speech output → choose Google voice engine.</li>
        <li>Tap the ⚙ next to it → download the Russian voice pack.</li>
      </ol>
    </details>
    <details class="guide">
      <summary>Troubleshooting</summary>
      <ul>
        <li>Chrome loads voices asynchronously — refreshing this page usually fixes "no voices".</li>
        <li>Ensure your system language is set to a language that ships Russian voices, or add Russian.</li>
        <li>No audio in the browser? Check that the tab audio isn't muted.</li>
        <li>Speech in this app only plays <b>after a click</b> (browser rule).</li>
      </ul>
    </details>
    <p class="hint">These same instructions are in <code>README.md</code>.</p>

    <h2 class="sec">Fun &amp; sound</h2>
    <p class="lead">Little chimes keep games lively. Auto-speak reads the Russian aloud after every question, and flashcard words speak themselves when you flip them.</p>
    <div class="opt-list">
      <label class="opt"><input type="checkbox" data-setting="sfx" ${s.sfx ? 'checked' : ''}> <b>Sound effects</b> <span>chimes for right answers, a soft buzz for “not quite”</span></label>
      <label class="opt"><input type="checkbox" data-setting="autoSpeak" ${s.autoSpeak ? 'checked' : ''}> <b>Auto-speak answers</b> <span>hear each Russian word right as you check it</span></label>
    </div>
    <div class="btn-row">
      <button type="button" class="btn" data-action="sfx-correct">🔔 Correct chime</button>
      <button type="button" class="btn" data-action="sfx-wrong">😕 Not-quite sound</button>
      <button type="button" class="btn" data-action="sfx-win">🏆 Fanfare</button>
      <button type="button" class="btn" data-action="confetti-test">🎉 Confetti!</button>
    </div>
  </section>`;
}

export function attach(root) {
  const s = settings();
  const slot = root.querySelector('[data-slot="voices"]');
  const status = root.querySelector('[data-slot="status"]');
  const paint = () => {
    if (!slot) return;
    const voices = russianVoices();
    const all = (typeof window !== 'undefined' && window.speechSynthesis && window.speechSynthesis.getVoices()) || [];
    slot.innerHTML = all.length
      ? `<p><b>${all.length}</b> voices found · <b class="${voices.length ? 'ok' : 'bad'}">${voices.length} Russian</b></p>
        ${voices.map((v) => `<div class="voice-row">${esc(v.name)} — <code>${esc(v.lang)}</code></div>`).join('')}`
      : '<p class="hint">No voices detected yet. Click the test button — browsers load voices on demand.</p>';
    if (status) {
      status.innerHTML = isAvailable()
        ? '<div class="banner ok-banner">Russian voice ready — audio buttons work everywhere in the app.</div>'
        : '<div class="banner warn">No Russian voice yet — follow the install guide below, or keep learning with transliteration.</div>';
    }
  };
  onVoicesReady(paint);
  paint();
  if (!root.addEventListener) return;
  root.addEventListener('click', (e) => {
    const b = e.target.closest ? e.target.closest('[data-action]') : null;
    const a = b && b.getAttribute('data-action');
    if (a === 'test') { const ok = speak('Привет, как дела?'); flash(status, ok); }
    if (a === 'slow') { const ok = speak('Я учу русский язык', 0.7); flash(status, ok); }
    if (a === 'reload') location.reload();
    if (a === 'sfx-correct') { play('correct'); flash(status, `<div class="banner ok-banner">Correct chime — did you hear it?</div>`); }
    if (a === 'sfx-wrong') { play('wrong'); flash(status, '<div class="banner">That soft buzz is the “not quite” sound.</div>'); }
    if (a === 'sfx-win') { play('win'); flash(status, '<div class="banner ok-banner">Fanfare! You hear this on perfect runs and when you pass a unit test.</div>'); }
    if (a === 'confetti-test') confetti(root);
    setTimeout(paint, 400);
  });
  root.addEventListener('change', (e) => {
    const c = e.target && e.target.matches && e.target.matches('[data-setting]') ? e.target : null;
    if (!c) return;
    setSettings({ [c.getAttribute('data-setting')]: c.checked });
  });
}

function flash(el, ok) {
  if (!el) return;
  el.innerHTML = `<div class="banner ${ok ? 'ok-banner' : 'warn'}">${ok ? 'Speaking… did you hear it?' : 'Speaking failed — install a Russian voice first.'}</div>`;
}