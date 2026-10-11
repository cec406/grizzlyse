/* =========================================================================
 * tests/run.js — the whole engine test suite.  Run with:  npm test
 * ========================================================================= */

import { describe, it, assert, eq, contains, notContains, summary } from './harness.js';
import { createHash } from 'node:crypto';
import { VFS, FSError } from '../js/fs.js';
import { Shell } from '../js/shell.js';
import { BashShell, BASH_COMMANDS } from '../js/bash.js';
import { WinShell } from '../js/windows.js';
import { lex, parseScript, expandWord, globToRegExp, normalizeUnix, joinPath, winFromUnix, unixFromWin } from '../js/util.js';
import { md5, sha1, sha256, base64Encode, base64Decode } from '../js/hash.js';
import { runScript } from '../js/script.js';
import { MISSIONS, play } from '../js/content/missions.js';
import { CTF_CHALLENGES } from '../js/content/ctf.js';
import { CODE_LESSONS } from '../js/content/codelab.js';
import { ACHIEVEMENTS, evaluateAchievements } from '../js/content/achievements.js';

/* ---------------- helpers ---------------- */

function lab() {
  const fs = VFS.fromSpec({
    '/home/player/': {},
    '/home/player/notes.txt': 'remember the milk\nbuy more RAM\n',
    '/home/player/report.txt': [
      'date,host,user,action',
      '2026-03-01,web.zer0day.lab,admin,login-failed',
      '2026-03-01,web.zer0day.lab,admin,login-failed',
      '2026-03-01,web.zer0day.lab,root,login-ok',
      '2026-03-02,vault.lab,sam,login-ok',
      '2026-03-02,vault.lab,sam,download',
    ].join('\n') + '\n',
    '/etc/hostname': 'zer0day-lab\n',
    '/etc/passwd': 'root:x:0:0:root:/root:/bin/bash\nplayer:x:1000:1000:player:/home/player:/bin/bash\n',
    '/home/player/scripts/': {},
    '/home/player/scripts/backup.sh': '#!/bin/bash\nfor f in notes.txt report.txt; do\n  echo "copying $f"\ndone\necho "backup done"\n',
    '/home/player/data.log': 'line1\nline2\nline3\n',
      '/home/player/.bashrc': 'export EDITOR=nano\n',
  });
  const vm = { sudoPassword: 'toor', flags: new Set(), log: [], net: null, killedPids: [] };
  const sh = new BashShell({ fs, vm, cwd: '/home/player' });
  return { fs, sh, vm };
}

function run(sh, line) {
  const r = sh.run(line);
  return { ...r, all: (r.out || '') + (r.err || '') };
}

/* ---------------- hashing (verified against known vectors) ---------------- */

describe('hash.js — known test vectors', () => {
  it('md5("")', () => eq(md5(''), 'd41d8cd98f00b204e9800998ecf8427e'));
  it('md5("abc")', () => eq(md5('abc'), '900150983cd24fb0d6963f7d28e17f72'));
  it('md5(long string)', () => eq(md5('The quick brown fox jumps over the lazy dog'), '9e107d9d372bb6826bd81d3542a419d6'));
  it('sha1("abc")', () => eq(sha1('abc'), 'a9993e364706816aba3e25717850c26c9cd0d89d'));
  it('sha256("abc")', () => eq(sha256('abc'), 'ba7816bf8f01cfea414140de5dae2223b00361a396177a9cb410ff61f20015ad'));
  it('sha256("")', () => eq(sha256(''), 'e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855'));
  it('sha256 matches node crypto for a 200 char string', () => {
    const s = 'x'.repeat(200);
    eq(sha256(s), createHash('sha256').update(s).digest('hex'));
  });
  it('sha1 matches node crypto for a 100 char string', () => {
    const s = 'The quick brown fox jumps over the lazy dog. '.repeat(3);
    eq(sha1(s), createHash('sha1').update(s).digest('hex'));
  });
  it('base64 round trip', () => {
    const text = 'attack at dawn 🔐';
    eq(bytesToStr(base64Decode(base64Encode(text))), text);
  });
});

function bytesToStr(bytes) { return Buffer.from(bytes).toString('utf8'); }

/* ---------------- filesystem ---------------- */

