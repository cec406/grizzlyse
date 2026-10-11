// Unit 26 — Conditionals with бы. B1.
export const unit = {
  id: 'u26',
  level: 'B1',
  number: 26,
  title: 'Conditionals with бы',
  titleRu: 'Усло́вия с «бы»',
  story: 'If it rains, I will stay home. If I had time, I would travel. Russian handles both with е́сли and the little particle бы. Master this and you can negotiate, dream and plan.',
  grammar: [
    {
      topic: 'Real conditions: е́сли …',
      explanation: 'For a possible, real condition use е́сли with the present or future. The result can be a future, an imperative or a present. The word то is optional but common.',
      table: [
        ['Russian', 'English'],
        ['Е́сли бу́дет вре́мя, я позвоню́.', 'If there is time, I will call.'],
        ['Е́сли ты хо́чешь, пойдём в кино́.', 'If you want, let us go to the cinema.'],
        ['Е́сли дождь, мы остаёмся до́ма.', 'If it rains, we stay home.']
      ],
      examples: [
        { ru: 'Е́сли бу́дет вре́мя, я приду́.', trans: 'yesli budet vremya, ya pridu', en: 'If there is time, I will come.' }
      ]
    },
    {
      topic: 'Unreal conditions: е́сли бы …',
      explanation: 'For a hypothetical or impossible condition, add бы to both clauses and use the past tense. This is the equivalent of English would.',
      table: [
        ['Russian', 'English'],
        ['Е́сли бы у меня́ бы́ло вре́мя, я бы пое́хал.', 'If I had time, I would go.'],
        ['Е́сли бы я знал, я бы сказа́л.', 'If I knew, I would tell you.'],
        ['Е́сли бы она́ пришла́, мы бы ра́довались.', 'If she came, we would be glad.']
      ],
      examples: [
        { ru: 'Е́сли бы я был бога́тым, я бы путеше́ствовал.', trans: 'yesli by ya byl bogatym, ya by puteshestvoval', en: 'If I were rich, I would travel.' }
      ]
    },
    {
      topic: 'Wishes and polite suggestions',
      explanation: 'бы also softens wishes and suggestions: Я бы хоте́л… (I would like), Хорошо́ бы… (It would be good to), Вы бы не могли́…? (Could you perhaps…?)',
      table: [
        ['Russian', 'English'],
        ['Я бы хоте́л ча́шку ко́фе.', 'I would like a cup of coffee.'],
        ['Хорошо́ бы отдохну́ть.', 'It would be good to rest.'],
        ['Вы бы не могли́ помо́чь?', 'Could you perhaps help?']
      ],
      examples: [
        { ru: 'Я бы хоте́л ко́фе, пожа́луйста.', trans: 'ya by khotel kofe, pozhaluysta', en: 'I would like a coffee, please.' }
      ]
    }
  ],
  vocabulary: [
    { id: 'u26-esli', ru: 'е́сли', translit: 'yesli', en: 'if', pos: 'conjunction' },
    { id: 'u26-by', ru: 'бы', translit: 'by', en: 'would (particle)', pos: 'particle' },
    { id: 'u26-to', ru: 'то', translit: 'to', en: 'then / that', pos: 'conjunction' },
    { id: 'u26-hotet', ru: 'хоте́ть', translit: 'khotet', en: 'to want', pos: 'verb' },
    { id: 'u26-moch', ru: 'мочь', translit: 'moch', en: 'to be able', pos: 'verb' },
    { id: 'u26-dumat', ru: 'ду́мать', translit: 'dumat', en: 'to think', pos: 'verb' },
    { id: 'u26-mechtat', ru: 'мечта́ть', translit: 'mechtat', en: 'to dream', pos: 'verb' },
    { id: 'u26-zhelat', ru: 'жела́ть', translit: 'zhelat', en: 'to wish', pos: 'verb' },
    { id: 'u26-predlozhit', ru: 'предложи́ть', translit: 'predlozhit', en: 'to suggest', pos: 'verb' },
    { id: 'u26-soglasitsya', ru: 'согласи́ться', translit: 'soglasit·sya', en: 'to agree', pos: 'verb' },
    { id: 'u26-otkazatsya', ru: 'отказа́ться', translit: 'otkazat·sya', en: 'to refuse', pos: 'verb' },
    { id: 'u26-zavist', ru: 'зави́сеть', translit: 'zaviset', en: 'to depend', pos: 'verb' },
    { id: 'u26-naverno', ru: 'наве́рно', translit: 'naverno', en: 'probably', pos: 'adverb' },
    { id: 'u26-konechno', ru: 'коне́чно', translit: 'konechno', en: 'of course', pos: 'adverb' },
    { id: 'u26-vozmozhno', ru: 'возмо́жно', translit: 'vozmozhno', en: 'possibly / maybe', pos: 'adverb' },
    { id: 'u26-sluchay', ru: 'слу́чай', translit: 'sluchay', en: 'case / occasion', pos: 'noun', gender: 'm' },
    { id: 'u26-uslovie', ru: 'усло́вие', translit: 'usloviye', en: 'condition', pos: 'noun', gender: 'n' }
  ],
  phrases: [
    { id: 'p-u26-1', ru: 'Я бы хоте́л…', trans: 'ya by khotel…', en: 'I would like…' },
    { id: 'p-u26-2', ru: 'Е́сли бы…', trans: 'yesli by…', en: 'If only…' }
  ],
  sentences: [
    { ru: 'Е́сли бу́дет вре́мя, я приду́.', translit: 'yesli budet vremya, ya pridu', en: 'If there is time, I will come.', words: [{ id: 'u26-esli', ru: 'Е́сли', en: 'if' }] },
    { ru: 'Е́сли бы у меня́ бы́ло вре́мя, я бы пое́хал.', translit: 'yesli by u menya bylo vremya, ya by poyekhal', en: 'If I had time, I would go.', words: [{ id: 'u26-by', ru: 'бы', en: 'would' }, { id: 'u26-esli', ru: 'Е́сли', en: 'if' }] },
    { ru: 'Я бы хоте́л ча́шку ко́фе.', translit: 'ya by khotel chashku kofe', en: 'I would like a cup of coffee.', words: [{ id: 'u26-hotet', ru: 'хоте́л', en: 'to want' }, { id: 'u26-by', ru: 'бы', en: 'would' }] },
    { ru: 'Возмо́жно, он придёт.', translit: 'vozmozhno, on pridyot', en: 'Maybe he will come.', words: [{ id: 'u26-vozmozhno', ru: 'Возмо́жно', en: 'maybe' }] },
    { ru: 'Всё зави́сит от пого́ды.', translit: 'vsyo zavisit ot pogody', en: 'Everything depends on the weather.', words: [{ id: 'u26-zavist', ru: 'зави́сит', en: 'to depend' }] }
  ],
  dialogue: {
    title: 'Пла́ны и мечты́ (Plans and dreams)',
    lines: [
      { who: 'Мария', ru: 'Что ты бу́дешь де́лать в о́тпуске?', en: 'What will you do on your vacation?' },
      { who: 'Том', ru: 'Е́сли бу́дут де́ньги, я пое́ду в Ита́лию.', en: 'If I have money, I will go to Italy.' },
      { who: 'Мария', ru: 'А е́сли бы у тебя́ бы́ло мно́го де́нег?', en: 'And if you had a lot of money?' },
      { who: 'Том', ru: 'Тогда́ я бы объе́хал весь мир.', en: 'Then I would travel around the whole world.' },
      { who: 'Мария', ru: 'Я бы то́же хоте́ла путеше́ствовать.', en: 'I would also like to travel.' },
      { who: 'Том', ru: 'Возмо́жно, пое́дем вме́сте!', en: 'Maybe we will go together!' }
    ],
    questions: [
      { type: 'mc-ru', q: 'Куда́ пое́дет Том, е́сли бу́дут де́ньги?', options: ['в Ита́лию', 'в Испа́нию', 'в Росси́ю', 'в Еги́пет'], answer: 'в Ита́лию' },
      { type: 'mc-ru', q: 'Что бы Том сде́лал с мно́го де́нег?', options: ['объе́хал весь мир', 'купи́л дом', 'отдохну́л', 'рабо́тал'], answer: 'объе́хал весь мир' },
      { type: 'mc-ru', q: 'Что хо́чет Мари́я?', options: ['путеше́ствовать', 'рабо́тать', 'спать', 'учи́ться'], answer: 'путеше́ствовать' }
    ]
  },
  quiz: [
    { type: 'mc-en', q: 'Что зна́чит «е́сли»?', options: ['if', 'when', 'because', 'then'], answer: 'if', ru: 'е́сли' },
    { type: 'mc-en', q: 'Что зна́чит «бы»?', options: ['would (particle)', 'will', 'was', 'because'], answer: 'would (particle)', ru: 'бы' },
    { type: 'mc-ru', q: '“to want” in Russian', options: ['хоте́ть', 'мочь', 'ду́мать', 'мечта́ть'], answer: 'хоте́ть', ru: 'хоте́ть' },
    { type: 'mc-ru', q: '“to be able” in Russian', options: ['мочь', 'хоте́ть', 'жела́ть', 'ду́мать'], answer: 'мочь', ru: 'мочь' },
    { type: 'typing', q: 'Type “if” in Russian', answer: 'если', accepts: ['е́сли'], ru: 'е́сли' },
    { type: 'typing', q: 'Type “probably” in Russian', answer: 'наверно', accepts: ['наве́рно'], ru: 'наве́рно' },
    { type: 'mc-en', q: 'Что зна́чит «коне́чно»?', options: ['of course', 'maybe', 'probably', 'never'], answer: 'of course', ru: 'коне́чно' },
    { type: 'mc-ru', q: '“to dream” in Russian', options: ['мечта́ть', 'ду́мать', 'жела́ть', 'хоте́ть'], answer: 'мечта́ть', ru: 'мечта́ть' },
    { type: 'mc-en', q: 'Что зна́чит «возмо́жно»?', options: ['possibly / maybe', 'of course', 'definitely', 'never'], answer: 'possibly / maybe', ru: 'возмо́жно' },
    { type: 'mc-ru', q: 'Complete: Е́сли ___ вре́мя, я приду́.', options: ['бу́дет', 'был', 'бы', 'есть'], answer: 'бу́дет', ru: 'бу́дет вре́мя' },
    { type: 'typing', q: 'Type “condition” in Russian', answer: 'условие', accepts: ['усло́вие'], ru: 'усло́вие' },
    { type: 'mc-en', q: 'Что зна́чит «зави́сеть»?', options: ['to depend', 'to decide', 'to want', 'to agree'], answer: 'to depend', ru: 'зави́сеть' }
  ],
  test: {
    title: 'Unit 26 test — Conditionals with бы',
    questions: [
      { type: 'mc-ru', q: '“to suggest” in Russian', options: ['предложи́ть', 'отказа́ться', 'согласи́ться', 'жела́ть'], answer: 'предложи́ть', ru: 'предложи́ть' },
      { type: 'mc-en', q: 'Что зна́чит «согласи́ться»?', options: ['to agree', 'to refuse', 'to suggest', 'to think'], answer: 'to agree', ru: 'согласи́ться' },
      { type: 'typing', q: 'Type “would (particle)” in Russian', answer: 'бы', accepts: [], ru: 'бы' },
      { type: 'typing', q: 'Type “of course” in Russian', answer: 'конечно', accepts: ['коне́чно'], ru: 'коне́чно' },
      { type: 'mc-ru', q: '“to refuse” in Russian', options: ['отказа́ться', 'согласи́ться', 'предложи́ть', 'мочь'], answer: 'отказа́ться', ru: 'отказа́ться' },
      { type: 'mc-en', q: 'Что зна́чит «слу́чай»?', options: ['case / occasion', 'condition', 'luck', 'reason'], answer: 'case / occasion', ru: 'слу́чай' },
      { type: 'mc-ru', q: 'Complete the unreal: Е́сли бы я ___, я бы сказа́л.', options: ['знал', 'зна́ю', 'бу́ду знать', 'знать'], answer: 'знал', ru: 'знал' },
      { type: 'typing', q: 'Type “to think” in Russian', answer: 'думать', accepts: ['ду́мать'], ru: 'ду́мать' },
      { type: 'mc-en', q: 'Что зна́чит «жела́ть»?', options: ['to wish', 'to dream', 'to want badly', 'to demand'], answer: 'to wish', ru: 'жела́ть' },
      { type: 'mc-ru', q: '“to dream” in Russian', options: ['мечта́ть', 'ду́мать', 'хоте́ть', 'жела́ть'], answer: 'мечта́ть', ru: 'мечта́ть' },
      { type: 'typing', q: 'Type “to depend” in Russian', answer: 'зависеть', accepts: ['зави́сеть'], ru: 'зави́сеть' },
      { type: 'mc-en', q: 'Что зна́чит «усло́вие»?', options: ['condition', 'case', 'wish', 'reason'], answer: 'condition', ru: 'усло́вие' }
    ]
  }
};
