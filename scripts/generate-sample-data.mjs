import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

// All values are invented. This generator never reads a private source file.
const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const pack = { version: 1, synthetic: true, workbooks: { g10: [], g11: [], g12: [] } };
const dates = ['2026-01-15', '2026-02-12', '2026-03-19', '2026-04-23'];
const preparation = ['Somewhat prepared', 'Very prepared', 'Somewhat unprepared'];
const strengths = ['I explained each step clearly.', 'My diagrams helped me organize the information.', 'I checked the units in my answers.'];
const challenges = ['I ran out of time on the final question.', 'I found it hard to choose a formula for unfamiliar problems.', 'I made calculation slips when I rushed.'];
const plans = ['Use a timed practice set twice this week.', 'Explain my method choice before solving mixed problems.', 'Reread each question and check calculations after solving.'];
for (const [course, rows] of Object.entries(pack.workbooks)) {
  for (let learner = 0; learner < 3; learner++) {
    for (let assessment = 0; assessment < 4; assessment++) {
      const id = learner * 4 + assessment + 1;
      const identity = [id, `${dates[assessment]}T09:00:00`, `${dates[assessment]}T09:05:00`, `demo-${course}-${learner + 1}@example.com`, `Demo Learner ${String(learner + 1).padStart(2, '0')}`];
      const expected = 3 + (learner + assessment) % 4;
      const actual = Math.max(1, Math.min(course === 'g10' ? 8 : 7, expected + [-1, 0, 1, 2][(learner + assessment) % 4]));
      const mistakes = ['Time management;', 'Choosing the right formula;', 'Careless calculations;'][learner];
      if (course === 'g10') {
        const criterion = ['A;', 'A;D;', 'B;C;', 'A;D;'][assessment];
        const second = assessment > 0;
        rows.push([...identity, ['10 Demo A', '10 Demo B', '10 Demo C'][learner], dates[assessment], preparation[learner], criterion, 'Mixed practice;Checked worked solutions;', String(expected), second ? String(expected + 1) : null, String(actual), second ? String(Math.min(8, actual + 1)) : null, mistakes, strengths[learner], challenges[learner], plans[learner]]);
      } else {
        rows.push([...identity, dates[assessment], preparation[learner], 'Mixed practice;Checked worked solutions;', ['Sequences and series', 'Geometry', 'Functions', 'Cumulative practice'][assessment], String(expected), course === 'g11' && learner === 2 && assessment === 3 ? null : String(actual), mistakes, strengths[learner], challenges[learner], plans[learner]]);
      }
    }
  }
}
fs.writeFileSync(path.join(root, 'dist', 'sample-data.json'), JSON.stringify(pack, null, 2) + '\n');
fs.writeFileSync(path.join(root, 'dist', 'sample-data.js'), '// Entirely synthetic demonstration data.\nwindow.REFLECTION_SAMPLE_DATA = ' + JSON.stringify(pack) + ';\n');
console.log('Generated 36 fictional responses across 9 demo learners and 3 courses.');
