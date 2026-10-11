/* =========================================================================
 * net.js — the in-game network: hosts, ports, HTTP pages and tools.
 *
 * Everything is fictional and lives inside the page. No request ever leaves
 * the browser, and every target belongs to a machine you own in the lab.
 * ========================================================================= */

import { VFS } from './fs.js';
import { ShError } from './shell.js';
import { parseFlags, joinPath, pad } from './util.js';

/* ---------------- the default practice range ---------------- */

export const DEFAULT_NET = {
  hosts: {
    '10.0.0.1': {
      name: 'gateway.lab',
      os: 'Linux 6.1 (router)',
      ports: { 22: { service: 'ssh', version: 'OpenSSH 9.2p1' } },
    },
    '10.0.0.5': {
      name: 'dev.lab',
      os: 'Linux 5.15',
      ports: {
        22: { service: 'ssh', version: 'OpenSSH 8.9p1 Ubuntu' },
        80: { service: 'http', version: 'nginx 1.18.0' },
        8080: { service: 'http-proxy', version: 'Jenkins 2.346' },
      },
      users: { developer: 'hunter2', ci: 'letmein' },
      home: '/home/developer',
      http: {
        '/': {
          status: 200,
          body: [
            '<html><head><title>DevBox internal</title></head><body>',
            '<h1>DevBox internal services</h1>',
            '<ul>',
            '<li><a href="/jenkins">Jenkins</a></li>',
            '<li><a href="/status">Status</a></li>',
            '</ul>',
            '<p>Do not deploy on Fridays. -dev team</p>',
            '</body></html>',
          ].join('\n'),
        },
        '/status': { status: 200, body: 'OK — last deploy: 03:14 by ci\nqueue: empty\ndisk: 71% used\n' },
      },
    },
    '10.0.0.9': {
      name: 'vault.lab',
      os: 'Debian 12',
      ports: {
        22: { service: 'ssh', version: 'OpenSSH 9.6p1 Debian-3' },
        443: { service: 'https', version: 'nginx 1.22.1' },
      },
      users: { root: 'toor', backup: 'b4ckup!' },
      home: '/root',
      http: {},
    },
    'web.zer0day.lab': {
      name: 'web.zer0day.lab',
      ip: '10.0.0.20',
      os: 'Ubuntu 22.04',
      ports: { 80: { service: 'http', version: 'Apache 2.4.57' }, 443: { service: 'https', version: 'Apache 2.4.57' } },
      http: {
        '/': { status: 200, body: '<h1>ZeroDay Coffee</h1><p>We roast in small batches.</p>\n<!-- TODO: remove debug page before launch -->\n' },
        '/debug': { status: 200, body: 'debug mode: ON\nadmin panel: /admin\ndb: postgres://web:web@127.0.0.1:5432/shop\n' },
        '/robots.txt': { status: 200, body: 'User-agent: *\nDisallow: /admin\nDisallow: /backup/\n' },
      },
    },
  },
};

/* ---------------- helpers ---------------- */

function netOf(ctx) {
  const vm = ctx.sh.vm;
  if (vm && vm.net) return vm.net;
  return DEFAULT_NET;
}

function allHosts(ctx) {
  const net = netOf(ctx);
  const list = [];
  for (const [key, host] of Object.entries(net.hosts || {})) {
    list.push({ key, ...host, ip: host.ip || key });
  }
  return list;
}

function findHost(ctx, nameOrIp) {
  const n = String(nameOrIp).toLowerCase();
  const hosts = allHosts(ctx);
  return hosts.find((h) => h.ip === n || h.key === n || String(h.name || '').toLowerCase() === n) || null;
}

function remoteFs(ctx, host) {
  const vm = ctx.sh.vm;
  vm.remoteFss = vm.remoteFss || {};
  if (!vm.remoteFss[host.ip]) {
    vm.remoteFss[host.ip] = VFS.fromSpec(host.fs || defaultRemoteSpec(host));
  }
  return vm.remoteFss[host.ip];
}

