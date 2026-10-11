// Unit 16 — The preterite: completed past. A2.
export const unit = {
  id: 'u16',
  level: 'A2',
  number: 16,
  title: 'The preterite: completed past',
  titleEs: 'El pretérito',
  story: 'You just got back from a weekend in Old San Juan and everyone asks «¿Qué hiciste?». In this unit you learn to talk about finished actions: what you did, where you went and what you ate. The preterite is the tense for actions that are done and over.',
  grammar: [
    {
      topic: 'Regular -ar verbs in the preterite',
      explanation: 'For -ar verbs, drop -ar and add the endings é, aste, ó, amos, aron. The yo and usted/él/ella forms carry a written accent. Use this tense for a finished action: something that happened and is complete.',
      table: [
        ['Person', 'hablar (to speak)', 'English'],
        ['yo', 'hablé', 'I spoke'],
        ['tú', 'hablaste', 'you spoke'],
        ['usted / él / ella', 'habló', 'you / he / she spoke'],
        ['nosotros', 'hablamos', 'we spoke'],
        ['ustedes / ellos', 'hablaron', 'you all / they spoke']
      ],
      examples: [
        { es: 'Ayer hablé con mi abuela.', trans: 'ah-YER ah-BLEH kon mee ah-BWEH-lah', en: 'Yesterday I spoke with my grandmother.' },
        { es: 'Ellos bailaron toda la noche.', trans: 'EH-yos bah-LAH-ron TO-dah lah NO-cheh', en: 'They danced all night.' }
      ]
    },
    {
      topic: 'Regular -er and -ir verbs',
      explanation: 'In the preterite, -er and -ir verbs share exactly the same endings: í, iste, ió, imos, ieron. Again the yo and usted/él/ella forms have an accent on the final vowel.',
      table: [
        ['Person', 'comer (to eat)', 'vivir (to live)', 'English'],
        ['yo', 'comí', 'viví', 'I ate / I lived'],
        ['tú', 'comiste', 'viviste', 'you ate / you lived'],
        ['usted / él / ella', 'comió', 'vivió', 'you / he / she ate / lived'],
        ['nosotros', 'comimos', 'vivimos', 'we ate / we lived'],
        ['ustedes / ellos', 'comieron', 'vivieron', 'you all / they ate / lived']
      ],
      examples: [
        { es: 'Anoche comí mofongo.', trans: 'ah-NO-cheh ko-MEE mo-FON-go', en: 'Last night I ate mofongo.' },
        { es: 'Viví en Ponce por dos años.', trans: 'vee-VEE en PON-seh por dos AH-nyos', en: 'I lived in Ponce for two years.' }
      ]
    },
    {
      topic: 'Five must-know irregulars',
      explanation: 'ir and ser share the exact same preterite forms; context tells them apart. hacer, tener and estar each change their stem. These five verbs appear constantly, so learn them by heart.',
      table: [
        ['Infinitive', 'yo', 'tú', 'usted / él / ella', 'English'],
        ['ir (to go)', 'fui', 'fuiste', 'fue', 'I went / you went / he went'],
        ['ser (to be)', 'fui', 'fuiste', 'fue', 'I was / you were / he was'],
        ['hacer (to do / make)', 'hice', 'hiciste', 'hizo', 'I did / you did / he did'],
        ['tener (to have)', 'tuve', 'tuviste', 'tuvo', 'I had / you had / he had'],
        ['estar (to be)', 'estuve', 'estuviste', 'estuvo', 'I was / you were / he was']
      ],
      examples: [
        { es: 'Fui a la playa el sábado.', trans: 'fwee ah lah PLAH-yah el SAH-bah-do', en: 'I went to the beach on Saturday.' },
        { es: 'Hice mi tarea anoche.', trans: 'EE-seh mee tah-REH-ah ah-NO-cheh', en: 'I did my homework last night.' }
      ]
    },
    {
      topic: 'Time markers for finished actions',
      explanation: 'These words signal the preterite because they point to a moment that is already over: ayer, anoche, anteayer, la semana pasada, el año pasado.',
      table: [
        ['Spanish', 'English'],
        ['ayer', 'yesterday'],
        ['anoche', 'last night'],
        ['anteayer', 'the day before yesterday'],
        ['la semana pasada', 'last week'],
        ['el año pasado', 'last year']
      ],
      examples: [
        { es: 'La semana pasada viajé a Ponce.', trans: 'lah seh-MAH-nah pah-SAH-dah byah-HEH ah PON-seh', en: 'Last week I traveled to Ponce.' },
        { es: 'Anteayer estuve en la casa de Ana.', trans: 'an-teh-AH-yer es-TOO-beh en lah KAH-sah deh AH-nah', en: 'The day before yesterday I was at the house of Ana.' }
      ]
    }
  ],
  vocabulary: [
    { id: 'u16-ayer', es: 'ayer', translit: 'ah-YER', en: 'yesterday', pos: 'adverb' },
    { id: 'u16-anoche', es: 'anoche', translit: 'ah-NO-cheh', en: 'last night', pos: 'adverb' },
    { id: 'u16-anteayer', es: 'anteayer', translit: 'an-teh-AH-yer', en: 'the day before yesterday', pos: 'adverb' },
    { id: 'u16-hablar', es: 'hablar', translit: 'ah-BLAR', en: 'to speak / to talk', pos: 'verb' },
    { id: 'u16-comer', es: 'comer', translit: 'ko-MER', en: 'to eat', pos: 'verb' },
    { id: 'u16-vivir', es: 'vivir', translit: 'vee-VEER', en: 'to live', pos: 'verb' },
    { id: 'u16-ir', es: 'ir', translit: 'eer', en: 'to go', pos: 'verb' },
    { id: 'u16-ser', es: 'ser', translit: 'ser', en: 'to be (permanent)', pos: 'verb' },
    { id: 'u16-hacer', es: 'hacer', translit: 'ah-SER', en: 'to do / to make', pos: 'verb' },
    { id: 'u16-tener', es: 'tener', translit: 'teh-NER', en: 'to have', pos: 'verb' },
    { id: 'u16-estar', es: 'estar', translit: 'es-TAR', en: 'to be (state)', pos: 'verb' },
    { id: 'u16-fui', es: 'fui', translit: 'fwee', en: 'I went / I was', pos: 'verb' },
    { id: 'u16-hice', es: 'hice', translit: 'EE-seh', en: 'I did / I made', pos: 'verb' },
    { id: 'u16-tuve', es: 'tuve', translit: 'TOO-beh', en: 'I had', pos: 'verb' },
    { id: 'u16-estuve', es: 'estuve', translit: 'es-TOO-beh', en: 'I was', pos: 'verb' },
    { id: 'u16-lasemanapasada', es: 'la semana pasada', translit: 'lah seh-MAH-nah pah-SAH-dah', en: 'last week', pos: 'phrase' },
    { id: 'u16-elanopasado', es: 'el año pasado', translit: 'el AH-nyo pah-SAH-do', en: 'last year', pos: 'phrase' },
    { id: 'u16-viaje', es: 'viaje', translit: 'BYAH-heh', en: 'trip / journey', pos: 'noun', gender: 'm' },
    { id: 'u16-fiesta', es: 'fiesta', translit: 'FYEHS-tah', en: 'party', pos: 'noun', gender: 'f' },
    { id: 'u16-playa', es: 'playa', translit: 'PLAH-yah', en: 'beach', pos: 'noun', gender: 'f' },
    { id: 'u16-comida', es: 'comida', translit: 'ko-MEE-dah', en: 'food / meal', pos: 'noun', gender: 'f' },
    { id: 'u16-tarea', es: 'tarea', translit: 'tah-REH-ah', en: 'homework / task', pos: 'noun', gender: 'f' },
    { id: 'u16-amigo', es: 'amigo', translit: 'ah-MEE-go', en: 'friend', pos: 'noun', gender: 'm' },
    { id: 'u16-casa', es: 'casa', translit: 'KAH-sah', en: 'house / home', pos: 'noun', gender: 'f' }
  ],
  phrases: [
    { id: 'p-u16-1', es: '¿Qué hiciste ayer?', trans: 'keh EE-sees-teh ah-YER', en: 'What did you do yesterday?' },
    { id: 'p-u16-2', es: 'Fui a la playa.', trans: 'fwee ah lah PLAH-yah', en: 'I went to the beach.' },
    { id: 'p-u16-3', es: 'Lo pasé muy bien.', trans: 'lo pah-SEH mwee BYEN', en: 'I had a great time.' }
  ],
  sentences: [
    { es: 'Ayer hablé con mi abuela por teléfono.', translit: 'ah-YER ah-BLEH kon mee ah-BWEH-lah por teh-LEH-fo-no', en: 'Yesterday I spoke with my grandmother on the phone.', words: [{ id: 'u16-ayer', es: 'Ayer', en: 'yesterday' }, { id: 'u16-hablar', es: 'hablé', en: 'I spoke' }] },
    { es: 'Anoche comí mofongo en un restaurante.', translit: 'ah-NO-cheh ko-MEE mo-FON-go en oon res-tow-RAN-teh', en: 'Last night I ate mofongo in a restaurant.', words: [{ id: 'u16-anoche', es: 'Anoche', en: 'last night' }, { id: 'u16-comer', es: 'comí', en: 'I ate' }] },
    { es: 'La semana pasada hice mi tarea.', translit: 'lah seh-MAH-nah pah-SAH-dah EE-seh mee tah-REH-ah', en: 'Last week I did my homework.', words: [{ id: 'u16-lasemanapasada', es: 'La semana pasada', en: 'last week' }, { id: 'u16-hacer', es: 'hice', en: 'I did' }, { id: 'u16-tarea', es: 'tarea', en: 'homework' }] },
    { es: 'Fui a la playa con mis amigos.', translit: 'fwee ah lah PLAH-yah kon mees ah-MEE-gos', en: 'I went to the beach with my friends.', words: [{ id: 'u16-fui', es: 'Fui', en: 'I went' }, { id: 'u16-playa', es: 'playa', en: 'beach' }, { id: 'u16-amigo', es: 'amigos', en: 'friends' }] },
    { es: 'Tuve una fiesta en mi casa.', translit: 'TOO-beh OO-nah FYEHS-tah en mee KAH-sah', en: 'I had a party at my house.', words: [{ id: 'u16-tuve', es: 'Tuve', en: 'I had' }, { id: 'u16-fiesta', es: 'fiesta', en: 'party' }, { id: 'u16-casa', es: 'casa', en: 'house' }] },
    { es: 'Estuve en San Juan el año pasado.', translit: 'es-TOO-beh en san HWAHN el AH-nyo pah-SAH-do', en: 'I was in San Juan last year.', words: [{ id: 'u16-estuve', es: 'Estuve', en: 'I was' }, { id: 'u16-elanopasado', es: 'el año pasado', en: 'last year' }] }
  ],
  dialogue: {
    title: '¿Qué hiciste ayer? (What did you do yesterday?)',
    lines: [
      { who: 'Ana', es: '¿Qué hiciste ayer, Luis?', en: 'What did you do yesterday, Luis?' },
      { who: 'Luis', es: 'Fui a la playa con mi familia.', en: 'I went to the beach with my family.' },
      { who: 'Ana', es: '¡Qué rico! ¿Y qué comieron?', en: 'How nice! And what did you all eat?' },
      { who: 'Luis', es: 'Comimos arroz con gandules. Estuvo delicioso.', en: 'We ate rice with pigeon peas. It was delicious.' },
      { who: 'Ana', es: 'Yo hice mi tarea y luego hablé con mi abuela.', en: 'I did my homework and then I spoke with my grandmother.' }
    ],
    questions: [
      { type: 'mc-en', q: '¿Adónde fue Luis?', options: ['a la playa', 'al cine', 'al parque', 'a la casa de Ana'], answer: 'a la playa' },
      { type: 'mc-en', q: '¿Qué comieron?', options: ['arroz con gandules', 'mofongo', 'pizza', 'tostones'], answer: 'arroz con gandules' },
      { type: 'mc-en', q: '¿Qué hizo Ana?', options: ['hizo su tarea', 'fue a la playa', 'comió mucho', 'fue al cine'], answer: 'hizo su tarea' }
    ]
  },
  quiz: [
    { type: 'mc-en', q: '¿Qué significa «ayer»?', options: ['yesterday', 'today', 'tomorrow', 'last night'], answer: 'yesterday', es: 'ayer' },
    { type: 'mc-en', q: '¿Qué significa «anoche»?', options: ['last night', 'yesterday', 'this morning', 'tomorrow'], answer: 'last night', es: 'anoche' },
    { type: 'mc-es', q: 'How do you say I spoke?', options: ['hablé', 'hablo', 'hablar', 'habló'], answer: 'hablé', es: 'hablé' },
    { type: 'mc-es', q: 'Say I ate.', options: ['comí', 'como', 'comer', 'comió'], answer: 'comí', es: 'comí' },
    { type: 'mc-en', q: '¿Qué significa «hice»?', options: ['I did / I made', 'I do', 'I will do', 'I go'], answer: 'I did / I made', es: 'hice' },
    { type: 'mc-en', q: '¿Qué significa «fui»?', options: ['I went / I was', 'I am', 'I go', 'I will go'], answer: 'I went / I was', es: 'fui' },
    { type: 'typing', q: 'Type yesterday in Spanish', answer: 'ayer', accepts: [], es: 'ayer' },
    { type: 'typing', q: 'Type I had in Spanish', answer: 'tuve', accepts: [], es: 'tuve' },
    { type: 'mc-es', q: 'Choose the preterite form: I was (estar).', options: ['estuve', 'estoy', 'estar', 'estuvo'], answer: 'estuve', es: 'estuve' },
    { type: 'mc-en', q: '¿Qué significa «la semana pasada»?', options: ['last week', 'next week', 'this week', 'every week'], answer: 'last week', es: 'la semana pasada' },
    { type: 'mc-es', q: 'Say I went to the beach.', options: ['Fui a la playa', 'Voy a la playa', 'Ir a la playa', 'Iba a la playa'], answer: 'Fui a la playa', es: 'Fui a la playa' },
    { type: 'mc-en', q: '¿Qué significa «hacer»?', options: ['to do / to make', 'to have', 'to be', 'to go'], answer: 'to do / to make', es: 'hacer' }
  ],
  test: {
    title: 'Unit 16 test — The preterite',
    questions: [
      { type: 'mc-en', q: '¿Qué significa «anteayer»?', options: ['the day before yesterday', 'yesterday', 'last night', 'tomorrow'], answer: 'the day before yesterday', es: 'anteayer' },
      { type: 'mc-es', q: 'Say they spoke.', options: ['hablaron', 'hablan', 'hablar', 'habló'], answer: 'hablaron', es: 'hablaron' },
      { type: 'typing', q: 'Type I went in Spanish', answer: 'fui', accepts: [], es: 'fui' },
      { type: 'typing', q: 'Type last night in Spanish', answer: 'anoche', accepts: [], es: 'anoche' },
      { type: 'mc-en', q: '¿Qué significa «tuve»?', options: ['I had', 'I have', 'I will have', 'I go'], answer: 'I had', es: 'tuve' },
      { type: 'mc-es', q: 'Say we ate.', options: ['comimos', 'comemos', 'comieron', 'comía'], answer: 'comimos', es: 'comimos' },
      { type: 'mc-es', q: 'Which verb means to live?', options: ['vivir', 'hablar', 'comer', 'tener'], answer: 'vivir', es: 'vivir' },
      { type: 'mc-en', q: '¿Qué significa «el año pasado»?', options: ['last year', 'next year', 'this year', 'the past'], answer: 'last year', es: 'el año pasado' },
      { type: 'mc-es', q: 'Complete: Ayer ___ con mi abuela.', options: ['hablé', 'hablo', 'hablar', 'hablando'], answer: 'hablé', es: 'hablé' },
      { type: 'mc-en', q: '¿Qué significa «estuve»?', options: ['I was', 'I am', 'I go', 'I had'], answer: 'I was', es: 'estuve' },
      { type: 'typing', q: 'Type I did / made in Spanish', answer: 'hice', accepts: [], es: 'hice' },
      { type: 'mc-es', q: 'Say last week.', options: ['la semana pasada', 'la semana próxima', 'el año pasado', 'anteayer'], answer: 'la semana pasada', es: 'la semana pasada' }
    ]
  }
};
