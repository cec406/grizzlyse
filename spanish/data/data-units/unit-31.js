// Unit 31 — Society & politics. B2.
export const unit = {
  id: 'u31',
  level: 'B2',
  number: 31,
  title: 'Society & politics',
  titleEs: 'Sociedad y política',
  story: 'Every country argues about the same things: taxes, rights, elections and who should govern. In this unit you read a debate in Spanish, learn the words of civic life, and practise taking a clear position without sounding rude. You will also see how the news hides who did something with the impersonal se.',
  grammar: [
    {
      topic: 'Taking a stance: creo que and its negative',
      explanation: 'Creo que and pienso que take the indicative: creo que es justo. But in the negative the same sentence needs the subjunctive: no creo que sea justo, because the negative adds doubt. Es importante que and other value judgements always take the subjunctive.',
      table: [
        ['Spanish', 'Mood', 'English'],
        ['Creo que el gobierno acierta.', 'indicative', 'I think the government is right.'],
        ['No creo que el gobierno acierte.', 'subjunctive', 'I do not think the government is right.'],
        ['Es verdad que hay crisis.', 'indicative', 'It is true that there is a crisis.'],
        ['No es verdad que haya crisis.', 'subjunctive', 'It is not true that there is a crisis.']
      ],
      examples: [
        { es: 'No creo que esa ley sea justa.', trans: 'no KREH-o keh EH-sah ley SEA HOOS-tah', en: 'I do not think that law is fair.' },
        { es: 'Es importante que la gente vote.', trans: 'es eem-por-TAN-teh keh lah HEN-teh BOH-teh', en: 'It is important that people vote.' }
      ]
    },
    {
      topic: 'Connectors for an argument',
      explanation: 'These words organise a debate and show how your ideas fit together. Sin embargo and no obstante contrast, por lo tanto concludes, además adds a point, and por otro lado introduces the other side.',
      table: [
        ['Connector', 'Function', 'Example'],
        ['sin embargo', 'contrast', 'Es caro. Sin embargo, vale la pena.'],
        ['por lo tanto', 'conclusion', 'No hay datos. Por lo tanto, dudo.'],
        ['además', 'addition', 'Además, falta transparencia.'],
        ['por otro lado', 'the other side', 'Por otro lado, ha habido avances.']
      ],
      examples: [
        { es: 'La medida es popular. Sin embargo, tiene riesgos.', trans: 'lah meh-DEE-dah es po-poo-LAR seen em-BAR-go TYEH-neh RYES-gos', en: 'The measure is popular. However, it has risks.' }
      ]
    },
    {
      topic: 'Impersonal se and the passive in the news',
      explanation: 'News reports often avoid naming who did something. Use se plus a third-person verb: se aprobó la ley (the law was passed), se dice que (it is said that). The passive with ser plus participle works too: la ley fue aprobada.',
      table: [
        ['Active', 'Impersonal se', 'English'],
        ['El Congreso aprobó la ley.', 'Se aprobó la ley.', 'The law was passed.'],
        ['La gente dice que subirá.', 'Se dice que subirá.', 'It is said that it will rise.'],
        ['Los ciudadanos exigen cambios.', 'Se exigen cambios.', 'Changes are demanded.']
      ],
      examples: [
        { es: 'Se aprobó la ley el lunes.', trans: 'seh ah-pro-BO lah ley el LOO-nes', en: 'The law was passed on Monday.' }
      ]
    },
    {
      topic: 'Hedging in a debate',
      explanation: 'Very strong opinions can sound rude in Spanish, so speakers add small hedges: quizás, tal vez, cabe destacar que, hasta cierto punto. These let you disagree politely and keep the conversation open.',
      table: [
        ['Spanish', 'English'],
        ['Quizás tengas razón.', 'Maybe you are right.'],
        ['Hasta cierto punto, de acuerdo.', 'Up to a point, I agree.'],
        ['Cabe destacar que falta dinero.', 'It is worth noting that money is lacking.'],
        ['Podría ser, pero no estoy seguro.', 'It could be, but I am not sure.']
      ],
      examples: [
        { es: 'Tal vez tengas razón, pero hay otra forma de verlo.', trans: 'tal BEH TEN-gas rah-SON PEH-ro eye OH-trah FOR-mah deh BEHR-lo', en: 'Maybe you are right, but there is another way to see it.' }
      ]
    }
  ],
  vocabulary: [
    { id: 'u31-sociedad', es: 'sociedad', translit: 'soh-sye-DAD', en: 'society', pos: 'noun', gender: 'f' },
    { id: 'u31-gobierno', es: 'gobierno', translit: 'goh-BYER-no', en: 'government', pos: 'noun', gender: 'm' },
    { id: 'u31-politica', es: 'política', translit: 'po-LEE-tee-kah', en: 'politics / policy', pos: 'noun', gender: 'f' },
    { id: 'u31-ley', es: 'ley', translit: 'ley', en: 'law', pos: 'noun', gender: 'f' },
    { id: 'u31-derecho', es: 'derecho', translit: 'deh-REH-cho', en: 'right', pos: 'noun', gender: 'm' },
    { id: 'u31-ciudadano', es: 'ciudadano', translit: 'syoo-dah-DAH-no', en: 'citizen', pos: 'noun', gender: 'm' },
    { id: 'u31-politico', es: 'político', translit: 'po-LEE-tee-ko', en: 'politician', pos: 'noun', gender: 'm' },
    { id: 'u31-elecciones', es: 'elecciones', translit: 'eh-lek-SYOH-nes', en: 'elections', pos: 'noun', gender: 'p' },
    { id: 'u31-voto', es: 'voto', translit: 'BOH-to', en: 'vote', pos: 'noun', gender: 'm' },
    { id: 'u31-partido', es: 'partido', translit: 'par-TEE-do', en: 'political party', pos: 'noun', gender: 'm' },
    { id: 'u31-debate', es: 'debate', translit: 'deh-BAH-teh', en: 'debate', pos: 'noun', gender: 'm' },
    { id: 'u31-opinion', es: 'opinión', translit: 'oh-pee-NYON', en: 'opinion', pos: 'noun', gender: 'f' },
    { id: 'u31-economia', es: 'economía', translit: 'eh-koh-noh-MEE-ah', en: 'economy', pos: 'noun', gender: 'f' },
    { id: 'u31-impuesto', es: 'impuesto', translit: 'eem-PWES-to', en: 'tax', pos: 'noun', gender: 'm' },
    { id: 'u31-corrupcion', es: 'corrupción', translit: 'koh-roop-SYON', en: 'corruption', pos: 'noun', gender: 'f' },
    { id: 'u31-justicia', es: 'justicia', translit: 'hoos-TEE-syah', en: 'justice', pos: 'noun', gender: 'f' },
    { id: 'u31-igualdad', es: 'igualdad', translit: 'ee-gwal-DAD', en: 'equality', pos: 'noun', gender: 'f' },
    { id: 'u31-crisis', es: 'crisis', translit: 'KREE-sees', en: 'crisis', pos: 'noun', gender: 'f' },
    { id: 'u31-propuesta', es: 'propuesta', translit: 'pro-PWES-tah', en: 'proposal', pos: 'noun', gender: 'f' },
    { id: 'u31-educacion', es: 'educación', translit: 'eh-doo-kah-SYON', en: 'education', pos: 'noun', gender: 'f' },
    { id: 'u31-protestar', es: 'protestar', translit: 'pro-tes-TAR', en: 'to protest', pos: 'verb' },
    { id: 'u31-exigir', es: 'exigir', translit: 'ek-see-HEER', en: 'to demand', pos: 'verb' },
    { id: 'u31-defender', es: 'defender', translit: 'deh-fen-DER', en: 'to defend', pos: 'verb' },
    { id: 'u31-votar', es: 'votar', translit: 'boh-TAR', en: 'to vote', pos: 'verb' },
    { id: 'u31-debatir', es: 'debatir', translit: 'deh-bah-TEER', en: 'to debate', pos: 'verb' },
    { id: 'u31-creer', es: 'creer', translit: 'kreh-EHR', en: 'to believe', pos: 'verb' },
    { id: 'u31-justo', es: 'justo', translit: 'HOOS-to', en: 'fair / just', pos: 'adjective' },
    { id: 'u31-corrupto', es: 'corrupto', translit: 'koh-ROOP-to', en: 'corrupt', pos: 'adjective' },
    { id: 'u31-sinembargo', es: 'sin embargo', translit: 'seen em-BAR-go', en: 'however', pos: 'adverb' }
  ],
  phrases: [
    { id: 'p-u31-1', es: 'Hay que votar con cuidado.', trans: 'eye keh boh-TAR kon kwee-DAH-do', en: 'We have to vote carefully.' },
    { id: 'p-u31-2', es: 'Se dice que subirán los impuestos.', trans: 'seh DEE-seh keh soo-bee-RAN los eem-PWES-tos', en: 'It is said that taxes will rise.' },
    { id: 'p-u31-3', es: 'En mi opinión, faltan soluciones.', trans: 'en mee oh-pee-NYON FAL-tan soh-loo-SYOH-nes', en: 'In my opinion, solutions are lacking.' },
    { id: 'p-u31-4', es: 'No estoy de acuerdo.', trans: 'no es-TOY deh ah-KWER-do', en: 'I do not agree.' }
  ],
  sentences: [
    { es: 'El gobierno aprobó una ley nueva sobre los impuestos.', translit: 'el goh-BYER-no ah-pro-BO OO-nah ley NWEH-bah SOH-breh los eem-PWES-tos', en: 'The government passed a new law about taxes.', words: [{ id: 'u31-gobierno', es: 'gobierno', en: 'government' }, { id: 'u31-ley', es: 'ley', en: 'law' }, { id: 'u31-impuesto', es: 'impuestos', en: 'taxes' }] },
    { es: 'No creo que los políticos escuchen a los ciudadanos.', translit: 'no KREH-o keh los po-LEE-tee-kos es-KOO-chen ah los syoo-dah-DAH-nos', en: 'I do not think that politicians listen to the citizens.', words: [{ id: 'u31-creer', es: 'creo', en: 'I believe' }, { id: 'u31-politico', es: 'políticos', en: 'politicians' }, { id: 'u31-ciudadano', es: 'ciudadanos', en: 'citizens' }] },
    { es: 'Es importante que todos voten en las elecciones.', translit: 'es eem-por-TAN-teh keh TOH-dos BOH-ten en las eh-lek-SYOH-nes', en: 'It is important that everyone votes in the elections.', words: [{ id: 'u31-votar', es: 'voten', en: 'they vote' }, { id: 'u31-elecciones', es: 'elecciones', en: 'elections' }] },
    { es: 'La gente exige justicia y más igualdad.', translit: 'lah HEN-teh ek-SEE-heh hoos-TEE-syah ee mas ee-gwal-DAD', en: 'People demand justice and more equality.', words: [{ id: 'u31-exigir', es: 'exige', en: 'demands' }, { id: 'u31-justicia', es: 'justicia', en: 'justice' }, { id: 'u31-igualdad', es: 'igualdad', en: 'equality' }] },
    { es: 'Sin embargo, muchos ciudadanos no confían en el gobierno.', translit: 'seen em-BAR-go MOO-chos syoo-dah-DAH-nos no kon-FEE-an en el goh-BYER-no', en: 'However, many citizens do not trust the government.', words: [{ id: 'u31-sinembargo', es: 'Sin embargo', en: 'however' }, { id: 'u31-ciudadano', es: 'ciudadanos', en: 'citizens' }, { id: 'u31-gobierno', es: 'gobierno', en: 'government' }] },
    { es: 'En mi opinión, la educación es la mejor propuesta.', translit: 'en mee oh-pee-NYON lah eh-doo-kah-SYON es lah meh-HOR pro-PWES-tah', en: 'In my opinion, education is the best proposal.', words: [{ id: 'u31-opinion', es: 'opinión', en: 'opinion' }, { id: 'u31-educacion', es: 'educación', en: 'education' }, { id: 'u31-propuesta', es: 'propuesta', en: 'proposal' }] }
  ],
  dialogue: {
    title: 'Un debate en la cafetería (A debate in the cafe)',
    lines: [
      { who: 'Rosa', es: '¿Viste el debate anoche? Los candidatos hablaron de la economía.', en: 'Did you see the debate last night? The candidates talked about the economy.' },
      { who: 'Julián', es: 'Sí, pero no creo que digan la verdad sobre los impuestos.', en: 'Yes, but I do not think they are telling the truth about taxes.' },
      { who: 'Rosa', es: 'Puede ser. En mi opinión, falta una propuesta seria de educación.', en: 'It could be. In my opinion, a serious proposal on education is missing.' },
      { who: 'Julián', es: 'De acuerdo. Además, la corrupción sigue siendo un problema grave.', en: 'Agreed. Besides, corruption is still a serious problem.' },
      { who: 'Rosa', es: 'Sin embargo, hay que reconocer que hubo algunos avances.', en: 'However, we have to admit that there were some advances.' },
      { who: 'Julián', es: 'Tal vez. Pero la gente exige resultados, no promesas.', en: 'Maybe. But people demand results, not promises.' },
      { who: 'Rosa', es: 'Por eso todos debemos votar con cuidado.', en: 'That is why we all have to vote carefully.' }
    ],
    questions: [
      { type: 'mc-en', q: '¿De qué hablaron los candidatos?', options: ['About the economy', 'About sports', 'About the weather', 'About tourism'], answer: 'About the economy' },
      { type: 'mc-en', q: '¿Qué opina Julián sobre los impuestos?', options: ['He does not think they tell the truth', 'He agrees completely', 'He thinks they are too low', 'He does not care'], answer: 'He does not think they tell the truth' },
      { type: 'mc-en', q: '¿Qué dice Julián que exige la gente?', options: ['Results', 'More debates', 'Lower prices', 'New elections'], answer: 'Results' }
    ]
  },
  quiz: [
    { type: 'mc-en', q: '¿Qué significa «sociedad»?', options: ['society', 'government', 'economy', 'justice'], answer: 'society', es: 'sociedad' },
    { type: 'mc-en', q: '¿Qué significa «gobierno»?', options: ['government', 'citizen', 'law', 'party'], answer: 'government', es: 'gobierno' },
    { type: 'mc-es', q: 'How do you say law?', options: ['ley', 'voto', 'derecho', 'crisis'], answer: 'ley', es: 'ley' },
    { type: 'mc-es', q: 'How do you say elections?', options: ['elecciones', 'impuestos', 'leyes', 'propuestas'], answer: 'elecciones', es: 'elecciones' },
    { type: 'typing', q: 'Type the word for vote in Spanish', answer: 'voto', accepts: [], es: 'voto' },
    { type: 'typing', q: 'Type the word for justice in Spanish', answer: 'justicia', accepts: [], es: 'justicia' },
    { type: 'mc-en', q: '¿Qué significa «corrupción»?', options: ['corruption', 'equality', 'opinion', 'education'], answer: 'corruption', es: 'corrupción' },
    { type: 'mc-es', q: 'How do you say to vote?', options: ['votar', 'debatir', 'exigir', 'protestar'], answer: 'votar', es: 'votar' },
    { type: 'mc-en', q: '¿Qué significa «ciudadano»?', options: ['citizen', 'politician', 'government', 'tax'], answer: 'citizen', es: 'ciudadano' },
    { type: 'mc-en', q: '¿Qué significa «impuesto»?', options: ['tax', 'vote', 'law', 'debate'], answer: 'tax', es: 'impuesto' },
    { type: 'mc-es', q: 'Complete: No creo que esa ley ... justa.', options: ['sea', 'es', 'será', 'era'], answer: 'sea', es: 'sea' },
    { type: 'mc-es', q: 'How do you say equality?', options: ['igualdad', 'justicia', 'libertad', 'sociedad'], answer: 'igualdad', es: 'igualdad' },
    { type: 'mc-en', q: '¿Qué significa «sin embargo»?', options: ['however', 'therefore', 'besides', 'for example'], answer: 'however', es: 'sin embargo' },
    { type: 'typing', q: 'Type the word for to demand in Spanish', answer: 'exigir', accepts: [], es: 'exigir' }
  ],
  test: {
    title: 'Unit 31 test — Society & politics',
    questions: [
      { type: 'mc-en', q: '¿Qué significa «derecho»?', options: ['right', 'law', 'duty', 'tax'], answer: 'right', es: 'derecho' },
      { type: 'mc-es', q: 'How do you say politics?', options: ['política', 'economía', 'sociedad', 'justicia'], answer: 'política', es: 'política' },
      { type: 'typing', q: 'Type the word for to protest in Spanish', answer: 'protestar', accepts: [], es: 'protestar' },
      { type: 'typing', q: 'Type the word for debate in Spanish', answer: 'debate', accepts: [], es: 'debate' },
      { type: 'mc-en', q: '¿Qué significa «justo»?', options: ['fair / just', 'corrupt', 'rich', 'strict'], answer: 'fair / just', es: 'justo' },
      { type: 'mc-es', q: 'Complete: No es verdad que ... crisis.', options: ['haya', 'hay', 'habrá', 'había'], answer: 'haya', es: 'haya' },
      { type: 'mc-es', q: 'How do you say politician?', options: ['político', 'ciudadano', 'gobierno', 'partido'], answer: 'político', es: 'político' },
      { type: 'mc-en', q: '¿Qué significa «propuesta»?', options: ['proposal', 'promise', 'protest', 'problem'], answer: 'proposal', es: 'propuesta' },
      { type: 'typing', q: 'Type the word for education in Spanish', answer: 'educacion', accepts: ['educación'], es: 'educación' },
      { type: 'mc-en', q: '¿Qué significa «creer»?', options: ['to believe', 'to vote', 'to demand', 'to defend'], answer: 'to believe', es: 'creer' },
      { type: 'mc-es', q: 'Which word means economy?', options: ['economía', 'política', 'corrupción', 'crisis'], answer: 'economía', es: 'economía' },
      { type: 'mc-en', q: '¿Qué significa «corrupto»?', options: ['corrupt', 'fair', 'honest', 'serious'], answer: 'corrupt', es: 'corrupto' }
    ]
  }
};
