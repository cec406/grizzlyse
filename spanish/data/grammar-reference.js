// Grammar reference tables. Content is for learners at the given levels.
export const GRAMMAR_TOPICS = [
  {
    id: 'gender', level: 'A1', title: 'Noun gender, articles and plural',
    intro: 'Every Spanish noun is masculine or feminine. The article and the adjective must match. Most nouns ending in -o are masculine and most ending in -a are feminine, with a few exceptions to memorise.',
    table: [
      ['Gender', 'Typical ending', 'Article', 'Example', 'Meaning'],
      ['Masculine', '-o', 'el / un', 'el libro', 'the book'],
      ['Masculine', 'consonant', 'el / un', 'el papel', 'the paper'],
      ['Feminine', '-a', 'la / una', 'la casa', 'the house'],
      ['Feminine', '-ción, -dad, -tad', 'la / una', 'la ciudad', 'the city'],
      ['Plural', '+s / +es', 'los / las', 'los libros, las casas', 'the books, the houses']
    ],
    examples: [
      { es: 'el problema, la mano', en: 'exceptions: problema is masculine, mano is feminine' },
      { es: 'el agua fría', en: 'agua is feminine but takes el before stressed a-: el agua fría' }
    ]
  },
  {
    id: 'pronouns', level: 'A1', title: 'Personal pronouns',
    intro: 'Spanish has subject pronouns for each person. Because verb endings already show the person, subject pronouns are often dropped — but they are used for emphasis or clarity.',
    table: [
      ['Person', 'Singular', 'Plural'],
      ['1st', 'yo (I)', 'nosotros / nosotras (we)'],
      ['2nd', 'tú (you, informal)', 'vosotros / vosotras (you, Spain)'],
      ['2nd polite', 'usted (you, formal)', 'ustedes (you, plural)'],
      ['3rd', 'él / ella (he / she)', 'ellos / ellas (they)']
    ],
    examples: [
      { es: 'Yo hablo. Hablas.', en: 'I speak. You speak. (pronoun optional)' },
      { es: '¿Habla usted español?', en: 'Do you speak Spanish? (formal)' }
    ]
  },
  {
    id: 'present', level: 'A1', title: 'Present tense (regular verbs)',
    intro: 'Regular verbs end in -ar, -er or -ir. The endings change with the person; many learners call this the backbone of Spanish.',
    table: [
      ['Person', 'hablar (-ar)', 'comer (-er)', 'vivir (-ir)'],
      ['yo', 'hablo', 'como', 'vivo'],
      ['tú', 'hablas', 'comes', 'vives'],
      ['él / ella / usted', 'habla', 'come', 'vive'],
      ['nosotros', 'hablamos', 'comemos', 'vivimos'],
      ['vosotros', 'habláis', 'coméis', 'vivís'],
      ['ellos / ustedes', 'hablan', 'comen', 'viven']
    ],
    examples: [
      { es: 'Yo hablo español.', en: 'I speak Spanish.' },
      { es: 'Ella vive en Madrid.', en: 'She lives in Madrid.' }
    ]
  },
  {
    id: 'ser-estar', level: 'A1', title: 'Ser vs estar',
    intro: 'English has one verb "to be"; Spanish has two. Use ser for identity, origin and permanent traits; use estar for location, states and temporary conditions.',
    table: [
      ['Use', 'Verb', 'Example'],
      ['identity, origin', 'ser', 'Soy Ana. Soy de México.'],
      ['permanent trait', 'ser', 'Es alto y simpático.'],
      ['location', 'estar', 'Estoy en casa.'],
      ['temporary state', 'estar', 'Estoy cansado.'],
      ['emotion', 'estar', 'Estamos contentos.']
    ],
    examples: [
      { es: 'Soy profesora, pero hoy estoy de vacaciones.', en: 'I am a teacher (ser), but today I am on holiday (estar).' },
      { es: 'La sopa está fría.', en: 'The soup is cold (state → estar).' }
    ]
  },
  {
    id: 'articles', level: 'A1', title: 'Definite and indefinite articles',
    intro: 'Articles agree with the noun in gender and number: the "the" of Spanish is el / la / los / las, and "a/an" is un / una.',
    table: [
      ['', 'Masculine sing.', 'Feminine sing.', 'Masculine pl.', 'Feminine pl.'],
      ['the', 'el', 'la', 'los', 'las'],
      ['a / an / some', 'un', 'una', 'unos', 'unas']
    ],
    examples: [
      { es: 'el chico, la chica', en: 'the boy, the girl' },
      { es: 'unos libros, unas mesas', en: 'some books, some tables' }
    ]
  },
  {
    id: 'adjectives', level: 'A1', title: 'Adjectives agree',
    intro: 'An adjective usually follows the noun and copies its gender and number. One form ends in -o for masculine, -a for feminine, and plurals add -s.',
    table: [
      ['', 'Masculine sing.', 'Feminine sing.', 'Masculine pl.', 'Feminine pl.'],
      ['alto', 'alto', 'alta', 'altos', 'altas'],
      ['difícil (no change)', 'difícil', 'difícil', 'difíciles', 'difíciles']
    ],
    examples: [
      { es: 'un chico alto, una chica alta', en: 'a tall boy, a tall girl' },
      { es: 'una casa bonita y grande', en: 'a pretty, big house' }
    ]
  },
  {
    id: 'questions', level: 'A1', title: 'Question words',
    intro: 'Spanish questions open with an inverted question mark (¿) and usually with a question word. Most question words carry a written accent.',
    table: [
      ['Spanish', 'English', 'Example'],
      ['qué', 'what', '¿Qué es esto?'],
      ['quién / quiénes', 'who', '¿Quién es ella?'],
      ['dónde', 'where', '¿Dónde vives?'],
      ['cuándo', 'when', '¿Cuándo llegas?'],
      ['cómo', 'how', '¿Cómo estás?'],
      ['cuánto', 'how much', '¿Cuánto cuesta?'],
      ['por qué', 'why', '¿Por qué no vienes?']
    ],
    examples: [
      { es: '¿Qué quieres?', en: 'What do you want?' },
      { es: '¿Cómo te llamas?', en: 'What is your name? (literally: how do you call yourself)' }
    ]
  },
  {
    id: 'numbers', level: 'A1', title: 'Numbers and counting',
    intro: 'Learn one to twenty, then the tens. Most numbers never change — but uno shortens to un before a masculine noun and una before a feminine one (un libro, una casa).',
    table: [
      ['Number', 'Spanish', 'Number', 'Spanish'],
      ['1', 'uno', '6', 'seis'],
      ['2', 'dos', '7', 'siete'],
      ['3', 'tres', '8', 'ocho'],
      ['4', 'cuatro', '9', 'nueve'],
      ['5', 'cinco', '10', 'diez']
    ],
    examples: [
      { es: 'tengo dos hermanos', en: 'I have two brothers' },
      { es: 'veinte euros', en: 'twenty euros' }
    ]
  },
  {
    id: 'possessives', level: 'A1', title: 'Possessive adjectives',
    intro: 'Possessives agree with the thing owned, not the owner. Short forms go before the noun; long forms (mío, tuyo) go after or stand alone.',
    table: [
      ['Owner', 'Masc. sing.', 'Fem. sing.', 'Masc. pl.', 'Fem. pl.'],
      ['my', 'mi', 'mi', 'mis', 'mis'],
      ['your (tú)', 'tu', 'tu', 'tus', 'tus'],
      ['his / her / your (usted)', 'su', 'su', 'sus', 'sus'],
      ['our', 'nuestro', 'nuestra', 'nuestros', 'nuestras']
    ],
    examples: [
      { es: 'mi hermano y mi hermana', en: 'my brother and my sister' },
      { es: 'Este libro es mío.', en: 'This book is mine. (long form stands alone)' }
    ]
  },
  {
    id: 'stemchanging', level: 'A2', title: 'Stem-changing verbs',
    intro: 'Many common verbs change a stem vowel when the ending is stressed: e→ie, o→ue, e→i. The nosotros and vosotros forms keep the original vowel.',
    table: [
      ['Infinitive', 'Change', 'yo', 'nosotros'],
      ['querer', 'e → ie', 'quiero', 'queremos'],
      ['poder', 'o → ue', 'puedo', 'podemos'],
      ['pedir', 'e → i', 'pido', 'pedimos'],
      ['jugar', 'u → ue', 'juego', 'jugamos']
    ],
    examples: [
      { es: 'Quiero ir, pero no puedo.', en: 'I want to go, but I cannot.' },
      { es: '¿Cuántos años tienes?', en: 'How old are you? (tener: e→ie)' }
    ]
  },
  {
    id: 'preterite', level: 'A2', title: 'Preterite (completed past)',
    intro: 'The preterite tells what happened and finished. It is the default past for single completed events.',
    table: [
      ['Person', 'hablar', 'comer', 'vivir'],
      ['yo', 'hablé', 'comí', 'viví'],
      ['tú', 'hablaste', 'comiste', 'viviste'],
      ['él / ella', 'habló', 'comió', 'vivió'],
      ['nosotros', 'hablamos', 'comimos', 'vivimos'],
      ['ellos', 'hablaron', 'comieron', 'vivieron']
    ],
    examples: [
      { es: 'Ayer compré pan.', en: 'Yesterday I bought bread.' },
      { es: 'Ellos llegaron tarde.', en: 'They arrived late.' }
    ]
  },
  {
    id: 'imperfect', level: 'A2', title: 'Imperfect (description and habit)',
    intro: 'The imperfect describes past states, habits and ongoing scenes: what used to happen, what things were like.',
    table: [
      ['Person', 'hablar', 'comer', 'vivir'],
      ['yo', 'hablaba', 'comía', 'vivía'],
      ['tú', 'hablabas', 'comías', 'vivías'],
      ['él / ella', 'hablaba', 'comía', 'vivía'],
      ['nosotros', 'hablábamos', 'comíamos', 'vivíamos'],
      ['ellos', 'hablaban', 'comían', 'vivían']
    ],
    examples: [
      { es: 'Cuando era niño, jugaba en el parque.', en: 'When I was a child, I used to play in the park.' },
      { es: 'Era tarde y llovía.', en: 'It was late and it was raining (scene).' }
    ]
  },
  {
    id: 'por-para', level: 'A2', title: 'Por vs para',
    intro: 'Both translate "for", but they are not interchangeable. Learn the main uses as two lists.',
    table: [
      ['Por', 'Para'],
      ['cause, reason (gracias por)', 'purpose, goal (para aprender)'],
      ['exchange, price (por diez euros)', 'recipient (para ti)'],
      ['through, along (por el parque)', 'destination, deadline (para Madrid)'],
      ['duration (por dos horas)', 'opinion (para mí)']
    ],
    examples: [
      { es: 'Gracias por tu ayuda.', en: 'Thanks for your help (cause).' },
      { es: 'Este regalo es para ti.', en: 'This gift is for you (recipient).' }
    ]
  },
  {
    id: 'reflexive', level: 'A2', title: 'Reflexive verbs',
    intro: 'Reflexive verbs describe an action done to oneself. The pronoun (me, te, se, nos) matches the subject.',
    table: [
      ['Person', 'levantarse', 'llamarse'],
      ['yo', 'me levanto', 'me llamo'],
      ['tú', 'te levantas', 'te llamas'],
      ['él / ella', 'se levanta', 'se llama'],
      ['nosotros', 'nos levantamos', 'nos llamamos'],
      ['ellos', 'se levantan', 'se llaman']
    ],
    examples: [
      { es: 'Me llamo Ana.', en: 'My name is Ana (I call myself Ana).' },
      { es: 'Nos levantamos a las siete.', en: 'We get up at seven.' }
    ]
  },
  {
    id: 'imperative', level: 'A2', title: 'Commands (imperative)',
    intro: 'Give orders with the tú form for friends and the usted form for politeness. Some tú forms are irregular.',
    table: [
      ['Verb', 'tú command', 'usted command'],
      ['hablar', '¡habla!', '¡hable!'],
      ['comer', '¡come!', '¡coma!'],
      ['venir', '¡ven!', '¡venga!'],
      ['hacer', '¡haz!', '¡haga!'],
      ['ir', '¡ve!', '¡vaya!']
    ],
    examples: [
      { es: 'Habla más despacio, por favor.', en: 'Speak more slowly, please. (informal)' },
      { es: 'Venga conmigo.', en: 'Come with me. (formal)' }
    ]
  },
  {
    id: 'comparatives', level: 'B1', title: 'Comparatives and superlatives',
    intro: 'Compare with más / menos … que. A few adjectives have irregular comparatives. The superlative uses el / la más …',
    table: [
      ['Adjective', 'Comparative', 'Superlative'],
      ['alto', 'más alto que', 'el más alto'],
      ['rápido', 'más rápido que', 'el más rápido'],
      ['bueno', 'mejor que', 'el mejor'],
      ['malo', 'peor que', 'el peor']
    ],
    examples: [
      { es: 'Este libro es más interesante que ese.', en: 'This book is more interesting than that one.' },
      { es: 'Es el mejor restaurante de la ciudad.', en: 'It is the best restaurant in the city.' }
    ]
  },
  {
    id: 'subjunctive', level: 'B1', title: 'Present subjunctive',
    intro: 'The subjunctive expresses wishes, doubt, emotion and unreal situations, often after "que". Start with the regular endings and the most common triggers.',
    table: [
      ['Person', 'hablar', 'comer', 'vivir'],
      ['yo', 'hable', 'coma', 'viva'],
      ['tú', 'hables', 'comas', 'vivas'],
      ['él / ella', 'hable', 'coma', 'viva'],
      ['nosotros', 'hablemos', 'comamos', 'vivamos'],
      ['ellos', 'hablen', 'coman', 'vivan']
    ],
    examples: [
      { es: 'Quiero que vengas.', en: 'I want you to come.' },
      { es: 'Es importante que estudies.', en: 'It is important that you study.' }
    ]
  },
  {
    id: 'relative', level: 'B1', title: 'Relative clauses with que',
    intro: 'que links a clause to a noun and means who, which or that. quien refers to people, and el que / el cual can be more precise.',
    table: [
      ['Relative', 'Use', 'Example'],
      ['que', 'things and people', 'el libro que leo'],
      ['quien / quienes', 'people, after a comma', 'mi amigo, quien vive aquí'],
      ['el que / la que', 'after prepositions', 'la casa en la que vivo'],
      ['cuyo', 'whose', 'el chico cuyo padre es médico']
    ],
    examples: [
      { es: 'La película que vimos era buena.', en: 'The film that we saw was good.' },
      { es: 'La persona con quien hablé es mi jefa.', en: 'The person I spoke with is my boss.' }
    ]
  },
  {
    id: 'future-conditional', level: 'B1', title: 'Future and conditional',
    intro: 'Add endings to the whole infinitive for the future (will) and the conditional (would). A few stems are irregular.',
    table: [
      ['Person', 'Future (hablar)', 'Conditional (hablar)'],
      ['yo', 'hablaré', 'hablaría'],
      ['tú', 'hablarás', 'hablarías'],
      ['él / ella', 'hablará', 'hablaría'],
      ['nosotros', 'hablaremos', 'hablaríamos'],
      ['ellos', 'hablarán', 'hablarían']
    ],
    examples: [
      { es: 'Mañana hablaré con ella.', en: 'Tomorrow I will speak with her.' },
      { es: 'Me gustaría un café.', en: 'I would like a coffee.' }
    ]
  },
  {
    id: 'pluperfect', level: 'B2', title: 'Pluperfect and past anteriority',
    intro: 'The pluperfect (había + participle) says what had already happened before another past moment.',
    table: [
      ['Person', 'hablar', 'comer'],
      ['yo', 'había hablado', 'había comido'],
      ['tú', 'habías hablado', 'habías comido'],
      ['él / ella', 'había hablado', 'había comido'],
      ['nosotros', 'habíamos hablado', 'habíamos comido'],
      ['ellos', 'habían hablado', 'habían comido']
    ],
    examples: [
      { es: 'Cuando llegué, ya habían salido.', en: 'When I arrived, they had already left.' },
      { es: 'No lo había visto antes.', en: 'I had not seen it before.' }
    ]
  },
  {
    id: 'imperfect-subjunctive', level: 'B2', title: 'Imperfect subjunctive',
    intro: 'Use the imperfect subjunctive for hypothetical or past wishes and for polite conditions. Both -ra and -se forms exist; -ra is more common.',
    table: [
      ['Person', 'hablar (-ra)', 'tener (-ra)'],
      ['yo', 'hablara', 'tuviera'],
      ['tú', 'hablaras', 'tuvieras'],
      ['él / ella', 'hablara', 'tuviera'],
      ['nosotros', 'habláramos', 'tuviéramos'],
      ['ellos', 'hablaran', 'tuvieran']
    ],
    examples: [
      { es: 'Si tuviera tiempo, leería más.', en: 'If I had time, I would read more.' },
      { es: 'Quería que vinieras.', en: 'I wanted you to come.' }
    ]
  },
  {
    id: 'passive', level: 'B2', title: 'Passive and impersonal se',
    intro: 'Spanish often avoids the true passive. Use ser + participle for formal events, and the impersonal se for general statements.',
    table: [
      ['Structure', 'Example', 'Meaning'],
      ['ser + participle', 'La casa fue construida en 1900.', 'The house was built in 1900.'],
      ['estar + participle', 'La puerta está cerrada.', 'The door is closed (state).'],
      ['impersonal se', 'Se habla español aquí.', 'Spanish is spoken here.'],
      ['se + 3rd person', 'Se venden casas.', 'Houses are sold.']
    ],
    examples: [
      { es: 'Se dice que va a llover.', en: 'It is said that it is going to rain.' },
      { es: 'El libro fue escrito por ella.', en: 'The book was written by her.' }
    ]
  }
];
