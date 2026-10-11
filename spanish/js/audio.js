// Text-to-speech wrapper. Never throws. App works fully without audio.

let voicesCache = null;
let voiceListeners = [];

export function hasSpeech() {
  return typeof globalThis.window !== 'undefined' && !!globalThis.window.speechSynthesis;
}

function synth() {
  return hasSpeech() ? globalThis.window.speechSynthesis : null;
}

export function loadVoices() {
  const s = synth();
  if (!s) return [];
  const list = Array.isArray(s.getVoices()) ? s.getVoices() : [];
  if (list.length) voicesCache = list;
  return list;
}

// Chrome loads voices asynchronously; poll and notify.
export function onVoicesReady(cb) {
  const s = synth();
  if (!s) { cb([]); return () => {}; }
  loadVoices();
  const fire = () => cb(loadVoices());
  if (voicesCache && voicesCache.length) fire();
  voiceListeners.push(fire);
  s.addEventListener && s.addEventListener('voiceschanged', fire);
  let tries = 0;
  const iv = setInterval(() => {
    tries++;
    loadVoices();
    if (voicesCache && voicesCache.length) { clearInterval(iv); fire(); }
    else if (tries > 30) { clearInterval(iv); fire(); }
  }, 300);
  return () => { clearInterval(iv); s.removeEventListener && s.removeEventListener('voiceschanged', fire); };
}

export function spanishVoices() {
  return (loadVoices() || []).filter((v) => /^es/i.test(String(v.lang || '')));
}

export function bestVoice() {
  const es = spanishVoices();
  return es[0] || null;
}

export function speak(text, rate = 1) {
  const s = synth();
  if (!s) return false;
  try { s.cancel(); } catch { /* ignore */ }
  const v = bestVoice();
  try {
    const u = new SpeechSynthesisUtterance(text);
    u.lang = 'es-ES';
    u.rate = rate;
    if (v) u.voice = v;
    s.speak(u);
    return true;
  } catch { return false; }
}

export function speakSlow(text) {
  return speak(text, 0.7);
}

export function isAvailable() {
  return hasSpeech() && spanishVoices().length > 0;
}
