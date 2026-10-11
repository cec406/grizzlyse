/* =========================================================================
 * util.js — shell language toolkit
 * Lexer, parser, word expansion, globbing, path helpers, flag parsing.
 * Pure functions, no DOM. Runs in the browser and in Node (for tests).
 * ========================================================================= */

/* ---------- paths ------------------------------------------------------ */

/** Convert any path to the internal POSIX-ish form (single slash separators) */
export function toUnixPath(p) {
  return String(p).replace(/\\/g, '/').replace(/\/{2,}/g, '/');
}

/** "C:\\Users\\me" -> "/C:/Users/me" (the internal canonical form) */
export function unixFromWin(p) {
  let s = toUnixPath(p);
  const m = /^([A-Za-z]):\/?/.exec(s);
  if (m) s = '/' + m[1].toUpperCase() + ':/' + s.slice(m[0].length);
  return s;
}

/** "/C:/Users/me" -> "C:\\Users\\me" (what the Windows shells display) */
export function winFromUnix(p) {
  const s = toUnixPath(p);
  const m = /^\/([A-Za-z]):\/?(.*)$/.exec(s);
  if (m) return m[1].toUpperCase() + ':\\' + m[2].replace(/\//g, '\\');
  return s;
}

export function isWinPath(p) {
  return /^[A-Za-z]:[\\/]/.test(String(p)) || /^\/[A-Za-z]\//.test(String(p));
}

/** Collapse `.` and `..` segments. Always returns an absolute path. */
export function normalizeUnix(p) {
  const out = [];
  for (const seg of toUnixPath(p).split('/')) {
    if (!seg || seg === '.') continue;
    if (seg === '..') { out.pop(); continue; }
    out.push(seg);
  }
  return '/' + out.join('/');
}

/** Resolve `p` against `cwd` (handles ~, drive letters, relative paths). */
export function joinPath(cwd, p) {
  if (p === undefined || p === null || p === '') return normalizeUnix(cwd);
  const raw = String(p);
  if (raw === '~') return '/home/player';
  if (raw.startsWith('~/')) return normalizeUnix('/home/player/' + raw.slice(2));
  if (isWinPath(raw)) return normalizeUnix(unixFromWin(raw));
  if (raw.startsWith('/')) return normalizeUnix(raw);
  return normalizeUnix(cwd + '/' + raw);
}

export function dirname(p) {
  const n = normalizeUnix(p);
  const i = n.lastIndexOf('/');
  if (i <= 0) return '/';
  return n.slice(0, i);
}

export function basename(p, stripExt = false) {
  const n = toUnixPath(p).replace(/\/+$/, '');
  let b = n.slice(n.lastIndexOf('/') + 1);
  if (stripExt) b = b.replace(/\.[^.]+$/, '');
  return b;
}

export function extname(p) {
  const b = basename(p);
  const i = b.lastIndexOf('.');
  return i > 0 ? b.slice(i) : '';
}

/* ---------- globs ------------------------------------------------------ */

export function hasGlob(s) {
  return /[*?[]/.test(String(s));
}

export function globToRegExp(pat) {
  let re = '';
  for (let i = 0; i < pat.length; i++) {
    const c = pat[i];
    if (c === '*') {
      if (pat[i + 1] === '*') {
        re += '.*';
        i++;
        if (pat[i + 1] === '/') { re += '.*'; i++; }
      } else {
        re += '[^/]*';
      }
    } else if (c === '?') {
      re += '[^/]';
    } else if (c === '[') {
      let j = i + 1;
      let neg = false;
      if (pat[j] === '!' || pat[j] === '^') { neg = true; j++; }
      let cls = '';
      while (j < pat.length && pat[j] !== ']') {
        cls += pat[j] === '\\' ? '\\\\' : pat[j];
        j++;
      }
      if (pat[j] !== ']') { re += '\\['; }
      else { re += '[' + (neg ? '^' : '') + cls + ']'; i = j; }
    } else {
      re += c.replace(/[.+^${}()|\\]/g, '\\$&');
    }
  }
  return new RegExp('^' + re + '$');
}

/* ---------- lexer ------------------------------------------------------ */

const SUB = '\u0001';   // placeholder: command substitution
const VAR = '\u0002';   // placeholder: variable

/**
 * Tokenize a shell line.
 * options.escapes = false  →  backslash is a literal character (Windows style)
 * Returns tokens: {t:'word', v, quoted} | {t:'op', v} | {t:'sub', v, quoted}
 */
export function lex(src, options = {}) {
  const escapes = options.escapes !== false;
  const toks = [];
  let braceDepth = 0;          // PowerShell script blocks: { ... } keep their operators
  const s = String(src);
  const n = s.length;
  let i = 0;

  const readSub = (start) => {
    // start points at '('; returns [raw, nextIndex]
    let depth = 1;
    let j = start + 1;
    let out = '';
    while (j < n && depth > 0) {
      if (s[j] === '(') depth++;
      else if (s[j] === ')') { depth--; if (depth === 0) break; }
      out += s[j];
      j++;
    }
    return [out, j + 1];
  };

  while (i < n) {
    const c = s[i];
    if (/\s/.test(c)) { i++; continue; }

    /* ---- operators & redirections ---- */
    const two = s.slice(i, i + 2);
    if (two === '&&' || two === '||') { toks.push({ t: 'op', v: two }); i += 2; continue; }
    if (two === ';;') { toks.push({ t: 'op', v: ';' }); i += 2; continue; }
    if (c === '|' && s[i + 1] === '|') { toks.push({ t: 'op', v: '||' }); i += 2; continue; }
    if ((c === ';' || c === '|' || c === '&') && braceDepth === 0) { toks.push({ t: 'op', v: c }); i++; continue; }
    if (c === '{') { braceDepth++; }
    if (c === '}') { braceDepth = Math.max(0, braceDepth - 1); }

    // [fd]>> [fd]> [fd]>&1
    let j = i;
    while (j < n && /[0-9]/.test(s[j])) j++;
    if (s[j] === '>' && braceDepth === 0) {
      const num = s.slice(i, j);
      const fd = num || '';
      const mark = (v) => toks.push({ t: 'op', v: fd ? fd + v : v.replace(/^2/, '') });
      if (s[j + 1] === '>') { mark('>>'); i = j + 2; continue; }
      if (s[j + 1] === '&' && s[j + 2] === '1') { mark('>&1'); i = j + 3; continue; }
      if (s[j + 1] === '&' && s[j + 2] === '2') { mark('>&2'); i = j + 3; continue; }
      mark('>');
      i = j + 1;
      continue;
    }
    if (c === '<' && braceDepth === 0) {
      toks.push({ t: 'op', v: '0<' });
      i++;
      continue;
    }
    if (c === '`') {
      let j2 = i + 1;
      let out = '';
      while (j2 < n && s[j2] !== '`') { out += s[j2]; j2++; }
      toks.push({ t: 'sub', v: out, quoted: true });
      i = j2 + 1;
      continue;
    }

    /* ---- word ---- */
    let word = '';
    let quoted = false;
    while (i < n) {
      const ch = s[i];

      // stop characters
      if (braceDepth > 0) {
        if (ch === '{') braceDepth++;
        else if (ch === '}') braceDepth--;
      } else if (/\s/.test(ch) || ch === '|' || ch === ';' || ch === '&' || ch === '<' || ch === '`') break;
      if (ch === '{') braceDepth++;
      else if (ch === '}') braceDepth = Math.max(0, braceDepth - 1);
      if (ch === '>' ) break;
      if (/[0-9]/.test(ch) && s[i + 1] === '>' && braceDepth === 0) break;

      if (ch === '$' && s[i + 1] === '(') {
        const [raw, next] = readSub(i + 1);
        word += SUB + raw + '\u0000';
        i = next;
        continue;
      }
      if (ch === '`' ) {
        let j2 = i + 1;
        let out = '';
        while (j2 < n && s[j2] !== '`') { out += s[j2]; j2++; }
        word += SUB + out + '\u0000';
        i = j2 + 1;
        continue;
      }
      if (ch === '"' || ch === "'") {
        const q = ch;
        quoted = true;
        i++;
        const keep = braceDepth > 0;          // keep quotes inside { } script blocks
        if (keep) word += q;
        while (i < n && s[i] !== q) {
          if (q === '"' && s[i] === '\\' && i + 1 < n
              && '$`"\\\n'.includes(s[i + 1])) { word += s[i + 1]; i += 2; continue; }
          if (q === '"' && s[i] === '$' && s[i + 1] === '(') {
            const [raw, next] = readSub(i + 1);
            word += SUB + raw + '\u0000';
            i = next;
            continue;
          }
          if (q === '"' && s[i] === '$' && i + 1 < n) {
            const nx = s[i + 1];
            if (nx === '{') {
              let j3 = i + 2;
              let name = '';
              while (j3 < n && s[j3] !== '}') { name += s[j3]; j3++; }
              word += VAR + name + '\u0000';
              i = j3 + 1;
              continue;
            }
            if (/[A-Za-z_]/.test(nx)) {
              let j3 = i + 1;
              let name = '';
              while (j3 < n && /[A-Za-z0-9_]/.test(s[j3])) { name += s[j3]; j3++; }
              if (name === '_') { word += '$_'; i = j3; continue; }   // PowerShell's current item
              word += VAR + name + '\u0000';
              i = j3;
              continue;
            }
            if (/[0-9@?*#!$-]/.test(nx)) { word += VAR + nx + '\u0000'; i += 2; continue; }
          }
          word += s[i];
          i++;
        }
        if (keep) word += q;
        i++;
        continue;
      }
      if (ch === '\\' && escapes && i + 1 < n) { word += s[i + 1]; i += 2; continue; }
      if (ch === '$' && i + 1 < n) {
        const nx = s[i + 1];
        if (nx === '{') {
          let j3 = i + 2;
          let name = '';
          while (j3 < n && s[j3] !== '}') { name += s[j3]; j3++; }
          word += VAR + name + '\u0000';
          i = j3 + 1;
          continue;
        }
        if (/[A-Za-z_]/.test(nx)) {
          let j3 = i + 1;
          let name = '';
          while (j3 < n && /[A-Za-z0-9_]/.test(s[j3])) { name += s[j3]; j3++; }
          if (name === '_') { word += '$_'; i = j3; continue; }
          word += VAR + name + '\u0000';
          i = j3;
          continue;
        }
        if (/[0-9@?*#!$-]/.test(nx)) {
          word += VAR + nx + '\u0000';
          i += 2;
          continue;
        }
      }
      word += ch;
      i++;
    }
    toks.push({ t: 'word', v: word, quoted });
  }
  return toks;
}

/* ---------- parser ----------------------------------------------------- */

/**
 * Parse tokens into a script AST:
 * [ {op: null|'&&'|'||', pipeline: {cmds:[{words, redirs}]}} ]
 */
export function parseScript(toks) {
  const ast = [];
  let op = null;
  let pipeline = null;

  const ensure = () => {
    if (!pipeline) pipeline = { cmds: [] };
    if (!pipeline.cmds.length) pipeline.cmds.push({ words: [], redirs: [] });
    return pipeline;
  };
  const lastCmd = () => {
    ensure();
    return pipeline.cmds[pipeline.cmds.length - 1];
  };

  for (const tk of toks) {
    if (tk.t === 'op' && (tk.v === ';' || tk.v === '&')) {
      if (pipeline) { ast.push({ op, pipeline }); op = null; pipeline = null; }
      continue;
    }
    if (tk.t === 'op' && (tk.v === '&&' || tk.v === '||')) {
      if (pipeline) { ast.push({ op, pipeline }); op = tk.v; pipeline = null; }
      continue;
    }
    if (tk.t === 'op' && tk.v === '|') { ensure(); pipeline.cmds.push({ words: [], redirs: [] }); continue; }
    if (tk.t === 'op' && /^\d*(>>|>|<|>&1|>&2)$/.test(tk.v)) {
      lastCmd().redirs.push({ op: tk.v, target: null });
      continue;
    }
    if (tk.t === 'word' || tk.t === 'sub') {
      const cmd = lastCmd();
      const lastRedir = cmd.redirs[cmd.redirs.length - 1];
      if (lastRedir && lastRedir.target === null) { lastRedir.target = tk; continue; }
      cmd.words.push(tk);
    }
  }
  if (pipeline) ast.push({ op, pipeline });
  return ast;
}

/* ---------- word expansion -------------------------------------------- */

export const MARK = { SUB, VAR };

/**
 * Expand variables / substitutions in a word, and glob it when unquoted.
 * ctx = { env, cwd, expandSub(src) -> string, glob(pat) -> string[] }
 */
export function expandWord(word, quoted, ctx) {
  if (typeof word !== 'string') return word;
  // the lexer wraps substitutions and variables in \u0001 / \u0002 markers
  let out = String(word).replace(/[\u0001\u0002][^\u0000]*/g, (mark) => {
    const kind = mark.charAt(0);
    const body = mark.slice(1);
    if (kind === SUB) {
      // $(( arithmetic )) is not a command substitution
      if (body.startsWith('(') && body.endsWith(')')) {
        return ctx.arith ? String(ctx.arith(body.slice(1, -1))) : '';
      }
      return ctx.expandSub ? String(ctx.expandSub(body)) : '';
    }
    return ctx.envVar ? String(ctx.envVar(body)) : '';
  });
  out = out.replace(/\u0000/g, '');
  if (!quoted && hasGlob(out) && ctx.glob) {
    const matches = ctx.glob(out);
    if (matches.length) return matches;
  }
  if (!quoted && ctx.home) {
    if (out === '~') out = ctx.home;
    else if (out.startsWith('~/')) out = ctx.home + out.slice(1);
  }
  return out;
}

/** $(( 2 * (3 + 1) )) — small integer arithmetic with $variables */
export function evalArithmetic(expr, env = {}) {
  const src = String(expr).trim();
  if (!/^[\d\s$+\-*/%().#A-Za-z_{}|&^~]*$/.test(src)) return 0;
  let js = src
    .replace(/\$\{([^}]+)\}/g, (_, n) => String(Number(env[n] ?? 0)))
    .replace(/\b(\d+)#([0-9a-zA-Z]+)\b/g, (_, base, digits) => String(parseInt(digits, Number(base))))
    .replace(/\b0[xX]([0-9a-fA-F]+)\b/g, (_, h) => String(parseInt(h, 16)))
    .replace(/\b0[bB]([01]+)\b/g, (_, b) => String(parseInt(b, 2)))
    .replace(/\b0(\d+)\b/g, (_, o) => String(parseInt(o, 8)))
    .replace(/\$([A-Za-z_]\w*)/g, (_, n) => String(Number(env[n] ?? 0)))
    .replace(/\b([A-Za-z_]\w*)\b/g, (m) => (m in env ? String(Number(env[m])) : '0'));
  try {
    const value = Function(`"use strict"; return (${js});`)();
    return Number.isFinite(value) ? Math.trunc(value) : 0;
  } catch {
    return 0;
  }
}

/** Which parts of a word were quoted (so we can glob-join safely). */
export function wordHasGlobOnly(text) {
  return hasGlob(text);
}

/* ---------- flag parsing ---------------------------------------------- */

/**
 * Parse clustered short flags: -la  -> {l:true, a:true}
 * Flags with values: -n5, -n 5, --ignore-case
 */
export function parseFlags(args, valued = []) {
  const flags = { _: [] };
  let i = 0;
  for (; i < args.length; i++) {
    const a = args[i];
    if (a === '--') { flags._.push(...args.slice(i + 1)); break; }
    if (a.startsWith('--')) {
      const [k, v] = a.slice(2).split('=');
      flags[k] = v === undefined ? true : v;
      continue;
    }
    if (a.length > 1 && a[0] === '-' && !/^-\d/.test(a)) {
      let j = 1;
      while (j < a.length) {
        const ch = a[j];
        if (valued.includes(ch)) {
          const inline = a.slice(j + 1);
          if (inline) { flags[ch] = inline; j = a.length; }
          else { flags[ch] = args[++i]; j = a.length; }
          continue;
        }
        flags[ch] = true;
        j++;
      }
      continue;
    }
    flags._.push(a);
  }
  return flags;
}

/* ---------- text helpers ---------------------------------------------- */

/** Split text into lines *without* a trailing empty element for trailing \n */
export function lines(text) {
  const s = String(text == null ? '' : text);
  if (s === '') return [];
  const parts = s.split('\n');
  if (parts[parts.length - 1] === '') parts.pop();
  return parts;
}

export function pad(s, width, right = false) {
  const str = String(s);
  if (str.length >= width) return str;
  const fill = ' '.repeat(width - str.length);
  return right ? fill + str : str + fill;
}

export function wrap(text, width) {
  const out = [];
  for (const line of lines(text)) {
    while (line.length > width) {
      let cut = line.lastIndexOf(' ', width);
      if (cut <= 0) cut = width;
      out.push(line.slice(0, cut));
      line = line.slice(cut).replace(/^ /, '');
    }
    out.push(line);
  }
  return out.join('\n');
}

export function formatBytes(n) {
  const units = ['B', 'K', 'M', 'G', 'T'];
  let v = Number(n) || 0;
  let u = 0;
  while (v >= 1024 && u < units.length - 1) { v /= 1024; u++; }
  return (u === 0 ? v : v.toFixed(1)) + units[u];
}

const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

export function formatDate(ms, withTime = true) {
  const d = new Date(ms);
  const base = `${MONTHS[d.getMonth()]} ${String(d.getDate()).padStart(2, ' ')}`;
  if (!withTime) return base;
  return `${base} ${String(d.getHours()).padStart(2, '0')}:${String(d.getMinutes()).padStart(2, '0')}`;
}

export function escapeHtml(s) {
  return String(s)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

/** Case-insensitive substring search returning index or -1 */
export function ciIndex(hay, needle) {
  return String(hay).toLowerCase().indexOf(String(needle).toLowerCase());
}

/** Convert a glob or regex-ish user pattern into a RegExp (grep/sed/awk). */
export function userRegex(pattern, flags = '') {
  try {
    return new RegExp(pattern, flags);
  } catch (e) {
    return null;
  }
}