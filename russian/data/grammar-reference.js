// Grammar reference tables, cross-checked. Content is for learners at the given levels.
export const GRAMMAR_TOPICS = [
  {
    id: 'gender', level: 'A1', title: 'Noun gender and plural',
    intro: 'Every Russian noun is masculine, feminine or neuter. You can usually see the gender from the ending.',
    table: [
      ['Gender', 'Ending', 'Example', 'Meaning'],
      ['Masculine', 'consonant / -й / -ь', 'стол', 'table'],
      ['','','музей', 'museum'],
      ['Feminine', '-а / -я / -ь', 'кни́га', 'book'],
      ['Neuter', '-о / -е', 'окно́', 'window'],
      ['Plural', '-ы/-и/-а/-я', 'столы́, кни́ги, окна', 'tables, books, windows']
    ],
    examples: [
      { ru: 'два сто́ла', en: 'two tables (2-4 → genitive singular)' },
      { ru: 'пять столов', en: 'five tables (5+ → genitive plural)' }
    ]
  },
  {
    id: 'pronouns', level: 'A1', title: 'Personal pronouns',
    intro: 'Six people in Russian — exactly like English, but он/она also mean "it" for masculine/feminine nouns.',
    table: [
      ['Singular', '', 'Plural', ''],
      ['я', 'I', 'мы', 'we'],
      ['ты', 'you (informal)', 'вы', 'you (plural/formal)'],
      ['он', 'he / it (m)', 'они', 'they'],
      ['она', 'she / it (f)', '—', '—'],
      ['оно', 'it (n)', '—', '—']
    ],
    examples: [
      { ru: 'Я люблю́. Ты рабо́таешь.', en: 'I love. You work.' },
      { ru: 'Вы говори́те по-ру́сски?', en: 'Do you speak Russian? (formal/plural)' }
    ]
  },
  {
    id: 'present', level: 'A1', title: 'Present tense',
    intro: 'One present tense. Verbs belong to two conjugations, plus a few irregulars. The person is in the ending, so you can drop the pronoun.',
    table: [
      ['Person', '1st conj (читать)', '2nd conj (говорить)', 'быть'],
      ['я', 'читаю', 'говорю', '—'],
      ['ты', 'читаешь', 'говоришь', '—'],
      ['он/она', 'читает', 'говорит', '—'],
      ['мы', 'читаем', 'говорим', '—'],
      ['вы', 'читаете', 'говорите', '—'],
      ['они', 'читают', 'говорят', '—']
    ],
    examples: [
      { ru: 'Я читаю кни́гу.', en: 'I read / I am reading a book.' },
      { ru: 'Она́ говори́т по-ру́сски.', en: 'She speaks Russian. (no её running)' }
    ]
  },
  {
    id: 'cases', level: 'A1', title: 'The six cases — one table',
    intro: 'Russian changes word endings instead of using word order. Six cases, learned gradually.',
    table: [
      ['Case', 'Use', 'Ending example', 'Example'],
      ['Nominative', 'subject', 'кни́га', 'Кни́га на столе́.'],
      ['Accusative', 'direct object, motion to', 'кни́гу', 'Я читаю кни́гу.'],
      ['Prepositional', 'after в/на/о (location, topic)', 'кни́ге', 'О кни́ге.'],
      ['Genitive', 'possession, нет, counting', 'кни́ги', 'нет кни́ги'],
      ['Dative', 'indirect object (to)', 'кни́ге', 'подхожу́ к кни́ге'],
      ['Instrumental', 'with, by, as a', 'кни́гой', 'пишу́ ру́чкой']
    ],
    examples: [
      { ru: 'Я ви́жу ма́му.', en: 'I see mom. (папа → папу, animate masc accusative = genitive)' },
      { ru: 'Нет вре́мени.', en: 'There is no time. (genitive)' }
    ]
  },
  {
    id: 'adjectives', level: 'A1', title: 'Adjectives agree',
    intro: 'An adjective copies the gender, number and case of its noun. The nominative endings are the ones you use first.',
    table: [
      ['', 'Masculine', 'Feminine', 'Neuter', 'Plural'],
      ['hard stem', 'новый', 'новая', 'новое', 'новые'],
      ['soft stem', 'си́ний', 'си́няя', 'си́нее', 'си́ние']
    ],
    examples: [
      { ru: 'но́вый дом, но́вая кни́га, но́вое окно́', en: 'a new house, book, window' },
      { ru: 'Э́то о́чень интере́сная кни́га.', en: 'This is a very interesting book.' }
    ]
  },
  {
    id: 'past', level: 'A1', title: 'Past tense',
    intro: 'The past agrees with the subject in gender and number — not with a person ending. быть is the model.',
    table: [
      ['Gender', 'Ending', 'быть', 'чита́ть', 'говори́ть'],
      ['he (m)', '-л', 'был', 'читал', 'говорил'],
      ['she (f)', '-ла', 'была́', 'читала', 'говорила'],
      ['it (n)', '-ло', 'было', 'читало', 'говорило'],
      ['they (pl)', '-ли', 'были', 'читали', 'говорили']
    ],
    examples: [
      { ru: 'Я был в Москве́.', en: 'I (m) was in Moscow.' },
      { ru: 'Она́ была́ до́ма.', en: 'She was at home.' }
    ]
  },
  {
    id: 'future', level: 'A1', title: 'Future tense',
    intro: 'Two ways to say "will": imperfective verbs use буду + infinitive; perfective verbs conjugate like the present.',
    table: [
      ['Type', 'Form', 'Example'],
      ['Imperfective', 'буду/будешь + infinitive', 'Я бу́ду чита́ть.'],
      ['Perfective', 'conjugated like present', 'Я прочита́ю. (I will finish reading)']
    ],
    examples: [
      { ru: 'За́втра я бу́ду рабо́тать.', en: 'Tomorrow I will work (be working).' },
      { ru: 'Я напишу́ письмо́.', en: 'I will write the letter (and finish it).' }
    ]
  },
  {
    id: 'aspect', level: 'A2', title: 'Aspect: perfective vs imperfective',
    intro: 'Almost every Russian verb comes in pairs. Imperfective = process, habit, ongoing. Perfective = completed, result, one-off. Aspect chooses the verb, tense changes the time.',
    table: [
      ['Imperfective', 'Perfective', 'Meaning'],
      ['чита́ть', 'прочита́ть', 'to read'],
      ['писа́ть', 'написа́ть', 'to write'],
      ['де́лать', 'сде́лать', 'to do / make'],
      ['говори́ть', 'сказа́ть', 'to say'],
      ['покупа́ть', 'купи́ть', 'to buy']
    ],
    examples: [
      { ru: 'Ка́ждый день я чита́ю.', en: 'Every day I read (habit → imperfective).' },
      { ru: 'Я прочита́л кни́гу.', en: 'I have read the book (finished → perfective).' }
    ]
  },
  {
    id: 'motion', level: 'A2', title: 'Verbs of motion',
    intro: 'Motion verbs pair by direction: determinate (going somewhere right now) vs indeterminate (traveling, habit, round trips).',
    table: [
      ['Means', 'Determinate', 'Indeterminate'],
      ['on foot', 'идти́ (я иду́)', 'ходи́ть (я хожу́)'],
      ['by vehicle', 'е́хать (я е́ду)', 'е́здить (я е́зжу)'],
      ['run', 'бежа́ть', 'бе́гать'],
      ['swim', 'плыть', 'пла́вать']
    ],
    examples: [
      { ru: 'Я иду́ в шко́лу.', en: 'I am going to school (right now).' },
      { ru: 'Я ча́сто хо́жу в парк.', en: 'I often go to the park (habit).' }
    ]
  },
  {
    id: 'imperative', level: 'A2', title: 'Imperative (commands)',
    intro: 'Build the ты-form imperative from the present stem; add -те for the polite/plural form.',
    table: [
      ['ты-form now', 'imperative (ты)', 'polite (вы)'],
      ['чита́ешь', 'читай!', 'читайте!'],
      ['говори́шь', 'говори́!', 'говори́те!'],
      ['идёшь', 'иди́!', 'иди́те!'],
      ['ешь', 'ешь!', 'ешьте!'],
      ['дашь', 'дай!', 'да́йте!']
    ],
    examples: [
      { ru: 'Читай кни́гу!', en: 'Read the book! (informal)' },
      { ru: 'Скажи́те, пожа́луйста.', en: 'Tell me, please. (polite)' }
    ]
  },
  {
    id: 'possessives', level: 'A1', title: 'Possessives and reflexive -ся',
    intro: 'Possessive adjectives agree with the noun. его, её, их never change.',
    table: [
      ['', 'm', 'f', 'n', 'plural'],
      ['my', 'мой', 'моя́', 'моё', 'мои́'],
      ['your (sing.)', 'твой', 'твоя́', 'твоё', 'твои́'],
      ['our', 'наш', 'на́ша', 'на́ше', 'на́ши'],
      ['your (pl.)', 'ваш', 'ва́ша', 'ва́ше', 'ва́ши']
    ],
    examples: [
      { ru: 'э́то мой брат и моя́ сестра́', en: 'this is my brother and my sister' },
      { ru: 'Я учу́сь.', en: 'I am studying. (reflexive -сь after vowel)' }
    ]
  },
  {
    id: 'comparatives', level: 'B1', title: 'Comparatives and superlatives',
    intro: 'Add -ее/-ей to the stem for "more…"; some forms are irregular and must be learned.',
    table: [
      ['Adjective', 'Comparative', 'Superlative'],
      ['большо́й', 'бо́льше', 'са́мый большо́й'],
      ['бы́стрый', 'быстре́е', 'са́мый бы́стрый'],
      ['хоро́ший', 'лу́чше', 'са́мый хоро́ший'],
      ['плохо́й', 'ху́же', 'са́мый плохо́й']
    ],
    examples: [
      { ru: 'Э́то быстрее.', en: 'This is faster.' },
      { ru: 'Он лу́чше меня́ игра́ет.', en: 'He plays better than me.' }
    ]
  },
  {
    id: 'conditional', level: 'B1', title: 'Conditionals and бы',
    intro: 'Russian has no would-form: use бы right before or after the past-tense verb.',
    table: [
      ['English', 'Russian'],
      ['I would go', 'Я бы пошёл.'],
      ['I would go (f)', 'Я бы пошла́.'],
      ['If I had time, I would read', 'Е́сли бы у меня́ бы́ло вре́мя, я бы чита́л.']
    ],
    examples: [
      { ru: 'Я хоте́л бы ко́фе.', en: 'I would like some coffee.' },
      { ru: 'Что бы ты сде́лал?', en: 'What would you do?' }
    ]
  },
  {
    id: 'relative', level: 'B1', title: 'Relative clauses with кото́рый',
    intro: 'кото́рый replaces "who/which/that". It agrees with its noun in gender and number, but its case depends on its job in the clause.',
    table: [
      ['Function', 'кото́рый + case', 'Example'],
      ['subject', 'кото́рый', 'челове́к, кото́рый живёт здесь'],
      ['object', 'которого / которую / …', 'друг, которого я ви́дел'],
      ['with', 'с кото́рым', 'друг, с кото́рым я говори́л']
    ],
    examples: [
      { ru: 'Кни́га, кото́рую я чита́ю, интере́сная.', en: 'The book that I am reading is interesting.' }
    ]
  },
  {
    id: 'participles', level: 'B2', title: 'Participles and gerunds (intro)',
    intro: 'Russian participles let you replace "who…" and "which is…" with one word. Learn to read them first; writing comes later.',
    table: [
      ['Type', 'Form', 'Example'],
      ['active', '-щий (-ущий, -ющий)', 'чита́ющий — the one reading'],
      ['past active', '-ший', 'прочита́вший — the one who read'],
      ['passive', '-нный/-тый', 'прочита́нный — (having been) read'],
      ['gerund', '-я / -в', 'чита́я — while reading; прочита́в — having read']
    ],
    examples: [
      { ru: 'Студе́нт, чита́ющий кни́гу…', en: 'The student (who is) reading a book…' },
      { ru: 'Прочита́в кни́гу, он лёг спать.', en: 'Having read the book, he went to sleep.' }
    ]
  },
  {
    id: 'conjunctions', level: 'A2', title: 'Conjunctions',
    intro: 'Link clauses exactly as in English, but note что (that), чтобы (so that), потomy что (because).',
    table: [
      ['Russian', 'English', 'Example'],
      ['и', 'and', 'хлеб и масло'],
      ['но', 'but', 'я бы хотел, но не могу'],
      ['а', 'and/but (contrast)', 'я работаю, а ты отдыхаешь'],
      ['или', 'or', 'чай или кофе'],
      ['по́тому что', 'because', 'я устал, потому что работал'],
      ['что', 'that', 'я знаю, что ты занят'],
      ['е́сли', 'if', 'если хочешь, позвони'],
      ['когда́', 'when', 'когда я был маленьким…']
    ],
    examples: [
      { ru: 'Я хочу́, что́бы ты пришёл.', en: 'I want you to come. (что́бы + past)' }
    ]
  },
  {
    id: 'wordformation', level: 'B1', title: 'Word formation and prefixes',
    intro: 'Prefixes create new verbs from one root. Learn the strongest ones and multiply your vocabulary.',
    table: [
      ['Prefix', 'Meaning', 'Example', 'English'],
      ['при-', 'arriving', 'прие́хать', 'to arrive'],
      ['у-', 'leaving', 'уе́хать', 'to leave'],
      ['в-', 'into', 'войти́', 'to enter'],
      ['вы-', 'out', 'вы́йти', 'to exit'],
      ['за-', 'begin / stop by', 'зайти́', 'to drop by'],
      ['пере-', 'across / repeat', 'перейти́', 'to cross'],
      ['про-', 'through / past', 'пройти́', 'to pass by'],
      ['с-', 'perfectivity / together', 'сде́лать', 'to do (completed)']
    ],
    examples: [
      { ru: 'Он прие́хал, а я уе́хал.', en: 'He arrived and I left.' }
    ]
  },
  {
    id: 'numbers', level: 'A1', title: 'Numbers and counting',
    intro: 'Numbers 1-4 take the nominative/genitive singular; 5-20 take the genitive plural. Learn the words, then the patterns.',
    table: [
      ['Number', 'Russian', 'Number', 'Russian'],
      ['1', 'один', '6', 'шесть'],
      ['2', 'два', '7', 'семь'],
      ['3', 'три', '8', 'во́семь'],
      ['4', 'четы́ре', '9', 'де́вять'],
      ['5', 'пять', '10', 'де́сять']
    ],
    examples: [
      { ru: 'два стола́', en: 'two tables (genitive singular)' },
      { ru: 'пять столов', en: 'five tables (genitive plural)' }
    ]
  }
];