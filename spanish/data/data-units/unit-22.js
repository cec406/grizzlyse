// Unit 22 — The subjunctive I: wishes, emotion and doubt. B1.
export const unit = {
  id: 'u22',
  level: 'B1',
  number: 22,
  title: 'The subjunctive I: wishes & emotion',
  titleEs: 'El subjuntivo I',
  story: 'Spanish has a secret second mood, and it is the ticket to sounding real. When you want someone to do something, doubt a fact, or react with emotion, the verb after que changes shape. This unit gives you that shape — the present subjunctive.',
  grammar: [
    {
      topic: 'The subjunctive shape',
      explanation: 'Most present subjunctives swap the first vowel of the ending: -ar verbs take -e, and -er/-ir verbs take -a. Take the yo form, drop the -o, and add the new endings.',
      table: [
        ['Subject', 'hablar → hable', 'comer → coma', 'vivir → viva'],
        ['yo', 'hable', 'coma', 'viva'],
        ['tú', 'hables', 'comas', 'vivas'],
        ['él / ella / usted', 'hable', 'coma', 'viva'],
        ['ellos / ellas / ustedes', 'hablen', 'coman', 'vivan']
      ],
      examples: [
        { es: 'Quiero que hables más despacio.', trans: 'KYEH-ro keh AH-bles MAS des-PA-syo', en: 'I want you to speak more slowly.' },
        { es: 'Espero que coman bien.', trans: 'es-PEH-ro keh KO-man byen', en: 'I hope they eat well.' }
      ]
    },
    {
      topic: 'Wishes, emotions and doubt trigger it',
      explanation: 'Use the subjunctive after que when the subject changes and the main verb expresses a wish (querer, esperar, desear), an emotion (alegrarse de, sorprender a), or doubt (dudar, no creer). If the speaker states a fact they believe, use the indicative instead.',
      table: [
        ['Trigger', 'Spanish', 'English'],
        ['Wish', 'Quiero que estudies.', 'I want you to study.'],
        ['Emotion', 'Me alegro de que vengas.', 'I am glad you are coming.'],
        ['Doubt', 'Dudo que sea cierto.', 'I doubt it is true.'],
        ['Fact (indicative)', 'Creo que viene.', 'I believe he is coming.']
      ],
      examples: [
        { es: 'No creo que sea necesario.', trans: 'no KREH-o keh SEH-ah ne-seh-SA-ryo', en: 'I do not think it is necessary.' },
        { es: 'Ojalá que llegues a tiempo.', trans: 'o-ha-LA keh YE-gues a TYEM-po', en: 'If only you arrive on time.' }
      ]
    },
    {
      topic: 'Tal vez and ojalá',
      explanation: 'tal vez (maybe) and ojalá (if only / I hope) almost always drag in the subjunctive. ojalá que can be followed directly by the verb: Ojalá llueva mañana — hopefully it rains tomorrow.',
      table: [
        ['Spanish', 'English', 'Mood'],
        ['Tal vez esté en casa.', 'Maybe he is at home.', 'subjunctive'],
        ['Ojalá llueva.', 'Hopefully it rains.', 'subjunctive'],
        ['Quizás pueda venir.', 'Maybe he can come.', 'subjunctive']
      ],
      examples: [
        { es: 'Tal vez tengas razón.', trans: 'tal BEHS TEN-gas ra-SON', en: 'Maybe you are right.' },
        { es: 'Ojalá gane mi equipo.', trans: 'o-ha-LA GA-ne mee e-KEE-po', en: 'Hopefully my team wins.' }
      ]
    }
  ],
  vocabulary: [
    { id: 'u22-querer', es: 'querer', translit: 'keh-REHR', en: 'to want', pos: 'verb' },
    { id: 'u22-esperar', es: 'esperar', translit: 'es-peh-RAR', en: 'to hope / to wait', pos: 'verb' },
    { id: 'u22-desear', es: 'desear', translit: 'deh-seh-AR', en: 'to wish', pos: 'verb' },
    { id: 'u22-dudar', es: 'dudar', translit: 'doo-DAR', en: 'to doubt', pos: 'verb' },
    { id: 'u22-creer', es: 'creer', translit: 'kreh-EHR', en: 'to believe', pos: 'verb' },
    { id: 'u22-pensar', es: 'pensar', translit: 'pen-SAR', en: 'to think', pos: 'verb' },
    { id: 'u22-importante', es: 'importante', translit: 'im-por-TAN-te', en: 'important', pos: 'adjective' },
    { id: 'u22-necesario', es: 'necesario', translit: 'neh-seh-SA-ryo', en: 'necessary', pos: 'adjective' },
    { id: 'u22-posible', es: 'posible', translit: 'po-SEE-ble', en: 'possible', pos: 'adjective' },
    { id: 'u22-alegrarse', es: 'alegrarse', translit: 'ah-leh-GRAR-seh', en: 'to be glad', pos: 'verb' },
    { id: 'u22-sorprender', es: 'sorprender', translit: 'sor-pren-DEHR', en: 'to surprise', pos: 'verb' },
    { id: 'u22-miedo', es: 'miedo', translit: 'MYEH-do', en: 'fear', pos: 'noun', gender: 'm' },
    { id: 'u22-tranquilo', es: 'tranquilo', translit: 'tran-KEE-lo', en: 'calm', pos: 'adjective' },
    { id: 'u22-aprender', es: 'aprender', translit: 'ah-pren-DEHR', en: 'to learn', pos: 'verb' },
    { id: 'u22-terminar', es: 'terminar', translit: 'ter-mee-NAR', en: 'to finish', pos: 'verb' },
    { id: 'u22-ojala', es: 'ojalá', translit: 'o-ha-LA', en: 'if only / I hope', pos: 'interjection' },
    { id: 'u22-talvez', es: 'tal vez', translit: 'tal BEHS', en: 'maybe', pos: 'phrase' }
  ],
  phrases: [
    { id: 'p-u22-1', es: '¿Qué quieres que haga?', trans: 'keh KYEH-res keh A-ga', en: 'What do you want me to do?' },
    { id: 'p-u22-2', es: 'Espero que te vaya bien.', trans: 'es-PEH-ro keh teh BY-ya byen', en: 'I hope it goes well for you.' },
    { id: 'p-u22-3', es: 'No creo que sea cierto.', trans: 'no KREH-o keh SEH-ah SYER-to', en: 'I do not think it is true.' }
  ],
  sentences: [
    { es: 'Espero que termines tu tarea.', translit: 'es-PEH-ro keh ter-MEE-nes too ta-REH-ah', en: 'I hope you finish your homework.', words: [{ id: 'u22-esperar', es: 'Espero', en: 'I hope' }, { id: 'u22-terminar', es: 'termines', en: 'you finish (subj.)' }] },
    { es: 'Quiero que aprendas español este año.', translit: 'KYEH-ro keh ah-PREN-das es-pa-NYOL ES-teh A-nyo', en: 'I want you to learn Spanish this year.', words: [{ id: 'u22-querer', es: 'Quiero', en: 'I want' }, { id: 'u22-aprender', es: 'aprendas', en: 'you learn (subj.)' }] },
    { es: 'Ojalá que sea posible viajar en verano.', translit: 'o-ha-LA keh SEH-ah po-SEE-ble bya-HAR en beh-RA-no', en: 'If only it is possible to travel in summer.', words: [{ id: 'u22-ojala', es: 'Ojalá', en: 'if only' }, { id: 'u22-posible', es: 'posible', en: 'possible' }] },
    { es: 'Dudo que sea necesario comprar más.', translit: 'DOO-do keh SEH-ah neh-seh-SA-ryo kom-PRAR mas', en: 'I doubt that it is necessary to buy more.', words: [{ id: 'u22-dudar', es: 'Dudo', en: 'I doubt' }, { id: 'u22-necesario', es: 'necesario', en: 'necessary' }] },
    { es: 'Me alegro de que estés tranquilo.', translit: 'meh ah-LEH-gro deh keh es-TES tran-KEE-lo', en: 'I am glad that you are calm.', words: [{ id: 'u22-alegrarse', es: 'Me alegro', en: 'I am glad' }, { id: 'u22-tranquilo', es: 'tranquilo', en: 'calm' }] },
    { es: 'No creo que ella quiera salir hoy.', translit: 'no KREH-o keh EH-ya KYEH-ra sah-LEER oy', en: 'I do not think she wants to go out today.', words: [{ id: 'u22-creer', es: 'creo', en: 'I believe' }, { id: 'u22-querer', es: 'quiera', en: 'she wants (subj.)' }] }
  ],
  dialogue: {
    title: 'Two friends making plans (Dos amigos hacen planes)',
    lines: [
      { who: 'Leo', es: 'Quiero que estudiemos juntos mañana.', en: 'I want us to study together tomorrow.' },
      { who: 'Inés', es: 'Buena idea, pero dudo que yo esté lista tan pronto.', en: 'Good idea, but I doubt I will be ready that soon.' },
      { who: 'Leo', es: 'Tal vez sea mejor a las diez.', en: 'Maybe ten o clock is better.' },
      { who: 'Inés', es: 'Ojalá que pueda. Me alegro de que me ayudes.', en: 'Hopefully I can. I am glad you help me.' },
      { who: 'Leo', es: 'No creo que sea un problema.', en: 'I do not think it is a problem.' }
    ],
    questions: [
      { type: 'mc-en', q: 'What does Leo want?', options: ['to study together tomorrow', 'to go out tonight', 'to eat', 'to sleep'], answer: 'to study together tomorrow' },
      { type: 'mc-en', q: 'Why is Inés not sure?', options: ['she doubts she will be ready', 'she has no time ever', 'she does not like Leo', 'she is sick'], answer: 'she doubts she will be ready' },
      { type: 'mc-en', q: 'What time is mentioned?', options: ['ten', 'eight', 'nine', 'eleven'], answer: 'ten' }
    ]
  },
  quiz: [
    { type: 'mc-en', q: '¿Qué significa «querer»?', options: ['to want', 'to believe', 'to doubt', 'to think'], answer: 'to want', es: 'querer' },
    { type: 'mc-es', q: 'How do you say I hope?', options: ['espero', 'quiero', 'dudo', 'creo'], answer: 'espero', es: 'espero' },
    { type: 'typing', q: 'Type maybe in Spanish (two words)', answer: 'tal vez', accepts: [], es: 'tal vez' },
    { type: 'mc-en', q: '¿Qué significa «miedo»?', options: ['fear', 'hope', 'joy', 'anger'], answer: 'fear', es: 'miedo' },
    { type: 'mc-es', q: 'Say if only / hopefully.', options: ['ojalá', 'tal vez', 'pero', 'porque'], answer: 'ojalá', es: 'ojalá' },
    { type: 'typing', q: 'Type to learn in Spanish', answer: 'aprender', accepts: [], es: 'aprender' },
    { type: 'mc-en', q: '¿Qué significa «importante»?', options: ['important', 'possible', 'necessary', 'easy'], answer: 'important', es: 'importante' },
    { type: 'mc-es', q: 'Which verb means to doubt?', options: ['dudar', 'creer', 'esperar', 'querer'], answer: 'dudar', es: 'dudar' },
    { type: 'mc-es', q: 'Choose the correct subjunctive: Es posible que ella ___ tranquila.', options: ['esté', 'está', 'estar', 'estoy'], answer: 'esté', es: 'es posible que ella esté tranquila' },
    { type: 'typing', q: 'Type the subjunctive yo form of ser', answer: 'sea', accepts: [], es: 'sea' },
    { type: 'mc-en', q: '¿Qué significa «alegrarse»?', options: ['to be glad', 'to be sad', 'to sleep', 'to work'], answer: 'to be glad', es: 'alegrarse' },
    { type: 'typing', q: 'Type to wish in Spanish', answer: 'desear', accepts: [], es: 'desear' }
  ],
  test: {
    title: 'Unit 22 test — The subjunctive I',
    questions: [
      { type: 'mc-en', q: '¿Qué significa «¿Qué quieres que haga?»?', options: ['What do you want me to do?', 'Where do you want to go?', 'When are you coming?', 'Who are you?'], answer: 'What do you want me to do?', es: '¿Qué quieres que haga?' },
      { type: 'mc-es', q: 'Which form is subjunctive?', options: ['hables', 'hablas', 'hablo', 'hablar'], answer: 'hables', es: 'hables' },
      { type: 'typing', q: 'Type I hope in Spanish', answer: 'espero', accepts: [], es: 'espero' },
      { type: 'mc-en', q: '¿Qué significa «tal vez»?', options: ['maybe', 'always', 'never', 'together'], answer: 'maybe', es: 'tal vez' },
      { type: 'mc-es', q: 'Complete: Quiero que ___ (tú, comer) sano.', options: ['comas', 'comes', 'como', 'comer'], answer: 'comas', es: 'quiero que comas sano' },
      { type: 'typing', q: 'Type to think in Spanish', answer: 'pensar', accepts: [], es: 'pensar' },
      { type: 'mc-en', q: '¿Qué significa «Dudo que sea cierto»?', options: ['I doubt it is true', 'I think it is true', 'I know it is true', 'I hope it is true'], answer: 'I doubt it is true', es: 'dudo que sea cierto' },
      { type: 'mc-es', q: 'Say what a surprise?', options: ['¡Qué sorpresa!', '¡Qué miedo!', '¡Qué pena!', '¡Qué bien!'], answer: '¡Qué sorpresa!', es: '¡Qué sorpresa!' },
      { type: 'typing', q: 'Type the subjunctive tú form of terminar', answer: 'termines', accepts: [], es: 'termines' },
      { type: 'mc-es', q: 'Complete: Me alegro de que ___ (usted, estar) aquí.', options: ['esté', 'está', 'estás', 'estoy'], answer: 'esté', es: 'me alegro de que esté aquí' },
      { type: 'mc-en', q: '¿Qué significa «sorprender»?', options: ['to surprise', 'to scare', 'to calm', 'to laugh'], answer: 'to surprise', es: 'sorprender' },
      { type: 'typing', q: 'Type calm (masculine) in Spanish', answer: 'tranquilo', accepts: [], es: 'tranquilo' }
    ]
  }
};