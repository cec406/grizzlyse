/* ============================================================
   CSMath Hero - lessons.js
   Lesson registry + lookup helpers.

   Lesson shape:
   MH.lesson('skill.id', {
     hook: 'one punchy sentence that makes you care',
     viz:  'numberline',           // optional primary interactive
     s: [                          // sections
       { h: 'Heading', b: [ blocks ] }
     ],
     f:    ['formula', ...],       // formula sheet for the skill
     tips: ['study tip', ...]
   });

   Block formats (2 or 3 item arrays):
     ['p', 'paragraph html']
     ['f', 'formula html']
     ['list', ['a', 'b']]
     ['note', 'callout html']      // blue info
     ['warn', 'callout html']      // amber caution
     ['ex', { q, steps: [], a }]   // worked example
     ['viz', 'widgetName', opts]   // inline interactive visual
     ['table', { head: [], rows: [[]] }]
   ============================================================ */
(function (MH) {
  'use strict';
  MH.LESSONS = {};
  MH.lesson = function (id, data) { MH.LESSONS[id] = data; };
  MH.getLesson = function (id) { return MH.LESSONS[id] || null; };

  MH.lessonStudied = function (id) {
    var s = MH.state.skills[id];
    return !!(s && s.lesson);
  };
  MH.markLessonStudied = function (id) {
    var s = MH.skillState(id);
    s.lesson = s.lesson || Date.now();
    MH.save();
  };
  MH.lessonsStudiedCount = function () {
    return MH.ALL_SKILLS.filter(function (s) { return MH.lessonStudied(s.id); }).length;
  };
})(window.MH);
