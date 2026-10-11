// Graded reading texts, A1-A2. Spanish hand-checked; translit is an
// English-friendly pronunciation respelling (ASCII only).
export const READING_A = [
  {
    id: 'rd-01',
    level: 'A1',
    title: 'My family',
    titleEs: 'Mi familia',
    text: 'Me llamo Sofía. Esta es mi familia. Mi mamá se llama Elena y mi papá se llama Carlos. Tengo un hermano y una hermana. Vivimos en San Juan, Puerto Rico. Quiero mucho a mi familia.',
    translit: 'meh YAH-mo so-FEE-ah ES-tah es mee fa-MEE-lee-ah mee ma-MA se YAH-ma eh-LEH-na ee mee pa-PA se YAH-ma KAR-los TEN-go oon er-MA-no ee OO-na er-MA-na bee-BEE-mos en san HWAHN pwer-to REE-ko KYEH-ro MOO-cho a mee fa-MEE-lee-ah',
    glossary: [
      { es: 'familia', en: 'family' },
      { es: 'mamá', en: 'mom' },
      { es: 'papá', en: 'dad' },
      { es: 'hermano', en: 'brother' },
      { es: 'hermana', en: 'sister' },
      { es: 'vivimos', en: 'we live' },
      { es: 'quiero', en: 'I love / I want' }
    ],
    questions: [
      { type: 'mc-en', q: 'Who is Elena?', options: ['the mother', 'the father', 'the sister', 'the grandmother'], answer: 'the mother' },
      { type: 'mc-en', q: 'Where do they live?', options: ['San Juan', 'Madrid', 'Mexico City', 'Bogotá'], answer: 'San Juan' },
      { type: 'mc-en', q: 'How many siblings does Sofía have?', options: ['two', 'one', 'three', 'four'], answer: 'two' }
    ]
  },
  {
    id: 'rd-02',
    level: 'A1',
    title: 'In the café',
    titleEs: 'En el café',
    text: 'Hoy desayuno en un café. Quiero un café con leche y un pan. El camarero dice: ¿Algo más? Yo digo: no, gracias. La cuenta, por favor. El café cuesta tres dólares.',
    translit: 'oy des-ah-YOO-no en oon ka-FEH KYEH-ro oon ka-FEH kon LEH-che ee oon pan el ka-ma-REH-ro DEE-se AL-go mas YO DEE-go no GRAH-syas la KWEN-ta por fa-VOR el ka-FEH KWES-ta tres DOH-la-res',
    glossary: [
      { es: 'café', en: 'coffee' },
      { es: 'leche', en: 'milk' },
      { es: 'pan', en: 'bread' },
      { es: 'camarero', en: 'waiter' },
      { es: 'cuenta', en: 'bill' },
      { es: 'cuesta', en: 'costs' },
      { es: 'dólares', en: 'dollars' }
    ],
    questions: [
      { type: 'mc-en', q: 'What does the speaker order?', options: ['coffee with milk and bread', 'tea and cake', 'water and fruit', 'juice and eggs'], answer: 'coffee with milk and bread' },
      { type: 'mc-en', q: 'What does the waiter ask?', options: ['Anything else?', 'How are you?', 'What time is it?', 'Where are you from?'], answer: 'Anything else?' },
      { type: 'mc-en', q: 'How much is the coffee?', options: ['three dollars', 'two dollars', 'five dollars', 'one dollar'], answer: 'three dollars' }
    ]
  },
  {
    id: 'rd-03',
    level: 'A1',
    title: 'At the market',
    titleEs: 'En el mercado',
    text: 'El sábado voy al mercado con mi mamá. Compramos frutas y verduras. Las naranjas son dulces y las manzanas son rojas. Mi mamá paga con dinero. Los precios son buenos.',
    translit: 'el SA-ba-do boy al mer-KA-do kon mee ma-MA kom-PRA-mos FROO-tas ee ber-DOO-ras las na-RAN-has son DOOL-ses ee las man-SA-nas son RO-has mee ma-MA PA-ga kon dee-NEH-ro los PRE-syos son BWEH-nos',
    glossary: [
      { es: 'mercado', en: 'market' },
      { es: 'compramos', en: 'we buy' },
      { es: 'frutas', en: 'fruits' },
      { es: 'verduras', en: 'vegetables' },
      { es: 'naranjas', en: 'oranges' },
      { es: 'manzanas', en: 'apples' },
      { es: 'dinero', en: 'money' }
    ],
    questions: [
      { type: 'mc-en', q: 'When do they go to the market?', options: ['on Saturday', 'on Sunday', 'on Monday', 'on Friday'], answer: 'on Saturday' },
      { type: 'mc-en', q: 'What do they buy?', options: ['fruits and vegetables', 'bread and cheese', 'meat and fish', 'clothes'], answer: 'fruits and vegetables' },
      { type: 'mc-en', q: 'What are the oranges like?', options: ['sweet', 'sour', 'green', 'dry'], answer: 'sweet' }
    ]
  },
  {
    id: 'rd-04',
    level: 'A1',
    title: 'My house',
    titleEs: 'Mi casa',
    text: 'Mi casa es pequeña pero cómoda. Hay una sala, una cocina y dos dormitorios. En la cocina hay una mesa y cuatro sillas. Mi cuarto tiene una cama y una ventana. Me gusta mi casa.',
    translit: 'mee KA-sa es pe-KEH-nya PEH-ro KO-mo-da ay OO-na SA-la OO-na ko-SEE-na ee dos dor-mi-TO-ryos en la ko-SEE-na ay OO-na ME-sa ee KWA-tro SEE-yas mee KWAR-to TYEH-ne OO-na KA-ma ee OO-na ben-TA-na meh GOOS-ta mee KA-sa',
    glossary: [
      { es: 'casa', en: 'house / home' },
      { es: 'cocina', en: 'kitchen' },
      { es: 'dormitorios', en: 'bedrooms' },
      { es: 'mesa', en: 'table' },
      { es: 'sillas', en: 'chairs' },
      { es: 'cama', en: 'bed' },
      { es: 'ventana', en: 'window' }
    ],
    questions: [
      { type: 'mc-en', q: 'How many bedrooms are there?', options: ['two', 'one', 'three', 'four'], answer: 'two' },
      { type: 'mc-en', q: 'What is in the kitchen?', options: ['a table and four chairs', 'a bed and a window', 'a sofa and a TV', 'a desk and a lamp'], answer: 'a table and four chairs' },
      { type: 'mc-en', q: 'How does the speaker feel about the house?', options: ['likes it', 'dislikes it', 'wants to sell it', 'has never seen it'], answer: 'likes it' }
    ]
  },
  {
    id: 'rd-05',
    level: 'A1',
    title: 'A day at the beach',
    titleEs: 'Un día en la playa',
    text: 'Hoy vamos a la playa. El sol brilla y el agua está caliente. Mi hermana nada en el mar. Yo leo un libro bajo una palmera. Después comemos piña y bebemos agua de coco. ¡Qué día tan bonito!',
    translit: 'oy BA-mos a la PLA-ya el sol BREE-ya ee el A-gwa es-TA ka-LYEN-te mee er-MA-na NA-da en el mar yo LEH-o oon LEE-bro BA-ho OO-na pal-MEH-ra des-PWES ko-MEH-mos PEE-nya ee be-BEH-mos A-gwa de KO-ko keh DEE-a tan bo-NEE-to',
    glossary: [
      { es: 'playa', en: 'beach' },
      { es: 'sol', en: 'sun' },
      { es: 'agua', en: 'water' },
      { es: 'mar', en: 'sea' },
      { es: 'libro', en: 'book' },
      { es: 'palmera', en: 'palm tree' },
      { es: 'piña', en: 'pineapple' }
    ],
    questions: [
      { type: 'mc-en', q: 'What is the sun like?', options: ['shining', 'hiding', 'cold', 'dark'], answer: 'shining' },
      { type: 'mc-en', q: 'What does the sister do?', options: ['swims', 'reads', 'sleeps', 'sings'], answer: 'swims' },
      { type: 'mc-en', q: 'What do they drink?', options: ['coconut water', 'coffee', 'juice', 'milk'], answer: 'coconut water' }
    ]
  },
  {
    id: 'rd-06',
    level: 'A2',
    title: 'A trip to the island',
    titleEs: 'Un viaje a la isla',
    text: 'El verano pasado viajamos a Puerto Rico. Volamos desde Nueva York y llegamos a San Juan. Visitamos el Viejo San Juan y caminamos por las calles de colores. Comimos mofongo y bailamos salsa. Fue un viaje inolvidable.',
    translit: 'el beh-RA-no pa-SA-do bya-HA-mos a pwer-to REE-ko bo-LA-mos DES-de NWEH-ba YORK ee ye-GA-mos a san HWAHN bee-see-TA-mos el BYEH-ho san HWAHN ee ka-mee-NA-mos por las KA-yes de ko-LO-res ko-MEE-mos mo-FON-go ee bay-LA-mos SAL-sa fweh oon BYA-he ee-nol-bee-DA-ble',
    glossary: [
      { es: 'verano', en: 'summer' },
      { es: 'viajamos', en: 'we traveled' },
      { es: 'volamos', en: 'we flew' },
      { es: 'llegamos', en: 'we arrived' },
      { es: 'visitamos', en: 'we visited' },
      { es: 'caminamos', en: 'we walked' },
      { es: 'inolvidable', en: 'unforgettable' }
    ],
    questions: [
      { type: 'mc-en', q: 'Where did they travel?', options: ['Puerto Rico', 'Spain', 'Mexico', 'Colombia'], answer: 'Puerto Rico' },
      { type: 'mc-en', q: 'What did they eat?', options: ['mofongo', 'paella', 'tacos', 'pizza'], answer: 'mofongo' },
      { type: 'mc-en', q: 'How was the trip?', options: ['unforgettable', 'boring', 'short', 'terrible'], answer: 'unforgettable' }
    ]
  },
  {
    id: 'rd-07',
    level: 'A2',
    title: 'My daily routine',
    titleEs: 'Mi rutina diaria',
    text: 'Todos los días me levanto a las seis. Primero me ducho y me visto. Después desayuno con mi familia. Voy a la escuela en guagua. Por la noche hago mi tarea y me acuesto a las diez.',
    translit: 'TO-dos los DEE-as meh le-BAN-to a las SEH-ees pree-MEH-ro meh DOO-cho ee meh BEES-to des-PWES des-ah-YOO-no kon mee fa-MEE-lee-ah boy a la es-KWEH-la en GWA-gwa por la NO-che A-go mee ta-REH-a ee meh a-KWES-to a las DYEZ',
    glossary: [
      { es: 'levanto', en: 'I get up' },
      { es: 'ducho', en: 'I shower' },
      { es: 'desayuno', en: 'I have breakfast' },
      { es: 'escuela', en: 'school' },
      { es: 'guagua', en: 'bus' },
      { es: 'tarea', en: 'homework' },
      { es: 'acuesto', en: 'I go to bed' }
    ],
    questions: [
      { type: 'mc-en', q: 'What time does the speaker get up?', options: ['six', 'seven', 'eight', 'ten'], answer: 'six' },
      { type: 'mc-en', q: 'How does the speaker get to school?', options: ['by bus', 'by car', 'walking', 'by train'], answer: 'by bus' },
      { type: 'mc-en', q: 'What does the speaker do at night?', options: ['homework', 'sports', 'shopping', 'cooking'], answer: 'homework' }
    ]
  },
  {
    id: 'rd-08',
    level: 'A2',
    title: 'At the doctor',
    titleEs: 'En el doctor',
    text: 'Ayer me sentía mal. Me dolía la cabeza y tenía fiebre. Fui al doctor y él me examinó. Me dijo que necesitaba descansar y beber mucha agua. Ahora me siento mejor.',
    translit: 'a-YER meh sen-TEE-a mal meh do-LEE-a la ka-BEH-sa ee te-NEE-a FYEH-bre fwee al dok-TOR ee el meh ek-sa-mee-NO meh DEE-ho keh ne-se-see-TA-ba des-kan-SAR ee be-BER MOO-cha A-gwa a-O-ra meh SYEN-to meh-HOR',
    glossary: [
      { es: 'sentía', en: 'I felt' },
      { es: 'cabeza', en: 'head' },
      { es: 'fiebre', en: 'fever' },
      { es: 'examinó', en: 'examined' },
      { es: 'descansar', en: 'to rest' },
      { es: 'beber', en: 'to drink' },
      { es: 'mejor', en: 'better' }
    ],
    questions: [
      { type: 'mc-en', q: 'How did the speaker feel yesterday?', options: ['bad', 'great', 'tired but fine', 'hungry'], answer: 'bad' },
      { type: 'mc-en', q: 'What hurt?', options: ['the head', 'the leg', 'the stomach', 'the arm'], answer: 'the head' },
      { type: 'mc-en', q: 'What did the doctor recommend?', options: ['rest and water', 'more work', 'cold coffee', 'a long walk'], answer: 'rest and water' }
    ]
  },
  {
    id: 'rd-09',
    level: 'A2',
    title: 'Shopping for clothes',
    titleEs: 'De compras de ropa',
    text: 'Quiero comprar una camisa nueva. En la tienda hay muchos colores: azul, verde y rojo. Me pruebo la camisa azul. Me queda bien y no es cara. La compro con tarjeta.',
    translit: 'KYEH-ro kom-PRAR OO-na ka-MEE-sa NWEH-ba en la TYEN-da ay MOO-chos ko-LO-res a-SOOL BER-de ee RO-ho meh PRWEH-bo la ka-MEE-sa a-SOOL meh KEH-da byen ee no es KA-ra la KOM-pro kon tar-HEH-ta',
    glossary: [
      { es: 'comprar', en: 'to buy' },
      { es: 'camisa', en: 'shirt' },
      { es: 'tienda', en: 'store' },
      { es: 'colores', en: 'colors' },
      { es: 'azul', en: 'blue' },
      { es: 'verde', en: 'green' },
      { es: 'tarjeta', en: 'card' }
    ],
    questions: [
      { type: 'mc-en', q: 'What does the speaker want to buy?', options: ['a shirt', 'shoes', 'a hat', 'pants'], answer: 'a shirt' },
      { type: 'mc-en', q: 'Which color does the speaker try?', options: ['blue', 'green', 'red', 'black'], answer: 'blue' },
      { type: 'mc-en', q: 'How does the speaker pay?', options: ['with a card', 'in cash', 'with a check', 'by phone'], answer: 'with a card' }
    ]
  },
  {
    id: 'rd-10',
    level: 'A2',
    title: 'Weekend plans',
    titleEs: 'Planes para el fin de semana',
    text: 'Este fin de semana voy a visitar a mis abuelos. El sábado vamos a cocinar juntos. El domingo iremos a la iglesia y después al parque. Va a ser un fin de semana tranquilo y feliz.',
    translit: 'ES-te feen de se-MA-na boy a bee-see-TAR a mees a-BWEH-los el SA-ba-do BA-mos a ko-see-NAR HOON-tos el do-MEEN-go ee-REH-mos a la ee-GLEH-sya ee des-PWES al PAR-keh ba a ser oon feen de se-MA-na tran-KEE-lo ee fe-LEES',
    glossary: [
      { es: 'semana', en: 'week' },
      { es: 'visitar', en: 'to visit' },
      { es: 'abuelos', en: 'grandparents' },
      { es: 'cocinar', en: 'to cook' },
      { es: 'iglesia', en: 'church' },
      { es: 'parque', en: 'park' },
      { es: 'tranquilo', en: 'calm' }
    ],
    questions: [
      { type: 'mc-en', q: 'Who will the speaker visit?', options: ['the grandparents', 'the cousins', 'a friend', 'the teacher'], answer: 'the grandparents' },
      { type: 'mc-en', q: 'What will they do on Saturday?', options: ['cook together', 'go to church', 'shop', 'travel'], answer: 'cook together' },
      { type: 'mc-en', q: 'How will the weekend be?', options: ['calm and happy', 'busy and stressful', 'short and sad', 'cold and rainy'], answer: 'calm and happy' }
    ]
  }
];
