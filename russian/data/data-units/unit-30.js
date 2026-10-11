// Unit 30 — Career and work life. B1.
export const unit = {
  id: 'u30',
  level: 'B1',
  number: 30,
  title: 'Career and work life',
  titleRu: 'Карье́ра',
  story: 'Job interviews, promotions, contracts and business trips. This unit takes the work vocabulary from A2 and goes deeper, with the language of reporting what was said and staying polite in a professional setting.',
  grammar: [
    {
      topic: 'CV and interview language',
      explanation: 'The phrases you need to describe your professional self. Notice that experience and skills are often plural.',
      table: [
        ['Russian', 'English'],
        ['У меня́ мно́го о́пыта.', 'I have a lot of experience.'],
        ['Я хорошо́ говорю́ по-англи́йски.', 'I speak English well.'],
        ['Э́то моя́ си́льная сторона́.', 'This is my strong point.'],
        ['Мои́ на́выки о́чень ва́жны для э́той до́лжности.', 'My skills are very important for this position.']
      ],
      examples: [
        { ru: 'У меня́ пять лет о́пыта в э́той сфе́ре.', trans: 'u menya pyat let opyta v etoy sfere', en: 'I have five years of experience in this field.' }
      ]
    },
    {
      topic: 'Reporting what was said',
      explanation: 'Indirect speech at work uses что plus a normal clause. The tense does not shift the way it does in English.',
      table: [
        ['Russian', 'English'],
        ['Он сказа́л, что согла́сен.', 'He said that he agrees.'],
        ['Она́ попроси́ла, что́бы я позвони́л.', 'She asked me to call.'],
        ['Нача́льник сообщи́л, что бу́дет собра́ние.', 'The boss announced that there will be a meeting.']
      ],
      examples: [
        { ru: 'Шеф сказа́л, что повыше́ние уже́ решено́.', trans: 'shef skazal, chto povysheniye uzhe resheno', en: 'The boss said that the promotion is already decided.' }
      ]
    },
    {
      topic: 'Being polite at work',
      explanation: 'Formal settings use Вы and softer phrasing. These formulas keep you professional.',
      table: [
        ['Russian', 'English'],
        ['Извини́те за беспоко́йство.', 'Sorry to bother you.'],
        ['Позво́льте предложи́ть…', 'Allow me to suggest…'],
        ['Спаси́бо за внима́ние.', 'Thank you for your attention.'],
        ['С уваже́нием, Анна.', 'With respect, Anna. (letter closing)']
      ],
      examples: [
        { ru: 'Позво́льте предложи́ть друго́й план.', trans: 'pozvolte predlozhit drugoy plan', en: 'Allow me to suggest another plan.' }
      ]
    }
  ],
  vocabulary: [
    { id: 'u30-karera', ru: 'карье́ра', translit: 'karyera', en: 'career', pos: 'noun', gender: 'f' },
    { id: 'u30-zarplata', ru: 'зарпла́та', translit: 'zarplata', en: 'salary', pos: 'noun', gender: 'f' },
    { id: 'u30-povyshenie', ru: 'повыше́ние', translit: 'povysheniye', en: 'promotion / rise', pos: 'noun', gender: 'n' },
    { id: 'u30-opyt', ru: 'о́пыт', translit: 'opyt', en: 'experience', pos: 'noun', gender: 'm' },
    { id: 'u30-navyki', ru: 'на́выки', translit: 'navyki', en: 'skills', pos: 'noun', gender: 'p' },
    { id: 'u30-sobesedovanie', ru: 'собесе́дование', translit: 'sobesedovaniye', en: 'interview', pos: 'noun', gender: 'n' },
    { id: 'u30-rezyume', ru: 'резюме́', translit: 'rezyume', en: 'CV / resume', pos: 'noun', gender: 'n' },
    { id: 'u30-dolzhnost', ru: 'до́лжность', translit: 'dolzhnost', en: 'position / post', pos: 'noun', gender: 'f' },
    { id: 'u30-kollegi', ru: 'колле́ги', translit: 'kollegi', en: 'colleagues', pos: 'noun', gender: 'p' },
    { id: 'u30-uspeh', ru: 'успе́х', translit: 'uspekh', en: 'success', pos: 'noun', gender: 'm' },
    { id: 'u30-dogovor', ru: 'догово́р', translit: 'dogovor', en: 'contract / agreement', pos: 'noun', gender: 'm' },
    { id: 'u30-komandirovka', ru: 'командиро́вка', translit: 'komandirovka', en: 'business trip', pos: 'noun', gender: 'f' },
    { id: 'u30-rabotat', ru: 'рабо́тать', translit: 'rabotat', en: 'to work', pos: 'verb' },
    { id: 'u30-dostich', ru: 'дости́чь', translit: 'dostich', en: 'to achieve / reach', pos: 'verb' },
    { id: 'u30-uvazhat', ru: 'уважа́ть', translit: 'uvazhat', en: 'to respect', pos: 'verb' },
    { id: 'u30-otvetstvenny', ru: 'отве́тственный', translit: 'otvetstvenny', en: 'responsible', pos: 'adjective' }
  ],
  phrases: [
    { id: 'p-u30-1', ru: 'Я хочу́ дости́чь успе́ха.', trans: 'ya khochu dostich uspekha', en: 'I want to achieve success.' },
    { id: 'p-u30-2', ru: 'У меня́ мно́го о́пыта.', trans: 'u menya mnogo opyta', en: 'I have a lot of experience.' }
  ],
  sentences: [
    { ru: 'У меня́ мно́го о́пыта.', translit: 'u menya mnogo opyta', en: 'I have a lot of experience.', words: [{ id: 'u30-opyt', ru: 'о́пыта', en: 'experience' }] },
    { ru: 'За́втра у меня́ собесе́дование.', translit: 'zavtra u menya sobesedovaniye', en: 'Tomorrow I have an interview.', words: [{ id: 'u30-sobesedovanie', ru: 'собесе́дование', en: 'interview' }] },
    { ru: 'Он получи́л повыше́ние.', translit: 'on poluchil povysheniye', en: 'He got a promotion.', words: [{ id: 'u30-povyshenie', ru: 'повыше́ние', en: 'promotion' }] },
    { ru: 'Я хочу́ дости́чь успе́ха в карье́ре.', translit: 'ya khochu dostich uspekha v karyere', en: 'I want to achieve success in my career.', words: [{ id: 'u30-dostich', ru: 'дости́чь', en: 'to achieve' }, { id: 'u30-uspeh', ru: 'успе́ха', en: 'success' }, { id: 'u30-karera', ru: 'карье́ре', en: 'career' }] },
    { ru: 'Мы уважа́ем на́ших колле́г.', translit: 'my uvazhayem nashikh kolleg', en: 'We respect our colleagues.', words: [{ id: 'u30-uvazhat', ru: 'уважа́ем', en: 'to respect' }, { id: 'u30-kollegi', ru: 'колле́г', en: 'colleagues' }] }
  ],
  dialogue: {
    title: 'Собесе́дование (The interview)',
    lines: [
      { who: 'Анна', ru: 'Здра́вствуйте! Расскажи́те о ва́шем о́пыте.', en: 'Hello! Tell me about your experience.' },
      { who: 'Том', ru: 'У меня́ пять лет о́пыта в инжене́рии.', en: 'I have five years of experience in engineering.' },
      { who: 'Анна', ru: 'Каки́е у вас на́выки?', en: 'What skills do you have?' },
      { who: 'Том', ru: 'Я хорошо́ рабо́таю в команде и говорю́ по-англи́йски.', en: 'I work well in a team and speak English.' },
      { who: 'Анна', ru: 'Отли́чно. Э́та до́лжность о́чень отве́тственная.', en: 'Excellent. This position is very responsible.' },
      { who: 'Том', ru: 'Я гото́в. Я хочу́ дости́чь успе́ха.', en: 'I am ready. I want to achieve success.' }
    ],
    questions: [
      { type: 'mc-ru', q: 'Ско́лько о́пыта у То́ма?', options: ['пять лет', 'три го́да', 'де́сять лет', 'оди́н год'], answer: 'пять лет' },
      { type: 'mc-ru', q: 'Како́й язы́к он зна́ет?', options: ['англи́йский', 'неме́цкий', 'францу́зский', 'испа́нский'], answer: 'англи́йский' },
      { type: 'mc-ru', q: 'Кака́я до́лжность?', options: ['отве́тственная', 'лёгкая', 'ску́чная', 'проста́я'], answer: 'отве́тственная' }
    ]
  },
  quiz: [
    { type: 'mc-en', q: 'Что зна́чит «карье́ра»?', options: ['career', 'salary', 'contract', 'interview'], answer: 'career', ru: 'карье́ра' },
    { type: 'mc-en', q: 'Что зна́чит «о́пыт»?', options: ['experience', 'skill', 'success', 'position'], answer: 'experience', ru: 'о́пыт' },
    { type: 'mc-ru', q: '“promotion” in Russian', options: ['повыше́ние', 'зарпла́та', 'до́лжность', 'догово́р'], answer: 'повыше́ние', ru: 'повыше́ние' },
    { type: 'mc-ru', q: '“interview” in Russian', options: ['собесе́дование', 'резюме́', 'догово́р', 'карье́ра'], answer: 'собесе́дование', ru: 'собесе́дование' },
    { type: 'typing', q: 'Type “salary” in Russian', answer: 'зарплата', accepts: ['зарпла́та'], ru: 'зарпла́та' },
    { type: 'typing', q: 'Type “success” in Russian', answer: 'успех', accepts: ['успе́х'], ru: 'успе́х' },
    { type: 'mc-en', q: 'Что зна́чит «на́выки»?', options: ['skills', 'experience', 'colleagues', 'contract'], answer: 'skills', ru: 'на́выки' },
    { type: 'mc-ru', q: '“colleagues” in Russian', options: ['колле́ги', 'на́выки', 'колле́га', 'друзья́'], answer: 'колле́ги', ru: 'колле́ги' },
    { type: 'mc-en', q: 'Что зна́чит «догово́р»?', options: ['contract / agreement', 'salary', 'position', 'career'], answer: 'contract / agreement', ru: 'догово́р' },
    { type: 'mc-ru', q: 'Complete: Я хочу́ ___ успе́ха.', options: ['дости́чь', 'уважа́ть', 'рабо́тать', 'получи́ть'], answer: 'дости́чь', ru: 'дости́чь успе́ха' },
    { type: 'typing', q: 'Type “business trip” in Russian', answer: 'командировка', accepts: ['командиро́вка'], ru: 'командиро́вка' },
    { type: 'mc-en', q: 'Что зна́чит «отве́тственный»?', options: ['responsible', 'important', 'difficult', 'strict'], answer: 'responsible', ru: 'отве́тственный' }
  ],
  test: {
    title: 'Unit 30 test — Career and work life',
    questions: [
      { type: 'mc-ru', q: '“position / post” in Russian', options: ['до́лжность', 'зарпла́та', 'карье́ра', 'догово́р'], answer: 'до́лжность', ru: 'до́лжность' },
      { type: 'mc-en', q: 'Что зна́чит «резюме́»?', options: ['CV / resume', 'interview', 'contract', 'salary'], answer: 'CV / resume', ru: 'резюме́' },
      { type: 'typing', q: 'Type “career” in Russian', answer: 'карьера', accepts: ['карье́ра'], ru: 'карье́ра' },
      { type: 'typing', q: 'Type “to respect” in Russian', answer: 'уважать', accepts: ['уважа́ть'], ru: 'уважа́ть' },
      { type: 'mc-ru', q: '“experience” in Russian', options: ['о́пыт', 'на́выки', 'успе́х', 'труд'], answer: 'о́пыт', ru: 'о́пыт' },
      { type: 'mc-en', q: 'Что зна́чит «дости́чь»?', options: ['to achieve / reach', 'to work', 'to respect', 'to get'], answer: 'to achieve / reach', ru: 'дости́чь' },
      { type: 'mc-ru', q: 'Complete: Шеф сказа́л, ___ бу́дет собра́ние.', options: ['что', 'что́бы', 'е́сли', 'бы'], answer: 'что', ru: 'что' },
      { type: 'typing', q: 'Type “contract” in Russian', answer: 'договор', accepts: ['догово́р'], ru: 'догово́р' },
      { type: 'mc-en', q: 'Что зна́чит «командиро́вка»?', options: ['business trip', 'promotion', 'salary', 'interview'], answer: 'business trip', ru: 'командиро́вка' },
      { type: 'mc-ru', q: '“skills” in Russian', options: ['на́выки', 'о́пыт', 'успе́х', 'карье́ра'], answer: 'на́выки', ru: 'на́выки' },
      { type: 'typing', q: 'Type “interview” in Russian', answer: 'собеседование', accepts: ['собесе́дование'], ru: 'собесе́дование' },
      { type: 'mc-en', q: 'Что зна́чит «зарпла́та»?', options: ['salary', 'contract', 'career', 'position'], answer: 'salary', ru: 'зарпла́та' }
    ]
  }
};
