// Unit 18 — At the doctor. A2.
export const unit = {
  id: 'u18',
  level: 'A2',
  number: 18,
  title: 'At the doctor',
  titleRu: 'У врача́',
  story: 'You feel unwell on a trip. This unit teaches the body words, how to say what hurts («У меня́ боли́т голова́»), how you feel, and what the doctor tells you to do.',
  grammar: [
    {
      topic: 'У меня́ болит…',
      explanation: 'To say a body part hurts, Russian uses у + genitive of the person, then болит (singular) or болят (plural) with the body part as subject.',
      table: [
        ['Russian', 'English'],
        ['У меня́ боли́т голова́.', 'My head hurts.'],
        ['У меня́ боли́т живо́т.', 'My stomach hurts.'],
        ['У него́ боли́т но́га.', 'His leg hurts.'],
        ['У неё боля́т но́ги.', 'Her legs hurt.']
      ],
      examples: [
        { ru: 'У меня́ о́чень боли́т голова́.', trans: 'u menya ochen bolit golova', en: 'My head hurts a lot.' }
      ]
    },
    {
      topic: 'How you feel',
      explanation: 'чу́вствовать себя́ means \"to feel (oneself)\". Add хорошо́, пло́хо, норма́льно. This is how you answer «Как вы себя́ чу́вствуете?»',
      table: [
        ['Russian', 'English'],
        ['Я пло́хо себя́ чу́вствую.', 'I feel bad.'],
        ['Я хорошо́ себя́ чу́вствую.', 'I feel fine.'],
        ['Как вы себя́ чу́вствуете?', 'How do you feel?'],
        ['Мне нехорошо́.', 'I feel unwell.']
      ],
      examples: [
        { ru: 'Сего́дня я пло́хо себя́ чу́вствую.', trans: 'segodnya ya plokho sebya chuvstvuyu', en: 'Today I feel bad.' }
      ]
    },
    {
      topic: 'What the doctor says',
      explanation: 'Advice uses ну́жно + infinitive, or the imperative. Rest, take medicine, drink tea.',
      table: [
        ['Russian', 'English'],
        ['Вам ну́жно отдыха́ть.', 'You need to rest.'],
        ['Принима́йте лека́рство.', 'Take the medicine.'],
        ['Пейте чай с лимо́ном.', 'Drink tea with lemon.'],
        ['Ничего́ стра́шного.', 'Nothing serious.']
      ],
      examples: [
        { ru: 'Вам ну́жно отдыха́ть и пить чай.', trans: 'vam nuzhno otdykhat i pit chay', en: 'You need to rest and drink tea.' }
      ]
    }
  ],
  vocabulary: [
    { id: 'u18-vrach', ru: 'врач', translit: 'vrach', en: 'doctor', pos: 'noun', gender: 'm' },
    { id: 'u18-golova', ru: 'голова́', translit: 'golova', en: 'head', pos: 'noun', gender: 'f' },
    { id: 'u18-ruka', ru: 'рука́', translit: 'ruka', en: 'hand / arm', pos: 'noun', gender: 'f' },
    { id: 'u18-noga', ru: 'нога́', translit: 'noga', en: 'leg / foot', pos: 'noun', gender: 'f' },
    { id: 'u18-zhivot', ru: 'живо́т', translit: 'zhivot', en: 'stomach / belly', pos: 'noun', gender: 'm' },
    { id: 'u18-gorlo', ru: 'го́рло', translit: 'gorlo', en: 'throat', pos: 'noun', gender: 'n' },
    { id: 'u18-temperatura', ru: 'температу́ра', translit: 'temperatura', en: 'temperature / fever', pos: 'noun', gender: 'f' },
    { id: 'u18-lekarstvo', ru: 'лека́рство', translit: 'lekarstvo', en: 'medicine', pos: 'noun', gender: 'n' },
    { id: 'u18-apteka', ru: 'апте́ка', translit: 'apteka', en: 'pharmacy', pos: 'noun', gender: 'f' },
    { id: 'u18-zdorovie', ru: 'здоро́вье', translit: 'zdorovye', en: 'health', pos: 'noun', gender: 'n' },
    { id: 'u18-prostuda', ru: 'просту́да', translit: 'prostuda', en: 'a cold (illness)', pos: 'noun', gender: 'f' },
    { id: 'u18-tabletka', ru: 'табле́тка', translit: 'tabletka', en: 'pill / tablet', pos: 'noun', gender: 'f' },
    { id: 'u18-bolit', ru: 'боле́ть', translit: 'bolet', en: 'to hurt / be ill', pos: 'verb' },
    { id: 'u18-chuvstvovat', ru: 'чу́вствовать', translit: 'chuvstvovat', en: 'to feel', pos: 'verb' },
    { id: 'u18-sebya', ru: 'себя́', translit: 'sebya', en: 'oneself', pos: 'pronoun' },
    { id: 'u18-bolno', ru: 'бо́льно', translit: 'bolno', en: 'it hurts', pos: 'adverb' },
    { id: 'u18-zdorovy', ru: 'здоро́вый', translit: 'zdorovy', en: 'healthy', pos: 'adjective' }
  ],
  phrases: [
    { id: 'p-u18-1', ru: 'У меня́ боли́т голова́.', trans: 'u menya bolit golova', en: 'My head hurts.' },
    { id: 'p-u18-2', ru: 'Я пло́хо себя́ чу́вствую.', trans: 'ya plokho sebya chuvstvuyu', en: 'I feel bad.' }
  ],
  sentences: [
    { ru: 'У меня́ боли́т голова́.', translit: 'u menya bolit golova', en: 'My head hurts.', words: [{ id: 'u18-bolit', ru: 'боли́т', en: 'to hurt' }, { id: 'u18-golova', ru: 'голова́', en: 'head' }] },
    { ru: 'Я пло́хо себя́ чу́вствую.', translit: 'ya plokho sebya chuvstvuyu', en: 'I feel bad.', words: [{ id: 'u18-chuvstvovat', ru: 'чу́вствую', en: 'to feel' }, { id: 'u18-sebya', ru: 'себя́', en: 'oneself' }] },
    { ru: 'У него́ температу́ра.', translit: 'u nego temperatura', en: 'He has a fever.', words: [{ id: 'u18-temperatura', ru: 'температу́ра', en: 'fever' }] },
    { ru: 'Мне ну́жно лека́рство.', translit: 'mne nuzhno lekarstvo', en: 'I need medicine.', words: [{ id: 'u18-lekarstvo', ru: 'лека́рство', en: 'medicine' }] },
    { ru: 'Бо́льно! Где апте́ка?', translit: 'bolno! gde apteka?', en: 'It hurts! Where is the pharmacy?', words: [{ id: 'u18-bolno', ru: 'Бо́льно', en: 'it hurts' }, { id: 'u18-apteka', ru: 'апте́ка', en: 'pharmacy' }] }
  ],
  dialogue: {
    title: 'У врача́ (At the doctor)',
    lines: [
      { who: 'Врач', ru: 'Здра́вствуйте! Как вы себя́ чу́вствуете?', en: 'Hello! How do you feel?' },
      { who: 'Том', ru: 'Пло́хо. У меня́ боли́т голова́ и го́рло.', en: 'Bad. My head and throat hurt.' },
      { who: 'Врач', ru: 'У вас есть температу́ра?', en: 'Do you have a fever?' },
      { who: 'Том', ru: 'Да, три́дцать во́семь.', en: 'Yes, thirty-eight.' },
      { who: 'Врач', ru: 'У вас просту́да. Вам ну́жно отдыха́ть и принима́ть лека́рство.', en: 'You have a cold. You need to rest and take medicine.' }
    ],
    questions: [
      { type: 'mc-ru', q: 'Что боли́т у То́ма?', options: ['голова́ и го́рло', 'нога́', 'живо́т', 'рука́'], answer: 'голова́ и го́рло' },
      { type: 'mc-ru', q: 'Кака́я у него́ температу́ра?', options: ['три́дцать во́семь', 'три́дцать шесть', 'сорок', 'три́дцать де́вять'], answer: 'три́дцать во́семь' },
      { type: 'mc-ru', q: 'Что ну́жно де́лать?', options: ['отдыха́ть и принима́ть лека́рство', 'рабо́тать', 'гуля́ть', 'бе́гать'], answer: 'отдыха́ть и принима́ть лека́рство' }
    ]
  },
  quiz: [
    { type: 'mc-en', q: 'Что зна́чит «голова́»?', options: ['head', 'hand', 'leg', 'throat'], answer: 'head', ru: 'голова́' },
    { type: 'mc-en', q: 'Что зна́чит «лека́рство»?', options: ['medicine', 'pharmacy', 'pill', 'health'], answer: 'medicine', ru: 'лека́рство' },
    { type: 'mc-ru', q: 'How do you say “throat”?', options: ['го́рло', 'голова́', 'живо́т', 'нога́'], answer: 'го́рло', ru: 'го́рло' },
    { type: 'mc-ru', q: '“pharmacy” in Russian', options: ['апте́ка', 'больни́ца', 'врач', 'лека́рство'], answer: 'апте́ка', ru: 'апте́ка' },
    { type: 'typing', q: 'Type “hand / arm” in Russian', answer: 'рука', accepts: ['рука́'], ru: 'рука́' },
    { type: 'typing', q: 'Type “health” in Russian', answer: 'здоровье', accepts: ['здоро́вье'], ru: 'здоро́вье' },
    { type: 'mc-en', q: 'Что зна́чит «боле́ть»?', options: ['to hurt / be ill', 'to feel', 'to rest', 'to sleep'], answer: 'to hurt / be ill', ru: 'боле́ть' },
    { type: 'mc-ru', q: '“leg / foot” in Russian', options: ['нога́', 'рука́', 'голова́', 'живо́т'], answer: 'нога́', ru: 'нога́' },
    { type: 'mc-en', q: 'Что зна́чит «бо́льно»?', options: ['it hurts', 'it is cold', 'it is hot', 'it is late'], answer: 'it hurts', ru: 'бо́льно' },
    { type: 'mc-ru', q: 'Complete: У меня́ ___ голова́.', options: ['боли́т', 'боля́т', 'боль', 'боле́ть'], answer: 'боли́т', ru: 'боли́т голова́' },
    { type: 'typing', q: 'Type “doctor” in Russian', answer: 'врач', accepts: [], ru: 'врач' },
    { type: 'mc-en', q: 'Что зна́чит «температу́ра»?', options: ['temperature / fever', 'health', 'cold', 'pill'], answer: 'temperature / fever', ru: 'температу́ра' }
  ],
  test: {
    title: 'Unit 18 test — At the doctor',
    questions: [
      { type: 'mc-ru', q: '“stomach” in Russian', options: ['живо́т', 'го́рло', 'рука́', 'нога́'], answer: 'живо́т', ru: 'живо́т' },
      { type: 'mc-en', q: 'Что зна́чит «просту́да»?', options: ['a cold (illness)', 'a fever', 'a pill', 'health'], answer: 'a cold (illness)', ru: 'просту́да' },
      { type: 'typing', q: 'Type “pill / tablet” in Russian', answer: 'таблетка', accepts: ['табле́тка'], ru: 'табле́тка' },
      { type: 'typing', q: 'Type “to feel” in Russian', answer: 'чувствовать', accepts: ['чу́вствовать'], ru: 'чу́вствовать' },
      { type: 'mc-ru', q: '“healthy” in Russian', options: ['здоро́вый', 'больно́й', 'бо́льно', 'здоро́вье'], answer: 'здоро́вый', ru: 'здоро́вый' },
      { type: 'mc-en', q: 'Что зна́чит «себя́»?', options: ['oneself', 'myself', 'each other', 'nobody'], answer: 'oneself', ru: 'себя́' },
      { type: 'mc-ru', q: 'Complete: У него́ ___ но́га.', options: ['боли́т', 'боля́т', 'боль', 'боле́ть'], answer: 'боли́т', ru: 'боли́т но́га' },
      { type: 'typing', q: 'Type “head” in Russian', answer: 'голова', accepts: ['голова́'], ru: 'голова́' },
      { type: 'mc-en', q: 'Что зна́чит «апте́ка»?', options: ['pharmacy', 'hospital', 'medicine', 'doctor'], answer: 'pharmacy', ru: 'апте́ка' },
      { type: 'mc-ru', q: '“throat” in Russian', options: ['го́рло', 'голова́', 'живо́т', 'рука́'], answer: 'го́рло', ru: 'го́рло' },
      { type: 'typing', q: 'Type “medicine” in Russian', answer: 'лекарство', accepts: ['лека́рство'], ru: 'лека́рство' },
      { type: 'mc-en', q: 'Что зна́чит «здоро́вье»?', options: ['health', 'medicine', 'illness', 'doctor'], answer: 'health', ru: 'здоро́вье' }
    ]
  }
};
