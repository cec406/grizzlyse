// Unit 34 — Economy & work. B2.
export const unit = {
  id: 'u34',
  level: 'B2',
  number: 34,
  title: 'Economy & work',
  titleEs: 'Economía y trabajo',
  story: 'You are in a café in Santurce reading the business page. Words like economía, sueldo and desempleo jump off the page. In this unit you learn to talk about money and work like an adult: what you earn, what you spend, and how the island economy moves. These are the words of every real conversation about the future.',
  grammar: [
    {
      topic: 'Nouns of the economy and their gender',
      explanation: 'These nouns appear in every story about money. Most end in -o and take el, but words in -ción, -dad and -tad are feminine and take la. Learn each noun together with its article.',
      table: [
        ['Spanish', 'Gender', 'English'],
        ['la economía', 'f', 'the economy'],
        ['el mercado', 'm', 'the market'],
        ['la empresa', 'f', 'the company'],
        ['el sueldo', 'm', 'the salary'],
        ['la inversión', 'f', 'the investment'],
        ['el ahorro', 'm', 'the saving']
      ],
      examples: [
        { es: 'La economía de la isla crece cada año.', trans: 'lah eh-ko-no-MEE-ah deh lah EES-lah KREH-seh KAH-dah AH-nyo', en: 'The economy of the island grows every year.' },
        { es: 'La inversión extranjera llega al mercado.', trans: 'lah een-ver-SYON eks-tran-HEH-rah YEH-gah al mer-KAH-do', en: 'Foreign investment reaches the market.' }
      ]
    },
    {
      topic: 'Money verbs: ganar, gastar, ahorrar, invertir',
      explanation: 'Use ganar for what you earn or win, gastar for what you spend, ahorrar for what you save and invertir for what you put into a business. invertir changes its stem: invierto, inviertes, invierte, invertimos, invierten.',
      table: [
        ['Spanish', 'English', 'Example'],
        ['ganar', 'to earn / to win', 'Yo gano buen dinero.'],
        ['gastar', 'to spend', 'Tú gastas mucho en comida.'],
        ['ahorrar', 'to save', 'Ella ahorra para viajar.'],
        ['invertir', 'to invest', 'Yo invierto en mi negocio.']
      ],
      examples: [
        { es: 'Gano poco, pero ahorro cada semana.', trans: 'GAH-no PO-ko peh-ro ah-OH-rro KAH-dah seh-MAH-nah', en: 'I earn little, but I save every week.' },
        { es: 'Ella invierte su dinero en una empresa pequeña.', trans: 'EH-yah een-VYER-teh soo dee-NEH-ro en OO-nah em-PREH-sah peh-KEH-nyah', en: 'She invests her money in a small company.' }
      ]
    },
    {
      topic: 'The impersonal se in economic news',
      explanation: 'To report what people in general do, Spanish uses se plus a third-person verb and no subject. Se venden casas means houses are sold by someone. This pattern is everywhere in newspapers and on signs.',
      table: [
        ['Spanish', 'English'],
        ['Se venden casas.', 'Houses are sold.'],
        ['Se necesitan trabajadores.', 'Workers are needed.'],
        ['Se paga bien.', 'They pay well.'],
        ['Se prohíbe fumar.', 'Smoking is prohibited.']
      ],
      examples: [
        { es: 'Se venden carros usados en el mercado.', trans: 'seh VEN-den KAH-rros oo-SAH-dos en el mer-KAH-do', en: 'Used cars are sold at the market.' },
        { es: 'En esa empresa se paga bien.', trans: 'en EH-sah em-PREH-sah seh PAH-gah byen', en: 'At that company they pay well.' }
      ]
    }
  ],
  vocabulary: [
    { id: 'u34-economia', es: 'economía', translit: 'eh-ko-no-MEE-ah', en: 'economy', pos: 'noun', gender: 'f' },
    { id: 'u34-trabajo', es: 'trabajo', translit: 'trah-BAH-ho', en: 'work / job', pos: 'noun', gender: 'm' },
    { id: 'u34-dinero', es: 'dinero', translit: 'dee-NEH-ro', en: 'money', pos: 'noun', gender: 'm' },
    { id: 'u34-mercado', es: 'mercado', translit: 'mer-KAH-do', en: 'market', pos: 'noun', gender: 'm' },
    { id: 'u34-empresa', es: 'empresa', translit: 'em-PREH-sah', en: 'company / business', pos: 'noun', gender: 'f' },
    { id: 'u34-empleo', es: 'empleo', translit: 'em-PLEH-o', en: 'employment / job', pos: 'noun', gender: 'm' },
    { id: 'u34-sueldo', es: 'sueldo', translit: 'SWEL-do', en: 'salary / wages', pos: 'noun', gender: 'm' },
    { id: 'u34-precio', es: 'precio', translit: 'PREH-syo', en: 'price', pos: 'noun', gender: 'm' },
    { id: 'u34-impuesto', es: 'impuesto', translit: 'eem-PWES-to', en: 'tax', pos: 'noun', gender: 'm' },
    { id: 'u34-inversion', es: 'inversión', translit: 'een-ver-SYON', en: 'investment', pos: 'noun', gender: 'f' },
    { id: 'u34-deuda', es: 'deuda', translit: 'DEH-oo-dah', en: 'debt', pos: 'noun', gender: 'f' },
    { id: 'u34-ahorro', es: 'ahorro', translit: 'ah-OH-rro', en: 'saving / savings', pos: 'noun', gender: 'm' },
    { id: 'u34-gasto', es: 'gasto', translit: 'GAHS-to', en: 'expense / spending', pos: 'noun', gender: 'm' },
    { id: 'u34-banco', es: 'banco', translit: 'BAHN-ko', en: 'bank', pos: 'noun', gender: 'm' },
    { id: 'u34-negocio', es: 'negocio', translit: 'neh-GO-syo', en: 'business', pos: 'noun', gender: 'm' },
    { id: 'u34-desempleo', es: 'desempleo', translit: 'dehs-em-PLEH-o', en: 'unemployment', pos: 'noun', gender: 'm' },
    { id: 'u34-presupuesto', es: 'presupuesto', translit: 'preh-soo-PWES-to', en: 'budget', pos: 'noun', gender: 'm' },
    { id: 'u34-trabajador', es: 'trabajador', translit: 'trah-bah-hah-DOR', en: 'worker', pos: 'noun', gender: 'm' },
    { id: 'u34-economico', es: 'económico', translit: 'eh-ko-NO-mee-ko', en: 'economic / affordable', pos: 'adjective' },
    { id: 'u34-caro', es: 'caro', translit: 'KAH-ro', en: 'expensive', pos: 'adjective' },
    { id: 'u34-barato', es: 'barato', translit: 'bah-RAH-to', en: 'cheap', pos: 'adjective' },
    { id: 'u34-ganar', es: 'ganar', translit: 'gah-NAR', en: 'to earn / to win', pos: 'verb' },
    { id: 'u34-gastar', es: 'gastar', translit: 'gahs-TAR', en: 'to spend', pos: 'verb' },
    { id: 'u34-ahorrar', es: 'ahorrar', translit: 'ah-oh-RRAR', en: 'to save (money)', pos: 'verb' },
    { id: 'u34-invertir', es: 'invertir', translit: 'een-ver-TEER', en: 'to invest', pos: 'verb' }
  ],
  phrases: [
    { id: 'p-u34-1', es: '¿Cuánto ganas al mes?', trans: 'KWAN-to GAH-nas al mes', en: 'How much do you earn a month?' },
    { id: 'p-u34-2', es: 'Está muy caro.', trans: 'es-TA mwee KAH-ro', en: 'It is very expensive.' },
    { id: 'p-u34-3', es: 'Busco trabajo.', trans: 'BOOS-ko trah-BAH-ho', en: 'I am looking for work.' }
  ],
  sentences: [
    { es: 'La economía de Puerto Rico depende del turismo.', translit: 'lah eh-ko-no-MEE-ah deh PWEHR-to REE-ko deh-PEN-deh del too-REES-mo', en: 'The economy of Puerto Rico depends on tourism.', words: [{ id: 'u34-economia', es: 'economía', en: 'economy' }] },
    { es: 'Mi hermana busca trabajo en el mercado.', translit: 'mee er-MAH-nah BOOS-kah trah-BAH-ho en el mer-KAH-do', en: 'My sister is looking for work at the market.', words: [{ id: 'u34-trabajo', es: 'trabajo', en: 'work' }, { id: 'u34-mercado', es: 'mercado', en: 'market' }] },
    { es: 'El banco presta dinero a las empresas.', translit: 'el BAHN-ko PRES-tah dee-NEH-ro ah las em-PREH-sas', en: 'The bank lends money to companies.', words: [{ id: 'u34-banco', es: 'banco', en: 'bank' }, { id: 'u34-dinero', es: 'dinero', en: 'money' }, { id: 'u34-empresa', es: 'empresas', en: 'companies' }] },
    { es: 'Es importante ahorrar y no gastar demasiado.', translit: 'es eem-por-TAN-teh ah-oh-RRAR ee no gahs-TAR deh-mah-SYAH-do', en: 'It is important to save and not to spend too much.', words: [{ id: 'u34-ahorrar', es: 'ahorrar', en: 'to save' }, { id: 'u34-gastar', es: 'gastar', en: 'to spend' }] },
    { es: 'Muchos jóvenes emigran por el desempleo.', translit: 'MOO-chos HO-veh-nes eh-MEE-gran por el dehs-em-PLEH-o', en: 'Many young people emigrate because of unemployment.', words: [{ id: 'u34-desempleo', es: 'desempleo', en: 'unemployment' }] },
    { es: 'El sueldo no alcanza para pagar los impuestos.', translit: 'el SWEL-do no al-KAN-sah PAH-rah pah-GAR los eem-PWES-tos', en: 'The salary is not enough to pay the taxes.', words: [{ id: 'u34-sueldo', es: 'sueldo', en: 'salary' }, { id: 'u34-impuesto', es: 'impuestos', en: 'taxes' }] },
    { es: 'Invierto mis ahorros en un negocio pequeño.', translit: 'een-VYER-to mees ah-OH-rros en oon neh-GO-syo peh-KEH-nyo', en: 'I invest my savings in a small business.', words: [{ id: 'u34-invertir', es: 'Invierto', en: 'to invest' }, { id: 'u34-ahorro', es: 'ahorros', en: 'savings' }, { id: 'u34-negocio', es: 'negocio', en: 'business' }] }
  ],
  dialogue: {
    title: 'En el banco (At the bank)',
    lines: [
      { who: 'Clienta', es: 'Buenos días. Quiero abrir una cuenta de ahorros.', en: 'Good morning. I want to open a savings account.' },
      { who: 'Empleado', es: 'Con gusto. ¿Va a depositar dinero hoy?', en: 'With pleasure. Are you going to deposit money today?' },
      { who: 'Clienta', es: 'Sí, y también quiero ahorrar cada mes.', en: 'Yes, and I also want to save every month.' },
      { who: 'Empleado', es: 'Muy bien. ¿Tiene trabajo fijo?', en: 'Very well. Do you have a steady job?' },
      { who: 'Clienta', es: 'Sí, trabajo en una empresa pequeña.', en: 'Yes, I work at a small company.' },
      { who: 'Empleado', es: 'Entonces no hay problema. La cuenta es gratis.', en: 'Then there is no problem. The account is free.' }
    ],
    questions: [
      { type: 'mc-en', q: '¿Qué quiere hacer la clienta?', options: ['abrir una cuenta de ahorros', 'pedir un préstamo', 'pagar impuestos', 'vender un carro'], answer: 'abrir una cuenta de ahorros' },
      { type: 'mc-en', q: '¿Dónde trabaja la clienta?', options: ['en una empresa pequeña', 'en el banco', 'en el mercado', 'en una escuela'], answer: 'en una empresa pequeña' },
      { type: 'mc-en', q: '¿Qué quiere hacer además de depositar?', options: ['ahorrar cada mes', 'invertir en acciones', 'cerrar la cuenta', 'comprar una casa'], answer: 'ahorrar cada mes' }
    ]
  },
  quiz: [
    { type: 'mc-en', q: '¿Qué significa «economía»?', options: ['economy', 'savings', 'tax', 'market'], answer: 'economy', es: 'economía' },
    { type: 'mc-es', q: 'How do you say money?', options: ['dinero', 'deuda', 'sueldo', 'gasto'], answer: 'dinero', es: 'dinero' },
    { type: 'mc-en', q: '¿Qué significa «mercado»?', options: ['market', 'bank', 'company', 'price'], answer: 'market', es: 'mercado' },
    { type: 'mc-es', q: 'Which word means salary?', options: ['sueldo', 'precio', 'ahorro', 'banco'], answer: 'sueldo', es: 'sueldo' },
    { type: 'typing', q: 'Type to save money in Spanish.', answer: 'ahorrar', accepts: [], es: 'ahorrar' },
    { type: 'typing', q: 'Type bank in Spanish.', answer: 'banco', accepts: [], es: 'banco' },
    { type: 'mc-en', q: '¿Qué significa «inversión»?', options: ['investment', 'expense', 'budget', 'debt'], answer: 'investment', es: 'inversión' },
    { type: 'mc-es', q: 'Which verb means to spend?', options: ['gastar', 'ganar', 'invertir', 'ahorrar'], answer: 'gastar', es: 'gastar' },
    { type: 'mc-en', q: '¿Qué significa «desempleo»?', options: ['unemployment', 'employment', 'worker', 'business'], answer: 'unemployment', es: 'desempleo' },
    { type: 'mc-es', q: 'Which word means tax?', options: ['impuesto', 'precio', 'deuda', 'sueldo'], answer: 'impuesto', es: 'impuesto' },
    { type: 'typing', q: 'Type to earn in Spanish.', answer: 'ganar', accepts: [], es: 'ganar' },
    { type: 'mc-en', q: '¿Qué significa «negocio»?', options: ['business', 'market', 'salary', 'bank'], answer: 'business', es: 'negocio' }
  ],
  test: {
    title: 'Unit 34 test — Economy & work',
    questions: [
      { type: 'mc-en', q: '¿Qué significa «sueldo»?', options: ['salary / wages', 'debt', 'budget', 'price'], answer: 'salary / wages', es: 'sueldo' },
      { type: 'mc-es', q: 'Say investment.', options: ['inversión', 'empresa', 'gasto', 'ahorro'], answer: 'inversión', es: 'inversión' },
      { type: 'typing', q: 'Type company in Spanish.', answer: 'empresa', accepts: [], es: 'empresa' },
      { type: 'mc-en', q: '¿Qué significa «presupuesto»?', options: ['budget', 'salary', 'tax', 'debt'], answer: 'budget', es: 'presupuesto' },
      { type: 'mc-es', q: 'Which word means worker?', options: ['trabajador', 'trabajo', 'negocio', 'banco'], answer: 'trabajador', es: 'trabajador' },
      { type: 'typing', q: 'Type to invest in Spanish.', answer: 'invertir', accepts: [], es: 'invertir' },
      { type: 'mc-en', q: '¿Qué significa «deuda»?', options: ['debt', 'tax', 'saving', 'market'], answer: 'debt', es: 'deuda' },
      { type: 'mc-es', q: 'Which word means price?', options: ['precio', 'gasto', 'empleo', 'banco'], answer: 'precio', es: 'precio' },
      { type: 'typing', q: 'Type cheap in Spanish.', answer: 'barato', accepts: [], es: 'barato' },
      { type: 'mc-en', q: '¿Qué significa «gasto»?', options: ['expense / spending', 'saving', 'salary', 'tax'], answer: 'expense / spending', es: 'gasto' },
      { type: 'mc-es', q: 'Which word means employment?', options: ['empleo', 'desempleo', 'empresa', 'ahorro'], answer: 'empleo', es: 'empleo' },
      { type: 'mc-en', q: '¿Qué significa «económico»?', options: ['economic / affordable', 'expensive', 'cheap', 'rich'], answer: 'economic / affordable', es: 'económico' }
    ]
  }
};
