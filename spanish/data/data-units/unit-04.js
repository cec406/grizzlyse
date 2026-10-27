// Unit 4 — Numbers, age & dates. A1.
export const unit = {
  id: 'u04',
  level: 'A1',
  number: 4,
  title: 'Numbers, age & dates',
  titleEs: 'Números y edad',
  story: 'Prices, phone numbers, birthdays and how old you are — numbers are everywhere. In this unit you count to one hundred, ask people their age with tener años, and name the days of the week. By the end you can give your birthday and read any price tag in San Juan.',
  grammar: [
    {
      topic: 'Counting to one hundred',
      explanation: 'Learn the ones and the tens first. From sixteen to nineteen and from twenty-one to twenty-nine, Spanish glues the words together: dieciséis, veintiuno. This is the pattern you will use every day.',
      table: [
        ['Number', 'Spanish'],
        ['0 – 5', 'cero, uno, dos, tres, cuatro, cinco'],
        ['6 – 10', 'seis, siete, ocho, nueve, diez'],
        ['11 – 15', 'once, doce, trece, catorce, quince'],
        ['16 – 19', 'dieciséis, diecisiete, dieciocho, diecinueve'],
        ['20, 30, 40', 'veinte, treinta, cuarenta'],
        ['21, 22', 'veintiuno, veintidós'],
        ['100', 'cien']
      ],
      examples: [
        { es: 'Tengo veintiún dólares.', trans: 'TEN-goh bayn-tee-OON DOH-lah-res', en: 'I have twenty-one dollars.' },
        { es: 'Cuesta cien pesos.', trans: 'KWES-tah syen PEH-sohs', en: 'It costs one hundred pesos.' }
      ]
    },
    {
      topic: 'Age with tener años',
      explanation: 'In Spanish you are not the age — you have it. Use a form of tener plus años: tengo, tienes, tiene. To ask, say ¿Cuántos años tienes?',
      table: [
        ['Spanish', 'English'],
        ['Tengo quince años.', 'I am fifteen years old.'],
        ['¿Cuántos años tienes?', 'How old are you? (informal)'],
        ['Mi hermana tiene ocho años.', 'My sister is eight years old.'],
        ['¿Cuántos años tiene usted?', 'How old are you? (polite)']
      ],
      examples: [
        { es: 'Tengo dieciséis años.', trans: 'TEN-goh dye-see-SAYS AH-nyohs', en: 'I am sixteen years old.' }
      ]
    },
    {
      topic: 'Days and dates',
      explanation: 'Days of the week are not capitalised in Spanish, and the week starts on Monday. For a date, say el plus the number plus de plus the month: el cinco de mayo.',
      table: [
        ['Spanish', 'English'],
        ['lunes, martes, miércoles', 'Monday, Tuesday, Wednesday'],
        ['jueves, viernes', 'Thursday, Friday'],
        ['sábado, domingo', 'Saturday, Sunday'],
        ['¿Qué día es hoy?', 'What day is today?'],
        ['el cinco de mayo', 'the fifth of May']
      ],
      examples: [
        { es: 'Hoy es lunes y mañana es martes.', trans: 'oy es LOO-nes ee ma-NYA-nah es MAR-tes', en: 'Today is Monday and tomorrow is Tuesday.' },
        { es: 'Mi cumpleaños es el diez de octubre.', trans: 'mee koom-pleh-A-nyohs es el dyehs deh ok-TOO-breh', en: 'My birthday is the tenth of October.' }
      ]
    }
  ],
  vocabulary: [
    { id: 'u04-uno', es: 'uno', translit: 'OO-noh', en: 'one', pos: 'numeral' },
    { id: 'u04-dos', es: 'dos', translit: 'dohs', en: 'two', pos: 'numeral' },
    { id: 'u04-tres', es: 'tres', translit: 'tres', en: 'three', pos: 'numeral' },
    { id: 'u04-cuatro', es: 'cuatro', translit: 'KWAH-troh', en: 'four', pos: 'numeral' },
    { id: 'u04-cinco', es: 'cinco', translit: 'SEEN-koh', en: 'five', pos: 'numeral' },
    { id: 'u04-seis', es: 'seis', translit: 'says', en: 'six', pos: 'numeral' },
    { id: 'u04-siete', es: 'siete', translit: 'SYEH-teh', en: 'seven', pos: 'numeral' },
    { id: 'u04-ocho', es: 'ocho', translit: 'OH-choh', en: 'eight', pos: 'numeral' },
    { id: 'u04-nueve', es: 'nueve', translit: 'NWEH-beh', en: 'nine', pos: 'numeral' },
    { id: 'u04-diez', es: 'diez', translit: 'dyehs', en: 'ten', pos: 'numeral' },
    { id: 'u04-veinte', es: 'veinte', translit: 'BAYN-teh', en: 'twenty', pos: 'numeral' },
    { id: 'u04-cien', es: 'cien', translit: 'syen', en: 'one hundred', pos: 'numeral' },
    { id: 'u04-anos', es: 'años', translit: 'AH-nyohs', en: 'years', pos: 'noun', gender: 'm' },
    { id: 'u04-edad', es: 'edad', translit: 'eh-DAD', en: 'age', pos: 'noun', gender: 'f' },
    { id: 'u04-cumpleanos', es: 'cumpleaños', translit: 'koom-pleh-A-nyohs', en: 'birthday', pos: 'noun', gender: 'm' },
    { id: 'u04-lunes', es: 'lunes', translit: 'LOO-nes', en: 'Monday', pos: 'noun', gender: 'm' },
    { id: 'u04-martes', es: 'martes', translit: 'MAR-tes', en: 'Tuesday', pos: 'noun', gender: 'm' },
    { id: 'u04-miercoles', es: 'miércoles', translit: 'MYEHR-koh-les', en: 'Wednesday', pos: 'noun', gender: 'm' },
    { id: 'u04-jueves', es: 'jueves', translit: 'HWEH-bes', en: 'Thursday', pos: 'noun', gender: 'm' },
    { id: 'u04-viernes', es: 'viernes', translit: 'BYEHR-nes', en: 'Friday', pos: 'noun', gender: 'm' },
    { id: 'u04-sabado', es: 'sábado', translit: 'SAH-bah-doh', en: 'Saturday', pos: 'noun', gender: 'm' },
    { id: 'u04-domingo', es: 'domingo', translit: 'doh-MEEN-goh', en: 'Sunday', pos: 'noun', gender: 'm' },
    { id: 'u04-semana', es: 'semana', translit: 'seh-MAH-nah', en: 'week', pos: 'noun', gender: 'f' },
    { id: 'u04-mes', es: 'mes', translit: 'mes', en: 'month', pos: 'noun', gender: 'm' },
    { id: 'u04-dias', es: 'días', translit: 'DEE-ahs', en: 'days', pos: 'noun', gender: 'm' },
    { id: 'u04-dolares', es: 'dólares', translit: 'DOH-lah-res', en: 'dollars', pos: 'noun', gender: 'm' },
    { id: 'u04-tener', es: 'tener', translit: 'teh-NEHR', en: 'to have', pos: 'verb' },
    { id: 'u04-tengo', es: 'tengo', translit: 'TEN-goh', en: 'I have', pos: 'verb' },
    { id: 'u04-tiene', es: 'tiene', translit: 'TYEH-neh', en: 'he / she has', pos: 'verb' },
    { id: 'u04-tienes', es: 'tienes', translit: 'TYEH-nes', en: 'you have (informal)', pos: 'verb' },
    { id: 'u04-cuantos', es: 'cuántos', translit: 'KWAN-tohs', en: 'how many', pos: 'question' },
    { id: 'u04-hoy', es: 'hoy', translit: 'oy', en: 'today', pos: 'adverb' },
    { id: 'u04-manana', es: 'mañana', translit: 'ma-NYA-nah', en: 'tomorrow / morning', pos: 'adverb' }
  ],
  phrases: [
    { id: 'p-u04-1', es: '¿Cuántos años tienes?', trans: 'KWAN-tohs AH-nyohs TYEH-nes', en: 'How old are you? (informal)' },
    { id: 'p-u04-2', es: 'Tengo dieciséis años.', trans: 'TEN-goh dye-see-SAYS AH-nyohs', en: 'I am sixteen years old.' },
    { id: 'p-u04-3', es: '¿Qué día es hoy?', trans: 'keh DEE-ah es oy', en: 'What day is today?' }
  ],
  sentences: [
    { es: 'Tengo dieciséis años.', translit: 'TEN-goh dye-see-SAYS AH-nyohs', en: 'I am sixteen years old.', words: [{ id: 'u04-tengo', es: 'Tengo', en: 'I have' }, { id: 'u04-anos', es: 'años', en: 'years' }] },
    { es: 'Mi cumpleaños es el cinco de mayo.', translit: 'mee koom-pleh-A-nyohs es el SEEN-koh deh MAH-yoh', en: 'My birthday is the fifth of May.', words: [{ id: 'u04-cumpleanos', es: 'cumpleaños', en: 'birthday' }, { id: 'u04-cinco', es: 'cinco', en: 'five' }] },
    { es: 'Hoy es lunes y mañana es martes.', translit: 'oy es LOO-nes ee ma-NYA-nah es MAR-tes', en: 'Today is Monday and tomorrow is Tuesday.', words: [{ id: 'u04-hoy', es: 'Hoy', en: 'today' }, { id: 'u04-lunes', es: 'lunes', en: 'Monday' }, { id: 'u04-manana', es: 'mañana', en: 'tomorrow' }, { id: 'u04-martes', es: 'martes', en: 'Tuesday' }] },
    { es: 'La semana tiene siete días.', translit: 'lah seh-MAH-nah TYEH-neh SYEH-teh DEE-ahs', en: 'The week has seven days.', words: [{ id: 'u04-semana', es: 'semana', en: 'week' }, { id: 'u04-tiene', es: 'tiene', en: 'has' }, { id: 'u04-siete', es: 'siete', en: 'seven' }, { id: 'u04-dias', es: 'días', en: 'days' }] },
    { es: '¿Cuántos años tienes?', translit: 'KWAN-tohs AH-nyohs TYEH-nes', en: 'How old are you?', words: [{ id: 'u04-cuantos', es: 'Cuántos', en: 'how many' }, { id: 'u04-anos', es: 'años', en: 'years' }, { id: 'u04-tienes', es: 'tienes', en: 'you have' }] },
    { es: 'Hoy es sábado, el diez de octubre.', translit: 'oy es SAH-bah-doh el dyehs deh ok-TOO-breh', en: 'Today is Saturday, the tenth of October.', words: [{ id: 'u04-hoy', es: 'Hoy', en: 'today' }, { id: 'u04-sabado', es: 'sábado', en: 'Saturday' }, { id: 'u04-diez', es: 'diez', en: 'ten' }] }
  ],
  dialogue: {
    title: 'En la fiesta de cumpleaños (At the birthday party)',
    lines: [
      { who: 'Sofía', es: '¡Feliz cumpleaños! ¿Cuántos años tienes?', en: 'Happy birthday! How old are you?' },
      { who: 'Diego', es: 'Gracias. Tengo quince años. ¿Y tú?', en: 'Thank you. I am fifteen years old. And you?' },
      { who: 'Sofía', es: 'Yo tengo dieciséis. Mi cumpleaños es el tres de enero.', en: 'I am sixteen. My birthday is the third of January.' },
      { who: 'Diego', es: '¿Qué día es hoy?', en: 'What day is today?' },
      { who: 'Sofía', es: 'Hoy es sábado. La fiesta es hoy.', en: 'Today is Saturday. The party is today.' },
      { who: 'Diego', es: '¡Qué bueno! Hay música y comida.', en: 'How nice! There is music and food.' },
      { who: 'Sofía', es: 'Sí, y hay veinte personas.', en: 'Yes, and there are twenty people.' }
    ],
    questions: [
      { type: 'mc-es', q: '¿Cuántos años tiene Diego?', options: ['quince', 'dieciséis', 'tres', 'veinte'], answer: 'quince' },
      { type: 'mc-es', q: '¿Cuándo es el cumpleaños de Sofía?', options: ['el tres de enero', 'hoy', 'el diez de octubre', 'el cinco de mayo'], answer: 'el tres de enero' },
      { type: 'mc-es', q: '¿Qué día es hoy?', options: ['sábado', 'lunes', 'domingo', 'viernes'], answer: 'sábado' },
      { type: 'mc-es', q: '¿Cuántas personas hay en la fiesta?', options: ['veinte', 'diez', 'quince', 'cien'], answer: 'veinte' }
    ]
  },
  quiz: [
    { type: 'mc-en', q: '¿Qué significa «cien»?', options: ['one hundred', 'ten', 'twenty', 'fifty'], answer: 'one hundred', es: 'cien' },
    { type: 'mc-en', q: '¿Qué significa «cumpleaños»?', options: ['birthday', 'week', 'month', 'age'], answer: 'birthday', es: 'cumpleaños' },
    { type: 'mc-es', q: 'Say I am ten years old.', options: ['Tengo diez años', 'Soy diez años', 'Tengo diez', 'Es diez años'], answer: 'Tengo diez años', es: 'Tengo diez años' },
    { type: 'typing', q: 'Type twenty in Spanish', answer: 'veinte', accepts: [], es: 'veinte' },
    { type: 'mc-en', q: '¿Qué significa «sábado»?', options: ['Saturday', 'Sunday', 'Friday', 'Monday'], answer: 'Saturday', es: 'sábado' },
    { type: 'mc-es', q: 'Say Wednesday.', options: ['miércoles', 'martes', 'jueves', 'viernes'], answer: 'miércoles', es: 'miércoles' },
    { type: 'mc-en', q: '¿Qué significa «semana»?', options: ['week', 'month', 'year', 'day'], answer: 'week', es: 'semana' },
    { type: 'typing', q: 'Type seven in Spanish', answer: 'siete', accepts: [], es: 'siete' },
    { type: 'mc-es', q: 'Ask how old are you? (informal)', options: ['¿Cuántos años tienes?', '¿Cuántos años?', '¿Qué edad?', '¿Cómo estás?'], answer: '¿Cuántos años tienes?', es: '¿Cuántos años tienes?' },
    { type: 'mc-en', q: '¿Qué significa «hoy»?', options: ['today', 'tomorrow', 'yesterday', 'now'], answer: 'today', es: 'hoy' },
    { type: 'mc-es', q: 'Say Monday.', options: ['lunes', 'domingo', 'sábado', 'martes'], answer: 'lunes', es: 'lunes' },
    { type: 'typing', q: 'Type age in Spanish', answer: 'edad', accepts: [], es: 'edad' }
  ],
  test: {
    title: 'Unit 4 test — Numbers, age & dates',
    questions: [
      { type: 'mc-en', q: '¿Qué significa «diez»?', options: ['ten', 'two', 'twelve', 'twenty'], answer: 'ten', es: 'diez' },
      { type: 'mc-es', q: 'Say five.', options: ['cinco', 'cuatro', 'seis', 'ocho'], answer: 'cinco', es: 'cinco' },
      { type: 'typing', q: 'Type three in Spanish', answer: 'tres', accepts: [], es: 'tres' },
      { type: 'mc-en', q: '¿Qué significa «domingo»?', options: ['Sunday', 'Saturday', 'Monday', 'Thursday'], answer: 'Sunday', es: 'domingo' },
      { type: 'mc-es', q: 'Say I am fifteen years old.', options: ['Tengo quince años', 'Soy quince años', 'Tengo quince', 'Quince años'], answer: 'Tengo quince años', es: 'Tengo quince años' },
      { type: 'typing', q: 'Type Monday in Spanish', answer: 'lunes', accepts: [], es: 'lunes' },
      { type: 'mc-en', q: '¿Qué significa «mes»?', options: ['month', 'week', 'day', 'year'], answer: 'month', es: 'mes' },
      { type: 'mc-es', q: 'Ask what day is today.', options: ['¿Qué día es hoy?', '¿Cuántos años tienes?', '¿Qué hora es?', '¿Dónde estás?'], answer: '¿Qué día es hoy?', es: '¿Qué día es hoy?' },
      { type: 'typing', q: 'Type one hundred in Spanish', answer: 'cien', accepts: [], es: 'cien' },
      { type: 'mc-en', q: '¿Qué significa «jueves»?', options: ['Thursday', 'Tuesday', 'Friday', 'Wednesday'], answer: 'Thursday', es: 'jueves' },
      { type: 'mc-es', q: 'Say nine.', options: ['nueve', 'diez', 'ocho', 'seis'], answer: 'nueve', es: 'nueve' },
      { type: 'typing', q: 'Type birthday in Spanish', answer: 'cumpleanos', accepts: ['cumpleaños'], es: 'cumpleaños' }
    ]
  }
};
