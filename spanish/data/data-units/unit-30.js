// Unit 30 — Telling stories. B1.
export const unit = {
  id: 'u30',
  level: 'B1',
  number: 30,
  title: 'Telling stories',
  titleEs: 'Contar historias',
  story: 'Your friends want to know what happened last weekend. A good story needs two things: a scene where something was going on, and a chain of events that moves it forward. In this unit you mix the imperfect with the preterite and connect everything with words like de repente and al final.',
  grammar: [
    {
      topic: 'Preterite and imperfect together',
      explanation: 'The imperfect sets the scene: what was happening, how things used to be (era niño, vivía, caminábamos). The preterite moves the story forward with finished actions (empezó, salió, vimos). A good story alternates between the two.',
      table: [
        ['Use', 'Tense', 'Example'],
        ['Background and habits', 'imperfect', 'Cuando era niño, vivía en el campo.'],
        ['A finished action', 'preterite', 'De repente, empezó a llover.'],
        ['An action in progress', 'imperfect', 'Mientras caminábamos...'],
        ['The next event', 'preterite', '...vimos un lago.']
      ],
      examples: [
        { es: 'Mientras caminábamos, vimos un lago.', trans: 'MYEN-tras kah-mee-NAH-bah-mos BEE-mos oon LAH-go', en: 'While we were walking, we saw a lake.' },
        { es: 'Cuando era joven, jugaba en la calle.', trans: 'KWAHN-do EH-rah HOH-ben HOO-gah-bah en lah KAH-yeh', en: 'When I was young, I used to play in the street.' }
      ]
    },
    {
      topic: 'Connectors that move a story along',
      explanation: 'Connectors show the order of events and keep your listener with you. Use primero, luego and después for sequence, de repente for a surprise, mientras for two things at once, and al final to close the story.',
      table: [
        ['Connector', 'Meaning', 'Example'],
        ['primero', 'first', 'Primero fuimos al mercado.'],
        ['luego (después)', 'then / afterwards', 'Luego comimos pescado.'],
        ['de repente', 'suddenly', 'De repente, empezó a llover.'],
        ['mientras', 'while', 'Mientras nadábamos...'],
        ['al final', 'in the end', 'Al final, todo salió bien.']
      ],
      examples: [
        { es: 'Primero fuimos al mercado y luego a la playa.', trans: 'PREE-meh-ro FWEEM-os al mer-KAH-do ee LWEH-go ah lah PLAH-yah', en: 'First we went to the market and then to the beach.' }
      ]
    },
    {
      topic: 'Time anchors: hace and desde hace',
      explanation: 'Hace plus a period of time means ago: hace dos años (two years ago). To say how long something has lasted, use desde hace with a time, or hace plus a time plus que plus the present.',
      table: [
        ['Spanish', 'English'],
        ['Hace dos años...', 'Two years ago...'],
        ['Hace mucho tiempo...', 'A long time ago...'],
        ['Vivo aquí desde hace un año.', 'I have lived here for a year.'],
        ['Hace un año que vivo aquí.', 'I have lived here for a year.']
      ],
      examples: [
        { es: 'Hace un año que vivo en la isla.', trans: 'AH-seh oon AH-nyo keh BEE-vo en lah EES-lah', en: 'I have lived on the island for a year.' }
      ]
    },
    {
      topic: 'Reported speech to retell what someone said',
      explanation: 'To repeat what someone said, use dijo que or me contó que and shift the tense back: dijo que estaba cansado (he said he was tired). This keeps the story moving without long quotations.',
      table: [
        ['Direct', 'Reported', 'English'],
        ['Estoy cansado.', 'Dijo que estaba cansado.', 'He said he was tired.'],
        ['Vamos a la playa.', 'Dijo que íbamos a la playa.', 'He said we were going to the beach.'],
        ['No tengo tiempo.', 'Me contó que no tenía tiempo.', 'He told me he had no time.']
      ],
      examples: [
        { es: 'Me contó que había perdido el pasaporte.', trans: 'meh kon-TOH keh ah-BEE-ah per-DEE-do el pah-sah-POR-teh', en: 'He told me he had lost his passport.' }
      ]
    }
  ],
  vocabulary: [
    { id: 'u30-historia', es: 'historia', translit: 'ees-TOH-ryah', en: 'story / history', pos: 'noun', gender: 'f' },
    { id: 'u30-cuento', es: 'cuento', translit: 'KWEN-to', en: 'tale / short story', pos: 'noun', gender: 'm' },
    { id: 'u30-narrador', es: 'narrador', translit: 'nah-rah-DOR', en: 'narrator', pos: 'noun', gender: 'm' },
    { id: 'u30-personaje', es: 'personaje', translit: 'per-soh-NAH-heh', en: 'character', pos: 'noun', gender: 'm' },
    { id: 'u30-principio', es: 'principio', translit: 'preen-SEE-pyo', en: 'beginning', pos: 'noun', gender: 'm' },
    { id: 'u30-final', es: 'final', translit: 'fee-NAL', en: 'ending', pos: 'noun', gender: 'm' },
    { id: 'u30-reina', es: 'reina', translit: 'REY-nah', en: 'queen', pos: 'noun', gender: 'f' },
    { id: 'u30-valiente', es: 'valiente', translit: 'bah-LYEN-teh', en: 'brave', pos: 'adjective' },
    { id: 'u30-emocionante', es: 'emocionante', translit: 'eh-moh-syo-NAN-teh', en: 'exciting / moving', pos: 'adjective' },
    { id: 'u30-recordar', es: 'recordar', translit: 'reh-kor-DAR', en: 'to remember', pos: 'verb' },
    { id: 'u30-contar', es: 'contar', translit: 'kon-TAR', en: 'to tell / to count', pos: 'verb' },
    { id: 'u30-pasar', es: 'pasar', translit: 'pah-SAR', en: 'to happen / to pass', pos: 'verb' },
    { id: 'u30-suceder', es: 'suceder', translit: 'soo-seh-DER', en: 'to happen', pos: 'verb' },
    { id: 'u30-empezar', es: 'empezar', translit: 'em-peh-SAR', en: 'to begin', pos: 'verb' },
    { id: 'u30-ser', es: 'ser', translit: 'sehr', en: 'to be', pos: 'verb' },
    { id: 'u30-vivir', es: 'vivir', translit: 'bee-BEER', en: 'to live', pos: 'verb' },
    { id: 'u30-caminar', es: 'caminar', translit: 'kah-mee-NAR', en: 'to walk', pos: 'verb' },
    { id: 'u30-hablar', es: 'hablar', translit: 'ah-BLAR', en: 'to talk', pos: 'verb' },
    { id: 'u30-entonces', es: 'entonces', translit: 'en-TON-ses', en: 'then / so', pos: 'adverb' },
    { id: 'u30-dederepente', es: 'de repente', translit: 'deh reh-PEN-teh', en: 'suddenly', pos: 'adverb' },
    { id: 'u30-mientras', es: 'mientras', translit: 'MYEN-tras', en: 'while', pos: 'conjunction' },
    { id: 'u30-alfinal', es: 'al final', translit: 'al fee-NAL', en: 'in the end / finally', pos: 'phrase' },
    { id: 'u30-hacemuchotiempo', es: 'hace mucho tiempo', translit: 'AH-seh MOO-cho TYEM-po', en: 'a long time ago', pos: 'phrase' }
  ],
  phrases: [
    { id: 'p-u30-1', es: '¿Qué te pasó?', trans: 'keh teh pah-SO', en: 'What happened to you?' },
    { id: 'p-u30-2', es: 'Para hacerla corta...', trans: 'PAH-rah ah-SER-lah KOR-tah', en: 'To make a long story short...' },
    { id: 'p-u30-3', es: 'Al final salió todo bien.', trans: 'al fee-NAL sah-LYO TOH-do byen', en: 'In the end everything turned out fine.' },
    { id: 'p-u30-4', es: 'De repente, todo cambió.', trans: 'deh reh-PEN-teh TOH-do kam-BYO', en: 'Suddenly, everything changed.' }
  ],
  sentences: [
    { es: 'Cuando era niño, vivía en el campo.', translit: 'KWAHN-do EH-rah NEE-nyo bee-VEE-ah en el KAM-po', en: 'When I was a child, I lived in the countryside.', words: [{ id: 'u30-ser', es: 'era', en: 'I was' }, { id: 'u30-vivir', es: 'vivía', en: 'I lived' }] },
    { es: 'De repente, empezó a llover.', translit: 'deh reh-PEN-teh em-peh-SO ah yoh-BEHR', en: 'Suddenly, it started to rain.', words: [{ id: 'u30-dederepente', es: 'De repente', en: 'suddenly' }, { id: 'u30-empezar', es: 'empezó', en: 'it started' }] },
    { es: 'Mientras caminábamos, hablábamos de la vida.', translit: 'MYEN-tras kah-mee-NAH-bah-mos ah-BLAH-bah-mos deh lah BEE-dah', en: 'While we were walking, we talked about life.', words: [{ id: 'u30-mientras', es: 'Mientras', en: 'while' }, { id: 'u30-caminar', es: 'caminábamos', en: 'we were walking' }, { id: 'u30-hablar', es: 'hablábamos', en: 'we were talking' }] },
    { es: 'Al final, todo salió bien.', translit: 'al fee-NAL TOH-do sah-LYO byen', en: 'In the end, everything turned out fine.', words: [{ id: 'u30-alfinal', es: 'Al final', en: 'in the end' }] },
    { es: 'Hace mucho tiempo, una reina vivía en un castillo.', translit: 'AH-seh MOO-cho TYEM-po OO-nah REY-nah bee-VEE-ah en oon kas-TEE-yo', en: 'A long time ago, a queen lived in a castle.', words: [{ id: 'u30-hacemuchotiempo', es: 'Hace mucho tiempo', en: 'a long time ago' }, { id: 'u30-reina', es: 'reina', en: 'queen' }, { id: 'u30-vivir', es: 'vivía', en: 'lived' }] },
    { es: 'El personaje principal es muy valiente.', translit: 'el per-soh-NAH-heh preen-see-PAL es mwee bah-LYEN-teh', en: 'The main character is very brave.', words: [{ id: 'u30-personaje', es: 'personaje', en: 'character' }, { id: 'u30-valiente', es: 'valiente', en: 'brave' }] }
  ],
  dialogue: {
    title: 'El fin de semana de Sofía (The weekend of Sofía)',
    lines: [
      { who: 'Marco', es: '¿Qué hiciste el fin de semana?', en: 'What did you do at the weekend?' },
      { who: 'Sofía', es: 'Fui a la playa con mi familia. Mientras nadábamos, empezó a llover.', en: 'I went to the beach with my family. While we were swimming, it started to rain.' },
      { who: 'Marco', es: '¡Qué mala suerte! ¿Y qué hicieron?', en: 'What bad luck! And what did you do?' },
      { who: 'Sofía', es: 'Corrimos a un restaurante y comimos pescado frito.', en: 'We ran to a restaurant and ate fried fish.' },
      { who: 'Marco', es: '¿Y después?', en: 'And afterwards?' },
      { who: 'Sofía', es: 'Después fuimos al cine. Al final, fue un día divertido.', en: 'Afterwards we went to the cinema. In the end, it was a fun day.' }
    ],
    questions: [
      { type: 'mc-en', q: '¿Adónde fue Sofía?', options: ['To the beach', 'To the mountains', 'To the cinema first', 'To the market'], answer: 'To the beach' },
      { type: 'mc-en', q: '¿Qué pasó mientras nadaban?', options: ['It started to rain', 'They saw a shark', 'They lost a phone', 'It got dark'], answer: 'It started to rain' },
      { type: 'mc-en', q: '¿Qué comieron en el restaurante?', options: ['Fried fish', 'Rice and beans', 'Pizza', 'Fruit'], answer: 'Fried fish' }
    ]
  },
  quiz: [
    { type: 'mc-en', q: '¿Qué significa «historia»?', options: ['story / history', 'character', 'ending', 'narrator'], answer: 'story / history', es: 'historia' },
    { type: 'mc-en', q: '¿Qué significa «cuento»?', options: ['tale / short story', 'novel', 'poem', 'song'], answer: 'tale / short story', es: 'cuento' },
    { type: 'mc-es', q: 'How do you say suddenly?', options: ['de repente', 'al final', 'mientras', 'entonces'], answer: 'de repente', es: 'de repente' },
    { type: 'mc-es', q: 'How do you say in the end?', options: ['al final', 'de repente', 'al principio', 'entonces'], answer: 'al final', es: 'al final' },
    { type: 'typing', q: 'Type the word for queen in Spanish', answer: 'reina', accepts: [], es: 'reina' },
    { type: 'typing', q: 'Type the word for character in Spanish', answer: 'personaje', accepts: [], es: 'personaje' },
    { type: 'mc-en', q: '¿Qué significa «mientras»?', options: ['while', 'then', 'suddenly', 'finally'], answer: 'while', es: 'mientras' },
    { type: 'mc-es', q: 'How do you say to remember?', options: ['recordar', 'contar', 'pasar', 'suceder'], answer: 'recordar', es: 'recordar' },
    { type: 'mc-en', q: '¿Qué significa «valiente»?', options: ['brave', 'shy', 'funny', 'tired'], answer: 'brave', es: 'valiente' },
    { type: 'mc-en', q: '¿Qué significa «suceder»?', options: ['to happen', 'to tell', 'to walk', 'to live'], answer: 'to happen', es: 'suceder' },
    { type: 'mc-es', q: 'Which word means beginning?', options: ['principio', 'final', 'cuento', 'narrador'], answer: 'principio', es: 'principio' },
    { type: 'mc-es', q: 'How do you say to tell a story?', options: ['contar', 'caminar', 'hablar', 'empezar'], answer: 'contar', es: 'contar' },
    { type: 'mc-en', q: '¿Qué significa «entonces»?', options: ['then / so', 'now', 'never', 'always'], answer: 'then / so', es: 'entonces' },
    { type: 'typing', q: 'Type the word for to live in Spanish', answer: 'vivir', accepts: [], es: 'vivir' }
  ],
  test: {
    title: 'Unit 30 test — Telling stories',
    questions: [
      { type: 'mc-en', q: '¿Qué significa «narrador»?', options: ['narrator', 'character', 'reader', 'writer'], answer: 'narrator', es: 'narrador' },
      { type: 'mc-es', q: 'How do you say ending?', options: ['final', 'principio', 'cuento', 'historia'], answer: 'final', es: 'final' },
      { type: 'typing', q: 'Type the word for to begin in Spanish', answer: 'empezar', accepts: [], es: 'empezar' },
      { type: 'typing', q: 'Type the word for to walk in Spanish', answer: 'caminar', accepts: [], es: 'caminar' },
      { type: 'mc-en', q: '¿Qué significa «emocionante»?', options: ['exciting / moving', 'boring', 'sad', 'quiet'], answer: 'exciting / moving', es: 'emocionante' },
      { type: 'mc-es', q: 'Complete: Cuando ... niño, vivía en el campo.', options: ['era', 'fui', 'estuve', 'será'], answer: 'era', es: 'era' },
      { type: 'mc-es', q: 'Complete: De repente, ... a llover.', options: ['empezó', 'empezaba', 'empieza', 'empezará'], answer: 'empezó', es: 'empezó' },
      { type: 'mc-es', q: 'How do you say a long time ago?', options: ['hace mucho tiempo', 'de repente', 'al final', 'mientras'], answer: 'hace mucho tiempo', es: 'hace mucho tiempo' },
      { type: 'typing', q: 'Type the word for tale in Spanish', answer: 'cuento', accepts: [], es: 'cuento' },
      { type: 'mc-en', q: '¿Qué significa «pasar»?', options: ['to happen / to pass', 'to live', 'to count', 'to remember'], answer: 'to happen / to pass', es: 'pasar' },
      { type: 'mc-es', q: 'Which word means while?', options: ['mientras', 'entonces', 'al final', 'de repente'], answer: 'mientras', es: 'mientras' },
      { type: 'mc-en', q: '¿Qué significa «hablar»?', options: ['to talk', 'to walk', 'to tell', 'to begin'], answer: 'to talk', es: 'hablar' }
    ]
  }
};