describe('fs.js — virtual filesystem', () => {
  it('creates files and reads them back', () => {
    const vfs = VFS.fromSpec({ '/a.txt': 'hello' });
    eq(vfs.readFile('/a.txt'), 'hello');
  });
  it('normalises .. and .', () => eq(normalizeUnix('/a/b/../c/./d'), '/a/c/d'));
  it('resolves relative paths', () => eq(joinPath('/home/player', '../notes.txt'), '/home/notes.txt'));
  it('handles Windows drive paths', () => {
    eq(unixFromWin('C:\\Users\\Player'), '/C:/Users/Player');
    eq(winFromUnix('/C:/Users/Player'), 'C:\\Users\\Player');
  });
  it('mode strings look like ls -l', () => {
    const vfs = VFS.fromSpec({ '/x.sh': { content: 'echo hi', mode: 0o755 } });
    eq(vfs.modeString(vfs.node('/x.sh')), '-rwxr-xr-x');
    eq(vfs.modeString(vfs.node('/')), 'drwxr-xr-x');
  });
  it('mkdir -p creates parents', () => {
    const vfs = new VFS();
    vfs.mkdir('/a/b/c', { recursive: true, user: 'root' });
    assert(vfs.isDir('/a/b/c'));
  });
  it('rm refuses non-empty directories without -r', () => {
    const vfs = VFS.fromSpec({ '/d/f': 'x' });
    let threw = false;
    try { vfs.rm('/d', { user: 'root' }); } catch { threw = true; }
    assert(threw, 'expected rm to refuse');
    vfs.rm('/d', { recursive: true, user: 'root' });
    assert(!vfs.exists('/d'));
  });
  it('chmod symbolic updates bits', () => {
    const vfs = VFS.fromSpec({ '/s.sh': 'x' });
    vfs.chmod('/s.sh', 'u+x');
    eq(vfs.node('/s.sh').mode, 0o744);
    vfs.chmod('/s.sh', 'go-w');
    eq(vfs.node('/s.sh').mode, 0o744);
  });
  it('respects read permissions', () => {
    const vfs = VFS.fromSpec({ '/secret.txt': { content: 'shh', mode: 0o600, owner: 'root' } });
    let threw = false;
    try { vfs.readFile('/secret.txt'); } catch (e) { threw = e instanceof FSError; }
    assert(threw, 'expected permission denied');
    eq(vfs.readFile('/secret.txt', 'root'), 'shh');
  });
});

/* ---------------- lexer / parser ---------------- */

describe('util.js — lexer and parser', () => {
  it('respects single quotes', () => {
    const t = lex(`echo 'hello world'`);
    eq(t.map((x) => x.v), ['echo', 'hello world']);
  });
  it('respects double quotes', () => {
    const t = lex('echo "hello world"');
    eq(t[1].quoted, true);
  });
  it('splits operators', () => {
    const t = lex('ls | grep x > out.txt');
    eq(t.filter((x) => x.t === 'op').map((x) => x.v), ['|', '>']);
  });
  it('handles 2>&1', () => {
    const t = lex('cat missing 2>&1');
    eq(t.filter((x) => x.t === 'op').map((x) => x.v), ['2>&1']);
  });
  it('parses a pipeline with redirection', () => {
    const ast = parseScript(lex('cat notes.txt | grep milk > found.txt'));
    eq(ast.length, 1);
    eq(ast[0].pipeline.cmds.length, 2);
    eq(ast[0].pipeline.cmds[1].redirs[0].op, '>');
    eq(ast[0].pipeline.cmds[1].redirs[0].target.v, 'found.txt');
  });
  it('glob patterns compile', () => {
    assert(globToRegExp('*.txt').test('notes.txt'));
    assert(!globToRegExp('*.txt').test('notes.md'));
    assert(globToRegExp('log-?.log').test('log-1.log'));
    assert(globToRegExp('a*z').test('abcz'));
  });
});

/* ---------------- bash engine ---------------- */

