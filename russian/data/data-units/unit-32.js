// Unit 32 — Travel and culture. B1.
export const unit = {
  id: 'u32',
  level: 'B1',
  number: 32,
  title: 'Travel and culture',
  titleRu: 'Путеше́ствие и культу́ра',
  story: 'Museums, cathedrals, paintings, traditions. This unit gives you the language of culture and the phrases to say what impressed you on a trip.',
  grammar: [
    {
      topic: 'Talking about famous places',
      explanation: 'изве́стен means famous or well known and agrees with its noun: изве́стен (m), изве́стна (f), изве́стно (n), изве́стны (plural).',
      table: [
        ['Russian', 'English'],
        ['Э́тот музе́й изве́стен во всём ми́ре.', 'This museum is famous all over the world.'],
        ['Э́та карти́на изве́стна.', 'This painting is famous.'],
        ['Здесь изве́стные собо́ры.', 'There are famous cathedrals here.']
      ],
      examples: [
        { ru: 'Э́тот собо́р изве́стен во всём ми́ре.', trans: 'etot sobor izvesten vo vsyom mire', en: 'This cathedral is famous all over the world.' }
      ]
    },
    {
      topic: 'Was built, was founded',
      explanation: 'For historical facts Russian often uses a short passive participle: постро́ен (built), осно́ван (founded), напи́сан (written). The form agrees with the subject.',
      table: [
        ['Russian', 'English'],
        ['Музе́й был постро́ен в 1895 году́.', 'The museum was built in 1895.'],
        ['Го́род был осно́ван в XII ве́ке.', 'The city was founded in the 12th century.'],
        ['Э́та карти́на напи́сана в про́шлом ве́ке.', 'This painting was made last century.']
      ],
      examples: [
        { ru: 'Э́тот го́род был осно́ван мно́го веко́в наза́д.', trans: 'etot gorod byl osnovan mnogo vekov nazad', en: 'This city was founded many centuries ago.' }
      ]
    },
    {
      topic: 'Impressions',
      explanation: 'To say what you liked or what struck you, use понра́вилось (liked) and порази́ло (struck). Both are neuter past forms because the subject is often a whole idea.',
      table: [
        ['Russian', 'English'],
        ['Мне о́чень понра́вилось.', 'I liked it very much.'],
        ['Меня́ порази́ла э́та карти́на.', 'This painting struck me.'],
        ['Э́то бы́ло незабыва́емо.', 'It was unforgettable.']
      ],
      examples: [
        { ru: 'Мне о́чень понра́вилось э́то иску́сство.', trans: 'mne ochen ponravilos eto iskusstvo', en: 'I liked this art very much.' }
      ]
    }
  ],
  vocabulary: [
    { id: 'u32-kultura', ru: 'культу́ра', translit: 'kultura', en: 'culture', pos: 'noun', gender: 'f' },
    { id: 'u32-iskusstvo', ru: 'иску́сство', translit: 'iskusstvo', en: 'art', pos: 'noun', gender: 'n' },
    { id: 'u32-istoriya', ru: 'исто́рия', translit: 'istoriya', en: 'history / story', pos: 'noun', gender: 'f' },
    { id: 'u32-traditsiya', ru: 'тради́ция', translit: 'traditsiya', en: 'tradition', pos: 'noun', gender: 'f' },
    { id: 'u32-prazdnik', ru: 'пра́здник', translit: 'prazdnik', en: 'holiday / festival', pos: 'noun', gender: 'm' },
    { id: 'u32-ekskursiya', ru: 'экску́рсия', translit: 'ekskursiya', en: 'excursion / guided tour', pos: 'noun', gender: 'f' },
    { id: 'u32-gid', ru: 'гид', translit: 'gid', en: 'guide', pos: 'noun', gender: 'm' },
    { id: 'u32-sobor', ru: 'собо́р', translit: 'sobor', en: 'cathedral', pos: 'noun', gender: 'm' },
    { id: 'u32-tserkov', ru: 'це́рковь', translit: 'tserkov', en: 'church', pos: 'noun', gender: 'f' },
    { id: 'u32-kartina', ru: 'карти́на', translit: 'kartina', en: 'painting / picture', pos: 'noun', gender: 'f' },
    { id: 'u32-nasledie', ru: 'насле́дие', translit: 'naslediye', en: 'heritage', pos: 'noun', gender: 'n' },
    { id: 'u32-izvesten', ru: 'изве́стен', translit: 'izvesten', en: 'famous / known', pos: 'adjective' },
    { id: 'u32-raznoobrazny', ru: 'разнообра́зный', translit: 'raznoobrazny', en: 'diverse', pos: 'adjective' },
    { id: 'u32-uvlekatelny', ru: 'увлека́тельный', translit: 'uvlekatelny', en: 'fascinating', pos: 'adjective' },
    { id: 'u32-vdohnovlyat', ru: 'вдохновля́ть', translit: 'vdokhnovlyat', en: 'to inspire', pos: 'verb' }
  ],
  phrases: [
    { id: 'p-u32-1', ru: 'Мне о́чень понра́вилось.', trans: 'mne ochen ponravilos', en: 'I liked it very much.' },
    { id: 'p-u32-2', ru: 'Э́то незабыва́емо!', trans: 'eta nezabyvayemo!', en: 'It is unforgettable!' }
  ],
  sentences: [
    { ru: 'Э́тот музе́й изве́стен во всём ми́ре.', translit: 'etot muzey izvesten vo vsyom mire', en: 'This museum is famous all over the world.', words: [{ id: 'u32-izvesten', ru: 'изве́стен', en: 'famous' }] },
    { ru: 'Мы ходи́ли на экску́рсию с ги́дом.', translit: 'my khodili na ekskursiyu s gidom', en: 'We went on a guided tour with a guide.', words: [{ id: 'u32-ekskursiya', ru: 'экску́рсию', en: 'excursion' }, { id: 'u32-gid', ru: 'ги́дом', en: 'guide' }] },
    { ru: 'Здесь бога́тая культу́ра и исто́рия.', translit: 'zdes bogataya kultura i istoriya', en: 'There is a rich culture and history here.', words: [{ id: 'u32-kultura', ru: 'культу́ра', en: 'culture' }, { id: 'u32-istoriya', ru: 'исто́рия', en: 'history' }] },
    { ru: 'Э́тот пра́здник — ста́рая тради́ция.', translit: 'etot prazdnik staraya traditsiya', en: 'This holiday is an old tradition.', words: [{ id: 'u32-prazdnik', ru: 'пра́здник', en: 'holiday' }, { id: 'u32-traditsiya', ru: 'тради́ция', en: 'tradition' }] },
    { ru: 'Меня́ вдохновля́ет э́то иску́сство.', translit: 'menya vdokhnovlyayet eta iskusstvo', en: 'This art inspires me.', words: [{ id: 'u32-vdohnovlyat', ru: 'вдохновля́ет', en: 'to inspire' }, { id: 'u32-iskusstvo', ru: 'иску́сство', en: 'art' }] }
  ],
  dialogue: {
    title: 'В музе́е (At the museum)',
    lines: [
      { who: 'Гид', ru: 'Э́тот собо́р был постро́ен мно́го веко́в наза́д.', en: 'This cathedral was built many centuries ago.' },
      { who: 'Том', ru: 'Порази́тельно! А э́та карти́на изве́стна?', en: 'Amazing! And is this painting famous?' },
      { who: 'Гид', ru: 'Да, о́чень. Она́ напи́сана в про́шлом ве́ке.', en: 'Yes, very. It was painted last century.' },
      { who: 'Том', ru: 'Мне о́чень нра́вится э́то иску́сство.', en: 'I like this art very much.' },
      { who: 'Гид', ru: 'Здесь бога́тое насле́дие и мно́го тради́ций.', en: 'There is a rich heritage here and many traditions.' },
      { who: 'Том', ru: 'Э́то незабыва́емо! Спаси́бо за экску́рсию.', en: 'It is unforgettable! Thank you for the tour.' }
    ],
    questions: [
      { type: 'mc-ru', q: 'Когда́ постро́или собо́р?', options: ['мно́го веко́в наза́д', 'в про́шлом ве́ке', 'неда́вно', 'в э́том году́'], answer: 'мно́го веко́в наза́д' },
      { type: 'mc-ru', q: 'Изве́стна ли карти́на?', options: ['да, о́чень', 'нет', 'не о́чень', 'не зна́ет'], answer: 'да, о́чень' },
      { type: 'mc-ru', q: 'Что нра́вится То́му?', options: ['иску́сство', 'му́зыка', 'еда́', 'пого́да'], answer: 'иску́сство' }
    ]
  },
  quiz: [
    { type: 'mc-en', q: 'Что зна́чит «культу́ра»?', options: ['culture', 'history', 'art', 'tradition'], answer: 'culture', ru: 'культу́ра' },
    { type: 'mc-en', q: 'Что зна́чит «иску́сство»?', options: ['art', 'culture', 'history', 'heritage'], answer: 'art', ru: 'иску́сство' },
    { type: 'mc-ru', q: '“history” in Russian', options: ['исто́рия', 'культу́ра', 'тради́ция', 'карти́на'], answer: 'исто́рия', ru: 'исто́рия' },
    { type: 'mc-ru', q: '“tradition” in Russian', options: ['тради́ция', 'пра́здник', 'насле́дие', 'культу́ра'], answer: 'тради́ция', ru: 'тради́ция' },
    { type: 'typing', q: 'Type “guide” in Russian', answer: 'гид', accepts: [], ru: 'гид' },
    { type: 'typing', q: 'Type “cathedral” in Russian', answer: 'собор', accepts: ['собо́р'], ru: 'собо́р' },
    { type: 'mc-en', q: 'Что зна́чит «карти́на»?', options: ['painting / picture', 'cathedral', 'heritage', 'guide'], answer: 'painting / picture', ru: 'карти́на' },
    { type: 'mc-ru', q: '“famous / known” in Russian', options: ['изве́стен', 'увлека́тельный', 'разнообра́зный', 'ста́рый'], answer: 'изве́стен', ru: 'изве́стен' },
    { type: 'mc-en', q: 'Что зна́чит «пра́здник»?', options: ['holiday / festival', 'tradition', 'museum', 'church'], answer: 'holiday / festival', ru: 'пра́здник' },
    { type: 'mc-ru', q: 'Complete: Э́тот музе́й ___ во всём ми́ре.', options: ['изве́стен', 'изве́стна', 'изве́стны', 'изве́стно'], answer: 'изве́стен', ru: 'изве́стен' },
    { type: 'typing', q: 'Type “excursion” in Russian', answer: 'экскурсия', accepts: ['экску́рсия'], ru: 'экску́рсия' },
    { type: 'mc-en', q: 'Что зна́чит «вдохновля́ть»?', options: ['to inspire', 'to impress', 'to see', 'to create'], answer: 'to inspire', ru: 'вдохновля́ть' }
  ],
  test: {
    title: 'Unit 32 test — Travel and culture',
    questions: [
      { type: 'mc-ru', q: '“heritage” in Russian', options: ['насле́дие', 'культу́ра', 'иску́сство', 'пра́здник'], answer: 'насле́дие', ru: 'насле́дие' },
      { type: 'mc-en', q: 'Что зна́чит «це́рковь»?', options: ['church', 'cathedral', 'museum', 'square'], answer: 'church', ru: 'це́рковь' },
      { type: 'typing', q: 'Type “culture” in Russian', answer: 'культура', accepts: ['культу́ра'], ru: 'культу́ра' },
      { type: 'typing', q: 'Type “art” in Russian', answer: 'искусство', accepts: ['иску́сство'], ru: 'иску́сство' },
      { type: 'mc-ru', q: '“fascinating” in Russian', options: ['увлека́тельный', 'разнообра́зный', 'изве́стен', 'бога́тый'], answer: 'увлека́тельный', ru: 'увлека́тельный' },
      { type: 'mc-en', q: 'Что зна́чит «разнообра́зный»?', options: ['diverse', 'famous', 'old', 'rich'], answer: 'diverse', ru: 'разнообра́зный' },
      { type: 'mc-ru', q: 'Complete: Го́род был ___ в XII ве́ке.', options: ['осно́ван', 'основа́н', 'основа́на', 'осно́ваны'], answer: 'осно́ван', ru: 'осно́ван' },
      { type: 'typing', q: 'Type “painting” in Russian', answer: 'картина', accepts: ['карти́на'], ru: 'карти́на' },
      { type: 'mc-en', q: 'Что зна́чит «гид»?', options: ['guide', 'tourist', 'artist', 'visitor'], answer: 'guide', ru: 'гид' },
      { type: 'mc-ru', q: '“cathedral” in Russian', options: ['собо́р', 'це́рковь', 'музе́й', 'карти́на'], answer: 'собо́р', ru: 'собо́р' },
      { type: 'typing', q: 'Type “tradition” in Russian', answer: 'традиция', accepts: ['тради́ция'], ru: 'тради́ция' },
      { type: 'mc-en', q: 'Что зна́чит «пра́здник»?', options: ['holiday', 'heritage', 'guide', 'history'], answer: 'holiday', ru: 'пра́здник' }
    ]
  }
};
