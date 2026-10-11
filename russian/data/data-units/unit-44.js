// Unit 44 — Nuance, particles and fluency. B2.
export const unit = {
  id: 'u44',
  level: 'B2',
  number: 44,
  title: 'Nuance and particles',
  titleRu: 'Нюа́нсы и части́цы',
  story: 'The last stretch to fluency is the small words: же, вот, ведь, разве. They carry tone, emphasis and doubt, and they are everywhere in real speech. This unit polishes your ear for nuance.',
  grammar: [
    {
      topic: 'Particles that emphasise',
      explanation: 'же stresses that something is the very same or self-evident; вот points directly at things; и́менно means precisely or exactly and is used to single something out.',
      table: [
        ['Russian', 'English'],
        ['Вот э́то дом!', 'This here is the house!'],
        ['И́менно э́то я име́л в виду́.', 'This is exactly what I meant.'],
        ['Я э́то же говори́л!', 'I said exactly the same thing!'],
        ['Он сам э́то сде́лал.', 'He did it himself.']
      ],
      examples: [
        { ru: 'Я ведь тебе́ говори́л!', trans: 'ya ved tebe govoril!', en: 'But I told you, after all!' }
      ]
    },
    {
      topic: 'Particles of doubt and softness',
      explanation: 'вря́д ли means unlikely; едва́ means hardly or barely; бу́дто means as if. They soften a claim and are vital for natural, polite speech.',
      table: [
        ['Russian', 'English'],
        ['Вря́д ли он придёт.', 'He is unlikely to come.'],
        ['Он едва́ успе́л на по́езд.', 'He barely caught the train.'],
        ['Он говори́л бу́дто шути́л.', 'He spoke as if joking.'],
        ['Я ли́шь хоте́л помочь.', 'I only wanted to help.']
      ],
      examples: [
        { ru: 'Он едва́ успе́л на по́езд.', trans: 'on edva uspel na poyezd', en: 'He barely caught the train.' }
      ]
    },
    {
      topic: 'Questions full of nuance',
      explanation: 'разве introduces a surprised or doubting question, not a neutral one. совсем means completely or at all. Pairs like уже́ не and ещё не carry their own tone.',
      table: [
        ['Russian', 'English'],
        ['Ра́зве ты не знал?', 'Did you really not know?'],
        ['Ты совсе́м уста́л?', 'Are you completely tired?'],
        ['Ещё́ не го́тов?', 'Still not ready?'],
        ['Непреме́нно придём.', 'We will definitely come.']
      ],
      examples: [
        { ru: 'Ра́зве ты не слы́шал но́вости?', trans: 'razve ty ne slyshal novosti?', en: 'Have you really not heard the news?' }
      ]
    }
  ],
  vocabulary: [
    { id: 'u44-nuans', ru: 'нюа́нс', translit: 'nyuans', en: 'nuance', pos: 'noun', gender: 'm' },
    { id: 'u44-ottenok', ru: 'отте́нок', translit: 'ottenok', en: 'shade / nuance', pos: 'noun', gender: 'm' },
    { id: 'u44-chastitsa', ru: 'части́ца', translit: 'chastitsa', en: 'particle', pos: 'noun', gender: 'f' },
    { id: 'u44-zhe', ru: 'же', translit: 'zhe', en: 'very / the same (emphasis)', pos: 'particle' },
    { id: 'u44-ved', ru: 'ведь', translit: 'ved', en: 'after all / you know', pos: 'particle' },
    { id: 'u44-vot', ru: 'вот', translit: 'vot', en: 'here it is', pos: 'particle' },
    { id: 'u44-imenno', ru: 'и́менно', translit: 'imenno', en: 'exactly / precisely', pos: 'adverb' },
    { id: 'u44-kakraz', ru: 'как раз', translit: 'kak raz', en: 'just right / exactly', pos: 'phrase' },
    { id: 'u44-edva', ru: 'едва́', translit: 'edva', en: 'hardly / barely', pos: 'adverb' },
    { id: 'u44-vryad-li', ru: 'вря́д ли', translit: 'vryad li', en: 'unlikely', pos: 'phrase' },
    { id: 'u44-budto', ru: 'бу́дто', translit: 'budto', en: 'as if', pos: 'conjunction' },
    { id: 'u44-razve', ru: 'ра́зве', translit: 'razve', en: 'really? / surely not', pos: 'particle' },
    { id: 'u44-lish', ru: 'ли́шь', translit: 'lish', en: 'only / merely', pos: 'adverb' },
    { id: 'u44-sovsem', ru: 'совсе́м', translit: 'sovsem', en: 'completely / at all', pos: 'adverb' },
    { id: 'u44-vse-taki', ru: 'всё-таки́', translit: 'vsyo-taki', en: 'still / after all', pos: 'adverb' },
    { id: 'u44-tochno', ru: 'то́чно', translit: 'tochno', en: 'exactly / certainly', pos: 'adverb' },
    { id: 'u44-nepremenno', ru: 'непреме́нно', translit: 'nepremenno', en: 'without fail / definitely', pos: 'adverb' }
  ],
  phrases: [
    { id: 'p-u44-1', ru: 'Я ведь тебе́ говори́л!', trans: 'ya ved tebe govoril!', en: 'But I told you, after all!' },
    { id: 'p-u44-2', ru: 'Э́то как раз то, что мне ну́жно.', trans: 'eta kak raz to, chto mne nuzhno', en: 'This is just the thing I need.' }
  ],
  sentences: [
    { ru: 'Я ведь тебе́ говори́л!', translit: 'ya ved tebe govoril!', en: 'But I told you, after all!', words: [{ id: 'u44-ved', ru: 'ведь', en: 'after all' }] },
    { ru: 'Вот э́то дом!', translit: 'vot eta dom!', en: 'This here is the house!', words: [{ id: 'u44-vot', ru: 'Вот', en: 'here it is' }] },
    { ru: 'И́менно э́то я име́л в виду́.', translit: 'imenno eta ya imel v vidu', en: 'This is exactly what I meant.', words: [{ id: 'u44-imenno', ru: 'И́менно', en: 'exactly' }] },
    { ru: 'Он едва́ успе́л на по́езд.', translit: 'on edva uspel na poyezd', en: 'He barely caught the train.', words: [{ id: 'u44-edva', ru: 'едва́', en: 'barely' }] },
    { ru: 'Э́то как раз то, что мне ну́жно.', translit: 'eta kak raz to, chto mne nuzhno', en: 'This is just what I need.', words: [{ id: 'u44-kakraz', ru: 'как раз', en: 'just right' }] },
    { ru: 'Вря́д ли он придёт.', translit: 'vryad li on pridyot', en: 'He is unlikely to come.', words: [{ id: 'u44-vryad-li', ru: 'Вря́д ли', en: 'unlikely' }] }
  ],
  dialogue: {
    title: 'Нюа́нсы (Nuances)', 
    lines: [
      { who: 'Мария', ru: 'Ты же ви́дел э́тот фильм, правда?', en: 'You have seen this film, right?' },
      { who: 'Том', ru: 'Да, коне́чно. Вот почему́ я его́ зна́ю.', en: 'Yes, of course. That is why I know it.' },
      { who: 'Мария', ru: 'И́менно! А мне он ещё́ не понра́вился.', en: 'Exactly! And I still have not liked it.' },
      { who: 'Том', ru: 'Ра́зве? Он о́чень интере́сный.', en: 'Really? It is very interesting.' },
      { who: 'Мария', ru: 'Вря́д ли я посмотрю́ его́ ещё́ раз.', en: 'I am unlikely to watch it again.' },
      { who: 'Том', ru: 'Но ведь у ка́ждого свой вкус.', en: 'But after all, everyone has their own taste.' }
    ],
    questions: [
      { type: 'mc-ru', q: 'Ви́дел ли Том фильм?', options: ['да', 'нет', 'не зна́ет', 'не по́мнит'], answer: 'да' },
      { type: 'mc-ru', q: 'Что ду́мает Том о фи́льме?', options: ['о́чень интере́сный', 'ску́чный', 'стра́шный', 'до́лгий'], answer: 'о́чень интере́сный' },
      { type: 'mc-ru', q: 'Посмо́трит ли Мари́я фильм ещё́ раз?', options: ['вря́д ли', 'да', 'то́чно', 'непреме́нно'], answer: 'вря́д ли' }
    ]
  },
  quiz: [
    { type: 'mc-en', q: 'Что зна́чит «части́ца»?', options: ['particle', 'nuance', 'adverb', 'conjunction'], answer: 'particle', ru: 'части́ца' },
    { type: 'mc-en', q: 'Что зна́чит «нюа́нс»?', options: ['nuance', 'particle', 'shade', 'meaning'], answer: 'nuance', ru: 'нюа́нс' },
    { type: 'mc-ru', q: '«как раз» значит…', options: ['и́менно, то́чно', 'впо́лне', 'ника́к', 'обы́чно'], answer: 'и́менно, то́чно', ru: 'как раз' },
    { type: 'mc-ru', q: '«вря́д ли» значит…', options: ['вря́д ли', 'то́чно да', 'за́втра', 'иногда́'], answer: 'вря́д ли', ru: 'вря́д ли' },
    { type: 'typing', q: 'Type “exactly / precisely” in Russian', answer: 'именно', accepts: ['и́менно'], ru: 'и́менно' },
    { type: 'typing', q: 'Type “barely / hardly” in Russian', answer: 'едва', accepts: ['едва́'], ru: 'едва́' },
    { type: 'mc-en', q: 'Что зна́чит «ведь»?', options: ['after all / you know', 'where', 'very', 'still'], answer: 'after all / you know', ru: 'ведь' },
    { type: 'mc-ru', q: '«ра́зве» — э́то…', options: ['удивлённый вопро́с', 'обы́чный вопро́с', 'отве́т', 'восклица́ние'], answer: 'удивлённый вопро́с', ru: 'ра́зве' },
    { type: 'mc-en', q: 'Что зна́чит «бу́дто»?', options: ['as if', 'after all', 'exactly', 'unlikely'], answer: 'as if', ru: 'бу́дто' },
    { type: 'mc-ru', q: 'Complete: Я ___ тебе́ говори́л!', options: ['ведь', 'ра́зве', 'ли́шь', 'едва́'], answer: 'ведь', ru: 'ведь' },
    { type: 'typing', q: 'Type “still / after all” in Russian', answer: 'всё-таки', accepts: ['всё-таки́'], ru: 'всё-таки́' },
    { type: 'mc-en', q: 'Что зна́чит «совсе́м»?', options: ['completely / at all', 'hardly', 'only', 'as if'], answer: 'completely / at all', ru: 'совсе́м' }
  ],
  test: {
    title: 'Unit 44 test — Nuance and particles',
    questions: [
      { type: 'mc-ru', q: '«ли́шь» значит…', options: ['то́лько', 'всегда́', 'никогда́', 'мно́го'], answer: 'то́лько', ru: 'ли́шь' },
      { type: 'mc-en', q: 'Что зна́чит «отте́нок»?', options: ['shade / nuance', 'particle', 'sound', 'colour'], answer: 'shade / nuance', ru: 'отте́нок' },
      { type: 'typing', q: 'Type “exactly / certainly” in Russian', answer: 'точно', accepts: ['то́чно'], ru: 'то́чно' },
      { type: 'typing', q: 'Type “without fail” in Russian', answer: 'непременно', accepts: ['непреме́нно'], ru: 'непреме́нно' },
      { type: 'mc-ru', q: '«и́менно» — сино́ним:…', options: ['то́чно', 'случа́йно', 'о́чень', 'че́стно'], answer: 'то́чно', ru: 'и́менно' },
      { type: 'mc-en', q: 'Что зна́чит «вря́д ли»?', options: ['unlikely', 'definitely', 'probably', 'never'], answer: 'unlikely', ru: 'вря́д ли' },
      { type: 'mc-ru', q: 'Complete: ___ э́то дом!', options: ['Вот', 'Же', 'Разве', 'Лить'], answer: 'Вот', ru: 'Вот' },
      { type: 'typing', q: 'Type “as if” in Russian', answer: 'будто', accepts: ['бу́дто'], ru: 'бу́дто' },
      { type: 'mc-en', q: 'Что зна́чит «совсе́м»?', options: ['completely / at all', 'exactly', 'hardly', 'only'], answer: 'completely / at all', ru: 'совсе́м' },
      { type: 'mc-ru', q: '«ра́зве» — э́то…', options: ['удивлённый вопро́с', 'отве́т', 'приве́тствие', 'проща́ние'], answer: 'удивлённый вопро́с', ru: 'ра́зве' },
      { type: 'typing', q: 'Type “here it is” in Russian', answer: 'вот', accepts: [], ru: 'вот' },
      { type: 'mc-en', q: 'Что зна́чит «всё-таки́»?', options: ['still / after all', 'never', 'exactly', 'as if'], answer: 'still / after all', ru: 'всё-таки́' }
    ]
  }
};