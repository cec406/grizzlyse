// Unit 12 — Clothes & colors. A2.
export const unit = {
  id: 'u12',
  level: 'A2',
  number: 12,
  title: 'Clothes & colors',
  titleEs: 'Ropa y colores',
  story: 'You are in a shop in Old San Juan and a bright blue shirt catches your eye. This unit gives you the clothes, the colors, and the little pointing words this and that. You will also learn to ask your size and to check how something fits before you buy it.',
  grammar: [
    {
      topic: 'Colors agree with the noun',
      explanation: 'Colors work like other adjectives: add -a for feminine nouns and -s for plurals. Azul and verde do not change for gender, only for number.',
      table: [
        ['Color', 'masculine', 'feminine'],
        ['red', 'rojo', 'roja'],
        ['black', 'negro', 'negra'],
        ['white', 'blanco', 'blanca'],
        ['blue', 'azul', 'azul'],
        ['green', 'verde', 'verde']
      ],
      examples: [
        { es: 'La camisa es blanca.', trans: 'lah kah-MEE-sah es BLAHN-kah', en: 'The shirt is white. (f)' },
        { es: 'Los zapatos son negros.', trans: 'los sah-PAH-tos son NEH-gros', en: 'The shoes are black. (m, plural)' }
      ]
    },
    {
      topic: 'este, ese, aquel — this and that',
      explanation: 'este points to something near you, ese to something near the person you are talking to, and aquel to something far away. They match the noun: este sombrero, esta camisa, estos zapatos, estas faldas.',
      table: [
        ['Spanish', 'English', 'Distance'],
        ['este / esta', 'this / this', 'close to me'],
        ['ese / esa', 'that / that', 'close to you'],
        ['aquel / aquella', 'that (over there)', 'far away'],
        ['estos / estas', 'these', 'plural, close']
      ],
      examples: [
        { es: 'Me gusta esta camiseta.', trans: 'meh GOOS-tah ES-tah kah-mee-SEH-tah', en: 'I like this t-shirt.' },
        { es: 'Aquel vestido rojo es bonito.', trans: 'ah-KEL vehs-TEE-doh ROH-hoh es boh-NEE-toh', en: 'That red dress over there is pretty.' }
      ]
    },
    {
      topic: 'Trying clothes on',
      explanation: 'Use probarse (to try on) and quedar (to fit) to shop for clothes. ¿Qué talla usa? asks the size. Me queda bien means it fits me well; me queda grande means it is too big for me.',
      table: [
        ['Spanish', 'English'],
        ['¿Qué talla usa?', 'What size do you wear?'],
        ['Me queda bien.', 'It fits me well.'],
        ['Me queda grande.', 'It is too big for me.'],
        ['¿Puedo probármelo?', 'Can I try it on?']
      ],
      examples: [
        { es: '¿Puedo probarme estos pantalones?', trans: 'PWEH-doh proh-BAR-meh ES-tos pahn-tah-LOH-nes', en: 'Can I try on these pants?' },
        { es: 'Esta falda me queda bien.', trans: 'ES-tah FAL-dah meh KEH-dah byen', en: 'This skirt fits me well.' }
      ]
    }
  ],
  vocabulary: [
    { id: 'u12-camisa', es: 'la camisa', translit: 'lah kah-MEE-sah', en: 'shirt', pos: 'noun', gender: 'f' },
    { id: 'u12-camiseta', es: 'la camiseta', translit: 'lah kah-mee-SEH-tah', en: 't-shirt', pos: 'noun', gender: 'f' },
    { id: 'u12-pantalones', es: 'los pantalones', translit: 'los pahn-tah-LOH-nes', en: 'pants', pos: 'noun', gender: 'p' },
    { id: 'u12-falda', es: 'la falda', translit: 'lah FAL-dah', en: 'skirt', pos: 'noun', gender: 'f' },
    { id: 'u12-vestido', es: 'el vestido', translit: 'el vehs-TEE-doh', en: 'dress', pos: 'noun', gender: 'm' },
    { id: 'u12-zapatos', es: 'los zapatos', translit: 'los sah-PAH-tos', en: 'shoes', pos: 'noun', gender: 'p' },
    { id: 'u12-tenis', es: 'los tenis', translit: 'los TEH-nees', en: 'sneakers', pos: 'noun', gender: 'p' },
    { id: 'u12-sombrero', es: 'el sombrero', translit: 'el som-BREH-roh', en: 'hat', pos: 'noun', gender: 'm' },
    { id: 'u12-chaqueta', es: 'la chaqueta', translit: 'lah chah-KEH-tah', en: 'jacket', pos: 'noun', gender: 'f' },
    { id: 'u12-traje', es: 'el traje de baño', translit: 'el TRAH-heh deh BAH-nyoh', en: 'swimsuit', pos: 'noun', gender: 'm' },
    { id: 'u12-talla', es: 'la talla', translit: 'lah TAH-yah', en: 'size', pos: 'noun', gender: 'f' },
    { id: 'u12-color', es: 'el color', translit: 'el koh-LOR', en: 'color', pos: 'noun', gender: 'm' },
    { id: 'u12-rojo', es: 'rojo', translit: 'ROH-hoh', en: 'red', pos: 'adjective' },
    { id: 'u12-azul', es: 'azul', translit: 'ah-SOOL', en: 'blue', pos: 'adjective' },
    { id: 'u12-verde', es: 'verde', translit: 'VEHR-deh', en: 'green', pos: 'adjective' },
    { id: 'u12-negro', es: 'negro', translit: 'NEH-groh', en: 'black', pos: 'adjective' },
    { id: 'u12-blanco', es: 'blanco', translit: 'BLAHN-koh', en: 'white', pos: 'adjective' },
    { id: 'u12-amarillo', es: 'amarillo', translit: 'ah-mah-REE-yoh', en: 'yellow', pos: 'adjective' },
    { id: 'u12-rosado', es: 'rosado', translit: 'roh-SAH-doh', en: 'pink', pos: 'adjective' },
    { id: 'u12-este', es: 'este', translit: 'ES-teh', en: 'this (m)', pos: 'adjective' },
    { id: 'u12-ese', es: 'ese', translit: 'EH-seh', en: 'that (m)', pos: 'adjective' },
    { id: 'u12-aquel', es: 'aquel', translit: 'ah-KEL', en: 'that (over there)', pos: 'adjective' },
    { id: 'u12-probarse', es: 'probarse', translit: 'proh-BAR-seh', en: 'to try on', pos: 'verb' },
    { id: 'u12-quedar', es: 'quedar', translit: 'keh-DAR', en: 'to fit', pos: 'verb' }
  ],
  phrases: [
    { id: 'p-u12-1', es: '¿Qué talla usa?', trans: 'keh TAH-yah OO-sah', en: 'What size do you wear?' },
    { id: 'p-u12-2', es: 'Me queda bien.', trans: 'meh KEH-dah byen', en: 'It fits me well.' },
    { id: 'p-u12-3', es: 'Me la llevo.', trans: 'meh lah YEH-voh', en: 'I will take it.' },
    { id: 'p-u12-4', es: '¿En qué color lo tiene?', trans: 'en keh koh-LOR loh TYEH-neh', en: 'What color do you have it in?' }
  ],
  sentences: [
    { es: 'Me gusta esta camisa roja.', translit: 'meh GOOS-tah ES-tah kah-MEE-sah ROH-hah', en: 'I like this red shirt.', words: [{ id: 'u12-camisa', es: 'camisa', en: 'shirt' }, { id: 'u12-rojo', es: 'roja', en: 'red' }] },
    { es: 'Esos zapatos son negros.', translit: 'EH-sos sah-PAH-tos son NEH-gros', en: 'Those shoes are black.', words: [{ id: 'u12-zapatos', es: 'zapatos', en: 'shoes' }, { id: 'u12-negro', es: 'negros', en: 'black' }] },
    { es: 'Aquel vestido azul es bonito.', translit: 'ah-KEL vehs-TEE-doh ah-SOOL es boh-NEE-toh', en: 'That blue dress over there is pretty.', words: [{ id: 'u12-vestido', es: 'vestido', en: 'dress' }, { id: 'u12-azul', es: 'azul', en: 'blue' }] },
    { es: '¿Tiene una camiseta blanca en talla grande?', translit: 'TYEH-neh OO-nah kah-mee-SEH-tah BLAHN-kah en TAH-yah GRAHN-deh', en: 'Do you have a white t-shirt in a large size?', words: [{ id: 'u12-camiseta', es: 'camiseta', en: 't-shirt' }, { id: 'u12-blanco', es: 'blanca', en: 'white' }, { id: 'u12-talla', es: 'talla', en: 'size' }] },
    { es: 'Quiero probarme estos pantalones.', translit: 'KYEH-roh proh-BAR-meh ES-tos pahn-tah-LOH-nes', en: 'I want to try on these pants.', words: [{ id: 'u12-probarse', es: 'probar', en: 'to try' }, { id: 'u12-pantalones', es: 'pantalones', en: 'pants' }] },
    { es: 'Me queda bien la chaqueta verde.', translit: 'meh KEH-dah byen lah chah-KEH-tah VEHR-deh', en: 'The green jacket fits me well.', words: [{ id: 'u12-quedar', es: 'queda', en: 'fits' }, { id: 'u12-chaqueta', es: 'chaqueta', en: 'jacket' }, { id: 'u12-verde', es: 'verde', en: 'green' }] },
    { es: 'El sombrero es amarillo.', translit: 'el som-BREH-roh es ah-mah-REE-yoh', en: 'The hat is yellow.', words: [{ id: 'u12-sombrero', es: 'sombrero', en: 'hat' }, { id: 'u12-amarillo', es: 'amarillo', en: 'yellow' }] },
    { es: 'Ese traje de baño es rosado.', translit: 'EH-seh TRAH-heh deh BAH-nyoh es roh-SAH-doh', en: 'That swimsuit is pink.', words: [{ id: 'u12-traje', es: 'traje de baño', en: 'swimsuit' }, { id: 'u12-rosado', es: 'rosado', en: 'pink' }] }
  ],
  dialogue: {
    title: 'En la tienda de ropa (At the clothing store)',
    lines: [
      { who: 'Vendedora', es: 'Buenas tardes. ¿En qué le puedo ayudar?', en: 'Good afternoon. How can I help you?' },
      { who: 'Ana', es: 'Busco una camisa azul.', en: 'I am looking for a blue shirt.' },
      { who: 'Vendedora', es: '¿Qué talla usa?', en: 'What size do you wear?' },
      { who: 'Ana', es: 'Talla mediana. ¿Puedo probármela?', en: 'Medium. Can I try it on?' },
      { who: 'Vendedora', es: 'Claro. El probador está allí.', en: 'Of course. The fitting room is over there.' },
      { who: 'Ana', es: 'Me queda un poco grande. ¿Tiene una talla pequeña?', en: 'It is a little big for me. Do you have a small size?' },
      { who: 'Vendedora', es: 'Sí, aquí tiene. Es azul también.', en: 'Yes, here you go. It is blue too.' },
      { who: 'Ana', es: 'Perfecto. Me la llevo.', en: 'Perfect. I will take it.' }
    ],
    questions: [
      { type: 'mc-en', q: '¿Qué color de camisa busca Ana?', options: ['blue', 'red', 'green', 'black'], answer: 'blue' },
      { type: 'mc-en', q: '¿Qué talla usa Ana?', options: ['medium', 'small', 'large', 'extra large'], answer: 'medium' },
      { type: 'mc-en', q: '¿Por qué pide otra talla?', options: ['the first one is too big', 'the first one is too small', 'it is too expensive', 'it is the wrong color'], answer: 'the first one is too big' },
      { type: 'mc-en', q: '¿Dónde se prueba la camisa?', options: ['in the fitting room', 'at home', 'in the car', 'at the market'], answer: 'in the fitting room' }
    ]
  },
  quiz: [
    { type: 'mc-en', q: '¿Qué significa «la camisa»?', options: ['shirt', 'skirt', 'dress', 'jacket'], answer: 'shirt', es: 'la camisa' },
    { type: 'mc-en', q: '¿Qué significa «los zapatos»?', options: ['shoes', 'sneakers', 'pants', 'hat'], answer: 'shoes', es: 'los zapatos' },
    { type: 'mc-en', q: '¿Qué significa «azul»?', options: ['blue', 'green', 'red', 'black'], answer: 'blue', es: 'azul' },
    { type: 'mc-es', q: 'How do you say red?', options: ['rojo', 'azul', 'verde', 'negro'], answer: 'rojo', es: 'rojo' },
    { type: 'mc-es', q: 'How do you say the skirt?', options: ['la falda', 'la camisa', 'la chaqueta', 'la talla'], answer: 'la falda', es: 'la falda' },
    { type: 'mc-en', q: '¿Qué significa «el sombrero»?', options: ['hat', 'shirt', 'shoes', 'color'], answer: 'hat', es: 'el sombrero' },
    { type: 'mc-en', q: '¿Qué significa «blanco»?', options: ['white', 'black', 'yellow', 'pink'], answer: 'white', es: 'blanco' },
    { type: 'typing', q: 'Type the word for dress in Spanish (with the article).', answer: 'el vestido', accepts: ['vestido'], es: 'el vestido' },
    { type: 'typing', q: 'Type the word for green in Spanish.', answer: 'verde', accepts: [], es: 'verde' },
    { type: 'mc-es', q: 'Say this t-shirt.', options: ['esta camiseta', 'ese sombrero', 'aquel vestido', 'estos zapatos'], answer: 'esta camiseta', es: 'esta camiseta' },
    { type: 'mc-en', q: '¿Qué significa «la chaqueta»?', options: ['jacket', 'skirt', 'shirt', 'pants'], answer: 'jacket', es: 'la chaqueta' },
    { type: 'mc-es', q: 'Which word means pink?', options: ['rosado', 'amarillo', 'negro', 'blanco'], answer: 'rosado', es: 'rosado' },
    { type: 'mc-en', q: '¿Qué significa «la talla»?', options: ['size', 'color', 'shop', 'dress'], answer: 'size', es: 'la talla' }
  ],
  test: {
    title: 'Unit 12 test — Clothes & colors',
    questions: [
      { type: 'mc-en', q: '¿Qué significa «los pantalones»?', options: ['pants', 'shoes', 'sneakers', 'jacket'], answer: 'pants', es: 'los pantalones' },
      { type: 'mc-es', q: 'Say the yellow hat.', options: ['el sombrero amarillo', 'la camisa amarilla', 'el vestido rojo', 'los zapatos negros'], answer: 'el sombrero amarillo', es: 'el sombrero amarillo' },
      { type: 'mc-en', q: '¿Qué significa «este»?', options: ['this', 'that', 'these', 'those'], answer: 'this', es: 'este' },
      { type: 'typing', q: 'Type the word for black in Spanish.', answer: 'negro', accepts: [], es: 'negro' },
      { type: 'mc-es', q: 'Which word means sneakers?', options: ['los tenis', 'los zapatos', 'las faldas', 'las camisas'], answer: 'los tenis', es: 'los tenis' },
      { type: 'mc-en', q: '¿Qué significa «probarse»?', options: ['to try on', 'to buy', 'to pay', 'to wear'], answer: 'to try on', es: 'probarse' },
      { type: 'mc-en', q: '¿Qué significa «aquel»?', options: ['that (over there)', 'this', 'here', 'blue'], answer: 'that (over there)', es: 'aquel' },
      { type: 'typing', q: 'Type the word for color in Spanish (with the article).', answer: 'el color', accepts: ['color'], es: 'el color' },
      { type: 'mc-es', q: 'Say this shirt fits me well.', options: ['esta camisa me queda bien', 'esta camisa es muy cara', 'aquel vestido es azul', 'los zapatos son negros'], answer: 'esta camisa me queda bien', es: 'me queda bien' },
      { type: 'mc-en', q: '¿Qué significa «el traje de baño»?', options: ['swimsuit', 'jacket', 't-shirt', 'hat'], answer: 'swimsuit', es: 'el traje de baño' },
      { type: 'mc-es', q: 'Which word means white?', options: ['blanco', 'negro', 'rojo', 'verde'], answer: 'blanco', es: 'blanco' },
      { type: 'mc-en', q: '¿Qué significa «quedar»?', options: ['to fit', 'to try on', 'to look for', 'to carry'], answer: 'to fit', es: 'quedar' }
    ]
  }
};
