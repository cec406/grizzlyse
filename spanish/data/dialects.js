// Regional Spanish: accents, slang and culture. Focus on Puerto Rico, plus the
// other varieties a learner will meet. Slang is labelled by how safe it is to use.
export const DIALECTS = [
  {
    id: 'pr',
    name: 'Puerto Rico',
    flag: '🇵🇷',
    tagline: 'Boricua Spanish — Caribbean, warm, and full of Taíno and African roots.',
    blurb: 'Puerto Rico is a United States territory where Spanish and English are both official, but everyday life happens in Spanish. The accent is Caribbean: fast, musical, and it drops sounds. This is the variety to learn for your trip.',
    accent: [
      'The s at the end of a syllable often turns into a soft breath: ¿cómo estás? sounds like ¿cómo ehtáh?.',
      'An r before a consonant can become l: Puerto Rico is often said Puelto Rico.',
      'The d between vowels drops out: cansado becomes cansao, pescado becomes pescao.',
      'Words from Taíno (hurakán, hamaca) and from African languages (chévere) are everyday vocabulary.',
      'The trilled rr and the single r are both strong; ll and y are pronounced the same (yeísmo).'
    ],
    slang: [
      { es: '¡Wepa!', en: 'Wow! / Awesome!', note: 'A very Puerto Rican shout of excitement.' },
      { es: '¡Ay bendito!', en: 'Oh dear! / Bless it!', note: 'Sympathy or exasperation. Used constantly.' },
      { es: 'mano', en: 'bro / buddy', note: 'Short for hermano. Friendly, informal.' },
      { es: 'corillo', en: 'crew / group of friends', note: 'Your people.' },
      { es: 'janguear', en: 'to hang out', note: 'From English "hang out".' },
      { es: 'un chin', en: 'a little bit', note: 'Un chin de sal = a little bit of salt.' },
      { es: 'brutal', en: 'awesome / intense', note: '¡Qué brutal! = how awesome!' },
      { es: 'guagua', en: 'bus', note: 'Also used in Cuba and the Dominican Republic.' },
      { es: 'china', en: 'orange (the fruit)', note: 'In Puerto Rico a china is an orange.' },
      { es: 'nítido', en: 'great / cool', note: 'All-purpose approval.' },
      { es: 'dale', en: 'go ahead / come on', note: '¡Dale! pushes things along.' },
      { es: 'parquear', en: 'to park', note: 'From English "park". You will hear it everywhere.' }
    ],
    phrases: [
      { es: '¿Qué es la que hay?', en: 'What is up? (what is going on?)' },
      { es: 'Está brutal.', en: 'It is awesome.' },
      { es: 'Un chin más, por favor.', en: 'A little bit more, please.' },
      { es: 'Dale pues.', en: 'Go ahead then. / Okay then.' },
      { es: '¡No me digas!', en: 'You do not say! / No way!' }
    ],
    culture: [
      'Puerto Ricans call themselves Boricua, from the Taíno name for the island, Borikén.',
      'The coquí is a tiny tree frog whose two-note song is the island sound.',
      'Bomba and plena are the island music and dance traditions, alongside salsa and reggaetón.',
      'Food to try: mofongo, arroz con gandules, tostones, and a piña colada — ask for the sin alcohol version for younger travellers.'
    ]
  },
  {
    id: 'mx',
    name: 'México',
    flag: '🇲🇽',
    tagline: 'The most widely spoken variety — clear, melodic, and rich in indigenous words.',
    blurb: 'Mexican Spanish has the largest number of speakers in the world. It keeps the s crisp, uses tú and ustedes, and borrows heavily from Nahuatl.',
    accent: [
      's is kept crisp, so ¿cómo estás? is clear and unaspirated.',
      'c before e/i and z sound like s (seseo): cinco = SIN-co.',
      'The j and g before e/i are a strong breathy h: jugo = HOO-go.',
      'Many everyday words come from Nahuatl: chocolate, tomate, aguacate, chicle.'
    ],
    slang: [
      { es: '¿Qué onda?', en: 'What is up?', note: 'The classic casual greeting.' },
      { es: 'chido', en: 'cool', note: 'Also padre. Very common.' },
      { es: 'compa', en: 'buddy', note: 'Short for compadre — friendly and informal.' },
      { es: 'órale', en: 'okay / wow / come on', note: 'All-purpose reaction.' },
      { es: 'no manches', en: 'no way / you are kidding', note: 'Polite version.' },
      { es: 'la neta', en: 'the truth / for real', note: 'La neta, sí. = For real, yes.' },
      { es: 'lana', en: 'money', note: 'No tengo lana. = I have no money.' },
      { es: 'fresa', en: 'preppy / stuck-up', note: 'Usually about a person or a style.' },
      { es: 'sale', en: 'okay / deal', note: 'Sale, nos vemos. = Okay, see you.' },
      { es: '¡Aguas!', en: 'Watch out!', note: 'Literally waters. A warning.' }
    ],
    phrases: [
      { es: '¿Cómo estás?', en: 'How are you?' },
      { es: '¿Mande?', en: 'Pardon? / What did you say?', note: 'Polite in Mexico.' },
      { es: '¿A qué hora cierran?', en: 'What time do you close?' },
      { es: 'La cuenta, por favor.', en: 'The bill, please.' }
    ],
    culture: [
      'Día de los Muertos honours loved ones with altars and marigolds.',
      'Tacos, tamales, mole and pozole are staples across regions.',
      'Mexican Spanish uses ustedes for all plurals — there is no vosotros.'
    ]
  },
  {
    id: 'es',
    name: 'España',
    flag: '🇪🇸',
    tagline: 'Castilian Spanish — the variety that uses vosotros and the th sound.',
    blurb: 'The Spanish of Spain. It keeps vosotros for informal plural you, pronounces c and z as th, and uses many everyday words that differ from Latin America.',
    accent: [
      'c before e/i and z sound like th in thing: cinco = THIN-co, gracias = GRA-thyas.',
      's stays crisp everywhere except some Andalusian accents.',
      'The j and g before e/i are a very raspy, throaty h.',
      'Spain uses vosotros (informal plural) in addition to ustedes (formal plural).'
    ],
    slang: [
      { es: 'vale', en: 'okay', note: 'Said constantly, like Latin American ok.' },
      { es: 'tío / tía', en: 'dude / girl', note: 'Between friends.' },
      { es: 'guay', en: 'cool', note: '¡Qué guay! = how cool!' },
      { es: 'majo', en: 'nice / likeable', note: 'Es muy majo. = He is really nice.' },
      { es: 'flipar', en: 'to be amazed', note: '¡Estoy flipando! = I cannot believe it!' },
      { es: 'curro', en: 'job', note: 'Informal: trabajo.' },
      { es: 'pasta', en: 'money', note: 'No tengo pasta. = I have no money.' },
      { es: 'quedar', en: 'to meet up', note: '¿Quedamos mañana? = Shall we meet tomorrow?' },
      { es: '¡Venga!', en: 'come on / alright', note: 'Ends conversations: venga, hasta luego.' }
    ],
    phrases: [
      { es: '¿Qué tal?', en: 'How is it going?' },
      { es: 'Venga, hasta luego.', en: 'Alright, see you later.' },
      { es: 'Me pones un café.', en: 'A coffee for me, please.', note: 'Common in bars.' },
      { es: 'La cuenta, por favor.', en: 'The bill, please.' }
    ],
    culture: [
      'Tapas and sobremesa: small plates and long conversation after a meal.',
      'Flamenco comes from Andalusia in the south.',
      'Spain is the only common variety that uses vosotros in everyday speech.'
    ]
  },
  {
    id: 'car',
    name: 'El Caribe',
    flag: '🌴',
    tagline: 'Cuba and the Dominican Republic — fast, syllable-dropping, infectious.',
    blurb: 'Caribbean Spanish shares much with Puerto Rico: dropped s, swallowed d, and a rapid rhythm. Cuba and the Dominican Republic each add their own slang.',
    accent: [
      'Final and syllable-final s is often aspirated or dropped: los amigos becomes loh amigoh.',
      'Intervocalic d disappears: enamorado becomes enamorao.',
      'l and r are swapped in some words: alma can sound like arma.',
      'Speech is fast, with strong nasal vowels at word ends.'
    ],
    slang: [
      { es: '¡Qué bola!', en: 'What is up?', note: 'Cuban greeting.' },
      { es: 'asere', en: 'friend / bro', note: 'Cuban, from African roots.' },
      { es: '¿Qué lo qué?', en: 'What is up?', note: 'Dominican, said loudly.' },
      { es: 'diache', en: 'darn / wow', note: 'Dominican, softened from diablo.' },
      { es: 'tíguere', en: 'clever guy / streetwise man', note: 'Dominican.' },
      { es: 'pana', en: 'buddy', note: 'Very common in Venezuela and the Caribbean.' },
      { es: 'guagua', en: 'bus', note: 'Also Puerto Rico.' },
      { es: 'chévere', en: 'cool', note: 'Pan-Caribbean.' },
      { es: 'en nota', en: 'in a good mood', note: 'Dominican.' }
    ],
    phrases: [
      { es: '¿Cómo andas?', en: 'How are you doing?' },
      { es: 'Está chévere.', en: 'It is cool.' },
      { es: '¿Qué tú quieres?', en: 'What do you want?' },
      { es: 'Nos vemos, mano.', en: 'See you, bro.' }
    ],
    culture: [
      'Music shapes the language: son and salsa from Cuba, merengue and bachata from the Dominican Republic.',
      'Baseball is the shared passion across the Caribbean.',
      'Many Taíno words survive: huracán, canoa, maíz, iguana.'
    ]
  },
  {
    id: 'ar',
    name: 'Argentina',
    flag: '🇦🇷',
    tagline: 'Rioplatense Spanish — musical, Italian-influenced, and uses vos.',
    blurb: 'In Argentina and Uruguay, people use vos instead of tú, and the ll/y sound becomes a soft sh. The vocabulary, much of it lunfardo slang, is full of Italian flavour.',
    accent: [
      'vos replaces tú, with different verb forms: vos tenés, vos sos, vos podés.',
      'll and y are pronounced like sh: calle sounds like CA-she.',
      'The intonation rises and falls in a very musical, Italian-like way.',
      'Italian immigrants shaped the accent and the slang (lunfardo).'
    ],
    slang: [
      { es: 'che', en: 'hey', note: 'Che, ¿qué hacés? = Hey, what are you doing?' },
      { es: '¿Qué hacés?', en: 'What are you doing? / How is it going?', note: 'Uses vos.' },
      { es: 'copado', en: 'cool / great', note: 'Es copado. = He is great.' },
      { es: 'pibe', en: 'kid', note: 'Un pibe, una piba.' },
      { es: 'laburo', en: 'work / job', note: 'Voy al laburo. = I am going to work.' },
      { es: 'plata', en: 'money', note: 'Common across the region.' },
      { es: 'fiaca', en: 'laziness', note: 'Tengo fiaca. = I feel lazy.' },
      { es: 'mate', en: 'the herbal drink', note: 'And the ritual around it.' },
      { es: 'lío', en: 'a mess / trouble', note: 'Estoy en un lío. = I am in a mess.' }
    ],
    phrases: [
      { es: '¿Todo bien?', en: 'Everything good?' },
      { es: 'Copado, gracias.', en: 'Great, thanks.' },
      { es: 'Nos vemos, che.', en: 'See you, hey.' },
      { es: '¿Me pasás la cuenta?', en: 'Can you pass me the bill?', note: 'Uses vos.' }
    ],
    culture: [
      'Mate is shared daily, passed around a circle of friends.',
      'Asado, tango and fútbol are national rituals.',
      'Lunfardo, the Buenos Aires slang, grew out of Italian, African and Gaucho roots.'
    ]
  },
  {
    id: 'co',
    name: 'Colombia',
    flag: '🇨🇴',
    tagline: 'Clear, polite and musical — often called the easiest to understand.',
    blurb: 'Colombian Spanish is known for clear consonants and warm formality. Usted is used even among friends, and the slang is friendly and everywhere.',
    accent: [
      'Consonants are clear, with the s pronounced fully.',
      'Costa and interior accents differ a lot; the Bogotá accent is often rated clearest in the Spanish-speaking world.',
      'c and z are pronounced s (seseo) everywhere.',
      'Usted is common even with close friends, signalling warmth, not distance.'
    ],
    slang: [
      { es: '¿Qué más?', en: 'What is up?', note: 'The universal Colombian greeting.' },
      { es: 'parce', en: 'buddy / mate', note: 'From parcero. Very common.' },
      { es: 'bacano', en: 'cool / great', note: '¡Qué bacano! = how cool!' },
      { es: 'chévere', en: 'cool', note: 'Also used across Latin America.' },
      { es: '¿Quiubo?', en: 'What is up?', note: 'Short for ¿qué hubo?.' },
      { es: 'a la orden', en: 'you are welcome / at your service', note: 'Polite and common.' },
      { es: 'rumba', en: 'party / night out', note: 'Vamos de rumba. = Let us go out.' },
      { es: 'guayaba', en: 'guava', note: 'A sweet tropical fruit, common in Puerto Rico.' },
      { es: 'guayabo', en: 'hangover', note: 'Colloquial, informal — Tengo guayabo. = I have a hangover. Marked: adult-life vocabulary, not for classroom use.' },
      { es: 'plata', en: 'money', note: 'Shared across the region.' }
    ],
    phrases: [
      { es: '¿Qué más, parce?', en: 'What is up, buddy?' },
      { es: 'A la orden.', en: 'You are welcome.' },
      { es: 'Está muy bacano.', en: 'It is really cool.' },
      { es: 'Con mucho gusto.', en: 'With pleasure.' }
    ],
    culture: [
      'Coffee is a national identity, not just a drink.',
      'Arepas, cumbia and vallenato define different regions.',
      'Colombian Spanish is often recommended as a clear model for learners.'
    ]
  }
];

export function dialectById(id) {
  return DIALECTS.find((d) => d.id === id) || DIALECTS[0];
}