describe('bash — files and navigation', () => {
  it('pwd', () => contains(run(lab().sh, 'pwd').out, '/home/player'));
  it('ls lists files', () => contains(run(lab().sh, 'ls').out, 'notes.txt'));
  it('ls -l shows permissions and owner', () => {
    const out = run(lab().sh, 'ls -l').out;
    contains(out, '-rw-r--r--');
    contains(out, 'player');
  });
  it('ls -a reveals dotfiles', () => {
    const out = run(lab().sh, 'ls -a').out;
    contains(out, '.bashrc');
  });
  it('cd + pwd', () => {
    const { sh } = lab();
    run(sh, 'cd /etc');
    eq(run(sh, 'pwd').out.trim(), '/etc');
  });
  it('cd .. goes up', () => {
    const { sh } = lab();
    run(sh, 'cd /etc');
    run(sh, 'cd ..');
    eq(run(sh, 'pwd').out.trim(), '/');
  });
  it('cd into a missing directory errors', () => {
    const r = run(lab().sh, 'cd /nope');
    contains(r.err, 'No such file or directory');
  });
  it('cat prints a file', () => contains(run(lab().sh, 'cat notes.txt').out, 'buy more RAM'));
  it('cat on a missing file errors with exit code 1', () => {
    const r = run(lab().sh, 'cat ghost.txt');
    contains(r.err, 'No such file or directory');
    eq(r.code, 1);
  });
  it('touch + write via redirection', () => {
    const { sh, fs } = lab();
    run(sh, 'touch new.txt');
    assert(fs.exists('/home/player/new.txt'));
    run(sh, 'echo hello > new.txt');
    eq(fs.readFile('/home/player/new.txt'), 'hello\n');
  });
  it('>> appends', () => {
    const { sh, fs } = lab();
    run(sh, 'echo one > a.txt');
    run(sh, 'echo two >> a.txt');
    eq(fs.readFile('/home/player/a.txt'), 'one\ntwo\n');
  });
  it('mkdir, cp, mv, rm', () => {
    const { sh, fs } = lab();
    run(sh, 'mkdir -p project/src');
    run(sh, 'cp notes.txt project/src/');
    run(sh, 'mv project/src/notes.txt project/src/README.txt');
    run(sh, 'rm project/src/README.txt');
    assert(fs.exists('/home/player/project/src'));
    assert(!fs.exists('/home/player/project/src/README.txt'));
  });
  it('glob expansion', () => {
    const { sh } = lab();
    const out = run(sh, 'cat *.txt').out;
    contains(out, 'buy more RAM');
    contains(out, 'login-failed');
  });
  it('variable expansion', () => {
    const { sh } = lab();
    run(sh, 'NAME=neo');
    eq(run(sh, 'echo hello $NAME').out, 'hello neo\n');
  });
  it('command substitution', () => {
    const { sh } = lab();
    contains(run(sh, 'echo $(whoami)').out, 'player');
  });
  it('&& and || chaining', () => {
    const { sh } = lab();
    assert(run(sh, 'false && echo nope').out === '');
    contains(run(sh, 'false || echo fallback').out, 'fallback');
    assert(run(sh, 'true && echo yes').out.includes('yes'));
  });
  it('aliases work', () => {
    const { sh } = lab();
    run(sh, "alias ll='ls -l'");
    contains(run(sh, 'll').out, 'notes.txt');
  });
});

describe('bash — pipelines and redirection', () => {
  it('pipe to grep', () => contains(run(lab().sh, 'cat notes.txt | grep milk').out, 'remember the milk'));
  it('pipe to wc -l', () => eq(run(lab().sh, 'cat notes.txt | wc -l').out.trim(), '2'));
  it('pipe into a file then read it back', () => {
    const { sh, fs } = lab();
    run(sh, 'cat report.txt | grep login-ok > ok.txt');
    contains(fs.readFile('/home/player/ok.txt'), 'root,login-ok');
  });
  it('three-stage pipeline', () => {
    const r = run(lab().sh, 'cat report.txt | grep login-ok | wc -l');
    eq(r.out.trim(), '2');
  });
  it('head and tail', () => {
    const { sh } = lab();
    contains(run(sh, 'head -n 1 report.txt').out, 'date,host,user,action');
    contains(run(sh, 'tail -n 1 report.txt').out, 'download');
  });
  it('sort | uniq -c ranks results', () => {
    const r = run(lab().sh, 'grep -o "login-[a-z]*" report.txt | sort | uniq -c | sort -rn');
    contains(r.out, 'login-failed');
  });
  it('2>&1 redirects stderr', () => {
    const { sh } = lab();
    const r = run(sh, 'cat ghost.txt 2>&1 | grep -c "No such file"');
    eq(r.out.trim(), '1');
  });
  it('tee writes and prints', () => {
    const { sh, fs } = lab();
    const r = run(sh, 'echo piped | tee out.txt');
    eq(r.out.trim(), 'piped');
    eq(fs.readFile('/home/player/out.txt'), 'piped\n');
  });
});

