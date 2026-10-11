// Unit 19 — Clothes and colours. A2.
export const unit = {
  id: 'u19',
  level: 'A2',
  number: 19,
  title: 'Clothes and colours',
  titleRu: 'Оде́жда и цве́та',
  story: 'Shopping for clothes means adjectives, colours and the verb to wear. This unit shows you how adjectives agree with nouns, and gives you the phrases to ask a price and try something on.',
  grammar: [
    {
      topic: 'Colours: adjectives agree',
      explanation: 'A colour is an adjective and copies the noun: кра́сный (m), кра́сная (f), кра́сное (n), кра́сные (plural). Learn the four endings and you can describe anything.',
      table: [
        ['', 'm', 'f', 'n', 'plural'],
        ['red', 'кра́сный', 'кра́сная', 'кра́сное', 'кра́сные'],
        ['blue', 'си́ний', 'си́няя', 'си́нее', 'си́ние'],
        ['white', 'бе́лый', 'бе́лая', 'бе́лое', 'бе́лые'],
        ['black', 'чёрный', 'чёрная', 'чёрное', 'чёрные'],
        ['green', 'зелёный', 'зелёная', 'зелёное', 'зелёные']
      ],
      examples: [
        { ru: 'Э́то кра́сное пла́тье.', trans: 'eta krasnoye platye', en: 'This is a red dress.' },
        { ru: 'У меня́ чёрные брю́ки.', trans: 'u menya chyornyye bryuki', en: 'I have black trousers.' }
      ]
    },
    {
      topic: 'носи́ть — to wear',
      explanation: 'носи́ть means to wear habitually. Its forms: ношу́, но́сишь, но́сит, но́сим, но́сите, но́сят. The thing worn goes into the accusative.',
      table: [
        ['Person', 'Form'],
        ['я', 'ношу́'],
        ['ты', 'но́сишь'],
        ['он / она́', 'но́сит'],
        ['мы', 'но́сим'],
        ['вы', 'но́сите'],
        ['они́', 'но́сят']
      ],
      examples: [
        { ru: 'Он но́сит си́нюю руба́шку.', trans: 'on nosit siniyuyu rubashku', en: 'He wears a blue shirt.' }
      ]
    },
    {
      topic: 'In the clothes shop',
      explanation: 'These phrases get you through a fitting room. приме́рить means to try on.',
      table: [
        ['Russian', 'English'],
        ['Ско́лько сто́ит э́та ку́ртка?', 'How much is this jacket?'],
        ['Мо́жно приме́рить?', 'May I try it on?'],
        ['У вас есть друго́й разме́р?', 'Do you have another size?'],
        ['Э́то сли́шком дорого́е.', 'This is too expensive.']
      ],
      examples: [
        { ru: 'Ско́лько сто́ит э́то пла́тье?', trans: 'skolko stoit eta platye', en: 'How much is this dress?' }
      ]
    }
  ],
  vocabulary: [
    { id: 'u19-odezhda', ru: 'оде́жда', translit: 'odezhda', en: 'clothes', pos: 'noun', gender: 'f' },
    { id: 'u19-rubashka', ru: 'руба́шка', translit: 'rubashka', en: 'shirt', pos: 'noun', gender: 'f' },
    { id: 'u19-plate', ru: 'пла́тье', translit: 'platye', en: 'dress', pos: 'noun', gender: 'n' },
    { id: 'u19-bryuki', ru: 'брю́ки', translit: 'bryuki', en: 'trousers', pos: 'noun', gender: 'p' },
    { id: 'u19-kurtka', ru: 'ку́ртка', translit: 'kurtka', en: 'jacket', pos: 'noun', gender: 'f' },
    { id: 'u19-shapka', ru: 'ша́пка', translit: 'shapka', en: 'hat', pos: 'noun', gender: 'f' },
    { id: 'u19-obuv', ru: 'о́бувь', translit: 'obuv', en: 'footwear', pos: 'noun', gender: 'f' },
    { id: 'u19-krasny', ru: 'кра́сный', translit: 'krasny', en: 'red', pos: 'adjective' },
    { id: 'u19-siniy', ru: 'си́ний', translit: 'siniy', en: 'dark blue', pos: 'adjective' },
    { id: 'u19-bely', ru: 'бе́лый', translit: 'bely', en: 'white', pos: 'adjective' },
    { id: 'u19-cherny', ru: 'чёрный', translit: 'chyorny', en: 'black', pos: 'adjective' },
    { id: 'u19-zeleny', ru: 'зелёный', translit: 'zelyony', en: 'green', pos: 'adjective' },
    { id: 'u19-dorogoy', ru: 'дорого́й', translit: 'dorogoy', en: 'expensive / dear', pos: 'adjective' },
    { id: 'u19-deshevy', ru: 'дешёвый', translit: 'deshyovy', en: 'cheap', pos: 'adjective' },
    { id: 'u19-nosit', ru: 'носи́ть', translit: 'nosit', en: 'to wear', pos: 'verb' },
    { id: 'u19-kupit', ru: 'купи́ть', translit: 'kupit', en: 'to buy', pos: 'verb' },
    { id: 'u19-razmer', ru: 'разме́р', translit: 'razmer', en: 'size', pos: 'noun', gender: 'm' },
    { id: 'u19-magazin', ru: 'магази́н', translit: 'magazin', en: 'shop', pos: 'noun', gender: 'm' }
  ],
  phrases: [
    { id: 'p-u19-1', ru: 'Мо́жно приме́рить?', trans: 'mozhno primerit?', en: 'May I try it on?' },
    { id: 'p-u19-2', ru: 'У вас есть друго́й разме́р?', trans: 'u vas yest drugoy razmer?', en: 'Do you have another size?' }
  ],
  sentences: [
    { ru: 'Э́то моя́ кра́сная руба́шка.', translit: 'eta moya krasnaya rubashka', en: 'This is my red shirt.', words: [{ id: 'u19-krasny', ru: 'кра́сная', en: 'red' }, { id: 'u19-rubashka', ru: 'руба́шка', en: 'shirt' }] },
    { ru: 'Я ношу́ чёрные брю́ки.', translit: 'ya noshu chyornyye bryuki', en: 'I wear black trousers.', words: [{ id: 'u19-nosit', ru: 'ношу́', en: 'to wear' }, { id: 'u19-cherny', ru: 'чёрные', en: 'black' }, { id: 'u19-bryuki', ru: 'брю́ки', en: 'trousers' }] },
    { ru: 'Кра́сное пла́тье о́чень краси́вое.', translit: 'krasnoye platye ochen krasivoye', en: 'The red dress is very pretty.', words: [{ id: 'u19-plate', ru: 'пла́тье', en: 'dress' }] },
    { ru: 'Ско́лько сто́ит э́та ку́ртка?', translit: 'skolko stoit eta kurtka?', en: 'How much is this jacket?', words: [{ id: 'u19-kurtka', ru: 'ку́ртка', en: 'jacket' }] },
    { ru: 'Э́та о́бувь сли́шком дорога́я.', translit: 'eta obuv slishkom dorogaya', en: 'This footwear is too expensive.', words: [{ id: 'u19-obuv', ru: 'о́бувь', en: 'footwear' }, { id: 'u19-dorogoy', ru: 'дорога́я', en: 'expensive' }] }
  ],
  dialogue: {
    title: 'В магази́не оде́жды (In the clothes shop)',
    lines: [
      { who: 'Продаве́ц', ru: 'До́брый день! Вам помо́чь?', en: 'Good afternoon! Can I help you?' },
      { who: 'Том', ru: 'Да, ско́лько сто́ит э́та си́няя руба́шка?', en: 'Yes, how much is this blue shirt?' },
      { who: 'Продаве́ц', ru: 'Две ты́сячи рубле́й.', en: 'Two thousand rubles.' },
      { who: 'Том', ru: 'О́чень дорого́. А есть дешёвые руба́шки?', en: 'Very expensive. Are there cheaper shirts?' },
      { who: 'Продаве́ц', ru: 'Да, вот бе́лые и зелёные. Мо́жно приме́рить.', en: 'Yes, here are white and green ones. You may try them on.' }
    ],
    questions: [
      { type: 'mc-ru', q: 'Что хо́чет купи́ть Том?', options: ['руба́шку', 'пла́тье', 'ку́ртку', 'о́бувь'], answer: 'руба́шку' },
      { type: 'mc-ru', q: 'Како́го цве́та руба́шка?', options: ['си́него', 'кра́сного', 'бе́лого', 'чёрного'], answer: 'си́него' },
      { type: 'mc-ru', q: 'Ско́лько руба́шка?', options: ['две ты́сячи рубле́й', 'одна́ ты́сяча', 'три ты́сячи', 'пятьсо́т'], answer: 'две ты́сячи рубле́й' }
    ]
  },
  quiz: [
    { type: 'mc-en', q: 'Что зна́чит «оде́жда»?', options: ['clothes', 'shoes', 'hat', 'size'], answer: 'clothes', ru: 'оде́жда' },
    { type: 'mc-en', q: 'Что зна́чит «пла́тье»?', options: ['dress', 'shirt', 'jacket', 'trousers'], answer: 'dress', ru: 'пла́тье' },
    { type: 'mc-ru', q: 'How do you say “black”?', options: ['чёрный', 'бе́лый', 'кра́сный', 'зелёный'], answer: 'чёрный', ru: 'чёрный' },
    { type: 'mc-ru', q: '“shoes / footwear” in Russian', options: ['о́бувь', 'ша́пка', 'руба́шка', 'ку́ртка'], answer: 'о́бувь', ru: 'о́бувь' },
    { type: 'typing', q: 'Type “trousers” in Russian', answer: 'брюки', accepts: ['брю́ки'], ru: 'брю́ки' },
    { type: 'typing', q: 'Type “size” in Russian', answer: 'размер', accepts: ['разме́р'], ru: 'разме́р' },
    { type: 'mc-en', q: 'Что зна́чит «носи́ть»?', options: ['to wear', 'to buy', 'to try', 'to sell'], answer: 'to wear', ru: 'носи́ть' },
    { type: 'mc-ru', q: 'Feminine form of «кра́сный»', options: ['кра́сная', 'кра́сное', 'кра́сные', 'кра́сный'], answer: 'кра́сная', ru: 'кра́сная' },
    { type: 'mc-en', q: 'Что зна́чит «дешёвый»?', options: ['cheap', 'expensive', 'new', 'old'], answer: 'cheap', ru: 'дешёвый' },
    { type: 'mc-ru', q: 'Complete: Э́то ___ пла́тье (green).', options: ['зелёное', 'зелёный', 'зелёная', 'зелёные'], answer: 'зелёное', ru: 'зелёное' },
    { type: 'typing', q: 'Type “hat” in Russian', answer: 'шапка', accepts: ['ша́пка'], ru: 'ша́пка' },
    { type: 'mc-en', q: 'Что зна́чит «магази́н»?', options: ['shop', 'market', 'size', 'clothes'], answer: 'shop', ru: 'магази́н' }
  ],
  test: {
    title: 'Unit 19 test — Clothes and colours',
    questions: [
      { type: 'mc-ru', q: '“jacket” in Russian', options: ['ку́ртка', 'руба́шка', 'пла́тье', 'ша́пка'], answer: 'ку́ртка', ru: 'ку́ртка' },
      { type: 'mc-en', q: 'Что зна́чит «бе́лый»?', options: ['white', 'black', 'blue', 'green'], answer: 'white', ru: 'бе́лый' },
      { type: 'typing', q: 'Type “red” in Russian', answer: 'красный', accepts: ['кра́сный'], ru: 'кра́сный' },
      { type: 'typing', q: 'Type “to buy” in Russian', answer: 'купить', accepts: ['купи́ть'], ru: 'купи́ть' },
      { type: 'mc-ru', q: '“green” in Russian', options: ['зелёный', 'си́ний', 'чёрный', 'бе́лый'], answer: 'зелёный', ru: 'зелёный' },
      { type: 'mc-en', q: 'Что зна́чит «дорого́й»?', options: ['expensive / dear', 'cheap', 'big', 'short'], answer: 'expensive / dear', ru: 'дорого́й' },
      { type: 'mc-ru', q: 'Complete: У меня́ ___ брю́ки.', options: ['чёрные', 'чёрный', 'чёрная', 'чёрное'], answer: 'чёрные', ru: 'чёрные брю́ки' },
      { type: 'typing', q: 'Type “clothes” in Russian', answer: 'одежда', accepts: ['оде́жда'], ru: 'оде́жда' },
      { type: 'mc-en', q: 'Что зна́чит «разме́р»?', options: ['size', 'colour', 'price', 'shop'], answer: 'size', ru: 'разме́р' },
      { type: 'mc-ru', q: '“dark blue” in Russian', options: ['си́ний', 'кра́сный', 'зелёный', 'бе́лый'], answer: 'си́ний', ru: 'си́ний' },
      { type: 'typing', q: 'Type “dress” in Russian', answer: 'платье', accepts: ['пла́тье'], ru: 'пла́тье' },
      { type: 'mc-en', q: 'Что зна́чит «носи́ть»?', options: ['to wear', 'to wash', 'to iron', 'to make'], answer: 'to wear', ru: 'носи́ть' }
    ]
  }
};
