// Unit 12 — Future plans. A2.
export const unit = {
  id: 'u12',
  level: 'A2',
  number: 12,
  title: 'Future plans',
  titleRu: 'Пла́ны на бу́дущее',
  story: 'Weekend coming up? You need to talk about what you will do. Russian has two futures: буду + imperfective (a plan, a process) and the perfective future (a completed act). This unit keeps it practical — plans, hopes and dates.',
  grammar: [
    {
      topic: 'бу́ду + infinitive (the compound future)',
      explanation: 'For plans, intentions and ongoing actions, use the future of быть (бу́ду, бу́дешь, бу́дет, бу́дем, бу́дете, бу́дут) plus an imperfective infinitive. This is the closest thing to English \"will + verb\".',
      table: [
        ['Person', 'Future of быть', 'Example'],
        ['я', 'бу́ду', 'Я бу́ду чита́ть.'],
        ['ты', 'бу́дешь', 'Ты бу́дешь рабо́тать?'],
        ['он / она́', 'бу́дет', 'Он бу́дет отдыха́ть.'],
        ['мы', 'бу́дем', 'Мы бу́дем гуля́ть.'],
        ['вы', 'бу́дете', 'Вы бу́дете до́ма?'],
        ['они́', 'бу́дут', 'Они́ бу́дут смотре́ть фильм.']
      ],
      examples: [
        { ru: 'За́втра я бу́ду рабо́тать.', trans: 'zavtra ya budu rabotat', en: 'Tomorrow I will work.' },
        { ru: 'Ве́чером мы бу́дем смотре́ть фильм.', trans: 'vecherom my budem smotret film', en: 'In the evening we will watch a film.' }
      ]
    },
    {
      topic: 'The perfective future (one result)',
      explanation: 'Many verbs have a perfective partner. Its future looks like the present: напишу́, пое́ду, посмотрю́. Use it for a single completed act with a clear result. Compare: Я бу́ду писа́ть письмо́ (I will be writing) vs Я напишу́ письмо́ (I will write it, done).',
      table: [
        ['Imperfective future', 'Perfective future', 'Meaning'],
        ['бу́ду писа́ть', 'напишу́', 'I will write (finish)'],
        ['бу́ду де́лать', 'сде́лаю', 'I will do (get done)'],
        ['бу́ду чита́ть', 'прочита́ю', 'I will read (to the end)'],
        ['бу́ду гото́вить', 'пригото́влю', 'I will cook (finish)']
      ],
      examples: [
        { ru: 'Я напишу́ тебе́ за́втра.', trans: 'ya napishu tebe zavtra', en: 'I will write to you tomorrow.' },
        { ru: 'Мы пое́дем в Москву́ ле́том.', trans: 'my poyedem v Moskvu letom', en: 'We will go to Moscow in summer.' }
      ]
    },
    {
      topic: 'Talking about plans',
      explanation: 'собира́ться means \"to intend / plan to\" and takes an infinitive. наде́яться means \"to hope\". Both are common with the future.',
      table: [
        ['Russian', 'English'],
        ['Я собира́юсь отдохну́ть.', 'I intend to rest.'],
        ['Мы наде́емся пое́хать.', 'We hope to go.'],
        ['Что ты бу́дешь де́лать?', 'What will you do?'],
        ['На выходны́х я бу́ду до́ма.', 'At the weekend I will be at home.']
      ],
      examples: [
        { ru: 'Что ты бу́дешь де́лать в выходны́е?', trans: 'chto ty budesh delat v vykhodnyye?', en: 'What will you do at the weekend?' }
      ]
    }
  ],
  vocabulary: [
    { id: 'u12-budushchee', ru: 'бу́дущее', translit: 'budushcheye', en: 'future', pos: 'noun', gender: 'n' },
    { id: 'u12-plan', ru: 'план', translit: 'plan', en: 'plan', pos: 'noun', gender: 'm' },
    { id: 'u12-sobiratsya', ru: 'собира́ться', translit: 'sobirat·sya', en: 'to intend / plan to', pos: 'verb' },
    { id: 'u12-nadeyatsya', ru: 'наде́яться', translit: 'nadeyat·sya', en: 'to hope', pos: 'verb' },
    { id: 'u12-vstretitsya', ru: 'встре́титься', translit: 'vstretit·sya', en: 'to meet (each other)', pos: 'verb' },
    { id: 'u12-otdohnut', ru: 'отдохну́ть', translit: 'otdokhnut', en: 'to rest / have a rest', pos: 'verb' },
    { id: 'u12-nachat', ru: 'нача́ть', translit: 'nachat', en: 'to begin', pos: 'verb' },
    { id: 'u12-zakonchit', ru: 'зако́нчить', translit: 'zakonchit', en: 'to finish', pos: 'verb' },
    { id: 'u12-napishu', ru: 'напишу́', translit: 'napishu', en: 'I will write', pos: 'verb' },
    { id: 'u12-poedem', ru: 'пое́дем', translit: 'poyedem', en: 'we will go (by vehicle)', pos: 'verb' },
    { id: 'u12-skoro', ru: 'ско́ро', translit: 'skoro', en: 'soon', pos: 'adverb' },
    { id: 'u12-zavtra', ru: 'за́втра', translit: 'zavtra', en: 'tomorrow', pos: 'adverb' },
    { id: 'u12-posle', ru: 'по́сле', translit: 'posle', en: 'after / later', pos: 'adverb' },
    { id: 'u12-vyhodnye', ru: 'выходны́е', translit: 'vykhodnyye', en: 'weekend', pos: 'noun', gender: 'p' },
    { id: 'u12-otpusk', ru: 'о́тпуск', translit: 'otpusk', en: 'vacation / leave', pos: 'noun', gender: 'm' },
    { id: 'u12-leto', ru: 'ле́то', translit: 'leto', en: 'summer', pos: 'noun', gender: 'n' }
  ],
  phrases: [
    { id: 'p-u12-1', ru: 'Что ты бу́дешь де́лать?', trans: 'chto ty budesh delat?', en: 'What will you do?' },
    { id: 'p-u12-2', ru: 'Я собира́юсь отдохну́ть.', trans: 'ya sobirayus otdokhnut', en: 'I intend to rest.' }
  ],
  sentences: [
    { ru: 'За́втра я бу́ду рабо́тать.', translit: 'zavtra ya budu rabotat', en: 'Tomorrow I will work.', words: [{ id: 'u12-zavtra', ru: 'За́втра', en: 'tomorrow' }] },
    { ru: 'Я напишу́ тебе́ письмо́.', translit: 'ya napishu tebe pismo', en: 'I will write you a letter.', words: [{ id: 'u12-napishu', ru: 'напишу́', en: 'I will write' }] },
    { ru: 'Ле́том мы пое́дем в Москву́.', translit: 'letom my poyedem v Moskvu', en: 'In summer we will go to Moscow.', words: [{ id: 'u12-poedem', ru: 'пое́дем', en: 'we will go' }, { id: 'u12-leto', ru: 'Ле́том', en: 'summer' }] },
    { ru: 'На выходны́х я бу́ду до́ма.', translit: 'na vykhodnykh ya budu doma', en: 'At the weekend I will be at home.', words: [{ id: 'u12-vyhodnye', ru: 'выходны́х', en: 'weekend' }] },
    { ru: 'Мы наде́емся встре́титься ско́ро.', translit: 'my nadeyemsya vstretitsya skoro', en: 'We hope to meet soon.', words: [{ id: 'u12-nadeyatsya', ru: 'наде́емся', en: 'to hope' }, { id: 'u12-vstretitsya', ru: 'встре́титься', en: 'to meet' }, { id: 'u12-skoro', ru: 'ско́ро', en: 'soon' }] }
  ],
  dialogue: {
    title: 'Пла́ны на выходны́е (Weekend plans)',
    lines: [
      { who: 'Мария', ru: 'Что ты бу́дешь де́лать в выходны́е?', en: 'What will you do at the weekend?' },
      { who: 'Том', ru: 'Я собира́юсь отдохну́ть и почита́ть.', en: 'I intend to rest and read.' },
      { who: 'Мария', ru: 'А в суббо́ту?', en: 'And on Saturday?' },
      { who: 'Том', ru: 'В суббо́ту мы пое́дем в го́род.', en: 'On Saturday we will go to the city.' },
      { who: 'Мария', ru: 'Отли́чно! Я напишу́ тебе́ в воскресе́нье.', en: 'Great! I will write to you on Sunday.' }
    ],
    questions: [
      { type: 'mc-ru', q: 'Что Том бу́дет де́лать в выходны́е?', options: ['отдыха́ть и чита́ть', 'рабо́тать', 'спать', 'путеше́ствовать'], answer: 'отдыха́ть и чита́ть' },
      { type: 'mc-ru', q: 'Куда́ они́ пое́дут в суббо́ту?', options: ['в го́род', 'в дере́вню', 'на мо́ре', 'в го́ры'], answer: 'в го́род' },
      { type: 'mc-ru', q: 'Когда́ Мари́я напи́шет?', options: ['в воскресе́нье', 'в суббо́ту', 'в пя́тницу', 'в понеде́льник'], answer: 'в воскресе́нье' }
    ]
  },
  quiz: [
    { type: 'mc-en', q: 'Что зна́чит «за́втра»?', options: ['tomorrow', 'today', 'yesterday', 'soon'], answer: 'tomorrow', ru: 'за́втра' },
    { type: 'mc-en', q: 'Что зна́чит «ско́ро»?', options: ['soon', 'always', 'never', 'later'], answer: 'soon', ru: 'ско́ро' },
    { type: 'mc-ru', q: 'Future of быть for «я»', options: ['бу́ду', 'бу́дешь', 'бу́дет', 'бу́дем'], answer: 'бу́ду', ru: 'бу́ду' },
    { type: 'mc-ru', q: 'Future of быть for «мы»', options: ['бу́дем', 'бу́ду', 'бу́дете', 'бу́дут'], answer: 'бу́дем', ru: 'бу́дем' },
    { type: 'typing', q: 'Type “future” in Russian', answer: 'будущее', accepts: ['бу́дущее'], ru: 'бу́дущее' },
    { type: 'typing', q: 'Type “plan” in Russian', answer: 'план', accepts: [], ru: 'план' },
    { type: 'mc-en', q: 'Что зна́чит «выходны́е»?', options: ['weekend', 'holiday', 'vacation', 'weekday'], answer: 'weekend', ru: 'выходны́е' },
    { type: 'mc-ru', q: '“to hope” in Russian', options: ['наде́яться', 'собира́ться', 'зако́нчить', 'нача́ть'], answer: 'наде́яться', ru: 'наде́яться' },
    { type: 'mc-en', q: 'Что зна́чит «о́тпуск»?', options: ['vacation / leave', 'weekend', 'plan', 'future'], answer: 'vacation / leave', ru: 'о́тпуск' },
    { type: 'mc-ru', q: '“soon” in Russian', options: ['ско́ро', 'по́сле', 'за́втра', 'сего́дня'], answer: 'ско́ро', ru: 'ско́ро' },
    { type: 'typing', q: 'Type “to begin” in Russian', answer: 'начать', accepts: ['нача́ть'], ru: 'нача́ть' },
    { type: 'mc-en', q: 'Что зна́чит «напишу́»?', options: ['I will write', 'I wrote', 'I am writing', 'I write'], answer: 'I will write', ru: 'напишу́' }
  ],
  test: {
    title: 'Unit 12 test — Future plans',
    questions: [
      { type: 'mc-ru', q: 'Future of быть for «они́»', options: ['бу́дут', 'бу́дем', 'бу́дете', 'бу́дет'], answer: 'бу́дут', ru: 'бу́дут' },
      { type: 'mc-en', q: 'Что зна́чит «собира́ться»?', options: ['to intend / plan to', 'to hope', 'to finish', 'to rest'], answer: 'to intend / plan to', ru: 'собира́ться' },
      { type: 'typing', q: 'Type “tomorrow” in Russian', answer: 'завтра', accepts: ['за́втра'], ru: 'за́втра' },
      { type: 'typing', q: 'Type “weekend” in Russian', answer: 'выходные', accepts: ['выходны́е'], ru: 'выходны́е' },
      { type: 'mc-ru', q: '“to finish” in Russian', options: ['зако́нчить', 'нача́ть', 'отдохну́ть', 'встре́титься'], answer: 'зако́нчить', ru: 'зако́нчить' },
      { type: 'mc-en', q: 'Что зна́чит «отдохну́ть»?', options: ['to rest', 'to work', 'to write', 'to go'], answer: 'to rest', ru: 'отдохну́ть' },
      { type: 'mc-ru', q: 'Complete: За́втра я ___ чита́ть.', options: ['бу́ду', 'бу́дешь', 'бу́дет', 'бу́дем'], answer: 'бу́ду', ru: 'бу́ду чита́ть' },
      { type: 'typing', q: 'Type “plan” in Russian', answer: 'план', accepts: [], ru: 'план' },
      { type: 'mc-en', q: 'Что зна́чит «встре́титься»?', options: ['to meet', 'to part', 'to write', 'to rest'], answer: 'to meet', ru: 'встре́титься' },
      { type: 'mc-ru', q: '“summer” in Russian', options: ['ле́то', 'зима́', 'весна́', 'о́сень'], answer: 'ле́то', ru: 'ле́то' },
      { type: 'typing', q: 'Type “soon” in Russian', answer: 'скоро', accepts: ['ско́ро'], ru: 'ско́ро' },
      { type: 'mc-en', q: 'Что зна́чит «пое́дем»?', options: ['we will go (by vehicle)', 'we went', 'we are going', 'we go'], answer: 'we will go (by vehicle)', ru: 'пое́дем' }
    ]
  }
};
