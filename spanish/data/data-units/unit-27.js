// Unit 27 — The environment. B1.
export const unit = {
  id: 'u27',
  level: 'B1',
  number: 27,
  title: 'The environment',
  titleEs: 'El medio ambiente',
  story: 'The planet is everyone topic now: recycling, renewable energy, protecting the beaches and the forests. This unit gives you the vocabulary of the environment plus the grammar to talk about consequences — if we do this, that will happen.',
  grammar: [
    {
      topic: 'If ... then (si + present → future)',
      explanation: 'For real conditions about the future, use si + present indicative in the if-clause and the future in the result: si ahorramos agua, tendremos más. Never use the future right after si.',
      table: [
        ['Spanish', 'English'],
        ['Si reciclamos, habrá menos basura.', 'If we recycle, there will be less trash.'],
        ['Si protejo la playa, otros harán lo mismo.', 'If I protect the beach, others will do the same.'],
        ['Si usas menos plástico, reducirás los residuos.', 'If you use less plastic, you will reduce waste.'],
        ['Si la gente no cambia, el planeta sufrirá.', 'If people do not change, the planet will suffer.']
      ],
      examples: [
        { es: 'Si ahorramos energía, pagaremos menos.', trans: 'see ah-o-RA-mos eh-NER-hee-ah pah-gah-REH-mos MEH-nos', en: 'If we save energy, we will pay less.' },
        { es: 'Si cuidas el bosque, los animales viven.', trans: 'see KWEE-das el BOS-keh los ah-nee-MAH-les BEE-behn', en: 'If you take care of the forest, the animals live.' }
      ]
    },
    {
      topic: 'Para + infinitive — purpose',
      explanation: 'Use para + infinitive to express purpose: reciclo para proteger el planeta (I recycle in order to protect the planet). It answers the question why.',
      table: [
        ['Spanish', 'English'],
        ['Ahorro agua para cuidar el medio ambiente.', 'I save water to take care of the environment.'],
        ['Uso la luz solar para generar energía.', 'I use solar light to generate energy.'],
        ['Plantamos árboles para limpiar el aire.', 'We plant trees to clean the air.']
      ],
      examples: [
        { es: 'Reciclamos para reducir los residuos.', trans: 'reh-see-KLA-mos PA-ra reh-doo-SEER los reh-SEE-dwos', en: 'We recycle to reduce waste.' },
        { es: 'Compro productos locales para apoyar la economía.', trans: 'KOM-pro pro-DOOK-tos lo-KAH-les PA-ra ah-PO-yar la eh-ko-no-MEE-a', en: 'I buy local products to support the economy.' }
      ]
    },
    {
      topic: 'Quantities: demasiado, mucho, poco',
      explanation: 'Environment talk is full of quantity: demasiada basura (too much trash), poca agua (little water), mucha energía (a lot of energy). The quantifier agrees in gender and number with the noun.',
      table: [
        ['Quantifier', 'With feminine', 'With masculine'],
        ['mucho (a lot of)', 'mucha energía', 'mucho plástico'],
        ['poco (little)', 'poca agua', 'poco ruido'],
        ['demasiado (too much)', 'demasiada contaminación', 'demasiado humo'],
        ['más (more)', 'más lluvia', 'más viento']
      ],
      examples: [
        { es: 'Hay demasiada basura en el océano.', trans: 'ay deh-mah-SYAH-dah bah-SOO-rah en el oh-SEH-ah-no', en: 'There is too much trash in the ocean.' },
        { es: 'Poco a poco, el planeta mejora.', trans: 'PO-ko a PO-ko el plah-NEH-tah meh-HO-ra', en: 'Little by little, the planet improves.' }
      ]
    }
  ],
  vocabulary: [
    { id: 'u27-medioambiente', es: 'medio ambiente', translit: 'MEH-dyo am-BYEN-teh', en: 'environment', pos: 'noun', gender: 'm' },
    { id: 'u27-planeta', es: 'planeta', translit: 'plah-NEH-tah', en: 'planet', pos: 'noun', gender: 'm' },
    { id: 'u27-naturaleza', es: 'naturaleza', translit: 'nah-too-rah-LEH-sah', en: 'nature', pos: 'noun', gender: 'f' },
    { id: 'u27-bosque', es: 'bosque', translit: 'BOS-keh', en: 'forest', pos: 'noun', gender: 'm' },
    { id: 'u27-oceano', es: 'océano', translit: 'oh-SEH-ah-no', en: 'ocean', pos: 'noun', gender: 'm' },
    { id: 'u27-contaminacion', es: 'contaminación', translit: 'kon-tah-mee-nah-SYON', en: 'pollution', pos: 'noun', gender: 'f' },
    { id: 'u27-basura', es: 'basura', translit: 'bah-SOO-rah', en: 'trash', pos: 'noun', gender: 'f' },
    { id: 'u27-residuo', es: 'residuo', translit: 'reh-SEE-dwo', en: 'waste', pos: 'noun', gender: 'm' },
    { id: 'u27-energia', es: 'energía', translit: 'eh-NER-hee-ah', en: 'energy', pos: 'noun', gender: 'f' },
    { id: 'u27-futuro', es: 'futuro', translit: 'foo-TOO-ro', en: 'future', pos: 'noun', gender: 'm' },
    { id: 'u27-reciclar', es: 'reciclar', translit: 'reh-see-KLAR', en: 'to recycle', pos: 'verb' },
    { id: 'u27-ahorrar', es: 'ahorrar', translit: 'ah-o-RAR', en: 'to save', pos: 'verb' },
    { id: 'u27-proteger', es: 'proteger', translit: 'pro-teh-HEHR', en: 'to protect', pos: 'verb' },
    { id: 'u27-cuidar', es: 'cuidar', translit: 'kwee-DAR', en: 'to take care of', pos: 'verb' },
    { id: 'u27-plantar', es: 'plantar', translit: 'plan-TAR', en: 'to plant', pos: 'verb' },
    { id: 'u27-renovable', es: 'renovable', translit: 'reh-no-BAH-bleh', en: 'renewable', pos: 'adjective' },
    { id: 'u27-viento', es: 'viento', translit: 'VYEN-to', en: 'wind', pos: 'noun', gender: 'm' },
    { id: 'u27-arbol', es: 'árbol', translit: 'AR-bol', en: 'tree', pos: 'noun', gender: 'm' }
  ],
  phrases: [
    { id: 'p-u27-1', es: '¡Protejamos el planeta!', trans: 'pro-teh-HAH-mos el plah-NEH-tah', en: 'Let us protect the planet!' },
    { id: 'p-u27-2', es: 'No tires basura en la playa.', trans: 'no TEE-res bah-SOO-rah en la PLAH-ya', en: 'Do not throw trash on the beach.' },
    { id: 'p-u27-3', es: 'Ahorra energía y cuida el agua.', trans: 'ah-O-rah eh-NER-hee-ah ee KWEE-dah el AH-gwa', en: 'Save energy and take care of the water.' }
  ],
  sentences: [
    { es: 'Debemos cuidar el medio ambiente y la naturaleza.', translit: 'deh-BEH-mos kwee-DAR el MEH-dyo am-BYEN-teh ee la nah-too-rah-LEH-sah', en: 'We must take care of the environment and nature.', words: [{ id: 'u27-cuidar', es: 'cuidar', en: 'to take care of' }, { id: 'u27-medioambiente', es: 'medio ambiente', en: 'environment' }, { id: 'u27-naturaleza', es: 'naturaleza', en: 'nature' }] },
    { es: 'Reciclar residuos ayuda contra la contaminación.', translit: 'reh-see-KLAR reh-SEE-dwos ah-YOO-dah KON-trah la kon-tah-mee-nah-SYON', en: 'Recycling waste helps against pollution.', words: [{ id: 'u27-reciclar', es: 'Reciclar', en: 'to recycle' }, { id: 'u27-residuo', es: 'residuos', en: 'waste' }, { id: 'u27-contaminacion', es: 'contaminación', en: 'pollution' }] },
    { es: 'La energía renovable protege el planeta.', translit: 'la eh-NER-hee-ah reh-no-BAH-bleh pro-TEH-heh el plah-NEH-tah', en: 'Renewable energy protects the planet.', words: [{ id: 'u27-energia', es: 'energía', en: 'energy' }, { id: 'u27-renovable', es: 'renovable', en: 'renewable' }, { id: 'u27-proteger', es: 'protege', en: 'protects' }, { id: 'u27-planeta', es: 'planeta', en: 'planet' }] },
    { es: 'El bosque y cada árbol son el hogar de muchos animales.', translit: 'el BOS-keh ee KA-da AR-bol son el o-GAR deh MOO-chos ah-nee-MAH-les', en: 'The forest and every tree are home to many animals.', words: [{ id: 'u27-bosque', es: 'bosque', en: 'forest' }, { id: 'u27-arbol', es: 'árbol', en: 'tree' }] },
    { es: 'El océano está lleno de basura plástica.', translit: 'el oh-SEH-ah-no es-TAH YEH-no deh bah-SOO-rah PLAS-tee-kah', en: 'The ocean is full of plastic trash.', words: [{ id: 'u27-oceano', es: 'océano', en: 'ocean' }, { id: 'u27-basura', es: 'basura', en: 'trash' }] },
    { es: 'Si ahorramos energía, el futuro será mejor.', translit: 'see ah-o-RA-mos eh-NER-hee-ah el foo-TOO-ro seh-RAH meh-HOR', en: 'If we save energy, the future will be better.', words: [{ id: 'u27-ahorrar', es: 'ahorramos', en: 'we save' }, { id: 'u27-energia', es: 'energía', en: 'energy' }, { id: 'u27-futuro', es: 'futuro', en: 'future' }] }
  ],
  dialogue: {
    title: 'A family plan (Un plan familiar)',
    lines: [
      { who: 'Papá', es: 'Este verano fue muy caliente aquí.', en: 'This summer was very hot here.' },
      { who: 'Lena', es: 'La contaminación es cada vez peor.', en: 'The pollution is worse every time.' },
      { who: 'Mamá', es: 'Podemos ayudar: reciclar y ahorrar energía.', en: 'We can help: recycle and save energy.' },
      { who: 'Papá', es: 'Y no tirar basura en la naturaleza.', en: 'And not throw trash in nature.' },
      { who: 'Lena', es: '¡Vamos a proteger el planeta juntos!', en: 'Let us protect the planet together!' }
    ],
    questions: [
      { type: 'mc-en', q: 'What was very hot this year?', options: ['the summer', 'the winter', 'the water', 'the sand'], answer: 'the summer' },
      { type: 'mc-en', q: 'What can the family do to help?', options: ['recycle and save energy', 'buy more things', 'drive more', 'watch TV'], answer: 'recycle and save energy' },
      { type: 'mc-en', q: 'Where should they not throw trash?', options: ['in nature', 'in the trash can', 'at home', 'at school'], answer: 'in nature' }
    ]
  },
  quiz: [
    { type: 'mc-en', q: '¿Qué significa «medio ambiente»?', options: ['environment', 'middle', 'meeting', 'measurement'], answer: 'environment', es: 'medio ambiente' },
    { type: 'mc-es', q: 'How do you say to recycle?', options: ['reciclar', 'recordar', 'regalar', 'respirar'], answer: 'reciclar', es: 'reciclar' },
    { type: 'typing', q: 'Type planet in Spanish', answer: 'planeta', accepts: [], es: 'planeta' },
    { type: 'mc-en', q: '¿Qué significa «contaminación»?', options: ['pollution', 'confusion', 'construction', 'conversation'], answer: 'pollution', es: 'contaminación' },
    { type: 'mc-es', q: 'Complete: Si reciclamos, ___ menos basura.', options: ['habrá', 'hay', 'había', 'habría'], answer: 'habrá', es: 'si reciclamos, habrá menos basura' },
    { type: 'typing', q: 'Type wind in Spanish', answer: 'viento', accepts: [], es: 'viento' },
    { type: 'mc-en', q: '¿Qué significa «ahorrar»?', options: ['to save', 'to spend', 'to arrive', 'to avoid'], answer: 'to save', es: 'ahorrar' },
    { type: 'mc-es', q: 'Which word means renewable?', options: ['renovable', 'repetible', 'rayado', 'rancio'], answer: 'renovable', es: 'renovable' },
    { type: 'mc-en', q: '¿Qué significa «bosque»?', options: ['forest', 'box', 'boat', 'bone'], answer: 'forest', es: 'bosque' },
    { type: 'mc-es', q: 'Complete: Ahorro agua ___ cuidar el planeta.', options: ['para', 'por', 'de', 'a'], answer: 'para', es: 'ahorro agua para cuidar el planeta' },
    { type: 'typing', q: 'Type tree in Spanish', answer: 'árbol', accepts: [], es: 'árbol' },
    { type: 'mc-en', q: '¿Qué significa «naturaleza»?', options: ['nature', 'nurture', 'number', 'navy'], answer: 'nature', es: 'naturaleza' }
  ],
  test: {
    title: 'Unit 27 test — The environment',
    questions: [
      { type: 'mc-en', q: '¿Qué significa «¡Protejamos el planeta!»?', options: ['Let us protect the planet!', 'Let us buy the planet!', 'Let us paint the planet!', 'Let us leave the planet!'], answer: 'Let us protect the planet!', es: '¡protejamos el planeta!' },
      { type: 'mc-es', q: 'Which sentence gives a real condition?', options: ['Si cuidas la playa, estará limpia', 'Si cuides la playa', 'Si cuidar la playa', 'Si cuidando la playa'], answer: 'Si cuidas la playa, estará limpia', es: 'si cuidas la playa, estará limpia' },
      { type: 'typing', q: 'Type to protect in Spanish', answer: 'proteger', accepts: [], es: 'proteger' },
      { type: 'mc-en', q: '¿Qué significa «residuo»?', options: ['waste', 'resident', 'rescue', 'review'], answer: 'waste', es: 'residuo' },
      { type: 'mc-es', q: 'Complete: Hay demasiada ___ en el mar.', options: ['basura', 'bosque', 'árbol', 'viento'], answer: 'basura', es: 'hay demasiada basura en el mar' },
      { type: 'typing', q: 'Type to plant in Spanish', answer: 'plantar', accepts: [], es: 'plantar' },
      { type: 'mc-en', q: '¿Qué significa «futuro»?', options: ['future', 'furniture', 'father', 'fuel'], answer: 'future', es: 'futuro' },
      { type: 'mc-es', q: 'Say how to express purpose after a verb.', options: ['para + infinitive', 'por + infinitive', 'de + infinitive', 'a + infinitive'], answer: 'para + infinitive', es: 'para + verbo' },
      { type: 'typing', q: 'Type energy in Spanish', answer: 'energía', accepts: [], es: 'energía' },
      { type: 'mc-en', q: '¿Qué significa «proteger»?', options: ['to protect', 'to pretend', 'to prevent', 'to project'], answer: 'to protect', es: 'proteger' },
      { type: 'mc-es', q: 'Complete: Plantamos árboles ___ limpiar el aire.', options: ['para', 'por', 'de', 'con'], answer: 'para', es: 'plantamos árboles para limpiar el aire' },
      { type: 'typing', q: 'Type ocean in Spanish', answer: 'océano', accepts: [], es: 'océano' }
    ]
  }
};