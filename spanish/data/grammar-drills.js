// Hand-verified grammar drills: verb conjugation, por/para, gender & articles.
// All forms double-checked. Prefer quality over quantity.

export const VERB_DRILLS = [
  { context: 'Yo ___ español. (hablar, present)', es: 'Yo hablo español.', correct: 'hablo', options: ['hablo', 'hablas', 'habla', 'hablamos'], explain: '-ar verbs: yo hablo.' },
  { context: 'Tú ___ inglés. (hablar, present)', es: 'Tú hablas inglés.', correct: 'hablas', options: ['hablas', 'hablo', 'habla', 'habláis'], explain: '-ar verbs: tú hablas.' },
  { context: 'Él ___ en un banco. (trabajar, present)', es: 'Él trabaja en un banco.', correct: 'trabaja', options: ['trabaja', 'trabajas', 'trabajo', 'trabajamos'], explain: '-ar verbs: él trabaja.' },
  { context: 'Nosotros ___ en Madrid. (vivir, present)', es: 'Nosotros vivimos en Madrid.', correct: 'vivimos', options: ['vivimos', 'vives', 'vive', 'vivo'], explain: '-ir verbs: nosotros vivimos.' },
  { context: 'Ellos ___ por teléfono. (hablar, present)', es: 'Ellos hablan por teléfono.', correct: 'hablan', options: ['hablan', 'hablamos', 'habláis', 'hablo'], explain: '-ar verbs: ellos hablan.' },
  { context: 'Yo ___ café. (beber, present)', es: 'Yo bebo café.', correct: 'bebo', options: ['bebo', 'bebes', 'bebe', 'bebemos'], explain: '-er verbs: yo bebo.' },
  { context: 'Tú ___ un sándwich. (comer, present)', es: 'Tú comes un sándwich.', correct: 'comes', options: ['comes', 'como', 'come', 'comemos'], explain: '-er verbs: tú comes.' },
  { context: 'Él ___ helado. (comer, present)', es: 'Él come helado.', correct: 'come', options: ['come', 'comes', 'como', 'comen'], explain: '-er verbs: él come.' },
  { context: 'Nosotros ___ agua. (beber, present)', es: 'Nosotros bebemos agua.', correct: 'bebemos', options: ['bebemos', 'bebo', 'bebes', 'bebe'], explain: '-er verbs: nosotros bebemos.' },
  { context: 'Yo ___ ir contigo. (querer, present)', es: 'Yo quiero ir contigo.', correct: 'quiero', options: ['quiero', 'quieres', 'quiere', 'queremos'], explain: 'querer is stem-changing (e→ie): yo quiero.' },
  { context: 'Tú ___ ayudarme? (poder, present)', es: '¿Tú puedes ayudarme?', correct: 'puedes', options: ['puedes', 'puedo', 'puede', 'pueden'], explain: 'poder is stem-changing (o→ue): tú puedes.' },
  { context: 'Yo ___ a la escuela. (ir, present)', es: 'Yo voy a la escuela.', correct: 'voy', options: ['voy', 'vas', 'va', 'vamos'], explain: 'ir is irregular: yo voy.' },
  { context: 'Ella ___ a Madrid. (ir, present)', es: 'Ella va a Madrid.', correct: 'va', options: ['va', 'vas', 'voy', 'van'], explain: 'ir: ella va.' },
  { context: 'Nosotros ___ música. (escuchar, present)', es: 'Nosotros escuchamos música.', correct: 'escuchamos', options: ['escuchamos', 'escucho', 'escuchas', 'escuchan'], explain: '-ar verbs: nosotros escuchamos.' },
  { context: 'Yo ___ a mi madre. (querer, present)', es: 'Yo quiero a mi madre.', correct: 'quiero', options: ['quiero', 'quieres', 'quiere', 'queremos'], explain: 'querer e→ie: yo quiero.' },
  { context: 'Tú ___ fútbol? (jugar, present)', es: '¿Tú juegas fútbol?', correct: 'juegas', options: ['juegas', 'juego', 'juega', 'juegan'], explain: 'jugar is stem-changing (u→ue): tú juegas.' },
  { context: 'Yo ___ la televisión. (ver, present)', es: 'Yo veo la televisión.', correct: 'veo', options: ['veo', 'ves', 've', 'vemos'], explain: 'ver: yo veo.' },
  { context: '¿Vosotros ___ español? (hablar, present)', es: '¿Vosotros habláis español?', correct: 'habláis', options: ['habláis', 'hablamos', 'hablan', 'habla'], explain: '-ar verbs (Spain): vosotros habláis.' },
  { context: 'Usted ___ español? (hablar, polite present)', es: '¿Usted habla español?', correct: 'habla', options: ['habla', 'hablas', 'hablo', 'hablan'], explain: 'Usted takes the él form: usted habla.' },
  { context: 'Ellos ___ muchos libros. (leer, present)', es: 'Ellos leen muchos libros.', correct: 'leen', options: ['leen', 'lee', 'leemos', 'leo'], explain: '-er verbs: ellos leen.' },
  { context: 'Yo ___ una carta. (escribir, present)', es: 'Yo escribo una carta.', correct: 'escribo', options: ['escribo', 'escribes', 'escribe', 'escriben'], explain: '-ir verbs: yo escribo.' },
  { context: 'Ella ___ dos idiomas. (saber, present)', es: 'Ella sabe dos idiomas.', correct: 'sabe', options: ['sabe', 'sé', 'sabes', 'sabemos'], explain: 'saber: ella sabe.' },
  { context: '¿Tú ___ mi amiga? (conocer, present)', es: '¿Tú conoces a mi amiga?', correct: 'conoces', options: ['conoces', 'conozco', 'conoce', 'conocen'], explain: 'conocer: tú conoces.' },
  { context: 'Yo ___ a mi profesora. (conocer, present)', es: 'Yo conozco a mi profesora.', correct: 'conozco', options: ['conozco', 'conoces', 'conoce', 'conocen'], explain: 'conocer: yo conozco (zc in the yo form).' },
  { context: 'Nosotros ___ a las ocho. (cenar, present)', es: 'Nosotros cenamos a las ocho.', correct: 'cenamos', options: ['cenamos', 'ceno', 'cenas', 'cenan'], explain: '-ar verbs: nosotros cenamos.' }
];

