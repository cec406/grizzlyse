/* =========================================================================
 * fs.js — the in-game virtual filesystem.
 *
 * One canonical POSIX-style tree serves both worlds:
 *   Linux   /home/player/notes.txt
 *   Windows /C:/Users/Player/notes.txt   (displayed as C:\Users\Player\notes.txt)
 *
 * Pure JS, no DOM — unit tested from Node.
 * ========================================================================= */

import { normalizeUnix, joinPath, dirname, basename, toUnixPath } from './util.js';

export const DEFAULT_FILE_MODE = 0o644;
export const DEFAULT_DIR_MODE = 0o755;
const SPEC_KEYS = ['content', 'mode', 'owner', 'group', 'type'];

export class FSError extends Error {
  constructor(message, code = 1) { super(message); this.code = code; this.fsError = true; }
}

let uidCounter = 1000;
export function uid() { return ++uidCounter; }

function mkNode(type, name, extra = {}) {
  const now = Date.now();
  return {
    id: uid(),
    type,                       // 'file' | 'dir'
    name,
    mode: type === 'dir' ? DEFAULT_DIR_MODE : DEFAULT_FILE_MODE,
    owner: 'player',
    group: 'player',
    content: type === 'file' ? '' : null,
    children: type === 'dir' ? {} : null,
    mtime: now,
    ctime: now,
    ...extra,
  };
}

export class VFS {
  constructor() {
    this.root = mkNode('dir', '/', { mode: 0o755, owner: 'root', group: 'root' });
  }

  /* ---------- construction from a literal spec ------------------------- */

  /**
   * spec = {
   *   '/home/player/notes.txt': 'file contents',
   *   '/etc/network/': {},                      // directory
   *   '/opt/app': { 'run.sh': {content:'...', mode: 0o755} }
   * }
   */
  static fromSpec(spec = {}) {
    const vfs = new VFS();
    for (const [key, value] of Object.entries(spec)) {
      const isDirLiteral = key.endsWith('/');
      const clean = normalizeUnix(key);
      if (typeof value === 'string') {
        vfs.ensureParents(clean);
        vfs.writeFile(clean, value, { user: 'root' });
      } else if (Array.isArray(value)) {
        vfs.ensureParents(clean);
        vfs.writeFile(clean, value.join('\n') + '\n', { user: 'root' });
      } else if (value && typeof value === 'object' && !('content' in value)) {
        vfs.mkdirp(clean);
        vfs._merge(clean, value);
      } else if (value && typeof value === 'object') {
        // a file with attributes: { content, mode, owner, group }
        vfs.ensureParents(clean);
        vfs.writeFile(clean, String(value.content), { user: 'root' });
        vfs._apply(clean, value);
      } else if (isDirLiteral) {
        vfs.mkdirp(clean);
      }
    }
    return vfs;
  }

  /** Create a directory and any missing parents, ignoring "already exists". */
  mkdirp(path, user = 'root') {
    const p = normalizeUnix(path);
    if (this.isDir(p)) return this.node(p);
    this.ensureParents(p);
    try {
      return this.mkdir(p, { recursive: true, user });
    } catch (e) {
      if (this.isDir(p)) return this.node(p);
      throw e;
    }
  }

  _apply(path, spec) {
    const node = this.node(path);
    if (!node) return;
    if (spec.mode !== undefined) node.mode = spec.mode & 0o777;
    if (spec.owner !== undefined) { node.owner = spec.owner; if (!spec.group) node.group = spec.owner; }
    if (spec.group !== undefined) node.group = spec.group;
  }

  /** Create any missing ancestor directories of `path` without permission checks.
   *  Directories under a user's home are owned by that user; everything else by root. */
  ensureParents(path, user = null) {
    const p = normalizeUnix(path);
    const segs = p.split('/').filter(Boolean);
    const owner = user || (/^\/(home|tmp|var\/tmp)(\/|$)/.test(p) || /^\/[A-Za-z]:\/Users(\/|$)/i.test(p) ? 'player' : 'root');
    let cur = '';
    for (let i = 0; i < segs.length - 1; i++) {
      cur += '/' + segs[i];
      if (!this.node(cur)) {
        const parent = this.node(dirname(cur));
        if (!parent || parent.type !== 'dir') break;
        parent.children[basename(cur)] = mkNode('dir', basename(cur), { owner, group: owner });
      }
    }
    return this;
  }

