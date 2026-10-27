// Unit 3 — Numbers and age. A1.
export const unit = {
  id: 'u03',
  level: 'A1',
  number: 3,
  title: 'Numbers and age',
  titleRu: 'Чи́сла и во́зраст',
  story: 'Prices, phone numbers, birthdays, how old you are — numbers are everywhere. Learn 1–20 and 100, the counting rule that decides the noun ending, and the one phrase every Russian asks: «Ско́лько тебе́ лет?».',
  grammar: [
    {
      topic: 'Counting 1–20 and 100',
      explanation: 'Learn them in one block. Note that оди́н changes with gender (оди́н дом, одна́ кни́га, одно́ окно́) and два behaves the same way (два сто́ла, две кни́ги).',
      table: [
        ['Number', 'Russian', 'Number', 'Russian'],
        ['1', 'оди́н / одна́ / одно́', '11', 'оди́ннадцать'],
        ['2', 'два / две', '12', 'двена́дцать'],
        ['3', 'три', '13', 'трина́дцать'],
        ['4', 'четы́ре', '14', 'четы́рнадцать'],
        ['5', 'пять', '15', 'пятна́дцать'],
        ['6', 'шесть', '16', 'шестна́дцать'],
        ['7', 'семь', '17', 'семна́дцать'],
        ['8', 'во́семь', '18', 'восемна́дцать'],
        ['9', 'де́вять', '19', 'девятна́дцать'],
        ['10', 'де́сять', '20 / 100', 'два́дцать / сто']
      ],
      examples: [
        { ru: 'три, четы́ре, пять', trans: 'tri, chetyre, pyat', en: 'three, four, five' },
        { ru: 'два́дцать рубле́й', trans: 'dvadtsat rubley', en: 'twenty rubles' }
      ]
    },
    {
      topic: 'The counting rule (this one matters)',
      explanation: 'The noun ending depends on the number: 1 takes one thing, 2–4 take a special "few" form, 5 and up take the "many" form. You will hear it in every shop.',
      table: [
        ['Number', 'Noun form', 'Example', 'English'],
        ['1', 'nominative singular', 'оди́н стол', 'one table'],
        ['2–4', 'genitive singular', 'два сто́ла', 'two tables'],
        ['5+', 'genitive plural', 'пять столо́в', 'five tables'],
        ['21, 31…', 'like 1', 'два́дцать оди́н стол', 'twenty-one tables']
      ],
      examples: [
        { ru: 'У меня́ два бра́та.', trans: 'u menya dva brata', en: 'I have two brothers.' },
        { ru: 'В кла́ссе де́сять студе́нтов.', trans: 'v klasse desyat studentov', en: 'There are ten students in the class.' }
      ]
    },
    {
      topic: 'Age: ско́лько лет?',
      explanation: 'Age uses the dative for the person and the word лет (not год): Мне два́дцать лет = "to me [there are] twenty years". To ask informally: Ско́лько тебе́ лет? Politely: Ско́лько вам лет?',
      table: [
        ['Russian', 'English'],
        ['Ско́лько тебе́ лет?', 'How old are you? (informal)'],
        ['Ско́лько вам лет?', 'How old are you? (polite)'],
        ['Мне два́дцать лет.', 'I am twenty.']
      ],
      examples: [
        { ru: 'Ско́лько тебе́ лет? — Мне восемна́дцать.', trans: 'skolko tebe let? mne vosemnadtsat', en: 'How old are you? — I am eighteen.' }
      ]
    }
  ],
  vocabulary: [
    { id: 'u3-odin', ru: 'оди́н', translit: 'odin', en: 'one', pos: 'numeral' },
    { id: 'u3-dva', ru: 'два', translit: 'dva', en: 'two', pos: 'numeral' },
    { id: 'u3-tri', ru: 'три', translit: 'tri', en: 'three', pos: 'numeral' },
    { id: 'u3-chetyre', ru: 'четы́ре', translit: 'chetyre', en: 'four', pos: 'numeral' },
    { id: 'u3-pyat', ru: 'пять', translit: 'pyat', en: 'five', pos: 'numeral' },
    { id: 'u3-shest', ru: 'шесть', translit: 'shest', en: 'six', pos: 'numeral' },
    { id: 'u3-sem', ru: 'семь', translit: 'sem', en: 'seven', pos: 'numeral' },
    { id: 'u3-vosem', ru: 'во́семь', translit: 'vosem', en: 'eight', pos: 'numeral' },
    { id: 'u3-devyat', ru: 'де́вять', translit: 'devyat', en: 'nine', pos: 'numeral' },
    { id: 'u3-desyat', ru: 'де́сять', translit: 'desyat', en: 'ten', pos: 'numeral' },
    { id: 'u3-odinnadtsat', ru: 'оди́ннадцать', translit: 'odinnadtsat', en: 'eleven', pos: 'numeral' },
    { id: 'u3-dvenadtsat', ru: 'двена́дцать', translit: 'dvenadtsat', en: 'twelve', pos: 'numeral' },
    { id: 'u3-dvadtsat', ru: 'два́дцать', translit: 'dvadtsat', en: 'twenty', pos: 'numeral' },
    { id: 'u3-sto', ru: 'сто', translit: 'sto', en: 'one hundred', pos: 'numeral' },
    { id: 'u3-skolko', ru: 'ско́лько', translit: 'skolko', en: 'how many / how much', pos: 'question' },
    { id: 'u3-god', ru: 'год', translit: 'god', en: 'year', pos: 'noun', gender: 'm' },
    { id: 'u3-let', ru: 'лет', translit: 'let', en: 'years (age, 5+)', pos: 'noun', gender: 'p' },
    { id: 'u3-mne', ru: 'мне', translit: 'mne', en: 'to me', pos: 'pronoun' },
    { id: 'u3-tebe', ru: 'тебе́', translit: 'tebe', en: 'to you (informal)', pos: 'pronoun' },
    { id: 'u3-vozrast', ru: 'во́зраст', translit: 'vozrast', en: 'age', pos: 'noun', gender: 'm' }
  ],
  phrases: [
    { id: 'p-u3-1', ru: 'Ско́лько э́то сто́ит?', trans: 'skolko eta stoit?', en: 'How much does this cost?' },
    { id: 'p-u3-2', ru: 'Мне два́дцать лет.', trans: 'mne dvadtsat let', en: 'I am twenty years old.' }
  ],
  sentences: [
    { ru: 'Ско́лько тебе́ лет?', translit: 'skolko tebe let?', en: 'How old are you?', words: [{ id: 'u3-skolko', ru: 'Ско́лько', en: 'how many' }, { id: 'u3-tebe', ru: 'тебе́', en: 'to you' }, { id: 'u3-let', ru: 'лет', en: 'years' }] },
    { ru: 'Мне де́вятна́дцать лет.', translit: 'mne devyatnadtsat let', en: 'I am nineteen.', words: [{ id: 'u3-mne', ru: 'Мне', en: 'to me' }, { id: 'u3-let', ru: 'лет', en: 'years' }] },
    { ru: 'У меня́ два бра́та.', translit: 'u menya dva brata', en: 'I have two brothers.', words: [{ id: 'u3-dva', ru: 'два', en: 'two' }] },
    { ru: 'Э́то сто рубле́й.', translit: 'eta sto rubley', en: 'That is one hundred rubles.', words: [{ id: 'u3-sto', ru: 'сто', en: 'one hundred' }] },
    { ru: 'В кла́ссе два́дцать оди́н студе́нт.', translit: 'v klasse dvadtsat odin student', en: 'There are twenty-one students in the class.', words: [{ id: 'u3-dvadtsat', ru: 'два́дцать', en: 'twenty' }, { id: 'u3-odin', ru: 'оди́н', en: 'one' }] }
  ],
  dialogue: {
    title: 'В ка́ссе (At the ticket office)',
    lines: [
      { who: 'Касси́р', ru: 'Здра́вствуйте! Ско́лько биле́тов?', en: 'Hello! How many tickets?' },
      { who: 'Том', ru: 'Два, пожа́луйста.', en: 'Two, please.' },
      { who: 'Касси́р', ru: 'Два биле́та — сто рубле́й.', en: 'Two tickets — one hundred rubles.' },
      { who: 'Том', ru: 'А ско́лько сто́ит оди́н?', en: 'And how much is one?' },
      { who: 'Касси́р', ru: 'Пятьдеся́т рубле́й.', en: 'Fifty rubles.' },
      { who: 'Том', ru: 'Хорошо́, спаси́бо!', en: 'Okay, thank you!' }
    ],
    questions: [
      { type: 'mc-ru', q: 'Ско́лько биле́тов хо́чет Том?', options: ['два', 'оди́н', 'три', 'пять'], answer: 'два' },
      { type: 'mc-ru', q: 'Ско́лько сто́ят два биле́та?', options: ['сто рубле́й', 'пятьдеся́т рубле́й', 'два́дцать рубле́й', 'де́сять рубле́й'], answer: 'сто рубле́й' },
      { type: 'mc-ru', q: 'Ско́лько сто́ит оди́н биле́т?', options: ['пятьдеся́т рубле́й', 'сто рубле́й', 'пять рубле́й', 'два́дцать рубле́й'], answer: 'пятьдеся́т рубле́й' }
    ]
  },
  quiz: [
    { type: 'mc-en', q: 'Что зна́чит «пять»?', options: ['five', 'four', 'nine', 'ten'], answer: 'five', ru: 'пять' },
    { type: 'mc-en', q: 'Что зна́чит «во́семь»?', options: ['eight', 'seven', 'six', 'nine'], answer: 'eight', ru: 'во́семь' },
    { type: 'mc-ru', q: 'How do you say “three”?', options: ['три', 'два', 'четы́ре', 'семь'], answer: 'три', ru: 'три' },
    { type: 'mc-ru', q: '“twenty” in Russian', options: ['два́дцать', 'де́сять', 'двена́дцать', 'сто'], answer: 'два́дцать', ru: 'два́дцать' },
    { type: 'typing', q: 'Type “ten” in Russian', answer: 'десять', accepts: ['де́сять'], ru: 'де́сять' },
    { type: 'typing', q: 'Type “one hundred” in Russian', answer: 'сто', accepts: [], ru: 'сто' },
    { type: 'mc-en', q: 'Что зна́чит «ско́лько»?', options: ['how many / how much', 'where', 'when', 'why'], answer: 'how many / how much', ru: 'ско́лько' },
    { type: 'mc-ru', q: '“six” in Russian', options: ['шесть', 'семь', 'во́семь', 'пять'], answer: 'шесть', ru: 'шесть' },
    { type: 'mc-en', q: 'Что зна́чит «год»?', options: ['year', 'age', 'day', 'month'], answer: 'year', ru: 'год' },
    { type: 'mc-ru', q: 'Which is correct after “два”?', options: ['два бра́та', 'два брат', 'два бра́тья', 'два бра́том'], answer: 'два бра́та', ru: 'два бра́та' },
    { type: 'typing', q: 'Type “twenty” in Russian', answer: 'двадцать', accepts: ['два́дцать'], ru: 'два́дцать' },
    { type: 'mc-en', q: 'Что зна́чит «двена́дцать»?', options: ['twelve', 'eleven', 'twenty', 'two'], answer: 'twelve', ru: 'двена́дцать' }
  ],
  test: {
    title: 'Unit 3 test — Numbers and age',
    questions: [
      { type: 'mc-ru', q: '“four” in Russian', options: ['четы́ре', 'пять', 'три', 'семь'], answer: 'четы́ре', ru: 'четы́ре' },
      { type: 'mc-en', q: 'Что зна́чит «де́вять»?', options: ['nine', 'ten', 'seven', 'eight'], answer: 'nine', ru: 'де́вять' },
      { type: 'typing', q: 'Type “two” in Russian', answer: 'два', accepts: [], ru: 'два' },
      { type: 'typing', q: 'Type “years (age)” in Russian', answer: 'лет', accepts: [], ru: 'лет' },
      { type: 'mc-ru', q: '“eleven” in Russian', options: ['оди́ннадцать', 'двена́дцать', 'два́дцать', 'де́сять'], answer: 'оди́ннадцать', ru: 'оди́ннадцать' },
      { type: 'mc-en', q: 'Что зна́чит «во́зраст»?', options: ['age', 'year', 'number', 'day'], answer: 'age', ru: 'во́зраст' },
      { type: 'mc-ru', q: 'Complete: два ___ (table)', options: ['сто́ла', 'стол', 'столо́в', 'столу́'], answer: 'сто́ла', ru: 'два сто́ла' },
      { type: 'typing', q: 'Type “five” in Russian', answer: 'пять', accepts: [], ru: 'пять' },
      { type: 'mc-en', q: 'Что зна́чит «семь»?', options: ['seven', 'six', 'eight', 'nine'], answer: 'seven', ru: 'семь' },
      { type: 'mc-ru', q: '“one hundred” in Russian', options: ['сто', 'де́сять', 'два́дцать', 'ты́сяча'], answer: 'сто', ru: 'сто' },
      { type: 'typing', q: 'Type “how many” in Russian', answer: 'сколько', accepts: ['ско́лько'], ru: 'ско́лько' },
      { type: 'mc-en', q: 'Что зна́чит «оди́н»?', options: ['one', 'two', 'three', 'zero'], answer: 'one', ru: 'оди́н' }
    ]
  }
};