describe('bash — text processing', () => {
  it('grep -i ignores case', () => contains(run(lab().sh, 'grep -i RAM notes.txt').out, 'buy more RAM'));
  it('grep -v inverts', () => notContains(run(lab().sh, 'grep -v milk notes.txt').out, 'milk'));
  it('grep -n numbers lines', () => contains(run(lab().sh, 'grep -n milk notes.txt').out, '1:remember'));
  it('grep -c counts', () => eq(run(lab().sh, 'grep -c login-ok report.txt').out.trim(), '2'));
  it('grep -r searches directories', () => {
    const { sh } = lab();
    run(sh, 'mkdir -p deep/inner');
    run(sh, 'echo needle > deep/inner/hay.txt');
    contains(run(sh, 'grep -r needle deep').out, 'hay.txt');
  });
  it('sed substitutes text', () => {
    const { sh } = lab();
    contains(run(sh, `echo 'hello world' | sed 's/world/there/'`).out, 'hello there');
  });
  it('sed with the g flag replaces all', () => {
    const { sh } = lab();
    contains(run(sh, `echo 'a a a' | sed 's/a/b/g'`).out, 'b b b');
  });
  it('sed -i edits in place', () => {
    const { sh, fs } = lab();
    run(sh, `sed -i 's/milk/bread/' notes.txt`);
    contains(fs.readFile('/home/player/notes.txt'), 'remember the bread');
    contains(fs.readFile('/home/player/notes.txt'), 'buy more RAM');
  });
  it('cut selects fields', () => {
    const { sh } = lab();
    contains(run(sh, `cut -d, -f3 report.txt`).out, 'admin');
  });
  it('awk prints a column', () => {
    const { sh } = lab();
    contains(run(sh, `awk -F, '{print $2}' report.txt`).out, 'web.zer0day.lab');
  });
  it('awk with a pattern', () => {
    const { sh } = lab();
    contains(run(sh, `awk -F, '/vault/ {print $4}' report.txt`).out, 'download');
  });
  it('sort -n sorts numerically', () => {
    const { sh } = lab();
    run(sh, 'printf "10\\n9\\n100\\n" > nums.txt');
    eq(run(sh, 'sort -n nums.txt').out.trim().split('\n').join(','), '9,10,100');
  });
  it('tr uppercases', () => {
    contains(run(lab().sh, `echo hello | tr a-z A-Z`).out, 'HELLO');
  });
  it('wc counts words', () => {
    const { sh } = lab();
    eq(run(sh, 'echo one two three | wc -w').out.trim(), '3');
  });
  it('xargs pipes arguments', () => {
    const { sh } = lab();
    contains(run(sh, `printf 'a.txt\\nb.txt\\n' | xargs echo`).out, 'a.txt b.txt');
  });
});

describe('bash — find, permissions, processes', () => {
  it('find -name', () => {
    const { sh } = lab();
    run(sh, 'mkdir -p a/b');
    run(sh, 'echo x > a/b/target.log');
    contains(run(sh, 'find . -name "*.log"').out, 'target.log');
  });
  it('find -type d', () => {
    const { sh } = lab();
    run(sh, 'mkdir -p one/two');
    contains(run(sh, 'find . -type d -name two').out, 'two');
  });
  it('chmod 700 + ls -l', () => {
    const { sh } = lab();
    run(sh, 'chmod 700 notes.txt');
    contains(run(sh, 'ls -l notes.txt').out, '-rwx------');
  });
  it('chmod +x makes a script runnable', () => {
    const { sh } = lab();
    const blocked = run(sh, './scripts/backup.sh');
    contains(blocked.err, 'Permission denied');
    run(sh, 'chmod +x scripts/backup.sh');
    const ok = run(sh, './scripts/backup.sh');
    contains(ok.out, 'backup done');
  });
  it('sudo asks for a password then works', () => {
    const { sh } = lab();
    const asked = run(sh, 'sudo cat /etc/passwd');
    assert(asked.err.includes('ASKPWD'), 'should ask for a password');
    sh.pendingPassword = 'toor';
    const ok = run(sh, 'sudo cat /etc/passwd');
    contains(ok.out, 'root:x:0:0');
  });
  it('sudo rejects a wrong password', () => {
    const { sh } = lab();
    sh.pendingPassword = 'wrong';
    const r = run(sh, 'sudo cat /etc/passwd');
    contains(r.err, 'incorrect password');
  });
  it('ps lists processes and kill removes one', () => {
    const { sh, vm } = lab();
    contains(run(sh, 'ps aux').out, 'firefox');
    run(sh, 'kill 1177');
    notContains(run(sh, 'ps aux').out, 'firefox');
    assert(vm.killedPids.includes(1177));
  });
  it('du and df report space', () => {
    contains(run(lab().sh, 'df -h').out, 'Filesystem');
    contains(run(lab().sh, 'du -sh /home/player').out, '/home/player');
  });
  it('tree shows structure', () => contains(run(lab().sh, 'tree').out, 'scripts'));
});