  _merge(basePath, obj) {
    for (const [name, value] of Object.entries(obj)) {
      if (SPEC_KEYS.includes(name)) continue;
      const p = basePath === '/' ? '/' + name : basePath + '/' + name;
      if (typeof value === 'string') {
        this.writeFile(p, value, { user: 'root' });
      } else if (Array.isArray(value)) {
        this.writeFile(p, value.join('\n') + '\n', { user: 'root' });
      } else if (value && typeof value === 'object') {
        if ('content' in value) {
          this.writeFile(p, String(value.content), { user: 'root' });
          this._apply(p, value);
        } else {
          this.mkdirp(p);
          this._apply(p, value);
          this._merge(p, value);
        }
      }
    }
  }

  /* ---------- basics ---------------------------------------------------- */

  norm(path) { return normalizeUnix(path); }

  node(path) {
    const p = normalizeUnix(path);
    if (p === '/') return this.root;
    let cur = this.root;
    for (const seg of p.slice(1).split('/')) {
      if (!cur || cur.type !== 'dir' || !cur.children[seg]) return null;
      cur = cur.children[seg];
    }
    return cur;
  }

  exists(path) { return !!this.node(path); }

  isDir(path) { const n = this.node(path); return !!n && n.type === 'dir'; }

  isFile(path) { const n = this.node(path); return !!n && n.type === 'file'; }

  parentOf(path) {
    const p = normalizeUnix(path);
    return this.node(dirname(p));
  }

  /** Absolute path of `path` resolved against `cwd`. */
  resolve(cwd, path) { return joinPath(cwd, path); }

  /* ---------- permissions ---------------------------------------------- */

  modeString(node) {
    const t = node.type === 'dir' ? 'd' : (node.isLink ? 'l' : '-');
    const m = node.mode;
    const chr = (shift, perm, ch) => ((Math.floor(m / Math.pow(2, shift)) % 8) & perm ? ch : '-');
    return t + chr(6, 4, 'r') + chr(6, 2, 'w') + chr(6, 1, 'x')
             + chr(3, 4, 'r') + chr(3, 2, 'w') + chr(3, 1, 'x')
             + chr(0, 4, 'r') + chr(0, 2, 'w') + chr(0, 1, 'x');
  }

  /** user may be a name; groups optional */
  can(node, kind, user = 'player', groups = ['player', 'users']) {
    if (user === 'root') return true;                 // root bypasses permission bits
    const isOwner = node.owner === user;
    const inGroup = groups.includes(node.group);
    const bits = node.mode;
    let shift;
    if (isOwner) shift = 6;
    else if (inGroup) shift = 3;
    else shift = 0;
    const perm = kind === 'read' ? 4 : kind === 'write' ? 2 : 1;
    return ((Math.floor(bits / Math.pow(2, shift)) % 8) & perm) !== 0;
  }

  assertPerm(node, kind, path, user = 'player') {
    if (node.owner === 'root' && (kind === 'write' || kind === 'exec') && user !== 'root') {
      throw new FSError(`${path}: Permission denied`);
    }
    if (!this.can(node, kind, user)) throw new FSError(`${path}: Permission denied`);
  }

  /* ---------- reads ------------------------------------------------------ */

  readFile(path, user = 'player') {
    const n = this.node(path);
    if (!n) throw new FSError(`${path}: No such file or directory`, 2);
    if (n.type === 'dir') throw new FSError(`${path}: Is a directory`);
    this.assertPerm(n, 'read', path, user);
    return n.content;
  }

  readdir(path, user = 'player') {
    const n = this.node(path);
    if (!n) throw new FSError(`${path}: No such file or directory`, 2);
    if (n.type !== 'dir') throw new FSError(`${path}: Not a directory`);
    this.assertPerm(n, 'read', path, user);
    return Object.values(n.children).sort((a, b) => a.name.localeCompare(b.name));
  }

  /* ---------- writes ----------------------------------------------------- */

