# CSMath Hero

A self-contained, offline **math trainer disguised as an RPG**, built to carry you from
arithmetic all the way to the mathematics a computer science masters actually leans on:
calculus, discrete math, linear algebra, probability, and algorithm analysis.

No build step, no install, no server. **Double-click `index.html` and start playing.**

---

## Why this exists

A CS masters hits maths from several directions at once:

| Where it shows up | The maths behind it |
| --- | --- |
| Complexity / Big-O | limits, growth of functions, logarithms, series |
| Machine learning, graphics | linear algebra, calculus (gradients), probability |
| Algorithms | discrete math, recurrences, counting, proofs |
| Systems, crypto, hashing | binary, modular arithmetic, boolean algebra |
| Data / experiments | statistics, distributions, expected value |

CSMath Hero drills each of these with **procedurally generated** problems, so you never
run out of practice and never memorise a fixed answer key.

---

## How it works

- **11 realms** form a skill tree, from *Foundations of Number* to *CS Foundations*.
- **84 skills** each have a **lesson** (teach) and a **problem generator** (test).
- **Every skill has an interactive lesson**: a hook, sections with formulas and worked
  examples, an interactive visual, a formula sheet, and study tips.
- Solve problems to earn **XP** and **stars** (5 stars = mastery of a skill).
- Sustained success at a skill **levels it up**, which makes its problems harder.
- Every realm ends in a **timed Realm Trial** (a boss fight): 3 lives, 25s per question,
  clear 8/10 to conquer it.
- **Adaptive review** on the home screen always serves you your weakest, most-stale skills.
- **Streaks, a daily goal, and 25 badges** keep the habit loop honest.
- Progress saves automatically to your browser's `localStorage` (and can be exported/imported).

## Beyond practice — the super-teacher layer

The home screen's **"Ways to train"** row gives you six different modes:

| Mode | What it does |
| --- | --- |
| **<span>Daily Challenge</span>** | 3 problems chosen deterministically for today. Bonus XP, feeds your streak. |
| **Spaced Review** | A real spaced-repetition queue. Correct answers push a skill's next review out (1→2→4→8…60 days); a miss makes it due again *now*. The card shows how many skills are due. |
| **Lightning Round** | 60 seconds of rapid mental math — powers of two, times tables, binary, percents, mod, gcd. Builds the raw fluency the hard topics assume. |
| **Mock Exam** | Pick realms, length, and a time limit. No hints, no instant feedback — then a full report with per-question solutions and a score. Your exam history is kept. |
| **Mistake Notebook** | Every problem you miss is saved automatically with its worked solution, so you can retry the skill or reread the lesson. |
| **Learning Paths** | Goal-driven curricula that sequence skills for you (see below). |

### Learning paths

Pick a goal and the home screen always points you at the next step:

- **Zero → Confident** — rebuild arithmetic and algebra from scratch.
- **Zero → Algorithms** — the maths behind complexity and algorithm analysis.
- **Zero → Machine Learning** — linear algebra, calculus, and probability.
- **Zero → Systems & Security** — binary, bits, modular arithmetic, crypto logic.
- **Zero → Graphics & Games** — vectors, matrices, trig, motion.
- **Zero → Discrete Math** — sets, logic, counting, graphs, proofs.
- **Full Masters Curriculum** — everything, in dependency order.

Each path tracks steps done, shows your next lesson, and can be continued in one click.

## Learn first, then practise

Open a realm, then click **Learn** on any skill (or the big *Learn: <skill>* button on the
home screen, which always points at your next unstudied topic). Each lesson teaches before it
tests:

- **Interactive visuals** you can play with — drag the number line to see sign rules, watch a
  tangent line slide along a curve, toggle bits to see binary/hex/two's complement, spin the
  unit circle, build fractions, balance an equation scale, step through a bubble sort, shade the
  normal curve, and more.
- **Worked examples** that show each step, not just the answer.
- **Formula sheets** and **study tips** per skill.

