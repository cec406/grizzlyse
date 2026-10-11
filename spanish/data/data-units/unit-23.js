// Unit 23 — Health & well-being. B1.
export const unit = {
  id: 'u23',
  level: 'B1',
  number: 23,
  title: 'Health & well-being',
  titleEs: 'Salud y bienestar',
  story: 'Small daily habits decide how you feel. This unit gives you the verbs and expressions for talking about sleep, exercise, diet and stress, plus the polite way to give advice — deberías and es mejor que.',
  grammar: [
    {
      topic: 'Advice with deberías',
      explanation: 'The conditional form deberías means you should. It is softer than debes and is the natural way to suggest something. It is followed by an infinitive: deberías dormir más.',
      table: [
        ['Spanish', 'English'],
        ['Deberías descansar.', 'You should rest.'],
        ['Deberías beber más agua.', 'You should drink more water.'],
        ['No deberías comer tanta azúcar.', 'You should not eat so much sugar.'],
        ['Deberíamos hacer ejercicio.', 'We should exercise.']
      ],
      examples: [
        { es: 'Deberías dormir ocho horas.', trans: 'deh-beh-REE-as dor-MEER O-cho OH-ras', en: 'You should sleep eight hours.' },
        { es: 'Deberías ir al médico.', trans: 'deh-beh-REE-as eer al MEH-dee-ko', en: 'You should go to the doctor.' }
      ]
    },
    {
      topic: 'es mejor que + subjunctive',
      explanation: 'To say it is better for someone to do something, use es mejor que followed by the present subjunctive: es mejor que hagas ejercicio. The subjunctive appears whenever the subject of the second clause differs.',
      table: [
        ['Spanish', 'English'],
        ['Es mejor que comas frutas.', 'It is better that you eat fruits.'],
        ['Es mejor que bebas mucha agua.', 'It is better that you drink lots of water.'],
        ['Es mejor que descanses hoy.', 'It is better that you rest today.']
      ],
      examples: [
        { es: 'Es mejor que hagas ejercicio por la mañana.', trans: 'es meh-HOR keh AH-gas eh-hehr-SEE-syo por la ma-NYA-na', en: 'It is better for you to exercise in the morning.' },
        { es: 'Es mejor que duermas antes de las once.', trans: 'es meh-HOR keh DWER-mas AN-tes deh las ON-seh', en: 'It is better that you sleep before eleven.' }
      ]
    },
    {
      topic: 'Reflexive daily verbs',
      explanation: 'Many health verbs are reflexive because the action returns to the person: dormirse (to fall asleep), moverse (to move), cuidarse (to take care of oneself). The reflexive pronoun rides in front or attaches to the infinitive.',
      table: [
        ['Verb', 'Spanish', 'English'],
        ['moverse', 'Me muevo cada tarde.', 'I move every afternoon.'],
        ['cuidarse', 'Me cuido mucho.', 'I take good care of myself.'],
        ['enfermarse', 'Él se enfermó anoche.', 'He got sick last night.']
      ],
      examples: [
        { es: 'Me muevo aunque solo sea un poco.', trans: 'meh MWEH-bo awn-keh SO-lo SEH-a oon PO-ko', en: 'I move even if it is only a little.' },
        { es: 'Cuídate y descansa hoy.', trans: 'KWEE-dah-teh ee des-KAN-sa oy', en: 'Take care of yourself and rest today.' }
      ]
    }
  ],
  vocabulary: [
    { id: 'u23-salud', es: 'salud', translit: 'sah-LOOD', en: 'health', pos: 'noun', gender: 'f' },
    { id: 'u23-cuerpo', es: 'cuerpo', translit: 'KWER-po', en: 'body', pos: 'noun', gender: 'm' },
    { id: 'u23-ejercicio', es: 'ejercicio', translit: 'eh-hehr-SEE-syo', en: 'exercise', pos: 'noun', gender: 'm' },
    { id: 'u23-dieta', es: 'dieta', translit: 'DYEH-tah', en: 'diet', pos: 'noun', gender: 'f' },
    { id: 'u23-habito', es: 'hábito', translit: 'AH-bee-to', en: 'habit', pos: 'noun', gender: 'm' },
    { id: 'u23-sueno', es: 'sueño', translit: 'SWEH-nyo', en: 'sleep', pos: 'noun', gender: 'm' },
    { id: 'u23-dormir', es: 'dormir', translit: 'dor-MEER', en: 'to sleep', pos: 'verb' },
    { id: 'u23-descansar', es: 'descansar', translit: 'des-kan-SAR', en: 'to rest', pos: 'verb' },
    { id: 'u23-beber', es: 'beber', translit: 'beh-BEHR', en: 'to drink', pos: 'verb' },
    { id: 'u23-moverse', es: 'moverse', translit: 'mo-BER-seh', en: 'to move (your body)', pos: 'verb' },
    { id: 'u23-deber', es: 'deber', translit: 'deh-BEHR', en: 'should / ought to', pos: 'verb' },
    { id: 'u23-estres', es: 'estrés', translit: 'es-TRES', en: 'stress', pos: 'noun', gender: 'm' },
    { id: 'u23-cansado', es: 'cansado', translit: 'kan-SA-do', en: 'tired', pos: 'adjective' },
    { id: 'u23-sano', es: 'sano', translit: 'SA-no', en: 'healthy', pos: 'adjective' },
    { id: 'u23-enfermo', es: 'enfermo', translit: 'en-FER-mo', en: 'sick', pos: 'adjective' },
    { id: 'u23-medico', es: 'médico', translit: 'MEH-dee-ko', en: 'doctor', pos: 'noun', gender: 'm' }
  ],
  phrases: [
    { id: 'p-u23-1', es: 'Deberías dormir más.', trans: 'deh-beh-REE-as dor-MEER mas', en: 'You should sleep more.' },
    { id: 'p-u23-2', es: 'Es mejor que hagas ejercicio.', trans: 'es meh-HOR keh AH-gas eh-hehr-SEE-syo', en: 'It is better for you to exercise.' },
    { id: 'p-u23-3', es: '¡Cuídate!', trans: 'KWEE-dah-teh', en: 'Take care of yourself!' }
  ],
  sentences: [
    { es: 'Deberías beber más agua todos los días.', translit: 'deh-beh-REE-as beh-BEHR mas AH-gwa TO-dos los DEE-as', en: 'You should drink more water every day.', words: [{ id: 'u23-deber', es: 'Deberías', en: 'you should' }, { id: 'u23-beber', es: 'beber', en: 'to drink' }] },
    { es: 'Es mejor que hagas ejercicio por la mañana.', translit: 'es meh-HOR keh AH-gas eh-hehr-SEE-syo por la ma-NYA-na', en: 'It is better for you to exercise in the morning.', words: [{ id: 'u23-ejercicio', es: 'ejercicio', en: 'exercise' }] },
    { es: 'Duermo ocho horas y me siento sano.', translit: 'DWER-mo O-cho OH-ras ee meh SYEN-to SA-no', en: 'I sleep eight hours and I feel healthy.', words: [{ id: 'u23-dormir', es: 'Duermo', en: 'I sleep' }, { id: 'u23-sano', es: 'sano', en: 'healthy' }] },
    { es: 'Tienes mucho estrés; deberías descansar.', translit: 'TYEH-nes MOO-cho es-TRES deh-beh-REE-as des-kan-SAR', en: 'You have a lot of stress; you should rest.', words: [{ id: 'u23-estres', es: 'estrés', en: 'stress' }, { id: 'u23-deber', es: 'deberías', en: 'you should' }, { id: 'u23-descansar', es: 'descansar', en: 'to rest' }] },
    { es: 'Mi médico me dijo que la dieta es importante.', translit: 'mee MEH-dee-ko meh DEE-ho keh lah DYEH-tah es im-por-TAN-teh', en: 'My doctor told me that diet is important.', words: [{ id: 'u23-medico', es: 'médico', en: 'doctor' }, { id: 'u23-dieta', es: 'dieta', en: 'diet' }] },
    { es: 'Un buen hábito es moverse cada día.', translit: 'oon bwen AH-bee-to es mo-BER-seh KA-da DEE-a', en: 'A good habit is to move every day.', words: [{ id: 'u23-habito', es: 'hábito', en: 'habit' }, { id: 'u23-moverse', es: 'moverse', en: 'to move' }] }
  ],
  dialogue: {
    title: 'At the clinic (En el consultorio)',
    lines: [
      { who: 'Ana', es: 'Me siento muy cansada últimamente.', en: 'I feel very tired lately.' },
      { who: 'Luis', es: 'Deberías dormir más y hacer ejercicio.', en: 'You should sleep more and exercise.' },
      { who: 'Ana', es: 'También tengo mucho estrés en el trabajo.', en: 'I also have a lot of stress at work.' },
      { who: 'Luis', es: '¿Y tu dieta? Es mejor que comas frutas y verduras.', en: 'And your diet? It is better that you eat fruits and vegetables.' },
      { who: 'Ana', es: 'Tienes razón. Voy a cuidarme mejor.', en: 'You are right. I am going to take better care of myself.' }
    ],
    questions: [
      { type: 'mc-en', q: 'How does Ana feel lately?', options: ['tired', 'sick', 'angry', 'hungry'], answer: 'tired' },
      { type: 'mc-en', q: 'What does Luis say about sleep?', options: ['sleep more', 'sleep less', 'sleep at noon', 'never sleep'], answer: 'sleep more' },
      { type: 'mc-en', q: 'What should Ana eat?', options: ['fruits and vegetables', 'only bread', 'chocolate', 'nothing'], answer: 'fruits and vegetables' }
    ]
  },
  quiz: [
    { type: 'mc-en', q: '¿Qué significa «salud»?', options: ['health', 'nurse', 'hospital', 'food'], answer: 'health', es: 'salud' },
    { type: 'mc-es', q: 'How do you say to rest?', options: ['descansar', 'beber', 'dormir', 'moverse'], answer: 'descansar', es: 'descansar' },
    { type: 'typing', q: 'Type tired (masculine) in Spanish', answer: 'cansado', accepts: [], es: 'cansado' },
    { type: 'mc-en', q: '¿Qué significa «estrés»?', options: ['stress', 'strength', 'stretch', 'sport'], answer: 'stress', es: 'estrés' },
    { type: 'mc-es', q: 'Complete: Deberías ___ más agua.', options: ['beber', 'dormir', 'comer', 'moverse'], answer: 'beber', es: 'deberías beber más agua' },
    { type: 'typing', q: 'Type doctor in Spanish', answer: 'médico', accepts: [], es: 'médico' },
    { type: 'mc-en', q: '¿Qué significa «ejercicio»?', options: ['exercise', 'excitement', 'examination', 'experience'], answer: 'exercise', es: 'ejercicio' },
    { type: 'mc-es', q: 'Which verb is reflexive and means to move?', options: ['moverse', 'dormir', 'beber', 'desear'], answer: 'moverse', es: 'moverse' },
    { type: 'mc-es', q: 'Complete: Es mejor que ___ (tú) bien hoy.', options: ['comas', 'comes', 'comiste', 'comer'], answer: 'comas', es: 'es mejor que comas bien hoy' },
    { type: 'typing', q: 'Type healthy (masculine) in Spanish', answer: 'sano', accepts: [], es: 'sano' },
    { type: 'mc-en', q: '¿Qué significa «cansado»?', options: ['tired', 'crazy', 'careful', 'crowded'], answer: 'tired', es: 'cansado' },
    { type: 'typing', q: 'Type habit in Spanish', answer: 'hábito', accepts: [], es: 'hábito' }
  ],
  test: {
    title: 'Unit 23 test — Health & well-being',
    questions: [
      { type: 'mc-en', q: '¿Qué significa «Deberías descansar»?', options: ['You should rest', 'You should work', 'You should sleep', 'You should run'], answer: 'You should rest', es: 'deberías descansar' },
      { type: 'mc-es', q: 'Which is the correct advice form?', options: ['Deberías comer mejor', 'Deberías come mejor', 'Deberías comes mejor', 'Deberías comiste mejor'], answer: 'Deberías comer mejor', es: 'deberías comer mejor' },
      { type: 'typing', q: 'Type sleep (noun) in Spanish', answer: 'sueño', accepts: [], es: 'sueño' },
      { type: 'mc-en', q: '¿Qué significa «dieta»?', options: ['diet', 'dinner', 'detail', 'dessert'], answer: 'diet', es: 'dieta' },
      { type: 'mc-es', q: 'Complete: Es mejor que yo ___ (descansar) hoy.', options: ['descanse', 'descanso', 'descanses', 'descansar'], answer: 'descanse', es: 'es mejor que yo descanse hoy' },
      { type: 'typing', q: 'Type to take care of (reflexive) in Spanish', answer: 'cuidarse', accepts: [], es: 'cuidarse' },
      { type: 'mc-en', q: '¿Qué significa «médico»?', options: ['doctor', 'medicine', 'measure', 'mechanic'], answer: 'doctor', es: 'médico' },
      { type: 'mc-es', q: 'Say what you have when you run a lot.', options: ['mucho estrés', 'mucho sueño', 'mucha dieta', 'mucho cuerpo'], answer: 'mucho estrés', es: 'mucho estrés' },
      { type: 'typing', q: 'Type to drink in Spanish', answer: 'beber', accepts: [], es: 'beber' },
      { type: 'mc-en', q: '¿Qué significa «enfermo»?', options: ['sick', 'strong', 'sleepy', 'smart'], answer: 'sick', es: 'enfermo' },
      { type: 'mc-es', q: 'Complete: Un buen hábito es ___ todos los días.', options: ['moverse', 'mover', 'muevo', 'moviendo'], answer: 'moverse', es: 'un buen hábito es moverse todos los días' },
      { type: 'typing', q: 'Type body in Spanish', answer: 'cuerpo', accepts: [], es: 'cuerpo' }
    ]
  }
};