// Unit 20 — Work and professions. A2.
export const unit = {
  id: 'u20',
  level: 'A2',
  number: 20,
  title: 'Work and professions',
  titleRu: 'Рабо́та и профе́ссии',
  story: 'Talk about what you do all day: your job, your workplace and your colleagues. You will use в + prepositional for where you work and the instrumental for what you work as.',
  grammar: [
    {
      topic: 'Где вы рабо́таете? в + prepositional',
      explanation: 'The workplace takes в (or на) + prepositional: в о́фисе, в шко́ле, в больни́це, на заво́де.',
      table: [
        ['Workplace', 'Where?', 'English'],
        ['о́фис', 'в о́фисе', 'in an office'],
        ['шко́ла', 'в шко́ле', 'at school'],
        ['больни́ца', 'в больни́це', 'at a hospital'],
        ['заво́д', 'на заво́де', 'at a factory'],
        ['компа́ния', 'в компа́нии', 'at a company']
      ],
      examples: [
        { ru: 'Я рабо́таю в о́фисе.', trans: 'ya rabotayu v ofise', en: 'I work in an office.' },
        { ru: 'Она́ рабо́тает в больни́це.', trans: 'ona rabotayet v bolnitse', en: 'She works at a hospital.' }
      ]
    },
    {
      topic: 'Кем вы рабо́таете? instrumental',
      explanation: 'The job itself is in the instrumental after рабо́тать: рабо́тать врачо́м, быть инжене́ром. Ask «Кем вы рабо́таете?»',
      table: [
        ['Professiya', 'Instrumental', 'English'],
        ['врач', 'врачо́м', 'doctor'],
        ['учи́тель', 'учи́телем', 'teacher'],
        ['инжене́р', 'инжене́ром', 'engineer'],
        ['продаве́ц', 'продавцо́м', 'shop assistant'],
        ['нача́льник', 'нача́льником', 'boss / manager']
      ],
      examples: [
        { ru: 'Я рабо́таю инжене́ром.', trans: 'ya rabotayu inzhenerom', en: 'I work as an engineer.' }
      ]
    },
    {
      topic: 'Talking about work',
      explanation: 'Useful phrases for the office and for meetings.',
      table: [
        ['Russian', 'English'],
        ['У меня́ важная встре́ча.', 'I have an important meeting.'],
        ['Мой нача́льник о́чень стро́гий.', 'My boss is very strict.'],
        ['Я рабо́таю в большо́й компа́нии.', 'I work at a big company.'],
        ['Зарпла́та хоро́шая.', 'The salary is good.']
      ],
      examples: [
        { ru: 'У меня́ сего́дня три встре́чи.', trans: 'u menya segodnya tri vstrechi', en: 'I have three meetings today.' }
      ]
    }
  ],
  vocabulary: [
    { id: 'u20-rabota', ru: 'рабо́та', translit: 'rabota', en: 'work / job', pos: 'noun', gender: 'f' },
    { id: 'u20-rabotnik', ru: 'рабо́тник', translit: 'rabotnik', en: 'worker / employee', pos: 'noun', gender: 'm' },
    { id: 'u20-ofis', ru: 'о́фис', translit: 'ofis', en: 'office', pos: 'noun', gender: 'm' },
    { id: 'u20-zavod', ru: 'заво́д', translit: 'zavod', en: 'factory', pos: 'noun', gender: 'm' },
    { id: 'u20-bolnitsa', ru: 'больни́ца', translit: 'bolnitsa', en: 'hospital', pos: 'noun', gender: 'f' },
    { id: 'u20-shkola', ru: 'шко́ла', translit: 'shkola', en: 'school', pos: 'noun', gender: 'f' },
    { id: 'u20-inzhener', ru: 'инжене́р', translit: 'inzhener', en: 'engineer', pos: 'noun', gender: 'm' },
    { id: 'u20-vrach', ru: 'врач', translit: 'vrach', en: 'doctor', pos: 'noun', gender: 'm' },
    { id: 'u20-uchitel', ru: 'учи́тель', translit: 'uchitel', en: 'teacher', pos: 'noun', gender: 'm' },
    { id: 'u20-prodavets', ru: 'продаве́ц', translit: 'prodavets', en: 'shop assistant', pos: 'noun', gender: 'm' },
    { id: 'u20-zarplata', ru: 'зарпла́та', translit: 'zarplata', en: 'salary', pos: 'noun', gender: 'f' },
    { id: 'u20-nachalnik', ru: 'нача́льник', translit: 'nachalnik', en: 'boss / manager', pos: 'noun', gender: 'm' },
    { id: 'u20-kompaniya', ru: 'компа́ния', translit: 'kompaniya', en: 'company', pos: 'noun', gender: 'f' },
    { id: 'u20-vstrecha', ru: 'встре́ча', translit: 'vstrecha', en: 'meeting', pos: 'noun', gender: 'f' },
    { id: 'u20-vazhny', ru: 'ва́жный', translit: 'vazhny', en: 'important', pos: 'adjective' },
    { id: 'u20-rabotat', ru: 'рабо́тать', translit: 'rabotat', en: 'to work', pos: 'verb' },
    { id: 'u20-delat', ru: 'де́лать', translit: 'delat', en: 'to do / make', pos: 'verb' }
  ],
  phrases: [
    { id: 'p-u20-1', ru: 'Кем вы рабо́таете?', trans: 'kem vy rabotayete?', en: 'What do you work as? (polite)' },
    { id: 'p-u20-2', ru: 'Где вы рабо́таете?', trans: 'gde vy rabotayete?', en: 'Where do you work? (polite)' }
  ],
  sentences: [
    { ru: 'Я рабо́таю в о́фисе.', translit: 'ya rabotayu v ofise', en: 'I work in an office.', words: [{ id: 'u20-rabotat', ru: 'рабо́таю', en: 'to work' }, { id: 'u20-ofis', ru: 'о́фисе', en: 'office' }] },
    { ru: 'Она́ рабо́тает в больни́це врачо́м.', translit: 'ona rabotayet v bolnitse vrachom', en: 'She works as a doctor in a hospital.', words: [{ id: 'u20-bolnitsa', ru: 'больни́це', en: 'hospital' }, { id: 'u20-vrach', ru: 'врачо́м', en: 'doctor' }] },
    { ru: 'Мой нача́льник о́чень ва́жный.', translit: 'moy nachalnik ochen vazhny', en: 'My boss is very important.', words: [{ id: 'u20-nachalnik', ru: 'нача́льник', en: 'boss' }, { id: 'u20-vazhny', ru: 'ва́жный', en: 'important' }] },
    { ru: 'У меня́ сего́дня важная встре́ча.', translit: 'u menya segodnya vazhnaya vstrecha', en: 'I have an important meeting today.', words: [{ id: 'u20-vstrecha', ru: 'встре́ча', en: 'meeting' }] },
    { ru: 'Мы рабо́таем в одно́й компа́нии.', translit: 'my rabotayem v odnoy kompanii', en: 'We work at the same company.', words: [{ id: 'u20-kompaniya', ru: 'компа́нии', en: 'company' }] }
  ],
  dialogue: {
    title: 'О рабо́те (About work)',
    lines: [
      { who: 'Мария', ru: 'Кем вы рабо́таете?', en: 'What do you work as?' },
      { who: 'Том', ru: 'Я инжене́р, рабо́таю в большо́й компа́нии.', en: 'I am an engineer, I work at a big company.' },
      { who: 'Мария', ru: 'А ва́ша жена́?', en: 'And your wife?' },
      { who: 'Том', ru: 'Она́ врач, рабо́тает в больни́це.', en: 'She is a doctor, she works at a hospital.' },
      { who: 'Мария', ru: 'Интере́сно! У вас хоро́шая зарпла́та?', en: 'Interesting! Do you have a good salary?' },
      { who: 'Том', ru: 'Да, неплоха́я. Но мно́го рабо́ты.', en: 'Yes, not bad. But a lot of work.' }
    ],
    questions: [
      { type: 'mc-ru', q: 'Кем рабо́тает Том?', options: ['инжене́ром', 'врачо́м', 'учи́телем', 'продавцо́м'], answer: 'инжене́ром' },
      { type: 'mc-ru', q: 'Где рабо́тает жена́ То́ма?', options: ['в больни́це', 'в о́фисе', 'в шко́ле', 'на заво́де'], answer: 'в больни́це' },
      { type: 'mc-ru', q: 'Кака́я зарпла́та у То́ма?', options: ['неплоха́я', 'плоха́я', 'о́чень ма́ленькая', 'нет зарпла́ты'], answer: 'неплоха́я' }
    ]
  },
  quiz: [
    { type: 'mc-en', q: 'Что зна́чит «рабо́та»?', options: ['work / job', 'office', 'salary', 'meeting'], answer: 'work / job', ru: 'рабо́та' },
    { type: 'mc-en', q: 'Что зна́чит «о́фис»?', options: ['office', 'factory', 'school', 'hospital'], answer: 'office', ru: 'о́фис' },
    { type: 'mc-ru', q: 'How do you say “factory”?', options: ['заво́д', 'о́фис', 'шко́ла', 'больни́ца'], answer: 'заво́д', ru: 'заво́д' },
    { type: 'mc-ru', q: '“salary” in Russian', options: ['зарпла́та', 'рабо́та', 'встре́ча', 'компа́ния'], answer: 'зарпла́та', ru: 'зарпла́та' },
    { type: 'typing', q: 'Type “hospital” in Russian', answer: 'больница', accepts: ['больни́ца'], ru: 'больни́ца' },
    { type: 'typing', q: 'Type “boss / manager” in Russian', answer: 'начальник', accepts: ['нача́льник'], ru: 'нача́льник' },
    { type: 'mc-en', q: 'Что зна́чит «встре́ча»?', options: ['meeting', 'work', 'worker', 'company'], answer: 'meeting', ru: 'встре́ча' },
    { type: 'mc-ru', q: 'Instrumental of «врач»', options: ['врачо́м', 'врача́', 'врачу́', 'врач'], answer: 'врачо́м', ru: 'врачо́м' },
    { type: 'mc-en', q: 'Что зна́чит «ва́жный»?', options: ['important', 'strict', 'big', 'good'], answer: 'important', ru: 'ва́жный' },
    { type: 'mc-ru', q: 'Complete: Я рабо́таю ___ о́фисе.', options: ['в', 'на', 'у', 'из'], answer: 'в', ru: 'в о́фисе' },
    { type: 'typing', q: 'Type “company” in Russian', answer: 'компания', accepts: ['компа́ния'], ru: 'компа́ния' },
    { type: 'mc-en', q: 'Что зна́чит «продаве́ц»?', options: ['shop assistant', 'boss', 'engineer', 'worker'], answer: 'shop assistant', ru: 'продаве́ц' }
  ],
  test: {
    title: 'Unit 20 test — Work and professions',
    questions: [
      { type: 'mc-ru', q: '“engineer” in Russian', options: ['инжене́р', 'врач', 'учи́тель', 'продаве́ц'], answer: 'инжене́р', ru: 'инжене́р' },
      { type: 'mc-en', q: 'Что зна́чит «шко́ла»?', options: ['school', 'hospital', 'office', 'factory'], answer: 'school', ru: 'шко́ла' },
      { type: 'typing', q: 'Type “doctor” in Russian', answer: 'врач', accepts: [], ru: 'врач' },
      { type: 'typing', q: 'Type “to work” in Russian', answer: 'работать', accepts: ['рабо́тать'], ru: 'рабо́тать' },
      { type: 'mc-ru', q: '“teacher” in Russian', options: ['учи́тель', 'врач', 'инжене́р', 'нача́льник'], answer: 'учи́тель', ru: 'учи́тель' },
      { type: 'mc-en', q: 'Что зна́чит «компа́ния»?', options: ['company', 'office', 'meeting', 'salary'], answer: 'company', ru: 'компа́ния' },
      { type: 'mc-ru', q: 'Complete: Она́ рабо́тает ___ шко́ле.', options: ['в', 'на', 'у', 'к'], answer: 'в', ru: 'в шко́ле' },
      { type: 'typing', q: 'Type “office” in Russian', answer: 'офис', accepts: ['о́фис'], ru: 'о́фис' },
      { type: 'mc-en', q: 'Что зна́чит «нача́льник»?', options: ['boss / manager', 'worker', 'teacher', 'engineer'], answer: 'boss / manager', ru: 'нача́льник' },
      { type: 'mc-ru', q: '“important” in Russian', options: ['ва́жный', 'стро́гий', 'большо́й', 'хоро́ший'], answer: 'ва́жный', ru: 'ва́жный' },
      { type: 'typing', q: 'Type “salary” in Russian', answer: 'зарплата', accepts: ['зарпла́та'], ru: 'зарпла́та' },
      { type: 'mc-en', q: 'Что зна́чит «заво́д»?', options: ['factory', 'office', 'school', 'shop'], answer: 'factory', ru: 'заво́д' }
    ]
  }
};
