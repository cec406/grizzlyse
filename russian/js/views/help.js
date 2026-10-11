// Help / how to use.
import { esc } from '../ui.js';

export function render() {
  return `
  <section class="help">
    <h1>По́мощь <small>help &amp; how to use</small></h1>
    <div class="guide-list">
      <details class="guide" open>
        <summary>How do I start?</summary>
        <p>Two paths: <a href="#/alphabet">learn the alphabet</a> first (best for true beginners), or <a href="#/placement">take the placement test</a> and start at your level. Then follow <a href="#/lessons">the course</a>.</p>
      </details>
      <details class="guide">
        <summary>How does written-first work?</summary>
        <p>You learn Cyrillic reading, spelling and typing before stressing audio. Audio is optional everywhere — a 🔊 button next to words. This builds reading speed and spelling accuracy, which transfer to everything else.</p>
      </details>
      <details class="guide">
        <summary>What are the 44 units?</summary>
        <p>A1 (1-10): you, greetings, numbers, family, basics. A2 (11-22): daily life, food, home, city. B1 (23-34): opinions, work, health, travel. B2 (35-44): society, news, abstract ideas.</p>
      </details>
      <details class="guide">
        <summary>How does the review queue work?</summary>
        <p>Every wrong answer in any game schedules that word in your <a href="#/review">Daily Review</a>. Each card lives in an SRS box — correct answers move it to rarer review, misses demote it. Review a few minutes daily instead of cramming.</p>
      </details>
      <details class="guide">
        <summary>Where is my progress stored?</summary>
        <p>Locally in your browser (localStorage). You can <a href="#/progress">export it as JSON</a> and import it on another device. Nothing leaves your machine.</p>
      </details>
      <details class="guide">
        <summary>Stress marks look strange</summary>
        <p>Stress is shown with the combining acute mark (e.g. приве́т). It is part of the word in this app — but answer checks ignore it, so typing привет also passes.</p>
      </details>
      <details class="guide">
        <summary>Audio buttons don\'t work</summary>
        <p>Visit <a href="#/audio-setup">Audio setup</a> — the app needs a Russian speech voice installed on your system. The whole app works fine without it.</p>
      </details>
      <details class="guide">
        <summary>Why do answer boxes accept ё=е?</summary>
        <p>Russian speakers often type е for ё. The checker treats them as equal, plus it ignores stress, case and punctuation.</p>
      </details>
      <details class="guide">
        <summary>Keyboard shortcuts</summary>
        <ul>
          <li><b>Enter</b> in any typing box = check answer.</li>
          <li><b>#/lessons</b> — course index; type the hash manually to jump anywhere.</li>
        </ul>
      </details>
    </div>
    <h2 class="sec">Routes</h2>
    <div class="route-grid">
      ${ROUTES.map(([h, d]) => `<a class="route-row" href="${h}"><code>${h}</code><span>${esc(d)}</span></a>`).join('')}
    </div>
  </section>`;
}

const ROUTES = [
  ['#/home', 'Dashboard'],
  ['#/alphabet', 'Letters, sounds, reading groups, pronunciation guides'],
  ['#/lessons', '44-unit course from zero to B2'],
  ['#/practice', '12 practice games on any unit/level'],
  ['#/review', 'SRS daily review queue'],
  ['#/reading', 'Graded reading texts'],
  ['#/grammar', 'Grammar reference tables'],
  ['#/progress', 'Stats, badges, export/import'],
  ['#/audio-setup', 'Get a Russian TTS voice'],
  ['#/placement', 'Placement test'],
  ['#/help', 'This page']
];

export function attach() { /* static */ }