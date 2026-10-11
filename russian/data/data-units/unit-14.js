// Unit 14 — Likes and needs. A2.
export const unit = {
  id: 'u14',
  level: 'A2',
  number: 14,
  title: 'Likes and needs',
  titleRu: 'Нра́вится и ну́жно',
  story: 'Some of the most useful Russian words have no subject at all: «Мне нра́вится», «Мне ну́жно», «Мне хо́лодно». They all use the dative case. This unit lets you say what you like, need, and how you feel.',
  grammar: [
    {
      topic: 'The dative: to/for someone',
      explanation: 'The dative answers \"to whom?\". Learn the pronouns as a block; these are used constantly.',
      table: [
        ['Nominative', 'Dative', 'English'],
        ['я', 'мне', 'to me'],
        ['ты', 'тебе́', 'to you'],
        ['он', 'ему́', 'to him'],
        ['она́', 'ей', 'to her'],
        ['мы', 'нам', 'to us'],
        ['вы', 'вам', 'to you (pl/pol)'],
        ['они́', 'им', 'to them']
      ],
      examples: [
        { ru: 'Мне хо́лодно.', trans: 'mne kholodno', en: 'I am cold. (lit. to me it is cold)' },
        { ru: 'Ему́ ну́жно рабо́тать.', trans: 'yemu nuzhno rabotat', en: 'He needs to work.' }
      ]
    },
    {
      topic: 'Мне нра́вится — I like it',
      explanation: 'This works backwards: the thing you like is the subject. Мне нра́вится фильм (I like the film) but Мне нра́вятся фи́льмы (I like films) — the verb agrees with the thing, not with you.',
      table: [
        ['Russian', 'English'],
        ['Мне нра́вится э́та му́зыка.', 'I like this music.'],
        ['Мне нра́вятся э́ти кни́ги.', 'I like these books.'],
        ['Тебе́ нра́вится Москва́?', 'Do you like Moscow?'],
        ['Ей нра́вится чита́ть.', 'She likes to read.']
      ],
      examples: [
        { ru: 'Мне нра́вится ру́сский язы́к.', trans: 'mne nravitsya russkiy yazyk', en: 'I like the Russian language.' }
      ]
    },
    {
      topic: 'ну́жно, мо́жно, нельзя́',
      explanation: 'These impersonal words take the dative. ну́жно = need, мо́жно = may / one can, нельзя́ = must not / is forbidden.',
      table: [
        ['Russian', 'English'],
        ['Мне ну́жно рабо́тать.', 'I need to work.'],
        ['Мо́жно войти́?', 'May I come in?'],
        ['Здесь нельзя́ кури́ть.', 'You must not smoke here.'],
        ['Тебе́ ну́жно отдыха́ть.', 'You need to rest.']
      ],
      examples: [
        { ru: 'Мне ну́жно купи́ть биле́т.', trans: 'mne nuzhno kupit bilet', en: 'I need to buy a ticket.' }
      ]
    }
  ],
  vocabulary: [
    { id: 'u14-nravitsya', ru: 'нра́виться', translit: 'nravit·sya', en: 'to be pleasing / to like', pos: 'verb' },
    { id: 'u14-nuzhno', ru: 'ну́жно', translit: 'nuzhno', en: 'one needs to', pos: 'adverb' },
    { id: 'u14-mozhno', ru: 'мо́жно', translit: 'mozhno', en: 'one may / it is allowed', pos: 'adverb' },
    { id: 'u14-nelzya', ru: 'нельзя́', translit: 'nelzya', en: 'one must not', pos: 'adverb' },
    { id: 'u14-nuzhen', ru: 'ну́жен', translit: 'nuzhen', en: 'needed (m)', pos: 'adjective' },
    { id: 'u14-interesno', ru: 'интере́сно', translit: 'interesno', en: 'interesting', pos: 'adverb' },
    { id: 'u14-skuchno', ru: 'ску́чно', translit: 'skuchno', en: 'boring', pos: 'adverb' },
    { id: 'u14-holodno', ru: 'хо́лодно', translit: 'kholodno', en: 'cold (to someone)', pos: 'adverb' },
    { id: 'u14-golodno', ru: 'го́лодно', translit: 'golodno', en: 'hungry', pos: 'adverb' },
    { id: 'u14-veselo', ru: 'ве́село', translit: 'veselo', en: 'fun / cheerful', pos: 'adverb' },
    { id: 'u14-mne', ru: 'мне', translit: 'mne', en: 'to me', pos: 'pronoun' },
    { id: 'u14-tebe', ru: 'тебе́', translit: 'tebe', en: 'to you (sing.)', pos: 'pronoun' },
    { id: 'u14-emu', ru: 'ему́', translit: 'yemu', en: 'to him', pos: 'pronoun' },
    { id: 'u14-ey', ru: 'ей', translit: 'yey', en: 'to her', pos: 'pronoun' },
    { id: 'u14-nam', ru: 'нам', translit: 'nam', en: 'to us', pos: 'pronoun' },
    { id: 'u14-vam', ru: 'вам', translit: 'vam', en: 'to you (pl/pol)', pos: 'pronoun' },
    { id: 'u14-im', ru: 'им', translit: 'im', en: 'to them', pos: 'pronoun' },
    { id: 'u14-muzyka', ru: 'му́зыка', translit: 'muzyka', en: 'music', pos: 'noun', gender: 'f' },
    { id: 'u14-yazyk', ru: 'язы́к', translit: 'yazyk', en: 'language / tongue', pos: 'noun', gender: 'm' }
  ],
  phrases: [
    { id: 'p-u14-1', ru: 'Мне нра́вится!', trans: 'mne nravitsya!', en: 'I like it!' },
    { id: 'p-u14-2', ru: 'Мне ну́жно рабо́тать.', trans: 'mne nuzhno rabotat', en: 'I need to work.' }
  ],
  sentences: [
    { ru: 'Мне нра́вится э́та му́зыка.', translit: 'mne nravitsya eta muzyka', en: 'I like this music.', words: [{ id: 'u14-nravitsya', ru: 'нра́вится', en: 'to be pleasing' }, { id: 'u14-muzyka', ru: 'му́зыка', en: 'music' }] },
    { ru: 'Мне ну́жно купи́ть биле́т.', translit: 'mne nuzhno kupit bilet', en: 'I need to buy a ticket.', words: [{ id: 'u14-nuzhno', ru: 'ну́жно', en: 'one needs to' }, { id: 'u14-mne', ru: 'Мне', en: 'to me' }] },
    { ru: 'Здесь нельзя́ кури́ть.', translit: 'zdes nelzya kurit', en: 'You must not smoke here.', words: [{ id: 'u14-nelzya', ru: 'нельзя́', en: 'one must not' }] },
    { ru: 'Мне хо́лодно и го́лодно.', translit: 'mne kholodno i golodno', en: 'I am cold and hungry.', words: [{ id: 'u14-holodno', ru: 'хо́лодно', en: 'cold' }, { id: 'u14-golodno', ru: 'го́лодно', en: 'hungry' }] },
    { ru: 'Ей нра́вится чита́ть, а ему́ — игра́ть.', translit: 'yey nravitsya chitat, a yemu igrat', en: 'She likes to read, and he likes to play.', words: [{ id: 'u14-ey', ru: 'Ей', en: 'to her' }, { id: 'u14-nravitsya', ru: 'нра́вится', en: 'to be pleasing' }, { id: 'u14-emu', ru: 'ему́', en: 'to him' }] }
  ],
  dialogue: {
    title: 'Вку́сы (Tastes)',
    lines: [
      { who: 'Мария', ru: 'Тебе́ нра́вится ру́сская му́зыка?', en: 'Do you like Russian music?' },
      { who: 'Том', ru: 'Да, мне о́чень нра́вится. И язы́к то́же.', en: 'Yes, I like it very much. And the language too.' },
      { who: 'Мария', ru: 'А что тебе́ ну́жно сего́дня?', en: 'And what do you need today?' },
      { who: 'Том', ru: 'Мне ну́жно купи́ть слова́рь.', en: 'I need to buy a dictionary.' },
      { who: 'Мария', ru: 'Здесь есть магази́н. Там мо́жно купи́ть всё.', en: 'There is a shop here. You can buy everything there.' }
    ],
    questions: [
      { type: 'mc-ru', q: 'Что нра́вится То́му?', options: ['ру́сская му́зыка', 'ру́сская еда́', 'спорт', 'кино́'], answer: 'ру́сская му́зыка' },
      { type: 'mc-ru', q: 'Что То́му ну́жно купи́ть?', options: ['слова́рь', 'биле́т', 'хлеб', 'кни́гу'], answer: 'слова́рь' },
      { type: 'mc-ru', q: 'Что мо́жно купи́ть в магази́не?', options: ['всё', 'то́лько кни́ги', 'то́лько еду́', 'ничего́'], answer: 'всё' }
    ]
  },
  quiz: [
    { type: 'mc-en', q: 'Что зна́чит «ну́жно»?', options: ['one needs to', 'one may', 'one must not', 'one wants'], answer: 'one needs to', ru: 'ну́жно' },
    { type: 'mc-en', q: 'Что зна́чит «нельзя́»?', options: ['one must not', 'one may', 'one needs', 'one can'], answer: 'one must not', ru: 'нельзя́' },
    { type: 'mc-ru', q: 'Dative of «я»', options: ['мне', 'меня́', 'мной', 'мы'], answer: 'мне', ru: 'мне' },
    { type: 'mc-ru', q: 'Dative of «он»', options: ['ему́', 'его́', 'им', 'ей'], answer: 'ему́', ru: 'ему́' },
    { type: 'typing', q: 'Type “one may / it is allowed” in Russian', answer: 'можно', accepts: ['мо́жно'], ru: 'мо́жно' },
    { type: 'typing', q: 'Type “to her” in Russian', answer: 'ей', accepts: [], ru: 'ей' },
    { type: 'mc-en', q: 'Что зна́чит «нра́виться»?', options: ['to be pleasing / to like', 'to need', 'to want', 'to love'], answer: 'to be pleasing / to like', ru: 'нра́виться' },
    { type: 'mc-ru', q: '“boring” in Russian', options: ['ску́чно', 'интере́сно', 'ве́село', 'го́лодно'], answer: 'ску́чно', ru: 'ску́чно' },
    { type: 'mc-en', q: 'Что зна́чит «го́лодно»?', options: ['hungry', 'cold', 'fun', 'boring'], answer: 'hungry', ru: 'го́лодно' },
    { type: 'mc-ru', q: 'Complete: ___ ну́жно рабо́тать.', options: ['Мне', 'Я', 'Меня́', 'Мной'], answer: 'Мне', ru: 'Мне ну́жно' },
    { type: 'typing', q: 'Type “to us” in Russian', answer: 'нам', accepts: [], ru: 'нам' },
    { type: 'mc-en', q: 'Что зна́чит «му́зыка»?', options: ['music', 'language', 'film', 'book'], answer: 'music', ru: 'му́зыка' }
  ],
  test: {
    title: 'Unit 14 test — Likes and needs',
    questions: [
      { type: 'mc-ru', q: 'Dative of «мы»', options: ['нам', 'нас', 'мы', 'нами'], answer: 'нам', ru: 'нам' },
      { type: 'mc-en', q: 'Что зна́чит «интере́сно»?', options: ['interesting', 'boring', 'fun', 'difficult'], answer: 'interesting', ru: 'интере́сно' },
      { type: 'typing', q: 'Type “to him” in Russian', answer: 'ему', accepts: ['ему́'], ru: 'ему́' },
      { type: 'typing', q: 'Type “one must not” in Russian', answer: 'нельзя', accepts: ['нельзя́'], ru: 'нельзя́' },
      { type: 'mc-ru', q: '“to you (polite)” in Russian', options: ['вам', 'тебе́', 'нам', 'им'], answer: 'вам', ru: 'вам' },
      { type: 'mc-en', q: 'Что зна́чит «ве́село»?', options: ['fun / cheerful', 'sad', 'cold', 'boring'], answer: 'fun / cheerful', ru: 'ве́село' },
      { type: 'mc-ru', q: 'Complete: Мне ___ э́та му́зыка.', options: ['нра́вится', 'нра́вятся', 'нра́виться', 'ну́жно'], answer: 'нра́вится', ru: 'нра́вится' },
      { type: 'typing', q: 'Type “to them” in Russian', answer: 'им', accepts: [], ru: 'им' },
      { type: 'mc-en', q: 'Что зна́чит «язы́к»?', options: ['language', 'music', 'dictionary', 'mouth'], answer: 'language', ru: 'язы́к' },
      { type: 'mc-ru', q: '“to us” in Russian', options: ['нам', 'вам', 'им', 'мне'], answer: 'нам', ru: 'нам' },
      { type: 'typing', q: 'Type “needed (m)” in Russian', answer: 'нужен', accepts: ['ну́жен'], ru: 'ну́жен' },
      { type: 'mc-en', q: 'Что зна́чит «мо́жно»?', options: ['one may / it is allowed', 'one must not', 'one needs to', 'one wants'], answer: 'one may / it is allowed', ru: 'мо́жно' }
    ]
  }
};