export const ASPECT_DRILLS = [
  { context: 'Este regalo es ___ ti. (for you, recipient)', es: 'Este regalo es para ti.', correct: 'para', options: ['para', 'por', 'de', 'en'], explain: 'para marks the recipient or goal: para ti.' },
  { context: 'Gracias ___ tu ayuda. (cause/means)', es: 'Gracias por tu ayuda.', correct: 'por', options: ['por', 'para', 'a', 'con'], explain: 'por expresses cause and gratitude: gracias por.' },
  { context: 'Estudio ___ aprender. (purpose)', es: 'Estudio para aprender.', correct: 'para', options: ['para', 'por', 'de', 'a'], explain: 'para + infinitive expresses purpose: in order to.' },
  { context: 'Caminamos ___ el parque. (through/along)', es: 'Caminamos por el parque.', correct: 'por', options: ['por', 'para', 'en', 'a'], explain: 'por means through, along or around a place.' },
  { context: 'Salimos ___ Madrid mañana. (destination)', es: 'Salimos para Madrid mañana.', correct: 'para', options: ['para', 'por', 'a', 'de'], explain: 'para marks a destination or deadline.' },
  { context: '___ favor, siéntate. (fixed expression)', es: 'Por favor, siéntate.', correct: 'Por', options: ['Por', 'Para', 'De', 'En'], explain: 'Fixed phrase: por favor.' },
  { context: 'Termino el trabajo ___ la tarde. (by/in, time)', es: 'Termino el trabajo por la tarde.', correct: 'por', options: ['por', 'para', 'a', 'de'], explain: 'por la tarde means in the afternoon (part of day).' },
  { context: 'Compré flores ___ mi madre. (for, intended)', es: 'Compré flores para mi madre.', correct: 'para', options: ['para', 'por', 'de', 'con'], explain: 'Intended for someone → para.' },
  { context: 'Pagué veinte euros ___ el libro. (exchange)', es: 'Pagué veinte euros por el libro.', correct: 'por', options: ['por', 'para', 'a', 'en'], explain: 'por marks exchange, price paid.' },
  { context: 'La tarea es ___ el lunes. (deadline)', es: 'La tarea es para el lunes.', correct: 'para', options: ['para', 'por', 'de', 'en'], explain: 'para marks a deadline: due by Monday.' }
];

