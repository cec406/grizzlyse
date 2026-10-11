// Unit 6 — Food & ordering. A1.
export const unit = {
  id: 'u06',
  level: 'A1',
  number: 6,
  title: 'Food & ordering',
  titleEs: 'En el café',
  story: 'You walk into a café in Old San Juan and the smell of coffee and fried food hits you. This unit gives you the food words, the polite phrases for ordering, and the question that ends every meal: ¿Cuánto cuesta? By the end you can order a coffee, an empanada and a fresh juice without pointing at the menu.',
  grammar: [
    {
      topic: 'quiero and me gustaría',
      explanation: 'quiero means I want and is perfectly polite in a café. Me gustaría means I would like and is a little softer. quisiera means the same and sounds very courteous.',
      table: [
        ['Spanish', 'English'],
        ['Quiero un café.', 'I want a coffee.'],
        ['Me gustaría un jugo.', 'I would like a juice.'],
        ['Quisiera una empanada.', 'I would like an empanada.'],
        ['¿Qué desea?', 'What would you like? (polite)']
      ],
      examples: [
        { es: 'Me gustaría un café con leche.', trans: 'meh goos-tah-REE-ah oon kah-FEH kon LEH-cheh', en: 'I would like a coffee with milk.' }
      ]
    },
    {
      topic: 'un, una — one of something',
      explanation: 'Food nouns are masculine or feminine, so one of them uses un or una. Order a few and you will start to feel which ending goes with which word. When you want more than one, use unos or unas.',
      table: [
        ['Food', 'Article', 'Example'],
        ['café (m)', 'un', 'un café'],
        ['empanada (f)', 'una', 'una empanada'],
        ['jugo (m)', 'un', 'un jugo de parcha'],
        ['ensalada (f)', 'una', 'una ensalada'],
        ['frijoles (m pl)', 'unos', 'unos frijoles']
      ],
      examples: [
        { es: 'Una empanada de pollo, por favor.', trans: 'OO-nah em-pah-NAH-dah deh POH-yoh por fah-VOR', en: 'One chicken empanada, please.' }
      ]
    },
    {
      topic: 'Prices and the bill',
      explanation: 'Ask the price with ¿Cuánto cuesta? for one thing or ¿Cuánto cuestan? for several. When you finish, ask for the bill with La cuenta, por favor.',
      table: [
        ['Spanish', 'English'],
        ['¿Cuánto cuesta?', 'How much does it cost?'],
        ['Son ocho dólares.', 'That is eight dollars.'],
        ['La cuenta, por favor.', 'The bill, please.'],
        ['¿Efectivo o tarjeta?', 'Cash or card?']
      ],
      examples: [
        { es: '¿Cuánto cuesta el café?', trans: 'KWAN-toh KWES-tah el kah-FEH', en: 'How much does the coffee cost?' }
      ]
    }
  ],
  vocabulary: [
    { id: 'u06-cafe', es: 'café', translit: 'kah-FEH', en: 'coffee', pos: 'noun', gender: 'm' },
    { id: 'u06-jugo', es: 'jugo', translit: 'HOO-goh', en: 'juice', pos: 'noun', gender: 'm' },
    { id: 'u06-empanada', es: 'empanada', translit: 'em-pah-NAH-dah', en: 'empanada', pos: 'noun', gender: 'f' },
    { id: 'u06-agua', es: 'agua', translit: 'AH-gwah', en: 'water', pos: 'noun', gender: 'f' },
    { id: 'u06-pan', es: 'pan', translit: 'pan', en: 'bread', pos: 'noun', gender: 'm' },
    { id: 'u06-arroz', es: 'arroz', translit: 'ah-ROHS', en: 'rice', pos: 'noun', gender: 'm' },
    { id: 'u06-pollo', es: 'pollo', translit: 'POH-yoh', en: 'chicken', pos: 'noun', gender: 'm' },
    { id: 'u06-frijoles', es: 'frijoles', translit: 'free-HOH-les', en: 'beans', pos: 'noun', gender: 'm' },
    { id: 'u06-platano', es: 'plátano', translit: 'PLAH-tah-noh', en: 'plantain / banana', pos: 'noun', gender: 'm' },
    { id: 'u06-ensalada', es: 'ensalada', translit: 'en-sah-LAH-dah', en: 'salad', pos: 'noun', gender: 'f' },
    { id: 'u06-sandwich', es: 'sándwich', translit: 'SAN-dweech', en: 'sandwich', pos: 'noun', gender: 'm' },
    { id: 'u06-postre', es: 'postre', translit: 'POHS-treh', en: 'dessert', pos: 'noun', gender: 'm' },
    { id: 'u06-parcha', es: 'parcha', translit: 'PAR-chah', en: 'passion fruit', pos: 'noun', gender: 'f' },
    { id: 'u06-cuenta', es: 'cuenta', translit: 'KWEN-tah', en: 'bill / check', pos: 'noun', gender: 'f' },
    { id: 'u06-mesa', es: 'mesa', translit: 'MEH-sah', en: 'table', pos: 'noun', gender: 'f' },
    { id: 'u06-camarero', es: 'camarero', translit: 'kah-mah-REH-roh', en: 'waiter', pos: 'noun', gender: 'm' },
    { id: 'u06-comida', es: 'comida', translit: 'koh-MEE-dah', en: 'food / meal', pos: 'noun', gender: 'f' },
    { id: 'u06-quiero', es: 'quiero', translit: 'KYEH-roh', en: 'I want', pos: 'verb' },
    { id: 'u06-quisiera', es: 'quisiera', translit: 'kee-SYEH-rah', en: 'I would like', pos: 'verb' },
    { id: 'u06-gustaria', es: 'gustaría', translit: 'goos-tah-REE-ah', en: 'would like', pos: 'verb' },
    { id: 'u06-cuesta', es: 'cuesta', translit: 'KWES-tah', en: 'it costs', pos: 'verb' },
    { id: 'u06-cuanto', es: 'cuánto', translit: 'KWAN-toh', en: 'how much', pos: 'question' },
    { id: 'u06-delicioso', es: 'delicioso', translit: 'deh-lee-SYOH-soh', en: 'delicious', pos: 'adjective' },
    { id: 'u06-caliente', es: 'caliente', translit: 'kah-LYEN-teh', en: 'hot', pos: 'adjective' },
    { id: 'u06-frio', es: 'frío', translit: 'FREE-oh', en: 'cold', pos: 'adjective' },
    { id: 'u06-porfavor', es: 'por favor', translit: 'por fah-VOR', en: 'please', pos: 'phrase' }
  ],
  phrases: [
    { id: 'p-u06-1', es: 'Me gustaría un café, por favor.', trans: 'meh goos-tah-REE-ah oon kah-FEH por fah-VOR', en: 'I would like a coffee, please.' },
    { id: 'p-u06-2', es: '¿Cuánto cuesta?', trans: 'KWAN-toh KWES-tah', en: 'How much does it cost?' },
    { id: 'p-u06-3', es: 'La cuenta, por favor.', trans: 'lah KWEN-tah por fah-VOR', en: 'The bill, please.' }
  ],
  sentences: [
    { es: 'Quiero un café con leche, por favor.', translit: 'KYEH-roh oon kah-FEH kon LEH-cheh por fah-VOR', en: 'I want a coffee with milk, please.', words: [{ id: 'u06-quiero', es: 'Quiero', en: 'I want' }, { id: 'u06-cafe', es: 'café', en: 'coffee' }, { id: 'u06-porfavor', es: 'por favor', en: 'please' }] },
    { es: 'Me gustaría una empanada de pollo.', translit: 'meh goos-tah-REE-ah OO-nah em-pah-NAH-dah deh POH-yoh', en: 'I would like a chicken empanada.', words: [{ id: 'u06-gustaria', es: 'gustaría', en: 'would like' }, { id: 'u06-empanada', es: 'empanada', en: 'empanada' }, { id: 'u06-pollo', es: 'pollo', en: 'chicken' }] },
    { es: 'El jugo de parcha es delicioso.', translit: 'el HOO-goh deh PAR-chah es deh-lee-SYOH-soh', en: 'Passion fruit juice is delicious.', words: [{ id: 'u06-jugo', es: 'jugo', en: 'juice' }, { id: 'u06-parcha', es: 'parcha', en: 'passion fruit' }, { id: 'u06-delicioso', es: 'delicioso', en: 'delicious' }] },
    { es: '¿Cuánto cuesta el plátano frito?', translit: 'KWAN-toh KWES-tah el PLAH-tah-noh FREE-toh', en: 'How much does the fried plantain cost?', words: [{ id: 'u06-cuanto', es: 'Cuánto', en: 'how much' }, { id: 'u06-cuesta', es: 'cuesta', en: 'it costs' }, { id: 'u06-platano', es: 'plátano', en: 'plantain' }] },
    { es: 'La cuenta, por favor.', translit: 'lah KWEN-tah por fah-VOR', en: 'The bill, please.', words: [{ id: 'u06-cuenta', es: 'cuenta', en: 'bill' }, { id: 'u06-porfavor', es: 'por favor', en: 'please' }] },
    { es: 'El café está caliente y el jugo está frío.', translit: 'el kah-FEH es-TA kah-LYEN-teh ee el HOO-goh es-TA FREE-oh', en: 'The coffee is hot and the juice is cold.', words: [{ id: 'u06-cafe', es: 'café', en: 'coffee' }, { id: 'u06-caliente', es: 'caliente', en: 'hot' }, { id: 'u06-jugo', es: 'jugo', en: 'juice' }, { id: 'u06-frio', es: 'frío', en: 'cold' }] }
  ],
  dialogue: {
    title: 'En el café de la Calle Fortaleza (At the café on Fortaleza Street)',
    lines: [
      { who: 'Camarero', es: '¡Buenas tardes! ¿Qué desea?', en: 'Good afternoon! What would you like?' },
      { who: 'Cliente', es: 'Buenas tardes. Me gustaría un café con leche.', en: 'Good afternoon. I would like a coffee with milk.' },
      { who: 'Camarero', es: '¿Algo para comer?', en: 'Something to eat?' },
      { who: 'Cliente', es: 'Sí, una empanada de pollo y un jugo de parcha.', en: 'Yes, a chicken empanada and a passion fruit juice.' },
      { who: 'Camarero', es: 'Muy bien. ¿Algo más?', en: 'Very well. Anything else?' },
      { who: 'Cliente', es: 'No, gracias. ¿Cuánto cuesta?', en: 'No, thank you. How much does it cost?' },
      { who: 'Camarero', es: 'Son ocho dólares. ¿Efectivo o tarjeta?', en: 'That is eight dollars. Cash or card?' },
      { who: 'Cliente', es: 'Tarjeta, por favor. ¡Gracias!', en: 'Card, please. Thank you!' }
    ],
    questions: [
      { type: 'mc-es', q: '¿Qué pide el cliente para comer?', options: ['una empanada de pollo', 'un café con leche', 'un jugo de parcha', 'arroz con pollo'], answer: 'una empanada de pollo' },
      { type: 'mc-es', q: '¿Cuánto cuesta todo?', options: ['ocho dólares', 'diez dólares', 'cinco dólares', 'dos dólares'], answer: 'ocho dólares' },
      { type: 'mc-es', q: '¿Cómo paga el cliente?', options: ['con tarjeta', 'en efectivo', 'con un cheque', 'no paga'], answer: 'con tarjeta' },
      { type: 'mc-es', q: '¿Qué bebida pide el cliente?', options: ['un jugo de parcha', 'un café solo', 'agua', 'un refresco'], answer: 'un jugo de parcha' }
    ]
  },
  quiz: [
    { type: 'mc-en', q: '¿Qué significa «café»?', options: ['coffee', 'juice', 'water', 'tea'], answer: 'coffee', es: 'café' },
    { type: 'mc-en', q: '¿Qué significa «empanada»?', options: ['empanada', 'sandwich', 'salad', 'soup'], answer: 'empanada', es: 'empanada' },
    { type: 'mc-es', q: 'Say I want a juice.', options: ['Quiero un jugo', 'Quiero una jugo', 'Gustaría un jugo', 'Quiero un café'], answer: 'Quiero un jugo', es: 'Quiero un jugo' },
    { type: 'typing', q: 'Type water in Spanish', answer: 'agua', accepts: [], es: 'agua' },
    { type: 'mc-en', q: '¿Qué significa «cuenta»?', options: ['bill / check', 'table', 'waiter', 'menu'], answer: 'bill / check', es: 'cuenta' },
    { type: 'mc-es', q: 'Ask how much does it cost.', options: ['¿Cuánto cuesta?', '¿Cuánto es?', '¿Qué cuesta?', '¿Dónde está?'], answer: '¿Cuánto cuesta?', es: '¿Cuánto cuesta?' },
    { type: 'mc-en', q: '¿Qué significa «pollo»?', options: ['chicken', 'pork', 'beef', 'fish'], answer: 'chicken', es: 'pollo' },
    { type: 'typing', q: 'Type coffee in Spanish', answer: 'cafe', accepts: ['café'], es: 'café' },
    { type: 'mc-es', q: 'Which is a polite order?', options: ['Me gustaría un café, por favor', 'Dame café', 'Quiero café ahora', 'Café'], answer: 'Me gustaría un café, por favor', es: 'Me gustaría un café, por favor' },
    { type: 'mc-en', q: '¿Qué significa «delicioso»?', options: ['delicious', 'cold', 'hot', 'expensive'], answer: 'delicious', es: 'delicioso' },
    { type: 'mc-es', q: 'Say the bill, please.', options: ['La cuenta, por favor', 'El postre, por favor', 'La mesa, por favor', 'Un café, por favor'], answer: 'La cuenta, por favor', es: 'La cuenta, por favor' },
    { type: 'typing', q: 'Type chicken in Spanish', answer: 'pollo', accepts: [], es: 'pollo' }
  ],
  test: {
    title: 'Unit 6 test — Food & ordering',
    questions: [
      { type: 'mc-en', q: '¿Qué significa «jugo»?', options: ['juice', 'coffee', 'water', 'milk'], answer: 'juice', es: 'jugo' },
      { type: 'mc-es', q: 'Say I would like an empanada.', options: ['Me gustaría una empanada', 'Quiero una empanada', 'Gustaría una empanada', 'Me gusta una empanada'], answer: 'Me gustaría una empanada', es: 'Me gustaría una empanada' },
      { type: 'typing', q: 'Type bread in Spanish', answer: 'pan', accepts: [], es: 'pan' },
      { type: 'mc-en', q: '¿Qué significa «arroz»?', options: ['rice', 'beans', 'bread', 'chicken'], answer: 'rice', es: 'arroz' },
      { type: 'mc-es', q: 'Say one salad.', options: ['una ensalada', 'un ensalada', 'unos ensalada', 'el ensalada'], answer: 'una ensalada', es: 'una ensalada' },
      { type: 'typing', q: 'Type dessert in Spanish', answer: 'postre', accepts: [], es: 'postre' },
      { type: 'mc-en', q: '¿Qué significa «mesa»?', options: ['table', 'bill', 'waiter', 'food'], answer: 'table', es: 'mesa' },
      { type: 'mc-es', q: 'Say the coffee is hot.', options: ['El café está caliente', 'El café es caliente', 'El café tiene caliente', 'El café está frío'], answer: 'El café está caliente', es: 'El café está caliente' },
      { type: 'mc-en', q: '¿Qué significa «camarero»?', options: ['waiter', 'cook', 'customer', 'café'], answer: 'waiter', es: 'camarero' },
      { type: 'typing', q: 'Type please in Spanish (two words)', answer: 'por favor', accepts: [], es: 'por favor' },
      { type: 'mc-es', q: 'Say the chicken empanada.', options: ['la empanada de pollo', 'el empanada de pollo', 'la empanada de arroz', 'la pollo empanada'], answer: 'la empanada de pollo', es: 'la empanada de pollo' },
      { type: 'mc-en', q: '¿Qué significa «frijoles»?', options: ['beans', 'rice', 'plantains', 'salad'], answer: 'beans', es: 'frijoles' }
    ]
  }
};
