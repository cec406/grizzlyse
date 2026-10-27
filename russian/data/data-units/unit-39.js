// Unit 39 — Abstract nouns and nominalisation. B2.
export const unit = {
  id: 'u39',
  level: 'B2',
  number: 39,
  title: 'Abstract nouns',
  titleRu: 'Отвлечённые существи́тельные',
  story: 'Adult Russian loves nouns: развитие, решение, изменение. This unit shows how Russian builds abstract nouns from verbs and adjectives, and why using them makes your speech sound precise and professional.',
  grammar: [
    {
      topic: 'From verb to noun',
      explanation: 'Most verbs build an abstract noun with -ение or -ание. The noun names the action itself: реша́ть (to solve) → реше́ние (a decision), развива́ть → разви́тие, изменя́ть → измене́ние.',
      table: [
        ['Verb', 'Noun', 'English'],
        ['реша́ть', 'реше́ние', 'decision'],
        ['развива́ть', 'разви́тие', 'development'],
        ['изменя́ть', 'измене́ние', 'change'],
        ['дви́гать(ся)', 'движе́ние', 'movement'],
        ['улучша́ть', 'улучше́ние', 'improvement']
      ],
      examples: [
        { ru: 'Разви́тие эконо́мики идёт бы́стро.', trans: 'razvitiye ekonomiki idyot bystro', en: 'The development of the economy is going fast.' }
      ]
    },
    {
      topic: 'From adjective to noun',
      explanation: 'The suffix -ость makes an abstract quality from many adjectives: ско́рый → ско́рость (speed), ва́жный → ва́жность (importance), сло́жный → сло́жность (complexity).',
      table: [
        ['Adjective', 'Noun', 'English'],
        ['ско́рый', 'ско́рость', 'speed'],
        ['ва́жный', 'ва́жность', 'importance'],
        ['сло́жный', 'сло́жность', 'complexity'],
        ['но́вый', 'но́вость', 'news / novelty'],
        ['возмо́жный', 'возмо́жность', 'possibility']
      ],
      examples: [
        { ru: 'Ско́рость движе́ния была́ высо́кой.', trans: 'skorost dvizheniya byla vysokoy', en: 'The speed of movement was high.' }
      ]
    },
    {
      topic: 'Nominal style in modern speech',
      explanation: 'Formal and media Russian often prefers a noun phrase where casual speech uses a verb. This is called the nominal style and it sounds more neutral and abstract.',
      table: [
        ['Casual (verb)', 'Formal (noun)', 'English'],
        ['мы реша́ем', 'на́ше реше́ние', 'our decision'],
        ['о́н изменя́ется', 'его́ измене́ние', 'his change'],
        ['мы сотрудничаем', 'на́ше сотру́дничество', 'our cooperation'],
        ['они́ отно́сятся хорошо́', 'хоро́шее отноше́ние', 'a good attitude']
      ],
      examples: [
        { ru: 'На́ше сотру́дничество продо́лжится.', trans: 'nashe sotrudnichestvo prodolzhitsya', en: 'Our cooperation will continue.' }
      ]
    }
  ],
  vocabulary: [
    { id: 'u39-abstrakciya', ru: 'абстра́кция', translit: 'abstraktsiya', en: 'abstraction', pos: 'noun', gender: 'f' },
    { id: 'u39-znachimost', ru: 'зна́чимость', translit: 'znachimost', en: 'significance', pos: 'noun', gender: 'f' },
    { id: 'u39-vazhnost', ru: 'ва́жность', translit: 'vazhnost', en: 'importance', pos: 'noun', gender: 'f' },
    { id: 'u39-razvitie', ru: 'разви́тие', translit: 'razvitiye', en: 'development', pos: 'noun', gender: 'n' },
    { id: 'u39-izmenenie', ru: 'измене́ние', translit: 'izmeneniye', en: 'change', pos: 'noun', gender: 'n' },
    { id: 'u39-reshenie', ru: 'реше́ние', translit: 'resheniye', en: 'decision / solution', pos: 'noun', gender: 'n' },
    { id: 'u39-dvizhenie', ru: 'движе́ние', translit: 'dvizheniye', en: 'movement / traffic', pos: 'noun', gender: 'n' },
    { id: 'u39-znanie', ru: 'зна́ние', translit: 'znaniye', en: 'knowledge', pos: 'noun', gender: 'n' },
    { id: 'u39-ponyatie', ru: 'поня́тие', translit: 'ponyatiye', en: 'concept', pos: 'noun', gender: 'n' },
    { id: 'u39-opredelenie', ru: 'определе́ние', translit: 'opredeleniye', en: 'definition', pos: 'noun', gender: 'n' },
    { id: 'u39-soderzhanie', ru: 'содержа́ние', translit: 'soderzhaniye', en: 'content', pos: 'noun', gender: 'n' },
    { id: 'u39-otnoshenie', ru: 'отноше́ние', translit: 'otnosheniye', en: 'attitude / relation', pos: 'noun', gender: 'n' },
    { id: 'u39-uluchshenie', ru: 'улучше́ние', translit: 'uluchsheniye', en: 'improvement', pos: 'noun', gender: 'n' },
    { id: 'u39-skorost', ru: 'ско́рость', translit: 'skorost', en: 'speed', pos: 'noun', gender: 'f' },
    { id: 'u39-slozhnost', ru: 'сло́жность', translit: 'slozhnost', en: 'complexity', pos: 'noun', gender: 'f' },
    { id: 'u39-vozmozhnost', ru: 'возмо́жность', translit: 'vozmozhnost', en: 'possibility', pos: 'noun', gender: 'f' },
    { id: 'u39-chislo', ru: 'число́', translit: 'chislo', en: 'number', pos: 'noun', gender: 'n' }
  ],
  phrases: [
    { id: 'p-u39-1', ru: 'Разви́тие эконо́мики ва́жно.', trans: 'razvitiye ekonomiki vazhno', en: 'The development of the economy is important.' },
    { id: 'p-u39-2', ru: 'Э́то сложное реше́ние.', trans: 'eta slozhnoye resheniye', en: 'This is a difficult decision.' }
  ],
  sentences: [
    { ru: 'Разви́тие эконо́мики ва́жно.', translit: 'razvitiye ekonomiki vazhno', en: 'The development of the economy is important.', words: [{ id: 'u39-razvitie', ru: 'Разви́тие', en: 'development' }] },
    { ru: 'Э́то реше́ние бы́ло тру́дным.', translit: 'eta resheniye bylo trudnym', en: 'This decision was difficult.', words: [{ id: 'u39-reshenie', ru: 'реше́ние', en: 'decision' }] },
    { ru: 'Всё зави́сит от измене́ния пого́ды.', translit: 'vsyo zavisit ot izmeneniya pogody', en: 'Everything depends on the change in the weather.', words: [{ id: 'u39-izmenenie', ru: 'измене́ния', en: 'change' }] },
    { ru: 'У нас есть зна́ния и о́пыт.', translit: 'u nas yest znaniya i opyt', en: 'We have knowledge and experience.', words: [{ id: 'u39-znanie', ru: 'зна́ния', en: 'knowledge' }] },
    { ru: 'Ско́рость движе́ния была́ высо́кой.', translit: 'skorost dvizheniya byla vysokoy', en: 'The speed of movement was high.', words: [{ id: 'u39-skorost', ru: 'Ско́рость', en: 'speed' }, { id: 'u39-dvizhenie', ru: 'движе́ния', en: 'movement' }] }
  ],
  dialogue: {
    title: 'Об абстра́кциях (About abstractions)', 
    lines: [
      { who: 'Мария', ru: 'Почему́ в газе́тах таки́е дли́нные слова́?', en: 'Why do the newspapers have such long words?' },
      { who: 'Том', ru: 'Пото́му что они́ испо́льзуют существи́тельные вме́сто глаго́лов.', en: 'Because they use nouns instead of verbs.' },
      { who: 'Мария', ru: 'Например?', en: 'For example?' },
      { who: 'Том', ru: 'Разви́тие, измене́ние, реше́ние, улучше́ние.', en: 'Development, change, decision, improvement.' },
      { who: 'Мария', ru: 'А в разгово́ре мы говори́м про́ще?', en: 'And in conversation we speak more simply?' },
      { who: 'Том', ru: 'Да, но зна́ние э́тих слов де́лает речь зре́лой.', en: 'Yes, but knowing these words makes your speech mature.' }
    ],
    questions: [
      { type: 'mc-ru', q: 'Что испо́льзуют в газе́тах?', options: ['существи́тельные', 'глаго́лы', 'междоме́тия', 'части́цы'], answer: 'существи́тельные' },
      { type: 'mc-ru', q: 'Назови́ одно́ абстра́ктное сло́во.', options: ['разви́тие', 'пи́шет', 'краси́во', 'он'], answer: 'разви́тие' },
      { type: 'mc-ru', q: 'Что де́лает зна́ние э́тих слов?', options: ['де́лает речь зре́лой', 'де́лает речь тру́дной', 'ничего́', 'у́чит'], answer: 'де́лает речь зре́лой' }
    ]
  },
  quiz: [
    { type: 'mc-en', q: 'Что зна́чит «разви́тие»?', options: ['development', 'decision', 'change', 'improvement'], answer: 'development', ru: 'разви́тие' },
    { type: 'mc-en', q: 'Что зна́чит «реше́ние»?', options: ['decision / solution', 'definition', 'concept', 'attitude'], answer: 'decision / solution', ru: 'реше́ние' },
    { type: 'mc-ru', q: '“change” in Russian', options: ['измене́ние', 'реше́ние', 'зна́ние', 'поня́тие'], answer: 'измене́ние', ru: 'измене́ние' },
    { type: 'mc-ru', q: '“knowledge” in Russian', options: ['зна́ние', 'содержа́ние', 'отноше́ние', 'движе́ние'], answer: 'зна́ние', ru: 'зна́ние' },
    { type: 'typing', q: 'Type “importance” in Russian', answer: 'важность', accepts: ['ва́жность'], ru: 'ва́жность' },
    { type: 'typing', q: 'Type “speed” in Russian', answer: 'скорость', accepts: ['ско́рость'], ru: 'ско́рость' },
    { type: 'mc-en', q: 'Что зна́чит «сло́жность»?', options: ['complexity', 'possibility', 'importance', 'movement'], answer: 'complexity', ru: 'сло́жность' },
    { type: 'mc-ru', q: '“possibility” in Russian', options: ['возмо́жность', 'ско́рость', 'ва́жность', 'зна́чимость'], answer: 'возмо́жность', ru: 'возмо́жность' },
    { type: 'mc-en', q: 'Что зна́чит «поня́тие»?', options: ['concept', 'content', 'definition', 'attitude'], answer: 'concept', ru: 'поня́тие' },
    { type: 'mc-ru', q: 'Complete: Э́то ___ бы́ло тру́дным.', options: ['реше́ние', 'реша́ть', 'решён', 'реша́емый'], answer: 'реше́ние', ru: 'реше́ние' },
    { type: 'typing', q: 'Type “definition” in Russian', answer: 'определение', accepts: ['определе́ние'], ru: 'определе́ние' },
    { type: 'mc-en', q: 'Что зна́чит «отноше́ние»?', options: ['attitude / relation', 'movement', 'content', 'meaning'], answer: 'attitude / relation', ru: 'отноше́ние' }
  ],
  test: {
    title: 'Unit 39 test — Abstract nouns',
    questions: [
      { type: 'mc-ru', q: '“improvement” in Russian', options: ['улучше́ние', 'измене́ние', 'разви́тие', 'реше́ние'], answer: 'улучше́ние', ru: 'улучше́ние' },
      { type: 'mc-en', q: 'Что зна́чит «абстра́кция»?', options: ['abstraction', 'decision', 'concept', 'number'], answer: 'abstraction', ru: 'абстра́кция' },
      { type: 'typing', q: 'Type “movement” in Russian', answer: 'движение', accepts: ['движе́ние'], ru: 'движе́ние' },
      { type: 'typing', q: 'Type “content” in Russian', answer: 'содержание', accepts: ['содержа́ние'], ru: 'содержа́ние' },
      { type: 'mc-ru', q: '“significance” in Russian', options: ['зна́чимость', 'ва́жность', 'ско́рость', 'возмо́жность'], answer: 'зна́чимость', ru: 'зна́чимость' },
      { type: 'mc-en', q: 'Что зна́чит «число́»?', options: ['number', 'speed', 'content', 'decision'], answer: 'number', ru: 'число́' },
      { type: 'mc-ru', q: 'Complete: ___ движе́ния была́ высо́кой.', options: ['Ско́рость', 'Ва́жность', 'Сло́жность', 'Возмо́жность'], answer: 'Ско́рость', ru: 'Ско́рость' },
      { type: 'typing', q: 'Type “knowledge” in Russian', answer: 'знание', accepts: ['зна́ние'], ru: 'зна́ние' },
      { type: 'mc-en', q: 'Что зна́чит «ва́жность»?', options: ['importance', 'significance', 'possibility', 'speed'], answer: 'importance', ru: 'ва́жность' },
      { type: 'mc-ru', q: '“concept” in Russian', options: ['поня́тие', 'определе́ние', 'содержа́ние', 'отноше́ние'], answer: 'поня́тие', ru: 'поня́тие' },
      { type: 'typing', q: 'Type “decision” in Russian', answer: 'решение', accepts: ['реше́ние'], ru: 'реше́ние' },
      { type: 'mc-en', q: 'Что зна́чит «разви́тие»?', options: ['development', 'change', 'improvement', 'decision'], answer: 'development', ru: 'разви́тие' }
    ]
  }
};