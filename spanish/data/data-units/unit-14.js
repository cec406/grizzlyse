// Unit 14 — Work & jobs. A2.
export const unit = {
  id: 'u14',
  level: 'A2',
  number: 14,
  title: 'Work & jobs',
  titleEs: 'El trabajo',
  story: 'You are interviewing for a summer job at a hotel in San Juan. This unit gives you the jobs, the workplace words, and the key structure tener que + infinitive to talk about obligations. By the end you can describe your schedule, say when you start, and answer interview questions with confidence.',
  grammar: [
    {
      topic: 'tener que + infinitive',
      explanation: 'To say you have to do something, use a form of tener + que + infinitive. Tengo que trabajar means I have to work. The que never changes.',
      table: [
        ['Spanish', 'English'],
        ['Tengo que trabajar.', 'I have to work.'],
        ['Tienes que llegar temprano.', 'You have to arrive early.'],
        ['Tenemos que terminar hoy.', 'We have to finish today.'],
        ['¿Tiene que usar uniforme?', 'Do you have to wear a uniform?']
      ],
      examples: [
        { es: 'Tengo que llegar a las ocho.', trans: 'TEHN-goh keh yeh-GAR ah lahs OH-choh', en: 'I have to arrive at eight.' },
        { es: 'Tenemos que trabajar el sábado.', trans: 'teh-NEH-mos keh trah-bah-HAR el SAH-bah-doh', en: 'We have to work on Saturday.' }
      ]
    },
    {
      topic: 'empezar and terminar',
      explanation: 'Use empezar (to start) and terminar (to finish) to talk about your day. Empezar changes e to ie: empiezo, empiezas, empieza, empezamos. Terminar is regular.',
      table: [
        ['Spanish', 'English'],
        ['Empiezo a las nueve.', 'I start at nine.'],
        ['El turno empieza temprano.', 'The shift starts early.'],
        ['Termino a las cinco.', 'I finish at five.'],
        ['¿Cuándo termina la reunión?', 'When does the meeting end?']
      ],
      examples: [
        { es: 'El turno empieza a las seis.', trans: 'el TOOR-noh em-PYEH-sah ah lahs SEES', en: 'The shift starts at six.' },
        { es: 'Termino el trabajo a las cinco.', trans: 'tehr-MEE-noh el trah-BAH-hoh ah lahs SEEN-koh', en: 'I finish work at five.' }
      ]
    },
    {
      topic: 'trabajar and the job words',
      explanation: 'Trabajar means to work and is regular. To say what someone does, use ser + job: Soy mesero (I am a waiter), Ella es enfermera (She is a nurse). Most job words do not need an article after ser.',
      table: [
        ['Spanish', 'English'],
        ['Trabajo en una oficina.', 'I work in an office.'],
        ['Soy cocinero.', 'I am a cook.'],
        ['Ella es enfermera.', 'She is a nurse.'],
        ['Mi jefe es muy ocupado.', 'My boss is very busy.']
      ],
      examples: [
        { es: 'Trabajo en un hotel.', trans: 'trah-BAH-hoh en oon oh-TEL', en: 'I work in a hotel.' },
        { es: 'Soy mesero en un restaurante.', trans: 'soy meh-SEH-roh en oon rehs-tow-RAHN-teh', en: 'I am a waiter in a restaurant.' }
      ]
    }
  ],
  vocabulary: [
    { id: 'u14-trabajo', es: 'el trabajo', translit: 'el trah-BAH-hoh', en: 'work / job', pos: 'noun', gender: 'm' },
    { id: 'u14-jefe', es: 'el jefe', translit: 'el HEH-feh', en: 'boss', pos: 'noun', gender: 'm' },
    { id: 'u14-empresa', es: 'la empresa', translit: 'lah em-PREH-sah', en: 'company', pos: 'noun', gender: 'f' },
    { id: 'u14-oficina', es: 'la oficina', translit: 'lah oh-fee-SEE-nah', en: 'office', pos: 'noun', gender: 'f' },
    { id: 'u14-turno', es: 'el turno', translit: 'el TOOR-noh', en: 'shift', pos: 'noun', gender: 'm' },
    { id: 'u14-horario', es: 'el horario', translit: 'el oh-RAH-ryoh', en: 'schedule', pos: 'noun', gender: 'm' },
    { id: 'u14-sueldo', es: 'el sueldo', translit: 'el SWEHL-doh', en: 'salary', pos: 'noun', gender: 'm' },
    { id: 'u14-reunion', es: 'la reunión', translit: 'lah reh-oo-NYON', en: 'meeting', pos: 'noun', gender: 'f' },
    { id: 'u14-descanso', es: 'el descanso', translit: 'el des-KAHN-soh', en: 'break', pos: 'noun', gender: 'm' },
    { id: 'u14-cliente', es: 'el cliente', translit: 'el KLYEHN-teh', en: 'client', pos: 'noun', gender: 'm' },
    { id: 'u14-entrevista', es: 'la entrevista', translit: 'lah ehn-treh-VEES-tah', en: 'interview', pos: 'noun', gender: 'f' },
    { id: 'u14-maestro', es: 'el maestro', translit: 'el mah-EHS-troh', en: 'teacher', pos: 'noun', gender: 'm' },
    { id: 'u14-cocinero', es: 'el cocinero', translit: 'el koh-see-NEH-roh', en: 'cook', pos: 'noun', gender: 'm' },
    { id: 'u14-mesero', es: 'el mesero', translit: 'el meh-SEH-roh', en: 'waiter', pos: 'noun', gender: 'm' },
    { id: 'u14-piloto', es: 'el piloto', translit: 'el pee-LOH-toh', en: 'pilot', pos: 'noun', gender: 'm' },
    { id: 'u14-abogado', es: 'el abogado', translit: 'el ah-boh-GAH-doh', en: 'lawyer', pos: 'noun', gender: 'm' },
    { id: 'u14-enfermera', es: 'la enfermera', translit: 'lah ehn-fehr-MEH-rah', en: 'nurse', pos: 'noun', gender: 'f' },
    { id: 'u14-secretaria', es: 'la secretaria', translit: 'lah seh-kreh-TAH-ryah', en: 'secretary', pos: 'noun', gender: 'f' },
    { id: 'u14-trabajar', es: 'trabajar', translit: 'trah-bah-HAR', en: 'to work', pos: 'verb' },
    { id: 'u14-empezar', es: 'empezar', translit: 'em-peh-SAR', en: 'to start', pos: 'verb' },
    { id: 'u14-terminar', es: 'terminar', translit: 'tehr-mee-NAR', en: 'to finish', pos: 'verb' },
    { id: 'u14-tenerque', es: 'tener que', translit: 'teh-NEHR keh', en: 'to have to', pos: 'phrase' },
    { id: 'u14-temprano', es: 'temprano', translit: 'tehm-PRAH-noh', en: 'early', pos: 'adverb' },
    { id: 'u14-tarde', es: 'tarde', translit: 'TAR-deh', en: 'late', pos: 'adverb' },
    { id: 'u14-ocupado', es: 'ocupado', translit: 'oh-koo-PAH-doh', en: 'busy', pos: 'adjective' }
  ],
  phrases: [
    { id: 'p-u14-1', es: 'Tengo que trabajar.', trans: 'TEHN-goh keh trah-bah-HAR', en: 'I have to work.' },
    { id: 'p-u14-2', es: '¿Cuál es su horario?', trans: 'kwal es soo oh-RAH-ryoh', en: 'What is your schedule?' },
    { id: 'p-u14-3', es: 'Empiezo a las ocho.', trans: 'em-PYEH-soh ah lahs OH-choh', en: 'I start at eight.' },
    { id: 'p-u14-4', es: 'Estoy muy ocupado.', trans: 'es-TOY mooee oh-koo-PAH-doh', en: 'I am very busy.' }
  ],
  sentences: [
    { es: 'Trabajo en una oficina.', translit: 'trah-BAH-hoh en OO-nah oh-fee-SEE-nah', en: 'I work in an office.', words: [{ id: 'u14-trabajar', es: 'Trabajo', en: 'I work' }, { id: 'u14-oficina', es: 'oficina', en: 'office' }] },
    { es: 'Tengo que llegar temprano a la reunión.', translit: 'TEHN-goh keh yeh-GAR tehm-PRAH-noh ah lah reh-oo-NYON', en: 'I have to arrive early to the meeting.', words: [{ id: 'u14-tenerque', es: 'Tengo que', en: 'I have to' }, { id: 'u14-temprano', es: 'temprano', en: 'early' }, { id: 'u14-reunion', es: 'reunión', en: 'meeting' }] },
    { es: 'Mi jefe es muy ocupado.', translit: 'mee HEH-feh es mooee oh-koo-PAH-doh', en: 'My boss is very busy.', words: [{ id: 'u14-jefe', es: 'jefe', en: 'boss' }, { id: 'u14-ocupado', es: 'ocupado', en: 'busy' }] },
    { es: 'La enfermera trabaja de noche.', translit: 'lah ehn-fehr-MEH-rah trah-BAH-hah deh NOH-cheh', en: 'The nurse works at night.', words: [{ id: 'u14-enfermera', es: 'enfermera', en: 'nurse' }, { id: 'u14-trabajar', es: 'trabaja', en: 'works' }] },
    { es: 'Empezamos el turno a las ocho.', translit: 'em-peh-SAH-mos el TOOR-noh ah lahs OH-choh', en: 'We start the shift at eight.', words: [{ id: 'u14-empezar', es: 'Empezamos', en: 'We start' }, { id: 'u14-turno', es: 'turno', en: 'shift' }] },
    { es: 'Termino el trabajo a las cinco.', translit: 'tehr-MEE-noh el trah-BAH-hoh ah lahs SEEN-koh', en: 'I finish work at five.', words: [{ id: 'u14-terminar', es: 'Termino', en: 'I finish' }, { id: 'u14-trabajo', es: 'trabajo', en: 'work' }] },
    { es: 'El sueldo es bueno en esta empresa.', translit: 'el SWEHL-doh es BWEH-noh en ES-tah em-PREH-sah', en: 'The salary is good at this company.', words: [{ id: 'u14-sueldo', es: 'sueldo', en: 'salary' }, { id: 'u14-empresa', es: 'empresa', en: 'company' }] },
    { es: 'Tengo una entrevista con el jefe.', translit: 'TEHN-goh OO-nah ehn-treh-VEES-tah kon el HEH-feh', en: 'I have an interview with the boss.', words: [{ id: 'u14-entrevista', es: 'entrevista', en: 'interview' }, { id: 'u14-jefe', es: 'jefe', en: 'boss' }] }
  ],
  dialogue: {
    title: 'En la entrevista de trabajo (At the job interview)',
    lines: [
      { who: 'Señora López', es: 'Buenos días. ¿Está listo para la entrevista?', en: 'Good morning. Are you ready for the interview?' },
      { who: 'Luis', es: 'Buenos días, señora. Sí, estoy listo.', en: 'Good morning, ma am. Yes, I am ready.' },
      { who: 'Señora López', es: '¿Dónde trabaja ahora?', en: 'Where do you work now?' },
      { who: 'Luis', es: 'Trabajo en un hotel. Soy mesero.', en: 'I work in a hotel. I am a waiter.' },
      { who: 'Señora López', es: '¿Puede trabajar los fines de semana?', en: 'Can you work on weekends?' },
      { who: 'Luis', es: 'Sí. Tengo que estudiar, pero puedo trabajar los sábados.', en: 'Yes. I have to study, but I can work on Saturdays.' },
      { who: 'Señora López', es: 'Muy bien. ¿Cuándo puede empezar?', en: 'Very well. When can you start?' },
      { who: 'Luis', es: 'Puedo empezar el lunes.', en: 'I can start on Monday.' }
    ],
    questions: [
      { type: 'mc-en', q: '¿Qué está haciendo Luis?', options: ['a job interview', 'shopping', 'seeing a doctor', 'taking a taxi'], answer: 'a job interview' },
      { type: 'mc-en', q: '¿Cuál es el trabajo de Luis ahora?', options: ['waiter', 'cook', 'pilot', 'teacher'], answer: 'waiter' },
      { type: 'mc-en', q: '¿Puede trabajar los fines de semana?', options: ['on Saturdays, yes', 'no, never', 'only Sundays', 'he does not know'], answer: 'on Saturdays, yes' },
      { type: 'mc-en', q: '¿Cuándo puede empezar?', options: ['on Monday', 'today', 'next month', 'on Friday'], answer: 'on Monday' }
    ]
  },
  quiz: [
    { type: 'mc-en', q: '¿Qué significa «el jefe»?', options: ['boss', 'client', 'waiter', 'salary'], answer: 'boss', es: 'el jefe' },
    { type: 'mc-en', q: '¿Qué significa «la oficina»?', options: ['office', 'company', 'shift', 'meeting'], answer: 'office', es: 'la oficina' },
    { type: 'mc-en', q: '¿Qué significa «el sueldo»?', options: ['salary', 'schedule', 'break', 'interview'], answer: 'salary', es: 'el sueldo' },
    { type: 'mc-es', q: 'How do you say to work?', options: ['trabajar', 'empezar', 'terminar', 'descansar'], answer: 'trabajar', es: 'trabajar' },
    { type: 'mc-es', q: 'How do you say nurse?', options: ['la enfermera', 'el mesero', 'el cocinero', 'el piloto'], answer: 'la enfermera', es: 'la enfermera' },
    { type: 'mc-en', q: '¿Qué significa «el turno»?', options: ['shift', 'break', 'client', 'meeting'], answer: 'shift', es: 'el turno' },
    { type: 'mc-en', q: '¿Qué significa «temprano»?', options: ['early', 'late', 'busy', 'ready'], answer: 'early', es: 'temprano' },
    { type: 'typing', q: 'Type the phrase to have to in Spanish (two words).', answer: 'tener que', accepts: [], es: 'tener que' },
    { type: 'typing', q: 'Type the word for office in Spanish (with the article).', answer: 'la oficina', accepts: ['oficina'], es: 'la oficina' },
    { type: 'mc-es', q: 'Say I have to work.', options: ['tengo que trabajar', 'puedo trabajar', 'quiero trabajar', 'trabajo mucho'], answer: 'tengo que trabajar', es: 'tengo que trabajar' },
    { type: 'mc-en', q: '¿Qué significa «el cliente»?', options: ['client', 'boss', 'cook', 'salary'], answer: 'client', es: 'el cliente' },
    { type: 'mc-es', q: 'Which verb means to finish?', options: ['terminar', 'empezar', 'trabajar', 'llegar'], answer: 'terminar', es: 'terminar' },
    { type: 'mc-en', q: '¿Qué significa «ocupado»?', options: ['busy', 'early', 'late', 'tired'], answer: 'busy', es: 'ocupado' }
  ],
  test: {
    title: 'Unit 14 test — Work & jobs',
    questions: [
      { type: 'mc-en', q: '¿Qué significa «el horario»?', options: ['schedule', 'salary', 'shift', 'office'], answer: 'schedule', es: 'el horario' },
      { type: 'mc-es', q: 'Say I start at eight.', options: ['empiezo a las ocho', 'termino a las ocho', 'trabajo a las ocho', 'llego a las ocho'], answer: 'empiezo a las ocho', es: 'empiezo a las ocho' },
      { type: 'mc-en', q: '¿Qué significa «la empresa»?', options: ['company', 'office', 'meeting', 'client'], answer: 'company', es: 'la empresa' },
      { type: 'typing', q: 'Type the word for waiter in Spanish (with the article).', answer: 'el mesero', accepts: ['mesero'], es: 'el mesero' },
      { type: 'mc-es', q: 'Which verb means to start?', options: ['empezar', 'terminar', 'trabajar', 'descansar'], answer: 'empezar', es: 'empezar' },
      { type: 'mc-en', q: '¿Qué significa «la reunión»?', options: ['meeting', 'shift', 'break', 'salary'], answer: 'meeting', es: 'la reunión' },
      { type: 'mc-en', q: '¿Qué significa «el descanso»?', options: ['break', 'shift', 'schedule', 'interview'], answer: 'break', es: 'el descanso' },
      { type: 'typing', q: 'Type the word for work in Spanish (the noun, with the article).', answer: 'el trabajo', accepts: ['trabajo'], es: 'el trabajo' },
      { type: 'mc-es', q: 'Which word means teacher?', options: ['el maestro', 'el cocinero', 'el mesero', 'el abogado'], answer: 'el maestro', es: 'el maestro' },
      { type: 'mc-en', q: '¿Qué significa «la entrevista»?', options: ['interview', 'meeting', 'schedule', 'company'], answer: 'interview', es: 'la entrevista' },
      { type: 'mc-es', q: 'Say I have to study.', options: ['tengo que estudiar', 'puedo estudiar', 'quiero estudiar', 'estudio mucho'], answer: 'tengo que estudiar', es: 'tengo que estudiar' },
      { type: 'mc-en', q: '¿Qué significa «tarde»?', options: ['late', 'early', 'busy', 'ready'], answer: 'late', es: 'tarde' }
    ]
  }
};
