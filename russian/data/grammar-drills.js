// Hand-verified grammar drills: verb conjugation, aspect pairs, cases.
// All forms double-checked. Prefer quality over quantity.

export const VERB_DRILLS = [
  { context: 'Я ___ книгу. (читать, present)', ru: 'Я чита́ю кни́гу.', correct: 'читаю', options: ['читаю', 'читаешь', 'читает', 'читаем'], explain: '1st conjugation: читать → я читаю.' },
  { context: 'Ты ___ по-русски. (говорить, present)', ru: 'Ты говори́шь по-ру́сски.', correct: 'говоришь', options: ['говоришь', 'говорю', 'говорит', 'говорите'], explain: '2nd conjugation (and ь-stem): ты говоришь.' },
  { context: 'Он ___ в банке. (работать, present)', ru: 'Он рабо́тает в ба́нке.', correct: 'работает', options: ['работает', 'работаешь', 'работаю', 'работаем'], explain: '1st conjugation: работать → он работает.' },
  { context: 'Мы ___ в Москве. (жить, present)', ru: 'Мы живём в Москве́.', correct: 'живём', options: ['живём', 'живёшь', 'живёт', 'живут'], explain: 'Note the ё: we write живём (never жы).' },
  { context: 'Они ___ по телефону. (говорить, present)', ru: 'Они́ говоря́т по телефо́ну.', correct: 'говорят', options: ['говорят', 'говорим', 'говорите', 'говорю'], explain: '2nd conjugation: они говорят.' },
  { context: 'Я ___ чай. (пить, present)', ru: 'Я пью чай.', correct: 'пью', options: ['пью', 'пьёшь', 'пьёт', 'пьём'], explain: 'Irregular: я пью (пить).' },
  { context: 'Ты ___ сэндвич. (есть — to eat, present)', ru: 'Ты ешь сэ́ндвич.', correct: 'ешь', options: ['ешь', 'ем', 'ест', 'едим'], explain: 'Irregular: есть → ем, ешь, ест, едим, едите, едят.' },
  { context: 'Он ___ мороженое. (есть — to eat, present)', ru: 'Он ест моро́женое.', correct: 'ест', options: ['ест', 'ешь', 'ем', 'едят'], explain: 'есть → он ест (3rd person singular).' },
  { context: 'Мы ___ кофе. (пить, present)', ru: 'Мы пьём ко́фе.', correct: 'пьём', options: ['пьём', 'пью', 'пьёшь', 'пьёт'], explain: 'пить → мы пьём.' },
  { context: 'Он ___ есть. (хотеть, present)', ru: 'Он хо́чет есть.', correct: 'хочет', options: ['хочет', 'хочу', 'хочешь', 'хотят'], explain: 'хотеть is irregular: хочу, хочешь, хочет, хотим, хотите, хотят.' },
  { context: 'Ты ___ помочь? (мочь, present)', ru: 'Ты мо́жешь помо́чь?', correct: 'можешь', options: ['можешь', 'могу', 'может', 'могут'], explain: 'мочь → я могу, ты можешь, он может, мы можем.' },
  { context: 'Я ___ в школу. (идти, present)', ru: 'Я иду́ в шко́лу.', correct: 'иду', options: ['иду', 'идёшь', 'идёт', 'идём'], explain: 'Unidirectional motion: идти → иду, идёшь, идёт, идём, идёте, идут.' },
  { context: 'Она ___ в Москву. (ехать, present)', ru: 'Она́ е́дет в Москву́.', correct: 'едет', options: ['едет', 'еду', 'едешь', 'едем'], explain: 'ехать → еду, едешь, едет, едем, едут.' },
  { context: 'Мы ___ музыку. (слушать, present)', ru: 'Мы слу́шаем му́зыку.', correct: 'слушаем', options: ['слушаем', 'слушаю', 'слушаешь', 'слушают'], explain: '1st conjugation: слушать → мы слушаем.' },
  { context: 'Я ___ маму. (любить, present)', ru: 'Я люблю́ ма́му.', correct: 'люблю', options: ['люблю', 'любишь', 'любит', 'любим'], explain: '2nd conjugation with б→бл mutation: любить → люблю.' },
  { context: 'Ты ___ футбол? (любить, present)', ru: 'Ты лю́бишь футбо́л?', correct: 'любишь', options: ['любишь', 'люблю', 'любит', 'любят'], explain: 'любить → ты любишь.' },
  { context: 'Я ___ телевизор. (смотреть, present)', ru: 'Я смотрю́ телеви́зор.', correct: 'смотрю', options: ['смотрю', 'смотришь', 'смотрит', 'смотрим'], explain: '2nd conjugation: смотреть → смотрю.' },
  { context: 'Ва́ня ___ суп. (варить, present)', ru: 'Ва́ня ва́рит суп.', correct: 'варит', options: ['варит', 'варю', 'варишь', 'варим'], explain: '2nd conjugation: варить → варит.' },
  { context: 'Мы ___ по-испански. (знать, present)', ru: 'Мы зна́ем по-испа́нски.', correct: 'знаем', options: ['знаем', 'знаю', 'знаешь', 'знают'], explain: '1st conjugation: знать → знаю, знаешь, знаем, знают.' },
  { context: 'Ты ___ письмо́. (писать, present)', ru: 'Ты пи́шешь письмо́.', correct: 'пишешь', options: ['пишешь', 'пишу', 'пишет', 'пишем'], explain: '1st conjugation, с→ш: писать → ты пишешь.' },
  { context: 'Они ___ итальянский. (учить, present)', ru: 'Они́ у́чат италья́нский.', correct: 'учат', options: ['учат', 'учу', 'учишь', 'учим'], explain: '2nd conjugation: учить → они учат (ч is soft, so -ат).' },
  { context: 'Она ___ два словаря. (иметь, present)', ru: 'Она́ име́ет два словаря́.', correct: 'имеет', options: ['имеет', 'имею', 'имеешь', 'имеем'], explain: '1st conjugation: иметь → она имеет.' },
  { context: 'Вы ___ мою подругу? (знать, present)', ru: 'Вы зна́ете мою́ подру́гу?', correct: 'знаете', options: ['знаете', 'знаем', 'знает', 'знают'], explain: 'знать → вы знаете.' },
  { context: 'Когда́ я ___ к тебе́? (прийти, future)', ru: 'Когда́ я приду́ к тебе́?', correct: 'приду', options: ['приду', 'придёшь', 'придёт', 'придём'], explain: 'Perf. будущее прийти → я приду.' }
];

