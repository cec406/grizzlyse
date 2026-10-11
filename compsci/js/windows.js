/* =========================================================================
 * windows.js — Windows cmd.exe and PowerShell.
 *
 * One virtual disk holds a Windows layout (/C:/Users/Player/...) and both
 * shells read it. PowerShell pipelines pass real "objects" between
 * cmdlets using an invisible marker; the last stage renders them as text.
 * ========================================================================= */

import { Shell, ShError } from './shell.js';
import { VFS } from './fs.js';
import {
  parseFlags, joinPath, winFromUnix, unixFromWin, lines, pad, formatBytes,
  formatDate, basename, extname, lines as splitLines,
} from './util.js';
import { networkCommands } from './net.js';
import { hashAny } from './hash.js';

const OBJ = '\u0001';

const encodeObjs = (arr) => arr.map((o) => OBJ + JSON.stringify(o) + OBJ + '\n').join('');
const hasObjs = (text) => /^\u0001\{/m.test(String(text || ''));
function parseObjs(text) {
  const out = [];
  for (const line of splitLines(String(text || ''))) {
    if (line.startsWith(OBJ) && line.endsWith(OBJ)) {
      try { out.push(JSON.parse(line.slice(1, -1))); } catch { /* ignore */ }
    }
  }
  return out;
}
function stripObjs(text) {
  if (!String(text || '').includes(OBJ)) return String(text || '');
  const out = [];
  let sawObj = false;
  for (const line of splitLines(String(text || ''))) {
    if (line.startsWith(OBJ) && line.endsWith(OBJ)) { sawObj = true; continue; }
    out.push(line);
  }
  return sawObj ? out.join('\n') : text;
}

/** Last stage of a pipeline: render any leftover objects as a table. */
function renderFinal(text) {
  const s = String(text || '');
  if (!s.includes(OBJ)) return s;
  const objs = parseObjs(s);
  if (!objs.length) return stripObjs(s);
  const plain = splitLines(s).filter((l) => !(l.startsWith(OBJ) && l.endsWith(OBJ)) && l.trim() !== '');
  const table = renderTable(objs);
  return plain.length ? plain.join('\n') + '\n' + table : table;
}

/** PowerShell parameter parsing: -Name value, -Name:value, positional */
function psParams(args) {
  const named = {};
  const positional = [];
  for (let i = 0; i < args.length; i++) {
    const a = args[i];
    if (/^-[A-Za-z]/.test(a)) {
      const body = a.slice(1);
      if (body.includes(':')) {
        const [k, v] = body.split(':');
        named[k.toLowerCase()] = v;
        continue;
      }
      const lower = body.toLowerCase();
      if (/^\d+$/.test(body)) { positional.push(a); continue; }
      const next = args[i + 1];
      if (next !== undefined && !/^-[A-Za-z]/.test(next)) { named[lower] = next; i++; }
      else named[lower] = true;
      continue;
    }
    positional.push(a);
  }
  return { named, positional };
}

function pathArg(ctx, value, fallback = '.') {
  const raw = value === true || value === undefined ? fallback : String(value);
  return joinPath(ctx.sh.cwd, raw);
}

function renderTable(objects, properties) {
  if (!objects.length) return '';
  const cols = properties || Object.keys(objects[0]).filter((k) => !String(k).startsWith('_'));
  const rows = objects.map((o) => cols.map((c) => {
    const v = o[c];
    return v === undefined || v === null ? '' : String(v);
  }));
  const widths = cols.map((c, i) => Math.max(c.length, ...rows.map((r) => r[i].length)));
  const out = [];
  out.push(cols.map((c, i) => pad(c, widths[i])).join('  ').replace(/\s+$/, ''));
  out.push(widths.map((w) => '-'.repeat(w)).join('  '));
  for (const r of rows) out.push(r.map((c, i) => pad(c, widths[i])).join('  ').replace(/\s+$/, ''));
  return out.join('\n') + '\n';
}

/** Evaluate a { ... } scriptblock against a PowerShell-ish item */
function evalBlock(item, block) {
  const body = String(block).replace(/^\{|\}$/g, '').trim();
  if (!body) return { transform: null, truthy: true };

  const cond = /^\$_\.(?<prop>\w+)\s*(?<op>-like|-notlike|-match|-notmatch|-eq|-ne|-gt|-lt|-ge|-le|-contains)\s*(?<val>.+)$/i.exec(body);
  if (cond) {
    const prop = cond.groups.prop;
    const op = cond.groups.op.toLowerCase();
    const rawVal = cond.groups.val.trim().replace(/^["']|["']$/g, '');
    const left = String(item[prop] !== undefined ? item[prop] : (item._raw || ''));
    const numL = parseFloat(left); const numR = parseFloat(rawVal);
    let ok = false;
    switch (op) {
      case '-like': case '-notlike': {
        const re = new RegExp('^' + rawVal.replace(/[.+^${}()|[\]\\]/g, '\\$&').replace(/\*/g, '.*').replace(/\?/g, '.') + '$', 'i');
        ok = re.test(left);
        if (op === '-notlike') ok = !ok;
        break;
      }
      case '-match': case '-notmatch': {
        ok = new RegExp(rawVal, 'i').test(left);
        if (op === '-notmatch') ok = !ok;
        break;
      }
      case '-eq': ok = left === rawVal; break;
      case '-ne': ok = left !== rawVal; break;
      case '-gt': ok = numL > numR; break;
      case '-lt': ok = numL < numR; break;
      case '-ge': ok = numL >= numR; break;
      case '-le': ok = numL <= numR; break;
      case '-contains': ok = left.includes(rawVal); break;
    }
    return { truthy: ok, transform: null };
  }

  const propOnly = /^\$_\.(\w+)$/.exec(body);
  if (propOnly) return { transform: item[propOnly[1]], truthy: true };

  const replace = /\$_(\s*-replace\s+)(["'])(.*?)\2\s*,\s*(["'])(.*?)\4/.exec(body);
  if (replace) {
    const src = String(item._raw !== undefined ? item._raw : (item.Name !== undefined ? item.Name : ''));
    return { transform: src.replace(new RegExp(replace[3], 'gi'), replace[5]), truthy: true };
  }
  if (/^\$_$/.test(body)) return { transform: item._raw !== undefined ? item._raw : item, truthy: true };
  if (/^["'].*["']$/.test(body)) return { transform: body.slice(1, -1), truthy: true };
  return { truthy: true, transform: null };
}

/** Pull a { ... } script block out of a cmdlet's arguments. */
function scriptBlock(args) {
  const list = [].concat(args).map(String);
  const start = list.findIndex((a) => a.trim().startsWith('{'));
  if (start === -1) return null;
  return list.slice(start).join(' ');
}

/* ---------------- the command table ---------------- */

export const POWERSHELL_COMMANDS = {

  GetChildItem: {
    desc: 'get items in a directory',
    usage: 'Get-ChildItem [-Path DIR] [-Recurse] [-Name] [-Filter PATTERN]',
    aliases: 'ls, dir, gci',
    flags: [
      { flag: '-Recurse', desc: 'walk subdirectories too' },
      { flag: '-Name', desc: 'print just the names' },
      { flag: '-Filter', desc: 'only items matching a wildcard' },
      { flag: '-File', desc: 'only files' },
      { flag: '-Directory', desc: 'only directories' },
    ],
    fn: (args, stdin, ctx) => {
      const { named, positional } = psParams(args);
      const target = pathArg(ctx, named.path, positional[0] || '.');
      if (!ctx.fs.exists(target)) throw new ShError(`Get-ChildItem: Cannot find path '${named.path || positional[0] || '.'}' because it does not exist.`);
      const items = [];
      const collect = (p, depth) => {
        const node = ctx.fs.node(p);
        if (!node) return;
        if (node.type === 'dir') {
          for (const kid of Object.values(node.children)) {
            const path = p + '/' + kid.name;
            items.push({
              Name: kid.name,
              FullName: winFromUnix(path),
              Mode: ctx.fs.modeString(kid),
              Length: ctx.fs.size(kid),
              LastWriteTime: formatDate(kid.mtime),
              _raw: kid.name,
              _path: path,
              _type: kid.type,
            });
            if (named.recurse && kid.type === 'dir') collect(path, depth + 1);
          }
        } else {
          items.push({
            Name: node.name,
            FullName: winFromUnix(p),
            Mode: ctx.fs.modeString(node),
            Length: ctx.fs.size(node),
            LastWriteTime: formatDate(node.mtime),
            _raw: node.name,
            _path: p,
            _type: 'file',
          });
        }
      };
      collect(target, 0);
      let result = items;
      if (named.filter) {
        const re = new RegExp('^' + String(named.filter).replace(/[.+^${}()|[\]\\]/g, '\\$&').replace(/\*/g, '.*').replace(/\?/g, '.') + '$', 'i');
        result = result.filter((i) => re.test(i.Name));
      }
      if (named.file) result = result.filter((i) => i._type === 'file');
      if (named.directory) result = result.filter((i) => i._type === 'dir');
      if (named.name) return result.map((i) => i.Name).join('\n') + (result.length ? '\n' : '');
      return encodeObjs(result);
    },
  },

  GetContent: {
    desc: 'read a file',
    usage: 'Get-Content [-Path] FILE [-TotalCount N] [-Tail N]',
    aliases: 'cat, type, gc',
    flags: [
      { flag: '-TotalCount', desc: 'only the first N lines' },
      { flag: '-Tail', desc: 'only the last N lines' },
    ],
    fn: (args, stdin, ctx) => {
      const { named, positional } = psParams(args);
      const p = pathArg(ctx, named.path, positional[0]);
      const text = ctx.fs.readFile(p, ctx.user);
      let all = splitLines(text);
      if (named.totalcount !== undefined) all = all.slice(0, parseInt(named.totalcount, 10));
      if (named.tail !== undefined) all = all.slice(-parseInt(named.tail, 10));
      return all.join('\n') + '\n';
    },
  },

  SetContent: {
    desc: 'write text to a file (overwrites)',
    usage: "Set-Content -Path FILE -Value 'text'",
    aliases: 'sc',
    fn: (args, stdin, ctx) => {
      const { named, positional } = psParams(args);
      const p = pathArg(ctx, named.path, positional[0]);
      let value = named.value;
      if (value === true || value === undefined) value = positional[1] !== undefined ? positional[1] : stdin;
      ctx.fs.writeFile(p, String(value).replace(/\n$/, '') + '\n', { user: ctx.user });
      return '';
    },
  },

  AddContent: {
    desc: 'append text to a file',
    usage: "Add-Content -Path FILE -Value 'text'",
    aliases: 'ac',
    fn: (args, stdin, ctx) => {
      const { named, positional } = psParams(args);
      const p = pathArg(ctx, named.path, positional[0]);
      let value = named.value;
      if (value === true || value === undefined) value = positional[1] !== undefined ? positional[1] : stdin;
      ctx.fs.writeFile(p, String(value).replace(/\n$/, '') + '\n', { append: true, user: ctx.user });
      return '';
    },
  },

  OutFile: {
    desc: 'send pipeline output to a file',
    usage: '... | Out-File -Path FILE',
    fn: (args, stdin, ctx) => {
      const { named, positional } = psParams(args);
      const p = pathArg(ctx, named.path, positional[0]);
      ctx.fs.writeFile(p, stripObjs(stdin), { user: ctx.user });
      return '';
    },
  },

  NewItem: {
    desc: 'create a file or directory',
    usage: 'New-Item -ItemType Directory -Path DIR',
    aliases: 'ni, md, mkdir',
    fn: (args, stdin, ctx) => {
      const { named, positional } = psParams(args);
      const p = pathArg(ctx, named.path, positional[0]);
      const type = String(named.itemtype || (named.directory ? 'directory' : named.type || 'file')).toLowerCase();
      if (type.startsWith('dir')) {
        ctx.fs.mkdir(p, { recursive: true, user: ctx.user });
      } else {
        const value = named.value === undefined || named.value === true ? '' : String(named.value);
        ctx.fs.writeFile(p, value, { user: ctx.user });
      }
      return '';
    },
  },

  RemoveItem: {
    desc: 'delete files or directories',
    usage: 'Remove-Item [-Recurse] [-Force] PATH',
    aliases: 'ri, rm, del, rmdir',
    flags: [{ flag: '-Recurse', desc: 'delete directory contents too' }],
    fn: (args, stdin, ctx) => {
      const { named, positional } = psParams(args);
      const p = pathArg(ctx, named.path, positional[0]);
      ctx.fs.rm(p, { recursive: !!(named.recurse || named.force), user: ctx.user });
      return '';
    },
  },

  CopyItem: {
    desc: 'copy files',
    usage: 'Copy-Item -Path SRC -Destination DST',
    aliases: 'cpy, cp, copy',
    fn: (args, stdin, ctx) => {
      const { named, positional } = psParams(args);
      ctx.fs.cp(pathArg(ctx, named.path, positional[0]), pathArg(ctx, named.destination, positional[1]), { recursive: true, user: ctx.user });
      return '';
    },
  },

  MoveItem: {
    desc: 'move or rename files',
    usage: 'Move-Item -Path SRC -Destination DST',
    aliases: 'mv, move, mi',
    fn: (args, stdin, ctx) => {
      const { named, positional } = psParams(args);
      ctx.fs.mv(pathArg(ctx, named.path, positional[0]), pathArg(ctx, named.destination, positional[1]), ctx.user);
      return '';
    },
  },

  RenameItem: {
    desc: 'rename a file',
    usage: 'Rename-Item -Path FILE -NewName NAME',
    aliases: 'ren, rename',
    fn: (args, stdin, ctx) => {
      const { named, positional } = psParams(args);
      const p = pathArg(ctx, named.path, positional[0]);
      const newName = named.newname || positional[1];
      ctx.fs.mv(p, joinPath(ctx.sh.cwd, String(newName)), ctx.user);
      return '';
    },
  },

  TestPath: {
    desc: 'check whether something exists',
    usage: 'Test-Path PATH',
    aliases: 'tp',
    fn: (args, stdin, ctx) => {
      const { named, positional } = psParams(args);
      const p = pathArg(ctx, named.path, positional[0]);
      return ctx.fs.exists(p) ? 'True\n' : 'False\n';
    },
  },

  GetLocation: {
    desc: 'print the working directory',
    usage: 'Get-Location',
    aliases: 'pwd',
    fn: (args, stdin, ctx) => winFromUnix(ctx.sh.cwd) + '\n',
  },

  SetLocation: {
    desc: 'change the working directory',
    usage: 'Set-Location DIR',
    aliases: 'cd, chdir, sl',
    fn: (args, stdin, ctx) => {
      const { named, positional } = psParams(args);
      const target = named.path || positional[0];
      if (!target) return winFromUnix(ctx.sh.cwd) + '\n';
      const p = pathArg(ctx, target);
      if (!ctx.fs.exists(p)) throw new ShError(`Set-Location: Cannot find path '${target}' because it does not exist.`);
      ctx.sh.cwd = p;
      return '';
    },
  },

  SelectString: {
    desc: 'search text for a pattern',
    usage: 'Select-String [-Pattern] TEXT [-Path] FILE',
    aliases: 'sls, findstr',
    flags: [
      { flag: '-SimpleMatch', desc: 'literal text instead of a regex' },
      { flag: '-NotMatch', desc: 'show lines that do NOT match' },
      { flag: '-Quiet', desc: 'only report success or failure' },
    ],
    fn: (args, stdin, ctx) => {
      const { named, positional } = psParams(args);
      const pattern = String(named.pattern === undefined ? positional[0] : named.pattern);
      const file = named.path || positional[1];
      const text = file ? ctx.fs.readFile(pathArg(ctx, file), ctx.user) : stdin;
      let re;
      try { re = new RegExp(pattern, named.simplematch ? 'gi' : 'gi'); }
      catch { re = new RegExp(pattern.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'gi'); }
      const hits = [];
      splitLines(text).forEach((line, i) => {
        re.lastIndex = 0;
        const matched = re.test(line);
        if (matched === !!named.notmatch) return;
        hits.push(`${file || ''}:${i + 1}:${line}`);
      });
      if (named.quiet) return hits.length ? 'True\n' : 'False\n';
      return hits.join('\n') + (hits.length ? '\n' : '');
    },
  },

  WhereObject: {
    desc: 'filter a pipeline',
    usage: '... | Where-Object { $_.Property -eq value }',
    aliases: 'where, ?',
    fn: (args, stdin, ctx) => {
      const { named, positional } = psParams(args);
      const block = scriptBlock(args);
      const objs = parseObjs(stdin);
      const wasObjects = objs.length > 0;
      const items = wasObjects ? objs : splitLines(stdin).map((l) => ({ _raw: l, Name: l }));
      const prop = named.property || positional[0];
      let kept;
      if (block) {
        kept = items.filter((o) => evalBlock(o, block).truthy);
      } else if (prop) {
        const value = named.value !== undefined ? String(named.value) : positional[1];
        kept = items.filter((o) => {
          const v = String(o[prop] !== undefined ? o[prop] : o._raw);
          const numL = parseFloat(v); const numR = parseFloat(value);
          switch (prop) {
            case 'Length': return numL > numR;
            case 'Name': return new RegExp('^' + value.replace(/\*/g, '.*').replace(/\?/g, '.') + '$', 'i').test(v);
            default: return v === value;
          }
        });
      } else kept = items;
      return wasObjects ? encodeObjs(kept) : kept.map((o) => String(o._raw)).join('\n') + (kept.length ? '\n' : '');
    },
  },

  ForEachObject: {
    desc: 'run an action on every item in a pipeline',
    usage: '... | ForEach-Object { $_ }',
    aliases: 'foreach, %',
    fn: (args, stdin, ctx) => {
      const block = scriptBlock(args);
      const objs = parseObjs(stdin);
      const wasObjects = objs.length > 0;
      const items = wasObjects ? objs : splitLines(stdin).map((l) => ({ _raw: l, Name: l }));
      if (!items.length) return stdin;
      if (!block) return wasObjects ? encodeObjs(items) : items.map((i) => i._raw).join('\n') + '\n';
      const results = items.map((o) => {
        const r = evalBlock(o, block);
        if (r.transform === null || r.transform === undefined) return null;
        return typeof r.transform === 'object'
          ? encodeObjs([r.transform])
          : String(r.transform);
      }).filter((x) => x !== null);
      const objsOut = results.filter((r) => typeof r === 'string' && r.startsWith(OBJ));
      const textOut = results.filter((r) => typeof r === 'string' && !r.startsWith(OBJ));
      return objsOut.join('') + textOut.join('\n') + (textOut.length ? '\n' : '');
    },
  },

  SelectObject: {
    desc: 'choose properties or a number of items',
    usage: '... | Select-Object -First N [-Property Name]',
    aliases: 'select',
    flags: [
      { flag: '-First', desc: 'take the first N items' },
      { flag: '-Last', desc: 'take the last N items' },
      { flag: '-Property', desc: 'keep only this property' },
      { flag: '-ExpandProperty', desc: 'print the property value instead of a table' },
    ],
    fn: (args, stdin, ctx) => {
      const { named, positional } = psParams(args);
      const objs = parseObjs(stdin);
      const isObj = objs.length > 0;
      let items = objs;
      if (!isObj) items = splitLines(stdin).map((l) => ({ _raw: l, Name: l }));
      if (named.first !== undefined) items = items.slice(0, parseInt(named.first, 10));
      if (named.last !== undefined) items = items.slice(-parseInt(named.last, 10));
      const props = [];
      for (const a of [].concat(args)) {
        if (/^\{/.test(a)) continue;
        const cleaned = String(a).replace(/^-/, '').replace(/^["']|["']$/g, '');
        if (/^[A-Za-z]\w*$/.test(cleaned) && !/^\d+$/.test(cleaned)) props.push(cleaned);
      }
      if (named.expandproperty) {
        const key = String(named.expandproperty);
        return items.map((i) => String(i[key] !== undefined ? i[key] : i._raw)).join('\n') + '\n';
      }
      if (props.length) {
        const picked = items.map((i) => {
          const o = {};
          for (const p of props) o[p] = i[p] !== undefined ? i[p] : i._raw;
          return o;
        });
        if (!isObj) return picked.map((p) => String(p[props[0]])).join('\n') + '\n';
        return encodeObjs(picked);
      }
      if (!isObj) return items.map((i) => i._raw).join('\n') + '\n';
      return encodeObjs(items);
    },
  },

  SortObject: {
    desc: 'sort pipeline input',
    usage: '... | Sort-Object [-Property Name] [-Descending] [-Unique]',
    aliases: 'sort',
    flags: [
      { flag: '-Descending', desc: 'reverse order' },
      { flag: '-Unique', desc: 'remove duplicates' },
      { flag: '-Top', desc: 'take only the first N' },
    ],
    fn: (args, stdin, ctx) => {
      const { named, positional } = psParams(args);
      const objs = parseObjs(stdin);
      const isObj = objs.length > 0;
      const items = isObj ? objs : splitLines(stdin).map((l) => ({ _raw: l }));
      const prop = named.property || positional[0];
      const sorted = items.slice().sort((a, b) => {
        const va = prop ? (a[prop] !== undefined ? a[prop] : a._raw) : (a._raw !== undefined ? a._raw : a.Name);
        const vb = prop ? (b[prop] !== undefined ? b[prop] : b._raw) : (b._raw !== undefined ? b._raw : b.Name);
        const na = parseFloat(va); const nb = parseFloat(vb);
        if (!Number.isNaN(na) && !Number.isNaN(nb)) return na - nb;
        return String(va).localeCompare(String(vb));
      });
      let result = sorted;
      if (named.descending) result = result.reverse();
      if (named.unique) result = result.filter((x, i) => i === 0 || JSON.stringify(result[i - 1]) !== JSON.stringify(x));
      if (named.top !== undefined) result = result.slice(0, parseInt(named.top, 10));
      return isObj ? encodeObjs(result) : result.map((r) => String(r._raw)).join('\n') + '\n';
    },
  },

  GroupObject: {
    desc: 'group items that share a property value',
    usage: '... | Group-Object -Property Name',
    aliases: 'group',
    fn: (args, stdin, ctx) => {
      const { named, positional } = psParams(args);
      const prop = named.property || positional[0] || 'Name';
      const objs = parseObjs(stdin);
      const items = objs.length ? objs : splitLines(stdin).map((l) => ({ Name: l, _raw: l }));
      const groups = new Map();
      for (const item of items) {
        const key = String(item[prop] !== undefined ? item[prop] : item._raw);
        if (!groups.has(key)) groups.set(key, []);
        groups.get(key).push(item);
      }
      return encodeObjs([...groups.entries()].map(([name, group]) => ({
        Name: name, Count: group.length, _raw: name, _group: group,
      })));
    },
  },

  MeasureObject: {
    desc: 'count lines, words and characters',
    usage: '... | Measure-Object [-Line] [-Word] [-Character]',
    aliases: 'measure',
    fn: (args, stdin, ctx) => {
      const { named } = psParams(args);
      const objs = parseObjs(stdin);
      const text = objs.length ? objs.map((o) => String(o._raw ?? o.Name)).join('\n') : String(stdin);
      const obj = {
        Lines: splitLines(text).length,
        Words: text.split(/\s+/).filter(Boolean).length,
        Characters: text.length,
        Count: objs.length ? objs.length : splitLines(text).length,
        _raw: String(objs.length ? objs.length : splitLines(text).length),
      };
      if (named.line || named.word || named.character || named.property) {
        const key = named.line ? 'Lines' : named.word ? 'Words' : named.character ? 'Characters' : 'Count';
        return `Count : ${obj[key]}\n`;
      }
      return renderTable([obj], ['Lines', 'Words', 'Characters']);
    },
  },

  FormatTable: {
    desc: 'format objects as a table',
    usage: '... | Format-Table',
    aliases: 'ft, format',
    fn: (args, stdin, ctx) => {
      const objs = parseObjs(stdin);
      return objs.length ? renderTable(objs) : stdin;
    },
  },

  FormatList: {
    desc: 'format objects as a list',
    usage: '... | Format-List',
    aliases: 'fl',
    fn: (args, stdin, ctx) => {
      const objs = parseObjs(stdin);
      if (!objs.length) return stdin;
      return objs.map((o) => Object.entries(o).filter(([k]) => !k.startsWith('_'))
        .map(([k, v]) => `${k.padEnd(14)}: ${v}`).join('\n')).join('\n') + '\n';
    },
  },

  CompareObject: {
    desc: 'compare two collections',
    usage: 'Compare-Object -ReferenceObject a.txt -DifferenceObject b.txt',
    aliases: 'compare, diff',
    fn: (args, stdin, ctx) => {
      const { named, positional } = psParams(args);
      const read = (v) => {
        if (v === true || v === undefined) return splitLines(stdin);
        return splitLines(ctx.fs.readFile(pathArg(ctx, v), ctx.user));
      };
      const ref = read(named.referenceobject || positional[0]);
      const diff = read(named.differenceobject || positional[1]);
      const out = [];
      for (const d of diff) if (!ref.includes(d)) out.push({ SideIndicator: '=>', InputObject: d, _raw: `=> ${d}` });
      for (const r of ref) if (!diff.includes(r)) out.push({ SideIndicator: '<=', InputObject: r, _raw: `<= ${r}` });
      return out.length ? renderTable(out, ['SideIndicator', 'InputObject']) : '';
    },
  },

  GetProcess: {
    desc: 'list running processes',
    usage: 'Get-Process',
    aliases: 'ps, gps',
    fn: (args, stdin, ctx) => {
      const vm = ctx.sh.vm;
      const procs = (vm && vm.processes) || [
        { Id: 1, ProcessName: 'System', CPU: 0.0, WS: 4096 },
        { Id: 412, ProcessName: 'sshd', CPU: 0.0, WS: 8192 },
        { Id: 884, ProcessName: 'powershell', CPU: 0.3, WS: 24576 },
        { Id: 1177, ProcessName: 'chrome', CPU: 4.8, WS: 262144 },
      ].filter((p) => !(vm && (vm.killedPids || []).includes(p.Id)));
      return renderTable(procs.map((p) => ({
        Id: p.Id, ProcessName: p.ProcessName, CPU: p.cpu, WS: p.WS, _raw: p.ProcessName,
      })), ['Id', 'ProcessName', 'CPU', 'WS']);
    },
  },

  StopProcess: {
    desc: 'stop a running process',
    usage: 'Stop-Process -Id 1177 [-Force]',
    aliases: 'kill',
    fn: (args, stdin, ctx) => {
      const { named } = psParams(args);
      const vm = ctx.sh.vm;
      if (!vm) return '';
      const id = parseInt(String(named.id), 10);
      if (Number.isNaN(id)) throw new ShError('Stop-Process: cannot bind parameter Id');
      vm.killedPids = vm.killedPids || [];
      if (!vm.killedPids.includes(id)) vm.killedPids.push(id);
      return '';
    },
  },

  WriteOutput: {
    desc: 'write text to the pipeline',
    usage: "Write-Output 'text'",
    aliases: 'echo, write',
    fn: (args) => args.join(' ') + '\n',
  },

  WriteHost: {
    desc: 'print text to the screen',
    usage: "Write-Host 'text'",
    fn: (args) => args.filter((a) => !a.startsWith('-')).join(' ') + '\n',
  },

  ClearHost: {
    desc: 'clear the screen',
    usage: 'Clear-Host',
    aliases: 'cls, clear',
    fn: () => '\u0000CLEAR\u0000',
  },

  GetCommand: {
    desc: 'find a command',
    usage: 'Get-Command NAME',
    aliases: 'gcm',
    fn: (args, stdin, ctx) => {
      const rows = [];
      for (const name of args) {
        const entry = ctx.sh.resolveCommand(name);
        if (!entry) throw new ShError(`Get-Command: The term '${name}' is not recognized`, 1);
        rows.push({ CommandType: 'Function', Name: ctx.sh.kind === 'powershell' ? name : name, Version: '5.1', _raw: name });
      }
      return renderTable(rows, ['CommandType', 'Name', 'Version']);
    },
  },

  GetHelp: {
    desc: 'get help for a command',
    usage: 'Get-Help COMMAND',
    aliases: 'help, ?',
    fn: (args, stdin, ctx) => {
      const name = args.find((a) => !a.startsWith('-'));
      if (!name) return 'Get-Help: provide a command name.\n';
      const page = ctx.sh.manPage(name);
      return page || `Get-Help: no help found for '${name}'.\n`;
    },
  },

  GetAlias: {
    desc: 'list command aliases',
    usage: 'Get-Alias',
    aliases: 'gal',
    fn: (args, stdin, ctx) => {
      const rows = Object.entries(ctx.sh.aliasesMap || {}).map(([alias, target]) => ({ Name: alias, Definition: target, _raw: alias }));
      return renderTable(rows, ['Name', 'Definition']);
    },
  },

  GetDate: { desc: 'print the current date and time', usage: 'Get-Date', fn: () => new Date().toString() + '\n' },
  GetComputerInfo: {
    desc: 'print system information',
    usage: 'Get-ComputerInfo',
    fn: () => [
      'WindowsComputerName      : DESKTOP-ZER0DAY',
      'WindowsProductName       : Windows 10 Pro (this is a training simulation)',
      'WindowsVersion           : 10.0.19045',
      'OsArchitecture           : 64-bit',
      'CsTotalPhysicalMemory    : 16670248832',
      '',
    ].join('\n'),
  },
  GetHostname: { desc: 'print the computer name', usage: 'Get-Hostname', aliases: 'hostname', fn: (a, s, ctx) => (ctx.sh.env.COMPUTERNAME || 'DESKTOP-ZER0DAY') + '\n' },
  GetChildType: { hidden: true },
  ConvertToJson: {
    desc: 'convert output to JSON',
    usage: '... | ConvertTo-Json',
    fn: (args, stdin, ctx) => {
      const objs = parseObjs(stdin);
      const clean = (o) => Object.fromEntries(Object.entries(o).filter(([k]) => !k.startsWith('_')));
      return JSON.stringify(objs.length ? objs.map(clean) : splitLines(stripObjs(stdin)), null, 2) + '\n';
    },
  },
  SelectExpand: { hidden: true },
  GetHash: {
    desc: 'compute a hash of a file',
    usage: 'Get-FileHash FILE -Algorithm SHA256',
    fn: (args, stdin, ctx) => {
      const { named, positional } = psParams(args);
      const p = pathArg(ctx, named.path || positional[0]);
      const algo = String(named.algorithm || 'SHA256').toLowerCase();
      const text = ctx.fs.readFile(p, ctx.user);
      return renderTable([{
        Algorithm: algo.toUpperCase(), Hash: hashAny(algo, text), Path: winFromUnix(p), _raw: hashAny(algo, text),
      }], ['Algorithm', 'Hash', 'Path']);
    },
  },
  GetFileHash: { desc: 'compute a hash of a file', usage: 'Get-FileHash FILE', fn: (...a) => POWERSHELL_COMMANDS.GetHash.fn(...a) },
};

/* ---------------- cmd.exe builtins ---------------- */

export const CMD_COMMANDS = {
  ipconfig: {
    desc: 'show network configuration',
    usage: 'ipconfig /all',
    fn: () => [
      '',
      'Windows IP Configuration',
      '',
      'Wireless LAN adapter Wi-Fi:',
      '',
      '   Connection-specific DNS Suffix  . : lab.local',
      '   IPv4 Address. . . . . . . . . . . : 10.0.0.77',
      '   Subnet Mask . . . . . . . . . . . : 255.255.255.0',
      '   Default Gateway . . . . . . . . . : 10.0.0.1',
      '',
      'Ethernet adapter Loopback:',
      '',
      '   Media State . . . . . . . . . . . : Media disconnected',
      '',
    ].join('\n'),
  },
  systeminfo: {
    desc: 'show detailed system information',
    usage: 'systeminfo',
    fn: () => [
      'Host Name:                 DESKTOP-ZER0DAY',
      'OS Name:                   Microsoft Windows 10 Pro',
      'OS Version:                10.0.19045 N/A Build 19045',
      'System Manufacturer:       Training Simulation',
      'System Type:               x64-based PC',
      'Domain:                    WORKGROUP',
      'Total Physical Memory:     16,384 MB',
      'Available Physical Memory: 12,902 MB',
      'Logical Processors:        8',
      'Boot Device:               \\Device\\HarddiskVolume1',
      'Time Zone:                 (UTC-08:00) Pacific Time',
      'System Boot Time:          ' + new Date().toString().slice(0, 24),
    ].join('\n') + '\n',
  },
  whoami: {
    desc: 'print the current user',
    usage: 'whoami',
    fn: (args, stdin, ctx) => (ctx.sh.env.COMPUTERNAME ? 'zer0day\\' + ctx.user : ctx.user) + '\n',
  },
  hostname: {
    desc: 'print the computer name',
    usage: 'hostname',
    fn: (a, s, ctx) => (ctx.sh.env.COMPUTERNAME || 'DESKTOP-ZER0DAY') + '\n',
  },
  ver: { desc: 'print the Windows version', usage: 'ver', fn: () => '\nMicrosoft Windows [Version 10.0.19045.4046]\n' },
  tree: {
    desc: 'show the directory structure as a tree',
    usage: 'tree [path]',
    fn: (args, stdin, ctx) => BASH_TREE(args, stdin, ctx),
  },
  attrib: {
    desc: 'display or change file attributes',
    usage: 'attrib file',
    fn: (args, stdin, ctx) => args.filter((a) => !a.startsWith('/')).map((a) => {
      const n = ctx.fs.node(joinPath(ctx.sh.cwd, a));
      return n ? `${ctx.fs.modeString(n)}  ${winFromUnix(joinPath(ctx.sh.cwd, a))}` : `File not found - ${a}`;
    }).join('\n') + '\n',
  },
  title: { desc: 'set the window title', usage: 'title text', fn: (args) => '' },
  rem: { desc: 'no-op comment', usage: 'rem text', fn: () => '' },
  choice: { desc: 'ask the user to pick an option', usage: 'choice', fn: () => '' },
  history: {
    desc: 'show command history',
    usage: 'history',
    fn: (args, stdin, ctx) => ctx.sh.history.map((h, i) => String(i + 1).padStart(5) + '  ' + h).join('\n') + '\n',
  },
  find: {
    desc: 'search for text in a file',
    usage: 'find "text" file',
    fn: (args, stdin, ctx) => {
      const f = parseFlags(args);
      const needle = f._[0] || '';
      const file = f._[1];
      if (!file) return `FIND: Parameter format not correct\n`;
      const text = ctx.fs.readFile(joinPath(ctx.sh.cwd, file), ctx.user);
      const hits = splitLines(text).filter((l) => l.toLowerCase().includes(needle.toLowerCase()));
      return hits.join('\n') + (hits.length ? '\n' : '');
    },
  },
  fc: {
    desc: 'compare two files',
    usage: 'fc file1 file2',
    fn: (args, stdin, ctx) => {
      const files = args.filter((a) => !a.startsWith('/'));
      const a = splitLines(ctx.fs.readFile(joinPath(ctx.sh.cwd, files[0]), ctx.user));
      const b = splitLines(ctx.fs.readFile(joinPath(ctx.sh.cwd, files[1]), ctx.user));
      const out = [];
      const max = Math.max(a.length, b.length);
      for (let i = 0; i < max; i++) {
        if (a[i] === b[i]) continue;
        out.push(`***  ${files[0]}`, `---  ${files[1]}`, `* ${i + 1}`, a[i] ?? '', `> ${i + 1}`, b[i] ?? '', '');
      }
      return out.join('\n') || 'Comparing files... no differences found.\n';
    },
  },
  more: {
    desc: 'page through a file',
    usage: 'more file',
    fn: (args, stdin, ctx) => {
      const file = args.find((a) => !a.startsWith('/'));
      if (!file) return '';
      return ctx.fs.readFile(joinPath(ctx.sh.cwd, file), ctx.user);
    },
  },
  taskkill: {
    desc: 'end a running process',
    usage: 'taskkill /PID 1177',
    fn: (args, stdin, ctx) => {
      const f = parseFlags(args);
      const pid = parseInt(String(f.pid || ''), 10);
      const vm = ctx.sh.vm;
      if (!vm || Number.isNaN(pid)) return '';
      vm.killedPids = vm.killedPids || [];
      vm.killedPids.push(pid);
      return `SUCCESS: The process with PID ${pid} has been terminated.\n`;
    },
  },
  set: {
    desc: 'show environment variables',
    usage: 'set',
    fn: (args, stdin, ctx) => Object.keys(ctx.sh.env).sort().map((k) => `${k}=${ctx.sh.env[k]}`).join('\n') + '\n',
  },
  netsh: {
    desc: 'configure networking (simulated)',
    usage: 'netsh interface show config',
    fn: () => 'Interface "Wi-Fi" is up. There is nothing to change in this simulation.\n',
  },
  tasklist: {
    desc: 'list running processes',
    usage: 'tasklist',
    fn: (args, stdin, ctx) => POWERSHELL_COMMANDS.GetProcess.fn(args, stdin, ctx),
  },
  echo: {
    desc: 'print text',
    usage: 'echo text',
    fn: (args) => args.join(' ').replace(/\s+$/, '') + '\n',
  },
  exit: {
    desc: 'close the shell',
    usage: 'exit',
    fn: () => '\u0000EXIT\u0000',
  },
};

function BASH_TREE(args, stdin, ctx) {
  const root = joinPath(ctx.sh.cwd, args.find((a) => !a.startsWith('/')) || '.');
  if (!ctx.fs.isDir(root)) return 'Invalid path\n';
  const out = [winFromUnix(root)];
  const render = (path, prefix) => {
    const kids = Object.values(ctx.fs.node(path).children).sort((a, b) => a.name.localeCompare(b.name));
    kids.forEach((kid, i) => {
      const last = i === kids.length - 1;
      out.push(prefix + (last ? '└── ' : '├── ') + kid.name);
      if (kid.type === 'dir') render(path + '/' + kid.name, prefix + (last ? '    ' : '│   '));
    });
  };
  render(root, '');
  return out.join('\n') + '\n';
}

/* ---------------- the shell ---------------- */

const KEYMAP = {
  'Get-ChildItem': 'GetChildItem', 'Get-Content': 'GetContent', 'Set-Content': 'SetContent',
  'Add-Content': 'AddContent', 'Out-File': 'OutFile', 'New-Item': 'NewItem',
  'Remove-Item': 'RemoveItem', 'Copy-Item': 'CopyItem', 'Move-Item': 'MoveItem',
  'Rename-Item': 'RenameItem', 'Test-Path': 'TestPath', 'Get-Location': 'GetLocation',
  'Set-Location': 'SetLocation', 'Select-String': 'SelectString', 'Where-Object': 'WhereObject',
  'ForEach-Object': 'ForEachObject', 'Select-Object': 'SelectObject', 'Sort-Object': 'SortObject',
  'Group-Object': 'GroupObject', 'Measure-Object': 'MeasureObject', 'Format-Table': 'FormatTable',
  'Format-List': 'FormatList', 'Compare-Object': 'CompareObject', 'Get-Process': 'GetProcess',
  'Stop-Process': 'StopProcess', 'Write-Output': 'WriteOutput', 'Write-Host': 'WriteHost',
  'Clear-Host': 'ClearHost', 'Get-Command': 'GetCommand', 'Get-Help': 'GetHelp', 'Get-Alias': 'GetAlias',
  'Get-Date': 'GetDate', 'Get-ComputerInfo': 'GetComputerInfo', 'Get-Hostname': 'GetHostname',
  'ConvertTo-Json': 'ConvertToJson', 'Get-FileHash': 'GetFileHash', 'Get-ChildItem-Name': 'GetChildItem',
};

export class WinShell extends Shell {
  constructor(opts) {
    const kind = opts.kind || 'powershell';
    super({ ...opts, kind });
    const registry = {};
    for (const [canonical, entry] of Object.entries(POWERSHELL_COMMANDS)) {
      if (entry.hidden) continue;
      registry[KEYMAP[canonical] || canonical] = entry;
    }
    // accept the dashed cmdlet names too: Get-ChildItem as well as GetChildItem
    for (const [dashed, camel] of Object.entries(KEYMAP)) {
      if (registry[camel]) registry[dashed] = registry[camel];
    }
    for (const [name, entry] of Object.entries(CMD_COMMANDS)) {
      if (entry.hidden) continue;
      registry[name] = entry;
    }
    // network tools available on Windows too
    for (const [name, entry] of Object.entries(networkCommands('powershell'))) registry[name] = entry;
    for (const [name, entry] of Object.entries(networkCommands('bash'))) {
      if (!registry[name]) registry[name] = entry;
    }
    if (kind === 'powershell') {
      registry.SetAlias = {
        desc: 'create an alias', usage: "Set-Alias ll='Get-ChildItem'",
        fn: (args) => { const m = /^(\w+)=(.*)$/.exec(args.join(' ')); if (m) (this.aliasesMap || (this.aliasesMap = {}))[m[1]] = m[2].replace(/['"]/g, ''); return ''; },
      };
    }
    this.registry = registry;
    this.posixEscapes = false;
    this.aliasesMap = opts.aliasesMap || {};
    this.user = opts.user || 'player';
    this.home = opts.home || (this.cwd.startsWith('/C:') ? '/C:/Users/Player' : '/C:/Users/Player');
    this.env.COMPUTERNAME = 'DESKTOP-ZER0DAY';
    this.env.USERPROFILE = winFromUnix(this.home);
    this.env.PATH = 'C:\\Windows\\System32;C:\\Windows';
    this.env.HOME = winFromUnix(this.home);
  }

  setCwd(p) { this.cwd = p; this.env.PWD = winFromUnix(p); }

  resolveCommand(name) {
    const key = String(name);
    const canonical = KEYMAP[key] || KEYMAP[key.replace(/-/g, '')] ||
      Object.keys(KEYMAP).find((k) => k.toLowerCase() === key.toLowerCase());
    if (canonical && this.registry[canonical]) return this.registry[canonical];
    return super.resolveCommand(name);
  }

  run(input, stdin = '') {
    const r = super.run(input, stdin);
    return { ...r, out: renderFinal(r.out), err: stripObjs(r.err) };
  }

  promptPath() { return winFromUnix(this.cwd); }
}

export { hasObjs, parseObjs, encodeObjs, stripObjs };