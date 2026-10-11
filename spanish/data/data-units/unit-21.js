// Unit 21 — Opinions & agreement. B1.
export const unit = {
  id: 'u21',
  level: 'B1',
  number: 21,
  title: 'Opinions & agreement',
  titleEs: 'Las opiniones',
  story: 'You are at dinner and the table is arguing about the best food in Puerto Rico. To join in you need more than vocabulary: you need to give an opinion, agree, and disagree without sounding rude. This unit gives you the phrases that keep a conversation going.',
  grammar: [
    {
      topic: 'Giving your opinion',
      explanation: 'The two workhorses are creo que (I think that) and me parece que (it seems to me that). Both are followed by a normal conjugated verb: creo que es, me parece que tienes. For a softer opener use en mi opinión or para mí.',
      table: [
        ['Spanish', 'English'],
        ['Creo que...', 'I think that...'],
        ['Me parece que...', 'It seems to me that...'],
        ['En mi opinión...', 'In my opinion...'],
        ['Para mí...', 'For me...'],
        ['Pienso que...', 'I think that...']
      ],
      examples: [
        { es: 'Creo que el mofongo es delicioso.', trans: 'KREH-o keh el mo-FON-go es deh-lee-SYO-so', en: 'I think that mofongo is delicious.' },
        { es: 'Me parece que tienes razón.', trans: 'meh pah-REH-seh keh TYEH-nes rah-SON', en: 'It seems to me that you are right.' }
      ]
    },
    {
      topic: 'Agreeing',
      explanation: 'The standard phrase is estoy de acuerdo (I agree). You can also say tienes razón (you are right) or claro que sí (of course). Add totalmente or exacto for emphasis.',
      table: [
        ['Spanish', 'English'],
        ['Estoy de acuerdo.', 'I agree.'],
        ['Tienes razón.', 'You are right.'],
        ['Claro que sí.', 'Of course.'],
        ['Exacto.', 'Exactly.'],
        ['Totalmente.', 'Totally.']
      ],
      examples: [
        { es: 'Estoy de acuerdo contigo.', trans: 'es-TOY deh ah-KWER-do kon-TEE-go', en: 'I agree with you.' },
        { es: 'Tienes razón, es un buen plan.', trans: 'TYEH-nes rah-SON es oon bwen plan', en: 'You are right, it is a good plan.' }
      ]
    },
    {
      topic: 'Disagreeing politely',
      explanation: 'To disagree, start with no estoy de acuerdo and then soften it. Use pero (but), sin embargo (however) or aunque (although) to show respect for the other opinion.',
      table: [
        ['Spanish', 'English'],
        ['No estoy de acuerdo.', 'I do not agree.'],
        ['No estoy de acuerdo, pero...', 'I do not agree, but...'],
        ['Sin embargo...', 'However...'],
        ['Aunque...', 'Although...'],
        ['No pienso lo mismo.', 'I do not think the same.']
      ],
      examples: [
        { es: 'No estoy de acuerdo, pero respeto tu opinión.', trans: 'no es-TOY deh ah-KWER-do PEH-ro res-PEH-to too o-pee-NYON', en: 'I do not agree, but I respect your opinion.' },
        { es: 'Sin embargo, prefiero el arroz con gandules.', trans: 'seen em-BAR-go preh-FYEH-ro el ah-ROS kon gan-DOO-les', en: 'However, I prefer rice with pigeon peas.' }
      ]
    },
    {
      topic: 'Connecting your ideas',
      explanation: 'Skilled speakers link opinions with connectors. Use además to add a point, por otro lado to give the other side, and porque to explain a reason. These make you sound fluent.',
      table: [
        ['Connector', 'Use', 'English'],
        ['además', 'adds a point', 'also / moreover'],
        ['por otro lado', 'other side', 'on the other hand'],
        ['sin embargo', 'contrast', 'however'],
        ['porque', 'reason', 'because'],
        ['aunque', 'concession', 'although']
      ],
      examples: [
        { es: 'Además, el tema es muy importante.', trans: 'ah-deh-MAS el TEH-mah es mwee een-por-TAN-teh', en: 'Also, the topic is very important.' },
        { es: 'Prefiero el café porque es más fuerte.', trans: 'preh-FYEH-ro el kah-FEH POR-keh es mas FWER-teh', en: 'I prefer coffee because it is stronger.' }
      ]
    }
  ],
  vocabulary: [
    { id: 'u21-opinion', es: 'opinión', translit: 'o-pee-NYON', en: 'opinion', pos: 'noun', gender: 'f' },
    { id: 'u21-creo', es: 'creo que', translit: 'KREH-o keh', en: 'I think that', pos: 'phrase' },
    { id: 'u21-meparece', es: 'me parece que', translit: 'meh pah-REH-seh keh', en: 'it seems to me that', pos: 'phrase' },
    { id: 'u21-enmiopinion', es: 'en mi opinión', translit: 'en mee o-pee-NYON', en: 'in my opinion', pos: 'phrase' },
    { id: 'u21-estoydeacuerdo', es: 'estoy de acuerdo', translit: 'es-TOY deh ah-KWER-do', en: 'I agree', pos: 'phrase' },
    { id: 'u21-noestoydeacuerdo', es: 'no estoy de acuerdo', translit: 'no es-TOY deh ah-KWER-do', en: 'I do not agree', pos: 'phrase' },
    { id: 'u21-tienesrazon', es: 'tienes razón', translit: 'TYEH-nes rah-SON', en: 'you are right', pos: 'phrase' },
    { id: 'u21-porotrolado', es: 'por otro lado', translit: 'por O-tro LAH-do', en: 'on the other hand', pos: 'phrase' },
    { id: 'u21-sinembargo', es: 'sin embargo', translit: 'seen em-BAR-go', en: 'however', pos: 'phrase' },
    { id: 'u21-ademas', es: 'además', translit: 'ah-deh-MAS', en: 'also / moreover', pos: 'adverb' },
    { id: 'u21-porque', es: 'porque', translit: 'POR-keh', en: 'because', pos: 'conjunction' },
    { id: 'u21-aunque', es: 'aunque', translit: 'AWN-keh', en: 'although', pos: 'conjunction' },
    { id: 'u21-pero', es: 'pero', translit: 'PEH-ro', en: 'but', pos: 'conjunction' },
    { id: 'u21-verdad', es: 'verdad', translit: 'ber-DAD', en: 'truth', pos: 'noun', gender: 'f' },
    { id: 'u21-razon', es: 'razón', translit: 'rah-SON', en: 'reason', pos: 'noun', gender: 'f' },
    { id: 'u21-tema', es: 'tema', translit: 'TEH-mah', en: 'topic', pos: 'noun', gender: 'm' },
    { id: 'u21-pensar', es: 'pensar', translit: 'pen-SAR', en: 'to think', pos: 'verb' },
    { id: 'u21-preferir', es: 'preferir', translit: 'preh-feh-REER', en: 'to prefer', pos: 'verb' },
    { id: 'u21-debatir', es: 'debatir', translit: 'deh-bah-TEER', en: 'to debate', pos: 'verb' },
    { id: 'u21-delicioso', es: 'delicioso', translit: 'deh-lee-SYO-so', en: 'delicious', pos: 'adjective' },
    { id: 'u21-importante', es: 'importante', translit: 'een-por-TAN-teh', en: 'important', pos: 'adjective' }
  ],
  phrases: [
    { id: 'p-u21-1', es: 'En mi opinión...', trans: 'en mee o-pee-NYON', en: 'In my opinion...' },
    { id: 'p-u21-2', es: '¿Estás de acuerdo?', trans: 'es-TAS deh ah-KWER-do', en: 'Do you agree?' },
    { id: 'p-u21-3', es: 'No pienso lo mismo.', trans: 'no PYEN-so lo MEES-mo', en: 'I do not think the same.' }
  ],
  sentences: [
    { es: 'Creo que el mofongo es delicioso.', translit: 'KREH-o keh el mo-FON-go es deh-lee-SYO-so', en: 'I think that mofongo is delicious.', words: [{ id: 'u21-creo', es: 'Creo que', en: 'I think that' }, { id: 'u21-delicioso', es: 'delicioso', en: 'delicious' }] },
    { es: 'Me parece que tienes razón.', translit: 'meh pah-REH-seh keh TYEH-nes rah-SON', en: 'It seems to me that you are right.', words: [{ id: 'u21-meparece', es: 'Me parece que', en: 'it seems to me that' }, { id: 'u21-tienesrazon', es: 'tienes razón', en: 'you are right' }] },
    { es: 'Estoy de acuerdo contigo.', translit: 'es-TOY deh ah-KWER-do kon-TEE-go', en: 'I agree with you.', words: [{ id: 'u21-estoydeacuerdo', es: 'Estoy de acuerdo', en: 'I agree' }] },
    { es: 'No estoy de acuerdo, pero respeto tu opinión.', translit: 'no es-TOY deh ah-KWER-do PEH-ro res-PEH-to too o-pee-NYON', en: 'I do not agree, but I respect your opinion.', words: [{ id: 'u21-noestoydeacuerdo', es: 'No estoy de acuerdo', en: 'I do not agree' }, { id: 'u21-pero', es: 'pero', en: 'but' }, { id: 'u21-opinion', es: 'opinión', en: 'opinion' }] },
    { es: 'Sin embargo, prefiero el arroz con gandules.', translit: 'seen em-BAR-go preh-FYEH-ro el ah-ROS kon gan-DOO-les', en: 'However, I prefer rice with pigeon peas.', words: [{ id: 'u21-sinembargo', es: 'Sin embargo', en: 'however' }, { id: 'u21-preferir', es: 'prefiero', en: 'I prefer' }] },
    { es: 'Además, el tema es muy importante.', translit: 'ah-deh-MAS el TEH-mah es mwee een-por-TAN-teh', en: 'Also, the topic is very important.', words: [{ id: 'u21-ademas', es: 'Además', en: 'also' }, { id: 'u21-tema', es: 'tema', en: 'topic' }, { id: 'u21-importante', es: 'importante', en: 'important' }] }
  ],
  dialogue: {
    title: 'La mejor comida de Puerto Rico (The best food of Puerto Rico)',
    lines: [
      { who: 'Sofía', es: 'En mi opinión, el mofongo es el mejor plato de la isla.', en: 'In my opinion, mofongo is the best dish on the island.' },
      { who: 'Marco', es: 'No estoy de acuerdo. El arroz con gandules es más especial.', en: 'I do not agree. Rice with pigeon peas is more special.' },
      { who: 'Sofía', es: 'Me parece que tienes razón los días de fiesta.', en: 'It seems to me that you are right on holidays.' },
      { who: 'Marco', es: 'Sin embargo, el mofongo también es delicioso.', en: 'However, mofongo is also delicious.' },
      { who: 'Sofía', es: 'Además, los tostones van con todo.', en: 'Also, tostones go with everything.' },
      { who: 'Marco', es: '¡Estoy de acuerdo contigo en eso!', en: 'I agree with you on that!' }
    ],
    questions: [
      { type: 'mc-en', q: '¿Qué opina Sofía del mofongo?', options: ['es el mejor plato', 'es muy malo', 'es muy caro', 'es aburrido'], answer: 'es el mejor plato' },
      { type: 'mc-en', q: '¿Con qué no está de acuerdo Marco?', options: ['con que el mofongo sea el mejor', 'con los tostones', 'con la fiesta', 'con Sofía'], answer: 'con que el mofongo sea el mejor' },
      { type: 'mc-en', q: '¿En qué están de acuerdo los dos?', options: ['los tostones van con todo', 'el mofongo es malo', 'la isla es pequeña', 'no hay comida'], answer: 'los tostones van con todo' }
    ]
  },
  quiz: [
    { type: 'mc-en', q: '¿Qué significa «creo que»?', options: ['I think that', 'I know that', 'I want that', 'I doubt that'], answer: 'I think that', es: 'creo que' },
    { type: 'mc-en', q: '¿Qué significa «estoy de acuerdo»?', options: ['I agree', 'I disagree', 'I am tired', 'I am ready'], answer: 'I agree', es: 'estoy de acuerdo' },
    { type: 'mc-es', q: 'How do you say however?', options: ['sin embargo', 'además', 'porque', 'pero'], answer: 'sin embargo', es: 'sin embargo' },
    { type: 'mc-es', q: 'Which phrase means on the other hand?', options: ['por otro lado', 'sin embargo', 'aunque', 'además'], answer: 'por otro lado', es: 'por otro lado' },
    { type: 'mc-en', q: '¿Qué significa «tienes razón»?', options: ['you are right', 'you are wrong', 'you are tired', 'you are late'], answer: 'you are right', es: 'tienes razón' },
    { type: 'mc-en', q: '¿Qué significa «aunque»?', options: ['although', 'because', 'however', 'also'], answer: 'although', es: 'aunque' },
    { type: 'typing', q: 'Type because in Spanish', answer: 'porque', accepts: [], es: 'porque' },
    { type: 'typing', q: 'Type opinion in Spanish', answer: 'opinion', accepts: ['opinión'], es: 'opinión' },
    { type: 'mc-es', q: 'Complete: ___ que tienes razón.', options: ['Me parece', 'Me parecen', 'Me parecía', 'Parece me'], answer: 'Me parece', es: 'Me parece' },
    { type: 'mc-en', q: '¿Qué significa «preferir»?', options: ['to prefer', 'to think', 'to debate', 'to agree'], answer: 'to prefer', es: 'preferir' },
    { type: 'mc-es', q: 'Say I do not agree.', options: ['No estoy de acuerdo', 'Estoy de acuerdo', 'No tengo razón', 'No me parece bien'], answer: 'No estoy de acuerdo', es: 'No estoy de acuerdo' },
    { type: 'mc-en', q: '¿Qué significa «además»?', options: ['also / moreover', 'however', 'because', 'although'], answer: 'also / moreover', es: 'además' }
  ],
  test: {
    title: 'Unit 21 test — Opinions and agreement',
    questions: [
      { type: 'mc-en', q: '¿Qué significa «me parece que»?', options: ['it seems to me that', 'I know that', 'I doubt that', 'I wish that'], answer: 'it seems to me that', es: 'me parece que' },
      { type: 'mc-es', q: 'Say I think that it is important.', options: ['Creo que es importante', 'Creo que importante es', 'Creo es importante', 'Pienso importante'], answer: 'Creo que es importante', es: 'Creo que es importante' },
      { type: 'typing', q: 'Type but in Spanish', answer: 'pero', accepts: [], es: 'pero' },
      { type: 'typing', q: 'Type topic in Spanish', answer: 'tema', accepts: [], es: 'tema' },
      { type: 'mc-en', q: '¿Qué significa «no estoy de acuerdo»?', options: ['I do not agree', 'I agree', 'I am not sure', 'I am not ready'], answer: 'I do not agree', es: 'no estoy de acuerdo' },
      { type: 'mc-es', q: 'Which word means reason?', options: ['razón', 'verdad', 'tema', 'opinión'], answer: 'razón', es: 'razón' },
      { type: 'mc-es', q: 'Say in my opinion.', options: ['en mi opinión', 'para ti', 'sin embargo', 'por otro lado'], answer: 'en mi opinión', es: 'en mi opinión' },
      { type: 'mc-en', q: '¿Qué significa «delicioso»?', options: ['delicious', 'important', 'expensive', 'strange'], answer: 'delicious', es: 'delicioso' },
      { type: 'mc-es', q: 'Complete: ___ embargo, prefiero el café.', options: ['Sin', 'Con', 'Por', 'Para'], answer: 'Sin', es: 'Sin embargo' },
      { type: 'mc-en', q: '¿Qué significa «debatir»?', options: ['to debate', 'to agree', 'to prefer', 'to think'], answer: 'to debate', es: 'debatir' },
      { type: 'typing', q: 'Type although in Spanish', answer: 'aunque', accepts: [], es: 'aunque' },
      { type: 'mc-es', q: 'Say it seems to me that you are right.', options: ['Me parece que tienes razón', 'Me parece que tienes razón no', 'Parece me que tienes razón', 'Me parecen que tienes razón'], answer: 'Me parece que tienes razón', es: 'Me parece que tienes razón' }
    ]
  }
};
