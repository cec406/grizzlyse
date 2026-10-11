// Unit 37 — Complex sentences. B2.
export const unit = {
  id: 'u37',
  level: 'B2',
  number: 37,
  title: 'Complex sentences',
  titleRu: 'Сло́жное предложе́ние',
  story: 'Good writing lives on connectives. This unit gathers the words that link cause, purpose, concession and consequence, so you can build long, clear, adult Russian sentences.',
  grammar: [
    {
      topic: 'Cause: потому́ что, так как',
      explanation: 'потому́ что explains why, and normally joins a second clause. так как states the reason first and is a little more formal.',
      table: [
        ['Russian', 'English'],
        ['Я не пришёл, потому́ что был за́нят.', 'I did not come because I was busy.'],
        ['Так как шёл дождь, мы оста́лись до́ма.', 'Since it was raining, we stayed home.'],
        ['Потому́ что э́то опа́сно.', 'Because it is dangerous.']
      ],
      examples: [
        { ru: 'Я не пришёл, потому́ что был за́нят.', trans: 'ya ne prishel, potomu chto byl zanyat', en: 'I did not come because I was busy.' }
      ]
    },
    {
      topic: 'Concession: хотя́, одна́ко',
      explanation: 'хотя́ means although and introduces a contrast. одна́ко (however) and зато́ (but on the other hand) add shades of contrast in a more literary style.',
      table: [
        ['Russian', 'English'],
        ['Хотя́ бы́ло по́здно, он рабо́тал.', 'Although it was late, he was working.'],
        ['Он уста́л, одна́ко продолжа́л.', 'He was tired, however he continued.'],
        ['Доро́го, зато́ хорошо́.', 'Expensive, but on the other hand it is good.']
      ],
      examples: [
        { ru: 'Хотя́ бы́ло по́здно, он продолжа́л рабо́тать.', trans: 'khotya bylo pozdno, on prodolzhal rabotat', en: 'Although it was late, he kept working.' }
      ]
    },
    {
      topic: 'Consequence and addition',
      explanation: 'поэ́тому and сле́довательно introduce a result; кро́ме того́ and при э́том add extra information.',
      table: [
        ['Russian', 'English'],
        ['Он мно́го учи́лся, поэ́тому сдал экза́мен.', 'He studied a lot, therefore he passed the exam.'],
        ['Кро́ме э́того, он зна́ет три языка́.', 'Besides that, he knows three languages.'],
        ['При э́том ну́жно быть осторо́жным.', 'At the same time one must be careful.'],
        ['Сле́довательно, всё решено́.', 'Consequently, everything is decided.']
      ],
      examples: [
        { ru: 'Кро́ме э́того, он зна́ет три языка́.', trans: 'krome etogo, on znayet tri yazyka', en: 'Besides that, he knows three languages.' }
      ]
    }
  ],
  vocabulary: [
    { id: 'u37-potomu', ru: 'потому́', translit: 'potomu', en: 'that is why', pos: 'adverb' },
    { id: 'u37-poetomu', ru: 'поэ́тому', translit: 'poetomu', en: 'therefore', pos: 'adverb' },
    { id: 'u37-tak-kak', ru: 'так как', translit: 'tak kak', en: 'since / as', pos: 'conjunction' },
    { id: 'u37-khotya', ru: 'хотя́', translit: 'khotya', en: 'although', pos: 'conjunction' },
    { id: 'u37-odnako', ru: 'одна́ко', translit: 'odnako', en: 'however', pos: 'conjunction' },
    { id: 'u37-zato', ru: 'зато́', translit: 'zato', en: 'but on the other hand', pos: 'conjunction' },
    { id: 'u37-pri-etom', ru: 'при э́том', translit: 'pri etom', en: 'at the same time', pos: 'phrase' },
    { id: 'u37-krome', ru: 'кро́ме', translit: 'krome', en: 'besides / except', pos: 'preposition' },
    { id: 'u37-vmesto', ru: 'вме́сто', translit: 'vmesto', en: 'instead of', pos: 'preposition' },
    { id: 'u37-sledovatelno', ru: 'сле́довательно', translit: 'sledovatelno', en: 'consequently', pos: 'adverb' },
    { id: 'u37-vo-pervyh', ru: 'во-пе́рвых', translit: 'vo-pervykh', en: 'firstly', pos: 'adverb' },
    { id: 'u37-vo-vtoryh', ru: 'во-вторы́х', translit: 'vo-vtorykh', en: 'secondly', pos: 'adverb' },
    { id: 'u37-takim-obrazom', ru: 'таки́м о́бразом', translit: 'takim obrazom', en: 'in this way', pos: 'phrase' },
    { id: 'u37-prichina', ru: 'причи́на', translit: 'prichina', en: 'reason / cause', pos: 'noun', gender: 'f' },
    { id: 'u37-sledstvie', ru: 'сле́дствие', translit: 'sledstviye', en: 'consequence', pos: 'noun', gender: 'n' },
    { id: 'u37-tsel', ru: 'цель', translit: 'tsel', en: 'goal / purpose', pos: 'noun', gender: 'f' }
  ],
  phrases: [
    { id: 'p-u37-1', ru: 'Во-пе́рвых, э́то ва́жно.', trans: 'vo-pervykh, eta vazhno', en: 'Firstly, this is important.' },
    { id: 'p-u37-2', ru: 'Таки́м о́бразом, всё я́сно.', trans: 'takim obrazom, vsyo yasno', en: 'In this way, everything is clear.' }
  ],
  sentences: [
    { ru: 'Я не пришёл, потому́ что был за́нят.', translit: 'ya ne prishel, potomu chto byl zanyat', en: 'I did not come because I was busy.', words: [{ id: 'u37-potomu', ru: 'потому́', en: 'because' }] },
    { ru: 'Так как шёл дождь, мы оста́лись до́ма.', translit: 'tak kak shyol dozhd, my ostalis doma', en: 'Since it was raining, we stayed home.', words: [{ id: 'u37-tak-kak', ru: 'Так как', en: 'since' }] },
    { ru: 'Хотя́ бы́ло по́здно, он рабо́тал.', translit: 'khotya bylo pozdno, on rabotal', en: 'Although it was late, he was working.', words: [{ id: 'u37-khotya', ru: 'Хотя́', en: 'although' }] },
    { ru: 'Он мно́го учи́лся, поэ́тому сдал экза́мен.', translit: 'on mnogo uchilsya, poetomu sdal ekzamen', en: 'He studied a lot, therefore he passed the exam.', words: [{ id: 'u37-poetomu', ru: 'поэ́тому', en: 'therefore' }] },
    { ru: 'Кро́ме э́того, он зна́ет три языка́.', translit: 'krome etogo, on znayet tri yazyka', en: 'Besides that, he knows three languages.', words: [{ id: 'u37-krome', ru: 'Кро́ме', en: 'besides' }] }
  ],
  dialogue: {
    title: 'Ло́гика (Logic)',
    lines: [
      { who: 'Мария', ru: 'Почему́ ты не пришёл вчера́?', en: 'Why did you not come yesterday?' },
      { who: 'Том', ru: 'Я не пришёл, потому́ что был за́нят рабо́той.', en: 'I did not come because I was busy with work.' },
      { who: 'Мария', ru: 'Хотя́ ты обеща́л. Кро́ме э́того, ты не позвони́л.', en: 'Although you promised. Besides, you did not call.' },
      { who: 'Том', ru: 'Прости́. Но зато́ я всё сде́лал.', en: 'Sorry. But on the other hand I did everything.' },
      { who: 'Мария', ru: 'Ла́дно. Сле́довательно, за́втра ты свобо́ден?', en: 'All right. Consequently, tomorrow you are free?' },
      { who: 'Том', ru: 'Да, при э́том я хочу́ отдохну́ть.', en: 'Yes, and at the same time I want to rest.' }
    ],
    questions: [
      { type: 'mc-ru', q: 'Почему́ Том не пришёл?', options: ['был за́нят рабо́той', 'был бо́лен', 'забы́л', 'спал'], answer: 'был за́нят рабо́той' },
      { type: 'mc-ru', q: 'Что Том сде́лал?', options: ['всё', 'ничего́', 'полови́ну', 'то́лько ча́сть'], answer: 'всё' },
      { type: 'mc-ru', q: 'Что Том хо́чет за́втра?', options: ['отдохну́ть', 'рабо́тать', 'учи́ться', 'путеше́ствовать'], answer: 'отдохну́ть' }
    ]
  },
  quiz: [
    { type: 'mc-en', q: 'Что зна́чит «потому́ что»?', options: ['because', 'therefore', 'although', 'since'], answer: 'because', ru: 'потому́' },
    { type: 'mc-en', q: 'Что зна́чит «поэ́тому»?', options: ['therefore', 'because', 'although', 'however'], answer: 'therefore', ru: 'поэ́тому' },
    { type: 'mc-ru', q: '“although” in Russian', options: ['хотя́', 'поэ́тому', 'зато́', 'кро́ме'], answer: 'хотя́', ru: 'хотя́' },
    { type: 'mc-ru', q: '“however” in Russian', options: ['одна́ко', 'хотя́', 'потому́', 'зато́'], answer: 'одна́ко', ru: 'одна́ко' },
    { type: 'typing', q: 'Type “consequently” in Russian', answer: 'следовательно', accepts: ['сле́довательно'], ru: 'сле́довательно' },
    { type: 'typing', q: 'Type “firstly” in Russian', answer: 'во-первых', accepts: ['во-пе́рвых'], ru: 'во-пе́рвых' },
    { type: 'mc-en', q: 'Что зна́чит «кро́ме»?', options: ['besides / except', 'instead of', 'because of', 'in front of'], answer: 'besides / except', ru: 'кро́ме' },
    { type: 'mc-ru', q: '“instead of” in Russian', options: ['вме́сто', 'кро́ме', 'при э́том', 'зато́'], answer: 'вме́сто', ru: 'вме́сто' },
    { type: 'mc-en', q: 'Что зна́чит «причи́на»?', options: ['reason / cause', 'consequence', 'goal', 'result'], answer: 'reason / cause', ru: 'причи́на' },
    { type: 'mc-ru', q: 'Complete: Он уста́л, ___ продолжа́л.', options: ['одна́ко', 'потому́', 'поэ́тому', 'так как'], answer: 'одна́ко', ru: 'одна́ко' },
    { type: 'typing', q: 'Type “consequence” in Russian', answer: 'следствие', accepts: ['сле́дствие'], ru: 'сле́дствие' },
    { type: 'mc-en', q: 'Что зна́чит «цель»?', options: ['goal / purpose', 'reason', 'result', 'path'], answer: 'goal / purpose', ru: 'цель' }
  ],
  test: {
    title: 'Unit 37 test — Complex sentences',
    questions: [
      { type: 'mc-ru', q: '“since / as” in Russian', options: ['так как', 'потому́ что', 'поэ́тому', 'хотя́'], answer: 'так как', ru: 'так как' },
      { type: 'mc-en', q: 'Что зна́чит «зато́»?', options: ['but on the other hand', 'therefore', 'because', 'although'], answer: 'but on the other hand', ru: 'зато́' },
      { type: 'typing', q: 'Type “although” in Russian', answer: 'хотя', accepts: ['хотя́'], ru: 'хотя́' },
      { type: 'typing', q: 'Type “therefore” in Russian', answer: 'поэтому', accepts: ['поэ́тому'], ru: 'поэ́тому' },
      { type: 'mc-ru', q: '“secondly” in Russian', options: ['во-вторы́х', 'во-пе́рвых', 'кро́ме', 'вме́сто'], answer: 'во-вторы́х', ru: 'во-вторы́х' },
      { type: 'mc-en', q: 'Что зна́чит «таки́м о́бразом»?', options: ['in this way', 'at the same time', 'instead of', 'besides'], answer: 'in this way', ru: 'таки́м о́бразом' },
      { type: 'mc-ru', q: 'Complete: Доро́го, ___ хорошо́.', options: ['зато́', 'поэ́тому', 'потому́', 'хотя́'], answer: 'зато́', ru: 'зато́' },
      { type: 'typing', q: 'Type “reason” in Russian', answer: 'причина', accepts: ['причи́на'], ru: 'причи́на' },
      { type: 'mc-en', q: 'Что зна́чит «сле́дствие»?', options: ['consequence', 'reason', 'goal', 'way'], answer: 'consequence', ru: 'сле́дствие' },
      { type: 'mc-ru', q: '“consequently” in Russian', options: ['сле́довательно', 'поэ́тому', 'потому́', 'одна́ко'], answer: 'сле́довательно', ru: 'сле́довательно' },
      { type: 'typing', q: 'Type “goal / purpose” in Russian', answer: 'цель', accepts: [], ru: 'цель' },
      { type: 'mc-en', q: 'Что зна́чит «при э́том»?', options: ['at the same time', 'in this way', 'because of this', 'in spite of this'], answer: 'at the same time', ru: 'при э́том' }
    ]
  }
};
