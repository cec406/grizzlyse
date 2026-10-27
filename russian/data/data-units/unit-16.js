// Unit 16 — Have and have not. A2.
export const unit = {
  id: 'u16',
  level: 'A2',
  number: 16,
  title: 'Have and have not',
  titleRu: 'Есть и нет',
  story: 'Two everyday jobs for the genitive case: saying that something is absent (У меня́ нет вре́мени) and counting quantities (буты́лка вина́, мно́го хле́ба). You also learn how to say whose something is: дом бра́та — \"my brother\'s house\".',
  grammar: [
    {
      topic: 'нет + genitive (absence)',
      explanation: 'To say something is not there, use нет + genitive. This is the negative of «У меня́ есть…». Very common — Russian speakers use it constantly.',
      table: [
        ['Positive', 'Negative', 'Meaning'],
        ['У меня́ есть вре́мя.', 'У меня́ нет вре́мени.', 'I have no time.'],
        ['У него́ есть брат.', 'У него́ нет бра́та.', 'He has no brother.'],
        ['Здесь есть хлеб.', 'Здесь нет хле́ба.', 'There is no bread here.'],
        ['У нас есть де́ньги.', 'У нас нет де́нег.', 'We have no money.']
      ],
      examples: [
        { ru: 'У меня́ нет вре́мени.', trans: 'u menya net vremeni', en: 'I have no time.' },
        { ru: 'Здесь нет хле́ба.', trans: 'zdes net khleba', en: 'There is no bread here.' }
      ]
    },
    {
      topic: 'Possession: whose is it?',
      explanation: 'For \"someone\'s thing\", the owner goes into the genitive and comes after the noun. Masculine nouns take -а/-я, feminine take -ы/-и.',
      table: [
        ['Russian', 'English'],
        ['дом бра́та', 'the brother\'s house'],
        ['кни́га сестры́', 'the sister\'s book'],
        ['маши́на отца́', 'the father\'s car'],
        ['телефо́н дру́га', 'the friend\'s phone']
      ],
      examples: [
        { ru: 'Э́то маши́на моего́ отца́.', trans: 'eta mashina moyego ottsa', en: 'This is my father\'s car.' }
      ]
    },
    {
      topic: 'Quantities + genitive',
      explanation: 'Words like мно́го (a lot), ма́ло (few), немно́го (a little) and containers like буты́лка, ча́шка, килогра́мм are followed by the genitive.',
      table: [
        ['Russian', 'English'],
        ['мно́го хле́ба', 'a lot of bread'],
        ['ма́ло де́нег', 'little money'],
        ['немно́го во́ды', 'a little water'],
        ['буты́лка вина́', 'a bottle of wine'],
        ['ча́шка ча́я', 'a cup of tea'],
        ['килогра́мм сы́ра', 'a kilo of cheese']
      ],
      examples: [
        { ru: 'Я купи́л мно́го хле́ба.', trans: 'ya kupil mnogo khleba', en: 'I bought a lot of bread.' }
      ]
    }
  ],
  vocabulary: [
    { id: 'u16-net', ru: 'нет', translit: 'net', en: 'no / there is not', pos: 'particle' },
    { id: 'u16-mnogo', ru: 'мно́го', translit: 'mnogo', en: 'a lot of', pos: 'adverb' },
    { id: 'u16-malo', ru: 'ма́ло', translit: 'malo', en: 'few / little', pos: 'adverb' },
    { id: 'u16-nemnogo', ru: 'немно́го', translit: 'nemnogo', en: 'a little', pos: 'adverb' },
    { id: 'u16-vremya', ru: 'вре́мя', translit: 'vremya', en: 'time', pos: 'noun', gender: 'n' },
    { id: 'u16-khleb', ru: 'хлеб', translit: 'khleb', en: 'bread', pos: 'noun', gender: 'm' },
    { id: 'u16-syr', ru: 'сыр', translit: 'syr', en: 'cheese', pos: 'noun', gender: 'm' },
    { id: 'u16-voda', ru: 'вода́', translit: 'voda', en: 'water', pos: 'noun', gender: 'f' },
    { id: 'u16-vino', ru: 'вино́', translit: 'vino', en: 'wine', pos: 'noun', gender: 'n' },
    { id: 'u16-chashka', ru: 'ча́шка', translit: 'chashka', en: 'cup', pos: 'noun', gender: 'f' },
    { id: 'u16-butylka', ru: 'буты́лка', translit: 'butylka', en: 'bottle', pos: 'noun', gender: 'f' },
    { id: 'u16-kilogramm', ru: 'килогра́мм', translit: 'kilogramm', en: 'kilogram', pos: 'noun', gender: 'm' },
    { id: 'u16-kniga', ru: 'кни́га', translit: 'kniga', en: 'book', pos: 'noun', gender: 'f' },
    { id: 'u16-brat', ru: 'брат', translit: 'brat', en: 'brother', pos: 'noun', gender: 'm' },
    { id: 'u16-sestra', ru: 'сестра́', translit: 'sestra', en: 'sister', pos: 'noun', gender: 'f' },
    { id: 'u16-otets', ru: 'оте́ц', translit: 'otets', en: 'father', pos: 'noun', gender: 'm' },
    { id: 'u16-dengi', ru: 'де́ньги', translit: 'dengi', en: 'money', pos: 'noun', gender: 'p' }
  ],
  phrases: [
    { id: 'p-u16-1', ru: 'У меня́ нет вре́мени.', trans: 'u menya net vremeni', en: 'I have no time.' },
    { id: 'p-u16-2', ru: 'Буты́лка вина́, пожа́луйста.', trans: 'butylka vina, pozhaluysta', en: 'A bottle of wine, please.' }
  ],
  sentences: [
    { ru: 'У меня́ нет вре́мени.', translit: 'u menya net vremeni', en: 'I have no time.', words: [{ id: 'u16-net', ru: 'нет', en: 'there is not' }, { id: 'u16-vremya', ru: 'вре́мени', en: 'time' }] },
    { ru: 'Э́то дом бра́та.', translit: 'eta dom brata', en: 'This is my brother\'s house.', words: [{ id: 'u16-brat', ru: 'бра́та', en: 'brother' }] },
    { ru: 'Я купи́л мно́го хле́ба.', translit: 'ya kupil mnogo khleba', en: 'I bought a lot of bread.', words: [{ id: 'u16-mnogo', ru: 'мно́го', en: 'a lot of' }, { id: 'u16-khleb', ru: 'хле́ба', en: 'bread' }] },
    { ru: 'Кни́га сестры́ на столе́.', translit: 'kniga sestry na stole', en: 'My sister\'s book is on the table.', words: [{ id: 'u16-kniga', ru: 'Кни́га', en: 'book' }, { id: 'u16-sestra', ru: 'сестры́', en: 'sister' }] },
    { ru: 'Буты́лка вина́ и килогра́мм сы́ра, пожа́луйста.', translit: 'butylka vina i kilogram syra, pozhaluysta', en: 'A bottle of wine and a kilo of cheese, please.', words: [{ id: 'u16-butylka', ru: 'Буты́лка', en: 'bottle' }, { id: 'u16-vino', ru: 'вина́', en: 'wine' }, { id: 'u16-kilogramm', ru: 'килогра́мм', en: 'kilogram' }, { id: 'u16-syr', ru: 'сы́ра', en: 'cheese' }] }
  ],
  dialogue: {
    title: 'В магази́не (At the shop)',
    lines: [
      { who: 'Продаве́ц', ru: 'До́брый день! Что вы хоти́те?', en: 'Good afternoon! What would you like?' },
      { who: 'Том', ru: 'Буты́лку вина́ и килогра́мм сы́ра.', en: 'A bottle of wine and a kilo of cheese.' },
      { who: 'Продаве́ц', ru: 'Хлеб есть. Вам ну́жен хлеб?', en: 'We have bread. Do you need bread?' },
      { who: 'Том', ru: 'Да, немно́го хле́ба. И у вас есть вода́?', en: 'Yes, a little bread. And do you have water?' },
      { who: 'Продаве́ц', ru: 'К сожале́нию, во́ды сего́дня нет.', en: 'Unfortunately, there is no water today.' }
    ],
    questions: [
      { type: 'mc-ru', q: 'Что покупа́ет Том?', options: ['вино́ и сыр', 'воду и хлеб', 'чай и са́хар', 'молоко́ и мя́со'], answer: 'вино́ и сыр' },
      { type: 'mc-ru', q: 'Ско́лько сы́ра хо́чет Том?', options: ['килогра́мм', 'два килогра́мма', 'полкило́', 'мно́го'], answer: 'килогра́мм' },
      { type: 'mc-ru', q: 'Чего́ нет в магази́не?', options: ['воды́', 'хле́ба', 'сы́ра', 'вина́'], answer: 'воды́' }
    ]
  },
  quiz: [
    { type: 'mc-en', q: 'Что зна́чит «нет»?', options: ['no / there is not', 'yes', 'maybe', 'here'], answer: 'no / there is not', ru: 'нет' },
    { type: 'mc-en', q: 'Что зна́чит «мно́го»?', options: ['a lot of', 'a little', 'few', 'none'], answer: 'a lot of', ru: 'мно́го' },
    { type: 'mc-ru', q: 'How do you say “a little”?', options: ['немно́го', 'мно́го', 'ма́ло', 'нет'], answer: 'немно́го', ru: 'немно́го' },
    { type: 'mc-ru', q: '“bottle” in Russian', options: ['буты́лка', 'ча́шка', 'килогра́мм', 'кни́га'], answer: 'буты́лка', ru: 'буты́лка' },
    { type: 'typing', q: 'Type “bread” in Russian', answer: 'хлеб', accepts: [], ru: 'хлеб' },
    { type: 'typing', q: 'Type “water” in Russian', answer: 'вода', accepts: ['вода́'], ru: 'вода́' },
    { type: 'mc-en', q: 'Что зна́чит «ча́шка»?', options: ['cup', 'bottle', 'glass', 'plate'], answer: 'cup', ru: 'ча́шка' },
    { type: 'mc-ru', q: '“cheese” in Russian', options: ['сыр', 'хлеб', 'вино́', 'вода́'], answer: 'сыр', ru: 'сыр' },
    { type: 'mc-en', q: 'Что зна́чит «де́ньги»?', options: ['money', 'time', 'bread', 'wine'], answer: 'money', ru: 'де́ньги' },
    { type: 'mc-ru', q: 'Complete: У меня́ ___ вре́мени.', options: ['нет', 'есть', 'мно́го', 'ма́ло'], answer: 'нет', ru: 'нет вре́мени' },
    { type: 'typing', q: 'Type “brother” in Russian', answer: 'брат', accepts: [], ru: 'брат' },
    { type: 'mc-en', q: 'Что зна́чит «килогра́мм»?', options: ['kilogram', 'bottle', 'cup', 'litre'], answer: 'kilogram', ru: 'килогра́мм' }
  ],
  test: {
    title: 'Unit 16 test — Have and have not',
    questions: [
      { type: 'mc-ru', q: 'Genitive of «вода́» after нет', options: ['воды́', 'во́ды', 'водо́й', 'вода́'], answer: 'воды́', ru: 'воды́' },
      { type: 'mc-en', q: 'Что зна́чит «кни́га»?', options: ['book', 'cup', 'bottle', 'bread'], answer: 'book', ru: 'кни́га' },
      { type: 'typing', q: 'Type “wine” in Russian', answer: 'вино', accepts: ['вино́'], ru: 'вино́' },
      { type: 'typing', q: 'Type “a lot of” in Russian', answer: 'много', accepts: ['мно́го'], ru: 'мно́го' },
      { type: 'mc-ru', q: '“sister” in Russian', options: ['сестра́', 'брат', 'оте́ц', 'кни́га'], answer: 'сестра́', ru: 'сестра́' },
      { type: 'mc-en', q: 'Что зна́чит «оте́ц»?', options: ['father', 'brother', 'sister', 'uncle'], answer: 'father', ru: 'оте́ц' },
      { type: 'mc-ru', q: 'Complete: Здесь нет ___ .', options: ['хле́ба', 'хлеб', 'хле́бу', 'хле́бом'], answer: 'хле́ба', ru: 'нет хле́ба' },
      { type: 'typing', q: 'Type “cheese” in Russian', answer: 'сыр', accepts: [], ru: 'сыр' },
      { type: 'mc-en', q: 'Что зна́чит «ма́ло»?', options: ['few / little', 'a lot', 'none', 'enough'], answer: 'few / little', ru: 'ма́ло' },
      { type: 'mc-ru', q: '“time” in Russian', options: ['вре́мя', 'де́ньги', 'ча́шка', 'год'], answer: 'вре́мя', ru: 'вре́мя' },
      { type: 'typing', q: 'Type “cup” in Russian', answer: 'чашка', accepts: ['ча́шка'], ru: 'ча́шка' },
      { type: 'mc-en', q: 'Что зна́чит «буты́лка»?', options: ['bottle', 'cup', 'kilogram', 'glass'], answer: 'bottle', ru: 'буты́лка' }
    ]
  }
};