export const ASPECT_DRILLS = [
  { context: 'Я ___ письмо́ дру́гу. (imperfective, habit)', ru: 'Я пишу́ письмо́ дру́гу.', correct: 'пишу', options: ['пишу', 'напишу', 'писал', 'написала'], explain: 'Repeated/habitual action → imperfective писать.' },
  { context: 'Я ___ письмо́ — го́тово! (perfective, finished)', ru: 'Я написа́л письмо́ — го́тово!', correct: 'написал', options: ['написал', 'пишет', 'напишет', 'писал'], explain: 'Completed result → perfective написать.' },
  { context: 'Ка́ждый день он ___ за́втрак. (imperfective, routine)', ru: 'Ка́ждый день он гото́вит за́втрак.', correct: 'готовит', options: ['готовит', 'приготовит', 'приготовил', 'готовить'], explain: 'Every day (routine) → imperfective.' },
  { context: 'Вчера́ она́ ___ вку́сный у́жин. (perfective, completed)', ru: 'Вчера́ она́ пригото́вила вку́сный у́жин.', correct: 'приготовила', options: ['приготовила', 'готовит', 'приготовит', 'приготовил'], explain: 'Completed in the past → perfective.' },
  { context: 'Я люблю́ ___ класси́ческую му́зыку. (imperfective, enjoy doing)', ru: 'Я люблю́ слу́шать класси́ческую му́зыку.', correct: 'слушать', options: ['слушать', 'послушать', 'слушает', 'услышать'], explain: 'Enjoying an activity → imperfective infinitive.' },
  { context: 'Мы ___ кино́ вчера́. (perfective, single completed)', ru: 'Мы посмотре́ли кино́ вчера́.', correct: 'посмотрели', options: ['посмотрели', 'смотрят', 'посмотрим', 'посмотрело'], explain: 'Single completed action → perfective посмотреть.' },
  { context: 'Он всегда́ ___ ра́но у́тром. (imperfective, habit)', ru: 'Он всегда́ встаёт ра́но у́тром.', correct: 'встаёт', options: ['встаёт', 'встал', 'вставал', 'встанет'], explain: 'Always (habit) → imperfective вставать → он встаёт.' },
  { context: 'Я ___ окно́ — тепе́рь не ду́ет. (perfective, result)', ru: 'Я закры́л окно́.', correct: 'закрыл', options: ['закрыл', 'закрывает', 'закроет', 'открыл'], explain: 'The action has a result → perfective закрыть.' },
  { context: 'Мы ча́сто ___ кни́ги. (imperfective, often)', ru: 'Мы ча́сто чита́ем кни́ги.', correct: 'читаем', options: ['читаем', 'прочитаем', 'читали', 'читает'], explain: 'Often → imperfective.' },
  { context: 'За́втра он ___ э́ту кни́гу. (perfective, future result)', ru: 'За́втра он прочита́ет э́ту кни́гу.', correct: 'прочитает', options: ['прочитает', 'читает', 'прочитал', 'прочитают'], explain: 'Future perfective = result in the future → прочитать.' }
];

