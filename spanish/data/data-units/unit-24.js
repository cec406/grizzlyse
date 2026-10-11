// Unit 24 — Travel & comparisons. B1.
export const unit = {
  id: 'u24',
  level: 'B1',
  number: 24,
  title: 'Travel & comparisons',
  titleEs: 'Viajes y comparaciones',
  story: 'When you travel, you constantly compare: this beach is nicer, that flight is cheaper, this island is as pretty as they say. This unit teaches you the comparison toolkit — más que, menos que, tan como — plus the words you need at the airport and the hotel.',
  grammar: [
    {
      topic: 'Más / menos que — than',
      explanation: 'For comparisons of inequality use más que (more than) or menos que (less than). The adjective agrees with the thing described: la playa es más bonita que la montaña.',
      table: [
        ['Spanish', 'English'],
        ['Este vuelo es más barato que el otro.', 'This flight is cheaper than the other.'],
        ['El tren es menos rápido que el avión.', 'The train is less fast than the plane.'],
        ['Mis hermanos son más altos que yo.', 'My brothers are taller than me.'],
        ['Las playas son más bonitas que las montañas.', 'The beaches are prettier than the mountains.']
      ],
      examples: [
        { es: 'Viajar en avión es más rápido que en guagua.', trans: 'bya-HAR en ah-BYON es mas RAH-pee-do keh en GWA-gwa', en: 'Traveling by plane is faster than by bus.' },
        { es: 'Este hotel es menos caro que el primero.', trans: 'ES-teh oh-TEL es MEH-nos KA-ro keh el pree-MEH-ro', en: 'This hotel is less expensive than the first one.' }
      ]
    },
    {
      topic: 'Tan ... como — as ... as',
      explanation: 'For comparisons of equality use tan + adjective + como: tan bonito como (as pretty as). Tan does not change form; the adjective still agrees in gender and number.',
      table: [
        ['Spanish', 'English'],
        ['La isla es tan grande como yo imaginaba.', 'The island is as big as I imagined.'],
        ['El café es tan bueno como dicen.', 'The coffee is as good as they say.'],
        ['No es tan caro como pensaba.', 'It is not as expensive as I thought.']
      ],
      examples: [
        { es: 'El museo es tan antiguo como la catedral.', trans: 'el moo-SEH-o es tan an-TEE-gwo KO-mo la ka-teh-DRAL', en: 'The museum is as old as the cathedral.' },
        { es: 'Es tan bonito como las fotos.', trans: 'es tan bo-NEE-to KO-mo las FO-tos', en: 'It is as pretty as the photos.' }
      ]
    },
    {
      topic: 'Ir / llegar / volar — travel verbs',
      explanation: 'A few verbs carry you through any trip. Ir is to go, llegar is to arrive and volar is to fly. In the past: fui (I went), llegué (I arrived), volé (I flew).',
      table: [
        ['Infinitive', 'yo form', 'Meaning'],
        ['ir', 'voy / fui', 'to go'],
        ['llegar', 'llego / llegué', 'to arrive'],
        ['volar', 'vuelo / volé', 'to fly'],
        ['tomar', 'tomo / tomé', 'to take (a bus, a flight)']
      ],
      examples: [
        { es: 'Llegué al aeropuerto a las ocho.', trans: 'ye-GEH al ah-eh-ro-PWER-to a las O-cho', en: 'I arrived at the airport at eight.' },
        { es: 'Volé desde Nueva York hasta San Juan.', trans: 'bo-LEH DES-deh NWEH-ba york AS-ta san HWAHN', en: 'I flew from New York to San Juan.' }
      ]
    }
  ],
  vocabulary: [
    { id: 'u24-viajar', es: 'viajar', translit: 'bya-HAR', en: 'to travel', pos: 'verb' },
    { id: 'u24-volar', es: 'volar', translit: 'vo-LAR', en: 'to fly', pos: 'verb' },
    { id: 'u24-llegar', es: 'llegar', translit: 'yeh-GAR', en: 'to arrive', pos: 'verb' },
    { id: 'u24-pais', es: 'país', translit: 'pah-EES', en: 'country', pos: 'noun', gender: 'm' },
    { id: 'u24-vuelo', es: 'vuelo', translit: 'VWEH-lo', en: 'flight', pos: 'noun', gender: 'm' },
    { id: 'u24-pasaporte', es: 'pasaporte', translit: 'pah-sah-POR-teh', en: 'passport', pos: 'noun', gender: 'm' },
    { id: 'u24-playa', es: 'playa', translit: 'PLAH-ya', en: 'beach', pos: 'noun', gender: 'f' },
    { id: 'u24-montana', es: 'montaña', translit: 'mon-TA-nya', en: 'mountain', pos: 'noun', gender: 'f' },
    { id: 'u24-museo', es: 'museo', translit: 'moo-SEH-o', en: 'museum', pos: 'noun', gender: 'm' },
    { id: 'u24-mas', es: 'más', translit: 'mas', en: 'more', pos: 'adverb' },
    { id: 'u24-menos', es: 'menos', translit: 'MEH-nos', en: 'less', pos: 'adverb' },
    { id: 'u24-que', es: 'que', translit: 'keh', en: 'than', pos: 'conjunction' },
    { id: 'u24-tan', es: 'tan', translit: 'tan', en: 'so / as', pos: 'adverb' },
    { id: 'u24-como', es: 'como', translit: 'KO-mo', en: 'as', pos: 'conjunction' },
    { id: 'u24-mejor', es: 'mejor', translit: 'meh-HOR', en: 'better', pos: 'adjective' },
    { id: 'u24-caro', es: 'caro', translit: 'KA-ro', en: 'expensive', pos: 'adjective' },
    { id: 'u24-barato', es: 'barato', translit: 'bah-RA-to', en: 'cheap', pos: 'adjective' },
    { id: 'u24-grande', es: 'grande', translit: 'GRAN-deh', en: 'big', pos: 'adjective' }
  ],
  phrases: [
    { id: 'p-u24-1', es: '¿Cuál es más barato?', trans: 'kwal es mas bah-RA-to', en: 'Which one is cheaper?' },
    { id: 'p-u24-2', es: 'Es tan bonito como dicen.', trans: 'es tan bo-NEE-to KO-mo DEE-sen', en: 'It is as pretty as they say.' },
    { id: 'p-u24-3', es: 'Puerto Rico es más divertido que imaginaba.', trans: 'PWER-to REH-ko es mas dee-ber-TEE-do keh ee-mah-hee-NA-ba', en: 'Puerto Rico is more fun than I imagined.' }
  ],
  sentences: [
    { es: 'Viajar en avión es más rápido que en guagua.', translit: 'bya-HAR en ah-BYON es mas RAH-pee-do keh en GWA-gwa', en: 'Traveling by plane is faster than by bus.', words: [{ id: 'u24-viajar', es: 'Viajar', en: 'to travel' }, { id: 'u24-mas', es: 'más', en: 'more' }, { id: 'u24-que', es: 'que', en: 'than' }] },
    { es: 'El museo es tan antiguo como la catedral.', translit: 'el moo-SEH-o es tan an-TEE-gwo KO-mo la ka-teh-DRAL', en: 'The museum is as old as the cathedral.', words: [{ id: 'u24-museo', es: 'museo', en: 'museum' }, { id: 'u24-tan', es: 'tan', en: 'so / as' }, { id: 'u24-como', es: 'como', en: 'as' }] },
    { es: 'Este vuelo es más barato que el otro.', translit: 'ES-teh VWEH-lo es mas bah-RA-to keh el O-tro', en: 'This flight is cheaper than the other one.', words: [{ id: 'u24-vuelo', es: 'vuelo', en: 'flight' }, { id: 'u24-mas', es: 'más', en: 'more' }, { id: 'u24-barato', es: 'barato', en: 'cheap' }, { id: 'u24-que', es: 'que', en: 'than' }] },
    { es: 'Mi pasaporte está vencido; es mejor renovarlo.', translit: 'mee pah-sah-POR-teh es-TAH ben-SEE-do es meh-HOR reh-no-VAR-lo', en: 'My passport is expired; it is better to renew it.', words: [{ id: 'u24-pasaporte', es: 'pasaporte', en: 'passport' }, { id: 'u24-mejor', es: 'mejor', en: 'better' }] },
    { es: 'El país es tan grande como dos islas.', translit: 'el pah-EES es tan GRAN-deh KO-mo dos EES-las', en: 'The country is as big as two islands.', words: [{ id: 'u24-pais', es: 'país', en: 'country' }, { id: 'u24-tan', es: 'tan', en: 'so / as' }, { id: 'u24-grande', es: 'grande', en: 'big' }, { id: 'u24-como', es: 'como', en: 'as' }] },
    { es: 'La playa es más bonita, pero la montaña es más tranquila.', translit: 'la PLAH-ya es mas bo-NEE-tah PEH-ro la mon-TA-nya es mas tran-KEE-lah', en: 'The beach is prettier, but the mountain is calmer.', words: [{ id: 'u24-playa', es: 'playa', en: 'beach' }, { id: 'u24-mas', es: 'más', en: 'more' }, { id: 'u24-montana', es: 'montaña', en: 'mountain' }] }
  ],
  dialogue: {
    title: 'Planning a weekend (Planificando el fin de semana)',
    lines: [
      { who: 'Sofía', es: '¿Qué prefieres, la playa o la montaña?', en: 'What do you prefer, the beach or the mountain?' },
      { who: 'Diego', es: 'Me gustan las dos, pero la playa es más divertida.', en: 'I like both, but the beach is more fun.' },
      { who: 'Sofía', es: 'Sí, pero la montaña es más tranquila.', en: 'Yes, but the mountain is calmer.' },
      { who: 'Diego', es: 'Este año el vuelo es más barato que el año pasado.', en: 'This year the flight is cheaper than last year.' },
      { who: 'Sofía', es: '¡Viajemos juntos entonces!', en: 'Let us travel together then!' }
    ],
    questions: [
      { type: 'mc-en', q: 'What does Sofía ask Diego?', options: ['beach or mountain', 'plane or train', 'hotel or hostel', 'morning or night'], answer: 'beach or mountain' },
      { type: 'mc-en', q: 'According to Diego, which is more fun?', options: ['the beach', 'the mountain', 'the city', 'the museum'], answer: 'the beach' },
      { type: 'mc-en', q: 'What is cheaper this year?', options: ['the flight', 'the hotel', 'the food', 'the bus'], answer: 'the flight' }
    ]
  },
  quiz: [
    { type: 'mc-en', q: '¿Qué significa «viajar»?', options: ['to travel', 'to arrive', 'to fly', 'to leave'], answer: 'to travel', es: 'viajar' },
    { type: 'mc-es', q: 'How do you say more?', options: ['más', 'menos', 'tan', 'como'], answer: 'más', es: 'más' },
    { type: 'typing', q: 'Type less in Spanish', answer: 'menos', accepts: [], es: 'menos' },
    { type: 'mc-en', q: '¿Qué significa «barato»?', options: ['cheap', 'expensive', 'big', 'small'], answer: 'cheap', es: 'barato' },
    { type: 'mc-es', q: 'Complete: La playa es ___ bonita como la montaña.', options: ['tan', 'más', 'menos', 'que'], answer: 'tan', es: 'la playa es tan bonita como la montaña' },
    { type: 'typing', q: 'Type flight in Spanish', answer: 'vuelo', accepts: [], es: 'vuelo' },
    { type: 'mc-en', q: '¿Qué significa «país»?', options: ['country', 'city', 'village', 'sea'], answer: 'country', es: 'país' },
    { type: 'mc-es', q: 'Which word means than?', options: ['que', 'como', 'tan', 'pero'], answer: 'que', es: 'que' },
    { type: 'mc-en', q: '¿Qué significa «caro»?', options: ['expensive', 'cheap', 'free', 'far'], answer: 'expensive', es: 'caro' },
    { type: 'mc-es', q: 'Complete: Este avión es más grande ___ el otro.', options: ['que', 'como', 'tan', 'menos'], answer: 'que', es: 'este avión es más grande que el otro' },
    { type: 'typing', q: 'Type passport in Spanish', answer: 'pasaporte', accepts: [], es: 'pasaporte' },
    { type: 'mc-en', q: '¿Qué significa «montaña»?', options: ['mountain', 'beach', 'island', 'bridge'], answer: 'mountain', es: 'montaña' }
  ],
  test: {
    title: 'Unit 24 test — Travel & comparisons',
    questions: [
      { type: 'mc-en', q: '¿Qué significa «Es tan bonito como dicen»?', options: ['It is as pretty as they say', 'It is more expensive than they say', 'It is bigger than they say', 'It is farther than they say'], answer: 'It is as pretty as they say', es: 'es tan bonito como dicen' },
      { type: 'mc-es', q: 'Which phrase compares two unequal things?', options: ['más ... que', 'tan ... como', 'ni ... ni', 'o ... o'], answer: 'más ... que', es: 'más ... que' },
      { type: 'typing', q: 'Type to fly in Spanish', answer: 'volar', accepts: [], es: 'volar' },
      { type: 'mc-en', q: '¿Qué significa «mejor»?', options: ['better', 'worse', 'bigger', 'smaller'], answer: 'better', es: 'mejor' },
      { type: 'mc-es', q: 'Complete: No es ___ frío como esperaba.', options: ['tan', 'más', 'menos', 'que'], answer: 'tan', es: 'no es tan frío como esperaba' },
      { type: 'typing', q: 'Type to arrive in Spanish', answer: 'llegar', accepts: [], es: 'llegar' },
      { type: 'mc-en', q: '¿Qué significa «playa»?', options: ['beach', 'mountain', 'forest', 'desert'], answer: 'beach', es: 'playa' },
      { type: 'mc-es', q: 'How do you say the museum?', options: ['el museo', 'la museo', 'el musea', 'los museo'], answer: 'el museo', es: 'el museo' },
      { type: 'typing', q: 'Type big in Spanish', answer: 'grande', accepts: [], es: 'grande' },
      { type: 'mc-en', q: '¿Qué significa «menos»?', options: ['less', 'more', 'than', 'as'], answer: 'less', es: 'menos' },
      { type: 'mc-es', q: 'Complete: La catedral es más antigua ___ el museo.', options: ['que', 'como', 'tan', 'de'], answer: 'que', es: 'la catedral es más antigua que el museo' },
      { type: 'typing', q: 'Type country in Spanish', answer: 'país', accepts: [], es: 'país' }
    ]
  }
};