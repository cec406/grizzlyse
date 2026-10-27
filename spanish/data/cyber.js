// Advanced track: the language of the modern digital workplace (Spanish).
//
// Scope note: this is *language* content only — professional and technology
// register Spanish for reading technical material, working with colleagues and
// understanding security-awareness texts. No offensive tradecraft.

export const CYBER_MODULES = [
  {
    id: 'it-support', title: 'IT & help desk', titleEs: 'Informática y soporte técnico', level: 'B1', icon: '🖥',
    desc: 'Vocabulary for computers, tickets and technical support conversations.',
    terms: [
      { es: 'soporte técnico', translit: 'soh-POR-teh TEK-nee-koh', en: 'technical support', pos: 'phrase' },
      { es: 'solicitud', translit: 'soh-lee-see-TOOD', en: 'request, ticket', pos: 'noun', gender: 'f' },
      { es: 'fallo', translit: 'FAH-yoh', en: 'failure, fault', pos: 'noun', gender: 'm' },
      { es: 'avería', translit: 'ah-beh-REE-ah', en: 'breakdown, malfunction', pos: 'noun', gender: 'f' },
      { es: 'reiniciar', translit: 'rray-nee-SYAR', en: 'to restart, to reboot', pos: 'verb' },
      { es: 'instalación', translit: 'een-stah-lah-SYOHN', en: 'installation', pos: 'noun', gender: 'f' },
      { es: 'actualización', translit: 'ak-twah-lee-sah-SYOHN', en: 'update', pos: 'noun', gender: 'f' },
      { es: 'configuración', translit: 'kon-fee-goo-rah-SYOHN', en: 'configuration, setting', pos: 'noun', gender: 'f' },
      { es: 'acceso', translit: 'ak-SEH-soh', en: 'access', pos: 'noun', gender: 'm' },
      { es: 'cuenta', translit: 'KWEN-tah', en: 'account', pos: 'noun', gender: 'f' },
      { es: 'contraseña', translit: 'kon-trah-SEH-nyah', en: 'password', pos: 'noun', gender: 'f' },
      { es: 'error', translit: 'eh-RROR', en: 'error, bug', pos: 'noun', gender: 'm' },
      { es: 'copia de seguridad', translit: 'KOH-pyoh deh seh-goo-ree-DAHD', en: 'backup', pos: 'phrase' },
      { es: 'usuario', translit: 'oo-SAH-ryoh', en: 'user', pos: 'noun', gender: 'm' },
      { es: 'instrucciones', translit: 'een-strook-SYOH-nes', en: 'instructions', pos: 'noun', gender: 'p' },
      { es: 'solucionar', translit: 'soh-loo-syoh-NAR', en: 'to fix, to resolve', pos: 'verb' },
      { es: 'comprobar', translit: 'kom-proh-BAR', en: 'to check, to verify', pos: 'verb' }
    ],
    phrases: [
      { es: 'Mi computadora no funciona.', translit: 'mee kom-poo-tah-DOH-rah noh foon-SYOH-nah', en: 'My computer is not working.' },
      { es: 'Intente reiniciar el sistema.', translit: 'een-TEN-teh rray-nee-SYAR el sis-TEH-mah', en: 'Try restarting the system.' },
      { es: 'Describa el problema, por favor.', translit: 'des-KREE-bah el proh-BLEH-mah por fah-BOR', en: 'Please describe the problem.' },
      { es: 'Hay que actualizar el programa.', translit: 'ay keh ak-twah-lee-SAR el proh-GRAH-mah', en: 'The software needs updating.' },
      { es: 'Abrí un ticket con soporte técnico.', translit: 'ah-BREE oon TEE-ket kon soh-POR-teh TEK-nee-koh', en: 'I filed a ticket with tech support.' },
      { es: 'El problema está resuelto.', translit: 'el proh-BLEH-mah es-TAH rreh-SWEL-toh', en: 'The problem is solved.' }
    ],
    dialogue: {
      title: 'Llamada a soporte técnico (Calling tech support)',
      lines: [
        { who: 'Cliente', es: '¡Hola! Mi programa no abre.', translit: 'OH-lah mee proh-GRAH-mah noh AH-breh', en: 'Hello! My program will not open.' },
        { who: 'Operador', es: 'Buenos días. Describa lo que pasa.', translit: 'BWEH-nohs DEE-ahs des-KREE-bah loh keh PAH-sah', en: 'Good morning. Describe what happens.' },
        { who: 'Cliente', es: 'Aparece un mensaje de error y el programa se cierra.', translit: 'ah-pah-REH-seh oon men-SAH-heh deh eh-RROR ee el proh-GRAH-mah seh SYEH-rrah', en: 'An error message appears and the program closes.' },
        { who: 'Operador', es: 'Intente actualizar el programa y reiniciar la computadora.', translit: 'een-TEN-teh ak-twah-lee-SAR el proh-GRAH-mah ee rray-nee-SYAR lah kom-poo-tah-DOH-rah', en: 'Try updating the program and restarting the computer.' },
        { who: 'Cliente', es: 'Está bien, lo intento ahora.', translit: 'es-TAH byen loh een-TEN-toh ah-OH-rah', en: 'All right, I will try now.' },
        { who: 'Operador', es: 'Si no funciona, abra una solicitud.', translit: 'see noh foon-SYOH-nah AH-brah OO-nah soh-lee-see-TOOD', en: 'If it does not work, file a ticket.' }
      ],
      questions: [
        { type: 'mc-en', q: 'What does not open for the client?', options: ['a program', 'a website', 'a printer', 'a folder'], answer: 'a program' },
        { type: 'mc-en', q: 'What does the operator suggest first?', options: ['update and restart', 'buy a new computer', 'call a friend', 'restart the router'], answer: 'update and restart' },
        { type: 'mc-en', q: 'What should the client do if it does not work?', options: ['file a ticket', 'give up', 'write an email', 'call the police'], answer: 'file a ticket' }
      ]
    }
  },
  {
    id: 'office', title: 'Office & email', titleEs: 'Oficina y correo', level: 'B1', icon: '📧',
    desc: 'Correspondence, requests and the polite formal register of the workplace.',
    terms: [
      { es: 'correo electrónico', translit: 'koh-RREH-oh eh-lek-TROH-nee-koh', en: 'email', pos: 'phrase' },
      { es: 'adjunto', translit: 'ahd-HOON-toh', en: 'attachment', pos: 'noun', gender: 'm' },
      { es: 'asunto', translit: 'ah-SOON-toh', en: 'subject (of a message)', pos: 'noun', gender: 'm' },
      { es: 'enviar', translit: 'en-BYAR', en: 'to send', pos: 'verb' },
      { es: 'recibir', translit: 'rreh-see-BEER', en: 'to receive', pos: 'verb' },
      { es: 'confirmar', translit: 'kon-feer-MAR', en: 'to confirm', pos: 'verb' },
      { es: 'recordatorio', translit: 'rreh-kor-dah-TOH-ryoh', en: 'reminder', pos: 'noun', gender: 'm' },
      { es: 'reunión', translit: 'rreh-oo-NYOHN', en: 'meeting', pos: 'noun', gender: 'f' },
      { es: 'encargo', translit: 'en-KAR-goh', en: 'assignment', pos: 'noun', gender: 'm' },
      { es: 'informe', translit: 'een-FOR-meh', en: 'report', pos: 'noun', gender: 'm' },
      { es: 'horario', translit: 'oh-RAH-ryoh', en: 'schedule', pos: 'noun', gender: 'm' },
      { es: 'vacaciones', translit: 'bah-kah-SYOH-nes', en: 'vacation, leave', pos: 'noun', gender: 'p' },
      { es: 'viaje de negocios', translit: 'BYAH-heh deh neh-GOH-syohs', en: 'business trip', pos: 'phrase' },
      { es: 'urgente', translit: 'oor-HEN-teh', en: 'urgent', pos: 'adjective' },
      { es: 'con antelación', translit: 'kon an-teh-lah-SYOHN', en: 'in advance', pos: 'phrase' },
      { es: 'atentamente', translit: 'ah-ten-tah-MEN-teh', en: 'kind regards (formal closing)', pos: 'adverb' }
    ],
    phrases: [
      { es: 'Buenos días. Le escribo sobre…', translit: 'BWEH-nohs DEE-ahs leh es-KREE-boh SOH-breh', en: 'Good morning. I am writing to you regarding…' },
      { es: 'Adjunto un archivo al correo.', translit: 'ahd-HOON-toh oon ar-CHEE-boh al koh-RREH-oh', en: 'I am attaching a file to the email.' },
      { es: 'Confirme la recepción, por favor.', translit: 'kon-FEER-meh lah rreh-sep-SYOHN por fah-BOR', en: 'Please confirm receipt.' },
      { es: 'Le recuerdo la reunión de mañana.', translit: 'leh rreh-KWER-doh lah rreh-oo-NYOHN deh mah-NYAH-nah', en: 'A reminder about tomorrow’s meeting.' },
      { es: 'Enviaré el informe antes del final del día.', translit: 'en-byah-REH el een-FOR-meh AN-tes del fee-NAHL del DEE-ah', en: 'I will send the report before the end of the day.' },
      { es: 'Gracias por la respuesta rápida.', translit: 'GRAH-syahs por lah rres-PWES-tah RRAH-pee-dah', en: 'Thank you for the quick reply.' }
    ]
  },
  {
    id: 'meetings', title: 'Meetings & projects', titleEs: 'Reuniones y proyectos', level: 'B2', icon: '📊',
    desc: 'Discuss, plan and present — the verbs and phrases of collaboration.',
    terms: [
      { es: 'orden del día', translit: 'OR-den del DEE-ah', en: 'agenda', pos: 'phrase' },
      { es: 'meta', translit: 'MEH-tah', en: 'goal, objective', pos: 'noun', gender: 'f' },
      { es: 'plazo', translit: 'PLAH-soh', en: 'deadline', pos: 'noun', gender: 'm' },
      { es: 'etapa', translit: 'eh-TAH-pah', en: 'stage, phase', pos: 'noun', gender: 'f' },
      { es: 'propuesta', translit: 'proh-PWES-tah', en: 'proposal', pos: 'noun', gender: 'f' },
      { es: 'decisión', translit: 'deh-see-SYOHN', en: 'decision', pos: 'noun', gender: 'f' },
      { es: 'riesgo', translit: 'RYES-goh', en: 'risk', pos: 'noun', gender: 'm' },
      { es: 'recursos', translit: 'rreh-KOOR-sohs', en: 'resources', pos: 'noun', gender: 'p' },
      { es: 'tarea', translit: 'tah-REH-ah', en: 'task', pos: 'noun', gender: 'f' },
      { es: 'progreso', translit: 'proh-GREH-soh', en: 'progress', pos: 'noun', gender: 'm' },
      { es: 'discutir', translit: 'dees-koo-TEER', en: 'to discuss', pos: 'verb' },
      { es: 'proponer', translit: 'proh-poh-NER', en: 'to propose', pos: 'verb' },
      { es: 'estar de acuerdo', translit: 'es-TAR deh ah-KWER-doh', en: 'to agree', pos: 'phrase' },
      { es: 'aclarar', translit: 'ah-klah-RAR', en: 'to clarify', pos: 'verb' },
      { es: 'resumir', translit: 'rreh-soo-MEER', en: 'to sum up', pos: 'verb' },
      { es: 'ser responsable de', translit: 'ser rres-pon-SAH-bleh deh', en: 'to be responsible for', pos: 'phrase' }
    ],
    phrases: [
      { es: 'Vamos a discutir el plan del proyecto.', translit: 'BAH-mohs ah dees-koo-TEER el plahn del proh-YEK-toh', en: 'Let’s discuss the project plan.' },
      { es: '¿Alguien tiene propuestas?', translit: 'AL-gyen TYEH-neh proh-PWES-tahs', en: 'Does anyone have suggestions?' },
      { es: 'Estoy de acuerdo con esta decisión.', translit: 'es-TOY deh ah-KWER-doh kon ES-tah deh-see-SYOHN', en: 'I agree with this decision.' },
      { es: 'Aclaremos los plazos.', translit: 'ah-klah-REH-mohs lohs PLAH-sohs', en: 'Let’s clarify the deadlines.' },
      { es: 'Esto está dentro de mi área de responsabilidad.', translit: 'ES-toh es-TAH DEN-troh deh mee AH-reh-ah deh rres-pon-sah-bee-lee-DAHD', en: 'That is within my area of responsibility.' },
      { es: 'Resumamos la reunión.', translit: 'rreh-soo-MEH-mohs lah rreh-oo-NYOHN', en: 'Let’s sum up the meeting.' }
    ],
    dialogue: {
      title: 'Reunión de planificación (Planning meeting)',
      lines: [
        { who: 'Jefa', es: 'Colegas, empecemos con las metas del proyecto.', translit: 'koh-LEH-gahs em-peh-SEH-mohs kon lahs MEH-tahs del proh-YEK-toh', en: 'Colleagues, let’s start with the project goals.' },
        { who: 'Ana', es: 'Propongo dividir el trabajo en tres etapas.', translit: 'proh-PON-goh dee-bee-DEER el trah-BAH-hoh en tres eh-TAH-pahs', en: 'I propose splitting the work into three stages.' },
        { who: 'Iván', es: 'Tenemos poco tiempo. ¿Cuál es el plazo?', translit: 'teh-NEH-mohs POH-koh TYEM-poh KWAHL es el PLAH-soh', en: 'We have little time. What is the deadline?' },
        { who: 'Jefa', es: 'La responsable de la tarea es Ana.', translit: 'lah rres-pon-SAH-bleh deh lah tah-REH-ah es AH-nah', en: 'The person responsible for the task is Ana.' },
        { who: 'Ana', es: 'Está bien, aclararé los detalles y enviaré el informe.', translit: 'es-TAH byen ah-klah-rah-REH lohs deh-TAH-yes ee en-byah-REH el een-FOR-meh', en: 'All right, I’ll clarify the details and send the report.' }
      ],
      questions: [
        { type: 'mc-en', q: 'How many stages does Ana propose?', options: ['three', 'two', 'four', 'five'], answer: 'three' },
        { type: 'mc-en', q: 'Who is responsible for the task?', options: ['Ana', 'Iván', 'the boss', 'nobody'], answer: 'Ana' },
        { type: 'mc-en', q: 'What will Ana send?', options: ['a report', 'an invoice', 'a contract', 'a letter'], answer: 'a report' }
      ]
    }
  },
  {
    id: 'security', title: 'Digital safety', titleEs: 'Seguridad digital', level: 'B2', icon: '🛡',
    desc: 'Security-awareness vocabulary — how safety is discussed in plain professional Spanish.',
    terms: [
      { es: 'seguridad', translit: 'seh-goo-ree-DAHD', en: 'safety, security', pos: 'noun', gender: 'f' },
      { es: 'protección', translit: 'proh-tek-SYOHN', en: 'protection', pos: 'noun', gender: 'f' },
      { es: 'protección de datos', translit: 'proh-tek-SYOHN deh DAH-tohs', en: 'data protection', pos: 'phrase' },
      { es: 'datos personales', translit: 'DAH-tohs per-soh-NAH-les', en: 'personal data', pos: 'phrase' },
      { es: 'confidencial', translit: 'kon-fee-den-SYAHL', en: 'confidential', pos: 'adjective' },
      { es: 'verificación', translit: 'beh-ree-fee-kah-SYOHN', en: 'check, verification', pos: 'noun', gender: 'f' },
      { es: 'falso', translit: 'FAHL-soh', en: 'fake, false', pos: 'adjective' },
      { es: 'fraude', translit: 'FROW-deh', en: 'fraud', pos: 'noun', gender: 'm' },
      { es: 'advertir', translit: 'ahd-ber-TEER', en: 'to warn', pos: 'verb' },
      { es: 'informar', translit: 'een-for-MAR', en: 'to report, to inform', pos: 'verb' },
      { es: 'brecha de seguridad', translit: 'BREH-chah deh seh-goo-ree-DAHD', en: 'security breach', pos: 'noun', gender: 'f' },
      { es: 'reglas', translit: 'REH-glahs', en: 'rules', pos: 'noun', gender: 'p' },
      { es: 'responsabilidad', translit: 'rres-pon-sah-bee-lee-DAHD', en: 'responsibility', pos: 'noun', gender: 'f' }
    ],
    phrases: [
      { es: 'No comparta su contraseña con nadie.', translit: 'noh kom-PAR-tah soo kon-trah-SEH-nyah kon NAH-dyeh', en: 'Do not share your password with anyone.' },
      { es: 'Este correo es fraudulento.', translit: 'ES-teh koh-RREH-oh es frow-doo-LEN-toh', en: 'This email is fraudulent.' },
      { es: 'Hay que informar sobre la brecha de seguridad.', translit: 'ay keh een-for-MAR SOH-breh lah BREH-chah deh seh-goo-ree-DAHD', en: 'We need to report the security breach.' },
      { es: 'Guarde los datos de forma segura.', translit: 'GWAR-deh lohs DAH-tohs deh FOR-mah seh-GOO-rah', en: 'Keep the data safe.' },
      { es: 'Haga una copia de seguridad.', translit: 'AH-gah OO-nah KOH-pyoh deh seh-goo-ree-DAHD', en: 'Make a backup.' },
      { es: 'Verifique la dirección del remitente.', translit: 'beh-ree-FEE-keh lah dee-rek-SYOHN del rreh-mee-TEN-teh', en: 'Check the sender’s address.' }
    ]
  },
  {
    id: 'career', title: 'Jobs & teams', titleEs: 'Trabajo y equipos', level: 'B1', icon: '🧑‍💼',
    desc: 'Careers, interviews, roles and how teams talk about themselves.',
    terms: [
      { es: 'vacante', translit: 'bah-KAHN-teh', en: 'job vacancy', pos: 'noun', gender: 'f' },
      { es: 'candidato', translit: 'kan-dee-DAH-toh', en: 'applicant, candidate', pos: 'noun', gender: 'm' },
      { es: 'experiencia laboral', translit: 'eks-peh-RYEN-syah lah-boh-RAHL', en: 'work experience', pos: 'phrase' },
      { es: 'habilidad', translit: 'ah-bee-lee-DAHD', en: 'skill', pos: 'noun', gender: 'f' },
      { es: 'puesto', translit: 'PWES-toh', en: 'position, post', pos: 'noun', gender: 'm' },
      { es: 'salario', translit: 'sah-LAH-ryoh', en: 'salary', pos: 'noun', gender: 'm' },
      { es: 'entrevista', translit: 'en-treh-BEES-tah', en: 'interview', pos: 'noun', gender: 'f' },
      { es: 'liderazgo', translit: 'lee-deh-RAHS-goh', en: 'leadership', pos: 'noun', gender: 'm' },
      { es: 'prácticas', translit: 'PRAHK-tee-kahs', en: 'internship', pos: 'noun', gender: 'p' },
      { es: 'ascenso', translit: 'ah-SEN-soh', en: 'promotion', pos: 'noun', gender: 'm' },
      { es: 'colega', translit: 'koh-LEH-gah', en: 'colleague', pos: 'noun', gender: 'm' },
      { es: 'responsable', translit: 'rres-pon-SAH-bleh', en: 'responsible, reliable', pos: 'adjective' }
    ],
    phrases: [
      { es: 'Busco trabajo en informática.', translit: 'BOOS-koh trah-BAH-hoh en een-for-MAH-tee-kah', en: 'I am looking for work in IT.' },
      { es: 'Cuénteme sobre su experiencia.', translit: 'KWEN-teh-meh SOH-breh soo eks-peh-RYEN-syah', en: 'Tell me about your experience.' },
      { es: '¿Qué habilidades tiene?', translit: 'keh ah-bee-lee-DAH-des TYEH-neh', en: 'What skills do you have?' },
      { es: 'Trabajo en un equipo de desarrolladores.', translit: 'trah-BAH-hoh en oon eh-KEE-poh deh deh-sah-rroh-yah-DOH-res', en: 'I work in a team of developers.' },
      { es: 'Es una buena oportunidad de crecimiento.', translit: 'es OO-nah BWEH-nah oh-por-too-nee-DAHD deh kreh-see-MYEN-toh', en: 'It is a good opportunity for growth.' }
    ]
  },
  {
    id: 'news', title: 'News register', titleEs: 'Registro periodístico', level: 'B2', icon: '📰',
    desc: 'The formal register of news and analysis — read headlines and understand reports.',
    terms: [
      { es: 'comunicado', translit: 'koh-moo-nee-KAH-doh', en: 'report, statement', pos: 'noun', gender: 'm' },
      { es: 'fuente', translit: 'FWEN-teh', en: 'source', pos: 'noun', gender: 'f' },
      { es: 'declaración', translit: 'deh-klah-rah-SYOHN', en: 'statement', pos: 'noun', gender: 'f' },
      { es: 'representante', translit: 'rreh-preh-sen-TAN-teh', en: 'representative', pos: 'noun', gender: 'm' },
      { es: 'según los datos', translit: 'seh-GOON lohs DAH-tohs', en: 'according to the data', pos: 'phrase' },
      { es: 'estudio', translit: 'es-TOO-dyoh', en: 'study, research', pos: 'noun', gender: 'm' },
      { es: 'causa', translit: 'KOW-sah', en: 'cause', pos: 'noun', gender: 'f' },
      { es: 'consecuencias', translit: 'kon-seh-KWEN-syahs', en: 'consequences', pos: 'noun', gender: 'p' },
      { es: 'influencia', translit: 'een-FLWEN-syah', en: 'influence, impact', pos: 'noun', gender: 'f' },
      { es: 'crecimiento', translit: 'kreh-see-MYEN-toh', en: 'growth', pos: 'noun', gender: 'm' },
      { es: 'descenso', translit: 'des-SEN-soh', en: 'decrease, decline', pos: 'noun', gender: 'm' },
      { es: 'declarar', translit: 'deh-klah-RAR', en: 'to state, to declare', pos: 'verb' },
      { es: 'encuesta', translit: 'en-KWES-tah', en: 'survey, poll', pos: 'noun', gender: 'f' },
      { es: 'artículo', translit: 'ar-TEE-koo-loh', en: 'article', pos: 'noun', gender: 'm' }
    ],
    phrases: [
      { es: 'Según los datos de la encuesta…', translit: 'seh-GOON lohs DAH-tohs deh lah en-KWES-tah', en: 'According to the survey data…' },
      { es: 'Las autoridades declararon medidas nuevas.', translit: 'lahs ow-toh-ree-DAH-des deh-klah-RAH-ron meh-DEE-dahs NWEH-bahs', en: 'The authorities announced new measures.' },
      { es: 'Esto puede tener consecuencias graves.', translit: 'ES-toh PWEH-deh teh-NER kon-seh-KWEN-syahs GRAH-bes', en: 'This could have serious consequences.' },
      { es: 'Se observó un crecimiento de la economía.', translit: 'seh ob-ser-BOH oon kreh-see-MYEN-toh deh lah eh-koh-noh-MEE-ah', en: 'Economic growth was observed.' },
      { es: 'Según el estudio…', translit: 'seh-GOON el es-TOO-dyoh', en: 'According to the study…' }
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
    for (const p of m.phrases || []) out.push({ ...p, module: m.id, isPhrase: true });
  }
  return out;
}

export function cyberModuleById(id) {
  return CYBER_MODULES.find((m) => m.id === id) || null;
}

export default { CYBER_MODULES, allCyberTerms, cyberModuleById };
