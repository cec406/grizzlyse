// Unit 8 — The city & directions. A1.
export const unit = {
  id: 'u08',
  level: 'A1',
  number: 8,
  title: 'The city & directions',
  titleEs: 'La ciudad',
  story: 'You are lost in Old San Juan with a map in your hand. This unit gives you the places in town, the question ¿Dónde está?, and the words for left, right, near and far. You will also learn how to move around with ir and tomar. After this unit you can find the beach, the bank and the best restaurant on the street.',
  grammar: [
    {
      topic: '¿Dónde está? — asking where',
      explanation: 'To ask where something is, use ¿Dónde está? for one place and ¿Dónde están? for several. The answer uses estar too, because it tells you the location of a known place.',
      table: [
        ['Spanish', 'English'],
        ['¿Dónde está la playa?', 'Where is the beach?'],
        ['¿Dónde está el hotel?', 'Where is the hotel?'],
        ['Está cerca.', 'It is near.'],
        ['Está lejos de aquí.', 'It is far from here.']
      ],
      examples: [
        { es: '¿Dónde está el museo?', trans: 'DON-deh es-TA el moo-SEH-oh', en: 'Where is the museum?' }
      ]
    },
    {
      topic: 'left, right, near, far',
      explanation: 'These short phrases tell people exactly where to look. a la derecha means to the right and a la izquierda means to the left. Use de after cerca and lejos to name the place.',
      table: [
        ['Spanish', 'English'],
        ['a la derecha', 'to the right'],
        ['a la izquierda', 'to the left'],
        ['cerca de', 'near / close to'],
        ['lejos de', 'far from'],
        ['delante de', 'in front of'],
        ['detrás de', 'behind']
      ],
      examples: [
        { es: 'La farmacia está a la izquierda, detrás del banco.', trans: 'lah far-MAH-syah es-TA ah lah ees-KYEHR-dah deh-TRAS del BAN-koh', en: 'The pharmacy is on the left, behind the bank.' }
      ]
    },
    {
      topic: 'ir and tomar for getting around',
      explanation: 'ir means to go; the form voy means I go. tomar means to take, as in tomar un taxi. To say how you travel, use en: en autobús, en taxi, en carro.',
      table: [
        ['Spanish', 'English'],
        ['Voy al centro.', 'I am going downtown.'],
        ['Voy a la playa.', 'I am going to the beach.'],
        ['Tomo un taxi.', 'I take a taxi.'],
        ['Voy en autobús.', 'I go by bus.']
      ],
      examples: [
        { es: 'Voy al parque en autobús.', trans: 'boy al PAR-keh en ow-toh-BOOS', en: 'I am going to the park by bus.' }
      ]
    }
  ],
  vocabulary: [
    { id: 'u08-ciudad', es: 'ciudad', translit: 'syoo-DAD', en: 'city', pos: 'noun', gender: 'f' },
    { id: 'u08-calle', es: 'calle', translit: 'KAH-yeh', en: 'street', pos: 'noun', gender: 'f' },
    { id: 'u08-plaza', es: 'plaza', translit: 'PLAH-sah', en: 'square / plaza', pos: 'noun', gender: 'f' },
    { id: 'u08-parque', es: 'parque', translit: 'PAR-keh', en: 'park', pos: 'noun', gender: 'm' },
    { id: 'u08-playa', es: 'playa', translit: 'PLAH-yah', en: 'beach', pos: 'noun', gender: 'f' },
    { id: 'u08-banco', es: 'banco', translit: 'BAN-koh', en: 'bank', pos: 'noun', gender: 'm' },
    { id: 'u08-farmacia', es: 'farmacia', translit: 'far-MAH-syah', en: 'pharmacy', pos: 'noun', gender: 'f' },
    { id: 'u08-supermercado', es: 'supermercado', translit: 'soo-pehr-mehr-KAH-doh', en: 'supermarket', pos: 'noun', gender: 'm' },
    { id: 'u08-restaurante', es: 'restaurante', translit: 'res-tow-RAN-teh', en: 'restaurant', pos: 'noun', gender: 'm' },
    { id: 'u08-hotel', es: 'hotel', translit: 'oh-TEL', en: 'hotel', pos: 'noun', gender: 'm' },
    { id: 'u08-iglesia', es: 'iglesia', translit: 'ee-GLEH-syah', en: 'church', pos: 'noun', gender: 'f' },
    { id: 'u08-museo', es: 'museo', translit: 'moo-SEH-oh', en: 'museum', pos: 'noun', gender: 'm' },
    { id: 'u08-estacion', es: 'estación', translit: 'es-tah-SYON', en: 'station', pos: 'noun', gender: 'f' },
    { id: 'u08-aeropuerto', es: 'aeropuerto', translit: 'ah-eh-roh-PWEHR-toh', en: 'airport', pos: 'noun', gender: 'm' },
    { id: 'u08-autobus', es: 'autobús', translit: 'ow-toh-BOOS', en: 'bus', pos: 'noun', gender: 'm' },
    { id: 'u08-taxi', es: 'taxi', translit: 'TAK-see', en: 'taxi', pos: 'noun', gender: 'm' },
    { id: 'u08-mapa', es: 'mapa', translit: 'MAH-pah', en: 'map', pos: 'noun', gender: 'm' },
    { id: 'u08-derecha', es: 'derecha', translit: 'deh-REH-chah', en: 'right', pos: 'noun', gender: 'f' },
    { id: 'u08-izquierda', es: 'izquierda', translit: 'ees-KYEHR-dah', en: 'left', pos: 'noun', gender: 'f' },
    { id: 'u08-cerca', es: 'cerca', translit: 'SEHR-kah', en: 'near / close', pos: 'adverb' },
    { id: 'u08-lejos', es: 'lejos', translit: 'LEH-hohs', en: 'far', pos: 'adverb' },
    { id: 'u08-detras', es: 'detrás', translit: 'deh-TRAS', en: 'behind', pos: 'adverb' },
    { id: 'u08-ir', es: 'ir', translit: 'eer', en: 'to go', pos: 'verb' },
    { id: 'u08-voy', es: 'voy', translit: 'boy', en: 'I go / I am going', pos: 'verb' },
    { id: 'u08-esta', es: 'está', translit: 'es-TA', en: 'is (located)', pos: 'verb' },
    { id: 'u08-tomar', es: 'tomar', translit: 'toh-MAR', en: 'to take', pos: 'verb' },
    { id: 'u08-donde', es: 'dónde', translit: 'DON-deh', en: 'where', pos: 'question' }
  ],
  phrases: [
    { id: 'p-u08-1', es: '¿Dónde está la playa?', trans: 'DON-deh es-TA lah PLAH-yah', en: 'Where is the beach?' },
    { id: 'p-u08-2', es: 'A la derecha.', trans: 'ah lah deh-REH-chah', en: 'To the right.' },
    { id: 'p-u08-3', es: '¿Cómo llego al centro?', trans: 'KOH-moh YEH-goh al SEN-troh', en: 'How do I get downtown?' }
  ],
  sentences: [
    { es: '¿Dónde está el hotel?', translit: 'DON-deh es-TA el oh-TEL', en: 'Where is the hotel?', words: [{ id: 'u08-donde', es: 'Dónde', en: 'where' }, { id: 'u08-esta', es: 'está', en: 'is' }, { id: 'u08-hotel', es: 'hotel', en: 'hotel' }] },
    { es: 'La playa está cerca del parque.', translit: 'lah PLAH-yah es-TA SEHR-kah del PAR-keh', en: 'The beach is near the park.', words: [{ id: 'u08-playa', es: 'playa', en: 'beach' }, { id: 'u08-esta', es: 'está', en: 'is' }, { id: 'u08-cerca', es: 'cerca', en: 'near' }, { id: 'u08-parque', es: 'parque', en: 'park' }] },
    { es: 'Voy al supermercado en autobús.', translit: 'boy al soo-pehr-mehr-KAH-doh en ow-toh-BOOS', en: 'I am going to the supermarket by bus.', words: [{ id: 'u08-voy', es: 'Voy', en: 'I am going' }, { id: 'u08-supermercado', es: 'supermercado', en: 'supermarket' }, { id: 'u08-autobus', es: 'autobús', en: 'bus' }] },
    { es: 'La farmacia está a la derecha de la iglesia.', translit: 'lah far-MAH-syah es-TA ah lah deh-REH-chah deh lah ee-GLEH-syah', en: 'The pharmacy is to the right of the church.', words: [{ id: 'u08-farmacia', es: 'farmacia', en: 'pharmacy' }, { id: 'u08-derecha', es: 'derecha', en: 'right' }, { id: 'u08-iglesia', es: 'iglesia', en: 'church' }] },
    { es: 'El museo está lejos, al lado del banco.', translit: 'el moo-SEH-oh es-TA LEH-hohs al LAH-doh del BAN-koh', en: 'The museum is far, next to the bank.', words: [{ id: 'u08-museo', es: 'museo', en: 'museum' }, { id: 'u08-lejos', es: 'lejos', en: 'far' }, { id: 'u08-banco', es: 'banco', en: 'bank' }] },
    { es: 'Tomo un taxi al aeropuerto.', translit: 'TOH-moh oon TAK-see al ah-eh-roh-PWEHR-toh', en: 'I take a taxi to the airport.', words: [{ id: 'u08-tomar', es: 'Tomo', en: 'I take' }, { id: 'u08-taxi', es: 'taxi', en: 'taxi' }, { id: 'u08-aeropuerto', es: 'aeropuerto', en: 'airport' }] }
  ],
  dialogue: {
    title: 'Pidiendo direcciones (Asking for directions)',
    lines: [
      { who: 'Turista', es: 'Disculpe, ¿dónde está el parque?', en: 'Excuse me, where is the park?' },
      { who: 'Señora', es: 'El parque está cerca. Siga recto y gire a la izquierda.', en: 'The park is near. Go straight and turn left.' },
      { who: 'Turista', es: '¿Está lejos de aquí?', en: 'Is it far from here?' },
      { who: 'Señora', es: 'No, está a cinco minutos. Cerca de la iglesia.', en: 'No, it is five minutes away. Near the church.' },
      { who: 'Turista', es: '¿Puedo ir en autobús?', en: 'Can I go by bus?' },
      { who: 'Señora', es: 'Sí, hay un autobús cada diez minutos.', en: 'Yes, there is a bus every ten minutes.' },
      { who: 'Turista', es: 'Muchas gracias. ¡Muy amable!', en: 'Thank you very much. Very kind!' },
      { who: 'Señora', es: 'De nada. ¡Buen viaje!', en: 'You are welcome. Have a good trip!' }
    ],
    questions: [
      { type: 'mc-es', q: '¿Qué busca el turista?', options: ['el parque', 'el hotel', 'la playa', 'el museo'], answer: 'el parque' },
      { type: 'mc-es', q: '¿Dónde está el parque?', options: ['cerca de la iglesia', 'lejos de aquí', 'en la playa', 'al lado del aeropuerto'], answer: 'cerca de la iglesia' },
      { type: 'mc-es', q: '¿Cómo puede ir el turista?', options: ['en autobús', 'en taxi', 'a pie', 'en tren'], answer: 'en autobús' },
      { type: 'mc-es', q: '¿Cuánto tiempo falta para el parque?', options: ['cinco minutos', 'diez minutos', 'una hora', 'dos horas'], answer: 'cinco minutos' }
    ]
  },
  quiz: [
    { type: 'mc-en', q: '¿Qué significa «calle»?', options: ['street', 'square', 'park', 'beach'], answer: 'street', es: 'calle' },
    { type: 'mc-en', q: '¿Qué significa «playa»?', options: ['beach', 'park', 'plaza', 'church'], answer: 'beach', es: 'playa' },
    { type: 'mc-es', q: 'Say where is the hotel?', options: ['¿Dónde está el hotel?', '¿Dónde es el hotel?', '¿Qué es el hotel?', '¿Cómo está el hotel?'], answer: '¿Dónde está el hotel?', es: '¿Dónde está el hotel?' },
    { type: 'typing', q: 'Type park in Spanish', answer: 'parque', accepts: [], es: 'parque' },
    { type: 'mc-en', q: '¿Qué significa «izquierda»?', options: ['left', 'right', 'straight', 'near'], answer: 'left', es: 'izquierda' },
    { type: 'mc-es', q: 'Say to the right.', options: ['a la derecha', 'a la izquierda', 'cerca', 'lejos'], answer: 'a la derecha', es: 'a la derecha' },
    { type: 'mc-en', q: '¿Qué significa «autobús»?', options: ['bus', 'taxi', 'train', 'car'], answer: 'bus', es: 'autobús' },
    { type: 'typing', q: 'Type museum in Spanish', answer: 'museo', accepts: [], es: 'museo' },
    { type: 'mc-es', q: 'Say I am going to the beach.', options: ['Voy a la playa', 'Voy a la parque', 'Voy a el playa', 'Voy en playa'], answer: 'Voy a la playa', es: 'Voy a la playa' },
    { type: 'mc-en', q: '¿Qué significa «cerca»?', options: ['near', 'far', 'left', 'right'], answer: 'near', es: 'cerca' },
    { type: 'mc-es', q: 'Which place sells medicine?', options: ['la farmacia', 'el banco', 'la iglesia', 'el museo'], answer: 'la farmacia', es: 'la farmacia' },
    { type: 'typing', q: 'Type street in Spanish', answer: 'calle', accepts: [], es: 'calle' }
  ],
  test: {
    title: 'Unit 8 test — The city & directions',
    questions: [
      { type: 'mc-en', q: '¿Qué significa «banco»?', options: ['bank', 'park', 'street', 'square'], answer: 'bank', es: 'banco' },
      { type: 'mc-es', q: 'Say the museum is far.', options: ['El museo está lejos', 'El museo es lejos', 'El museo hay lejos', 'El museo tiene lejos'], answer: 'El museo está lejos', es: 'El museo está lejos' },
      { type: 'typing', q: 'Type beach in Spanish', answer: 'playa', accepts: [], es: 'playa' },
      { type: 'mc-en', q: '¿Qué significa «restaurante»?', options: ['restaurant', 'hotel', 'pharmacy', 'church'], answer: 'restaurant', es: 'restaurante' },
      { type: 'mc-es', q: 'Ask where is the pharmacy.', options: ['¿Dónde está la farmacia?', '¿Qué es la farmacia?', '¿Cómo está la farmacia?', '¿Dónde está el farmacia?'], answer: '¿Dónde está la farmacia?', es: '¿Dónde está la farmacia?' },
      { type: 'typing', q: 'Type left in Spanish', answer: 'izquierda', accepts: [], es: 'izquierda' },
      { type: 'mc-en', q: '¿Qué significa «hotel»?', options: ['hotel', 'house', 'hospital', 'hostel'], answer: 'hotel', es: 'hotel' },
      { type: 'mc-es', q: 'Say I take a taxi.', options: ['Tomo un taxi', 'Voy un taxi', 'Tomo un autobús', 'Estoy un taxi'], answer: 'Tomo un taxi', es: 'Tomo un taxi' },
      { type: 'mc-en', q: '¿Qué significa «mapa»?', options: ['map', 'street', 'city', 'square'], answer: 'map', es: 'mapa' },
      { type: 'typing', q: 'Type far in Spanish', answer: 'lejos', accepts: [], es: 'lejos' },
      { type: 'mc-es', q: 'Which means behind?', options: ['detrás', 'delante', 'cerca', 'lejos'], answer: 'detrás', es: 'detrás' },
      { type: 'mc-en', q: '¿Qué significa «plaza»?', options: ['square / plaza', 'street', 'beach', 'church'], answer: 'square / plaza', es: 'plaza' }
    ]
  }
};
