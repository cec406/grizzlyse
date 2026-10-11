// Unit 3 — Where are you from? A1.
export const unit = {
  id: 'u03',
  level: 'A1',
  number: 3,
  title: 'Where are you from?',
  titleEs: '¿De dónde eres?',
  story: 'The first real question at any hostel, class or party is where are you from. In this unit you will learn the countries, the nationalities and the languages of the Spanish-speaking world, and you will tell people where you live. This is the small talk that opens every door.',
  grammar: [
    {
      topic: 'ser + de for origin',
      explanation: 'To say where you are from, use a form of ser plus de: soy de, eres de, es de, somos de, son de. de means from here.',
      table: [
        ['Spanish', 'English'],
        ['Soy de Puerto Rico.', 'I am from Puerto Rico.'],
        ['¿De dónde eres?', 'Where are you from? (informal)'],
        ['¿De dónde es usted?', 'Where are you from? (polite)'],
        ['Somos de México.', 'We are from Mexico.']
      ],
      examples: [
        { es: 'Soy de Puerto Rico y vivo en San Juan.', trans: 'soy deh PWEHR-toh REE-koh ee BEE-boh en san HWAHN', en: 'I am from Puerto Rico and I live in San Juan.' }
      ]
    },
    {
      topic: 'Nationalities change with gender',
      explanation: 'Most nationalities end in -o for a man and -a for a woman: mexicano / mexicana, puertorriqueño / puertorriqueña. Others end the same for both, like estadounidense.',
      table: [
        ['Country', 'Man', 'Woman'],
        ['México', 'mexicano', 'mexicana'],
        ['Puerto Rico', 'puertorriqueño', 'puertorriqueña'],
        ['España', 'español', 'española'],
        ['Estados Unidos', 'estadounidense', 'estadounidense']
      ],
      examples: [
        { es: 'Mi amigo es mexicano.', trans: 'mee ah-MEE-goh es meh-hee-KAH-noh', en: 'My friend is Mexican.' },
        { es: 'Ella es puertorriqueña.', trans: 'EH-yah es PWEHR-toh-ree-KEH-nyah', en: 'She is Puerto Rican.' }
      ]
    },
    {
      topic: 'Languages: hablar',
      explanation: 'hablar means to speak. The forms you need now are hablo (I speak) and habla (he or she speaks). The language itself takes no article: Hablo español, not Hablo el español.',
      table: [
        ['Spanish', 'English'],
        ['¿Qué idiomas hablas?', 'What languages do you speak?'],
        ['Hablo inglés y español.', 'I speak English and Spanish.'],
        ['¿Habla usted inglés?', 'Do you speak English? (polite)'],
        ['Un poco de español.', 'A little Spanish.']
      ],
      examples: [
        { es: 'Hablo inglés y un poco de español.', trans: 'AH-bloh een-GLES ee oon POH-koh deh es-pah-NYOL', en: 'I speak English and a little Spanish.' }
      ]
    }
  ],
  vocabulary: [
    { id: 'u03-pais', es: 'país', translit: 'pa-EES', en: 'country', pos: 'noun', gender: 'm' },
    { id: 'u03-ciudad', es: 'ciudad', translit: 'syoo-DAD', en: 'city', pos: 'noun', gender: 'f' },
    { id: 'u03-nacionalidad', es: 'nacionalidad', translit: 'nah-syoh-nah-lee-DAD', en: 'nationality', pos: 'noun', gender: 'f' },
    { id: 'u03-idioma', es: 'idioma', translit: 'ee-DYOH-mah', en: 'language', pos: 'noun', gender: 'm' },
    { id: 'u03-isla', es: 'isla', translit: 'EES-lah', en: 'island', pos: 'noun', gender: 'f' },
    { id: 'u03-cultura', es: 'cultura', translit: 'kool-TOO-rah', en: 'culture', pos: 'noun', gender: 'f' },
    { id: 'u03-espana', es: 'España', translit: 'es-PA-nyah', en: 'Spain', pos: 'noun', gender: 'f' },
    { id: 'u03-estadosunidos', es: 'Estados Unidos', translit: 'es-TAH-dohs oo-NEE-dohs', en: 'United States', pos: 'noun', gender: 'p' },
    { id: 'u03-mexicano', es: 'mexicano', translit: 'meh-hee-KAH-noh', en: 'Mexican', pos: 'adjective' },
    { id: 'u03-puertorriqueno', es: 'puertorriqueño', translit: 'PWEHR-toh-ree-KEH-nyoh', en: 'Puerto Rican', pos: 'adjective' },
    { id: 'u03-espanol', es: 'español', translit: 'es-pah-NYOL', en: 'Spanish (language)', pos: 'noun', gender: 'm' },
    { id: 'u03-ingles', es: 'inglés', translit: 'een-GLES', en: 'English (language)', pos: 'noun', gender: 'm' },
    { id: 'u03-hablar', es: 'hablar', translit: 'ah-BLAR', en: 'to speak', pos: 'verb' },
    { id: 'u03-hablo', es: 'hablo', translit: 'AH-bloh', en: 'I speak', pos: 'verb' },
    { id: 'u03-habla', es: 'habla', translit: 'AH-blah', en: 'he / she speaks', pos: 'verb' },
    { id: 'u03-vivir', es: 'vivir', translit: 'bee-BEER', en: 'to live', pos: 'verb' },
    { id: 'u03-vivo', es: 'vivo', translit: 'BEE-boh', en: 'I live', pos: 'verb' },
    { id: 'u03-soy', es: 'soy', translit: 'soy', en: 'I am', pos: 'verb' },
    { id: 'u03-es', es: 'es', translit: 'es', en: 'he / she is', pos: 'verb' },
    { id: 'u03-somos', es: 'somos', translit: 'SOH-mos', en: 'we are', pos: 'verb' },
    { id: 'u03-eres', es: 'eres', translit: 'EH-res', en: 'you are (informal)', pos: 'verb' },
    { id: 'u03-donde', es: 'dónde', translit: 'DON-deh', en: 'where', pos: 'question' },
    { id: 'u03-de', es: 'de', translit: 'deh', en: 'from / of', pos: 'preposition' },
    { id: 'u03-en', es: 'en', translit: 'en', en: 'in', pos: 'preposition' },
    { id: 'u03-tambien', es: 'también', translit: 'tam-BYEN', en: 'also / too', pos: 'adverb' },
    { id: 'u03-amigo', es: 'amigo', translit: 'ah-MEE-goh', en: 'friend', pos: 'noun', gender: 'm' },
    { id: 'u03-orgulloso', es: 'orgulloso', translit: 'or-goo-YOH-soh', en: 'proud', pos: 'adjective' },
    { id: 'u03-bienvenido', es: 'bienvenido', translit: 'byen-beh-NEE-doh', en: 'welcome', pos: 'adjective' }
  ],
  phrases: [
    { id: 'p-u03-1', es: '¿De dónde eres?', trans: 'deh DON-deh EH-res', en: 'Where are you from? (informal)' },
    { id: 'p-u03-2', es: '¿Qué idiomas hablas?', trans: 'keh ee-DYOH-mahs AH-blahs', en: 'What languages do you speak?' },
    { id: 'p-u03-3', es: 'Soy de Puerto Rico.', trans: 'soy deh PWEHR-toh REE-koh', en: 'I am from Puerto Rico.' },
    { id: 'p-u03-4', es: 'Bienvenido a mi isla.', trans: 'byen-beh-NEE-doh ah mee EES-lah', en: 'Welcome to my island.' }
  ],
  sentences: [
    { es: 'Soy de Puerto Rico, una isla hermosa.', translit: 'soy deh PWEHR-toh REE-koh OO-nah EES-lah ehr-MOH-sah', en: 'I am from Puerto Rico, a beautiful island.', words: [{ id: 'u03-soy', es: 'Soy', en: 'I am' }, { id: 'u03-isla', es: 'isla', en: 'island' }] },
    { es: 'Mi amigo es mexicano y habla español.', translit: 'mee ah-MEE-goh es meh-hee-KAH-noh ee AH-blah es-pah-NYOL', en: 'My friend is Mexican and he speaks Spanish.', words: [{ id: 'u03-amigo', es: 'amigo', en: 'friend' }, { id: 'u03-es', es: 'es', en: 'he is' }, { id: 'u03-mexicano', es: 'mexicano', en: 'Mexican' }, { id: 'u03-habla', es: 'habla', en: 'he speaks' }, { id: 'u03-espanol', es: 'español', en: 'Spanish' }] },
    { es: 'Vivo en una ciudad grande y hablo inglés.', translit: 'BEE-boh en OO-nah syoo-DAD GRAN-deh ee AH-bloh een-GLES', en: 'I live in a big city and I speak English.', words: [{ id: 'u03-vivo', es: 'Vivo', en: 'I live' }, { id: 'u03-ciudad', es: 'ciudad', en: 'city' }, { id: 'u03-hablo', es: 'hablo', en: 'I speak' }, { id: 'u03-ingles', es: 'inglés', en: 'English' }] },
    { es: '¿De dónde eres? ¿De qué país?', translit: 'deh DON-deh EH-res deh keh pa-EES', en: 'Where are you from? From which country?', words: [{ id: 'u03-donde', es: 'dónde', en: 'where' }, { id: 'u03-eres', es: 'eres', en: 'you are' }, { id: 'u03-pais', es: 'país', en: 'country' }] },
    { es: 'Nosotros somos de México y también somos latinos.', translit: 'noh-SOH-trohs SOH-mos deh MEH-hee-koh ee tam-BYEN SOH-mos lah-TEE-nohs', en: 'We are from Mexico and we are also Latino.', words: [{ id: 'u03-somos', es: 'somos', en: 'we are' }, { id: 'u03-tambien', es: 'también', en: 'also' }] },
    { es: 'El español es un idioma bonito.', translit: 'el es-pah-NYOL es oon ee-DYOH-mah boh-NEE-toh', en: 'Spanish is a beautiful language.', words: [{ id: 'u03-espanol', es: 'español', en: 'Spanish' }, { id: 'u03-es', es: 'es', en: 'is' }, { id: 'u03-idioma', es: 'idioma', en: 'language' }] }
  ],
  dialogue: {
    title: 'En la universidad (At the university)',
    lines: [
      { who: 'Carlos', es: '¡Hola! Me llamo Carlos. ¿Y tú?', en: 'Hi! My name is Carlos. And you?' },
      { who: 'Yuki', es: 'Hola, soy Yuki. Soy de Japón.', en: 'Hi, I am Yuki. I am from Japan.' },
      { who: 'Carlos', es: '¿Y vives aquí en Puerto Rico?', en: 'And do you live here in Puerto Rico?' },
      { who: 'Yuki', es: 'Sí, vivo en San Juan y estudio español.', en: 'Yes, I live in San Juan and I study Spanish.' },
      { who: 'Carlos', es: '¡Qué bien! ¿Qué idiomas hablas?', en: 'How nice! What languages do you speak?' },
      { who: 'Yuki', es: 'Hablo japonés, inglés y un poco de español.', en: 'I speak Japanese, English and a little Spanish.' },
      { who: 'Carlos', es: 'Yo soy puertorriqueño. Bienvenida a mi isla.', en: 'I am Puerto Rican. Welcome to my island.' }
    ],
    questions: [
      { type: 'mc-es', q: '¿De dónde es Yuki?', options: ['Japón', 'Puerto Rico', 'México', 'España'], answer: 'Japón' },
      { type: 'mc-es', q: '¿Dónde vive Yuki?', options: ['San Juan', 'Japón', 'México', 'Madrid'], answer: 'San Juan' },
      { type: 'mc-es', q: '¿Qué idiomas habla Yuki?', options: ['japonés, inglés y un poco de español', 'solo inglés', 'solo español', 'francés y alemán'], answer: 'japonés, inglés y un poco de español' },
      { type: 'mc-es', q: '¿De dónde es Carlos?', options: ['Puerto Rico', 'Japón', 'México', 'España'], answer: 'Puerto Rico' }
    ]
  },
  quiz: [
    { type: 'mc-en', q: '¿Qué significa «país»?', options: ['country', 'city', 'language', 'island'], answer: 'country', es: 'país' },
    { type: 'mc-en', q: '¿Qué significa «ciudad»?', options: ['city', 'country', 'culture', 'nationality'], answer: 'city', es: 'ciudad' },
    { type: 'mc-es', q: 'Say I speak Spanish.', options: ['Hablo español', 'Hablo inglés', 'Vivo en español', 'Soy español'], answer: 'Hablo español', es: 'Hablo español' },
    { type: 'typing', q: 'Type I live in Spanish', answer: 'vivo', accepts: [], es: 'vivo' },
    { type: 'mc-en', q: '¿Qué significa «idioma»?', options: ['language', 'country', 'nationality', 'culture'], answer: 'language', es: 'idioma' },
    { type: 'mc-es', q: 'Say Puerto Rican (masculine singular).', options: ['puertorriqueño', 'puertorriqueña', 'mexicano', 'español'], answer: 'puertorriqueño', es: 'puertorriqueño' },
    { type: 'mc-en', q: '¿Qué significa «también»?', options: ['also', 'but', 'never', 'only'], answer: 'also', es: 'también' },
    { type: 'mc-es', q: 'Say where are you from? (informal)', options: ['¿De dónde eres?', '¿Cómo estás?', '¿Qué es esto?', '¿Dónde vives?'], answer: '¿De dónde eres?', es: '¿De dónde eres?' },
    { type: 'typing', q: 'Type island in Spanish', answer: 'isla', accepts: [], es: 'isla' },
    { type: 'mc-en', q: '¿Qué significa «orgulloso»?', options: ['proud', 'welcome', 'happy', 'tired'], answer: 'proud', es: 'orgulloso' },
    { type: 'mc-es', q: 'Say we are from Mexico.', options: ['Somos de México', 'Soy de México', 'Estamos de México', 'Es de México'], answer: 'Somos de México', es: 'Somos de México' },
    { type: 'mc-en', q: '¿Qué significa «bienvenido»?', options: ['welcome', 'goodbye', 'proud', 'language'], answer: 'welcome', es: 'bienvenido' }
  ],
  test: {
    title: 'Unit 3 test — Where are you from?',
    questions: [
      { type: 'mc-en', q: '¿Qué significa «isla»?', options: ['island', 'city', 'country', 'beach'], answer: 'island', es: 'isla' },
      { type: 'mc-es', q: 'Say I am from Spain.', options: ['Soy de España', 'Estoy de España', 'Vivo España', 'Soy en España'], answer: 'Soy de España', es: 'Soy de España' },
      { type: 'typing', q: 'Type to speak in Spanish', answer: 'hablar', accepts: [], es: 'hablar' },
      { type: 'mc-en', q: '¿Qué significa «nacionalidad»?', options: ['nationality', 'country', 'language', 'culture'], answer: 'nationality', es: 'nacionalidad' },
      { type: 'mc-es', q: 'Say I live in San Juan.', options: ['Vivo en San Juan', 'Vivo a San Juan', 'Soy en San Juan', 'Hablo en San Juan'], answer: 'Vivo en San Juan', es: 'Vivo en San Juan' },
      { type: 'typing', q: 'Type Spanish (the language) in Spanish', answer: 'espanol', accepts: ['español'], es: 'español' },
      { type: 'mc-en', q: '¿Qué significa «inglés»?', options: ['English', 'Spanish', 'French', 'Mexican'], answer: 'English', es: 'inglés' },
      { type: 'mc-es', q: 'Say my friend is Mexican.', options: ['Mi amigo es mexicano', 'Mi amigo está mexicano', 'Mi amigo tiene mexicano', 'Mi amiga es mexicano'], answer: 'Mi amigo es mexicano', es: 'Mi amigo es mexicano' },
      { type: 'mc-en', q: '¿Qué significa «cultura»?', options: ['culture', 'country', 'city', 'island'], answer: 'culture', es: 'cultura' },
      { type: 'typing', q: 'Type where in Spanish', answer: 'donde', accepts: ['dónde'], es: 'dónde' },
      { type: 'mc-es', q: 'Ask what languages do you speak?', options: ['¿Qué idiomas hablas?', '¿Qué país es?', '¿De dónde eres?', '¿Dónde vives?'], answer: '¿Qué idiomas hablas?', es: '¿Qué idiomas hablas?' },
      { type: 'mc-en', q: '¿Qué significa «habla»?', options: ['he / she speaks', 'I speak', 'they speak', 'we speak'], answer: 'he / she speaks', es: 'habla' }
    ]
  }
};