function defaultRemoteSpec(host) {
  const home = host.home || '/home/' + Object.keys(host.users || { player: '' })[0];
  return {
    '/etc/hostname': `${host.name}\n`,
    '/etc/passwd': 'root:x:0:0:root:/root:/bin/bash\n' +
      Object.keys(host.users || {}).map((u) => `${u}:x:1000:1000:${u}:${home}/${u}:/bin/bash`).join('\n') + '\n',
    '/home': {},
    [home]: {},
    [home + '/.bash_history']: '',
  };
}

/** Very small HTTP server backed by host.http */
export function serveHttp(ctx, url) {
  const m = /^(https?:\/\/)?([^/]+)(\/.*)?$/.exec(String(url).trim());
  if (!m) return null;
  const hostName = m[2];
  const path = m[3] || '/';
  const host = findHost(ctx, hostName);
  if (!host) return { missing: hostName };
  if (!host.http) return { missing: hostName };
  const page = host.http[path];
  if (!page) {
    return {
      status: 404,
      headers: { Server: (host.ports && host.ports[80] ? host.ports[80].version : 'web') },
      body: `<html><head><title>404 Not Found</title></head><body><h1>404 Not Found</h1><p>No page at ${path}</p></body></html>\n`,
    };
  }
  return { status: page.status || 200, headers: { Server: 'nginx/1.18.0', 'Content-Type': 'text/html' }, body: page.body, host };
}

function looksLikeHtml(body) {
  return /<html|<body|<h1|<!doctype/i.test(body);
}

/* ---------------- command implementations ---------------- */

function curlFn(args, stdin, ctx) {
  const f = parseFlags(args, ['o', 'X', 'd', 'H', 'u', 'm', 'w']);
  const urls = f._;
  if (!urls.length) throw new ShError('curl: try \'curl --help\' for more information', 2);
  const f2 = parseFlags(f._.filter((u) => !u.startsWith('-')), []);
  void f2;
  const url = urls.find((u) => !u.startsWith('-')) || urls[0];
  const method = f.X || (f.d ? 'POST' : 'GET');
  const response = serveHttp(ctx, url);
  const err = [];

  if (!response || response.missing) {
    const host = response ? response.missing : url;
    err.push(`curl: (6) Could not resolve host: ${host}`);
    err.push('This lab is air-gapped. Try one of your own machines: web.zer0day.lab, dev.lab, vault.lab, 10.0.0.5');
    return { err: err.join('\n') + '\n', code: 6 };
  }
  if (!ctx.sh.vm?.net && !allHosts(ctx).some((h) => String(h.name) === 'web.zer0day.lab')) {
    // sandbox without a network definition still works
  }

  let out = '';
  const verbose = f.v;
  const showHeaders = f.I || (f.head ? true : false);

  if (verbose) {
    out += `* Host ${response.host.ip}:80 was resolved.\n`;
    out += `* Trying ${response.host.ip}:80...\n`;
    out += `> ${method} ${(/^https?:/.test(url) ? new RegExp('^https?://[^/]+').exec(url)[0].replace(/^https?:\/\//, '') : url)} HTTP/1.1\n`;
    out += `> Host: ${response.host.name}\n`;
    if (f.H) for (const h of [].concat(f.H)) out += `> ${h}\n`;
    if (f.d) out += `> Content-Type: application/x-www-form-urlencoded\n`;
    out += '> User-Agent: curl/8.4.0 lab\n>\n';
  }

  const headers = Object.entries(response.headers || {}).map(([k, v]) => `${k}: ${v}`).join('\r\n');
  if (showHeaders) {
    out += `HTTP/1.1 ${response.status} ${response.status === 200 ? 'OK' : 'Not Found'}\r\n${headers}\r\n\r\n`;
    if (f.o) { ctx.fs.writeFile(joinPath(ctx.sh.cwd, f.o), out, { user: ctx.user }); return f.s ? '' : `Saved ${f.o}\n`; }
    return out;
  }

  const body = response.body + (response.body.endsWith('\n') ? '' : '\n');
  if (f.o) {
    ctx.fs.writeFile(joinPath(ctx.sh.cwd, f.o), body, { user: ctx.user });
    return f.s ? '' : `Saved ${f.o}\n`;
  }
  if (f.s) { ctx.fs.httpOut = body; return ''; }
  out += headers ? headers + '\n\n' : '';
  out += body;
  return out;
}

