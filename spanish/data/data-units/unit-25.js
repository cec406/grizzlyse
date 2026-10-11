// Unit 25 — Work & studies. B1.
export const unit = {
  id: 'u25',
  level: 'B1',
  number: 25,
  title: 'Work & studies',
  titleEs: 'Trabajo y estudios',
  story: 'Whether you are asking for a table in Spanish or landing a job, the workplace has its own script. This unit covers jobs, the job interview, and how to talk about your experience, your skills and your studies.',
  grammar: [
    {
      topic: 'Vocations: yo trabajo como ...',
      explanation: 'To say what you do for a living, use trabajar como or simplemente the verb ser: trabajo como maestro or soy maestro. To ask someone, say ¿En qué trabajas? and ¿A qué te dedicas?',
      table: [
        ['Spanish', 'English'],
        ['Trabajo como ingeniero.', 'I work as an engineer.'],
        ['Soy enfermera en un hospital.', 'I am a nurse at a hospital.'],
        ['¿En qué trabajas?', 'What do you do for a living?'],
        ['Trabajo por mi cuenta.', 'I work for myself.']
      ],
      examples: [
        { es: 'Trabajo como maestro de escuela.', trans: 'tra-BA-ho KO-mo ma-EHS-tro deh es-KWEH-la', en: 'I work as a school teacher.' },
        { es: 'Estudia derecho en la universidad.', trans: 'es-TOO-dya deh-REH-cho en la oo-nee-behr-see-DAD', en: 'He studies law at the university.' }
      ]
    },
    {
      topic: 'The job interview',
      explanation: 'In an interview you need a few fixed phrases: ¿Cuál es su experiencia? (What is your experience?), ¿Por qué quiere trabajar aquí? (Why do you want to work here?), and to answer with tengo experiencia en ... and busco un sueldo/retos nuevos.',
      table: [
        ['Interviewer', 'You'],
        ['¿Cuál es su experiencia?', 'Tengo tres años de experiencia en ventas.'],
        ['¿Por qué quiere esta posición?', 'Quiero un nuevo reto y crecer profesionalmente.'],
        ['¿Cuándo puede empezar?', 'Puedo empezar el próximo lunes.']
      ],
      examples: [
        { es: 'Hablo de mi experiencia en la entrevista.', trans: 'AH-blo deh mee eks-peh-RYEN-sya en la en-treh-BEES-ta', en: 'I talk about my experience in the interview.' },
        { es: 'Estoy buscando un trabajo estable.', trans: 'es-TOY boos-KAN-do oon tra-BA-ho es-TA-bleh', en: 'I am looking for a stable job.' }
      ]
    },
    {
      topic: 'por / para en el trabajo',
      explanation: 'Work uses por and para a lot: trabajo por horas (by the hour), gracias por su tiempo (thank you for your time), trabajo para una empresa grande (for a big company), estudié para abogado (in order to be a lawyer).',
      table: [
        ['Use', 'Spanish', 'English'],
        ['by (per)', 'Pago por día.', 'I pay by the day.'],
        ['for (employer)', 'Trabajo para un banco.', 'I work for a bank.'],
        ['in order to', 'Estudio para ser médico.', 'I study in order to be a doctor.'],
        ['thanks for', 'Gracias por su tiempo.', 'Thank you for your time.']
      ],
      examples: [
        { es: 'Trabajo para una empresa de tecnología.', trans: 'tra-BA-ho PA-ra OO-na em-PREH-sa deh tek-no-lo-HEE-a', en: 'I work for a technology company.' },
        { es: 'Estudio por las noches después del trabajo.', trans: 'es-TOO-dyo por las NO-ches des-PWES del tra-BA-ho', en: 'I study at night after work.' }
      ]
    }
  ],
  vocabulary: [
    { id: 'u25-trabajo', es: 'trabajo', translit: 'tra-BA-ho', en: 'work / job', pos: 'noun', gender: 'm' },
    { id: 'u25-empresa', es: 'empresa', translit: 'em-PREH-sa', en: 'company', pos: 'noun', gender: 'f' },
    { id: 'u25-carrera', es: 'carrera', translit: 'kah-REH-ra', en: 'career', pos: 'noun', gender: 'f' },
    { id: 'u25-estudiar', es: 'estudiar', translit: 'es-too-DYAR', en: 'to study', pos: 'verb' },
    { id: 'u25-sueldo', es: 'sueldo', translit: 'SWEL-do', en: 'salary', pos: 'noun', gender: 'm' },
    { id: 'u25-entrevista', es: 'entrevista', translit: 'en-treh-BEES-ta', en: 'interview', pos: 'noun', gender: 'f' },
    { id: 'u25-experiencia', es: 'experiencia', translit: 'eks-peh-RYEN-sya', en: 'experience', pos: 'noun', gender: 'f' },
    { id: 'u25-habilidad', es: 'habilidad', translit: 'ah-bee-lee-DAD', en: 'skill', pos: 'noun', gender: 'f' },
    { id: 'u25-curriculum', es: 'currículum', translit: 'koo-REE-koo-loom', en: 'résumé', pos: 'noun', gender: 'm' },
    { id: 'u25-idioma', es: 'idioma', translit: 'ee-DYO-ma', en: 'language', pos: 'noun', gender: 'm' },
    { id: 'u25-contratar', es: 'contratar', translit: 'kon-tra-TAR', en: 'to hire', pos: 'verb' },
    { id: 'u25-buscar', es: 'buscar', translit: 'boos-KAR', en: 'to look for', pos: 'verb' },
    { id: 'u25-titulo', es: 'título', translit: 'TEE-too-lo', en: 'degree', pos: 'noun', gender: 'm' },
    { id: 'u25-responsable', es: 'responsable', translit: 'res-pon-SA-bleh', en: 'responsible', pos: 'adjective' },
    { id: 'u25-mejor', es: 'mejor', translit: 'meh-HOR', en: 'better', pos: 'adjective' },
    { id: 'u25-nuevo', es: 'nuevo', translit: 'NWEH-bo', en: 'new', pos: 'adjective' }
  ],
  phrases: [
    { id: 'p-u25-1', es: 'Estoy buscando empleo.', trans: 'es-TOY boos-KAN-do em-PLEH-o', en: 'I am looking for a job.' },
    { id: 'p-u25-2', es: 'Quiero una carrera en tecnología.', trans: 'KYEH-ro OO-na kah-REH-ra en tek-no-lo-HEE-a', en: 'I want a career in technology.' },
    { id: 'p-u25-3', es: '¿Cuál es el sueldo?', trans: 'kwal es el SWEL-do', en: 'What is the salary?' }
  ],
  sentences: [
    { es: 'Estoy buscando un trabajo cerca de mi casa.', translit: 'es-TOY boos-KAN-do oon tra-BA-ho SER-ka deh mee KA-sa', en: 'I am looking for a job near my house.', words: [{ id: 'u25-buscar', es: 'buscando', en: 'looking for' }, { id: 'u25-trabajo', es: 'trabajo', en: 'job' }] },
    { es: 'La empresa quiere contratar a un ingeniero.', translit: 'la em-PREH-sa KYEH-reh kon-tra-TAR a oon een-heh-NYEH-ro', en: 'The company wants to hire an engineer.', words: [{ id: 'u25-empresa', es: 'empresa', en: 'company' }, { id: 'u25-contratar', es: 'contratar', en: 'to hire' }] },
    { es: 'Mi entrevista fue bien; hablé de mi experiencia.', translit: 'mee en-treh-BEES-ta fweh byen ah-BLEH deh mee eks-peh-RYEN-sya', en: 'My interview went well; I talked about my experience.', words: [{ id: 'u25-entrevista', es: 'entrevista', en: 'interview' }, { id: 'u25-experiencia', es: 'experiencia', en: 'experience' }] },
    { es: 'Estudiar dos idiomas es una gran habilidad.', translit: 'es-too-DYAR dos ee-DYO-mas es OO-na gran ah-bee-lee-DAD', en: 'Speaking two languages is a great skill.', words: [{ id: 'u25-estudiar', es: 'Estudiar', en: 'to study' }, { id: 'u25-idioma', es: 'idiomas', en: 'languages' }, { id: 'u25-habilidad', es: 'habilidad', en: 'skill' }] },
    { es: 'Mi currículum tiene mi título y mi experiencia.', translit: 'mee koo-REE-koo-loom TYEH-neh mee TEE-too-lo ee mee eks-peh-RYEN-sya', en: 'My résumé has my degree and my experience.', words: [{ id: 'u25-curriculum', es: 'currículum', en: 'résumé' }, { id: 'u25-titulo', es: 'título', en: 'degree' }, { id: 'u25-experiencia', es: 'experiencia', en: 'experience' }] },
    { es: 'Soy responsable, pero busco un mejor sueldo.', translit: 'soy res-pon-SA-bleh PEH-ro BOOS-ko oon meh-HOR SWEL-do', en: 'I am responsible, but I am looking for a better salary.', words: [{ id: 'u25-responsable', es: 'responsable', en: 'responsible' }, { id: 'u25-buscar', es: 'busco', en: 'I look for' }, { id: 'u25-mejor', es: 'mejor', en: 'better' }, { id: 'u25-sueldo', es: 'sueldo', en: 'salary' }] }
  ],
  dialogue: {
    title: 'A job interview (Una entrevista de trabajo)',
    lines: [
      { who: 'Reclutador', es: '¿Qué experiencia tiene?', en: 'What experience do you have?' },
      { who: 'Elena', es: 'Trabajé tres años en una empresa de tecnología.', en: 'I worked three years at a technology company.' },
      { who: 'Reclutador', es: '¿Por qué quiere trabajar aquí?', en: 'Why do you want to work here?' },
      { who: 'Elena', es: 'Porque busco nuevos retos y un buen sueldo.', en: 'Because I am looking for new challenges and a good salary.' },
      { who: 'Reclutador', es: 'Habla dos idiomas, ¿verdad?', en: 'You speak two languages, right?' },
      { who: 'Elena', es: 'Sí, hablo español e inglés.', en: 'Yes, I speak Spanish and English.' }
    ],
    questions: [
      { type: 'mc-en', q: 'What does the recruiter ask first?', options: ['about her experience', 'about her age', 'about her hobbies', 'about her family'], answer: 'about her experience' },
      { type: 'mc-en', q: 'Why does Elena want this job?', options: ['new challenges and a good salary', 'to travel', 'to be famous', 'to relax'], answer: 'new challenges and a good salary' },
      { type: 'mc-en', q: 'Which languages does Elena speak?', options: ['Spanish and English', 'Spanish and French', 'English and German', 'only Spanish'], answer: 'Spanish and English' }
    ]
  },
  quiz: [
    { type: 'mc-en', q: '¿Qué significa «trabajo»?', options: ['work / job', 'school', 'house', 'car'], answer: 'work / job', es: 'trabajo' },
    { type: 'mc-es', q: 'How do you say to study?', options: ['estudiar', 'trabajar', 'buscar', 'contratar'], answer: 'estudiar', es: 'estudiar' },
    { type: 'typing', q: 'Type salary in Spanish', answer: 'sueldo', accepts: [], es: 'sueldo' },
    { type: 'mc-en', q: '¿Qué significa «entrevista»?', options: ['interview', 'invitation', 'investigation', 'invention'], answer: 'interview', es: 'entrevista' },
    { type: 'mc-es', q: 'Complete: Quiero ___ una empresa grande.', options: ['trabajar en', 'trabajar para', 'trabajar a', 'trabajar con'], answer: 'trabajar en', es: 'quiero trabajar en una empresa grande' },
    { type: 'typing', q: 'Type company in Spanish', answer: 'empresa', accepts: [], es: 'empresa' },
    { type: 'mc-en', q: '¿Qué significa «habilidad»?', options: ['skill', 'habit', 'happiness', 'health'], answer: 'skill', es: 'habilidad' },
    { type: 'mc-es', q: 'Which word means to hire?', options: ['contratar', 'comprar', 'crear', 'contar'], answer: 'contratar', es: 'contratar' },
    { type: 'mc-en', q: '¿Qué significa «carrera»?', options: ['career', 'carrot', 'card', 'camera'], answer: 'career', es: 'carrera' },
    { type: 'mc-es', q: 'Complete: Tengo experiencia ___ ventas.', options: ['en', 'de', 'a', 'por'], answer: 'en', es: 'tengo experiencia en ventas' },
    { type: 'typing', q: 'Type résumé in Spanish', answer: 'currículum', accepts: [], es: 'currículum' },
    { type: 'mc-en', q: '¿Qué significa «responsable»?', options: ['responsible', 'restless', 'resourceful', 'respectful'], answer: 'responsible', es: 'responsable' }
  ],
  test: {
    title: 'Unit 25 test — Work & studies',
    questions: [
      { type: 'mc-en', q: '¿Qué significa «Estoy buscando empleo»?', options: ['I am looking for a job', 'I am losing my job', 'I am changing my job', 'I found a job'], answer: 'I am looking for a job', es: 'estoy buscando empleo' },
      { type: 'mc-es', q: 'How do you say I work as an engineer?', options: ['Trabajo como ingeniero', 'Trabajo de ingeniería', 'Trabajo ingeniero', 'Soy trabajar ingeniero'], answer: 'Trabajo como ingeniero', es: 'trabajo como ingeniero' },
      { type: 'typing', q: 'Type degree in Spanish', answer: 'título', accepts: [], es: 'título' },
      { type: 'mc-en', q: '¿Qué significa «idioma»?', options: ['language', 'idiom', 'island', 'identity'], answer: 'language', es: 'idioma' },
      { type: 'mc-es', q: 'Complete: Estudia ___ ser médico.', options: ['para', 'por', 'a', 'de'], answer: 'para', es: 'estudia para ser médico' },
      { type: 'typing', q: 'Type experience in Spanish', answer: 'experiencia', accepts: [], es: 'experiencia' },
      { type: 'mc-en', q: '¿Qué significa «sueldo»?', options: ['salary', 'support', 'shelter', 'studio'], answer: 'salary', es: 'sueldo' },
      { type: 'mc-es', q: 'In an interview, ask about salary.', options: ['¿Cuál es el sueldo?', '¿Cuál es la casa?', '¿Cuál es el perro?', '¿Cuál es la ciudad?'], answer: '¿Cuál es el sueldo?', es: '¿cuál es el sueldo?' },
      { type: 'typing', q: 'Type to look for in Spanish', answer: 'buscar', accepts: [], es: 'buscar' },
      { type: 'mc-en', q: '¿Qué significa «nuevo»?', options: ['new', 'old', 'next', 'null'], answer: 'new', es: 'nuevo' },
      { type: 'mc-es', q: 'Complete: Trabajo ___ horas en el hospital.', options: ['por', 'para', 'de', 'en'], answer: 'por', es: 'trabajo por horas en el hospital' },
      { type: 'typing', q: 'Type better in Spanish', answer: 'mejor', accepts: [], es: 'mejor' }
    ]
  }
};