Mark a lesson as learned (or press *Practice this skill*) and the skill is flagged &#10003; studied.
The **Lesson** button also sits inside every practice session, and the results screen offers
*Read the lesson* when you miss problems — so you always know how to fix a gap.

### Interactive widgets included

`numberline`, `fractionbar`, `balance`, `slope`, `functiongraph` (with tangent lines),
`unitcircle`, `righttriangle`, `bitboxes`, `matrixmult`, `venn`, `sortbars`, `normalcurve`,
`graphnet`.

### The realms

1. **Foundations of Number** — signed arithmetic, order of operations, factors, fractions, percents, powers.
2. **Pre-Algebra** — expressions, one/two-step equations, inequalities, ratios, slope.
3. **Algebra** — lines, systems, exponent laws, polynomials, quadratics, logs, radicals.
4. **Functions** — evaluation, composition, inverses, domain, exponential growth, sequences.
5. **Trigonometry** — SOH-CAH-TOA, special angles, identities, law of cosines, radians, the unit circle.
6. **Calculus** — limits, power/product/chain rules, tangent lines, optimisation, integrals, series.
7. **Discrete Math** — sets, logic, inclusion–exclusion, combinatorics, pigeonhole, graphs, recurrences, modular arithmetic.
8. **Linear Algebra** — vectors, dot products, matrix multiplication, determinants, rank, eigenvalues, independence.
9. **Probability & Statistics** — basic probability, Bayes, conditional, expected value, variance, binomial, the normal curve.
10. **Algorithms & Complexity** — Big-O classification, the master theorem, sorting, binary search, DP, growth ordering, data structures.
11. **CS Foundations** — binary, hex, bitwise ops, shifts, two's complement, boolean algebra, modular exponentiation, Euclid, integer ranges.

---

## Controls

- **Enter** submits an answer; **Enter** again moves to the next problem.
- **1–4** pick a multiple-choice option.
- **Esc** quits the current session (progress is kept).
- The **Codex** tab is a searchable formula sheet — every skill has a one-line theory reminder.

## Calculator & smart input

Every numeric question comes with a **built-in scientific calculator** (the 🧮 button).
It can insert `sin(`, `sqrt(`, `C(`, `P(`, `^`, `!`, `π`, and more into your answer, with a
**live preview** of the result, and a `=` key that drops the evaluated value into the answer box.

Better yet: you don't even need the calculator for most problems, because the **answer box
understands arithmetic expressions directly**. Type any of these and it will be evaluated and
graded:

```
3/4            -> 0.75
sqrt(2)/2      -> 1.4142…
2^5            -> 32
5!             -> 120
C(10,2)        -> 45        (combinations)
P(10,2)        -> 90        (permutations)
sin(30)        -> 0.5       (degrees by default)
log(100)       -> 2
mod(17,5)      -> 2
1,000          -> 1000      (thousands separators OK)
37.5%          -> 37.5      (a % sign is accepted as a unit on percent answers)
```

Supported: `+ - * / ^`, parentheses, postfix `!`, constants `pi`/`e`, and functions
`sqrt abs floor ceil round exp ln log log(a,b) sin cos tan C P fact mod`. The `DEG/RAD`
toggle switches trig to radians.

---

## Project layout

```
csmath/
├─ index.html            # loads everything; open this
├─ styles.css            # dark "arcade terminal" theme
├─ package.json          # only for the optional dev tests
├─ js/
│  ├─ util.js            # seeded RNG, math helpers, expression evaluator, mini-TeX, DOM helpers
│  ├─ state.js           # XP, levels, mastery, achievements, streaks, persistence
│  ├─ problems.js        # generator registry, answer grading, session builder, recommender
│  ├─ curriculum.js      # the realm/skill tree and per-skill theory blurbs
│  ├─ viz.js             # 13 interactive SVG/HTML visual widgets used in lessons
│  ├─ lessons.js         # lesson registry + "studied" tracking
│  ├─ lesson.*.js        # lesson content, grouped by realm (the teaching material)
│  ├─ gen.*.js           # one file of problem generators per realm (the testing material)
│  ├─ features.js        # learning paths, mock-exam builder, lightning drill, export/import
│  ├─ ui.js              # router, views, lesson reader, session runner, boss battles, stats
│  └─ app.js             # boot (with a friendly error screen)
└─ tools/
   ├─ selftest.js        # validates every generator AND every lesson (no dependencies)
   └─ uitest.js          # boots the real UI in jsdom, renders all lessons, plays sessions
```