describe('bash — scripting', () => {
  it('for loop one-liner', () => {
    const { sh } = lab();
    eq(run(sh, 'for i in 1 2 3; do echo $i; done').out.trim().split('\n').join(','), '1,2,3');
  });
  it('if/then/else', () => {
    const { sh } = lab();
    eq(run(sh, 'if [ -f notes.txt ]; then echo yes; else echo no; fi').out.trim(), 'yes');
    eq(run(sh, 'if [ -f ghost.txt ]; then echo yes; else echo no; fi').out.trim(), 'no');
  });
  it('while read loops over a file', () => {
    const { sh } = lab();
    run(sh, 'printf "a\\nb\\nc\\n" > three.txt');
    const r = run(sh, 'while read line; do echo "got $line"; done < three.txt');
    contains(r.out, 'got a');
    contains(r.out, 'got c');
  });
  it('runs a shebang script file', () => {
    const { sh } = lab();
    run(sh, 'chmod +x scripts/backup.sh');
    const r = run(sh, './scripts/backup.sh');
    contains(r.out, 'copying notes.txt');
    contains(r.out, 'copying report.txt');
    contains(r.out, 'backup done');
  });
  it('script writes a report file', () => {
    const { sh, fs } = lab();
    run(sh, 'echo "#!/bin/bash" > gen.sh');
    run(sh, 'echo "date > report.md" >> gen.sh');
    run(sh, 'chmod +x gen.sh');
    run(sh, './gen.sh');
    assert(fs.exists('/home/player/report.md'), 'the script should have created report.md');
    assert(/20\d\d/.test(fs.readFile('/home/player/report.md')), 'report.md should contain a date');
  });
  it('test builtin drives && chains', () => {
    const { sh } = lab();
    assert(run(sh, '[ -d scripts ] && echo found').out.includes('found'));
  });
});

describe('bash — hashing, encoding, archives', () => {
  it('md5sum matches the hash of the content', () => {
    const { sh } = lab();
    contains(run(sh, 'echo -n abc | md5sum').out, '900150983cd24fb0d6963f7d28e17f72');
  });
  it('sha256sum', () => {
    const { sh } = lab();
    contains(run(sh, 'echo -n abc | sha256sum').out, 'ba7816bf8f01cfea414140de5dae2223b00361a396177a9cb410ff61f20015ad');
  });
  it('base64 round trip', () => {
    const { sh } = lab();
    const enc = run(sh, `echo -n 'secret' | base64`).out.trim();
    eq(enc, 'c2VjcmV0');
    eq(run(sh, `echo ${enc} | base64 -d`).out, 'secret');
  });
  it('tar creates and extracts an archive', () => {
    const { sh, fs } = lab();
    run(sh, 'tar -cf backup.tar notes.txt report.txt');
    run(sh, 'mkdir restore');
    run(sh, 'tar -xf backup.tar -C restore');
    contains(fs.readFile('/home/player/restore/notes.txt'), 'milk');
  });
  it('xxd shows bytes', () => contains(run(lab().sh, `printf 'AB' | xxd`).out, '41 42'));
});

describe('bash — help and discoverability', () => {
  it('help lists many commands', () => {
    const out = run(lab().sh, 'help').out;
    for (const c of ['ls', 'grep', 'chmod', 'find']) contains(out, c);
  });
  it('man prints a synopsis and options', () => {
    const out = run(lab().sh, 'man ls').out;
    contains(out, 'SYNOPSIS');
    contains(out, '-l');
  });
  it('unknown command returns 127', () => {
    const r = run(lab().sh, 'frobnicate');
    contains(r.err, 'command not found');
    eq(r.code, 127);
  });
  it('every registered command has a description', () => {
    for (const [name, entry] of Object.entries(BASH_COMMANDS)) {
      if (entry.hidden) continue;
      assert(entry.desc && entry.desc.length > 3, `command ${name} has no description`);
    }
  });
});

/* ---------------- Windows ---------------- */

