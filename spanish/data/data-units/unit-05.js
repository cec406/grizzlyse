// Unit 5 — Family & possessives. A1.
export const unit = {
  id: 'u05',
  level: 'A1',
  number: 5,
  title: 'Family & possessives',
  titleEs: 'La familia',
  story: 'Family is the centre of life in Puerto Rico, and relatives come up in the first five minutes of any conversation. In this unit you meet the family words and the little words mi, tu, su and nuestro that say whose someone is. Then you can talk about your own family with confidence.',
  grammar: [
    {
      topic: 'mi, tu, su — whose it is',
      explanation: 'These short words go before the noun and change only for number: mi becomes mis with a plural noun. su can mean his, her, their or your (polite).',
      table: [
        ['Person', 'Singular', 'Plural'],
        ['my', 'mi', 'mis'],
        ['your (informal)', 'tu', 'tus'],
        ['his / her / your (polite)', 'su', 'sus'],
        ['our', 'nuestro / nuestra', 'nuestros / nuestras']
      ],
      examples: [
        { es: 'Mi madre es profesora.', trans: 'mee MAH-dreh es proh-feh-SOH-rah', en: 'My mother is a teacher.' },
        { es: 'Mis primos viven en Ponce.', trans: 'mees PREE-mohs BEE-ben en PON-seh', en: 'My cousins live in Ponce.' }
      ]
    },
    {
      topic: 'nuestro matches the noun',
      explanation: 'Unlike mi and tu, nuestro changes with the gender of the thing owned: nuestro padre, nuestra madre, nuestros hermanos, nuestras hermanas.',
      table: [
        ['Noun', 'Possessive', 'Example'],
        ['padre (m)', 'nuestro', 'nuestro padre'],
        ['madre (f)', 'nuestra', 'nuestra madre'],
        ['hermanos (m pl)', 'nuestros', 'nuestros hermanos'],
        ['primas (f pl)', 'nuestras', 'nuestras primas']
      ],
      examples: [
        { es: 'Nuestra abuela vive con nosotros.', trans: 'NWEHS-trah ah-BWEH-lah BEE-beh kon noh-SOH-trohs', en: 'Our grandmother lives with us.' }
      ]
    },
    {
      topic: 'tener for family',
      explanation: 'To say how many relatives you have, use tener plus un or una plus the noun. Tengo un hermano means I have one brother; tengo dos hermanas means I have two sisters.',
      table: [
        ['Spanish', 'English'],
        ['Tengo un hermano.', 'I have one brother.'],
        ['Tengo dos hermanas.', 'I have two sisters.'],
        ['¿Tienes primos?', 'Do you have cousins? (informal)'],
        ['No tengo hijos.', 'I do not have children.']
      ],
      examples: [
        { es: 'Tengo dos hermanos y una hermana.', trans: 'TEN-goh dohs ehr-MAH-nohs ee OO-nah ehr-MAH-nah', en: 'I have two brothers and one sister.' }
      ]
    }
  ],
  vocabulary: [
    { id: 'u05-familia', es: 'familia', translit: 'fah-MEE-lyah', en: 'family', pos: 'noun', gender: 'f' },
    { id: 'u05-madre', es: 'madre', translit: 'MAH-dreh', en: 'mother', pos: 'noun', gender: 'f' },
    { id: 'u05-padre', es: 'padre', translit: 'PAH-dreh', en: 'father', pos: 'noun', gender: 'm' },
    { id: 'u05-mama', es: 'mamá', translit: 'ma-MA', en: 'mom', pos: 'noun', gender: 'f' },
    { id: 'u05-papa', es: 'papá', translit: 'pa-PA', en: 'dad', pos: 'noun', gender: 'm' },
    { id: 'u05-hermano', es: 'hermano', translit: 'ehr-MAH-noh', en: 'brother', pos: 'noun', gender: 'm' },
    { id: 'u05-hermana', es: 'hermana', translit: 'ehr-MAH-nah', en: 'sister', pos: 'noun', gender: 'f' },
    { id: 'u05-hijo', es: 'hijo', translit: 'EE-hoh', en: 'son / child', pos: 'noun', gender: 'm' },
    { id: 'u05-hija', es: 'hija', translit: 'EE-hah', en: 'daughter', pos: 'noun', gender: 'f' },
    { id: 'u05-abuelo', es: 'abuelo', translit: 'ah-BWEH-loh', en: 'grandfather', pos: 'noun', gender: 'm' },
    { id: 'u05-abuela', es: 'abuela', translit: 'ah-BWEH-lah', en: 'grandmother', pos: 'noun', gender: 'f' },
    { id: 'u05-tio', es: 'tío', translit: 'TEE-oh', en: 'uncle', pos: 'noun', gender: 'm' },
    { id: 'u05-tia', es: 'tía', translit: 'TEE-ah', en: 'aunt', pos: 'noun', gender: 'f' },
    { id: 'u05-primo', es: 'primo', translit: 'PREE-moh', en: 'cousin', pos: 'noun', gender: 'm' },
    { id: 'u05-prima', es: 'prima', translit: 'PREE-mah', en: 'cousin (female)', pos: 'noun', gender: 'f' },
    { id: 'u05-sobrino', es: 'sobrino', translit: 'soh-BREE-noh', en: 'nephew', pos: 'noun', gender: 'm' },
    { id: 'u05-esposo', es: 'esposo', translit: 'es-POH-soh', en: 'husband', pos: 'noun', gender: 'm' },
    { id: 'u05-esposa', es: 'esposa', translit: 'es-POH-sah', en: 'wife', pos: 'noun', gender: 'f' },
    { id: 'u05-nino', es: 'niño', translit: 'NEE-nyoh', en: 'child / boy', pos: 'noun', gender: 'm' },
    { id: 'u05-nina', es: 'niña', translit: 'NEE-nyah', en: 'girl', pos: 'noun', gender: 'f' },
    { id: 'u05-mi', es: 'mi', translit: 'mee', en: 'my', pos: 'adjective' },
    { id: 'u05-tu', es: 'tu', translit: 'too', en: 'your (informal)', pos: 'adjective' },
    { id: 'u05-su', es: 'su', translit: 'soo', en: 'his / her / your (polite)', pos: 'adjective' },
    { id: 'u05-nuestro', es: 'nuestro', translit: 'NWEHS-troh', en: 'our', pos: 'adjective' },
    { id: 'u05-grande', es: 'grande', translit: 'GRAN-deh', en: 'big / large', pos: 'adjective' },
    { id: 'u05-querido', es: 'querido', translit: 'keh-REE-doh', en: 'dear / beloved', pos: 'adjective' },
    { id: 'u05-tener', es: 'tener', translit: 'teh-NEHR', en: 'to have', pos: 'verb' },
    { id: 'u05-tengo', es: 'tengo', translit: 'TEN-goh', en: 'I have', pos: 'verb' },
    { id: 'u05-vive', es: 'vive', translit: 'BEE-beh', en: 'he / she lives', pos: 'verb' }
  ],
  phrases: [
    { id: 'p-u05-1', es: '¿Cómo está tu familia?', trans: 'KOH-moh es-TA too fah-MEE-lyah', en: 'How is your family?' },
    { id: 'p-u05-2', es: 'Mi mamá es de Ponce.', trans: 'mee ma-MA es deh PON-seh', en: 'My mom is from Ponce.' },
    { id: 'p-u05-3', es: 'Tengo dos hermanos.', trans: 'TEN-goh dohs ehr-MAH-nohs', en: 'I have two brothers.' }
  ],
  sentences: [
    { es: 'Mi familia es grande y muy unida.', translit: 'mee fah-MEE-lyah es GRAN-deh ee mwee oo-NEE-dah', en: 'My family is big and very close.', words: [{ id: 'u05-mi', es: 'Mi', en: 'my' }, { id: 'u05-familia', es: 'familia', en: 'family' }, { id: 'u05-grande', es: 'grande', en: 'big' }] },
    { es: 'Mi hermano se llama José y mi hermana se llama Ana.', translit: 'mee ehr-MAH-noh seh YAH-mah hoh-SEH ee mee ehr-MAH-nah seh YAH-mah AH-nah', en: 'My brother is called José and my sister is called Ana.', words: [{ id: 'u05-hermano', es: 'hermano', en: 'brother' }, { id: 'u05-hermana', es: 'hermana', en: 'sister' }] },
    { es: 'Nuestra abuela vive en Ponce.', translit: 'NWEHS-trah ah-BWEH-lah BEE-beh en PON-seh', en: 'Our grandmother lives in Ponce.', words: [{ id: 'u05-nuestro', es: 'Nuestra', en: 'our' }, { id: 'u05-abuela', es: 'abuela', en: 'grandmother' }, { id: 'u05-vive', es: 'vive', en: 'she lives' }] },
    { es: 'Tengo un tío y una tía en San Juan.', translit: 'TEN-goh oon TEE-oh ee OO-nah TEE-ah en san HWAHN', en: 'I have an uncle and an aunt in San Juan.', words: [{ id: 'u05-tengo', es: 'Tengo', en: 'I have' }, { id: 'u05-tio', es: 'tío', en: 'uncle' }, { id: 'u05-tia', es: 'tía', en: 'aunt' }] },
    { es: 'Tu padre es maestro y su madre es doctora.', translit: 'too PAH-dreh es ma-ES-troh ee soo MAH-dreh es dok-TOH-rah', en: 'Your father is a teacher and his mother is a doctor.', words: [{ id: 'u05-tu', es: 'Tu', en: 'your' }, { id: 'u05-padre', es: 'padre', en: 'father' }, { id: 'u05-su', es: 'su', en: 'his' }, { id: 'u05-madre', es: 'madre', en: 'mother' }] },
    { es: 'Mis primos son niños muy alegres.', translit: 'mees PREE-mohs son NEE-nyohs mwee ah-LEH-gres', en: 'My cousins are very happy children.', words: [{ id: 'u05-primo', es: 'primo', en: 'cousin' }, { id: 'u05-nino', es: 'niño', en: 'child' }] }
  ],
  dialogue: {
    title: 'La cena familiar (Family dinner)',
    lines: [
      { who: 'Luis', es: '¿Cómo está tu familia, Ana?', en: 'How is your family, Ana?' },
      { who: 'Ana', es: 'Muy bien. Mi mamá cocina y mi papá ayuda.', en: 'Very well. My mom cooks and my dad helps.' },
      { who: 'Luis', es: '¿Tienes hermanos?', en: 'Do you have brothers and sisters?' },
      { who: 'Ana', es: 'Sí, tengo dos hermanos y una hermana.', en: 'Yes, I have two brothers and one sister.' },
      { who: 'Luis', es: '¿Y dónde vive tu abuela?', en: 'And where does your grandmother live?' },
      { who: 'Ana', es: 'Mi abuela vive en Ponce con mi tío.', en: 'My grandmother lives in Ponce with my uncle.' },
      { who: 'Luis', es: '¡Qué familia tan grande!', en: 'What a big family!' }
    ],
    questions: [
      { type: 'mc-es', q: '¿Quién cocina en la familia de Ana?', options: ['su mamá', 'su papá', 'su abuela', 'su tío'], answer: 'su mamá' },
      { type: 'mc-es', q: '¿Cuántos hermanos tiene Ana?', options: ['dos hermanos y una hermana', 'dos hermanas', 'un hermano', 'tres hermanos'], answer: 'dos hermanos y una hermana' },
      { type: 'mc-es', q: '¿Dónde vive la abuela?', options: ['en Ponce', 'en San Juan', 'con Luis', 'en la casa'], answer: 'en Ponce' },
      { type: 'mc-es', q: '¿Con quién vive la abuela?', options: ['con su tío', 'con su mamá', 'con Ana', 'con su papá'], answer: 'con su tío' }
    ]
  },
  quiz: [
    { type: 'mc-en', q: '¿Qué significa «madre»?', options: ['mother', 'father', 'sister', 'aunt'], answer: 'mother', es: 'madre' },
    { type: 'mc-en', q: '¿Qué significa «hermano»?', options: ['brother', 'sister', 'cousin', 'son'], answer: 'brother', es: 'hermano' },
    { type: 'mc-es', q: 'Say my family.', options: ['mi familia', 'tu familia', 'su familia', 'nuestra familia'], answer: 'mi familia', es: 'mi familia' },
    { type: 'typing', q: 'Type sister in Spanish', answer: 'hermana', accepts: [], es: 'hermana' },
    { type: 'mc-en', q: '¿Qué significa «abuela»?', options: ['grandmother', 'grandfather', 'aunt', 'mother'], answer: 'grandmother', es: 'abuela' },
    { type: 'mc-es', q: 'Say our house (house = casa).', options: ['nuestra casa', 'mi casa', 'su casa', 'tu casa'], answer: 'nuestra casa', es: 'nuestra casa' },
    { type: 'mc-en', q: '¿Qué significa «tío»?', options: ['uncle', 'aunt', 'cousin', 'father'], answer: 'uncle', es: 'tío' },
    { type: 'typing', q: 'Type son in Spanish', answer: 'hijo', accepts: [], es: 'hijo' },
    { type: 'mc-es', q: 'Which word means my?', options: ['mi', 'tu', 'su', 'nuestro'], answer: 'mi', es: 'mi' },
    { type: 'mc-en', q: '¿Qué significa «esposa»?', options: ['wife', 'husband', 'daughter', 'mother'], answer: 'wife', es: 'esposa' },
    { type: 'mc-es', q: 'Say my grandmother.', options: ['mi abuela', 'mi abuelo', 'tu abuela', 'su abuela'], answer: 'mi abuela', es: 'mi abuela' },
    { type: 'typing', q: 'Type family in Spanish', answer: 'familia', accepts: [], es: 'familia' }
  ],
  test: {
    title: 'Unit 5 test — Family & possessives',
    questions: [
      { type: 'mc-en', q: '¿Qué significa «padre»?', options: ['father', 'mother', 'uncle', 'grandfather'], answer: 'father', es: 'padre' },
      { type: 'mc-es', q: 'Say my aunt.', options: ['mi tía', 'mi tío', 'tu tía', 'su tía'], answer: 'mi tía', es: 'mi tía' },
      { type: 'typing', q: 'Type daughter in Spanish', answer: 'hija', accepts: [], es: 'hija' },
      { type: 'mc-en', q: '¿Qué significa «primo»?', options: ['cousin', 'brother', 'uncle', 'nephew'], answer: 'cousin', es: 'primo' },
      { type: 'mc-es', q: 'Say our mother.', options: ['nuestra madre', 'nuestro madre', 'nuestras madre', 'nuestros madre'], answer: 'nuestra madre', es: 'nuestra madre' },
      { type: 'typing', q: 'Type grandfather in Spanish', answer: 'abuelo', accepts: [], es: 'abuelo' },
      { type: 'mc-en', q: '¿Qué significa «sobrino»?', options: ['nephew', 'uncle', 'cousin', 'son'], answer: 'nephew', es: 'sobrino' },
      { type: 'mc-es', q: 'Say I have two brothers.', options: ['Tengo dos hermanos', 'Tengo dos hermana', 'Soy dos hermanos', 'Estoy dos hermanos'], answer: 'Tengo dos hermanos', es: 'Tengo dos hermanos' },
      { type: 'mc-en', q: '¿Qué significa «niña»?', options: ['girl', 'boy', 'woman', 'baby'], answer: 'girl', es: 'niña' },
      { type: 'typing', q: 'Type husband in Spanish', answer: 'esposo', accepts: [], es: 'esposo' },
      { type: 'mc-es', q: 'Which word means our (feminine singular)?', options: ['nuestra', 'nuestro', 'mis', 'su'], answer: 'nuestra', es: 'nuestra' },
      { type: 'mc-en', q: '¿Qué significa «querido»?', options: ['dear', 'big', 'small', 'new'], answer: 'dear', es: 'querido' }
    ]
  }
};
