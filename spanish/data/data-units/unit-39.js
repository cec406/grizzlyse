// Unit 39 — Advanced subjunctive. B2.
export const unit = {
  id: 'u39',
  level: 'B2',
  number: 39,
  title: 'Advanced subjunctive',
  titleEs: 'El subjuntivo avanzado',
  story: 'You are daydreaming on a balcony in Old San Juan: «Ojalá pudiera quedarme un mes más». To say wishes, doubts and impossible conditions, Spanish needs the imperfect subjunctive. In this unit you learn forms like tuviera, pudiera and fuera, and how they fit with the rest of the sentence. This is the tense that makes you sound truly fluent.',
  grammar: [
    {
      topic: 'The imperfect subjunctive: -ra forms',
      explanation: 'Take the ellos form of the preterite, drop -ron and add the ending: tuvieron to tuviera, pudieron to pudiera, vivieron to viviera. It describes wishes, doubts or unreal situations.',
      table: [
        ['Verb', 'ellos (preterite)', 'Imperfect subjunctive (yo)', 'English'],
        ['tener', 'tuvieron', 'tuviera', 'had'],
        ['poder', 'pudieron', 'pudiera', 'could'],
        ['vivir', 'vivieron', 'viviera', 'lived'],
        ['hacer', 'hicieron', 'hiciera', 'did / made'],
        ['ir', 'fueron', 'fuera', 'went / were']
      ],
      examples: [
        { es: 'Si tuviera tiempo, estudiaría más español.', trans: 'see too-VYEH-rah TYEM-po es-too-dee-ah-REE-ah mas es-PAH-nyol', en: 'If I had time, I would study more Spanish.' },
        { es: 'Ojalá fuera verano todo el año.', trans: 'o-hah-LA FWEH-rah veh-RAH-no TO-do el AH-nyo', en: 'I wish it were summer all year.' }
      ]
    },
    {
      topic: 'Sequence of tenses',
      explanation: 'The tense of the main verb decides the subjunctive. A present main verb takes the present subjunctive; a past or conditional main verb takes the imperfect subjunctive.',
      table: [
        ['Main verb', 'Subordinate verb', 'Example'],
        ['present', 'present subjunctive', 'Quiero que vengas.'],
        ['past', 'imperfect subjunctive', 'Quería que vinieras.'],
        ['conditional', 'imperfect subjunctive', 'Me gustaría que vinieras.'],
        ['present perfect', 'past perfect subjunctive', 'Espero que hayas venido.']
      ],
      examples: [
        { es: 'Dudaba que él supiera la verdad.', trans: 'doo-DAH-bah keh el soo-PYEH-rah lah ver-DAD', en: 'I doubted that he knew the truth.' },
        { es: 'Espero que hayas terminado la tarea.', trans: 'es-PEH-ro keh AH-yas ter-mee-NAH-do lah tah-REH-ah', en: 'I hope that you have finished the homework.' }
      ]
    },
    {
      topic: 'si tuviera and ojalá',
      explanation: 'si tuviera... opens an impossible condition and ojalá expresses a strong wish. Both love the imperfect subjunctive. ojalá comes from Arabic and literally means if God wills.',
      table: [
        ['Spanish', 'English'],
        ['Si tuviera dinero, viajaría.', 'If I had money, I would travel.'],
        ['Ojalá pudiera visitar San Juan.', 'I wish I could visit San Juan.'],
        ['Quisiera un café, por favor.', 'I would like a coffee, please.'],
        ['Me alegro de que vinieras.', 'I am glad that you came.']
      ],
      examples: [
        { es: 'Ojalá pudiera visitar San Juan este verano.', trans: 'o-hah-LA poo-DYEH-rah vee-see-TAR san HWAHN ES-teh veh-RAH-no', en: 'I wish I could visit San Juan this summer.' },
        { es: 'Quisiera un café, por favor.', trans: 'kee-SYEH-rah oon kah-FEH por fah-VOR', en: 'I would like a coffee, please.' }
      ]
    }
  ],
  vocabulary: [
    { id: 'u39-subjuntivo', es: 'subjuntivo', translit: 'soob-hoon-TEE-vo', en: 'subjunctive', pos: 'noun', gender: 'm' },
    { id: 'u39-duda', es: 'duda', translit: 'DOO-dah', en: 'doubt', pos: 'noun', gender: 'f' },
    { id: 'u39-deseo', es: 'deseo', translit: 'deh-SEH-o', en: 'wish / desire', pos: 'noun', gender: 'm' },
    { id: 'u39-emocion', es: 'emoción', translit: 'eh-mo-SYON', en: 'emotion', pos: 'noun', gender: 'f' },
    { id: 'u39-imperfecto', es: 'imperfecto', translit: 'eem-per-FEK-to', en: 'imperfect', pos: 'adjective' },
    { id: 'u39-ojala', es: 'ojalá', translit: 'o-hah-LA', en: 'I wish / hopefully', pos: 'interjection' },
    { id: 'u39-quisiera', es: 'quisiera', translit: 'kee-SYEH-rah', en: 'I would like', pos: 'verb' },
    { id: 'u39-fuera', es: 'fuera', translit: 'FWEH-rah', en: 'were / went (subj.)', pos: 'verb' },
    { id: 'u39-tuviera', es: 'tuviera', translit: 'too-VYEH-rah', en: 'had (subj.)', pos: 'verb' },
    { id: 'u39-pudiera', es: 'pudiera', translit: 'poo-DYEH-rah', en: 'could (subj.)', pos: 'verb' },
    { id: 'u39-hiciera', es: 'hiciera', translit: 'ee-SYEH-rah', en: 'did / made (subj.)', pos: 'verb' },
    { id: 'u39-viniera', es: 'viniera', translit: 'vee-NYEH-rah', en: 'came (subj.)', pos: 'verb' },
    { id: 'u39-supiera', es: 'supiera', translit: 'soo-PYEH-rah', en: 'knew (subj.)', pos: 'verb' },
    { id: 'u39-hubiera', es: 'hubiera', translit: 'oo-VYEH-rah', en: 'had (past subj.)', pos: 'verb' },
    { id: 'u39-esperar', es: 'esperar', translit: 'es-peh-RAR', en: 'to hope / to wait', pos: 'verb' },
    { id: 'u39-dudar', es: 'dudar', translit: 'doo-DAR', en: 'to doubt', pos: 'verb' },
    { id: 'u39-sentir', es: 'sentir', translit: 'sen-TEER', en: 'to feel / to be sorry', pos: 'verb' },
    { id: 'u39-alegrarse', es: 'alegrarse', translit: 'ah-leh-GRAR-seh', en: 'to be glad', pos: 'verb' },
    { id: 'u39-temer', es: 'temer', translit: 'teh-MER', en: 'to fear', pos: 'verb' },
    { id: 'u39-aunque', es: 'aunque', translit: 'AWN-keh', en: 'although', pos: 'conjunction' },
    { id: 'u39-amenosque', es: 'a menos que', translit: 'ah MEH-nos keh', en: 'unless', pos: 'phrase' },
    { id: 'u39-contaldeque', es: 'con tal de que', translit: 'kon tal deh keh', en: 'as long as / provided that', pos: 'phrase' },
    { id: 'u39-tanprontocomo', es: 'tan pronto como', translit: 'tan PRON-to KO-mo', en: 'as soon as', pos: 'conjunction' },
    { id: 'u39-porsi', es: 'por si', translit: 'por see', en: 'in case', pos: 'conjunction' }
  ],
  phrases: [
    { id: 'p-u39-1', es: 'Ojalá que sí.', trans: 'o-hah-LA keh see', en: 'I hope so.' },
    { id: 'p-u39-2', es: 'Si yo pudiera, lo haría.', trans: 'see yo poo-DYEH-rah lo ah-REE-ah', en: 'If I could, I would do it.' },
    { id: 'p-u39-3', es: '¡Que tengas suerte!', trans: 'keh TEN-gas SWER-teh', en: 'Good luck!' }
  ],
  sentences: [
    { es: 'Si tuviera tiempo, estudiaría más español.', translit: 'see too-VYEH-rah TYEM-po es-too-dee-ah-REE-ah mas es-PAH-nyol', en: 'If I had time, I would study more Spanish.', words: [{ id: 'u39-tuviera', es: 'tuviera', en: 'had (subj.)' }] },
    { es: 'Ojalá pudiera visitar San Juan este verano.', translit: 'o-hah-LA poo-DYEH-rah vee-see-TAR san HWAHN ES-teh veh-RAH-no', en: 'I wish I could visit San Juan this summer.', words: [{ id: 'u39-ojala', es: 'Ojalá', en: 'I wish' }, { id: 'u39-pudiera', es: 'pudiera', en: 'could (subj.)' }] },
    { es: 'Dudaba que él supiera la verdad.', translit: 'doo-DAH-bah keh el soo-PYEH-rah lah ver-DAD', en: 'I doubted that he knew the truth.', words: [{ id: 'u39-dudar', es: 'Dudaba', en: 'I doubted' }, { id: 'u39-supiera', es: 'supiera', en: 'knew (subj.)' }] },
    { es: 'Espero que hayas terminado la tarea.', translit: 'es-PEH-ro keh AH-yas ter-mee-NAH-do lah tah-REH-ah', en: 'I hope that you have finished the homework.', words: [{ id: 'u39-esperar', es: 'Espero', en: 'I hope' }] },
    { es: 'Me alegro de que vinieras a la fiesta.', translit: 'meh ah-LEH-gro deh keh vee-NYEH-ras ah lah FYES-tah', en: 'I am glad that you came to the party.', words: [{ id: 'u39-alegrarse', es: 'alegro', en: 'I am glad' }, { id: 'u39-viniera', es: 'vinieras', en: 'came (subj.)' }] },
    { es: 'Quisiera un café, por favor.', translit: 'kee-SYEH-rah oon kah-FEH por fah-VOR', en: 'I would like a coffee, please.', words: [{ id: 'u39-quisiera', es: 'Quisiera', en: 'I would like' }] }
  ],
  dialogue: {
    title: 'Ojalá y deseos (Wishes)',
    lines: [
      { who: 'Marta', es: '¿Qué harías si pudieras vivir en otro país?', en: 'What would you do if you could live in another country?' },
      { who: 'Pablo', es: 'Me mudaría a Puerto Rico, si tuviera trabajo allí.', en: 'I would move to Puerto Rico, if I had a job there.' },
      { who: 'Marta', es: 'Ojalá supieras lo difícil que es emigrar.', en: 'I wish you knew how hard it is to emigrate.' },
      { who: 'Pablo', es: 'Espero que algún día todo sea más fácil.', en: 'I hope that someday everything is easier.' },
      { who: 'Marta', es: 'Quisiera que visitaras la isla conmigo.', en: 'I would like you to visit the island with me.' },
      { who: 'Pablo', es: 'Con tal de que haya playa, estoy listo.', en: 'As long as there is a beach, I am ready.' }
    ],
    questions: [
      { type: 'mc-en', q: '¿Qué haría Pablo si tuviera trabajo en Puerto Rico?', options: ['se mudaría a Puerto Rico', 'se quedaría en su país', 'buscaría trabajo', 'viajaría a España'], answer: 'se mudaría a Puerto Rico' },
      { type: 'mc-en', q: '¿Qué quisiera Marta?', options: ['que Pablo visite la isla con ella', 'que Pablo se mude', 'que Pablo estudie', 'que Pablo trabaje'], answer: 'que Pablo visite la isla con ella' },
      { type: 'mc-en', q: '¿Qué condición pone Pablo?', options: ['que haya playa', 'que haya trabajo', 'que haga sol', 'que no llueva'], answer: 'que haya playa' }
    ]
  },
  quiz: [
    { type: 'mc-en', q: '¿Qué significa «ojalá»?', options: ['I wish / hopefully', 'never', 'surely', 'perhaps not'], answer: 'I wish / hopefully', es: 'ojalá' },
    { type: 'mc-es', q: 'How do you say I would like?', options: ['quisiera', 'tuviera', 'pudiera', 'fuera'], answer: 'quisiera', es: 'quisiera' },
    { type: 'mc-en', q: '¿Qué significa «duda»?', options: ['doubt', 'wish', 'emotion', 'fear'], answer: 'doubt', es: 'duda' },
    { type: 'mc-es', q: 'Which word means wish / desire?', options: ['deseo', 'duda', 'emoción', 'subjuntivo'], answer: 'deseo', es: 'deseo' },
    { type: 'typing', q: 'Type to hope in Spanish.', answer: 'esperar', accepts: [], es: 'esperar' },
    { type: 'typing', q: 'Type although in Spanish.', answer: 'aunque', accepts: [], es: 'aunque' },
    { type: 'mc-en', q: '¿Qué significa «pudiera»?', options: ['could (subj.)', 'I can', 'I could not', 'I will be able'], answer: 'could (subj.)', es: 'pudiera' },
    { type: 'mc-es', q: 'Which word means unless?', options: ['a menos que', 'con tal de que', 'tan pronto como', 'por si'], answer: 'a menos que', es: 'a menos que' },
    { type: 'mc-en', q: '¿Qué significa «tuviera»?', options: ['had (subj.)', 'I have', 'I had', 'I will have'], answer: 'had (subj.)', es: 'tuviera' },
    { type: 'mc-es', q: 'Which word means as soon as?', options: ['tan pronto como', 'a menos que', 'aunque', 'ojalá'], answer: 'tan pronto como', es: 'tan pronto como' },
    { type: 'typing', q: 'Type to doubt in Spanish.', answer: 'dudar', accepts: [], es: 'dudar' },
    { type: 'mc-en', q: '¿Qué significa «emoción»?', options: ['emotion', 'doubt', 'wish', 'fear'], answer: 'emotion', es: 'emoción' }
  ],
  test: {
    title: 'Unit 39 test — Advanced subjunctive',
    questions: [
      { type: 'mc-en', q: '¿Qué significa «supiera»?', options: ['knew (subj.)', 'I know', 'I knew', 'I will know'], answer: 'knew (subj.)', es: 'supiera' },
      { type: 'mc-es', q: 'Say he/she were.', options: ['fuera', 'fue', 'era', 'será'], answer: 'fuera', es: 'fuera' },
      { type: 'typing', q: 'Type to feel in Spanish.', answer: 'sentir', accepts: [], es: 'sentir' },
      { type: 'mc-en', q: '¿Qué significa «subjuntivo»?', options: ['subjunctive', 'imperative', 'infinitive', 'gerund'], answer: 'subjunctive', es: 'subjuntivo' },
      { type: 'mc-es', q: 'Which phrase means provided that?', options: ['con tal de que', 'a menos que', 'tan pronto como', 'por si'], answer: 'con tal de que', es: 'con tal de que' },
      { type: 'typing', q: 'Type to fear in Spanish.', answer: 'temer', accepts: [], es: 'temer' },
      { type: 'mc-en', q: '¿Qué significa «hubiera»?', options: ['had (past subj.)', 'there was', 'I will have', 'I had'], answer: 'had (past subj.)', es: 'hubiera' },
      { type: 'mc-es', q: 'Which word means in case?', options: ['por si', 'aunque', 'ojalá', 'deseo'], answer: 'por si', es: 'por si' },
      { type: 'typing', q: 'Type to be glad in Spanish.', answer: 'alegrarse', accepts: [], es: 'alegrarse' },
      { type: 'mc-en', q: '¿Qué significa «hiciera»?', options: ['did / made (subj.)', 'I do', 'I did', 'I will do'], answer: 'did / made (subj.)', es: 'hiciera' },
      { type: 'mc-es', q: 'Which word means imperfect?', options: ['imperfecto', 'subjuntivo', 'deseo', 'duda'], answer: 'imperfecto', es: 'imperfecto' },
      { type: 'mc-en', q: '¿Qué significa «viniera»?', options: ['came (subj.)', 'he comes', 'he came', 'he will come'], answer: 'came (subj.)', es: 'viniera' }
    ]
  }
};
