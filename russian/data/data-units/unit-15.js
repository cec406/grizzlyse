// Unit 15 — With and without. A2.
export const unit = {
  id: 'u15',
  level: 'A2',
  number: 15,
  title: 'With and without',
  titleRu: 'С и без',
  story: 'Who do you go with? What do you drink your tea with? What do you do for a living? All three questions use the instrumental case — the case of \"with\" and \"by means of\". This unit teaches it through friends, drinks and jobs.',
  grammar: [
    {
      topic: 'с + instrumental (with)',
      explanation: 'The preposition с (\"with\") is followed by the instrumental case. Masculine and neuter nouns take -ом/-ем, feminine nouns take -ой/-ей.',
      table: [
        ['Nominative', 'с + instrumental', 'Meaning'],
        ['друг', 'с дру́гом', 'with a friend'],
        ['брат', 'с бра́том', 'with a brother'],
        ['подру́га', 'с подру́гой', 'with a friend (f)'],
        ['сестра́', 'с сестро́й', 'with a sister'],
        ['молоко́', 'с молоко́м', 'with milk'],
        ['чай', 'с ча́ем', 'with tea']
      ],
      examples: [
        { ru: 'Я иду́ с дру́гом.', trans: 'ya idu s drugom', en: 'I am going with a friend.' },
        { ru: 'Мы пьём чай с молоко́м.', trans: 'my pyom chay s molokom', en: 'We drink tea with milk.' }
      ]
    },
    {
      topic: 'без + genitive (without)',
      explanation: 'без (\"without\") takes the genitive: без са́хара (without sugar), без молока́. In cafés this is everywhere: ко́фе без са́хара.',
      table: [
        ['Nominative', 'без + genitive', 'Meaning'],
        ['са́хар', 'без са́хара', 'without sugar'],
        ['молоко́', 'без молока́', 'without milk'],
        ['соль', 'без со́ли', 'without salt'],
        ['мя́со', 'без мя́са', 'without meat']
      ],
      examples: [
        { ru: 'Ко́фе без са́хара, пожа́луйста.', trans: 'kofe bez sakhara, pozhaluysta', en: 'Coffee without sugar, please.' }
      ]
    },
    {
      topic: 'Professions with the instrumental',
      explanation: 'To say what someone works as, Russian uses the instrumental: рабо́тать врачо́м, быть инжене́ром. Means of transport, by contrast, use на + prepositional: на авто́бусе, на маши́не.',
      table: [
        ['Russian', 'English'],
        ['Он рабо́тает врачо́м.', 'He works as a doctor.'],
        ['Она́ рабо́тает учи́телем.', 'She works as a teacher.'],
        ['Мы е́дем на авто́бусе.', 'We go by bus.'],
        ['Он е́дет на маши́не.', 'He goes by car.']
      ],
      examples: [
        { ru: 'Я рабо́таю инжене́ром.', trans: 'ya rabotayu inzhenerom', en: 'I work as an engineer.' }
      ]
    }
  ],
  vocabulary: [
    { id: 'u15-drug', ru: 'друг', translit: 'drug', en: 'friend (m)', pos: 'noun', gender: 'm' },
    { id: 'u15-podruga', ru: 'подру́га', translit: 'podruga', en: 'friend (f)', pos: 'noun', gender: 'f' },
    { id: 'u15-semya', ru: 'семья́', translit: 'semya', en: 'family', pos: 'noun', gender: 'f' },
    { id: 'u15-vrach', ru: 'врач', translit: 'vrach', en: 'doctor', pos: 'noun', gender: 'm' },
    { id: 'u15-uchitel', ru: 'учи́тель', translit: 'uchitel', en: 'teacher', pos: 'noun', gender: 'm' },
    { id: 'u15-inzhener', ru: 'инжене́р', translit: 'inzhener', en: 'engineer', pos: 'noun', gender: 'm' },
    { id: 'u15-professiya', ru: 'профе́ссия', translit: 'professiya', en: 'profession', pos: 'noun', gender: 'f' },
    { id: 'u15-chay', ru: 'чай', translit: 'chay', en: 'tea', pos: 'noun', gender: 'm' },
    { id: 'u15-moloko', ru: 'молоко́', translit: 'moloko', en: 'milk', pos: 'noun', gender: 'n' },
    { id: 'u15-sahar', ru: 'са́хар', translit: 'sakhar', en: 'sugar', pos: 'noun', gender: 'm' },
    { id: 'u15-mashina', ru: 'маши́на', translit: 'mashina', en: 'car', pos: 'noun', gender: 'f' },
    { id: 'u15-avtobus', ru: 'авто́бус', translit: 'avtobus', en: 'bus', pos: 'noun', gender: 'm' },
    { id: 'u15-rabotat', ru: 'рабо́тать', translit: 'rabotat', en: 'to work', pos: 'verb' },
    { id: 'u15-idti', ru: 'идти́', translit: 'idti', en: 'to go (on foot)', pos: 'verb' },
    { id: 'u15-vmeste', ru: 'вме́сте', translit: 'vmeste', en: 'together', pos: 'adverb' },
    { id: 'u15-odin', ru: 'оди́н', translit: 'odin', en: 'one / alone', pos: 'numeral' },
    { id: 'u15-s', ru: 'с', translit: 's', en: 'with', pos: 'preposition' },
    { id: 'u15-bez', ru: 'без', translit: 'bez', en: 'without', pos: 'preposition' },
    { id: 'u15-na', ru: 'на', translit: 'na', en: 'on / by (transport)', pos: 'preposition' }
  ],
  phrases: [
    { id: 'p-u15-1', ru: 'Ко́фе без са́хара.', trans: 'kofe bez sakhara', en: 'Coffee without sugar.' },
    { id: 'p-u15-2', ru: 'Пойдём вме́сте!', trans: 'poydyom vmeste!', en: 'Let us go together!' }
  ],
  sentences: [
    { ru: 'Я иду́ с дру́гом.', translit: 'ya idu s drugom', en: 'I am going with a friend.', words: [{ id: 'u15-idti', ru: 'иду́', en: 'to go' }, { id: 'u15-drug', ru: 'дру́гом', en: 'friend' }, { id: 'u15-s', ru: 'с', en: 'with' }] },
    { ru: 'Она́ рабо́тает врачо́м.', translit: 'ona rabotayet vrachom', en: 'She works as a doctor.', words: [{ id: 'u15-rabotat', ru: 'рабо́тает', en: 'to work' }, { id: 'u15-vrach', ru: 'врачо́м', en: 'doctor' }] },
    { ru: 'Мы пьём чай с молоко́м.', translit: 'my pyom chay s molokom', en: 'We drink tea with milk.', words: [{ id: 'u15-chay', ru: 'чай', en: 'tea' }, { id: 'u15-moloko', ru: 'молоко́м', en: 'milk' }] },
    { ru: 'Он е́дет на авто́бусе.', translit: 'on yedet na avtobuse', en: 'He goes by bus.', words: [{ id: 'u15-avtobus', ru: 'авто́бусе', en: 'bus' }, { id: 'u15-na', ru: 'на', en: 'by' }] },
    { ru: 'Ко́фе без са́хара, пожа́луйста.', translit: 'kofe bez sakhara, pozhaluysta', en: 'Coffee without sugar, please.', words: [{ id: 'u15-bez', ru: 'без', en: 'without' }, { id: 'u15-sahar', ru: 'са́хара', en: 'sugar' }] }
  ],
  dialogue: {
    title: 'С кем и кем? (With whom, as what?)',
    lines: [
      { who: 'Мария', ru: 'Ты идёшь в кафе́ с дру́гом?', en: 'Are you going to the café with a friend?' },
      { who: 'Том', ru: 'Да, с подру́гой. Она́ рабо́тает врачо́м.', en: 'Yes, with a friend. She works as a doctor.' },
      { who: 'Мария', ru: 'А ты кем рабо́таешь?', en: 'And what do you work as?' },
      { who: 'Том', ru: 'Я рабо́таю инжене́ром. Пьём ко́фе без са́хара?', en: 'I work as an engineer. Shall we drink coffee without sugar?' },
      { who: 'Мария', ru: 'Я пью с молоко́м, но без са́хара.', en: 'I drink mine with milk, but without sugar.' }
    ],
    questions: [
      { type: 'mc-ru', q: 'Кем рабо́тает подру́га То́ма?', options: ['врачо́м', 'учи́телем', 'инжене́ром', 'продавцо́м'], answer: 'врачо́м' },
      { type: 'mc-ru', q: 'Кем рабо́тает Том?', options: ['инжене́ром', 'врачо́м', 'учи́телем', 'официа́нтом'], answer: 'инжене́ром' },
      { type: 'mc-ru', q: 'Как Мари́я пьёт ко́фе?', options: ['с молоко́м', 'с са́харом', 'без молока́', 'с лимо́ном'], answer: 'с молоко́м' }
    ]
  },
  quiz: [
    { type: 'mc-en', q: 'Что зна́чит «с»?', options: ['with', 'without', 'for', 'about'], answer: 'with', ru: 'с' },
    { type: 'mc-en', q: 'Что зна́чит «без»?', options: ['without', 'with', 'under', 'over'], answer: 'without', ru: 'без' },
    { type: 'mc-ru', q: 'Instrumental of «друг»', options: ['дру́гом', 'дру́га', 'дру́гу', 'друг'], answer: 'дру́гом', ru: 'дру́гом' },
    { type: 'mc-ru', q: 'Instrumental of «подру́га»', options: ['подру́гой', 'подру́гу', 'подру́ги', 'подру́га'], answer: 'подру́гой', ru: 'подру́гой' },
    { type: 'typing', q: 'Type “doctor” in Russian', answer: 'врач', accepts: [], ru: 'врач' },
    { type: 'typing', q: 'Type “together” in Russian', answer: 'вместе', accepts: ['вме́сте'], ru: 'вме́сте' },
    { type: 'mc-en', q: 'Что зна́чит «инжене́р»?', options: ['engineer', 'doctor', 'teacher', 'driver'], answer: 'engineer', ru: 'инжене́р' },
    { type: 'mc-ru', q: '“sugar” in Russian', options: ['са́хар', 'соль', 'чай', 'молоко́'], answer: 'са́хар', ru: 'са́хар' },
    { type: 'mc-en', q: 'Что зна́чит «учи́тель»?', options: ['teacher', 'engineer', 'doctor', 'student'], answer: 'teacher', ru: 'учи́тель' },
    { type: 'mc-ru', q: 'Complete: Я иду́ ___ дру́гом.', options: ['с', 'без', 'на', 'в'], answer: 'с', ru: 'с дру́гом' },
    { type: 'typing', q: 'Type “car” in Russian', answer: 'машина', accepts: ['маши́на'], ru: 'маши́на' },
    { type: 'mc-en', q: 'Что зна́чит «профе́ссия»?', options: ['profession', 'family', 'friend', 'work'], answer: 'profession', ru: 'профе́ссия' }
  ],
  test: {
    title: 'Unit 15 test — With and without',
    questions: [
      { type: 'mc-ru', q: 'Instrumental of «врач»', options: ['врачо́м', 'врача́', 'врачу́', 'врач'], answer: 'врачо́м', ru: 'врачо́м' },
      { type: 'mc-en', q: 'Что зна́чит «семья́»?', options: ['family', 'friend', 'profession', 'work'], answer: 'family', ru: 'семья́' },
      { type: 'typing', q: 'Type “tea” in Russian', answer: 'чай', accepts: [], ru: 'чай' },
      { type: 'typing', q: 'Type “without” in Russian', answer: 'без', accepts: [], ru: 'без' },
      { type: 'mc-ru', q: '“bus” in Russian', options: ['авто́бус', 'маши́на', 'пое́зд', 'самолёт'], answer: 'авто́бус', ru: 'авто́бус' },
      { type: 'mc-en', q: 'Что зна́чит «молоко́»?', options: ['milk', 'sugar', 'tea', 'water'], answer: 'milk', ru: 'молоко́' },
      { type: 'mc-ru', q: 'Complete: Ко́фе ___ са́хара.', options: ['без', 'с', 'на', 'в'], answer: 'без', ru: 'без са́хара' },
      { type: 'typing', q: 'Type “engineer” in Russian', answer: 'инженер', accepts: ['инжене́р'], ru: 'инжене́р' },
      { type: 'mc-en', q: 'Что зна́чит «вме́сте»?', options: ['together', 'alone', 'apart', 'often'], answer: 'together', ru: 'вме́сте' },
      { type: 'mc-ru', q: '“teacher” in Russian', options: ['учи́тель', 'врач', 'инжене́р', 'студе́нт'], answer: 'учи́тель', ru: 'учи́тель' },
      { type: 'typing', q: 'Type “friend (f)” in Russian', answer: 'подруга', accepts: ['подру́га'], ru: 'подру́га' },
      { type: 'mc-en', q: 'Что зна́чит «оди́н»?', options: ['one / alone', 'two', 'only', 'each'], answer: 'one / alone', ru: 'оди́н' }
    ]
  }
};
