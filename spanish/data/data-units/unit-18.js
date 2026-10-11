// Unit 18 — Cooking & recipes. A2.
export const unit = {
  id: 'u18',
  level: 'A2',
  number: 18,
  title: 'Cooking & recipes',
  titleEs: 'La cocina',
  story: 'You are in a kitchen in Bayamón learning to make mofongo with the abuela of your friend. She gives instructions fast: «Corta, fríe, agrega, prueba». In this unit you learn the tú commands for recipes and the ingredients behind Puerto Rican classics like mofongo, arroz con gandules and tostones.',
  grammar: [
    {
      topic: 'Affirmative tú commands',
      explanation: 'To tell a friend to do something, use the él/ella form of the present tense. For -ar verbs the command ends in -a; for -er and -ir verbs it ends in -e. Some common cooking verbs also change their stem: probar becomes prueba and freír becomes fríe.',
      table: [
        ['Verb', 'Command', 'English'],
        ['cortar', '¡Corta!', 'Cut!'],
        ['mezclar', '¡Mezcla!', 'Mix!'],
        ['picar', '¡Pica!', 'Chop!'],
        ['comer', '¡Come!', 'Eat!'],
        ['agregar', '¡Agrega!', 'Add!'],
        ['probar', '¡Prueba!', 'Taste!'],
        ['freír', '¡Fríe!', 'Fry!']
      ],
      examples: [
        { es: 'Corta la cebolla y pica el ajo.', trans: 'KOR-tah lah seh-BO-yah ee PEE-kah el AH-ho', en: 'Cut the onion and chop the garlic.' },
        { es: 'Prueba la comida antes de servir.', trans: 'PRWEH-bah lah ko-MEE-dah AN-tes deh ser-VEER', en: 'Taste the food before serving.' }
      ]
    },
    {
      topic: 'Irregular tú commands',
      explanation: 'Eight common verbs have short irregular commands. They are worth memorizing because they show up in every kitchen and every conversation: haz, pon, ten, ven, di, sal, ve, sé.',
      table: [
        ['Verb', 'Command', 'English'],
        ['hacer', 'haz', 'do / make'],
        ['poner', 'pon', 'put'],
        ['tener', 'ten', 'have'],
        ['venir', 'ven', 'come'],
        ['decir', 'di', 'say'],
        ['salir', 'sal', 'leave / go out'],
        ['ir', 've', 'go'],
        ['ser', 'sé', 'be']
      ],
      examples: [
        { es: 'Pon la olla en la estufa y ten cuidado.', trans: 'pon lah O-yah en lah es-TOO-fah ee ten kwee-DAH-do', en: 'Put the pot on the stove and be careful.' },
        { es: 'Ven a la cocina y haz la salsa.', trans: 'ben ah lah ko-KEE-nah ee as lah SAL-sah', en: 'Come to the kitchen and make the sauce.' }
      ]
    },
    {
      topic: 'Recipe quantities',
      explanation: 'Recipes use un poco de (a little) and de after measures like una taza (a cup) or dos cucharadas (two tablespoons). The food itself stays the same word: una taza de arroz, un poco de sal.',
      table: [
        ['Spanish', 'English'],
        ['un poco de sal', 'a little salt'],
        ['dos cucharadas de aceite', 'two tablespoons of oil'],
        ['una taza de arroz', 'a cup of rice'],
        ['un diente de ajo', 'a clove of garlic']
      ],
      examples: [
        { es: 'Agrega un poco de sal y dos cucharadas de aceite.', trans: 'ah-GREH-gah oon PO-ko deh sal ee dos koo-chah-RAH-das deh ah-SAY-teh', en: 'Add a little salt and two tablespoons of oil.' },
        { es: 'Necesitas una taza de arroz y un diente de ajo.', trans: 'neh-seh-SEE-tas OO-nah TAH-sah deh ah-ROS ee oon DYEN-teh deh AH-ho', en: 'You need a cup of rice and a clove of garlic.' }
      ]
    },
    {
      topic: 'Puerto Rican favourites',
      explanation: 'Puerto Rico has famous dishes you can now describe in Spanish. Mofongo is fried green plantain mashed with garlic and pork. Arroz con gandules is rice with pigeon peas, the classic holiday dish. Tostones are twice-fried plantain slices.',
      table: [
        ['Dish', 'What it is'],
        ['mofongo', 'mashed fried plantain with garlic'],
        ['arroz con gandules', 'rice with pigeon peas'],
        ['tostones', 'twice-fried green plantain slices'],
        ['pollo guisado', 'stewed chicken']
      ],
      examples: [
        { es: 'El mofongo lleva ajo y plátano.', trans: 'el mo-FON-go YEH-bah AH-ho ee PLAH-tah-no', en: 'Mofongo has garlic and plantain.' },
        { es: 'El arroz con gandules es mi plato favorito.', trans: 'el ah-ROS kon gan-DOO-les es mee PLAH-to fah-bo-REE-to', en: 'Rice with pigeon peas is my favourite dish.' }
      ]
    }
  ],
  vocabulary: [
    { id: 'u18-cocina', es: 'cocina', translit: 'ko-KEE-nah', en: 'kitchen / cooking', pos: 'noun', gender: 'f' },
    { id: 'u18-cocinar', es: 'cocinar', translit: 'ko-see-NAR', en: 'to cook', pos: 'verb' },
    { id: 'u18-receta', es: 'receta', translit: 'reh-SEH-tah', en: 'recipe', pos: 'noun', gender: 'f' },
    { id: 'u18-ingrediente', es: 'ingrediente', translit: 'een-greh-DYEN-teh', en: 'ingredient', pos: 'noun', gender: 'm' },
    { id: 'u18-mofongo', es: 'mofongo', translit: 'mo-FON-go', en: 'mofongo', pos: 'noun', gender: 'm' },
    { id: 'u18-arrozcongandules', es: 'arroz con gandules', translit: 'ah-ROS kon gan-DOO-les', en: 'rice with pigeon peas', pos: 'noun', gender: 'm' },
    { id: 'u18-tostones', es: 'tostones', translit: 'tos-TO-nes', en: 'fried plantain slices', pos: 'noun', gender: 'p' },
    { id: 'u18-platano', es: 'plátano', translit: 'PLAH-tah-no', en: 'plantain / banana', pos: 'noun', gender: 'm' },
    { id: 'u18-ajo', es: 'ajo', translit: 'AH-ho', en: 'garlic', pos: 'noun', gender: 'm' },
    { id: 'u18-cebolla', es: 'cebolla', translit: 'seh-BO-yah', en: 'onion', pos: 'noun', gender: 'f' },
    { id: 'u18-pollo', es: 'pollo', translit: 'PO-yo', en: 'chicken', pos: 'noun', gender: 'm' },
    { id: 'u18-sarten', es: 'sartén', translit: 'sar-TEN', en: 'frying pan', pos: 'noun', gender: 'm' },
    { id: 'u18-olla', es: 'olla', translit: 'O-yah', en: 'pot', pos: 'noun', gender: 'f' },
    { id: 'u18-sal', es: 'sal', translit: 'sal', en: 'salt', pos: 'noun', gender: 'f' },
    { id: 'u18-aceite', es: 'aceite', translit: 'ah-SAY-teh', en: 'oil', pos: 'noun', gender: 'm' },
    { id: 'u18-mezclar', es: 'mezclar', translit: 'mes-KLAR', en: 'to mix', pos: 'verb' },
    { id: 'u18-cortar', es: 'cortar', translit: 'kor-TAR', en: 'to cut', pos: 'verb' },
    { id: 'u18-freir', es: 'freír', translit: 'freh-EER', en: 'to fry', pos: 'verb' },
    { id: 'u18-agregar', es: 'agregar', translit: 'ah-greh-GAR', en: 'to add', pos: 'verb' },
    { id: 'u18-probar', es: 'probar', translit: 'pro-BAR', en: 'to taste / to try', pos: 'verb' },
    { id: 'u18-picar', es: 'picar', translit: 'pee-KAR', en: 'to chop', pos: 'verb' },
    { id: 'u18-servir', es: 'servir', translit: 'ser-VEER', en: 'to serve', pos: 'verb' },
    { id: 'u18-comida', es: 'comida', translit: 'ko-MEE-dah', en: 'food / meal', pos: 'noun', gender: 'f' },
    { id: 'u18-cucharada', es: 'cucharada', translit: 'koo-chah-RAH-dah', en: 'tablespoon', pos: 'noun', gender: 'f' },
    { id: 'u18-caliente', es: 'caliente', translit: 'kah-LYEN-teh', en: 'hot', pos: 'adjective' }
  ],
  phrases: [
    { id: 'p-u18-1', es: '¡Buen provecho!', trans: 'bwen pro-BEH-cho', en: 'Enjoy your meal!' },
    { id: 'p-u18-2', es: '¿Qué lleva esta receta?', trans: 'keh YEH-bah ES-tah reh-SEH-tah', en: 'What is in this recipe?' },
    { id: 'p-u18-3', es: 'Está delicioso.', trans: 'es-TA deh-lee-SYO-so', en: 'It is delicious.' }
  ],
  sentences: [
    { es: 'Corta el plátano en trozos pequeños.', translit: 'KOR-tah el PLAH-tah-no en TRO-sos peh-KEH-nyos', en: 'Cut the plantain into small pieces.', words: [{ id: 'u18-cortar', es: 'Corta', en: 'Cut' }, { id: 'u18-platano', es: 'plátano', en: 'plantain' }] },
    { es: 'Fríe los tostones en aceite caliente.', translit: 'FREH-eh los tos-TO-nes en ah-SAY-teh kah-LYEN-teh', en: 'Fry the tostones in hot oil.', words: [{ id: 'u18-freir', es: 'Fríe', en: 'Fry' }, { id: 'u18-tostones', es: 'tostones', en: 'tostones' }, { id: 'u18-aceite', es: 'aceite', en: 'oil' }, { id: 'u18-caliente', es: 'caliente', en: 'hot' }] },
    { es: 'Agrega sal y ajo al mofongo.', translit: 'ah-GREH-gah sal ee AH-ho al mo-FON-go', en: 'Add salt and garlic to the mofongo.', words: [{ id: 'u18-agregar', es: 'Agrega', en: 'Add' }, { id: 'u18-sal', es: 'sal', en: 'salt' }, { id: 'u18-ajo', es: 'ajo', en: 'garlic' }, { id: 'u18-mofongo', es: 'mofongo', en: 'mofongo' }] },
    { es: 'Mezcla el arroz con gandules en la olla.', translit: 'MES-klah el ah-ROS kon gan-DOO-les en lah O-yah', en: 'Mix the rice with pigeon peas in the pot.', words: [{ id: 'u18-mezclar', es: 'Mezcla', en: 'Mix' }, { id: 'u18-arrozcongandules', es: 'arroz con gandules', en: 'rice with pigeon peas' }, { id: 'u18-olla', es: 'olla', en: 'pot' }] },
    { es: 'Prueba la comida antes de servir.', translit: 'PRWEH-bah lah ko-MEE-dah AN-tes deh ser-VEER', en: 'Taste the food before serving.', words: [{ id: 'u18-probar', es: 'Prueba', en: 'Taste' }, { id: 'u18-comida', es: 'comida', en: 'food' }, { id: 'u18-servir', es: 'servir', en: 'serving' }] },
    { es: 'Pica la cebolla y cocina el pollo.', translit: 'PEE-kah lah seh-BO-yah ee ko-KEE-nah el PO-yo', en: 'Chop the onion and cook the chicken.', words: [{ id: 'u18-picar', es: 'Pica', en: 'Chop' }, { id: 'u18-cebolla', es: 'cebolla', en: 'onion' }, { id: 'u18-cocinar', es: 'cocina', en: 'cook' }, { id: 'u18-pollo', es: 'pollo', en: 'chicken' }] }
  ],
  dialogue: {
    title: 'Haciendo mofongo (Making mofongo)',
    lines: [
      { who: 'Abuela', es: 'Primero, corta los plátanos en trozos grandes.', en: 'First, cut the plantains into big pieces.' },
      { who: 'Tomás', es: '¿Y después? ¿Los frío?', en: 'And then? Do I fry them?' },
      { who: 'Abuela', es: 'Sí, fríelos en aceite caliente. Luego agrega ajo.', en: 'Yes, fry them in hot oil. Then add garlic.' },
      { who: 'Tomás', es: '¿Cuánto ajo necesito?', en: 'How much garlic do I need?' },
      { who: 'Abuela', es: 'Un diente de ajo y un poco de sal. Prueba el mofongo.', en: 'One clove of garlic and a little salt. Taste the mofongo.' },
      { who: 'Tomás', es: '¡Mmm! Está delicioso.', en: 'Mmm! It is delicious.' }
    ],
    questions: [
      { type: 'mc-en', q: '¿Qué corta Tomás primero?', options: ['los plátanos', 'las cebollas', 'el pollo', 'el arroz'], answer: 'los plátanos' },
      { type: 'mc-en', q: '¿Qué agrega después de freír?', options: ['ajo', 'sal', 'aceite', 'pollo'], answer: 'ajo' },
      { type: 'mc-en', q: '¿Cómo está el mofongo?', options: ['delicioso', 'salado', 'frío', 'malo'], answer: 'delicioso' }
    ]
  },
  quiz: [
    { type: 'mc-en', q: '¿Qué significa «cocina»?', options: ['kitchen', 'recipe', 'ingredient', 'garlic'], answer: 'kitchen', es: 'cocina' },
    { type: 'mc-en', q: '¿Qué significa «ajo»?', options: ['garlic', 'onion', 'salt', 'oil'], answer: 'garlic', es: 'ajo' },
    { type: 'mc-es', q: 'How do you say to cook?', options: ['cocinar', 'cortar', 'freír', 'servir'], answer: 'cocinar', es: 'cocinar' },
    { type: 'mc-es', q: 'Which word means onion?', options: ['cebolla', 'ajo', 'sal', 'pollo'], answer: 'cebolla', es: 'cebolla' },
    { type: 'mc-en', q: '¿Qué significa «olla»?', options: ['pot', 'pan', 'plate', 'cup'], answer: 'pot', es: 'olla' },
    { type: 'mc-en', q: '¿Qué significa «tostones»?', options: ['fried plantain slices', 'rice with peas', 'mashed plantain', 'stewed chicken'], answer: 'fried plantain slices', es: 'tostones' },
    { type: 'typing', q: 'Type salt in Spanish', answer: 'sal', accepts: [], es: 'sal' },
    { type: 'typing', q: 'Type oil in Spanish', answer: 'aceite', accepts: [], es: 'aceite' },
    { type: 'mc-es', q: 'Give the tú command of cortar.', options: ['Corta', 'Corte', 'Corto', 'Cortar'], answer: 'Corta', es: 'Corta' },
    { type: 'mc-en', q: '¿Qué significa «arroz con gandules»?', options: ['rice with pigeon peas', 'fried plantains', 'garlic chicken', 'mashed plantain'], answer: 'rice with pigeon peas', es: 'arroz con gandules' },
    { type: 'mc-es', q: 'Which word means frying pan?', options: ['sartén', 'olla', 'cuchara', 'plato'], answer: 'sartén', es: 'sartén' },
    { type: 'mc-en', q: '¿Qué significa «prueba»?', options: ['taste', 'cut', 'mix', 'serve'], answer: 'taste', es: 'prueba' }
  ],
  test: {
    title: 'Unit 18 test — Cooking and recipes',
    questions: [
      { type: 'mc-en', q: '¿Qué significa «receta»?', options: ['recipe', 'kitchen', 'ingredient', 'food'], answer: 'recipe', es: 'receta' },
      { type: 'mc-es', q: 'Say to fry.', options: ['freír', 'hervir', 'cortar', 'mezclar'], answer: 'freír', es: 'freír' },
      { type: 'typing', q: 'Type garlic in Spanish', answer: 'ajo', accepts: [], es: 'ajo' },
      { type: 'typing', q: 'Type chicken in Spanish', answer: 'pollo', accepts: [], es: 'pollo' },
      { type: 'mc-en', q: '¿Qué significa «ingrediente»?', options: ['ingredient', 'recipe', 'kitchen', 'salt'], answer: 'ingredient', es: 'ingrediente' },
      { type: 'mc-es', q: 'Which word means to mix?', options: ['mezclar', 'picar', 'probar', 'servir'], answer: 'mezclar', es: 'mezclar' },
      { type: 'mc-es', q: 'Which is a Puerto Rican dish?', options: ['mofongo', 'pizza', 'tacos', 'paella'], answer: 'mofongo', es: 'mofongo' },
      { type: 'mc-en', q: '¿Qué significa «caliente»?', options: ['hot', 'cold', 'sweet', 'salty'], answer: 'hot', es: 'caliente' },
      { type: 'mc-es', q: 'Give the tú command of agregar.', options: ['Agrega', 'Agregue', 'Agrego', 'Agregar'], answer: 'Agrega', es: 'Agrega' },
      { type: 'mc-en', q: '¿Qué significa «cucharada»?', options: ['tablespoon', 'teaspoon', 'cup', 'plate'], answer: 'tablespoon', es: 'cucharada' },
      { type: 'typing', q: 'Type plantain in Spanish', answer: 'platano', accepts: ['plátano'], es: 'plátano' },
      { type: 'mc-es', q: 'Say the food is tasty.', options: ['La comida está rica', 'La comida es rica', 'La comida tiene rica', 'La comida hay rica'], answer: 'La comida está rica', es: 'La comida está rica' }
    ]
  }
};
