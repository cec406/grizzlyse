// Unit 9 — Shopping. A1.
export const unit = {
  id: 'u09',
  level: 'A1',
  number: 9,
  title: 'Shopping',
  titleRu: 'Поку́пки',
  story: 'Ask a price, decide if something is expensive or cheap, and pay. You will reuse the accusative for what you buy, meet the verb плати́ть, and learn the one question that opens every transaction: «Ско́лько э́то сто́ит?».',
  grammar: [
    {
      topic: 'Ско́лько сто́ит? — asking prices',
      explanation: 'Ско́лько сто́ит …? asks the price of one thing; for several things сто́ит becomes сто́ят. The thing itself stays in the nominative after this question.',
      table: [
        ['Russian', 'English'],
        ['Ско́лько сто́ит биле́т?', 'How much is the ticket?'],
        ['Ско́лько сто́ят биле́ты?', 'How much are the tickets?'],
        ['Э́то до́рого.', 'That is expensive.'],
        ['Э́то дёшево.', 'That is cheap.']
      ],
      examples: [
        { ru: 'Ско́лько сто́ит э́та су́мка?', trans: 'skolko stoit eta sumka?', en: 'How much is this bag?' }
      ]
    },
    {
      topic: 'купи́ть + accusative',
      explanation: 'What you buy is the direct object, so it goes into the accusative. Feminine -а → -у: су́мка → су́мку, вода́ → во́ду. Masculine inanimate nouns do not change: купи́ть сыр.',
      table: [
        ['Nominative', 'Accusative', 'Example'],
        ['су́мка', 'су́мку', 'купи́ть су́мку'],
        ['ка́рта', 'ка́рту', 'купи́ть ка́рту'],
        ['сыр', 'сыр', 'купи́ть сыр'],
        ['хлеб', 'хлеб', 'купи́ть хлеб']
      ],
      examples: [
        { ru: 'Я хочу́ купи́ть э́ту су́мку.', trans: 'ya khochu kupit etu sumku', en: 'I want to buy this bag.' }
      ]
    },
    {
      topic: 'Paying: плати́ть and на́до',
      explanation: 'плати́ть means "to pay"; the thing you pay with is in the instrumental case (ка́ртой = with a card). На́до + infinitive means "I need to": Мне на́до плати́ть.',
      table: [
        ['Russian', 'English'],
        ['Мо́жно плати́ть ка́ртой?', 'Can I pay by card?'],
        ['На́до плати́ть.', 'I have to pay.'],
        ['Вот чек.', 'Here is the receipt.'],
        ['Э́то сли́шком до́рого.', 'That is too expensive.']
      ],
      examples: [
        { ru: 'Мо́жно плати́ть ка́ртой? — Да, коне́чно.', trans: 'mozhno platit kartoy? da, konechno', en: 'Can I pay by card? — Yes, of course.' }
      ]
    }
  ],
  vocabulary: [
    { id: 'u9-dengi', ru: 'де́ньги', translit: 'dengi', en: 'money', pos: 'noun', gender: 'p' },
    { id: 'u9-rubl', ru: 'рубль', translit: 'rubl', en: 'ruble', pos: 'noun', gender: 'm' },
    { id: 'u9-tsena', ru: 'цена́', translit: 'tsena', en: 'price', pos: 'noun', gender: 'f' },
    { id: 'u9-dorogo', ru: 'до́рого', translit: 'dorogo', en: 'expensive', pos: 'adverb' },
    { id: 'u9-deshevo', ru: 'дёшево', translit: 'dyoshevo', en: 'cheap', pos: 'adverb' },
    { id: 'u9-kupit', ru: 'купи́ть', translit: 'kupit', en: 'to buy', pos: 'verb' },
    { id: 'u9-platit', ru: 'плати́ть', translit: 'platit', en: 'to pay', pos: 'verb' },
    { id: 'u9-karta', ru: 'ка́рта', translit: 'karta', en: 'map / card', pos: 'noun', gender: 'f' },
    { id: 'u9-kartochka', ru: 'ка́рточка', translit: 'kartochka', en: 'bank card', pos: 'noun', gender: 'f' },
    { id: 'u9-razmer', ru: 'разме́р', translit: 'razmer', en: 'size', pos: 'noun', gender: 'm' },
    { id: 'u9-skidka', ru: 'ски́дка', translit: 'skidka', en: 'discount', pos: 'noun', gender: 'f' },
    { id: 'u9-chek', ru: 'чек', translit: 'chek', en: 'receipt', pos: 'noun', gender: 'm' },
    { id: 'u9-sumka', ru: 'су́мка', translit: 'sumka', en: 'bag', pos: 'noun', gender: 'f' },
    { id: 'u9-nado', ru: 'на́до', translit: 'nado', en: 'one needs to / have to', pos: 'adverb' },
    { id: 'u9-skolko', ru: 'ско́лько', translit: 'skolko', en: 'how much', pos: 'question' },
    { id: 'u9-prodavets', ru: 'продаве́ц', translit: 'prodavets', en: 'shop assistant', pos: 'noun', gender: 'm' },
    { id: 'u9-pokupatel', ru: 'покупа́тель', translit: 'pokupatel', en: 'customer', pos: 'noun', gender: 'm' },
    { id: 'u9-stoit', ru: 'сто́ит', translit: 'stoit', en: 'costs', pos: 'verb' }
  ],
  phrases: [
    { id: 'p-u9-1', ru: 'Ско́лько э́то сто́ит?', trans: 'skolko eta stoit?', en: 'How much does this cost?' },
    { id: 'p-u9-2', ru: 'Мо́жно плати́ть ка́ртой?', trans: 'mozhno platit kartoy?', en: 'Can I pay by card?' }
  ],
  sentences: [
    { ru: 'Ско́лько э́то сто́ит?', translit: 'skolko eta stoit?', en: 'How much does this cost?', words: [{ id: 'u9-skolko', ru: 'Ско́лько', en: 'how much' }, { id: 'u9-stoit', ru: 'сто́ит', en: 'costs' }] },
    { ru: 'Э́то о́чень до́рого.', translit: 'eta ochen dorogo', en: 'That is very expensive.', words: [{ id: 'u9-dorogo', ru: 'до́рого', en: 'expensive' }] },
    { ru: 'Я хочу́ купи́ть э́ту су́мку.', translit: 'ya khochu kupit etu sumku', en: 'I want to buy this bag.', words: [{ id: 'u9-kupit', ru: 'купи́ть', en: 'to buy' }, { id: 'u9-sumka', ru: 'су́мку', en: 'bag' }] },
    { ru: 'Мо́жно плати́ть ка́ртой?', translit: 'mozhno platit kartoy?', en: 'Can I pay by card?', words: [{ id: 'u9-platit', ru: 'плати́ть', en: 'to pay' }, { id: 'u9-karta', ru: 'ка́ртой', en: 'card' }] },
    { ru: 'Спаси́бо, вот чек.', translit: 'spasibo, vot chek', en: 'Thank you, here is the receipt.', words: [{ id: 'u9-chek', ru: 'чек', en: 'receipt' }] }
  ],
  dialogue: {
    title: 'В магази́не (In the shop)',
    lines: [
      { who: 'Продаве́ц', ru: 'До́брый день! Вам помо́чь?', en: 'Good afternoon! Can I help you?' },
      { who: 'Том', ru: 'Да, ско́лько сто́ит э́та су́мка?', en: 'Yes, how much is this bag?' },
      { who: 'Продаве́ц', ru: 'Ты́сяча рубле́й.', en: 'One thousand rubles.' },
      { who: 'Том', ru: 'Ой, э́то о́чень до́рого. Есть ски́дка?', en: 'Oh, that is very expensive. Is there a discount?' },
      { who: 'Продаве́ц', ru: 'Да, де́сять проце́нтов. Восемьсо́т девяно́сто.', en: 'Yes, ten percent. Eight hundred ninety.' },
      { who: 'Том', ru: 'Хорошо́. Мо́жно плати́ть ка́ртой?', en: 'Okay. Can I pay by card?' },
      { who: 'Продаве́ц', ru: 'Коне́чно. Вот чек!', en: 'Of course. Here is the receipt!' }
    ],
    questions: [
      { type: 'mc-ru', q: 'Ско́лько сто́ит су́мка снача́ла?', options: ['ты́сяча рубле́й', 'восемьсо́т девяно́сто', 'пятьсо́т рубле́й', 'две ты́сячи'], answer: 'ты́сяча рубле́й' },
      { type: 'mc-ru', q: 'Кака́я ски́дка?', options: ['де́сять проце́нтов', 'пять проце́нтов', 'два́дцать проце́нтов', 'нет ски́дки'], answer: 'де́сять проце́нтов' },
      { type: 'mc-ru', q: 'Как Том пла́тит?', options: ['ка́ртой', 'наличи́чными', 'телефо́ном', 'не пла́тит'], answer: 'ка́ртой' }
    ]
  },
  quiz: [
    { type: 'mc-en', q: 'Что зна́чит «де́ньги»?', options: ['money', 'price', 'shop', 'receipt'], answer: 'money', ru: 'де́ньги' },
    { type: 'mc-en', q: 'Что зна́чит «до́рого»?', options: ['expensive', 'cheap', 'free', 'big'], answer: 'expensive', ru: 'до́рого' },
    { type: 'mc-ru', q: 'How do you say “cheap”?', options: ['дёшево', 'до́рого', 'мно́го', 'ма́ло'], answer: 'дёшево', ru: 'дёшево' },
    { type: 'mc-ru', q: '“to buy” in Russian', options: ['купи́ть', 'плати́ть', 'прода́ть', 'брать'], answer: 'купи́ть', ru: 'купи́ть' },
    { type: 'typing', q: 'Type “to pay” in Russian', answer: 'платить', accepts: ['плати́ть'], ru: 'плати́ть' },
    { type: 'typing', q: 'Type “money” in Russian', answer: 'деньги', accepts: ['де́ньги'], ru: 'де́ньги' },
    { type: 'mc-en', q: 'Что зна́чит «цена́»?', options: ['price', 'money', 'discount', 'receipt'], answer: 'price', ru: 'цена́' },
    { type: 'mc-ru', q: '“size” in Russian', options: ['разме́р', 'ски́дка', 'чек', 'су́мка'], answer: 'разме́р', ru: 'разме́р' },
    { type: 'mc-en', q: 'Что зна́чит «ски́дка»?', options: ['discount', 'price', 'receipt', 'sale item'], answer: 'discount', ru: 'ски́дка' },
    { type: 'mc-ru', q: 'Complete: Я хочу́ купи́ть ___ (bag).', options: ['су́мку', 'су́мка', 'су́мке', 'су́мкой'], answer: 'су́мку', ru: 'су́мку' },
    { type: 'typing', q: 'Type “receipt” in Russian', answer: 'чек', accepts: [], ru: 'чек' },
    { type: 'mc-en', q: 'Что зна́чит «рубль»?', options: ['ruble', 'price', 'money', 'coin'], answer: 'ruble', ru: 'рубль' }
  ],
  test: {
    title: 'Unit 9 test — Shopping',
    questions: [
      { type: 'mc-ru', q: '“bag” in Russian', options: ['су́мка', 'чек', 'ски́дка', 'цена́'], answer: 'су́мка', ru: 'су́мка' },
      { type: 'mc-en', q: 'Что зна́чит «чек»?', options: ['receipt', 'cheque book', 'discount', 'price'], answer: 'receipt', ru: 'чек' },
      { type: 'typing', q: 'Type “price” in Russian', answer: 'цена', accepts: ['цена́'], ru: 'цена́' },
      { type: 'typing', q: 'Type “discount” in Russian', answer: 'скидка', accepts: ['ски́дка'], ru: 'ски́дка' },
      { type: 'mc-ru', q: '“expensive” in Russian', options: ['до́рого', 'дёшево', 'мно́го', 'но́во'], answer: 'до́рого', ru: 'до́рого' },
      { type: 'mc-en', q: 'Что зна́чит «продаве́ц»?', options: ['shop assistant', 'customer', 'manager', 'owner'], answer: 'shop assistant', ru: 'продаве́ц' },
      { type: 'mc-ru', q: 'Complete: Я хочу́ купи́ть ___ (water).', options: ['во́ду', 'вода́', 'воды́', 'водо́й'], answer: 'во́ду', ru: 'во́ду' },
      { type: 'typing', q: 'Type “ruble” in Russian', answer: 'рубль', accepts: [], ru: 'рубль' },
      { type: 'mc-en', q: 'Что зна́чит «ка́рточка»?', options: ['bank card', 'map', 'receipt', 'bag'], answer: 'bank card', ru: 'ка́рточка' },
      { type: 'mc-ru', q: '“to pay” in Russian', options: ['плати́ть', 'купи́ть', 'сто́ить', 'брать'], answer: 'плати́ть', ru: 'плати́ть' },
      { type: 'typing', q: 'Type “customer” in Russian', answer: 'покупатель', accepts: ['покупа́тель'], ru: 'покупа́тель' },
      { type: 'mc-en', q: 'Что зна́чит «на́до»?', options: ['one needs to', 'one wants to', 'one can', 'one must not'], answer: 'one needs to', ru: 'на́до' }
    ]
  }
};
