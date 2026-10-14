// The zero → hero roadmap: every stage maps a school band to app content.
export const PATH_STAGES = [
  {
    id: 'kindergarten', band: 'Kindergarten', ages: 'Ages 4–6', level: 'A0',
    title: 'First sounds', titleRu: 'Пе́рвые зву́ки', icon: '🧸',
    pack: 'k-basics',
    goal: 'Recognise the 33 letters by sight and sound and say your first 30 words.',
    links: [
      { label: 'Learn the alphabet', href: '#/alphabet' },
      { label: 'First words pack', href: '#/vocab?pack=k-basics' },
      { label: 'Keyboard: home row', href: '#/keyboard' }
    ],
    milestone: 'You can read «ма́ма», «па́па», «кот» aloud.'
  },
  {
    id: 'primary', band: 'Primary school', ages: 'Grades 1–5', level: 'A1',
    title: 'First sentences', titleRu: 'Пе́рвые фра́зы', icon: '🎒',
    pack: 'school',
    goal: 'Greetings, introductions, school and survival Russian — plus touch-typing the alphabet.',
    links: [
      { label: 'Units 1–10 (A1)', href: '#/lessons' },
      { label: 'School & classroom pack', href: '#/vocab?pack=school' },
      { label: 'Survival pack', href: '#/vocab?pack=survival' },
      { label: 'Keyboard alphabet drill', href: '#/keyboard' }
    ],
    milestone: 'You can introduce yourself and ask for help.'
  },
  {
    id: 'middle', band: 'Middle school', ages: 'Grades 6–8', level: 'A2',
    title: 'Everyday fluency', titleRu: 'Быт', icon: '🕰', // Everyday Russian
    pack: 'daily',
    goal: 'Daily life, weather, food, health and the past/future tenses.',
    links: [
      { label: 'Units 11–22 (A2)', href: '#/lessons' },
      { label: 'Daily life pack', href: '#/vocab?pack=daily' },
      { label: 'Body & health pack', href: '#/vocab?pack=health' },
      { label: 'Reading: A1–A2', href: '#/reading' }
    ],
    milestone: 'You can describe your day and read a short story.'
  },
  {
    id: 'high', band: 'High school', ages: 'Grades 9–12', level: 'B1',
    title: 'Ideas & analysis', titleRu: 'Мы́сли и ана́лиз', icon: '🎓',
    pack: 'academic',
    goal: 'Academic subjects, opinions, arguments and news-level reading.',
    links: [
      { label: 'Units 23–34 (B1)', href: '#/lessons' },
      { label: 'Subjects & ideas pack', href: '#/vocab?pack=academic' },
      { label: 'Technology pack', href: '#/vocab?pack=tech' },
      { label: 'Reading: B1', href: '#/reading' }
    ],
    milestone: 'You can argue a point of view and understand the news.'
  },
  {
    id: 'professional', band: 'University & work', ages: 'Adult / professional', level: 'B2',
    title: 'Professional Russian', titleRu: 'Профессиона́льный ру́сский', icon: '💼',
    pack: 'work',
    goal: 'Work, business, contracts and formal written Russian.',
    links: [
      { label: 'Units 35–44 (B2)', href: '#/lessons' },
      { label: 'Work & business pack', href: '#/vocab?pack=work' },
      { label: 'Grammar reference', href: '#/grammar' },
      { label: 'Reading: B2', href: '#/reading' }
    ],
    milestone: 'You can work, write and negotiate in Russian.'
  },
  {
    id: 'digital', band: 'Digital professional', ages: 'Specialist', level: 'B2+',
    title: 'Technology & security language', titleRu: 'Техноло́гии и безопа́сность', icon: '🛡',
    pack: 'tech',
    goal: 'Read technical Russian and follow IT, data and security-awareness material.',
    links: [
      { label: 'Advanced modules', href: '#/cyber' },
      { label: 'Technology pack', href: '#/vocab?pack=tech' },
      { label: 'Keyboard speed test', href: '#/keyboard' },
      { label: 'Daily review', href: '#/review' }
    ],
    milestone: 'You can read a technical report and follow a security briefing in Russian.'
  }
];

export default { PATH_STAGES };
