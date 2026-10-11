// Unit 26 — Media & news. B1.
export const unit = {
  id: 'u26',
  level: 'B1',
  number: 26,
  title: 'Media & news',
  titleEs: 'Medios y noticias',
  story: 'The news is everywhere: telenovelas, headlines, podcasts, viral clips. This unit gives you the words to follow the news and, more importantly, to think critically about it — what is a fact, what is a rumor, and which sources you can trust.',
  grammar: [
    {
      topic: 'Passive voice with ser + participle',
      explanation: 'To say something was done by someone, use ser + past participle: el artículo fue publicado (the article was published). The participle agrees with the subject.',
      table: [
        ['Spanish', 'English'],
        ['La noticia fue publicada ayer.', 'The news was published yesterday.'],
        ['El reportaje fue escrito por una periodista.', 'The report was written by a journalist.'],
        ['Las fotos fueron tomadas en San Juan.', 'The photos were taken in San Juan.'],
        ['El video fue compartido miles de veces.', 'The video was shared thousands of times.']
      ],
      examples: [
        { es: 'La entrevista fue transmitida por la radio.', trans: 'la en-treh-BEES-ta fweh trans-mee-TEE-da por la RAH-dyo', en: 'The interview was broadcast on the radio.' },
        { es: 'El periódico fue fundado en 1950.', trans: 'el peh-ree-OH-dee-ko fweh foon-DA-do en 1950', en: 'The newspaper was founded in 1950.' }
      ]
    },
    {
      topic: 'Se impersonal for general statements',
      explanation: 'Use se + third person for impersonal statements: se dice (it is said), se informa (it is reported). It is perfect for the news because it removes the doer.',
      table: [
        ['Spanish', 'English'],
        ['Se dice que el presidente viaja mañana.', 'It is said that the president travels tomorrow.'],
        ['Se informa sobre el clima cada hora.', 'It is reported on the weather every hour.'],
        ['Se publican noticias falsas también.', 'False news is published too.'],
        ['¿Se sabe algo nuevo?', 'Is anything new known?']
      ],
      examples: [
        { es: 'Se dice que pronto abrirán un nuevo cine.', trans: 'seh DEE-seh keh PRON-to ah-bee-RAHN oon NWEH-bo SEE-neh', en: 'It is said that a new cinema will open soon.' },
        { es: 'Se habla mucho de ese tema en la radio.', trans: 'seh AH-bla MOO-cho deh EH-seh TEH-ma en la RAH-dyo', en: 'That topic is talked about a lot on the radio.' }
      ]
    },
    {
      topic: 'To verify: comprobar, verificar, confirmar',
      explanation: 'Critical reading needs verbs of checking. Comprobar and verificar both mean to verify or check; confirmar is to confirm. Follow them with que + a clause: comprobé que la noticia era falsa.',
      table: [
        ['Verb', 'Example', 'Meaning'],
        ['comprobar', 'Compruebo los datos.', 'I check the data.'],
        ['verificar', 'Verificaron la fuente.', 'They verified the source.'],
        ['confirmar', 'Confirmo la información.', 'I confirm the information.']
      ],
      examples: [
        { es: 'Comprobar las fuentes es crucial.', trans: 'kom-pro-BAR las FWEN-tes es kroo-SYAL', en: 'Checking the sources is crucial.' },
        { es: 'El periodista verificó la historia.', trans: 'el peh-ree-O-dis-tah beh-ree-FEE-ko la ees-TO-ryah', en: 'The journalist verified the story.' }
      ]
    }
  ],
  vocabulary: [
    { id: 'u26-noticia', es: 'noticia', translit: 'no-TEE-sya', en: 'news piece', pos: 'noun', gender: 'f' },
    { id: 'u26-noticias', es: 'noticias', translit: 'no-TEE-syas', en: 'news', pos: 'noun', gender: 'p' },
    { id: 'u26-periodico', es: 'periódico', translit: 'peh-ree-OH-dee-ko', en: 'newspaper', pos: 'noun', gender: 'm' },
    { id: 'u26-radio', es: 'radio', translit: 'RAH-dyo', en: 'radio', pos: 'noun', gender: 'f' },
    { id: 'u26-television', es: 'televisión', translit: 'teh-leh-bee-SYON', en: 'television', pos: 'noun', gender: 'f' },
    { id: 'u26-internet', es: 'internet', translit: 'een-ter-NET', en: 'internet', pos: 'noun', gender: 'm' },
    { id: 'u26-articulo', es: 'artículo', translit: 'ar-TEE-koo-lo', en: 'article', pos: 'noun', gender: 'm' },
    { id: 'u26-titular', es: 'titular', translit: 'tee-too-LAR', en: 'headline', pos: 'noun', gender: 'm' },
    { id: 'u26-periodista', es: 'periodista', translit: 'peh-ree-o-DEES-ta', en: 'journalist', pos: 'noun', gender: 'm' },
    { id: 'u26-informar', es: 'informar', translit: 'een-for-MAR', en: 'to inform / report', pos: 'verb' },
    { id: 'u26-publicar', es: 'publicar', translit: 'poo-blee-KAR', en: 'to publish', pos: 'verb' },
    { id: 'u26-verificar', es: 'verificar', translit: 'beh-ree-fee-KAR', en: 'to verify', pos: 'verb' },
    { id: 'u26-compartir', es: 'compartir', translit: 'kom-par-TEER', en: 'to share', pos: 'verb' },
    { id: 'u26-suscribirse', es: 'suscribirse', translit: 'soos-kree-BEER-seh', en: 'to subscribe', pos: 'verb' },
    { id: 'u26-fiable', es: 'fiable', translit: 'FYAH-bleh', en: 'reliable', pos: 'adjective' },
    { id: 'u26-falso', es: 'falso', translit: 'FAL-so', en: 'false', pos: 'adjective' },
    { id: 'u26-verdad', es: 'verdad', translit: 'behr-DAD', en: 'truth', pos: 'noun', gender: 'f' },
    { id: 'u26-fuente', es: 'fuente', translit: 'FWEN-teh', en: 'source', pos: 'noun', gender: 'f' }
  ],
  phrases: [
    { id: 'p-u26-1', es: '¿Qué noticias hay hoy?', trans: 'keh no-TEE-syas ay oy', en: 'What news is there today?' },
    { id: 'p-u26-2', es: 'Lo vi en la televisión.', trans: 'lo bee en la teh-leh-bee-SYON', en: 'I saw it on television.' },
    { id: 'p-u26-3', es: 'Ese periódico es poco fiable.', trans: 'EH-seh peh-ree-OH-dee-ko es PO-ko FYAH-bleh', en: 'That newspaper is not very reliable.' }
  ],
  sentences: [
    { es: 'La periodista publicó un artículo importante.', translit: 'la peh-ree-o-DEES-tah poo-blee-KO oon ar-TEE-koo-lo eem-por-TAN-teh', en: 'The journalist published an important article.', words: [{ id: 'u26-periodista', es: 'periodista', en: 'journalist' }, { id: 'u26-publicar', es: 'publicó', en: 'published' }, { id: 'u26-articulo', es: 'artículo', en: 'article' }] },
    { es: 'Las noticias de hoy informan sobre el clima.', translit: 'las no-TEE-syas deh oy een-FOR-man SO-breh el KLEE-ma', en: 'Today news reports on the weather.', words: [{ id: 'u26-noticias', es: 'noticias', en: 'news' }, { id: 'u26-informar', es: 'informan', en: 'they report' }] },
    { es: 'Leo el periódico cada mañana con el café.', translit: 'LEH-o el peh-ree-OH-dee-ko KA-da ma-NYA-na kon el ka-FEH', en: 'I read the newspaper every morning with my coffee.', words: [{ id: 'u26-periodico', es: 'periódico', en: 'newspaper' }] },
    { es: 'Me suscribí a un canal de noticias fiable.', translit: 'meh soos-kree-BEE a oon ka-NAL deh no-TEE-syas FYAH-bleh', en: 'I subscribed to a reliable news channel.', words: [{ id: 'u26-suscribirse', es: 'suscribí', en: 'I subscribed' }, { id: 'u26-noticias', es: 'noticias', en: 'news' }, { id: 'u26-fiable', es: 'fiable', en: 'reliable' }] },
    { es: 'La verdad es más importante que el titular.', translit: 'la behr-DAD es mas eem-por-TAN-teh keh el tee-too-LAR', en: 'The truth is more important than the headline.', words: [{ id: 'u26-verdad', es: 'verdad', en: 'truth' }, { id: 'u26-titular', es: 'titular', en: 'headline' }] },
    { es: 'Un buen periodista debe verificar su fuente.', translit: 'oon bwen peh-ree-o-DEES-tah DEH-beh beh-ree-fee-KAR soo FWEN-teh', en: 'A good journalist must verify their source.', words: [{ id: 'u26-periodista', es: 'periodista', en: 'journalist' }, { id: 'u26-verificar', es: 'verificar', en: 'to verify' }, { id: 'u26-fuente', es: 'fuente', en: 'source' }] }
  ],
  dialogue: {
    title: 'Talking about the news (Hablando de las noticias)',
    lines: [
      { who: 'Marta', es: '¿Leíste las noticias de hoy?', en: 'Did you read today news?' },
      { who: 'Pablo', es: 'Sí, el periódico publicó un artículo sobre la economía.', en: 'Yes, the newspaper published an article about the economy.' },
      { who: 'Marta', es: 'Ese periódico es muy parcial. Busca otra fuente.', en: 'That newspaper is very biased. Look for another source.' },
      { who: 'Pablo', es: 'Tienes razón. Es mejor informarse con varias fuentes.', en: 'You are right. It is better to get informed with several sources.' },
      { who: 'Marta', es: 'Y verifica siempre la verdad antes de compartir.', en: 'And always verify the truth before sharing.' }
    ],
    questions: [
      { type: 'mc-en', q: 'What did the newspaper publish?', options: ['an article about the economy', 'a song', 'a recipe', 'a map'], answer: 'an article about the economy' },
      { type: 'mc-en', q: 'Why does Marta warn Pablo?', options: ['the newspaper is biased', 'the newspaper is fun', 'the newspaper is old', 'the newspaper is free'], answer: 'the newspaper is biased' },
      { type: 'mc-en', q: 'What should you verify before sharing?', options: ['the truth', 'the price', 'the weather', 'the time'], answer: 'the truth' }
    ]
  },
  quiz: [
    { type: 'mc-en', q: '¿Qué significa «noticia»?', options: ['news piece', 'notice', 'novel', 'number'], answer: 'news piece', es: 'noticia' },
    { type: 'mc-es', q: 'How do you say newspaper?', options: ['periódico', 'perro', 'persona', 'pintura'], answer: 'periódico', es: 'periódico' },
    { type: 'typing', q: 'Type truth in Spanish', answer: 'verdad', accepts: [], es: 'verdad' },
    { type: 'mc-en', q: '¿Qué significa «titular»?', options: ['headline', 'title page', 'ticket', 'tower'], answer: 'headline', es: 'titular' },
    { type: 'mc-es', q: 'Complete: La noticia fue ___ por el periódico.', options: ['publicada', 'publicado', 'publicar', 'publicando'], answer: 'publicada', es: 'la noticia fue publicada por el periódico' },
    { type: 'typing', q: 'Type source in Spanish', answer: 'fuente', accepts: [], es: 'fuente' },
    { type: 'mc-en', q: '¿Qué significa «periodista»?', options: ['journalist', 'journal', 'priest', 'pianist'], answer: 'journalist', es: 'periodista' },
    { type: 'mc-es', q: 'Which means to verify?', options: ['verificar', 'viajar', 'vender', 'beber'], answer: 'verificar', es: 'verificar' },
    { type: 'mc-en', q: '¿Qué significa «fiable»?', options: ['reliable', 'fragile', 'final', 'floaty'], answer: 'reliable', es: 'fiable' },
    { type: 'mc-es', q: 'Complete: ___ que va a llover.', options: ['Se dice', 'Me llamo', 'Te parece', 'Nos vemos'], answer: 'Se dice', es: 'se dice que va a llover' },
    { type: 'typing', q: 'Type to share in Spanish', answer: 'compartir', accepts: [], es: 'compartir' },
    { type: 'mc-en', q: '¿Qué significa «falso»?', options: ['false', 'true', 'fast', 'far'], answer: 'false', es: 'falso' }
  ],
  test: {
    title: 'Unit 26 test — Media & news',
    questions: [
      { type: 'mc-en', q: '¿Qué significa «Lo vi en la televisión»?', options: ['I saw it on television', 'I heard it on the radio', 'I read it online', 'I forgot it'], answer: 'I saw it on television', es: 'lo vi en la televisión' },
      { type: 'mc-es', q: 'Which sentence uses the passive voice?', options: ['El artículo fue publicado', 'El artículo es interesante', 'Yo publico artículos', 'Publico mañana'], answer: 'El artículo fue publicado', es: 'el artículo fue publicado' },
      { type: 'typing', q: 'Type article in Spanish', answer: 'artículo', accepts: [], es: 'artículo' },
      { type: 'mc-en', q: '¿Qué significa «radio»?', options: ['radio', 'river', 'raid', 'ride'], answer: 'radio', es: 'radio' },
      { type: 'mc-es', q: 'Complete: El video fue ___ miles de veces.', options: ['compartido', 'compartir', 'compartiendo', 'comparte'], answer: 'compartido', es: 'el video fue compartido miles de veces' },
      { type: 'typing', q: 'Type to publish in Spanish', answer: 'publicar', accepts: [], es: 'publicar' },
      { type: 'mc-en', q: '¿Qué significa «televisión»?', options: ['television', 'telephone', 'telegraph', 'telescope'], answer: 'television', es: 'televisión' },
      { type: 'mc-es', q: 'How do you ask what news is there?', options: ['¿Qué noticias hay hoy?', '¿Qué hora es hoy?', '¿Qué quieres hoy?', '¿Qué compras hoy?'], answer: '¿Qué noticias hay hoy?', es: '¿qué noticias hay hoy?' },
      { type: 'typing', q: 'Type internet in Spanish', answer: 'internet', accepts: [], es: 'internet' },
      { type: 'mc-en', q: '¿Qué significa «informar»?', options: ['to inform', 'to invent', 'to invite', 'to ignore'], answer: 'to inform', es: 'informar' },
      { type: 'mc-es', q: 'Complete: Esa página es poco ___.', options: ['fiable', 'fácil', 'caliente', 'dulce'], answer: 'fiable', es: 'esa página es poco fiable' },
      { type: 'typing', q: 'Type to subscribe (reflexive) in Spanish', answer: 'suscribirse', accepts: [], es: 'suscribirse' }
    ]
  }
};