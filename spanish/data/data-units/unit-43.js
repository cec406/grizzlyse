// Unit 43 — Nuance & precision. C1.
export const unit = {
  id: 'u43',
  level: 'C1',
  number: 43,
  title: 'Nuance & precision',
  titleEs: 'El matiz y la precisión',
  story: 'Two speakers can say almost the same sentence and mean very different things. Ser or estar, a tiny ending like -ito or -azo, one synonym instead of another: this is where Spanish becomes precise and personal. In this unit you sharpen your control of nuance so that people hear exactly what you intend.',
  grammar: [
    {
      topic: 'ser or estar: the adjective changes meaning',
      explanation: 'Some adjectives mean one thing with ser and another with estar. ser describes the nature of a person or thing; estar describes a temporary state. Compare ser listo (clever) with estar listo (ready).',
      table: [
        ['Expression', 'Meaning', 'Other form'],
        ['ser listo', 'to be clever', 'estar listo = to be ready'],
        ['ser aburrido', 'to be boring', 'estar aburrido = to be bored'],
        ['ser rico', 'to be wealthy / tasty', 'estar rico = to be delicious'],
        ['ser malo', 'to be bad', 'estar malo = to be sick'],
        ['ser seguro', 'to be safe', 'estar seguro = to be certain']
      ],
      examples: [
        { es: 'Pedro es muy vivo, siempre gana en los juegos.', trans: 'PEH-droh es mwee BEE-boh SYEM-preh GAH-nah en los HWEH-gos', en: 'Pedro is very sharp, he always wins at games.' },
        { es: 'Mi abuelo está malo y guarda cama.', trans: 'mee ah-BWEH-loh es-TA MAH-loh ee GWAR-dah KAH-mah', en: 'My grandfather is sick and stays in bed.' }
      ]
    },
    {
      topic: 'Diminutives and augmentatives',
      explanation: 'Endings add feeling, not just size. -ito and -ita show smallness or affection (cafecito, ratito); -azo and -ón make things big or intense (golazo, problemón). In Puerto Rico these endings appear in almost every friendly sentence.',
      table: [
        ['Base', 'With ending', 'Feeling'],
        ['café', 'cafecito', 'a nice little coffee'],
        ['ahora', 'ahorita', 'right now, in a moment'],
        ['casa', 'casita', 'a cosy little house'],
        ['gol', 'golazo', 'a spectacular goal'],
        ['problema', 'problemón', 'a huge problem']
      ],
      examples: [
        { es: 'Espérame un ratito, ya casi estoy.', trans: 'es-PEH-rah-meh oon rah-TEE-toh yah KAH-see es-TOY', en: 'Wait for me a little while, I am almost there.' },
        { es: 'Metió un golazo en el último minuto.', trans: 'meh-TYO oon goh-LAH-soh en el OOL-tee-moh mee-NOO-toh', en: 'He scored a spectacular goal in the last minute.' }
      ]
    },
    {
      topic: 'Synonym choice and register',
      explanation: 'Synonyms are not interchangeable. Pedir is neutral, solicitar is formal, rogar is to beg. Decir is plain, afirmar states and sostener defends a view. Choosing the synonym sets the register and the attitude.',
      table: [
        ['Neutral', 'Formal', 'Intense'],
        ['pedir', 'solicitar', 'rogar'],
        ['decir', 'afirmar', 'sostener'],
        ['hacer', 'realizar', 'llevar a cabo'],
        ['empezar', 'comenzar', 'iniciar'],
        ['terminar', 'concluir', 'culminar']
      ],
      examples: [
        { es: 'Te pido un favor, no te lo ruego.', trans: 'teh PEE-doh oon fah-BOR no teh loh RWEH-goh', en: 'I am asking you a favour, I am not begging you.' },
        { es: 'El autor sostiene que la idea es correcta.', trans: 'el ow-TOR sos-TYEH-neh keh lah ee-DEH-ah es ko-RREK-tah', en: 'The author maintains that the idea is correct.' }
      ]
    }
  ],
  vocabulary: [
    { id: 'u43-matiz', es: 'matiz', translit: 'mah-TEES', en: 'nuance / shade', pos: 'noun', gender: 'm' },
    { id: 'u43-preciso', es: 'preciso', translit: 'preh-SEE-soh', en: 'precise', pos: 'adjective' },
    { id: 'u43-sinonimo', es: 'sinónimo', translit: 'see-NOH-nee-moh', en: 'synonym', pos: 'noun', gender: 'm' },
    { id: 'u43-diminutivo', es: 'diminutivo', translit: 'dee-mee-noo-TEE-boh', en: 'diminutive', pos: 'noun', gender: 'm' },
    { id: 'u43-aumentativo', es: 'aumentativo', translit: 'ow-men-tah-TEE-boh', en: 'augmentative', pos: 'noun', gender: 'm' },
    { id: 'u43-carino', es: 'cariño', translit: 'kah-REE-nyoh', en: 'affection', pos: 'noun', gender: 'm' },
    { id: 'u43-despectivo', es: 'despectivo', translit: 'des-pek-TEE-boh', en: 'disparaging / pejorative', pos: 'adjective' },
    { id: 'u43-ahorita', es: 'ahorita', translit: 'ah-oh-REE-tah', en: 'right now / in a moment', pos: 'adverb' },
    { id: 'u43-cafecito', es: 'cafecito', translit: 'kah-feh-SEE-toh', en: 'a nice little coffee', pos: 'noun', gender: 'm' },
    { id: 'u43-golazo', es: 'golazo', translit: 'goh-LAH-soh', en: 'a spectacular goal', pos: 'noun', gender: 'm' },
    { id: 'u43-problemon', es: 'problemón', translit: 'proh-bleh-MON', en: 'a huge problem', pos: 'noun', gender: 'm' },
    { id: 'u43-sutileza', es: 'sutileza', translit: 'soo-tee-LEH-sah', en: 'subtlety', pos: 'noun', gender: 'f' },
    { id: 'u43-connotacion', es: 'connotación', translit: 'ko-no-tah-SYON', en: 'connotation', pos: 'noun', gender: 'f' },
    { id: 'u43-atenuar', es: 'atenuar', translit: 'ah-teh-NWAR', en: 'to soften / to tone down', pos: 'verb' },
    { id: 'u43-enfatizar', es: 'enfatizar', translit: 'en-fah-tee-SAR', en: 'to emphasize', pos: 'verb' },
    { id: 'u43-matizar', es: 'matizar', translit: 'mah-tee-SAR', en: 'to nuance / to qualify', pos: 'verb' },
    { id: 'u43-exagerar', es: 'exagerar', translit: 'ek-sah-heh-RAR', en: 'to exaggerate', pos: 'verb' },
    { id: 'u43-tajante', es: 'tajante', translit: 'tah-HAN-teh', en: 'blunt / categorical', pos: 'adjective' }
  ],
  phrases: [
    { id: 'p-u43-1', es: 'No es lo mismo ser listo que estar listo.', trans: 'no es loh MEES-moh ser LEES-toh keh es-TAR LEES-toh', en: 'Being clever is not the same as being ready.' },
    { id: 'p-u43-2', es: 'Un cafecito y arreglamos el mundo.', trans: 'oon kah-feh-SEE-toh ee ah-rreh-GLAH-mos el MOON-doh', en: 'A little coffee and we will fix the world.' },
    { id: 'p-u43-3', es: 'Ahorita mismo lo hago.', trans: 'ah-oh-REE-tah MEES-moh loh AH-goh', en: 'I will do it right now.' }
  ],
  sentences: [
    { es: 'Hay un matiz muy fino entre estas dos palabras.', translit: 'ai oon mah-TEES mwee FEE-noh EN-treh ES-tas dos pah-LAH-brahs', en: 'There is a very fine nuance between these two words.', words: [{ id: 'u43-matiz', es: 'matiz', en: 'nuance' }] },
    { es: 'El diminutivo añade cariño y cercanía.', translit: 'el dee-mee-noo-TEE-boh ah-NYAH-deh kah-REE-nyoh ee ser-kah-NEE-ah', en: 'The diminutive adds affection and closeness.', words: [{ id: 'u43-diminutivo', es: 'diminutivo', en: 'diminutive' }, { id: 'u43-carino', es: 'cariño', en: 'affection' }] },
    { es: 'El aumentativo «golazo» suena grande y rotundo.', translit: 'el ow-men-tah-TEE-boh goh-LAH-soh SWEH-nah GRAN-deh ee roh-TOON-doh', en: 'The augmentative golazo sounds big and forceful.', words: [{ id: 'u43-aumentativo', es: 'aumentativo', en: 'augmentative' }, { id: 'u43-golazo', es: 'golazo', en: 'a spectacular goal' }] },
    { es: 'Tu connotación negativa no me parece justa.', translit: 'too ko-no-tah-SYON neh-gah-TEE-bah no meh pah-REH-seh HOOS-tah', en: 'Your negative connotation does not seem fair to me.', words: [{ id: 'u43-connotacion', es: 'connotación', en: 'connotation' }] },
    { es: 'Podemos atenuar la crítica con un tono más suave.', translit: 'po-DEH-mos ah-teh-NWAR lah KREE-tee-kah kon oon TOH-noh mas SWAH-beh', en: 'We can soften the criticism with a gentler tone.', words: [{ id: 'u43-atenuar', es: 'atenuar', en: 'to soften' }] },
    { es: 'Quiero enfatizar que no exageramos nada.', translit: 'KYEH-roh en-fah-tee-SAR keh no ek-sah-heh-RAH-mos NAH-dah', en: 'I want to emphasize that we are not exaggerating at all.', words: [{ id: 'u43-enfatizar', es: 'enfatizar', en: 'to emphasize' }, { id: 'u43-exagerar', es: 'exageramos', en: 'we exaggerate' }] },
    { es: 'Ahorita tomo un cafecito antes de salir.', translit: 'ah-oh-REE-tah TOH-moh oon kah-feh-SEE-toh AN-tes deh sah-LEER', en: 'I will have a little coffee right now before going out.', words: [{ id: 'u43-ahorita', es: 'Ahorita', en: 'right now' }, { id: 'u43-cafecito', es: 'cafecito', en: 'a little coffee' }] },
    { es: 'Su respuesta fue tajante y no dejó dudas.', translit: 'soo res-PWES-tah fweh tah-HAN-teh ee no deh-HO DOO-dahs', en: 'Her answer was blunt and left no doubts.', words: [{ id: 'u43-tajante', es: 'tajante', en: 'blunt' }] },
    { es: 'Tenemos un problemón con esa decisión.', translit: 'teh-NEH-mos oon proh-bleh-MON kon EH-sah deh-see-SYON', en: 'We have a huge problem with that decision.', words: [{ id: 'u43-problemon', es: 'problemón', en: 'a huge problem' }] }
  ],
  dialogue: {
    title: 'Ser o estar (To be or to be)',
    lines: [
      { who: 'Elena', es: 'Luis, ¿tú eres listo o estás listo?', en: 'Luis, are you clever or are you ready?' },
      { who: 'Luis', es: 'Depende. Soy listo porque estudié, y estoy listo porque ya terminé.', en: 'It depends. I am clever because I studied, and I am ready because I already finished.' },
      { who: 'Elena', es: 'Qué bien. Y tu sopa, ¿es rica o está rica?', en: 'How nice. And your soup, is it tasty or delicious?' },
      { who: 'Luis', es: 'Jaja, está rica, y además la cocinera es rica.', en: 'Ha ha, it is delicious, and besides the cook is wealthy.' },
      { who: 'Elena', es: 'Eres un vivo. Mejor dime: ¿estás seguro de que salimos a las ocho?', en: 'You are a sly one. Better tell me: are you certain that we leave at eight?' },
      { who: 'Luis', es: 'Sí, estoy seguro. Eso sí, llega puntual, que odio esperar.', en: 'Yes, I am certain. That said, arrive on time, because I hate waiting.' }
    ],
    questions: [
      { type: 'mc-en', q: '¿Por qué dice Luis que es listo?', options: ['porque estudió', 'porque terminó', 'porque es rico', 'porque es puntual'], answer: 'porque estudió' },
      { type: 'mc-en', q: '¿Cómo está la sopa?', options: ['rica', 'fría', 'salada', 'sosa'], answer: 'rica' },
      { type: 'mc-en', q: '¿A qué hora salen?', options: ['a las ocho', 'a las siete', 'a las nueve', 'al mediodía'], answer: 'a las ocho' }
    ]
  },
  quiz: [
    { type: 'mc-en', q: '¿Qué significa «matiz»?', options: ['nuance / shade', 'colour only', 'mistake', 'sound'], answer: 'nuance / shade', es: 'matiz' },
    { type: 'mc-en', q: '¿Qué significa «ser listo»?', options: ['to be clever', 'to be ready', 'to be awake', 'to be quick'], answer: 'to be clever', es: 'ser listo' },
    { type: 'mc-en', q: '¿Qué significa «estar listo»?', options: ['to be ready', 'to be clever', 'to be tired', 'to be sick'], answer: 'to be ready', es: 'estar listo' },
    { type: 'mc-es', q: 'Which word means synonym?', options: ['sinónimo', 'antónimo', 'diminutivo', 'sustantivo'], answer: 'sinónimo', es: 'sinónimo' },
    { type: 'mc-en', q: '¿Qué significa «cariño»?', options: ['affection', 'anger', 'fear', 'distance'], answer: 'affection', es: 'cariño' },
    { type: 'mc-es', q: 'Which word is a diminutive?', options: ['cafecito', 'golazo', 'problemón', 'matiz'], answer: 'cafecito', es: 'cafecito' },
    { type: 'mc-es', q: 'Which word is an augmentative?', options: ['golazo', 'cafecito', 'casita', 'ratito'], answer: 'golazo', es: 'golazo' },
    { type: 'mc-en', q: '¿Qué significa «tajante»?', options: ['blunt / categorical', 'slow', 'polite', 'doubtful'], answer: 'blunt / categorical', es: 'tajante' },
    { type: 'typing', q: 'Type nuance in Spanish.', answer: 'matiz', accepts: [], es: 'matiz' },
    { type: 'mc-en', q: '¿Qué significa «atenuar»?', options: ['to soften', 'to shout', 'to repeat', 'to hide'], answer: 'to soften', es: 'atenuar' },
    { type: 'mc-en', q: '¿Qué significa «enfatizar»?', options: ['to emphasize', 'to whisper', 'to forget', 'to delay'], answer: 'to emphasize', es: 'enfatizar' },
    { type: 'mc-es', q: 'Which word means connotation?', options: ['connotación', 'sutileza', 'sinónimo', 'matiz'], answer: 'connotación', es: 'connotación' },
    { type: 'typing', q: 'Type to exaggerate in Spanish.', answer: 'exagerar', accepts: [], es: 'exagerar' },
    { type: 'mc-en', q: '¿Qué significa «ahorita»?', options: ['right now / in a moment', 'never', 'yesterday', 'much later'], answer: 'right now / in a moment', es: 'ahorita' }
  ],
  test: {
    title: 'Unit 43 test — Nuance & precision',
    questions: [
      { type: 'mc-en', q: '¿Qué significa «estar malo»?', options: ['to be sick', 'to be evil', 'to be tasty', 'to be tall'], answer: 'to be sick', es: 'estar malo' },
      { type: 'mc-en', q: '¿Qué significa «ser vivo»?', options: ['to be sharp / clever', 'to be alive', 'to be fast', 'to be loud'], answer: 'to be sharp / clever', es: 'ser vivo' },
      { type: 'mc-es', q: 'Which word means subtlety?', options: ['sutileza', 'sinónimo', 'aumentativo', 'cariño'], answer: 'sutileza', es: 'sutileza' },
      { type: 'typing', q: 'Type big problem in Spanish (one word, augmentative).', answer: 'problemón', accepts: ['problemon'], es: 'problemón' },
      { type: 'mc-en', q: '¿Qué significa «despectivo»?', options: ['disparaging', 'affectionate', 'neutral', 'formal'], answer: 'disparaging', es: 'despectivo' },
      { type: 'mc-es', q: 'Which word means precise?', options: ['preciso', 'confuso', 'tardío', 'ligero'], answer: 'preciso', es: 'preciso' },
      { type: 'typing', q: 'Type synonym in Spanish.', answer: 'sinonimo', accepts: ['sinónimo'], es: 'sinónimo' },
      { type: 'mc-en', q: '¿Qué significa «cafecito»?', options: ['a nice little coffee', 'a large coffee', 'a coffee shop', 'a coffee bean'], answer: 'a nice little coffee', es: 'cafecito' },
      { type: 'mc-es', q: 'Complete with the right verb: La sopa ___ rica.', options: ['está', 'es', 'son', 'están'], answer: 'está', es: 'está' },
      { type: 'mc-en', q: '¿Qué significa «matizar»?', options: ['to nuance / to qualify', 'to paint', 'to count', 'to erase'], answer: 'to nuance / to qualify', es: 'matizar' },
      { type: 'mc-es', q: 'Which sentence means she is boring by nature?', options: ['Ella es aburrida.', 'Ella está aburrida.', 'Ella está aburrida hoy.', 'Ella está aburrida ahora.'], answer: 'Ella es aburrida.', es: 'Ella es aburrida.' },
      { type: 'typing', q: 'Type to emphasize in Spanish.', answer: 'enfatizar', accepts: [], es: 'enfatizar' }
    ]
  }
};
