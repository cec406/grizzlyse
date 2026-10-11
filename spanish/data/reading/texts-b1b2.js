// Graded reading texts, B1-B2. Spanish hand-checked; translit is an
// English-friendly pronunciation respelling (ASCII only).
export const READING_B = [
  {
    id: 'rd-11',
    level: 'B1',
    title: 'Work and study',
    titleEs: 'Trabajo y estudio',
    text: 'Actualmente estudio en la universidad y también trabajo. Por la mañana asisto a clases y por la tarde trabajo en un restaurante. Aunque es cansado, me gusta porque gano experiencia. Mi meta es ser ingeniera.',
    translit: 'ak-twal-MEN-te es-TOO-dyo en la oo-nee-ber-see-DAD ee tam-BYEN tra-BA-ho por la ma-NYA-na a-SEES-to a KLA-ses ee por la TAR-de tra-BA-ho en oon res-tow-RAN-te awn-keh es kan-SA-do meh GOOS-ta por-keh GA-no eks-pe-RYEN-sya mee ME-ta es ser een-he-NYEH-ra',
    glossary: [
      { es: 'universidad', en: 'university' },
      { es: 'trabajo', en: 'I work / job' },
      { es: 'clases', en: 'classes' },
      { es: 'restaurante', en: 'restaurant' },
      { es: 'experiencia', en: 'experience' },
      { es: 'meta', en: 'goal' },
      { es: 'ingeniera', en: 'engineer (female)' }
    ],
    questions: [
      { type: 'mc-en', q: 'What does the speaker do besides studying?', options: ['works', 'travels', 'rests', 'paints'], answer: 'works' },
      { type: 'mc-en', q: 'Where does the speaker work in the afternoon?', options: ['in a restaurant', 'at the university', 'in an office', 'at home'], answer: 'in a restaurant' },
      { type: 'mc-en', q: 'What is the speaker goal?', options: ['to be an engineer', 'to be a teacher', 'to travel', 'to open a café'], answer: 'to be an engineer' }
    ]
  },
  {
    id: 'rd-12',
    level: 'B1',
    title: 'A letter from San Juan',
    titleEs: 'Una carta desde San Juan',
    text: 'Querida abuela: Te escribo desde San Juan. El clima aquí es tropical y húmedo. He conocido gente muy amable. Todavía no he probado el mofongo, pero pienso hacerlo mañana. Espero que estés bien. Un abrazo, Luisa.',
    translit: 'keh-REE-da a-BWEH-la teh es-KREE-bo DES-de san HWAHN el KLEE-ma a-KEE es tro-pee-KAL ee OO-me-do eh ko-no-SEE-do HEN-te MOO-ee a-MA-ble to-da-BEE-a no eh pro-BA-do el mo-FON-go PEH-ro PYEN-so a-SER-lo ma-NYA-na es-PEH-ro keh es-TES byen oon a-BRA-so LWEES-sa',
    glossary: [
      { es: 'escribo', en: 'I write' },
      { es: 'clima', en: 'climate' },
      { es: 'húmedo', en: 'humid' },
      { es: 'conocido', en: 'met / known' },
      { es: 'amable', en: 'kind' },
      { es: 'mañana', en: 'tomorrow' },
      { es: 'abrazo', en: 'hug' }
    ],
    questions: [
      { type: 'mc-en', q: 'Who is Luisa writing to?', options: ['her grandmother', 'her friend', 'her teacher', 'her sister'], answer: 'her grandmother' },
      { type: 'mc-en', q: 'What is the climate like in San Juan?', options: ['tropical and humid', 'cold and dry', 'windy and cool', 'snowy'], answer: 'tropical and humid' },
      { type: 'mc-en', q: 'What has Luisa not tried yet?', options: ['mofongo', 'salsa', 'coffee', 'piña colada'], answer: 'mofongo' }
    ]
  },
  {
    id: 'rd-13',
    level: 'B1',
    title: 'The environment',
    titleEs: 'El medio ambiente',
    text: 'Nuestro planeta enfrenta problemas serios. La contaminación del aire y del agua afecta a todos. Para ayudar, podemos reciclar, ahorrar energía y usar menos plástico. Si cada persona hace su parte, el cambio es posible.',
    translit: 'NWES-tro pla-NEH-ta en-FREN-ta pro-BLE-mas SEH-ryos la kon-ta-mee-na-SYON del A-ee-re ee del A-gwa a-FEK-ta a TO-dos PA-ra a-yoo-DAR po-DE-mos re-see-KLAR a-ko-RAR e-NER-hee-a ee oo-SAR ME-nos PLAS-tee-ko see KA-da per-SO-na A-se soo PAR-te el KAM-byo es po-SEE-ble',
    glossary: [
      { es: 'planeta', en: 'planet' },
      { es: 'contaminación', en: 'pollution' },
      { es: 'aire', en: 'air' },
      { es: 'reciclar', en: 'to recycle' },
      { es: 'energía', en: 'energy' },
      { es: 'plástico', en: 'plastic' },
      { es: 'posible', en: 'possible' }
    ],
    questions: [
      { type: 'mc-en', q: 'What is polluted?', options: ['air and water', 'only water', 'only soil', 'the sky'], answer: 'air and water' },
      { type: 'mc-en', q: 'What should we use less of?', options: ['plastic', 'paper', 'water', 'electricity'], answer: 'plastic' },
      { type: 'mc-en', q: 'When is change possible?', options: ['when each person does their part', 'only in rich countries', 'never', 'if we stop reading'], answer: 'when each person does their part' }
    ]
  },
  {
    id: 'rd-14',
    level: 'B1',
    title: 'Traditional food',
    titleEs: 'La comida tradicional',
    text: 'La comida puertorriqueña mezcla sabores de España, África y el Caribe. El arroz con gandules es un plato típico. También se preparan tostones y pasteles. Durante las fiestas, la familia se reúne y comparte una gran comida.',
    translit: 'la ko-MEE-da pwer-to-ree-KEH-nya MES-kla sa-BO-res de es-PA-nya A-free-ka ee el ka-REE-be el a-ROZ kon gan-DOO-les es oon PLA-to TEE-pee-ko tam-BYEN se pre-PA-ran tos-TO-nes ee pas-TE-les doo-RAN-te las FYES-tas la fa-MEE-lee-ah se REH-oo-ne ee kom-PAR-te OO-na gran ko-MEE-da',
    glossary: [
      { es: 'comida', en: 'food / meal' },
      { es: 'sabores', en: 'flavors' },
      { es: 'plato', en: 'dish' },
      { es: 'típico', en: 'typical' },
      { es: 'fiestas', en: 'parties / holidays' },
      { es: 'reúne', en: 'gathers' },
      { es: 'comparte', en: 'shares' }
    ],
    questions: [
      { type: 'mc-en', q: 'Which cultures influence Puerto Rican food?', options: ['Spain, Africa and the Caribbean', 'only Spain', 'Italy and Greece', 'Asia'], answer: 'Spain, Africa and the Caribbean' },
      { type: 'mc-en', q: 'What dish is mentioned?', options: ['rice with pigeon peas', 'paella', 'tacos', 'sushi'], answer: 'rice with pigeon peas' },
      { type: 'mc-en', q: 'What happens during the holidays?', options: ['the family gathers and shares a meal', 'everyone eats alone', 'nobody cooks', 'they order pizza'], answer: 'the family gathers and shares a meal' }
    ]
  },
  {
    id: 'rd-15',
    level: 'B1',
    title: 'Technology and us',
    titleEs: 'La tecnología y nosotros',
    text: 'La tecnología ha cambiado nuestra vida. Usamos el teléfono para hablar, estudiar y trabajar. Sin embargo, pasar demasiado tiempo en las redes puede aislarnos. Lo importante es encontrar un equilibrio saludable.',
    translit: 'la tek-no-lo-HEE-a a kam-BYAH-do NWES-tra BEE-da oo-SA-mos el te-LEH-fo-no PA-ra a-BLAR es-TOO-dyar ee tra-BA-har seen em-BAR-go pa-SAR de-ma-SYA-do TYEM-po en las RE-des PWE-de a-see-LAR-nos lo im-por-TAN-te es en-kon-TRAR oon e-kee-LEE-bryo sa-loo-DA-ble',
    glossary: [
      { es: 'tecnología', en: 'technology' },
      { es: 'teléfono', en: 'phone' },
      { es: 'trabajar', en: 'to work' },
      { es: 'redes', en: 'networks (social media)' },
      { es: 'equilibrio', en: 'balance' },
      { es: 'saludable', en: 'healthy' },
      { es: 'importante', en: 'important' }
    ],
    questions: [
      { type: 'mc-en', q: 'What do people use the phone for?', options: ['talking, studying and working', 'only games', 'only talking', 'nothing useful'], answer: 'talking, studying and working' },
      { type: 'mc-en', q: 'What can too much social media do?', options: ['isolate us', 'help us sleep', 'make us rich', 'improve our health'], answer: 'isolate us' },
      { type: 'mc-en', q: 'What is important, according to the text?', options: ['finding a healthy balance', 'using the phone all day', 'never using technology', 'deleting every app'], answer: 'finding a healthy balance' }
    ]
  },
  {
    id: 'rd-16',
    level: 'B2',
    title: 'Society and change',
    titleEs: 'La sociedad y el cambio',
    text: 'Las sociedades cambian constantemente. La migración, la educación y la tecnología transforman la manera en que vivimos. Algunos ven estos cambios como oportunidades; otros sienten incertidumbre. El diálogo respetuoso es clave para avanzar juntos.',
    translit: 'las so-sye-DA-des KAM-byan kons-tan-te-MEN-te la mee-gra-SYON la e-doo-ka-SYON ee la tek-no-lo-HEE-a trans-FOR-man la ma-NE-ra en keh bee-BEE-mos AL-go-nos ben ES-tos KAM-byos KO-mo o-por-too-nee-DA-des O-tros SYEN-ten in-ser-tee-DOOM-bre el DYA-lo-go res-pe-TWO-so es KLA-be PA-ra a-ban-SAR HOON-tos',
    glossary: [
      { es: 'sociedades', en: 'societies' },
      { es: 'migración', en: 'migration' },
      { es: 'transforman', en: 'they transform' },
      { es: 'manera', en: 'way / manner' },
      { es: 'incertidumbre', en: 'uncertainty' },
      { es: 'diálogo', en: 'dialogue' },
      { es: 'avanzar', en: 'to move forward' }
    ],
    questions: [
      { type: 'mc-en', q: 'What changes societies?', options: ['migration, education and technology', 'only the weather', 'nothing', 'only money'], answer: 'migration, education and technology' },
      { type: 'mc-en', q: 'How do some people see the changes?', options: ['as opportunities', 'as nothing', 'as a joke', 'as a secret'], answer: 'as opportunities' },
      { type: 'mc-en', q: 'What is key to moving forward together?', options: ['respectful dialogue', 'silence', 'fear', 'competition'], answer: 'respectful dialogue' }
    ]
  },
  {
    id: 'rd-17',
    level: 'B2',
    title: 'Puerto Rican identity',
    titleEs: 'La identidad puertorriqueña',
    text: 'La identidad puertorriqueña es compleja y rica. La herencia taína, africana y española se mezcla en la música, la comida y el idioma. Aunque la isla es territorio de Estados Unidos, muchos defienden con orgullo su cultura y su lengua.',
    translit: 'la ee-den-tee-DAD pwer-to-ree-KEH-nya es kom-PLE-ha ee REE-ka la e-REN-sya ta-EE-na a-free-KA-na ee es-PA-nyo-la se MES-kla en la MOO-see-ka la ko-MEE-da ee el ee-DYO-ma awn-keh la EES-la es te-ree-TO-ryo de es-TA-dos oo-NEE-dos MOO-chos de-FYEN-den kon or-GOO-yo soo kool-TOO-ra ee soo LEN-gwa',
    glossary: [
      { es: 'identidad', en: 'identity' },
      { es: 'herencia', en: 'heritage' },
      { es: 'orgullo', en: 'pride' },
      { es: 'cultura', en: 'culture' },
      { es: 'lengua', en: 'language' },
      { es: 'isla', en: 'island' },
      { es: 'defienden', en: 'they defend' }
    ],
    questions: [
      { type: 'mc-en', q: 'Which heritages blend in Puerto Rico?', options: ['Taíno, African and Spanish', 'only Spanish', 'French and German', 'Asian'], answer: 'Taíno, African and Spanish' },
      { type: 'mc-en', q: 'Where does this heritage show?', options: ['music, food and language', 'only music', 'only food', 'nowhere'], answer: 'music, food and language' },
      { type: 'mc-en', q: 'Puerto Rico is a territory of which country?', options: ['the United States', 'Spain', 'Mexico', 'Dominican Republic'], answer: 'the United States' }
    ]
  },
  {
    id: 'rd-18',
    level: 'B2',
    title: 'History and memory',
    titleEs: 'La historia y la memoria',
    text: 'Recordar la historia no es solo mirar el pasado. Es entender cómo las decisiones antiguas moldean el presente. Los pueblos que reconocen sus errores y sus logros construyen un futuro más justo y consciente.',
    translit: 're-kor-DAR la ees-TO-rya no es SO-lo mee-RAR el pa-SA-do es en-ten-DER KO-mo las de-see-SYO-nes an-TEE-gwas MOL-de-an el pre-SEN-te los PWE-blos keh re-ko-NO-sen soos e-RRO-res ee soos LO-gros kons-TROO-yen oon foo-TOO-ro mas HOOS-to ee kon-SYEN-te',
    glossary: [
      { es: 'historia', en: 'history' },
      { es: 'pasado', en: 'past' },
      { es: 'decisiones', en: 'decisions' },
      { es: 'presente', en: 'present' },
      { es: 'errores', en: 'mistakes' },
      { es: 'futuro', en: 'future' },
      { es: 'justo', en: 'fair / just' }
    ],
    questions: [
      { type: 'mc-en', q: 'Remembering history is more than...', options: ['looking at the past', 'reading books', 'traveling', 'watching TV'], answer: 'looking at the past' },
      { type: 'mc-en', q: 'What do old decisions do?', options: ['shape the present', 'change nothing', 'vanish', 'repeat themselves exactly'], answer: 'shape the present' },
      { type: 'mc-en', q: 'What builds a fairer future?', options: ['recognizing mistakes and achievements', 'forgetting everything', 'repeating errors', 'staying silent'], answer: 'recognizing mistakes and achievements' }
    ]
  },
  {
    id: 'rd-19',
    level: 'B2',
    title: 'Science and ethics',
    titleEs: 'La ciencia y la ética',
    text: 'Los avances científicos plantean preguntas difíciles. ¿Hasta dónde debemos llegar con la genética? La ciencia puede mejorar la vida, pero también puede causar daño si se usa sin ética. Por eso hace falta un debate responsable.',
    translit: 'los a-BAN-ses syen-TEE-fee-kos plan-TE-an pre-GOON-tas dee-FEE-see-les AS-ta DON-de de-BE-mos ye-GAR kon la he-NEH-tee-ka la SYEN-sya PWE-de me-ho-RAR la BEE-da PEH-ro tam-BYEN PWE-de kow-SAR DA-nyo see se OO-sa seen EH-tee-ka por EH-so A-se FAL-ta oon de-BA-te res-pon-SA-ble',
    glossary: [
      { es: 'científicos', en: 'scientific' },
      { es: 'genética', en: 'genetics' },
      { es: 'mejorar', en: 'to improve' },
      { es: 'daño', en: 'harm / damage' },
      { es: 'ética', en: 'ethics' },
      { es: 'debate', en: 'debate' },
      { es: 'responsable', en: 'responsible' }
    ],
    questions: [
      { type: 'mc-en', q: 'What do scientific advances raise?', options: ['difficult questions', 'no questions', 'easy answers', 'money'], answer: 'difficult questions' },
      { type: 'mc-en', q: 'When can science cause harm?', options: ['when used without ethics', 'always', 'never', 'only in laboratories'], answer: 'when used without ethics' },
      { type: 'mc-en', q: 'What does the text say is needed?', options: ['a responsible debate', 'less science', 'more money', 'silence'], answer: 'a responsible debate' }
    ]
  },
  {
    id: 'rd-20',
    level: 'B2',
    title: 'Language and identity',
    titleEs: 'La lengua y la identidad',
    text: 'El idioma es mucho más que palabras. Es la forma en que construimos nuestra identidad y transmitimos nuestra cultura. Cuando aprendemos otra lengua, no solo memorizamos vocabulario: también entendemos otra manera de ver el mundo.',
    translit: 'el ee-DYO-ma es MOO-cho mas keh pa-LA-bras es la FOR-ma en keh kons-TROO-ee-mos NWES-tra ee-den-tee-DAD ee trans-mee-TEE-mos NWES-tra kool-TOO-ra KWAN-do a-pren-DE-mos O-tra LEN-gwa no SO-lo me-mo-ree-SA-mos bo-ka-boo-LA-ryo tam-BYEN en-ten-DE-mos O-tra ma-NE-ra de ber el MOON-do',
    glossary: [
      { es: 'idioma', en: 'language' },
      { es: 'palabras', en: 'words' },
      { es: 'identidad', en: 'identity' },
      { es: 'cultura', en: 'culture' },
      { es: 'vocabulario', en: 'vocabulary' },
      { es: 'mundo', en: 'world' },
      { es: 'lengua', en: 'language / tongue' }
    ],
    questions: [
      { type: 'mc-en', q: 'Language is more than...', options: ['words', 'music', 'food', 'flags'], answer: 'words' },
      { type: 'mc-en', q: 'What do we build with language?', options: ['our identity', 'houses', 'cars', 'money'], answer: 'our identity' },
      { type: 'mc-en', q: 'When we learn another language, we also...', options: ['understand another way of seeing the world', 'forget our own', 'lose time', 'get bored'], answer: 'understand another way of seeing the world' }
    ]
  }
];