function wgetFn(args, stdin, ctx) {
  const f = parseFlags(args, ['O', 'P', 'o']);
  const url = f._.find((u) => !u.startsWith('-'));
  if (!url) throw new ShError('wget: missing URL', 2);
  const response = serveHttp(ctx, url);
  if (!response || response.missing) {
    return { err: `wget: unable to resolve host address '${response ? response.missing : url}': Name or service not known\n`, code: 4 };
  }
  const outFile = f.O || (f._[0] || '').split('/').filter(Boolean).pop() || 'index.html';
  ctx.fs.writeFile(joinPath(ctx.sh.cwd, outFile), response.body, { user: ctx.user });
  return f.q ? '' :
    `Connecting to ${response.host.name} [${response.host.ip}]:80...\nHTTP request sent, awaiting response... 200 OK\nLength: ${response.body.length} [text/html]\nSaving to: '${outFile}'\n`;
}

function nmapFn(args, stdin, ctx) {
  let outFile = null;
  const cleanArgs = [];
  let takeNext = false;
  for (const a of args) {
    const glued = /^-oN(.+)$/.exec(a);
    if (glued) { outFile = glued[1]; continue; }
    if (a === '-oN' || a === '-o') { takeNext = true; continue; }
    if (takeNext) { outFile = a; takeNext = false; continue; }
    cleanArgs.push(a);
  }
  const f = parseFlags(cleanArgs, ['p', 'T']);
  const targets = f._.filter((u) => !u.startsWith('-'));
  const fast = f['F'] || f['4'];
  void fast;
  const out = [];
  out.push('Starting Nmap 7.94 ( https://nmap.org )');
  const hosts = (targets.length ? targets.map((t) => findHost(ctx, t)).filter(Boolean) : allHosts(ctx));
  if (!hosts.length) {
    out.push(`Nmap scan report for ${targets[0]}`);
    out.push(`Host is up (0.0000s latency).`);
    out.push('Note: this host may be down or the name could not be resolved.');
    return out.join('\n') + '\n';
  }

  for (const host of hosts) {
    out.push(`Nmap scan report for ${host.ip}${host.name && host.name !== host.ip ? ` (${host.name})` : ''}`);
    out.push(`Host is up (0.${String(1000 + (host.ip.charCodeAt(host.ip.length - 1) * 7) % 900)}s latency).`);
    const openPorts = Object.entries(host.ports || {});
    if (!openPorts.length) {
      out.push('Not shown: 997 filtered tcp ports (reset)');
      out.push('All 997 scanned ports are filtered');
    } else {
      out.push(`Not shown: ${997 - openPorts.length} closed tcp ports (reset)`);
      const rows = [['PORT', 'STATE', 'SERVICE', 'VERSION']];
      for (const [port, info] of openPorts) {
        rows.push([`${port}/tcp`, 'open', info.service, info.version || '']);
      }
      rows.forEach((r) => out.push(r.join('  ')));
      if (f.A || f.sv) {
        out.push('');
        out.push(`OS details: ${host.os || 'unknown'}`);
        for (const [port, info] of openPorts) {
          if (info.banner) out.push(`|${port}/tcp ${info.service}: ${info.banner}`);
        }
      }
    }
    const time = (0.31 + hosts.indexOf(host) * 0.11).toFixed(2);
    out.push('');
    out.push(`Nmap done: 1 IP address (1 host up) scanned in ${time} seconds`);
  }
  let text = out.join('\n') + '\n';
  if (outFile) { ctx.fs.writeFile(joinPath(ctx.sh.cwd, outFile), text, { user: ctx.user }); return `Nmap scan report saved to ${outFile}\n`; }
  return text;
}

