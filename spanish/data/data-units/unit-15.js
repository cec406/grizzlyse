// Unit 15 — Free time & weather. A2.
export const unit = {
  id: 'u15',
  level: 'A2',
  number: 15,
  title: 'Free time & weather',
  titleEs: 'El tiempo libre',
  story: 'It is a sunny Saturday in Puerto Rico and you have the whole day free. This unit teaches the verb gustar so you can say what you like, weather phrases like hace calor, and how to invite a friend to a game or a party. Say yes, say no, and make plans like a local.',
  grammar: [
    {
      topic: 'gustar works backwards',
      explanation: 'Gustar does not mean I like, it means it pleases me. Use me gusta with a singular thing or an action, and me gustan with plural things. The person is the indirect object: me, te, le, nos.',
      table: [
        ['Spanish', 'English'],
        ['Me gusta bailar.', 'I like to dance. (one action)'],
        ['Me gustan los deportes.', 'I like sports. (plural)'],
        ['¿Te gusta la música?', 'Do you like music?'],
        ['Nos gusta viajar.', 'We like to travel.']
      ],
      examples: [
        { es: 'Me gusta bailar los sábados.', trans: 'meh GOOS-tah bah-ee-LAR los SAH-bah-dos', en: 'I like to dance on Saturdays.' },
        { es: 'Me gustan las películas.', trans: 'meh GOOS-tahn lahs peh-LEE-koo-lahs', en: 'I like movies.' }
      ]
    },
    {
      topic: 'Weather with hacer and estar',
      explanation: 'For weather, Spanish uses hacer: hace calor (it is hot), hace frío (it is cold), hace viento (it is windy). Use está for conditions like está nublado or está lloviendo.',
      table: [
        ['Spanish', 'English'],
        ['Hace calor.', 'It is hot.'],
        ['Hace frío.', 'It is cold.'],
        ['Hace viento.', 'It is windy.'],
        ['Está lloviendo.', 'It is raining.'],
        ['Hay mucho sol.', 'It is very sunny.']
      ],
      examples: [
        { es: 'Hoy hace mucho calor.', trans: 'oy AH-seh MOO-choh kah-LOR', en: 'Today it is very hot.' },
        { es: 'En agosto llueve mucho.', trans: 'en ah-GOHS-toh YWEH-veh MOO-choh', en: 'In August it rains a lot.' }
      ]
    },
    {
      topic: 'Inviting a friend',
      explanation: 'To invite someone, use ¿Quieres + infinitive? or the warmer ¿Te gustaría + infinitive?. Answer with Sí, me encanta (Yes, I love it) or Lo siento, no puedo (Sorry, I cannot).',
      table: [
        ['Spanish', 'English'],
        ['¿Quieres ir?', 'Do you want to go?'],
        ['¿Te gustaría jugar?', 'Would you like to play?'],
        ['Sí, me encanta.', 'Yes, I love it.'],
        ['Lo siento, no puedo.', 'Sorry, I cannot.']
      ],
      examples: [
        { es: '¿Quieres jugar al baloncesto conmigo?', trans: 'KYEH-res hoo-GAR al bah-lon-SEHS-toh kon-MEE-goh', en: 'Do you want to play basketball with me?' },
        { es: '¿Te gustaría ir a la fiesta?', trans: 'teh goos-tah-REE-ah eer ah lah FYEHS-tah', en: 'Would you like to go to the party?' }
      ]
    }
  ],
  vocabulary: [
    { id: 'u15-tiempolibre', es: 'el tiempo libre', translit: 'el TYEHM-poh LEE-breh', en: 'free time', pos: 'noun', gender: 'm' },
    { id: 'u15-deporte', es: 'el deporte', translit: 'el deh-POR-teh', en: 'sport', pos: 'noun', gender: 'm' },
    { id: 'u15-futbol', es: 'el fútbol', translit: 'el FOOT-bol', en: 'soccer', pos: 'noun', gender: 'm' },
    { id: 'u15-baloncesto', es: 'el baloncesto', translit: 'el bah-lon-SEHS-toh', en: 'basketball', pos: 'noun', gender: 'm' },
    { id: 'u15-pelota', es: 'la pelota', translit: 'lah peh-LOH-tah', en: 'ball', pos: 'noun', gender: 'f' },
    { id: 'u15-partido', es: 'el partido', translit: 'el par-TEE-doh', en: 'game / match', pos: 'noun', gender: 'm' },
    { id: 'u15-gimnasio', es: 'el gimnasio', translit: 'el heem-NAH-syoh', en: 'gym', pos: 'noun', gender: 'm' },
    { id: 'u15-pelicula', es: 'la película', translit: 'lah peh-LEE-koo-lah', en: 'movie', pos: 'noun', gender: 'f' },
    { id: 'u15-musica', es: 'la música', translit: 'lah MOO-see-kah', en: 'music', pos: 'noun', gender: 'f' },
    { id: 'u15-fiesta', es: 'la fiesta', translit: 'lah FYEHS-tah', en: 'party', pos: 'noun', gender: 'f' },
    { id: 'u15-lluvia', es: 'la lluvia', translit: 'lah YOO-vyah', en: 'rain', pos: 'noun', gender: 'f' },
    { id: 'u15-sol', es: 'el sol', translit: 'el sol', en: 'sun', pos: 'noun', gender: 'm' },
    { id: 'u15-viento', es: 'el viento', translit: 'el VYEHN-toh', en: 'wind', pos: 'noun', gender: 'm' },
    { id: 'u15-calor', es: 'el calor', translit: 'el kah-LOR', en: 'heat', pos: 'noun', gender: 'm' },
    { id: 'u15-frio', es: 'el frío', translit: 'el FREE-oh', en: 'cold', pos: 'noun', gender: 'm' },
    { id: 'u15-nadar', es: 'nadar', translit: 'nah-DAR', en: 'to swim', pos: 'verb' },
    { id: 'u15-correr', es: 'correr', translit: 'koh-REHR', en: 'to run', pos: 'verb' },
    { id: 'u15-caminar', es: 'caminar', translit: 'kah-mee-NAR', en: 'to walk', pos: 'verb' },
    { id: 'u15-leer', es: 'leer', translit: 'leh-EHR', en: 'to read', pos: 'verb' },
    { id: 'u15-bailar', es: 'bailar', translit: 'bah-ee-LAR', en: 'to dance', pos: 'verb' },
    { id: 'u15-cantar', es: 'cantar', translit: 'kan-TAR', en: 'to sing', pos: 'verb' },
    { id: 'u15-jugar', es: 'jugar', translit: 'hoo-GAR', en: 'to play', pos: 'verb' },
    { id: 'u15-viajar', es: 'viajar', translit: 'vyah-HAR', en: 'to travel', pos: 'verb' },
    { id: 'u15-gustar', es: 'gustar', translit: 'goos-TAR', en: 'to like / to please', pos: 'verb' }
  ],
  phrases: [
    { id: 'p-u15-1', es: '¿Qué haces el sábado?', trans: 'keh AH-ses el SAH-bah-doh', en: 'What are you doing on Saturday?' },
    { id: 'p-u15-2', es: '¿Quieres ir conmigo?', trans: 'KYEH-res eer kon-MEE-goh', en: 'Do you want to go with me?' },
    { id: 'p-u15-3', es: '¡Me encanta!', trans: 'meh ehn-KAHN-tah', en: 'I love it!' },
    { id: 'p-u15-4', es: 'Lo siento, no puedo.', trans: 'loh SYEHN-toh noh PWEH-doh', en: 'Sorry, I cannot.' }
  ],
  sentences: [
    { es: 'Me gusta bailar los sábados.', translit: 'meh GOOS-tah bah-ee-LAR los SAH-bah-dos', en: 'I like to dance on Saturdays.', words: [{ id: 'u15-gustar', es: 'gusta', en: 'like' }, { id: 'u15-bailar', es: 'bailar', en: 'to dance' }] },
    { es: 'Me gustan los deportes acuáticos.', translit: 'meh GOOS-tahn los deh-POR-tes ah-KWAH-tee-kos', en: 'I like water sports.', words: [{ id: 'u15-gustar', es: 'gustan', en: 'like' }, { id: 'u15-deporte', es: 'deportes', en: 'sports' }] },
    { es: '¿Quieres jugar al baloncesto conmigo?', translit: 'KYEH-res hoo-GAR al bah-lon-SEHS-toh kon-MEE-goh', en: 'Do you want to play basketball with me?', words: [{ id: 'u15-jugar', es: 'jugar', en: 'to play' }, { id: 'u15-baloncesto', es: 'baloncesto', en: 'basketball' }] },
    { es: 'Hoy hace mucho calor.', translit: 'oy AH-seh MOO-choh kah-LOR', en: 'Today it is very hot.', words: [{ id: 'u15-calor', es: 'calor', en: 'heat' }] },
    { es: 'En Puerto Rico llueve y hace viento.', translit: 'en PWEHR-toh REE-koh YWEH-veh ee AH-seh VYEHN-toh', en: 'In Puerto Rico it rains and it is windy.', words: [{ id: 'u15-lluvia', es: 'llueve', en: 'it rains' }, { id: 'u15-viento', es: 'viento', en: 'wind' }] },
    { es: 'Los domingos voy al gimnasio.', translit: 'los doh-MEEN-gos boy al heem-NAH-syoh', en: 'On Sundays I go to the gym.', words: [{ id: 'u15-gimnasio', es: 'gimnasio', en: 'gym' }] },
    { es: 'Nos gusta ver películas y escuchar música.', translit: 'nos GOOS-tah vehr peh-LEE-koo-lahs ee es-koo-CHAR MOO-see-kah', en: 'We like to watch movies and listen to music.', words: [{ id: 'u15-gustar', es: 'gusta', en: 'like' }, { id: 'u15-pelicula', es: 'películas', en: 'movies' }, { id: 'u15-musica', es: 'música', en: 'music' }] },
    { es: 'Hay mucho sol en la playa hoy.', translit: 'ahy MOO-choh sol en lah PLAH-yah oy', en: 'There is a lot of sun at the beach today.', words: [{ id: 'u15-sol', es: 'sol', en: 'sun' }] }
  ],
  dialogue: {
    title: 'Una invitación (An invitation)',
    lines: [
      { who: 'Ana', es: '¿Qué haces el sábado?', en: 'What are you doing on Saturday?' },
      { who: 'Luis', es: 'Nada especial. ¿Por qué?', en: 'Nothing special. Why?' },
      { who: 'Ana', es: 'Hay un partido de baloncesto. ¿Quieres ir?', en: 'There is a basketball game. Do you want to go?' },
      { who: 'Luis', es: '¡Me encanta el baloncesto! ¿A qué hora?', en: 'I love basketball! What time?' },
      { who: 'Ana', es: 'A las siete. Hace calor, así que lleva agua.', en: 'At seven. It is hot, so bring water.' },
      { who: 'Luis', es: 'Perfecto. ¿Te gusta el fútbol también?', en: 'Perfect. Do you like soccer too?' },
      { who: 'Ana', es: 'Sí, pero prefiero el baloncesto.', en: 'Yes, but I prefer basketball.' },
      { who: 'Luis', es: 'Entonces nos vemos el sábado.', en: 'Then see you on Saturday.' }
    ],
    questions: [
      { type: 'mc-en', q: '¿A qué invita Ana a Luis?', options: ['a basketball game', 'a movie', 'a party', 'the gym'], answer: 'a basketball game' },
      { type: 'mc-en', q: '¿A qué hora es el partido?', options: ['seven', 'eight', 'six', 'nine'], answer: 'seven' },
      { type: 'mc-en', q: '¿Qué dice Ana que hay que llevar?', options: ['water', 'a ball', 'a hat', 'food'], answer: 'water' },
      { type: 'mc-en', q: '¿Qué deporte prefiere Ana?', options: ['basketball', 'soccer', 'tennis', 'swimming'], answer: 'basketball' }
    ]
  },
  quiz: [
    { type: 'mc-en', q: '¿Qué significa «el deporte»?', options: ['sport', 'game', 'ball', 'gym'], answer: 'sport', es: 'el deporte' },
    { type: 'mc-en', q: '¿Qué significa «la pelota»?', options: ['ball', 'game', 'party', 'sport'], answer: 'ball', es: 'la pelota' },
    { type: 'mc-en', q: '¿Qué significa «el calor»?', options: ['heat', 'cold', 'wind', 'rain'], answer: 'heat', es: 'el calor' },
    { type: 'mc-es', q: 'How do you say to swim?', options: ['nadar', 'correr', 'caminar', 'bailar'], answer: 'nadar', es: 'nadar' },
    { type: 'mc-es', q: 'How do you say to dance?', options: ['bailar', 'cantar', 'leer', 'jugar'], answer: 'bailar', es: 'bailar' },
    { type: 'mc-en', q: '¿Qué significa «la fiesta»?', options: ['party', 'music', 'movie', 'gym'], answer: 'party', es: 'la fiesta' },
    { type: 'mc-en', q: '¿Qué significa «el viento»?', options: ['wind', 'rain', 'sun', 'cold'], answer: 'wind', es: 'el viento' },
    { type: 'typing', q: 'Type the word for to travel in Spanish.', answer: 'viajar', accepts: [], es: 'viajar' },
    { type: 'typing', q: 'Type the word for to read in Spanish.', answer: 'leer', accepts: [], es: 'leer' },
    { type: 'mc-es', q: 'Say I like to dance.', options: ['me gusta bailar', 'me gustan los deportes', 'quiero bailar', 'puedo bailar'], answer: 'me gusta bailar', es: 'me gusta bailar' },
    { type: 'mc-en', q: '¿Qué significa «la música»?', options: ['music', 'movie', 'party', 'game'], answer: 'music', es: 'la música' },
    { type: 'mc-es', q: 'Which verb means to play?', options: ['jugar', 'cantar', 'correr', 'nadar'], answer: 'jugar', es: 'jugar' },
    { type: 'mc-en', q: '¿Qué significa «el baloncesto»?', options: ['basketball', 'soccer', 'baseball', 'tennis'], answer: 'basketball', es: 'el baloncesto' }
  ],
  test: {
    title: 'Unit 15 test — Free time & weather',
    questions: [
      { type: 'mc-en', q: '¿Qué significa «el fútbol»?', options: ['soccer', 'basketball', 'ball', 'gym'], answer: 'soccer', es: 'el fútbol' },
      { type: 'mc-es', q: 'Say it is hot.', options: ['hace calor', 'hace frío', 'hace viento', 'está lloviendo'], answer: 'hace calor', es: 'hace calor' },
      { type: 'mc-en', q: '¿Qué significa «el sol»?', options: ['sun', 'wind', 'rain', 'heat'], answer: 'sun', es: 'el sol' },
      { type: 'typing', q: 'Type the word for to run in Spanish.', answer: 'correr', accepts: [], es: 'correr' },
      { type: 'mc-es', q: 'Which word means gym?', options: ['el gimnasio', 'la fiesta', 'el partido', 'la pelota'], answer: 'el gimnasio', es: 'el gimnasio' },
      { type: 'mc-en', q: '¿Qué significa «el frío»?', options: ['cold', 'heat', 'wind', 'rain'], answer: 'cold', es: 'el frío' },
      { type: 'mc-en', q: '¿Qué significa «la lluvia»?', options: ['rain', 'sun', 'wind', 'snow'], answer: 'rain', es: 'la lluvia' },
      { type: 'typing', q: 'Type the word for to sing in Spanish.', answer: 'cantar', accepts: [], es: 'cantar' },
      { type: 'mc-es', q: 'Say I like the movies (plural).', options: ['me gustan las películas', 'me gusta la música', 'quiero la película', 'veo películas'], answer: 'me gustan las películas', es: 'me gustan las películas' },
      { type: 'mc-en', q: '¿Qué significa «el partido»?', options: ['game', 'party', 'ball', 'gym'], answer: 'game', es: 'el partido' },
      { type: 'mc-es', q: 'Which verb means to walk?', options: ['caminar', 'correr', 'nadar', 'viajar'], answer: 'caminar', es: 'caminar' },
      { type: 'mc-en', q: '¿Qué significa «el tiempo libre»?', options: ['free time', 'weather', 'schedule', 'party'], answer: 'free time', es: 'el tiempo libre' }
    ]
  }
};