  mkdir(path, { recursive = false, user = 'player' } = {}) {
    const p = normalizeUnix(path);
    if (p === '/') return this.root;
    let parent = this.node(dirname(p));
    if (!parent) {
      if (!recursive) throw new FSError(`${dirname(p)}: No such file or directory`, 2);
      this.mkdir(dirname(p), { recursive: true, user });
      parent = this.node(dirname(p));
      if (!parent) throw new FSError(`${dirname(p)}: No such file or directory`, 2);
    } else if (parent.type !== 'dir') {
      throw new FSError(`${dirname(p)}: Not a directory`);
    }
    if (parent) this.assertPerm(parent, 'write', dirname(p), user);
    const name = basename(p);
    if (parent.children[name]) throw new FSError(`${p}: File exists`, 1);
    const node = mkNode('dir', name);
    parent.children[name] = node;
    parent.mtime = Date.now();
    return node;
  }

  writeFile(path, data, { append = false, user = 'player', mode, owner, group } = {}) {
    const p = normalizeUnix(path);
    const parent = this.node(dirname(p));
    if (!parent) throw new FSError(`${dirname(p)}: No such file or directory`, 2);
    if (parent.type !== 'dir') throw new FSError(`${dirname(p)}: Not a directory`);
    const name = basename(p);
    let node = parent.children[name];
    if (node) {
      if (node.type === 'dir') throw new FSError(`${p}: Is a directory`);
      this.assertPerm(node, 'write', p, user);
      node.content = append ? node.content + data : String(data);
      node.mtime = Date.now();
    } else {
      this.assertPerm(parent, 'write', dirname(p), user);
      node = mkNode('file', name, { content: String(data), mode: mode || DEFAULT_FILE_MODE });
      parent.children[name] = node;
      parent.mtime = Date.now();
    }
    if (mode !== undefined) node.mode = mode;
    if (owner !== undefined) { node.owner = owner; }
    if (group !== undefined) node.group = group;
    return node;
  }

  touch(path, user = 'player') {
    const p = normalizeUnix(path);
    if (this.exists(p)) { this.node(p).mtime = Date.now(); return this.node(p); }
    return this.writeFile(p, '', { user });
  }

  rm(path, { recursive = false, user = 'player' } = {}) {
    const p = normalizeUnix(path);
    if (p === '/') throw new FSError('/: Operation not permitted');
    const node = this.node(p);
    if (!node) throw new FSError(`${p}: No such file or directory`, 2);
    const parent = this.node(dirname(p));
    this.assertPerm(parent, 'write', dirname(p), user);
    if (node.type === 'dir' && Object.keys(node.children).length && !recursive) {
      throw new FSError(`${p}: directory not empty`);
    }
    delete parent.children[basename(p)];
    parent.mtime = Date.now();
  }

  cp(src, dst, { recursive = false, user = 'player' } = {}) {
    const s = normalizeUnix(src);
    const d = normalizeUnix(dst);
    const sn = this.node(s);
    if (!sn) throw new FSError(`${s}: No such file or directory`, 2);
    if (this.isDir(d)) return this.cp(s, joinPath(d, basename(s)), { recursive, user });
    this.assertPerm(sn, 'read', s, user);
    if (sn.type === 'dir') {
      this.mkdir(d, { recursive: true, user });
      for (const child of Object.values(sn.children)) {
        this.cp(s + '/' + child.name, d + '/' + child.name, { recursive: true, user });
      }
      return;
    }
    this.writeFile(d, sn.content, { user, mode: sn.mode, owner: sn.owner, group: sn.group });
  }

  mv(src, dst, user = 'player') {
    const s = normalizeUnix(src);
    const d = normalizeUnix(dst);
    const sn = this.node(s);
    if (!sn) throw new FSError(`${s}: No such file or directory`, 2);
    let target = d;
    if (this.isDir(d)) target = joinPath(d, basename(s));
    const parent = this.node(dirname(target));
    if (!parent) throw new FSError(`${dirname(target)}: No such file or directory`, 2);
    this.assertPerm(parent, 'write', dirname(target), user);
    if (this.exists(target)) this.rm(target, { recursive: true, user });
    delete this.node(dirname(s)).children[basename(s)];
    parent.children[basename(target)] = sn;
    sn.name = basename(target);
    sn.mtime = Date.now();
  }

