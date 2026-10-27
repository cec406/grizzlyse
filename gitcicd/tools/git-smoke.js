/* quick smoke test for the new git engine features (amend, blame) */
const fs = require('fs');
const path = require('path');
const root = path.join(__dirname, '..');
const files = ['util.js', 'state.js', 'git.js', 'graph.js', 'ci.js', 'content.js'].map(f => path.join(root, 'js', f));

global.window = global;
let src = '';
for (const f of files) src += fs.readFileSync(f, 'utf8') + '\n';
// evaluate the IIFEs
eval(src);

const GH = global.GH;
const repo = new GH.Repo();
function run(cmd) {
  const out = GH.Git.run ? GH.Git.run(cmd) : repo.run(cmd);
  console.log('$ ' + cmd + '\n' + (out && out.out !== undefined ? out.out : out));
}
// init + commits
repo.run('init');
repo.writeFile('app.js', 'function main() {\n  return 1;\n}\n');
repo.run('add .');
repo.run('commit -m "feat: first commit"');
repo.writeFile('app.js', 'function main() {\n  return 2;\n}\n');
repo.run('add .');
repo.run('commit -m "fix: bump return"');
console.log('--- amend the tip message ---');
const a = repo.run('commit -m "fix: bump return properly" --amend');
console.log(a.out);
console.log('--- log ---');
console.log(repo.run('log --oneline').out);
console.log('--- blame app.js ---');
console.log(repo.run('blame app.js').out);
console.log('--- status (index should be clean after amend) ---');
console.log(repo.run('status').out);