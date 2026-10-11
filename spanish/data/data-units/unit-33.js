// Unit 33 — Art, literature & film. B2.
export const unit = {
  id: 'u33',
  level: 'B2',
  number: 33,
  title: 'Art, literature & film',
  titleEs: 'Arte, literatura y cine',
  story: 'San Juan is full of galleries, old cinemas and small theatres. In this unit you learn to describe a painting, give an opinion about a film and write a short review, using the same words that critics use in Spanish. By the end you will be able to praise or criticise any work with confidence.',
  grammar: [
    {
      topic: 'Giving an opinion about a work of art',
      explanation: 'Use me parece que, creo que, en mi opinión or desde mi punto de vista. Notice that me parece plus an adjective talks about the work itself (me parece interesante), while me parece que introduces a whole idea.',
      table: [
        ['Spanish', 'English'],
        ['Me parece interesante.', 'It seems interesting to me.'],
        ['Me parece que es original.', 'I think it is original.'],
        ['En mi opinión, sobra una escena.', 'In my opinion, one scene is unnecessary.'],
        ['Desde mi punto de vista, es una obra maestra.', 'From my point of view, it is a masterpiece.']
      ],
      examples: [
        { es: 'Me parece una película muy emotiva.', trans: 'meh pah-REH-seh OO-nah peh-LEE-koo-lah mwee eh-moh-TEE-bah', en: 'I find it a very moving film.' }
      ]
    },
    {
      topic: 'Describing and evaluating with ser and estar',
      explanation: 'Use ser for what a work is (es una novela, es de 1985) and estar for its state or how it is presented (está basada en hechos reales, está escrita en verso). The passive with estar and a participle is very common in reviews.',
      table: [
        ['Spanish', 'English'],
        ['La película es de 2019.', 'The film is from 2019.'],
        ['Está basada en una novela.', 'It is based on a novel.'],
        ['La obra está escrita en verso.', 'The work is written in verse.'],
        ['Los personajes son complejos.', 'The characters are complex.']
      ],
      examples: [
        { es: 'La película está basada en una historia real.', trans: 'lah peh-LEE-koo-lah es-TA bah-SAH-dah en OO-nah ees-TOH-ryah reh-AL', en: 'The film is based on a true story.' }
      ]
    },
    {
      topic: 'Praise and criticism with comparatives',
      explanation: 'To judge a work, compare it: mejor que, peor que, tan emotivo como. Superlatives add lo: la mejor película, el actor más talentoso, lo más interesante. Remember that lo mejor means the best part or the best thing.',
      table: [
        ['Spanish', 'English'],
        ['Es mejor que la primera parte.', 'It is better than the first part.'],
        ['No es tan larga como parece.', 'It is not as long as it seems.'],
        ['Es la mejor novela del año.', 'It is the best novel of the year.'],
        ['Lo mejor es el final.', 'The best thing is the ending.']
      ],
      examples: [
        { es: 'Lo mejor de la obra es el final.', trans: 'lo meh-HOR deh lah OH-brah es el fee-NAL', en: 'The best part of the play is the ending.' }
      ]
    },
    {
      topic: 'Talking about the author and the work',
      explanation: 'Use the preposition de for the author (la novela de García Márquez) and a participle for the maker (escrita por, dirigida por, interpretada por). Trata de means it is about, and se trata de introduces the theme.',
      table: [
        ['Spanish', 'English'],
        ['una película dirigida por Almodóvar', 'a film directed by Almodóvar'],
        ['una novela escrita por una poeta joven', 'a novel written by a young poet'],
        ['La historia trata de la amistad.', 'The story is about friendship.'],
        ['Se trata de un tema difícil.', 'It is a difficult topic.']
      ],
      examples: [
        { es: 'Es una película dirigida por una cineasta puertorriqueña.', trans: 'es OO-nah peh-LEE-koo-lah dee-ree-HEE-dah por OO-nah see-neh-AS-tah pwer-toh-ree-KEH-nyah', en: 'It is a film directed by a Puerto Rican filmmaker.' }
      ]
    }
  ],
  vocabulary: [
    { id: 'u33-arte', es: 'arte', translit: 'AR-teh', en: 'art', pos: 'noun', gender: 'm' },
    { id: 'u33-obra', es: 'obra', translit: 'OH-brah', en: 'work', pos: 'noun', gender: 'f' },
    { id: 'u33-cuadro', es: 'cuadro', translit: 'KWAH-dro', en: 'painting', pos: 'noun', gender: 'm' },
    { id: 'u33-escultura', es: 'escultura', translit: 'es-kool-TOO-rah', en: 'sculpture', pos: 'noun', gender: 'f' },
    { id: 'u33-novela', es: 'novela', translit: 'noh-BEH-lah', en: 'novel', pos: 'noun', gender: 'f' },
    { id: 'u33-poema', es: 'poema', translit: 'poh-EH-mah', en: 'poem', pos: 'noun', gender: 'm' },
    { id: 'u33-pelicula', es: 'película', translit: 'peh-LEE-koo-lah', en: 'film / movie', pos: 'noun', gender: 'f' },
    { id: 'u33-director', es: 'director', translit: 'dee-rek-TOR', en: 'director', pos: 'noun', gender: 'm' },
    { id: 'u33-actor', es: 'actor', translit: 'ak-TOR', en: 'actor', pos: 'noun', gender: 'm' },
    { id: 'u33-actriz', es: 'actriz', translit: 'ak-TREES', en: 'actress', pos: 'noun', gender: 'f' },
    { id: 'u33-protagonista', es: 'protagonista', translit: 'pro-tah-goh-NEES-tah', en: 'main character', pos: 'noun', gender: 'm' },
    { id: 'u33-escenario', es: 'escenario', translit: 'eh-seh-NAH-ryo', en: 'stage / setting', pos: 'noun', gender: 'm' },
    { id: 'u33-museo', es: 'museo', translit: 'moo-SEH-o', en: 'museum', pos: 'noun', gender: 'm' },
    { id: 'u33-exposicion', es: 'exposición', translit: 'eks-po-see-SYON', en: 'exhibition', pos: 'noun', gender: 'f' },
    { id: 'u33-critica', es: 'crítica', translit: 'KREE-tee-kah', en: 'review / criticism', pos: 'noun', gender: 'f' },
    { id: 'u33-trama', es: 'trama', translit: 'TRAH-mah', en: 'plot', pos: 'noun', gender: 'f' },
    { id: 'u33-obramaestra', es: 'obra maestra', translit: 'OH-brah mah-ES-trah', en: 'masterpiece', pos: 'noun', gender: 'f' },
    { id: 'u33-crear', es: 'crear', translit: 'kreh-AR', en: 'to create', pos: 'verb' },
    { id: 'u33-inspirar', es: 'inspirar', translit: 'een-spee-RAR', en: 'to inspire', pos: 'verb' },
    { id: 'u33-interpretar', es: 'interpretar', translit: 'een-ter-preh-TAR', en: 'to perform / to interpret', pos: 'verb' },
    { id: 'u33-destacar', es: 'destacar', translit: 'des-tah-KAR', en: 'to stand out', pos: 'verb' },
    { id: 'u33-tratar', es: 'tratar', translit: 'trah-TAR', en: 'to be about / to treat', pos: 'verb' },
    { id: 'u33-emotivo', es: 'emotivo', translit: 'eh-moh-TEE-bo', en: 'moving / emotional', pos: 'adjective' },
    { id: 'u33-talentoso', es: 'talentoso', translit: 'tah-len-TOH-so', en: 'talented', pos: 'adjective' },
    { id: 'u33-polemico', es: 'polémico', translit: 'po-LEH-mee-ko', en: 'controversial', pos: 'adjective' },
    { id: 'u33-impresionante', es: 'impresionante', translit: 'eem-preh-syo-NAN-teh', en: 'impressive', pos: 'adjective' },
    { id: 'u33-enmiopinion', es: 'en mi opinión', translit: 'en mee oh-pee-NYON', en: 'in my opinion', pos: 'phrase' }
  ],
  phrases: [
    { id: 'p-u33-1', es: '¿Qué te pareció?', trans: 'keh teh pah-reh-SYO', en: 'What did you think of it?' },
    { id: 'p-u33-2', es: 'Vale la pena verla.', trans: 'BAH-leh lah PEH-nah BEHR-lah', en: 'It is worth watching.' },
    { id: 'p-u33-3', es: 'Es una obra maestra.', trans: 'es OO-nah OH-brah mah-ES-trah', en: 'It is a masterpiece.' },
    { id: 'p-u33-4', es: 'No me convenció del todo.', trans: 'no meh kon-ben-SYO del TOH-do', en: 'It did not fully convince me.' }
  ],
  sentences: [
    { es: 'Este cuadro del museo me parece impresionante.', translit: 'ES-teh KWAH-dro del moo-SEH-o meh pah-REH-seh eem-preh-syo-NAN-teh', en: 'This painting in the museum seems impressive to me.', words: [{ id: 'u33-cuadro', es: 'cuadro', en: 'painting' }, { id: 'u33-museo', es: 'museo', en: 'museum' }, { id: 'u33-impresionante', es: 'impresionante', en: 'impressive' }] },
    { es: 'La película trata de una familia que emigra a Nueva York.', translit: 'lah peh-LEE-koo-lah TRAH-tah deh OO-nah fah-MEE-lyah keh eh-MEE-grah ah NWEH-bah YORK', en: 'The film is about a family that emigrates to New York.', words: [{ id: 'u33-pelicula', es: 'película', en: 'film' }, { id: 'u33-tratar', es: 'trata', en: 'it is about' }] },
    { es: 'En mi opinión, la actriz interpreta su papel con mucha fuerza.', translit: 'en mee oh-pee-NYON lah ak-TREES een-ter-PREH-tah soo pah-PEL kon MOO-cha FWER-sah', en: 'In my opinion, the actress performs her role with great power.', words: [{ id: 'u33-enmiopinion', es: 'En mi opinión', en: 'in my opinion' }, { id: 'u33-actriz', es: 'actriz', en: 'actress' }, { id: 'u33-interpretar', es: 'interpreta', en: 'she performs' }] },
    { es: 'La novela destaca por su trama y sus personajes.', translit: 'lah noh-BEH-lah des-TAH-kah por soo TRAH-mah ee soos per-soh-NAH-hes', en: 'The novel stands out for its plot and its characters.', words: [{ id: 'u33-novela', es: 'novela', en: 'novel' }, { id: 'u33-destacar', es: 'destaca', en: 'it stands out' }, { id: 'u33-trama', es: 'trama', en: 'plot' }] },
    { es: 'Esa escultura es una obra maestra.', translit: 'EH-sah es-kool-TOO-rah es OO-nah OH-brah mah-ES-trah', en: 'That sculpture is a masterpiece.', words: [{ id: 'u33-escultura', es: 'escultura', en: 'sculpture' }, { id: 'u33-obramaestra', es: 'obra maestra', en: 'masterpiece' }] },
    { es: 'El director crea personajes muy emotivos.', translit: 'el dee-rek-TOR KREH-ah per-soh-NAH-hes mwee eh-moh-TEE-bos', en: 'The director creates very moving characters.', words: [{ id: 'u33-director', es: 'director', en: 'director' }, { id: 'u33-crear', es: 'crea', en: 'he creates' }, { id: 'u33-emotivo', es: 'emotivos', en: 'moving' }] }
  ],
  dialogue: {
    title: 'Después del cine (After the cinema)',
    lines: [
      { who: 'Elena', es: '¿Qué te pareció la película?', en: 'What did you think of the film?' },
      { who: 'Rafa', es: 'Me gustó mucho. La trama es sencilla, pero muy emotiva.', en: 'I liked it a lot. The plot is simple, but very moving.' },
      { who: 'Elena', es: 'A mí me pareció un poco larga. La segunda parte sobra.', en: 'I found it a little long. The second part is unnecessary.' },
      { who: 'Rafa', es: 'Tal vez, pero la actriz principal está impresionante.', en: 'Maybe, but the lead actress is impressive.' },
      { who: 'Elena', es: 'Eso sí. Creo que merece un premio.', en: 'That is true. I think she deserves an award.' },
      { who: 'Rafa', es: 'Sin duda. ¿Leíste la novela en la que se basa?', en: 'No doubt. Did you read the novel it is based on?' },
      { who: 'Elena', es: 'Todavía no, pero pienso leerla este fin de semana.', en: 'Not yet, but I plan to read it this weekend.' }
    ],
    questions: [
      { type: 'mc-en', q: '¿Qué le pareció la película a Rafa?', options: ['He liked it a lot', 'He hated it', 'He did not see it', 'He found it boring'], answer: 'He liked it a lot' },
      { type: 'mc-en', q: '¿Qué critica Elena?', options: ['That it is a little long', 'That the acting is bad', 'That the plot is confusing', 'That it is too short'], answer: 'That it is a little long' },
      { type: 'mc-en', q: '¿Qué piensa hacer Elena este fin de semana?', options: ['Read the novel', 'Watch the film again', 'Go to the museum', 'Write a review'], answer: 'Read the novel' }
    ]
  },
  quiz: [
    { type: 'mc-en', q: '¿Qué significa «cuadro»?', options: ['painting', 'sculpture', 'novel', 'poem'], answer: 'painting', es: 'cuadro' },
    { type: 'mc-en', q: '¿Qué significa «novela»?', options: ['novel', 'poem', 'film', 'review'], answer: 'novel', es: 'novela' },
    { type: 'mc-es', q: 'How do you say sculpture?', options: ['escultura', 'cuadro', 'museo', 'obra'], answer: 'escultura', es: 'escultura' },
    { type: 'mc-es', q: 'How do you say plot?', options: ['trama', 'crítica', 'escena', 'obra'], answer: 'trama', es: 'trama' },
    { type: 'typing', q: 'Type the word for film in Spanish', answer: 'pelicula', accepts: ['película'], es: 'película' },
    { type: 'typing', q: 'Type the word for museum in Spanish', answer: 'museo', accepts: [], es: 'museo' },
    { type: 'mc-en', q: '¿Qué significa «actriz»?', options: ['actress', 'actor', 'director', 'character'], answer: 'actress', es: 'actriz' },
    { type: 'mc-es', q: 'How do you say to inspire?', options: ['inspirar', 'crear', 'interpretar', 'destacar'], answer: 'inspirar', es: 'inspirar' },
    { type: 'mc-en', q: '¿Qué significa «obra maestra»?', options: ['masterpiece', 'exhibition', 'sketch', 'genre'], answer: 'masterpiece', es: 'obra maestra' },
    { type: 'mc-en', q: '¿Qué significa «polémico»?', options: ['controversial', 'impressive', 'talented', 'boring'], answer: 'controversial', es: 'polémico' },
    { type: 'mc-es', q: 'How do you say exhibition?', options: ['exposición', 'crítica', 'trama', 'museo'], answer: 'exposición', es: 'exposición' },
    { type: 'mc-en', q: '¿Qué significa «talentoso»?', options: ['talented', 'moving', 'famous', 'controversial'], answer: 'talented', es: 'talentoso' },
    { type: 'mc-es', q: 'How do you say in my opinion?', options: ['en mi opinión', 'sin duda', 'vale la pena', 'a mi parecer'], answer: 'en mi opinión', es: 'en mi opinión' },
    { type: 'typing', q: 'Type the word for art in Spanish', answer: 'arte', accepts: [], es: 'arte' }
  ],
  test: {
    title: 'Unit 33 test — Art, literature & film',
    questions: [
      { type: 'mc-en', q: '¿Qué significa «director»?', options: ['director', 'actor', 'painter', 'critic'], answer: 'director', es: 'director' },
      { type: 'mc-es', q: 'How do you say work (of art)?', options: ['obra', 'cuadro', 'trama', 'museo'], answer: 'obra', es: 'obra' },
      { type: 'typing', q: 'Type the word for poem in Spanish', answer: 'poema', accepts: [], es: 'poema' },
      { type: 'typing', q: 'Type the word for review in Spanish', answer: 'critica', accepts: ['crítica'], es: 'crítica' },
      { type: 'mc-en', q: '¿Qué significa «emotivo»?', options: ['moving / emotional', 'funny', 'violent', 'slow'], answer: 'moving / emotional', es: 'emotivo' },
      { type: 'mc-es', q: 'Complete: La película ... basada en una novela.', options: ['está', 'es', 'son', 'hay'], answer: 'está', es: 'está' },
      { type: 'mc-es', q: 'How do you say main character?', options: ['protagonista', 'director', 'actor', 'escenario'], answer: 'protagonista', es: 'protagonista' },
      { type: 'mc-en', q: '¿Qué significa «escenario»?', options: ['stage / setting', 'screen', 'costume', 'ticket'], answer: 'stage / setting', es: 'escenario' },
      { type: 'typing', q: 'Type the word for to create in Spanish', answer: 'crear', accepts: [], es: 'crear' },
      { type: 'mc-en', q: '¿Qué significa «impresionante»?', options: ['impressive', 'expensive', 'important', 'boring'], answer: 'impressive', es: 'impresionante' },
      { type: 'mc-es', q: 'Which word means actress?', options: ['actriz', 'actor', 'protagonista', 'artista'], answer: 'actriz', es: 'actriz' },
      { type: 'mc-en', q: '¿Qué significa «tratar de»?', options: ['to be about', 'to try on', 'to deal', 'to treat badly'], answer: 'to be about', es: 'tratar' }
    ]
  }
};
