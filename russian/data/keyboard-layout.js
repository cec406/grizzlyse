// Russian keyboard trainer data.
//
// Two things a learner needs:
//  1. The mapping between a US/ANSI physical key and the Russian letter that key
//     produces under the standard ЙЦУКЕН layout (so the app works whether or not
//     the OS Russian layout is installed — we translate Latin keydowns for you).
//  2. Touch-typing muscle memory: which finger owns which key, and graded drills.

// Standard touch-typing finger assignment. Colors are applied in css/styles.css.
export const FINGERS = {
  'l-pinky': { label: 'Left pinky', short: 'L5', color: 'f-l5' },
  'l-ring': { label: 'Left ring', short: 'L4', color: 'f-l4' },
  'l-middle': { label: 'Left middle', short: 'L3', color: 'f-l3' },
  'l-index': { label: 'Left index', short: 'L2', color: 'f-l2' },
  'r-index': { label: 'Right index', short: 'R2', color: 'f-r2' },
  'r-middle': { label: 'Right middle', short: 'R3', color: 'f-r3' },
  'r-ring': { label: 'Right ring', short: 'R4', color: 'f-r4' },
  'r-pinky': { label: 'Right pinky', short: 'R5', color: 'f-r5' },
  space: { label: 'Thumbs', short: 'SP', color: 'f-sp' }
};

// Each row is an array of { ru, us, upper, finger }. `us` is the physical key on a
// US layout. Digits/symbols are identical in both layouts, so ru === us there.
export const KEY_ROWS_DATA = [
  {
    name: 'Number row',
    note: 'Digits and the - = keys match English. Only ` becomes ё.',
    keys: [
      { ru: 'ё', upper: 'Ё', us: '`', finger: 'l-pinky' },
      { ru: '1', upper: '1', us: '1', finger: 'l-pinky', same: true },
      { ru: '2', upper: '2', us: '2', finger: 'l-ring', same: true },
      { ru: '3', upper: '3', us: '3', finger: 'l-middle', same: true },
      { ru: '4', upper: '4', us: '4', finger: 'l-index', same: true },
      { ru: '5', upper: '5', us: '5', finger: 'l-index', same: true },
      { ru: '6', upper: '6', us: '6', finger: 'r-index', same: true },
      { ru: '7', upper: '7', us: '7', finger: 'r-index', same: true },
      { ru: '8', upper: '8', us: '8', finger: 'r-middle', same: true },
      { ru: '9', upper: '9', us: '9', finger: 'r-ring', same: true },
      { ru: '0', upper: '0', us: '0', finger: 'r-pinky', same: true },
      { ru: '-', upper: '_', us: '-', finger: 'r-pinky', same: true },
      { ru: '=', upper: '+', us: '=', finger: 'r-pinky', same: true }
    ]
  },
  {
    name: 'Top row',
    note: 'The ten most-used consonants sit here.',
    keys: [
      { ru: 'й', upper: 'Й', us: 'q', finger: 'l-pinky' },
      { ru: 'ц', upper: 'Ц', us: 'w', finger: 'l-ring' },
      { ru: 'у', upper: 'У', us: 'e', finger: 'l-middle' },
      { ru: 'к', upper: 'К', us: 'r', finger: 'l-index' },
      { ru: 'е', upper: 'Е', us: 't', finger: 'l-index' },
      { ru: 'н', upper: 'Н', us: 'y', finger: 'r-index' },
      { ru: 'г', upper: 'Г', us: 'u', finger: 'r-index' },
      { ru: 'ш', upper: 'Ш', us: 'i', finger: 'r-middle' },
      { ru: 'щ', upper: 'Щ', us: 'o', finger: 'r-ring' },
      { ru: 'з', upper: 'З', us: 'p', finger: 'r-pinky' },
      { ru: 'х', upper: 'Х', us: '[', finger: 'r-pinky' },
      { ru: 'ъ', upper: 'Ъ', us: ']', finger: 'r-pinky' }
    ]
  },
  {
    name: 'Home row',
    note: 'Rest your fingers here. This is where every professional typist starts.',
    keys: [
      { ru: 'ф', upper: 'Ф', us: 'a', finger: 'l-pinky' },
      { ru: 'ы', upper: 'Ы', us: 's', finger: 'l-ring' },
      { ru: 'в', upper: 'В', us: 'd', finger: 'l-middle' },
      { ru: 'а', upper: 'А', us: 'f', finger: 'l-index', home: true },
      { ru: 'п', upper: 'П', us: 'g', finger: 'l-index' },
      { ru: 'р', upper: 'Р', us: 'h', finger: 'r-index' },
      { ru: 'о', upper: 'О', us: 'j', finger: 'r-index', home: true },
      { ru: 'л', upper: 'Л', us: 'k', finger: 'r-middle' },
      { ru: 'д', upper: 'Д', us: 'l', finger: 'r-ring' },
      { ru: 'ж', upper: 'Ж', us: ';', finger: 'r-pinky' },
      { ru: 'э', upper: 'Э', us: "'", finger: 'r-pinky' }
    ]
  },
  {
    name: 'Bottom row',
    note: 'Letters with descenders and the soft sign live here.',
    keys: [
      { ru: 'я', upper: 'Я', us: 'z', finger: 'l-pinky' },
      { ru: 'ч', upper: 'Ч', us: 'x', finger: 'l-ring' },
      { ru: 'с', upper: 'С', us: 'c', finger: 'l-middle' },
      { ru: 'м', upper: 'М', us: 'v', finger: 'l-index' },
      { ru: 'и', upper: 'И', us: 'b', finger: 'l-index' },
      { ru: 'т', upper: 'Т', us: 'n', finger: 'r-index' },
      { ru: 'ь', upper: 'Ь', us: 'm', finger: 'r-index' },
      { ru: 'б', upper: 'Б', us: ',', finger: 'r-middle' },
      { ru: 'ю', upper: 'Ю', us: '.', finger: 'r-ring' },
      { ru: '.', upper: ',', us: '/', finger: 'r-pinky', same: true }
    ]
  }
];

