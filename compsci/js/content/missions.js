/* =========================================================================
 * content/missions.js — the curriculum.
 *
 * Each mission is a self-contained lab: a filesystem, a brief, objectives
 * that are checked automatically after every command, hints, and a
 * canonical `script` (the reference solution used by the test suite).
 *
 * vm shape shared with the app:
 *   vm.commands  [{ input, out, err, code }]   ← every command the player ran
 *   vm.flags     Set<string>                     ← mission-specific markers
 *   vm.fs        VFS (also passed to checks)
 *   vm.net / vm.credentials / vm.sudoPassword / vm.processes
 * ========================================================================= */

import { VFS } from '../fs.js';
import { md5, sha256 } from '../hash.js';

/* ---------------- check helpers ---------------- */

export const cmd = (vm, re) => vm.commands.some((c) => re.test(c.input));
export const out = (vm, re) => vm.commands.some((c) => re.test(c.out));
export const err = (vm, re) => vm.commands.some((c) => re.test(c.err));
export const count = (vm, re) => vm.commands.filter((c) => re.test(c.input)).length;
export const text = (fs, p) => (fs.exists(p) ? fs.readFile(p) : '');
export const lastOut = (vm, n = 1) => vm.commands.slice(-n).map((c) => c.out + c.err).join('');

/** Run a list of command lines, recording them the same way the app does. */
export function play(sh, vm, lines) {
  for (const line of lines) {
    let r = sh.run(line);
    // the game asks for a password the first time sudo or ssh needs one
    if (typeof r.err === 'string' && r.err.includes('\u0000ASKPWD\u0000') && vm.sudoPassword) {
      sh.pendingPassword = vm.sudoPassword;
      r = sh.run(line);
    }
    vm.commands.push({ input: line, out: r.out || '', err: (r.err || '').replace(/\u0000ASKPWD\u0000/g, ''), code: r.code || 0 });
  }
  return vm;
}

/* =========================================================================
 * CHAPTER 1 — First contact
 * ========================================================================= */

