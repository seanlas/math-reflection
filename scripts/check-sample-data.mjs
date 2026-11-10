import fs from 'node:fs';
import vm from 'node:vm';
import assert from 'node:assert/strict';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const pack = JSON.parse(fs.readFileSync(path.join(root, 'dist/sample-data.json'), 'utf8'));
assert.equal(pack.synthetic, true);
assert.equal(pack.version, 1);
const app = fs.readFileSync(path.join(root, 'dist/app.js'), 'utf8');
const core = app.slice(0, app.indexOf('function demo(){'));
const statistics = app.slice(app.indexOf('function stats('), app.indexOf('function metrics('));
const context = vm.createContext({ document: {}, Date });
vm.runInContext(core + statistics + ';this.api={normalize,stats,number,dateValue};', context);
for (const [course, rows] of Object.entries(pack.workbooks)) {
  assert.equal(rows.length, 12);
  assert.equal(new Set(rows.map(r => r[3])).size, 3);
  assert.ok(rows.every(r => /^demo-g\d+-\d@example\.com$/.test(r[3])));
  assert.ok(rows.every(r => /^Demo Learner \d\d$/.test(r[4])));
  const normalized = context.api.normalize(rows, course);
  assert.equal(normalized.length, 12);
  assert.ok(normalized.every(r => r.warnings.length === 0));
  if (course !== 'g10') {
    const complete = rows.filter(r => r[10] !== null);
    const expectedExact = complete.filter(r => Number(r[9]) === Number(r[10])).length;
    const result = context.api.stats(normalized, 'Overall');
    assert.equal(result.n, complete.length);
    assert.equal(result.exact, expectedExact);
    assert.equal(result.close, complete.filter(r => Math.abs(Number(r[10])-Number(r[9]))<=1).length);
  } else {
    assert.equal(context.api.stats(normalized, 'A').n, 9);
    assert.equal(context.api.stats(normalized, 'D').n, 6);
    assert.equal(context.api.stats(normalized, 'B').n, 3);
    assert.equal(context.api.stats(normalized, 'C').n, 3);
  }
}
assert.equal(context.api.number('',7), null);
assert.equal(context.api.number('0',7), null);
assert.equal(context.api.number('0',8), 0);
assert.equal(context.api.number('9',8), null);
const fixture = [{scores:{A:{predicted:4,actual:2}}},{scores:{A:{predicted:4,actual:4}}},{scores:{A:{predicted:4,actual:null}}},{scores:{A:{predicted:4,actual:5}}}];
const result = context.api.stats(fixture,'A');
assert.equal(result.n,3);
assert.equal(result.exact,1);
assert.equal(result.close,2);
assert.equal(result.mean,1);
console.log('PASS: synthetic identities, 36 responses, criterion mapping, missing scores, and prediction metrics.');
