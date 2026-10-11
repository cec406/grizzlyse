// Unit 6 — Home. A1.
export const unit = {
  id: 'u06',
  level: 'A1',
  number: 6,
  title: 'Home',
  titleRu: 'Дом',
  story: 'Describe where you live and where things are. Russian uses the prepositional case after в ("in") and на ("on") to give a location — this is the first case most learners meet, and it is built with one simple ending: -е.',
  grammar: [
    {
      topic: 'The prepositional case: where things are',
      explanation: 'After в (in) and на (on) for location, nouns take the ending -е. Most nouns just add it; a few spell it with -и after certain letters (к, г, х, ж, ш, ч, щ).',
      table: [
        ['Nominative', 'Prepositional', 'Meaning'],
        ['стол', 'на столе́', 'on the table'],
        ['дом', 'в до́ме', 'in the house'],
        ['Москва́', 'в Москве́', 'in Moscow'],
        ['ку́хня', 'на ку́хне', 'in the kitchen'],
        ['ко́мната', 'в ко́мнате', 'in the room']
      ],
      examples: [
        { ru: 'Кни́га на столе́.', trans: 'kniga na stole', en: 'The book is on the table.' },
        { ru: 'Я живу́ в Москве́.', trans: 'ya zhivu v Moskve', en: 'I live in Moscow.' }
      ]
    },
    {
      topic: 'В or на? Location vs direction',
      explanation: 'For a place where you are, use в/на + prepositional. For a place you are going to, use в/на + accusative instead. Compare: Я в шко́ле (I am at school) vs Я иду́ в шко́лу (I am going to school).',
      table: [
        ['Meaning', 'Case', 'Example'],
        ['where? (location)', 'prepositional', 'в па́рке'],
        ['where to? (direction)', 'accusative', 'в парк'],
        ['at home', 'adverb', 'до́ма']
      ],
      examples: [
        { ru: 'Мы на ку́хне.', trans: 'my na kukhne', en: 'We are in the kitchen.' },
        { ru: 'Он до́ма.', trans: 'on doma', en: 'He is at home.' }
      ]
    },
    {
      topic: 'Где? — asking where',
      explanation: 'Где means "where". Answer with в/на + prepositional, or with the handy adverbs до́ма (at home), здесь/тут (here) and там (there).',
      table: [
        ['Russian', 'English'],
        ['Где ты?', 'Where are you?'],
        ['Где телеви́зор?', 'Where is the TV?'],
        ['Здесь / тут', 'here'],
        ['Там', 'there']
      ],
      examples: [
        { ru: 'Где ключи́? — На столе́.', trans: 'gde klyuchi? na stole', en: 'Where are the keys? — On the table.' }
      ]
    }
  ],
  vocabulary: [
    { id: 'u6-dom', ru: 'дом', translit: 'dom', en: 'house / home', pos: 'noun', gender: 'm' },
    { id: 'u6-kvartira', ru: 'кварти́ра', translit: 'kvartira', en: 'apartment / flat', pos: 'noun', gender: 'f' },
    { id: 'u6-komnata', ru: 'ко́мната', translit: 'komnata', en: 'room', pos: 'noun', gender: 'f' },
    { id: 'u6-kukhnya', ru: 'ку́хня', translit: 'kukhnya', en: 'kitchen', pos: 'noun', gender: 'f' },
    { id: 'u6-vannaya', ru: 'ва́нная', translit: 'vannaya', en: 'bathroom', pos: 'noun', gender: 'f' },
    { id: 'u6-spalnya', ru: 'спа́льня', translit: 'spalnya', en: 'bedroom', pos: 'noun', gender: 'f' },
    { id: 'u6-okno', ru: 'окно́', translit: 'okno', en: 'window', pos: 'noun', gender: 'n' },
    { id: 'u6-dver', ru: 'дверь', translit: 'dver', en: 'door', pos: 'noun', gender: 'f' },
    { id: 'u6-stol', ru: 'стол', translit: 'stol', en: 'table', pos: 'noun', gender: 'm' },
    { id: 'u6-stul', ru: 'стул', translit: 'stul', en: 'chair', pos: 'noun', gender: 'm' },
    { id: 'u6-krovat', ru: 'крова́ть', translit: 'krovat', en: 'bed', pos: 'noun', gender: 'f' },
    { id: 'u6-divan', ru: 'дива́н', translit: 'divan', en: 'sofa', pos: 'noun', gender: 'm' },
    { id: 'u6-televizor', ru: 'телеви́зор', translit: 'televizor', en: 'TV', pos: 'noun', gender: 'm' },
    { id: 'u6-kholodilnik', ru: 'холоди́льник', translit: 'kholodilnik', en: 'refrigerator', pos: 'noun', gender: 'm' },
    { id: 'u6-gde', ru: 'где', translit: 'gde', en: 'where', pos: 'question' },
    { id: 'u6-zhit', ru: 'жить', translit: 'zhit', en: 'to live', pos: 'verb' },
    { id: 'u6-doma', ru: 'до́ма', translit: 'doma', en: 'at home', pos: 'adverb' }
  ],
  phrases: [
    { id: 'p-u6-1', ru: 'Где вы живёте?', trans: 'gde vy zhivyote?', en: 'Where do you live? (polite)' },
    { id: 'p-u6-2', ru: 'Я до́ма.', trans: 'ya doma', en: 'I am at home.' }
  ],
  sentences: [
    { ru: 'Где телеви́зор?', translit: 'gde televizor?', en: 'Where is the TV?', words: [{ id: 'u6-gde', ru: 'Где', en: 'where' }, { id: 'u6-televizor', ru: 'телеви́зор', en: 'TV' }] },
    { ru: 'Кни́га на столе́.', translit: 'kniga na stole', en: 'The book is on the table.', words: [{ id: 'u6-stol', ru: 'столе́', en: 'table' }] },
    { ru: 'Я живу́ в Москве́.', translit: 'ya zhivu v Moskve', en: 'I live in Moscow.', words: [{ id: 'u6-zhit', ru: 'живу́', en: 'to live' }] },
    { ru: 'Мы на ку́хне, а он до́ма.', translit: 'my na kukhne, a on doma', en: 'We are in the kitchen, and he is at home.', words: [{ id: 'u6-kukhnya', ru: 'ку́хне', en: 'kitchen' }, { id: 'u6-doma', ru: 'до́ма', en: 'at home' }] },
    { ru: 'В кварти́ре есть ку́хня и ва́нная.', translit: 'v kvartire yest kukhnya i vannaya', en: 'The apartment has a kitchen and a bathroom.', words: [{ id: 'u6-kvartira', ru: 'кварти́ре', en: 'apartment' }, { id: 'u6-kukhnya', ru: 'ку́хня', en: 'kitchen' }, { id: 'u6-vannaya', ru: 'ва́нная', en: 'bathroom' }] }
  ],
  dialogue: {
    title: 'У меня́ до́ма (At my place)',
    lines: [
      { who: 'Мария', ru: 'Ты живёшь в до́ме и́ли в кварти́ре?', en: 'Do you live in a house or an apartment?' },
      { who: 'Том', ru: 'В кварти́ре. Здесь три ко́мнаты.', en: 'In an apartment. There are three rooms.' },
      { who: 'Мария', ru: 'А где ку́хня?', en: 'And where is the kitchen?' },
      { who: 'Том', ru: 'Нале́во. Там стол и два сту́ла.', en: 'On the left. There is a table and two chairs there.' },
      { who: 'Мария', ru: 'А телеви́зор где?', en: 'And where is the TV?' },
      { who: 'Том', ru: 'В ко́мнате, на дива́не. Здесь о́чень ую́тно.', en: 'In the room, on the sofa. It is very cosy here.' }
    ],
    questions: [
      { type: 'mc-ru', q: 'Где живёт Том?', options: ['в кварти́ре', 'в до́ме', 'в оте́ле', 'в общежи́тии'], answer: 'в кварти́ре' },
      { type: 'mc-ru', q: 'Ско́лько ко́мнат в кварти́ре?', options: ['три', 'две', 'четы́ре', 'одна́'], answer: 'три' },
      { type: 'mc-ru', q: 'Где телеви́зор?', options: ['в ко́мнате', 'на ку́хне', 'в ва́нной', 'в спа́льне'], answer: 'в ко́мнате' }
    ]
  },
  quiz: [
    { type: 'mc-en', q: 'Что зна́чит «ку́хня»?', options: ['kitchen', 'bedroom', 'bathroom', 'room'], answer: 'kitchen', ru: 'ку́хня' },
    { type: 'mc-en', q: 'Что зна́чит «окно́»?', options: ['window', 'door', 'table', 'bed'], answer: 'window', ru: 'окно́' },
    { type: 'mc-ru', q: 'How do you say “chair”?', options: ['стул', 'стол', 'дива́н', 'крова́ть'], answer: 'стул', ru: 'стул' },
    { type: 'mc-ru', q: '“apartment” in Russian', options: ['кварти́ра', 'дом', 'ко́мната', 'спа́льня'], answer: 'кварти́ра', ru: 'кварти́ра' },
    { type: 'typing', q: 'Type “house / home” in Russian', answer: 'дом', accepts: [], ru: 'дом' },
    { type: 'typing', q: 'Type “window” in Russian', answer: 'окно', accepts: ['окно́'], ru: 'окно́' },
    { type: 'mc-en', q: 'Что зна́чит «до́ма»?', options: ['at home', 'house', 'home town', 'to home'], answer: 'at home', ru: 'до́ма' },
    { type: 'mc-ru', q: '“to live” in Russian', options: ['жить', 'есть', 'спать', 'идти́'], answer: 'жить', ru: 'жить' },
    { type: 'mc-en', q: 'Что зна́чит «холоди́льник»?', options: ['refrigerator', 'TV', 'sofa', 'table'], answer: 'refrigerator', ru: 'холоди́льник' },
    { type: 'mc-ru', q: 'Complete: Кни́га ___ столе́.', options: ['на', 'в', 'у', 'с'], answer: 'на', ru: 'на столе́' },
    { type: 'typing', q: 'Type “where” in Russian', answer: 'где', accepts: [], ru: 'где' },
    { type: 'mc-en', q: 'Что зна́чит «дверь»?', options: ['door', 'window', 'wall', 'floor'], answer: 'door', ru: 'дверь' }
  ],
  test: {
    title: 'Unit 6 test — Home',
    questions: [
      { type: 'mc-ru', q: '“bedroom” in Russian', options: ['спа́льня', 'ку́хня', 'ва́нная', 'ко́мната'], answer: 'спа́льня', ru: 'спа́льня' },
      { type: 'mc-en', q: 'Что зна́чит «стол»?', options: ['table', 'chair', 'bed', 'sofa'], answer: 'table', ru: 'стол' },
      { type: 'typing', q: 'Type “TV” in Russian', answer: 'телевизор', accepts: ['телеви́зор'], ru: 'телеви́зор' },
      { type: 'typing', q: 'Type “room” in Russian', answer: 'комната', accepts: ['ко́мната'], ru: 'ко́мната' },
      { type: 'mc-ru', q: '“sofa” in Russian', options: ['дива́н', 'стул', 'крова́ть', 'стол'], answer: 'дива́н', ru: 'дива́н' },
      { type: 'mc-en', q: 'Что зна́чит «крова́ть»?', options: ['bed', 'sofa', 'table', 'door'], answer: 'bed', ru: 'крова́ть' },
      { type: 'mc-ru', q: 'Complete: Я живу́ ___ Москве́.', options: ['в', 'на', 'у', 'к'], answer: 'в', ru: 'в Москве́' },
      { type: 'typing', q: 'Type “at home” in Russian', answer: 'дома', accepts: ['до́ма'], ru: 'до́ма' },
      { type: 'mc-en', q: 'Что зна́чит «ва́нная»?', options: ['bathroom', 'bedroom', 'kitchen', 'hallway'], answer: 'bathroom', ru: 'ва́нная' },
      { type: 'mc-ru', q: '“kitchen” in Russian', options: ['ку́хня', 'ко́мната', 'спа́льня', 'дверь'], answer: 'ку́хня', ru: 'ку́хня' },
      { type: 'typing', q: 'Type “to live” in Russian', answer: 'жить', accepts: [], ru: 'жить' },
      { type: 'mc-en', q: 'Что зна́чит «где»?', options: ['where', 'when', 'why', 'what'], answer: 'where', ru: 'где' }
    ]
  }
};
