// Graded reading texts, B1–B2. Russian hand-checked; translit is Latin-only.
export const READING_B = [
  {
    id: 'rd-06',
    level: 'B1',
    title: 'A trip',
    titleRu: 'Путеше́ствие',
    text: 'Про́шлым ле́том мы с дру́гом пое́хали в Каза́нь. Мы до́лго е́хали на по́езде. В Каза́ни мы посе́тили стари́нную кре́пость и попро́бовали тата́рскую еду́. Пого́да была́ тёплая. Э́то бы́ло незабыва́емое путеше́ствие.',
    translit: 'Proshlym letom my s drugom poyekhali v Kazan. My dolgo yekhali na poyezde. V Kazani my posetili starinnuyu krepost i poprobovali tatarskuyu yedu. Pogoda byla tyoplaya. Eto bylo nezabyvayemoye puteshestviye.',
    glossary: [
      { ru: 'путеше́ствие', en: 'journey' },
      { ru: 'про́шлым ле́том', en: 'last summer' },
      { ru: 'дру́г', en: 'friend' },
      { ru: 'по́езд', en: 'train' },
      { ru: 'кре́пость', en: 'fortress' },
      { ru: 'попро́бовали', en: 'we tried' },
      { ru: 'незабыва́емый', en: 'unforgettable' }
    ],
    questions: [
      { type: 'mc-en', q: 'Where did they travel to?', options: ['Kazan', 'Moscow', 'Sochi', 'Petersburg'], answer: 'Kazan' },
      { type: 'mc-en', q: 'How did they travel?', options: ['by train', 'by plane', 'by car', 'by bus'], answer: 'by train' },
      { type: 'mc-en', q: 'What did they try?', options: ['Tatar food', 'coffee', 'soup', 'fish'], answer: 'Tatar food' }
    ]
  },
  {
    id: 'rd-07',
    level: 'B1',
    title: 'Work and study',
    titleRu: 'Рабо́та и учёба',
    text: 'Сейча́с я учу́сь в университе́те и рабо́таю. У́тром я хожу́ на ле́кции, а ве́чером рабо́таю в кафе́. Э́то тру́дно, но интере́сно. Я хочу́ стать инжене́ром.',
    translit: 'Seychas ya uchus v universitete i rabotayu. Utrom ya khozhu na lektsii, a vecherom rabotayu v kafe. Eto trudno, no interesno. Ya khochu stat inzhenerom.',
    glossary: [
      { ru: 'учу́сь', en: 'I study' },
      { ru: 'университе́т', en: 'university' },
      { ru: 'рабо́таю', en: 'I work' },
      { ru: 'ле́кция', en: 'lecture' },
      { ru: 'тру́дно', en: 'difficult' },
      { ru: 'интере́сно', en: 'interesting' },
      { ru: 'инжене́р', en: 'engineer' }
    ],
    questions: [
      { type: 'mc-en', q: 'Where does the speaker study?', options: ['at university', 'at school', 'at home', 'at college'], answer: 'at university' },
      { type: 'mc-en', q: 'Where does the speaker work in the evening?', options: ['in a café', 'in an office', 'at university', 'at home'], answer: 'in a café' },
      { type: 'mc-en', q: 'What does the speaker want to become?', options: ['an engineer', 'a teacher', 'a doctor', 'a cook'], answer: 'an engineer' }
    ]
  },
  {
    id: 'rd-08',
    level: 'B2',
    title: 'Weather and mood',
    titleRu: 'Пого́да и настрое́ние',
    text: 'Ру́сские лю́ди ча́сто говоря́т о пого́де, потому́ что она́ меня́ется бы́стро. Зимо́й дни коро́ткие, а но́чи дли́нные. Мно́гие лю́бят жа́ркое ле́то и отдыха́ют у реки́. Но не́которые предпочита́ют све́жую о́сень.',
    translit: 'Russkiye lyudi chasto govoryat o pogode, potomu chto ona menyayetsya bystro. Zimoy dni korotkiye, a nochi dlinnyye. Mnogiye lyubyat zharkoye leto i otdykhayut u reki. No nekotoryye predpochitayut svezhuyu osen.',
    glossary: [
      { ru: 'пого́да', en: 'weather' },
      { ru: 'настрое́ние', en: 'mood' },
      { ru: 'меня́ется', en: 'changes' },
      { ru: 'коро́ткий', en: 'short' },
      { ru: 'дли́нный', en: 'long' },
      { ru: 'отдыха́ют', en: 'they rest' },
      { ru: 'предпочита́ют', en: 'they prefer' }
    ],
    questions: [
      { type: 'mc-en', q: 'Why do Russians often talk about the weather?', options: ['because it changes quickly', 'because it never changes', 'because it is always cold', 'because they dislike it'], answer: 'because it changes quickly' },
      { type: 'mc-en', q: 'What are winter days like?', options: ['short', 'long', 'warm', 'windy'], answer: 'short' },
      { type: 'mc-en', q: 'What do some people prefer?', options: ['a fresh autumn', 'a hot summer', 'a cold winter', 'a rainy spring'], answer: 'a fresh autumn' }
    ]
  }
];