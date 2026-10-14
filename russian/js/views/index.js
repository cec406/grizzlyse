// View manifest: route name -> { render, attach }.
import { render as homeRender, attach as homeAttach } from './home.js';
import { render as pathRender, attach as pathAttach } from './path.js';
import { render as alphabetRender, attach as alphabetAttach } from './alphabet.js';
import { render as keyboardRender, attach as keyboardAttach } from './keyboard.js';
import { render as vocabRender, attach as vocabAttach } from './vocab.js';
import { render as cyberRender, attach as cyberAttach } from './cyber.js';
import { render as lessonsRender, attach as lessonsAttach } from './lessons.js';
import { render as lessonRender, attach as lessonAttach } from './lesson.js';
import { render as practiceRender, attach as practiceAttach } from './practice.js';
import { render as reviewRender, attach as reviewAttach } from './review.js';
import { render as readingRender, attach as readingAttach } from './reading.js';
import { render as readingTextRender, attach as readingTextAttach } from './reading-text.js';
import { render as grammarRender, attach as grammarAttach } from './grammar.js';
import { render as progressRender, attach as progressAttach } from './progress.js';
import { render as audioSetupRender, attach as audioSetupAttach } from './audio-setup.js';
import { render as helpRender, attach as helpAttach } from './help.js';
import { render as placementRender, attach as placementAttach } from './placement.js';

export const VIEWS = {
  home: { render: homeRender, attach: homeAttach },
  path: { render: pathRender, attach: pathAttach },
  alphabet: { render: alphabetRender, attach: alphabetAttach },
  keyboard: { render: keyboardRender, attach: keyboardAttach },
  vocab: { render: vocabRender, attach: vocabAttach },
  cyber: { render: cyberRender, attach: cyberAttach },
  lessons: { render: lessonsRender, attach: lessonsAttach },
  lesson: { render: lessonRender, attach: lessonAttach },
  practice: { render: practiceRender, attach: practiceAttach },
  review: { render: reviewRender, attach: reviewAttach },
  reading: { render: readingRender, attach: readingAttach },
  'reading-text': { render: readingTextRender, attach: readingTextAttach },
  grammar: { render: grammarRender, attach: grammarAttach },
  progress: { render: progressRender, attach: progressAttach },
  'audio-setup': { render: audioSetupRender, attach: audioSetupAttach },
  help: { render: helpRender, attach: helpAttach },
  placement: { render: placementRender, attach: placementAttach }
};

export function viewFor(name) {
  return VIEWS[name] || VIEWS.home;
}