function pingFn(args, stdin, ctx) {
  const f = parseFlags(args, ['c', 's', 'W', 'i', 'I']);
  const target = f._[0];
  if (!target) throw new ShError('ping: usage error: destination host required');
  const host = findHost(ctx, target);
  if (!host) {
    return `ping: ${target}: Name or service not known\n`;
  }
  const count = f.c ? parseInt(f.c, 10) : 3;
  const out = [`PING ${host.name} (${host.ip}) 56(84) bytes of data.`];
  for (let i = 0; i < count; i++) {
    out.push(`64 bytes from ${host.ip} (${host.name}): icmp_seq=${i + 1} ttl=64 time=${(0.4 + i * 0.11).toFixed(1)} ms`);
  }
  out.push('');
  out.push(`--- ${host.name} ping statistics ---`);
  out.push(`${count} packets transmitted, ${count} received, 0% packet loss, time ${(count * 0.1).toFixed(2)}s`);
  return out.join('\n') + '\n';
}

function tracerouteFn(args, stdin, ctx) {
  const target = args.find((a) => !a.startsWith('-'));
  const host = findHost(ctx, target);
  if (!host) return `traceroute: cannot resolve ${target}\n`;
  const hops = [
    `1  10.0.0.1  0.412 ms  0.398 ms  0.401 ms`,
    `2  10.0.0.254  1.812 ms  1.744 ms  1.769 ms`,
    `3  ${host.ip}  3.041 ms  2.988 ms  3.002 ms  (${host.name})`,
  ];
  return [
    `traceroute to ${host.name} (${host.ip}), 30 hops max, 60 byte packets`,
    ...hops,
  ].join('\n') + '\n';
}

function netstatFn(args, stdin, ctx) {
  const f = parseFlags(args);
  const host = ctx.sh.hostNet || { ip: '10.0.0.50' };
  const rows = [['Proto', 'Recv-Q', 'Send-Q', 'Local Address', 'Foreign Address', 'State']];
  rows.push(['tcp', '0', '0', '0.0.0.0:22', '0.0.0.0:*', 'LISTEN']);
  rows.push(['tcp', '0', '0', '0.0.0.0:631', '0.0.0.0:*', 'LISTEN']);
  rows.push(['tcp6', '0', '0', ':::80', ':*', 'LISTEN']);
  rows.push(['udp', '0', '0', '0.0.0.0:68', '0.0.0.0:*', '']);
  rows.push(['tcp', '0', '0', `${host.ip}:22`, `${host.ip}:52144`, 'ESTABLISHED']);
  return pad('', 0) + rows.map((r) => r.map((c) => pad(c, Math.max(6, r.length ? 14 : 6))).join(' ').replace(/\s+$/, '')).join('\n') + '\n';
}

function ifconfigFn() {
  return [
    'docker0: flags=4099<UP,BROADCAST,MULTICAST>  mtu 1500',
    '        inet 172.17.0.1  netmask 255.255.0.0  broadcast 172.17.255.255',
    '        RX packets 0  bytes 0 (0.0 B)',
    'lo: flags=73<UP,LOOPBACK,RUNNING>  mtu 65536',
    '        inet 127.0.0.1  netmask 255.0.0.0',
    '        loop  txqueuelen 1000  (Local Loopback)',
    'ens33: flags=4163<UP,BROADCAST,RUNNING,MULTICAST>  mtu 1500',
    '        inet 10.0.0.50  netmask 255.255.255.0  broadcast 10.0.0.255',
    '        RX packets 18204  bytes 2451783 (2.4 MB)',
    '        TX packets 9112  bytes 1102881 (1.1 MB)',
  ].join('\n') + '\n';
}

