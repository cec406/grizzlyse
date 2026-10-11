// Unit 36 — Conditionals & hypotheticals. B2.
export const unit = {
  id: 'u36',
  level: 'B2',
  number: 36,
  title: 'Conditionals & hypotheticals',
  titleEs: 'Condicionales e hipótesis',
  story: 'Your friend asks: «¿Qué harías con un millón de dólares?». You want to answer with more than a shrug. In this unit you learn to build if-then sentences in Spanish, from real plans to dreams that will never happen. This is the grammar of negotiation, advice and imagination.',
  grammar: [
    {
      topic: 'The conditional: would',
      explanation: 'The conditional says what would happen. Add the endings -ía, -ías, -ía, -íamos, -ían to the whole infinitive. It is polite too: Could you help me?',
      table: [
        ['Verb', 'Conditional (yo)', 'Conditional (nosotros)', 'English'],
        ['hablar', 'hablaría', 'hablaríamos', 'would speak'],
        ['comer', 'comería', 'comeríamos', 'would eat'],
        ['vivir', 'viviría', 'viviríamos', 'would live'],
        ['viajar', 'viajaría', 'viajaríamos', 'would travel']
      ],
      examples: [
        { es: 'Viajaría a San Juan mañana mismo.', trans: 'vyah-hah-REE-ah ah san HWAHN mah-NYAH-nah MEES-mo', en: 'I would travel to San Juan tomorrow itself.' },
        { es: '¿Podría ayudarme, por favor?', trans: 'po-DREE-ah ah-yoo-DAR-meh por fah-VOR', en: 'Could you help me, please?' }
      ]
    },
    {
      topic: 'Irregular conditional stems',
      explanation: 'A small group of verbs keeps the same irregular stem as the future: tendr-, podr-, vendr-, har-, dir-, pondr-, saldr-, querr-. Add the normal conditional endings to that stem.',
      table: [
        ['Verb', 'Stem', 'Conditional (yo)', 'English'],
        ['tener', 'tendr-', 'tendría', 'would have'],
        ['poder', 'podr-', 'podría', 'would be able'],
        ['venir', 'vendr-', 'vendría', 'would come'],
        ['hacer', 'har-', 'haría', 'would do'],
        ['querer', 'querr-', 'querría', 'would want']
      ],
      examples: [
        { es: 'Tendría tiempo si saliera temprano.', trans: 'ten-DREE-ah TYEM-po see sah-LYEH-rah tem-PRAH-no', en: 'I would have time if I left early.' },
        { es: 'Ellos vendrían con mucho gusto.', trans: 'EH-yos ven-DREE-an kon MOO-cho GOOS-to', en: 'They would come gladly.' }
      ]
    },
    {
      topic: 'Si clauses: real and hypothetical',
      explanation: 'For a real, possible condition use si + present: Si tengo tiempo, iré. For an impossible or imaginary condition use si + imperfect subjunctive + conditional: Si tuviera tiempo, iría. Never use the present subjunctive after si.',
      table: [
        ['Type', 'Structure', 'Example'],
        ['Real', 'si + present, present/future', 'Si llueve, me quedo.'],
        ['Hypothetical', 'si + imperfect subjunctive, conditional', 'Si lloviera, me quedaría.'],
        ['Impossible past', 'si + hubiera + participle', 'Si hubiera estudiado, habría pasado.']
      ],
      examples: [
        { es: 'Si tengo tiempo, iré a la playa.', trans: 'see TEN-go TYEM-po ee-REH ah lah PLAH-yah', en: 'If I have time, I will go to the beach.' },
        { es: 'Si tuviera dinero, viajaría por todo el Caribe.', trans: 'see too-VYEH-rah dee-NEH-ro vyah-hah-REE-ah por TO-do el kah-REE-beh', en: 'If I had money, I would travel all over the Caribbean.' }
      ]
    }
  ],
  vocabulary: [
    { id: 'u36-condicional', es: 'condicional', translit: 'kon-dee-syo-NAL', en: 'conditional', pos: 'adjective' },
    { id: 'u36-hipotesis', es: 'hipótesis', translit: 'ee-PO-teh-sees', en: 'hypothesis', pos: 'noun', gender: 'f' },
    { id: 'u36-situacion', es: 'situación', translit: 'see-twah-SYON', en: 'situation', pos: 'noun', gender: 'f' },
    { id: 'u36-condicion', es: 'condición', translit: 'kon-dee-SYON', en: 'condition', pos: 'noun', gender: 'f' },
    { id: 'u36-consecuencia', es: 'consecuencia', translit: 'kon-seh-KWEN-syah', en: 'consequence', pos: 'noun', gender: 'f' },
    { id: 'u36-posibilidad', es: 'posibilidad', translit: 'po-see-bee-lee-DAD', en: 'possibility', pos: 'noun', gender: 'f' },
    { id: 'u36-suerte', es: 'suerte', translit: 'SWER-teh', en: 'luck / fate', pos: 'noun', gender: 'f' },
    { id: 'u36-resultado', es: 'resultado', translit: 'reh-sool-TAH-do', en: 'result', pos: 'noun', gender: 'm' },
    { id: 'u36-probable', es: 'probable', translit: 'pro-BAH-bleh', en: 'likely / probable', pos: 'adjective' },
    { id: 'u36-seguro', es: 'seguro', translit: 'seh-GOO-ro', en: 'sure / safe', pos: 'adjective' },
    { id: 'u36-imposible', es: 'imposible', translit: 'eem-po-SEE-bleh', en: 'impossible', pos: 'adjective' },
    { id: 'u36-talvez', es: 'tal vez', translit: 'tal ves', en: 'maybe', pos: 'adverb' },
    { id: 'u36-ojala', es: 'ojalá', translit: 'o-hah-LA', en: 'hopefully / I wish', pos: 'interjection' },
    { id: 'u36-viajar', es: 'viajar', translit: 'vyah-HAR', en: 'to travel', pos: 'verb' },
    { id: 'u36-tener', es: 'tener', translit: 'teh-NER', en: 'to have', pos: 'verb' },
    { id: 'u36-hacer', es: 'hacer', translit: 'ah-SER', en: 'to do / to make', pos: 'verb' },
    { id: 'u36-ganar', es: 'ganar', translit: 'gah-NAR', en: 'to win / to earn', pos: 'verb' },
    { id: 'u36-poder', es: 'poder', translit: 'po-DER', en: 'to be able to', pos: 'verb' },
    { id: 'u36-querer', es: 'querer', translit: 'keh-RER', en: 'to want / to love', pos: 'verb' },
    { id: 'u36-venir', es: 'venir', translit: 'veh-NEER', en: 'to come', pos: 'verb' },
    { id: 'u36-decir', es: 'decir', translit: 'deh-SEER', en: 'to say / to tell', pos: 'verb' },
    { id: 'u36-saber', es: 'saber', translit: 'sah-BER', en: 'to know', pos: 'verb' },
    { id: 'u36-ser', es: 'ser', translit: 'ser', en: 'to be (permanent)', pos: 'verb' },
    { id: 'u36-estar', es: 'estar', translit: 'es-TAR', en: 'to be (state)', pos: 'verb' }
  ],
  phrases: [
    { id: 'p-u36-1', es: '¿Qué harías tú?', trans: 'keh ah-REE-as too', en: 'What would you do?' },
    { id: 'p-u36-2', es: 'Si yo fuera tú...', trans: 'see yo FWEH-rah too', en: 'If I were you...' },
    { id: 'p-u36-3', es: 'No hay problema.', trans: 'no ay pro-BLEH-mah', en: 'There is no problem.' }
  ],
  sentences: [
    { es: 'Si tuviera dinero, viajaría por todo el Caribe.', translit: 'see too-VYEH-rah dee-NEH-ro vyah-hah-REE-ah por TO-do el kah-REE-beh', en: 'If I had money, I would travel all over the Caribbean.', words: [{ id: 'u36-viajar', es: 'viajaría', en: 'would travel' }] },
    { es: 'Si tengo tiempo, iré a la playa el sábado.', translit: 'see TEN-go TYEM-po ee-REH ah lah PLAH-yah el SAH-bah-do', en: 'If I have time, I will go to the beach on Saturday.', words: [{ id: 'u36-tener', es: 'tengo', en: 'I have' }] },
    { es: '¿Qué harías si ganaras la lotería?', translit: 'keh ah-REE-as see gah-NAH-ras lah lo-teh-REE-ah', en: 'What would you do if you won the lottery?', words: [{ id: 'u36-hacer', es: 'harías', en: 'you would do' }, { id: 'u36-ganar', es: 'ganaras', en: 'you won' }] },
    { es: 'Podría ayudarte si quisieras.', translit: 'po-DREE-ah ah-yoo-DAR-teh see kee-SYEH-ras', en: 'I could help you if you wanted.', words: [{ id: 'u36-poder', es: 'Podría', en: 'I could' }, { id: 'u36-querer', es: 'quisieras', en: 'you wanted' }] },
    { es: 'Si viniera temprano, veríamos el desfile.', translit: 'see vee-NYEH-rah tem-PRAH-no veh-REE-ah-mos el des-FEE-leh', en: 'If he came early, we would see the parade.', words: [{ id: 'u36-venir', es: 'viniera', en: 'he came' }] },
    { es: 'Sería imposible terminar sin tu ayuda.', translit: 'seh-REE-ah eem-po-SEE-bleh ter-mee-NAR seen too ah-YOO-dah', en: 'It would be impossible to finish without your help.', words: [{ id: 'u36-imposible', es: 'imposible', en: 'impossible' }] }
  ],
  dialogue: {
    title: 'Planes para el fin de semana (Weekend plans)',
    lines: [
      { who: 'Ana', es: '¿Qué harías si lloviera el domingo?', en: 'What would you do if it rained on Sunday?' },
      { who: 'Luis', es: 'Si lloviera, me quedaría en casa y leería.', en: 'If it rained, I would stay home and read.' },
      { who: 'Ana', es: 'Y si hiciera sol, ¿iríamos a la playa?', en: 'And if it were sunny, would we go to the beach?' },
      { who: 'Luis', es: 'Claro. Iríamos temprano para evitar el tráfico.', en: 'Of course. We would go early to avoid the traffic.' },
      { who: 'Ana', es: 'Perfecto. Si tuviera gasolina, manejaría yo.', en: 'Perfect. If I had gas, I would drive.' },
      { who: 'Luis', es: 'Entonces no habría problema.', en: 'Then there would be no problem.' }
    ],
    questions: [
      { type: 'mc-en', q: '¿Qué haría Luis si lloviera?', options: ['se quedaría en casa y leería', 'iría a la playa', 'manejaría al pueblo', 'trabajaría'], answer: 'se quedaría en casa y leería' },
      { type: 'mc-en', q: '¿Cuándo irían a la playa si hiciera sol?', options: ['temprano', 'al mediodía', 'por la noche', 'nunca'], answer: 'temprano' },
      { type: 'mc-en', q: '¿Qué haría Ana si tuviera gasolina?', options: ['manejaría ella', 'se quedaría', 'leería', 'dormiría'], answer: 'manejaría ella' }
    ]
  },
  quiz: [
    { type: 'mc-en', q: '¿Qué significa «viajaría»?', options: ['would travel', 'I travel', 'I traveled', 'I will travel'], answer: 'would travel', es: 'viajaría' },
    { type: 'mc-es', q: 'Say it would be impossible.', options: ['sería imposible', 'es imposible', 'fue imposible', 'será imposible'], answer: 'sería imposible', es: 'sería imposible' },
    { type: 'mc-en', q: '¿Qué significa «probable»?', options: ['likely / probable', 'impossible', 'sure', 'strange'], answer: 'likely / probable', es: 'probable' },
    { type: 'mc-es', q: 'How do you say hopefully?', options: ['ojalá', 'tal vez', 'seguro', 'suerte'], answer: 'ojalá', es: 'ojalá' },
    { type: 'typing', q: 'Type to have in Spanish.', answer: 'tener', accepts: [], es: 'tener' },
    { type: 'typing', q: 'Type impossible in Spanish.', answer: 'imposible', accepts: [], es: 'imposible' },
    { type: 'mc-en', q: '¿Qué significa «consecuencia»?', options: ['consequence', 'situation', 'condition', 'possibility'], answer: 'consequence', es: 'consecuencia' },
    { type: 'mc-es', q: 'Which word means luck?', options: ['suerte', 'condición', 'hipótesis', 'situación'], answer: 'suerte', es: 'suerte' },
    { type: 'mc-en', q: '¿Qué significa «tal vez»?', options: ['maybe', 'never', 'always', 'surely'], answer: 'maybe', es: 'tal vez' },
    { type: 'mc-es', q: 'Which verb means to come?', options: ['venir', 'decir', 'saber', 'hacer'], answer: 'venir', es: 'venir' },
    { type: 'typing', q: 'Type sure in Spanish.', answer: 'seguro', accepts: [], es: 'seguro' },
    { type: 'mc-en', q: '¿Qué significa «condición»?', options: ['condition', 'result', 'hypothesis', 'luck'], answer: 'condition', es: 'condición' }
  ],
  test: {
    title: 'Unit 36 test — Conditionals & hypotheticals',
    questions: [
      { type: 'mc-en', q: '¿Qué significa «podría»?', options: ['I could / would be able', 'I can', 'I could not', 'I will be able'], answer: 'I could / would be able', es: 'podría' },
      { type: 'mc-es', q: 'Say It would travel.', options: ['viajaría', 'viaja', 'viajó', 'viajará'], answer: 'viajaría', es: 'viajaría' },
      { type: 'typing', q: 'Type to win in Spanish.', answer: 'ganar', accepts: [], es: 'ganar' },
      { type: 'mc-en', q: '¿Qué significa «hipótesis»?', options: ['hypothesis', 'condition', 'result', 'situation'], answer: 'hypothesis', es: 'hipótesis' },
      { type: 'mc-es', q: 'Which word means possibility?', options: ['posibilidad', 'consecuencia', 'suerte', 'condicional'], answer: 'posibilidad', es: 'posibilidad' },
      { type: 'typing', q: 'Type to want in Spanish.', answer: 'querer', accepts: [], es: 'querer' },
      { type: 'mc-en', q: '¿Qué significa «resultado»?', options: ['result', 'condition', 'luck', 'hypothesis'], answer: 'result', es: 'resultado' },
      { type: 'mc-es', q: 'Which word means situation?', options: ['situación', 'suerte', 'resultado', 'probable'], answer: 'situación', es: 'situación' },
      { type: 'typing', q: 'Type to do in Spanish.', answer: 'hacer', accepts: [], es: 'hacer' },
      { type: 'mc-en', q: '¿Qué significa «ojalá»?', options: ['hopefully / I wish', 'maybe', 'never', 'perhaps not'], answer: 'hopefully / I wish', es: 'ojalá' },
      { type: 'mc-es', q: 'Which word means condition?', options: ['condición', 'condicional', 'consecuencia', 'hipótesis'], answer: 'condición', es: 'condición' },
      { type: 'mc-en', q: '¿Qué significa «tal vez»?', options: ['maybe', 'always', 'surely', 'never'], answer: 'maybe', es: 'tal vez' }
    ]
  }
};
