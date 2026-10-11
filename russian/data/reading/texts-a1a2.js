// Graded reading texts, A1–A2. Russian hand-checked; translit is Latin-only.
export const READING_A = [
  {
    id: 'rd-01',
    level: 'A1',
    title: 'My family',
    titleRu: 'Моя́ семья́',
    text: 'Э́то моя́ семья́. Э́то ма́ма. Её зову́т И́ра. Э́то па́па. Его́ зову́т Макси́м. У меня́ есть брат. Его́ зову́т Ди́ма. Мы живём в Москве́. Я люблю́ свою́ семью́.',
    translit: 'Eto moya semya. Eto mama. Yeyo zovut Ira. Eto papa. Yego zovut Maksim. U menya yest brat. Yego zovut Dima. My zhivyom v Moskve. Ya lyublyu svoyu semyu.',
    glossary: [
      { ru: 'семья́', en: 'family' },
      { ru: 'ма́ма', en: 'mom' },
      { ru: 'па́па', en: 'dad' },
      { ru: 'брат', en: 'brother' },
      { ru: 'живём', en: 'we live' },
      { ru: 'люблю́', en: 'I love' },
      { ru: 'Москва́', en: 'Moscow' }
    ],
    questions: [
      { type: 'mc-en', q: 'Who is Ira?', options: ['the mother', 'the father', 'the brother', 'the sister'], answer: 'the mother' },
      { type: 'mc-en', q: 'What is the brother called?', options: ['Dima', 'Maksim', 'Ira', 'Ivan'], answer: 'Dima' },
      { type: 'mc-en', q: 'Where does the family live?', options: ['Moscow', 'Kazan', 'Petersburg', 'Minsk'], answer: 'Moscow' }
    ]
  },
  {
    id: 'rd-02',
    level: 'A1',
    title: 'At the shop',
    titleRu: 'В магази́не',
    text: 'Я иду́ в магази́н. Там есть хлеб, молоко́ и сыр. Хлеб сто́ит пятьдеся́т рубле́й. Я покупа́ю хлеб и молоко́. Продаве́ц говори́т: Спаси́бо! Пото́м я иду́ домо́й.',
    translit: 'Ya idu v magazin. Tam yest khleb, moloko i syr. Khleb stoit pyatdesyat rubley. Ya pokupayu khleb i moloko. Prodavets govorit: Spasibo! Potom ya idu domoy.',
    glossary: [
      { ru: 'магази́н', en: 'shop' },
      { ru: 'хлеб', en: 'bread' },
      { ru: 'молоко́', en: 'milk' },
      { ru: 'сыр', en: 'cheese' },
      { ru: 'покупа́ю', en: 'I buy' },
      { ru: 'продаве́ц', en: 'shop assistant' },
      { ru: 'домо́й', en: 'home' }
    ],
    questions: [
      { type: 'mc-en', q: 'What does the speaker buy?', options: ['bread and milk', 'cheese and bread', 'milk and cheese', 'only bread'], answer: 'bread and milk' },
      { type: 'mc-en', q: 'How much does the bread cost?', options: ['50 rubles', '15 rubles', '5 rubles', '500 rubles'], answer: '50 rubles' },
      { type: 'mc-en', q: 'Who says “Spasibo”?', options: ['the shop assistant', 'the mother', 'a friend', 'nobody'], answer: 'the shop assistant' }
    ]
  },
  {
    id: 'rd-03',
    level: 'A1',
    title: 'My day',
    titleRu: 'Мой день',
    text: 'Ка́ждый день я встаю́ в семь часо́в. Я за́втракаю и пью ко́фе. Пото́м я иду́ на рабо́ту. Ве́чером я чита́ю кни́гу. Ночью я сплю.',
    translit: 'Kazhdy den ya vstayu v sem chasov. Ya zavtrakuyu i pyu kofe. Potom ya idu na rabotu. Vecherom ya chitayu knigu. Nochyu ya splyu.',
    glossary: [
      { ru: 'встаю́', en: 'I get up' },
      { ru: 'за́втракаю', en: 'I have breakfast' },
      { ru: 'пью', en: 'I drink' },
      { ru: 'рабо́та', en: 'work' },
      { ru: 'чита́ю', en: 'I read' },
      { ru: 'ночью', en: 'at night' },
      { ru: 'сплю', en: 'I sleep' }
    ],
    questions: [
      { type: 'mc-en', q: 'When does the speaker get up?', options: ['at seven', 'at eight', 'at six', 'at ten'], answer: 'at seven' },
      { type: 'mc-en', q: 'What does the speaker drink?', options: ['coffee', 'tea', 'milk', 'water'], answer: 'coffee' },
      { type: 'mc-en', q: 'What happens in the evening?', options: ['reading a book', 'working out', 'watching TV', 'sleeping'], answer: 'reading a book' }
    ]
  },
  {
    id: 'rd-04',
    level: 'A2',
    title: 'The seasons',
    titleRu: 'Времена́ го́да',
    text: 'В Росси́и четы́ре вре́мени го́да. Зимо́й о́чень хо́лодно и идёт снег. Весно́й тепло́, пою́т пти́цы. Ле́том жа́рко, и лю́ди е́здят на мо́ре. О́сенью ча́сто идёт дождь.',
    translit: 'V Rossii chetyre vremeni goda. Zimoy ochen kholodno i idyot sneg. Vesnoy teplo, poyut ptitsy. Letom zharko, i lyudi yezdyat na more. Osenyu chasto idyot dozhd.',
    glossary: [
      { ru: 'времена́ го́да', en: 'seasons' },
      { ru: 'зимо́й', en: 'in winter' },
      { ru: 'снег', en: 'snow' },
      { ru: 'весно́й', en: 'in spring' },
      { ru: 'ле́том', en: 'in summer' },
      { ru: 'о́сенью', en: 'in autumn' },
      { ru: 'дождь', en: 'rain' }
    ],
    questions: [
      { type: 'mc-en', q: 'How many seasons does Russia have?', options: ['four', 'three', 'five', 'two'], answer: 'four' },
      { type: 'mc-en', q: 'What happens in winter?', options: ['it snows', 'birds sing', 'it is hot', 'it rains'], answer: 'it snows' },
      { type: 'mc-en', q: 'When do people go to the sea?', options: ['in summer', 'in winter', 'in autumn', 'in spring'], answer: 'in summer' }
    ]
  },
  {
    id: 'rd-05',
    level: 'A2',
    title: 'My city',
    titleRu: 'Мой го́род',
    text: 'Я живу́ в Петербу́рге. Э́то большо́й и краси́вый го́род. Здесь есть река́ Нева́ и мно́го музе́ев. Я люблю́ гуля́ть по набережной. Мне нра́вится мой го́род.',
    translit: 'Ya zhivu v Peterburge. Eto bolshoy i krasivy gorod. Zdes yest reka Neva i mnogo muzeyev. Ya lyublyu gulyat po naberezhnoy. Mne nravitsya moy gorod.',
    glossary: [
      { ru: 'живу́', en: 'I live' },
      { ru: 'большо́й', en: 'big' },
      { ru: 'краси́вый', en: 'beautiful' },
      { ru: 'река́', en: 'river' },
      { ru: 'музе́й', en: 'museum' },
      { ru: 'гуля́ть', en: 'to walk' },
      { ru: 'на́бережная', en: 'embankment' }
    ],
    questions: [
      { type: 'mc-en', q: 'Which city does the speaker live in?', options: ['Petersburg', 'Moscow', 'Kazan', 'Kiev'], answer: 'Petersburg' },
      { type: 'mc-en', q: 'What is the name of the river?', options: ['Neva', 'Volga', 'Don', 'Oka'], answer: 'Neva' },
      { type: 'mc-en', q: 'What does the speaker like to do?', options: ['walk along the embankment', 'go shopping', 'fish', 'sleep'], answer: 'walk along the embankment' }
    ]
  }
];