function ipFn(args, stdin, ctx) {
  if ((args[0] || '') === 'addr') {
    return [
      '1: lo: <LOOPBACK,UP,LOWER_UP> mtu 65536 qdisc noqueue state UNKNOWN',
      '    inet 127.0.0.1/8 scope host lo',
      '2: ens33: <BROADCAST,MULTICAST,UP,LOWER_UP> mtu 1500 qdisc fq_codel state UP',
      '    inet 10.0.0.50/24 brd 10.0.0.255 scope global ens33',
    ].join('\n') + '\n';
  }
  return 'usage: ip { addr | route | link } ...\n';
}

function digFn(args, stdin, ctx) {
  const f = parseFlags(args);
  const name = f._[0] || 'zer0day.lab';
  const host = findHost(ctx, name);
  const status = host ? 'NOERROR 1 A' : 'NXDOMAIN';
  return [
    '; <<>> DiG 9.18 <<>> ' + name,
    ';; global options: +cmd',
    ';; Got answer:',
    ';; ->>HEADER<<- opcode: QUERY, status: ' + status + ', id: 48213',
    ';; flags: qr rd ra; QUERY: 1, ANSWER: ' + (host ? 1 : 0) + ', AUTHORITY: 0, ADDITIONAL: 0',
    '',
    ';; QUESTION SECTION:',
    `;${name}\t\t\tIN\tA`,
    '',
    ';; ANSWER SECTION:',
    host ? `${name}\t300\tIN\tA\t${host.ip}` : '',
    '',
    ';; Query time: 12 msec',
    ';; SERVER: 10.0.0.1#53(10.0.0.1)',
  ].filter((l) => l !== '').join('\n') + '\n';
}

function sshFn(args, stdin, ctx) {
  const f = parseFlags(args, ['p', 'i', 'o', 'L', 'R']);
  const target = args.filter((a) => !a.startsWith('-')).join(' ');
  const m = /^(?:(\S+)@)?([^@\s]+)$/.exec(target.trim());
  if (!m) throw new ShError('usage: ssh user@host');
  const user = m[1] || ctx.user;
  const hostName = m[2];
  const host = findHost(ctx, hostName);
  const vm = ctx.sh.vm || {};
  if (!host) {
    return { err: `ssh: Could not resolve hostname ${hostName}: Name or service not known\n`, code: 255 };
  }
  const creds = (vm.credentials || {})[host.ip] || (host.users || {});
  let password = ctx.sh.pendingPassword;
  ctx.sh.pendingPassword = null;
  if (!password && vm.credentials && vm.credentials[host.ip]) password = vm.credentials[host.ip];
  if (!password && stdin) password = stdin.trim();

  if (!password) return { err: `\u0000ASKPWD\u0000`, code: 255 };
  const expected = typeof creds === 'string' ? creds : (creds[user] || creds.default);
  if (!expected) {
    return { err: `Permission denied (publickey,password).\n`, code: 255 };
  }
  if (password !== expected) {
    return { err: `Permission denied (publickey,password).\n`, code: 255 };
  }

  const fs = remoteFs(ctx, host);
  ctx.sh.hostStack = ctx.sh.hostStack || [];
  ctx.sh.hostStack.push({ fs: ctx.sh.fs, cwd: ctx.sh.cwd, hostName: ctx.sh.hostName, user: ctx.sh.user, home: ctx.sh.home });
  ctx.sh.fs = fs;
  ctx.sh.hostName = host.name;
  ctx.sh.user = user;
  const home = host.home || `/home/${user}`;
  fs.mkdirp(home, 'root');
  if (ctx.sh.setCwd) ctx.sh.setCwd(home);
  else ctx.sh.cwd = home;
  ctx.sh.env.HOSTNAME = host.name;
  ctx.sh.env.HOME = home;
  ctx.sh.fs.mkdirp('/etc', 'root');
  const banner = [
    `Last login: ${new Date().toUTCString().slice(5, 22)} from ${ctx.sh.hostStack[ctx.sh.hostStack.length - 1].hostName || 'localhost'}`,
    `Linux ${host.name} ${host.os || ''}`,
    '',
  ].join('\n');
  return banner;
}