describe('windows — cmd and PowerShell', () => {
  function win() {
    const fs = VFS.fromSpec({
      '/C:/Users/Player/': {},
      '/C:/Users/Player/Documents/': {},
      '/C:/Users/Player/Documents/report.csv': 'name,role\nada,admin\ngrace,user\nalan,user\n',
      '/C:/Users/Player/Documents/readme.txt': 'Welcome to the lab.\nRemember: PowerShell uses cmdlets, cmd uses verbs.\n',
      '/C:/Windows/System32/drivers/etc/hosts': '# hosts file\n127.0.0.1 localhost\n',
      '/C:/Program Files/App/config.json': '{ "debug": true, "port": 8080 }\n',
    });
    const vm = { log: [], flags: new Set(), net: null };
    const sh = new WinShell({ fs, vm, kind: 'powershell', cwd: '/C:/Users/Player' });
    return { fs, sh, vm };
  }

  it('starts in the user profile', () => {
    contains(run(win().sh, 'Get-Location').out, 'C:\\Users\\Player');
  });
  it('Get-ChildItem lists files', () => {
    contains(run(win().sh, 'Get-ChildItem').out, 'Documents');
  });
  it('ls is an alias for Get-ChildItem', () => {
    contains(run(win().sh, 'ls').out, 'Documents');
  });
  it('Get-Content prints a file', () => {
    contains(run(win().sh, 'Get-Content Documents\\readme.txt').out, 'Welcome to the lab');
  });
  it('Set-Content writes a file', () => {
    const { sh, fs } = win();
    run(sh, "Set-Content Documents\\notes.txt 'hello powershell'");
    contains(fs.readFile('/C:/Users/Player/Documents/notes.txt'), 'hello powershell');
  });
  it('pipeline with Select-String', () => {
    contains(run(win().sh, 'Get-Content Documents\\report.csv | Select-String admin').out, 'ada');
  });
  it('Select-Object -First limits output', () => {
    const r = run(win().sh, 'Get-Content Documents\\report.csv | Select-Object -First 1');
    eq(r.out.trim(), 'name,role');
  });
  it('Where-Object filters objects', () => {
    const r = run(win().sh, 'Get-ChildItem Documents | Where-Object { $_.Name -like "*.txt" }');
    contains(r.out, 'readme.txt');
    notContains(r.out, 'report.csv');
  });
  it('ForEach-Object transforms', () => {
    const r = run(win().sh, 'Get-Content Documents\\report.csv | ForEach-Object { $_ -replace ",", ";" }');
    contains(r.out, 'name;role');
  });
  it('Test-Path checks existence', () => {
    eq(run(win().sh, 'Test-Path Documents\\report.csv').out.trim(), 'True');
    eq(run(win().sh, 'Test-Path nope.txt').out.trim(), 'False');
  });
  it('Sort-Object sorts', () => {
    const r = run(win().sh, 'Get-Content Documents\\report.csv | Sort-Object -Descending');
    contains(r.out.split('\n')[0], 'name,role');
  });
  it('New-Item and Remove-Item', () => {
    const { sh, fs } = win();
    run(sh, 'New-Item -ItemType Directory -Path Archive');
    assert(fs.isDir('/C:/Users/Player/Archive'));
    run(sh, 'Remove-Item Archive');
    assert(!fs.exists('/C:/Users/Player/Archive'));
  });
  it('cmd mode: dir, cd, type, cls', () => {
    const fs = VFS.fromSpec({ '/C:/Users/Player/Documents/a.txt': 'hi\n' });
    const sh = new WinShell({ fs, vm: { log: [] }, kind: 'cmd', cwd: '/C:/Users/Player' });
    contains(run(sh, 'dir').out, 'Documents');
    run(sh, 'cd Documents');
    contains(run(sh, 'cd').out, 'Documents');
    contains(run(sh, 'type a.txt').out, 'hi');
    assert(run(sh, 'cls').out.includes('CLEAR'));
  });
  it('cmd mode: copy, move, del', () => {
    const fs = VFS.fromSpec({ '/C:/Users/Player/a.txt': 'data\n' });
    const sh = new WinShell({ fs, vm: { log: [] }, kind: 'cmd', cwd: '/C:/Users/Player' });
    run(sh, 'copy a.txt b.txt');
    assert(fs.exists('/C:/Users/Player/b.txt'));
    run(sh, 'move b.txt c.txt');
    assert(fs.exists('/C:/Users/Player/c.txt') && !fs.exists('/C:/Users/Player/b.txt'));
    run(sh, 'del c.txt');
    assert(!fs.exists('/C:/Users/Player/c.txt'));
  });
  it('ipconfig and systeminfo exist in cmd mode', () => {
    const fs = VFS.fromSpec({ '/C:/Users/Player': {} });
    const sh = new WinShell({ fs, vm: { log: [] }, kind: 'cmd', cwd: '/C:/Users/Player' });
    contains(run(sh, 'ipconfig').out, 'IPv4');
    contains(run(sh, 'systeminfo').out, 'Host Name');
  });
  it('every Windows cmdlet has a description', () => {
    const fs = VFS.fromSpec({ '/C:/Users/Player': {} });
    const sh = new WinShell({ fs, vm: { log: [] }, kind: 'powershell', cwd: '/C:/Users/Player' });
    for (const [name, entry] of Object.entries(sh.registry)) {
      if (entry.hidden) continue;
      assert(entry.desc && entry.desc.length > 3, `cmdlet ${name} has no description`);
    }
  });
});

