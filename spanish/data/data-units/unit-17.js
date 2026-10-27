// Unit 17 — The imperfect: describing the past. A2.
export const unit = {
  id: 'u17',
  level: 'A2',
  number: 17,
  title: 'The imperfect: describing the past',
  titleEs: 'El imperfecto',
  story: 'Your host family in Puerto Rico shows you old photos and asks «¿Cómo eras de niño?». To answer, you need the imperfect: the tense for habits, descriptions and things that were happening. It is how you say I used to, I was and I was doing something.',
  grammar: [
    {
      topic: 'What the imperfect is for',
      explanation: 'Use the imperfect to describe the past, not to finish an action. It covers habits (siempre jugaba), descriptions (era alto), ongoing actions (estaba comiendo), and even age and clock time in the past (tenía diez años, eran las tres).',
      table: [
        ['Idea', 'Example', 'English'],
        ['Habit', 'Siempre jugaba en la playa.', 'I always used to play at the beach.'],
        ['Description', 'Mi casa era pequeña.', 'My house was small.'],
        ['Ongoing action', 'Estaba estudiando.', 'I was studying.'],
        ['Age', 'Tenía diez años.', 'I was ten years old.'],
        ['Clock time', 'Eran las tres.', 'It was three o clock.']
      ],
      examples: [
        { es: 'Cuando era niño, vivía en Ponce.', trans: 'KWAN-do EH-rah NEE-nyo vee-VEE-ah en PON-seh', en: 'When I was a boy, I lived in Ponce.' },
        { es: 'Eran las tres de la tarde.', trans: 'EH-ran las tres deh lah TAR-deh', en: 'It was three in the afternoon.' }
      ]
    },
    {
      topic: '-ar verbs: the -aba endings',
      explanation: 'For -ar verbs, drop -ar and add aba, abas, aba, ábamos, aban. Notice that yo and usted/él/ella look the same, so a pronoun often makes the meaning clear.',
      table: [
        ['Person', 'jugar (to play)', 'estudiar (to study)', 'English'],
        ['yo', 'jugaba', 'estudiaba', 'I played / used to play'],
        ['tú', 'jugabas', 'estudiabas', 'you played'],
        ['usted / él / ella', 'jugaba', 'estudiaba', 'you / he / she played'],
        ['nosotros', 'jugábamos', 'estudiábamos', 'we played'],
        ['ustedes / ellos', 'jugaban', 'estudiaban', 'you all / they played']
      ],
      examples: [
        { es: 'Mi abuela siempre cantaba en la cocina.', trans: 'mee ah-BWEH-lah SYEM-pre kan-TAH-bah en lah ko-KEE-nah', en: 'My grandmother always used to sing in the kitchen.' },
        { es: 'Nosotros jugábamos en la calle.', trans: 'no-SO-tros hoo-GAH-bah-mos en lah KAH-yeh', en: 'We used to play in the street.' }
      ]
    },
    {
      topic: '-er and -ir verbs: the -ía endings',
      explanation: 'For -er and -ir verbs, add ía, ías, ía, íamos, ían. Every stressed form has a written accent on the i.',
      table: [
        ['Person', 'comer (to eat)', 'vivir (to live)', 'English'],
        ['yo', 'comía', 'vivía', 'I ate / used to eat'],
        ['tú', 'comías', 'vivías', 'you ate'],
        ['usted / él / ella', 'comía', 'vivía', 'you / he / she ate'],
        ['nosotros', 'comíamos', 'vivíamos', 'we ate'],
        ['ustedes / ellos', 'comían', 'vivían', 'you all / they ate']
      ],
      examples: [
        { es: 'Mientras estudiaba, mi hermano veía la televisión.', trans: 'MYEN-tras es-too-DYAH-bah mee er-MAH-no BEH-ee-ah lah teh-leh-vee-SYON', en: 'While I was studying, my brother was watching television.' },
        { es: 'Todos los días comíamos arroz.', trans: 'TO-dos los DEE-as ko-MEE-ah-mos ah-ROS', en: 'Every day we used to eat rice.' }
      ]
    },
    {
      topic: 'Three irregulars: ir, ser, ver',
      explanation: 'Only three verbs are irregular in the imperfect, and they are everywhere: ir (iba), ser (era) and ver (veía). Note that era and iba have no written accents.',
      table: [
        ['Infinitive', 'yo', 'tú', 'usted / él / ella', 'English'],
        ['ir (to go)', 'iba', 'ibas', 'iba', 'I used to go'],
        ['ser (to be)', 'era', 'eras', 'era', 'I used to be'],
        ['ver (to see)', 'veía', 'veías', 'veía', 'I used to see / watch']
      ],
      examples: [
        { es: 'Todos los días iba a la escuela.', trans: 'TO-dos los DEE-as EE-bah ah lah es-KWEH-lah', en: 'Every day I used to go to school.' },
        { es: 'Mi casa era pequeña pero feliz.', trans: 'mee KAH-sah EH-rah peh-KEH-nyah PEH-ro feh-LEES', en: 'My house was small but happy.' }
      ]
    }
  ],
  vocabulary: [
    { id: 'u17-cuando', es: 'cuando', translit: 'KWAN-do', en: 'when', pos: 'conjunction' },
    { id: 'u17-mientras', es: 'mientras', translit: 'MYEN-tras', en: 'while', pos: 'conjunction' },
    { id: 'u17-siempre', es: 'siempre', translit: 'SYEM-pre', en: 'always', pos: 'adverb' },
    { id: 'u17-nunca', es: 'nunca', translit: 'NOON-kah', en: 'never', pos: 'adverb' },
    { id: 'u17-antes', es: 'antes', translit: 'AN-tes', en: 'before / in the past', pos: 'adverb' },
    { id: 'u17-todoslosdias', es: 'todos los días', translit: 'TO-dos los DEE-as', en: 'every day', pos: 'phrase' },
    { id: 'u17-jugar', es: 'jugar', translit: 'hoo-GAR', en: 'to play', pos: 'verb' },
    { id: 'u17-bailar', es: 'bailar', translit: 'by-LAR', en: 'to dance', pos: 'verb' },
    { id: 'u17-cantar', es: 'cantar', translit: 'kan-TAR', en: 'to sing', pos: 'verb' },
    { id: 'u17-estudiar', es: 'estudiar', translit: 'es-too-DYAR', en: 'to study', pos: 'verb' },
    { id: 'u17-trabajar', es: 'trabajar', translit: 'trah-bah-HAR', en: 'to work', pos: 'verb' },
    { id: 'u17-vivir', es: 'vivir', translit: 'vee-VEER', en: 'to live', pos: 'verb' },
    { id: 'u17-ver', es: 'ver', translit: 'ber', en: 'to see / to watch', pos: 'verb' },
    { id: 'u17-tenia', es: 'tenía', translit: 'teh-NEE-ah', en: 'I used to have / I had', pos: 'verb' },
    { id: 'u17-era', es: 'era', translit: 'EH-rah', en: 'I used to be / I was', pos: 'verb' },
    { id: 'u17-iba', es: 'iba', translit: 'EE-bah', en: 'I used to go / I was going', pos: 'verb' },
    { id: 'u17-nino', es: 'niño', translit: 'NEE-nyo', en: 'child / boy', pos: 'noun', gender: 'm' },
    { id: 'u17-ano', es: 'año', translit: 'AH-nyo', en: 'year', pos: 'noun', gender: 'm' },
    { id: 'u17-abuela', es: 'abuela', translit: 'ah-BWEH-lah', en: 'grandmother', pos: 'noun', gender: 'f' },
    { id: 'u17-hermano', es: 'hermano', translit: 'er-MAH-no', en: 'brother', pos: 'noun', gender: 'm' },
    { id: 'u17-casa', es: 'casa', translit: 'KAH-sah', en: 'house / home', pos: 'noun', gender: 'f' },
    { id: 'u17-playa', es: 'playa', translit: 'PLAH-yah', en: 'beach', pos: 'noun', gender: 'f' },
    { id: 'u17-television', es: 'televisión', translit: 'teh-leh-vee-SYON', en: 'television', pos: 'noun', gender: 'f' },
    { id: 'u17-escuela', es: 'escuela', translit: 'es-KWEH-lah', en: 'school', pos: 'noun', gender: 'f' },
    { id: 'u17-diez', es: 'diez', translit: 'dyehs', en: 'ten', pos: 'numeral' }
  ],
  phrases: [
    { id: 'p-u17-1', es: 'Cuando era niño...', trans: 'KWAN-do EH-rah NEE-nyo', en: 'When I was a child...' },
    { id: 'p-u17-2', es: 'Todos los días...', trans: 'TO-dos los DEE-as', en: 'Every day...' },
    { id: 'p-u17-3', es: 'Antes vivíamos en Ponce.', trans: 'AN-tes vee-VEE-ah-mos en PON-seh', en: 'We used to live in Ponce.' }
  ],
  sentences: [
    { es: 'Cuando era niño, jugaba en la playa todos los días.', translit: 'KWAN-do EH-rah NEE-nyo hoo-GAH-bah en lah PLAH-yah TO-dos los DEE-as', en: 'When I was a boy, I used to play at the beach every day.', words: [{ id: 'u17-cuando', es: 'Cuando', en: 'when' }, { id: 'u17-nino', es: 'niño', en: 'boy' }, { id: 'u17-jugar', es: 'jugaba', en: 'I used to play' }, { id: 'u17-playa', es: 'playa', en: 'beach' }, { id: 'u17-todoslosdias', es: 'todos los días', en: 'every day' }] },
    { es: 'Mi abuela siempre cantaba en la cocina.', translit: 'mee ah-BWEH-lah SYEM-pre kan-TAH-bah en lah ko-KEE-nah', en: 'My grandmother always used to sing in the kitchen.', words: [{ id: 'u17-abuela', es: 'abuela', en: 'grandmother' }, { id: 'u17-siempre', es: 'siempre', en: 'always' }, { id: 'u17-cantar', es: 'cantaba', en: 'used to sing' }] },
    { es: 'Mientras estudiaba, mi hermano veía la televisión.', translit: 'MYEN-tras es-too-DYAH-bah mee er-MAH-no BEH-ee-ah lah teh-leh-vee-SYON', en: 'While I was studying, my brother was watching television.', words: [{ id: 'u17-mientras', es: 'Mientras', en: 'while' }, { id: 'u17-estudiar', es: 'estudiaba', en: 'I was studying' }, { id: 'u17-hermano', es: 'hermano', en: 'brother' }, { id: 'u17-ver', es: 'veía', en: 'was watching' }, { id: 'u17-television', es: 'televisión', en: 'television' }] },
    { es: 'Tenía diez años cuando vivía en Ponce.', translit: 'teh-NEE-ah dyes AH-nyos KWAN-do vee-VEE-ah en PON-seh', en: 'I was ten years old when I lived in Ponce.', words: [{ id: 'u17-tenia', es: 'Tenía', en: 'I had / I was' }, { id: 'u17-diez', es: 'diez', en: 'ten' }, { id: 'u17-vivir', es: 'vivía', en: 'I lived' }] },
    { es: 'Eran las tres de la tarde.', translit: 'EH-ran las tres deh lah TAR-deh', en: 'It was three in the afternoon.', words: [{ id: 'u17-era', es: 'Eran', en: 'they were / it was' }] },
    { es: 'Todos los días iba a la escuela.', translit: 'TO-dos los DEE-as EE-bah ah lah es-KWEH-lah', en: 'Every day I used to go to school.', words: [{ id: 'u17-todoslosdias', es: 'Todos los días', en: 'every day' }, { id: 'u17-iba', es: 'iba', en: 'I used to go' }, { id: 'u17-escuela', es: 'escuela', en: 'school' }] }
  ],
  dialogue: {
    title: 'Fotos de la infancia (Childhood photos)',
    lines: [
      { who: 'Señora Ruiz', es: 'Mira, aquí teníamos una casa pequeña en Ponce.', en: 'Look, here we had a small house in Ponce.' },
      { who: 'Carlos', es: '¿Cómo era la casa?', en: 'What was the house like?' },
      { who: 'Señora Ruiz', es: 'Era pequeña pero muy bonita. Mi madre siempre cantaba.', en: 'It was small but very pretty. My mother always used to sing.' },
      { who: 'Carlos', es: '¿Y ustedes jugaban en la calle?', en: 'And did you all use to play in the street?' },
      { who: 'Señora Ruiz', es: 'Sí, jugábamos todos los días. Yo tenía diez años.', en: 'Yes, we used to play every day. I was ten years old.' },
      { who: 'Carlos', es: '¡Qué recuerdos tan lindos!', en: 'What lovely memories!' }
    ],
    questions: [
      { type: 'mc-en', q: '¿Dónde estaba la casa?', options: ['en Ponce', 'en San Juan', 'en la playa', 'en la escuela'], answer: 'en Ponce' },
      { type: 'mc-en', q: '¿Cómo era la casa?', options: ['pequeña pero bonita', 'grande y moderna', 'vieja y fea', 'alta y blanca'], answer: 'pequeña pero bonita' },
      { type: 'mc-en', q: '¿Cuántos años tenía la señora?', options: ['diez', 'ocho', 'quince', 'veinte'], answer: 'diez' }
    ]
  },
  quiz: [
    { type: 'mc-en', q: '¿Qué significa «siempre»?', options: ['always', 'never', 'sometimes', 'later'], answer: 'always', es: 'siempre' },
    { type: 'mc-en', q: '¿Qué significa «nunca»?', options: ['never', 'always', 'then', 'before'], answer: 'never', es: 'nunca' },
    { type: 'mc-es', q: 'How do you say I used to play (jugar)?', options: ['jugaba', 'jugué', 'juego', 'jugar'], answer: 'jugaba', es: 'jugaba' },
    { type: 'mc-es', q: 'How do you say I used to be (ser)?', options: ['era', 'fui', 'soy', 'ser'], answer: 'era', es: 'era' },
    { type: 'mc-en', q: '¿Qué significa «mientras»?', options: ['while', 'when', 'because', 'after'], answer: 'while', es: 'mientras' },
    { type: 'mc-es', q: 'Which is the imperfect of ir?', options: ['iba', 'voy', 'fui', 'iré'], answer: 'iba', es: 'iba' },
    { type: 'typing', q: 'Type always in Spanish', answer: 'siempre', accepts: [], es: 'siempre' },
    { type: 'typing', q: 'Type every day in Spanish (three words)', answer: 'todos los dias', accepts: ['todos los días'], es: 'todos los días' },
    { type: 'mc-en', q: '¿Qué significa «tenía»?', options: ['I used to have', 'I have', 'I will have', 'I had to'], answer: 'I used to have', es: 'tenía' },
    { type: 'mc-en', q: '¿Qué significa «casa»?', options: ['house', 'school', 'street', 'beach'], answer: 'house', es: 'casa' },
    { type: 'mc-es', q: 'Say it was three o clock.', options: ['Eran las tres', 'Son las tres', 'Fueron las tres', 'Es la tres'], answer: 'Eran las tres', es: 'Eran las tres' },
    { type: 'mc-en', q: '¿Qué significa «abuela»?', options: ['grandmother', 'grandfather', 'mother', 'aunt'], answer: 'grandmother', es: 'abuela' }
  ],
  test: {
    title: 'Unit 17 test — The imperfect',
    questions: [
      { type: 'mc-en', q: '¿Qué significa «antes»?', options: ['before / in the past', 'after', 'later', 'now'], answer: 'before / in the past', es: 'antes' },
      { type: 'mc-es', q: 'Say we used to eat.', options: ['comíamos', 'comimos', 'comemos', 'comieron'], answer: 'comíamos', es: 'comíamos' },
      { type: 'typing', q: 'Type while in Spanish', answer: 'mientras', accepts: [], es: 'mientras' },
      { type: 'typing', q: 'Type ten in Spanish', answer: 'diez', accepts: [], es: 'diez' },
      { type: 'mc-en', q: '¿Qué significa «iba»?', options: ['I used to go', 'I go', 'I went', 'I will go'], answer: 'I used to go', es: 'iba' },
      { type: 'mc-es', q: 'Which is the imperfect of ver?', options: ['veía', 'vi', 'veo', 'veré'], answer: 'veía', es: 'veía' },
      { type: 'mc-es', q: 'Which verb means to study?', options: ['estudiar', 'trabajar', 'cantar', 'bailar'], answer: 'estudiar', es: 'estudiar' },
      { type: 'mc-en', q: '¿Qué significa «niño»?', options: ['child / boy', 'man', 'girl', 'friend'], answer: 'child / boy', es: 'niño' },
      { type: 'mc-es', q: 'Complete: Cuando ___ niño, vivía en Ponce.', options: ['era', 'fui', 'soy', 'estar'], answer: 'era', es: 'era' },
      { type: 'mc-en', q: '¿Qué significa «televisión»?', options: ['television', 'telephone', 'radio', 'screen'], answer: 'television', es: 'televisión' },
      { type: 'typing', q: 'Type school in Spanish', answer: 'escuela', accepts: [], es: 'escuela' },
      { type: 'mc-es', q: 'Say we used to live.', options: ['vivíamos', 'vivimos', 'vivieron', 'viven'], answer: 'vivíamos', es: 'vivíamos' }
    ]
  }
};
