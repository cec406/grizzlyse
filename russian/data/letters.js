// Russian alphabet: 33 letters. Stress marks use U+0301 combining acute.
// group: 1 = look+sound like English, 2 = false friends (look like Latin, sound different),
//        3 = new shapes, 4 = signs (no sound of their own).
export const LETTERS = [
  { upper: 'А', lower: 'а', name: 'А', nameT: 'a', sound: 'a', approx: '"a" in "father" (short)', example: 'а́брикос', gloss: 'apricot', trans: 'abrikos', mnemonic: 'Looks and sounds like Latin A.', group: 1 },
  { upper: 'Б', lower: 'б', name: 'Бэ', nameT: 'be', sound: 'b', approx: '"b" in "bed"', example: 'ба́нк', gloss: 'bank', trans: 'bank', mnemonic: 'A "B" with a belly — still sounds B.', group: 3 },
  { upper: 'В', lower: 'в', name: 'Вэ', nameT: 've', sound: 'v', approx: '"v" in "voice"', example: 'вода́', gloss: 'water', trans: 'voda', mnemonic: 'Looks like Latin B but sounds V — a false friend.', group: 2 },
  { upper: 'Г', lower: 'г', name: 'Гэ', nameT: 'ge', sound: 'g', approx: '"g" in "go" (always hard)', example: 'газе́та', gloss: 'newspaper', trans: 'gazyeta', mnemonic: 'Looks like a tiny cursive "r" but sounds G.', group: 3 },
  { upper: 'Д', lower: 'д', name: 'Дэ', nameT: 'de', sound: 'd', approx: '"d" in "dog"', example: 'до́ма', gloss: 'at home', trans: 'doma', mnemonic: '"D" with legs.', group: 3 },
  { upper: 'Е', lower: 'е', name: 'Е', nameT: 'ye', sound: 'ye', approx: '"ye" in "yes"', example: 'есть', gloss: 'to eat; there is', trans: 'yest', mnemonic: 'Sounds like the letter name "E" says its own name: ye.', group: 2 },
  { upper: 'Ё', lower: 'ё', name: 'Ё', nameT: 'yo', sound: 'yo', approx: '"yo" in "york"', example: 'ёлка', gloss: 'fir tree', trans: 'yolka', mnemonic: '"Е" with two dots on top — adds a "y": yo.', group: 3 },
  { upper: 'Ж', lower: 'ж', name: 'Жэ', nameT: 'zhe', sound: 'zh', approx: '"s" in "treasure"', example: 'журна́л', gloss: 'magazine', trans: 'zhurnal', mnemonic: 'Looks a bit like a beetle; buzzes like "zh".', group: 3 },
  { upper: 'З', lower: 'з', name: 'Зэ', nameT: 'ze', sound: 'z', approx: '"z" in "zebra"', example: 'зо́нт', gloss: 'umbrella', trans: 'zont', mnemonic: 'A number "3" that buzzes like Z.', group: 3 },
  { upper: 'И', lower: 'и', name: 'И', nameT: 'i', sound: 'i', approx: '"ee" in "see"', example: 'мир', gloss: 'peace; world', trans: 'meer', mnemonic: 'Like a backwards N — says "ee" like an "eel".', group: 3 },
  { upper: 'Й', lower: 'й', name: 'И краткое', nameT: 'ee kratkoye', sound: 'y', approx: '"y" in "boy" (short)', example: 'йо́гурт', gloss: 'yogurt', trans: 'yogurt', mnemonic: '"Short I" — a quick y-glide, only with a vowel before it.', group: 3 },
  { upper: 'К', lower: 'к', name: 'Ка', nameT: 'ka', sound: 'k', approx: '"k" in "kite"', example: 'ка́рта', gloss: 'map', trans: 'karta', mnemonic: 'Looks and sounds like Latin K.', group: 1 },
  { upper: 'Л', lower: 'л', name: 'Эль', nameT: 'el', sound: 'l', approx: '"l" in "lamp"', example: 'ла́мпа', gloss: 'lamp', trans: 'lampa', mnemonic: 'Like a sharp-cornered "L"; just add a curve.', group: 3 },
  { upper: 'М', lower: 'м', name: 'Эм', nameT: 'em', sound: 'm', approx: '"m" in "mother"', example: 'метро́', gloss: 'subway', trans: 'metro', mnemonic: 'Looks and sounds like M — just sits low.', group: 1 },
  { upper: 'Н', lower: 'н', name: 'Эн', nameT: 'en', sound: 'n', approx: '"n" in "note"', example: 'ночь', gloss: 'night', trans: 'noch', mnemonic: 'Looks like an H but sounds N — false friend.', group: 2 },
  { upper: 'О', lower: 'о', name: 'О', nameT: 'o', sound: 'o', approx: '"o" in "order"', example: 'окно́', gloss: 'window', trans: 'akno', mnemonic: 'Looks and sounds like O/0.', group: 1 },
  { upper: 'П', lower: 'п', name: 'Пэ', nameT: 'pe', sound: 'p', approx: '"p" in "pet"', example: 'па́па', gloss: 'dad', trans: 'papa', mnemonic: 'Like Greek pi — sounds P.', group: 3 },
  { upper: 'Р', lower: 'р', name: 'Эр', nameT: 'er', sound: 'r', approx: 'rolled/trilled "r"', example: 'рука́', gloss: 'hand; arm', trans: 'ruka', mnemonic: 'Looks like Latin P but is a trilled R — false friend.', group: 2 },
  { upper: 'С', lower: 'с', name: 'Эс', nameT: 'es', sound: 's', approx: '"s" in "sun"', example: 'суп', gloss: 'soup', trans: 'sup', mnemonic: 'Looks like a "C" but sounds S — false friend.', group: 2 },
  { upper: 'Т', lower: 'т', name: 'Тэ', nameT: 'te', sound: 't', approx: '"t" in "top"', example: 'так', gloss: 'so; yes (ok)', trans: 'tak', mnemonic: 'Like a "T" in italic — still T.', group: 1 },
  { upper: 'У', lower: 'у', name: 'У', nameT: 'u', sound: 'u', approx: '"oo" in "boot"', example: 'урок', gloss: 'lesson', trans: 'urok', mnemonic: 'Looks like Latin Y but says "oo" — false friend.', group: 2 },
  { upper: 'Ф', lower: 'ф', name: 'Эф', nameT: 'ef', sound: 'f', approx: '"f" in "fox"', example: 'факс', gloss: 'fax', trans: 'faks', mnemonic: 'Easy: F.', group: 3 },
  { upper: 'Х', lower: 'х', name: 'Ха', nameT: 'kha', sound: 'kh', approx: 'like Scottish "loch"', example: 'хлеб', gloss: 'bread', trans: 'khlyep', mnemonic: 'Looks like X but breathes "kh" — false friend.', group: 2 },
  { upper: 'Ц', lower: 'ц', name: 'Цэ', nameT: 'tse', sound: 'ts', approx: '"ts" in "cats"', example: 'ци́рк', gloss: 'circus', trans: 'tsirk', mnemonic: '"Ts" like the end of "cats". Never hisses (no sh).', group: 3 },
  { upper: 'Ч', lower: 'ч', name: 'Че', nameT: 'che', sound: 'ch', approx: '"ch" in "chip"', example: 'час', gloss: 'hour', trans: 'chass', mnemonic: 'Looks a bit like a chair; sounds "ch".', group: 3 },
  { upper: 'Ш', lower: 'ш', name: 'Ша', nameT: 'sha', sound: 'sh', approx: '"sh" in "shop"', example: 'ша́пка', gloss: 'hat', trans: 'shapka', mnemonic: 'Three legs = hard "sh".', group: 3 },
  { upper: 'Щ', lower: 'щ', name: 'Ща', nameT: 'shcha', sound: 'shch', approx: '"sh" + soft, like "fresh cheese"', example: 'щи', gloss: 'cabbage soup', trans: 'shshi', mnemonic: 'Four legs = soft long "shch".', group: 3 },
  { upper: 'Ъ', lower: 'ъ', name: 'твёрдый знак', nameT: 'tvyordiy znak', sound: '(none)', approx: 'no sound — hard sign', example: 'объе́кт', gloss: 'object', trans: 'abyekt', mnemonic: 'The hard sign: separates a consonant from a following vowel.', group: 4 },
  { upper: 'Ы', lower: 'ы', name: 'Ы', nameT: 'yi', sound: 'y', approx: 'no English match; deep "i" in "bit"', example: 'мы', gloss: 'we', trans: 'mi', mnemonic: 'No English sound: keep lips forward, say "i" deep in the mouth.', group: 3 },
  { upper: 'Ь', lower: 'ь', name: 'мя́гкий знак', nameT: 'myagkiy znak', sound: '(none)', approx: 'no sound — soft sign', example: 'конь', gloss: 'horse', trans: 'kon', mnemonic: 'The soft sign: makes the previous consonant soft/palatal.', group: 4 },
  { upper: 'Э', lower: 'э', name: 'Э', nameT: 'e', sound: 'e', approx: '"e" in "pet"', example: 'э́то', gloss: 'this', trans: 'eta', mnemonic: 'Backwards E; keeps its "eh" sound.', group: 3 },
  { upper: 'Ю', lower: 'ю', name: 'Ю', nameT: 'yu', sound: 'yu', approx: '"you"', example: 'ю́мор', gloss: 'humor', trans: 'yumor', mnemonic: 'An "O" holding a bar says "you".', group: 3 },
  { upper: 'Я', lower: 'я', name: 'Я', nameT: 'ya', sound: 'ya', approx: '"ya" in "yard"', example: 'я́блоко', gloss: 'apple', trans: 'yabloko', mnemonic: 'Looks like a backwards R; says "ya". Also means "I".', group: 3 }
];

export const VOWELS = new Set('аеёиоуыэюя'.split(''));
export const HARDVOWELS = new Set('аоуыэ'.split(''));
export const SOFTVOWELS = new Set('яёюие'.split(''));
export const GROUP_NAMES = [
  'Like English',
  'False friends',
  'New shapes',
  'Hard & soft signs'
];
export const LETTER_GROUPS = [
  ['А', 'К', 'М', 'О', 'Т'],
  ['В', 'Е', 'Н', 'Р', 'С', 'У', 'Х'],
  ['Б', 'Г', 'Д', 'Ж', 'З', 'И', 'Й', 'Л', 'П', 'Ф', 'Ц', 'Ч', 'Ш', 'Щ', 'Э', 'Ю', 'Я', 'Ё', 'Ы'],
  ['Ъ', 'Ь']
];

export function letterBy(value) {
  const v = value.toUpperCase();
  return LETTERS.find((l) => l.upper === v || l.lower === value);
}