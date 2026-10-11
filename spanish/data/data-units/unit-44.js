// Unit 44 — Advanced debate & rhetoric. C1.
export const unit = {
  id: 'u44',
  level: 'C1',
  number: 44,
  title: 'Advanced debate & rhetoric',
  titleEs: 'El debate y la retórica',
  story: 'A good debater does not just shout louder; they choose every word with care. You concede a point to gain trust, hedge a claim so it cannot be attacked, and land your argument with a clean, forceful sentence. This unit builds the language of persuasion, so you can hold your ground in a real discussion.',
  grammar: [
    {
      topic: 'Hedging: softening a claim',
      explanation: 'Strong speakers hedge. Phrases like diría que, me parece que, hasta cierto punto and tal vez protect you when the other side pushes back. They make the argument hard to attack without making it weak.',
      table: [
        ['Hedge', 'Strength', 'English'],
        ['Diría que…', 'medium', 'I would say that…'],
        ['Me parece que…', 'soft', 'It seems to me that…'],
        ['Hasta cierto punto…', 'limited', 'To a certain extent…'],
        ['Cabe señalar que…', 'formal', 'It is worth pointing out that…'],
        ['Tal vez convenga…', 'tentative', 'Perhaps it would be wise to…']
      ],
      examples: [
        { es: 'Diría que el problema es más complejo de lo que parece.', trans: 'dee-REE-ah keh el proh-BLEH-mah es mas kom-PLEH-hoh deh loh keh pah-REH-seh', en: 'I would say that the problem is more complex than it appears.' },
        { es: 'Me parece que conviene escuchar todas las voces.', trans: 'meh pah-REH-seh keh kon-VYEH-neh es-koo-CHAR TOH-dahs lah BOH-ses', en: 'It seems to me that it is wise to listen to every voice.' }
      ]
    },
    {
      topic: 'Conceding and countering',
      explanation: 'To win a debate you must show you heard the other side. Concede with si bien es cierto que or reconozco que, then pivot with sin embargo, ahora bien or dicho esto. The concession makes the counterattack stronger.',
      table: [
        ['Concede', 'Pivot', 'Effect'],
        ['Si bien es cierto que…', 'no obstante…', 'fair but firm'],
        ['Reconozco que…', 'ahora bien…', 'respectful shift'],
        ['Tienes razón en parte…', 'dicho esto…', 'partial agreement'],
        ['Es un punto válido…', 'sin embargo…', 'polite disagreement']
      ],
      examples: [
        { es: 'Si bien es cierto que cuesta dinero, no obstante, vale la pena.', trans: 'see BYEN es SYER-toh keh KWES-tah dee-NEH-roh no obs-TAN-teh BAH-leh lah PEH-nah', en: 'Although it is true that it costs money, nevertheless, it is worth it.' },
        { es: 'Reconozco que me equivoqué; ahora bien, aprendí mucho.', trans: 'reh-koh-NOH-sko keh meh eh-kee-boh-KEH ah-OH-rah BYEN ah-pren-DEE MOO-choh', en: 'I admit that I was wrong; that said, I learned a lot.' }
      ]
    },
    {
      topic: 'Rhetoric that lands',
      explanation: 'Rhetoric uses contrast and repetition. The pattern no es X, sino Y redefines the issue, while no solo… sino también piles up evidence. A short rhetorical question can expose a weak idea in a single line.',
      table: [
        ['Device', 'Example', 'English'],
        ['no es X, sino Y', 'No es un gasto, sino una inversión.', 'It is not a cost, but an investment.'],
        ['no solo… sino también', 'No solo ayuda, sino también motiva.', 'It not only helps, but also motivates.'],
        ['rhetorical question', '¿Quién no quiere un futuro mejor?', 'Who does not want a better future?'],
        ['emphatic closing', 'Eso es innegable.', 'That is undeniable.']
      ],
      examples: [
        { es: 'No es un obstáculo, sino un reto que podemos vencer.', trans: 'no es oon obs-TAH-koo-loh SEE-noh oon REH-toh keh po-DEH-mos ben-SER', en: 'It is not an obstacle, but a challenge that we can overcome.' },
        { es: 'No solo reduce costos, sino también mejora la calidad.', trans: 'no SOH-loh reh-DOO-seh KOS-tos SEE-noh tam-BYEN meh-HOH-rah lah kah-lee-DAD', en: 'It not only reduces costs, but also improves quality.' }
      ]
    }
  ],
  vocabulary: [
    { id: 'u44-debate', es: 'debate', translit: 'deh-BAH-teh', en: 'debate', pos: 'noun', gender: 'm' },
    { id: 'u44-retorica', es: 'retórica', translit: 'reh-TOH-ree-kah', en: 'rhetoric', pos: 'noun', gender: 'f' },
    { id: 'u44-argumento', es: 'argumento', translit: 'ar-goo-MEN-toh', en: 'argument', pos: 'noun', gender: 'm' },
    { id: 'u44-argumentar', es: 'argumentar', translit: 'ar-goo-men-TAR', en: 'to argue / to reason', pos: 'verb' },
    { id: 'u44-refutar', es: 'refutar', translit: 'reh-foo-TAR', en: 'to refute', pos: 'verb' },
    { id: 'u44-rebatir', es: 'rebatir', translit: 'reh-bah-TEER', en: 'to rebut', pos: 'verb' },
    { id: 'u44-postura', es: 'postura', translit: 'pos-TOO-rah', en: 'stance / position', pos: 'noun', gender: 'f' },
    { id: 'u44-conceder', es: 'conceder', translit: 'kon-seh-DER', en: 'to concede', pos: 'verb' },
    { id: 'u44-persuadir', es: 'persuadir', translit: 'per-swah-DEER', en: 'to persuade', pos: 'verb' },
    { id: 'u44-convencer', es: 'convencer', translit: 'kon-ben-SER', en: 'to convince', pos: 'verb' },
    { id: 'u44-afirmar', es: 'afirmar', translit: 'ah-feer-MAR', en: 'to assert', pos: 'verb' },
    { id: 'u44-evidencia', es: 'evidencia', translit: 'eh-vee-DEN-syah', en: 'evidence', pos: 'noun', gender: 'f' },
    { id: 'u44-hipotesis', es: 'hipótesis', translit: 'ee-POH-teh-sees', en: 'hypothesis', pos: 'noun', gender: 'f' },
    { id: 'u44-contundente', es: 'contundente', translit: 'kon-toon-DEN-teh', en: 'forceful / conclusive', pos: 'adjective' },
    { id: 'u44-convincente', es: 'convincente', translit: 'kon-been-SEN-teh', en: 'convincing', pos: 'adjective' },
    { id: 'u44-sesgo', es: 'sesgo', translit: 'SES-goh', en: 'bias', pos: 'noun', gender: 'm' },
    { id: 'u44-falacia', es: 'falacia', translit: 'fah-LAH-syah', en: 'fallacy', pos: 'noun', gender: 'f' },
    { id: 'u44-respaldar', es: 'respaldar', translit: 'res-pal-DAR', en: 'to back / to support', pos: 'verb' }
  ],
  phrases: [
    { id: 'p-u44-1', es: 'Dicho esto, paso a mi segundo punto.', trans: 'DEE-choh ES-toh PAH-soh ah mee se-GOON-doh POON-toh', en: 'That said, I move to my second point.' },
    { id: 'p-u44-2', es: 'Permítanme matizar esa afirmación.', trans: 'per-MEE-tah-meh mah-tee-SAR EH-sah ah-feer-mah-SYON', en: 'Allow me to qualify that statement.' },
    { id: 'p-u44-3', es: 'En resumidas cuentas, no hay acuerdo.', trans: 'en reh-soo-MEE-dahs KWEN-tahs no ai ah-KWER-doh', en: 'In short, there is no agreement.' }
  ],
  sentences: [
    { es: 'Este debate exige una retórica clara y serena.', translit: 'ES-teh deh-BAH-teh ek-SEE-heh OO-nah reh-TOH-ree-kah KLAH-rah ee seh-REH-nah', en: 'This debate calls for clear, calm rhetoric.', words: [{ id: 'u44-debate', es: 'debate', en: 'debate' }, { id: 'u44-retorica', es: 'retórica', en: 'rhetoric' }] },
    { es: 'Su argumento es sólido, pero puedo refutarlo con datos.', translit: 'soo ar-goo-MEN-toh es SOH-lee-doh PEH-roh PWEH-doh reh-foo-TAR-loh kon DAH-tos', en: 'Your argument is solid, but I can refute it with data.', words: [{ id: 'u44-argumento', es: 'argumento', en: 'argument' }, { id: 'u44-refutar', es: 'refutar', en: 'to refute' }] },
    { es: 'La postura del gobierno no convenció a nadie.', translit: 'lah pos-TOO-rah del goh-BYER-noh no kon-ben-SYO ah NAH-dyeh', en: 'The stance of the government convinced nobody.', words: [{ id: 'u44-postura', es: 'postura', en: 'stance' }, { id: 'u44-convencer', es: 'convenció', en: 'convinced' }] },
    { es: 'Permítanme conceder que tienen parte de razón.', translit: 'per-MEE-tan-meh kon-seh-DER keh TYEH-nen PAR-teh deh rah-SON', en: 'Allow me to concede that you have part of the point.', words: [{ id: 'u44-conceder', es: 'conceder', en: 'to concede' }] },
    { es: 'La evidencia respalda la hipótesis de los científicos.', translit: 'lah eh-vee-DEN-syah res-PAL-dah lah ee-POH-teh-sees deh los syen-TEE-fee-kos', en: 'The evidence backs the hypothesis of the scientists.', words: [{ id: 'u44-evidencia', es: 'evidencia', en: 'evidence' }, { id: 'u44-hipotesis', es: 'hipótesis', en: 'hypothesis' }, { id: 'u44-respaldar', es: 'respalda', en: 'backs' }] },
    { es: 'Un argumento contundente no necesita gritar.', translit: 'oon ar-goo-MEN-toh kon-toon-DEN-teh no neh-seh-SEE-tah gree-TAR', en: 'A forceful argument does not need to shout.', words: [{ id: 'u44-contundente', es: 'contundente', en: 'forceful' }] },
    { es: 'Cuidado con la falacia y el sesgo del orador.', translit: 'kwee-DAH-doh kon lah fah-LAH-syah ee el SES-goh del oh-rah-DOR', en: 'Watch out for the fallacy and the bias of the speaker.', words: [{ id: 'u44-falacia', es: 'falacia', en: 'fallacy' }, { id: 'u44-sesgo', es: 'sesgo', en: 'bias' }] },
    { es: 'Quien persuade con hechos gana más que quien grita.', translit: 'kyen per-SWAH-deh kon EH-chos GAH-nah mas keh kyen GREE-tah', en: 'Whoever persuades with facts wins more than whoever shouts.', words: [{ id: 'u44-persuadir', es: 'persuade', en: 'persuades' }] }
  ],
  dialogue: {
    title: 'El debate escolar (The school debate)',
    lines: [
      { who: 'Sofía', es: 'Compañeros, hoy debatimos si la tecnología ayuda o daña a los jóvenes.', en: 'Classmates, today we debate whether technology helps or harms young people.' },
      { who: 'Diego', es: 'Mi postura es clara: la tecnología, bien usada, amplía el acceso al saber.', en: 'My stance is clear: technology, used well, widens access to knowledge.' },
      { who: 'Sofía', es: 'Concedo que ofrece acceso, pero también crea distracciones graves.', en: 'I concede that it offers access, but it also creates serious distractions.' },
      { who: 'Diego', es: 'Hasta cierto punto tiene razón; sin embargo, la evidencia muestra más beneficios.', en: 'To a certain extent you are right; however, the evidence shows more benefits.' },
      { who: 'Sofía', es: 'Dicho esto, propongo regular el uso y enseñar hábitos digitales.', en: 'That said, I propose regulating use and teaching digital habits.' },
      { who: 'Diego', es: 'Me parece razonable. En resumidas cuentas, el problema no es la herramienta, sino el uso.', en: 'That seems reasonable to me. In short, the problem is not the tool, but the use.' }
    ],
    questions: [
      { type: 'mc-en', q: '¿Sobre qué debaten los estudiantes?', options: ['si la tecnología ayuda o daña a los jóvenes', 'si la escuela es útil', 'si deben estudiar más', 'si el internet es caro'], answer: 'si la tecnología ayuda o daña a los jóvenes' },
      { type: 'mc-en', q: '¿Qué concede Sofía?', options: ['que la tecnología ofrece acceso', 'que la tecnología es inútil', 'que no hay evidencia', 'que Diego tiene toda la razón'], answer: 'que la tecnología ofrece acceso' },
      { type: 'mc-en', q: '¿Cuál es la conclusión de Diego?', options: ['el problema es el uso, no la herramienta', 'el problema es la escuela', 'la tecnología es mala', 'no hay solución'], answer: 'el problema es el uso, no la herramienta' }
    ]
  },
  quiz: [
    { type: 'mc-en', q: '¿Qué significa «retórica»?', options: ['rhetoric', 'grammar', 'vocabulary', 'spelling'], answer: 'rhetoric', es: 'retórica' },
    { type: 'mc-en', q: '¿Qué significa «refutar»?', options: ['to refute', 'to repeat', 'to agree', 'to forget'], answer: 'to refute', es: 'refutar' },
    { type: 'mc-es', q: 'Which word means stance / position?', options: ['postura', 'pregunta', 'respuesta', 'palabra'], answer: 'postura', es: 'postura' },
    { type: 'mc-en', q: '¿Qué significa «conceder»?', options: ['to concede', 'to deny', 'to shout', 'to begin'], answer: 'to concede', es: 'conceder' },
    { type: 'mc-es', q: 'Which verb means to persuade?', options: ['persuadir', 'repetir', 'olvidar', 'dudar'], answer: 'persuadir', es: 'persuadir' },
    { type: 'mc-en', q: '¿Qué significa «contundente»?', options: ['forceful / conclusive', 'doubtful', 'polite', 'silent'], answer: 'forceful / conclusive', es: 'contundente' },
    { type: 'mc-es', q: 'Which word means evidence?', options: ['evidencia', 'apariencia', 'paciencia', 'ciencia'], answer: 'evidencia', es: 'evidencia' },
    { type: 'typing', q: 'Type debate in Spanish.', answer: 'debate', accepts: [], es: 'debate' },
    { type: 'mc-en', q: '¿Qué significa «sesgo»?', options: ['bias', 'certainty', 'proof', 'opinion'], answer: 'bias', es: 'sesgo' },
    { type: 'mc-es', q: 'Which word means fallacy?', options: ['falacia', 'franqueza', 'feria', 'fama'], answer: 'falacia', es: 'falacia' },
    { type: 'mc-en', q: '¿Qué significa «argumentar»?', options: ['to argue / to reason', 'to win', 'to listen', 'to stop'], answer: 'to argue / to reason', es: 'argumentar' },
    { type: 'typing', q: 'Type to convince in Spanish.', answer: 'convencer', accepts: [], es: 'convencer' },
    { type: 'mc-es', q: 'Which phrase softens a claim?', options: ['Diría que', 'Es un hecho', 'Sin duda', 'Siempre'], answer: 'Diría que', es: 'Diría que' },
    { type: 'mc-en', q: '¿Qué significa «hipótesis»?', options: ['hypothesis', 'conclusion', 'summary', 'example'], answer: 'hypothesis', es: 'hipótesis' }
  ],
  test: {
    title: 'Unit 44 test — Advanced debate & rhetoric',
    questions: [
      { type: 'mc-en', q: '¿Qué significa «respaldar»?', options: ['to back / to support', 'to attack', 'to ignore', 'to delay'], answer: 'to back / to support', es: 'respaldar' },
      { type: 'mc-es', q: 'Which word means convincing?', options: ['convincente', 'confuso', 'cortés', 'callado'], answer: 'convincente', es: 'convincente' },
      { type: 'typing', q: 'Type to refute in Spanish.', answer: 'refutar', accepts: [], es: 'refutar' },
      { type: 'mc-en', q: '¿Qué significa «afirmar»?', options: ['to assert', 'to deny', 'to whisper', 'to ask'], answer: 'to assert', es: 'afirmar' },
      { type: 'mc-es', q: 'Which word means bias?', options: ['sesgo', 'certeza', 'prueba', 'duda'], answer: 'sesgo', es: 'sesgo' },
      { type: 'typing', q: 'Type rhetoric in Spanish.', answer: 'retorica', accepts: ['retórica'], es: 'retórica' },
      { type: 'mc-en', q: '¿Qué significa «postura»?', options: ['stance / position', 'question', 'answer', 'gesture'], answer: 'stance / position', es: 'postura' },
      { type: 'mc-es', q: 'Which phrase concedes a point?', options: ['Si bien es cierto que', 'Por lo tanto', 'En primer lugar', 'Además'], answer: 'Si bien es cierto que', es: 'Si bien es cierto que' },
      { type: 'mc-en', q: '¿Qué significa «rebatir»?', options: ['to rebut', 'to accept', 'to praise', 'to copy'], answer: 'to rebut', es: 'rebatir' },
      { type: 'mc-es', q: 'Complete: No es una crisis, ___ una oportunidad.', options: ['sino', 'pero', 'y', 'aunque'], answer: 'sino', es: 'sino' },
      { type: 'typing', q: 'Type hypothesis in Spanish.', answer: 'hipotesis', accepts: ['hipótesis'], es: 'hipótesis' },
      { type: 'mc-en', q: '¿Qué significa «debate»?', options: ['debate', 'exam', 'meeting', 'speech'], answer: 'debate', es: 'debate' }
    ]
  }
};
