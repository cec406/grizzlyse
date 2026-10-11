// Unit 13 — Body & health. A2.
export const unit = {
  id: 'u13',
  level: 'A2',
  number: 13,
  title: 'Body & health',
  titleEs: 'La salud',
  story: 'You wake up with a sore throat and a fever before a day at the beach. This unit teaches you the body parts, the verb doler (to hurt), and everything you need at the doctor or the farmacia. Soon you can explain exactly what hurts and follow the instructions on a receta.',
  grammar: [
    {
      topic: 'doler works like gustar',
      explanation: 'Doler (to hurt) uses an indirect object pronoun, not a subject. Say me duele la cabeza (my head hurts). Use duele for one thing and duelen for several: me duelen los pies.',
      table: [
        ['Spanish', 'English'],
        ['Me duele la cabeza.', 'My head hurts.'],
        ['Me duelen los pies.', 'My feet hurt.'],
        ['¿Te duele el estómago?', 'Does your stomach hurt?'],
        ['Le duele la espalda.', 'His / her back hurts.']
      ],
      examples: [
        { es: 'Me duele la garganta.', trans: 'meh DWEH-leh lah gar-GAHN-tah', en: 'My throat hurts.' },
        { es: 'Me duelen los dientes.', trans: 'meh DWEH-len los DYEHN-tes', en: 'My teeth hurt.' }
      ]
    },
    {
      topic: 'Body parts take el / la, not mi',
      explanation: 'Spanish says the head hurts rather than my head hurts. Use the definite article with doler: me duele la espalda, not me duele mi espalda. Only add mi when you really need to stress whose it is.',
      table: [
        ['Spanish', 'English'],
        ['Me duele la mano.', 'My hand hurts.'],
        ['Me duele el brazo.', 'My arm hurts.'],
        ['Le duele la pierna.', 'His / her leg hurts.'],
        ['Nos duelen los ojos.', 'Our eyes hurt.']
      ],
      examples: [
        { es: '¿Le duele el pie?', trans: 'leh DWEH-leh el pyeh', en: 'Does your foot hurt?' },
        { es: 'Me duele la espalda mucho.', trans: 'meh DWEH-leh lah es-PAL-dah MOO-choh', en: 'My back hurts a lot.' }
      ]
    },
    {
      topic: 'At the doctor and the pharmacy',
      explanation: 'Tell the doctor Me siento enfermo (I feel sick) or Tengo fiebre (I have a fever). The doctor gives you una receta (a prescription) and you buy pastillas at the farmacia. Say cada ocho horas to mean every eight hours.',
      table: [
        ['Spanish', 'English'],
        ['Me siento enfermo.', 'I feel sick.'],
        ['Tengo fiebre y tos.', 'I have a fever and a cough.'],
        ['Tome esta pastilla.', 'Take this pill.'],
        ['Cada ocho horas.', 'Every eight hours.']
      ],
      examples: [
        { es: 'Tengo dolor de garganta.', trans: 'TEHN-goh doh-LOR deh gar-GAHN-tah', en: 'I have a sore throat.' },
        { es: 'Necesito una receta para la farmacia.', trans: 'neh-seh-SEE-toh OO-nah reh-SEH-tah PAH-rah lah far-MAH-syah', en: 'I need a prescription for the pharmacy.' }
      ]
    }
  ],
  vocabulary: [
    { id: 'u13-cabeza', es: 'la cabeza', translit: 'lah kah-BEH-sah', en: 'head', pos: 'noun', gender: 'f' },
    { id: 'u13-ojo', es: 'el ojo', translit: 'el OH-hoh', en: 'eye', pos: 'noun', gender: 'm' },
    { id: 'u13-oreja', es: 'la oreja', translit: 'lah oh-REH-hah', en: 'ear', pos: 'noun', gender: 'f' },
    { id: 'u13-nariz', es: 'la nariz', translit: 'lah nah-REES', en: 'nose', pos: 'noun', gender: 'f' },
    { id: 'u13-boca', es: 'la boca', translit: 'lah BOH-kah', en: 'mouth', pos: 'noun', gender: 'f' },
    { id: 'u13-diente', es: 'el diente', translit: 'el DYEHN-teh', en: 'tooth', pos: 'noun', gender: 'm' },
    { id: 'u13-brazo', es: 'el brazo', translit: 'el BRAH-soh', en: 'arm', pos: 'noun', gender: 'm' },
    { id: 'u13-mano', es: 'la mano', translit: 'lah MAH-noh', en: 'hand', pos: 'noun', gender: 'f' },
    { id: 'u13-pierna', es: 'la pierna', translit: 'lah PYEHR-nah', en: 'leg', pos: 'noun', gender: 'f' },
    { id: 'u13-pie', es: 'el pie', translit: 'el pyeh', en: 'foot', pos: 'noun', gender: 'm' },
    { id: 'u13-estomago', es: 'el estómago', translit: 'el es-TOH-mah-goh', en: 'stomach', pos: 'noun', gender: 'm' },
    { id: 'u13-espalda', es: 'la espalda', translit: 'lah es-PAL-dah', en: 'back', pos: 'noun', gender: 'f' },
    { id: 'u13-garganta', es: 'la garganta', translit: 'lah gar-GAHN-tah', en: 'throat', pos: 'noun', gender: 'f' },
    { id: 'u13-dolor', es: 'el dolor', translit: 'el doh-LOR', en: 'pain', pos: 'noun', gender: 'm' },
    { id: 'u13-fiebre', es: 'la fiebre', translit: 'lah FYEH-breh', en: 'fever', pos: 'noun', gender: 'f' },
    { id: 'u13-tos', es: 'la tos', translit: 'lah tos', en: 'cough', pos: 'noun', gender: 'f' },
    { id: 'u13-medicina', es: 'la medicina', translit: 'lah meh-dee-SEE-nah', en: 'medicine', pos: 'noun', gender: 'f' },
    { id: 'u13-pastilla', es: 'la pastilla', translit: 'lah pahs-TEE-yah', en: 'pill', pos: 'noun', gender: 'f' },
    { id: 'u13-receta', es: 'la receta', translit: 'lah reh-SEH-tah', en: 'prescription', pos: 'noun', gender: 'f' },
    { id: 'u13-farmacia', es: 'la farmacia', translit: 'lah far-MAH-syah', en: 'pharmacy', pos: 'noun', gender: 'f' },
    { id: 'u13-medico', es: 'el médico', translit: 'el MEH-dee-koh', en: 'doctor', pos: 'noun', gender: 'm' },
    { id: 'u13-hospital', es: 'el hospital', translit: 'el ohs-pee-TAL', en: 'hospital', pos: 'noun', gender: 'm' },
    { id: 'u13-doler', es: 'doler', translit: 'doh-LEHR', en: 'to hurt', pos: 'verb' },
    { id: 'u13-sentirse', es: 'sentirse', translit: 'sehn-TEER-seh', en: 'to feel', pos: 'verb' },
    { id: 'u13-enfermo', es: 'enfermo', translit: 'ehn-FEHR-moh', en: 'sick', pos: 'adjective' },
    { id: 'u13-mejor', es: 'mejor', translit: 'meh-HOR', en: 'better', pos: 'adjective' }
  ],
  phrases: [
    { id: 'p-u13-1', es: 'Me siento enfermo.', trans: 'meh SYEHN-toh ehn-FEHR-moh', en: 'I feel sick.' },
    { id: 'p-u13-2', es: '¿Le duele algo?', trans: 'leh DWEH-leh AL-goh', en: 'Does something hurt?' },
    { id: 'p-u13-3', es: 'Tengo una cita con el médico.', trans: 'TEHN-goh OO-nah SEE-tah kon el MEH-dee-koh', en: 'I have a doctor appointment.' },
    { id: 'p-u13-4', es: 'Me siento mucho mejor.', trans: 'meh SYEHN-toh MOO-choh meh-HOR', en: 'I feel much better.' }
  ],
  sentences: [
    { es: 'Me duele la cabeza.', translit: 'meh DWEH-leh lah kah-BEH-sah', en: 'My head hurts.', words: [{ id: 'u13-doler', es: 'duele', en: 'hurts' }, { id: 'u13-cabeza', es: 'cabeza', en: 'head' }] },
    { es: 'Me duelen los pies.', translit: 'meh DWEH-len los pyehs', en: 'My feet hurt.', words: [{ id: 'u13-doler', es: 'duelen', en: 'hurt' }, { id: 'u13-pie', es: 'pie', en: 'foot' }] },
    { es: 'Tengo fiebre y tos.', translit: 'TEHN-goh FYEH-breh ee tos', en: 'I have a fever and a cough.', words: [{ id: 'u13-fiebre', es: 'fiebre', en: 'fever' }, { id: 'u13-tos', es: 'tos', en: 'cough' }] },
    { es: 'El médico me recetó una medicina.', translit: 'el MEH-dee-koh meh reh-seh-TOH OO-nah meh-dee-SEE-nah', en: 'The doctor prescribed me a medicine.', words: [{ id: 'u13-medico', es: 'médico', en: 'doctor' }, { id: 'u13-medicina', es: 'medicina', en: 'medicine' }] },
    { es: 'Necesito comprar pastillas en la farmacia.', translit: 'neh-seh-SEE-toh kom-PRAR pahs-TEE-yahs en lah far-MAH-syah', en: 'I need to buy pills at the pharmacy.', words: [{ id: 'u13-pastilla', es: 'pastilla', en: 'pill' }, { id: 'u13-farmacia', es: 'farmacia', en: 'pharmacy' }] },
    { es: 'Me siento enfermo hoy.', translit: 'meh SYEHN-toh ehn-FEHR-moh oy', en: 'I feel sick today.', words: [{ id: 'u13-sentirse', es: 'siento', en: 'feel' }, { id: 'u13-enfermo', es: 'enfermo', en: 'sick' }] },
    { es: 'Me duele el estómago.', translit: 'meh DWEH-leh el es-TOH-mah-goh', en: 'My stomach hurts.', words: [{ id: 'u13-doler', es: 'duele', en: 'hurts' }, { id: 'u13-estomago', es: 'estómago', en: 'stomach' }] },
    { es: 'Tengo dolor de garganta.', translit: 'TEHN-goh doh-LOR deh gar-GAHN-tah', en: 'I have a sore throat.', words: [{ id: 'u13-dolor', es: 'dolor', en: 'pain' }, { id: 'u13-garganta', es: 'garganta', en: 'throat' }] }
  ],
  dialogue: {
    title: 'En el consultorio (At the doctor office)',
    lines: [
      { who: 'Recepcionista', es: 'Buenos días. ¿Tiene una cita?', en: 'Good morning. Do you have an appointment?' },
      { who: 'Ana', es: 'No. Me siento enferma. Me duele la garganta.', en: 'No. I feel sick. My throat hurts.' },
      { who: 'Doctor', es: '¿Tiene fiebre?', en: 'Do you have a fever?' },
      { who: 'Ana', es: 'Sí, un poco. Y me duele la cabeza.', en: 'Yes, a little. And my head hurts.' },
      { who: 'Doctor', es: 'Tome esta pastilla cada ocho horas. Aquí tiene la receta.', en: 'Take this pill every eight hours. Here is the prescription.' },
      { who: 'Ana', es: 'Gracias. ¿Dónde está la farmacia?', en: 'Thank you. Where is the pharmacy?' },
      { who: 'Doctor', es: 'Está al lado del hospital.', en: 'It is next to the hospital.' },
      { who: 'Ana', es: 'Perfecto. Muchas gracias.', en: 'Perfect. Thank you very much.' }
    ],
    questions: [
      { type: 'mc-en', q: '¿Cómo se siente Ana?', options: ['sick', 'fine', 'tired', 'hungry'], answer: 'sick' },
      { type: 'mc-en', q: '¿Qué le duele a Ana?', options: ['her throat and her head', 'her leg', 'her stomach', 'her eyes'], answer: 'her throat and her head' },
      { type: 'mc-en', q: '¿Tiene fiebre Ana?', options: ['yes, a little', 'no', 'a lot', 'only at night'], answer: 'yes, a little' },
      { type: 'mc-en', q: '¿Cada cuánto tiempo toma la pastilla?', options: ['every eight hours', 'every day', 'every two hours', 'once a week'], answer: 'every eight hours' }
    ]
  },
  quiz: [
    { type: 'mc-en', q: '¿Qué significa «la cabeza»?', options: ['head', 'hand', 'leg', 'back'], answer: 'head', es: 'la cabeza' },
    { type: 'mc-en', q: '¿Qué significa «la mano»?', options: ['hand', 'foot', 'arm', 'mouth'], answer: 'hand', es: 'la mano' },
    { type: 'mc-en', q: '¿Qué significa «la farmacia»?', options: ['pharmacy', 'hospital', 'doctor', 'medicine'], answer: 'pharmacy', es: 'la farmacia' },
    { type: 'mc-es', q: 'How do you say doctor?', options: ['el médico', 'la receta', 'la pastilla', 'el dolor'], answer: 'el médico', es: 'el médico' },
    { type: 'mc-es', q: 'How do you say head?', options: ['la cabeza', 'la mano', 'la pierna', 'la boca'], answer: 'la cabeza', es: 'la cabeza' },
    { type: 'mc-en', q: '¿Qué significa «el dolor»?', options: ['pain', 'fever', 'cough', 'pill'], answer: 'pain', es: 'el dolor' },
    { type: 'mc-en', q: '¿Qué significa «la fiebre»?', options: ['fever', 'cough', 'pain', 'medicine'], answer: 'fever', es: 'la fiebre' },
    { type: 'typing', q: 'Type the word for stomach in Spanish (with the article).', answer: 'el estómago', accepts: ['estómago'], es: 'el estómago' },
    { type: 'typing', q: 'Type the word for throat in Spanish (with the article).', answer: 'la garganta', accepts: ['garganta'], es: 'la garganta' },
    { type: 'mc-es', q: 'Say my head hurts.', options: ['me duele la cabeza', 'me duelen los pies', 'tengo fiebre', 'me siento mejor'], answer: 'me duele la cabeza', es: 'me duele la cabeza' },
    { type: 'mc-en', q: '¿Qué significa «el brazo»?', options: ['arm', 'leg', 'hand', 'eye'], answer: 'arm', es: 'el brazo' },
    { type: 'mc-es', q: 'Which word means pill?', options: ['la pastilla', 'la receta', 'el dolor', 'la tos'], answer: 'la pastilla', es: 'la pastilla' },
    { type: 'mc-en', q: '¿Qué significa «enfermo»?', options: ['sick', 'better', 'tired', 'healthy'], answer: 'sick', es: 'enfermo' }
  ],
  test: {
    title: 'Unit 13 test — Body & health',
    questions: [
      { type: 'mc-en', q: '¿Qué significa «el ojo»?', options: ['eye', 'ear', 'nose', 'mouth'], answer: 'eye', es: 'el ojo' },
      { type: 'mc-es', q: 'Say my feet hurt.', options: ['me duelen los pies', 'me duele el pie', 'me duele la cabeza', 'tengo dolor'], answer: 'me duelen los pies', es: 'me duelen los pies' },
      { type: 'mc-en', q: '¿Qué significa «la espalda»?', options: ['back', 'stomach', 'arm', 'leg'], answer: 'back', es: 'la espalda' },
      { type: 'typing', q: 'Type the word for medicine in Spanish (with the article).', answer: 'la medicina', accepts: ['medicina'], es: 'la medicina' },
      { type: 'mc-es', q: 'Which verb means to hurt?', options: ['doler', 'sentirse', 'tomar', 'comprar'], answer: 'doler', es: 'doler' },
      { type: 'mc-en', q: '¿Qué significa «la receta»?', options: ['prescription', 'pill', 'pharmacy', 'pain'], answer: 'prescription', es: 'la receta' },
      { type: 'mc-en', q: '¿Qué significa «la boca»?', options: ['mouth', 'nose', 'tooth', 'throat'], answer: 'mouth', es: 'la boca' },
      { type: 'typing', q: 'Type the word for fever in Spanish (with the article).', answer: 'la fiebre', accepts: ['fiebre'], es: 'la fiebre' },
      { type: 'mc-es', q: 'Which word means better?', options: ['mejor', 'enfermo', 'peor', 'fuerte'], answer: 'mejor', es: 'mejor' },
      { type: 'mc-en', q: '¿Qué significa «el hospital»?', options: ['hospital', 'pharmacy', 'doctor office', 'medicine'], answer: 'hospital', es: 'el hospital' },
      { type: 'mc-es', q: 'Say I feel sick.', options: ['me siento enfermo', 'me duele la cabeza', 'tengo una receta', 'estoy muy bien'], answer: 'me siento enfermo', es: 'me siento enfermo' },
      { type: 'mc-en', q: '¿Qué significa «la pierna»?', options: ['leg', 'arm', 'foot', 'hand'], answer: 'leg', es: 'la pierna' }
    ]
  }
};