const CH1 = [
  {
    id: 'hello-shell',
    chapter: 1, order: 1,
    title: 'Your First Terminal',
    shell: 'bash', cwd: '/home/player',
    brief: `Welcome aboard. You are logged in as **player** on a Linux machine called \`zer0day-lab\`.
A terminal is just a text window into a computer. Everything — files, programs, servers — is
reachable from here.

Your job: get your bearings, look around, and say hello.`,
    teach: ['A prompt shows where you are and who you are', 'Commands are short names for programs', 'Output scrolls up, your typing is at the bottom'],
    fs: {
      '/home/player/': {},
      '/home/player/welcome.txt': 'Welcome to ZeroDay Lab!\nThis machine belongs to you for training.\nType `help` whenever you feel lost.\n',
      '/home/player/notes/': {},
      '/home/player/notes/todo.txt': 'buy a keyboard\nlearn grep\n',
      '/home/player/photos/': {},
      '/home/player/photos/beach.png': '[fake png bytes]',
    },
    objectives: [
      { id: 'pwd', text: 'Find out where you are with `pwd`', hint: 'The "print working directory" command shows your current folder.', xp: 10, check: (vm) => cmd(vm, /^\s*pwd\b/) },
      { id: 'ls', text: 'List what is here with `ls`', hint: 'ls is short for "list". Try it with no arguments.', xp: 10, check: (vm) => cmd(vm, /^\s*ls(?:\s+-{1,2}[\w-]+)*\s*$/) },
      { id: 'cat', text: 'Read welcome.txt with `cat`', hint: 'cat prints the contents of a file. Try `cat welcome.txt`.', xp: 15, check: (vm) => out(vm, /Welcome to ZeroDay Lab/) },
      { id: 'echo', text: 'Print a message of your own with `echo`', hint: 'echo prints whatever you give it. Try `echo hello world`.', xp: 15, check: (vm) => out(vm, /hello/i) },
    ],
    script: ['pwd', 'ls', 'cat welcome.txt', 'echo hello world'],
  },

  {
    id: 'moving-around',
    chapter: 1, order: 2,
    title: 'Moving Around',
    shell: 'bash', cwd: '/home/player',
    brief: `A filesystem is a tree. \`/\` is the root — everything hangs off it.

Change directory with \`cd\`. A path starting with \`/\` is **absolute** (from the root);
a path without it is **relative** (from wherever you are). \`..\` means "one level up".`,
    teach: ['cd / pwd work as a pair', 'Absolute vs relative paths', '.. and . hidden meaning'],
    fs: {
      '/home/player/': {},
      '/home/player/projects/': {},
      '/home/player/projects/rocket/': {},
      '/home/player/projects/rocket/notes.txt': 'Fuel: 3 tanks\nPayload: 1 probe\n',
      '/etc/': {},
      '/etc/hostname': 'zer0day-lab\n',
      '/var/log/': {},
      '/var/log/messages': 'boot ok\n',
    },
    objectives: [
      { id: 'into-projects', text: 'cd into `projects`', hint: 'cd takes the folder name: `cd projects`.', xp: 10, check: (vm) => out(vm, /\/home\/player\/projects$/) },
      { id: 'into-rocket', text: 'Keep going into `rocket`', hint: 'Try `cd rocket` from inside projects.', xp: 10, check: (vm) => out(vm, /projects\/rocket$/) },
      { id: 'read-notes', text: 'Read notes.txt from here', hint: 'cat notes.txt', xp: 15, check: (vm) => out(vm, /Payload: 1 probe/) },
      { id: 'up', text: 'Climb back up to /home/player', hint: '`cd ../..` climbs two levels at once. Plain `cd ..` twice works too.', xp: 15, check: (vm, sh) => sh.cwd === '/home/player' && cmd(vm, /cd\s+(\.\.|\.\.\/)/) },
      { id: 'absolute', text: 'Use an absolute path to read /etc/hostname', hint: 'Absolute paths start with `/`: `cat /etc/hostname`.', xp: 20, check: (vm) => out(vm, /zer0day-lab/) },
    ],
    script: ['cd projects', 'pwd', 'cd rocket', 'pwd', 'cat notes.txt', 'cd ../..', 'pwd', 'cat /etc/hostname'],
  },

  {
    id: 'making-files',
    chapter: 1, order: 3,
    title: 'Making Files',
    shell: 'bash', cwd: '/home/player',
    brief: `You can create files by typing into the terminal. The character \`>\` sends output
into a file — it **redirects** it. \`>>\` appends instead of overwriting.

Read carefully: \`echo hi > note.txt\` writes the file, while \`echo hi >> note.txt\` adds to it.`,
    teach: ['> overwrites, >> appends', 'touch creates empty files', 'cat + redirection is a classic combo'],
    fs: {
      '/home/player/': {},
      '/home/player/backup/': {},
    },
    objectives: [
      { id: 'mkdir', text: 'Create a directory called `backup`', hint: '`mkdir backup`', xp: 10, check: (vm, sh, fs) => fs.isDir('/home/player/backup') },
      { id: 'write', text: 'Write the text `first line` into backup/day1.txt', hint: 'echo first line > backup/day1.txt', xp: 15, check: (vm, sh, fs) => text(fs, '/home/player/backup/day1.txt').includes('first line') },
      { id: 'append', text: 'Add a second line without losing the first', hint: 'Use >> for appending: echo second line >> backup/day1.txt', xp: 20, check: (vm, sh, fs) => {
        const t = text(fs, '/home/player/backup/day1.txt');
        return t.includes('first line') && t.includes('second line');
      } },
      { id: 'count', text: 'Check the file now has two lines', hint: 'wc -l counts lines. Try: wc -l backup/day1.txt', xp: 15, check: (vm) => cmd(vm, /wc\s+-l/) && out(vm, /^\s*2\b/m) },
    ],
    script: ['mkdir backup', 'echo first line > backup/day1.txt', 'echo second line >> backup/day1.txt', 'wc -l backup/day1.txt'],
  },

  {
    id: 'pipe-basics',
    chapter: 1, order: 4,
    title: 'Pipes: Chaining Commands',
    shell: 'bash', cwd: '/home/player',
    brief: `The \`|\` symbol connects one command's output to the next command's input.
It is called a **pipe**, and it turns five tiny tools into one superpower.

This is how professionals search a whole system for a string.`,
    teach: ['Left side writes, right side reads', 'wc -l counts, grep finds, sort orders'],
    fs: {
      '/home/player/': {},
      '/home/player/missions.log': [
        'INFO  ship ready',
        'ERROR fuel valve stuck',
        'INFO  payload loaded',
        'ERROR fuel valve stuck',
        'WARN  battery low',
        'INFO  launch window open',
      ].join('\n') + '\n',
    },
    objectives: [
      { id: 'count-lines', text: 'Count the lines in missions.log', hint: 'cat missions.log | wc -l', xp: 10, check: (vm) => out(vm, /^\s*6\s*$/m) },
      { id: 'grep-error', text: 'Show only the ERROR lines using a pipe to grep', hint: 'cat missions.log | grep ERROR', xp: 15, check: (vm) => {
        const hits = vm.commands.filter((c) => /grep/i.test(c.input) && c.out.includes('ERROR'));
        return hits.length > 0 && hits.every((c) => !c.out.includes('INFO'));
      } },
      { id: 'chain', text: 'Chain three commands: grep ERROR | wc -l', hint: 'cat missions.log | grep ERROR | wc -l — the answer is 2.', xp: 25, check: (vm) => {
        const entry = vm.commands.find((c) => /\|/.test(c.input) && /grep/i.test(c.input) && /wc/i.test(c.input));
        return entry && entry.out.trim() === '2';
      } },
    ],
    script: ['cat missions.log | wc -l', 'cat missions.log | grep ERROR', 'cat missions.log | grep ERROR | wc -l'],
  },

  /* =========================================================================
   * CHAPTER 2 — Files, folders, permissions
   * ========================================================================= */

  {
    id: 'copy-move-delete',
    chapter: 2, order: 1,
    title: 'Copy, Move, Delete',
    shell: 'bash', cwd: '/home/player',
    brief: `Organising files is most of the work. \`cp\` copies, \`mv\` moves *or renames*, and
\`rm\` deletes — permanently. There is no undo, and there is no recycle bin.

The wildcards \`*\` (anything) and \`?\` (one character) let you act on many files at once.`,
    teach: ['rm is permanent: check with ls before you delete', 'mv doubles as rename', 'Glob patterns: *.txt, log-?.log'],
    fs: {
      '/home/player/': {},
      '/home/player/downloads/': {},
      '/home/player/downloads/report.pdf': '%PDF-1.4 fake',
      '/home/player/downloads/photo.jpg': 'fake jpeg',
      '/home/player/downloads/notes.txt': 'draft one\n',
      '/home/player/archive/': {},
      '/home/player/scratch/': {},
      '/home/player/scratch/tmp1.log': 'noise\n',
      '/home/player/scratch/tmp2.log': 'noise\n',
    },
    objectives: [
      { id: 'cp', text: 'Copy notes.txt from downloads into archive/', hint: 'cp downloads/notes.txt archive/', xp: 15, check: (vm, sh, fs) => text(fs, '/home/player/archive/notes.txt').includes('draft one') || text(fs, '/home/player/archive/final.txt').includes('draft one') },
      { id: 'mv', text: 'Rename archive/notes.txt to archive/final.txt', hint: 'mv archive/notes.txt archive/final.txt', xp: 15, check: (vm, sh, fs) => fs.exists('/home/player/archive/final.txt') && !fs.exists('/home/player/archive/notes.txt') },
      { id: 'wildcard', text: 'Delete both tmp logs using one wildcard command', hint: 'rm scratch/tmp*.log — one command, two files.', xp: 20, check: (vm, sh, fs) => cmd(vm, /rm.*\*.*\.log/) && !fs.exists('/home/player/scratch/tmp1.log') && !fs.exists('/home/player/scratch/tmp2.log') },
      { id: 'check', text: 'Verify the deletion with ls', hint: 'ls scratch should now be empty.', xp: 10, check: (vm) => cmd(vm, /\bls\b.*scratch/) },
    ],
    script: ['cp downloads/notes.txt archive/', 'mv archive/notes.txt archive/final.txt', 'rm scratch/tmp*.log', 'ls scratch'],
  },

  {
    id: 'permissions',
    chapter: 2, order: 2,
    title: 'Permissions: rwx',
    shell: 'bash', cwd: '/home/player',
    brief: `Every file carries permissions. \`ls -l\` shows them like \`-rwxr-xr---\`:
three digits for **owner**, **group**, **everyone else**.

r = read, w = write, x = execute. A script without the x bit simply refuses to run.`,
    teach: ['chmod 755 file is the usual "program" permission', 'chmod +x is the friendly form', 'chmod -R applies to a whole tree'],
    fs: {
      '/home/player/': {},
      '/home/player/deploy.sh': { content: '#!/bin/bash\necho "deploying v1.2.3 to staging"\n', mode: 0o644 },
      '/home/player/secrets.txt': { content: 'api-key: lab-only-not-real\n', mode: 0o600 },
    },
    objectives: [
      { id: 'inspect', text: 'Look at the permissions with `ls -l`', hint: 'ls -l shows the rwx columns.', xp: 10, check: (vm) => cmd(vm, /ls\s+-l/) },
      { id: 'chmod-x', text: 'Give deploy.sh execute permission', hint: 'chmod +x deploy.sh', xp: 20, check: (vm, sh, fs) => (fs.node('/home/player/deploy.sh').mode & 0o111) !== 0 },
      { id: 'run', text: 'Run it with `./deploy.sh`', hint: './ means "in this folder".', xp: 15, check: (vm) => out(vm, /deploying v1\.2\.3/) },
      { id: 'lockdown', text: 'Make secrets.txt readable by nobody but you (chmod 600)', hint: 'chmod 600 secrets.txt', xp: 25, check: (vm, sh, fs) => {
        const m = fs.node('/home/player/secrets.txt').mode;
        return m === 0o600;
      } },
    ],
    script: ['ls -l', 'chmod +x deploy.sh', './deploy.sh', 'chmod 600 secrets.txt', 'ls -l secrets.txt'],
  },

  {
    id: 'users-groups',
    chapter: 2, order: 3,
    title: 'Users, Groups, Ownership',
    shell: 'bash', cwd: '/home/player',
    brief: `Files belong to a user and a group. \`/etc/passwd\` lists the humans;
\`id\` tells you who you are right now.

When a tool says "Permission denied", the first question is always: *do I own this, and does
my group allow it?*`,
    teach: ['id shows uid, gid and groups', 'chown changes the owner', 'sudo is not a magic word, it is a request'],
    fs: {
      '/home/player/': {},
      '/home/player/team-notes.txt': { content: 'standup at 09:00\n', mode: 0o664, owner: 'sam', group: 'engineers' },
      '/etc/passwd': 'root:x:0:0:root:/root:/bin/bash\nsam:x:1001:1001:sam:/home/sam:/bin/bash\nplayer:x:1000:1000:player:/home/player:/bin/bash\n',
      '/etc/group': 'engineers:x:1001:sam,player\nsudo:x:27:player\n',
      '/root/': {},
    },
    objectives: [
      { id: 'id', text: 'Run `id` to see who you are', hint: 'id prints uid, gid and group memberships.', xp: 10, check: (vm) => cmd(vm, /^\s*id\b/) && out(vm, /uid=1000/) },
      { id: 'owner', text: 'See who owns team-notes.txt', hint: 'ls -l team-notes.txt', xp: 15, check: (vm) => out(vm, /sam\s+engineers/) },
      { id: 'chown', text: 'Take ownership of the file with chown', hint: 'Only an administrator can do this — expect it to fail until you use sudo.', xp: 25, check: (vm, sh, fs) => fs.node('/home/player/team-notes.txt').owner === 'player' },
      { id: 'sudo', text: 'Use sudo to make the change succeed', hint: 'sudo chown player team-notes.txt — sudo asks for your password.', xp: 30, check: (vm, sh, fs) => fs.node('/home/player/team-notes.txt').owner === 'player' && cmd(vm, /sudo/) },
    ],
    sudoPassword: 'toor',
    script: ['id', 'ls -l team-notes.txt', 'chown player team-notes.txt', 'ls -l team-notes.txt', 'sudo chown player team-notes.txt', 'ls -l team-notes.txt'],
  },

  {
    id: 'hidden-files',
    chapter: 2, order: 4,
    title: 'Dotfiles and Configuration',
    shell: 'bash', cwd: '/home/player',
    brief: `Files whose names start with a dot are **hidden** — they are configuration, not clutter.
\`ls\` skips them; \`ls -a\` reveals them.

Everything about a shell session is configured by dotfiles in your home directory.`,
    teach: ['.bashrc runs before every command', 'Hidden files are how software remembers you', 'alias makes long commands short'],
    fs: {
      '/home/player/': {},
      '/home/player/.bashrc': 'export EDITOR=nano\nalias ll="ls -la"\n',
      '/home/player/.profile': 'PATH=$PATH:/home/player/bin\n',
      '/home/player/.gitconfig': '[user]\n\tname = Player One\n\temail = player@lab.local\n',
      '/home/player/visible.txt': 'you can see me\n',
    },
    objectives: [
      { id: 'ls-a', text: 'List hidden files with `ls -a`', hint: 'The -a flag means "all".', xp: 10, check: (vm) => cmd(vm, /ls\s+-[al]/) },
      { id: 'read-hidden', text: 'Read .bashrc', hint: 'cat .bashrc — hidden files open normally.', xp: 15, check: (vm) => out(vm, /EDITOR=nano/) },
      { id: 'alias', text: 'Create an alias so `ll` runs `ls -la`', hint: 'alias ll="ls -la" (the .bashrc already suggests it)', xp: 20, check: (vm) => cmd(vm, /alias\s+ll/) },
      { id: 'use-alias', text: 'Run `ll` and see the hidden files', hint: 'Now just type ll.', xp: 20, check: (vm) => cmd(vm, /^\s*ll\b/) },
    ],
    script: ['ls -a', 'cat .bashrc', 'alias ll="ls -la"', 'll'],
  },

  /* =========================================================================
   * CHAPTER 3 — Text power tools
   * ========================================================================= */

  {
    id: 'grep-mastery',
    chapter: 3, order: 1,
    title: 'grep: Search Like a Detective',
    shell: 'bash', cwd: '/home/player',
    brief: `\`grep\` prints the lines that match a pattern. Add \`-i\` to ignore case, \`-n\` for line
numbers, \`-v\` to see what does *not* match, \`-c\` to count, and \`-r\` to search whole folders.

This one command covers most of what sysadmins do all day.`,
    teach: ['grep pattern file', '-i -n -v -c -r -w', 'grep -r . | grep -i password is the classic first move'],
    fs: {
      '/home/player/': {},
      '/home/player/server.log': [
        'INFO  server started on port 8080',
        'WARN  disk usage at 82%',
        'ERROR password rejected for user admin',
        'INFO  nightly backup finished',
        'ERROR password rejected for user root',
        'INFO  health check ok',
      ].join('\n') + '\n',
      '/home/player/logs/': {},
      '/home/player/logs/auth.log': 'Failed password for invalid user admin from 10.0.0.5\nAccepted password for player\n',
      '/home/player/logs/app.log': 'ERROR database timeout\n',
    },
    objectives: [
      { id: 'basic', text: 'Find every ERROR line in server.log', hint: 'grep ERROR server.log', xp: 10, check: (vm) => out(vm, /password rejected/) },
      { id: 'icount', text: 'Count how many errors there are with -c', hint: 'grep -c ERROR server.log — the answer is 2.', xp: 20, check: (vm) => vm.commands.some((c) => /grep\s+-c/.test(c.input) && c.out.trim() === '2') },
      { id: 'invert', text: 'Show only the lines that are NOT errors (-v)', hint: 'grep -v ERROR server.log', xp: 20, check: (vm) => {
        const e = vm.commands.find((c) => /grep\s+-v/.test(c.input));
        return e && e.out.includes('server started') && !e.out.includes('password rejected');
      } },
      { id: 'recursive', text: 'Search the logs folder recursively for the word password', hint: 'grep -r password logs', xp: 30, check: (vm) => vm.commands.some((c) => /grep\s+-[a-z]*r/.test(c.input) && c.out.includes('auth.log')) },
      { id: 'case', text: 'Ignore case when searching for ERROR or error', hint: 'grep -i error server.log', xp: 20, check: (vm) => cmd(vm, /grep\s+-i/) },
    ],
    script: ['grep ERROR server.log', 'grep -c ERROR server.log', 'grep -v ERROR server.log', 'grep -r password logs', 'grep -i error server.log'],
  },

  {
    id: 'sed-and-cut',
    chapter: 3, order: 2,
    title: 'sed and cut: Reshape Text',
    shell: 'bash', cwd: '/home/player',
    brief: `\`sed\` (stream editor) changes text as it flows past: \`sed 's/old/new/g'\`.
\`cut\` pulls columns out of structured lines: \`cut -d, -f2\`.

Together they turn messy logs into exactly the columns you want.`,
    teach: ["sed 's/find/replace/g' file", 'sed -i edits in place (be careful!)', 'cut -d DELIM -f 1,3 picks fields'],
    fs: {
      '/home/player/': {},
      '/home/player/users.csv': 'id,name,role,team\n1,ada,admin,core\n2,grace,user,docs\n3,alan,user,core\n4,katherine,admin,security\n',
      '/home/player/template.txt': 'Server: PROD-01 is down again. Please restart PROD-01 tonight.\n',
    },
    objectives: [
      { id: 'cut-name', text: 'Extract just the names column from users.csv', hint: 'cut -d, -f2 users.csv', xp: 20, check: (vm) => out(vm, /^\s*ada$/m) && out(vm, /^\s*grace$/m) },
      { id: 'cut-two', text: 'Extract the name and role columns together', hint: 'cut -d, -f2,3 users.csv', xp: 25, check: (vm) => out(vm, /ada,admin/) },
      { id: 'sed', text: 'Replace PROD-01 with STAGING-07 in template.txt', hint: "sed 's/PROD-01/STAGING-07/g' template.txt", xp: 25, check: (vm) => {
        const e = vm.commands.find((c) => /sed/.test(c.input) && /STAGING-07/.test(c.input));
        return e && e.out.includes('Server: STAGING-07 is down');
      } },
      { id: 'sed-i', text: 'Apply the same change to the file itself with -i', hint: "sed -i 's/PROD-01/STAGING-07/g' template.txt", xp: 30, check: (vm, sh, fs) => text(fs, '/home/player/template.txt').includes('STAGING-07') },
    ],
    script: ['cut -d, -f2 users.csv', 'cut -d, -f2,3 users.csv', "sed 's/PROD-01/STAGING-07/g' template.txt", "sed -i 's/PROD-01/STAGING-07/g' template.txt", 'cat template.txt'],
  },

  {
    id: 'awk-basics',
    chapter: 3, order: 3,
    title: 'awk: Columns as a Programming Language',
    shell: 'bash', cwd: '/home/player',
    brief: `awk reads a line, splits it into fields ($1, $2, $3 …), and runs a tiny program on each.
The pattern before \`{\` decides which lines to act on.

\`awk -F, '{print $2}' file\` prints field two of every line. That is genuinely most of what
awk is used for.`,
    teach: ['$1 is the first field, $NF the last', '-F changes the field separator', 'awk can also add things up with END'],
    fs: {
      '/home/player/': {},
      '/home/player/sales.csv': 'item,price,qty\nkeyboard,25,4\nmouse,12,10\nmonitor,180,2\nlaptop,900,1\n',
    },
    objectives: [
      { id: 'field', text: 'Print the product names (field 1)', hint: "awk -F, '{print $1}' sales.csv", xp: 20, check: (vm) => out(vm, /^\s*keyboard$/m) },
      { id: 'calc', text: 'Compute the revenue: price × qty for each row', hint: "awk -F, 'NR>1 {print $1, $2*$3}' sales.csv", xp: 30, check: (vm) => vm.commands.some((c) => /awk/.test(c.input) && /keyboard\s+100/.test(c.out)) },
      { id: 'filter', text: 'Only print rows where qty is 10 or more', hint: "awk -F, '$3>=10 {print $1}' sales.csv", xp: 30, check: (vm) => {
        const e = vm.commands.find((c) => /awk/.test(c.input) && /\$3\s*[><=]/.test(c.input));
        return e && e.out.includes('mouse') && !e.out.includes('keyboard');
      } },
      { id: 'total', text: 'Print the total revenue with a single awk command', hint: "awk -F, 'NR>1 {sum += $2*$3} END {print sum}' sales.csv", xp: 35, check: (vm) => vm.commands.some((c) => /awk/.test(c.input) && /END/.test(c.input) && /\b1480\b/.test(c.out)) },
    ],
    script: [
      "awk -F, '{print $1}' sales.csv",
      "awk -F, 'NR>1 {print $1, $2*$3}' sales.csv",
      "awk -F, '$3>=10 {print $1}' sales.csv",
      "awk -F, 'NR>1 {sum += $2*$3} END {print sum}' sales.csv",
    ],
  },

  {
    id: 'sort-uniq-wc',
    chapter: 3, order: 4,
    title: 'sort, uniq, wc, tee',
    shell: 'bash', cwd: '/home/player',
    brief: `The counting trio: \`sort\` orders lines, \`uniq -c\` counts runs of identical lines,
\`wc\` counts lines/words/characters.

Because \`uniq\` only compares *neighbouring* lines, the professional order is always
\`sort\` **then** \`uniq -c\` **then** \`sort -rn\` for a leaderboard.`,
    teach: ['sort -n for numbers, -r to reverse, -u to dedupe', 'uniq -c counts, -d shows only duplicates', 'tee writes to a file and the screen at once'],
    fs: {
      '/home/player/': {},
      '/home/player/visits.txt': ['google.com', 'github.com', 'google.com', 'news.ycombinator.com', 'github.com', 'google.com', 'wikipedia.org'].join('\n') + '\n',
    },
    objectives: [
      { id: 'sorted', text: 'Sort the list of sites alphabetically', hint: 'sort visits.txt', xp: 15, check: (vm) => {
        const e = vm.commands.find((c) => /^\s*sort/.test(c.input));
        return e && e.out.split('\n')[0] === 'github.com';
      } },
      { id: 'leaderboard', text: 'Build a leaderboard of the most visited sites', hint: 'sort visits.txt | uniq -c | sort -rn', xp: 30, check: (vm) => {
        const e = vm.commands.find((c) => /uniq\s+-c/.test(c.input) && /sort\s+-rn/.test(c.input));
        return e && /3 google\.com/.test(e.out);
      } },
      { id: 'uniq-only', text: 'Show only the sites visited more than once', hint: 'sort visits.txt | uniq -c | sort -rn | grep -v " 1 "', xp: 30, check: (vm) => vm.commands.some((c) => c.out.includes('google.com') && !c.out.includes('wikipedia.org') && /uniq|grep -v/.test(c.input)) },
      { id: 'tee', text: 'Save the leaderboard to ranking.txt while still showing it', hint: 'sort visits.txt | uniq -c | sort -rn | tee ranking.txt', xp: 25, check: (vm, sh, fs) => text(fs, '/home/player/ranking.txt').includes('google.com') },
    ],
    script: [
      'sort visits.txt',
      'sort visits.txt | uniq -c | sort -rn',
      'sort visits.txt | uniq -c | sort -rn | grep -v " 1 "',
      'sort visits.txt | uniq -c | sort -rn | tee ranking.txt',
    ],
  },

  {
    id: 'log-triage',
    chapter: 3, order: 5,
    title: 'Mission: Triage the Web Logs',
    shell: 'bash', cwd: '/home/player',
    brief: `Your first real investigation. \`access.log\` holds one line per HTTP request from your
own web server. Something looks wrong.

Answer three questions using pipes only:
1. How many requests came from IP 10.0.0.5?
2. How many of those were 404s?
3. Which path was hammered the most?

This is exactly how a security analyst starts an investigation.`,
    teach: ['Count with wc -l', 'Isolate with grep, then count again', 'awk -F\'"\' pulls the request out of each log line'],
    fs: {
      '/home/player/': {},
      '/home/player/access.log': [
        '10.0.0.1 - - [01/Mar/2026:10:00:01] "GET / HTTP/1.1" 200 512',
        '10.0.0.5 - - [01/Mar/2026:10:00:05] "GET /admin HTTP/1.1" 404 233',
        '10.0.0.5 - - [01/Mar/2026:10:00:06] "GET /admin HTTP/1.1" 404 233',
        '10.0.0.5 - - [01/Mar/2026:10:00:07] "GET /.env HTTP/1.1" 404 233',
        '10.0.0.7 - - [01/Mar/2026:10:00:09] "GET /about HTTP/1.1" 200 733',
        '10.0.0.5 - - [01/Mar/2026:10:01:00] "GET /admin HTTP/1.1" 404 233',
        '10.0.0.9 - - [01/Mar/2026:10:01:12] "GET /api/users HTTP/1.1" 200 1204',
        '10.0.0.5 - - [01/Mar/2026:10:02:30] "GET /login HTTP/1.1" 200 401',
      ].join('\n') + '\n',
    },
    objectives: [
      { id: 'q1', text: 'Count requests from 10.0.0.5 (the answer is 5)', hint: 'grep "10.0.0.5" access.log | wc -l', xp: 20, check: (vm) => vm.commands.some((c) => /10\.0\.0\.5/.test(c.input) && /wc|grep\s+-c/.test(c.input) && /^\s*5\s*$/m.test(c.out)) },
      { id: 'q2', text: 'Count how many of those were 404s (the answer is 4)', hint: 'grep "10.0.0.5" access.log | grep -c " 404 "', xp: 25, check: (vm) => vm.commands.some((c) => /404/.test(c.input) && /^\s*4\s*$/m.test(c.out)) },
      { id: 'q3', text: 'Find the most requested path', hint: 'awk -F\'"\' \'{print $2}\' access.log | awk \'{print $2}\' | sort | uniq -c | sort -rn', xp: 35, check: (vm) => vm.commands.some((c) => /uniq\s+-c/.test(c.input) && /\/admin/.test(c.out)) },
      { id: 'report', text: 'Write your findings into findings.txt with a redirect', hint: 'grep "10.0.0.5" access.log > findings.txt', xp: 20, check: (vm, sh, fs) => text(fs, '/home/player/findings.txt').includes('10.0.0.5') },
    ],
    script: [
      'grep "10.0.0.5" access.log | wc -l',
      'grep "10.0.0.5" access.log | grep -c " 404 "',
      "awk -F'\"' '{print $2}' access.log | awk '{print $2}' | sort | uniq -c | sort -rn",
      'grep "10.0.0.5" access.log > findings.txt',
    ],
  },

  /* =========================================================================
   * CHAPTER 4 — Scripting and automation
   * ========================================================================= */

  {
    id: 'loops-and-vars',
    chapter: 4, order: 1,
    title: 'Loops and Variables',
    shell: 'bash', cwd: '/home/player',
    brief: `A terminal gets you far, but loops make you fast. The \`for\` loop repeats a command for
each item; variables (\`NAME=value\`, \`$NAME\`) remember things between commands.

Everything you can type once, you can automate.`,
    teach: ['NAME=value then $NAME', 'for x in a b c; do ...; done', 'seq generates numbers'],
    fs: { '/home/player/': {}, '/home/player/inventory/': {}, '/home/player/inventory/apple.txt': '3\n', '/home/player/inventory/pear.txt': '7\n' },
    objectives: [
      { id: 'var', text: 'Create a variable called LEVEL and give it a value', hint: 'There is no = spacing needed: type LEVEL=3 on its own line.', xp: 10, check: (vm, sh) => sh.env.LEVEL !== undefined },
      { id: 'echo-var', text: 'Print it back with echo $LEVEL', hint: 'echo $LEVEL', xp: 10, check: (vm) => out(vm, /\b3\b/) },
      { id: 'for', text: 'Loop over the files in inventory/ and echo each name', hint: 'for f in inventory/*.txt; do echo $f; done', xp: 25, check: (vm) => {
        const e = vm.commands.find((c) => /^for /.test(c.input));
        return e && e.out.includes('apple.txt') && e.out.includes('pear.txt');
      } },
      { id: 'seq', text: 'Print the numbers 1 to 5 with a for loop', hint: 'for i in $(seq 1 5); do echo $i; done', xp: 25, check: (vm) => {
        const e = vm.commands.find((c) => /^for /.test(c.input) && /seq/.test(c.input));
        return e && e.out.trim().split(/\s+/).join(',') === '1,2,3,4,5';
      } },
    ],
    script: ['LEVEL=3', 'echo $LEVEL', 'for f in inventory/*.txt; do echo $f; done', 'for i in $(seq 1 5); do echo $i; done'],
  },

  {
    id: 'if-statements',
    chapter: 4, order: 2,
    title: 'Making Decisions with if',
    shell: 'bash', cwd: '/home/player',
    brief: `Programs branch. The \`[ ... ]\` test command answers yes or no, and \`if\` uses the answer.

The classic filesystem test is \`[ -f file ]\` (is it a file?), \`[ -d dir ]\` (is it a folder?),
\`[ -e thing ]\` (does it exist at all?).`,
    teach: ['[ -f x ] file, [ -d x ] directory, [ -e x ] exists', 'Commands return 0 for success — that is what if reads', '&& and || are short ifs'],
    fs: {
      '/home/player/': {},
      '/home/player/app.py': 'print("hello")\n',
      '/home/player/appdir/': {},
      '/home/player/appdir/readme.txt': 'hi\n',
    },
    objectives: [
      { id: 'test-f', text: 'Write an if statement that checks if app.py exists', hint: 'if [ -f app.py ]; then echo found; fi', xp: 20, check: (vm) => vm.commands.some((c) => /if \[/.test(c.input) && /found|exists|yes/i.test(c.out)) },
      { id: 'test-d', text: 'Check that appdir is a directory', hint: 'if [ -d appdir ]; then echo is-a-dir; fi', xp: 20, check: (vm) => vm.commands.some((c) => /if \[/.test(c.input) && /-d/.test(c.input) && /dir/i.test(c.out)) },
      { id: 'else', text: 'Add an else branch that reports when a file is missing', hint: 'if [ -f ghost.txt ]; then echo yes; else echo missing; fi', xp: 25, check: (vm) => vm.commands.some((c) => /else/.test(c.input) && /missing|no\b/i.test(c.out)) },
      { id: 'andor', text: 'Chain a test with && instead of if', hint: '[ -f app.py ] && echo "chain works"', xp: 25, check: (vm) => vm.commands.some((c) => /&&/.test(c.input) && /\[/.test(c.input) && c.out.trim().length > 0) },
    ],
    script: [
      'if [ -f app.py ]; then echo found; fi',
      'if [ -d appdir ]; then echo is-a-dir; fi',
      'if [ -f ghost.txt ]; then echo yes; else echo missing; fi',
      '[ -f app.py ] && echo "chain works"',
    ],
  },

  {
    id: 'first-script',
    chapter: 4, order: 3,
    title: 'Your First Script',
    shell: 'bash', cwd: '/home/player',
    brief: `A **script** is just a file full of commands. The first line \`#!/bin/bash\` tells the
operating system which interpreter to use, and \`chmod +x\` makes it runnable.

Write a script that greps the log for ERROR lines and saves them to a file.`,
    teach: ['#!/bin/bash is the shebang', 'chmod +x then ./script.sh', 'scripts are how work gets automated'],
    fs: {
      '/home/player/': {},
      '/home/player/app.log': 'INFO start\nERROR disk full\nINFO running\nERROR cache miss\n',
    },
    objectives: [
      { id: 'write', text: 'Create a script called errors.sh that writes the ERROR lines to errors.txt', hint: "Write it line by line: echo '#!/bin/bash' > errors.sh, then echo 'grep ERROR app.log > errors.txt' >> errors.sh", xp: 30, check: (vm, sh, fs) => {
        const s = text(fs, '/home/player/errors.sh');
        return s.startsWith('#!') && /grep/.test(s) && /errors\.txt/.test(s);
      } },
      { id: 'shebang', text: 'Give it a bash shebang', hint: '#!/bin/bash must be the very first line.', xp: 15, check: (vm, sh, fs) => text(fs, '/home/player/errors.sh').split('\n')[0].includes('bash') },
      { id: 'chmod', text: 'Make it executable', hint: 'chmod +x errors.sh', xp: 15, check: (vm, sh, fs) => (fs.node('/home/player/errors.sh').mode & 0o111) !== 0 },
      { id: 'run', text: 'Run it with ./errors.sh', hint: './errors.sh', xp: 25, check: (vm, sh, fs) => text(fs, '/home/player/errors.txt').includes('disk full') && cmd(vm, /\.\/errors\.sh/) },
    ],
    script: [
      "echo '#!/bin/bash' > errors.sh",
      "echo 'grep ERROR app.log > errors.txt' >> errors.sh",
      'chmod +x errors.sh',
      './errors.sh',
    ],
  },

  {
    id: 'scheduling',
    chapter: 4, order: 4,
    title: 'Scheduling with cron',
    shell: 'bash', cwd: '/home/player',
    brief: `\`cron\` runs a command on a schedule: every minute, every day at 03:00, every Monday.

The format is \`minute hour day month weekday command\`. Write a backup job that copies the
reports folder to a backup folder at 03:00 every day, then install it with \`crontab\`.`,
    teach: ['crontab -l shows your jobs, crontab FILE installs them', '* * * * * command runs every minute', 'Automation is the difference between a user and an operator'],
    fs: {
      '/home/player/': {},
      '/home/player/reports/': {},
      '/home/player/reports/q1.txt': 'Q1 results\n',
      '/home/player/reports/q2.txt': 'Q2 results\n',
      '/home/player/backup/': {},
    },
    objectives: [
      { id: 'write-cron', text: 'Write a crontab file with a 03:00 daily backup of reports/', hint: "echo '0 3 * * * cp -r /home/player/reports /home/player/backup' > backup.cron", xp: 30, check: (vm, sh, fs) => /^0 3 \* \* \* /m.test(text(fs, '/home/player/backup.cron')) },
      { id: 'install', text: 'Install it with crontab', hint: 'crontab backup.cron', xp: 30, check: (vm, sh) => {
        const vm2 = vm;
        return Array.isArray(vm2.cron) && vm2.cron.some((l) => l.includes('cp'));
      } },
      { id: 'verify', text: 'Verify with crontab -l', hint: 'crontab -l prints the jobs installed right now.', xp: 20, check: (vm) => out(vm, /0 3 \* \* \*/) },
    ],
    script: [
      "echo '0 3 * * * cp -r /home/player/reports /home/player/backup' > backup.cron",
      'crontab backup.cron',
      'crontab -l',
    ],
  },

  /* =========================================================================
   * CHAPTER 5 — Windows and PowerShell
   * ========================================================================= */

  {
    id: 'cmd-basics',
    chapter: 5, order: 1,
    title: 'Windows Command Prompt',
    shell: 'cmd', cwd: '/C:/Users/Player',
    brief: `Windows administrators live in **cmd.exe**. The verbs are the same idea as Linux with
different names: \`dir\` lists, \`cd\` changes, \`type\` prints, \`copy\` copies, \`move\` moves, \`del\` deletes.

Paths use backslashes and a drive letter: \`C:\\Users\\Player\`.`,
    teach: ['dir / cd / type / copy / move / del', 'Backslashes and drive letters', 'cls clears the screen'],
    fs: {
      '/C:/Users/Player/': {},
      '/C:/Users/Player/Documents/': {},
      '/C:/Users/Player/Documents/report.txt': 'Q3 sales are up 12%\nHeadcount unchanged\n',
      '/C:/Users/Player/Documents/notes.txt': 'call the vendor back\n',
      '/C:/Users/Player/Desktop/': {},
    },
    objectives: [
      { id: 'dir', text: 'List the Documents folder with `dir`', hint: 'dir Documents', xp: 15, check: (vm) => out(vm, /report\.txt/) },
      { id: 'cd', text: 'Change into Documents', hint: 'cd Documents', xp: 15, check: (vm) => cmd(vm, /cd\s+Documents/i) },
      { id: 'type', text: 'Print report.txt with `type`', hint: 'type report.txt', xp: 15, check: (vm) => out(vm, /Q3 sales/) },
      { id: 'copy', text: 'Copy report.txt to Desktop', hint: 'cd .. then copy Documents\\report.txt Desktop\\', xp: 25, check: (vm, sh, fs) => fs.exists('/C:/Users/Player/Desktop/report.txt') || cmd(vm, /copy\s+Documents\\report\.txt\s+Desktop/i) },
      { id: 'del', text: 'Delete the copy from Desktop with `del`', hint: 'del Desktop\\report.txt', xp: 20, check: (vm, sh, fs) => !fs.exists('/C:/Users/Player/Desktop/report.txt') },
    ],
    script: ['dir Documents', 'cd Documents', 'type report.txt', 'cd ..', 'copy Documents\\report.txt Desktop\\', 'del Desktop\\report.txt'],
  },

  {
    id: 'powershell-basics',
    chapter: 5, order: 2,
    title: 'PowerShell: Verbs and Nouns',
    shell: 'powershell', cwd: '/C:/Users/Player',
    brief: `PowerShell is more than a rewrite of cmd — it is built around small programs called **cmdlets**
named \`Verb-Noun\`: \`Get-ChildItem\`, \`Get-Content\`, \`Set-Content\`, \`Remove-Item\`.

Most have short aliases (\`ls\`, \`cat\`, \`cp\`, \`rm\`), so your muscle memory from Linux still works.`,
    teach: ['Get-* reads, Set-* writes, New-* creates, Remove-* deletes', 'Aliases: ls, cat, cp, mv, rm, gci, sls', '-Path and -Destination are parameters'],
    fs: {
      '/C:/Users/Player/': {},
      '/C:/Users/Player/Documents/': {},
      '/C:/Users/Player/Documents/inventory.csv': 'item,count\nbolts,120\nnuts,340\nwashers,88\n',
      '/C:/Users/Player/Documents/readme.txt': 'Welcome to the ZeroDay lab.\n',
    },
    objectives: [
      { id: 'gci', text: 'List the Documents folder with Get-ChildItem', hint: 'Get-ChildItem Documents  (or its alias: ls Documents)', xp: 15, check: (vm) => out(vm, /inventory\.csv/) },
      { id: 'gc', text: 'Read readme.txt with Get-Content', hint: 'Get-Content Documents\\readme.txt', xp: 15, check: (vm) => out(vm, /Welcome to the ZeroDay lab/) },
      { id: 'ni', text: 'Create a folder called Archive', hint: 'New-Item -ItemType Directory -Path Archive', xp: 20, check: (vm, sh, fs) => fs.isDir('/C:/Users/Player/Archive') },
      { id: 'sc', text: 'Write a file with Set-Content', hint: "Set-Content -Path Archive\\summary.txt -Value 'done'", xp: 25, check: (vm, sh, fs) => text(fs, '/C:/Users/Player/Archive/summary.txt').includes('done') },
      { id: 'tp', text: 'Verify it exists with Test-Path', hint: 'Test-Path Archive\\summary.txt  → True', xp: 20, check: (vm) => out(vm, /True/) },
    ],
    script: [
      'Get-ChildItem Documents',
      'Get-Content Documents\\readme.txt',
      'New-Item -ItemType Directory -Path Archive',
      "Set-Content -Path Archive\\summary.txt -Value 'done'",
      'Test-Path Archive\\summary.txt',
    ],
  },

  {
    id: 'powershell-pipeline',
    chapter: 5, order: 3,
    title: 'The PowerShell Pipeline',
    shell: 'powershell', cwd: '/C:/Users/Player',
    brief: `Here is the big idea: PowerShell pipes **objects**, not text. \`Get-ChildItem\` produces
file objects with Name, Length and LastWriteTime, and \`Where-Object\` filters them by those
fields. No parsing, no column numbers.

\`Get-ChildItem Documents | Where-Object { $_.Length -gt 20 }\``,
    teach: ['$_ is the current item', 'Where-Object filters, ForEach-Object transforms', 'Select-Object picks properties and counts'],
    fs: {
      '/C:/Users/Player/': {},
      '/C:/Users/Player/Documents/': {},
      '/C:/Users/Player/Documents/quarterly.txt': 'quarter,revenue\nQ1,120000\nQ2,150000\nQ3,90000\nQ4,210000\n',
      '/C:/Users/Player/Documents/tiny.txt': 'x\n',
      '/C:/Users/Player/Documents/medium.txt': 'this file is definitely longer than twenty characters in total\n',
    },
    objectives: [
      { id: 'where', text: 'Filter files larger than 20 bytes', hint: 'Get-ChildItem Documents | Where-Object { $_.Length -gt 20 }', xp: 25, check: (vm) => {
        const e = vm.commands.find((c) => /Where-Object/.test(c.input));
        return e && e.out.includes('quarterly.txt') && !e.out.includes('tiny.txt');
      } },
      { id: 'names', text: 'Get only the names with -Name', hint: 'Get-ChildItem Documents -Name', xp: 20, check: (vm) => out(vm, /^\s*tiny\.txt\s*$/m) },
      { id: 'sls', text: 'Find the line containing Q3 with Select-String', hint: 'Get-Content Documents\\quarterly.txt | Select-String Q3', xp: 25, check: (vm) => out(vm, /Q3,90000/) },
      { id: 'transform', text: 'Replace commas with semicolons using ForEach-Object', hint: 'Get-Content Documents\\quarterly.txt | ForEach-Object { $_ -replace ",", ";" }', xp: 30, check: (vm) => out(vm, /quarter;revenue/) },
    ],
    script: [
      'Get-ChildItem Documents | Where-Object { $_.Length -gt 20 }',
      'Get-ChildItem Documents -Name',
      'Get-Content Documents\\quarterly.txt | Select-String Q3',
      'Get-Content Documents\\quarterly.txt | ForEach-Object { $_ -replace ",", ";" }',
    ],
  },

  {
    id: 'windows-triage',
    chapter: 5, order: 4,
    title: 'Mission: Triage a Windows Workstation',
    shell: 'powershell', cwd: '/C:/Users/Player',
    brief: `Security incident on a Windows box. Use \`ipconfig\` to find its address,
\`Get-Process\` to see what is running, and the log file to count failed logins.

Quietly note how the answers are the same as in Linux — different verbs, same ideas.`,
    teach: ['ipconfig / Get-NetIPConfiguration for addressing', 'Get-Process is ps', 'Grep-equivalents are Where-Object and Select-String'],
    fs: {
      '/C:/Users/Player/': {},
      '/C:/Users/Player/Documents/': {},
      '/C:/Users/Player/Documents/auth-events.txt': [
        '2026-03-01 09:14 login FAILED user=admin ip=10.0.0.5',
        '2026-03-01 09:15 login FAILED user=admin ip=10.0.0.5',
        '2026-03-01 09:16 login FAILED user=admin ip=10.0.0.5',
        '2026-03-01 09:20 login SUCCESS user=player',
        '2026-03-01 10:02 login SUCCESS user=player',
        '2026-03-01 10:40 login SUCCESS user=player',
      ].join('\n') + '\n',
    },
    objectives: [
      { id: 'ip', text: "Find the machine's IPv4 address", hint: 'ipconfig /all shows every adapter and its addresses.', xp: 15, check: (vm) => out(vm, /10\.0\.0\.77/) },
      { id: 'procs', text: 'List the running processes', hint: 'Get-Process (alias: ps)', xp: 15, check: (vm) => out(vm, /ProcessName/) },
      { id: 'failed', text: 'Count the FAILED logins (the answer is 3)', hint: 'Select-String FAILED Documents\\auth-events.txt | Measure-Object -Line', xp: 30, check: (vm) => vm.commands.some((c) => /FAILED/.test(c.input) && /Count\s*:\s*3|\b3\b/.test(c.out)) },
      { id: 'ip2', text: 'Confirm the attacker IP is 10.0.0.5', hint: 'Select-String "ip=10.0.0.5" Documents\\auth-events.txt', xp: 25, check: (vm) => vm.commands.some((c) => /10\.0\.0\.5/.test(c.input) && c.out.includes('FAILED')) },
    ],
    script: [
      'ipconfig',
      'Get-Process',
      'Select-String FAILED Documents\\auth-events.txt | Measure-Object -Line',
      'Select-String "ip=10.0.0.5" Documents\\auth-events.txt',
    ],
  },

  /* =========================================================================
   * CHAPTER 6 — Networking
   * ========================================================================= */

  {
    id: 'net-basics',
    chapter: 6, order: 1,
    title: 'IP, Ports, Ping',
    shell: 'bash', cwd: '/home/player',
    brief: `Every computer has an address (IP) and runs doors called **ports**. 22 is SSH, 80 is HTTP,
443 is HTTPS. \`ping\` checks whether a machine answers; \`ifconfig\` (or \`ip addr\`) shows your
own addresses.

You will only ever scan machines that belong to this lab — always.`,
    teach: ['An IP address is a street address; a port is a door number', 'ping uses ICMP echo', 'Never scan machines you do not own or have permission to test'],
    fs: {
      '/home/player/': {},
      '/home/player/net-notes.txt': 'lab machines: 10.0.0.1 gateway, 10.0.0.5 dev, 10.0.0.9 vault\n',
    },
    net: {
      hosts: {
        '10.0.0.1': { name: 'gateway.lab', os: 'Linux 6.1', ports: { 22: { service: 'ssh', version: 'OpenSSH 9.2p1' } } },
        '10.0.0.5': { name: 'dev.lab', os: 'Linux 5.15', ports: { 22: { service: 'ssh', version: 'OpenSSH 8.9p1' }, 80: { service: 'http', version: 'nginx 1.18.0' } } },
        '10.0.0.9': { name: 'vault.lab', os: 'Debian 12', ports: { 22: { service: 'ssh', version: 'OpenSSH 9.6p1' }, 443: { service: 'https', version: 'nginx 1.22.1' } } },
      },
    },
    objectives: [
      { id: 'ifconfig', text: "Look at your own interfaces with ifconfig", hint: 'ifconfig  (or: ip addr)', xp: 15, check: (vm) => out(vm, /10\.0\.0\.50/) },
      { id: 'ping-gw', text: 'Ping the gateway at 10.0.0.1', hint: 'ping -c 2 10.0.0.1', xp: 20, check: (vm) => out(vm, /64 bytes from 10\.0\.0\.1/) },
      { id: 'ping-dev', text: 'Ping the dev machine at 10.0.0.5', hint: 'ping -c 1 10.0.0.5', xp: 20, check: (vm) => out(vm, /icmp_seq=1/) },
    ],
    script: ['ifconfig', 'ping -c 2 10.0.0.1', 'ping -c 1 10.0.0.5'],
  },

  {
    id: 'nmap-recon',
    chapter: 6, order: 2,
    title: 'Recon with nmap',
    shell: 'bash', cwd: '/home/player',
    brief: `Before you touch a service, you map it. \`nmap\` asks every port "are you open?" and
reports what answered.

**Rule zero of this chapter:** you may only scan machines in *your* lab, or machines where you
have written permission. Unauthorised scanning is illegal in most countries.`,
    teach: ['nmap target lists open ports', 'Service versions help you find outdated software', 'Authorisation first, always'],
    fs: {
      '/home/player/': {},
      '/home/player/authorisation.txt': 'Authorisation form #LAB-2217 signed 2026-02-28. Scope: 10.0.0.0/24, all ports.\n',
    },
    net: {
      hosts: {
        '10.0.0.5': { name: 'dev.lab', os: 'Linux 5.15', ports: { 22: { service: 'ssh', version: 'OpenSSH 8.9p1' }, 80: { service: 'http', version: 'nginx 1.18.0' }, 8080: { service: 'http-proxy', version: 'Jenkins 2.346' } } },
        '10.0.0.9': { name: 'vault.lab', os: 'Debian 12', ports: { 22: { service: 'ssh', version: 'OpenSSH 9.6p1' }, 443: { service: 'https', version: 'nginx 1.22.1' } } },
      },
    },
    objectives: [
      { id: 'read-auth', text: 'Read the authorisation note before you scan', hint: 'cat authorisation.txt — professionals check the paperwork first.', xp: 10, check: (vm) => out(vm, /Authorisation form/) },
      { id: 'scan', text: 'Scan the dev machine', hint: 'nmap 10.0.0.5', xp: 25, check: (vm) => out(vm, /22\/tcp\s+open/) && out(vm, /8080\/tcp\s+open/) },
      { id: 'vault', text: 'Scan the vault machine too', hint: 'nmap 10.0.0.9', xp: 25, check: (vm) => out(vm, /443\/tcp\s+open/) },
      { id: 'note', text: 'Save the scan of the vault to scan.txt', hint: 'nmap -oN scan.txt 10.0.0.9', xp: 25, check: (vm, sh, fs) => text(fs, '/home/player/scan.txt').includes('443/tcp') },
    ],
    script: ['cat authorisation.txt', 'nmap 10.0.0.5', 'nmap 10.0.0.9', 'nmap -oN scan.txt 10.0.0.9'],
  },

  {
    id: 'http-basics',
    chapter: 6, order: 3,
    title: 'Talking HTTP with curl',
    shell: 'bash', cwd: '/home/player',
    brief: `The web is just text over HTTP. \`curl\` sends a request, the server answers with
**status code** and **headers**, then a body.

200 means fine, 301 means moved, 403 means "not for you", 404 means "not there", 500 means the
server broke.`,
    teach: ['curl URL prints the body', 'curl -I shows headers only', 'HTTP status codes and what they mean'],
    fs: {
      '/home/player/': {},
      '/home/player/inbox/': {},
      '/home/player/inbox/invite.txt': 'Hi! Join our study group.\n',
    },
    net: {
      hosts: {
        'web.zer0day.lab': {
          name: 'web.zer0day.lab', ip: '10.0.0.20', os: 'Ubuntu 22.04',
          ports: { 80: { service: 'http', version: 'Apache 2.4.57' }, 443: { service: 'https', version: 'Apache 2.4.57' } },
          http: {
            '/': { status: 200, body: '<h1>ZeroDay Coffee</h1><p>We roast in small batches.</p>\n' },
            '/robots.txt': { status: 200, body: 'User-agent: *\nDisallow: /admin\nDisallow: /backup/\n' },
            '/admin': { status: 403, body: '<html><body><h1>403 Forbidden</h1></body></html>\n' },
          },
        },
      },
    },
    objectives: [
      { id: 'get', text: 'Fetch the homepage of web.zer0day.lab', hint: 'curl web.zer0day.lab', xp: 15, check: (vm) => out(vm, /ZeroDay Coffee/) },
      { id: 'headers', text: 'Look at the HTTP headers', hint: 'curl -I web.zer0day.lab', xp: 20, check: (vm) => out(vm, /HTTP\/1\.1 200/) },
      { id: 'save', text: 'Download the page into a file with -o', hint: 'curl -o home.html web.zer0day.lab', xp: 20, check: (vm, sh, fs) => text(fs, '/home/player/home.html').includes('ZeroDay Coffee') },
      { id: '404', text: 'Request a page that does not exist and see the 404', hint: 'curl -I web.zer0day.lab/secret-page', xp: 25, check: (vm) => out(vm, /404/) },
      { id: 'robots', text: 'Read robots.txt — sites often advertise their private paths there', hint: 'curl web.zer0day.lab/robots.txt', xp: 20, check: (vm) => out(vm, /Disallow: \/admin/) },
    ],
    script: [
      'curl web.zer0day.lab',
      'curl -I web.zer0day.lab',
      'curl -o home.html web.zer0day.lab',
      'curl -I web.zer0day.lab/secret-page',
      'curl web.zer0day.lab/robots.txt',
    ],
  },

  {
    id: 'dns-basics',
    chapter: 6, order: 4,
    title: 'Names and Numbers with DNS',
    shell: 'bash', cwd: '/home/player',
    brief: `Humans use names, machines use numbers. DNS translates between them.
\`dig\` asks a DNS server for the address behind a name.

DNS records have types: A (address), CNAME (alias), MX (mail server), TXT (notes).`,
    teach: ['dig name → look up the A record', 'CNAME points one name at another', 'A leaked TXT record is a classic finding'],
    fs: {
      '/home/player/': {},
      '/home/player/hosts-note.txt': 'lab DNS: web.zer0day.lab = 10.0.0.20, vault.lab = 10.0.0.9\n',
    },
    net: {
      hosts: {
        'web.zer0day.lab': { name: 'web.zer0day.lab', ip: '10.0.0.20', os: 'Ubuntu 22.04', ports: { 80: { service: 'http', version: 'nginx' } }, http: { '/': { body: 'ok\n' } } },
        'mail.zer0day.lab': { name: 'mail.zer0day.lab', ip: '10.0.0.30', os: 'Debian', ports: { 25: { service: 'smtp', version: 'Postfix' }, 143: { service: 'imap', version: 'Dovecot' } } },
      },
    },
    objectives: [
      { id: 'dig-web', text: 'Look up web.zer0day.lab with dig', hint: 'dig web.zer0day.lab', xp: 15, check: (vm) => out(vm, /ANSWER SECTION/) && out(vm, /10\.0\.0\.20/) },
      { id: 'dig-mail', text: 'Look up the mail server', hint: 'dig mail.zer0day.lab', xp: 20, check: (vm) => out(vm, /10\.0\.0\.30/) },
      { id: 'nxdomain', text: 'Look up a name that does not exist', hint: 'dig not-a-real-host.zer0day.lab  → NXDOMAIN is a good sign', xp: 20, check: (vm) => out(vm, /NXDOMAIN/) },
      { id: 'traceroute', text: 'See the network path to the web server', hint: 'traceroute web.zer0day.lab', xp: 25, check: (vm) => out(vm, /traceroute to web\.zer0day\.lab/) },
    ],
    script: ['dig web.zer0day.lab', 'dig mail.zer0day.lab', 'dig not-a-real-host.zer0day.lab', 'traceroute web.zer0day.lab'],
  },

  /* =========================================================================
   * CHAPTER 7 — Security fundamentals (authorised only)
   * ========================================================================= */

  {
    id: 'hashing-basics',
    chapter: 7, order: 1,
    title: 'Hashing: Passwords and Integrity',
    shell: 'bash', cwd: '/home/player',
    brief: `A hash turns any input into a fixed-length fingerprint. Change one letter and the whole
hash changes. You cannot "undo" a hash — that property is what makes them useful.

md5sum, sha256sum and openssl dgst all compute them. Short hashes like MD5 are broken for
security and are used here only for compatibility checks.`,
    teach: ['Same input → same hash, always', 'MD5/SHA1 are outdated for security, SHA-256 is the modern minimum', 'Real password storage uses slow algorithms (bcrypt, argon2)'],
    fs: {
      '/home/player/': {},
      '/home/player/hashes.txt': 'md5 of "apple": 1f3870be274f6c49b3e31a0c6728957f\n',
      '/home/player/words.txt': 'apple\nbanana\ncherry\n',
    },
    objectives: [
      { id: 'sha256', text: 'Compute the SHA-256 of apple', hint: 'echo -n apple | sha256sum', xp: 20, check: (vm) => out(vm, /1d6f3bf0f9b0b41f1f1e1cbb1f7a3b2d4a8e6cba7d3f2b1a0c9d8e7f6a5b4c3d2|.{64}/) },
      { id: 'md5', text: 'Compute its MD5 and check it against hashes.txt', hint: 'echo -n apple | md5sum', xp: 25, check: (vm) => out(vm, /1f3870be274f6c49b3e31a0c6728957f/) },
      { id: 'sensitivity', text: 'Prove that one extra letter changes everything', hint: "echo -n apple | md5sum   then   echo -n apple! | md5sum", xp: 25, check: (vm) => {
        const hashes = vm.commands.filter((c) => /md5sum/.test(c.input)).map((c) => c.out.trim()).filter(Boolean);
        return new Set(hashes).size >= 2;
      } },
      { id: 'filehash', text: 'Hash a real file in the filesystem', hint: 'sha256sum words.txt', xp: 20, check: (vm) => out(vm, /^[a-f0-9]{64}\s+words\.txt$/m) },
    ],
    script: [
      'echo -n apple | sha256sum',
      'echo -n apple | md5sum',
      'echo -n apple! | md5sum',
      'sha256sum words.txt',
    ],
  },

  {
    id: 'weak-password-audit',
    chapter: 7, order: 2,
    title: 'Auditing Weak Passwords (Your Own Lab)',
    shell: 'bash', cwd: '/home/player',
    brief: `You are the administrator of your own training machine. There is a password list from a
practice CTF challenge, and a hashes file from your own machine.

Your job: recover which weak passwords the hashes hide, then look at what is left over — the
hashes that did **not** match anything in the list. Those are the strong ones. This is defensive
work — you are auditing your own systems.`,
    teach: ['Cracking is just computing hashes fast and comparing', 'Real defences: length, MFA, lockouts, rate limiting', 'You only ever test accounts you administer'],
    fs: {
      '/home/player/': {},
      '/home/player/rockyou-lite.txt': ['123456', 'password', 'letmein', 'qwerty', 'monkey', 'dragon', 'iloveyou', 'trustno1'].join('\n') + '\n',
      '/home/player/hashes.txt': [
        '1f3870be274f6c49b3e31a0c6728957f  alice2019',
        '5f4dcc3b5aa765d61d8327deb882cf99  password',
        'f25a2fc72690b780b2a14e140ef6a9e0  iloveyou',
        '21232f297a57a5a743894a0e4a801fc3  admin',
        'd8578edf8458ce06fbc5bb76a58c5ca4  qwerty',
      ].join('\n') + '\n',
    },
    objectives: [
      { id: 'identify', text: 'Identify the plaintext of at least three hashes', hint: "Compute md5 of each word: for w in $(cat rockyou-lite.txt); do echo -n $w | md5sum | cut -c1-32; done — or do them one at a time", xp: 35, check: (vm) => {
        const cracked = new Set();
        for (const c of vm.commands) {
          const m = /echo\s+(?:-\S+\s+)?['"]?([A-Za-z0-9!@#$%^&*]+)['"]?\s*\|\s*md5sum/.exec(c.input);
          if (!m) continue;
          const word = m[1];
          if (md5(word) === c.out.trim().split(/\s+/)[0]) cracked.add(word);
        }
        return cracked.size >= 3;
      } },
      { id: 'compare', text: 'Show which hashes are NOT in the word list', hint: 'for w in $(cat rockyou-lite.txt); do echo -n $w | md5sum; done computes every candidate hash — compare them against hashes.txt to see which entries nothing matched', xp: 30, check: (vm) => {
        const e = vm.commands.find((c) => /rockyou/.test(c.input) && (/\|\s*md5sum/.test(c.input) || /md5sum\s+rockyou/.test(c.input) || /for\s+\w+\s+in/.test(c.input)));
        return !!e;
      } },
      { id: 'report', text: 'Save the recovered passwords into cracked.txt', hint: 'echo "password" >> cracked.txt', xp: 25, check: (vm, sh, fs) => {
        const t = text(fs, '/home/player/cracked.txt');
        return ['password', 'iloveyou', 'qwerty'].some((w) => t.includes(w));
      } },
    ],
    script: [
      'echo -n password | md5sum',
      'echo -n iloveyou | md5sum',
      'echo -n qwerty | md5sum',
      'md5sum rockyou-lite.txt',
      'echo password >> cracked.txt',
      'echo iloveyou >> cracked.txt',
      'echo qwerty >> cracked.txt',
    ],
  },

  {
    id: 'brute-force-analysis',
    chapter: 7, order: 3,
    title: 'Spotting a Brute Force in Logs',
    shell: 'bash', cwd: '/home/player',
    brief: `An alarm went off: something is guessing passwords. The evidence is in \`auth.log\`.

Count the failed logins, find the offending IP, and write up what happened. This is the kind
of analysis that stops attacks before they succeed.`,
    teach: ['Failed password entries come in bursts', 'Group by IP to find the pattern', 'Write findings in plain language for non-technical people'],
    fs: {
      '/home/player/': {},
      '/home/player/auth.log': [
        'Mar  1 09:00:01 zer0day-lab sshd[1201]: Accepted publickey for player from 10.0.0.50 port 52122 ssh2',
        'Mar  1 09:14:02 zer0day-lab sshd[1301]: Failed password for invalid user admin from 10.0.0.5 port 40001 ssh2',
        'Mar  1 09:14:05 zer0day-lab sshd[1302]: Failed password for invalid user admin from 10.0.0.5 port 40002 ssh2',
        'Mar  1 09:14:09 zer0day-lab sshd[1303]: Failed password for invalid user admin from 10.0.0.5 port 40003 ssh2',
        'Mar  1 09:14:12 zer0day-lab sshd[1304]: Failed password for invalid user admin from 10.0.0.5 port 40004 ssh2',
        'Mar  1 09:14:15 zer0day-lab sshd[1305]: Failed password for invalid user admin from 10.0.0.5 port 40005 ssh2',
        'Mar  1 09:14:18 zer0day-lab sshd[1306]: Failed password for invalid user admin from 10.0.0.5 port 40006 ssh2',
        'Mar  1 09:14:44 zer0day-lab sshd[1307]: Accepted password for player from 10.0.0.5 port 40090 ssh2',
      ].join('\n') + '\n',
    },
    objectives: [
      { id: 'count-failed', text: 'Count the failed logins (there are 6)', hint: 'grep -c "Failed password" auth.log', xp: 20, check: (vm) => vm.commands.some((c) => /Failed password/.test(c.input) && /^\s*6\s*$/m.test(c.out)) },
      { id: 'find-ip', text: 'Confirm the source IP is 10.0.0.5', hint: 'grep "Failed password" auth.log | grep -o "10.0.0.5"', xp: 25, check: (vm) => vm.commands.some((c) => /10\.0\.0\.5/.test(c.input) && c.out.includes('10.0.0.5')) },
      { id: 'success', text: 'Spot the successful login right afterwards', hint: 'grep Accepted auth.log', xp: 20, check: (vm) => out(vm, /Accepted password/) },
      { id: 'write-report', text: 'Write incident.txt describing the attack', hint: 'echo "Brute force from 10.0.0.5: 6 failed logins then success" > incident.txt', xp: 30, check: (vm, sh, fs) => {
        const t = text(fs, '/home/player/incident.txt');
        return /10\.0\.0\.5/.test(t) && /6/.test(t);
      } },
    ],
    script: [
      'grep -c "Failed password" auth.log',
      'grep "Failed password" auth.log | grep -o "10.0.0.5"',
      'grep Accepted auth.log',
      'echo "Brute force attack from 10.0.0.5: 6 failed logins, then a successful login at 09:14:44" > incident.txt',
    ],
  },

  {
    id: 'web-ctf',
    chapter: 7, order: 4,
    title: 'CTF: The Coffee Shop',
    shell: 'bash', cwd: '/home/player',
    brief: `A Capture The Flag challenge on a website **you built in this lab**. There is a flag
hidden somewhere. Recon first, then fetch.

Everything here is legal because the target is yours: it is a machine inside this training
world, running a simulated web server.`,
    teach: ['Recon: robots.txt, debug pages, HTML comments', 'HTTP headers leak information', 'Read the source — flags often hide in plain sight'],
    fs: {
      '/home/player/': {},
      '/home/player/case-notes.txt': 'Target: web.zer0day.lab (lab asset #12). Started a simulated web server for this exercise.\n',
    },
    net: {
      hosts: {
        'web.zer0day.lab': {
          name: 'web.zer0day.lab', ip: '10.0.0.20', os: 'Ubuntu 22.04',
          ports: { 80: { service: 'http', version: 'nginx 1.22.1' }, 8080: { service: 'http-proxy', version: 'Apache 2.4.57' } },
          http: {
            '/': { status: 200, body: '<html><head><title>ZeroDay Coffee</title></head><body>\n<h1>ZeroDay Coffee</h1>\n<!-- TODO: remove staging page before launch -->\n<a href="/debug">debug</a>\n</body></html>\n' },
            '/robots.txt': { status: 200, body: 'User-agent: *\nDisallow: /debug\nDisallow: /secret/\n' },
            '/debug': { status: 200, body: 'debug mode: ON\nadmin panel: /secret/admin\nbackup location: /secret/backup.zip\nnotes: internal only\n' },
            '/secret/': { status: 403, body: '403 Forbidden\n' },
            '/secret/admin': { status: 200, body: '<html><body><h1>Admin</h1><!-- build 2026.03.14-a7f3 -->\n<p>Flag: flag{y0u_f0und_th3_r0bots}</p></body></html>\n' },
          },
        },
      },
    },
    objectives: [
      { id: 'start', text: 'Visit the homepage', hint: 'curl web.zer0day.lab', xp: 10, check: (vm) => out(vm, /ZeroDay Coffee/) },
      { id: 'robots', text: 'Read robots.txt and follow the leads', hint: 'curl web.zer0day.lab/robots.txt', xp: 25, check: (vm) => out(vm, /Disallow/) },
      { id: 'debug', text: 'Check the debug page it revealed', hint: 'curl web.zer0day.lab/debug', xp: 25, check: (vm) => out(vm, /\/secret\/admin/) },
      { id: 'flag', text: 'Retrieve the flag from the admin page', hint: 'curl web.zer0day.lab/secret/admin', xp: 40, check: (vm) => out(vm, /flag\{y0u_f0und_th3_r0bots\}/) },
    ],
    script: [
      'curl web.zer0day.lab',
      'curl web.zer0day.lab/robots.txt',
      'curl web.zer0day.lab/debug',
      'curl web.zer0day.lab/secret/admin',
    ],
  },

  {
    id: 'authorized-access',
    chapter: 7, order: 5,
    title: 'Logging In Legitimately (Authorised)',
    shell: 'bash', cwd: '/home/player',
    brief: `Now you log in to the dev machine — a machine in your lab that you have written
permission to test. Its old admin left a password behind in a config file.

Find the credentials, then log in with ssh. This is **authorised access testing**, the
everyday job of a security engineer.`,
    teach: ['Credentials hide in config files, scripts and history', 'ssh user@host — always your own machine', 'If you are not sure you have permission, stop and ask'],
    fs: {
      '/home/player/': {},
      '/home/player/scope.txt': 'Written authorisation: signed by lab owner, ticket OPS-4471, target dev.lab (10.0.0.5), window 2026-03-01 to 2026-03-31.\n',
    },
    credentials: { '10.0.0.5': 'hunter2' },
    net: {
      hosts: {
        '10.0.0.5': {
          name: 'dev.lab', ip: '10.0.0.5', os: 'Linux 5.15',
          ports: { 22: { service: 'ssh', version: 'OpenSSH 8.9p1' }, 80: { service: 'http', version: 'nginx 1.18.0' }, 8080: { service: 'http-proxy', version: 'Jenkins 2.346' } },
          users: { developer: 'hunter2' },
          home: '/home/developer',
          http: {
            '/status': { status: 200, body: 'OK — deploy by ci\n' },
            '/debug': { status: 200, body: 'debug endpoint enabled for 10.0.0.0/24\n' },
            '/debug/notes.txt': { status: 200, body: 'Sprint 14 retro notes\n\nRemember to rotate the staging credentials:\n  user: developer\n  pass: hunter2\n' },
          },
          fs: {
            '/etc/hostname': 'dev.lab\n',
            '/etc/passwd': 'root:x:0:0:root:/root:/bin/bash\ndeveloper:x:1000:1000:developer:/home/developer:/bin/bash\n',
            '/etc/nginx/sites-enabled/default.conf': [
              '# staging web server — change before go-live',
              'server {',
              '    listen 80;',
              '    server_name web.zer0day.lab;',
              '    # TODO: remove the debug location, it leaks the admin path',
              '    location /debug { alias /var/www/debug; allow 127.0.0.1; allow 10.0.0.0/24; }',
              '}',
            ].join('\n') + '\n',
            '/var/www/debug/notes.txt': [
              'Sprint 14 retro notes',
              '',
              'Remember to rotate the staging credentials:',
              '  user: developer',
              '  pass: hunter2',
              '',
              '(Yes, it is a weak password. That is the point of the exercise.)',
            ].join('\n') + '\n',
            '/home/developer/': {},
            '/home/developer/todo.txt': '- [x] rotate staging creds\n- [ ] actually rotate staging creds\n',
          },
        },
      },
    },
    objectives: [
      { id: 'scope', text: 'Confirm the written authorisation first', hint: 'cat scope.txt', xp: 15, check: (vm) => out(vm, /OPS-4471/) },
      { id: 'find-pass', text: 'Find the developer password on the target', hint: "curl http://10.0.0.5/debug/notes.txt — the nginx config shows a /debug location.", xp: 30, check: (vm) => out(vm, /hunter2/) },
      { id: 'ssh', text: 'Log in with ssh developer@10.0.0.5', hint: "sshpass -p hunter2 ssh developer@10.0.0.5 — or set your password when prompted.", xp: 30, check: (vm) => cmd(vm, /ssh\s+developer@10\.0\.0\.5/) },
      { id: 'hostname', text: 'Confirm you are really on the other machine', hint: 'cat /etc/hostname  →  dev.lab', xp: 20, check: (vm) => out(vm, /dev\.lab/) },
      { id: 'logout', text: 'Log back out', hint: 'Type exit — the ssh session closes and you land back on your own machine.', xp: 5, check: (vm) => vm.commands.filter((c) => /^\s*exit\s*$/.test(c.input)).length >= 1 },
    ],
    script: [
      'cat scope.txt',
      'curl http://10.0.0.5/debug/notes.txt',
      'sshpass -p hunter2 ssh developer@10.0.0.5',
      'cat /etc/hostname',
      'exit',
    ],
  },

  {
    id: 'privilege-escalation',
    chapter: 7, order: 6,
    title: 'Privilege Escalation on Your Own Box',
    shell: 'bash', cwd: '/home/player',
    brief: `You are a normal user on your own machine. A backup job runs as root, and its config
file is world-readable — and has the password in it.

Escalate to root and read the protected file. Everything here happens on a machine that
belongs to you.`,
    teach: ['sudo runs a single command as root', 'Passwords in config files are a classic finding', 'Least privilege: do not run as root all day'],
    fs: {
      '/home/player/': {},
      '/etc/': {},
      '/etc/shadow': 'root:$6$labsalt$9f2b8c1a4d7e0b3f5a6c8d9e0f1a2b3c4:19000:0:99999:7:::\nplayer:$6$labsalt$11223344556677889900112233445566:19000:0:99999:7:::\n',
      '/etc/backup-agent.conf': [
        '# backup-agent configuration',
        'user=root',
        'password=toor',
        'source=/home/player',
        'dest=/var/backups',
      ].join('\n') + '\n',
      '/var/backups/': {},
      '/var/backups/flag.txt': { content: 'flag{pr1v1l3g3_3sc4l4t10n_done}\n', mode: 0o600, owner: 'root' },
    },
    sudoPassword: 'toor',
    objectives: [
      { id: 'find', text: 'Read the backup agent configuration', hint: 'cat /etc/backup-agent.conf', xp: 20, check: (vm) => out(vm, /password=toor/) },
      { id: 'denied', text: 'Try to read the protected file as a normal user (it should fail)', hint: 'cat /var/backups/flag.txt  →  Permission denied', xp: 20, check: (vm) => err(vm, /Permission denied/) },
      { id: 'sudo-cat', text: 'Read it again with sudo', hint: 'sudo cat /var/backups/flag.txt — enter the password toor when asked.', xp: 35, check: (vm) => out(vm, /flag\{pr1v1l3g3_3sc4l4t10n_done\}/) },
      { id: 'id-root', text: 'Check your identity before and after with id', hint: 'sudo id  →  uid=0(root)', xp: 25, check: (vm) => out(vm, /uid=0\(root\)/) },
    ],
    script: [
      'cat /etc/backup-agent.conf',
      'cat /var/backups/flag.txt',
      'sudo cat /var/backups/flag.txt',
      'sudo id',
    ],
  },

  {
    id: 'responsible-disclosure',
    chapter: 7, order: 7,
    title: 'Responsible Disclosure: Write the Report',
    shell: 'bash', cwd: '/home/player',
    brief: `Finding a vulnerability is only half the job. The professional half is telling the
right people clearly, without causing harm.

Write a short, calm report: what you found, how you verified it **only on the authorised
system**, the impact, and a suggested fix. No exploitation of real systems. No showing off.`,
    teach: ['Good reports: summary, steps, impact, fix', 'Never test beyond the agreed scope', 'Report privately and give the owner time to fix it'],
    fs: {
      '/home/player/': {},
      '/home/player/findings/': {},
      '/home/player/findings/web-debug-leak.md': '# Finding: debug endpoint exposed\n\nEndpoint /debug on web.zer0day.lab returns internal configuration to any client.\nImpact: information disclosure (internal paths, service versions).\nFix: delete the location block or restrict it to 127.0.0.1.\n',
      '/home/player/disclosure-policy.txt': 'Report to: security@lab.local. Give the owner 30 days before disclosure. Never test systems you do not own.\n',
    },
    objectives: [
      { id: 'policy', text: 'Read the disclosure policy', hint: 'cat disclosure-policy.txt', xp: 15, check: (vm) => out(vm, /security@lab\.local/) },
      { id: 'template', text: 'Read the example report to learn the structure', hint: 'cat findings/web-debug-leak.md', xp: 20, check: (vm) => out(vm, /Impact:/) },
      { id: 'write', text: 'Write your own report as findings/new-finding.md', hint: 'Use echo with > to create the file — include a Summary, Steps, Impact and Fix line.', xp: 45, check: (vm, sh, fs) => {
        const t = text(fs, '/home/player/findings/new-finding.md').toLowerCase();
        return t.includes('summary') && t.includes('impact') && t.includes('fix') && t.length > 80;
      } },
      { id: 'respect', text: 'Include a line confirming you stayed inside the authorised scope', hint: 'echo "Scope: tested only on lab-owned systems, with written authorisation." >> findings/new-finding.md', xp: 20, check: (vm, sh, fs) => /scope|authoris|authoriz/i.test(text(fs, '/home/player/findings/new-finding.md')) },
    ],
    script: [
      'cat disclosure-policy.txt',
      'cat findings/web-debug-leak.md',
      'echo "# Summary: staging credentials exposed in a world-readable config" > findings/new-finding.md',
      'echo "Steps: cat /etc/backup-agent.conf as a normal user" >> findings/new-finding.md',
      'echo "Impact: full account takeover of the backup agent" >> findings/new-finding.md',
      'echo "Fix: chmod 600 the file and rotate the password" >> findings/new-finding.md',
      'echo "Scope: tested only on lab-owned systems, with written authorisation." >> findings/new-finding.md',
    ],
  },

  /* =========================================================================
   * CHAPTER 8 — Computer science foundations
   * ========================================================================= */

  {
    id: 'bits-and-bases',
    chapter: 8, order: 1,
    title: 'Bits, Bytes and Number Bases',
    shell: 'bash', cwd: '/home/player',
    brief: `Computers store everything as **bits** (0 or 1). Numbers can be written in decimal
(base 10), hex (base 16) or binary (base 2). A byte is 8 bits, 256 possible values.

Networking, memory addresses and hashes are all easier to read in hex.`,
    teach: ['1 byte = 8 bits = 256 values', '0x is hex, 0b is binary, 0 is octal', 'Convert with printf, or $((BASE#digits)) for any base'],
    fs: {
      '/home/player/': {},
      '/home/player/math.txt': '255 = 0xff = 11111111b\n1024 = 0x400 = 10000000000b\n',
    },
    objectives: [
      { id: 'hex', text: 'Print 255 in hexadecimal', hint: "printf '%x\\n' 255  →  ff", xp: 20, check: (vm) => cmd(vm, /printf\s+.?%x/) && out(vm, /\bff\b/i) },
      { id: 'binary', text: 'Decode the binary number 101 into decimal', hint: 'bash can read numbers in any base: $((2#101)) means "digits 101 in base 2" — so this prints 5', xp: 20, check: (vm) => cmd(vm, /2#101/) && out(vm, /\b5\b/) },
      { id: 'verify', text: 'Check that 0xff really is 255', hint: "printf '%d\\n' 0xff", xp: 25, check: (vm) => out(vm, /^\s*255\s*$/m) },
      { id: 'arith', text: 'Do some shell arithmetic', hint: 'echo $((17 * 3 + 2))', xp: 20, check: (vm) => out(vm, /\b53\b/) },
      { id: 'hexdump', text: 'Hex dump a file to see raw bytes', hint: "printf 'AZ' | xxd", xp: 15, check: (vm) => out(vm, /41 5a/) },
    ],
    script: [
      "printf '%x\\n' 255",
      'echo $((2#101))',
      "printf '%d\\n' 0xff",
      'echo $((17 * 3 + 2))',
      "printf 'AZ' | xxd",
    ],
  },

  {
    id: 'algorithms-basics',
    chapter: 8, order: 2,
    title: 'How Computer Science Thinks',
    shell: 'bash', cwd: '/home/player',
    brief: `An algorithm is a recipe. Two things matter: **correctness** (does it work?) and
**complexity** (how does the work grow as the input grows?).

Sort 40 numbers with the same tool the operating system uses, then feel the difference between
\`grep\` looking at every line and \`grep\` stopping early.`,
    teach: ['O(n) vs O(n log n): search vs sort', 'Pipes let you choose the algorithm', 'Measure before you optimise'],
    fs: {
      '/home/player/': {},
      '/home/player/numbers.txt': Array.from({ length: 40 }, (_, i) => (i * 37) % 40).join('\n') + '\n',
    },
    objectives: [
      { id: 'sort', text: 'Sort numbers.txt numerically', hint: 'sort -n numbers.txt', xp: 15, check: (vm) => {
        const e = vm.commands.find((c) => /sort\s+-n/.test(c.input));
        if (!e) return false;
        const nums = e.out.trim().split(/\s+/).map(Number);
        return nums.length > 5 && nums.every((n, i) => i === 0 || n >= nums[i - 1]);
      } },
      { id: 'biggest', text: 'Find the biggest number', hint: 'sort -n numbers.txt | tail -1', xp: 20, check: (vm) => vm.commands.some((c) => /tail/.test(c.input) && /sort/.test(c.input)) },
      { id: 'unique', text: 'Count how many distinct values there are', hint: 'sort -n numbers.txt | uniq | wc -l', xp: 25, check: (vm) => vm.commands.some((c) => /uniq/.test(c.input) && /\b40\b/.test(c.out)) },
      { id: 'reflect', text: 'Echo a sentence describing what O(n) means', hint: 'echo "O(n) means the work grows in direct proportion to the input size"', xp: 20, check: (vm) => out(vm, /O\(n\)/i) },
    ],
    script: [
      'sort -n numbers.txt',
      'sort -n numbers.txt | tail -n 1',
      'sort -n numbers.txt | uniq | wc -l',
      'echo "O(n) means the work grows in direct proportion to the input size"',
    ],
  },

  /* =========================================================================
   * CHAPTER 9 — Capstone
   * ========================================================================= */

  {
    id: 'capstone-incident',
    chapter: 9, order: 1,
    title: 'Capstone: Full Incident Response',
    shell: 'bash', cwd: '/home/player',
    brief: `One machine, one story, every skill.

A coffee shop's site was defaced overnight. You have the web logs, the firewall log and SSH
logs from machines you own. Do the whole job: triage → scope → root cause → fix → report.

Nothing here is graded on typing speed. Take your time, use hints, and remember what every
step is really asking.`,
    teach: ['Triage before you dive in', 'Correlate logs by time and IP', 'Fix, then write it up for people who were not there'],
    fs: {
      '/home/player/': {},
      '/home/player/case/': {},
      '/home/player/case/access.log': [
        '10.0.0.20 - - [02/Mar/2026:02:11:03] "GET / HTTP/1.1" 200 512',
        '10.0.0.20 - - [02/Mar/2026:02:11:45] "GET /about HTTP/1.1" 200 733',
        '10.0.0.31 - - [02/Mar/2026:03:02:10] "GET /.env HTTP/1.1" 404 233',
        '10.0.0.31 - - [02/Mar/2026:03:02:14] "GET /.git/config HTTP/1.1" 404 233',
        '10.0.0.31 - - [02/Mar/2026:03:02:18] "GET /admin HTTP/1.1" 200 900',
        '10.0.0.31 - - [02/Mar/2026:03:03:51] "POST /admin/login HTTP/1.1" 302 0',
        '10.0.0.31 - - [02/Mar/2026:03:04:02] "GET /admin HTTP/1.1" 200 880',
        '10.0.0.31 - - [02/Mar/2026:03:04:40] "PUT /admin/index.html HTTP/1.1" 201 0',
      ].join('\n') + '\n',
      '/home/player/case/auth.log': [
        'Mar  2 03:03:44 zer0day-web sshd[2210]: Accepted password for deploy from 10.0.0.31 port 51044 ssh2',
        'Mar  2 03:04:55 zer0day-web sshd[2211]: Accepted publickey for ops from 10.0.0.50 port 51050 ssh2',
      ].join('\n') + '\n',
      '/home/player/case/notes.txt': 'Owner: ZeroDay Coffee (lab asset). Authorisation: ticket INC-8891, full access granted.\n',
    },
    sudoPassword: 'toor',
    objectives: [
      { id: 'scope', text: 'Confirm the authorisation for this incident', hint: 'cat case/notes.txt', xp: 10, check: (vm) => out(vm, /INC-8891/) },
      { id: 'ip', text: 'Find the attacker IP in the web log (10.0.0.31)', hint: 'grep 10.0.0.31 case/access.log | head', xp: 20, check: (vm) => out(vm, /10\.0\.0\.31/) },
      { id: 'probing', text: 'Show the probe attempts (.env and .git)', hint: 'grep -E "\\.env|\\.git" case/access.log', xp: 25, check: (vm) => out(vm, /\.env/) && out(vm, /\.git/) },
      { id: 'timeline', text: 'Build a timeline file with the attacker activity', hint: 'grep 10.0.0.31 case/access.log > case/attacker.log', xp: 25, check: (vm, sh, fs) => text(fs, '/home/player/case/attacker.log').includes('10.0.0.31') },
      { id: 'ssh', text: 'Correlate with the SSH log — who logged in?', hint: 'grep 10.0.0.31 case/auth.log', xp: 25, check: (vm) => out(vm, /deploy/) },
      { id: 'change', text: 'Identify the malicious change', hint: 'grep PUT case/access.log', xp: 20, check: (vm) => out(vm, /PUT \/admin\/index\.html/) },
      { id: 'report', text: 'Write case/report.md with the timeline and a fix', hint: 'echo ... > case/report.md — mention block 10.0.0.31, rotate credentials, block /.env', xp: 45, check: (vm, sh, fs) => {
        const t = text(fs, '/home/player/case/report.md');
        return t.length > 60 && /10\.0\.0\.31/.test(t) && /fix|mitigat|block|rotat/i.test(t);
      } },
    ],
    script: [
      'cat case/notes.txt',
      'grep 10.0.0.31 case/access.log | head -n 8',
      'grep -E "\\.env|\\.git" case/access.log',
      'grep 10.0.0.31 case/access.log > case/attacker.log',
      'grep 10.0.0.31 case/auth.log',
      'grep PUT case/access.log',
      'echo "# Incident INC-8891: web defacement" > case/report.md',
      'echo "Attacker 10.0.0.31 probed /.env and /.git, logged in as deploy, then rewrote /admin/index.html at 03:04:40." >> case/report.md',
      'echo "Fix: block 10.0.0.31, rotate the deploy credentials, disable directory listing of dotfiles, add file integrity monitoring." >> case/report.md',
    ],
  },
];

/* ========================================================================= */

export const MISSIONS = [...CH1].sort((a, b) => a.chapter - b.chapter || a.order - b.order);

export const CHAPTERS = [
  { id: 1, title: 'First Contact', blurb: 'Meet the terminal: pwd, ls, cd, cat, pipes.', icon: '>_' },
  { id: 2, title: 'Files & Permissions', blurb: 'Organise, protect and inspect who owns what.', icon: 'F' },
  { id: 3, title: 'Text Power Tools', blurb: 'grep, sed, awk, sort — the professional toolkit.', icon: 'T' },
  { id: 4, title: 'Scripting & Automation', blurb: 'Loops, conditions, scripts and cron.', icon: 'S' },
  { id: 5, title: 'Windows & PowerShell', blurb: 'cmd.exe and the PowerShell object pipeline.', icon: 'W' },
  { id: 6, title: 'Networking', blurb: 'IPs, ports, nmap, curl and DNS — authorised only.', icon: 'N' },
  { id: 7, title: 'Security Fundamentals', blurb: 'Hashing, log analysis, CTF, disclosure — ethics first.', icon: 'K' },
  { id: 8, title: 'CS Foundations', blurb: 'Bits, bases and how algorithms work.', icon: 'A' },
  { id: 9, title: 'Capstone', blurb: 'Put every skill into one real investigation.', icon: 'C' },
];