  ln(src, dst, { symbolic = true, force = false } = {}) {
    const target = this.node(normalizeUnix(src));
    if (!target) throw new FSError(`${src}: No such file or directory`, 2);
    let d = normalizeUnix(dst);
    if (this.isDir(d)) d = joinPath(d, basename(src));
    if (this.exists(d) && !force) throw new FSError(`${d}: File exists`);
    const parent = this.node(dirname(d));
    if (!parent) throw new FSError(`${dirname(d)}: No such file or directory`, 2);
    parent.children[basename(d)] = mkNode('file', basename(d), {
      content: symbolic ? normalizeUnix(src) : target.content,
      mode: target.mode,
      owner: target.owner,
      group: target.group,
      isLink: symbolic,
      linkTo: normalizeUnix(src),
    });
  }

  chmod(path, spec) {
    const p = normalizeUnix(path);
    const n = this.node(p);
    if (!n) throw new FSError(`${p}: No such file or directory`, 2);
    if (typeof spec === 'number') { n.mode = spec & 0o777; return n.mode; }
    // symbolic: +x, -w, u=rwx, go-w ...
    const sym = String(spec).trim();
    let m = n.mode;
    for (const clause of sym.split(',')) {
      const match = /^([augo]*)([=+-])([rwxXst]*)$/.exec(clause);
      if (!match) throw new FSError(`invalid mode: '${clause}'`);
      const [, whoRaw, op, permRaw] = match;
      const who = whoRaw || 'a';
      let value = 0;
      for (const c of permRaw) {
        if (c === 'r') value |= 4;
        else if (c === 'w') value |= 2;
        else if (c === 'x' || c === 'X') value |= 1;
      }
      const targets = [];
      if (who.includes('u') || who === 'a') targets.push(6);
      if (who.includes('g') || who === 'a') targets.push(3);
      if (who.includes('o') || who === 'a') targets.push(0);
      for (const shift of targets) {
        const cur = (m >> shift) & 7;
        const next = op === '+' ? cur | value : op === '-' ? cur & ~value : value;
        m = (m & ~(7 << shift)) | ((next & 7) << shift);
      }
    }
    n.mode = m & 0o777;
    return n.mode;
  }

  chown(path, owner, group) {
    const n = this.node(normalizeUnix(path));
    if (!n) throw new FSError(`${path}: No such file or directory`, 2);
    if (owner && owner.includes(':')) {
      const [o, g] = owner.split(':');
      if (o) n.owner = o;
      if (g) n.group = g;
    } else {
      if (owner) n.owner = owner;
      if (group) n.group = group;
    }
    return n;
  }

  size(node) {
    if (node.type === 'dir') return 4096 * (1 + Object.keys(node.children).length);
    return (node.content || '').length;
  }

  stat(path) {
    const p = normalizeUnix(path);
    const n = this.node(p);
    if (!n) throw new FSError(`${p}: No such file or directory`, 2);
    return {
      path: p,
      name: n.name,
      type: n.type,
      mode: n.mode,
      modeString: this.modeString(n),
      owner: n.owner,
      group: n.group,
      size: this.size(n),
      mtime: n.mtime,
      ctime: n.ctime,
      isLink: !!n.isLink,
    };
  }

  /* ---------- walking ---------------------------------------------------- */

  /** Depth-first walk of every node under `start`. cb(node, absPath) */
  walk(start, cb) {
    const rootPath = normalizeUnix(start);
    const recurse = (path) => {
      const node = this.node(path);
      if (!node) return;
      cb(node, path);
      if (node.type === 'dir') {
        for (const child of Object.values(node.children)) recurse(path + '/' + child.name);
      }
    };
    recurse(rootPath);
    return this;
  }

  /** All absolute paths under start (not including start itself). */
  listAll(start = '/') {
    const out = [];
    this.walk(start, (node, p) => { if (p !== normalizeUnix(start)) out.push({ path: p, node }); });
    return out;
  }

  deepCopy() {
    const v = new VFS();
    v.root = JSON.parse(JSON.stringify(this.root));
    return v;
  }

  toJSON() { return { root: this.root }; }

  static fromJSON(data) {
    const v = new VFS();
    if (data && data.root) v.root = data.root;
    return v;
  }
}