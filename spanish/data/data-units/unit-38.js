// Unit 38 — Formal argument & connectors. B2.
export const unit = {
  id: 'u38',
  level: 'B2',
  number: 38,
  title: 'Formal argument & connectors',
  titleEs: 'Argumentar y conectar ideas',
  story: 'Your debate class in Bayamón asks for your opinion on a real problem: should the town build a new stadium? You can no longer answer with one sentence. In this unit you learn the connectors that hold an argument together: además, sin embargo, por lo tanto, en conclusión. With them your Spanish sounds organized and persuasive.',
  grammar: [
    {
      topic: 'Adding and contrasting: además, sin embargo',
      explanation: 'Use además to add a point in the same direction and sin embargo or no obstante to introduce a contrast. These connectors usually open the sentence and are followed by a comma.',
      table: [
        ['Connector', 'Function', 'English'],
        ['además', 'adds information', 'moreover / besides'],
        ['sin embargo', 'contrasts', 'however'],
        ['no obstante', 'contrasts (formal)', 'nevertheless'],
        ['por otro lado', 'adds another view', 'on the other hand']
      ],
      examples: [
        { es: 'El plan es caro. Sin embargo, traerá empleos.', trans: 'el plan es KAH-ro seen em-BAR-go trah-EH-ra em-PLEH-os', en: 'The plan is expensive. However, it will bring jobs.' },
        { es: 'Además, el proyecto es sostenible.', trans: 'ah-deh-MAS el pro-YEK-to es sos-teh-NEE-bleh', en: 'Moreover, the project is sustainable.' }
      ]
    },
    {
      topic: 'Cause and result: porque, ya que, por lo tanto',
      explanation: 'Give a reason with porque or ya que, and state the result with por lo tanto or en consecuencia. The order is flexible: reason first or result first.',
      table: [
        ['Connector', 'Function', 'English'],
        ['porque', 'gives a direct cause', 'because'],
        ['ya que', 'gives a known cause', 'since / given that'],
        ['por lo tanto', 'states the result', 'therefore'],
        ['en consecuencia', 'states the result (formal)', 'as a consequence']
      ],
      examples: [
        { es: 'Apoyo la idea porque protege a los niños.', trans: 'ah-PO-yo lah ee-DEH-ah POR-keh pro-TEH-heh ah los NEE-nyos', en: 'I support the idea because it protects the children.' },
        { es: 'Faltan datos; por lo tanto, no puedo decidir.', trans: 'FAL-tan DAH-tos por lo TAN-to no PWEH-do deh-see-DEER', en: 'Data is missing; therefore, I cannot decide.' }
      ]
    },
    {
      topic: 'Structuring an argument',
      explanation: 'A clear argument has an opening, two or three reasons and a closing. Use these signposts so your listener can follow: En primer lugar, En segundo lugar, Por último, En conclusión.',
      table: [
        ['Stage', 'Spanish', 'English'],
        ['opening', 'En primer lugar', 'First of all'],
        ['second point', 'En segundo lugar', 'Secondly'],
        ['last point', 'Por último', 'Finally'],
        ['closing', 'En conclusión', 'In conclusion']
      ],
      examples: [
        { es: 'En conclusión, necesitamos más datos.', trans: 'en kon-kloo-SYON neh-seh-see-TAH-mos mas DAH-tos', en: 'In conclusion, we need more data.' },
        { es: 'En primer lugar, hay que escuchar a la comunidad.', trans: 'en pree-MER loo-GAR ay keh es-koo-CHAR ah lah ko-moo-nee-DAD', en: 'First of all, we must listen to the community.' }
      ]
    }
  ],
  vocabulary: [
    { id: 'u38-argumento', es: 'argumento', translit: 'ar-goo-MEN-to', en: 'argument', pos: 'noun', gender: 'm' },
    { id: 'u38-conector', es: 'conector', translit: 'ko-nek-TOR', en: 'connector', pos: 'noun', gender: 'm' },
    { id: 'u38-postura', es: 'postura', translit: 'pos-TOO-rah', en: 'position / stance', pos: 'noun', gender: 'f' },
    { id: 'u38-conclusion', es: 'conclusión', translit: 'kon-kloo-SYON', en: 'conclusion', pos: 'noun', gender: 'f' },
    { id: 'u38-razon', es: 'razón', translit: 'rah-SON', en: 'reason', pos: 'noun', gender: 'f' },
    { id: 'u38-evidencia', es: 'evidencia', translit: 'eh-vee-DEN-syah', en: 'evidence', pos: 'noun', gender: 'f' },
    { id: 'u38-ejemplo', es: 'ejemplo', translit: 'eh-HEN-plo', en: 'example', pos: 'noun', gender: 'm' },
    { id: 'u38-debate', es: 'debate', translit: 'deh-BAH-teh', en: 'debate', pos: 'noun', gender: 'm' },
    { id: 'u38-opinion', es: 'opinión', translit: 'o-pee-NYON', en: 'opinion', pos: 'noun', gender: 'f' },
    { id: 'u38-propuesta', es: 'propuesta', translit: 'pro-PWES-tah', en: 'proposal', pos: 'noun', gender: 'f' },
    { id: 'u38-tema', es: 'tema', translit: 'TEH-mah', en: 'topic / theme', pos: 'noun', gender: 'm' },
    { id: 'u38-dato', es: 'dato', translit: 'DAH-to', en: 'piece of data / fact', pos: 'noun', gender: 'm' },
    { id: 'u38-ademas', es: 'además', translit: 'ah-deh-MAS', en: 'moreover / besides', pos: 'adverb' },
    { id: 'u38-sinembargo', es: 'sin embargo', translit: 'seen em-BAR-go', en: 'however', pos: 'adverb' },
    { id: 'u38-porlotanto', es: 'por lo tanto', translit: 'por lo TAN-to', en: 'therefore', pos: 'adverb' },
    { id: 'u38-porultimo', es: 'por último', translit: 'por OOL-tee-mo', en: 'finally / lastly', pos: 'adverb' },
    { id: 'u38-porque', es: 'porque', translit: 'POR-keh', en: 'because', pos: 'conjunction' },
    { id: 'u38-yaque', es: 'ya que', translit: 'yah keh', en: 'since / given that', pos: 'conjunction' },
    { id: 'u38-aunque', es: 'aunque', translit: 'AWN-keh', en: 'although / even though', pos: 'conjunction' },
    { id: 'u38-enprimerlugar', es: 'en primer lugar', translit: 'en pree-MER loo-GAR', en: 'first of all', pos: 'phrase' },
    { id: 'u38-enconclusion', es: 'en conclusión', translit: 'en kon-kloo-SYON', en: 'in conclusion', pos: 'phrase' },
    { id: 'u38-apoyar', es: 'apoyar', translit: 'ah-po-YAR', en: 'to support', pos: 'verb' },
    { id: 'u38-defender', es: 'defender', translit: 'deh-fen-DER', en: 'to defend', pos: 'verb' },
    { id: 'u38-rebatir', es: 'rebatir', translit: 'reh-bah-TEER', en: 'to rebut / to refute', pos: 'verb' },
    { id: 'u38-convencer', es: 'convencer', translit: 'kon-ven-SER', en: 'to convince', pos: 'verb' },
    { id: 'u38-demostrar', es: 'demostrar', translit: 'deh-mos-TRAR', en: 'to demonstrate', pos: 'verb' },
    { id: 'u38-convincente', es: 'convincente', translit: 'kon-veen-SEN-teh', en: 'convincing', pos: 'adjective' },
    { id: 'u38-solido', es: 'sólido', translit: 'SO-lee-do', en: 'solid / strong', pos: 'adjective' }
  ],
  phrases: [
    { id: 'p-u38-1', es: 'Estoy de acuerdo.', trans: 'es-TOY deh ah-KWER-do', en: 'I agree.' },
    { id: 'p-u38-2', es: 'No estoy de acuerdo.', trans: 'no es-TOY deh ah-KWER-do', en: 'I disagree.' },
    { id: 'p-u38-3', es: 'En mi opinión...', trans: 'en mee o-pee-NYON', en: 'In my opinion...' }
  ],
  sentences: [
    { es: 'Sin embargo, no todos están de acuerdo.', translit: 'seen em-BAR-go no TO-dos es-TAN deh ah-KWER-do', en: 'However, not everyone agrees.', words: [{ id: 'u38-sinembargo', es: 'Sin embargo', en: 'however' }] },
    { es: 'Por lo tanto, debemos actuar ahora.', translit: 'por lo TAN-to deh-BEH-mos ak-TWAR ah-OH-rah', en: 'Therefore, we must act now.', words: [{ id: 'u38-porlotanto', es: 'Por lo tanto', en: 'therefore' }] },
    { es: 'Apoyo la idea porque protege a los niños.', translit: 'ah-PO-yo lah ee-DEH-ah POR-keh pro-TEH-heh ah los NEE-nyos', en: 'I support the idea because it protects the children.', words: [{ id: 'u38-apoyar', es: 'Apoyo', en: 'I support' }, { id: 'u38-porque', es: 'porque', en: 'because' }] },
    { es: 'Aunque es difícil, la evidencia es clara.', translit: 'AWN-keh es dee-FEE-seel lah eh-vee-DEN-syah es KLAH-rah', en: 'Although it is difficult, the evidence is clear.', words: [{ id: 'u38-aunque', es: 'Aunque', en: 'although' }, { id: 'u38-evidencia', es: 'evidencia', en: 'evidence' }] },
    { es: 'En conclusión, necesitamos más datos.', translit: 'en kon-kloo-SYON neh-seh-see-TAH-mos mas DAH-tos', en: 'In conclusion, we need more data.', words: [{ id: 'u38-enconclusion', es: 'En conclusión', en: 'in conclusion' }] },
    { es: 'Además, el argumento tiene una razón sólida.', translit: 'ah-deh-MAS el ar-goo-MEN-to TYEH-neh OO-nah rah-SON SO-lee-dah', en: 'Moreover, the argument has a solid reason.', words: [{ id: 'u38-ademas', es: 'Además', en: 'moreover' }, { id: 'u38-argumento', es: 'argumento', en: 'argument' }, { id: 'u38-razon', es: 'razón', en: 'reason' }] }
  ],
  dialogue: {
    title: 'El debate en clase (The class debate)',
    lines: [
      { who: 'Profesora', es: '¿Cuál es su postura sobre el tema?', en: 'What is your position on the topic?' },
      { who: 'Diego', es: 'En primer lugar, apoyo la propuesta.', en: 'First of all, I support the proposal.' },
      { who: 'Profesora', es: '¿Y qué evidencia tiene?', en: 'And what evidence do you have?' },
      { who: 'Diego', es: 'Sin embargo, aún falta más información.', en: 'However, more information is still needed.' },
      { who: 'Profesora', es: 'Entonces, ¿puede convencer al grupo?', en: 'Then, can you convince the group?' },
      { who: 'Diego', es: 'Sí, porque mi argumento es convincente.', en: 'Yes, because my argument is convincing.' }
    ],
    questions: [
      { type: 'mc-en', q: '¿Qué apoya Diego?', options: ['la propuesta', 'la evidencia', 'el tema', 'la opinión de la profesora'], answer: 'la propuesta' },
      { type: 'mc-en', q: '¿Qué falta todavía?', options: ['más información', 'más dinero', 'más personas', 'más tiempo'], answer: 'más información' },
      { type: 'mc-en', q: '¿Por qué cree Diego que puede convencer al grupo?', options: ['porque su argumento es convincente', 'porque es el jefe', 'porque tiene dinero', 'porque todos están de acuerdo'], answer: 'porque su argumento es convincente' }
    ]
  },
  quiz: [
    { type: 'mc-en', q: '¿Qué significa «sin embargo»?', options: ['however', 'therefore', 'moreover', 'because'], answer: 'however', es: 'sin embargo' },
    { type: 'mc-es', q: 'How do you say therefore?', options: ['por lo tanto', 'sin embargo', 'además', 'porque'], answer: 'por lo tanto', es: 'por lo tanto' },
    { type: 'mc-en', q: '¿Qué significa «argumento»?', options: ['argument', 'opinion', 'evidence', 'topic'], answer: 'argument', es: 'argumento' },
    { type: 'mc-es', q: 'Which word means evidence?', options: ['evidencia', 'razón', 'ejemplo', 'postura'], answer: 'evidencia', es: 'evidencia' },
    { type: 'typing', q: 'Type because in Spanish.', answer: 'porque', accepts: [], es: 'porque' },
    { type: 'typing', q: 'Type to support in Spanish.', answer: 'apoyar', accepts: [], es: 'apoyar' },
    { type: 'mc-en', q: '¿Qué significa «además»?', options: ['moreover / besides', 'however', 'therefore', 'although'], answer: 'moreover / besides', es: 'además' },
    { type: 'mc-es', q: 'Which word means opinion?', options: ['opinión', 'postura', 'debate', 'propuesta'], answer: 'opinión', es: 'opinión' },
    { type: 'mc-en', q: '¿Qué significa «aunque»?', options: ['although', 'because', 'therefore', 'moreover'], answer: 'although', es: 'aunque' },
    { type: 'mc-es', q: 'Which word means proposal?', options: ['propuesta', 'conclusión', 'tema', 'dato'], answer: 'propuesta', es: 'propuesta' },
    { type: 'typing', q: 'Type to convince in Spanish.', answer: 'convencer', accepts: [], es: 'convencer' },
    { type: 'mc-en', q: '¿Qué significa «convincente»?', options: ['convincing', 'confused', 'convinced', 'confident'], answer: 'convincing', es: 'convincente' }
  ],
  test: {
    title: 'Unit 38 test — Formal argument & connectors',
    questions: [
      { type: 'mc-en', q: '¿Qué significa «por lo tanto»?', options: ['therefore', 'however', 'moreover', 'because'], answer: 'therefore', es: 'por lo tanto' },
      { type: 'mc-es', q: 'Say in conclusion.', options: ['en conclusión', 'en primer lugar', 'por último', 'sin embargo'], answer: 'en conclusión', es: 'en conclusión' },
      { type: 'typing', q: 'Type although in Spanish.', answer: 'aunque', accepts: [], es: 'aunque' },
      { type: 'mc-en', q: '¿Qué significa «razón»?', options: ['reason', 'evidence', 'example', 'debate'], answer: 'reason', es: 'razón' },
      { type: 'mc-es', q: 'Which word means example?', options: ['ejemplo', 'dato', 'tema', 'conector'], answer: 'ejemplo', es: 'ejemplo' },
      { type: 'typing', q: 'Type to defend in Spanish.', answer: 'defender', accepts: [], es: 'defender' },
      { type: 'mc-en', q: '¿Qué significa «postura»?', options: ['position / stance', 'argument', 'conclusion', 'topic'], answer: 'position / stance', es: 'postura' },
      { type: 'mc-es', q: 'Which word means topic?', options: ['tema', 'dato', 'debate', 'conector'], answer: 'tema', es: 'tema' },
      { type: 'typing', q: 'Type to rebut in Spanish.', answer: 'rebatir', accepts: [], es: 'rebatir' },
      { type: 'mc-en', q: '¿Qué significa «dato»?', options: ['piece of data / fact', 'debate', 'opinion', 'reason'], answer: 'piece of data / fact', es: 'dato' },
      { type: 'mc-es', q: 'Which word means connector?', options: ['conector', 'argumento', 'conclusión', 'tema'], answer: 'conector', es: 'conector' },
      { type: 'mc-en', q: '¿Qué significa «sólido»?', options: ['solid / strong', 'weak', 'clear', 'soft'], answer: 'solid / strong', es: 'sólido' }
    ]
  }
};