export const CASE_DRILLS = [
  { prompt: '___ casa es grande. (definite article, feminine)', es: 'La casa es grande.', correct: 'La', options: ['La', 'El', 'Los', 'Las'], explain: 'casa is feminine singular → la casa.' },
  { prompt: '___ libro es nuevo. (definite article, masculine)', es: 'El libro es nuevo.', correct: 'El', options: ['El', 'La', 'Los', 'Las'], explain: 'libro is masculine singular → el libro.' },
  { prompt: '___ flores son bonitas. (definite article, plural)', es: 'Las flores son bonitas.', correct: 'Las', options: ['Las', 'Los', 'La', 'El'], explain: 'flores is feminine plural → las flores.' },
  { prompt: '___ chicos son altos. (definite article, plural)', es: 'Los chicos son altos.', correct: 'Los', options: ['Los', 'Las', 'El', 'La'], explain: 'chicos is masculine plural → los chicos.' },
  { prompt: 'Tengo ___ amiga española. (indefinite, feminine)', es: 'Tengo una amiga española.', correct: 'una', options: ['una', 'un', 'unos', 'unas'], explain: 'amiga is feminine singular → una amiga.' },
  { prompt: 'Quiero ___ café. (indefinite, masculine)', es: 'Quiero un café.', correct: 'un', options: ['un', 'una', 'unos', 'unas'], explain: 'café is masculine singular → un café.' },
  { prompt: 'Necesito ___ sillas. (indefinite, feminine plural)', es: 'Necesito unas sillas.', correct: 'unas', options: ['unas', 'unos', 'una', 'un'], explain: 'sillas is feminine plural → unas sillas.' },
  { prompt: 'Compré ___ tomates. (indefinite, masculine plural)', es: 'Compré unos tomates.', correct: 'unos', options: ['unos', 'unas', 'un', 'una'], explain: 'tomates is masculine plural → unos tomates.' },
  { prompt: 'El agua está ___. (cold, feminine adjective)', es: 'El agua está fría.', correct: 'fría', options: ['fría', 'frío', 'frías', 'fríos'], explain: 'agua is feminine (el agua), so the adjective is fría.' },
  { prompt: 'El problema es muy ___. (difficult, masculine)', es: 'El problema es muy difícil.', correct: 'difícil', options: ['difícil', 'difícila', 'difíciles', 'difícilo'], explain: 'problema is masculine despite the -a: difícil is invariable here.' },
  { prompt: 'Mi hermano es ___. (tall, masculine)', es: 'Mi hermano es alto.', correct: 'alto', options: ['alto', 'alta', 'altos', 'altas'], explain: 'hermano is masculine singular → alto.' },
  { prompt: 'Mi hermana es ___. (tall, feminine)', es: 'Mi hermana es alta.', correct: 'alta', options: ['alta', 'alto', 'altas', 'altos'], explain: 'hermana is feminine singular → alta.' },
  { prompt: 'La mano es ___. (small, feminine)', es: 'La mano es pequeña.', correct: 'pequeña', options: ['pequeña', 'pequeño', 'pequeñas', 'pequeños'], explain: 'mano is feminine although it ends in -o → pequeña.' },
  { prompt: 'Los días son ___. (long, masculine plural)', es: 'Los días son largos.', correct: 'largos', options: ['largos', 'largas', 'largo', 'larga'], explain: 'días is masculine plural → largos.' },
  { prompt: '___ águila vuela alto. (definite article before stressed a)', es: 'El águila vuela alto.', correct: 'El', options: ['El', 'La', 'Los', 'Las'], explain: 'Use el before a feminine noun starting with stressed a-: el águila.' },
  { prompt: 'Estas son mis ___. (keys, feminine plural)', es: 'Estas son mis llaves.', correct: 'llaves', options: ['llaves', 'llavos', 'llava', 'llave'], explain: 'llave is feminine; plural llaves.' }
];
