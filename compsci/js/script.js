/* =========================================================================
 * script.js — a small bash-compatible script runner.
 *
 * Enough of the language to run real automation in-game:
 *   comments, variables, for, while read, if/elif/else, exit, && and ||
 *
 * Used both for one-liners typed at the prompt (`for i in 1 2 3; do ... done`)
 * and for executing script files with `./script.sh`.
 * ========================================================================= */

import { expandWord, joinPath } from './util.js';

/** Split a script into logical statements: `;` and newlines end a statement,
 *  except inside quotes or after a trailing backslash. */
export function splitStatements(src) {
  const out = [];
  let cur = '';
  let quote = null;
  for (let i = 0; i < src.length; i++) {
    const c = src[i];
    if (quote) {
      cur += c;
      if (c === '\\' && quote === '"' && i + 1 < src.length) { cur += src[i + 1]; i++; continue; }
      if (c === quote) quote = null;
      continue;
    }
    if (c === '"' || c === "'") { quote = c; cur += c; continue; }
    if (c === '\\' && src[i + 1] === '\n') { cur += ' '; i++; continue; }
    if (c === '#' && cur.trim() === '') {                  // comment line
      while (i < src.length && src[i] !== '\n') i++;
      continue;
    }
    if (c === ';' || c === '\n') {
      if (cur.trim()) out.push(cur.trim());
      cur = '';
      continue;
    }
    cur += c;
  }
  if (cur.trim()) out.push(cur.trim());

  // `while read x; do ...; done < file` → move the redirect onto the while line
  for (let i = 0; i < out.length; i++) {
    const m = /^done\s*<\s*(\S+)$/.exec(out[i]);
    if (!m) continue;
    for (let j = i - 1; j >= 0; j--) {
      if (/^while\b/.test(out[j])) { out[j] += ' < ' + m[1]; out[i] = 'done'; break; }
      if (/^(for|if|case)\b/.test(out[j])) break;
    }
  }
  return out;
}

const STOP_WORDS = ['done', 'fi', 'else', 'elif'];

class ScriptRunner {
  constructor(shell, startStdin = '') {
    this.sh = shell;
    this.out = '';
    this.err = '';
    this.code = 0;
    this.exitCode = null;
    this.stdin = startStdin;
    this.stmts = [];
  }

  emit(res) {
    this.out += res.out || '';
    this.err += res.err || '';
    this.code = res.code || 0;
  }

  /** Run a simple command (&& and || inside are handled by the shell). */
  runStatement(stmt) {
    if (this.exitCode !== null) return;
    const input = this.sh.env.__stdin !== undefined ? this.sh.env.__stdin : this.stdin;
    this.emit(this.sh.run(stmt, input));
  }

  expandWords(text) {
    const ctx = this.sh.expansionCtx();
    return this.expandSubstitutions(String(text))
      .split(/\s+/).filter(Boolean).map((w) => expandWord(w, false, ctx));
  }

