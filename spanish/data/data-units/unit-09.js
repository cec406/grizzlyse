// Unit 9 — Daily routine & time. A1.
export const unit = {
  id: 'u09',
  level: 'A1',
  number: 9,
  title: 'Daily routine & time',
  titleEs: 'La rutina',
  story: 'Every day has a shape: you wake up, shower, eat, work and sleep. In this unit you learn the reflexive verbs that describe your own routine and the way to tell the time in Spanish. By the end you can say exactly what you do and when, from la mañana to la noche.',
  grammar: [
    {
      topic: 'Reflexive verbs — it happens to me',
      explanation: 'Reflexive verbs describe actions you do to yourself. They carry a small pronoun that changes with the person: me levanto, te levantas, se levanta. The pronoun goes before the verb.',
      table: [
        ['Pronoun', 'levantarse', 'English'],
        ['yo', 'me levanto', 'I get up'],
        ['tú', 'te levantas', 'you get up (informal)'],
        ['él / ella / usted', 'se levanta', 'he / she gets up'],
        ['nosotros', 'nos levantamos', 'we get up'],
        ['ellos / ustedes', 'se levantan', 'they get up']
      ],
      examples: [
        { es: 'Me ducho y me visto.', trans: 'meh DOO-choh ee meh BEES-toh', en: 'I shower and I get dressed.' },
        { es: 'Nos acostamos tarde.', trans: 'nohs ah-kohs-TAH-mohs TAR-deh', en: 'We go to bed late.' }
      ]
    },
    {
      topic: 'Telling the time',
      explanation: 'Ask with ¿Qué hora es? Use Es la una for one o clock and Son las plus the number for everything else. Add y media for half past and y cuarto for quarter past.',
      table: [
        ['Spanish', 'English'],
        ['¿Qué hora es?', 'What time is it?'],
        ['Es la una.', 'It is one o clock.'],
        ['Son las dos.', 'It is two o clock.'],
        ['Son las siete y media.', 'It is half past seven.'],
        ['Son las ocho y cuarto.', 'It is quarter past eight.']
      ],
      examples: [
        { es: 'Son las seis y media de la mañana.', trans: 'son las SAYS ee MEH-dyah deh lah ma-NYA-nah', en: 'It is half past six in the morning.' }
      ]
    },
    {
      topic: 'Sequencing your day',
      explanation: 'These little words put your day in order: primero means first, después means after or then, luego means then, and siempre means always.',
      table: [
        ['Spanish', 'English'],
        ['Primero, me levanto.', 'First, I get up.'],
        ['Después, desayuno.', 'Then, I have breakfast.'],
        ['Luego voy a trabajar.', 'Then I go to work.'],
        ['Siempre descanso por la tarde.', 'I always rest in the afternoon.']
      ],
      examples: [
        { es: 'Primero me levanto y después desayuno.', trans: 'pree-MEH-roh meh leh-BAN-toh ee des-PWES deh-sah-YOO-noh', en: 'First I get up and then I have breakfast.' }
      ]
    }
  ],
  vocabulary: [
    { id: 'u09-rutina', es: 'rutina', translit: 'roo-TEE-nah', en: 'routine', pos: 'noun', gender: 'f' },
    { id: 'u09-desayuno', es: 'desayuno', translit: 'deh-sah-YOO-noh', en: 'breakfast', pos: 'noun', gender: 'm' },
    { id: 'u09-almuerzo', es: 'almuerzo', translit: 'al-MWEHR-soh', en: 'lunch', pos: 'noun', gender: 'm' },
    { id: 'u09-cena', es: 'cena', translit: 'SEH-nah', en: 'dinner', pos: 'noun', gender: 'f' },
    { id: 'u09-manana', es: 'mañana', translit: 'ma-NYA-nah', en: 'morning', pos: 'noun', gender: 'f' },
    { id: 'u09-tarde', es: 'tarde', translit: 'TAR-deh', en: 'afternoon', pos: 'noun', gender: 'f' },
    { id: 'u09-noche', es: 'noche', translit: 'NOH-cheh', en: 'night', pos: 'noun', gender: 'f' },
    { id: 'u09-hora', es: 'hora', translit: 'OH-rah', en: 'hour / time', pos: 'noun', gender: 'f' },
    { id: 'u09-reloj', es: 'reloj', translit: 'reh-LOH', en: 'clock / watch', pos: 'noun', gender: 'm' },
    { id: 'u09-mediodia', es: 'mediodía', translit: 'meh-dyoh-DEE-ah', en: 'noon', pos: 'noun', gender: 'm' },
    { id: 'u09-trabajo', es: 'trabajo', translit: 'trah-BAH-hoh', en: 'work / job', pos: 'noun', gender: 'm' },
    { id: 'u09-oficina', es: 'oficina', translit: 'oh-fee-SEE-nah', en: 'office', pos: 'noun', gender: 'f' },
    { id: 'u09-dientes', es: 'dientes', translit: 'DYEN-tes', en: 'teeth', pos: 'noun', gender: 'm' },
    { id: 'u09-levantarse', es: 'levantarse', translit: 'leh-bahn-TAR-seh', en: 'to get up', pos: 'verb' },
    { id: 'u09-ducharse', es: 'ducharse', translit: 'doo-CHAR-seh', en: 'to shower', pos: 'verb' },
    { id: 'u09-banarse', es: 'bañarse', translit: 'bah-NYAR-seh', en: 'to take a bath', pos: 'verb' },
    { id: 'u09-vestirse', es: 'vestirse', translit: 'bes-TEER-seh', en: 'to get dressed', pos: 'verb' },
    { id: 'u09-cepillarse', es: 'cepillarse', translit: 'seh-pee-YAR-seh', en: 'to brush', pos: 'verb' },
    { id: 'u09-desayunar', es: 'desayunar', translit: 'deh-sah-yoo-NAR', en: 'to have breakfast', pos: 'verb' },
    { id: 'u09-acostarse', es: 'acostarse', translit: 'ah-kohs-TAR-seh', en: 'to go to bed', pos: 'verb' },
    { id: 'u09-dormir', es: 'dormir', translit: 'dor-MEER', en: 'to sleep', pos: 'verb' },
    { id: 'u09-trabajar', es: 'trabajar', translit: 'trah-bah-HAR', en: 'to work', pos: 'verb' },
    { id: 'u09-descansar', es: 'descansar', translit: 'des-kan-SAR', en: 'to rest', pos: 'verb' },
    { id: 'u09-volver', es: 'volver', translit: 'bol-BEHR', en: 'to return', pos: 'verb' },
    { id: 'u09-temprano', es: 'temprano', translit: 'tem-PRAH-noh', en: 'early', pos: 'adverb' },
    { id: 'u09-luego', es: 'luego', translit: 'LWEH-goh', en: 'then / later', pos: 'adverb' },
    { id: 'u09-despues', es: 'después', translit: 'des-PWES', en: 'after / then', pos: 'adverb' },
    { id: 'u09-siempre', es: 'siempre', translit: 'SYEM-preh', en: 'always', pos: 'adverb' },
    { id: 'u09-primero', es: 'primero', translit: 'pree-MEH-roh', en: 'first', pos: 'adverb' }
  ],
  phrases: [
    { id: 'p-u09-1', es: '¿Qué hora es?', trans: 'keh OH-rah es', en: 'What time is it?' },
    { id: 'p-u09-2', es: 'Me levanto a las siete.', trans: 'meh leh-BAN-toh ah las SYEH-teh', en: 'I get up at seven.' },
    { id: 'p-u09-3', es: '¿A qué hora te acuestas?', trans: 'ah keh OH-rah teh ah-KWES-tas', en: 'What time do you go to bed?' },
    { id: 'p-u09-4', es: 'Tengo que trabajar.', trans: 'TEN-goh keh trah-bah-HAR', en: 'I have to work.' }
  ],
  sentences: [
    { es: 'Me levanto a las siete de la mañana.', translit: 'meh leh-BAN-toh ah las SYEH-teh deh lah ma-NYA-nah', en: 'I get up at seven in the morning.', words: [{ id: 'u09-levantarse', es: 'levanto', en: 'I get up' }, { id: 'u09-manana', es: 'mañana', en: 'morning' }] },
    { es: 'Me ducho y me cepillo los dientes.', translit: 'meh DOO-choh ee meh seh-PEE-yoh los DYEN-tes', en: 'I shower and I brush my teeth.', words: [{ id: 'u09-ducharse', es: 'ducho', en: 'I shower' }, { id: 'u09-cepillarse', es: 'cepillo', en: 'I brush' }, { id: 'u09-dientes', es: 'dientes', en: 'teeth' }] },
    { es: 'Después del desayuno, voy a trabajar.', translit: 'des-PWES del deh-sah-YOO-noh boy ah trah-bah-HAR', en: 'After breakfast, I go to work.', words: [{ id: 'u09-despues', es: 'Después', en: 'after' }, { id: 'u09-desayuno', es: 'desayuno', en: 'breakfast' }, { id: 'u09-trabajar', es: 'trabajar', en: 'to work' }] },
    { es: '¿Qué hora es? Son las dos y media.', translit: 'keh OH-rah es son las dohs ee MEH-dyah', en: 'What time is it? It is half past two.', words: [{ id: 'u09-hora', es: 'hora', en: 'time' }] },
    { es: 'Almuerzo a las doce y luego descanso.', translit: 'al-MWEHR-soh ah las DOH-seh ee LWEH-goh des-KAN-soh', en: 'I have lunch at twelve and then I rest.', words: [{ id: 'u09-almuerzo', es: 'Almuerzo', en: 'I have lunch' }, { id: 'u09-luego', es: 'luego', en: 'then' }, { id: 'u09-descansar', es: 'descanso', en: 'I rest' }] },
    { es: 'Siempre me acuesto a las once de la noche.', translit: 'SYEM-preh meh ah-KWES-toh ah las ON-seh deh lah NOH-cheh', en: 'I always go to bed at eleven at night.', words: [{ id: 'u09-siempre', es: 'Siempre', en: 'always' }, { id: 'u09-acostarse', es: 'acuesto', en: 'I go to bed' }, { id: 'u09-noche', es: 'noche', en: 'night' }] }
  ],
  dialogue: {
    title: 'La rutina de Miguel (Miguel routine)',
    lines: [
      { who: 'Ana', es: '¿A qué hora te levantas?', en: 'What time do you get up?' },
      { who: 'Miguel', es: 'Me levanto a las seis y media.', en: 'I get up at half past six.' },
      { who: 'Ana', es: '¿Y qué haces por la mañana?', en: 'And what do you do in the morning?' },
      { who: 'Miguel', es: 'Me ducho, desayuno y voy al trabajo.', en: 'I shower, have breakfast and go to work.' },
      { who: 'Ana', es: '¿Almuerzas en casa?', en: 'Do you have lunch at home?' },
      { who: 'Miguel', es: 'No, almuerzo en la oficina. Vuelvo a las seis.', en: 'No, I have lunch at the office. I return at six.' },
      { who: 'Ana', es: '¿A qué hora te acuestas?', en: 'What time do you go to bed?' },
      { who: 'Miguel', es: 'Me acuesto a las once, después de la cena.', en: 'I go to bed at eleven, after dinner.' }
    ],
    questions: [
      { type: 'mc-es', q: '¿A qué hora se levanta Miguel?', options: ['a las seis y media', 'a las siete', 'a las once', 'a las ocho'], answer: 'a las seis y media' },
      { type: 'mc-es', q: '¿Dónde almuerza Miguel?', options: ['en la oficina', 'en casa', 'en un café', 'en el parque'], answer: 'en la oficina' },
      { type: 'mc-es', q: '¿A qué hora vuelve a casa?', options: ['a las seis', 'a las once', 'a las seis y media', 'a las ocho'], answer: 'a las seis' },
      { type: 'mc-es', q: '¿Qué hace Miguel después de la cena?', options: ['se acuesta', 'trabaja', 'desayuna', 'se ducha'], answer: 'se acuesta' }
    ]
  },
  quiz: [
    { type: 'mc-en', q: '¿Qué significa «levantarse»?', options: ['to get up', 'to go to bed', 'to shower', 'to eat'], answer: 'to get up', es: 'levantarse' },
    { type: 'mc-en', q: '¿Qué significa «desayuno»?', options: ['breakfast', 'lunch', 'dinner', 'snack'], answer: 'breakfast', es: 'desayuno' },
    { type: 'mc-es', q: 'Say it is one o clock.', options: ['Es la una', 'Son las una', 'Es las una', 'Son la una'], answer: 'Es la una', es: 'Es la una' },
    { type: 'typing', q: 'Type night in Spanish', answer: 'noche', accepts: [], es: 'noche' },
    { type: 'mc-en', q: '¿Qué significa «acostarse»?', options: ['to go to bed', 'to get up', 'to work', 'to rest'], answer: 'to go to bed', es: 'acostarse' },
    { type: 'mc-es', q: 'Complete: Me ___ a las siete. (I get up)', options: ['levanto', 'levanta', 'levantarse', 'levantamos'], answer: 'levanto', es: 'levanto' },
    { type: 'mc-en', q: '¿Qué significa «hora»?', options: ['hour / time', 'clock', 'minute', 'noon'], answer: 'hour / time', es: 'hora' },
    { type: 'typing', q: 'Type lunch in Spanish', answer: 'almuerzo', accepts: [], es: 'almuerzo' },
    { type: 'mc-es', q: 'Say I shower (reflexive).', options: ['Me ducho', 'Me ducha', 'Ducho me', 'Yo ducho'], answer: 'Me ducho', es: 'Me ducho' },
    { type: 'mc-en', q: '¿Qué significa «luego»?', options: ['then / later', 'first', 'always', 'never'], answer: 'then / later', es: 'luego' },
    { type: 'mc-es', q: 'Say at night.', options: ['por la noche', 'por la mañana', 'por la tarde', 'por la hora'], answer: 'por la noche', es: 'por la noche' },
    { type: 'typing', q: 'Type clock in Spanish', answer: 'reloj', accepts: [], es: 'reloj' }
  ],
  test: {
    title: 'Unit 9 test — Daily routine & time',
    questions: [
      { type: 'mc-en', q: '¿Qué significa «cena»?', options: ['dinner', 'breakfast', 'lunch', 'snack'], answer: 'dinner', es: 'cena' },
      { type: 'mc-es', q: 'Say I always rest.', options: ['Siempre descanso', 'Siempre descansa', 'Nunca descanso', 'Siempre trabajo'], answer: 'Siempre descanso', es: 'Siempre descanso' },
      { type: 'typing', q: 'Type to work in Spanish', answer: 'trabajar', accepts: [], es: 'trabajar' },
      { type: 'mc-en', q: '¿Qué significa «mañana»?', options: ['morning', 'night', 'afternoon', 'noon'], answer: 'morning', es: 'mañana' },
      { type: 'mc-es', q: 'Say it is half past three.', options: ['Son las tres y media', 'Es la tres y media', 'Son las tres y cuarto', 'Son las media tres'], answer: 'Son las tres y media', es: 'Son las tres y media' },
      { type: 'typing', q: 'Type to shower in Spanish', answer: 'ducharse', accepts: [], es: 'ducharse' },
      { type: 'mc-en', q: '¿Qué significa «siempre»?', options: ['always', 'never', 'sometimes', 'early'], answer: 'always', es: 'siempre' },
      { type: 'mc-es', q: 'Say after dinner.', options: ['después de la cena', 'antes de la cena', 'después del desayuno', 'por la cena'], answer: 'después de la cena', es: 'después de la cena' },
      { type: 'mc-en', q: '¿Qué significa «mediodía»?', options: ['noon', 'midnight', 'morning', 'afternoon'], answer: 'noon', es: 'mediodía' },
      { type: 'typing', q: 'Type to sleep in Spanish', answer: 'dormir', accepts: [], es: 'dormir' },
      { type: 'mc-es', q: 'Which is the reflexive pronoun for I?', options: ['me', 'te', 'se', 'nos'], answer: 'me', es: 'me' },
      { type: 'mc-en', q: '¿Qué significa «temprano»?', options: ['early', 'late', 'always', 'first'], answer: 'early', es: 'temprano' }
    ]
  }
};
