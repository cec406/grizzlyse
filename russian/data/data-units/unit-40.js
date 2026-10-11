// Unit 40 — Formal and business Russian. B2.
export const unit = {
  id: 'u40',
  level: 'B2',
  number: 40,
  title: 'Formal and business',
  titleRu: 'Официа́льный стиль',
  story: 'Meetings, contracts, reports and polite letters. Business Russian has its own rhythm: more nouns, fewer verbs, and a set of fixed formulas. This unit gives you the core vocabulary and the formal register.',
  grammar: [
    {
      topic: 'Business documents',
      explanation: 'Documents and forms have standard names. Note that many business nouns are long and compound, with the stress often falling in a predictable place.',
      table: [
        ['Russian', 'English'],
        ['докуме́нт', 'document'],
        ['заявле́ние', 'application / statement'],
        ['отчёт', 'report'],
        ['докла́д', 'presentation / report'],
        ['догово́р', 'contract'],
        ['дове́ренность', 'power of attorney']
      ],
      examples: [
        { ru: 'Мне нужен докуме́нт для рабо́ты.', trans: 'mne nuzhen dokument dlya raboty', en: 'I need a document for work.' }
      ]
    },
    {
      topic: 'Organisations and money',
      explanation: 'Companies and institutions: предприя́тие, учрежде́ние, организа́ция. Money talk: дохо́д, при́быль, бюдже́т, фина́нсы, услу́ги.',
      table: [
        ['Russian', 'English'],
        ['предприя́тие', 'enterprise / plant'],
        ['учрежде́ние', 'institution'],
        ['фина́нсы', 'finances'],
        ['бюдже́т', 'budget'],
        ['при́быль', 'profit'],
        ['услу́ги', 'services']
      ],
      examples: [
        { ru: 'Компа́ния получа́ет при́быль.', trans: 'kompaniya poluchayet pribyl', en: 'The company makes a profit.' }
      ]
    },
    {
      topic: 'Negotiation language',
      explanation: 'For talks and deals: перегово́ры, соглаше́ние, предложе́ние, сотру́дничество. The formal register prefers nouns and fixed phrases over short verbs.',
      table: [
        ['Russian', 'English'],
        ['перегово́ры', 'negotiations'],
        ['соглаше́ние', 'agreement'],
        ['предложе́ние', 'proposal / offer'],
        ['сотру́дничество', 'cooperation'],
        ['обяза́тельство', 'obligation'],
        ['снабже́ние', 'supply']
      ],
      examples: [
        { ru: 'Мы подпи́шем соглаше́ние за́втра.', trans: 'my podpishem soglasheniye zavtra', en: 'We will sign the agreement tomorrow.' }
      ]
    }
  ],
  vocabulary: [
    { id: 'u40-dokument', ru: 'докуме́нт', translit: 'dokument', en: 'document', pos: 'noun', gender: 'm' },
    { id: 'u40-zayavlenie', ru: 'заявле́ние', translit: 'zayavleniye', en: 'application / statement', pos: 'noun', gender: 'n' },
    { id: 'u40-otchet', ru: 'отчёт', translit: 'otchot', en: 'report', pos: 'noun', gender: 'm' },
    { id: 'u40-doklad', ru: 'докла́д', translit: 'doklad', en: 'presentation / report', pos: 'noun', gender: 'm' },
    { id: 'u40-predpriyatie', ru: 'предприя́тие', translit: 'predpriyatiye', en: 'enterprise', pos: 'noun', gender: 'n' },
    { id: 'u40-uchrezhdenie', ru: 'учрежде́ние', translit: 'uchrezhdeniye', en: 'institution', pos: 'noun', gender: 'n' },
    { id: 'u40-peregovory', ru: 'перегово́ры', translit: 'peregovory', en: 'negotiations', pos: 'noun', gender: 'p' },
    { id: 'u40-soglashenie', ru: 'соглаше́ние', translit: 'soglasheniye', en: 'agreement', pos: 'noun', gender: 'n' },
    { id: 'u40-usloviya', ru: 'усло́вия', translit: 'usloviya', en: 'conditions / terms', pos: 'noun', gender: 'p' },
    { id: 'u40-obyazatelstvo', ru: 'обяза́тельство', translit: 'obyazatelstvo', en: 'obligation', pos: 'noun', gender: 'n' },
    { id: 'u40-predlozhenie', ru: 'предложе́ние', translit: 'predlozheniye', en: 'proposal / offer', pos: 'noun', gender: 'n' },
    { id: 'u40-spros', ru: 'спрос', translit: 'spros', en: 'demand', pos: 'noun', gender: 'm' },
    { id: 'u40-snabzhenie', ru: 'снабже́ние', translit: 'snabzheniye', en: 'supply', pos: 'noun', gender: 'n' },
    { id: 'u40-finansy', ru: 'фина́нсы', translit: 'finansy', en: 'finances', pos: 'noun', gender: 'p' },
    { id: 'u40-byudzhet', ru: 'бюдже́т', translit: 'byudzhet', en: 'budget', pos: 'noun', gender: 'm' },
    { id: 'u40-pribyl', ru: 'при́быль', translit: 'pribyl', en: 'profit', pos: 'noun', gender: 'f' },
    { id: 'u40-uslugi', ru: 'услу́ги', translit: 'uslugi', en: 'services', pos: 'noun', gender: 'p' },
    { id: 'u40-sotrudnichestvo', ru: 'сотру́дничество', translit: 'sotrudnichestvo', en: 'cooperation', pos: 'noun', gender: 'n' }
  ],
  phrases: [
    { id: 'p-u40-1', ru: 'Мы подпи́шем соглаше́ние.', trans: 'my podpishem soglasheniye', en: 'We will sign the agreement.' },
    { id: 'p-u40-2', ru: 'Извини́те за беспоко́йство.', trans: 'izvinite za bespokoystvo', en: 'Sorry to bother you.' }
  ],
  sentences: [
    { ru: 'Мы подпи́шем соглаше́ние за́втра.', translit: 'my podpishem soglasheniye zavtra', en: 'We will sign the agreement tomorrow.', words: [{ id: 'u40-soglashenie', ru: 'соглаше́ние', en: 'agreement' }] },
    { ru: 'Компа́ния получа́ет при́быль.', translit: 'kompaniya poluchayet pribyl', en: 'The company makes a profit.', words: [{ id: 'u40-pribyl', ru: 'при́быль', en: 'profit' }] },
    { ru: 'Перегово́ры шли весь день.', translit: 'peregovory shli ves den', en: 'The negotiations lasted all day.', words: [{ id: 'u40-peregovory', ru: 'Перегово́ры', en: 'negotiations' }] },
    { ru: 'Мне ну́жен докуме́нт.', translit: 'mne nuzhen dokument', en: 'I need a document.', words: [{ id: 'u40-dokument', ru: 'докуме́нт', en: 'document' }] },
    { ru: 'Мы предлага́ем сотру́дничество.', translit: 'my predlagayem sotrudnichestvo', en: 'We offer cooperation.', words: [{ id: 'u40-sotrudnichestvo', ru: 'сотру́дничество', en: 'cooperation' }] }
  ],
  dialogue: {
    title: 'На совеща́нии (At the meeting)',
    lines: [
      { who: 'Анна', ru: 'Ва́ше предложе́ние о́чень интере́сно.', en: 'Your proposal is very interesting.' },
      { who: 'Том', ru: 'Спаси́бо. Мы гото́вы к перегово́рам.', en: 'Thank you. We are ready for negotiations.' },
      { who: 'Анна', ru: 'Каки́е усло́вия вы предлага́ете?', en: 'What terms do you offer?' },
      { who: 'Том', ru: 'Мы мо́жем подписа́ть соглаше́ние на год.', en: 'We can sign an agreement for a year.' },
      { who: 'Анна', ru: 'Хорошо́. Пришли́те докуме́нты за́втра.', en: 'Good. Send the documents tomorrow.' },
      { who: 'Том', ru: 'Обяза́тельно. На́ше сотру́дничество бу́дет успе́шным.', en: 'Certainly. Our cooperation will be successful.' }
    ],
    questions: [
      { type: 'mc-ru', q: 'К чему́ гото́в Том?', options: ['к перегово́рам', 'к рабо́те', 'к отчёту', 'к докла́ду'], answer: 'к перегово́рам' },
      { type: 'mc-ru', q: 'На ско́лько лет соглаше́ние?', options: ['на год', 'на два года', 'на ме́сяц', 'навсегда́'], answer: 'на год' },
      { type: 'mc-ru', q: 'Что ну́жно присла́ть за́втра?', options: ['докуме́нты', 'де́ньги', 'това́ры', 'письма́'], answer: 'докуме́нты' }
    ]
  },
  quiz: [
    { type: 'mc-en', q: 'Что зна́чит «докуме́нт»?', options: ['document', 'report', 'contract', 'proposal'], answer: 'document', ru: 'докуме́нт' },
    { type: 'mc-en', q: 'Что зна́чит «соглаше́ние»?', options: ['agreement', 'negotiation', 'proposal', 'obligation'], answer: 'agreement', ru: 'соглаше́ние' },
    { type: 'mc-ru', q: '“negotiations” in Russian', options: ['перегово́ры', 'услу́ги', 'фина́нсы', 'усло́вия'], answer: 'перегово́ры', ru: 'перегово́ры' },
    { type: 'mc-ru', q: '“profit” in Russian', options: ['при́быль', 'бюдже́т', 'снабже́ние', 'спрос'], answer: 'при́быль', ru: 'при́быль' },
    { type: 'typing', q: 'Type “document” in Russian', answer: 'документ', accepts: ['докуме́нт'], ru: 'докуме́нт' },
    { type: 'typing', q: 'Type “cooperation” in Russian', answer: 'сотрудничество', accepts: ['сотру́дничество'], ru: 'сотру́дничество' },
    { type: 'mc-en', q: 'Что зна́чит «услу́ги»?', options: ['services', 'conditions', 'finances', 'contracts'], answer: 'services', ru: 'услу́ги' },
    { type: 'mc-ru', q: '“budget” in Russian', options: ['бюдже́т', 'при́быль', 'спрос', 'дохо́д'], answer: 'бюдже́т', ru: 'бюдже́т' },
    { type: 'mc-en', q: 'Что зна́чит «отчёт»?', options: ['report', 'proposal', 'contract', 'document'], answer: 'report', ru: 'отчёт' },
    { type: 'mc-ru', q: 'Complete: Мы подпи́шем ___ за́втра.', options: ['соглаше́ние', 'перегово́ры', 'услу́ги', 'докуме́нты'], answer: 'соглаше́ние', ru: 'соглаше́ние' },
    { type: 'typing', q: 'Type “application” in Russian', answer: 'заявление', accepts: ['заявле́ние'], ru: 'заявле́ние' },
    { type: 'mc-en', q: 'Что зна́чит «обяза́тельство»?', options: ['obligation', 'proposal', 'condition', 'report'], answer: 'obligation', ru: 'обяза́тельство' }
  ],
  test: {
    title: 'Unit 40 test — Formal and business',
    questions: [
      { type: 'mc-ru', q: '“proposal / offer” in Russian', options: ['предложе́ние', 'соглаше́ние', 'заявле́ние', 'отчёт'], answer: 'предложе́ние', ru: 'предложе́ние' },
      { type: 'mc-en', q: 'Что зна́чит «фина́нсы»?', options: ['finances', 'budget', 'profit', 'possibilities'], answer: 'finances', ru: 'фина́нсы' },
      { type: 'typing', q: 'Type “contract” in Russian', answer: 'договор', accepts: ['догово́р'], ru: 'догово́р' },
      { type: 'typing', q: 'Type “presentation / report” in Russian', answer: 'доклад', accepts: ['докла́д'], ru: 'докла́д' },
      { type: 'mc-ru', q: '“institution” in Russian', options: ['учрежде́ние', 'предприя́тие', 'соглаше́ние', 'снабже́ние'], answer: 'учрежде́ние', ru: 'учрежде́ние' },
      { type: 'mc-en', q: 'Что зна́чит «спрос»?', options: ['demand', 'supply', 'profit', 'service'], answer: 'demand', ru: 'спрос' },
      { type: 'mc-ru', q: 'Complete: Перегово́ры ___ весь день.', options: ['шли', 'шла', 'шло', 'идёт'], answer: 'шли', ru: 'шли' },
      { type: 'typing', q: 'Type “conditions / terms” in Russian', answer: 'условия', accepts: ['усло́вия'], ru: 'усло́вия' },
      { type: 'mc-en', q: 'Что зна́чит «снабже́ние»?', options: ['supply', 'demand', 'services', 'cooperation'], answer: 'supply', ru: 'снабже́ние' },
      { type: 'mc-ru', q: '“enterprise” in Russian', options: ['предприя́тие', 'учрежде́ние', 'сотру́дничество', 'перегово́ры'], answer: 'предприя́тие', ru: 'предприя́тие' },
      { type: 'typing', q: 'Type “agreement” in Russian', answer: 'соглашение', accepts: ['соглаше́ние'], ru: 'соглаше́ние' },
      { type: 'mc-en', q: 'Что зна́чит «успе́шный»?', options: ['successful', 'important', 'difficult', 'responsible'], answer: 'successful', ru: 'успе́шный' }
    ]
  }
};