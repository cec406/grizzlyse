// The zero → hero roadmap: every stage maps a school band to app content.
export const PATH_STAGES = [
  {
    id: 'kindergarten', band: 'Kindergarten', ages: 'Ages 4–6', level: 'A0',
    title: 'First sounds', titleEs: 'Primeros sonidos', icon: '🧸',
    pack: 'k-basics',
    goal: 'Learn the 27 letters (A–Z plus Ñ) and say your first 30 words.',
    links: [
      { label: 'Learn the alphabet', href: '#/alphabet' },
      { label: 'First words pack', href: '#/vocab?pack=k-basics' },
      { label: 'Keyboard: accents', href: '#/keyboard' }
    ],
    milestone: 'You can read «mamá», «papá», «gato» aloud.'
  },
  {
    id: 'primary', band: 'Primary school', ages: 'Grades 1–5', level: 'A1',
    title: 'First sentences', titleEs: 'Primeras frases', icon: '🎒',
    pack: 'school',
    goal: 'Greetings, introductions, school and travel-survival Spanish — plus typing accents.',
    links: [
      { label: 'Units 1–10 (A1)', href: '#/lessons' },
      { label: 'School & classroom pack', href: '#/vocab?pack=school' },
      { label: 'Travel & survival pack', href: '#/vocab?pack=survival' },
      { label: 'Keyboard trainer', href: '#/keyboard' }
    ],
    milestone: 'You can introduce yourself and ask for help.'
  },
  {
    id: 'middle', band: 'Middle school', ages: 'Grades 6–8', level: 'A2',
    title: 'Everyday fluency', titleEs: 'Vida diaria', icon: '🕰',
    pack: 'daily',
    goal: 'Daily life, weather, food, health and the past/future tenses.',
    links: [
      { label: 'Units 11–20 (A2)', href: '#/lessons' },
      { label: 'Daily life pack', href: '#/vocab?pack=daily' },
      { label: 'Body & health pack', href: '#/vocab?pack=health' },
      { label: 'Reading: A1–A2', href: '#/reading' }
    ],
    milestone: 'You can describe your day and read a short story.'
  },
  {
    id: 'high', band: 'High school', ages: 'Grades 9–12', level: 'B1',
    title: 'Ideas & analysis', titleEs: 'Ideas y análisis', icon: '🎓',
    pack: 'academic',
    goal: 'Academic subjects, opinions, arguments and the subjunctive.',
    links: [
      { label: 'Units 21–30 (B1)', href: '#/lessons' },
      { label: 'Subjects & ideas pack', href: '#/vocab?pack=academic' },
      { label: 'Technology pack', href: '#/vocab?pack=tech' },
      { label: 'Reading: B1', href: '#/reading' }
    ],
    milestone: 'You can argue a point of view and understand the news.'
  },
  {
    id: 'professional', band: 'University & work', ages: 'Adult / professional', level: 'B2',
    title: 'Professional Spanish', titleEs: 'Español profesional', icon: '💼',
    pack: 'work',
    goal: 'Work, business, contracts and formal written Spanish.',
    links: [
      { label: 'Units 31–40 (B2)', href: '#/lessons' },
      { label: 'Work & business pack', href: '#/vocab?pack=work' },
      { label: 'Grammar reference', href: '#/grammar' },
      { label: 'Reading: B2', href: '#/reading' }
    ],
    milestone: 'You can work, write and negotiate in Spanish.'
  },
  {
    id: 'fluency', band: 'C1 fluency & exams', ages: 'Advanced', level: 'C1',
    title: 'Nuance & exam-ready', titleEs: 'Matices y exámenes', icon: '🏝',
    pack: 'tech',
    goal: 'Formal register, Caribbean Spanish, nuance — and DLPT/OPI interview practice.',
    links: [
      { label: 'Units 41–48 (C1)', href: '#/lessons' },
      { label: 'Regional dialects', href: '#/dialects' },
      { label: 'Advanced modules', href: '#/cyber' },
      { label: 'Daily review', href: '#/review' }
    ],
    milestone: 'You can hold your own with a native speaker on an abstract topic.'
  }
];

export default { PATH_STAGES };
