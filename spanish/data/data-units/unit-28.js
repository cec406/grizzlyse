// Unit 28 — Relationships & social life. B1.
export const unit = {
  id: 'u28',
  level: 'B1',
  number: 28,
  title: 'Relationships & social life',
  titleEs: 'Relaciones y vida social',
  story: 'You are at a wedding in Ponce and everyone wants to talk about family, love and friendship. In this unit you learn the words for the people around you and the verbs that describe how you get along. You also practise when to use tú and when to use usted, because in Puerto Rico that choice says a lot.',
  grammar: [
    {
      topic: 'tú, usted and ustedes in social life',
      explanation: 'The pronoun you use marks the distance between two people. Friends, classmates and close relatives take tú. Someone older, a stranger or a formal situation takes usted. In Latin America ustedes is the only plural you, and it works for both friendly and formal groups.',
      table: [
        ['Person', 'Form', 'Example'],
        ['A friend or relative your age', 'tú', '¿Cómo estás?'],
        ['Someone older or formal', 'usted', '¿Cómo está usted?'],
        ['Two or more people', 'ustedes', '¿Cómo están ustedes?'],
        ['To use tú with someone', 'tutear', 'Nos tuteamos.']
      ],
      examples: [
        { es: '¿Te llevas bien con tus primos?', trans: 'teh YEH-vas byen kon toos PREE-mos', en: 'Do you get along with your cousins?' },
        { es: 'A mi suegra la trato de usted.', trans: 'ah mee SWEH-grah lah TRAH-to deh oos-TED', en: 'I address my mother-in-law with usted.' }
      ]
    },
    {
      topic: 'Reflexive verbs for relationships',
      explanation: 'Many verbs about people are reflexive, so the pronoun has to agree with the subject: me, te, se, nos. Learn them as whole phrases, because the preposition matters: llevarse bien con, casarse con, enamorarse de.',
      table: [
        ['Spanish', 'English'],
        ['llevarse bien con alguien', 'to get along with someone'],
        ['casarse con alguien', 'to marry someone'],
        ['enamorarse de alguien', 'to fall in love with someone'],
        ['pelearse con alguien', 'to quarrel with someone'],
        ['parecerse a alguien', 'to look like someone']
      ],
      examples: [
        { es: 'Me llevo muy bien con mi cuñado.', trans: 'meh YEH-vo mwee byen kon mee KOO-nyah-do', en: 'I get along very well with my brother-in-law.' },
        { es: 'Se enamoraron en San Juan.', trans: 'seh eh-nah-mo-RAH-ron en san WAHN', en: 'They fell in love in San Juan.' }
      ]
    },
    {
      topic: 'ser and estar with relationship states',
      explanation: 'Use ser for a lasting identity or trait: es soltero, es una buena amiga. Use estar for a state that can change: está casada, estamos peleados. Some adjectives even change meaning: ser aburrido means to be boring, but estar aburrido means to be bored.',
      table: [
        ['Spanish', 'English'],
        ['Mi primo es soltero.', 'My cousin is single (a lasting state).'],
        ['Mi hermana está casada.', 'My sister is married (her current state).'],
        ['Son muy unidos.', 'They are very close.'],
        ['Estamos peleados.', 'We are not on speaking terms right now.']
      ],
      examples: [
        { es: 'Mi primo es soltero, pero mi hermana está casada.', trans: 'mee PREE-mo es sol-TEH-ro PEH-ro mee er-MAH-nah es-TAH kah-SAH-dah', en: 'My cousin is single, but my sister is married.' }
      ]
    },
    {
      topic: 'Softening a comment or a request',
      explanation: 'When you talk about someone else, Spanish often softens the sentence. Add a small phrase such as la verdad es que, me parece que or un poco. Asking with ¿podrías...? instead of a direct command sounds much friendlier.',
      table: [
        ['Direct', 'Softened', 'English'],
        ['Es celoso.', 'La verdad es que es un poco celoso.', 'He is a bit jealous.'],
        ['Dame tu número.', '¿Me das tu número?', 'Could you give me your number?'],
        ['Llámame.', '¿Me llamas luego?', 'Will you call me later?']
      ],
      examples: [
        { es: 'La verdad es que es un poco celoso.', trans: 'lah ber-DAD es keh es oon POH-ko seh-LOH-so', en: 'The truth is that he is a bit jealous.' },
        { es: '¿Me llamas luego?', trans: 'meh YAH-mas LWEH-go', en: 'Will you call me later?' }
      ]
    }
  ],
  vocabulary: [
    { id: 'u28-relacion', es: 'relación', translit: 'reh-lah-SYON', en: 'relationship', pos: 'noun', gender: 'f' },
    { id: 'u28-amistad', es: 'amistad', translit: 'ah-mees-TAD', en: 'friendship', pos: 'noun', gender: 'f' },
    { id: 'u28-pareja', es: 'pareja', translit: 'pah-REH-hah', en: 'partner / couple', pos: 'noun', gender: 'f' },
    { id: 'u28-novio', es: 'novio', translit: 'NOH-vyo', en: 'boyfriend', pos: 'noun', gender: 'm' },
    { id: 'u28-novia', es: 'novia', translit: 'NOH-vya', en: 'girlfriend', pos: 'noun', gender: 'f' },
    { id: 'u28-confianza', es: 'confianza', translit: 'kon-FYAN-sah', en: 'trust', pos: 'noun', gender: 'f' },
    { id: 'u28-carino', es: 'cariño', translit: 'kah-REE-nyo', en: 'affection', pos: 'noun', gender: 'm' },
    { id: 'u28-respeto', es: 'respeto', translit: 'res-PEH-to', en: 'respect', pos: 'noun', gender: 'm' },
    { id: 'u28-familia', es: 'familia', translit: 'fah-MEE-lyah', en: 'family', pos: 'noun', gender: 'f' },
    { id: 'u28-suegra', es: 'suegra', translit: 'SWEH-grah', en: 'mother-in-law', pos: 'noun', gender: 'f' },
    { id: 'u28-cunado', es: 'cuñado', translit: 'koo-NYAH-do', en: 'brother-in-law', pos: 'noun', gender: 'm' },
    { id: 'u28-compromiso', es: 'compromiso', translit: 'kom-pro-MEE-so', en: 'commitment / engagement', pos: 'noun', gender: 'm' },
    { id: 'u28-celos', es: 'celos', translit: 'SEH-los', en: 'jealousy', pos: 'noun', gender: 'p' },
    { id: 'u28-casado', es: 'casado', translit: 'kah-SAH-do', en: 'married', pos: 'adjective' },
    { id: 'u28-soltero', es: 'soltero', translit: 'sol-TEH-ro', en: 'single', pos: 'adjective' },
    { id: 'u28-celoso', es: 'celoso', translit: 'seh-LOH-so', en: 'jealous', pos: 'adjective' },
    { id: 'u28-unido', es: 'unido', translit: 'oo-NEE-do', en: 'close / united', pos: 'adjective' },
    { id: 'u28-convivir', es: 'convivir', translit: 'kon-bee-VEER', en: 'to live together', pos: 'verb' },
    { id: 'u28-apoyar', es: 'apoyar', translit: 'ah-poh-YAR', en: 'to support', pos: 'verb' },
    { id: 'u28-discutir', es: 'discutir', translit: 'dees-koo-TEER', en: 'to argue', pos: 'verb' },
    { id: 'u28-pelear', es: 'pelear', translit: 'peh-leh-AR', en: 'to fight / to quarrel', pos: 'verb' },
    { id: 'u28-cuidar', es: 'cuidar', translit: 'kwee-DAR', en: 'to take care of', pos: 'verb' }
  ],
  phrases: [
    { id: 'p-u28-1', es: '¿Qué tal te llevas con tu familia?', trans: 'keh tal teh YEH-vas kon too fah-MEE-lyah', en: 'How do you get along with your family?' },
    { id: 'p-u28-2', es: 'Llevamos dos años juntos.', trans: 'yeh-VAH-mos dos AH-nyos HOON-tos', en: 'We have been together for two years.' },
    { id: 'p-u28-3', es: 'Es como de la familia.', trans: 'es KOH-mo deh lah fah-MEE-lyah', en: 'He is like one of the family.' },
    { id: 'p-u28-4', es: 'Nos queremos mucho.', trans: 'nos keh-REH-mos MOO-cho', en: 'We love each other a lot.' }
  ],
  sentences: [
    { es: 'Mi relación con mi familia es muy buena.', translit: 'mee reh-lah-SYON kon mee fah-MEE-lyah es mwee BWEH-nah', en: 'My relationship with my family is very good.', words: [{ id: 'u28-relacion', es: 'relación', en: 'relationship' }, { id: 'u28-familia', es: 'familia', en: 'family' }] },
    { es: 'Mi novia y yo convivimos desde hace un año.', translit: 'mee NOH-vya ee yoh kon-bee-VEE-mos DES-deh AH-seh oon AH-nyo', en: 'My girlfriend and I have lived together for a year.', words: [{ id: 'u28-novia', es: 'novia', en: 'girlfriend' }, { id: 'u28-convivir', es: 'convivimos', en: 'we live together' }] },
    { es: 'A veces discutimos, pero tenemos mucha confianza.', translit: 'ah VEH-ses dis-koo-TEE-mos PEH-ro teh-NEH-mos MOO-cha kon-FYAN-sah', en: 'Sometimes we argue, but we have a lot of trust.', words: [{ id: 'u28-discutir', es: 'discutimos', en: 'we argue' }, { id: 'u28-confianza', es: 'confianza', en: 'trust' }] },
    { es: 'Mi suegra me apoya cuando estoy triste.', translit: 'mee SWEH-grah meh ah-POH-yah KWAHN-do es-TOY TREES-teh', en: 'My mother-in-law supports me when I am sad.', words: [{ id: 'u28-suegra', es: 'suegra', en: 'mother-in-law' }, { id: 'u28-apoyar', es: 'apoya', en: 'supports' }] },
    { es: 'Para mí, el respeto y el cariño son esenciales.', translit: 'PAH-rah mee el res-PEH-to ee el kah-REE-nyo son eh-sen-SYAH-les', en: 'For me, respect and affection are essential.', words: [{ id: 'u28-respeto', es: 'respeto', en: 'respect' }, { id: 'u28-carino', es: 'cariño', en: 'affection' }] },
    { es: 'Mi hermano es soltero, pero mi primo está casado.', translit: 'mee er-MAH-no es sol-TEH-ro PEH-ro mee PREE-mo es-TAH kah-SAH-do', en: 'My brother is single, but my cousin is married.', words: [{ id: 'u28-soltero', es: 'soltero', en: 'single' }, { id: 'u28-casado', es: 'casado', en: 'married' }] }
  ],
  dialogue: {
    title: 'En la boda de Marta (At the wedding of Marta)',
    lines: [
      { who: 'Ana', es: '¡Qué alegría verte! ¿Cómo está tu familia?', en: 'How nice to see you! How is your family?' },
      { who: 'Luis', es: 'Muy bien, gracias. Mi hermana se casa el año que viene.', en: 'Very well, thank you. My sister is getting married next year.' },
      { who: 'Ana', es: '¡Felicidades! ¿Y tú, sigues soltero?', en: 'Congratulations! And you, are you still single?' },
      { who: 'Luis', es: 'Sí, sigo soltero. Pero tengo una novia desde hace dos años.', en: 'Yes, I am still single. But I have had a girlfriend for two years.' },
      { who: 'Ana', es: 'Qué bueno. ¿Se llevan bien?', en: 'That is good. Do you get along well?' },
      { who: 'Luis', es: 'Nos llevamos muy bien. Discutimos poco y tenemos mucha confianza.', en: 'We get along very well. We rarely argue and we trust each other.' },
      { who: 'Ana', es: 'Eso es lo más importante. ¡Salud!', en: 'That is the most important thing. Cheers! (a toast — also said after a sneeze)' }
    ],
    questions: [
      { type: 'mc-en', q: '¿Quién se casa el año que viene?', options: ['The sister of Luis', 'Luis', 'Ana', 'Marta'], answer: 'The sister of Luis' },
      { type: 'mc-en', q: '¿Cómo es la relación de Luis y su novia?', options: ['They get along well', 'They argue all the time', 'They are married', 'They never talk'], answer: 'They get along well' },
      { type: 'mc-en', q: '¿Qué dice Ana al final?', options: ['That is the most important thing', 'See you later', 'You are welcome', 'I am sorry'], answer: 'That is the most important thing' }
    ]
  },
  quiz: [
    { type: 'mc-en', q: '¿Qué significa «pareja»?', options: ['partner / couple', 'friendship', 'family', 'wedding'], answer: 'partner / couple', es: 'pareja' },
    { type: 'mc-en', q: '¿Qué significa «amistad»?', options: ['friendship', 'relationship', 'trust', 'love'], answer: 'friendship', es: 'amistad' },
    { type: 'mc-es', q: 'How do you say married?', options: ['casado', 'soltero', 'celoso', 'unido'], answer: 'casado', es: 'casado' },
    { type: 'mc-es', q: 'How do you say trust?', options: ['confianza', 'cariño', 'respeto', 'amistad'], answer: 'confianza', es: 'confianza' },
    { type: 'typing', q: 'Type the word for girlfriend in Spanish', answer: 'novia', accepts: [], es: 'novia' },
    { type: 'typing', q: 'Type the word for boyfriend in Spanish', answer: 'novio', accepts: [], es: 'novio' },
    { type: 'mc-en', q: '¿Qué significa «suegra»?', options: ['mother-in-law', 'sister-in-law', 'daughter', 'aunt'], answer: 'mother-in-law', es: 'suegra' },
    { type: 'mc-es', q: 'How do you say to support?', options: ['apoyar', 'discutir', 'pelear', 'convivir'], answer: 'apoyar', es: 'apoyar' },
    { type: 'mc-en', q: '¿Qué significa «soltero»?', options: ['single', 'married', 'jealous', 'widowed'], answer: 'single', es: 'soltero' },
    { type: 'mc-en', q: '¿Qué significa «cariño»?', options: ['affection', 'anger', 'respect', 'trust'], answer: 'affection', es: 'cariño' },
    { type: 'mc-es', q: 'How do you say brother-in-law?', options: ['cuñado', 'suegra', 'novio', 'primo'], answer: 'cuñado', es: 'cuñado' },
    { type: 'typing', q: 'Type the word for relationship in Spanish', answer: 'relacion', accepts: ['relación'], es: 'relación' },
    { type: 'mc-en', q: '¿Qué significa «celoso»?', options: ['jealous', 'calm', 'proud', 'shy'], answer: 'jealous', es: 'celoso' },
    { type: 'mc-es', q: 'How do you say to argue?', options: ['discutir', 'apoyar', 'convivir', 'cuidar'], answer: 'discutir', es: 'discutir' }
  ],
  test: {
    title: 'Unit 28 test — Relationships & social life',
    questions: [
      { type: 'mc-en', q: '¿Qué significa «compromiso»?', options: ['commitment / engagement', 'friendship', 'wedding', 'argument'], answer: 'commitment / engagement', es: 'compromiso' },
      { type: 'mc-es', q: 'How do you say to live together?', options: ['convivir', 'discutir', 'pelear', 'cuidar'], answer: 'convivir', es: 'convivir' },
      { type: 'typing', q: 'Type the word for family in Spanish', answer: 'familia', accepts: [], es: 'familia' },
      { type: 'typing', q: 'Type the word for respect in Spanish', answer: 'respeto', accepts: [], es: 'respeto' },
      { type: 'mc-en', q: '¿Qué significa «unido»?', options: ['close / united', 'single', 'jealous', 'married'], answer: 'close / united', es: 'unido' },
      { type: 'mc-es', q: 'How do you say jealousy?', options: ['celos', 'cariño', 'confianza', 'amistad'], answer: 'celos', es: 'celos' },
      { type: 'mc-en', q: '¿Qué significa «pelear»?', options: ['to fight / to quarrel', 'to support', 'to live together', 'to take care of'], answer: 'to fight / to quarrel', es: 'pelear' },
      { type: 'mc-es', q: 'How do you say to take care of?', options: ['cuidar', 'apoyar', 'convivir', 'discutir'], answer: 'cuidar', es: 'cuidar' },
      { type: 'typing', q: 'Type the word for mother-in-law in Spanish', answer: 'suegra', accepts: [], es: 'suegra' },
      { type: 'mc-en', q: '¿Qué significa «pareja»?', options: ['partner / couple', 'girlfriend', 'relative', 'neighbour'], answer: 'partner / couple', es: 'pareja' },
      { type: 'mc-es', q: 'Which word means friendship?', options: ['amistad', 'relación', 'familia', 'boda'], answer: 'amistad', es: 'amistad' },
      { type: 'mc-en', q: '¿Qué significa «apoyar»?', options: ['to support', 'to argue', 'to marry', 'to fight'], answer: 'to support', es: 'apoyar' }
    ]
  }
};
