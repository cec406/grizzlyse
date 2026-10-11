// Unit 40 — Idioms & colloquial fluency. B2.
export const unit = {
  id: 'u40',
  level: 'B2',
  number: 40,
  title: 'Idioms & colloquial fluency',
  titleEs: 'Modismos y lenguaje coloquial',
  story: 'At a cafetín in Loíza your friend says «¿Qué es la que hay?» and you freeze. Idioms are the last wall before real fluency, because they mean more than their words. In this unit you collect the most common expressions and refranes of Puerto Rico and Latin America, so you can laugh, complain and celebrate like a local.',
  grammar: [
    {
      topic: 'Idioms with tener',
      explanation: 'Many everyday states use tener + noun, not ser or estar: tener hambre (to be hungry), tener sueño (to be sleepy), tener prisa (to be in a hurry), tener razón (to be right), tener ganas de (to feel like).',
      table: [
        ['Spanish', 'Literal', 'English'],
        ['tener hambre', 'to have hunger', 'to be hungry'],
        ['tener sueño', 'to have sleep', 'to be sleepy'],
        ['tener prisa', 'to have hurry', 'to be in a hurry'],
        ['tener razón', 'to have reason', 'to be right'],
        ['tener ganas de', 'to have desires of', 'to feel like']
      ],
      examples: [
        { es: 'Tengo hambre; vamos a comer algo.', trans: 'TEN-go AM-breh BAH-mos ah ko-MER AL-go', en: 'I am hungry; let us eat something.' },
        { es: 'Tienes razón, este café está brutal.', trans: 'TYEH-nes rah-SON ES-teh kah-FEH es-TA broo-TAL', en: 'You are right, this coffee is awesome.' }
      ]
    },
    {
      topic: 'Everyday expressions with estar, echar and meter',
      explanation: 'These expressions are fixed: estar en las nubes means to daydream, echar una mano means to lend a hand, meter la pata means to put your foot in it, and costar un ojo de la cara means to cost an arm and a leg.',
      table: [
        ['Expression', 'English'],
        ['estar en las nubes', 'to daydream'],
        ['echar una mano', 'to lend a hand'],
        ['meter la pata', 'to put your foot in it'],
        ['costar un ojo de la cara', 'to cost an arm and a leg'],
        ['ser pan comido', 'to be a piece of cake']
      ],
      examples: [
        { es: 'Estaba en las nubes y no escuché nada.', trans: 'es-TAH-bah en las NOO-bes ee no es-koo-CHE NAH-dah', en: 'I was daydreaming and did not hear anything.' },
        { es: '¿Me echas una mano con las maletas?', trans: 'meh EH-chas OO-nah MAH-no kon las mah-LEH-tas', en: 'Can you lend me a hand with the suitcases?' }
      ]
    },
    {
      topic: 'Refranes and Puerto Rican flavour',
      explanation: 'Refranes are short proverbs that everyone knows. In Puerto Rico you will also hear chévere (cool), brutal (awesome), and the greeting ¿Qué es la que hay? (What is up?). Use them with friends, not in a formal report.',
      table: [
        ['Refrán', 'English'],
        ['Más vale tarde que nunca.', 'Better late than never.'],
        ['No hay mal que por bien no venga.', 'Every cloud has a silver lining.'],
        ['A caballo regalado no se le miran los dientes.', 'Do not look a gift horse in the mouth.'],
        ['Ojos que no ven, corazón que no siente.', 'Out of sight, out of mind.']
      ],
      examples: [
        { es: 'Más vale tarde que nunca, dice el refrán.', trans: 'mas BAH-leh TAR-deh keh NOON-kah DEE-seh el reh-FRAN', en: 'Better late than never, says the proverb.' },
        { es: '¡Qué chévere! Entonces me quedo.', trans: 'keh CHEH-veh-reh en-TON-ses meh KEH-do', en: 'How cool! Then I will stay.' }
      ]
    }
  ],
  vocabulary: [
    { id: 'u40-modismo', es: 'modismo', translit: 'mo-DEES-mo', en: 'idiom', pos: 'noun', gender: 'm' },
    { id: 'u40-expresion', es: 'expresión', translit: 'eks-pre-SYON', en: 'expression', pos: 'noun', gender: 'f' },
    { id: 'u40-refran', es: 'refrán', translit: 'reh-FRAN', en: 'proverb', pos: 'noun', gender: 'm' },
    { id: 'u40-dicho', es: 'dicho', translit: 'DEE-cho', en: 'saying', pos: 'noun', gender: 'm' },
    { id: 'u40-gracia', es: 'gracia', translit: 'GRAH-syah', en: 'humour / grace', pos: 'noun', gender: 'f' },
    { id: 'u40-ganas', es: 'ganas', translit: 'GAH-nas', en: 'desire / urge', pos: 'noun', gender: 'p' },
    { id: 'u40-pilas', es: 'pilas', translit: 'PEE-las', en: 'batteries / energy', pos: 'noun', gender: 'p' },
    { id: 'u40-prisa', es: 'prisa', translit: 'PREE-sah', en: 'hurry', pos: 'noun', gender: 'f' },
    { id: 'u40-razon', es: 'razón', translit: 'rah-SON', en: 'reason / being right', pos: 'noun', gender: 'f' },
    { id: 'u40-hambre', es: 'hambre', translit: 'AM-breh', en: 'hunger', pos: 'noun', gender: 'f' },
    { id: 'u40-sueno', es: 'sueño', translit: 'SWEH-nyo', en: 'sleep / dream', pos: 'noun', gender: 'm' },
    { id: 'u40-ojo', es: 'ojo', translit: 'OH-ho', en: 'eye', pos: 'noun', gender: 'm' },
    { id: 'u40-mano', es: 'mano', translit: 'MAH-no', en: 'hand', pos: 'noun', gender: 'f' },
    { id: 'u40-cara', es: 'cara', translit: 'KAH-rah', en: 'face', pos: 'noun', gender: 'f' },
    { id: 'u40-nube', es: 'nube', translit: 'NOO-beh', en: 'cloud', pos: 'noun', gender: 'f' },
    { id: 'u40-pata', es: 'pata', translit: 'PAH-tah', en: 'leg / paw', pos: 'noun', gender: 'f' },
    { id: 'u40-codo', es: 'codo', translit: 'KO-do', en: 'elbow', pos: 'noun', gender: 'm' },
    { id: 'u40-coloquial', es: 'coloquial', translit: 'ko-lo-KYAL', en: 'colloquial', pos: 'adjective' },
    { id: 'u40-chevere', es: 'chévere', translit: 'CHEH-veh-reh', en: 'cool / great', pos: 'adjective' },
    { id: 'u40-brutal', es: 'brutal', translit: 'broo-TAL', en: 'awesome (colloquial)', pos: 'adjective' },
    { id: 'u40-flojo', es: 'flojo', translit: 'FLO-ho', en: 'lazy / loose', pos: 'adjective' },
    { id: 'u40-tranquilo', es: 'tranquilo', translit: 'tran-KEE-lo', en: 'calm / relaxed', pos: 'adjective' },
    { id: 'u40-tenerhambre', es: 'tener hambre', translit: 'teh-NER AM-breh', en: 'to be hungry', pos: 'phrase' },
    { id: 'u40-tenersueno', es: 'tener sueño', translit: 'teh-NER SWEH-nyo', en: 'to be sleepy', pos: 'phrase' },
    { id: 'u40-tenerprisa', es: 'tener prisa', translit: 'teh-NER PREE-sah', en: 'to be in a hurry', pos: 'phrase' },
    { id: 'u40-tenerrazon', es: 'tener razón', translit: 'teh-NER rah-SON', en: 'to be right', pos: 'phrase' },
    { id: 'u40-estarenlasnubes', es: 'estar en las nubes', translit: 'es-TAR en las NOO-bes', en: 'to daydream', pos: 'phrase' },
    { id: 'u40-meterlapata', es: 'meter la pata', translit: 'meh-TER lah PAH-tah', en: 'to put your foot in it', pos: 'phrase' },
    { id: 'u40-echarunamano', es: 'echar una mano', translit: 'eh-CHAR OO-nah MAH-no', en: 'to lend a hand', pos: 'phrase' },
    { id: 'u40-costarunojodelacara', es: 'costar un ojo de la cara', translit: 'kos-TAR oon OH-ho deh lah KAH-rah', en: 'to cost an arm and a leg', pos: 'phrase' },
    { id: 'u40-pancomido', es: 'ser pan comido', translit: 'ser pan ko-MEE-do', en: 'to be a piece of cake', pos: 'phrase' },
    { id: 'u40-ponerselaspilas', es: 'ponerse las pilas', translit: 'po-NER-seh las PEE-las', en: 'to get going / to focus', pos: 'phrase' },
    { id: 'u40-masvaletarde', es: 'Más vale tarde que nunca', translit: 'mas BAH-leh TAR-deh keh NOON-kah', en: 'Better late than never', pos: 'phrase' },
    { id: 'u40-quechevere', es: '¡Qué chévere!', translit: 'keh CHEH-veh-reh', en: 'How cool!', pos: 'exclamation' },
    { id: 'u40-degolpe', es: 'de golpe', translit: 'deh GOL-peh', en: 'all of a sudden', pos: 'adverb' },
    { id: 'u40-derepente', es: 'de repente', translit: 'deh reh-PEN-teh', en: 'suddenly', pos: 'adverb' },
    { id: 'u40-echar', es: 'echar', translit: 'eh-CHAR', en: 'to throw / to put', pos: 'verb' },
    { id: 'u40-meter', es: 'meter', translit: 'meh-TER', en: 'to put in', pos: 'verb' },
    { id: 'u40-valer', es: 'valer', translit: 'bah-LER', en: 'to be worth', pos: 'verb' }
  ],
  phrases: [
    { id: 'p-u40-1', es: '¿Qué es la que hay?', trans: 'keh es lah keh ay', en: 'What is up? (Puerto Rico, casual)' },
    { id: 'p-u40-2', es: '¡Qué chévere!', trans: 'keh CHEH-veh-reh', en: 'How cool!' },
    { id: 'p-u40-3', es: 'Ponte las pilas.', trans: 'PON-teh las PEE-las', en: 'Get going. / Focus.' }
  ],
  sentences: [
    { es: 'Tengo hambre; vamos a comer algo.', translit: 'TEN-go AM-breh BAH-mos ah ko-MER AL-go', en: 'I am hungry; let us eat something.', words: [{ id: 'u40-tenerhambre', es: 'hambre', en: 'hunger' }] },
    { es: 'Tengo prisa, el vuelo sale pronto.', translit: 'TEN-go PREE-sah el VWEH-lo SAH-leh PRON-to', en: 'I am in a hurry, the flight leaves soon.', words: [{ id: 'u40-tenerprisa', es: 'prisa', en: 'hurry' }] },
    { es: 'Tienes razón, este café está brutal.', translit: 'TYEH-nes rah-SON ES-teh kah-FEH es-TA broo-TAL', en: 'You are right, this coffee is awesome.', words: [{ id: 'u40-tenerrazon', es: 'razón', en: 'being right' }, { id: 'u40-brutal', es: 'brutal', en: 'awesome' }] },
    { es: 'Estaba en las nubes y no escuché nada.', translit: 'es-TAH-bah en las NOO-bes ee no es-koo-CHE NAH-dah', en: 'I was daydreaming and did not hear anything.', words: [{ id: 'u40-estarenlasnubes', es: 'en las nubes', en: 'daydreaming' }] },
    { es: 'Metí la pata en la reunión de ayer.', translit: 'meh-TEE lah PAH-tah en lah reh-oo-NYON deh ah-YER', en: 'I put my foot in it at the meeting yesterday.', words: [{ id: 'u40-meterlapata', es: 'Metí la pata', en: 'I put my foot in it' }] },
    { es: '¿Me echas una mano con las maletas?', translit: 'meh EH-chas OO-nah MAH-no kon las mah-LEH-tas', en: 'Can you lend me a hand with the suitcases?', words: [{ id: 'u40-echarunamano', es: 'echas una mano', en: 'you lend a hand' }] },
    { es: 'Ese carro cuesta un ojo de la cara.', translit: 'EH-seh KAH-rro KWES-tah oon OH-ho deh lah KAH-rah', en: 'That car costs an arm and a leg.', words: [{ id: 'u40-costarunojodelacara', es: 'cuesta un ojo de la cara', en: 'costs an arm and a leg' }] },
    { es: 'Más vale tarde que nunca, dice el refrán.', translit: 'mas BAH-leh TAR-deh keh NOON-kah DEE-seh el reh-FRAN', en: 'Better late than never, says the proverb.', words: [{ id: 'u40-masvaletarde', es: 'Más vale tarde que nunca', en: 'better late than never' }, { id: 'u40-refran', es: 'refrán', en: 'proverb' }] },
    { es: 'De repente empezó a llover sin parar.', translit: 'deh reh-PEN-teh em-peh-SO ah yo-BER seen pah-RAR', en: 'Suddenly it started to rain without stopping.', words: [{ id: 'u40-derepente', es: 'De repente', en: 'suddenly' }] },
    { es: 'Ese examen fue pan comido.', translit: 'EH-seh ek-SAH-men fweh pan ko-MEE-do', en: 'That exam was a piece of cake.', words: [{ id: 'u40-pancomido', es: 'pan comido', en: 'a piece of cake' }] }
  ],
  dialogue: {
    title: 'En el cafetín (At the cafe)',
    lines: [
      { who: 'Nando', es: '¿Qué es la que hay, mi pana?', en: 'What is up, my friend?' },
      { who: 'Rita', es: 'Nada, aquí con hambre y mucha prisa.', en: 'Nothing, here hungry and in a big hurry.' },
      { who: 'Nando', es: 'Si quieres, te echo una mano.', en: 'If you want, I will lend you a hand.' },
      { who: 'Rita', es: 'Gracias, pero todo aquí cuesta un ojo de la cara.', en: 'Thanks, but everything here costs an arm and a leg.' },
      { who: 'Nando', es: 'Tienes razón, pero el café es pan comido.', en: 'You are right, but the coffee is a piece of cake.' },
      { who: 'Rita', es: '¡Qué chévere! Entonces me quedo.', en: 'How cool! Then I will stay.' }
    ],
    questions: [
      { type: 'mc-en', q: '¿Cómo está Rita?', options: ['con hambre y prisa', 'tranquila y feliz', 'enojada', 'enferma'], answer: 'con hambre y prisa' },
      { type: 'mc-en', q: '¿Qué ofrece Nando?', options: ['echarle una mano', 'pagar la cuenta', 'llevarla a casa', 'cocinar'], answer: 'echarle una mano' },
      { type: 'mc-en', q: '¿Qué piensa Rita de los precios?', options: ['que cuestan un ojo de la cara', 'que son baratos', 'que son justos', 'que son gratis'], answer: 'que cuestan un ojo de la cara' }
    ]
  },
  quiz: [
    { type: 'mc-en', q: '¿Qué significa «tener hambre»?', options: ['to be hungry', 'to be sleepy', 'to be right', 'to be in a hurry'], answer: 'to be hungry', es: 'tener hambre' },
    { type: 'mc-es', q: 'How do you say to daydream?', options: ['estar en las nubes', 'meter la pata', 'echar una mano', 'ser pan comido'], answer: 'estar en las nubes', es: 'estar en las nubes' },
    { type: 'mc-en', q: '¿Qué significa «meter la pata»?', options: ['to put your foot in it', 'to lend a hand', 'to be lucky', 'to hurry'], answer: 'to put your foot in it', es: 'meter la pata' },
    { type: 'mc-es', q: 'Which expression means to be a piece of cake?', options: ['ser pan comido', 'estar en las nubes', 'tener razón', 'costar un ojo de la cara'], answer: 'ser pan comido', es: 'ser pan comido' },
    { type: 'typing', q: 'Type hungry (as in to be hungry, one word).', answer: 'hambre', accepts: [], es: 'hambre' },
    { type: 'typing', q: 'Type hurry in Spanish.', answer: 'prisa', accepts: [], es: 'prisa' },
    { type: 'mc-en', q: '¿Qué significa «chévere»?', options: ['cool / great', 'lazy', 'angry', 'expensive'], answer: 'cool / great', es: 'chévere' },
    { type: 'mc-es', q: 'Which word means cloud?', options: ['nube', 'mano', 'cara', 'pata'], answer: 'nube', es: 'nube' },
    { type: 'mc-en', q: '¿Qué significa «refrán»?', options: ['proverb', 'idiom', 'saying', 'expression'], answer: 'proverb', es: 'refrán' },
    { type: 'mc-es', q: 'Which word means elbow?', options: ['codo', 'ojo', 'mano', 'pata'], answer: 'codo', es: 'codo' },
    { type: 'typing', q: 'Type suddenly in Spanish (two words).', answer: 'de repente', accepts: [], es: 'de repente' },
    { type: 'mc-en', q: '¿Qué significa «echar una mano»?', options: ['to lend a hand', 'to throw a hand', 'to shake hands', 'to wash hands'], answer: 'to lend a hand', es: 'echar una mano' }
  ],
  test: {
    title: 'Unit 40 test — Idioms & colloquial fluency',
    questions: [
      { type: 'mc-en', q: '¿Qué significa «tener razón»?', options: ['to be right', 'to be wrong', 'to reason', 'to be tired'], answer: 'to be right', es: 'tener razón' },
      { type: 'mc-es', q: 'Say to cost an arm and a leg.', options: ['costar un ojo de la cara', 'ser pan comido', 'echar una mano', 'meter la pata'], answer: 'costar un ojo de la cara', es: 'costar un ojo de la cara' },
      { type: 'typing', q: 'Type idiom in Spanish.', answer: 'modismo', accepts: [], es: 'modismo' },
      { type: 'mc-en', q: '¿Qué significa «brutal»?', options: ['awesome (colloquial)', 'cruel', 'boring', 'quiet'], answer: 'awesome (colloquial)', es: 'brutal' },
      { type: 'mc-es', q: 'Which word means expression?', options: ['expresión', 'refrán', 'dicho', 'modismo'], answer: 'expresión', es: 'expresión' },
      { type: 'typing', q: 'Type to be worth in Spanish.', answer: 'valer', accepts: [], es: 'valer' },
      { type: 'mc-en', q: '¿Qué significa «de golpe»?', options: ['all of a sudden', 'slowly', 'again', 'never'], answer: 'all of a sudden', es: 'de golpe' },
      { type: 'mc-es', q: 'Which word means saying?', options: ['dicho', 'refrán', 'gracia', 'modismo'], answer: 'dicho', es: 'dicho' },
      { type: 'typing', q: 'Type hand in Spanish.', answer: 'mano', accepts: [], es: 'mano' },
      { type: 'mc-en', q: '¿Qué significa «ponerse las pilas»?', options: ['to get going / to focus', 'to rest', 'to charge a phone', 'to give up'], answer: 'to get going / to focus', es: 'ponerse las pilas' },
      { type: 'mc-es', q: 'Which word means lazy?', options: ['flojo', 'tranquilo', 'brutal', 'chévere'], answer: 'flojo', es: 'flojo' },
      { type: 'mc-en', q: '¿Qué significa «tener sueño»?', options: ['to be sleepy', 'to have a dream', 'to be hungry', 'to be right'], answer: 'to be sleepy', es: 'tener sueño' }
    ]
  }
};
