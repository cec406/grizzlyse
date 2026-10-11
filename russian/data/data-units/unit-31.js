// Unit 31 — Health and lifestyle. B1.
export const unit = {
  id: 'u31',
  level: 'B1',
  number: 31,
  title: 'Health and lifestyle',
  titleRu: 'Здоро́вье и о́браз жи́зни',
  story: 'Sleep, exercise, diet, bad habits. This unit gives you the vocabulary of a healthy lifestyle and the patterns to say what is good or bad for you: поле́зно, вре́дно, ну́жно.',
  grammar: [
    {
      topic: 'A healthy lifestyle',
      explanation: 'здоро́вый о́браз жи́зни is literally a healthy way of life. Adjectives agree with the noun: здоро́вый (m), здоро́вая (f), здоро́вое (n).',
      table: [
        ['Russian', 'English'],
        ['здоро́вый о́браз жи́зни', 'a healthy lifestyle'],
        ['пра́вильное пита́ние', 'proper nutrition'],
        ['регуля́рные упражне́ния', 'regular exercise'],
        ['хоро́ший сон', 'good sleep']
      ],
      examples: [
        { ru: 'Он ведёт здоро́вый о́браз жи́зни.', trans: 'on vedyot zdorovy obraz zhizni', en: 'He leads a healthy lifestyle.' }
      ]
    },
    {
      topic: 'поле́зно and вре́дно',
      explanation: 'These impersonal words take an infinitive or a noun. поле́зно means it is good for you, вре́дно means it is harmful. With a specific person use the dative.',
      table: [
        ['Russian', 'English'],
        ['Кури́ть вре́дно.', 'Smoking is harmful.'],
        ['Спорт поле́зен для здоро́вья.', 'Sport is good for health.'],
        ['Мне вре́дно мно́го ко́фе.', 'Too much coffee is bad for me.'],
        ['Ово́щи поле́зны.', 'Vegetables are healthy.']
      ],
      examples: [
        { ru: 'Кури́ть вре́дно для здоро́вья.', trans: 'kurit vredno dlya zdorovya', en: 'Smoking is harmful to health.' }
      ]
    },
    {
      topic: 'Giving health advice',
      explanation: 'Advice usually uses ну́жно + infinitive, or the imperative. Notice how the dative names the person who needs to do something.',
      table: [
        ['Russian', 'English'],
        ['Тебе́ ну́жно бо́льше спать.', 'You need to sleep more.'],
        ['Ешьте бо́льше овоще́й.', 'Eat more vegetables.'],
        ['Не кури́те!', 'Do not smoke!'],
        ['Тебе́ ну́жно занима́ться спо́ртом.', 'You need to do sport.']
      ],
      examples: [
        { ru: 'Тебе́ ну́жно бо́льше отдыха́ть.', trans: 'tebe nuzhno bolshe otdykhat', en: 'You need to rest more.' }
      ]
    }
  ],
  vocabulary: [
    { id: 'u31-zdorovie', ru: 'здоро́вье', translit: 'zdorovye', en: 'health', pos: 'noun', gender: 'n' },
    { id: 'u31-obraz', ru: 'о́браз', translit: 'obraz', en: 'way / image', pos: 'noun', gender: 'm' },
    { id: 'u31-zhizn', ru: 'жизнь', translit: 'zhizn', en: 'life', pos: 'noun', gender: 'f' },
    { id: 'u31-privychka', ru: 'привы́чка', translit: 'privychka', en: 'habit', pos: 'noun', gender: 'f' },
    { id: 'u31-dieta', ru: 'дие́та', translit: 'diyeta', en: 'diet', pos: 'noun', gender: 'f' },
    { id: 'u31-uprazhnenie', ru: 'упражне́ние', translit: 'uprazhneniye', en: 'exercise', pos: 'noun', gender: 'n' },
    { id: 'u31-zaryadka', ru: 'заря́дка', translit: 'zaryadka', en: 'morning exercise', pos: 'noun', gender: 'f' },
    { id: 'u31-vredny', ru: 'вре́дный', translit: 'vredny', en: 'harmful', pos: 'adjective' },
    { id: 'u31-polezny', ru: 'поле́зный', translit: 'polezny', en: 'useful / healthy', pos: 'adjective' },
    { id: 'u31-ustaly', ru: 'уста́лый', translit: 'ustaly', en: 'tired', pos: 'adjective' },
    { id: 'u31-bodry', ru: 'бо́дрый', translit: 'bodry', en: 'cheerful / energetic', pos: 'adjective' },
    { id: 'u31-kurit', ru: 'кури́ть', translit: 'kurit', en: 'to smoke', pos: 'verb' },
    { id: 'u31-pit', ru: 'пить', translit: 'pit', en: 'to drink', pos: 'verb' },
    { id: 'u31-spat', ru: 'спать', translit: 'spat', en: 'to sleep', pos: 'verb' },
    { id: 'u31-begat', ru: 'бе́гать', translit: 'begat', en: 'to run (habitually)', pos: 'verb' },
    { id: 'u31-hudet', ru: 'худе́ть', translit: 'khudet', en: 'to lose weight', pos: 'verb' },
    { id: 'u31-polnet', ru: 'полне́ть', translit: 'polnet', en: 'to gain weight', pos: 'verb' },
    { id: 'u31-zanimatsya', ru: 'занима́ться', translit: 'zanimat·sya', en: 'to be engaged in', pos: 'verb' }
  ],
  phrases: [
    { id: 'p-u31-1', ru: 'Кури́ть вре́дно.', trans: 'kurit vredno', en: 'Smoking is harmful.' },
    { id: 'p-u31-2', ru: 'Тебе́ ну́жно бо́льше спать.', trans: 'tebe nuzhno bolshe spat', en: 'You need to sleep more.' }
  ],
  sentences: [
    { ru: 'Он ведёт здоро́вый о́браз жи́зни.', translit: 'on vedyot zdorovy obraz zhizni', en: 'He leads a healthy lifestyle.', words: [{ id: 'u31-obraz', ru: 'о́браз', en: 'way' }, { id: 'u31-zhizn', ru: 'жи́зни', en: 'life' }] },
    { ru: 'Кури́ть вре́дно для здоро́вья.', translit: 'kurit vredno dlya zdorovya', en: 'Smoking is harmful to health.', words: [{ id: 'u31-kurit', ru: 'Кури́ть', en: 'to smoke' }, { id: 'u31-zdorovie', ru: 'здоро́вья', en: 'health' }] },
    { ru: 'Спорт поле́зен для здоро́вья.', translit: 'sport polezen dlya zdorovya', en: 'Sport is good for health.', words: [{ id: 'u31-polezny', ru: 'поле́зен', en: 'useful' }] },
    { ru: 'Я бе́гаю ка́ждое у́тро.', translit: 'ya begayu kazhdoye utro', en: 'I run every morning.', words: [{ id: 'u31-begat', ru: 'бе́гаю', en: 'to run' }] },
    { ru: 'Мне ну́жно бо́льше спать.', translit: 'mne nuzhno bolshe spat', en: 'I need to sleep more.', words: [{ id: 'u31-spat', ru: 'спать', en: 'to sleep' }] }
  ],
  dialogue: {
    title: 'О здоро́вье (About health)',
    lines: [
      { who: 'Мария', ru: 'Ты всегда́ тако́й бо́дрый! Како́й у тебя́ о́браз жи́зни?', en: 'You are always so energetic! What kind of lifestyle do you have?' },
      { who: 'Том', ru: 'Я бе́гаю ка́ждое у́тро и хорошо́ сплю.', en: 'I run every morning and sleep well.' },
      { who: 'Мария', ru: 'А кури́ть вре́дно, я зна́ю. У меня́ плоха́я привы́чка.', en: 'And smoking is harmful, I know. I have a bad habit.' },
      { who: 'Том', ru: 'Тебе́ ну́жно бро́сить. Э́то о́чень вре́дно для здоро́вья.', en: 'You need to quit. It is very harmful to health.' },
      { who: 'Мария', ru: 'Ты прав. И мне ну́жно бо́льше занима́ться спо́ртом.', en: 'You are right. And I need to do more sport.' },
      { who: 'Том', ru: 'Пойдём бе́гать вме́сте за́втра!', en: 'Let us go running together tomorrow!' }
    ],
    questions: [
      { type: 'mc-ru', q: 'Что Том де́лает ка́ждое у́тро?', options: ['бе́гает', 'ку́рит', 'спит', 'чита́ет'], answer: 'бе́гает' },
      { type: 'mc-ru', q: 'Кака́я привы́чка у Мари́и?', options: ['кури́ть', 'пить ко́фе', 'спать до́лго', 'есть сла́дкое'], answer: 'кури́ть' },
      { type: 'mc-ru', q: 'Что они́ бу́дут де́лать за́втра?', options: ['бе́гать вме́сте', 'рабо́тать', 'спать', 'гуля́ть'], answer: 'бе́гать вме́сте' }
    ]
  },
  quiz: [
    { type: 'mc-en', q: 'Что зна́чит «здоро́вье»?', options: ['health', 'lifestyle', 'habit', 'diet'], answer: 'health', ru: 'здоро́вье' },
    { type: 'mc-en', q: 'Что зна́чит «вре́дный»?', options: ['harmful', 'useful', 'tired', 'healthy'], answer: 'harmful', ru: 'вре́дный' },
    { type: 'mc-ru', q: '“useful / healthy” in Russian', options: ['поле́зный', 'вре́дный', 'бо́дрый', 'уста́лый'], answer: 'поле́зный', ru: 'поле́зный' },
    { type: 'mc-ru', q: '“to smoke” in Russian', options: ['кури́ть', 'пить', 'спать', 'бе́гать'], answer: 'кури́ть', ru: 'кури́ть' },
    { type: 'typing', q: 'Type “life” in Russian', answer: 'жизнь', accepts: [], ru: 'жизнь' },
    { type: 'typing', q: 'Type “to sleep” in Russian', answer: 'спать', accepts: [], ru: 'спать' },
    { type: 'mc-en', q: 'Что зна́чит «привы́чка»?', options: ['habit', 'diet', 'exercise', 'life'], answer: 'habit', ru: 'привы́чка' },
    { type: 'mc-ru', q: '“diet” in Russian', options: ['дие́та', 'привы́чка', 'заря́дка', 'жизнь'], answer: 'дие́та', ru: 'дие́та' },
    { type: 'mc-en', q: 'Что зна́чит «уста́лый»?', options: ['tired', 'energetic', 'sick', 'hungry'], answer: 'tired', ru: 'уста́лый' },
    { type: 'mc-ru', q: 'Complete: Кури́ть ___ для здоро́вья.', options: ['вре́дно', 'поле́зно', 'хорошо́', 'ва́жно'], answer: 'вре́дно', ru: 'вре́дно' },
    { type: 'typing', q: 'Type “morning exercise” in Russian', answer: 'зарядка', accepts: ['заря́дка'], ru: 'заря́дка' },
    { type: 'mc-en', q: 'Что зна́чит «бо́дрый»?', options: ['cheerful / energetic', 'tired', 'sad', 'sick'], answer: 'cheerful / energetic', ru: 'бо́дрый' }
  ],
  test: {
    title: 'Unit 31 test — Health and lifestyle',
    questions: [
      { type: 'mc-ru', q: '“exercise” in Russian', options: ['упражне́ние', 'заря́дка', 'дие́та', 'привы́чка'], answer: 'упражне́ние', ru: 'упражне́ние' },
      { type: 'mc-en', q: 'Что зна́чит «пить»?', options: ['to drink', 'to eat', 'to smoke', 'to sleep'], answer: 'to drink', ru: 'пить' },
      { type: 'typing', q: 'Type “health” in Russian', answer: 'здоровье', accepts: ['здоро́вье'], ru: 'здоро́вье' },
      { type: 'typing', q: 'Type “way / image” in Russian', answer: 'образ', accepts: ['о́браз'], ru: 'о́браз' },
      { type: 'mc-ru', q: '“to lose weight” in Russian', options: ['худе́ть', 'полне́ть', 'бе́гать', 'спать'], answer: 'худе́ть', ru: 'худе́ть' },
      { type: 'mc-en', q: 'Что зна́чит «занима́ться»?', options: ['to be engaged in', 'to work', 'to rest', 'to run'], answer: 'to be engaged in', ru: 'занима́ться' },
      { type: 'mc-ru', q: 'Complete: Спорт ___ для здоро́вья.', options: ['поле́зен', 'вре́ден', 'тру́ден', 'опа́сен'], answer: 'поле́зен', ru: 'поле́зен' },
      { type: 'typing', q: 'Type “habit” in Russian', answer: 'привычка', accepts: ['привы́чка'], ru: 'привы́чка' },
      { type: 'mc-en', q: 'Что зна́чит «полне́ть»?', options: ['to gain weight', 'to lose weight', 'to eat', 'to cook'], answer: 'to gain weight', ru: 'полне́ть' },
      { type: 'mc-ru', q: '“to run (habitually)” in Russian', options: ['бе́гать', 'бежа́ть', 'идти́', 'ходи́ть'], answer: 'бе́гать', ru: 'бе́гать' },
      { type: 'typing', q: 'Type “sport” in Russian', answer: 'спорт', accepts: [], ru: 'спорт' },
      { type: 'mc-en', q: 'Что зна́чит «заря́дка»?', options: ['morning exercise', 'charging', 'diet', 'habit'], answer: 'morning exercise', ru: 'заря́дка' }
    ]
  }
};
