// Unit 42 — Caribbean Spanish: accent & slang. C1.
export const unit = {
  id: 'u42',
  level: 'C1',
  number: 42,
  title: 'Caribbean Spanish: accent & slang',
  titleEs: 'El español caribeño',
  story: 'You land in San Juan and the Spanish is faster, softer and full of music. The final s fades away, the r slides into an l, and half the nouns come from languages older than Spain. This unit trains your ear for the Caribbean accent of Puerto Rico, Cuba and the Dominican Republic, and gives you the slang that locals actually use.',
  grammar: [
    {
      topic: 'Aspiration and loss of s',
      explanation: 'In the Caribbean, an s at the end of a syllable becomes a soft h or disappears: los amigos sounds like loh amigo and ¿estás? like ¿etá?. The plural is still clear from the article and the vowel, so meaning survives.',
      table: [
        ['Written', 'Caribbean pronunciation', 'English'],
        ['los amigos', 'loh amigo', 'the friends'],
        ['¿estás?', '¿etá?', 'are you?'],
        ['más o menos', 'mah o meno', 'so-so'],
        ['es que', 'eh que', 'it is that'],
        ['dos pesos', 'do peso', 'two pesos']
      ],
      examples: [
        { es: '¿Estás listo? Mah o meno, ya casi.', trans: 'es-TAS LEES-toh mah o MEH-no yah KAH-see', en: 'Are you ready? So-so, almost.' },
        { es: 'Los muchachos están en la playa.', trans: 'loh moo-CHAH-choh eh-TAN en lah PLAH-yah', en: 'The boys are at the beach.' }
      ]
    },
    {
      topic: 'The r and the l trade places',
      explanation: 'Before a consonant or at the end of a word, r and l can swap or turn into a light vowel. Puerto Rico becomes Puelto Rico, comer becomes comel, and amor sounds like amol. This is one of the most recognisable Caribbean traits.',
      table: [
        ['Written', 'Caribbean pronunciation', 'English'],
        ['Puerto Rico', 'Puelto Rico', 'Puerto Rico'],
        ['comer', 'comel', 'to eat'],
        ['amor', 'amol', 'love'],
        ['verde', 'velde', 'green'],
        ['carne', 'calne', 'meat']
      ],
      examples: [
        { es: 'Vengo de Puelto Rico, la isla del encanto.', trans: 'BEN-goh deh P WEL-toh REE-koh lah EES-lah del en-KAN-toh', en: 'I come from Puerto Rico, the island of enchantment.' },
        { es: 'Quiero comel arroz con habichuelas.', trans: 'KYEH-roh ko-MEL ah-RROS kon ah-bee-CHWEH-lahs', en: 'I want to eat rice and beans.' }
      ]
    },
    {
      topic: 'The vanishing d, and words from taíno and Africa',
      explanation: 'A d between two vowels often drops out: cansado becomes cansao and pescado becomes pescao. Many everyday words come from the taíno of the islands (huracán, hamaca, maíz) and from African languages brought by enslaved people (ñame, malanga).',
      table: [
        ['Standard', 'Caribbean', 'English'],
        ['cansado', 'cansao', 'tired'],
        ['pescado', 'pescao', 'fish (food)'],
        ['huracán', 'taíno origin', 'hurricane'],
        ['hamaca', 'taíno origin', 'hammock'],
        ['ñame', 'African origin', 'yam']
      ],
      examples: [
        { es: 'Estoy cansao de tanto caminar.', trans: 'es-TOY kan-SOW deh TAN-toh kah-mee-NAR', en: 'I am tired from so much walking.' },
        { es: 'El huracán tumbó la hamaca del patio.', trans: 'el oo-rah-KAN toom-BO lah ah-MAH-kah del PAH-tyo', en: 'The hurricane knocked down the hammock in the yard.' }
      ]
    }
  ],
  vocabulary: [
    { id: 'u42-huracan', es: 'huracán', translit: 'oo-rah-KAN', en: 'hurricane (taíno)', pos: 'noun', gender: 'm' },
    { id: 'u42-hamaca', es: 'hamaca', translit: 'ah-MAH-kah', en: 'hammock (taíno)', pos: 'noun', gender: 'f' },
    { id: 'u42-canoa', es: 'canoa', translit: 'kah-NOH-ah', en: 'canoe (taíno)', pos: 'noun', gender: 'f' },
    { id: 'u42-maiz', es: 'maíz', translit: 'mah-EES', en: 'corn (taíno)', pos: 'noun', gender: 'm' },
    { id: 'u42-iguana', es: 'iguana', translit: 'ee-GWAH-nah', en: 'iguana (taíno)', pos: 'noun', gender: 'f' },
    { id: 'u42-caiman', es: 'caimán', translit: 'kai-MAN', en: 'caiman / alligator (taíno)', pos: 'noun', gender: 'm' },
    { id: 'u42-tabaco', es: 'tabaco', translit: 'tah-BAH-koh', en: 'tobacco (taíno)', pos: 'noun', gender: 'm' },
    { id: 'u42-name', es: 'ñame', translit: 'NYAH-meh', en: 'yam (African)', pos: 'noun', gender: 'm' },
    { id: 'u42-malanga', es: 'malanga', translit: 'mah-LAN-gah', en: 'taro root (African)', pos: 'noun', gender: 'f' },
    { id: 'u42-chevere', es: 'chévere', translit: 'CHEH-veh-reh', en: 'cool / great', pos: 'adjective' },
    { id: 'u42-pana', es: 'pana', translit: 'PAH-nah', en: 'buddy / friend', pos: 'noun', gender: 'm' },
    { id: 'u42-guagua', es: 'guagua', translit: 'GWAH-gwah', en: 'bus', pos: 'noun', gender: 'f' },
    { id: 'u42-carro', es: 'carro', translit: 'KAH-rroh', en: 'car', pos: 'noun', gender: 'm' },
    { id: 'u42-nevera', es: 'nevera', translit: 'neh-VEH-rah', en: 'refrigerator', pos: 'noun', gender: 'f' },
    { id: 'u42-jugo', es: 'jugo', translit: 'HOO-goh', en: 'juice', pos: 'noun', gender: 'm' },
    { id: 'u42-aspiracion', es: 'aspiración', translit: 'as-pee-rah-SYON', en: 'aspiration (of a sound)', pos: 'noun', gender: 'f' },
    { id: 'u42-janguear', es: 'janguear', translit: 'han-geh-AR', en: 'to hang out', pos: 'verb' },
    { id: 'u42-socio', es: 'socio', translit: 'SOH-syo', en: 'pal / partner', pos: 'noun', gender: 'm' }
  ],
  phrases: [
    { id: 'p-u42-1', es: '¡Ay bendito!', trans: 'ai ben-DEE-toh', en: 'Oh, bless it! (sympathy or surprise)' },
    { id: 'p-u42-2', es: '¿Qué es la que hay?', trans: 'keh es lah keh ai', en: 'What is up? / What is going on?' },
    { id: 'p-u42-3', es: '¡Dale, que tú puedes!', trans: 'DAH-leh keh too PWEH-des', en: 'Come on, you can do it!' }
  ],
  sentences: [
    { es: 'La aspiración de la ese es típica del español caribeño.', translit: 'lah as-pee-rah-SYON deh lah EH-seh es TEE-pee-kah del es-pah-NYOL kah-ree-BEH-nyoh', en: 'The aspiration of the letter s is typical of Caribbean Spanish.', words: [{ id: 'u42-aspiracion', es: 'aspiración', en: 'aspiration' }] },
    { es: 'Mi pana y yo jangueamos en la plaza del pueblo.', translit: 'mee PAH-nah ee yoh han-geh-AH-mos en lah PLAH-sah del PWEH-bloh', en: 'My buddy and I hang out in the town square.', words: [{ id: 'u42-pana', es: 'pana', en: 'buddy' }, { id: 'u42-janguear', es: 'jangueamos', en: 'we hang out' }] },
    { es: 'Comimos ñame y malanga con arroz.', translit: 'koh-MEE-mos NYAH-meh ee mah-LAN-gah kon ah-RROS', en: 'We ate yam and taro root with rice.', words: [{ id: 'u42-name', es: 'ñame', en: 'yam' }, { id: 'u42-malanga', es: 'malanga', en: 'taro root' }] },
    { es: 'El huracán pasó cerca y la canoa quedó en la arena.', translit: 'el oo-rah-KAN pah-SO SER-kah ee lah kah-NOH-ah keh-DO en lah ah-REH-nah', en: 'The hurricane passed nearby and the canoe ended up on the sand.', words: [{ id: 'u42-huracan', es: 'huracán', en: 'hurricane' }, { id: 'u42-canoa', es: 'canoa', en: 'canoe' }] },
    { es: 'Allá en la isla le dicen guagua al autobús.', translit: 'ah-YA en lah EES-lah leh DEE-sen GWAH-gwah al ow-toh-BOOS', en: 'There on the island they call the bus guagua.', words: [{ id: 'u42-guagua', es: 'guagua', en: 'bus' }] },
    { es: '¡Ay bendito, qué chévere verte, socio!', translit: 'ai ben-DEE-toh keh CHEH-veh-reh BER-teh SOH-syo', en: 'Oh bless it, how great to see you, pal!', words: [{ id: 'u42-chevere', es: 'chévere', en: 'great' }, { id: 'u42-socio', es: 'socio', en: 'pal' }] },
    { es: 'Dormí la siesta en una hamaca bajo la palma.', translit: 'dor-MEE lah SYES-tah en OO-nah ah-MAH-kah BAH-hoh lah PAL-mah', en: 'I napped in a hammock under the palm tree.', words: [{ id: 'u42-hamaca', es: 'hamaca', en: 'hammock' }] }
  ],
  dialogue: {
    title: 'En la parada de la guagua (At the bus stop)',
    lines: [
      { who: 'Marta', es: '¡Ay bendito! ¿Qué es la que hay, pana? ¿Desde cuándo estás por acá?', en: 'Oh bless it! What is up, buddy? Since when are you around here?' },
      { who: 'Tomás', es: 'Ahí, luchando. Llegué ayer y todavía no he probado el mofongo.', en: 'Hanging in there. I arrived yesterday and I still have not tried the mofongo.' },
      { who: 'Marta', es: '¡Brutal! Allá en el Viejo San Juan hay un sitio que es la cosa.', en: 'Awesome! Over in Old San Juan there is a place that is the best.' },
      { who: 'Tomás', es: 'Dale, vamos. ¿Cojo la guagua o caminamos?', en: 'All right, let us go. Do I take the bus or do we walk?' },
      { who: 'Marta', es: 'La guagua pasa cada media hora, pero caminando llegamos más rápido.', en: 'The bus comes every half hour, but walking we arrive faster.' },
      { who: 'Tomás', es: 'Nítido. Entonces vamos a pie y después comemos algo.', en: 'Great. Then we go on foot and afterwards we eat something.' }
    ],
    questions: [
      { type: 'mc-en', q: '¿Qué quiere probar Tomás?', options: ['el mofongo', 'la malanga', 'el arroz', 'el jugo'], answer: 'el mofongo' },
      { type: 'mc-en', q: '¿Cómo van a llegar al Viejo San Juan?', options: ['a pie', 'en guagua', 'en carro', 'en taxi'], answer: 'a pie' },
      { type: 'mc-en', q: '¿Desde cuándo está Tomás en la isla?', options: ['desde ayer', 'desde la semana pasada', 'desde enero', 'desde hace un año'], answer: 'desde ayer' }
    ]
  },
  quiz: [
    { type: 'mc-en', q: '¿Qué significa «huracán»?', options: ['hurricane', 'earthquake', 'storm cloud', 'tide'], answer: 'hurricane', es: 'huracán' },
    { type: 'mc-es', q: 'Which word means hammock?', options: ['hamaca', 'canoa', 'iguana', 'pana'], answer: 'hamaca', es: 'hamaca' },
    { type: 'mc-en', q: '¿Qué significa «pana»?', options: ['buddy / friend', 'bread', 'window', 'child'], answer: 'buddy / friend', es: 'pana' },
    { type: 'mc-es', q: 'Which word means bus in the Caribbean?', options: ['guagua', 'coche', 'tren', 'avión'], answer: 'guagua', es: 'guagua' },
    { type: 'mc-en', q: '¿Qué significa «chévere»?', options: ['cool / great', 'sad', 'expensive', 'difficult'], answer: 'cool / great', es: 'chévere' },
    { type: 'mc-en', q: '¿Qué significa «ñame»?', options: ['yam', 'pineapple', 'corn', 'rice'], answer: 'yam', es: 'ñame' },
    { type: 'mc-es', q: 'Which word is of taíno origin?', options: ['caimán', 'jamón', 'cajón', 'camión'], answer: 'caimán', es: 'caimán' },
    { type: 'mc-es', q: 'Which word came from African languages?', options: ['malanga', 'ventana', 'escuela', 'caballo'], answer: 'malanga', es: 'malanga' },
    { type: 'typing', q: 'Type hurricane in Spanish.', answer: 'huracan', accepts: ['huracán'], es: 'huracán' },
    { type: 'mc-en', q: '¿Qué significa «¡Ay bendito!»?', options: ['oh, bless it!', 'goodbye', 'hurry up', 'good luck'], answer: 'oh, bless it!', es: '¡Ay bendito!' },
    { type: 'mc-es', q: 'Complete: Allá le dicen ___ al autobús.', options: ['guagua', 'carro', 'nevera', 'jugo'], answer: 'guagua', es: 'guagua' },
    { type: 'typing', q: 'Type buddy (Caribbean slang) in Spanish.', answer: 'pana', accepts: [], es: 'pana' },
    { type: 'mc-en', q: '¿Qué significa «janguear»?', options: ['to hang out', 'to work', 'to swim', 'to argue'], answer: 'to hang out', es: 'janguear' },
    { type: 'mc-en', q: '¿Qué significa «nevera»?', options: ['refrigerator', 'kettle', 'stove', 'sink'], answer: 'refrigerator', es: 'nevera' }
  ],
  test: {
    title: 'Unit 42 test — Caribbean Spanish',
    questions: [
      { type: 'mc-en', q: '¿Qué significa «canoa»?', options: ['canoe', 'cabin', 'valley', 'wave'], answer: 'canoe', es: 'canoa' },
      { type: 'mc-es', q: 'Which word means alligator?', options: ['caimán', 'iguana', 'loro', 'tiburón'], answer: 'caimán', es: 'caimán' },
      { type: 'typing', q: 'Type corn in Spanish.', answer: 'maiz', accepts: ['maíz'], es: 'maíz' },
      { type: 'mc-en', q: '¿Qué significa «iguana»?', options: ['iguana', 'parrot', 'turtle', 'monkey'], answer: 'iguana', es: 'iguana' },
      { type: 'mc-es', q: 'Which word is the Caribbean term for car?', options: ['carro', 'coche', 'auto', 'vehículo'], answer: 'carro', es: 'carro' },
      { type: 'mc-en', q: '¿Qué significa «jugo»?', options: ['juice', 'milk', 'coffee', 'water'], answer: 'juice', es: 'jugo' },
      { type: 'typing', q: 'Type to hang out (Caribbean slang) in Spanish.', answer: 'janguear', accepts: [], es: 'janguear' },
      { type: 'mc-es', q: 'In Caribbean Spanish, the final s is often…', options: ['aspirada o muda', 'pronunciada con fuerza', 'convertida en t', 'duplicada'], answer: 'aspirada o muda', es: 'aspirada o muda' },
      { type: 'mc-en', q: '¿Qué significa «malanga»?', options: ['taro root', 'sweet potato', 'plantain', 'tomato'], answer: 'taro root', es: 'malanga' },
      { type: 'mc-es', q: 'Which greeting sounds very boricua?', options: ['¿Qué es la que hay?', '¿Cómo está usted?', 'Buenos días, señor.', 'Mucho gusto.'], answer: '¿Qué es la que hay?', es: '¿Qué es la que hay?' },
      { type: 'typing', q: 'Type tobacco in Spanish.', answer: 'tabaco', accepts: [], es: 'tabaco' },
      { type: 'mc-en', q: '¿Qué significa «socio»?', options: ['pal / partner', 'boss', 'stranger', 'teacher'], answer: 'pal / partner', es: 'socio' }
    ]
  }
};