function sshpassFn(args, stdin, ctx) {
  const f = parseFlags(args, ['p', '-f']);
  const cmd = f._.join(' ');
  const password = f.p !== undefined ? String(f.p) : stdin.trim();
  ctx.sh.pendingPassword = password;
  const result = ctx.sh.run(cmd);
  return result;
}

function scpFn(args, stdin, ctx) {
  const f = parseFlags(args);
  const parts = f._.filter((a) => !a.startsWith('-'));
  if (parts.length < 2) throw new ShError('scp: usage: scp source target');
  const parseSide = (s) => {
    const m = /^(?:([^@/]+)@)?([^:/]+):(.*)$/.exec(s);
    if (m) return { host: m[2], path: m[3], remote: true };
    return { host: null, path: s, remote: false };
  };
  const src = parseSide(parts[0]);
  const dst = parseSide(parts[1]);
  const host = src.host ? findHost(ctx, src.host) : (dst.host ? findHost(ctx, dst.host) : null);
  if (src.host && !host) return { err: `ssh: Could not resolve hostname ${src.host}\n`, code: 255 };
  if (host && host.users && Object.keys(host.users).length) {
    const vm = ctx.sh.vm || {};
    const pass = (vm.credentials || {})[host.ip];
    const known = Object.values(host.users);
    if (!pass && !known.includes('')) return { err: `Permission denied (publickey,password).\n`, code: 255 };
  }
  const remoteFsInstance = host ? remoteFs(ctx, host) : ctx.fs;
  if (src.host) {
    if (!remoteFsInstance.isFile(joinPath('/', src.path))) return { err: `scp: ${src.path}: No such file or directory\n`, code: 1 };
    ctx.fs.writeFile(joinPath(ctx.sh.cwd, dst.path), remoteFsInstance.readFile(joinPath('/', src.path)), { user: ctx.user });
    return '';
  }
  if (dst.host) {
    const content = ctx.fs.readFile(joinPath(ctx.sh.cwd, src.path), ctx.user);
    remoteFsInstance.writeFile(joinPath('/', dst.path), content, { user: ctx.user });
    return '';
  }
  ctx.fs.cp(joinPath(ctx.sh.cwd, src.path), joinPath(ctx.sh.cwd, dst.path), { user: ctx.user });
  return '';
}

function ncFn(args, stdin, ctx) {
  const f = parseFlags(args, ['w', 'l', 'p', 'z', 'v']);
  const [hostName, portArg] = f._;
  const host = findHost(ctx, hostName);
  if (f.z) {   // port scan helper used by some recon workflows
    if (!host) return `nc: host ${hostName} not found\n`;
    const port = parseInt(portArg, 10);
    const open = host.ports && host.ports[port];
    return open ? `Connection to ${hostName} ${port} port [tcp/*] succeeded!\n` : `nc: connect to ${hostName} port ${port} (tcp) failed: Connection refused\n`;
  }
  if (f.l) {
    return { err: 'nc: the lab does not host real listeners. Use nmap to look around.\n', code: 1 };
  }
  if (!host) return `nc: getaddrinfo for ${hostName}: Name or service not known\n`;
  const banner = host.ports && host.ports[parseInt(portArg, 10)];
  if (!banner) return `nc: connect to ${hostName} port ${portArg} (tcp) failed: Connection refused\n`;
  if (banner.banner) return banner.banner + '\n';
  return `Connection to ${hostName} ${portArg} port [tcp/*] succeeded!\n`;
}

/* ---------------- command tables ---------------- */

