/* =========================================================================
 * bash.js — the Linux shell command library.
 *
 * Every command runs against the virtual filesystem: nothing here touches
 * the player's real computer. ~70 commands, pipes and redirection included.
 * ========================================================================= */

import { Shell, ShError } from './shell.js';
import {
  parseFlags, lines, pad, formatBytes, formatDate, joinPath, dirname, basename,
  extname, hasGlob, globToRegExp, normalizeUnix, toUnixPath, winFromUnix, escapeHtml,
  evalArithmetic,
} from './util.js';
import { runScript } from './script.js';
import { hashAny, base64Encode, base64Decode, hexEncode, bytesToString } from './hash.js';
import { networkCommands } from './net.js';

const NUM_RE = /^-?\d+(\.\d+)?$/;

/* ---------------- shared helpers ---------------- */

const resolve = (ctx, path) => joinPath(ctx.sh.cwd, path);

function readInput(ctx, file, stdin) {
  if (file === undefined || file === '-') return stdin;
  return ctx.fs.readFile(resolve(ctx, file), ctx.user);
}

function outputLines(text) {
  return lines(text).join('\n') + (text.endsWith('\n') || text === '' ? '' : '');
}

function humanSort(a, b) { return a.localeCompare(b); }

/** sort ls entries the way the -r/-t/-S flags ask for */
function sortEntries(entries, flags = {}) {
  const out = entries.slice();
  if (flags.S) out.sort((a, b) => ctxSize(b.node) - ctxSize(a.node));
  else if (flags.t) out.sort((a, b) => b.node.mtime - a.node.mtime);
  if (flags.r) out.reverse();
  return out;
  function ctxSize(node) { return node.type === 'dir' ? 4096 : (node.content || '').length; }
}

/** collect inputs for commands like cat / grep that accept files or stdin */
function inputsFor(ctx, files, stdin) {
  if (!files.length) return [{ name: null, text: stdin }];
  return files.map((f) => {
    if (f === '-') return { name: '-', text: stdin };
    return { name: f, text: ctx.fs.readFile(resolve(ctx, f), ctx.user) };
  });
}

function tabulate(rows, gap = '  ') {
  if (!rows.length) return '';
  const widths = [];
  for (const row of rows) {
    row.forEach((cell, i) => { widths[i] = Math.max(widths[i] || 0, String(cell).length); });
  }
  return rows
    .map((row) => row.map((cell, i) => (i === row.length - 1 ? String(cell) : pad(cell, widths[i]))).join(gap).replace(/\s+$/, ''))
    .join('\n');
}

/** Very small AWK: patterns + print actions + BEGIN/END, one rule per brace group. */
function parseAwkRules(program) {
  const src = String(program);
  const rules = [];
  let i = 0;
  while (i < src.length) {
    const open = src.indexOf('{', i);
    if (open === -1) break;
    let depth = 1;
    let j = open + 1;
    while (j < src.length && depth > 0) {
      if (src[j] === '{') depth++;
      else if (src[j] === '}') depth--;
      j++;
    }
    const pattern = src.slice(i, open).replace(/;\s*$/, '').trim();
    const action = src.slice(open + 1, j - 1);
    rules.push({ pattern, action });
    i = j;
  }
  return rules;
}