/* ---------------- network ---------------- */

describe('net.js — the lab network', () => {
  function netLab() {
    const fs = VFS.fromSpec({ '/home/player/': {} });
    const vm = { log: [], sudoPassword: null, credentials: { '10.0.0.5': 'hunter2' } };
    const sh = new BashShell({ fs, vm, cwd: '/home/player' });
    return { sh, vm, fs };
  }

  it('nmap discovers ports', () => {
    const out = run(netLab().sh, 'nmap 10.0.0.5').out;
    contains(out, '22/tcp');
    contains(out, 'open  ssh');
    contains(out, '8080/tcp');
  });
  it('ping replies', () => contains(run(netLab().sh, 'ping -c 2 10.0.0.5').out, '64 bytes from'));
  it('curl fetches a page', () => {
    contains(run(netLab().sh, 'curl web.zer0day.lab').out, 'ZeroDay Coffee');
  });
  it('curl -o saves a file', () => {
    const { sh, fs } = netLab();
    run(sh, 'curl -o page.html web.zer0day.lab');
    contains(fs.readFile('/home/player/page.html'), 'ZeroDay Coffee');
  });
  it('curl -I shows headers only', () => contains(run(netLab().sh, 'curl -I web.zer0day.lab').out, 'HTTP/1.1 200'));
  it('curl reports unresolvable hosts without touching the network', () => {
    const r = run(netLab().sh, 'curl https://example.com');
    contains(r.err, 'Could not resolve host');
    eq(r.code, 6);
  });
  it('wget saves a page', () => {
    const { sh, fs } = netLab();
    run(sh, 'wget web.zer0day.lab/robots.txt');
    contains(fs.readFile('/home/player/robots.txt'), 'Disallow: /admin');
  });
  it('dig answers for a lab host', () => contains(run(netLab().sh, 'dig web.zer0day.lab').out, 'ANSWER SECTION'));
  it('ssh with valid credentials moves you to the remote machine', () => {
    const { sh } = netLab();
    sh.pendingPassword = 'hunter2';
    const r = run(sh, 'ssh developer@10.0.0.5');
    eq(r.err, '');
    contains(run(sh, 'whoami').out, 'developer');
    contains(run(sh, 'cat /etc/hostname').out, 'dev.lab');
  });
  it('ssh with a wrong password is refused', () => {
    const { sh } = netLab();
    sh.pendingPassword = 'nope';
    contains(run(sh, 'ssh developer@10.0.0.5').err, 'Permission denied');
  });
  it('exit logs you back out of a remote host', () => {
    const { sh } = netLab();
    sh.pendingPassword = 'hunter2';
    run(sh, 'ssh developer@10.0.0.5');
    run(sh, 'exit');
    contains(run(sh, 'pwd').out, '/home/player');
  });
});

/* ---------------- mission content ---------------- */

describe('content — missions', () => {
  it('there are enough missions to be a course', () => assert(MISSIONS.length >= 30, 'found ' + MISSIONS.length));

  it('every mission has an id, title, chapter, shell and brief', () => {
    const ids = new Set();
    for (const m of MISSIONS) {
      assert(m.id && typeof m.id === 'string', 'mission missing id');
      assert(!ids.has(m.id), 'duplicate mission id: ' + m.id);
      ids.add(m.id);
      assert(m.title && m.title.length > 3, m.id + ': weak title');
      assert(m.chapter, m.id + ': missing chapter');
      assert(['bash', 'powershell', 'cmd'].includes(m.shell), m.id + ': bad shell ' + m.shell);
      assert(m.brief && m.brief.length > 40, m.id + ': brief too short');
      assert(Array.isArray(m.objectives) && m.objectives.length >= 2, m.id + ': needs at least 2 objectives');
    }
  });

  it('every objective is checkable, has text and a hint', () => {
    for (const m of MISSIONS) {
      for (const o of m.objectives) {
        assert(typeof o.check === 'function', `${m.id}/${o.id}: check is not a function`);
        assert(o.text && o.text.length > 8, `${m.id}/${o.id}: objective text too short`);
        assert(o.hint && o.hint.length > 10, `${m.id}/${o.id}: missing hint`);
        assert(typeof o.xp === 'number' && o.xp > 0, `${m.id}/${o.id}: missing xp`);
      }
    }
  });

  it('mission setup produces a working filesystem', () => {
    for (const m of MISSIONS) {
      const fs = VFS.fromSpec(m.fs || {});
      assert(fs, m.id + ': fs spec failed');
      if (m.cwd && !fs.isDir(m.cwd)) {
        throw new Error(`${m.id}: cwd ${m.cwd} does not exist in its filesystem`);
      }
    }
  });

  it('chapters are ordered and start at 1', () => {
    const chapters = [...new Set(MISSIONS.map((m) => m.chapter))].sort((a, b) => a - b);
    eq(chapters[0], 1);
    for (let i = 1; i < chapters.length; i++) eq(chapters[i], chapters[i - 1] + 1, 'gap before chapter ' + chapters[i]);
  });

  it('missions are sorted by chapter then order', () => {
    for (let i = 1; i < MISSIONS.length; i++) {
      const a = MISSIONS[i - 1];
      const b = MISSIONS[i];
      assert(a.chapter < b.chapter || (a.chapter === b.chapter && (a.order || 0) <= (b.order || 0)),
        `mission order broken at ${b.id}`);
    }
  });
});