// Fast lookup helpers ---------------------------------------------------------

export const ALL_KEYS = KEY_ROWS_DATA.flatMap((r) => r.keys);

const BY_RU = new Map(ALL_KEYS.map((k) => [k.ru, k]));
const BY_US = new Map();
for (const k of ALL_KEYS) {
  if (!BY_US.has(k.us)) BY_US.set(k.us, k);
}

export function keyForRu(ch) {
  if (!ch) return null;
  const lower = String(ch).toLowerCase();
  return BY_RU.get(lower) || null;
}

export function keyForUs(ch) {
  if (!ch) return null;
  return BY_US.get(String(ch).toLowerCase()) || null;
}

// Deliver a Russian letter for whatever the browser gave us in `keydown`.
// Accepts an already-Cyrillic key (Russian OS layout active) or a Latin key
// (US layout active) — the trainer works either way.
export function ruFromKeydown(key) {
  if (!key || key.length !== 1) return null;
  if (/[а-яё]/i.test(key)) return key.toLowerCase();
  const k = keyForUs(key);
  if (k && !k.same && /[а-яё]/.test(k.ru)) return k.ru;
  return null;
}

export function usFromRu(ch) {
  const k = keyForRu(ch);
  return k ? k.us : null;
}

export function fingerForRu(ch) {
  const k = keyForRu(ch);
  return k ? k.finger : null;
}

// Graded typing drills. `items` are typed one at a time.
export const KEYBOARD_LESSONS = [
  {
    id: 'home', title: 'Home row', icon: '🏠',
    desc: 'Rest position: ф ы в а п р о л д ж э. Say each letter as you type it.',
    items: ['ф', 'ы', 'в', 'а', 'п', 'р', 'о', 'л', 'д', 'ж', 'э',
      'фы', 'вы', 'ав', 'па', 'ро', 'ла', 'до',
      'вода', 'жара', 'фара', 'выдра', 'правда', 'ладонь', 'орава']
  },
  {
    id: 'top', title: 'Top row', icon: '⬆️',
    desc: 'й ц у к е н г ш щ з х ъ — the busiest consonants.',
    items: ['й', 'ц', 'у', 'к', 'е', 'н', 'г', 'ш', 'щ', 'з', 'х', 'ъ',
      'ке', 'гу', 'шщ', 'це', 'ну', 'зх',
      'уш', 'цех', 'шум', 'щен', 'режим', 'ужин', 'шест', 'цирк']
  },
  {
    id: 'bottom', title: 'Bottom row', icon: '⬇️',
    desc: 'я ч с м и т ь б ю — including the silent soft sign.',
    items: ['я', 'ч', 'с', 'м', 'и', 'т', 'ь', 'б', 'ю',
      'мя', 'чи', 'см', 'ти', 'бю',
      'мяч', 'имя', 'бить', 'семь', 'тема', 'сутки', 'число']
  },
  {
    id: 'alphabet', title: 'Whole alphabet', icon: '🔤',
    desc: 'All 33 letters in order. Slow and steady — accuracy first.',
    items: ['а', 'б', 'в', 'г', 'д', 'е', 'ё', 'ж', 'з', 'и', 'й', 'к', 'л', 'м', 'н', 'о', 'п',
      'р', 'с', 'т', 'у', 'ф', 'х', 'ц', 'ч', 'ш', 'щ', 'ъ', 'ы', 'ь', 'э', 'ю', 'я']
  },
  {
    id: 'words', title: 'Everyday words', icon: '📖',
    desc: 'The shortest, highest-frequency words — type them without looking down.',
    items: ['дом', 'кот', 'мама', 'папа', 'сын', 'стол', 'мир', 'чай', 'сок', 'нос',
      'рука', 'нога', 'вода', 'хлеб', 'друг', 'язык', 'книга', 'школа', 'окно', 'дверь']
  },
  {
    id: 'phrases', title: 'First phrases', icon: '💬',
    desc: 'Real phrases with spaces. Use your thumb for the space bar.',
    items: ['привет', 'как дела', 'доброе утро', 'добрый вечер', 'спасибо', 'до свидания',
      'я учу русский', 'где метро', 'сколько это стоит', 'меня зовут анна']
  },
  {
    id: 'pro', title: 'Tech & work', icon: '💻',
    desc: 'Professional and technology vocabulary on the keyboard.',
    items: ['пароль', 'данные', 'сервер', 'файл', 'программа', 'интернет',
      'система', 'безопасность', 'пользователь', 'документ', 'компания', 'проект']
  },
  {
    id: 'speed', title: 'Speed test', icon: '⏱',
    desc: 'A mixed stream of everything. Aim for accuracy above all.',
    items: ['сегодня', 'работа', 'компьютер', 'жизнь', 'человек', 'время',
      'русский', 'который', 'только', 'конечно', 'например', 'пожалуйста']
  }
];

export function lessonById(id) {
  return KEYBOARD_LESSONS.find((l) => l.id === id) || KEYBOARD_LESSONS[0];
}
