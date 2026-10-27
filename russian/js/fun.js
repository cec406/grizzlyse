// Fun & audio layer for RussianPod: synthesised sound effects, confetti,
// playful level titles, and auto-speak. Everything is optional, guarded and
// never throws — the app works identically with all of it turned off.
import { settings } from './state.js';
import { speak } from './audio.js';

// ---------- sound effects (WebAudio, no audio files) ----------
let ctx = null;
function ac() {
  if (ctx) return ctx;
  const C = typeof window !== 'undefined' ? (window.AudioContext || window.webkitAudioContext) : null;
  if (!C) return null;
  try { ctx = new C(); } catch { return null; }
  return ctx;
}

function tone(freq, start, dur, type = 'sine', gain = 0.1) {
  const c = ac();
  if (!c) return;
  try {
    const t = c.currentTime + start;
    const o = c.createOscillator();
    const g = c.createGain();
    o.type = type;
    o.frequency.value = freq;
    g.gain.setValueAtTime(0.0001, t);
    g.gain.exponentialRampToValueAtTime(gain, t + 0.02);
    g.gain.exponentialRampToValueAtTime(0.0001, t + dur);
    o.connect(g); g.connect(c.destination);
    o.start(t); o.stop(t + dur + 0.05);
  } catch { /* ignore */ }
}

// kind: 'click' | 'correct' | 'wrong' | 'win'
export function play(kind) {
  let sfxOn = true;
  try { sfxOn = !!settings().sfx; } catch { /* keep default */ }
  if (!sfxOn) return;
  switch (kind) {
    case 'click': tone(520, 0, 0.06, 'triangle', 0.07); break;
    case 'correct': tone(660, 0, 0.12); tone(880, 0.09, 0.16); break;
    case 'wrong': tone(196, 0, 0.18, 'sawtooth', 0.07); tone(147, 0.16, 0.24, 'sawtooth', 0.06); break;
    case 'win': [523, 659, 784, 1047].forEach((f, i) => tone(f, i * 0.11, 0.18)); break;
    default: break;
  }
}

// ---------- confetti (pure DOM + CSS, no assets) ----------
const CONFETTI_COLORS = ['#ef476f', '#ffd166', '#06d6a0', '#118ab2', '#f78c6b', '#c77dff'];

export function confetti(el, count = 70) {
  if (typeof document === 'undefined' || !el || !el.appendChild) return;
  const reduced = typeof window !== 'undefined' && window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (reduced) return;
  try {
    const wrap = document.createElement('div');
    wrap.className = 'confetti-wrap';
    wrap.setAttribute('aria-hidden', 'true');
    for (let i = 0; i < count; i++) {
      const p = document.createElement('i');
      p.className = 'confetti';
      p.style.left = `${(Math.random() * 100).toFixed(1)}%`;
      p.style.background = CONFETTI_COLORS[(Math.random() * CONFETTI_COLORS.length) | 0];
      p.style.transform = `rotate(${(Math.random() * 360) | 0}deg)`;
      p.style.animationDelay = `${(Math.random() * 0.5).toFixed(2)}s`;
      p.style.animationDuration = `${(0.8 + Math.random() * 1.2).toFixed(2)}s`;
      wrap.appendChild(p);
    }
    el.appendChild(wrap);
    setTimeout(() => { try { wrap.remove(); } catch { /* ignore */ } }, 3200);
  } catch { /* ignore */ }
}

// ---------- playful level titles (Russian-learning flavoured) ----------
const TITLES = [
  'Новичо́к',              // 1 beginner
  'Чита́тель',             // 2 reader
  'Знато́к а́збуки',        // 3 alphabet expert
  'Люби́тель ча́я',         // 4 tea lover
  'Друг двора́',           // 5 neighbourhood friend
  'Путеше́ственник',       // 6 traveller
  'Собесе́дник',           // 7 conversation partner
  'Гид по Москве́',        // 8 Moscow guide
  'Знато́к поэ́зии',        // 9 poetry connoisseur
  'Храни́тель исто́рий',    // 10 keeper of stories
  'Ма́стер падеже́й',       // 11 case master
  'Знато́к культу́ры',      // 12 culture expert
  'Расска́зчик',           // 13 storyteller
  'Диплома́т',             // 14 diplomat
  'Ма́стер глаго́лов',      // 15 verb master
  'Журнали́ст',            // 16 journalist
  'Страте́г',              // 17 strategist
  'Перево́дчик',           // 18 translator
  'Ма́стер а́спекта',       // 19 aspect master
  'Леге́нда'               // 20+ legend
];

export function levelTitle(level) {
  const n = Number(level) || 1;
  return TITLES[Math.min(n - 1, TITLES.length - 1)];
}

// ---------- auto-speak (opt-out in audio setup) ----------
export function autoSpeak(text) {
  if (!text) return false;
  let on = true;
  try { on = !!settings().autoSpeak; } catch { /* keep default */ }
  if (!on) return false;
  return speak(text, 0.75);
}

// Read a list of lines aloud, one after another.
export function speakLines(lines, msPer = 2300) {
  const list = (lines || []).filter(Boolean);
  list.forEach((ln, i) => setTimeout(() => speak(ln, 0.75), i * msPer));
}