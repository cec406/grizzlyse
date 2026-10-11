// Unit 8 — City and transport. A1.
export const unit = {
  id: 'u08',
  level: 'A1',
  number: 8,
  title: 'City and transport',
  titleRu: 'Го́род и тра́нспорт',
  story: 'Find your way around a Russian city: the metro, the bus, the pharmacy, the bank. You will learn the difference between going on foot (идти́) and going by vehicle (е́хать), and how to ask «Куда́?» — "where to?".',
  grammar: [
    {
      topic: 'идти́ vs е́хать — two ways to "go"',
      explanation: 'Russian splits "go" by how you travel. Use идти́ when you are on foot, е́хать when you use a vehicle. Both are for a single trip happening now, in one direction.',
      table: [
        ['How', 'Verb', 'я-form'],
        ['on foot', 'идти́', 'я иду́'],
        ['by vehicle', 'е́хать', 'я е́ду'],
        ['plural on foot', 'идти́', 'мы идём'],
        ['plural by vehicle', 'е́хать', 'мы е́дем']
      ],
      examples: [
        { ru: 'Я иду́ в парк.', trans: 'ya idu v park', en: 'I am walking to the park.' },
        { ru: 'Она́ е́дет на авто́бусе.', trans: 'ona yedet na avtobuse', en: 'She is going by bus.' }
      ]
    },
    {
      topic: 'Direction: в/на + accusative',
      explanation: 'For "to a place", use в/на + accusative. Feminine -а becomes -у: в шко́лу, на рабо́ту. В means "into" an enclosed place; на is used for open surfaces and some fixed places (на рабо́ту, на по́чту).',
      table: [
        ['Where to?', 'Example', 'English'],
        ['в + accusative', 'в шко́лу', 'to school'],
        ['в + accusative', 'в магази́н', 'to the shop'],
        ['на + accusative', 'на рабо́ту', 'to work'],
        ['на + accusative', 'на по́чту', 'to the post office']
      ],
      examples: [
        { ru: 'Мы е́дем в го́род.', trans: 'my yedem v gorod', en: 'We are going to the city.' }
      ]
    },
    {
      topic: 'Куда́? vs Где?',
      explanation: 'Куда́ asks "where to?" (motion) and takes the accusative. Где asks "where?" (location) and takes the prepositional. The verb changes too: идти́/е́хать for motion, быть/жить for location.',
      table: [
        ['Question', 'Meaning', 'Answer'],
        ['Куда́ ты идёшь?', 'Where are you going?', 'В шко́лу.'],
        ['Где ты?', 'Where are you?', 'В шко́ле.']
      ],
      examples: [
        { ru: 'Куда́ вы е́дете? — В Москву́.', trans: 'kuda vy yedete? v Moskvu', en: 'Where are you going? — To Moscow.' }
      ]
    }
  ],
  vocabulary: [
    { id: 'u8-gorod', ru: 'го́род', translit: 'gorod', en: 'city / town', pos: 'noun', gender: 'm' },
    { id: 'u8-ulitsa', ru: 'у́лица', translit: 'ulitsa', en: 'street', pos: 'noun', gender: 'f' },
    { id: 'u8-metro', ru: 'метро́', translit: 'metro', en: 'metro / subway', pos: 'noun', gender: 'n' },
    { id: 'u8-avtobus', ru: 'авто́бус', translit: 'avtobus', en: 'bus', pos: 'noun', gender: 'm' },
    { id: 'u8-taksi', ru: 'такси́', translit: 'taksi', en: 'taxi', pos: 'noun', gender: 'n' },
    { id: 'u8-poezd', ru: 'по́езд', translit: 'poyezd', en: 'train', pos: 'noun', gender: 'm' },
    { id: 'u8-samolyot', ru: 'самолёт', translit: 'samolyot', en: 'airplane', pos: 'noun', gender: 'm' },
    { id: 'u8-vokzal', ru: 'вокза́л', translit: 'vokzal', en: 'railway station', pos: 'noun', gender: 'm' },
    { id: 'u8-ostanovka', ru: 'остано́вка', translit: 'ostanovka', en: 'bus stop', pos: 'noun', gender: 'f' },
    { id: 'u8-magazin', ru: 'магази́н', translit: 'magazin', en: 'shop / store', pos: 'noun', gender: 'm' },
    { id: 'u8-park', ru: 'парк', translit: 'park', en: 'park', pos: 'noun', gender: 'm' },
    { id: 'u8-apteka', ru: 'апте́ка', translit: 'apteka', en: 'pharmacy', pos: 'noun', gender: 'f' },
    { id: 'u8-bank', ru: 'банк', translit: 'bank', en: 'bank', pos: 'noun', gender: 'm' },
    { id: 'u8-shkola', ru: 'шко́ла', translit: 'shkola', en: 'school', pos: 'noun', gender: 'f' },
    { id: 'u8-kuda', ru: 'куда́', translit: 'kuda', en: 'where to', pos: 'question' },
    { id: 'u8-idti', ru: 'идти́', translit: 'idti', en: 'to go (on foot)', pos: 'verb' },
    { id: 'u8-ekhat', ru: 'е́хать', translit: 'yekhat', en: 'to go (by vehicle)', pos: 'verb' },
    { id: 'u8-tam', ru: 'там', translit: 'tam', en: 'there', pos: 'adverb' },
    { id: 'u8-tsentr', ru: 'центр', translit: 'tsentr', en: 'centre / downtown', pos: 'noun', gender: 'm' }
  ],
  phrases: [
    { id: 'p-u8-1', ru: 'Куда́ вы идёте?', trans: 'kuda vy idyote?', en: 'Where are you going? (polite)' },
    { id: 'p-u8-2', ru: 'Где метро́?', trans: 'gde metro?', en: 'Where is the metro?' }
  ],
  sentences: [
    { ru: 'Куда́ ты идёшь?', translit: 'kuda ty idyosh?', en: 'Where are you going?', words: [{ id: 'u8-kuda', ru: 'Куда́', en: 'where to' }, { id: 'u8-idti', ru: 'идёшь', en: 'to go on foot' }] },
    { ru: 'Я иду́ в шко́лу.', translit: 'ya idu v shkolu', en: 'I am walking to school.', words: [{ id: 'u8-idti', ru: 'иду́', en: 'to go on foot' }, { id: 'u8-shkola', ru: 'шко́лу', en: 'school' }] },
    { ru: 'Мы е́дем в го́род.', translit: 'my yedem v gorod', en: 'We are going to the city.', words: [{ id: 'u8-ekhat', ru: 'е́дем', en: 'to go by vehicle' }, { id: 'u8-gorod', ru: 'го́род', en: 'city' }] },
    { ru: 'Метро́ там, а авто́бус здесь.', translit: 'metro tam, a avtobus zdes', en: 'The metro is there, and the bus is here.', words: [{ id: 'u8-metro', ru: 'Метро́', en: 'metro' }, { id: 'u8-tam', ru: 'там', en: 'there' }, { id: 'u8-avtobus', ru: 'авто́бус', en: 'bus' }] },
    { ru: 'Где апте́ка? — На у́лице.', translit: 'gde apteka? na ulitse', en: 'Where is the pharmacy? — On the street.', words: [{ id: 'u8-apteka', ru: 'апте́ка', en: 'pharmacy' }, { id: 'u8-ulitsa', ru: 'у́лице', en: 'street' }] }
  ],
  dialogue: {
    title: 'Как пройти́? (Getting directions)',
    lines: [
      { who: 'Том', ru: 'Извини́те, где метро́?', en: 'Excuse me, where is the metro?' },
      { who: 'Прохожий', ru: 'Метро́ вон там, на у́лице Ле́нина.', en: 'The metro is over there, on Lenin Street.' },
      { who: 'Том', ru: 'А как дое́хать до вокза́ла?', en: 'And how do I get to the railway station?' },
      { who: 'Прохожий', ru: 'На авто́бусе но́мер пять. Остано́вка там.', en: 'By bus number five. The stop is over there.' },
      { who: 'Том', ru: 'Э́то далеко́?', en: 'Is it far?' },
      { who: 'Прохожий', ru: 'Нет, де́сять мину́т. Хоро́шей доро́ги!', en: 'No, ten minutes. Have a good trip!' }
    ],
    questions: [
      { type: 'mc-ru', q: 'Что и́щет Том?', options: ['метро́', 'апте́ку', 'банк', 'парк'], answer: 'метро́' },
      { type: 'mc-ru', q: 'На чём мо́жно дое́хать до вокза́ла?', options: ['на авто́бусе', 'на метро́', 'на такси́', 'на по́езде'], answer: 'на авто́бусе' },
      { type: 'mc-ru', q: 'Ско́лько вре́мени до вокза́ла?', options: ['де́сять мину́т', 'пять мину́т', 'полчаса́', 'час'], answer: 'де́сять мину́т' }
    ]
  },
  quiz: [
    { type: 'mc-en', q: 'Что зна́чит «го́род»?', options: ['city', 'street', 'village', 'country'], answer: 'city', ru: 'го́род' },
    { type: 'mc-en', q: 'Что зна́чит «авто́бус»?', options: ['bus', 'train', 'taxi', 'tram'], answer: 'bus', ru: 'авто́бус' },
    { type: 'mc-ru', q: 'How do you say “metro”?', options: ['метро́', 'такси́', 'по́езд', 'вокза́л'], answer: 'метро́', ru: 'метро́' },
    { type: 'mc-ru', q: '“shop” in Russian', options: ['магази́н', 'апте́ка', 'банк', 'шко́ла'], answer: 'магази́н', ru: 'магази́н' },
    { type: 'typing', q: 'Type “street” in Russian', answer: 'улица', accepts: ['у́лица'], ru: 'у́лица' },
    { type: 'typing', q: 'Type “park” in Russian', answer: 'парк', accepts: [], ru: 'парк' },
    { type: 'mc-en', q: 'Что зна́чит «куда́»?', options: ['where to', 'where', 'when', 'how'], answer: 'where to', ru: 'куда́' },
    { type: 'mc-ru', q: 'Which verb means “go by vehicle”?', options: ['е́хать', 'идти́', 'бежа́ть', 'лете́ть'], answer: 'е́хать', ru: 'е́хать' },
    { type: 'mc-en', q: 'Что зна́чит «апте́ка»?', options: ['pharmacy', 'shop', 'bank', 'hospital'], answer: 'pharmacy', ru: 'апте́ка' },
    { type: 'mc-ru', q: 'Complete: Я иду́ ___ шко́лу.', options: ['в', 'на', 'у', 'из'], answer: 'в', ru: 'в шко́лу' },
    { type: 'typing', q: 'Type “train” in Russian', answer: 'поезд', accepts: ['по́езд'], ru: 'по́езд' },
    { type: 'mc-en', q: 'Что зна́чит «остано́вка»?', options: ['bus stop', 'station', 'street', 'square'], answer: 'bus stop', ru: 'остано́вка' }
  ],
  test: {
    title: 'Unit 8 test — City and transport',
    questions: [
      { type: 'mc-ru', q: '“airplane” in Russian', options: ['самолёт', 'по́езд', 'авто́бус', 'такси́'], answer: 'самолёт', ru: 'самолёт' },
      { type: 'mc-en', q: 'Что зна́чит «вокза́л»?', options: ['railway station', 'airport', 'bus stop', 'shop'], answer: 'railway station', ru: 'вокза́л' },
      { type: 'typing', q: 'Type “taxi” in Russian', answer: 'такси', accepts: ['такси́'], ru: 'такси́' },
      { type: 'typing', q: 'Type “school” in Russian', answer: 'школа', accepts: ['шко́ла'], ru: 'шко́ла' },
      { type: 'mc-ru', q: '“bank” in Russian', options: ['банк', 'магази́н', 'апте́ка', 'вокза́л'], answer: 'банк', ru: 'банк' },
      { type: 'mc-en', q: 'Что зна́чит «центр»?', options: ['centre / downtown', 'street', 'corner', 'suburb'], answer: 'centre / downtown', ru: 'центр' },
      { type: 'mc-ru', q: 'Which verb means “go on foot”?', options: ['идти́', 'е́хать', 'лете́ть', 'плыть'], answer: 'идти́', ru: 'идти́' },
      { type: 'typing', q: 'Type “there” in Russian', answer: 'там', accepts: [], ru: 'там' },
      { type: 'mc-en', q: 'Что зна́чит «у́лица»?', options: ['street', 'city', 'square', 'road'], answer: 'street', ru: 'у́лица' },
      { type: 'mc-ru', q: '“where to” in Russian', options: ['куда́', 'где', 'когда́', 'как'], answer: 'куда́', ru: 'куда́' },
      { type: 'typing', q: 'Type “shop” in Russian', answer: 'магазин', accepts: ['магази́н'], ru: 'магази́н' },
      { type: 'mc-en', q: 'Что зна́чит «метро́»?', options: ['metro / subway', 'bus', 'train', 'taxi'], answer: 'metro / subway', ru: 'метро́' }
    ]
  }
};
