// Help / how to use.
import { esc } from '../ui.js';

export function render() {
  return `
  <section class="help">
    <h1>Ayuda <small>help &amp; how to use</small></h1>
    <div class="guide-list">
      <details class="guide" open>
        <summary>How do I start?</summary>
        <p>Two paths: <a href="#/alphabet">learn the alphabet</a> first (best for true beginners), or <a href="#/placement">take the placement test</a> and start at your level. Then follow <a href="#/lessons">the course</a>.</p>
      </details>
      <details class="guide">
        <summary>How does written-first work?</summary>
        <p>You learn Spanish reading, spelling and typing before stressing audio. Audio is optional everywhere — a 🔊 button next to words. This builds reading speed and spelling accuracy, which transfer to everything else.</p>
      </details>
      <details class="guide">
        <summary>What are the 48 units?</summary>
        <p>A1 (1-10): greetings, numbers, family, food, travel basics. A2 (11-20): daily life, shopping, health, work, the past. B1 (21-30): opinions, subjunctive, travel, media. B2 (31-40): society, science, history, argument. C1 (41-48): formal register, Caribbean and regional Spanish, nuance and proficiency-exam prep.</p>
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
        <summary>Accents look strange</summary>
        <p>Spanish marks stress and a few letter sounds with an accent: á é í ó ú ü ñ. It is part of the spelling, but answer checks ignore accents — typing <b>cafe</b> for <b>café</b> also passes.</p>
      </details>
      <details class="guide">
        <summary>Audio buttons don\'t work</summary>
        <p>Visit <a href="#/audio-setup">Audio setup</a> — the app needs a Spanish speech voice installed on your system. The whole app works fine without it.</p>
      </details>
      <details class="guide">
        <summary>Sound effects &amp; auto-speak</summary>
        <p>Games play a chime for right answers and a soft buzz for misses, and by default they <b>speak each Spanish word aloud</b> as you check it. Turn either off in <a href="#/audio-setup">Audio setup → Fun &amp; sound</a>. Pass a unit test or get a perfect run and you get confetti. 🎉</p>
      </details>
      <details class="guide">
        <summary>Play a whole dialogue or reading aloud</summary>
        <p>Open any <a href="#/lessons">unit</a> and press <b>🔊 Escuchar todo</b> to hear the dialogue line by line, or <b>🔊 Leer en voz alta</b> to hear the reading text read top to bottom.</p>
      </details>
      <details class="guide">
        <summary>Why do answer boxes accept “cafe” for “café”?</summary>
        <p>Typing accents on some keyboards is fiddly, so the checker treats accented and unaccented letters as equal, and it ignores case and punctuation too. It still checks the actual words.</p>
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
  ['#/lessons', '48-unit course from zero to fluency (A1 to C1)'],
  ['#/practice', '12 practice games on any unit/level'],
  ['#/review', 'SRS daily review queue'],
  ['#/reading', 'Graded reading texts, A1 to B2'],
  ['#/dialects', 'Regional slang and accents: Puerto Rico, Mexico, Spain and more'],
  ['#/grammar', 'Grammar reference tables'],
  ['#/progress', 'Stats, badges, export/import'],
  ['#/audio-setup', 'Get a Spanish TTS voice'],
  ['#/placement', 'Placement test'],
  ['#/help', 'This page']
];

export function attach() { /* static */ }