/* Run a full scripted playthrough of several missions to prove they are winnable. */
describe('content — every mission is winnable', () => {
  for (const m of MISSIONS) {
    it(`${m.id} — ${m.title}`, () => {
      const fs = VFS.fromSpec(m.fs || {});
      const vm = { log: [], flags: new Set(), killedPids: [], sudoPassword: m.sudoPassword || null, credentials: m.credentials || {}, net: m.net || null, processes: m.processes || null, commands: [] };
      const shellClass = m.shell === 'bash' ? BashShell : WinShell;
      const sh = new shellClass({ fs, vm, kind: m.shell, cwd: m.cwd || (m.shell === 'bash' ? '/home/player' : '/C:/Users/Player') });
      if (m.setup) m.setup(sh, vm);
      play(sh, vm, m.script || []);
      const unfinished = m.objectives.filter((o) => !o.check(vm, sh, fs));
      assert(unfinished.length === 0,
        `unfinished objectives: ${unfinished.map((o) => o.id + ' (' + o.text + ')').join(', ')}`);
    });
  }
});

describe('content — CTF challenges', () => {
  it('each challenge is complete', () => {
    assert(CTF_CHALLENGES.length >= 5);
    for (const c of CTF_CHALLENGES) {
      assert(c.id && c.title && c.difficulty, c.id + ': missing metadata');
      assert(c.brief && c.brief.length > 40, c.id + ': brief too short');
      assert(c.solution && c.solution.length > 5, c.id + ': no solution');
      assert(c.hints && c.hints.length >= 2, c.id + ': needs at least 2 hints');
      if (c.fs) VFS.fromSpec(c.fs);
    }
  });
  it('flags look like flags', () => {
    for (const c of CTF_CHALLENGES) {
      const m = /flag\{[^}]+\}|ZD\{[^}]+\}/.exec(c.solution);
      assert(m, c.id + ': solution is not a flag: ' + c.solution);
    }
  });
});

describe('content — code lab', () => {
  it('has lessons from easy to hard with tests', () => {
    assert(CODE_LESSONS.length >= 10);
    for (const l of CODE_LESSONS) {
      assert(l.id && l.title && l.starter !== undefined, l.id + ': incomplete');
      assert(Array.isArray(l.tests) && l.tests.length >= 2, l.id + ': needs tests');
      for (const t of l.tests) assert(t.name && t.args !== undefined && t.expected !== undefined, l.id + ': bad test');
    }
  });
});

describe('content — achievements', () => {
  it('achievements have ids and descriptions', () => {
    for (const a of ACHIEVEMENTS) {
      assert(a.id && a.title && a.desc, 'bad achievement ' + JSON.stringify(a).slice(0, 60));
      assert(typeof a.check === 'function', a.id + ': check is not a function');
    }
  });
  it('awards achievements when conditions are met', () => {
    const state = { commandsRun: 120, missionsDone: [], commands: ['ls', 'grep', 'chmod'], labsSolved: [], ctfSolved: [], xp: 5000, skills: {} };
    const unlocked = evaluateAchievements(state);
    assert(Array.isArray(unlocked));
    assert(unlocked.length > 0, 'a heavily-played save should unlock achievements');
  });
});

/* ---------------- result ---------------- */

if (typeof require !== 'undefined' && typeof process !== 'undefined' && !process.env.NO_EXIT) {
  const ok = summary();
  if (typeof process.exit === 'function') process.exit(ok ? 0 : 1);
} else {
  summary();
}

export { summary };