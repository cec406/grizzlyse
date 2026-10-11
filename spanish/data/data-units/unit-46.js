// Unit 46 — Language & style. C1.
export const unit = {
  id: 'u46',
  level: 'C1',
  number: 46,
  title: 'Language & style',
  titleEs: 'La lengua y el estilo',
  story: 'A translator is a stylist. You choose between two words that look the same in English but mean different things in Spanish, and you shift the register of a whole sentence with a single verb. This unit sharpens your judgment about false friends, calques and register, so that your Spanish stops sounding translated.',
  grammar: [
    {
      topic: 'False friends that trap learners',
      explanation: 'These words look like English but mean something else. Actual means current, not actual. Librería is a bookshop, not a library. Asistir means to attend, not to assist, and pretender means to intend, not to pretend.',
      table: [
        ['Spanish', 'Means', 'Not'],
        ['actual', 'current / present', 'actual'],
        ['librería', 'bookshop', 'library'],
        ['asistir', 'to attend', 'to assist'],
        ['pretender', 'to intend / to court', 'to pretend'],
        ['sensible', 'sensitive', 'sensible'],
        ['éxito', 'success', 'exit']
      ],
      examples: [
        { es: 'El precio actual es más alto que el del año pasado.', trans: 'el PREH-syoh ak-TWAL es mas AL-toh keh el del AH-nyoh pah-SAH-doh', en: 'The current price is higher than the one from last year.' },
        { es: 'Compré el libro en la librería de la esquina.', trans: 'kom-PREH el LEE-broh en lah lee-breh-REE-ah deh lah es-KEE-nah', en: 'I bought the book at the bookshop on the corner.' }
      ]
    },
    {
      topic: 'Calques to avoid',
      explanation: 'A calque copies an English structure word for word. Spanish prefers its own phrases: tener sentido, no hacer sentido; solicitar un trabajo, no aplicar para un trabajo; estar de acuerdo, no estar en acuerdo.',
      table: [
        ['English calque', 'Natural Spanish', 'Meaning'],
        ['hacer sentido', 'tener sentido', 'to make sense'],
        ['aplicar para un trabajo', 'solicitar un trabajo', 'to apply for a job'],
        ['estar en acuerdo', 'estar de acuerdo', 'to agree'],
        ['aplicar a la universidad', 'solicitar el ingreso', 'to apply to university'],
        ['chequear el correo', 'revisar el correo', 'to check the email']
      ],
      examples: [
        { es: 'Eso no tiene sentido; el argumento se contradice.', trans: 'EH-soh no TYEH-neh sen-TEE-doh el ar-goo-MEN-toh seh kon-trah-DEE-seh', en: 'That does not make sense; the argument contradicts itself.' },
        { es: 'Voy a solicitar un trabajo en la biblioteca.', trans: 'boy ah so-lee-see-TAR oon trah-BAH-hoh en lah bee-blee-oh-TEH-kah', en: 'I am going to apply for a job at the library.' }
      ]
    },
    {
      topic: 'Shifting the register',
      explanation: 'The same message can sound casual, neutral or formal. Choose the verb and the pronoun to match your reader: ¿Me ayudas? is friendly, ¿Podría ayudarme? is polite, and Le ruego que me preste su ayuda is very formal.',
      table: [
        ['Casual', 'Neutral', 'Formal'],
        ['¿Me ayudas?', '¿Puede ayudarme?', '¿Podría usted ayudarme?'],
        ['Te digo algo.', 'Le comento algo.', 'Le comunico algo.'],
        ['Es un lío.', 'Es complicado.', 'Resulta complejo.'],
        ['Vale.', 'Está bien.', 'De acuerdo.'],
        ['Chau.', 'Hasta luego.', 'Le saluda atentamente.']
      ],
      examples: [
        { es: 'Oye, no entiendo este lío; ¿me ayudas un momento?', trans: 'OH-yeh no en-TYEN-doh ES-teh LEE-oh meh ah-YOO-dahs oon moh-MEN-toh', en: 'Hey, I do not understand this mess; can you help me a moment?' },
        { es: 'Le ruego que me preste su ayuda con este asunto.', trans: 'leh RWEH-goh keh meh PRES-teh soo ah-YOO-dah kon ES-teh ah-SOON-toh', en: 'I beg you to lend me your help with this matter.' }
      ]
    }
  ],
  vocabulary: [
    { id: 'u46-falsoamigo', es: 'falso amigo', translit: 'FAL-soh ah-MEE-goh', en: 'false friend', pos: 'phrase' },
    { id: 'u46-traduccion', es: 'traducción', translit: 'trah-dook-SYON', en: 'translation', pos: 'noun', gender: 'f' },
    { id: 'u46-traducir', es: 'traducir', translit: 'trah-doo-SEER', en: 'to translate', pos: 'verb' },
    { id: 'u46-registro', es: 'registro', translit: 'reh-HEES-troh', en: 'register / tone', pos: 'noun', gender: 'm' },
    { id: 'u46-calco', es: 'calco', translit: 'KAL-koh', en: 'loan translation / calque', pos: 'noun', gender: 'm' },
    { id: 'u46-equivalente', es: 'equivalente', translit: 'eh-kee-bah-LEN-teh', en: 'equivalent', pos: 'noun', gender: 'm' },
    { id: 'u46-actual', es: 'actual', translit: 'ak-TWAL', en: 'current / present', pos: 'adjective' },
    { id: 'u46-embarazada', es: 'embarazada', translit: 'em-bah-rah-SAH-dah', en: 'pregnant', pos: 'adjective' },
    { id: 'u46-libreria', es: 'librería', translit: 'lee-breh-REE-ah', en: 'bookshop', pos: 'noun', gender: 'f' },
    { id: 'u46-exito', es: 'éxito', translit: 'EK-see-toh', en: 'success', pos: 'noun', gender: 'm' },
    { id: 'u46-asistir', es: 'asistir', translit: 'ah-sees-TEER', en: 'to attend', pos: 'verb' },
    { id: 'u46-realizar', es: 'realizar', translit: 'reh-ah-lee-SAR', en: 'to carry out', pos: 'verb' },
    { id: 'u46-sensible', es: 'sensible', translit: 'sen-SEE-bleh', en: 'sensitive', pos: 'adjective' },
    { id: 'u46-pretender', es: 'pretender', translit: 'preh-ten-DER', en: 'to intend / to aim for', pos: 'verb' },
    { id: 'u46-coloquial', es: 'coloquial', translit: 'ko-loh-KYAL', en: 'colloquial', pos: 'adjective' },
    { id: 'u46-culto', es: 'culto', translit: 'KOOL-toh', en: 'learned / educated', pos: 'adjective' },
    { id: 'u46-fluidez', es: 'fluidez', translit: 'flwee-DES', en: 'fluency', pos: 'noun', gender: 'f' },
    { id: 'u46-ambiguedad', es: 'ambigüedad', translit: 'am-bee-gweh-DAD', en: 'ambiguity', pos: 'noun', gender: 'f' }
  ],
  phrases: [
    { id: 'p-u46-1', es: 'No es lo mismo decir que traducir.', trans: 'no es loh MEES-moh deh-SEER keh trah-doo-SEER', en: 'Saying and translating are not the same thing.' },
    { id: 'p-u46-2', es: 'Cada registro tiene su palabra justa.', trans: 'KAH-dah reh-HEES-troh TYEH-neh soo pah-LAH-brah HOOS-tah', en: 'Each register has its exact word.' },
    { id: 'p-u46-3', es: 'Ese calco suena a inglés.', trans: 'EH-seh KAL-koh SWEH-nah ah een-GLES', en: 'That calque sounds like English.' }
  ],
  sentences: [
    { es: 'Un falso amigo se parece al inglés, pero significa otra cosa.', translit: 'oon FAL-soh ah-MEE-goh seh pah-REH-seh al een-GLES PEH-roh seeg-NEE-fee-kah OH-trah KOH-sah', en: 'A false friend looks like English, but it means something else.', words: [{ id: 'u46-falsoamigo', es: 'falso amigo', en: 'false friend' }] },
    { es: 'La traducción literal casi nunca funciona bien.', translit: 'lah trah-dook-SYON lee-teh-RAL KAH-see NOON-kah foon-SYOH-nah byen', en: 'Literal translation almost never works well.', words: [{ id: 'u46-traduccion', es: 'traducción', en: 'translation' }] },
    { es: 'No confundas librería con library: en español es una tienda de libros.', translit: 'no kon-FOON-dahs lee-breh-REE-ah kon LEE-brah-ree en es-pah-NYOL es OO-nah TYEN-dah deh LEE-brohs', en: 'Do not confuse librería with library: in Spanish it is a book shop.', words: [{ id: 'u46-libreria', es: 'librería', en: 'bookshop' }] },
    { es: 'El registro formal exige palabras más cultas.', translit: 'el reh-HEES-troh for-MAL ek-SEE-heh pah-LAH-brahs mas KOOL-tahs', en: 'The formal register demands more learned words.', words: [{ id: 'u46-registro', es: 'registro', en: 'register' }, { id: 'u46-culto', es: 'cultas', en: 'learned' }] },
    { es: 'Ese calco no es natural; es mejor decir tener sentido.', translit: 'EH-seh KAL-koh no es nah-too-RAL es meh-HOR deh-SEER teh-NER sen-TEE-doh', en: 'That calque is not natural; it is better to say tener sentido.', words: [{ id: 'u46-calco', es: 'calco', en: 'calque' }] },
    { es: 'Ella está embarazada, no avergonzada.', translit: 'EH-yah es-TA em-bah-rah-SAH-dah no ah-ber-gon-SAH-dah', en: 'She is pregnant, not embarrassed.', words: [{ id: 'u46-embarazada', es: 'embarazada', en: 'pregnant' }] },
    { es: 'Para lograr fluidez hay que practicar todos los días.', translit: 'PAH-rah loh-GRAR flwee-DES ai keh prak-tee-KAR TOH-dos los DEE-ahs', en: 'To achieve fluency you have to practise every day.', words: [{ id: 'u46-fluidez', es: 'fluidez', en: 'fluency' }] },
    { es: 'El verbo realizar equivale a llevar a cabo.', translit: 'el BER-boh reh-ah-lee-SAR eh-KEE-bah-leh ah yeh-BAR ah KAH-boh', en: 'The verb realizar is equivalent to carry out.', words: [{ id: 'u46-realizar', es: 'realizar', en: 'to carry out' }, { id: 'u46-equivalente', es: 'equivale', en: 'is equivalent' }] }
  ],
  dialogue: {
    title: 'El traductor (The translator)',
    lines: [
      { who: 'Marta', es: 'Luis, ¿tradujiste el correo al español?', en: 'Luis, did you translate the email into Spanish?' },
      { who: 'Luis', es: 'Sí, pero dudé con una palabra. Decía excited y puse emocionado.', en: 'Yes, but I hesitated with one word. It said excited and I wrote emocionado.' },
      { who: 'Marta', es: 'Bien, aunque en un correo de negocios suena mejor entusiasmado.', en: 'Fine, although in a business email entusiasmado sounds better.' },
      { who: 'Luis', es: 'Cierto. Iba a poner librería por library, pero eso sería un falso amigo.', en: 'True. I was going to write librería for library, but that would be a false friend.' },
      { who: 'Marta', es: 'Exacto. Recuerda que asistir significa acudir, no ayudar.', en: 'Exactly. Remember that asistir means to go to, not to help.' },
      { who: 'Luis', es: 'Gracias. El registro formal tiene sus trampas, y quiero hacerlo bien.', en: 'Thank you. The formal register has its traps, and I want to do it well.' }
    ],
    questions: [
      { type: 'mc-en', q: '¿Qué palabra le causó duda a Luis?', options: ['excited', 'library', 'success', 'register'], answer: 'excited' },
      { type: 'mc-en', q: '¿Qué significa librería en español?', options: ['una tienda de libros', 'una biblioteca', 'una oficina', 'un almacén'], answer: 'una tienda de libros' },
      { type: 'mc-en', q: '¿Qué significa asistir?', options: ['acudir', 'ayudar', 'aprender', 'esperar'], answer: 'acudir' }
    ]
  },
  quiz: [
    { type: 'mc-en', q: '¿Qué significa «éxito»?', options: ['success', 'exit', 'access', 'excuse'], answer: 'success', es: 'éxito' },
    { type: 'mc-en', q: '¿Qué significa «librería»?', options: ['bookshop', 'library', 'bookcase', 'printing press'], answer: 'bookshop', es: 'librería' },
    { type: 'mc-en', q: '¿Qué significa «embarazada»?', options: ['pregnant', 'embarrassed', 'tired', 'married'], answer: 'pregnant', es: 'embarazada' },
    { type: 'mc-en', q: '¿Qué significa «actual»?', options: ['current', 'actual', 'real', 'exact'], answer: 'current', es: 'actual' },
    { type: 'mc-es', q: 'Which word means to attend (a class)?', options: ['asistir', 'ayudar', 'llegar', 'esperar'], answer: 'asistir', es: 'asistir' },
    { type: 'mc-en', q: '¿Qué significa «sensible»?', options: ['sensitive', 'sensible', 'strong', 'silent'], answer: 'sensitive', es: 'sensible' },
    { type: 'mc-es', q: 'Which word means translation?', options: ['traducción', 'traición', 'tradición', 'transición'], answer: 'traducción', es: 'traducción' },
    { type: 'typing', q: 'Type false friend in Spanish (two words).', answer: 'falso amigo', accepts: [], es: 'falso amigo' },
    { type: 'mc-en', q: '¿Qué significa «registro»?', options: ['register / tone', 'record player', 'receipt', 'registry office'], answer: 'register / tone', es: 'registro' },
    { type: 'mc-es', q: 'Which word means to carry out?', options: ['realizar', 'reparar', 'rezar', 'resbalar'], answer: 'realizar', es: 'realizar' },
    { type: 'mc-en', q: '¿Qué significa «pretender»?', options: ['to intend / to aim for', 'to pretend', 'to ask', 'to forbid'], answer: 'to intend / to aim for', es: 'pretender' },
    { type: 'typing', q: 'Type to translate in Spanish.', answer: 'traducir', accepts: [], es: 'traducir' },
    { type: 'mc-es', q: 'Which sentence uses the natural phrase?', options: ['Eso tiene sentido', 'Eso hace sentido', 'Eso da sentido', 'Eso es sentido'], answer: 'Eso tiene sentido', es: 'Eso tiene sentido' },
    { type: 'mc-en', q: '¿Qué significa «fluidez»?', options: ['fluency', 'fluid', 'flood', 'flow chart'], answer: 'fluency', es: 'fluidez' }
  ],
  test: {
    title: 'Unit 46 test — Language & style',
    questions: [
      { type: 'mc-es', q: 'Which word is a false friend of exit?', options: ['éxito', 'salida', 'puerta', 'llegada'], answer: 'éxito', es: 'éxito' },
      { type: 'mc-es', q: 'Which word means a bookshop?', options: ['librería', 'biblioteca', 'papelería', 'libería'], answer: 'librería', es: 'librería' },
      { type: 'typing', q: 'Type success in Spanish.', answer: 'exito', accepts: ['éxito'], es: 'éxito' },
      { type: 'mc-en', q: '¿Qué significa «asistir»?', options: ['to attend', 'to assist', 'to insist', 'to resist'], answer: 'to attend', es: 'asistir' },
      { type: 'mc-es', q: 'Which word means colloquial?', options: ['coloquial', 'colosal', 'colonial', 'cordial'], answer: 'coloquial', es: 'coloquial' },
      { type: 'typing', q: 'Type register in Spanish.', answer: 'registro', accepts: [], es: 'registro' },
      { type: 'mc-en', q: '¿Qué significa «culto»?', options: ['learned / educated', 'cult', 'collar', 'curious'], answer: 'learned / educated', es: 'culto' },
      { type: 'mc-es', q: 'Which is a calque from English that Spanish avoids?', options: ['hacer sentido', 'tener razón', 'dar pena', 'poner atención'], answer: 'hacer sentido', es: 'hacer sentido' },
      { type: 'mc-en', q: '¿Qué significa «calco»?', options: ['loan translation', 'calculation', 'layer', 'carbon copy'], answer: 'loan translation', es: 'calco' },
      { type: 'mc-es', q: 'Which word means ambiguity?', options: ['ambigüedad', 'amabilidad', 'amplitud', 'antigüedad'], answer: 'ambigüedad', es: 'ambigüedad' },
      { type: 'typing', q: 'Type to carry out in Spanish.', answer: 'realizar', accepts: [], es: 'realizar' },
      { type: 'mc-en', q: '¿Qué significa «traducción»?', options: ['translation', 'betrayal', 'tradition', 'transition'], answer: 'translation', es: 'traducción' }
    ]
  }
};
