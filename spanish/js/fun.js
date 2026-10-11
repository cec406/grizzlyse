// Fun & audio layer: synth sound effects, confetti, playful level titles,
// and auto-speak. Everything is optional, guarded, and never throws —
// the app works identically with all of this off.
import { settings } from './state.js';
import { speak } from './audio.js';

// ---------- Sound effects (WebAudio, no audio files needed) ----------

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

// ---------- Confetti (pure DOM + CSS, no assets) ----------

const CONFETTI_COLORS = ['#ef476f', '#ffd166', '#06d6a0', '#118ab2', '#f78c6b', '#c77dff'];

export function confetti(el, count = 70) {
  if (typeof document === 'undefined' || !el || !el.appendChild) return;
  try {
    const wrap = document.createElement('div');
    wrap.className = 'confetti-wrap';
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

// ---------- Playful level titles (Puerto Rico flavour) ----------

const TITLES = [
  'Bebé en la isla',        // 1
  'Turista curioso',        // 2
  'Coquí nocturno',         // 3
  'Café con leche',         // 4
  'Salsero principiante',   // 5
  'Amigo del barrio',       // 6
  'Plátano verde',          // 7
  'Guía del Viejo San Juan',// 8
  'Comelón de mofongo',     // 9
  'Rana coquí',             // 10
  'Jangueador',             // 11
  'Chapuzón caribeño',      // 12
  'Bailarín de salsa',      // 13
  'Cuentacuentos',          // 14
  'Picheador',              // 15
  'Dueño del colmado',      // 16
  'Estratega boricua',      // 17
  'Diplomático caribeño',   // 18
  'Maestro del subjuntivo', // 19
  'Leyenda de la isla'      // 20+
];

export function levelTitle(level) {
  const n = Number(level) || 1;
  return TITLES[Math.min(n - 1, TITLES.length - 1)];
}

// ---------- Auto-speak (opt-out in audio setup) ----------

export function autoSpeak(text) {
  if (!text) return false;
  let on = true;
  try { on = !!settings().autoSpeak; } catch { /* keep default */ }
  if (!on) return false;
  return speak(text, 0.75);
}

// Read a list of lines aloud, one after another, slowly.
export function speakLines(lines, msPer = 2300) {
  const list = (lines || []).filter(Boolean);
  list.forEach((ln, i) => setTimeout(() => speak(ln, 0.75), i * msPer));
}