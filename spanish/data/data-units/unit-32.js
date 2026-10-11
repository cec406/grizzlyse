// Unit 32 — Science & technology. B2.
export const unit = {
  id: 'u32',
  level: 'B2',
  number: 32,
  title: 'Science & technology',
  titleEs: 'Ciencia y tecnología',
  story: 'From vaccines to artificial intelligence, science keeps changing how we live. In this unit you read about discoveries in Spanish, weigh the benefits against the risks, and speculate about the future with the future and conditional tenses. You will also learn the polite language of a scientific discussion.',
  grammar: [
    {
      topic: 'Speculating with the future tense',
      explanation: 'The future can express a guess about the present, not only the future. ¿Dónde está Ana? Estará en casa. (She is probably at home.) Será, estará, tendrá and podrá all work this way.',
      table: [
        ['Question', 'Guess with future', 'English'],
        ['¿Qué hora es?', 'Serán las tres.', 'It is probably three.'],
        ['¿Dónde está Luis?', 'Estará en el laboratorio.', 'He is probably in the lab.'],
        ['¿Por qué no contesta?', 'Tendrá el teléfono apagado.', 'He probably has his phone off.']
      ],
      examples: [
        { es: '¿Dónde está el científico? Estará trabajando.', trans: 'DON-deh es-TA el syen-TEE-fee-ko es-tah-RAH trah-bah-HAN-do', en: 'Where is the scientist? He is probably working.' }
      ]
    },
    {
      topic: 'Possibility and doubt with the subjunctive',
      explanation: 'Es posible que, es probable que, puede que and quizás signal a doubt, and the verb that follows goes in the subjunctive: es posible que llueva. If you are sure, use the indicative: es seguro que llueve.',
      table: [
        ['Certain', 'Doubtful', 'English'],
        ['Es seguro que funciona.', 'Es posible que funcione.', 'It is possible that it works.'],
        ['Sé que es caro.', 'Dudo que sea caro.', 'I doubt that it is expensive.'],
        ['Está claro que mejora.', 'Puede que mejore.', 'It may improve.']
      ],
      examples: [
        { es: 'Es posible que la tecnología cambie nuestras vidas.', trans: 'es po-SEE-bleh keh lah tek-noh-loh-HEE-ah KAM-byeh NWES-tras BEE-das', en: 'It is possible that technology changes our lives.' }
      ]
    },
    {
      topic: 'The conditional for hypotheses',
      explanation: 'The conditional describes what would happen under certain conditions: sería mejor, podría funcionar, tendríamos que esperar. It is both the hypothetical tense and a polite way to ask.',
      table: [
        ['Spanish', 'English'],
        ['Sería mejor esperar.', 'It would be better to wait.'],
        ['Podríamos invertir más.', 'We could invest more.'],
        ['Tendríamos que probarlo.', 'We would have to test it.'],
        ['¿Podría explicarlo otra vez?', 'Could you explain it again?']
      ],
      examples: [
        { es: 'Con más datos, podríamos tomar una decisión.', trans: 'kon mas DAH-tos po-DREE-ah-mos toh-MAR OO-nah deh-see-SYON', en: 'With more data, we could make a decision.' }
      ]
    },
    {
      topic: 'Describing scientific findings',
      explanation: 'Scientific writing loves the impersonal se and the passive: se descubrió una vacuna (a vaccine was discovered), los datos fueron analizados (the data were analysed). To report results, use los resultados indican que or los datos muestran que.',
      table: [
        ['Spanish', 'English'],
        ['Se descubrió una vacuna.', 'A vaccine was discovered.'],
        ['Los datos fueron analizados.', 'The data were analysed.'],
        ['Los resultados indican que mejora.', 'The results indicate that it improves.'],
        ['Los datos muestran un riesgo.', 'The data show a risk.']
      ],
      examples: [
        { es: 'Los resultados indican que el tratamiento funciona.', trans: 'los reh-sool-TAH-dos een-DEE-kan keh el trah-tah-MYEN-to foon-SYOH-nah', en: 'The results indicate that the treatment works.' }
      ]
    }
  ],
  vocabulary: [
    { id: 'u32-ciencia', es: 'ciencia', translit: 'SYEN-syah', en: 'science', pos: 'noun', gender: 'f' },
    { id: 'u32-tecnologia', es: 'tecnología', translit: 'tek-noh-loh-HEE-ah', en: 'technology', pos: 'noun', gender: 'f' },
    { id: 'u32-investigacion', es: 'investigación', translit: 'een-bes-tee-gah-SYON', en: 'research', pos: 'noun', gender: 'f' },
    { id: 'u32-cientifico', es: 'científico', translit: 'syen-TEE-fee-ko', en: 'scientist', pos: 'noun', gender: 'm' },
    { id: 'u32-descubrimiento', es: 'descubrimiento', translit: 'des-koo-bree-MYEN-to', en: 'discovery', pos: 'noun', gender: 'm' },
    { id: 'u32-avance', es: 'avance', translit: 'ah-BAN-seh', en: 'advance / breakthrough', pos: 'noun', gender: 'm' },
    { id: 'u32-experimento', es: 'experimento', translit: 'eks-peh-ree-MEN-to', en: 'experiment', pos: 'noun', gender: 'm' },
    { id: 'u32-dato', es: 'dato', translit: 'DAH-to', en: 'data / fact', pos: 'noun', gender: 'm' },
    { id: 'u32-pantalla', es: 'pantalla', translit: 'pan-TAH-yah', en: 'screen', pos: 'noun', gender: 'f' },
    { id: 'u32-redessociales', es: 'redes sociales', translit: 'REH-des soh-SYAH-les', en: 'social media', pos: 'noun', gender: 'p' },
    { id: 'u32-robot', es: 'robot', translit: 'roh-BOT', en: 'robot', pos: 'noun', gender: 'm' },
    { id: 'u32-energia', es: 'energía', translit: 'eh-ner-HEE-ah', en: 'energy', pos: 'noun', gender: 'f' },
    { id: 'u32-riesgo', es: 'riesgo', translit: 'RYES-go', en: 'risk', pos: 'noun', gender: 'm' },
    { id: 'u32-beneficio', es: 'beneficio', translit: 'beh-neh-FEE-syo', en: 'benefit', pos: 'noun', gender: 'm' },
    { id: 'u32-privacidad', es: 'privacidad', translit: 'pree-bah-see-DAD', en: 'privacy', pos: 'noun', gender: 'f' },
    { id: 'u32-etica', es: 'ética', translit: 'EH-tee-kah', en: 'ethics', pos: 'noun', gender: 'f' },
    { id: 'u32-futuro', es: 'futuro', translit: 'foo-TOO-ro', en: 'future', pos: 'noun', gender: 'm' },
    { id: 'u32-trabajo', es: 'trabajo', translit: 'trah-BAH-ho', en: 'work / job', pos: 'noun', gender: 'm' },
    { id: 'u32-vida', es: 'vida', translit: 'BEE-dah', en: 'life', pos: 'noun', gender: 'f' },
    { id: 'u32-enfermedad', es: 'enfermedad', translit: 'en-fer-meh-DAD', en: 'disease / illness', pos: 'noun', gender: 'f' },
    { id: 'u32-inteligenciaartificial', es: 'inteligencia artificial', translit: 'een-teh-lee-HEN-syah ar-tee-fee-SYAL', en: 'artificial intelligence', pos: 'noun', gender: 'f' },
    { id: 'u32-desarrollar', es: 'desarrollar', translit: 'deh-sah-roh-YAR', en: 'to develop', pos: 'verb' },
    { id: 'u32-investigar', es: 'investigar', translit: 'een-bes-tee-GAR', en: 'to research', pos: 'verb' },
    { id: 'u32-probar', es: 'probar', translit: 'proh-BAR', en: 'to prove / to test', pos: 'verb' },
    { id: 'u32-afectar', es: 'afectar', translit: 'ah-fek-TAR', en: 'to affect', pos: 'verb' },
    { id: 'u32-confiar', es: 'confiar', translit: 'kon-FYAR', en: 'to trust', pos: 'verb' },
    { id: 'u32-cambiar', es: 'cambiar', translit: 'kam-BYAR', en: 'to change', pos: 'verb' },
    { id: 'u32-poder', es: 'poder', translit: 'po-DER', en: 'to be able to', pos: 'verb' },
    { id: 'u32-avanzado', es: 'avanzado', translit: 'ah-ban-SAH-do', en: 'advanced', pos: 'adjective' },
    { id: 'u32-peligroso', es: 'peligroso', translit: 'peh-lee-GROH-so', en: 'dangerous', pos: 'adjective' },
    { id: 'u32-barato', es: 'barato', translit: 'bah-RAH-to', en: 'cheap', pos: 'adjective' }
  ],
  phrases: [
    { id: 'p-u32-1', es: 'Los datos no mienten.', trans: 'los DAH-tos no MYEN-ten', en: 'The data do not lie.' },
    { id: 'p-u32-2', es: 'Hay que sopesar los riesgos.', trans: 'eye keh soh-peh-SAR los RYES-gos', en: 'We have to weigh the risks.' },
    { id: 'p-u32-3', es: 'La ciencia avanza rápido.', trans: 'lah SYEN-syah ah-BAN-sah RAH-pee-do', en: 'Science advances quickly.' },
    { id: 'p-u32-4', es: '¿Podrías explicarlo mejor?', trans: 'po-DREE-as eks-plee-KAR-lo meh-HOR', en: 'Could you explain it better?' }
  ],
  sentences: [
    { es: 'Los científicos investigan una cura para la enfermedad.', translit: 'los syen-TEE-fee-kos een-bes-TEE-gan OO-nah KOO-rah PAH-rah lah en-fer-meh-DAD', en: 'The scientists are researching a cure for the disease.', words: [{ id: 'u32-cientifico', es: 'científicos', en: 'scientists' }, { id: 'u32-investigar', es: 'investigan', en: 'they research' }, { id: 'u32-enfermedad', es: 'enfermedad', en: 'disease' }] },
    { es: 'Las redes sociales afectan la privacidad de los jóvenes.', translit: 'las REH-des soh-SYAH-les ah-FEK-tan lah pree-bah-see-DAD deh los HOH-beh-nes', en: 'Social media affect the privacy of young people.', words: [{ id: 'u32-redessociales', es: 'redes sociales', en: 'social media' }, { id: 'u32-afectar', es: 'afectan', en: 'they affect' }, { id: 'u32-privacidad', es: 'privacidad', en: 'privacy' }] },
    { es: 'Algún día los robots harán gran parte del trabajo.', translit: 'al-GOON DEE-ah los roh-BOTS ah-RAN gran PAR-teh del trah-BAH-ho', en: 'Some day robots will do a great part of the work.', words: [{ id: 'u32-robot', es: 'robots', en: 'robots' }, { id: 'u32-trabajo', es: 'trabajo', en: 'work' }] },
    { es: 'Es posible que la inteligencia artificial cambie todo.', translit: 'es po-SEE-bleh keh lah een-teh-lee-HEN-syah ar-tee-fee-SYAL KAM-byeh TOH-do', en: 'It is possible that artificial intelligence changes everything.', words: [{ id: 'u32-inteligenciaartificial', es: 'inteligencia artificial', en: 'artificial intelligence' }, { id: 'u32-cambiar', es: 'cambie', en: 'it changes' }] },
    { es: 'Ese descubrimiento podría salvar muchas vidas.', translit: 'EH-seh des-koo-bree-MYEN-to po-DREE-ah sal-BAR MOO-chas BEE-das', en: 'That discovery could save many lives.', words: [{ id: 'u32-descubrimiento', es: 'descubrimiento', en: 'discovery' }, { id: 'u32-poder', es: 'podría', en: 'it could' }, { id: 'u32-vida', es: 'vidas', en: 'lives' }] },
    { es: 'La energía solar es más barata que antes.', translit: 'lah eh-ner-HEE-ah soh-LAR es mas bah-RAH-tah keh AN-tes', en: 'Solar energy is cheaper than before.', words: [{ id: 'u32-energia', es: 'energía', en: 'energy' }, { id: 'u32-barato', es: 'barata', en: 'cheap' }] }
  ],
  dialogue: {
    title: 'En el laboratorio (In the lab)',
    lines: [
      { who: 'Dra. Ruiz', es: '¿Ya viste los resultados del experimento?', en: 'Did you already see the results of the experiment?' },
      { who: 'Tomás', es: 'Sí. Los datos indican que la nueva energía es más limpia.', en: 'Yes. The data indicate that the new energy is cleaner.' },
      { who: 'Dra. Ruiz', es: 'Sin duda. Pero todavía es cara de producir.', en: 'No doubt. But it is still expensive to produce.' },
      { who: 'Tomás', es: 'Es posible que el precio baje en unos años.', en: 'It is possible that the price will drop in a few years.' },
      { who: 'Dra. Ruiz', es: 'Eso espero. Mientras tanto, debemos estudiar los riesgos.', en: 'I hope so. In the meantime, we must study the risks.' },
      { who: 'Tomás', es: 'De acuerdo. La ética tiene que ir de la mano con la tecnología.', en: 'Agreed. Ethics has to go hand in hand with technology.' },
      { who: 'Dra. Ruiz', es: 'Exacto. No todo avance es un beneficio automático.', en: 'Exactly. Not every advance is an automatic benefit.' }
    ],
    questions: [
      { type: 'mc-en', q: '¿Qué indican los datos?', options: ['That the new energy is cleaner', 'That the experiment failed', 'That energy is expensive', 'That the lab is closed'], answer: 'That the new energy is cleaner' },
      { type: 'mc-en', q: '¿Qué problema tiene la nueva energía?', options: ['It is expensive to produce', 'It is dirty', 'It is illegal', 'It does not work'], answer: 'It is expensive to produce' },
      { type: 'mc-en', q: '¿Qué dice Tomás sobre la ética?', options: ['It must go hand in hand with technology', 'It is not important', 'It is too expensive', 'It belongs to the government'], answer: 'It must go hand in hand with technology' }
    ]
  },
  quiz: [
    { type: 'mc-en', q: '¿Qué significa «ciencia»?', options: ['science', 'technology', 'research', 'ethics'], answer: 'science', es: 'ciencia' },
    { type: 'mc-en', q: '¿Qué significa «tecnología»?', options: ['technology', 'science', 'energy', 'privacy'], answer: 'technology', es: 'tecnología' },
    { type: 'mc-es', q: 'How do you say research?', options: ['investigación', 'ciencia', 'experimento', 'dato'], answer: 'investigación', es: 'investigación' },
    { type: 'mc-es', q: 'How do you say discovery?', options: ['descubrimiento', 'avance', 'riesgo', 'beneficio'], answer: 'descubrimiento', es: 'descubrimiento' },
    { type: 'typing', q: 'Type the word for screen in Spanish', answer: 'pantalla', accepts: [], es: 'pantalla' },
    { type: 'typing', q: 'Type the word for robot in Spanish', answer: 'robot', accepts: [], es: 'robot' },
    { type: 'mc-en', q: '¿Qué significa «privacidad»?', options: ['privacy', 'risk', 'profit', 'screen'], answer: 'privacy', es: 'privacidad' },
    { type: 'mc-es', q: 'How do you say to develop?', options: ['desarrollar', 'investigar', 'probar', 'afectar'], answer: 'desarrollar', es: 'desarrollar' },
    { type: 'mc-en', q: '¿Qué significa «riesgo»?', options: ['risk', 'benefit', 'advance', 'data'], answer: 'risk', es: 'riesgo' },
    { type: 'mc-en', q: '¿Qué significa «energía»?', options: ['energy', 'science', 'screen', 'ethics'], answer: 'energy', es: 'energía' },
    { type: 'mc-es', q: 'Complete: Es posible que el precio ... en unos años.', options: ['baje', 'baja', 'bajará', 'bajaba'], answer: 'baje', es: 'baje' },
    { type: 'mc-es', q: 'How do you say benefit?', options: ['beneficio', 'riesgo', 'avance', 'dato'], answer: 'beneficio', es: 'beneficio' },
    { type: 'mc-en', q: '¿Qué significa «sin duda»?', options: ['no doubt', 'maybe', 'perhaps', 'never'], answer: 'no doubt', es: 'sin duda' },
    { type: 'typing', q: 'Type the word for to change in Spanish', answer: 'cambiar', accepts: [], es: 'cambiar' }
  ],
  test: {
    title: 'Unit 32 test — Science & technology',
    questions: [
      { type: 'mc-en', q: '¿Qué significa «avance»?', options: ['advance / breakthrough', 'risk', 'benefit', 'experiment'], answer: 'advance / breakthrough', es: 'avance' },
      { type: 'mc-es', q: 'How do you say experiment?', options: ['experimento', 'descubrimiento', 'dato', 'energía'], answer: 'experimento', es: 'experimento' },
      { type: 'typing', q: 'Type the word for to research in Spanish', answer: 'investigar', accepts: [], es: 'investigar' },
      { type: 'typing', q: 'Type the word for future in Spanish', answer: 'futuro', accepts: [], es: 'futuro' },
      { type: 'mc-en', q: '¿Qué significa «peligroso»?', options: ['dangerous', 'advanced', 'cheap', 'useful'], answer: 'dangerous', es: 'peligroso' },
      { type: 'mc-es', q: 'Complete: ¿Dónde está Ana? ... en casa. (guess)', options: ['Estará', 'Está', 'Estuvo', 'Estaba'], answer: 'Estará', es: 'Estará' },
      { type: 'mc-es', q: 'How do you say data?', options: ['datos', 'avances', 'riesgos', 'beneficios'], answer: 'datos', es: 'datos' },
      { type: 'mc-en', q: '¿Qué significa «ética»?', options: ['ethics', 'energy', 'privacy', 'science'], answer: 'ethics', es: 'ética' },
      { type: 'typing', q: 'Type the word for life in Spanish', answer: 'vida', accepts: [], es: 'vida' },
      { type: 'mc-en', q: '¿Qué significa «confiar»?', options: ['to trust', 'to develop', 'to affect', 'to prove'], answer: 'to trust', es: 'confiar' },
      { type: 'mc-es', q: 'Which word means scientist?', options: ['científico', 'tecnología', 'robot', 'pantalla'], answer: 'científico', es: 'científico' },
      { type: 'mc-en', q: '¿Qué significa «barato»?', options: ['cheap', 'expensive', 'clean', 'fast'], answer: 'cheap', es: 'barato' }
    ]
  }
};