export const CASE_DRILLS = [
  { prompt: 'Я ви́жу ___. (animate masc, accusative)', ru: 'Я ви́жу кота́.', correct: 'кота', options: ['кота', 'кот', 'коту', 'котом'], explain: 'Animate masculine accusative = genitive: кот → кота (я вижу кота).' },
  { prompt: 'Я люблю́ ___. (my mother, feminine accusative)', ru: 'Я люблю́ ма́му.', correct: 'маму', options: ['маму', 'мама', 'маме', 'мамой'], explain: 'Feminine -а → accusative -у: мама → маму.' },
  { prompt: 'Я чита́ю ___. (a book, feminine accusative)', ru: 'Я чита́ю кни́гу.', correct: 'книгу', options: ['книгу', 'книга', 'книге', 'книгой'], explain: 'книга → книгу (accusative -у).' },
  { prompt: 'Я живу́ ___. (in Moscow, prepositional)', ru: 'Я живу́ в Москве́.', correct: 'в Москве', options: ['в Москве', 'Москва', 'Москвой', 'Москву'], explain: 'в + prepositional: Москва → в Москве.' },
  { prompt: 'Мы говори́м ___. (about work, prepositional)', ru: 'Мы говори́м о рабо́те.', correct: 'о работе', options: ['о работе', 'работа', 'работой', 'работу'], explain: 'о + prepositional: работа → о работе.' },
  { prompt: 'Кни́га лежи́т ___. (on the table, prepositional)', ru: 'Кни́га лежи́т на столе́.', correct: 'на столе', options: ['на столе', 'стол', 'столу', 'столом'], explain: 'на + prepositional: стол → на столе.' },
  { prompt: 'У меня́ нет ___. (time, genitive)', ru: 'У меня́ нет вре́мени.', correct: 'времени', options: ['времени', 'время', 'временем', 'временам'], explain: 'время is irregular: genitive времени.' },
  { prompt: 'Я купи́л килогра́мм ___. (apples, plural genitive)', ru: 'Я купи́л килогра́мм я́блок.', correct: 'яблок', options: ['яблок', 'яблоки', 'яблоку', 'яблока'], explain: 'Plural genitive of яблоко = яблок (zero ending).' },
  { prompt: 'Э́то дом ___. (my brother, genitive possessive)', ru: 'Э́то дом бра́та.', correct: 'брата', options: ['брата', 'брат', 'брату', 'братом'], explain: 'Animate masculine genitive: брат → брата.' },
  { prompt: 'У неё мно́го ___. (friends, plural genitive)', ru: 'У неё мно́го друзе́й.', correct: 'друзей', options: ['друзей', 'друзья', 'друзьям', 'друзьями'], explain: 'Irregular plural: друг → друзья → мно́го друзей.' },
  { prompt: 'Я помога́ю ___. (my friend, dative)', ru: 'Я помога́ю дру́гу.', correct: 'другу', options: ['другу', 'друг', 'друга', 'другом'], explain: 'Dative of друг = другу (помога́ть + dative).' },
  { prompt: 'Я позвоню́ ___. (my sister, dative)', ru: 'Я позвоню́ сестре́.', correct: 'сестре', options: ['сестре', 'сестра', 'сестру', 'сестрой'], explain: 'Dative of сестра = сестре (звони́ть + dative).' },
  { prompt: 'Я пишу́ ___. (with a pen, instrumental)', ru: 'Я пишу́ ру́чкой.', correct: 'ручкой', options: ['ручкой', 'ручка', 'ручке', 'ручку'], explain: 'Instrumental of ручка = ручкой (with a pen).' },
  { prompt: 'Он рабо́тает ___. (as a doctor, instrumental)', ru: 'Он рабо́тает врачо́м.', correct: 'врачом', options: ['врачом', 'врач', 'врача', 'врачу'], explain: 'Instrumental of врач = врачом.' },
  { prompt: 'Мы е́дем ___. (to school, accusative of place)', ru: 'Мы е́дем в шко́лу.', correct: 'в школу', options: ['в школу', 'школа', 'школе', 'школой'], explain: 'Direction в + accusative: школа → в школу.' },
  { prompt: 'Я был ___. (in the park, prepositional)', ru: 'Я был в па́рке.', correct: 'в парке', options: ['в парке', 'парк', 'парку', 'парком'], explain: 'в + prepositional for location: парк → в парке.' }
];