  /** run $( ... ) and ` ... ` inside a raw statement */
  expandSubstitutions(text) {
    return String(text)
      .replace(/\$\(([^)]*)\)/g, (_, src) => this.sh.runSub(src))
      .replace(/`([^`]*)`/g, (_, src) => this.sh.runSub(src));
  }

  /**
   * Execute statements starting at index i until `done` / `fi` / `else` / `elif`.
   * Returns the index of the terminator (or the end).
   */
  block(i, stopWords = STOP_WORDS) {
    const stmts = this.stmts;
    while (i < stmts.length) {
      if (this.exitCode !== null) return i;
      const raw = stmts[i];
      const head = raw.split(/\s+/)[0];

      if (stopWords.includes(head)) return i;

      /* ---- `do echo x` / `then echo x` written on one line ---- */
      if (head === 'do' || head === 'then') {
        const rest = raw.slice(head.length).trim();
        if (rest) this.runStatement(rest);
        i++;
        continue;
      }

      /* ---- for ---- */
      let m = /^for\s+([A-Za-z_][A-Za-z0-9_]*)\s+in\s+([\s\S]+)$/.exec(raw);
      if (m) {
        const varName = m[1];
        const listText = m[2].trim();
        const items = this.expandWords(listText);
        i++;
        const bodyStart = i;
        let bodyEnd = bodyStart;
        while (bodyEnd < stmts.length && !STOP_WORDS.includes(stmts[bodyEnd].split(/\s+/)[0])) bodyEnd++;
        for (const item of items) {
          this.sh.env[varName] = item;
          const sub = new ScriptRunner(this.sh, this.currentInput());
          sub.stmts = stmts.slice(bodyStart, bodyEnd);
          sub.block(0, []);
          this.emit({ out: sub.out, err: sub.err, code: sub.code });
          if (sub.exitCode !== null) { this.exitCode = sub.exitCode; break; }
        }
        i = bodyEnd;
        if (i < stmts.length && stmts[i].split(/\s+/)[0] === 'done') i++;
        continue;
      }

      /* ---- while ---- */
      m = /^while\s+([\s\S]+)$/.exec(raw);
      if (m) {
        let condition = m[1].trim();
        let stdinFile = null;
        const red = /^(.*?)\s*<\s*(\S+)$/.exec(condition);
        if (red && !/^\[/.test(condition.trim())) {
          condition = red[1].trim();
          stdinFile = red[2].replace(/^['"]|['"]$/g, '');
        }
        // find the body
        let bodyStart = i + 1;
        let bodyEnd = bodyStart;
        while (bodyEnd < stmts.length && !STOP_WORDS.includes(stmts[bodyEnd].split(/\s+/)[0])) bodyEnd++;

        const isReadLoop = /^read\s/.test(condition);
        let guard = 0;
        if (stdinFile) {
          try {
            this.stdin = this.sh.fs.readFile(joinPath(this.sh.cwd, stdinFile), this.sh.user);
          } catch (e) {
            this.emit({ err: `while: ${stdinFile}: No such file or directory\n`, code: 1 });
            i = bodyEnd + 1;
            continue;
          }
          this.sh.env.__stdin = this.stdin;
        }

        while (this.exitCode === null && guard++ < 500) {
          const input = this.sh.env.__stdin !== undefined ? this.sh.env.__stdin : this.stdin;
          if (!this.evalCondition(condition, input)) break;
          const sub = new ScriptRunner(this.sh, input);
          sub.stmts = stmts.slice(bodyStart, bodyEnd);
          sub.block(0, []);
          this.emit({ out: sub.out, err: sub.err, code: sub.code });
          if (sub.exitCode !== null) { this.exitCode = sub.exitCode; break; }
          if (!isReadLoop && !stdinFile) break;
        }
        i = bodyEnd;
        if (i < stmts.length && stmts[i].split(/\s+/)[0] === 'done') i++;
        continue;
      }

      /* ---- if / elif / else ---- */
      m = /^(if|elif)\s+([\s\S]+)$/.exec(raw);
      if (m) {
        const condition = m[2].replace(/\s*;\s*$/, '').trim();
        const taken = this.evalCondition(condition, this.currentInput());
        i++;
        // `then <rest>` written on the same statement
        if (i < stmts.length && stmts[i].split(/\s+/)[0] === 'then') {
          const rest = stmts[i].slice(4).trim();
          i++;
          if (rest && taken) this.runStatement(rest);
        }
        if (taken) {
          i = this.block(i, STOP_WORDS);
          if (i < stmts.length && stmts[i].split(/\s+/)[0] === 'fi') i++;
        } else {
          i = this.skipBlock(i);
          if (i < stmts.length) {
            const h = stmts[i].split(/\s+/)[0];
            if (h === 'elif') { stmts[i] = 'if' + stmts[i].slice(4); continue; }
            if (h === 'else') {
              const rest = stmts[i].slice(4).trim();
              i++;
              if (rest) this.runStatement(rest);
              if (i < stmts.length && /^if\b/.test(stmts[i])) continue;
              i = this.block(i, ['fi', 'done']);
              if (i < stmts.length && stmts[i].split(/\s+/)[0] === 'fi') i++;
            } else if (i < stmts.length && stmts[i].split(/\s+/)[0] === 'fi') i++;
          }
        }
        continue;
      }

      if (['fi', 'done', 'else', 'elif'].includes(head)) return i;

      /* ---- plain command ---- */
      const exitMatch = /^exit(?:\s+(\S+))?$/.exec(raw);
      if (exitMatch) {
        this.exitCode = exitMatch[1] ? parseInt(exitMatch[1], 10) || 0 : 0;
        i++;
        continue;
      }
      this.runStatement(raw);
      i++;
    }
    return i;
  }

  currentInput() {
    return this.sh.env.__stdin !== undefined ? this.sh.env.__stdin : this.stdin;
  }

  /** advance past a block without executing it */
  skipBlock(i) {
    const stmts = this.stmts;
    while (i < stmts.length) {
      const h = stmts[i].split(/\s+/)[0];
      if (STOP_WORDS.includes(h)) return i;
      i++;
    }
    return i;
  }

  /** Evaluate an `if` / `while` condition. Returns truthiness. */
  evalCondition(condition, stdin) {
    const cond = String(condition).trim();
    if (!cond) return false;

    // [ ... ] test — delegate to the test builtin
    if (/^\[/.test(cond)) return this.sh.run(cond, stdin).code === 0;

    // read VAR → true while stdin has another line
    const readMatch = /^read\s+([A-Za-z_][A-Za-z0-9_]*)/.exec(cond);
    if (readMatch) {
      const src = String(stdin || '');
      if (!src.length) { this.sh.env.__stdin = ''; return false; }
      const nl = src.indexOf('\n');
      const line = nl === -1 ? src : src.slice(0, nl);
      this.sh.env[readMatch[1]] = line;
      this.sh.env.__stdin = nl === -1 ? '' : src.slice(nl + 1);
      return true;
    }

    // comparison operators handled here:  $3 >= 10 , "a" = "b"
    const opMatch = /\s(-eq|-ne|-lt|-le|-gt|-ge|-like)\s/.exec(' ' + cond + ' ');
    if (opMatch) {
      const parts = cond.split(new RegExp(`\\s${opMatch[1]}\\s`));
      if (parts.length === 2) {
        const a = this.expandWords(parts[0])[0] ?? '';
        const b = this.expandWords(parts[1])[0] ?? '';
        const na = parseFloat(a);
        const nb = parseFloat(b);
        switch (opMatch[1]) {
          case '-eq': return na === nb;
          case '-ne': return na !== nb;
          case '-lt': return na < nb;
          case '-le': return na <= nb;
          case '-gt': return na > nb;
          case '-ge': return na >= nb;
          case '-like': return new RegExp('^' + b.replace(/[.+^${}()|[\]\\]/g, '\\$&').replace(/\*/g, '.*').replace(/\?/g, '.') + '$').test(a);
          default: return false;
        }
      }
    }
    return this.sh.run(cond, stdin).code === 0;
  }
}

/**
 * Run a bash-ish script against a Shell.
 * @returns {out, err, code}
 */
export function runScript(shell, src, startStdin = '') {
  const stmts = splitStatements(src);
  if (!stmts.length) return { out: '', err: '', code: 0 };
  const runner = new ScriptRunner(shell, startStdin);
  runner.stmts = stmts.slice();
  const savedStdin = shell.env.__stdin;
  runner.block(0, []);
  if (savedStdin === undefined) delete shell.env.__stdin;
  else shell.env.__stdin = savedStdin;
  return { out: runner.out, err: runner.err, code: runner.code, exit: runner.exitCode };
}