function miniAwk(program, text, sep = ' ') {
  const vars = { NR: 0, NF: 0 };
  const rules = parseAwkRules(program);
  const out = [];
  const printExpr = (expr, fields) => {
    const trimmed = expr.trim();
    if (!trimmed) return fields.join(' ');
    const parts = trimmed.split(/\s*,\s*/);
    return parts.map((p) => evalAwkExpr(evalArith(p, fields, vars), fields, vars)).join(' ');
  };
  const runAction = (action, fields) => {
    if (!action || !action.trim()) { out.push(fields.join(' ')); return; }
    const inner = action.trim();
    const stmts = inner.split(/;(?![^(]*\))/);
    for (const s of stmts) {
      const t = s.trim();
      if (!t) continue;
      const m = /^print(?:\s+(.+))?$/.exec(t);
      if (m) { out.push(printExpr(m[1] || '', fields)); continue; }
      const inc = /^\s*(\$?\w+)\s*\+\+\s*$/.exec(t) || /^\s*(\$?\w+)\s*\+=\s*(.+)$/.exec(t);
      if (inc) {
        const key = inc[1];
        const cur = Number(vars[key]) || 0;
        const add = inc[2] !== undefined ? Number(evalAwkExpr(evalArith(inc[2], fields, vars), fields, vars)) : 1;
        vars[key] = (cur + (Number.isNaN(add) ? 0 : add));
        continue;
      }
      const ifm = /^if\s*\((.+?)\)\s*(.+)$/.exec(t);
      if (ifm) {
        const cond = evalAwkExpr(ifm[1], fields, vars);
        const rest = ifm[2];
        const pm = /^print(?:\s+(.+))?$/.exec(rest.trim());
        if (pm && cond) out.push(printExpr(pm[1] || '', fields));
        continue;
      }
      out.push(t);
    }
  };

  const data = lines(text);
  const runRule = (rule, fields, line) => {
    let matched = true;
    const pattern = rule.pattern;
    if (pattern) {
      if (/^\/.*\/$/.test(pattern)) matched = new RegExp(pattern.slice(1, -1)).test(line);
      else {
        const cm = /^(\$?\d+|\$NF|NR|NF|FS)\s*(==|!=|>=|<=|>|<|>|<)\s*(.+)$/.exec(pattern);
        if (cm) {
          const lhs = evalAwkExpr(cm[1], fields, vars);
          const rhs = evalAwkExpr(cm[3].replace(/^["']|["']$/g, ''), fields, vars);
          const a = parseFloat(lhs); const b = parseFloat(rhs);
          switch (cm[2]) {
            case '==': matched = String(lhs) === String(rhs); break;
            case '!=': matched = String(lhs) !== String(rhs); break;
            case '>': matched = a > b; break;
            case '<': matched = a < b; break;
            case '>=': matched = a >= b; break;
            case '<=': matched = a <= b; break;
            default: matched = false;
          }
        } else {
          matched = new RegExp(pattern.replace(/^\//, '').replace(/\/$/, '')).test(line);
        }
      }
    }
    if (matched) runAction(rule.action, fields);
  };

  for (const rule of rules) {
    if (/^BEGIN\b/.test(rule.pattern)) runAction(rule.pattern.replace(/^BEGIN\s*/, '') + (rule.action ? '' : ''), ['']);
  }
  data.forEach((line, idx) => {
    vars.NR = idx + 1;
    const fields = line.trim() === '' ? [] : (sep === '' ? [line] : line.split(sep).filter((x) => x !== ''));
    vars.NF = fields.length;
    for (const rule of rules) {
      if (/^(BEGIN|END)\b/.test(rule.pattern)) continue;
      runRule(rule, fields, line);
    }
  });
  for (const rule of rules) {
    if (/^END\b/.test(rule.pattern)) runAction(rule.action, ['']);
  }
  return out.join('\n');
}

/** Evaluate a tiny arithmetic expression built from fields and variables. */
function evalArith(expr, fields, vars) {
  const src = String(expr).trim();
  if (!/^[\d\s$+\-*/().A-Za-z_]*$/.test(src) || !/[+\-*/]/.test(src)) return src;
  let js = src
    .replace(/\$(\d+)/g, (_, n) => String(Number(fields[Number(n) - 1] ?? 0)))
    .replace(/\$NF/g, String(fields.length))
    .replace(/\$0/g, String(fields.join(' ')))
    .replace(/\b([A-Za-z_]\w*)\b/g, (m) => (m in vars ? String(vars[m]) : '0'));
  try {
    const value = Function(`"use strict"; return (${js});`)();
    return Number.isFinite(value) ? String(value) : src;
  } catch {
    return src;
  }
}

function evalAwkExpr(expr, fields, vars) {
  const t = String(expr).trim().replace(/^["']|["']$/g, '');
  if (t === '$0') return fields.join(' ');
  const nf = /^NF$/.test(t) ? String(fields.length) : null;
  if (/^\$NF$/.test(t)) return fields[fields.length - 1] ?? '';
  if (/^\$(\d+)$/.test(t)) return fields[Number(t.slice(1)) - 1] ?? '';
  if (/^\$\d+$/.test(t)) return fields[Number(t.slice(1)) - 1] ?? '';
  if (t in vars) return String(vars[t]);
  if (nf) return nf;
  if (t.startsWith('"') || t.startsWith("'")) return t.slice(1, -1);
  if (NUM_RE.test(t)) return String(Number(t));
  return t;
}

/* ---------------- the command table ---------------- */

export const BASH_COMMANDS = {

  /* ---------- navigation & files ---------- */

  pwd: {
    desc: 'print the current working directory',
    usage: 'pwd',
    fn: (args, stdin, ctx) => ctx.sh.cwd,
  },

  ls: {
    desc: 'list directory contents',
    usage: 'ls [-lahrStRd1] [file ...]',
    flags: [
      { flag: '-l', desc: 'long format: permissions, owner, size, date' },
      { flag: '-a', desc: 'show entries starting with .' },
      { flag: '-h', desc: 'human readable sizes (with -l)' },
      { flag: '-r', desc: 'reverse sort order' },
      { flag: '-t', desc: 'sort by modification time, newest first' },
      { flag: '-S', desc: 'sort by size, biggest first' },
      { flag: '-R', desc: 'list subdirectories recursively' },
    ],
    seeAlso: ['cd', 'tree', 'file'],
    fn: (args, stdin, ctx) => {
      const f = parseFlags(args, ['I']);
      const targets = f._.length ? f._ : ['.'];
      let chunks = [];
      for (const t of targets) {
        const path = resolve(ctx, t);
        const node = ctx.fs.node(path);
        if (!node) throw new ShError(`${t}: No such file or directory`, 2);
        let entries;
        if (f.d) entries = [{ node, name: t }];
        else if (node.type === 'dir') {
          entries = Object.values(node.children)
            .filter((n) => f.a || !n.name.startsWith('.'))
            .map((n) => ({ node: n, name: n.name }));
          entries = sortEntries(entries, f);
        } else entries = [{ node, name: t }];

        const multi = targets.length > 1;
        if (multi) chunks.push(t + ':');
        if (!entries.length) { chunks.push(''); continue; }

        if (f.l) {
          const rows = entries.map(({ node, name }) => {
            let label = name;
            if (node.isLink) label += ' -> ' + node.linkTo;
            else if (node.type === 'dir') label += '/';
            else if (node.mode & 0o111) label += '*';
            const size = ctx.fs.size(node);
            return [
              node.isLink ? 'h' : ctx.fs.modeString(node),
              node.owner,
              node.group,
              f.h ? formatBytes(size) : String(size),
              formatDate(node.mtime),
              label,
            ];
          });
          chunks.push(tabulate(rows, '  '));
        } else if (f['1']) {
          chunks.push(entries.map(({ name }) => name).join('\n'));
        } else {
          // multi column when it is a terminal listing of several entries
          const names = entries.map(({ node, name }) =>
            node.type === 'dir' ? name + '/' : (node.mode & 0o111 ? name + '*' : name));
          const width = Math.min(30, Math.max(...names.map((n) => n.length), 4) + 2);
          const perRow = Math.max(1, Math.min(Math.floor((ctx.cols || 80) / width), 4));
          const rows = [];
          for (let i = 0; i < names.length; i += perRow) rows.push(names.slice(i, i + perRow));
          chunks.push(rows.map((r) => r.map((c) => pad(c, width)).join('').replace(/\s+$/, '')).join('\n'));
        }
        if (f.R && node.type === 'dir') {
          for (const child of Object.values(node.children)) {
            if (!f.a && child.name.startsWith('.')) continue;
            chunks.push(`${path === '/' ? '' : path}/${child.name}:`);
            chunks.push(BASH_COMMANDS.ls.fn(['-l', path + '/' + child.name], '', ctx));
          }
        }
      }
      return chunks.filter((c) => c !== '').join('\n\n') + '\n';
    },
  },

  cd: {
    desc: 'change the current working directory',
    usage: 'cd [directory]',
    fn: (args, stdin, ctx) => {
      const target = args[0] || ctx.sh.home;
      const path = resolve(ctx, target);
      const node = ctx.fs.node(path);
      if (!node) throw new ShError(`${args[0]}: No such file or directory`, 2);
      if (node.type !== 'dir') throw new ShError(`${args[0]}: Not a directory`);
      ctx.fs.assertPerm(node, 'read', path, ctx.user);
      ctx.sh.cwd = path;
      ctx.sh.env.PWD = path;
      return '';
    },
  },

  mkdir: {
    desc: 'create directories',
    usage: 'mkdir [-p] directory ...',
    flags: [{ flag: '-p', desc: 'create parents, and do not complain if it exists' }],
    fn: (args, stdin, ctx) => {
      const f = parseFlags(args);
      for (const d of f._) ctx.fs.mkdir(resolve(ctx, d), { recursive: !!f.p, user: ctx.user });
      return '';
    },
  },

  rmdir: {
    desc: 'remove empty directories',
    usage: 'rmdir directory ...',
    fn: (args, stdin, ctx) => {
      const f = parseFlags(args);
      for (const d of f._) {
        const node = ctx.fs.node(resolve(ctx, d));
        if (node && node.type === 'dir' && Object.keys(node.children).length) throw new ShError(`${d}: Directory not empty`);
        ctx.fs.rm(resolve(ctx, d), { user: ctx.user });
      }
      return '';
    },
  },

  touch: {
    desc: 'create empty files or update timestamps',
    usage: 'touch file ...',
    fn: (args, stdin, ctx) => {
      const f = parseFlags(args);
      for (const a of f._) ctx.fs.touch(resolve(ctx, a), ctx.user);
      return '';
    },
  },

  cat: {
    desc: 'concatenate files and print them',
    usage: 'cat [-n] [file ...]',
    flags: [
      { flag: '-n', desc: 'number every line' },
      { flag: '-b', desc: 'number non-empty lines only' },
      { flag: '-A', desc: 'show $ at line ends (handy for CR puzzles)' },
    ],
    fn: (args, stdin, ctx) => {
      const f = parseFlags(args);
      const parts = inputsFor(ctx, f._, stdin).map(({ name, text }) => {
        let body = text;
        if (f.A) body = body.replace(/\r/g, '^M').replace(/\n/g, '$\n');
        if (f.n || f.b) {
          let n = 0;
          body = body.split('\n').map((l) => {
            if (l.endsWith('\n')) return l;
            if (f.b && l === '') return l;
            return String(++n).padStart(6) + '\t' + l;
          }).join('\n');
        }
        return body;
      });
      return parts.join('');
    },
  },

  head: {
    desc: 'output the first part of files',
    usage: 'head [-n N] [-c N] [file ...]',
    fn: (args, stdin, ctx) => {
      const f = parseFlags(args, ['n', 'c']);
      const n = f.n === undefined ? 10 : parseInt(f.n, 10);
      return inputsFor(ctx, f._, stdin)
        .map(({ text }) => (f.c !== undefined ? text.slice(0, parseInt(f.c, 10)) : lines(text).slice(0, n).join('\n') + (text.endsWith('\n') && n > 0 ? '\n' : '')))
        .join('');
    },
  },

  tail: {
    desc: 'output the last part of files',
    usage: 'tail [-n N] [file ...]',
    fn: (args, stdin, ctx) => {
      const f = parseFlags(args, ['n', 'c']);
      const n = f.n === undefined ? 10 : parseInt(f.n, 10);
      return inputsFor(ctx, f._, stdin)
        .map(({ text }) => {
          if (f.c !== undefined) return text.slice(-parseInt(f.c, 10));
          const all = lines(text);
          const keep = all.slice(-n);
          return keep.join('\n') + '\n';
        })
        .join('');
    },
  },

  wc: {
    desc: 'count lines, words and characters',
    usage: 'wc [-lwc] [file ...]',
    fn: (args, stdin, ctx) => {
      const f = parseFlags(args);
      const showAll = !f.l && !f.w && !f.c && !f.m;
      return inputsFor(ctx, f._, stdin).map(({ name, text }) => {
        const l = lines(text).length;
        const w = text.split(/\s+/).filter(Boolean).length;
        const c = text.length;
        if (showAll) return `${String(l).padStart(7)} ${String(w).padStart(7)} ${String(c).padStart(7)}`;
        const parts = [];
        if (f.l) parts.push(String(l));
        if (f.w) parts.push(String(w));
        if (f.c || f.m) parts.push(String(c));
        return parts.join(' ').trim();
      }).join('\n');
    },
  },

  cp: {
    desc: 'copy files and directories',
    usage: 'cp [-r] source ... target',
    fn: (args, stdin, ctx) => {
      const f = parseFlags(args);
      if (f._.length < 2) throw new ShError('cp: missing destination operand');
      const dest = f._[f._.length - 1];
      for (const src of f._.slice(0, -1)) {
        ctx.fs.cp(resolve(ctx, src), resolve(ctx, dest), { recursive: true, user: ctx.user });
      }
      return '';
    },
  },

  mv: {
    desc: 'move or rename files',
    usage: 'mv source ... target',
    fn: (args, stdin, ctx) => {
      const f = parseFlags(args);
      if (f._.length < 2) throw new ShError('mv: missing destination operand');
      const dest = f._[f._.length - 1];
      for (const src of f._.slice(0, -1)) ctx.fs.mv(resolve(ctx, src), resolve(ctx, dest), ctx.user);
      return '';
    },
  },

  rm: {
    desc: 'remove files or directories',
    usage: 'rm [-r] [-f] file ...',
    flags: [
      { flag: '-r', desc: 'remove directories and their contents' },
      { flag: '-f', desc: 'ignore missing files' },
      { flag: '-i', desc: 'ask before every removal' },
    ],
    fn: (args, stdin, ctx) => {
      const f = parseFlags(args);
      for (const t of f._) {
        try {
          ctx.fs.rm(resolve(ctx, t), { recursive: !!(f.r || f.R), user: ctx.user });
        } catch (e) {
          if (f.f) continue;
          throw e;
        }
      }
      return '';
    },
  },

  ln: {
    desc: 'create links',
    usage: 'ln -s target linkname',
    fn: (args, stdin, ctx) => {
      const f = parseFlags(args);
      if (f._.length < 2) throw new ShError('ln: missing operand');
      ctx.fs.ln(resolve(ctx, f._[0]), resolve(ctx, f._[1]), { symbolic: !!f.s });
      return '';
    },
  },

  file: {
    desc: 'guess what kind of file something is',
    usage: 'file file ...',
    fn: (args, stdin, ctx) => {
      const f = parseFlags(args);
      return f._.map((a) => {
        const p = resolve(ctx, a);
        const n = ctx.fs.node(p);
        if (!n) return `${a}: cannot open (No such file or directory)`;
        if (n.isLink) return `${a}: symbolic link to ${n.linkTo}`;
        if (n.type === 'dir') return `${a}: directory`;
        const c = n.content;
        if (/^#!/.test(c)) return `${a}: POSIX shell script, ASCII text executable${(n.mode & 0o111) ? '' : ' (but not executable)'}`;
        if (/^<\?xml/.test(c)) return `${a}: XML document text`;
        if (/\{\s*"[a-z]+"\s*:/.test(c)) return `${a}: JSON text data`;
        if (/^-----BEGIN/.test(c)) return `${a}: PEM certificate or key data`;
        if (/[ --]/.test(c)) return `${a}: data (binary)`;
        return `${a}: ASCII text`;
      }).join('\n');
    },
  },

  stat: {
    desc: 'show detailed file information',
    usage: 'stat file ...',
    fn: (args, stdin, ctx) => {
      const f = parseFlags(args);
      return f._.map((a) => {
        const s = ctx.fs.stat(resolve(ctx, a));
        return [
          `  File: ${s.path}`,
          `  Size: ${String(s.size).padEnd(10)} Blocks: 8          ${s.type === 'dir' ? 'directory' : 'regular file'}`,
          `Access: (${s.modeString.slice(1)})  Uid: (1000/player)   Gid: (1000/player)`,
          `  Owner: ${s.owner}/${s.owner}   Group: ${s.group}/${s.group}`,
          `Modify: ${new Date(s.mtime).toISOString()}`,
        ].join('\n');
      }).join('\n');
    },
  },

  readlink: {
    desc: 'print what a symlink points to',
    usage: 'readlink -f file',
    fn: (args, stdin, ctx) => {
      const f = parseFlags(args);
      const n = ctx.fs.node(resolve(ctx, f._[0]));
      return n && n.isLink ? n.linkTo : '';
    },
  },

  basename: { desc: 'strip directory from a path', usage: 'basename path [suffix]', fn: (a) => basename(a[0] || '', a[1]) + '\n' },
  dirname: { desc: 'strip last component from a path', usage: 'dirname path', fn: (a) => dirname(a[0] || '') + '\n' },
  realpath: { desc: 'resolve a path to its canonical form', usage: 'realpath path ...', fn: (a, s, ctx) => a.map((x) => resolve(ctx, x)).join('\n') + '\n' },

  tree: {
    desc: 'list directories as a tree',
    usage: 'tree [-a] [directory]',
    flags: [{ flag: '-a', desc: 'include dotfiles' }],
    fn: (args, stdin, ctx) => {
      const f = parseFlags(args);
      const root = resolve(ctx, f._[0] || '.');
      if (!ctx.fs.isDir(root)) throw new ShError(`${f._[0]}: Not a directory`);
      let dirs = 0;
      let files = 0;
      const out = ['.'];
      const render = (path, prefix) => {
        const kids = Object.values(ctx.fs.node(path).children)
          .filter((n) => f.a || !n.name.startsWith('.'))
          .sort((a, b) => a.name.localeCompare(b.name));
        kids.forEach((kid, i) => {
          const last = i === kids.length - 1;
          const branch = prefix + (last ? '`-- ' : '|-- ');
          out.push(branch + kid.name + (kid.type === 'dir' ? '/' : '') + (kid.isLink ? ' -> ' + kid.linkTo : ''));
          if (kid.type === 'dir') { dirs++; render(path + '/' + kid.name, prefix + (last ? '    ' : '|   ')); }
          else files++;
        });
      };
      render(root, '');
      out.push('', `${dirs} directories, ${files} files`);
      return out.join('\n') + '\n';
    },
  },

  du: {
    desc: 'estimate space used by files',
    usage: 'du [-sh] [path ...]',
    fn: (args, stdin, ctx) => {
      const f = parseFlags(args);
      const rows = [];
      for (const t of f._.length ? f._ : ['.']) {
        const p = resolve(ctx, t);
        let total = 0;
        ctx.fs.walk(p, (node) => { if (node.type === 'file') total += ctx.fs.size(node); });
        rows.push([f.h ? formatBytes(total) : String(Math.ceil(total / 1024)), p]);
      }
      return rows.map((r) => r.join('\t')).join('\n') + '\n';
    },
  },

  df: {
    desc: 'report filesystem free space',
    usage: 'df -h',
    fn: (args, stdin, ctx) => {
      const f = parseFlags(args);
      const used = 12.4 + Math.round((ctx.sh.cwd.length % 9) * 0.1);
      const unit = (v) => (f.h ? formatBytes(v * 1024 * 1024 * 1024) : String(v * 1024 * 1024 * 1024));
      return [
        'Filesystem      Size  Used Avail Use% Mounted on',
        `/dev/sda1      ${unit(64)}  ${unit(used)} ${unit(64 - used)}  ${Math.round((used / 64) * 100)}% /`,
        'tmpfs          2.0G  1.1M  2.0G   1% /dev/shm',
      ].join('\n') + '\n';
    },
  },

  /* ---------- text tools ---------- */

  grep: {
    desc: 'search for patterns in files',
    usage: 'grep [-inrvcwlE] pattern [file ...]',
    flags: [
      { flag: '-i', desc: 'ignore case' },
      { flag: '-v', desc: 'invert: print lines that do NOT match' },
      { flag: '-n', desc: 'print line numbers' },
      { flag: '-c', desc: 'print only a count of matching lines' },
      { flag: '-r', desc: 'search directories recursively' },
      { flag: '-l', desc: 'print only file names that match' },
      { flag: '-w', desc: 'match whole words only' },
      { flag: '-o', desc: 'print only the matching part of the line' },
      { flag: '-E', desc: 'extended regular expressions' },
    ],
    seeAlso: ['egrep', 'sed', 'awk', 'find'],
    fn: (args, stdin, ctx) => {
      const f = parseFlags(args);
      if (!f._.length) throw new ShError('usage: grep [OPTION]... PATTERNS [FILE]...');
      const pattern = f._[0];
      const files = f._.slice(1);
      let re;
      try {
        re = new RegExp(f.w ? `\\b(?:${pattern})\\b` : pattern, f.i ? 'gi' : 'g');
      } catch (e) {
        throw new ShError(`grep: invalid regular expression: ${pattern}`);
      }
      let searchFiles = files;
      if (f.r) {
        searchFiles = [];
        for (const d of files.length ? files : ['.']) {
          const p = resolve(ctx, d);
          ctx.fs.walk(p, (node, path) => { if (node.type === 'file') searchFiles.push(path); });
        }
      }
      const sources = searchFiles.length
        ? searchFiles.map((p) => ({ name: p, text: ctx.fs.readFile(resolve(ctx, p), ctx.user) }))
        : [{ name: null, text: stdin }];
      const prefix = (name) => {
        if (!name) return '';
        if (!f.r && searchFiles.length <= 1) return '';
        const rel = name.startsWith(ctx.sh.cwd + '/') ? name.slice(ctx.sh.cwd.length + 1) : name;
        return rel + ':';
      };
      const result = [];
      for (const { name, text } of sources) {
        let count = 0;
        const matchedAny = lines(text).some((line) => { re.lastIndex = 0; return re.test(line); });
        if (f.l) { if (matchedAny) result.push(name || '(standard input)'); continue; }
        lines(text).forEach((line, i) => {
          re.lastIndex = 0;
          const hit = re.test(line);
          const keep = f.v ? !hit : hit;
          if (f.c) { if (hit) count++; return; }
          if (!keep) return;
          if (f.o) {
            re.lastIndex = 0;
            let m;
            while ((m = re.exec(line)) !== null) {
              result.push(prefix(name) + m[0]);
              if (m[0] === '') re.lastIndex++;
            }
            return;
          }
          const num = f.n ? String(i + 1) + ':' : '';
          result.push(prefix(name) + num + line);
        });
        if (f.c) result.push((searchFiles.length > 1 && name ? name + ':' : '') + count);
      }
      return result.length ? result.join('\n') + '\n' : '';
    },
  },

  sed: {
    desc: 'stream editor: search and replace text',
    usage: "sed [-n] [-i] [-e script] 's/pattern/replacement/flags' [file ...]",
    flags: [
      { flag: '-n', desc: 'suppress automatic printing' },
      { flag: '-i', desc: 'edit files in place' },
      { flag: '-e', desc: 'append a script command' },
    ],
    seeAlso: ['awk', 'grep', 'tr'],
    fn: (args, stdin, ctx) => {
      const f = parseFlags(args, ['e']);
      const scriptParts = [];
      if (f.e) scriptParts.push(...[].concat(f.e));
      const rest = f._;
      if (!f.e && rest.length && (/^(s.+\/|y.+\/|p$|d$|\/.+\/$|\d|\$)/.test(rest[0]) || rest.length > 1)) {
        scriptParts.push(rest.shift());
      }
      const script = scriptParts.join(';');
      if (!script) throw new ShError("sed: no script specified (try 'sed 's/a/b/' file)");
      const files = rest;
      const sources = inputsFor(ctx, files, stdin);
      const apply = (text) => {
        let outLines = lines(text);
        let printed = false;
        const cmds = script.split(';');
        const onlyPrint = cmds.every((c) => /^\s*(p|d|q)\s*$/.test(c) || /^\s*[0-9$]/.test(c));
        outLines = outLines.map((line, idx) => {
          const n = idx + 1;
          let keep = true;
          let result = line;
          for (const cmd of cmds) {
            const c = cmd.trim();
            if (!c) continue;
            const sMatch = /^s(.)(.*?[^\\])\1([gipn]*)$/.exec(c);
            if (sMatch) {
              const [, sep, bodyRaw, flagsStr] = sMatch;
              const parts = splitSedBody(bodyRaw, sep);
              const pattern = parts[0];
              const replacement = parts[1] === undefined ? '' : parts[1];
              const re = new RegExp(pattern, flagsStr.includes('g') ? 'g' : '');
              result = result.replace(re, replacement
                .replace(/\\n/g, '\n').replace(/\\t/g, '\t')
                .replace(/&/g, '$&').replace(/\\(\d)/g, '$$$1'));
              continue;
            }
            const yMatch = /^y(.)(.*?[^\\])\1$/.exec(c);
            if (yMatch) {
              const from = splitSedBody(yMatch[2], yMatch[1])[0];
              const to = splitSedBody(yMatch[2], yMatch[1])[1] || '';
              result = [...result].map((ch) => {
                const idx2 = from.indexOf(ch);
                return idx2 >= 0 ? (to[idx2] || '') : ch;
              }).join('');
              continue;
            }
            const addr = /^(\/.+\/|\d+|\$)(.*)$/.exec(c);
            if (addr) {
              const [, a, action] = addr;
              let selected = false;
              if (a === '$') selected = n === outLines.length;
              else if (/^\d+$/.test(a)) selected = n === Number(a);
              else selected = new RegExp(a.slice(1, -1)).test(result);
              if (!selected) continue;
              const act = action.trim();
              if (/^d$/.test(act)) keep = false;
              else if (/^p$/.test(act)) { if (f.n) result += ''; printed = true; outLines.splice(idx, 0, result); }
              else if (/^s\//.test(act)) {
                const m2 = /^s(.)(.*?[^\\])\1([gip]*)$/.exec(act);
                if (m2) result = result.replace(new RegExp(splitSedBody(m2[2], m2[1])[0], m2[3].includes('g') ? 'g' : ''), splitSedBody(m2[2], m2[1])[1] || '');
              }
              continue;
            }
            if (/^\d+d?$/.test(c)) { if (n === Number(c.replace('d', ''))) keep = false; continue; }
          }
          return keep ? result : null;
        }).filter((l) => l !== null);
        if (f.n && onlyPrint && !printed) return '';
        return outLines.join('\n') + '\n';
      };

      if (f.i && files.length) {
        for (const file of files) {
          const p = resolve(ctx, file);
          ctx.fs.writeFile(p, apply(ctx.fs.readFile(p, ctx.user)), { user: ctx.user });
        }
        return '';
      }
      return sources.map(({ text }) => apply(text)).join('');
    },
  },

  awk: {
    desc: 'pattern scanning and processing language',
    usage: "awk [-F sep] '{print $1}' [file ...]",
    flags: [{ flag: '-F', desc: 'field separator (default: whitespace)' }],
    notes: ['Supported in-game: {print}, patterns like /re/ or $3>100, BEGIN{} and END{}, and counters such as n++.'],
    fn: (args, stdin, ctx) => {
      const f = parseFlags(args, ['F']);
      if (!f._.length) throw new ShError('usage: awk [-F sep] program [file ...]');
      const program = f._[0];
      const sep = f.F === undefined ? ' ' : String(f.F);
      const inputs = inputsFor(ctx, f._.slice(1), stdin);
      return inputs.map(({ text }) => miniAwk(program, text, sep)).filter((s) => s !== '').join('\n') + '\n';
    },
  },

  cut: {
    desc: 'print selected parts of each line',
    usage: 'cut -d DELIM -f LIST [file ...]',
    flags: [
      { flag: '-d', desc: 'delimiter' },
      { flag: '-f', desc: 'field numbers, e.g. -f1,3 or -f2-' },
      { flag: '-c', desc: 'character positions' },
    ],
    fn: (args, stdin, ctx) => {
      const f = parseFlags(args, ['d', 'f', 'c']);
      const delim = f.d ?? '\t';
      const specs = String(f.f || f.c || '').split(',').filter(Boolean);
      return inputsFor(ctx, f._, stdin).map(({ text }) => lines(text).map((line) => {
        const parts = f.c ? [...line] : line.split(delim);
        const picked = [];
        for (const spec of specs) {
          if (/^\d+$/.test(spec)) { if (parts[Number(spec) - 1] !== undefined) picked.push(parts[spec - 1]); }
          else if (/^\d+-$/.test(spec)) { for (let i = Number(spec) - 1; i < parts.length; i++) picked.push(parts[i]); }
          else if (/^-\d+$/.test(spec)) { for (let i = 0; i < Number(spec); i++) picked.push(parts[i]); }
        }
        return picked.join(f.c ? '' : delim);
      }).join('\n') + '\n').join('');
    },
  },

  tr: {
    desc: 'translate or delete characters',
    usage: 'tr [-d] [-s] SET1 [SET2]',
    fn: (args, stdin, ctx) => {
      const f = parseFlags(args);
      const sets = f._;
      if (!sets.length) return stdin;
      const expandSet = (s) => {
        let out = '';
        for (let i = 0; i < s.length; i++) {
          if (s[i + 1] === '-' && s[i + 2] && s[i + 2] !== '\\') {
            for (let c = s.charCodeAt(i); c <= s.charCodeAt(i + 2); c++) out += String.fromCharCode(c);
            i += 2;
            continue;
          }
          out += s[i];
        }
        return out;
      };
      const [set1Raw, set2Raw] = sets;
      const set1 = expandSet(set1Raw);
      const set2 = set2Raw ? expandSet(set2Raw) : '';
      let out = '';
      for (const ch of stdin) {
        const i = set1.indexOf(ch);
        if (f.d) { if (i === -1) out += ch; continue; }
        if (f.s && i !== -1 && out.endsWith(ch)) continue;
        if (i === -1) out += ch;
        else if (set2) out += set2[Math.min(i, set2.length - 1)];
        else out += ch;
      }
      return out;
    },
  },

  sort: {
    desc: 'sort lines of text',
    usage: 'sort [-nru] [-k FIELD] [-t DELIM] [file ...]',
    flags: [
      { flag: '-n', desc: 'numeric sort' },
      { flag: '-r', desc: 'reverse order' },
      { flag: '-u', desc: 'unique lines only' },
      { flag: '-k', desc: 'sort by a field number' },
      { flag: '-t', desc: 'field separator' },
    ],
    fn: (args, stdin, ctx) => {
      const f = parseFlags(args, ['k', 't']);
      let data = inputsFor(ctx, f._, stdin).map(({ text }) => lines(text));
      if (f.k) {
        const keyNo = parseInt(String(f.k).replace(/^[^\d]*/, ''), 10) || 1;
        const delim = f.t ? String(f.t) : /\s+/;
        data = data.map((chunk) => chunk.map((line, i) => [line, i]).sort((a, b) => {
          const ga = a[0].split(delim)[keyNo - 1] ?? '';
          const gb = b[0].split(delim)[keyNo - 1] ?? '';
          const cmp = f.n ? (parseFloat(ga) || 0) - (parseFloat(gb) || 0) : ga.localeCompare(gb);
          return cmp || a[1] - b[1];
        }).map((p) => p[0]));
      } else {
        data = data.map((chunk) => chunk.map((line, i) => [line, i]).sort((a, b) => {
          const cmp = f.n ? (parseFloat(a[0]) || 0) - (parseFloat(b[0]) || 0) : a[0].localeCompare(b[0]);
          return cmp || a[1] - b[1];
        }).map((p) => p[0]));
      }
      let all = [].concat(...data);
      if (f.r) all.reverse();
      if (f.u) all = all.filter((l, i) => all.indexOf(l) === i);
      return all.join('\n') + (all.length ? '\n' : '');
    },
  },

  uniq: {
    desc: 'report or omit repeated adjacent lines',
    usage: 'uniq [-cdu] [file ...]',
    flags: [
      { flag: '-c', desc: 'count occurrences of each line' },
      { flag: '-d', desc: 'only show lines that appear more than once' },
      { flag: '-u', desc: 'only show lines that appear once' },
    ],
    fn: (args, stdin, ctx) => {
      const f = parseFlags(args);
      const data = lines(inputsFor(ctx, f._, stdin).map((i) => i.text).join(''));
      const out = [];
      let i = 0;
      while (i < data.length) {
        let j = i;
        while (j < data.length && data[j] === data[i]) j++;
        const count = j - i;
        const line = data[i];
        if (f.d && count < 2) { i = j; continue; }
        if (f.u && count > 1) { i = j; continue; }
        out.push(f.c ? String(count).padStart(7) + ' ' + line : line);
        i = j;
      }
      return out.join('\n') + (out.length ? '\n' : '');
    },
  },

  nl: {
    desc: 'number lines',
    usage: 'nl [file ...]',
    fn: (args, stdin, ctx) => inputsFor(ctx, parseFlags(args)._, stdin)
      .map(({ text }) => lines(text).map((l, i) => String(i + 1).padStart(6) + '\t' + l).join('\n') + '\n').join(''),
  },

  rev: {
    desc: 'reverse each line',
    usage: 'rev [file ...]',
    fn: (args, stdin, ctx) => inputsFor(ctx, parseFlags(args)._, stdin)
      .map(({ text }) => lines(text).map((l) => [...l].reverse().join('')).join('\n') + '\n').join(''),
  },

  tac: {
    desc: 'print lines in reverse order',
    usage: 'tac [file ...]',
    fn: (args, stdin, ctx) => inputsFor(ctx, parseFlags(args)._, stdin)
      .map(({ text }) => lines(text).reverse().join('\n') + '\n').join(''),
  },

  tee: {
    desc: 'copy stdin to files and to stdout',
    usage: 'tee [-a] file ...',
    fn: (args, stdin, ctx) => {
      const f = parseFlags(args);
      for (const file of f._) {
        ctx.fs.writeFile(resolve(ctx, file), stdin, { append: !!f.a, user: ctx.user });
      }
      return stdin;
    },
  },

  xargs: {
    desc: 'build and run commands from standard input',
    usage: 'xargs [-n N] [-I STR] [-P] command ...',
    fn: (args, stdin, ctx) => {
      const f = parseFlags(args, ['n', 'I', 'P']);
      const items = stdin.split(/\s+/).filter(Boolean);
      if (!items.length) return '';
      const cmdName = f._[0];
      if (!cmdName) throw new ShError('xargs: no command given');
      const entry = ctx.sh.resolveCommand(cmdName);
      if (!entry) throw new ShError(`xargs: ${cmdName}: command not found`, 127);
      const perCall = f.n ? parseInt(f.n, 10) : items.length;
      let out = '';
      for (let i = 0; i < items.length; i += perCall) {
        const batch = items.slice(i, i + perCall);
        const args = f._.slice(1).map((a) => (f.I ? a.split(f.I).join(batch.join(' ')) : a)).concat(f.I ? [] : batch);
        const res = entry.fn(args, '', { ...ctx, name: cmdName });
        const norm = typeof res === 'string' ? { out: res, err: '', code: 0 } : res;
        out += norm.out || '';
      }
      return out;
    },
  },

  paste: {
    desc: 'merge files line by line',
    usage: 'paste [-d DELIM] file ...',
    fn: (args, stdin, ctx) => {
      const f = parseFlags(args, ['d']);
      const delim = f.d ?? '\t';
      const chunks = inputsFor(ctx, f._, stdin).map(({ text }) => lines(text));
      const height = Math.max(...chunks.map((c) => c.length), 0);
      const out = [];
      for (let i = 0; i < height; i++) out.push(chunks.map((c) => c[i] ?? '').join(delim));
      return out.join('\n') + (out.length ? '\n' : '');
    },
  },

  column: {
    desc: 'align columns in a table',
    usage: 'column -t [file]',
    fn: (args, stdin, ctx) => {
      const f = parseFlags(args);
      const text = inputsFor(ctx, f._, stdin).map((i) => i.text).join('');
      const rows = lines(text).map((l) => l.split(/\s{2,}|\t/));
      return tabulate(rows, '  ') + '\n';
    },
  },

  diff: {
    desc: 'compare two files line by line',
    usage: 'diff [-u] file1 file2',
    flags: [{ flag: '-u', desc: 'unified output (closer to what git shows)' }],
    fn: (args, stdin, ctx) => {
      const f = parseFlags(args);
      if (f._.length < 2) throw new ShError('diff: need two files');
      const a = lines(ctx.fs.readFile(resolve(ctx, f._[0]), ctx.user));
      const b = lines(ctx.fs.readFile(resolve(ctx, f._[1]), ctx.user));
      const out = [];
      const max = Math.max(a.length, b.length);
      let diffs = 0;
      for (let i = 0; i < max; i++) {
        if (a[i] === b[i]) continue;
        diffs++;
        if (f.u) {
          out.push(`@@ -${i + 1},${Math.max(1, a.length - i)} +${i + 1},${Math.max(1, b.length - i)} @@`);
          if (a[i] !== undefined) out.push('-' + a[i]);
          if (b[i] !== undefined) out.push('+' + b[i]);
        } else {
          if (a[i] !== undefined) out.push(`${i + 1}c${i + 1}`);
          out.push(`< ${a[i] ?? ''}`);
          out.push(`---`);
          out.push(`> ${b[i] ?? ''}`);
        }
      }
      if (!diffs) return '';
      return out.join('\n') + '\n';
    },
  },

  /* ---------- finding things ---------- */

  find: {
    desc: 'search for files and directories',
    usage: 'find [path] [-name glob] [-type f|d] [-maxdepth N] [-size Nc] [-exec cmd {} \\;]',
    flags: [
      { flag: '-name', desc: 'name matches a glob (case sensitive)' },
      { flag: '-iname', desc: 'same, ignoring case' },
      { flag: '-type', desc: 'f (file) or d (directory)' },
      { flag: '-maxdepth', desc: 'how deep to descend' },
      { flag: '-size', desc: 'size in bytes with c, or 512-byte blocks with n' },
    ],
    seeAlso: ['locate', 'grep'],
    fn: (args, stdin, ctx) => {
      const argv = args.slice();
      const starts = [];
      while (argv.length && !argv[0].startsWith('-')) starts.push(argv.shift());
      const roots = starts.length ? starts : ['.'];
      const opts = { name: null, iname: null, type: null, maxdepth: Infinity, mindepth: 0, size: null, exec: null, user: null, empty: false };
      while (argv.length) {
        const t = argv.shift();
        const need = () => argv.shift();
        switch (t) {
          case '-name': opts.name = need(); break;
          case '-iname': opts.iname = need(); break;
          case '-type': opts.type = need(); break;
          case '-maxdepth': opts.maxdepth = parseInt(need(), 10); break;
          case '-mindepth': opts.mindepth = parseInt(need(), 10); break;
          case '-size': opts.size = need(); break;
          case '-user': opts.user = need(); break;
          case '-empty': opts.empty = true; break;
          case '-newer': need(); break;
          case '-exec': {
            const rest = [];
            while (argv.length && argv[0] !== ';') rest.push(argv.shift());
            argv.shift();
            opts.exec = rest;
            break;
          }
          case '-print': break;
          default: break;
        }
      }
      const rootAbs = resolve(ctx, roots[0]);
      const results = [];
      const nameRe = opts.name ? globToRegExp(opts.name) : null;
      const inameRe = opts.iname ? globToRegExp(opts.iname) : null;
      const sizeMatch = opts.size ? /^([<>]?)(\d+)([ckMGb]?)$/.exec(opts.size) : null;

      const visit = (path, depth) => {
        const node = ctx.fs.node(path);
        if (!node) return;
        const rel = path === ctx.sh.cwd ? '.' : path.replace(new RegExp('^' + ctx.sh.cwd + '/'), '');
        const depthOk = depth <= opts.maxdepth && depth >= opts.mindepth;
        let match = depthOk;
        if (match && opts.type && (opts.type === 'f') !== (node.type === 'file')) match = false;
        if (match && nameRe && !nameRe.test(node.name)) match = false;
        if (match && inameRe && !inameRe.test(node.name.toLowerCase())) match = false;
        if (match && opts.user && node.owner !== opts.user) match = false;
        if (match && opts.empty) {
          const emptyFile = node.type === 'file' && node.content.length === 0;
          const emptyDir = node.type === 'dir' && Object.keys(node.children).length === 0;
          if (!emptyFile && !emptyDir) match = false;
        }
        if (match && sizeMatch) {
          const [, cmp, num, unit] = sizeMatch;
          let bytes = ctx.fs.size(node);
          if (unit === 'k' || unit === 'M' || unit === 'G') bytes = num * (unit === 'k' ? 1024 : unit === 'M' ? 1048576 : 1073741824);
          else if (!unit) bytes = num * 512;
          if (cmp === '>') match = bytes > Number(num);
          if (cmp === '<') match = bytes < Number(num);
        }
        if (match) results.push({ path, display: rel, node });
        if (node.type === 'dir' && depth < opts.maxdepth) {
          for (const kid of Object.values(node.children)) visit(path + '/' + kid.name, depth + 1);
        }
      };
      for (const r of roots) visit(resolve(ctx, r), 0);

      if (opts.exec && opts.exec.length) {
        const [cmdName, ...rest] = opts.exec;
        const entry = ctx.sh.resolveCommand(cmdName.replace(/[{};\\]/g, ''));
        if (!entry) throw new ShError(`find: ${cmdName}: command not found`, 127);
        let out = '';
        for (const r of results) {
          const args = rest.map((a) => (a === '{}' ? r.path : a));
          const res = entry.fn(args, '', { ...ctx, name: cmdName });
          out += typeof res === 'string' ? res : (res.out || '');
        }
        return out;
      }
      return results.map((r) => r.display).join('\n') + (results.length ? '\n' : '');
    },
  },

  /* ---------- permissions & users ---------- */

  chmod: {
    desc: 'change file permissions',
    usage: 'chmod MODE file ...   (octal 755 or symbolic u+x,go-w)',
    fn: (args, stdin, ctx) => {
      const f = parseFlags(args);
      if (f._.length < 2) throw new ShError('chmod: missing operand');
      const spec = /^[0-7]{3,4}$/.test(f._[0]) ? parseInt(f._[0], 8) : f._[0];
      for (const file of f._.slice(1)) ctx.fs.chmod(resolve(ctx, file), spec);
      return '';
    },
  },

  chown: {
    desc: 'change file owner and group',
    usage: 'chown user[:group] file ...',
    fn: (args, stdin, ctx) => {
      const f = parseFlags(args);
      if (f._.length < 2) throw new ShError('chown: missing operand');
      for (const file of f._.slice(1)) ctx.fs.chown(resolve(ctx, file), f._[0]);
      return '';
    },
  },

  whoami: { desc: 'print the current user', usage: 'whoami', fn: (a, s, ctx) => ctx.user + '\n' },
  id: {
    desc: 'print user id, group id and groups',
    usage: 'id [user]',
    fn: (args, stdin, ctx) => {
      const user = args[0] || ctx.user;
      if (user !== 'player' && user !== 'root') return `id: '${user}': no such user\n`;
      const uid = user === 'root' ? 0 : 1000;
      return `uid=${uid}(${user}) gid=${uid}(${user}) groups=${uid}(${user}),100(users)\n`;
    },
  },
  groups: { desc: 'print the groups you belong to', usage: 'groups', fn: (a, s, ctx) => `${ctx.user} users admin\n` },
  hostname: { desc: 'print the machine name', usage: 'hostname', fn: (a, s, ctx) => (ctx.sh.env.HOSTNAME || 'zer0day-lab') + '\n' },

  sudo: {
    desc: 'run a command as another user (superuser)',
    usage: 'sudo [-S] command',
    flags: [{ flag: '-S', desc: 'read the password from standard input' }],
    notes: ['Real machines ask for your password before granting root. This lab does the same.'],
    fn: (args, stdin, ctx) => {
      const f = parseFlags(args);
      if (!f._.length) throw new ShError('usage: sudo [-S] command');
      const password = ctx.sh.pendingPassword || (f.S ? stdin.trim() : '');
      ctx.sh.pendingPassword = null;
      const vm = ctx.sh.vm;
      const correct = vm && vm.sudoPassword ? password === vm.sudoPassword : false;
      if (!correct) {
        if (!password) {
          return { err: '\u0000ASKPWD\u0000', code: 1 };
        }
        if (vm && vm.sudoPassword && ctx.sh.pendingPasswordAttempts !== true) {
          ctx.sh.pendingPasswordAttempts = true;
          return { err: 'Sorry, try again.\nsudo: 1 incorrect password attempt\n', code: 1 };
        }
        ctx.sh.pendingPasswordAttempts = false;
        return { err: 'sudo: 3 incorrect password attempts\n', code: 1 };
      }
      ctx.sh.pendingPasswordAttempts = false;
      ctx.sh.sudoActive = true;
      const name = f._[0];
      const entry = ctx.sh.resolveCommand(name);
      if (!entry) throw new ShError(`sudo: ${name}: command not found`, 127);
      const oldUser = ctx.user;
      const oldGroups = ctx.groups;
      ctx.user = 'root';
      ctx.groups = ['root'];
      let res;
      try {
        res = entry.fn(f._.slice(1), stdin, { ...ctx, user: 'root', groups: ['root'], name });
      } finally {
        ctx.user = oldUser;
        ctx.groups = oldGroups;
        ctx.sh.sudoActive = false;
      }
      const norm = typeof res === 'string' ? { out: res } : res;
      return norm;
    },
  },

  su: {
    desc: 'switch user',
    usage: 'su [-] [user]',
    fn: (args, stdin, ctx) => {
      const target = args[args.length - 1] || 'root';
      const vm = ctx.sh.vm;
      const password = ctx.sh.pendingPassword;
      ctx.sh.pendingPassword = null;
      if (target === 'root') {
        if (!vm || !vm.sudoPassword) throw new ShError('su: Authentication failure', 1);
        if (!password) return { err: '\u0000ASKPWD\u0000', code: 1 };
        if (password !== vm.sudoPassword) throw new ShError('su: Authentication failure', 1);
      }
      ctx.sh.user = target;
      ctx.sh.home = target === 'root' ? '/root' : `/home/${target}`;
      return '';
    },
  },

  passwd: { desc: 'change your password', usage: 'passwd', fn: () => 'passwd: password updated successfully\n' },

  /* ---------- environment & meta ---------- */

  echo: {
    desc: 'print arguments',
    usage: 'echo [-n] [-e] text ...',
    flags: [
      { flag: '-n', desc: 'do not print the trailing newline' },
      { flag: '-e', desc: 'interpret backslash escapes' },
    ],
    fn: (args) => {
      const f = parseFlags(args);
      let text = f._.join(' ');
      if (f.e) text = text.replace(/\\n/g, '\n').replace(/\\t/g, '\t').replace(/\\r/g, '\r');
      return f.n ? text : text + '\n';
    },
  },

  printf: {
    desc: 'format and print data',
    usage: "printf 'format' arguments ...",
    fn: (args) => {
      if (!args.length) return '';
      const fmt = args[0].replace(/\\n/g, '\n').replace(/\\t/g, '\t').replace(/\\\\/g, '\\');
      let i = 1;
      const out = fmt.replace(/%[-0-9.]*[sdifx%]/g, (m) => {
        if (m.endsWith('%')) return '%';
        const v = args[i++] ?? '';
        if (m.endsWith('d') || m.endsWith('i')) return String(Math.trunc(evalArithmetic(String(v), {})));
        if (m.endsWith('f')) return String(evalArithmetic(String(v), {}));
        if (m.endsWith('x')) return evalArithmetic(String(v), {}).toString(16);
        return String(v);
      });
      return out;
    },
  },

  env: {
    desc: 'print the environment',
    usage: 'env',
    fn: (args, stdin, ctx) => Object.keys(ctx.sh.env).sort().map((k) => `${k}=${ctx.sh.env[k]}`).join('\n') + '\n',
  },

  export: {
    desc: 'put a variable into the environment for child commands',
    usage: 'export NAME=value',
    fn: (args, stdin, ctx) => {
      for (const a of args) {
        const [k, v] = a.split('=');
        if (v !== undefined) ctx.sh.env[k] = v;
        else if (!(k in ctx.sh.env)) ctx.sh.env[k] = '';
      }
      return '';
    },
  },

  unset: {
    desc: 'remove a variable',
    usage: 'unset NAME',
    fn: (args, stdin, ctx) => { for (const a of args) delete ctx.sh.env[a]; return ''; },
  },

  set: {
    desc: 'show variables, or run with -e / -u options',
    usage: 'set',
    fn: (args, stdin, ctx) => Object.keys(ctx.sh.env).sort().map((k) => `${k}=${ctx.sh.env[k]}`).join('\n') + '\n',
  },

  which: {
    desc: 'show where a command lives',
    usage: 'which command',
    fn: (args, stdin, ctx) => {
      const out = [];
      for (const name of args) {
        const entry = ctx.sh.resolveCommand(name);
        if (entry) out.push(`/usr/bin/${name}`);
        else return `${name}: command not found\n`;
      }
      return out.join('\n') + '\n';
    },
  },

  type: {
    desc: 'describe how a name would be interpreted',
    usage: 'type command',
    fn: (args, stdin, ctx) => {
      const out = [];
      for (const name of args) {
        if (ctx.sh.aliases[name]) out.push(`${name} is aliased to \`${ctx.sh.aliases[name]}'`);
        else if (ctx.sh.resolveCommand(name)) out.push(`${name} is ${ctx.sh.kind === 'bash' ? 'a shell builtin' : 'a command'}`);
        else out.push(`bash: ${name}: not found`);
      }
      return out.join('\n') + '\n';
    },
  },

  alias: {
    desc: 'define a shortcut for a command',
    usage: "alias name='command'",
    fn: (args, stdin, ctx) => {
      if (!args.length) {
        return Object.entries(ctx.sh.aliases).map(([k, v]) => `alias ${k}='${v}'`).join('\n') + '\n';
      }
      for (const a of args) {
        const m = /^(\w+)=(.*)$/.exec(a);
        if (m) ctx.sh.aliases[m[1]] = m[2].replace(/^['"]|['"]$/g, '');
      }
      return '';
    },
  },

  unalias: { desc: 'remove an alias', usage: 'unalias name', fn: (args, stdin, ctx) => { for (const a of args) delete ctx.sh.aliases[a]; return ''; } },

  history: {
    desc: 'show command history',
    usage: 'history [-c]',
    fn: (args, stdin, ctx) => {
      if (parseFlags(args).c) { ctx.sh.history = []; return ''; }
      return ctx.sh.history.map((h, i) => String(i + 1).padStart(5) + '  ' + h).join('\n') + '\n';
    },
  },

  clear: { desc: 'clear the screen', usage: 'clear', fn: () => '\u0000CLEAR\u0000' },
  exit: {
    desc: 'close the shell (or log out of a remote machine)',
    usage: 'exit',
    fn: (args, stdin, ctx) => {
      if (ctx.sh.hostStack && ctx.sh.hostStack.length) {
        const prev = ctx.sh.hostStack.pop();
        ctx.sh.fs = prev.fs;
        ctx.sh.hostName = prev.hostName;
        ctx.sh.user = prev.user || ctx.sh.user;
        ctx.sh.home = prev.home || ctx.sh.home;
        if (ctx.sh.setCwd) ctx.sh.setCwd(prev.cwd); else ctx.sh.cwd = prev.cwd;
        ctx.sh.env.HOSTNAME = prev.hostName || 'zer0day-lab';
        return `Connection to ${prev.hostName || 'host'} closed.\n`;
      }
      return '\u0000EXIT\u0000';
    },
  },
  date: {
    desc: 'print the current date and time',
    usage: 'date',
    fn: () => new Date().toString() + '\n',
  },
  uname: {
    desc: 'print system information',
    usage: 'uname [-a]',
    fn: (args) => (parseFlags(args).a
      ? 'Linux zer0day-lab 6.1.0-zer0day x86_64 GNU/Linux\n'
      : 'Linux\n'),
  },
  seq: {
    desc: 'print a sequence of numbers',
    usage: 'seq [first] last',
    fn: (args) => {
      const nums = args.map(Number);
      const [start, step, end] = nums.length === 1 ? [1, 1, nums[0]] : nums.length === 2 ? [nums[0], 1, nums[1]] : nums;
      const out = [];
      if (![start, step, end].every((n) => !Number.isNaN(n))) throw new ShError('seq: invalid number');
      if (step === 0) throw new ShError('seq: step must not be zero');
      for (let v = start; step > 0 ? v <= end : v >= end; v += step) out.push(String(v));
      return out.join('\n') + (out.length ? '\n' : '');
    },
  },
  sleep: {
    desc: 'wait for N seconds',
    usage: 'sleep N',
    notes: ['The lab fast-forwards time so you never wait for real seconds.'],
    fn: (args) => '',
  },
  yes: {
    desc: 'repeat a string until interrupted',
    usage: 'yes [string]',
    notes: ['Kept short on purpose: output is capped so it cannot flood the screen.'],
    fn: (args) => (args.join(' ') || 'y').toString().repeat(1) + '\n(y would repeat forever — nice job not piping this into a file)\n',
  },
  sleepcmd: { hidden: true },

  /* ---------- tests, pipes, misc ---------- */

  test: {
    desc: 'evaluate a condition',
    usage: 'test expression   (also available as [ ... ])',
    fn: (args) => {
      const code = evalTest(args);
      return { out: '', code: code ? 0 : 1 };
    },
  },

  '[': {
    desc: 'evaluate a condition',
    usage: '[ expression ]',
    fn: (args) => {
      const code = evalTest(args);
      return { out: '', code: code ? 0 : 1 };
    },
  },

  '[[': {
    desc: 'evaluate a condition (bash style)',
    usage: '[[ expression ]]',
    fn: (args) => {
      const code = evalTest(args);
      return { out: '', code: code ? 0 : 1 };
    },
  },

  true: { desc: 'do nothing, successfully', usage: 'true', fn: () => ({ code: 0 }) },
  false: { desc: 'do nothing, unsuccessfully', usage: 'false', fn: () => ({ code: 1 }) },

  /* ---------- processes ---------- */

  ps: {
    desc: 'report a snapshot of current processes',
    usage: 'ps [aux]',
    fn: (args, stdin, ctx) => {
      const f = parseFlags(args);
      const vm = ctx.sh.vm;
      const procs = (vm && vm.processes) || [
        { pid: 1, user: 'root', cpu: 0.0, mem: 0.1, cmd: '/sbin/init' },
        { pid: 412, user: 'root', cpu: 0.0, mem: 0.4, cmd: '/usr/sbin/sshd -D' },
        { pid: 884, user: 'player', cpu: 0.3, mem: 2.1, cmd: 'bash' },
        { pid: 901, user: 'player', cpu: 0.0, mem: 1.2, cmd: 'code' },
        { pid: 1177, user: 'player', cpu: 1.4, mem: 4.8, cmd: 'firefox --new-window' },
      ].filter((p) => !(vm && vm.killedPids || []).includes(p.pid));
      if (f.a || f.e || f.ef) {
        const rows = [['USER', 'PID', '%CPU', '%MEM', 'COMMAND']];
        for (const p of procs) rows.push([p.user, String(p.pid), p.cpu.toFixed(1), p.mem.toFixed(1), p.cmd]);
        return tabulate(rows) + '\n';
      }
      const rows = [['PID', 'TTY', 'TIME', 'CMD']];
      for (const p of procs) rows.push([String(p.pid), 'pts/0', '0:00', p.cmd]);
      return tabulate(rows) + '\n';
    },
  },

  top: {
    desc: 'display running tasks (one snapshot in the lab)',
    usage: 'top [-b -n 1]',
    fn: (args, stdin, ctx) => BASH_COMMANDS.ps.fn(['aux'], '', ctx),
  },

  kill: {
    desc: 'send a signal to a process',
    usage: 'kill [-9] PID',
    fn: (args, stdin, ctx) => {
      const f = parseFlags(args);
      const vm = ctx.sh.vm;
      if (!vm) return '';
      if (f.l) { vm.killedPids = vm.killedPids || []; return ''; }
      const pids = (f._.length ? f._ : []).filter((a) => /^\d+$/.test(a)).map(Number);
      if (!pids.length) throw new ShError('kill: not enough arguments');
      for (const pid of pids) {
        vm.killedPids = vm.killedPids || [];
        if (vm.killedPids.includes(pid)) continue;
        vm.killedPids.push(pid);
      }
      return '';
    },
  },

  jobs: { desc: 'list background jobs', usage: 'jobs', fn: () => '' },

  crontab: {
    desc: 'install or show scheduled (cron) jobs',
    usage: 'crontab FILE   |   crontab -l',
    flags: [
      { flag: '-l', desc: 'list the current cron jobs' },
      { flag: '-e', desc: 'edit the crontab (use `crontab FILE` in this lab)' },
    ],
    notes: ['Format: minute hour day-of-month month day-of-week command'],
    fn: (args, stdin, ctx) => {
      const vm = ctx.sh.vm || (ctx.sh.vm = {});
      vm.cron = vm.cron || [];
      if (args.includes('-l')) {
        if (!vm.cron.length) return `no crontab for ${ctx.user}\n`;
        return '# installed with `crontab FILE`\n' + vm.cron.join('\n') + '\n';
      }
      if (args.includes('-e')) {
        return [
          'In a real machine this opens your editor. Here, do it the scripted way:',
          '  echo \'0 3 * * * cp -r /home/player/reports /home/player/backup\' > backup.cron',
          '  crontab backup.cron',
          '  crontab -l',
        ].join('\n') + '\n';
      }
      const file = args.find((a) => !a.startsWith('-'));
      if (!file) return 'crontab: usage: crontab FILE | crontab -l\n';
      const body = ctx.fs.readFile(resolve(ctx, file), ctx.user);
      vm.cron = lines(body).filter((l) => l.trim() && !l.trim().startsWith('#'));
      return 'crontab installed. Use `crontab -l` to check.\n';
    },
  },

  uptime: {
    desc: 'how long the machine has been up',
    usage: 'uptime',
    fn: () => ` ${new Date().toTimeString().slice(0, 8)} up 3 days,  4:11,  1 user,  load average: 0.14, 0.09, 0.06\n`,
  },

  free: {
    desc: 'show memory usage',
    usage: 'free -h',
    fn: () => [
      '              total        used        free      shared  buff/cache   available',
      'Mem:           7.7Gi       2.1Gi       4.4Gi       312Mi       1.2Gi       5.3Gi',
      'Swap:          2.0Gi          0B       2.0Gi',
    ].join('\n') + '\n',
  },

  systemctl: {
    desc: 'control system services',
    usage: 'systemctl [status|start|stop|restart|enable] service',
    fn: (args) => {
      const action = args[0] || 'status';
      const service = args[1] || 'sshd';
      const vm = ctx_serviceVm();
      return `Unit ${service}.service could not be found (the lab only simulates services).\n`;
    },
  },

  /* ---------- archives, encoding, crypto ---------- */

  tar: {
    desc: 'create or extract an archive',
    usage: 'tar [-c|-x] [-z] [-f] file archive',
    notes: ['Inside this simulation an archive is a JSON manifest — the goal is the habit, not the format.'],
    fn: (args, stdin, ctx) => {
      const f = parseFlags(args, ['f', 'C']);
      const archive = f.f;
      const creating = args.includes('-c') || f.c;
      const extracting = args.includes('-x') || f.x;
      const files = f._;
      if (creating) {
        const tree = {};
        for (const file of files) {
          const p = resolve(ctx, file);
          ctx.fs.walk(p, (node, path) => {
            const rel = path.replace(new RegExp('^' + ctx.sh.cwd + '/?'), '');
            if (node.type === 'file') tree[rel] = node.content;
            else tree[rel + '/'] = true;
          });
        }
        if (!archive) throw new ShError('tar: no archive file given (try -f out.tar)');
        ctx.fs.writeFile(resolve(ctx, archive), JSON.stringify({ kind: 'sim-archive', files: tree }, null, 0), { user: ctx.user });
        return '';
      }
      if (extracting) {
        if (!archive) throw new ShError('tar: no archive file given');
        const data = JSON.parse(ctx.fs.readFile(resolve(ctx, archive), ctx.user));
        const dest = f.C ? resolve(ctx, f.C) : (files[0] ? resolve(ctx, files[0]) : ctx.sh.cwd);
        for (const [rel, content] of Object.entries(data.files)) {
          const target = dest === '/' ? '/' + rel : dest + '/' + rel;
          if (content === true) { ctx.fs.mkdir(target, { recursive: true, user: ctx.user }); continue; }
          ctx.fs.writeFile(target, content, { user: ctx.user });
        }
        return '';
      }
      throw new ShError('tar: you must specify one of -c or -x');
    },
  },

  base64: {
    desc: 'base64 encode or decode',
    usage: 'base64 [-d] [file ...]',
    fn: (args, stdin, ctx) => {
      const f = parseFlags(args);
      const data = inputsFor(ctx, f._, stdin).map((i) => i.text).join('');
      if (f.d) {
        try { return bytesToString(base64Decode(data.trim())); }
        catch { throw new ShError('base64: invalid input'); }
      }
      return base64Encode(data) + '\n';
    },
  },

  md5sum: { desc: 'compute the MD5 checksum of a file (or standard input)', usage: 'md5sum file ...', fn: (a, s, ctx) => checksums('md5', a, ctx, s) },
  sha1sum: { desc: 'compute the SHA-1 checksum of a file (or standard input)', usage: 'sha1sum file ...', fn: (a, s, ctx) => checksums('sha1', a, ctx, s) },
  sha256sum: { desc: 'compute the SHA-256 checksum of a file (or standard input)', usage: 'sha256sum file ...', fn: (a, s, ctx) => checksums('sha256', a, ctx, s) },

  xxd: {
    desc: 'hex dump a file',
    usage: 'xxd file',
    fn: (args, stdin, ctx) => {
      const f = parseFlags(args);
      const text = inputsFor(ctx, f._, stdin).map((i) => i.text).join('');
      const bytes = new TextEncoder().encode(text);
      const rows = [];
      for (let i = 0; i < bytes.length; i += 16) {
        const chunk = [...bytes.slice(i, i + 16)];
        const hex = chunk.map((b) => b.toString(16).padStart(2, '0')).join(' ');
        const ascii = chunk.map((b) => (b >= 32 && b < 127 ? String.fromCharCode(b) : '.')).join('');
        rows.push(`${i.toString(16).padStart(8, '0')}: ${hex.padEnd(47, ' ')} ${ascii}`);
      }
      return rows.join('\n') + '\n';
    },
  },

  openssl: {
    desc: 'cryptographic toolkit (subset)',
    usage: 'openssl dgst -sha256 file',
    fn: (args, stdin, ctx) => {
      const f = parseFlags(args, ['sha256', 'sha1', 'md5', 'binary', 'hex']);
      const algo = args.find((a) => a.startsWith('-') && a !== '-binary' && a !== '-hex' && a !== '-noout');
      const name = algo ? algo.slice(1) : 'sha256';
      const files = args.filter((a) => !a.startsWith('-'));
      if (!files.length) return hashAny(name, stdin) + '\n';
      return files.map((file) => {
        const digest = hashAny(name, ctx.fs.readFile(resolve(ctx, file), ctx.user));
        return `${name.toUpperCase()}(${file})= ${digest}`;
      }).join('\n') + '\n';
    },
  },

  /* ---------- package management ---------- */

  apt: { desc: 'Debian package manager (simulated)', usage: 'apt install package', fn: (a, s, ctx) => aptInstall(a, ctx) },
  aptget: { hidden: true },
  'apt-get': { desc: 'Debian package manager (simulated)', usage: 'apt-get install -y package', fn: (a, s, ctx) => aptInstall(a, ctx) },
  pip: { desc: 'Python package installer (simulated)', usage: 'pip install package', fn: (a, s, ctx) => aptInstall(a.slice(1), ctx) },
  brew: { desc: 'macOS/Linux package manager (simulated)', usage: 'brew install package', fn: (a, s, ctx) => aptInstall(a.slice(1), ctx) },

  /* ---------- editors (simulated) ---------- */

  nano: {
    desc: 'open a small text editor',
    usage: 'nano file',
    notes: ['This is a game terminal: edit files with `echo text > file`, `cat > file << EOF`, or the `edit` helper below.'],
    fn: (args, stdin, ctx) => {
      const file = args[0];
      if (!file) throw new ShError('nano: missing filename');
      const p = resolve(ctx, file);
      const exists = ctx.fs.exists(p);
      return [
        `GNU nano ${exists ? ctx.fs.readFile(p, ctx.user).split('\n').length : 0} lines`,
        exists ? ctx.fs.readFile(p, ctx.user) : '(new buffer)',
        '',
        'In this terminal, use these instead:',
        `  echo "your text" > ${file}`,
        `  printf 'line1\\nline2\\n' > ${file}`,
        `  cat ${file} >> ${file}      # append`,
      ].join('\n') + '\n';
    },
  },

  vi: { desc: 'visual editor (simulated)', usage: 'vi file', fn: (...a) => BASH_COMMANDS.nano.fn(a[0], a[1], a[2]) },
  vim: { desc: 'visual editor (simulated)', usage: 'vim file', fn: (...a) => BASH_COMMANDS.nano.fn(a[0], a[1], a[2]) },
  code: { desc: 'open the source (simulated)', usage: 'code file', fn: () => 'Opening file in the in-game editor...\nUse `cat` to read it, `echo ... > file` to write it.\n' },

  /* ---------- help ---------- */

  help: {
    desc: 'list the commands this shell knows',
    usage: 'help [command]',
    fn: (args, stdin, ctx) => {
      const cmds = ctx.sh.listCommands();
      const width = Math.max(...cmds.map(([n]) => n.length)) + 2;
      const columns = Math.max(1, Math.floor((ctx.cols || 80) / (width + 1)));
      const rows = [];
      for (let i = 0; i < cmds.length; i += columns) {
        const chunk = cmds.slice(i, i + columns);
        rows.push(chunk.map(([n]) => pad(n, width)).join('').replace(/\s+$/, ''));
      }
      return `Available commands (${cmds.length}):\n\n` + rows.join('\n') + '\n\nType `man <command>` for details, or `help <command>`.\n';
    },
  },

  man: {
    desc: 'show the manual page for a command',
    usage: 'man command',
    fn: (args, stdin, ctx) => {
      if (!args.length) return 'What manual page do you want?\n';
      const page = ctx.sh.manPage(args[0]);
      return page || `No manual entry for ${args[0]}\n`;
    },
  },

  neofetch: {
    desc: 'print system info with a little ASCII art',
    usage: 'neofetch',
    fn: (args, stdin, ctx) => {
      const art = [
        '        .--.       ',
        '       |o_o |      ',
        '       |:_/ |      ',
        '      //   \\ \\     ',
        '     (|     | )    ',
        "    /'\\_   _/`\\    ",
        '    \\___)=(___/    ',
      ];
      const info = [
        'player@zer0day-lab',
        '--------------------',
        'OS: ZeroDay Linux 6.1 x86_64',
        'Host: ZeroDay Training Lab',
        'Shell: bash 5.2',
        'Resolution: 80x24',
        'Terminal: web-serial',
        'CPU: Virtual (1) @ 3.00GHz',
        'Memory: 742MiB / 8192MiB',
      ];
      const rows = Math.max(art.length, info.length);
      const out = [];
      for (let i = 0; i < rows; i++) out.push((art[i] || ' '.repeat(17)) + '  ' + (info[i] || ''));
      return out.join('\n') + '\n';
    },
  },

  cowsay: {
    desc: 'a cow says something',
    usage: 'cowsay text',
    fn: (args) => {
      const text = args.join(' ') || 'moo';
      const w = text.length + 4;
      return [
        ' ' + '_'.repeat(w),
        '< ' + text + ' >',
        ' ' + '-'.repeat(w),
        '        \\   ^__^',
        '         \\  (oo)\\_______',
        '            (__)\\       )\\/\\',
        '                ||----w |',
        '                ||     ||',
      ].join('\n') + '\n';
    },
  },

  matrix: { desc: 'wake up, agent', usage: 'matrix', fn: () => 'There is no spoon. Try `ls /` instead.\n' },

  python3: {
    desc: 'run a Python script',
    usage: 'python3 script.py',
    fn: (args, stdin, ctx) => {
      return [
        'This training world ships a JavaScript engine for the Code Lab, so there is no Python here.',
        'The algorithms you practise in the Code Lab are the same in Python: loops, conditions,',
        'functions, lists and strings. See the Code Lab tab to write and test real code.',
        '',
      ].join('\n');
    },
  },

  gcc: { desc: 'the C compiler (simulated)', usage: 'gcc file.c', fn: () => 'gcc is not installed in this lab. The Code Lab runs JavaScript in your browser — same ideas, zero setup.\n' },
};

/* ---------------- helper implementations ---------------- */

function ctx_serviceVm() { return null; }

function checksums(algo, args, ctx, stdin = '') {
  const f = parseFlags(args);
  if (!f._.length) return `${hashAny(algo, stdin)}  -\n`;
  return f._.map((file) => {
    const text = ctx.fs.readFile(resolve(ctx, file), ctx.user);
    return `${hashAny(algo, text)}  ${file}`;
  }).join('\n') + '\n';
}

const PACKAGES = {
  nmap: 'nmap is already the tool of the hour — run `nmap` to see it appear.',
  python3: 'Already available (the Code Lab uses JavaScript instead).',
  git: 'git is available on your own machine; in the lab it is only a story.',
  curl: 'curl is built in.',
  jq: 'jq is pre-installed.',
  vim: 'vim is pre-installed (use nano instead, it is friendlier).',
};

function aptInstall(args, ctx) {
  const f = parseFlags(args);
  const names = f._.filter((a) => !a.startsWith('-'));
  if (!names.length) throw new ShError('apt: no packages specified');
  const linesOut = [];
  for (const name of names) {
    const pkg = name.toLowerCase();
    if (PACKAGES[pkg]) { linesOut.push(PACKAGES[pkg]); continue; }
    ctx.sh.installedPackages = ctx.sh.installedPackages || new Set();
    ctx.sh.installedPackages.add(pkg);
    linesOut.push(`Setting up ${pkg} ...`);
    linesOut.push(`Processing triggers for man-db ...`);
  }
  return linesOut.join('\n') + '\n';
}

function splitSedBody(body, sep) {
  const out = [];
  let cur = '';
  let escaped = false;
  for (const c of body) {
    if (escaped) { cur += '\\' + c; escaped = false; continue; }
    if (c === '\\') { escaped = true; continue; }
    if (c === sep) { out.push(cur); cur = ''; continue; }
    cur += c;
  }
  out.push(cur);
  return out;
}

function evalTest(args) {
  const list = args.slice();
  if (list[list.length - 1] === ']') list.pop();
  // handle && and || inside [ ]
  const flat = list;
  for (let i = 0; i < flat.length - 1; i++) {
    if (flat[i] === '-a' || flat[i] === '&&') {
      const left = evalSimpleTest(flat.slice(0, i));
      const right = evalSimpleTest(flat.slice(i + 1).filter((x, idx, a) => !(x === '-a' && a.indexOf(x) === idx)));
      return left && right;
    }
  }
  return evalSimpleTest(flat);
}

function evalSimpleTest(tokens) {
  if (!tokens.length) return false;
  if (tokens.length === 2 && tokens[0] === '!') return !evalSimpleTest(tokens.slice(1));
  if (tokens.length === 3) {
    const [a, op, b] = tokens;
    switch (op) {
      case '=': case '==': return a === b;
      case '!=': return a !== b;
      case '-eq': return Number(a) === Number(b);
      case '-ne': return Number(a) !== Number(b);
      case '-lt': return Number(a) < Number(b);
      case '-le': return Number(a) <= Number(b);
      case '-gt': return Number(a) > Number(b);
      case '-ge': return Number(a) >= Number(b);
      default: return false;
    }
  }
  const t = tokens[0];
  if (tokens.length === 1) return t.length > 0;
  switch (t) {
    case '-e': case '-f': case '-d': case '-r': case '-w': case '-x': case '-s': case '-L': {
      const path = toUnixPath(tokens[1]);
      const fs = evalTest.fs;
      void fs;
      const node = evalTest.vfs ? evalTest.vfs.node(path.startsWith('/') ? path : joinPath(evalTest.cwd, path)) : null;
      if (!node) return false;
      switch (t) {
        case '-e': return true;
        case '-f': return node.type === 'file';
        case '-d': return node.type === 'dir';
        case '-r': return evalTest.vfs.can(node, 'read', evalTest.user);
        case '-w': return evalTest.vfs.can(node, 'write', evalTest.user);
        case '-x': return (node.mode & 0o111) !== 0;
        case '-s': return node.type === 'file' && node.content.length > 0;
        case '-L': return !!node.isLink;
        default: return false;
      }
    }
    default: return false;
  }
}

/* ---------------- the Bash shell class ---------------- */

export class BashShell extends Shell {
  constructor(opts) {
    super({ ...opts, kind: 'bash' });
    this.registry = { ...BASH_COMMANDS, ...networkCommands('bash') };
    this.home = opts.home || '/home/player';
    evalTest.vfs = this.fs;
    evalTest.cwd = this.cwd;
    evalTest.user = opts.user || 'player';
  }

  setCwd(p) { this.cwd = p; this.env.PWD = p; evalTest.cwd = p; }

  resolveCommand(name) {
    if (/^[./]/.test(name) || name.startsWith('~')) {
      const path = name.startsWith('~') ? joinPath('/home/player', name.slice(1) || '') : joinPath(this.cwd, name);
      const node = this.fs.node(path);
      if (node) {
        if (node.type === 'dir') return BASH_COMMANDS.ls;
        if (!(node.mode & 0o111)) {
          return { desc: 'run a script', fn: () => { throw new ShError(`bash: ${name}: Permission denied`, 126); } };
        }
        return {
          desc: 'execute a script file',
          fn: (args, stdin, ctx) => {
            const content = ctx.fs.readFile(path, ctx.user);
            const shebang = /^#!\s*(\S+)/.exec(content);
            if (shebang && !/bash|sh$/.test(shebang[1])) {
              throw new ShError(`bash: ${name}: ${shebang[1]}: bad interpreter: Permission denied`, 126);
            }
            const argv = args.length ? ' ' + args.map((a) => (/[\s"]/.test(a) ? `'${a}'` : a)).join(' ') : '';
            return runScript(ctx.sh, content + argv, stdin);
          },
        };
      }
    }
    return super.resolveCommand(name);
  }
}

export { evalTest, resolve };
export const helpers = { resolve, readInput, inputsFor, tabulate, miniAwk };