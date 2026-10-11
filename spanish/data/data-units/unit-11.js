// Unit 11 — Shopping & money. A2.
export const unit = {
  id: 'u11',
  level: 'A2',
  number: 11,
  title: 'Shopping & money',
  titleEs: 'De compras',
  story: 'Saturday morning at the mercado, then a quick stop at the colmado on the corner. You need prices, quantities, and the words for change and receipts. By the end of this unit you can buy fruit by the pound, ask for a discount, and pay however you like.',
  grammar: [
    {
      topic: 'Quantities with de',
      explanation: 'To buy a measured amount, use un / una + container or weight + de + the thing. The de never changes: un kilo de arroz, una botella de agua, tres libras de fruta.',
      table: [
        ['Spanish', 'English'],
        ['un kilo de arroz', 'a kilo of rice'],
        ['una botella de agua', 'a bottle of water'],
        ['un litro de leche', 'a liter of milk'],
        ['tres libras de fruta', 'three pounds of fruit']
      ],
      examples: [
        { es: 'Quiero un kilo de arroz.', trans: 'KYEH-roh oon KEE-loh deh ah-RROS', en: 'I want a kilo of rice.' },
        { es: 'Una botella de agua, por favor.', trans: 'OO-nah boh-TEH-yah deh AH-gwah por fah-VOR', en: 'A bottle of water, please.' }
      ]
    },
    {
      topic: 'Costar and pagar',
      explanation: 'Costar (to cost) changes o to ue: cuesta, cuestan. Pagar (to pay) is regular. Use ¿Cuánto es? for the total at the register, and pagar con tarjeta or en efectivo to say how you pay.',
      table: [
        ['Spanish', 'English'],
        ['¿Cuánto cuesta?', 'How much does it cost? (one)'],
        ['¿Cuánto cuestan?', 'How much do they cost? (many)'],
        ['¿Cuánto es?', 'How much is it? (the total)'],
        ['Pago con tarjeta.', 'I pay by card.'],
        ['Pago en efectivo.', 'I pay in cash.']
      ],
      examples: [
        { es: '¿Cuánto cuestan las frutas?', trans: 'KWAN-toh KWEHS-tahn lahs FROO-tahs', en: 'How much do the fruits cost?' },
        { es: 'Pago con tarjeta, gracias.', trans: 'PAH-goh kon tar-HEH-tah GRAH-syas', en: 'I pay by card, thank you.' }
      ]
    },
    {
      topic: 'Cheap and expensive',
      explanation: 'Barato means cheap and caro means expensive. They agree with the noun: el pan es barato, la carne es barata. Use muy for very and un poco for a little.',
      table: [
        ['Spanish', 'English'],
        ['Es barato.', 'It is cheap. (m)'],
        ['Es barata.', 'It is cheap. (f)'],
        ['Es muy caro.', 'It is very expensive. (m)'],
        ['Hay un descuento.', 'There is a discount.']
      ],
      examples: [
        { es: 'El pescado es muy caro hoy.', trans: 'el pes-KAH-doh es mooee KAH-roh oy', en: 'The fish is very expensive today.' },
        { es: 'La fruta es barata en el mercado.', trans: 'lah FROO-tah es bah-RAH-tah en el mehr-KAH-doh', en: 'Fruit is cheap at the market.' }
      ]
    }
  ],
  vocabulary: [
    { id: 'u11-mercado', es: 'el mercado', translit: 'el mehr-KAH-doh', en: 'market', pos: 'noun', gender: 'm' },
    { id: 'u11-colmado', es: 'el colmado', translit: 'el kol-MAH-doh', en: 'corner store', pos: 'noun', gender: 'm' },
    { id: 'u11-tienda', es: 'la tienda', translit: 'lah TYEHN-dah', en: 'shop / store', pos: 'noun', gender: 'f' },
    { id: 'u11-precio', es: 'el precio', translit: 'el PREH-syoh', en: 'price', pos: 'noun', gender: 'm' },
    { id: 'u11-cambio', es: 'el cambio', translit: 'el KAHM-byoh', en: 'change (money)', pos: 'noun', gender: 'm' },
    { id: 'u11-moneda', es: 'la moneda', translit: 'lah moh-NEH-dah', en: 'coin', pos: 'noun', gender: 'f' },
    { id: 'u11-descuento', es: 'el descuento', translit: 'el des-KWEHN-toh', en: 'discount', pos: 'noun', gender: 'm' },
    { id: 'u11-oferta', es: 'la oferta', translit: 'lah oh-FEHR-tah', en: 'sale / offer', pos: 'noun', gender: 'f' },
    { id: 'u11-recibo', es: 'el recibo', translit: 'el reh-SEE-boh', en: 'receipt', pos: 'noun', gender: 'm' },
    { id: 'u11-bolsa', es: 'la bolsa', translit: 'lah BOL-sah', en: 'bag', pos: 'noun', gender: 'f' },
    { id: 'u11-kilo', es: 'el kilo', translit: 'el KEE-loh', en: 'kilo', pos: 'noun', gender: 'm' },
    { id: 'u11-libra', es: 'la libra', translit: 'lah LEE-brah', en: 'pound', pos: 'noun', gender: 'f' },
    { id: 'u11-litro', es: 'el litro', translit: 'el LEE-troh', en: 'liter', pos: 'noun', gender: 'm' },
    { id: 'u11-botella', es: 'la botella', translit: 'lah boh-TEH-yah', en: 'bottle', pos: 'noun', gender: 'f' },
    { id: 'u11-caja', es: 'la caja', translit: 'lah KAH-hah', en: 'cash register / box', pos: 'noun', gender: 'f' },
    { id: 'u11-fruta', es: 'la fruta', translit: 'lah FROO-tah', en: 'fruit', pos: 'noun', gender: 'f' },
    { id: 'u11-verdura', es: 'la verdura', translit: 'lah vehr-DOO-rah', en: 'vegetable', pos: 'noun', gender: 'f' },
    { id: 'u11-carne', es: 'la carne', translit: 'lah KAR-neh', en: 'meat', pos: 'noun', gender: 'f' },
    { id: 'u11-pescado', es: 'el pescado', translit: 'el pes-KAH-doh', en: 'fish (food)', pos: 'noun', gender: 'm' },
    { id: 'u11-pan', es: 'el pan', translit: 'el pan', en: 'bread', pos: 'noun', gender: 'm' },
    { id: 'u11-arroz', es: 'el arroz', translit: 'el ah-RROS', en: 'rice', pos: 'noun', gender: 'm' },
    { id: 'u11-comprar', es: 'comprar', translit: 'kom-PRAR', en: 'to buy', pos: 'verb' },
    { id: 'u11-pagar', es: 'pagar', translit: 'pah-GAR', en: 'to pay', pos: 'verb' },
    { id: 'u11-costar', es: 'costar', translit: 'kos-TAR', en: 'to cost', pos: 'verb' },
    { id: 'u11-barato', es: 'barato', translit: 'bah-RAH-toh', en: 'cheap', pos: 'adjective' },
    { id: 'u11-caro', es: 'caro', translit: 'KAH-roh', en: 'expensive', pos: 'adjective' }
  ],
  phrases: [
    { id: 'p-u11-1', es: '¿Cuánto es?', trans: 'KWAN-toh es', en: 'How much is it? (the total)' },
    { id: 'p-u11-2', es: '¿Me da un recibo?', trans: 'meh dah oon reh-SEE-boh', en: 'Can you give me a receipt?' },
    { id: 'p-u11-3', es: 'Está en oferta.', trans: 'es-TA en oh-FEHR-tah', en: 'It is on sale.' },
    { id: 'p-u11-4', es: 'Aquí tiene su cambio.', trans: 'ah-KEE TYEH-neh soo KAHM-byoh', en: 'Here is your change.' }
  ],
  sentences: [
    { es: 'Voy al mercado a comprar fruta.', translit: 'boy al mehr-KAH-doh ah kom-PRAR FROO-tah', en: 'I am going to the market to buy fruit.', words: [{ id: 'u11-mercado', es: 'mercado', en: 'market' }, { id: 'u11-comprar', es: 'comprar', en: 'to buy' }, { id: 'u11-fruta', es: 'fruta', en: 'fruit' }] },
    { es: '¿Cuánto cuesta un kilo de arroz?', translit: 'KWAN-toh KWEHS-tah oon KEE-loh deh ah-RROS', en: 'How much does a kilo of rice cost?', words: [{ id: 'u11-kilo', es: 'kilo', en: 'kilo' }, { id: 'u11-arroz', es: 'arroz', en: 'rice' }, { id: 'u11-costar', es: 'cuesta', en: 'costs' }] },
    { es: 'El pan es barato pero la carne es cara.', translit: 'el pan es bah-RAH-toh PEH-roh lah KAR-neh es KAH-rah', en: 'Bread is cheap but meat is expensive.', words: [{ id: 'u11-pan', es: 'pan', en: 'bread' }, { id: 'u11-barato', es: 'barato', en: 'cheap' }, { id: 'u11-carne', es: 'carne', en: 'meat' }, { id: 'u11-caro', es: 'cara', en: 'expensive' }] },
    { es: 'Aquí está el recibo de la compra.', translit: 'ah-KEE es-TA el reh-SEE-boh deh lah KOM-prah', en: 'Here is the receipt for the purchase.', words: [{ id: 'u11-recibo', es: 'recibo', en: 'receipt' }] },
    { es: 'El colmado vende pan y leche.', translit: 'el kol-MAH-doh VEHN-deh pan ee LEH-cheh', en: 'The corner store sells bread and milk.', words: [{ id: 'u11-colmado', es: 'colmado', en: 'corner store' }, { id: 'u11-pan', es: 'pan', en: 'bread' }] },
    { es: 'Una botella de agua cuesta un dólar.', translit: 'OO-nah boh-TEH-yah deh AH-gwah KWEHS-tah oon DOH-lar', en: 'A bottle of water costs one dollar.', words: [{ id: 'u11-botella', es: 'botella', en: 'bottle' }, { id: 'u11-costar', es: 'cuesta', en: 'costs' }] },
    { es: 'Necesito pagar en la caja.', translit: 'neh-seh-SEE-toh pah-GAR en lah KAH-hah', en: 'I need to pay at the register.', words: [{ id: 'u11-pagar', es: 'pagar', en: 'to pay' }, { id: 'u11-caja', es: 'caja', en: 'cash register' }] },
    { es: 'La carne y el pescado están frescos.', translit: 'lah KAR-neh ee el pes-KAH-doh es-TAN FREHS-kos', en: 'The meat and the fish are fresh.', words: [{ id: 'u11-carne', es: 'carne', en: 'meat' }, { id: 'u11-pescado', es: 'pescado', en: 'fish' }] }
  ],
  dialogue: {
    title: 'En el mercado (At the market)',
    lines: [
      { who: 'Don Pedro', es: '¡Buenas! ¿Qué le doy hoy?', en: 'Hello! What can I get you today?' },
      { who: 'Ana', es: 'Buenas. ¿Cuánto cuesta el kilo de arroz?', en: 'Hello. How much does a kilo of rice cost?' },
      { who: 'Don Pedro', es: 'Dos dólares el kilo. También tengo fruta fresca.', en: 'Two dollars a kilo. I also have fresh fruit.' },
      { who: 'Ana', es: 'Entonces, un kilo de arroz y tres libras de fruta, por favor.', en: 'Then, a kilo of rice and three pounds of fruit, please.' },
      { who: 'Don Pedro', es: 'Muy bien. Son cinco dólares.', en: 'Very well. That is five dollars.' },
      { who: 'Ana', es: '¿Puedo pagar con tarjeta?', en: 'Can I pay by card?' },
      { who: 'Don Pedro', es: 'Sí, claro. Aquí está su recibo.', en: 'Yes, of course. Here is your receipt.' },
      { who: 'Ana', es: 'Gracias. ¡Hasta luego!', en: 'Thank you. See you later!' }
    ],
    questions: [
      { type: 'mc-en', q: '¿Qué compra Ana?', options: ['rice and fruit', 'meat and fish', 'bread and milk', 'water and coffee'], answer: 'rice and fruit' },
      { type: 'mc-en', q: '¿Cuánto cuesta el kilo de arroz?', options: ['two dollars', 'five dollars', 'three dollars', 'one dollar'], answer: 'two dollars' },
      { type: 'mc-en', q: '¿Cuánto paga Ana en total?', options: ['five dollars', 'two dollars', 'eight dollars', 'ten dollars'], answer: 'five dollars' },
      { type: 'mc-en', q: '¿Cómo paga Ana?', options: ['with a card', 'with cash', 'with coins', 'with a check'], answer: 'with a card' }
    ]
  },
  quiz: [
    { type: 'mc-en', q: '¿Qué significa «el mercado»?', options: ['market', 'shop', 'receipt', 'price'], answer: 'market', es: 'el mercado' },
    { type: 'mc-en', q: '¿Qué significa «la fruta»?', options: ['fruit', 'vegetable', 'meat', 'bread'], answer: 'fruit', es: 'la fruta' },
    { type: 'mc-en', q: '¿Qué significa «barato»?', options: ['cheap', 'expensive', 'fresh', 'free'], answer: 'cheap', es: 'barato' },
    { type: 'mc-es', q: 'How do you say to pay?', options: ['pagar', 'comprar', 'costar', 'vender'], answer: 'pagar', es: 'pagar' },
    { type: 'mc-es', q: 'How do you say to buy?', options: ['comprar', 'pagar', 'costar', 'dar'], answer: 'comprar', es: 'comprar' },
    { type: 'mc-en', q: '¿Qué significa «el recibo»?', options: ['receipt', 'discount', 'change', 'bag'], answer: 'receipt', es: 'el recibo' },
    { type: 'mc-en', q: '¿Qué significa «el descuento»?', options: ['discount', 'receipt', 'price', 'sale'], answer: 'discount', es: 'el descuento' },
    { type: 'typing', q: 'Type the word for rice in Spanish.', answer: 'arroz', accepts: ['el arroz'], es: 'arroz' },
    { type: 'typing', q: 'Type the word for bread in Spanish.', answer: 'pan', accepts: ['el pan'], es: 'pan' },
    { type: 'mc-es', q: 'Say a bottle of water.', options: ['una botella de agua', 'un kilo de agua', 'una libra de agua', 'un litro de pan'], answer: 'una botella de agua', es: 'una botella de agua' },
    { type: 'mc-en', q: '¿Qué significa «el cambio»?', options: ['change', 'coin', 'bag', 'sale'], answer: 'change', es: 'el cambio' },
    { type: 'mc-es', q: 'Which word means expensive?', options: ['caro', 'barato', 'fresco', 'rico'], answer: 'caro', es: 'caro' },
    { type: 'mc-en', q: '¿Qué significa «el colmado»?', options: ['corner store', 'market', 'register', 'receipt'], answer: 'corner store', es: 'el colmado' }
  ],
  test: {
    title: 'Unit 11 test — Shopping & money',
    questions: [
      { type: 'mc-en', q: '¿Qué significa «el precio»?', options: ['price', 'receipt', 'change', 'discount'], answer: 'price', es: 'el precio' },
      { type: 'mc-es', q: 'Say a kilo of rice.', options: ['un kilo de arroz', 'una botella de arroz', 'un litro de arroz', 'una libra de pan'], answer: 'un kilo de arroz', es: 'un kilo de arroz' },
      { type: 'mc-en', q: '¿Qué significa «la oferta»?', options: ['sale', 'price', 'receipt', 'market'], answer: 'sale', es: 'la oferta' },
      { type: 'typing', q: 'Type the word for fruit in Spanish.', answer: 'fruta', accepts: ['la fruta'], es: 'fruta' },
      { type: 'mc-es', q: 'Which verb means to cost?', options: ['costar', 'pagar', 'comprar', 'vender'], answer: 'costar', es: 'costar' },
      { type: 'mc-en', q: '¿Qué significa «la caja»?', options: ['cash register', 'bag', 'bottle', 'box of rice'], answer: 'cash register', es: 'la caja' },
      { type: 'mc-en', q: '¿Qué significa «el pescado»?', options: ['fish', 'meat', 'vegetable', 'bread'], answer: 'fish', es: 'el pescado' },
      { type: 'typing', q: 'Type the word for meat in Spanish.', answer: 'carne', accepts: ['la carne'], es: 'carne' },
      { type: 'mc-es', q: 'Which word means cheap?', options: ['barato', 'caro', 'fresco', 'nuevo'], answer: 'barato', es: 'barato' },
      { type: 'mc-en', q: '¿Qué significa «la bolsa»?', options: ['bag', 'bottle', 'coin', 'sale'], answer: 'bag', es: 'la bolsa' },
      { type: 'mc-es', q: 'Ask how much it costs (one item).', options: ['¿cuánto cuesta?', '¿cuánto es?', '¿me da un recibo?', '¿está en oferta?'], answer: '¿cuánto cuesta?', es: '¿cuánto cuesta?' },
      { type: 'mc-en', q: '¿Qué significa «el colmado»?', options: ['corner store', 'market', 'receipt', 'price'], answer: 'corner store', es: 'el colmado' }
    ]
  }
};
