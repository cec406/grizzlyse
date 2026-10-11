// Unit 4 — Family. A1.
export const unit = {
  id: 'u04',
  level: 'A1',
  number: 4,
  title: 'Family',
  titleRu: 'Семья́',
  story: 'Show someone your family photos and you will use this unit forever: ма́ма and па́па, брат and сестра́, ба́бушка and де́душка. You also meet «У меня́ есть…» — Russian\'s way of saying "I have".',
  grammar: [
    {
      topic: 'Possessive pronouns agree',
      explanation: 'мой ("my") changes to match the noun: мой брат (m), моя́ сестра́ (f), моё и́мя (n), мои́ де́ти (plural). The same pattern works for наш ("our").',
      table: [
        ['', 'm', 'f', 'n', 'plural'],
        ['my', 'мой', 'моя́', 'моё', 'мои́'],
        ['our', 'наш', 'на́ша', 'на́ше', 'на́ши'],
        ['your (sing.)', 'твой', 'твоя́', 'твоё', 'твои́'],
        ['your (polite)', 'ваш', 'ва́ша', 'ва́ше', 'ва́ши']
      ],
      examples: [
        { ru: 'Э́то мой брат и моя́ сестра́.', trans: 'eta moy brat i moya sestra', en: 'This is my brother and my sister.' },
        { ru: 'На́ши де́ти до́ма.', trans: 'nashi deti doma', en: 'Our children are at home.' }
      ]
    },
    {
      topic: 'У меня́ есть — "I have"',
      explanation: 'Russian has no verb "to have". Say «У меня́ есть …» = "by me there is …". Swap the pronoun for other people: У тебя́ есть…, У него́ есть…, У нас есть…',
      table: [
        ['Russian', 'English'],
        ['У меня́ есть брат.', 'I have a brother.'],
        ['У тебя́ есть сестра́?', 'Do you have a sister?'],
        ['У него́ есть сын.', 'He has a son.']
      ],
      examples: [
        { ru: 'У меня́ есть брат и сестра́.', trans: 'u menya yest brat i sestra', en: 'I have a brother and a sister.' }
      ]
    },
    {
      topic: 'Talking about family',
      explanation: 'Family words come in masculine/feminine pairs: брат/сестра́, сын/дочь, де́душка/ба́бушка, муж/жена́. Déдушка and па́па end in -а but are masculine — they describe men, so they take masculine words: мой де́душка.',
      table: [
        ['Russian', 'English', 'Gender'],
        ['брат', 'brother', 'm'],
        ['сестра́', 'sister', 'f'],
        ['сын', 'son', 'm'],
        ['дочь', 'daughter', 'f'],
        ['де́душка', 'grandfather', 'm'],
        ['ба́бушка', 'grandmother', 'f']
      ],
      examples: [
        { ru: 'Мой де́душка и моя́ ба́бушка до́ма.', trans: 'moy dedushka i moya babushka doma', en: 'My grandfather and my grandmother are at home.' }
      ]
    }
  ],
  vocabulary: [
    { id: 'u4-semya', ru: 'семья́', translit: 'semya', en: 'family', pos: 'noun', gender: 'f' },
    { id: 'u4-mama', ru: 'ма́ма', translit: 'mama', en: 'mom', pos: 'noun', gender: 'f' },
    { id: 'u4-papa', ru: 'па́па', translit: 'papa', en: 'dad', pos: 'noun', gender: 'm' },
    { id: 'u4-mat', ru: 'мать', translit: 'mat', en: 'mother', pos: 'noun', gender: 'f' },
    { id: 'u4-otets', ru: 'оте́ц', translit: 'otets', en: 'father', pos: 'noun', gender: 'm' },
    { id: 'u4-brat', ru: 'брат', translit: 'brat', en: 'brother', pos: 'noun', gender: 'm' },
    { id: 'u4-sestra', ru: 'сестра́', translit: 'sestra', en: 'sister', pos: 'noun', gender: 'f' },
    { id: 'u4-syn', ru: 'сын', translit: 'syn', en: 'son', pos: 'noun', gender: 'm' },
    { id: 'u4-doch', ru: 'дочь', translit: 'doch', en: 'daughter', pos: 'noun', gender: 'f' },
    { id: 'u4-babushka', ru: 'ба́бушка', translit: 'babushka', en: 'grandmother', pos: 'noun', gender: 'f' },
    { id: 'u4-dedushka', ru: 'де́душка', translit: 'dedushka', en: 'grandfather', pos: 'noun', gender: 'm' },
    { id: 'u4-muzh', ru: 'муж', translit: 'muzh', en: 'husband', pos: 'noun', gender: 'm' },
    { id: 'u4-zhena', ru: 'жена́', translit: 'zhena', en: 'wife', pos: 'noun', gender: 'f' },
    { id: 'u4-rebenok', ru: 'ребёнок', translit: 'rebenok', en: 'child', pos: 'noun', gender: 'm' },
    { id: 'u4-deti', ru: 'де́ти', translit: 'deti', en: 'children', pos: 'noun', gender: 'p' },
    { id: 'u4-roditeli', ru: 'роди́тели', translit: 'roditeli', en: 'parents', pos: 'noun', gender: 'p' },
    { id: 'u4-est', ru: 'есть', translit: 'yest', en: 'there is / to have (with у)', pos: 'verb' },
    { id: 'u4-moy', ru: 'мой', translit: 'moy', en: 'my (m)', pos: 'pronoun' },
    { id: 'u4-moya', ru: 'моя́', translit: 'moya', en: 'my (f)', pos: 'pronoun' },
    { id: 'u4-nash', ru: 'наш', translit: 'nash', en: 'our', pos: 'pronoun' }
  ],
  phrases: [
    { id: 'p-u4-1', ru: 'У меня́ есть…', trans: 'u menya yest', en: 'I have…' },
    { id: 'p-u4-2', ru: 'Э́то моя́ семья́.', trans: 'eta moya semya', en: 'This is my family.' }
  ],
  sentences: [
    { ru: 'Э́то моя́ семья́.', translit: 'eta moya semya', en: 'This is my family.', words: [{ id: 'u4-moya', ru: 'моя́', en: 'my (f)' }, { id: 'u4-semya', ru: 'семья́', en: 'family' }] },
    { ru: 'У меня́ есть брат и сестра́.', translit: 'u menya yest brat i sestra', en: 'I have a brother and a sister.', words: [{ id: 'u4-est', ru: 'есть', en: 'there is' }, { id: 'u4-brat', ru: 'брат', en: 'brother' }, { id: 'u4-sestra', ru: 'сестра́', en: 'sister' }] },
    { ru: 'Моя́ ма́ма и мой па́па до́ма.', translit: 'moya mama i moy papa doma', en: 'My mom and my dad are at home.', words: [{ id: 'u4-moya', ru: 'Моя́', en: 'my (f)' }, { id: 'u4-mama', ru: 'ма́ма', en: 'mom' }, { id: 'u4-moy', ru: 'мой', en: 'my (m)' }, { id: 'u4-papa', ru: 'па́па', en: 'dad' }] },
    { ru: 'Его́ оте́ц — врач, а мать — учи́тельница.', translit: 'yego otets vrach, a mat uchitelnitsa', en: 'His father is a doctor, and his mother is a teacher.', words: [{ id: 'u4-otets', ru: 'оте́ц', en: 'father' }, { id: 'u4-mat', ru: 'мать', en: 'mother' }] },
    { ru: 'У них есть де́ти.', translit: 'u nikh yest deti', en: 'They have children.', words: [{ id: 'u4-est', ru: 'есть', en: 'there is' }, { id: 'u4-deti', ru: 'де́ти', en: 'children' }] }
  ],
  dialogue: {
    title: 'Семе́йный а́льбом (The family album)',
    lines: [
      { who: 'Мария', ru: 'Э́то твоя́ семья́?', en: 'Is this your family?' },
      { who: 'Том', ru: 'Да. Э́то моя́ ма́ма, а э́то мой па́па.', en: 'Yes. This is my mom, and this is my dad.' },
      { who: 'Мария', ru: 'А кто э́то?', en: 'And who is this?' },
      { who: 'Том', ru: 'Э́то мой брат. У него́ есть жена́ и сын.', en: 'This is my brother. He has a wife and a son.' },
      { who: 'Мария', ru: 'У тебя́ больша́я семья́!', en: 'You have a big family!' },
      { who: 'Том', ru: 'Да, и ещё́ ба́бушка и де́душка.', en: 'Yes, and also a grandmother and a grandfather.' }
    ],
    questions: [
      { type: 'mc-ru', q: 'Кто э́то на фото́?', options: ['брат', 'па́па', 'де́душка', 'сын'], answer: 'брат' },
      { type: 'mc-ru', q: 'У кого́ есть жена́ и сын?', options: ['у бра́та', 'у па́пы', 'у де́душки', 'у ма́мы'], answer: 'у бра́та' },
      { type: 'mc-ru', q: 'Кака́я семья́ у То́ма?', options: ['больша́я', 'ма́ленькая', 'но́вая', 'ста́рая'], answer: 'больша́я' }
    ]
  },
  quiz: [
    { type: 'mc-en', q: 'Что зна́чит «сестра́»?', options: ['sister', 'brother', 'daughter', 'wife'], answer: 'sister', ru: 'сестра́' },
    { type: 'mc-en', q: 'Что зна́чит «де́душка»?', options: ['grandfather', 'grandmother', 'father', 'son'], answer: 'grandfather', ru: 'де́душка' },
    { type: 'mc-ru', q: 'How do you say “mother”?', options: ['мать', 'оте́ц', 'жена́', 'дочь'], answer: 'мать', ru: 'мать' },
    { type: 'mc-ru', q: '“son” in Russian', options: ['сын', 'дочь', 'брат', 'муж'], answer: 'сын', ru: 'сын' },
    { type: 'typing', q: 'Type “family” in Russian', answer: 'семья', accepts: ['семья́'], ru: 'семья́' },
    { type: 'typing', q: 'Type “brother” in Russian', answer: 'брат', accepts: [], ru: 'брат' },
    { type: 'mc-en', q: 'Что зна́чит «роди́тели»?', options: ['parents', 'children', 'grandparents', 'family'], answer: 'parents', ru: 'роди́тели' },
    { type: 'mc-ru', q: '“daughter” in Russian', options: ['дочь', 'сын', 'сестра́', 'жена́'], answer: 'дочь', ru: 'дочь' },
    { type: 'mc-en', q: 'Что зна́чит «жена́»?', options: ['wife', 'husband', 'mother', 'sister'], answer: 'wife', ru: 'жена́' },
    { type: 'mc-ru', q: 'Complete: ___ ма́ма (my mother)', options: ['моя́', 'мой', 'моё', 'мои́'], answer: 'моя́', ru: 'моя́ ма́ма' },
    { type: 'typing', q: 'Type “children” in Russian', answer: 'дети', accepts: ['де́ти'], ru: 'де́ти' },
    { type: 'mc-en', q: 'Что зна́чит «муж»?', options: ['husband', 'wife', 'son', 'father'], answer: 'husband', ru: 'муж' }
  ],
  test: {
    title: 'Unit 4 test — Family',
    questions: [
      { type: 'mc-ru', q: '“grandmother” in Russian', options: ['ба́бушка', 'де́душка', 'ма́ма', 'сестра́'], answer: 'ба́бушка', ru: 'ба́бушка' },
      { type: 'mc-en', q: 'Что зна́чит «оте́ц»?', options: ['father', 'mother', 'grandfather', 'son'], answer: 'father', ru: 'оте́ц' },
      { type: 'typing', q: 'Type “sister” in Russian', answer: 'сестра', accepts: ['сестра́'], ru: 'сестра́' },
      { type: 'typing', q: 'Type “parents” in Russian', answer: 'родители', accepts: ['роди́тели'], ru: 'роди́тели' },
      { type: 'mc-ru', q: '“wife” in Russian', options: ['жена́', 'муж', 'дочь', 'мать'], answer: 'жена́', ru: 'жена́' },
      { type: 'mc-en', q: 'Что зна́чит «ребёнок»?', options: ['child', 'children', 'son', 'daughter'], answer: 'child', ru: 'ребёнок' },
      { type: 'mc-ru', q: 'Complete: ___ па́па (my dad)', options: ['мой', 'моя́', 'моё', 'мои́'], answer: 'мой', ru: 'мой па́па' },
      { type: 'typing', q: 'Type “husband” in Russian', answer: 'муж', accepts: [], ru: 'муж' },
      { type: 'mc-en', q: 'Что зна́чит «семья́»?', options: ['family', 'parents', 'children', 'home'], answer: 'family', ru: 'семья́' },
      { type: 'mc-ru', q: '“children” in Russian', options: ['де́ти', 'ребёнок', 'роди́тели', 'сыновья́'], answer: 'де́ти', ru: 'де́ти' },
      { type: 'typing', q: 'Type “mom” in Russian', answer: 'мама', accepts: ['ма́ма'], ru: 'ма́ма' },
      { type: 'mc-en', q: 'Что зна́чит «дочь»?', options: ['daughter', 'son', 'wife', 'sister'], answer: 'daughter', ru: 'дочь' }
    ]
  }
};
