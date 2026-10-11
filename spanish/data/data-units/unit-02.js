// Unit 2 — Ser & estar. A1.
export const unit = {
  id: 'u02',
  level: 'A1',
  number: 2,
  title: 'Ser & estar',
  titleEs: 'Ser y estar',
  story: 'Two little verbs both mean to be, and choosing the right one is the heart of Spanish. In Puerto Rico you will hear soy de Puerto Rico for where someone is from and estoy cansado for how they feel right now. Master both and you can describe who you are, how you feel, and where everything is.',
  grammar: [
    {
      topic: 'ser — who you are',
      explanation: 'Use ser for identity and lasting facts: your name, your origin, your job, your personality. The forms are soy, eres, es, somos, son.',
      table: [
        ['Pronoun', 'ser', 'English'],
        ['yo', 'soy', 'I am'],
        ['tú', 'eres', 'you are (informal)'],
        ['él / ella / usted', 'es', 'he / she is, you are (polite)'],
        ['nosotros', 'somos', 'we are'],
        ['ellos / ustedes', 'son', 'they are, you all are']
      ],
      examples: [
        { es: 'Yo soy de Puerto Rico.', trans: 'yoh soy deh PWEHR-toh REE-koh', en: 'I am from Puerto Rico.' },
        { es: 'Ella es maestra.', trans: 'EH-yah es ma-ES-trah', en: 'She is a teacher.' }
      ]
    },
    {
      topic: 'estar — how and where you are',
      explanation: 'Use estar for states and location: feelings, temporary conditions, and where things are. The forms are estoy, estás, está, estamos, están. Think of estar as the verb for right now.',
      table: [
        ['Pronoun', 'estar', 'English'],
        ['yo', 'estoy', 'I am'],
        ['tú', 'estás', 'you are (informal)'],
        ['él / ella / usted', 'está', 'he / she is, you are (polite)'],
        ['nosotros', 'estamos', 'we are'],
        ['ellos / ustedes', 'están', 'they are, you all are']
      ],
      examples: [
        { es: 'Estoy muy contento.', trans: 'es-TOY mwee kon-TEN-toh', en: 'I am very happy.' },
        { es: 'El baño está allí.', trans: 'el BA-nyoh es-TA ah-YEE', en: 'The bathroom is there.' }
      ]
    },
    {
      topic: 'ser or estar?',
      explanation: 'Easy test: if it could change in an hour, use estar. If it is part of who someone is, use ser. Origin, job and personality take ser; mood and location take estar.',
      table: [
        ['Situation', 'Verb', 'Example'],
        ['Origin', 'ser', 'Soy de México.'],
        ['Job', 'ser', 'Eres estudiante.'],
        ['Personality', 'ser', 'Ella es simpática.'],
        ['Feeling right now', 'estar', 'Estoy triste.'],
        ['Location', 'estar', 'Estamos en la playa.']
      ],
      examples: [
        { es: 'Soy maestro, pero hoy estoy cansado.', trans: 'soy ma-ES-troh PEH-roh oy es-TOY kan-SAH-doh', en: 'I am a teacher, but today I am tired.' }
      ]
    }
  ],
  vocabulary: [
    { id: 'u02-ser', es: 'ser', translit: 'sehr', en: 'to be (identity)', pos: 'verb' },
    { id: 'u02-estar', es: 'estar', translit: 'es-TAR', en: 'to be (state / location)', pos: 'verb' },
    { id: 'u02-soy', es: 'soy', translit: 'soy', en: 'I am', pos: 'verb' },
    { id: 'u02-estoy', es: 'estoy', translit: 'es-TOY', en: 'I am (state / place)', pos: 'verb' },
    { id: 'u02-eres', es: 'eres', translit: 'EH-res', en: 'you are (informal)', pos: 'verb' },
    { id: 'u02-es', es: 'es', translit: 'es', en: 'he / she is', pos: 'verb' },
    { id: 'u02-esta', es: 'está', translit: 'es-TA', en: 'he / she is (state)', pos: 'verb' },
    { id: 'u02-somos', es: 'somos', translit: 'SOH-mos', en: 'we are', pos: 'verb' },
    { id: 'u02-son', es: 'son', translit: 'son', en: 'they are', pos: 'verb' },
    { id: 'u02-contento', es: 'contento', translit: 'kon-TEN-toh', en: 'happy / glad', pos: 'adjective' },
    { id: 'u02-cansado', es: 'cansado', translit: 'kan-SAH-doh', en: 'tired', pos: 'adjective' },
    { id: 'u02-triste', es: 'triste', translit: 'TREES-teh', en: 'sad', pos: 'adjective' },
    { id: 'u02-enojado', es: 'enojado', translit: 'e-noh-HAH-doh', en: 'angry', pos: 'adjective' },
    { id: 'u02-emocionado', es: 'emocionado', translit: 'e-moh-syoh-NAH-doh', en: 'excited', pos: 'adjective' },
    { id: 'u02-maestro', es: 'maestro', translit: 'ma-ES-troh', en: 'teacher', pos: 'noun', gender: 'm' },
    { id: 'u02-estudiante', es: 'estudiante', translit: 'es-too-DYAN-teh', en: 'student', pos: 'noun', gender: 'm' },
    { id: 'u02-amigo', es: 'amigo', translit: 'ah-MEE-goh', en: 'friend', pos: 'noun', gender: 'm' },
    { id: 'u02-pais', es: 'país', translit: 'pa-EES', en: 'country', pos: 'noun', gender: 'm' },
    { id: 'u02-bano', es: 'baño', translit: 'BA-nyoh', en: 'bathroom', pos: 'noun', gender: 'm' },
    { id: 'u02-aqui', es: 'aquí', translit: 'ah-KEE', en: 'here', pos: 'adverb' },
    { id: 'u02-alli', es: 'allí', translit: 'ah-YEE', en: 'there', pos: 'adverb' },
    { id: 'u02-de', es: 'de', translit: 'deh', en: 'from / of', pos: 'preposition' },
    { id: 'u02-pero', es: 'pero', translit: 'PEH-roh', en: 'but', pos: 'conjunction' },
    { id: 'u02-muy', es: 'muy', translit: 'mwee', en: 'very', pos: 'adverb' }
  ],
  phrases: [
    { id: 'p-u02-1', es: '¿De dónde eres?', trans: 'deh DON-deh EH-res', en: 'Where are you from? (informal)' },
    { id: 'p-u02-2', es: '¿Cómo estás?', trans: 'KOH-moh es-TAS', en: 'How are you?' },
    { id: 'p-u02-3', es: 'Estoy muy bien.', trans: 'es-TOY mwee byen', en: 'I am very well.' },
    { id: 'p-u02-4', es: 'Yo soy de Puerto Rico.', trans: 'yoh soy deh PWEHR-toh REE-koh', en: 'I am from Puerto Rico.' }
  ],
  sentences: [
    { es: 'Yo soy de Puerto Rico.', translit: 'yoh soy deh PWEHR-toh REE-koh', en: 'I am from Puerto Rico.', words: [{ id: 'u02-soy', es: 'soy', en: 'I am' }, { id: 'u02-de', es: 'de', en: 'from' }] },
    { es: 'Él es maestro y está muy contento.', translit: 'el es ma-ES-troh ee es-TA mwee kon-TEN-toh', en: 'He is a teacher and he is very happy.', words: [{ id: 'u02-es', es: 'es', en: 'he is' }, { id: 'u02-maestro', es: 'maestro', en: 'teacher' }, { id: 'u02-esta', es: 'está', en: 'he is' }, { id: 'u02-muy', es: 'muy', en: 'very' }, { id: 'u02-contento', es: 'contento', en: 'happy' }] },
    { es: 'Nosotros somos amigos.', translit: 'noh-SOH-trohs SOH-mos ah-MEE-gohs', en: 'We are friends.', words: [{ id: 'u02-somos', es: 'somos', en: 'we are' }, { id: 'u02-amigo', es: 'amigo', en: 'friend' }] },
    { es: 'El baño está allí.', translit: 'el BA-nyoh es-TA ah-YEE', en: 'The bathroom is there.', words: [{ id: 'u02-bano', es: 'baño', en: 'bathroom' }, { id: 'u02-esta', es: 'está', en: 'is' }, { id: 'u02-alli', es: 'allí', en: 'there' }] },
    { es: '¿De dónde eres? Soy de Estados Unidos.', translit: 'deh DON-deh EH-res soy deh es-TAH-dohs oo-NEE-dohs', en: 'Where are you from? I am from the United States.', words: [{ id: 'u02-eres', es: 'eres', en: 'you are' }, { id: 'u02-soy', es: 'Soy', en: 'I am' }] },
    { es: 'Estoy triste pero estoy aquí.', translit: 'es-TOY TREES-teh PEH-roh es-TOY ah-KEE', en: 'I am sad but I am here.', words: [{ id: 'u02-estoy', es: 'Estoy', en: 'I am' }, { id: 'u02-triste', es: 'triste', en: 'sad' }, { id: 'u02-pero', es: 'pero', en: 'but' }, { id: 'u02-aqui', es: 'aquí', en: 'here' }] }
  ],
  dialogue: {
    title: 'En el hostal de San Juan (At the hostel in San Juan)',
    lines: [
      { who: 'Ana', es: '¡Hola! ¿Cómo estás?', en: 'Hi! How are you?' },
      { who: 'Marco', es: 'Estoy bien, gracias. ¿Y tú?', en: 'I am fine, thank you. And you?' },
      { who: 'Ana', es: 'Muy bien. ¿De dónde eres?', en: 'Very well. Where are you from?' },
      { who: 'Marco', es: 'Soy de México, pero vivo en Puerto Rico. ¿Y tú?', en: 'I am from Mexico, but I live in Puerto Rico. And you?' },
      { who: 'Ana', es: 'Yo soy de aquí. Soy maestra.', en: 'I am from here. I am a teacher.' },
      { who: 'Marco', es: '¡Qué bien! ¿Dónde está el baño?', en: 'How nice! Where is the bathroom?' },
      { who: 'Ana', es: 'Está allí, cerca de la cocina.', en: 'It is there, near the kitchen.' }
    ],
    questions: [
      { type: 'mc-es', q: '¿De dónde es Marco?', options: ['México', 'Puerto Rico', 'San Juan', 'Estados Unidos'], answer: 'México' },
      { type: 'mc-es', q: '¿Cómo está Marco?', options: ['bien', 'mal', 'triste', 'enojado'], answer: 'bien' },
      { type: 'mc-es', q: '¿Cuál es el trabajo de Ana?', options: ['maestra', 'doctora', 'estudiante', 'cocinera'], answer: 'maestra' },
      { type: 'mc-es', q: '¿Dónde está el baño?', options: ['allí, cerca de la cocina', 'en el cuarto', 'en la playa', 'en el hostal'], answer: 'allí, cerca de la cocina' }
    ]
  },
  quiz: [
    { type: 'mc-en', q: '¿Qué significa «ser»?', options: ['to be (identity)', 'to have', 'to go', 'to be (location)'], answer: 'to be (identity)', es: 'ser' },
    { type: 'mc-en', q: '¿Qué significa «estar»?', options: ['to be (state / location)', 'to be (identity)', 'to eat', 'to stay'], answer: 'to be (state / location)', es: 'estar' },
    { type: 'mc-es', q: 'Say I am very happy.', options: ['Estoy muy contento', 'Soy muy contento', 'Tengo muy contento', 'Eres muy contento'], answer: 'Estoy muy contento', es: 'Estoy muy contento' },
    { type: 'typing', q: 'Type I am (identity) in Spanish', answer: 'soy', accepts: [], es: 'soy' },
    { type: 'mc-en', q: '¿Qué significa «cansado»?', options: ['tired', 'happy', 'sad', 'angry'], answer: 'tired', es: 'cansado' },
    { type: 'mc-es', q: 'Which sentence says I am from Puerto Rico?', options: ['Soy de Puerto Rico', 'Estoy de Puerto Rico', 'Tengo de Puerto Rico', 'Soy en Puerto Rico'], answer: 'Soy de Puerto Rico', es: 'Soy de Puerto Rico' },
    { type: 'mc-en', q: '¿Qué significa «maestro»?', options: ['teacher', 'student', 'doctor', 'friend'], answer: 'teacher', es: 'maestro' },
    { type: 'mc-es', q: 'Say she is sad.', options: ['Ella está triste', 'Ella es triste', 'Ella tiene triste', 'Ella está cansada'], answer: 'Ella está triste', es: 'Ella está triste' },
    { type: 'typing', q: 'Type we are in Spanish', answer: 'somos', accepts: [], es: 'somos' },
    { type: 'mc-en', q: '¿Qué significa «pero»?', options: ['but', 'and', 'or', 'because'], answer: 'but', es: 'pero' },
    { type: 'mc-es', q: 'Say where are you from? (informal)', options: ['¿De dónde eres?', '¿De dónde es usted?', '¿Dónde estás?', '¿Cómo eres?'], answer: '¿De dónde eres?', es: '¿De dónde eres?' },
    { type: 'mc-en', q: '¿Qué significa «allí»?', options: ['there', 'here', 'near', 'far'], answer: 'there', es: 'allí' }
  ],
  test: {
    title: 'Unit 2 test — Ser & estar',
    questions: [
      { type: 'mc-en', q: '¿Qué significa «contento»?', options: ['happy', 'tired', 'sad', 'angry'], answer: 'happy', es: 'contento' },
      { type: 'mc-es', q: 'Say the bathroom is there.', options: ['El baño está allí', 'El baño es allí', 'El baño tiene allí', 'El baño está aquí'], answer: 'El baño está allí', es: 'El baño está allí' },
      { type: 'typing', q: 'Type I am (state / place) in Spanish', answer: 'estoy', accepts: [], es: 'estoy' },
      { type: 'mc-en', q: '¿Qué significa «muy»?', options: ['very', 'much', 'more', 'little'], answer: 'very', es: 'muy' },
      { type: 'mc-es', q: 'Say we are friends.', options: ['Somos amigos', 'Estamos amigos', 'Son amigos', 'Soy amigos'], answer: 'Somos amigos', es: 'Somos amigos' },
      { type: 'typing', q: 'Type here in Spanish', answer: 'aqui', accepts: ['aquí'], es: 'aquí' },
      { type: 'mc-en', q: 'Which verb goes with location?', options: ['estar', 'ser', 'tener', 'haber'], answer: 'estar', es: 'estar' },
      { type: 'mc-es', q: 'Say he is a teacher.', options: ['Él es maestro', 'Él está maestro', 'Él tiene maestro', 'Él son maestro'], answer: 'Él es maestro', es: 'Él es maestro' },
      { type: 'mc-en', q: '¿Qué significa «país»?', options: ['country', 'city', 'island', 'language'], answer: 'country', es: 'país' },
      { type: 'typing', q: 'Type to be (identity) in Spanish', answer: 'ser', accepts: [], es: 'ser' },
      { type: 'mc-en', q: '¿Qué significa «amigo»?', options: ['friend', 'student', 'teacher', 'country'], answer: 'friend', es: 'amigo' },
      { type: 'mc-es', q: 'Say I am angry.', options: ['Estoy enojado', 'Soy enojado', 'Tengo enojado', 'Estoy emocionado'], answer: 'Estoy enojado', es: 'Estoy enojado' }
    ]
  }
};
