// Unit 29 — Sharing opinions. B1.
export const unit = {
  id: 'u29',
  level: 'B1',
  number: 29,
  title: 'Sharing opinions',
  titleRu: 'Мне́ние',
  story: 'A good conversation is not just facts; it is opinions. This unit gives you the phrases to agree, disagree, hedge, argue and discuss, from Я ду́маю до По-мо́ему.',
  grammar: [
    {
      topic: 'Giving an opinion',
      explanation: 'The core pattern is Я ду́маю, что… or Я счита́ю, что… followed by a normal clause. Po-móemu is a handy adverb meaning in my opinion.',
      table: [
        ['Russian', 'English'],
        ['Я ду́маю, что э́то пра́вильно.', 'I think that this is right.'],
        ['Я счита́ю, что ты прав.', 'I consider that you are right.'],
        ['По-мо́ему, э́то пробле́ма.', 'In my opinion, this is a problem.'],
        ['Мне ка́жется, он ошиба́ется.', 'It seems to me he is mistaken.']
      ],
      examples: [
        { ru: 'По-мо́ему, э́то о́чень интере́сно.', trans: 'po-moyemu, eta ochen interesno', en: 'In my opinion, this is very interesting.' }
      ]
    },
    {
      topic: 'Agreeing and disagreeing',
      explanation: 'Agreement with a man is согла́сен, with a woman согла́сна. Rights and wrongs follow the same gender logic: прав / права́.',
      table: [
        ['Russian', 'English'],
        ['Я согла́сен.', 'I agree. (man)'],
        ['Я согла́сна.', 'I agree. (woman)'],
        ['Ты прав.', 'You are right. (to a man)'],
        ['Я не согла́сен с тобо́й.', 'I do not agree with you.']
      ],
      examples: [
        { ru: 'Я согла́сен с тобо́й, ты прав.', trans: 'ya soglasen s toboy, ty prav', en: 'I agree with you, you are right.' }
      ]
    },
    {
      topic: 'Arguing and discussing',
      explanation: 'When opinions clash, you need спо́рить (to argue), обсужда́ть (to discuss) and ошиба́ться (to be mistaken). These verbs take the prepositional or accusative as shown.',
      table: [
        ['Russian', 'English'],
        ['Мы спо́рим об э́том.', 'We argue about this.'],
        ['Дава́й обсу́дим э́ту те́му.', 'Let us discuss this topic.'],
        ['Ты ошиба́ешься.', 'You are mistaken.'],
        ['Э́то пра́вда? — Нет, непра́вда.', 'Is that true? — No, it is not true.']
      ],
      examples: [
        { ru: 'Дава́й обсу́дим э́ту пробле́му вме́сте.', trans: 'davay obsudim etu problemu vmeste', en: 'Let us discuss this problem together.' }
      ]
    }
  ],
  vocabulary: [
    { id: 'u29-mnenie', ru: 'мне́ние', translit: 'mneniye', en: 'opinion', pos: 'noun', gender: 'n' },
    { id: 'u29-dumat', ru: 'ду́мать', translit: 'dumat', en: 'to think', pos: 'verb' },
    { id: 'u29-schitat', ru: 'счита́ть', translit: 'schitat', en: 'to consider', pos: 'verb' },
    { id: 'u29-kazhetsya', ru: 'ка́жется', translit: 'kazhetsya', en: 'it seems', pos: 'verb' },
    { id: 'u29-soglasen', ru: 'согла́сен', translit: 'soglasen', en: 'agreeing (m)', pos: 'adjective' },
    { id: 'u29-prav', ru: 'прав', translit: 'prav', en: 'right / correct (m)', pos: 'adjective' },
    { id: 'u29-pravilno', ru: 'пра́вильно', translit: 'pravilno', en: 'correctly / right', pos: 'adverb' },
    { id: 'u29-oshibatsya', ru: 'ошиба́ться', translit: 'oshibat·sya', en: 'to be mistaken', pos: 'verb' },
    { id: 'u29-sporit', ru: 'спо́рить', translit: 'sporit', en: 'to argue', pos: 'verb' },
    { id: 'u29-obsuzhdat', ru: 'обсужда́ть', translit: 'obsuzhdat', en: 'to discuss', pos: 'verb' },
    { id: 'u29-verit', ru: 'ве́рить', translit: 'verit', en: 'to believe', pos: 'verb' },
    { id: 'u29-tema', ru: 'те́ма', translit: 'tema', en: 'topic', pos: 'noun', gender: 'f' },
    { id: 'u29-problema', ru: 'пробле́ма', translit: 'problema', en: 'problem', pos: 'noun', gender: 'f' },
    { id: 'u29-pravda', ru: 'пра́вда', translit: 'pravda', en: 'truth', pos: 'noun', gender: 'f' },
    { id: 'u29-pohozh', ru: 'похо́же', translit: 'pokhozhe', en: 'it seems / similar', pos: 'adverb' },
    { id: 'u29-tochka', ru: 'то́чка', translit: 'tochka', en: 'point / dot', pos: 'noun', gender: 'f' },
    { id: 'u29-po-moemu', ru: 'по-мо́ему', translit: 'po-moyemu', en: 'in my opinion', pos: 'adverb' }
  ],
  phrases: [
    { id: 'p-u29-1', ru: 'Я ду́маю, что…', trans: 'ya dumayu, chto…', en: 'I think that…' },
    { id: 'p-u29-2', ru: 'Я согла́сен с тобо́й.', trans: 'ya soglasen s toboy', en: 'I agree with you.' }
  ],
  sentences: [
    { ru: 'По-мо́ему, э́то пра́вильно.', translit: 'po-moyemu, eta pravilno', en: 'In my opinion, this is right.', words: [{ id: 'u29-po-moemu', ru: 'По-мо́ему', en: 'in my opinion' }, { id: 'u29-pravilno', ru: 'пра́вильно', en: 'correctly' }] },
    { ru: 'Я ду́маю, что ты прав.', translit: 'ya dumayu, chto ty prav', en: 'I think that you are right.', words: [{ id: 'u29-dumat', ru: 'ду́маю', en: 'to think' }, { id: 'u29-prav', ru: 'прав', en: 'right' }] },
    { ru: 'Она́ счита́ет, что э́то пробле́ма.', translit: 'ona schitayet, chto eta problema', en: 'She considers that this is a problem.', words: [{ id: 'u29-schitat', ru: 'счита́ет', en: 'to consider' }, { id: 'u29-problema', ru: 'пробле́ма', en: 'problem' }] },
    { ru: 'Мне ка́жется, он ошиба́ется.', translit: 'mne kazhetsya, on oshibayetsya', en: 'It seems to me he is mistaken.', words: [{ id: 'u29-kazhetsya', ru: 'ка́жется', en: 'it seems' }, { id: 'u29-oshibatsya', ru: 'ошиба́ется', en: 'to be mistaken' }] },
    { ru: 'Мы ча́сто спо́рим об э́том.', translit: 'my chasto sporim ob etom', en: 'We often argue about this.', words: [{ id: 'u29-sporit', ru: 'спо́рим', en: 'to argue' }] }
  ],
  dialogue: {
    title: 'Спор (An argument)',
    lines: [
      { who: 'Мария', ru: 'По-мо́ему, э́тот фильм о́чень ску́чный.', en: 'In my opinion, this film is very boring.' },
      { who: 'Том', ru: 'Я не согла́сен. Мне ка́жется, он интере́сный.', en: 'I do not agree. It seems to me it is interesting.' },
      { who: 'Мария', ru: 'Почему́? Ты лю́бишь таки́е те́мы?', en: 'Why? Do you like such topics?' },
      { who: 'Том', ru: 'Да, я ве́рю, что в нём есть глубо́кий смысл.', en: 'Yes, I believe there is a deep meaning in it.' },
      { who: 'Мария', ru: 'Возмо́жно, ты прав. Дава́й обсу́дим э́то по́сле кино́.', en: 'Maybe you are right. Let us discuss this after the cinema.' },
      { who: 'Том', ru: 'Хорошо́, но я не люблю́ спо́рить.', en: 'Fine, but I do not like to argue.' }
    ],
    questions: [
      { type: 'mc-ru', q: 'Что ду́мает Мари́я о фи́льме?', options: ['он ску́чный', 'он интере́сный', 'он стра́шный', 'он краси́вый'], answer: 'он ску́чный' },
      { type: 'mc-ru', q: 'Согла́сен ли Том?', options: ['нет, не согла́сен', 'да', 'не зна́ет', 'ему всё равно́'], answer: 'нет, не согла́сен' },
      { type: 'mc-ru', q: 'Что они́ бу́дут де́лать по́сле кино́?', options: ['обсужда́ть фильм', 'спать', 'гуля́ть', 'рабо́тать'], answer: 'обсужда́ть фильм' }
    ]
  },
  quiz: [
    { type: 'mc-en', q: 'Что зна́чит «мне́ние»?', options: ['opinion', 'problem', 'topic', 'truth'], answer: 'opinion', ru: 'мне́ние' },
    { type: 'mc-en', q: 'Что зна́чит «по-мо́ему»?', options: ['in my opinion', 'in your opinion', 'maybe', 'of course'], answer: 'in my opinion', ru: 'по-мо́ему' },
    { type: 'mc-ru', q: '“I agree” (man)', options: ['Я согла́сен', 'Я согла́сна', 'Я прав', 'Я ошиба́юсь'], answer: 'Я согла́сен', ru: 'Я согла́сен' },
    { type: 'mc-ru', q: '“You are right” (to a man)', options: ['Ты прав', 'Ты права́', 'Ты ошиба́ешься', 'Ты согла́сен'], answer: 'Ты прав', ru: 'Ты прав' },
    { type: 'typing', q: 'Type “opinion” in Russian', answer: 'мнение', accepts: ['мне́ние'], ru: 'мне́ние' },
    { type: 'typing', q: 'Type “to argue” in Russian', answer: 'спорить', accepts: ['спо́рить'], ru: 'спо́рить' },
    { type: 'mc-en', q: 'Что зна́чит «ошиба́ться»?', options: ['to be mistaken', 'to agree', 'to discuss', 'to believe'], answer: 'to be mistaken', ru: 'ошиба́ться' },
    { type: 'mc-ru', q: '“to discuss” in Russian', options: ['обсужда́ть', 'спо́рить', 'ве́рить', 'счита́ть'], answer: 'обсужда́ть', ru: 'обсужда́ть' },
    { type: 'mc-en', q: 'Что зна́чит «пра́вда»?', options: ['truth', 'lie', 'problem', 'opinion'], answer: 'truth', ru: 'пра́вда' },
    { type: 'mc-ru', q: 'Complete: Я ___ , что ты прав.', options: ['ду́маю', 'ка́жется', 'спо́рю', 'ве́рю'], answer: 'ду́маю', ru: 'ду́маю' },
    { type: 'typing', q: 'Type “problem” in Russian', answer: 'проблема', accepts: ['пробле́ма'], ru: 'пробле́ма' },
    { type: 'mc-en', q: 'Что зна́чит «ве́рить»?', options: ['to believe', 'to think', 'to argue', 'to discuss'], answer: 'to believe', ru: 'ве́рить' }
  ],
  test: {
    title: 'Unit 29 test — Sharing opinions',
    questions: [
      { type: 'mc-ru', q: '“to consider” in Russian', options: ['счита́ть', 'ду́мать', 'ве́рить', 'спо́рить'], answer: 'счита́ть', ru: 'счита́ть' },
      { type: 'mc-en', q: 'Что зна́чит «те́ма»?', options: ['topic', 'problem', 'opinion', 'truth'], answer: 'topic', ru: 'те́ма' },
      { type: 'typing', q: 'Type “truth” in Russian', answer: 'правда', accepts: ['пра́вда'], ru: 'пра́вда' },
      { type: 'typing', q: 'Type “to think” in Russian', answer: 'думать', accepts: ['ду́мать'], ru: 'ду́мать' },
      { type: 'mc-ru', q: '“it seems” in Russian', options: ['ка́жется', 'похо́же', 'пра́вильно', 'возмо́жно'], answer: 'ка́жется', ru: 'ка́жется' },
      { type: 'mc-en', q: 'Что зна́чит «точка зре́ния»?', options: ['point of view', 'problem', 'topic', 'opinion'], answer: 'point of view', ru: 'то́чка' },
      { type: 'mc-ru', q: 'Complete: Мне ___, что э́то не так.', options: ['ка́жется', 'ду́маю', 'спо́рю', 'ве́рю'], answer: 'ка́жется', ru: 'ка́жется' },
      { type: 'typing', q: 'Type “to be mistaken” in Russian', answer: 'ошибаться', accepts: ['ошиба́ться'], ru: 'ошиба́ться' },
      { type: 'mc-en', q: 'Что зна́чит «пра́вильно»?', options: ['correctly / right', 'wrongly', 'probably', 'maybe'], answer: 'correctly / right', ru: 'пра́вильно' },
      { type: 'mc-ru', q: '“to discuss” in Russian', options: ['обсужда́ть', 'спо́рить', 'счита́ть', 'ве́рить'], answer: 'обсужда́ть', ru: 'обсужда́ть' },
      { type: 'typing', q: 'Type “in my opinion” in Russian', answer: 'по-моему', accepts: ['по-мо́ему'], ru: 'по-мо́ему' },
      { type: 'mc-en', q: 'Что зна́чит «спо́рить»?', options: ['to argue', 'to agree', 'to discuss', 'to believe'], answer: 'to argue', ru: 'спо́рить' }
    ]
  }
};
