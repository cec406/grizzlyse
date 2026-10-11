// Unit 29 — The subjunctive II: conjunctions & commands. B1.
export const unit = {
  id: 'u29',
  level: 'B1',
  number: 29,
  title: 'The subjunctive II: conjunctions & commands',
  titleEs: 'El subjuntivo II: conjunciones y mandatos',
  story: 'You are helping to plan a party in Old San Juan. Your friend gives you orders, you make polite requests of a shopkeeper, and everything depends on timing: before the doors close, as soon as the guests arrive, unless it rains. This unit shows you exactly when the subjunctive appears and how to give commands without sounding rude.',
  grammar: [
    {
      topic: 'Conjunctions that trigger the subjunctive',
      explanation: 'Some conjunctions introduce something that is not yet a fact, so the verb after them goes in the subjunctive. The most useful ones are para que (so that), antes de que (before), a menos que (unless), en cuanto (as soon as) and sin que (without).',
      table: [
        ['Spanish', 'English'],
        ['para que vengas', 'so that you come'],
        ['antes de que salga', 'before he leaves'],
        ['a menos que llueva', 'unless it rains'],
        ['en cuanto llegues', 'as soon as you arrive'],
        ['sin que nadie sepa', 'without anyone knowing']
      ],
      examples: [
        { es: 'Te llamo en cuanto llegue a casa.', trans: 'teh YAH-mo en KWAHN-to YEH-gue ah KAH-sah', en: 'I will call you as soon as I get home.' },
        { es: 'Saldremos sin que ellos sepan.', trans: 'sal-DREH-mos seen keh EH-yos SEH-pan', en: 'We will leave without them knowing.' }
      ]
    },
    {
      topic: 'Informal commands (tú)',
      explanation: 'To tell a friend to do something, use the third-person singular present form. Verbs in -ar take -a (habla, compra) and verbs in -er and -ir take -e (come, escribe). Eight verbs are irregular and worth memorizing: haz, ten, ven, di, sal, sé, ve, pon.',
      table: [
        ['Verb', 'Command', 'English'],
        ['hablar', 'habla', 'speak'],
        ['comer', 'come', 'eat'],
        ['escribir', 'escribe', 'write'],
        ['hacer', 'haz', 'do / make'],
        ['venir', 'ven', 'come here'],
        ['decir', 'di', 'say'],
        ['poner', 'pon', 'put']
      ],
      examples: [
        { es: 'Compra las flores y ve al mercado.', trans: 'KOM-prah las FLOH-res ee beh al mer-KAH-do', en: 'Buy the flowers and go to the market.' },
        { es: 'Dime la verdad.', trans: 'DEE-meh lah ber-DAD', en: 'Tell me the truth.' }
      ]
    },
    {
      topic: 'Polite commands with usted and ustedes',
      explanation: 'To be polite, add the vowel that is opposite to the normal one. Verbs in -ar take -e / -en, and verbs in -er and -ir take -a / -an. Softeners make a request even friendlier: ¿podría..., ¿le importaría..., ¿me haría el favor de...?',
      table: [
        ['Verb', 'usted', 'ustedes', 'English'],
        ['hablar', 'hable', 'hablen', 'speak'],
        ['comer', 'coma', 'coman', 'eat'],
        ['escribir', 'escriba', 'escriban', 'write'],
        ['venir', 'venga', 'vengan', 'come'],
        ['hacer', 'haga', 'hagan', 'do']
      ],
      examples: [
        { es: 'Hable más despacio, por favor.', trans: 'AH-bleh mas des-PAH-syo por fah-VOR', en: 'Please speak more slowly.' },
        { es: '¿Podría ayudarme un momento?', trans: 'po-DREE-ah ah-yoo-DAR-meh oon mo-MEN-to', en: 'Could you help me for a moment?' }
      ]
    },
    {
      topic: 'Indirect commands with que',
      explanation: 'To give an order about a third person, say que plus the subjunctive. This is how you relay instructions: Que esperen. (Let them wait.) Que pase. (Let him come in.)',
      table: [
        ['Spanish', 'English'],
        ['Que esperen.', 'Let them wait.'],
        ['Que pase.', 'Let him come in.'],
        ['Que lo hagan ellos.', 'Let them do it.'],
        ['Que traiga la guitarra.', 'Let her bring the guitar.']
      ],
      examples: [
        { es: 'Que lo hagan ellos.', trans: 'keh lo AH-gan EH-yos', en: 'Let them do it.' },
        { es: 'Que pase, por favor.', trans: 'keh PAH-seh por fah-VOR', en: 'Let him come in, please.' }
      ]
    }
  ],
  vocabulary: [
    { id: 'u29-para_que', es: 'para que', translit: 'PAH-rah keh', en: 'so that', pos: 'conjunction' },
    { id: 'u29-antesdeque', es: 'antes de que', translit: 'AN-tes deh keh', en: 'before', pos: 'conjunction' },
    { id: 'u29-amenosque', es: 'a menos que', translit: 'ah MEH-nos keh', en: 'unless', pos: 'conjunction' },
    { id: 'u29-en_cuanto', es: 'en cuanto', translit: 'en KWAHN-to', en: 'as soon as', pos: 'conjunction' },
    { id: 'u29-sin_que', es: 'sin que', translit: 'seen keh', en: 'without', pos: 'conjunction' },
    { id: 'u29-esperar', es: 'esperar', translit: 'es-peh-RAR', en: 'to wait / to hope', pos: 'verb' },
    { id: 'u29-perder', es: 'perder', translit: 'per-DER', en: 'to lose / to get lost', pos: 'verb' },
    { id: 'u29-llamar', es: 'llamar', translit: 'yah-MAR', en: 'to call', pos: 'verb' },
    { id: 'u29-pedir', es: 'pedir', translit: 'peh-DEER', en: 'to ask for', pos: 'verb' },
    { id: 'u29-rogar', es: 'rogar', translit: 'roh-GAR', en: 'to beg / to plead', pos: 'verb' },
    { id: 'u29-aconsejar', es: 'aconsejar', translit: 'ah-kon-seh-HAR', en: 'to advise', pos: 'verb' },
    { id: 'u29-sugerir', es: 'sugerir', translit: 'soo-heh-REER', en: 'to suggest', pos: 'verb' },
    { id: 'u29-decir', es: 'decir', translit: 'deh-SEER', en: 'to say / to tell', pos: 'verb' },
    { id: 'u29-hacer', es: 'hacer', translit: 'ah-SER', en: 'to do / to make', pos: 'verb' },
    { id: 'u29-venir', es: 'venir', translit: 'beh-NEER', en: 'to come', pos: 'verb' },
    { id: 'u29-salir', es: 'salir', translit: 'sah-LEER', en: 'to leave / to go out', pos: 'verb' },
    { id: 'u29-llegar', es: 'llegar', translit: 'yeh-GAR', en: 'to arrive', pos: 'verb' },
    { id: 'u29-llover', es: 'llover', translit: 'yoh-BEHR', en: 'to rain', pos: 'verb' },
    { id: 'u29-favor', es: 'favor', translit: 'fah-VOR', en: 'favour', pos: 'noun', gender: 'm' },
    { id: 'u29-permiso', es: 'permiso', translit: 'per-MEE-so', en: 'permission', pos: 'noun', gender: 'm' },
    { id: 'u29-puntual', es: 'puntual', translit: 'poon-TWAL', en: 'punctual', pos: 'adjective' },
    { id: 'u29-tranquilo', es: 'tranquilo', translit: 'tran-KEE-lo', en: 'calm / relaxed', pos: 'adjective' },
    { id: 'u29-ojala', es: 'ojalá', translit: 'oh-hah-LAH', en: 'I hope / hopefully', pos: 'interjection' }
  ],
  phrases: [
    { id: 'p-u29-1', es: '¿Me haces un favor?', trans: 'meh AH-ses oon fah-VOR', en: 'Will you do me a favour?' },
    { id: 'p-u29-2', es: 'Que lo pasen bien.', trans: 'keh lo PAH-sen byen', en: 'Have a good time.' },
    { id: 'p-u29-3', es: 'Avísame en cuanto llegues.', trans: 'ah-VEE-sah-meh en KWAHN-to YEH-ges', en: 'Let me know as soon as you arrive.' },
    { id: 'p-u29-4', es: 'No te preocupes.', trans: 'no teh preh-oh-KOO-pes', en: 'Do not worry.' }
  ],
  sentences: [
    { es: 'Te espero aquí para que no te pierdas.', translit: 'teh es-PEH-ro ah-KEE PAH-rah keh no teh PYEHR-das', en: 'I will wait for you here so that you do not get lost.', words: [{ id: 'u29-esperar', es: 'espero', en: 'I wait' }, { id: 'u29-para_que', es: 'para que', en: 'so that' }, { id: 'u29-perder', es: 'pierdas', en: 'you get lost' }] },
    { es: 'Llámame antes de que salga el tren.', translit: 'YAH-mah-meh AN-tes deh keh SAL-gah el tren', en: 'Call me before the train leaves.', words: [{ id: 'u29-llamar', es: 'Llámame', en: 'call me' }, { id: 'u29-antesdeque', es: 'antes de que', en: 'before' }, { id: 'u29-salir', es: 'salga', en: 'it leaves' }] },
    { es: 'Hazme un favor, por favor.', translit: 'AS-meh oon fah-VOR por fah-VOR', en: 'Do me a favour, please.', words: [{ id: 'u29-hacer', es: 'Hazme', en: 'do me' }, { id: 'u29-favor', es: 'favor', en: 'favour' }] },
    { es: 'Ojalá lleguen puntuales a la reunión.', translit: 'oh-hah-LAH YEH-guen poon-TWAL-es ah lah reh-oo-NYON', en: 'I hope they arrive on time for the meeting.', words: [{ id: 'u29-ojala', es: 'Ojalá', en: 'I hope' }, { id: 'u29-llegar', es: 'lleguen', en: 'they arrive' }, { id: 'u29-puntual', es: 'puntuales', en: 'punctual' }] },
    { es: 'A menos que llueva, vamos a la playa.', translit: 'ah MEH-nos keh YWEH-bah BAH-mos ah lah PLAH-yah', en: 'Unless it rains, we are going to the beach.', words: [{ id: 'u29-amenosque', es: 'A menos que', en: 'unless' }, { id: 'u29-llover', es: 'llueva', en: 'it rains' }] },
    { es: 'Les sugiero que vengan temprano.', translit: 'les soo-HEH-ro keh BEN-gan tem-PRAH-no', en: 'I suggest that you all come early.', words: [{ id: 'u29-sugerir', es: 'sugiero', en: 'I suggest' }, { id: 'u29-venir', es: 'vengan', en: 'they come' }] }
  ],
  dialogue: {
    title: 'Preparando una fiesta (Planning a party)',
    lines: [
      { who: 'Carla', es: '¿Me ayudas a preparar la fiesta del sábado?', en: 'Will you help me get the party ready for Saturday?' },
      { who: 'Diego', es: 'Claro. Dime qué necesitas.', en: 'Of course. Tell me what you need.' },
      { who: 'Carla', es: 'Ve al mercado y compra frutas. Hazlo antes de que cierren.', en: 'Go to the market and buy fruit. Do it before they close.' },
      { who: 'Diego', es: 'Con gusto. ¿Invito a tu prima también?', en: 'Gladly. Should I invite your cousin too?' },
      { who: 'Carla', es: 'Sí, pero avísale con tiempo para que no tenga otros planes.', en: 'Yes, but let her know early so that she does not have other plans.' },
      { who: 'Diego', es: 'Está bien. Que traiga su guitarra para que cantemos.', en: 'All right. Let her bring her guitar so that we can sing.' },
      { who: 'Carla', es: 'Perfecto. No te olvides de las flores.', en: 'Perfect. Do not forget the flowers.' }
    ],
    questions: [
      { type: 'mc-en', q: '¿Qué fiesta van a preparar?', options: ['A party on Saturday', 'A wedding', 'A birthday on Monday', 'A graduation'], answer: 'A party on Saturday' },
      { type: 'mc-en', q: '¿Qué debe comprar Diego?', options: ['Fruit', 'Flowers', 'Bread', 'Music'], answer: 'Fruit' },
      { type: 'mc-en', q: '¿Por qué debe avisar a la prima con tiempo?', options: ['So that she does not have other plans', 'Because she is busy', 'Because she lives far away', 'To ask her for money'], answer: 'So that she does not have other plans' }
    ]
  },
  quiz: [
    { type: 'mc-en', q: '¿Qué significa «para que»?', options: ['so that', 'unless', 'before', 'as soon as'], answer: 'so that', es: 'para que' },
    { type: 'mc-en', q: '¿Qué significa «a menos que»?', options: ['unless', 'so that', 'without', 'even though'], answer: 'unless', es: 'a menos que' },
    { type: 'mc-es', q: 'How do you say as soon as?', options: ['en cuanto', 'antes de que', 'para que', 'sin que'], answer: 'en cuanto', es: 'en cuanto' },
    { type: 'mc-es', q: 'How do you say before?', options: ['antes de que', 'en cuanto', 'para que', 'a menos que'], answer: 'antes de que', es: 'antes de que' },
    { type: 'typing', q: 'Type the word for permission in Spanish', answer: 'permiso', accepts: [], es: 'permiso' },
    { type: 'typing', q: 'Type the word for favour in Spanish', answer: 'favor', accepts: [], es: 'favor' },
    { type: 'mc-en', q: '¿Qué significa «sugerir»?', options: ['to suggest', 'to beg', 'to advise', 'to wait'], answer: 'to suggest', es: 'sugerir' },
    { type: 'mc-es', q: 'How do you say to advise?', options: ['aconsejar', 'sugerir', 'rogar', 'pedir'], answer: 'aconsejar', es: 'aconsejar' },
    { type: 'mc-en', q: '¿Qué significa «ojalá»?', options: ['I hope / hopefully', 'of course', 'never mind', 'maybe not'], answer: 'I hope / hopefully', es: 'ojalá' },
    { type: 'mc-en', q: '¿Qué significa «puntual»?', options: ['punctual', 'polite', 'patient', 'calm'], answer: 'punctual', es: 'puntual' },
    { type: 'mc-es', q: 'Which is the informal command of hablar?', options: ['habla', 'hable', 'hablen', 'hablar'], answer: 'habla', es: 'habla' },
    { type: 'mc-es', q: 'Which is the polite command of comer for usted?', options: ['coma', 'come', 'coman', 'comer'], answer: 'coma', es: 'coma' },
    { type: 'mc-en', q: '¿Qué significa «sin que»?', options: ['without', 'unless', 'so that', 'before'], answer: 'without', es: 'sin que' },
    { type: 'typing', q: 'Type to rain in Spanish', answer: 'llover', accepts: [], es: 'llover' }
  ],
  test: {
    title: 'Unit 29 test — The subjunctive II: conjunctions & commands',
    questions: [
      { type: 'mc-en', q: '¿Qué significa «en cuanto»?', options: ['as soon as', 'before', 'unless', 'without'], answer: 'as soon as', es: 'en cuanto' },
      { type: 'mc-es', q: 'How do you say so that?', options: ['para que', 'sin que', 'a menos que', 'antes de que'], answer: 'para que', es: 'para que' },
      { type: 'typing', q: 'Type the word for to arrive in Spanish', answer: 'llegar', accepts: [], es: 'llegar' },
      { type: 'typing', q: 'Type the word for to come in Spanish', answer: 'venir', accepts: [], es: 'venir' },
      { type: 'mc-en', q: '¿Qué significa «rogar»?', options: ['to beg / to plead', 'to advise', 'to ask for', 'to suggest'], answer: 'to beg / to plead', es: 'rogar' },
      { type: 'mc-es', q: 'Which is the informal command of hacer?', options: ['haz', 'haga', 'hagan', 'hacer'], answer: 'haz', es: 'haz' },
      { type: 'mc-es', q: 'Which is the polite command of venir for usted?', options: ['venga', 'ven', 'vengan', 'venir'], answer: 'venga', es: 'venga' },
      { type: 'mc-en', q: '¿Qué significa «tranquilo»?', options: ['calm / relaxed', 'punctual', 'upset', 'tired'], answer: 'calm / relaxed', es: 'tranquilo' },
      { type: 'typing', q: 'Type the word for to call in Spanish', answer: 'llamar', accepts: [], es: 'llamar' },
      { type: 'mc-en', q: '¿Qué significa «pedir»?', options: ['to ask for', 'to lose', 'to wait', 'to say'], answer: 'to ask for', es: 'pedir' },
      { type: 'mc-es', q: 'Complete: Ojalá ... puntual. (venir)', options: ['venga', 'viene', 'vendrá', 'venir'], answer: 'venga', es: 'venga' },
      { type: 'mc-en', q: '¿Qué significa «hacer»?', options: ['to do / to make', 'to say', 'to leave', 'to rain'], answer: 'to do / to make', es: 'hacer' }
    ]
  }
};