export function networkCommands(kind = 'bash') {
  const common = {
    curl: {
      desc: 'transfer data from or to a server',
      usage: 'curl [-sS] [-i] [-o FILE] [-X METHOD] URL',
      flags: [
        { flag: '-i', desc: 'include response headers in the output' },
        { flag: '-I', desc: 'fetch headers only' },
        { flag: '-o', desc: 'write the body to a file' },
        { flag: '-X', desc: 'request method (GET, POST, HEAD)' },
        { flag: '-d', desc: 'data to send in a POST body' },
        { flag: '-v', desc: 'verbose: show the request as well' },
      ],
      fn: curlFn,
    },
    wget: { desc: 'download a file over HTTP', usage: 'wget [-O FILE] URL', fn: wgetFn },
    ping: { desc: 'send ICMP echo requests', usage: 'ping [-c N] host', fn: pingFn },
    traceroute: { desc: 'trace packets across the network', usage: 'traceroute host', fn: tracerouteFn },
    netstat: { desc: 'show network connections', usage: 'netstat [-tuln]', fn: netstatFn },
    ifconfig: { desc: 'show network interface configuration', usage: 'ifconfig [interface]', fn: ifconfigFn },
    ip: { desc: 'modern network configuration tool', usage: 'ip addr', fn: ipFn },
    dig: { desc: 'query DNS records', usage: 'dig name', fn: digFn },
    nslookup: { desc: 'query DNS records (simple)', usage: 'nslookup name', fn: digFn },
    host: { desc: 'DNS lookup (simple)', usage: 'host name', fn: digFn },
    nmap: {
      desc: 'network mapper: discover hosts and open ports',
      usage: 'nmap [-p PORTS] [-sS] [-A] target',
      flags: [
        { flag: '-p', desc: 'ports to scan, e.g. -p 22,80 or -p-' },
        { flag: '-sS', desc: 'TCP SYN stealth scan' },
        { flag: '-sV', desc: 'probe open ports to guess versions' },
        { flag: '-A', desc: 'aggressive: version + OS detection' },
        { flag: '-Pn', desc: 'treat hosts as online (skip ping)' },
      ],
      fn: nmapFn,
      requires: null,
    },
    ssh: { desc: 'open a remote shell on a machine you own', usage: 'ssh user@host', fn: sshFn },
    sshpass: { desc: 'feed a password to ssh non-interactively', usage: "sshpass -p 'password' ssh user@host", fn: sshpassFn },
    scp: { desc: 'copy files over ssh', usage: 'scp source:/path ./local', fn: scpFn },
    nc: { desc: 'netcat: read and write network connections', usage: 'nc [-zv] host port', fn: ncFn },
  };
  if (kind === 'powershell') {
    return {
      'Invoke-WebRequest': { ...common.curl, desc: 'download the contents of a web page', usage: 'Invoke-WebRequest -Uri URL [-OutFile FILE]' },
      iwr: { ...common.curl, desc: 'alias for Invoke-WebRequest', usage: 'iwr URL' },
      'Invoke-RestMethod': { ...common.curl, desc: 'get a web page and parse it', usage: 'irm URL' },
      TestNetConnection: { desc: 'test whether a port is reachable', usage: 'Test-NetConnection -ComputerName host -Port 443', fn: (args, stdin, ctx) => {
        const f = parseFlags(args, ['ComputerName', 'Port']);
        const host = findHost(ctx, f.ComputerName || 'localhost');
        const port = f.Port || 22;
        const open = host && host.ports && host.ports[port];
        return `ComputerName      : ${f.ComputerName || 'localhost'}\nRemotePort        : ${port}\nTcpTestSucceeded  : ${open ? 'True' : 'False'}\n`;
      } },
      ResolveDnsName: { desc: 'look up a DNS name', usage: 'ResolveDnsName name', fn: digFn },
      'Get-NetTCPConnection': { desc: 'list listening ports and connections', usage: 'Get-NetTCPConnection', fn: netstatFn },
    };
  }
  return common;
}

export { findHost };