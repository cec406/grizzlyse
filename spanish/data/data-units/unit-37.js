// Unit 37 — Reported speech. B2.
export const unit = {
  id: 'u37',
  level: 'B2',
  number: 37,
  title: 'Reported speech',
  titleEs: 'El discurso indirecto',
  story: 'Someone tells you a secret and later you need to pass it on: «Ana dijo que estaba enferma». Reporting what other people said is one of the most useful skills in real conversation. In this unit you learn to shift the tense, the pronouns and the time words, so your gossip is always accurate.',
  grammar: [
    {
      topic: 'decir que and contar que',
      explanation: 'To report a statement, use decir que or contar que. decir is neutral (to say); contar adds the idea of telling a story to someone (to tell). The word que is always needed before the reported clause.',
      table: [
        ['Direct', 'Reported', 'English'],
        ['«Estoy cansada.»', 'Dijo que estaba cansada.', 'She said she was tired.'],
        ['«Vivo en Ponce.»', 'Contó que vivía en Ponce.', 'He told that he lived in Ponce.'],
        ['«Vendré mañana.»', 'Dijo que vendría al día siguiente.', 'She said she would come the next day.'],
        ['«No sé nada.»', 'Afirmó que no sabía nada.', 'He claimed he did not know anything.']
      ],
      examples: [
        { es: 'Ana dijo que estaba muy cansada.', trans: 'AH-nah DEE-ho keh es-TAH-bah mwee kan-SAH-dah', en: 'Ana said that she was very tired.' },
        { es: 'María contó que había visto un tiburón.', trans: 'mah-REE-ah kon-TO keh ah-BEE-ah VEES-to oon tee-boo-RON', en: 'María told that she had seen a shark.' }
      ]
    },
    {
      topic: 'Backshift: moving the tense back',
      explanation: 'When the main verb is in the past, the verb inside the report moves one step back. Present becomes imperfect, preterite becomes past perfect, and future becomes conditional.',
      table: [
        ['Original tense', 'Reported tense', 'Example'],
        ['present', 'imperfect', 'tengo -> tenía'],
        ['preterite', 'past perfect', 'vi -> había visto'],
        ['future', 'conditional', 'iré -> iría'],
        ['present perfect', 'past perfect', 'he visto -> había visto']
      ],
      examples: [
        { es: 'Dijo que tenía hambre y que comería después.', trans: 'DEE-ho keh teh-NEE-ah AM-breh ee keh ko-meh-REE-ah des-PWES', en: 'She said she was hungry and that she would eat later.' },
        { es: 'Contaron que habían viajado a Cuba.', trans: 'kon-TAH-ron keh ah-BEE-an vyah-HAH-do ah KOO-bah', en: 'They told that they had traveled to Cuba.' }
      ]
    },
    {
      topic: 'Indirect questions and time words',
      explanation: 'To report a question, keep the question word but drop the question marks and backshift the verb: ¿Dónde estás? becomes Preguntó dónde estaba. Time words also shift: hoy to ese día, mañana to al día siguiente, aquí to allí.',
      table: [
        ['Direct', 'Indirect', 'English'],
        ['«¿Dónde estás?»', 'Preguntó dónde estaba.', 'He asked where I was.'],
        ['«¿Qué quieres?»', 'Quiso saber qué quería.', 'She wanted to know what I wanted.'],
        ['«Hoy no puedo.»', 'Dijo que ese día no podía.', 'He said he could not that day.'],
        ['«Voy mañana.»', 'Dijo que iría al día siguiente.', 'She said she would go the next day.']
      ],
      examples: [
        { es: 'Le pregunté dónde vivía y no respondió.', trans: 'leh pre-goon-TEH DON-deh vee-VEE-ah ee no res-pon-DYO', en: 'I asked him where he lived and he did not answer.' },
        { es: 'Ella explicó que ahora trabajaba en San Juan.', trans: 'EH-yah eks-plee-KO keh ah-OH-rah trah-bah-HAH-bah en san HWAHN', en: 'She explained that now she was working in San Juan.' }
      ]
    }
  ],
  vocabulary: [
    { id: 'u37-discurso', es: 'discurso', translit: 'dees-KOOR-so', en: 'speech / discourse', pos: 'noun', gender: 'm' },
    { id: 'u37-mensaje', es: 'mensaje', translit: 'men-SAH-heh', en: 'message', pos: 'noun', gender: 'm' },
    { id: 'u37-cita', es: 'cita', translit: 'SEE-tah', en: 'quote / appointment', pos: 'noun', gender: 'f' },
    { id: 'u37-fuente', es: 'fuente', translit: 'FWEN-teh', en: 'source', pos: 'noun', gender: 'f' },
    { id: 'u37-pregunta', es: 'pregunta', translit: 'pre-GOON-tah', en: 'question', pos: 'noun', gender: 'f' },
    { id: 'u37-verbo', es: 'verbo', translit: 'VER-bo', en: 'verb', pos: 'noun', gender: 'm' },
    { id: 'u37-tiempo', es: 'tiempo', translit: 'TYEM-po', en: 'tense / time / weather', pos: 'noun', gender: 'm' },
    { id: 'u37-pasado', es: 'pasado', translit: 'pah-SAH-do', en: 'past', pos: 'noun', gender: 'm' },
    { id: 'u37-presente', es: 'presente', translit: 'pre-SEN-teh', en: 'present', pos: 'noun', gender: 'm' },
    { id: 'u37-futuro', es: 'futuro', translit: 'foo-TOO-ro', en: 'future', pos: 'noun', gender: 'm' },
    { id: 'u37-antes', es: 'antes', translit: 'AN-tes', en: 'before', pos: 'adverb' },
    { id: 'u37-ahora', es: 'ahora', translit: 'ah-OH-rah', en: 'now', pos: 'adverb' },
    { id: 'u37-entonces', es: 'entonces', translit: 'en-TON-ses', en: 'then / so', pos: 'adverb' },
    { id: 'u37-segun', es: 'según', translit: 'seh-GOON', en: 'according to', pos: 'preposition' },
    { id: 'u37-citar', es: 'citar', translit: 'see-TAR', en: 'to quote / to cite', pos: 'verb' },
    { id: 'u37-contar', es: 'contar', translit: 'kon-TAR', en: 'to tell / to count', pos: 'verb' },
    { id: 'u37-decir', es: 'decir', translit: 'deh-SEER', en: 'to say / to tell', pos: 'verb' },
    { id: 'u37-afirmar', es: 'afirmar', translit: 'ah-feer-MAR', en: 'to state / to claim', pos: 'verb' },
    { id: 'u37-comentar', es: 'comentar', translit: 'ko-men-TAR', en: 'to comment', pos: 'verb' },
    { id: 'u37-explicar', es: 'explicar', translit: 'eks-plee-KAR', en: 'to explain', pos: 'verb' },
    { id: 'u37-preguntar', es: 'preguntar', translit: 'pre-goon-TAR', en: 'to ask', pos: 'verb' },
    { id: 'u37-responder', es: 'responder', translit: 'res-pon-DER', en: 'to answer', pos: 'verb' },
    { id: 'u37-mencionar', es: 'mencionar', translit: 'men-syo-NAR', en: 'to mention', pos: 'verb' },
    { id: 'u37-indirecto', es: 'indirecto', translit: 'een-dee-REK-to', en: 'indirect', pos: 'adjective' }
  ],
  phrases: [
    { id: 'p-u37-1', es: '¿Qué te dijo?', trans: 'keh teh DEE-ho', en: 'What did he tell you?' },
    { id: 'p-u37-2', es: 'Según ella, no es cierto.', trans: 'seh-GOON EH-yah no es SYER-to', en: 'According to her, it is not true.' },
    { id: 'p-u37-3', es: 'Me contó todo.', trans: 'meh kon-TO TO-do', en: 'She told me everything.' }
  ],
  sentences: [
    { es: 'Ana dijo que estaba muy cansada.', translit: 'AH-nah DEE-ho keh es-TAH-bah mwee kan-SAH-dah', en: 'Ana said that she was very tired.', words: [{ id: 'u37-decir', es: 'dijo', en: 'said' }] },
    { es: 'María contó que había visto un tiburón.', translit: 'mah-REE-ah kon-TO keh ah-BEE-ah VEES-to oon tee-boo-RON', en: 'María told that she had seen a shark.', words: [{ id: 'u37-contar', es: 'contó', en: 'told' }] },
    { es: 'El periodista afirmó que la economía mejoraría.', translit: 'el peh-ryo-DEES-tah ah-feer-MO keh lah eh-ko-no-MEE-ah meh-ho-rah-REE-ah', en: 'The journalist stated that the economy would improve.', words: [{ id: 'u37-afirmar', es: 'afirmó', en: 'stated' }] },
    { es: 'Le pregunté dónde vivía y no respondió.', translit: 'leh pre-goon-TEH DON-deh vee-VEE-ah ee no res-pon-DYO', en: 'I asked him where he lived and he did not answer.', words: [{ id: 'u37-preguntar', es: 'pregunté', en: 'I asked' }, { id: 'u37-responder', es: 'respondió', en: 'answered' }] },
    { es: 'Según la fuente, el mensaje llegó ayer.', translit: 'seh-GOON lah FWEN-teh el men-SAH-heh yeh-GO ah-YER', en: 'According to the source, the message arrived yesterday.', words: [{ id: 'u37-segun', es: 'Según', en: 'according to' }, { id: 'u37-fuente', es: 'fuente', en: 'source' }, { id: 'u37-mensaje', es: 'mensaje', en: 'message' }] },
    { es: 'Ella explicó que ahora trabajaba en San Juan.', translit: 'EH-yah eks-plee-KO keh ah-OH-rah trah-bah-HAH-bah en san HWAHN', en: 'She explained that now she was working in San Juan.', words: [{ id: 'u37-explicar', es: 'explicó', en: 'explained' }, { id: 'u37-ahora', es: 'ahora', en: 'now' }] }
  ],
  dialogue: {
    title: 'El chisme del barrio (Neighborhood gossip)',
    lines: [
      { who: 'Carmen', es: '¿Qué te dijo tu hermana?', en: 'What did your sister tell you?' },
      { who: 'José', es: 'Me dijo que estaba buscando trabajo.', en: 'She told me that she was looking for work.' },
      { who: 'Carmen', es: '¿Y tu mamá qué comentó?', en: 'And what did your mom comment?' },
      { who: 'José', es: 'Comentó que vendría a visitarnos en diciembre.', en: 'She commented that she would come to visit us in December.' },
      { who: 'Carmen', es: 'Antes decía que no podía viajar.', en: 'Before, she used to say that she could not travel.' },
      { who: 'José', es: 'Sí, pero ahora todo cambió.', en: 'Yes, but now everything changed.' }
    ],
    questions: [
      { type: 'mc-en', q: '¿Qué dijo la hermana de José?', options: ['que estaba buscando trabajo', 'que se casaba', 'que vivía en Nueva York', 'que vendía su casa'], answer: 'que estaba buscando trabajo' },
      { type: 'mc-en', q: '¿Qué comentó la mamá?', options: ['que vendría en diciembre', 'que no vendría', 'que estaba enferma', 'que trabajaba mucho'], answer: 'que vendría en diciembre' },
      { type: 'mc-en', q: '¿Qué decía antes la mamá?', options: ['que no podía viajar', 'que viajaba mucho', 'que vivía en Ponce', 'que no tenía hijos'], answer: 'que no podía viajar' }
    ]
  },
  quiz: [
    { type: 'mc-en', q: '¿Qué significa «dijo»?', options: ['he/she said', 'he/she will say', 'he/she says', 'he/she would say'], answer: 'he/she said', es: 'dijo' },
    { type: 'mc-es', q: 'How do you say according to?', options: ['según', 'entonces', 'antes', 'ahora'], answer: 'según', es: 'según' },
    { type: 'mc-en', q: '¿Qué significa «fuente»?', options: ['source', 'message', 'question', 'verb'], answer: 'source', es: 'fuente' },
    { type: 'mc-es', q: 'Which word means message?', options: ['mensaje', 'discurso', 'cita', 'pregunta'], answer: 'mensaje', es: 'mensaje' },
    { type: 'typing', q: 'Type to ask in Spanish.', answer: 'preguntar', accepts: [], es: 'preguntar' },
    { type: 'typing', q: 'Type to answer in Spanish.', answer: 'responder', accepts: [], es: 'responder' },
    { type: 'mc-en', q: '¿Qué significa «contar»?', options: ['to tell / to count', 'to ask', 'to explain', 'to mention'], answer: 'to tell / to count', es: 'contar' },
    { type: 'mc-es', q: 'Which word means now?', options: ['ahora', 'antes', 'entonces', 'según'], answer: 'ahora', es: 'ahora' },
    { type: 'mc-en', q: '¿Qué significa «explicó»?', options: ['he/she explained', 'he/she asked', 'he/she answered', 'he/she quoted'], answer: 'he/she explained', es: 'explicó' },
    { type: 'mc-es', q: 'Which word means source?', options: ['fuente', 'cita', 'verbo', 'tiempo'], answer: 'fuente', es: 'fuente' },
    { type: 'typing', q: 'Type to mention in Spanish.', answer: 'mencionar', accepts: [], es: 'mencionar' },
    { type: 'mc-en', q: '¿Qué significa «antes»?', options: ['before', 'now', 'then', 'never'], answer: 'before', es: 'antes' }
  ],
  test: {
    title: 'Unit 37 test — Reported speech',
    questions: [
      { type: 'mc-en', q: '¿Qué significa «pregunta»?', options: ['question', 'answer', 'quote', 'speech'], answer: 'question', es: 'pregunta' },
      { type: 'mc-es', q: 'Say future.', options: ['futuro', 'pasado', 'presente', 'tiempo'], answer: 'futuro', es: 'futuro' },
      { type: 'typing', q: 'Type to tell in Spanish.', answer: 'contar', accepts: [], es: 'contar' },
      { type: 'mc-en', q: '¿Qué significa «discurso»?', options: ['speech / discourse', 'message', 'source', 'verb'], answer: 'speech / discourse', es: 'discurso' },
      { type: 'mc-es', q: 'Which word means past?', options: ['pasado', 'presente', 'futuro', 'tiempo'], answer: 'pasado', es: 'pasado' },
      { type: 'typing', q: 'Type to explain in Spanish.', answer: 'explicar', accepts: [], es: 'explicar' },
      { type: 'mc-en', q: '¿Qué significa «verbo»?', options: ['verb', 'tense', 'quote', 'source'], answer: 'verb', es: 'verbo' },
      { type: 'mc-es', q: 'Which word means then / so?', options: ['entonces', 'ahora', 'antes', 'según'], answer: 'entonces', es: 'entonces' },
      { type: 'typing', q: 'Type to quote in Spanish.', answer: 'citar', accepts: [], es: 'citar' },
      { type: 'mc-en', q: '¿Qué significa «presente»?', options: ['present', 'past', 'future', 'tense'], answer: 'present', es: 'presente' },
      { type: 'mc-es', q: 'Which word means indirect?', options: ['indirecto', 'directo', 'pasado', 'presente'], answer: 'indirecto', es: 'indirecto' },
      { type: 'mc-en', q: '¿Qué significa «comentar»?', options: ['to comment', 'to quote', 'to answer', 'to ask'], answer: 'to comment', es: 'comentar' }
    ]
  }
};