### Adding your own skill

1. Add an entry to the right realm in `js/curriculum.js`:
   `{ id: 'alg.myskill', name: 'My Skill', blurb: 'One-line theory.' }`
2. Register a generator with the same id in the matching `js/gen.*.js`:
   ```js
   MH.def('alg.myskill', function (r, level) {
     var a = r.int(2, 2 + level);           // r = seeded RNG, level = 1..10
     return {
       prompt: 'What is ' + a + ' + ' + a + '?',
       answer: { type: 'number', value: 2 * a },   // or 'text' / 'choice'
       hint: 'Double it.',
       steps: ['2 × ' + a + ' = ' + 2 * a]         // shown on every answer
     };
   });
   ```
3. Add a lesson with the same id in the matching `js/lesson.*.js`:
   ```js
   MH.lesson('alg.myskill', {
     hook: 'Why this matters, in one sentence.',
     viz: 'numberline',                     // optional interactive widget
     s: [
       { h: 'Heading', b: [
         ['p', 'A paragraph.'],
         ['f', 'y = mx + b'],               // formula
         ['ex', { q: '2 + 2 = ?', steps: ['Add them.'], a: '4' }],
         ['viz', 'balance']                 // inline widget
       ] }
     ],
     f: ['key formula'],
     tips: ['a study tip']
   });
   ```
4. Run `node tools/selftest.js` to validate the generator **and** the lesson.

The prompt/hint/step strings accept a tiny TeX-like syntax handled by `MH.m()`:
`\frac{a}{b}`, `\sqrt{x}`, `x^{2}`, `x_{i}`, `\pi`, `\le`, `\ge`, `\pm`, `\to`, `\in`, `\cap`, `\cup`, and friends.

---

## Tests

```bash
node tools/selftest.js      # ~5,000 generated problems validated (zero dependencies)
npm install && npm run test:ui   # optional: drives the real UI in jsdom
```

`selftest.js` exercises every generator at every level and checks that answers are
finite, self-gradeable, renderable, and that multiple-choice options are valid and unique.
It also checks that **every skill has a lesson**, that lesson structure is valid, that
every visual widget referenced actually exists, that **learning paths reference real
skills**, that **every drill problem self-grades**, that the **exam builder** returns the
right count, that **spaced repetition** schedules correctly, and that **export/import**
round-trips.

`uitest.js` boots the real UI and renders **all 84 lessons**, mounts **every interactive
widget**, clicks a bit-box to confirm it responds, marks a lesson learned, renders the paths /
notebook / exam screens, sets a learning path, round-trips an export/import, **runs a full
mock exam to its report**, confirms a wrong answer lands in the mistake notebook, and then
plays a numeric session, a multiple-choice session, and a boss trial end to end.

---

## Suggested study path toward the masters

The **Learning Paths** screen encodes this for you, but here is the reasoning:

1. Pick **Zero → Confident** and speed-run **Foundations** and **Pre-Algebra** until most
   skills are 5★.
2. Switch to a goal path (**Algorithms**, **ML**, **Systems**, or **Graphics**) and follow its
   "next step" from the home screen — it sequences lessons before practice automatically.
3. Use **Spaced Review** daily to keep old skills sharp, and the **Mistake Notebook** as your
   personal revision list.
4. Take a **Mock Exam** weekly with a timer. A rising score with no hints is the real signal
   you are ready for grad coursework.
5. Warm up with a **Lightning Round** whenever arithmetic feels slow — fluency is
   compounding interest for every later topic.

Clear a realm's Trial before moving on. If a Trial keeps beating you, the misses it shows
you *are* your study list.

Good luck — go from zero to hero.
