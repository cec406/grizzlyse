// Unit 27 — Relative clauses with который. B1.
export const unit = {
  id: 'u27',
  level: 'B1',
  number: 27,
  title: 'Relative clauses',
  titleRu: 'Сло́жные предложе́ния',
  story: 'The man who lives next door. The place where we met. Russian builds these with the flexible word кото́рый and with the relative adverbs где, куда, когда. This unit turns two short sentences into one.',
  grammar: [
    {
      topic: 'кото́рый — who / which',
      explanation: 'кото́рый agrees with the noun it describes in gender and number, but takes the case required by its role in the relative clause. Start from the noun, then decide the case.',
      table: [
        ['Role in clause', 'Form', 'Example'],
        ['subject', 'кото́рый', 'дом, кото́рый стои́т здесь'],
        ['object (animate)', 'кото́рого', 'челове́к, кото́рого я зна́ю'],
        ['dative', 'кото́рому', 'друг, кото́рому я звоню́'],
        ['with preposition', 'в кото́ром', 'дом, в кото́ром мы живём']
      ],
      examples: [
        { ru: 'Вот дом, кото́рый я купи́л.', trans: 'vot dom, kotory ya kupil', en: 'Here is the house that I bought.' },
        { ru: 'Э́то челове́к, кото́рого я зна́ю.', trans: 'eta chelovek, kotorogo ya znayu', en: 'This is the person whom I know.' }
      ]
    },
    {
      topic: 'где, куда, когда as connectors',
      explanation: 'When the relative clause is about place or time, Russian often uses an adverb instead of кото́рый: где (where), куда́ (where to), отку́да (where from), когда́ (when).',
      table: [
        ['Russian', 'English'],
        ['ме́сто, где мы встре́тились', 'the place where we met'],
        ['го́род, куда́ я е́ду', 'the city I am going to'],
        ['день, когда́ всё началось', 'the day when it all began']
      ],
      examples: [
        { ru: 'Я зна́ю ме́сто, где он живёт.', trans: 'ya znayu mesto, gde on zhivyot', en: 'I know the place where he lives.' }
      ]
    },
    {
      topic: 'тот, кто and то, что',
      explanation: 'For a general person or thing, Russian uses тот (the one) or то (the thing) plus кто or что: Тот, кто мно́го чита́ет, мно́го зна́ет.',
      table: [
        ['Russian', 'English'],
        ['Тот, кто мно́го чита́ет, мно́го зна́ет.', 'The one who reads a lot knows a lot.'],
        ['То, что ты сказа́л, ва́жно.', 'What you said is important.'],
        ['Тот, кто рабо́тает, достига́ет це́ли.', 'The one who works reaches the goal.']
      ],
      examples: [
        { ru: 'То, что ты сказа́л, о́чень ва́жно.', trans: 'to, chto ty skazal, ochen vazhno', en: 'What you said is very important.' }
      ]
    }
  ],
  vocabulary: [
    { id: 'u27-kotory', ru: 'кото́рый', translit: 'kotory', en: 'who / which / that', pos: 'pronoun' },
    { id: 'u27-kto', ru: 'кто', translit: 'kto', en: 'who', pos: 'pronoun' },
    { id: 'u27-chto', ru: 'что', translit: 'chto', en: 'what / that', pos: 'pronoun' },
    { id: 'u27-gde', ru: 'где', translit: 'gde', en: 'where', pos: 'adverb' },
    { id: 'u27-kuda', ru: 'куда́', translit: 'kuda', en: 'where to', pos: 'adverb' },
    { id: 'u27-otkuda', ru: 'отку́да', translit: 'otkuda', en: 'where from', pos: 'adverb' },
    { id: 'u27-kogda', ru: 'когда́', translit: 'kogda', en: 'when', pos: 'adverb' },
    { id: 'u27-pochemu', ru: 'почему́', translit: 'pochemu', en: 'why', pos: 'adverb' },
    { id: 'u27-chelovek', ru: 'челове́к', translit: 'chelovek', en: 'person / human', pos: 'noun', gender: 'm' },
    { id: 'u27-veshch', ru: 'вещь', translit: 'veshch', en: 'thing', pos: 'noun', gender: 'f' },
    { id: 'u27-mesto', ru: 'ме́сто', translit: 'mesto', en: 'place', pos: 'noun', gender: 'n' },
    { id: 'u27-znakomy', ru: 'знако́мый', translit: 'znakomy', en: 'acquaintance / familiar', pos: 'noun', gender: 'm' },
    { id: 'u27-sosed', ru: 'сосе́д', translit: 'sosed', en: 'neighbour', pos: 'noun', gender: 'm' },
    { id: 'u27-kolleg', ru: 'колле́га', translit: 'kollega', en: 'colleague', pos: 'noun', gender: 'm' },
    { id: 'u27-nazyvat', ru: 'называ́ть', translit: 'nazyvat', en: 'to call / name', pos: 'verb' },
    { id: 'u27-znachit', ru: 'зна́чит', translit: 'znachit', en: 'it means / so', pos: 'verb' }
  ],
  phrases: [
    { id: 'p-u27-1', ru: 'То, что ты сказа́л, ва́жно.', trans: 'to, chto ty skazal, vazhno', en: 'What you said is important.' },
    { id: 'p-u27-2', ru: 'Э́то дом, в кото́ром я живу́.', trans: 'eta dom, v kotorom ya zhivu', en: 'This is the house where I live.' }
  ],
  sentences: [
    { ru: 'Вот дом, кото́рый я купи́л.', translit: 'vot dom, kotory ya kupil', en: 'Here is the house that I bought.', words: [{ id: 'u27-kotory', ru: 'кото́рый', en: 'which' }] },
    { ru: 'Э́то челове́к, кото́рый рабо́тает со мной.', translit: 'eta chelovek, kotory rabotayet so mnoy', en: 'This is the person who works with me.', words: [{ id: 'u27-chelovek', ru: 'челове́к', en: 'person' }, { id: 'u27-kotory', ru: 'кото́рый', en: 'who' }] },
    { ru: 'Я зна́ю ме́сто, где он живёт.', translit: 'ya znayu mesto, gde on zhivyot', en: 'I know the place where he lives.', words: [{ id: 'u27-mesto', ru: 'ме́сто', en: 'place' }, { id: 'u27-gde', ru: 'где', en: 'where' }] },
    { ru: 'Э́то мой сосе́д, кото́рого я хорошо́ зна́ю.', translit: 'eta moy sosed, kotorogo ya khorosho znayu', en: 'This is my neighbour, whom I know well.', words: [{ id: 'u27-sosed', ru: 'сосе́д', en: 'neighbour' }, { id: 'u27-kotory', ru: 'кото́рого', en: 'whom' }] },
    { ru: 'Скажи́ мне, когда́ ты придёшь.', translit: 'skazhi mne, kogda ty pridyosh', en: 'Tell me when you will come.', words: [{ id: 'u27-kogda', ru: 'когда́', en: 'when' }] }
  ],
  dialogue: {
    title: 'Кто э́то? (Who is that?)',
    lines: [
      { who: 'Том', ru: 'Кто э́тот челове́к, кото́рый сиди́т там?', en: 'Who is that person who is sitting there?' },
      { who: 'Мария', ru: 'Э́то мой колле́га, кото́рый рабо́тает в на́шем о́фисе.', en: 'That is my colleague who works in our office.' },
      { who: 'Том', ru: 'А где ме́сто, где вы обы́чно рабо́таете?', en: 'And where is the place where you usually work?' },
      { who: 'Мария', ru: 'Мы рабо́таем в це́нтре, в до́ме, кото́рый о́чень ста́рый.', en: 'We work in the centre, in a building that is very old.' },
      { who: 'Том', ru: 'Поня́тно. Зна́чит, ты ча́сто там быва́ешь?', en: 'I see. So you are there often?' },
      { who: 'Мария', ru: 'Да, ка́ждый день.', en: 'Yes, every day.' }
    ],
    questions: [
      { type: 'mc-ru', q: 'Кто челове́к, кото́рый сиди́т там?', options: ['колле́га Мари́и', 'сосе́д То́ма', 'брат', 'учи́тель'], answer: 'колле́га Мари́и' },
      { type: 'mc-ru', q: 'Где они́ рабо́тают?', options: ['в це́нтре', 'до́ма', 'в па́рке', 'на заво́де'], answer: 'в це́нтре' },
      { type: 'mc-ru', q: 'Како́й дом?', options: ['ста́рый', 'но́вый', 'большо́й', 'ма́ленький'], answer: 'ста́рый' }
    ]
  },
  quiz: [
    { type: 'mc-en', q: 'Что зна́чит «кото́рый»?', options: ['who / which', 'what', 'where', 'when'], answer: 'who / which', ru: 'кото́рый' },
    { type: 'mc-en', q: 'Что зна́чит «где»?', options: ['where', 'when', 'why', 'how'], answer: 'where', ru: 'где' },
    { type: 'mc-ru', q: '“where to” in Russian', options: ['куда́', 'где', 'отку́да', 'когда́'], answer: 'куда́', ru: 'куда́' },
    { type: 'mc-ru', q: '“where from” in Russian', options: ['отку́да', 'куда́', 'где', 'почему́'], answer: 'отку́да', ru: 'отку́да' },
    { type: 'typing', q: 'Type “who” in Russian', answer: 'кто', accepts: [], ru: 'кто' },
    { type: 'typing', q: 'Type “place” in Russian', answer: 'место', accepts: ['ме́сто'], ru: 'ме́сто' },
    { type: 'mc-en', q: 'Что зна́чит «сосе́д»?', options: ['neighbour', 'colleague', 'acquaintance', 'friend'], answer: 'neighbour', ru: 'сосе́д' },
    { type: 'mc-ru', q: '“why” in Russian', options: ['почему́', 'когда́', 'где', 'кто'], answer: 'почему́', ru: 'почему́' },
    { type: 'mc-en', q: 'Что зна́чит «челове́к»?', options: ['person / human', 'thing', 'place', 'neighbour'], answer: 'person / human', ru: 'челове́к' },
    { type: 'mc-ru', q: 'Complete: Вот дом, ___ я купи́л.', options: ['кото́рый', 'кото́рого', 'кото́рому', 'кото́рой'], answer: 'кото́рый', ru: 'кото́рый' },
    { type: 'typing', q: 'Type “when” in Russian', answer: 'когда', accepts: ['когда́'], ru: 'когда́' },
    { type: 'mc-en', q: 'Что зна́чит «колле́га»?', options: ['colleague', 'neighbour', 'boss', 'friend'], answer: 'colleague', ru: 'колле́га' }
  ],
  test: {
    title: 'Unit 27 test — Relative clauses',
    questions: [
      { type: 'mc-ru', q: '“what / that” in Russian', options: ['что', 'кто', 'где', 'когда́'], answer: 'что', ru: 'что' },
      { type: 'mc-en', q: 'Что зна́чит «вещь»?', options: ['thing', 'person', 'place', 'time'], answer: 'thing', ru: 'вещь' },
      { type: 'typing', q: 'Type “where / which” (relative) in Russian', answer: 'который', accepts: ['кото́рый'], ru: 'кото́рый' },
      { type: 'typing', q: 'Type “where” in Russian', answer: 'где', accepts: [], ru: 'где' },
      { type: 'mc-ru', q: '“acquaintance” in Russian', options: ['знако́мый', 'сосе́д', 'колле́га', 'друг'], answer: 'знако́мый', ru: 'знако́мый' },
      { type: 'mc-en', q: 'Что зна́чит «называ́ть»?', options: ['to call / name', 'to know', 'to meet', 'to mean'], answer: 'to call / name', ru: 'называ́ть' },
      { type: 'mc-ru', q: 'Complete: Э́то челове́к, ___ я зна́ю.', options: ['кото́рого', 'кото́рый', 'кото́рому', 'кото́рой'], answer: 'кото́рого', ru: 'кото́рого' },
      { type: 'typing', q: 'Type “person” in Russian', answer: 'человек', accepts: ['челове́к'], ru: 'челове́к' },
      { type: 'mc-en', q: 'Что зна́чит «зна́чит»?', options: ['it means / so', 'it knows', 'it calls', 'it is'], answer: 'it means / so', ru: 'зна́чит' },
      { type: 'mc-ru', q: '“neighbour” in Russian', options: ['сосе́д', 'колле́га', 'знако́мый', 'челове́к'], answer: 'сосе́д', ru: 'сосе́д' },
      { type: 'typing', q: 'Type “where to” in Russian', answer: 'куда', accepts: ['куда́'], ru: 'куда́' },
      { type: 'mc-en', q: 'Что зна́чит «почему́»?', options: ['why', 'where', 'when', 'who'], answer: 'why', ru: 'почему́' }
    ]
  }
};
