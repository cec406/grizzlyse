// Unit 5 — Food and drink. A1.
export const unit = {
  id: 'u05',
  level: 'A1',
  number: 5,
  title: 'Food and drink',
  titleRu: 'Еда́ и напи́тки',
  story: 'You are hungry in a Russian café. This unit gives you the food words, the verb хоте́ть ("to want"), and the accusative case that turns «вода́» into «во́ду» when you order it. By the end you can read a simple menu and order without pointing.',
  grammar: [
    {
      topic: 'The accusative: the object of an action',
      explanation: 'When a noun is what you want, eat, see or buy, it goes into the accusative case. For feminine nouns ending in -а/-я, this shows as -у/-ю. Masculine inanimate and neuter nouns do not change, so only the feminine endings are new.',
      table: [
        ['Nominative', 'Accusative', 'Meaning'],
        ['вода́', 'во́ду', 'water'],
        ['ры́ба', 'ры́бу', 'fish'],
        ['пи́цца', 'пи́ццу', 'pizza'],
        ['суп', 'суп', 'soup (no change)'],
        ['я́блоко', 'я́блоко', 'apple (no change)']
      ],
      examples: [
        { ru: 'Я хочу́ во́ду.', trans: 'ya khochu vodu', en: 'I want water.' },
        { ru: 'Я люблю́ ры́бу.', trans: 'ya lyublyu rybu', en: 'I like fish.' }
      ]
    },
    {
      topic: 'хоте́ть — to want',
      explanation: 'хоте́ть is irregular in the singular but very common. Use it with an accusative object: Я хочу́ ко́фе, Ты хо́чешь чай? Note the vowel change: хоч- in the singular, хот- in the plural.',
      table: [
        ['Person', 'Form'],
        ['я', 'хочу́'],
        ['ты', 'хо́чешь'],
        ['он / она́', 'хо́чет'],
        ['мы', 'хоти́м'],
        ['вы', 'хоти́те'],
        ['они́', 'хотя́т']
      ],
      examples: [
        { ru: 'Что ты хо́чешь?', trans: 'chto ty khochesh?', en: 'What do you want?' },
        { ru: 'Мы хоти́м чай и ко́фе.', trans: 'my khotim chay i kofe', en: 'We want tea and coffee.' }
      ]
    },
    {
      topic: 'At the café',
      explanation: 'These fixed phrases get you through almost any order. «Мне, пожа́луйста …» is the shortest polite request: "To me, please …".',
      table: [
        ['Russian', 'English'],
        ['Мне, пожа́луйста, ко́фе.', 'Coffee for me, please.'],
        ['Счёт, пожа́луйста.', 'The bill, please.'],
        ['Э́то вку́сно!', 'This is tasty!'],
        ['О́чень вку́сно.', 'Very tasty.']
      ],
      examples: [
        { ru: 'Счёт, пожа́луйста. — Сейча́с.', trans: 'schyot, pozhaluysta. seychas', en: 'The bill, please. — Right away.' }
      ]
    }
  ],
  vocabulary: [
    { id: 'u5-yeda', ru: 'еда́', translit: 'yeda', en: 'food', pos: 'noun', gender: 'f' },
    { id: 'u5-khleb', ru: 'хлеб', translit: 'khleb', en: 'bread', pos: 'noun', gender: 'm' },
    { id: 'u5-voda', ru: 'вода́', translit: 'voda', en: 'water', pos: 'noun', gender: 'f' },
    { id: 'u5-chay', ru: 'чай', translit: 'chay', en: 'tea', pos: 'noun', gender: 'm' },
    { id: 'u5-kofe', ru: 'ко́фе', translit: 'kofe', en: 'coffee', pos: 'noun', gender: 'm' },
    { id: 'u5-moloko', ru: 'молоко́', translit: 'moloko', en: 'milk', pos: 'noun', gender: 'n' },
    { id: 'u5-syr', ru: 'сыр', translit: 'syr', en: 'cheese', pos: 'noun', gender: 'm' },
    { id: 'u5-ryba', ru: 'ры́ба', translit: 'ryba', en: 'fish', pos: 'noun', gender: 'f' },
    { id: 'u5-myaso', ru: 'мя́со', translit: 'myaso', en: 'meat', pos: 'noun', gender: 'n' },
    { id: 'u5-yabloko', ru: 'я́блоко', translit: 'yabloko', en: 'apple', pos: 'noun', gender: 'n' },
    { id: 'u5-sup', ru: 'суп', translit: 'sup', en: 'soup', pos: 'noun', gender: 'm' },
    { id: 'u5-salat', ru: 'сала́т', translit: 'salat', en: 'salad', pos: 'noun', gender: 'm' },
    { id: 'u5-sok', ru: 'сок', translit: 'sok', en: 'juice', pos: 'noun', gender: 'm' },
    { id: 'u5-kompot', ru: 'ко́мпот', translit: 'kompot', en: 'fruit drink (kompot)', pos: 'noun', gender: 'm' },
    { id: 'u5-pivo', ru: 'пи́во', translit: 'pivo', en: 'beer', pos: 'noun', gender: 'n' },
    { id: 'u5-zavtrak', ru: 'за́втрак', translit: 'zavtrak', en: 'breakfast', pos: 'noun', gender: 'm' },
    { id: 'u5-obed', ru: 'обе́д', translit: 'obed', en: 'lunch / dinner (midday)', pos: 'noun', gender: 'm' },
    { id: 'u5-uzhin', ru: 'у́жин', translit: 'uzhin', en: 'supper / evening meal', pos: 'noun', gender: 'm' },
    { id: 'u5-khotet', ru: 'хоте́ть', translit: 'khotet', en: 'to want', pos: 'verb' },
    { id: 'u5-vkusno', ru: 'вку́сно', translit: 'vkusno', en: 'tasty / delicious', pos: 'adverb' },
    { id: 'u5-schyot', ru: 'счёт', translit: 'schyot', en: 'bill / check', pos: 'noun', gender: 'm' }
  ],
  phrases: [
    { id: 'p-u5-1', ru: 'Счёт, пожа́луйста.', trans: 'schyot, pozhaluysta', en: 'The bill, please.' },
    { id: 'p-u5-2', ru: 'О́чень вку́сно!', trans: 'ochen vkusno', en: 'Very tasty!' }
  ],
  sentences: [
    { ru: 'Я хочу́ во́ду.', translit: 'ya khochu vodu', en: 'I want water.', words: [{ id: 'u5-khotet', ru: 'хочу́', en: 'to want' }, { id: 'u5-voda', ru: 'во́ду', en: 'water' }] },
    { ru: 'Что ты хо́чешь?', translit: 'chto ty khochesh?', en: 'What do you want?', words: [{ id: 'u5-khotet', ru: 'хо́чешь', en: 'to want' }] },
    { ru: 'Э́то о́чень вку́сно!', translit: 'eta ochen vkusno', en: 'This is very tasty!', words: [{ id: 'u5-vkusno', ru: 'вку́сно', en: 'tasty' }] },
    { ru: 'Я люблю́ ры́бу и сала́т.', translit: 'ya lyublyu rybu i salat', en: 'I like fish and salad.', words: [{ id: 'u5-ryba', ru: 'ры́бу', en: 'fish' }, { id: 'u5-salat', ru: 'сала́т', en: 'salad' }] },
    { ru: 'Счёт, пожа́луйста!', translit: 'schyot, pozhaluysta!', en: 'The bill, please!', words: [{ id: 'u5-schyot', ru: 'Счёт', en: 'bill' }] }
  ],
  dialogue: {
    title: 'В кафе́ (In the café)',
    lines: [
      { who: 'Официа́нт', ru: 'До́брый день! Что вы хоти́те?', en: 'Good afternoon! What would you like?' },
      { who: 'Том', ru: 'Я хочу́ суп и хлеб.', en: 'I want soup and bread.' },
      { who: 'Официа́нт', ru: 'А что бу́дете пить?', en: 'And what will you drink?' },
      { who: 'Том', ru: 'Ко́фе, пожа́луйста. И во́ду.', en: 'Coffee, please. And water.' },
      { who: 'Официа́нт', ru: 'Сейча́с. Прия́тного аппети́та!', en: 'Right away. Enjoy your meal!' },
      { who: 'Том', ru: 'Спаси́бо! Э́то о́чень вку́сно. Счёт, пожа́луйста.', en: 'Thank you! This is very tasty. The bill, please.' }
    ],
    questions: [
      { type: 'mc-ru', q: 'Что хо́чет Том?', options: ['суп и хлеб', 'ры́бу и сала́т', 'пи́ццу', 'мя́со и рис'], answer: 'суп и хлеб' },
      { type: 'mc-ru', q: 'Что Том бу́дет пить?', options: ['ко́фе и во́ду', 'чай и сок', 'пи́во', 'молоко́'], answer: 'ко́фе и во́ду' },
      { type: 'mc-ru', q: 'Ка́к Тому́ еда́?', options: ['о́чень вку́сно', 'пло́хо', 'норма́льно', 'не вку́сно'], answer: 'о́чень вку́сно' }
    ]
  },
  quiz: [
    { type: 'mc-en', q: 'Что зна́чит «хлеб»?', options: ['bread', 'water', 'milk', 'cheese'], answer: 'bread', ru: 'хлеб' },
    { type: 'mc-en', q: 'Что зна́чит «молоко́»?', options: ['milk', 'water', 'juice', 'tea'], answer: 'milk', ru: 'молоко́' },
    { type: 'mc-ru', q: 'How do you say “water”?', options: ['вода́', 'чай', 'сок', 'пи́во'], answer: 'вода́', ru: 'вода́' },
    { type: 'mc-ru', q: '“apple” in Russian', options: ['я́блоко', 'сыр', 'ры́ба', 'мя́со'], answer: 'я́блоко', ru: 'я́блоко' },
    { type: 'typing', q: 'Type “tea” in Russian', answer: 'чай', accepts: [], ru: 'чай' },
    { type: 'typing', q: 'Type “coffee” in Russian', answer: 'кофе', accepts: ['ко́фе'], ru: 'ко́фе' },
    { type: 'mc-en', q: 'Что зна́чит «вку́сно»?', options: ['tasty', 'hungry', 'cold', 'sweet'], answer: 'tasty', ru: 'вку́сно' },
    { type: 'mc-ru', q: '“to want” in Russian', options: ['хоте́ть', 'есть', 'пить', 'люби́ть'], answer: 'хоте́ть', ru: 'хоте́ть' },
    { type: 'mc-en', q: 'Что зна́чит «счёт»?', options: ['bill / check', 'dish', 'menu', 'tip'], answer: 'bill / check', ru: 'счёт' },
    { type: 'mc-ru', q: 'Choose the correct accusative', options: ['Я хочу́ во́ду.', 'Я хочу́ вода́.', 'Я хочу́ воды́.', 'Я хочу́ водо́й.'], answer: 'Я хочу́ во́ду.', ru: 'во́ду' },
    { type: 'typing', q: 'Type “soup” in Russian', answer: 'суп', accepts: [], ru: 'суп' },
    { type: 'mc-en', q: 'Что зна́чит «у́жин»?', options: ['supper / evening meal', 'breakfast', 'lunch', 'snack'], answer: 'supper / evening meal', ru: 'у́жин' }
  ],
  test: {
    title: 'Unit 5 test — Food and drink',
    questions: [
      { type: 'mc-ru', q: '“cheese” in Russian', options: ['сыр', 'сок', 'суп', 'сала́т'], answer: 'сыр', ru: 'сыр' },
      { type: 'mc-en', q: 'Что зна́чит «ры́ба»?', options: ['fish', 'meat', 'bread', 'apple'], answer: 'fish', ru: 'ры́ба' },
      { type: 'typing', q: 'Type “juice” in Russian', answer: 'сок', accepts: [], ru: 'сок' },
      { type: 'typing', q: 'Type “breakfast” in Russian', answer: 'завтрак', accepts: ['за́втрак'], ru: 'за́втрак' },
      { type: 'mc-ru', q: '“meat” in Russian', options: ['мя́со', 'ры́ба', 'молоко́', 'хлеб'], answer: 'мя́со', ru: 'мя́со' },
      { type: 'mc-en', q: 'Что зна́чит «обе́д»?', options: ['lunch', 'breakfast', 'supper', 'dinner party'], answer: 'lunch', ru: 'обе́д' },
      { type: 'mc-ru', q: 'Which sentence is correct?', options: ['Я люблю́ ры́бу.', 'Я люблю́ ры́ба.', 'Я люблю́ ры́бой.', 'Я люблю́ рыб.'], answer: 'Я люблю́ ры́бу.', ru: 'ры́бу' },
      { type: 'typing', q: 'Type “fruit drink” in Russian', answer: 'компот', accepts: ['ко́мпот'], ru: 'ко́мпот' },
      { type: 'mc-en', q: 'Что зна́чит «сала́т»?', options: ['salad', 'soup', 'sauce', 'sandwich'], answer: 'salad', ru: 'сала́т' },
      { type: 'mc-ru', q: '“food” in Russian', options: ['еда́', 'вода́', 'чай', 'блю́до'], answer: 'еда́', ru: 'еда́' },
      { type: 'typing', q: 'Type “to want” in Russian', answer: 'хотеть', accepts: ['хоте́ть'], ru: 'хоте́ть' },
      { type: 'mc-en', q: 'Что зна́чит «за́втрак»?', options: ['breakfast', 'lunch', 'supper', 'dessert'], answer: 'breakfast', ru: 'за́втрак' }
    ]
  }
};
