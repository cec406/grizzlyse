// Unit 20 — Technology & communication. A2.
export const unit = {
  id: 'u20',
  level: 'A2',
  number: 20,
  title: 'Technology & communication',
  titleEs: 'La tecnología',
  story: 'Your phone will not connect and you need to text your host family in Caguas. In this unit you learn the words for phones, apps and the internet, plus the verbs to call, send, download and share. This is the vocabulary of everyday life.',
  grammar: [
    {
      topic: 'Talking about devices',
      explanation: 'Every device has a gender, and you need the right article. El teléfono, el celular and el internet are masculine; la computadora, la aplicación and la batería are feminine. Learn each noun with its article.',
      table: [
        ['Article + noun', 'English'],
        ['el teléfono', 'the phone'],
        ['el celular', 'the cell phone'],
        ['la computadora', 'the computer'],
        ['el internet', 'the internet'],
        ['la aplicación', 'the app'],
        ['la batería', 'the battery'],
        ['la contraseña', 'the password']
      ],
      examples: [
        { es: 'Mi celular tiene poca batería.', trans: 'mee seh-loo-LAR TYEH-neh PO-kah bah-teh-REE-ah', en: 'My cell phone has little battery.' },
        { es: 'La aplicación no funciona.', trans: 'lah ah-plee-kah-SYON no foon-SYO-nah', en: 'The app does not work.' }
      ]
    },
    {
      topic: 'Verbs for going online',
      explanation: 'These verbs cover almost everything you do online. Most are regular -ar verbs, and enviar adds an accent in some forms: envío, envías, envía.',
      table: [
        ['Verb', 'yo form', 'English'],
        ['llamar', 'llamo', 'I call'],
        ['mandar', 'mando', 'I send'],
        ['enviar', 'envío', 'I send (a message)'],
        ['descargar', 'descargo', 'I download'],
        ['subir', 'subo', 'I upload'],
        ['buscar', 'busco', 'I search / look for'],
        ['compartir', 'comparto', 'I share']
      ],
      examples: [
        { es: 'Descargo música y vídeos.', trans: 'des-KAR-go MOO-see-kah ee BEE-deh-os', en: 'I download music and videos.' },
        { es: 'Busco información en internet.', trans: 'BOOS-ko een-for-mah-SYON en een-ter-NET', en: 'I look for information on the internet.' }
      ]
    },
    {
      topic: 'Object pronouns: me, te, lo, la',
      explanation: 'When you send, call or share something, a small pronoun goes before the verb. Use me (to me), te (to you), lo (it, masculine), la (it, feminine). Te mando un mensaje means I send you a message.',
      table: [
        ['Spanish', 'English'],
        ['Te mando un mensaje.', 'I send you a message.'],
        ['Me llamas por la noche.', 'You call me at night.'],
        ['Lo descargo ahora.', 'I download it now.'],
        ['La comparto contigo.', 'I share it with you.']
      ],
      examples: [
        { es: 'Te mando el archivo por correo.', trans: 'teh MAN-do el ar-CHEE-bo por ko-REH-o', en: 'I send you the file by email.' },
        { es: 'Me llamas mañana.', trans: 'meh YAH-mas mah-NYAH-nah', en: 'You call me tomorrow.' }
      ]
    },
    {
      topic: 'Useful phone language',
      explanation: 'These phrases come up constantly in texts and calls. Use them to ask for a number, check the connection and say you will write later.',
      table: [
        ['Spanish', 'English'],
        ['¿Cuál es tu número?', 'What is your number?'],
        ['¿Hay wifi aquí?', 'Is there wi-fi here?'],
        ['No tengo señal.', 'I have no signal.'],
        ['Te escribo luego.', 'I write to you later.']
      ],
      examples: [
        { es: '¿Hay wifi en el café?', trans: 'ah-ee WEE-fee en el kah-FEH', en: 'Is there wi-fi in the cafe?' },
        { es: 'No tengo señal en el metro.', trans: 'no TEN-go seh-NYAL en el MEH-tro', en: 'I have no signal in the subway.' }
      ]
    }
  ],
  vocabulary: [
    { id: 'u20-telefono', es: 'teléfono', translit: 'teh-LEH-fo-no', en: 'telephone', pos: 'noun', gender: 'm' },
    { id: 'u20-celular', es: 'celular', translit: 'seh-loo-LAR', en: 'cell phone', pos: 'noun', gender: 'm' },
    { id: 'u20-computadora', es: 'computadora', translit: 'kom-poo-tah-DO-rah', en: 'computer', pos: 'noun', gender: 'f' },
    { id: 'u20-internet', es: 'internet', translit: 'een-ter-NET', en: 'internet', pos: 'noun', gender: 'm' },
    { id: 'u20-correo', es: 'correo', translit: 'ko-REH-o', en: 'email / mail', pos: 'noun', gender: 'm' },
    { id: 'u20-mensaje', es: 'mensaje', translit: 'men-SAH-heh', en: 'message', pos: 'noun', gender: 'm' },
    { id: 'u20-redessociales', es: 'redes sociales', translit: 'REH-des so-SYAH-les', en: 'social media', pos: 'noun', gender: 'p' },
    { id: 'u20-aplicacion', es: 'aplicación', translit: 'ah-plee-kah-SYON', en: 'application / app', pos: 'noun', gender: 'f' },
    { id: 'u20-contrasena', es: 'contraseña', translit: 'kon-trah-SEH-nyah', en: 'password', pos: 'noun', gender: 'f' },
    { id: 'u20-wifi', es: 'wifi', translit: 'WEE-fee', en: 'wi-fi', pos: 'noun', gender: 'm' },
    { id: 'u20-bateria', es: 'batería', translit: 'bah-teh-REE-ah', en: 'battery', pos: 'noun', gender: 'f' },
    { id: 'u20-pantalla', es: 'pantalla', translit: 'pan-TAH-yah', en: 'screen', pos: 'noun', gender: 'f' },
    { id: 'u20-archivo', es: 'archivo', translit: 'ar-CHEE-bo', en: 'file', pos: 'noun', gender: 'm' },
    { id: 'u20-foto', es: 'foto', translit: 'FO-to', en: 'photo', pos: 'noun', gender: 'f' },
    { id: 'u20-hermana', es: 'hermana', translit: 'er-MAH-nah', en: 'sister', pos: 'noun', gender: 'f' },
    { id: 'u20-llamar', es: 'llamar', translit: 'yah-MAR', en: 'to call', pos: 'verb' },
    { id: 'u20-mandar', es: 'mandar', translit: 'man-DAR', en: 'to send', pos: 'verb' },
    { id: 'u20-enviar', es: 'enviar', translit: 'en-BYAR', en: 'to send (a message)', pos: 'verb' },
    { id: 'u20-descargar', es: 'descargar', translit: 'des-kar-GAR', en: 'to download', pos: 'verb' },
    { id: 'u20-subir', es: 'subir', translit: 'soo-BEER', en: 'to upload', pos: 'verb' },
    { id: 'u20-usar', es: 'usar', translit: 'oo-SAR', en: 'to use', pos: 'verb' },
    { id: 'u20-buscar', es: 'buscar', translit: 'boos-KAR', en: 'to search / to look for', pos: 'verb' },
    { id: 'u20-compartir', es: 'compartir', translit: 'kom-par-TEER', en: 'to share', pos: 'verb' },
    { id: 'u20-recordar', es: 'recordar', translit: 'reh-kor-DAR', en: 'to remember', pos: 'verb' },
    { id: 'u20-conectar', es: 'conectar', translit: 'ko-nek-TAR', en: 'to connect', pos: 'verb' },
    { id: 'u20-nuevo', es: 'nuevo', translit: 'NWEH-bo', en: 'new', pos: 'adjective' },
    { id: 'u20-bajo', es: 'bajo', translit: 'BAH-ho', en: 'low', pos: 'adjective' }
  ],
  phrases: [
    { id: 'p-u20-1', es: '¿Me mandas un mensaje?', trans: 'meh MAN-das oon men-SAH-heh', en: 'Can you send me a message?' },
    { id: 'p-u20-2', es: 'No tengo señal.', trans: 'no TEN-go seh-NYAL', en: 'I have no signal.' },
    { id: 'p-u20-3', es: 'Te escribo luego.', trans: 'teh es-KREE-bo LWEH-go', en: 'I write to you later.' }
  ],
  sentences: [
    { es: 'Te mando un mensaje por el celular.', translit: 'teh MAN-do oon men-SAH-heh por el seh-loo-LAR', en: 'I send you a message by cell phone.', words: [{ id: 'u20-mandar', es: 'mando', en: 'I send' }, { id: 'u20-mensaje', es: 'mensaje', en: 'message' }, { id: 'u20-celular', es: 'celular', en: 'cell phone' }] },
    { es: 'Mi hermana usa las redes sociales todos los días.', translit: 'mee er-MAH-nah OO-sah las REH-des so-SYAH-les TO-dos los DEE-as', en: 'My sister uses social media every day.', words: [{ id: 'u20-hermana', es: 'hermana', en: 'sister' }, { id: 'u20-usar', es: 'usa', en: 'uses' }, { id: 'u20-redessociales', es: 'redes sociales', en: 'social media' }] },
    { es: 'Voy a descargar una aplicación nueva.', translit: 'BOY ah des-kar-GAR OO-nah ah-plee-kah-SYON NWEH-bah', en: 'I am going to download a new app.', words: [{ id: 'u20-descargar', es: 'descargar', en: 'download' }, { id: 'u20-aplicacion', es: 'aplicación', en: 'app' }, { id: 'u20-nuevo', es: 'nueva', en: 'new' }] },
    { es: 'No recuerdo mi contraseña.', translit: 'no reh-KWER-do mee kon-trah-SEH-nyah', en: 'I do not remember my password.', words: [{ id: 'u20-recordar', es: 'recuerdo', en: 'I remember' }, { id: 'u20-contrasena', es: 'contraseña', en: 'password' }] },
    { es: 'La batería de mi teléfono está baja.', translit: 'lah bah-teh-REE-ah deh mee teh-LEH-fo-no es-TA BAH-hah', en: 'The battery of my phone is low.', words: [{ id: 'u20-bateria', es: 'batería', en: 'battery' }, { id: 'u20-telefono', es: 'teléfono', en: 'phone' }, { id: 'u20-bajo', es: 'baja', en: 'low' }] },
    { es: 'Comparto las fotos con mis amigos en internet.', translit: 'kom-PAR-to las FO-tos kon mees ah-MEE-gos en een-ter-NET', en: 'I share the photos with my friends on the internet.', words: [{ id: 'u20-compartir', es: 'Comparto', en: 'I share' }, { id: 'u20-foto', es: 'fotos', en: 'photos' }, { id: 'u20-internet', es: 'internet', en: 'internet' }] }
  ],
  dialogue: {
    title: 'Problemas con el wifi (Wi-fi problems)',
    lines: [
      { who: 'Lucía', es: '¿Tienes wifi en tu casa?', en: 'Do you have wi-fi in your house?' },
      { who: 'Andrés', es: 'Sí, pero mi computadora no se conecta.', en: 'Yes, but my computer does not connect.' },
      { who: 'Lucía', es: '¿Cuál es la contraseña?', en: 'What is the password?' },
      { who: 'Andrés', es: 'No recuerdo la contraseña. Está en mi celular.', en: 'I do not remember the password. It is on my cell phone.' },
      { who: 'Lucía', es: 'Mándame una foto de la pantalla.', en: 'Send me a photo of the screen.' },
      { who: 'Andrés', es: 'Listo, te la mando ahora.', en: 'Done, I am sending it to you now.' }
    ],
    questions: [
      { type: 'mc-en', q: '¿Qué problema tiene Andrés?', options: ['su computadora no se conecta', 'no tiene celular', 'no tiene correo', 'no tiene fotos'], answer: 'su computadora no se conecta' },
      { type: 'mc-en', q: '¿Dónde está la contraseña?', options: ['en el celular', 'en la computadora', 'en la pantalla', 'en el correo'], answer: 'en el celular' },
      { type: 'mc-en', q: '¿Qué le manda Andrés a Lucía?', options: ['una foto', 'un correo', 'un archivo', 'un teléfono'], answer: 'una foto' }
    ]
  },
  quiz: [
    { type: 'mc-en', q: '¿Qué significa «celular»?', options: ['cell phone', 'computer', 'screen', 'battery'], answer: 'cell phone', es: 'celular' },
    { type: 'mc-en', q: '¿Qué significa «contraseña»?', options: ['password', 'message', 'app', 'signal'], answer: 'password', es: 'contraseña' },
    { type: 'mc-es', q: 'How do you say to download?', options: ['descargar', 'subir', 'mandar', 'usar'], answer: 'descargar', es: 'descargar' },
    { type: 'mc-es', q: 'Which word means screen?', options: ['pantalla', 'batería', 'correo', 'archivo'], answer: 'pantalla', es: 'pantalla' },
    { type: 'mc-en', q: '¿Qué significa «mensaje»?', options: ['message', 'password', 'file', 'photo'], answer: 'message', es: 'mensaje' },
    { type: 'mc-en', q: '¿Qué significa «redes sociales»?', options: ['social media', 'internet', 'email', 'phone'], answer: 'social media', es: 'redes sociales' },
    { type: 'typing', q: 'Type computer in Spanish', answer: 'computadora', accepts: [], es: 'computadora' },
    { type: 'typing', q: 'Type to call in Spanish', answer: 'llamar', accepts: [], es: 'llamar' },
    { type: 'mc-es', q: 'Complete: ___ un mensaje por el celular.', options: ['Mando', 'Manda', 'Mandan', 'Mandas'], answer: 'Mando', es: 'Mando un mensaje' },
    { type: 'mc-en', q: '¿Qué significa «batería»?', options: ['battery', 'screen', 'file', 'password'], answer: 'battery', es: 'batería' },
    { type: 'mc-es', q: 'Which word means app?', options: ['aplicación', 'archivo', 'correo', 'foto'], answer: 'aplicación', es: 'aplicación' },
    { type: 'mc-en', q: '¿Qué significa «compartir»?', options: ['to share', 'to download', 'to connect', 'to remember'], answer: 'to share', es: 'compartir' }
  ],
  test: {
    title: 'Unit 20 test — Technology and communication',
    questions: [
      { type: 'mc-en', q: '¿Qué significa «teléfono»?', options: ['telephone', 'computer', 'screen', 'message'], answer: 'telephone', es: 'teléfono' },
      { type: 'mc-es', q: 'Say I use.', options: ['Uso', 'Usas', 'Usa', 'Usan'], answer: 'Uso', es: 'Uso' },
      { type: 'typing', q: 'Type internet in Spanish', answer: 'internet', accepts: [], es: 'internet' },
      { type: 'typing', q: 'Type email / mail in Spanish', answer: 'correo', accepts: [], es: 'correo' },
      { type: 'mc-en', q: '¿Qué significa «wifi»?', options: ['wi-fi', 'signal', 'screen', 'file'], answer: 'wi-fi', es: 'wifi' },
      { type: 'mc-es', q: 'Which word means file?', options: ['archivo', 'foto', 'correo', 'mensaje'], answer: 'archivo', es: 'archivo' },
      { type: 'mc-es', q: 'Say I do not remember.', options: ['No recuerdo', 'No recordar', 'No recuerdas', 'No recuerdan'], answer: 'No recuerdo', es: 'No recuerdo' },
      { type: 'mc-en', q: '¿Qué significa «buscar»?', options: ['to search / look for', 'to send', 'to upload', 'to share'], answer: 'to search / look for', es: 'buscar' },
      { type: 'mc-es', q: 'Complete: Mi celular tiene poca ___.', options: ['batería', 'pantalla', 'correo', 'foto'], answer: 'batería', es: 'batería' },
      { type: 'mc-en', q: '¿Qué significa «foto»?', options: ['photo', 'file', 'message', 'app'], answer: 'photo', es: 'foto' },
      { type: 'typing', q: 'Type to connect in Spanish', answer: 'conectar', accepts: [], es: 'conectar' },
      { type: 'mc-es', q: 'Say I am going to download an app.', options: ['Voy a descargar una aplicación', 'Voy a descargar un aplicación', 'Voy descargar una aplicación', 'Voy a descargo una aplicación'], answer: 'Voy a descargar una aplicación', es: 'Voy a descargar una aplicación' }
    ]
  }
};
