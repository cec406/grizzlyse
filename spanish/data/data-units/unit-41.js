// Unit 41 — Formal & academic register. C1.
export const unit = {
  id: 'u41',
  level: 'C1',
  number: 41,
  title: 'Formal & academic register',
  titleEs: 'El registro formal y académico',
  story: 'You are writing to a university in Madrid about a research stay, and later to a bank in San Juan. The words on the page decide whether people take you seriously. In this unit you learn the polite formulas, connectors and structures of formal and academic Spanish, so that your letters sound educated and respectful.',
  grammar: [
    {
      topic: 'The polite letter: openings and closings',
      explanation: 'Formal letters have fixed opening and closing formulas. Use Estimado señor or Estimada señora when you know the person, and Estimados señores for a company. End with Atentamente or the warmer Quedo a su disposición. Never open a formal letter with hola.',
      table: [
        ['Formula', 'Use', 'English'],
        ['Estimado señor García:', 'to one man you do not know well', 'Dear Mr. García:'],
        ['Estimada doctora Ruiz:', 'to a woman with a title', 'Dear Dr. Ruiz:'],
        ['Estimados señores:', 'to a company or a group', 'Dear Sirs:'],
        ['Atentamente,', 'standard closing', 'Sincerely,'],
        ['Quedo a su disposición.', 'ready to help', 'I remain at your disposal.']
      ],
      examples: [
        { es: 'Estimada señora López: Le escribo para solicitar una plaza.', trans: 'es-tee-MAH-dah se-NYO-rah LO-pez leh es-KREE-bo PAH-rah so-lee-see-TAR OO-nah PLAH-sah', en: 'Dear Mrs. López: I am writing to apply for a place.' },
        { es: 'Atentamente, Juan Pérez.', trans: 'ah-ten-tah-MEN-teh hwan PEH-res', en: 'Sincerely, Juan Pérez.' }
      ]
    },
    {
      topic: 'Polite requests with the conditional',
      explanation: 'In formal register a direct command sounds rude. The conditional (querría, podría, sería) and the imperfect (quería) soften every request. Me gustaría and Le agradecería are the workhorses of polite writing.',
      table: [
        ['Direct', 'Polite', 'English'],
        ['Quiero información.', 'Querría información.', 'I would like information.'],
        ['Mándeme el documento.', '¿Podría enviarme el documento?', 'Could you send me the document?'],
        ['Necesito una cita.', 'Me gustaría pedir una cita.', 'I would like to request an appointment.'],
        ['Gracias.', 'Le agradezco de antemano.', 'I thank you in advance.']
      ],
      examples: [
        { es: 'Le agradecería que me enviara los detalles.', trans: 'leh ah-grah-deh-seh-REE-ah keh meh en-VYAH-rah los deh-TAH-yes', en: 'I would be grateful if you would send me the details.' },
        { es: '¿Sería posible concertar una entrevista?', trans: 'seh-REE-ah po-SEE-bleh kon-ser-TAR OO-nah en-treh-VEES-tah', en: 'Would it be possible to arrange an interview?' }
      ]
    },
    {
      topic: 'Academic connectors',
      explanation: 'Academic Spanish links ideas with precise connectors. Use por consiguiente, asimismo, no obstante and en cuanto a to move from one argument to the next without sounding repetitive.',
      table: [
        ['Connector', 'Meaning', 'Register'],
        ['por consiguiente', 'therefore', 'formal'],
        ['asimismo', 'likewise / also', 'formal'],
        ['no obstante / sin embargo', 'however', 'formal'],
        ['en cuanto a', 'regarding', 'formal'],
        ['puesto que', 'since / given that', 'formal']
      ],
      examples: [
        { es: 'El estudio es limitado; no obstante, los resultados son claros.', trans: 'el es-TOO-dyo es lee-mee-TAH-do no obs-TAN-teh los reh-sool-TAH-dos son KLAH-ros', en: 'The study is limited; however, the results are clear.' },
        { es: 'Asimismo, conviene señalar que el costo aumentó.', trans: 'ah-see-MEES-moh kon-VYEH-neh se-nyah-LAR keh el KOS-toh ow-men-TOH', en: 'Likewise, it is worth noting that the cost increased.' }
      ]
    }
  ],
  vocabulary: [
    { id: 'u41-estimado', es: 'estimado', translit: 'es-tee-MAH-do', en: 'dear (in a letter)', pos: 'adjective' },
    { id: 'u41-atentamente', es: 'atentamente', translit: 'ah-ten-tah-MEN-teh', en: 'sincerely (letter closing)', pos: 'adverb' },
    { id: 'u41-solicitar', es: 'solicitar', translit: 'so-lee-see-TAR', en: 'to request / to apply for', pos: 'verb' },
    { id: 'u41-solicitud', es: 'solicitud', translit: 'so-lee-see-TOOD', en: 'application / request', pos: 'noun', gender: 'f' },
    { id: 'u41-destinatario', es: 'destinatario', translit: 'des-tee-nah-TAH-ryo', en: 'recipient', pos: 'noun', gender: 'm' },
    { id: 'u41-remitente', es: 'remitente', translit: 'reh-mee-TEN-teh', en: 'sender', pos: 'noun', gender: 'm' },
    { id: 'u41-adjunto', es: 'adjunto', translit: 'ahd-HOON-toh', en: 'attached / attachment', pos: 'noun', gender: 'm' },
    { id: 'u41-acuse', es: 'acuse', translit: 'ah-KOO-seh', en: 'acknowledgment (acuse de recibo)', pos: 'noun', gender: 'm' },
    { id: 'u41-disposicion', es: 'disposición', translit: 'dees-po-see-SYON', en: 'availability / disposal', pos: 'noun', gender: 'f' },
    { id: 'u41-asimismo', es: 'asimismo', translit: 'ah-see-MEES-moh', en: 'likewise / also', pos: 'adverb' },
    { id: 'u41-obstante', es: 'no obstante', translit: 'no obs-TAN-teh', en: 'nevertheless / however', pos: 'phrase' },
    { id: 'u41-puestoque', es: 'puesto que', translit: 'PWES-toh keh', en: 'since / given that', pos: 'conjunction' },
    { id: 'u41-formal', es: 'formal', translit: 'for-MAL', en: 'formal', pos: 'adjective' },
    { id: 'u41-encabezado', es: 'encabezado', translit: 'en-kah-beh-SAH-do', en: 'letterhead / heading', pos: 'noun', gender: 'm' },
    { id: 'u41-despedida', es: 'despedida', translit: 'des-peh-DEE-dah', en: 'closing / farewell', pos: 'noun', gender: 'f' },
    { id: 'u41-cortesia', es: 'cortesía', translit: 'kor-teh-SEE-ah', en: 'courtesy', pos: 'noun', gender: 'f' },
    { id: 'u41-ponencia', es: 'ponencia', translit: 'po-NEN-syah', en: 'paper / conference talk', pos: 'noun', gender: 'f' },
    { id: 'u41-plantear', es: 'plantear', translit: 'plan-teh-AR', en: 'to raise / to pose (a question)', pos: 'verb' }
  ],
  phrases: [
    { id: 'p-u41-1', es: 'A quien corresponda:', trans: 'ah kyen ko-rres-PON-dah', en: 'To whom it may concern:' },
    { id: 'p-u41-2', es: 'Quedo a su disposición.', trans: 'KEH-do ah soo dees-po-see-SYON', en: 'I remain at your disposal.' },
    { id: 'p-u41-3', es: 'Le saluda atentamente,', trans: 'leh sah-LOO-dah ah-ten-tah-MEN-teh', en: 'Yours sincerely,' }
  ],
  sentences: [
    { es: 'Le escribo para solicitar una plaza en el programa.', translit: 'leh es-KREE-bo PAH-rah so-lee-see-TAR OO-nah PLAH-sah en el pro-GRAH-mah', en: 'I am writing to apply for a place in the program.', words: [{ id: 'u41-solicitar', es: 'solicitar', en: 'to apply for' }] },
    { es: 'La solicitud debe ir con el currículum adjunto.', translit: 'lah so-lee-see-TOOD DEH-beh eer kon el koo-RREE-koo-loom ahd-HOON-toh', en: 'The application must go with the attached résumé.', words: [{ id: 'u41-solicitud', es: 'solicitud', en: 'application' }, { id: 'u41-adjunto', es: 'adjunto', en: 'attached' }] },
    { es: 'No obstante, el comité pidió más información.', translit: 'no obs-TAN-teh el ko-mee-TEH pee-DYO mas een-for-mah-SYON', en: 'Nevertheless, the committee asked for more information.', words: [{ id: 'u41-obstante', es: 'No obstante', en: 'nevertheless' }] },
    { es: 'Le agradezco su cortesía y su pronta respuesta.', translit: 'leh ah-grah-DEH-sko soo kor-teh-SEE-ah ee soo PRON-tah res-PWES-tah', en: 'I thank you for your courtesy and your prompt reply.', words: [{ id: 'u41-cortesia', es: 'cortesía', en: 'courtesy' }] },
    { es: 'El profesor planteó una pregunta interesante.', translit: 'el pro-feh-SOR plan-teh-OH OO-nah pre-GOON-tah een-teh-reh-SAN-teh', en: 'The professor raised an interesting question.', words: [{ id: 'u41-plantear', es: 'planteó', en: 'raised' }] },
    { es: 'Asimismo, adjunto los documentos que usted pidió.', translit: 'ah-see-MEES-moh ahd-HOON-toh los do-koo-MEN-tos keh oos-TED pee-DYO', en: 'Likewise, I attach the documents that you requested.', words: [{ id: 'u41-asimismo', es: 'Asimismo', en: 'likewise' }] }
  ],
  dialogue: {
    title: 'En la oficina de admisiones (At the admissions office)',
    lines: [
      { who: 'Ana', es: 'Buenos días. Vengo a entregar mi solicitud de ingreso.', en: 'Good morning. I am here to hand in my admission application.' },
      { who: 'Luis', es: 'Buenos días. ¿Trae el formulario completo y firmado?', en: 'Good morning. Do you have the form complete and signed?' },
      { who: 'Ana', es: 'Sí, aquí está. También adjunto una carta de recomendación.', en: 'Yes, here it is. I also attach a letter of recommendation.' },
      { who: 'Luis', es: 'Muy bien. Le agradecería que escribiera su teléfono aquí.', en: 'Very good. I would be grateful if you would write your phone number here.' },
      { who: 'Ana', es: '¿Sería posible saber cuándo salen los resultados?', en: 'Would it be possible to know when the results come out?' },
      { who: 'Luis', es: 'Por supuesto. Atentamente recibirá una carta a finales del mes.', en: 'Of course. You will duly receive a letter at the end of the month.' }
    ],
    questions: [
      { type: 'mc-en', q: '¿Qué viene a entregar Ana?', options: ['una solicitud', 'un examen médico', 'un informe largo', 'una carta privada'], answer: 'una solicitud' },
      { type: 'mc-en', q: '¿Qué le pide Luis a Ana?', options: ['que escriba su teléfono', 'que vuelva mañana', 'que pague una cuota', 'que llame después'], answer: 'que escriba su teléfono' },
      { type: 'mc-en', q: '¿Cuándo sabrá Ana los resultados?', options: ['a finales del mes', 'esta tarde', 'mañana', 'el año que viene'], answer: 'a finales del mes' }
    ]
  },
  quiz: [
    { type: 'mc-en', q: '¿Qué significa «solicitud»?', options: ['application / request', 'receipt', 'letterhead', 'sender'], answer: 'application / request', es: 'solicitud' },
    { type: 'mc-es', q: 'How do you say to request / to apply for?', options: ['solicitar', 'agradecer', 'enviar', 'firmar'], answer: 'solicitar', es: 'solicitar' },
    { type: 'mc-en', q: '¿Qué significa «atentamente»?', options: ['sincerely', 'finally', 'quickly', 'perhaps'], answer: 'sincerely', es: 'atentamente' },
    { type: 'mc-en', q: '¿Qué significa «no obstante»?', options: ['nevertheless', 'in addition', 'for example', 'at last'], answer: 'nevertheless', es: 'no obstante' },
    { type: 'mc-es', q: 'Which phrase politely asks for something?', options: ['Le agradecería', 'Dame eso', 'Mándalo ya', 'Quiero ahora'], answer: 'Le agradecería', es: 'Le agradecería' },
    { type: 'typing', q: 'Type to apply for in Spanish.', answer: 'solicitar', accepts: [], es: 'solicitar' },
    { type: 'mc-en', q: '¿Qué significa «remitente»?', options: ['sender', 'recipient', 'stamp', 'envelope'], answer: 'sender', es: 'remitente' },
    { type: 'mc-es', q: 'Which word means recipient?', options: ['destinatario', 'remitente', 'adjunto', 'encabezado'], answer: 'destinatario', es: 'destinatario' },
    { type: 'mc-en', q: '¿Qué significa «adjunto»?', options: ['attached', 'signed', 'urgent', 'sealed'], answer: 'attached', es: 'adjunto' },
    { type: 'mc-es', q: 'Complete the connector: ___ , conviene señalar que el costo aumentó.', options: ['Asimismo', 'Sin embargo', 'En cambio', 'Por eso'], answer: 'Asimismo', es: 'Asimismo' },
    { type: 'typing', q: 'Type sincerely in Spanish (one word).', answer: 'atentamente', accepts: [], es: 'atentamente' },
    { type: 'mc-en', q: '¿Qué significa «cortesía»?', options: ['courtesy', 'carelessness', 'haste', 'silence'], answer: 'courtesy', es: 'cortesía' },
    { type: 'mc-es', q: 'Which greeting belongs in a formal letter?', options: ['Estimados señores', 'Hola amigos', 'Qué tal', 'Qué onda'], answer: 'Estimados señores', es: 'Estimados señores' }
  ],
  test: {
    title: 'Unit 41 test — Formal & academic register',
    questions: [
      { type: 'mc-en', q: '¿Qué significa «estimado»?', options: ['dear', 'famous', 'expensive', 'unknown'], answer: 'dear', es: 'estimado' },
      { type: 'mc-es', q: 'Say sender.', options: ['remitente', 'destinatario', 'adjunto', 'solicitud'], answer: 'remitente', es: 'remitente' },
      { type: 'typing', q: 'Type attachment in Spanish.', answer: 'adjunto', accepts: [], es: 'adjunto' },
      { type: 'mc-en', q: '¿Qué significa «asimismo»?', options: ['likewise / also', 'however', 'therefore', 'instead'], answer: 'likewise / also', es: 'asimismo' },
      { type: 'mc-es', q: 'Which is a formal closing?', options: ['Atentamente', 'Chau', 'Nos vemos', 'Hasta pronto'], answer: 'Atentamente', es: 'Atentamente' },
      { type: 'typing', q: 'Type application / request in Spanish.', answer: 'solicitud', accepts: [], es: 'solicitud' },
      { type: 'mc-en', q: '¿Qué significa «encabezado»?', options: ['letterhead / heading', 'envelope', 'stamp', 'paragraph'], answer: 'letterhead / heading', es: 'encabezado' },
      { type: 'mc-es', q: 'Which connector means since / given that?', options: ['puesto que', 'pero', 'y', 'o'], answer: 'puesto que', es: 'puesto que' },
      { type: 'mc-en', q: '¿Qué significa «despedida»?', options: ['closing / farewell', 'greeting', 'meeting', 'signature'], answer: 'closing / farewell', es: 'despedida' },
      { type: 'typing', q: 'Type to raise (a question) in Spanish.', answer: 'plantear', accepts: [], es: 'plantear' },
      { type: 'mc-es', q: 'Which is the polite way to ask for a document?', options: ['¿Podría enviarme el documento?', 'Mándame el documento ya', 'Quiero el documento', 'Dame el documento'], answer: '¿Podría enviarme el documento?', es: '¿Podría enviarme el documento?' },
      { type: 'mc-en', q: '¿Qué significa «ponencia»?', options: ['paper / conference talk', 'office', 'meeting', 'deadline'], answer: 'paper / conference talk', es: 'ponencia' }
    ]
  }
};
