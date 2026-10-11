// Unit 48 — Spanish in the world. C1.
export const unit = {
  id: 'u48',
  level: 'C1',
  number: 48,
  title: 'Spanish in the world',
  titleEs: 'El español en el mundo',
  story: 'One language, twenty countries, a thousand local words. The avocado of Mexico is the palta of Argentina, and the bus changes name at every border. In this unit you travel across the Spanish-speaking world and learn to recognise regional vocabulary, pronouns and sounds without ever losing the thread.',
  grammar: [
    {
      topic: 'The same thing, many names',
      explanation: 'Everyday objects change name from region to region. None of these words is wrong: each one is standard where it is spoken. Knowing the main pairs lets you understand a Mexican film, an Argentine menu and a Puerto Rican radio show.',
      table: [
        ['English', 'Spain', 'Latin America / Caribbean'],
        ['car', 'coche', 'carro / auto'],
        ['bus', 'autobús', 'guagua / colectivo / camión'],
        ['computer', 'ordenador', 'computadora'],
        ['juice', 'zumo', 'jugo'],
        ['potato', 'patata', 'papa'],
        ['peanut', 'cacahuete', 'maní / cacahuate']
      ],
      examples: [
        { es: 'En España pides un zumo de naranja; en Puerto Rico, un jugo de china.', trans: 'en es-PAH-nyah PEE-des oon SOO-moh deh nah-RAN-hah en P WEL-toh REE-koh oon HOO-goh deh CHEE-nah', en: 'In Spain you order an orange juice; in Puerto Rico, a jugo de china.' },
        { es: 'En Madrid tomas el autobús; en San Juan, la guagua.', trans: 'en mah-DREED TOH-mahs el ow-toh-BOOS en san hwan lah GWAH-gwah', en: 'In Madrid you take the bus; in San Juan, the guagua.' }
      ]
    },
    {
      topic: 'Who is the plural you',
      explanation: 'Spain uses vosotros for an informal group, but Latin America uses ustedes for everyone. Argentina and Uruguay replace tú with vos, which changes the verb endings. Colombia has its own courteous form, sumercé.',
      table: [
        ['Region', 'Informal plural or address', 'Example'],
        ['Spain', 'vosotros', '¿Vosotros venís?'],
        ['Latin America', 'ustedes', '¿Ustedes vienen?'],
        ['Argentina and Uruguay', 'vos (singular)', '¿Vos venís?'],
        ['Colombia (courteous)', 'sumercé', '¿Sumercé quiere algo?']
      ],
      examples: [
        { es: 'En Buenos Aires usan vos, no tú: ¿vos tenés hermanos?', trans: 'en BWEH-nos AH-ee-res OO-san bos no too bos teh-NES er-MAH-nos', en: 'In Buenos Aires they use vos, not tú: do you have brothers?' },
        { es: 'En San Juan hablan con ustedes: ¿ustedes tienen hambre?', trans: 'en san hwan AH-blan kon oos-TEH-des oos-TEH-des TYEH-nen AM-breh', en: 'In San Juan they speak with ustedes: are you all hungry?' }
      ]
    },
    {
      topic: 'Sounds that mark a region',
      explanation: 'Latin America pronounces c and z like s (seseo), while most of Spain uses a th sound (distinción). Almost everyone pronounces ll like y (yeísmo). In the Caribbean the final s is aspirated, and in the Río de la Plata the voseo changes the verb stress.',
      table: [
        ['Feature', 'Where', 'Effect'],
        ['seseo', 'Latin America', 'casa and caza sound alike'],
        ['distinción', 'most of Spain', 'casa and caza sound different'],
        ['aspiration of s', 'Caribbean', 'los amigos becomes loh amigo'],
        ['yeísmo', 'almost everywhere', 'calle sounds like caye'],
        ['voseo endings', 'Argentina, Uruguay', 'vos hablás, vos tenés']
      ],
      examples: [
        { es: 'En Sevilla casa y caza suenan distintas; en Bogotá suenan igual.', trans: 'en seh-BEE-yah KAH-sah ee KAH-sah SWEH-nan dees-TEEN-tahs en boh-goh-TA SWEH-nan ee-GWAL', en: 'In Seville casa and caza sound different; in Bogotá they sound the same.' },
        { es: 'En La Habana la ese final casi desaparece.', trans: 'en lah ah-BAH-nah lah EH-seh fee-NAL KAH-see deh-sah-pah-REH-seh', en: 'In Havana the final s almost disappears.' }
      ]
    }
  ],
  vocabulary: [
    { id: 'u48-dialecto', es: 'dialecto', translit: 'dyah-LEK-toh', en: 'dialect', pos: 'noun', gender: 'm' },
    { id: 'u48-variacion', es: 'variación', translit: 'bah-ryah-SYON', en: 'variation', pos: 'noun', gender: 'f' },
    { id: 'u48-acento', es: 'acento', translit: 'ah-SEN-toh', en: 'accent', pos: 'noun', gender: 'm' },
    { id: 'u48-jerga', es: 'jerga', translit: 'HER-gah', en: 'slang / jargon', pos: 'noun', gender: 'f' },
    { id: 'u48-regionalismo', es: 'regionalismo', translit: 'reh-hyoh-nah-LEES-moh', en: 'regionalism / local word', pos: 'noun', gender: 'm' },
    { id: 'u48-aguacate', es: 'aguacate', translit: 'ah-gwah-KAH-teh', en: 'avocado', pos: 'noun', gender: 'm' },
    { id: 'u48-palta', es: 'palta', translit: 'PAL-tah', en: 'avocado (Argentina, Chile)', pos: 'noun', gender: 'f' },
    { id: 'u48-guineo', es: 'guineo', translit: 'gee-NEH-oh', en: 'banana (Caribbean)', pos: 'noun', gender: 'm' },
    { id: 'u48-palomitas', es: 'palomitas', translit: 'pah-loh-MEE-tahs', en: 'popcorn', pos: 'noun', gender: 'p' },
    { id: 'u48-papa', es: 'papa', translit: 'PAH-pah', en: 'potato (Latin America)', pos: 'noun', gender: 'f' },
    { id: 'u48-patata', es: 'patata', translit: 'pah-TAH-tah', en: 'potato (Spain)', pos: 'noun', gender: 'f' },
    { id: 'u48-mani', es: 'maní', translit: 'mah-NEE', en: 'peanut (Caribbean)', pos: 'noun', gender: 'm' },
    { id: 'u48-cacahuate', es: 'cacahuate', translit: 'kah-kah-WAH-teh', en: 'peanut (Mexico)', pos: 'noun', gender: 'm' },
    { id: 'u48-computadora', es: 'computadora', translit: 'kom-poo-tah-DOH-rah', en: 'computer (Latin America)', pos: 'noun', gender: 'f' },
    { id: 'u48-ordenador', es: 'ordenador', translit: 'or-deh-nah-DOR', en: 'computer (Spain)', pos: 'noun', gender: 'm' },
    { id: 'u48-zumo', es: 'zumo', translit: 'SOO-moh', en: 'juice (Spain)', pos: 'noun', gender: 'm' },
    { id: 'u48-colectivo', es: 'colectivo', translit: 'ko-lek-TEE-boh', en: 'bus (Argentina)', pos: 'noun', gender: 'm' },
    { id: 'u48-voseo', es: 'voseo', translit: 'boh-SEH-oh', en: 'use of vos instead of tú', pos: 'noun', gender: 'm' }
  ],
  phrases: [
    { id: 'p-u48-1', es: 'Aquí se dice de una manera y allá de otra.', trans: 'ah-KEE seh DEE-seh deh OO-nah mah-NEH-rah ee ah-YA deh OH-trah', en: 'Here they say it one way and there another.' },
    { id: 'p-u48-2', es: 'El mismo animal tiene mil nombres.', trans: 'el MEES-moh ah-nee-MAL TYEH-neh meel NOHM-bres', en: 'The same animal has a thousand names.' },
    { id: 'p-u48-3', es: '¿Cómo le dicen ustedes a esto?', trans: 'KOH-moh leh DEE-sen oos-TEH-des ah ES-toh', en: 'What do you all call this?' }
  ],
  sentences: [
    { es: 'Cada dialecto tiene su propio acento y su propia jerga.', translit: 'KAH-dah dyah-LEK-toh TYEH-neh soo PROH-pyoh ah-SEN-toh ee soo PROH-pyah HER-gah', en: 'Each dialect has its own accent and its own slang.', words: [{ id: 'u48-dialecto', es: 'dialecto', en: 'dialect' }, { id: 'u48-acento', es: 'acento', en: 'accent' }, { id: 'u48-jerga', es: 'jerga', en: 'slang' }] },
    { es: 'En México se dice aguacate y en Argentina, palta.', translit: 'en MEH-hee-koh seh DEE-seh ah-gwah-KAH-teh ee en ar-hen-TEE-nah PAL-tah', en: 'In Mexico they say aguacate and in Argentina, palta.', words: [{ id: 'u48-aguacate', es: 'aguacate', en: 'avocado' }, { id: 'u48-palta', es: 'palta', en: 'avocado' }] },
    { es: 'En Puerto Rico un guineo es una fruta dulce y pequeña.', translit: 'en P WEL-toh REE-koh oon gee-NEH-oh es OO-nah FROO-tah DOOL-seh ee peh-KEH-nyah', en: 'In Puerto Rico a guineo is a sweet little fruit.', words: [{ id: 'u48-guineo', es: 'guineo', en: 'banana' }] },
    { es: 'En España piden un zumo, pero en América piden un jugo.', translit: 'en es-PAH-nyah PEE-den oon SOO-moh PEH-roh en ah-MEH-ree-kah PEE-den oon HOO-goh', en: 'In Spain they order a zumo, but in America they order a jugo.', words: [{ id: 'u48-zumo', es: 'zumo', en: 'juice (Spain)' }] },
    { es: 'Allá usan ordenador y acá decimos computadora.', translit: 'ah-YA OO-san or-deh-nah-DOR ee ah-KA deh-SEE-mos kom-poo-tah-DOH-rah', en: 'There they use ordenador and here we say computadora.', words: [{ id: 'u48-ordenador', es: 'ordenador', en: 'computer (Spain)' }, { id: 'u48-computadora', es: 'computadora', en: 'computer' }] },
    { es: 'En Buenos Aires el colectivo es el autobús de la ciudad.', translit: 'en BWEH-nos AH-ee-res el ko-lek-TEE-boh es el ow-toh-BOOS deh lah syoo-DAD', en: 'In Buenos Aires the colectivo is the city bus.', words: [{ id: 'u48-colectivo', es: 'colectivo', en: 'bus (Argentina)' }] },
    { es: 'El voseo cambia el pronombre y también la forma del verbo.', translit: 'el boh-SEH-oh KAM-byah el proh-NOM-breh ee tam-BYEN lah FOR-mah del BER-boh', en: 'Voseo changes the pronoun and also the verb form.', words: [{ id: 'u48-voseo', es: 'voseo', en: 'use of vos' }] },
    { es: 'Al maní en México le dicen cacahuate.', translit: 'al mah-NEE en MEH-hee-koh leh DEE-sen kah-kah-WAH-teh', en: 'In Mexico they call the maní cacahuate.', words: [{ id: 'u48-mani', es: 'maní', en: 'peanut' }, { id: 'u48-cacahuate', es: 'cacahuate', en: 'peanut (Mexico)' }] }
  ],
  dialogue: {
    title: 'Dos continentes, una lengua (Two continents, one language)',
    lines: [
      { who: 'Lucía', es: '¿Cómo le dicen ustedes a esto? En España es patata.', en: 'What do you all call this? In Spain it is patata.' },
      { who: 'Tomás', es: 'En Puerto Rico decimos papa. Y al autobús le decimos guagua.', en: 'In Puerto Rico we say papa. And we call the bus guagua.' },
      { who: 'Lucía', es: '¡Qué curioso! En Buenos Aires sería colectivo y en México, camión.', en: 'How curious! In Buenos Aires it would be colectivo and in Mexico, camión.' },
      { who: 'Tomás', es: 'Y la fruta amarilla, ¿cómo se llama allá?', en: 'And the yellow fruit, what is it called over there?' },
      { who: 'Lucía', es: 'Plátano, con un acento distinto. Acá ustedes dicen guineo.', en: 'Plátano, with a different accent. Here you all say guineo.' },
      { who: 'Tomás', es: 'El mismo mundo con mil nombres. Por eso me encanta el español.', en: 'The same world with a thousand names. That is why I love Spanish.' }
    ],
    questions: [
      { type: 'mc-en', q: '¿Cómo se dice potato en España?', options: ['patata', 'papa', 'batata', 'malanga'], answer: 'patata' },
      { type: 'mc-en', q: '¿Cómo le dicen al autobús en Puerto Rico?', options: ['guagua', 'colectivo', 'camión', 'metro'], answer: 'guagua' },
      { type: 'mc-en', q: '¿Qué le llama la atención a Tomás?', options: ['que el mismo mundo tiene mil nombres', 'que España es caro', 'que viajar es difícil', 'que hay muchos idiomas'], answer: 'que el mismo mundo tiene mil nombres' }
    ]
  },
  quiz: [
    { type: 'mc-en', q: '¿Qué significa «dialecto»?', options: ['dialect', 'speech', 'translation', 'grammar'], answer: 'dialect', es: 'dialecto' },
    { type: 'mc-en', q: '¿Qué significa «aguacate»?', options: ['avocado', 'apple', 'olive', 'peach'], answer: 'avocado', es: 'aguacate' },
    { type: 'mc-es', q: 'In Argentina, the avocado is called…', options: ['palta', 'aguacate', 'maní', 'papa'], answer: 'palta', es: 'palta' },
    { type: 'mc-en', q: '¿Qué significa «guineo»?', options: ['banana (Caribbean)', 'grape', 'melon', 'pineapple'], answer: 'banana (Caribbean)', es: 'guineo' },
    { type: 'mc-es', q: 'Which word means popcorn?', options: ['palomitas', 'palomas', 'palmeras', 'palabras'], answer: 'palomitas', es: 'palomitas' },
    { type: 'mc-en', q: '¿Qué significa «maní»?', options: ['peanut', 'walnut', 'almond', 'chestnut'], answer: 'peanut', es: 'maní' },
    { type: 'mc-es', q: 'Which word do Mexicans use for peanut?', options: ['cacahuate', 'maní', 'nuez', 'avellana'], answer: 'cacahuate', es: 'cacahuate' },
    { type: 'typing', q: 'Type computer in Latin American Spanish.', answer: 'computadora', accepts: [], es: 'computadora' },
    { type: 'mc-en', q: '¿Qué significa «ordenador»?', options: ['computer (Spain)', 'printer', 'order', 'operator'], answer: 'computer (Spain)', es: 'ordenador' },
    { type: 'mc-es', q: 'Which word means juice in Spain?', options: ['zumo', 'jugo', 'leche', 'agua'], answer: 'zumo', es: 'zumo' },
    { type: 'mc-en', q: '¿Qué significa «voseo»?', options: ['use of vos instead of tú', 'a type of food', 'a dance', 'a consonant'], answer: 'use of vos instead of tú', es: 'voseo' },
    { type: 'typing', q: 'Type accent in Spanish.', answer: 'acento', accepts: [], es: 'acento' },
    { type: 'mc-es', q: 'Which word is a regionalism?', options: ['colectivo', 'conductor', 'ciudad', 'camino'], answer: 'colectivo', es: 'colectivo' },
    { type: 'mc-en', q: '¿Qué significa «jerga»?', options: ['slang / jargon', 'jungle', 'jersey', 'journey'], answer: 'slang / jargon', es: 'jerga' }
  ],
  test: {
    title: 'Unit 48 test — Spanish in the world',
    questions: [
      { type: 'mc-en', q: '¿Qué significa «variación»?', options: ['variation', 'vacation', 'avenue', 'version'], answer: 'variation', es: 'variación' },
      { type: 'mc-es', q: 'Which word means dialect?', options: ['dialecto', 'deporte', 'documento', 'destino'], answer: 'dialecto', es: 'dialecto' },
      { type: 'typing', q: 'Type avocado in Spanish (Mexico and Puerto Rico).', answer: 'aguacate', accepts: [], es: 'aguacate' },
      { type: 'mc-en', q: '¿Qué significa «palomitas»?', options: ['popcorn', 'doves', 'palm trees', 'words'], answer: 'popcorn', es: 'palomitas' },
      { type: 'mc-es', q: 'In Puerto Rico, banana is…', options: ['guineo', 'plátano', 'maní', 'papa'], answer: 'guineo', es: 'guineo' },
      { type: 'typing', q: 'Type peanut in Caribbean Spanish.', answer: 'mani', accepts: ['maní'], es: 'maní' },
      { type: 'mc-en', q: '¿Qué significa «colectivo»?', options: ['bus (Argentina)', 'collection', 'collector', 'collective farm'], answer: 'bus (Argentina)', es: 'colectivo' },
      { type: 'mc-es', q: 'Which two words mean the same thing?', options: ['papa y patata', 'papa y guineo', 'patata y maní', 'zumo y aguacate'], answer: 'papa y patata', es: 'papa y patata' },
      { type: 'mc-en', q: '¿Qué significa «regionalismo»?', options: ['regionalism / local word', 'religion', 'region map', 'regime'], answer: 'regionalism / local word', es: 'regionalismo' },
      { type: 'mc-es', q: 'Which pronoun is standard in Latin America?', options: ['ustedes', 'vosotros', 'vostros', 'vosotras'], answer: 'ustedes', es: 'ustedes' },
      { type: 'typing', q: 'Type potato in Spain.', answer: 'patata', accepts: [], es: 'patata' },
      { type: 'mc-en', q: '¿Qué significa «ordenador»?', options: ['computer (Spain)', 'organizer', 'order', 'operator'], answer: 'computer (Spain)', es: 'ordenador' }
    ]
  }
};
