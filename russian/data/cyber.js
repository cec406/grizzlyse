// Advanced track: the language of the modern digital workplace.
//
// Scope note: this is *language* content only. It builds professional and
// technology-register Russian — the register you need to read technical Russian,
// work with Russian-speaking colleagues, and understand security-awareness and
// IT material. There is no hacking, exploitation or offensive tradecraft here.

export const CYBER_MODULES = [
  {
    id: 'it-support', title: 'IT & help desk', titleRu: 'ИТ и техподде́ржка', level: 'B1', icon: '🖥',
    desc: 'Vocabulary for computers, tickets and technical support conversations.',
    terms: [
      { ru: 'техподде́ржка', translit: 'tekhnpodderzhka', en: 'technical support', pos: 'noun', gender: 'f' },
      { ru: 'зая́вка', translit: 'zayavka', en: 'request, ticket', pos: 'noun', gender: 'f' },
      { ru: 'непола́дка', translit: 'nepoladka', en: 'malfunction, fault', pos: 'noun', gender: 'f' },
      { ru: 'налади́ть', translit: 'naladit', en: 'to fix, to set right', pos: 'verb' },
      { ru: 'перезагру́зка', translit: 'perezagruzka', en: 'restart, reboot', pos: 'noun', gender: 'f' },
      { ru: 'устано́вка', translit: 'ustanovka', en: 'installation', pos: 'noun', gender: 'f' },
      { ru: 'обновле́ние', translit: 'obnovleniye', en: 'update', pos: 'noun', gender: 'n' },
      { ru: 'настро́йка', translit: 'nastroyka', en: 'setting, configuration', pos: 'noun', gender: 'f' },
      { ru: 'до́ступ', translit: 'dostup', en: 'access', pos: 'noun', gender: 'm' },
      { ru: 'учётная за́пись', translit: 'uchyotnaya zapis', en: 'user account', pos: 'phrase' },
      { ru: 'логи́н', translit: 'login', en: 'login', pos: 'noun', gender: 'm' },
      { ru: 'баг', translit: 'bag', en: 'bug', pos: 'noun', gender: 'm' },
      { ru: 'сбо́й', translit: 'sboy', en: 'failure, crash', pos: 'noun', gender: 'm' },
      { ru: 'резе́рвная ко́пия', translit: 'rezervnaya kopiya', en: 'backup', pos: 'phrase' },
      { ru: 'по́льзователь', translit: 'polzovatel', en: 'user', pos: 'noun', gender: 'm' },
      { ru: 'инстру́кция', translit: 'instruktsiya', en: 'instructions', pos: 'noun', gender: 'f' },
      { ru: 'устрани́ть', translit: 'ustranit', en: 'to eliminate, to resolve', pos: 'verb' },
      { ru: 'проверя́ть', translit: 'proveryat', en: 'to check, to verify', pos: 'verb' }
    ],
    phrases: [
      { ru: 'У меня́ не рабо́тает компью́тер.', translit: 'u menya ne rabotayet kompyuter', en: 'My computer is not working.' },
      { ru: 'Попро́буйте перезагрузи́ть систе́му.', translit: 'poprobuyte perezagruzit sistemu', en: 'Try restarting the system.' },
      { ru: 'Опиши́те пробле́му, пожа́луйста.', translit: 'opishite problemu pozhaluysta', en: 'Please describe the problem.' },
      { ru: 'Нужно́ обнови́ть програ́мму.', translit: 'nuzhno obnovit programmu', en: 'The software needs updating.' },
      { ru: 'Я созда́л зая́вку в техподде́ржку.', translit: 'ya sozdal zayavku v tekhnpodderzhku', en: 'I filed a ticket with tech support.' },
      { ru: 'Пробле́ма решена́.', translit: 'problema reshena', en: 'The problem is solved.' }
    ],
    dialogue: {
      title: 'Звоно́к в техподде́ржку (Calling tech support)',
      lines: [
        { who: 'Клиент', ru: 'Здра́вствуйте! У меня́ не открыва́ется програ́мма.', translit: 'zdrastvuyte u menya ne otkryvayetsya programma', en: 'Hello! My program will not open.' },
        { who: 'Опера́тор', ru: 'До́брый день. Опиши́те, что происхо́дит.', translit: 'dobriy den opishite chto proiskhodit', en: 'Good afternoon. Describe what happens.' },
        { who: 'Клиент', ru: 'Появля́ется сообще́ние об оши́бке, и програ́мма закрыва́ется.', translit: 'poyavlyayetsya soobshcheniye ob oshibke i programma zakryvayetsya', en: 'An error message appears and the program closes.' },
        { who: 'Опера́тор', ru: 'Попро́буйте обнови́ть програ́мму и перезагрузи́ть компью́тер.', translit: 'poprobuyte obnovit programmu i perezagruzit kompyuter', en: 'Try updating the program and restarting the computer.' },
        { who: 'Клиент', ru: 'Хорошо́, сейча́с попро́бую.', translit: 'khorosho seychas poprobuyu', en: 'All right, I will try now.' },
        { who: 'Опера́тор', ru: 'Е́сли не помо́жет — созда́йте зая́вку.', translit: 'yesli ne pomozhet sozdayte zayavku', en: 'If it does not help — file a ticket.' }
      ],
      questions: [
        { type: 'mc-en', q: 'What does not open for the client?', options: ['a program', 'a website', 'a printer', 'a folder'], answer: 'a program' },
        { type: 'mc-en', q: 'What does the operator suggest first?', options: ['update and restart', 'buy a new computer', 'call a friend', 'restart the router'], answer: 'update and restart' },
        { type: 'mc-en', q: 'What should the client do if it does not help?', options: ['file a ticket', 'give up', 'write an email', 'call the police'], answer: 'file a ticket' }
      ]
    }
  },
  {
    id: 'office', title: 'Office & email', titleRu: 'О́фис и по́чта', level: 'B1', icon: '📧',
    desc: 'Correspondence, requests and the polite formal register of the workplace.',
    terms: [
      { ru: 'служе́бное письмо́', translit: 'sluzhebnoye pismo', en: 'business letter', pos: 'phrase' },
      { ru: 'вложе́ние', translit: 'vlozheniye', en: 'attachment', pos: 'noun', gender: 'n' },
      { ru: 'те́ма', translit: 'tyema', en: 'subject (of a message)', pos: 'noun', gender: 'f' },
      { ru: 'отпра́вить', translit: 'otpravit', en: 'to send', pos: 'verb' },
      { ru: 'получи́ть', translit: 'poluchit', en: 'to receive', pos: 'verb' },
      { ru: 'подтверди́ть', translit: 'podtverdit', en: 'to confirm', pos: 'verb' },
      { ru: 'напомина́ние', translit: 'napominaniye', en: 'reminder', pos: 'noun', gender: 'n' },
      { ru: 'совеща́ние', translit: 'soveshchaniye', en: 'meeting', pos: 'noun', gender: 'n' },
      { ru: 'поруче́ние', translit: 'porucheniye', en: 'assignment, instruction', pos: 'noun', gender: 'n' },
      { ru: 'отчёт', translit: 'otchyot', en: 'report', pos: 'noun', gender: 'm' },
      { ru: 'гра́фик', translit: 'grafik', en: 'schedule, chart', pos: 'noun', gender: 'm' },
      { ru: 'о́тпуск', translit: 'otpusk', en: 'vacation, leave', pos: 'noun', gender: 'm' },
      { ru: 'командиро́вка', translit: 'komandirovka', en: 'business trip', pos: 'noun', gender: 'f' },
      { ru: 'сро́чный', translit: 'srochnyy', en: 'urgent', pos: 'adjective' },
      { ru: 'зара́нее', translit: 'zaranyeye', en: 'in advance', pos: 'adverb' },
      { ru: 'с уваже́нием', translit: 's uvazheniyem', en: 'kind regards (formal closing)', pos: 'phrase' }
    ],
    phrases: [
      { ru: 'До́брый день! Пишу́ вам по по́воду…', translit: 'dobriy den pishu vam po povodu', en: 'Good afternoon! I am writing to you regarding…' },
      { ru: 'Прикрепля́ю фа́йл к письму́.', translit: 'prikreplyayu fayl k pismu', en: 'I am attaching a file to the letter.' },
      { ru: 'Подтверди́те, пожа́луйста, получе́ние.', translit: 'podtverdite pozhaluysta polucheniye', en: 'Please confirm receipt.' },
      { ru: 'Напомина́ю о встре́че за́втра.', translit: 'napominayu o vstreche zavtra', en: 'A reminder about tomorrow’s meeting.' },
      { ru: 'Отправлю́ отчёт к концу́ дня.', translit: 'otpravlyu otchyot k kontsu dnya', en: 'I will send the report by the end of the day.' },
      { ru: 'Благодарю́ за бы́стрый отве́т.', translit: 'blagodaryu za bystryy otvet', en: 'Thank you for the quick reply.' }
    ]
  },
  {
    id: 'meetings', title: 'Meetings & projects', titleRu: 'Совеща́ния и прое́кты', level: 'B2', icon: '📊',
    desc: 'Discuss, plan and present — the verbs and phrases of collaboration.',
    terms: [
      { ru: 'пове́стка дня', translit: 'povestka dnya', en: 'agenda', pos: 'phrase' },
      { ru: 'цель', translit: 'tsel', en: 'goal, objective', pos: 'noun', gender: 'f' },
      { ru: 'срок', translit: 'srok', en: 'deadline', pos: 'noun', gender: 'm' },
      { ru: 'эта́п', translit: 'etap', en: 'stage, phase', pos: 'noun', gender: 'm' },
      { ru: 'предложе́ние', translit: 'predlozheniye', en: 'proposal', pos: 'noun', gender: 'n' },
      { ru: 'реше́ние', translit: 'resheniye', en: 'decision; solution', pos: 'noun', gender: 'n' },
      { ru: 'риск', translit: 'risk', en: 'risk', pos: 'noun', gender: 'm' },
      { ru: 'ресу́рсы', translit: 'resursy', en: 'resources', pos: 'noun', gender: 'p' },
      { ru: 'зада́ча', translit: 'zadacha', en: 'task', pos: 'noun', gender: 'f' },
      { ru: 'прогре́сс', translit: 'progress', en: 'progress', pos: 'noun', gender: 'm' },
      { ru: 'обсужда́ть', translit: 'obsuzhdat', en: 'to discuss', pos: 'verb' },
      { ru: 'предлага́ть', translit: 'predlagat', en: 'to propose', pos: 'verb' },
      { ru: 'соглаша́ться', translit: 'soglashatsya', en: 'to agree', pos: 'verb' },
      { ru: 'уточня́ть', translit: 'utochnyat', en: 'to clarify', pos: 'verb' },
      { ru: 'подводи́ть ито́ги', translit: 'podvodit itogi', en: 'to sum up', pos: 'phrase' },
      { ru: 'отвеча́ть за', translit: 'otvechat za', en: 'to be responsible for', pos: 'phrase' }
    ],
    phrases: [
      { ru: 'Дава́йте обсуди́м план прое́кта.', translit: 'davayte obsudim plan proyekta', en: 'Let’s discuss the project plan.' },
      { ru: 'У кого́ есть предложе́ния?', translit: 'u kogo yest predlozheniya', en: 'Does anyone have suggestions?' },
      { ru: 'Я согла́сен с э́тим реше́нием.', translit: 'ya soglasen s etim resheniyem', en: 'I agree with this decision.' },
      { ru: 'Дава́й уточни́м сроки.', translit: 'davay utochnim sroki', en: 'Let’s clarify the deadlines.' },
      { ru: 'Э́то входи́т в мою́ зо́ну отве́тственности.', translit: 'eto vkhodit v moyu zonu otvetstvennosti', en: 'That is within my area of responsibility.' },
      { ru: 'Подведём ито́ги совеща́ния.', translit: 'podvedyom itogi soveshchaniya', en: 'Let’s sum up the meeting.' }
    ],
    dialogue: {
      title: 'Пла́новое совеща́ние (Planning meeting)',
      lines: [
        { who: 'Руководи́тель', ru: 'Колле́ги, начнём с це́лей прое́кта.', translit: 'kollegi nachnyom s tseley proyekta', en: 'Colleagues, let’s start with the project goals.' },
        { who: 'Анна', ru: 'Предлага́ю раздели́ть рабо́ту на три эта́па.', translit: 'predlagayu razdelit rabotu na tri etapa', en: 'I propose splitting the work into three stages.' },
        { who: 'Ива́н', ru: 'У нас ма́ло вре́мени. Како́й срок?', translit: 'u nas malo vremeni kakoy srok', en: 'We have little time. What is the deadline?' },
        { who: 'Руководи́тель', ru: 'Отве́тственный за зада́чу — Анна.', translit: 'otvetstvennyy za zadachu anna', en: 'The person responsible for the task is Anna.' },
        { who: 'Анна', ru: 'Хорошо́, я уточню́ дета́ли и пришлю́ отчёт.', translit: 'khorosho ya utochnyu detali i prishlyu otchyot', en: 'All right, I’ll clarify the details and send a report.' }
      ],
      questions: [
        { type: 'mc-en', q: 'How many stages does Anna propose?', options: ['three', 'two', 'four', 'five'], answer: 'three' },
        { type: 'mc-en', q: 'Who is responsible for the task?', options: ['Anna', 'Ivan', 'the manager', 'nobody'], answer: 'Anna' },
        { type: 'mc-en', q: 'What will Anna send?', options: ['a report', 'an invoice', 'a contract', 'a letter'], answer: 'a report' }
      ]
    }
  },
  {
    id: 'security', title: 'Digital safety', titleRu: 'Цифрова́я безопа́сность', level: 'B2', icon: '🛡',
    desc: 'Security-awareness vocabulary — how safety is discussed in plain professional Russian.',
    terms: [
      { ru: 'безопа́сность', translit: 'bezopasnost', en: 'safety, security', pos: 'noun', gender: 'f' },
      { ru: 'защи́та', translit: 'zashchita', en: 'protection', pos: 'noun', gender: 'f' },
      { ru: 'защи́та да́нных', translit: 'zashchita dannykh', en: 'data protection', pos: 'phrase' },
      { ru: 'ли́чные да́нные', translit: 'lichnyye dannyye', en: 'personal data', pos: 'phrase' },
      { ru: 'конфиденциа́льный', translit: 'konfidentsialnyy', en: 'confidential', pos: 'adjective' },
      { ru: 'за́пасно', translit: 'zapasno', en: '(as a backup) safely', pos: 'adverb' },
      { ru: 'прове́рка', translit: 'proverka', en: 'check, verification', pos: 'noun', gender: 'f' },
      { ru: 'подде́льный', translit: 'poddelnyy', en: 'fake, counterfeit', pos: 'adjective' },
      { ru: 'моше́нничество', translit: 'moshennichestvo', en: 'fraud', pos: 'noun', gender: 'n' },
      { ru: 'предупреди́ть', translit: 'predupreedit', en: 'to warn, to prevent', pos: 'verb' },
      { ru: 'сообщи́ть', translit: 'soobshchit', en: 'to report, to inform', pos: 'verb' },
      { ru: 'наруше́ние', translit: 'narusheniye', en: 'violation, breach', pos: 'noun', gender: 'n' },
      { ru: 'пра́вила', translit: 'pravila', en: 'rules', pos: 'noun', gender: 'p' },
      { ru: 'ответстве́нность', translit: 'otvetstvennost', en: 'responsibility', pos: 'noun', gender: 'f' }
    ],
    phrases: [
      { ru: 'Не сообща́йте никому́ ваш паро́ль.', translit: 'ne soobshchayte nikomu vash parol', en: 'Do not share your password with anyone.' },
      { ru: 'Э́то моше́нническое письмо́.', translit: 'eto moshennicheskoye pismo', en: 'This is a fraudulent email.' },
      { ru: 'Нужно́ сообщи́ть о наруше́нии.', translit: 'nuzhno soobshchit o narushenii', en: 'We need to report the breach.' },
      { ru: 'Храни́те да́нные в безопа́сности.', translit: 'khranite dannyye v bezopasnosti', en: 'Keep the data safe.' },
      { ru: 'Сде́лайте резе́рвную ко́пию.', translit: 'sdelayte rezervnuyu kopiyu', en: 'Make a backup.' },
      { ru: 'Прове́рьте адре́с отправи́теля.', translit: 'proveryte adres otpravitelya', en: 'Check the sender’s address.' }
    ]
  },
  {
    id: 'career', title: 'Jobs & teams', titleRu: 'Рабо́та и кома́нда', level: 'B1', icon: '🧑‍💼',
    desc: 'Careers, interviews, roles and how teams talk about themselves.',
    terms: [
      { ru: 'вака́нсия', translit: 'vakansiya', en: 'job vacancy', pos: 'noun', gender: 'f' },
      { ru: 'соиска́тель', translit: 'soiskatel', en: 'applicant, candidate', pos: 'noun', gender: 'm' },
      { ru: 'о́пыт рабо́ты', translit: 'opyt raboty', en: 'work experience', pos: 'phrase' },
      { ru: 'на́вык', translit: 'navyk', en: 'skill', pos: 'noun', gender: 'm' },
      { ru: 'на́выки', translit: 'navyki', en: 'skills', pos: 'noun', gender: 'p' },
      { ru: 'отве́тственность', translit: 'otvetstvennost', en: 'responsibility', pos: 'noun', gender: 'f' },
      { ru: 'до́лжность', translit: 'dolzhnost', en: 'position, post', pos: 'noun', gender: 'f' },
      { ru: 'зарпла́та', translit: 'zarplata', en: 'salary', pos: 'noun', gender: 'f' },
      { ru: 'собесе́дование', translit: 'sobesedovaniye', en: 'interview', pos: 'noun', gender: 'n' },
      { ru: 'руково́дство', translit: 'rukovodstvo', en: 'leadership, management', pos: 'noun', gender: 'n' },
      { ru: 'стажиро́вка', translit: 'stazhirovka', en: 'internship', pos: 'noun', gender: 'f' },
      { ru: 'продвиже́ние', translit: 'prodvizheniye', en: 'promotion, advancement', pos: 'noun', gender: 'n' },
      { ru: 'колле́га', translit: 'kollega', en: 'colleague', pos: 'noun', gender: 'm' },
      { ru: 'отве́тственный', translit: 'otvetstvennyy', en: 'responsible, reliable', pos: 'adjective' }
    ],
    phrases: [
      { ru: 'Я ищу́ рабо́ту в ИТ.', translit: 'ya ishchu rabotu v it', en: 'I am looking for work in IT.' },
      { ru: 'Расскажи́те о ва́шем о́пыте.', translit: 'rasskazhite o vashem opyte', en: 'Tell me about your experience.' },
      { ru: 'Каки́е у вас на́выки?', translit: 'kakiye u vas navyki', en: 'What skills do you have?' },
      { ru: 'Я рабо́таю в кома́нде разрабо́тчиков.', translit: 'ya rabotayu v komande razrabotchikov', en: 'I work in a team of developers.' },
      { ru: 'Э́то хоро́шая возможно́сть для ро́ста.', translit: 'eto khoroshaya vozmozhnost dlya rosta', en: 'This is a good opportunity for growth.' }
    ]
  },
  {
    id: 'news', title: 'News register', titleRu: 'Язы́к новосте́й', level: 'B2', icon: '📰',
    desc: 'The formal register of news and analysis — read headlines and understand reports.',
    terms: [
      { ru: 'сообще́ние', translit: 'soobshcheniye', en: 'report, message', pos: 'noun', gender: 'n' },
      { ru: 'исто́чник', translit: 'istochnik', en: 'source', pos: 'noun', gender: 'm' },
      { ru: 'заявле́ние', translit: 'zayavleniye', en: 'statement', pos: 'noun', gender: 'n' },
      { ru: 'предста́витель', translit: 'predstavitel', en: 'representative', pos: 'noun', gender: 'm' },
      { ru: 'согла́сно да́нным', translit: 'soglasno dannym', en: 'according to the data', pos: 'phrase' },
      { ru: 'иссле́дование', translit: 'issledovaniye', en: 'study, research', pos: 'noun', gender: 'n' },
      { ru: 'причи́на', translit: 'prichina', en: 'cause', pos: 'noun', gender: 'f' },
      { ru: 'после́дствия', translit: 'posledstviya', en: 'consequences', pos: 'noun', gender: 'p' },
      { ru: 'влия́ние', translit: 'vliyaniye', en: 'influence, impact', pos: 'noun', gender: 'n' },
      { ru: 'рост', translit: 'rost', en: 'growth', pos: 'noun', gender: 'm' },
      { ru: 'сниже́ние', translit: 'snizheniye', en: 'decrease, decline', pos: 'noun', gender: 'n' },
      { ru: 'заяви́ть', translit: 'zayavit', en: 'to state, to declare', pos: 'verb' },
      { ru: 'опро́с', translit: 'opros', en: 'survey, poll', pos: 'noun', gender: 'm' },
      { ru: 'статья́', translit: 'statya', en: 'article', pos: 'noun', gender: 'f' }
    ],
    phrases: [
      { ru: 'Согласно да́нным опро́са…', translit: 'soglasno dannym oprosa', en: 'According to the survey data…' },
      { ru: 'Вла́сти заяви́ли о ме́рах.', translit: 'vlasti zayavili o merakh', en: 'The authorities announced measures.' },
      { ru: 'Э́то мо́жет име́ть серьёзные после́дствия.', translit: 'eto mozhet imet seryoznyye posledstviya', en: 'This could have serious consequences.' },
      { ru: 'Заме́чен рост эконо́мики.', translit: 'zamechen rost ekonomiki', en: 'Economic growth has been observed.' },
      { ru: 'По да́нным иссле́дования…', translit: 'po dannym issledovaniya', en: 'According to the study…' }
    ]
  }
];

// Give every term and phrase a stable id so it can be tracked in review and search.
for (const m of CYBER_MODULES) {
  (m.terms || []).forEach((t, i) => { if (!t.id) t.id = `cyb-${m.id}-${i}`; });
  (m.phrases || []).forEach((p, i) => { if (!p.id) p.id = `cyb-${m.id}-p${i}`; });
}

export function allCyberTerms() {
  const out = [];
  for (const m of CYBER_MODULES) {
    for (const t of m.terms || []) out.push({ ...t, module: m.id });
    for (const p of m.phrases || []) out.push({ id: 'ph-' + m.id + '-' + out.length, ...p, pos: 'phrase', module: m.id, isPhrase: true });
  }
  return out;
}

export function cyberModuleById(id) {
  return CYBER_MODULES.find((m) => m.id === id) || null;
}

export default { CYBER_MODULES, allCyberTerms, cyberModuleById };
