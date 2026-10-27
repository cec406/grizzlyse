/* =========================================================================
 * content/ctf.js — standalone capture-the-flag challenges.
 *
 * Every target is a machine inside this simulation. Nothing here points at
 * anything real, and each challenge states the authorisation that makes the
 * exercise legal.
 * ========================================================================= */

export const CTF_CHALLENGES = [
  {
    id: 'web-basics',
    title: 'Coffee Shop Recon',
    difficulty: 'Easy',
    points: 100,
    category: 'Web',
    brief: `**Authorised target:** web.zer0day.lab (simulated lab asset #12).

Some sites tell you more than they mean to. Find the flag hidden in plain sight on a site you
own in this lab.`,
    hints: [
      'Start at the homepage: `curl web.zer0day.lab`',
      'HTML comments are invisible in a browser but obvious in the source: `<!-- ... -->`',
      'Try `curl -i web.zer0day.lab` to see headers as well as the body',
    ],
    solution: 'flag{c0mm3nt5_4r3_v1s1bl3}',
    shell: 'bash',
    fs: { '/home/player/': {}, '/home/player/scope.txt': 'Target web.zer0day.lab — lab asset, authorised for this exercise.\n' },
    net: {
      hosts: {
        'web.zer0day.lab': {
          name: 'web.zer0day.lab', ip: '10.0.0.20', os: 'Ubuntu 22.04',
          ports: { 80: { service: 'http', version: 'nginx 1.22.1' } },
          http: {
            '/': { status: 200, body: '<html><head><title>ZeroDay Coffee</title></head><body>\n<h1>ZeroDay Coffee</h1>\n<p>Best beans in the lab.</p>\n<!-- flag{c0mm3nt5_4r3_v1s1bl3} -->\n</body></html>\n' },
          },
        },
      },
    },
  },

  {
    id: 'hash-hunter',
    title: 'Hash Hunter',
    difficulty: 'Easy',
    points: 120,
    category: 'Crypto',
    brief: `**Authorised target:** your own lab machine's password file.

A backup of the password hashes was left in the wrong place. You have a small wordlist from a
CTF challenge. Recover as many plaintext passwords as you can.

Remember: this is your machine, and this is the job.`,
    hints: [
      'A hash is a one-way fingerprint — you match by computing, not reversing',
      'md5sum takes input from a pipe: `echo -n word | md5sum`',
      'Compare the first column of hashes.txt with the hashes of words in wordlist.txt',
    ],
    solution: 'flag{h4sh_cr4ck3d_but_l3g4l}',
    shell: 'bash',
    fs: {
      '/home/player/': {},
      '/home/player/wordlist.txt': 'password\nletmein\ndragon\nmonkey\nfootball\nshadow\nsunshine\n',
      '/home/player/hashes.txt': [
        '5f4dcc3b5aa765d61d8327deb882cf99  user1',
        '0d107d09f5bbe40cade3de5c71e9e9b7  user2',
        '56c5f555b27978391ee26e2fb95c2482  user3 (not in the wordlist)',
      ].join('\n') + '\n',
    },
  },

  {
    id: 'log-detective',
    title: 'Log Detective',
    difficulty: 'Medium',
    points: 180,
    category: 'Forensics',
    brief: `**Authorised target:** web server logs from a machine you own.

Something happened at 03:12. Find what, using only grep, sort, uniq and awk.`,
    hints: [
      'Isolate the time window first: grep "03:1" access.log',
      'Then find what looks different — status codes, paths, IPs',
      'One request carries a long encoded string. Forensic teams decode base64 all the time: `echo <string> | base64 -d`',
    ],
    solution: 'flag{l0g_4n4lys1s_ftw}',
    shell: 'bash',
    fs: {
      '/home/player/': {},
      '/home/player/access.log': [
        '203.0.113.9 - - [02/Mar/2026:03:11:02] "GET / HTTP/1.1" 200 512',
        '203.0.113.9 - - [02/Mar/2026:03:11:44] "GET /api/data HTTP/1.1" 200 2048',
        '203.0.113.9 - - [02/Mar/2026:03:12:10] "GET /api/../../etc/passwd HTTP/1.1" 400 0',
        '203.0.113.9 - - [02/Mar/2026:03:12:30] "GET /api/..%2f..%2fetc%2fpasswd HTTP/1.1" 200 1800',
        '198.51.100.77 - - [02/Mar/2026:03:12:55] "GET /upload?exfil=ZmxhZ3tsMGdfNG40bHlzMXNfZnR3fQ==" 200 96',
        '10.0.0.50 - - [02/Mar/2026:03:13:01] "GET / HTTP/1.1" 200 512',
      ].join('\n') + '\n',
    },
  },

  {
    id: 'password-strength',
    title: 'The Password That Broke In',
    difficulty: 'Medium',
    points: 200,
    category: 'Crypto',
    brief: `**Authorised target:** your own lab machine's SSH service.

Find the flag by auditing the password policy. There is a user account called "intern" and a
policy file somewhere on the filesystem.`,
    hints: [
      'find /etc -name "*policy*" is faster than searching everywhere',
      'cat the policy and see which rule the intern password breaks. The .bash_history is a confession.',
      'Hash the password with md5sum to confirm it matches the stored hash, then log in over ssh — the flag is in the intern home directory',
    ],
    solution: 'flag{p0l1cy_g4t3d_by_m1nd}',
    shell: 'bash',
    fs: {
      '/home/player/': {},
      '/etc/': {},
      '/etc/security/password-policy.conf': [
        '# Minimum length: 12 characters',
        '# Must not contain the username',
        '# Must not appear in the breach wordlist',
        '# Rotation: not required',
      ].join('\n') + '\n',
      '/home/intern/': {},
      '/home/intern/.bash_history': 'ssh -p 22 intern@web\n# note to self: stop using my username + year',
      '/etc/shadow': 'intern:58db1244628e62ba466faea772eb8d95:19000:0:99999:7:::\n',
    },
    net: {
      hosts: {
        'web.zer0day.lab': {
          name: 'web.zer0day.lab', ip: '10.0.0.20', os: 'Ubuntu', ports: { 22: { service: 'ssh', version: 'OpenSSH 9.2' } }, users: { intern: 'intern2026' }, home: '/home/intern',
          fs: {
            '/etc/hostname': 'web.zer0day.lab\n',
            '/home/intern/': {},
            '/home/intern/policy-violation.txt': 'To whoever audits me: I know intern2026 breaks every rule in the policy.\nThe boss says the flag proves the point:\nflag{p0l1cy_g4t3d_by_m1nd}\n',
          },
          http: {},
        },
      },
    },
  },

  {
    id: 'network-lateral',
    title: 'One Hop Too Far',
    difficulty: 'Hard',
    points: 300,
    category: 'Network',
    brief: `**Authorised target:** the whole 10.0.0.0/24 lab subnet (authorisation #LAB-2217).

Machine A is compromised. Find the path to the database machine, and read the flag from it.
Everything in this subnet belongs to the lab.`,
    hints: [
      'Start on the machine you already have access to: `nmap -sn 10.0.0.0/24` style thinking — here, try nmap 10.0.0.9',
      'Ports tell you what is running. 3306 is MySQL, 5432 is PostgreSQL.',
      'Config files on the first machine often hold the credentials for the next hop',
    ],
    solution: 'flag{1_h0p_b3tw33n_1_h0p}',
    shell: 'bash',
    credentials: { '10.0.0.5': 'hunter2', '10.0.0.9': 'dbpass2026' },
    fs: {
      '/home/player/': {},
      '/home/player/scope.txt': 'Authorisation #LAB-2217 covers 10.0.0.0/24 for the duration of this exercise.\n',
    },
    net: {
      hosts: {
        '10.0.0.5': {
          name: 'dev.lab', ip: '10.0.0.5', os: 'Linux 5.15',
          ports: { 22: { service: 'ssh', version: 'OpenSSH 8.9p1' }, 3306: { service: 'mysql', version: 'MySQL 8.0' } },
          users: { developer: 'hunter2' }, home: '/home/developer',
          fs: {
            '/etc/hostname': 'dev.lab\n',
            '/home/developer/deploy.conf': '# db connection for staging\nDB_HOST=10.0.0.9\nDB_USER=backup\nDB_PASS=dbpass2026\n',
            '/home/developer/': {},
          },
        },
        '10.0.0.9': {
          name: 'db.lab', ip: '10.0.0.9', os: 'Debian 12',
          ports: { 22: { service: 'ssh', version: 'OpenSSH 9.6' }, 5432: { service: 'postgresql', version: 'PostgreSQL 15' } },
          users: { backup: 'dbpass2026' }, home: '/home/backup',
          fs: {
            '/etc/hostname': 'db.lab\n',
            '/var/lib/postgresql/flag.txt': 'flag{1_h0p_b3tw33n_1_h0p}\n',
            '/home/backup/': {},
          },
        },
      },
    },
  },

  {
    id: 'script-kiddie',
    title: 'Automation Wins',
    difficulty: 'Hard',
    points: 250,
    category: 'Automation',
    brief: `**Authorised target:** your own lab machine.

A pentest is 95% repetitive work. Write a shell script that collects the findings from several
machines into one report, and let it run.`,
    hints: [
      'A for loop over machine names with ssh inside is the whole idea',
      'Remember: sshpass -p for non-interactive ssh, and ./script.sh to run it',
      'Redirect the output into report.txt. The flag is sitting in /home/backup/flag.txt on db.lab — collect it like everything else',
    ],
    solution: 'flag{4ut0m4t10n_1s_4_sk1ll}',
    shell: 'bash',
    fs: {
      '/home/player/': {},
      '/home/player/machines.txt': '10.0.0.5\n10.0.0.9\n',
    },
    credentials: { '10.0.0.5': 'hunter2', '10.0.0.9': 'dbpass2026' },
    net: {
      hosts: {
        '10.0.0.5': { name: 'dev.lab', ip: '10.0.0.5', os: 'Linux', ports: { 22: { service: 'ssh', version: 'OpenSSH 8.9p1' } }, users: { developer: 'hunter2' }, home: '/home/developer', fs: { '/etc/hostname': 'dev.lab\n', '/home/developer/': {}, '/home/developer/os-release': 'NAME="Debian GNU/Linux"\n' } },
        '10.0.0.9': { name: 'db.lab', ip: '10.0.0.9', os: 'Linux', ports: { 22: { service: 'ssh', version: 'OpenSSH 9.6' } }, users: { backup: 'dbpass2026' }, home: '/home/backup', fs: { '/etc/hostname': 'db.lab\n', '/home/backup/': {}, '/home/backup/os-release': 'NAME="Debian GNU/Linux"\n', '/home/backup/flag.txt': 'flag{4ut0m4t10n_1s_4_sk1ll}\n' } },
      },
    },
  },
];