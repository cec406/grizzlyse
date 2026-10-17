// Reusable UI building blocks: chips, toasts, modal forms, inline-editable
// data tables, document (quote/invoice/PO/bill) forms with line items, and
// the drag-and-drop work order board.
import { h, append, clear, fmtDate, fmtDateShort, daysUntil, dueLabel, money, relTime, todayIso, escapeHtml } from './util.js?v=2.1.1';
import { icon } from './icons.js?v=2.1.1';
import { COLORS, collectionByName, TYPES, docTotals } from '../../shared/schema.js?v=2.1.1';
import { isValidPinFormat, sha256Hex } from '../../shared/gate.js?v=2.1.1';
import * as store from './store.js?v=2.1.1';

// ---- chips / badges ------------------------------------------------------
export function chip(text, color) {
  if (!text) return h('span', { class: 'muted' }, '—');
  return h('span', { class: 'chip', style: color ? { '--chip': color } : null }, text);
}

export function statusChip(value) {
  return chip(value, COLORS[value]);
}

export function dueBadge(days) {
  const { text, tone } = dueLabel(days);
  if (!text) return h('span', { class: 'muted' }, '—');
  return h('span', { class: `badge ${tone}` }, text);
}

// ---- toasts --------------------------------------------------------------
let toastHost = null;
export function toast(message, tone = 'ok') {
  if (!toastHost) {
    toastHost = h('div', { class: 'toast-host' });
    document.body.append(toastHost);
  }
  const node = h('div', { class: `toast ${tone}` }, icon(tone === 'error' ? 'alert' : 'check', 16), h('span', {}, message));
  toastHost.append(node);
  setTimeout(() => {
    node.classList.add('out');
    setTimeout(() => node.remove(), 300);
  }, 2600);
}

// ---- confirm dialog ------------------------------------------------------
export function confirmDialog({ title = 'Are you sure?', message = '', confirmLabel = 'Delete' } = {}) {
  return new Promise((resolve) => {
    const overlay = h('div', { class: 'overlay' });
    const close = (val) => {
      overlay.remove();
      document.removeEventListener('keydown', onKey);
      resolve(val);
    };
    const onKey = (e) => {
      if (e.key === 'Escape') close(false);
    };
    document.addEventListener('keydown', onKey);
    const dialog = h('div', { class: 'dialog small', role: 'dialog', 'aria-modal': 'true' },
      h('div', { class: 'dialog-head' }, h('h3', {}, title)),
      message ? h('div', { class: 'dialog-body' }, h('p', {}, message)) : null,
      h('div', { class: 'dialog-foot' },
        h('button', { class: 'btn ghost', onclick: () => close(false) }, 'Cancel'),
        h('button', { class: 'btn danger', onclick: () => close(true) }, confirmLabel),
      ),
    );
    overlay.append(dialog);
    overlay.addEventListener('mousedown', (e) => { if (e.target === overlay) close(false); });
    document.body.append(overlay);
    dialog.querySelector('.btn.danger').focus();
  });
}

// ---- modal form ----------------------------------------------------------
export function openForm({ collection, record = null, onSaved }) {
  // Documents (quotes/invoices/POs/bills) get the full document form with
  // line items instead of the simple record form.
  if (collectionByName[collection]?.doc) return openDocForm({ collection, record, onSaved });
  const meta = collectionByName[collection];
  const isEdit = Boolean(record?.id);
  const draft = {};
  for (const field of meta.fields) {
    if (field.type === 'computed' || field.type === TYPES.LINES || field.readonly) continue;
    draft[field.key] = record ? record[field.key] : field.default ?? '';
  }
  const inputs = new Map();
  const overlay = h('div', { class: 'overlay' });

  const close = () => {
    overlay.remove();
    document.removeEventListener('keydown', onKey);
  };
  const onKey = (e) => {
    if (e.key === 'Escape') close();
    if (e.key === 'Enter' && (e.metaKey || e.ctrlKey)) submit();
  };
  document.addEventListener('keydown', onKey);

  async function submit() {
    const patch = {};
    for (const [key, input] of inputs) patch[key] = readInput(input);
    try {
      await store.save(collection, isEdit ? record.id : null, patch);
      toast(`${isEdit ? 'Saved' : 'Added'} ${meta.singular.toLowerCase()}`);
      close();
      onSaved?.();
    } catch (err) {
      toast(err.message, 'error');
    }
  }

  const form = h('form', { class: 'dialog', role: 'dialog', 'aria-modal': 'true', onsubmit: (e) => { e.preventDefault(); submit(); } });
  form.append(
    h('div', { class: 'dialog-head' },
      h('h3', {}, isEdit ? `Edit ${meta.singular}` : `New ${meta.singular}`),
      iconButton('x', close, 'Close'),
    ),
  );
  const grid = h('div', { class: 'form-grid' });
  for (const field of meta.fields) {
    if (field.type === 'computed' || field.type === TYPES.LINES || field.readonly) continue;
    const input = fieldControl(field, draft[field.key]);
    inputs.set(field.key, input);
    grid.append(h('label', { class: `field ${field.type === TYPES.TEXTAREA ? 'full' : ''}` },
      h('span', { class: 'field-label' }, field.label, field.required ? h('em', {}, '*') : null),
      input,
    ));
  }
  form.append(h('div', { class: 'dialog-body' }, grid));
  form.append(
    h('div', { class: 'dialog-foot' },
      isEdit ? h('button', {
        type: 'button', class: 'btn danger ghost-soft',
        onclick: async () => {
          if (await confirmDialog({ title: `Delete ${meta.singular}?`, message: 'This cannot be undone.' })) {
            await store.remove(collection, record.id);
            toast('Deleted');
            close();
            onSaved?.();
          }
        },
      }, icon('trash', 16), 'Delete') : h('span', {}),
      h('span', { class: 'spacer' }),
      h('button', { type: 'button', class: 'btn ghost', onclick: close }, 'Cancel'),
      h('button', { type: 'submit', class: 'btn primary' }, icon('save', 16), isEdit ? 'Save Changes' : `Add ${meta.singular}`),
    ),
  );

  overlay.append(form);
  overlay.addEventListener('mousedown', (e) => { if (e.target === overlay) close(); });
  document.body.append(overlay);
  const first = grid.querySelector('input, select, textarea');
  first?.focus();
}

function readInput(input) {
  if (input.dataset.kind === 'bool') return input.checked;
  return input.value;
}

// A form control for a schema field, editable in the modal.
export function fieldControl(field, value) {
  const common = { id: `f-${field.key}`, class: 'input' };
  switch (field.type) {
    case TYPES.TEXTAREA:
      return h('textarea', { ...common, rows: 3, value: value ?? '' });
    case TYPES.SELECT: {
      const sel = h('select', common);
      sel.append(h('option', { value: '' }, '—'));
      for (const opt of field.options || []) sel.append(h('option', { value: opt, selected: opt === value }, opt));
      return sel;
    }
    case TYPES.REF: {
      const sel = h('select', common);
      sel.dataset.kind = 'text';
      sel.append(h('option', { value: '' }, '— none —'));
      for (const opt of store.options(field.ref)) sel.append(h('option', { value: opt.value, selected: opt.value === value }, opt.label));
      return sel;
    }
    case TYPES.NUMBER:
      return h('input', { ...common, type: 'number', step: field.step ?? 'any', value: value ?? '' });
    case TYPES.CURRENCY:
      return h('input', { ...common, type: 'number', step: '0.01', min: 0, value: value ?? '' });
    case TYPES.DATE:
      return h('input', { ...common, type: 'date', value: value ?? '' });
    case TYPES.BOOL: {
      const wrap = h('label', { class: 'switch' });
      const input = h('input', { type: 'checkbox', checked: Boolean(value) });
      input.dataset.kind = 'bool';
      wrap.append(input, h('span', { class: 'track' }), h('span', { class: 'switch-label' }, value ? 'On' : 'Off'));
      return wrap;
    }
    case TYPES.EMAIL:
      return h('input', { ...common, type: 'email', value: value ?? '' });
    case TYPES.TEL:
      return h('input', { ...common, type: 'tel', value: value ?? '' });
    case TYPES.URL:
      return h('input', { ...common, type: 'text', placeholder: 'https:// or \\\\server\\share', value: value ?? '' });
    default:
      return h('input', { ...common, type: 'text', value: value ?? '' });
  }
}

export function iconButton(name, onClick, title, extraClass = '') {
  return h('button', { type: 'button', class: `icon-btn ${extraClass}`, title, 'aria-label': title, onclick: onClick }, icon(name, 17));
}

// ---- value rendering -----------------------------------------------------
export function displayValue(field, record) {
  const raw = record[field.key];
  switch (field.type) {
    case 'computed': {
      if (field.key === 'nextDue') {
        const days = record.daysUntilDue;
        return h('span', { class: 'inline-gap' }, h('span', {}, fmtDateShort(raw)), dueBadge(days));
      }
      if (field.key === 'balance') {
        return Number(record.balance) > 0.005
          ? h('span', { class: record.isOverdue ? 'strong' : '' }, money(record.balance))
          : h('span', { class: 'muted' }, '—');
      }
      return String(raw ?? '');
    }
    case TYPES.SELECT:
      return statusChip(raw);
    case TYPES.REF:
      return store.label(field.ref, raw) || h('span', { class: 'muted' }, '—');
    case TYPES.DATE: {
      if (field.key === 'due') {
        return h('span', { class: 'inline-gap' }, h('span', {}, fmtDateShort(raw)), dueBadge(daysUntil(raw)));
      }
      return fmtDateShort(raw) || h('span', { class: 'muted' }, '—');
    }
    case TYPES.CURRENCY:
      return money(raw) || h('span', { class: 'muted' }, '—');
    case TYPES.BOOL:
      return raw ? icon('check', 16) : h('span', { class: 'muted' }, '—');
    case TYPES.URL:
      return urlCell(raw);
    case TYPES.NUMBER:
      return raw === null || raw === undefined || raw === '' ? h('span', { class: 'muted' }, '—') : String(raw);
    default:
      return raw === '' || raw === null || raw === undefined ? h('span', { class: 'muted' }, '—') : String(raw);
  }
}

function urlCell(url) {
  if (!url) return h('span', { class: 'muted' }, '—');
  const isWeb = /^https?:\/\//i.test(url);
  const label = h('span', { class: 'path-text', title: url }, url);
  const node = h('span', { class: 'path-cell' }, label);
  if (isWeb) {
    node.append(iconButton('external', () => window.open(url, '_blank', 'noopener'), 'Open link', 'tiny'));
  } else {
    node.append(iconButton('link', async () => {
      try {
        await navigator.clipboard.writeText(url);
        toast('Path copied to clipboard');
      } catch {
        toast('Copy failed', 'error');
      }
    }, 'Copy network path', 'tiny'));
  }
  return node;
}

// ---- inline editable table ----------------------------------------------
export function dataTable({ collection, items, sort, onSort, rowClass, extraActions, hiddenColumns = [] }) {
  const meta = collectionByName[collection];
  const isDoc = Boolean(meta.doc);
  const editRecord = (record) => (isDoc ? openDocForm({ collection, record }) : openForm({ collection, record }));
  const columns = meta.fields.filter((f) => f.table !== false && !hiddenColumns.includes(f.key));
  const table = h('table', { class: 'data-table' });

  const thead = h('thead');
  const headRow = h('tr');
  for (const field of columns) {
    const active = sort?.key === field.key;
    headRow.append(h('th', {
      class: `${field.width === 'wide' ? 'wide' : ''} ${active ? 'sorted' : ''} sortable`,
      onclick: () => onSort?.(field.key),
      title: 'Sort by ' + field.label,
    }, h('span', {}, field.label), active ? h('span', { class: 'sort-arrow' }, sort.dir === 'desc' ? '▾' : '▴') : null));
  }
  headRow.append(h('th', { class: 'actions-col' }, ''));
  thead.append(headRow);
  table.append(thead);

  const tbody = h('tbody');
  if (!items.length) {
    tbody.append(h('tr', {}, h('td', { colspan: columns.length + 1, class: 'empty' },
      `No ${meta.label.toLowerCase()} yet — click "New ${meta.singular}" to create one.`)));
  }
  for (const record of items) {
    const tr = h('tr', { class: rowClass ? rowClass(record) : '', dataset: { id: record.id } });
    for (const field of columns) {
      tr.append(editableCell(collection, record, field));
    }
    const actions = h('td', { class: 'actions-col' });
    if (extraActions) append(actions, extraActions(record));
    actions.append(
      iconButton('edit', () => editRecord(record), 'Edit'),
      iconButton('trash', async () => {
        if (await confirmDialog({ title: `Delete ${meta.singular}?`, message: `"${record[meta.primary]}" will be removed.` })) {
          try {
            await store.remove(collection, record.id);
            toast('Deleted');
          } catch (err) {
            toast(err.message, 'error');
          }
        }
      }, 'Delete', 'danger-hover'),
    );
    tr.append(actions);
    tbody.append(tr);
  }
  table.append(tbody);
  return table;
}

function editableCell(collection, record, field) {
  const meta = collectionByName[collection];
  const td = h('td', { class: `${field.width === 'wide' ? 'wide' : ''} editable`, tabindex: '0' });
  const render = () => {
    clear(td);
    td.append(displayValue(field, record));
  };
  td.append(displayValue(field, record));

  const enterEdit = () => {
    // Documents keep their status/date discipline: the workflow owns status,
    // readonly fields are engine-owned, and line items are edited in the form.
    if (field.type === 'computed' || field.readonly || field.type === TYPES.LINES) return;
    if (meta.doc && field.key === meta.statusKey) return;
    const input = inlineControl(field, record[field.key]);
    clear(td);
    td.append(input);
    input.focus();
    if (input.select) input.select();

    let done = false;
    const commit = async (save) => {
      if (done) return;
      done = true;
      const value = readInput(input);
      render();
      if (save && String(value) !== String(record[field.key] ?? '')) {
        try {
          await store.save(collection, record.id, { [field.key]: value });
        } catch (err) {
          toast(err.message, 'error');
        }
      }
    };
    input.addEventListener('blur', () => commit(true));
    input.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') { e.preventDefault(); input.blur(); }
      if (e.key === 'Escape') { e.preventDefault(); done = true; render(); }
    });
    if (input.tagName === 'SELECT') input.addEventListener('change', () => commit(true));
  };

  td.addEventListener('click', (e) => {
    if (td.classList.contains('editing')) return;
    if (e.target.closest('.icon-btn')) return;
    enterEdit();
  });
  td.addEventListener('keydown', (e) => { if (e.key === 'Enter') enterEdit(); });
  return td;
}

function inlineControl(field, value) {
  const input = fieldControl(field, value);
  input.classList.add('inline-input');
  return input;
}

// ---- kanban board --------------------------------------------------------
export function workBoard({ collection = 'workorders', onOpen }) {
  const meta = collectionByName[collection];
  const statusField = meta.fields.find((f) => f.key === meta.statusKey);
  const columns = statusField.options;
  const board = h('div', { class: 'board' });
  const all = store.col(collection);

  for (const status of columns) {
    const cards = all.filter((r) => (r[meta.statusKey] || columns[0]) === status);
    const columnEl = h('div', { class: 'board-col', dataset: { status } });
    columnEl.append(h('div', { class: 'board-col-head' },
      statusChip(status),
      h('span', { class: 'count' }, cards.length),
    ));
    const bodyEl = h('div', { class: 'board-col-body' });
    for (const record of cards) bodyEl.append(boardCard(meta, record, onOpen));
    bodyEl.append(h('div', { class: 'board-empty' }, cards.length ? '' : 'Drop here'));
    columnEl.append(bodyEl);
    enableDropTarget(columnEl, meta, status);
    board.append(columnEl);
  }
  return board;
}

function boardCard(meta, record, onOpen) {
  const card = h('article', { class: 'card', draggable: 'true', dataset: { id: record.id } });
  card.append(h('div', { class: 'card-top' }, statusChip(record.priority)));
  card.append(h('h4', { class: 'card-title' }, record[meta.primary]));
  const bits = [];
  if (record.assetId) bits.push(h('span', { class: 'card-bit' }, icon('machine', 13), store.label('assets', record.assetId)));
  if (record.assigneeId) bits.push(h('span', { class: 'card-bit' }, icon('people', 13), store.label('people', record.assigneeId)));
  if (record.due) bits.push(h('span', { class: 'card-bit' }, icon('calendar', 13), fmtDateShort(record.due)));
  if (bits.length) card.append(h('div', { class: 'card-bits' }, bits));
  if (record.due) card.append(dueBadge(daysUntil(record.due)));
  card.addEventListener('dragstart', (e) => {
    e.dataTransfer.setData('text/plain', record.id);
    e.dataTransfer.effectAllowed = 'move';
    card.classList.add('dragging');
  });
  card.addEventListener('dragend', () => card.classList.remove('dragging'));
  card.addEventListener('click', () => onOpen?.(record));
  return card;
}

function enableDropTarget(columnEl, meta, status) {
  columnEl.addEventListener('dragover', (e) => {
    e.preventDefault();
    columnEl.classList.add('over');
  });
  columnEl.addEventListener('dragleave', () => columnEl.classList.remove('over'));
  columnEl.addEventListener('drop', async (e) => {
    e.preventDefault();
    columnEl.classList.remove('over');
    const id = e.dataTransfer.getData('text/plain');
    const record = store.byId(meta.name, id);
    if (!record || record[meta.statusKey] === status) return;
    try {
      await store.save(meta.name, id, { [meta.statusKey]: status });
      if (status === 'Done') toast(`"${record[meta.primary]}" marked done`);
    } catch (err) {
      toast(err.message, 'error');
    }
  });
}

// ---- misc ----------------------------------------------------------------
export function sectionHeader(title, subtitle, ...actions) {
  return h('div', { class: 'section-head' },
    h('div', {}, h('h2', {}, title), subtitle ? h('p', { class: 'muted' }, subtitle) : null),
    h('div', { class: 'section-actions' }, ...actions),
  );
}

export function activityList(items, limit = 12) {
  const list = h('ul', { class: 'activity' });
  for (const item of items.slice(0, limit)) {
    list.append(h('li', {},
      h('span', { class: 'dot' }),
      h('div', {},
        h('div', {}, item.text),
        h('div', { class: 'muted small' }, `${item.actor || 'unknown'} · ${relTime(item.at)}`),
      ),
    ));
  }
  if (!items.length) list.append(h('li', { class: 'muted' }, 'No activity yet.'));
  return list;
}

export function kpi(label, value, tone = '', sub = '') {
  return h('div', { class: `kpi ${tone}` },
    h('div', { class: 'kpi-value' }, String(value)),
    h('div', { class: 'kpi-label' }, label),
    sub ? h('div', { class: 'kpi-sub' }, sub) : null,
  );
}

export function barChart(entries) {
  const max = Math.max(1, ...entries.map((e) => e.value));
  const wrap = h('div', { class: 'bars' });
  for (const e of entries) {
    wrap.append(h('div', { class: 'bar-row' },
      h('span', { class: 'bar-label' }, e.label),
      h('div', { class: 'bar-track' }, h('div', { class: 'bar-fill', style: { width: `${(e.value / max) * 100}%`, background: e.color || 'var(--accent)' } })),
      h('span', { class: 'bar-value' }, String(e.value)),
    ));
  }
  return wrap;
}

// ===========================================================================
// Documents: quotes, invoices, purchase orders, vendor bills.
// A document = header fields + line items + engine-computed totals.
// ===========================================================================

const money2 = (n) => `$${(Number(n) || 0).toFixed(2)}`;

// Editable line-item table. Values update the working copy in place; structural
// changes (add / remove / kind / part) redraw the rows. getLines() returns the
// current array for saving; totalsBox always shows docTotals() of the live copy.
export function linesEditor({ lines, taxRate, onTotals }) {
  let working = (lines || []).map((l) => ({ ...l }));
  let rate = Number(taxRate) || 0;

  const container = h('div', { class: 'lines-editor' });
  const rowsHost = h('div', { class: 'lines-rows' });
  const totals = h('div', { class: 'lines-totals' });
  container.append(rowsHost, totals);

  function refreshTotals() {
    const t = docTotals(working, rate);
    clear(totals);
    totals.append(
      h('div', { class: 'line-total-row' }, h('span', {}, 'Subtotal'), h('b', {}, money2(t.subtotal))),
      rate > 0 ? h('div', { class: 'line-total-row' }, h('span', {}, `Tax (${rate}%)`), h('b', {}, money2(t.taxAmount))) : null,
      h('div', { class: 'line-total-row grand' }, h('span', {}, 'Total'), h('b', {}, money2(t.total))),
    );
    onTotals?.(t);
    return t;
  }

  function partOptions() {
    return store.options('parts');
  }

  function redrawRows() {
    clear(rowsHost);
    if (!working.length) {
      rowsHost.append(h('div', { class: 'muted small lines-empty' }, 'No line items yet — add labor, parts or free-form items below.'));
    }
    working.forEach((l, idx) => rowsHost.append(rowEditor(l, idx)));
  }

  function rowEditor(l, idx) {
    const kindSel = h('select', { class: 'input compact', title: 'Line type' },
      ...['part', 'labor', 'item'].map((k) => h('option', { value: k, selected: k === l.kind }, k === 'part' ? 'Part' : k === 'labor' ? 'Labor' : 'Item')));
    kindSel.addEventListener('change', () => {
      l.kind = kindSel.value;
      if (l.kind !== 'part') l.partId = '';
      if (l.kind === 'labor') l.taxable = false;
      else if (l.kind !== 'labor') l.taxable = l.taxable ?? true;
      redrawRows();
      refreshTotals();
    });

    const partSel = h('select', { class: 'input compact', title: 'Pull from inventory' });
    partSel.append(h('option', { value: '' }, '— pick a part —'));
    for (const opt of partOptions()) partSel.append(h('option', { value: opt.value, selected: opt.value === l.partId }, opt.label));
    partSel.addEventListener('change', () => {
      l.partId = partSel.value;
      const part = store.byId('parts', l.partId);
      if (part) {
        l.unitPrice = Number(part.price) || Number(part.cost) || 0;
        if (!l.description) l.description = part.name;
        l.qty = l.qty || 1;
        priceIn.value = l.unitPrice;
        qtyIn.value = l.qty;
        descIn.value = l.description;
      }
      refreshTotals();
    });

    const descIn = h('input', { class: 'input compact', placeholder: 'Description', value: l.description ?? '' });
    descIn.addEventListener('input', () => { l.description = descIn.value; });

    const qtyIn = h('input', { class: 'input compact num', type: 'number', step: 'any', min: 0, value: l.qty ?? 1 });
    qtyIn.addEventListener('input', () => { l.qty = Number(qtyIn.value) || 0; refreshTotals(); });

    const priceIn = h('input', { class: 'input compact num', type: 'number', step: '0.01', min: 0, value: l.unitPrice ?? 0 });
    priceIn.addEventListener('input', () => { l.unitPrice = Number(priceIn.value) || 0; refreshTotals(); });

    const taxIn = h('input', { type: 'checkbox', checked: l.taxable !== false, title: 'Taxable' });
    taxIn.addEventListener('change', () => { l.taxable = taxIn.checked; refreshTotals(); });

    const amount = h('span', { class: 'line-amount' }, money2((Number(l.qty) || 0) * (Number(l.unitPrice) || 0)));
    qtyIn.addEventListener('input', () => { amount.textContent = money2((Number(qtyIn.value) || 0) * (Number(l.unitPrice) || 0)); });
    priceIn.addEventListener('input', () => { amount.textContent = money2((Number(qtyIn.value) || 0) * (Number(priceIn.value) || 0)); });

    const row = h('div', { class: 'lines-row' },
      h('div', { class: 'lr-kind' }, kindSel, l.kind === 'part' ? partSel : null),
      h('div', { class: 'lr-desc' }, descIn),
      h('div', { class: 'lr-num' }, qtyIn),
      h('div', { class: 'lr-num' }, priceIn),
      h('label', { class: 'lr-tax', title: 'Taxable' }, taxIn, h('span', { class: 'muted small' }, 'tax')),
      h('div', { class: 'lr-amount' }, amount),
      iconButton('x', () => {
        working.splice(idx, 1);
        redrawRows();
        refreshTotals();
      }, 'Remove line'),
    );
    return row;
  }

  const bar = h('div', { class: 'lines-addbar' },
    h('button', { type: 'button', class: 'btn ghost', onclick: () => {
      working.push({ id: `ln-${Math.random().toString(36).slice(2, 8)}`, kind: 'labor', partId: '', description: '', qty: 1, unitPrice: Number(store.state.settings?.defaultLaborRate) || 0, taxable: false });
      redrawRows();
      refreshTotals();
    } }, icon('timer', 15), 'Labor line'),
    h('button', { type: 'button', class: 'btn ghost', onclick: () => {
      working.push({ id: `ln-${Math.random().toString(36).slice(2, 8)}`, kind: 'part', partId: '', description: '', qty: 1, unitPrice: 0, taxable: true });
      redrawRows();
      refreshTotals();
    } }, icon('box', 15), 'Part line'),
    h('button', { type: 'button', class: 'btn ghost', onclick: () => {
      working.push({ id: `ln-${Math.random().toString(36).slice(2, 8)}`, kind: 'item', partId: '', description: '', qty: 1, unitPrice: 0, taxable: true });
      redrawRows();
      refreshTotals();
    } }, icon('plus', 15), 'Free-form item'),
  );

  container.append(bar);
  redrawRows();
  refreshTotals();

  return {
    node: container,
    getLines: () => working.filter((l) => (Number(l.qty) || 0) !== 0 || (Number(l.unitPrice) || 0) !== 0 || l.description),
    setTaxRate: (v) => { rate = Number(v) || 0; refreshTotals(); },
    refreshTotals,
  };
}

// Full document form: header fields + the line editor. Used for create AND
// edit (edit only ever opens on editable/draft documents — the engine blocks
// the rest at the API layer too).
export function openDocForm({ collection, record = null, onSaved }) {
  const meta = collectionByName[collection];
  const isEdit = Boolean(record?.id);
  const draft = {};
  for (const field of meta.fields) {
    if (field.type === 'computed' || field.type === TYPES.LINES || field.readonly) continue;
    draft[field.key] = record ? record[field.key] : field.default ?? '';
  }
  if (!record && collection !== 'purchaseorders' && collection !== 'bills') {
    draft.taxRate = draft.taxRate ?? (Number(store.state.settings?.defaultTaxRate) || 0);
  }
  if (isEdit && record.status !== 'Draft' && EDITABLE_OK[collection] && !EDITABLE_OK[collection].includes(record.status)) {
    // Engine would reject anyway; show the read-only detail instead.
    return docDetail({ collection, record });
  }

  const inputs = new Map();
  const overlay = h('div', { class: 'overlay' });
  const linesField = meta.fields.find((f) => f.type === TYPES.LINES);
  const editor = linesEditor({
    lines: record?.lines || [],
    taxRate: draft.taxRate || 0,
  });

  const close = () => {
    overlay.remove();
    document.removeEventListener('keydown', onKey);
  };
  const onKey = (e) => {
    if (e.key === 'Escape') close();
    if (e.key === 'Enter' && (e.metaKey || e.ctrlKey)) submit();
  };
  document.addEventListener('keydown', onKey);

  async function submit() {
    const patch = {};
    for (const [key, input] of inputs) patch[key] = readInput(input);
    patch.lines = editor.getLines();
    try {
      await store.save(collection, isEdit ? record.id : null, patch);
      toast(`${isEdit ? 'Saved' : 'Created'} ${meta.singular.toLowerCase()}`);
      close();
      onSaved?.();
    } catch (err) {
      toast(err.message, 'error');
    }
  }

  const form = h('form', { class: 'dialog doc-dialog', role: 'dialog', 'aria-modal': 'true', onsubmit: (e) => { e.preventDefault(); submit(); } });
  form.append(
    h('div', { class: 'dialog-head' },
      h('h3', {}, isEdit ? `${meta.singular} ${record.number || ''}` : `New ${meta.singular}`),
      record?.status ? statusChip(record.status) : null,
      iconButton('x', close, 'Close'),
    ),
  );

  const grid = h('div', { class: 'form-grid' });
  for (const field of meta.fields) {
    if (field.type === 'computed' || field.type === TYPES.LINES || field.readonly) continue;
    const input = fieldControl(field, draft[field.key]);
    inputs.set(field.key, input);
    grid.append(h('label', { class: `field ${field.type === TYPES.TEXTAREA ? 'full' : ''}` },
      h('span', { class: 'field-label' }, field.label, field.required ? h('em', {}, '*') : null),
      input,
    ));
  }
  form.append(h('div', { class: 'dialog-body' }, grid));

  if (linesField) {
    const taxInput = inputs.get('taxRate');
    taxInput?.addEventListener('input', () => editor.setTaxRate(taxInput.value));
    form.append(h('div', { class: 'doc-lines-wrap' },
      h('div', { class: 'doc-lines-head' }, h('span', { class: 'field-label' }, 'Line items'), h('span', { class: 'muted small' }, 'parts pull price + stock from inventory')),
      editor.node,
    ));
  }

  form.append(
    h('div', { class: 'dialog-foot' },
      isEdit ? h('button', {
        type: 'button', class: 'btn danger ghost-soft',
        onclick: async () => {
          if (await confirmDialog({ title: `Delete ${meta.singular}?`, message: 'Only draft documents can be deleted.' })) {
            try {
              await store.remove(collection, record.id);
              toast('Deleted');
              close();
              onSaved?.();
            } catch (err) {
              toast(err.message, 'error');
            }
          }
        },
      }, icon('trash', 16), 'Delete') : h('span', {}),
      h('span', { class: 'spacer' }),
      h('button', { type: 'button', class: 'btn ghost', onclick: close }, 'Cancel'),
      h('button', { type: 'submit', class: 'btn primary' }, icon('save', 16), isEdit ? 'Save Changes' : `Create ${meta.singular}`),
    ),
  );

  overlay.append(form);
  overlay.addEventListener('mousedown', (e) => { if (e.target === overlay) close(); });
  document.body.append(overlay);
  const first = grid.querySelector('input, select, textarea');
  first?.focus();
}

const EDITABLE_OK = {
  quotes: ['Draft'],
  invoices: ['Draft'],
  purchaseorders: ['Draft', 'Ordered'],
  bills: ['Draft'],
};

// Read-only document view (what you see on a sent invoice/PO — with Print).
export function docDetail({ collection, record }) {
  const meta = collectionByName[collection];
  const overlay = h('div', { class: 'overlay' });
  const close = () => {
    overlay.remove();
    document.removeEventListener('keydown', onKey);
  };
  const onKey = (e) => { if (e.key === 'Escape') close(); };
  document.addEventListener('keydown', onKey);

  const who = record.customerId ? store.label('customers', record.customerId)
    : record.vendorId ? store.label('vendors', record.vendorId) : '';
  const job = record.jobId ? store.label('jobs', record.jobId) : '';

  const table = h('table', { class: 'data-table doc-lines-table' });
  table.append(h('thead', {}, h('tr', {},
    h('th', {}, 'Type'), h('th', { class: 'wide' }, 'Description'), h('th', {}, 'Qty'), h('th', {}, 'Unit'), h('th', {}, 'Amount'))));
  const tbody = h('tbody');
  for (const l of record.lines || []) {
    tbody.append(h('tr', {},
      h('td', {}, h('span', { class: 'muted small' }, l.kind)),
      h('td', { class: 'wide' }, l.description || (l.partId ? store.label('parts', l.partId) : '—')),
      h('td', {}, String(l.qty)),
      h('td', {}, money2(l.unitPrice)),
      h('td', {}, money2(l.qty * l.unitPrice)),
    ));
  }
  table.append(tbody);

  const received = (record.lines || []).every((l) => l.receivedQty === undefined) ? null
    : (record.lines || []).some((l) => l.receivedQty !== undefined);

  const body = h('div', { class: 'dialog doc-dialog view-mode', role: 'dialog', 'aria-modal': 'true' },
    h('div', { class: 'dialog-head' },
      h('h3', {}, `${meta.singular} ${record.number}`),
      statusChip(record.status),
      iconButton('x', close, 'Close'),
    ),
    h('div', { class: 'dialog-body' },
      h('div', { class: 'doc-meta' },
        h('div', {}, h('span', { class: 'muted small' }, record.customerId ? 'Customer' : 'Vendor'), h('div', { class: 'strong' }, who || '—')),
        job ? h('div', {}, h('span', { class: 'muted small' }, 'Job'), h('div', { class: 'strong' }, job)) : null,
        h('div', {}, h('span', { class: 'muted small' }, 'Date'), h('div', {}, fmtDate(record.date))),
        record.dueDate ? h('div', {}, h('span', { class: 'muted small' }, 'Due'), h('div', {}, fmtDate(record.dueDate))) : null,
      ),
      table,
      received !== null ? h('p', { class: 'muted small' }, 'Quantities marked received drive stock levels and purchase flows.') : null,
      h('div', { class: 'doc-totals' },
        h('div', { class: 'line-total-row' }, h('span', {}, 'Subtotal'), h('b', {}, money2(record.subtotal))),
        record.taxAmount ? h('div', { class: 'line-total-row' }, h('span', {}, 'Tax'), h('b', {}, money2(record.taxAmount))) : null,
        h('div', { class: 'line-total-row grand' }, h('span', {}, 'Total'), h('b', {}, money2(record.total))),
        record.paid !== undefined ? h('div', { class: 'line-total-row' }, h('span', {}, 'Paid'), h('b', {}, money2(record.paid))) : null,
        record.paid !== undefined ? h('div', { class: 'line-total-row grand' }, h('span', {}, 'Balance'), h('b', {}, money2((Number(record.total) || 0) - (Number(record.paid) || 0)))) : null,
      ),
      record.notes ? h('p', { class: 'muted small' }, record.notes) : null,
    ),
    h('div', { class: 'dialog-foot' },
      h('button', { type: 'button', class: 'btn ghost', onclick: () => printDoc(collection, record) }, icon('print', 16), 'Print'),
      h('span', { class: 'spacer' }),
      h('button', { type: 'button', class: 'btn primary', onclick: close }, 'Done'),
    ),
  );

  overlay.append(body);
  overlay.addEventListener('mousedown', (e) => { if (e.target === overlay) close(); });
  document.body.append(overlay);
}

// Printable document: opens a new window with a clean, ink-friendly layout.
export function printDoc(collection, record) {
  const s = store.state.settings || {};
  const meta = collectionByName[collection];
  const who = record.customerId ? store.label('customers', record.customerId) : record.vendorId ? store.label('vendors', record.vendorId) : '';
  const whoAddr = (() => {
    if (record.customerId) {
      const c = store.byId('customers', record.customerId);
      return c ? [c.address, c.phone, c.email].filter(Boolean).join(' · ') : '';
    }
    const v = store.byId('vendors', record.vendorId);
    return v ? [v.category, v.phone, v.email].filter(Boolean).join(' · ') : '';
  })();
  const rows = (record.lines || []).map((l) => `<tr>
    <td>${l.kind}</td><td>${escapeHtml(l.description || (l.partId ? store.label('parts', l.partId) : ''))}</td>
    <td style="text-align:right">${l.qty}</td><td style="text-align:right">${money2(l.unitPrice)}</td>
    <td style="text-align:right">${money2(l.qty * l.unitPrice)}</td></tr>`).join('');
  const balance = (Number(record.total) || 0) - (Number(record.paid) || 0);
  const html = `<!doctype html><html><head><meta charset="utf-8"><title>${meta.singular} ${record.number}</title>
  <style>
    body { font: 14px/1.45 -apple-system, "Segoe UI", Roboto, Helvetica, Arial, sans-serif; color: #111; margin: 40px; }
    .head { display: flex; justify-content: space-between; align-items: flex-start; border-bottom: 3px solid #111; padding-bottom: 14px; }
    h1 { margin: 0; font-size: 26px; letter-spacing: -0.5px; }
    .meta { text-align: right; font-size: 13px; color: #444; }
    .party { margin: 18px 0; font-size: 14px; }
    .party b { font-size: 16px; }
    table { width: 100%; border-collapse: collapse; margin-top: 10px; }
    th { text-align: left; font-size: 11px; text-transform: uppercase; letter-spacing: .05em; color: #666; border-bottom: 2px solid #111; padding: 6px 8px; }
    td { padding: 7px 8px; border-bottom: 1px solid #ddd; }
    .totals { margin-top: 14px; margin-left: auto; width: 260px; font-size: 14px; }
    .totals div { display: flex; justify-content: space-between; padding: 3px 0; }
    .totals .grand { border-top: 2px solid #111; font-weight: 700; font-size: 16px; margin-top: 6px; padding-top: 6px; }
    .foot { margin-top: 30px; font-size: 12px; color: #555; border-top: 1px solid #ccc; padding-top: 10px; }
    @media print { body { margin: 12mm; } }
  </style></head><body>
    <div class="head">
      <div><h1>${escapeHtml(s.shopName || s.brandName || 'GrizzWorks')}</h1>
        <div>${escapeHtml([s.bizAddress, s.bizPhone, s.bizEmail].filter(Boolean).join(' · '))}</div></div>
      <div class="meta"><b>${meta.singular}</b><br>${escapeHtml(record.number || '')}<br>Date: ${escapeHtml(record.date || '')}${record.dueDate ? `<br>Due: ${escapeHtml(record.dueDate)}` : ''}</div>
    </div>
    <div class="party"><b>${escapeHtml(who || '—')}</b><br>${escapeHtml(whoAddr)}</div>
    <table><thead><tr><th>Type</th><th>Description</th><th style="text-align:right">Qty</th><th style="text-align:right">Unit</th><th style="text-align:right">Amount</th></tr></thead><tbody>${rows}</tbody></table>
    <div class="totals">
      <div><span>Subtotal</span><span>${money2(record.subtotal)}</span></div>
      ${record.taxAmount ? `<div><span>Tax</span><span>${money2(record.taxAmount)}</span></div>` : ''}
      <div class="grand"><span>Total</span><span>${money2(record.total)}</span></div>
      ${record.paid !== undefined ? `<div><span>Paid</span><span>${money2(record.paid)}</span></div><div class="grand"><span>Balance due</span><span>${money2(balance)}</span></div>` : ''}
    </div>
    <div class="foot">${escapeHtml(record.notes || '')}</div>
    <script>window.onload = () => window.print()</script>
  </body></html>`;
  const w = window.open('', '_blank', 'width=820,height=900');
  if (!w) {
    toast('Allow pop-ups to print', 'error');
    return;
  }
  w.document.open();
  w.document.write(html);
  w.document.close();
}

// Record a customer payment / vendor payment against a document.
export function openPaymentForm({ collection, doc, onSaved }) {
  const isCustomer = collection === 'payments';
  const refKey = isCustomer ? 'invoiceId' : 'billId';
  const balance = (Number(doc.total) || 0) - (Number(doc.paid) || 0);
  const amountIn = h('input', { class: 'input', type: 'number', step: '0.01', min: 0, value: balance.toFixed(2) });
  const dateIn = h('input', { class: 'input', type: 'date', value: todayIso() });
  const methodIn = h('select', { class: 'input' },
    ...['Cash', 'Check', 'Card', 'ACH', 'Other'].map((m) => h('option', { value: m, selected: m === (isCustomer ? 'Cash' : 'Check') }, m)));
  const refIn = h('input', { class: 'input', placeholder: 'Check #, auth code, memo…' });

  const overlay = h('div', { class: 'overlay' });
  const close = () => overlay.remove();
  const form = h('form', { class: 'dialog small', role: 'dialog', 'aria-modal': 'true', onsubmit: async (e) => {
    e.preventDefault();
    try {
      await store.save(collection, null, {
        [refKey]: doc.id,
        amount: Number(amountIn.value) || 0,
        date: dateIn.value,
        method: methodIn.value,
        reference: refIn.value,
      });
      toast(isCustomer ? `Payment recorded on ${doc.number}` : `Bill ${doc.number} paid down`);
      close();
      onSaved?.();
    } catch (err) {
      toast(err.message, 'error');
    }
  } });
  form.append(
    h('div', { class: 'dialog-head' }, h('h3', {}, isCustomer ? 'Record Payment' : 'Pay Vendor Bill'), iconButton('x', close, 'Close')),
    h('div', { class: 'dialog-body' },
      h('p', { class: 'muted small' }, `${isCustomer ? 'Invoice' : 'Bill'} ${doc.number} — balance due ${money2(balance)}`),
      h('label', { class: 'field' }, h('span', { class: 'field-label' }, 'Amount'), amountIn),
      h('label', { class: 'field' }, h('span', { class: 'field-label' }, 'Date'), dateIn),
      h('label', { class: 'field' }, h('span', { class: 'field-label' }, 'Method'), methodIn),
      h('label', { class: 'field' }, h('span', { class: 'field-label' }, 'Reference'), refIn),
    ),
    h('div', { class: 'dialog-foot' },
      h('button', { type: 'button', class: 'btn ghost', onclick: close }, 'Cancel'),
      h('button', { type: 'submit', class: 'btn primary' }, icon('dollar', 16), 'Save Payment'),
    ),
  );
  overlay.append(form);
  overlay.addEventListener('mousedown', (e) => { if (e.target === overlay) close(); });
  document.body.append(overlay);
  amountIn.focus();
  amountIn.select();
}

// Receive goods on a purchase order (partial quantities supported).
export function receiveDialog({ record, onSaved }) {
  const overlay = h('div', { class: 'overlay' });
  const close = () => overlay.remove();
  const qtyInputs = [];

  const rows = (record.lines || []).map((l) => {
    const ordered = Number(l.qty) || 0;
    const already = Number(l.receivedQty) || 0;
    const open = Math.max(0, ordered - already);
    const input = h('input', { class: 'input compact num', type: 'number', step: 'any', min: 0, value: open || '', disabled: open <= 0 });
    qtyInputs.push({ lineId: l.id, input, open });
    return h('tr', {},
      h('td', { class: 'wide' }, l.description || store.label('parts', l.partId) || '—'),
      h('td', {}, String(ordered)),
      h('td', {}, String(already)),
      h('td', {}, input),
    );
  });

  const form = h('form', { class: 'dialog small', role: 'dialog', 'aria-modal': 'true', onsubmit: async (e) => {
    e.preventDefault();
    const lines = qtyInputs
      .map(({ lineId, input, open }) => ({ lineId, qty: Math.min(Number(input.value) || 0, open) }))
      .filter((r) => r.qty > 0);
    if (!lines.length) {
      toast('Enter a quantity to receive', 'error');
      return;
    }
    try {
      await store.docAction('purchaseorders', record.id, 'receive', { lines });
      toast(`Goods received on ${record.number} — stock updated`);
      close();
      onSaved?.();
    } catch (err) {
      toast(err.message, 'error');
    }
  } });

  form.append(
    h('div', { class: 'dialog-head' }, h('h3', {}, `Receive goods — ${record.number}`), iconButton('x', close, 'Close')),
    h('div', { class: 'dialog-body' },
      h('p', { class: 'muted small' }, 'Received quantities go straight into stock (moving-average cost) and post to the ledger.'),
      h('table', { class: 'data-table' },
        h('thead', {}, h('tr', {}, h('th', { class: 'wide' }, 'Line'), h('th', {}, 'Ordered'), h('th', {}, 'Received'), h('th', {}, 'Receive now'))),
        h('tbody', {}, rows),
      ),
    ),
    h('div', { class: 'dialog-foot' },
      h('button', { type: 'button', class: 'btn ghost', onclick: close }, 'Cancel'),
      h('button', { type: 'submit', class: 'btn primary' }, icon('check', 16), 'Receive'),
    ),
  );
  overlay.append(form);
  overlay.addEventListener('mousedown', (e) => { if (e.target === overlay) close(); });
  document.body.append(overlay);
  qtyInputs[0]?.input.focus();
}

// ===========================================================================
// Admin PIN — the money gate (server-enforced; demo verifies locally)
// ===========================================================================

// Ask for the admin PIN. resolve(true) only after `unlock(pin)` succeeds.
export function openPinDialog({ title = 'Admin PIN', message = '', unlock }) {
  return new Promise((resolve) => {
    const overlay = h('div', { class: 'overlay' });
    const close = (val) => {
      overlay.remove();
      document.removeEventListener('keydown', onKey);
      resolve(val);
    };
    const onKey = (e) => { if (e.key === 'Escape') close(false); };
    document.addEventListener('keydown', onKey);
    const input = h('input', { class: 'input', type: 'password', inputmode: 'numeric', autocomplete: 'off', maxlength: 8, placeholder: '••••' });
    const form = h('form', { class: 'dialog small', role: 'dialog', 'aria-modal': 'true', onsubmit: async (e) => {
      e.preventDefault();
      try {
        await unlock(input.value.trim());
        toast('Unlocked — money is visible on this screen');
        close(true);
      } catch (err) {
        toast(err.message, 'error');
        input.select();
      }
    } });
    form.append(
      h('div', { class: 'dialog-head' }, h('h3', {}, title), iconButton('x', () => close(false), 'Close')),
      message ? h('div', { class: 'dialog-body' }, h('p', { class: 'muted' }, message)) : null,
      h('div', { class: 'dialog-body' }, h('label', { class: 'field' }, h('span', { class: 'field-label' }, 'PIN (4–8 digits)'), input)),
      h('div', { class: 'dialog-foot' },
        h('button', { type: 'button', class: 'btn ghost', onclick: () => close(false) }, 'Cancel'),
        h('button', { type: 'submit', class: 'btn primary' }, icon('unlock', 16), 'Unlock'),
      ),
    );
    overlay.append(form);
    overlay.addEventListener('mousedown', (e) => { if (e.target === overlay) close(false); });
    document.body.append(overlay);
    input.focus();
  });
}

// Set or change the admin PIN (optionally confirming the current one first).
export async function changeAdminPin({ requireCurrent = false, remove = false } = {}) {
  if (requireCurrent) {
    const ok = await openPinDialog({ title: 'Enter current PIN', message: 'Confirm the current admin PIN first.', unlock: (pin) => store.unlock(pin) });
    if (!ok) return;
  }
  if (remove) {
    await store.saveSettings({ adminPinHash: null });
    toast('Admin PIN removed — money is visible to the whole network');
    return;
  }
  const pin = await openNewPinDialog();
  if (!pin) return;
  await store.saveSettings({ adminPinHash: await sha256Hex(pin) });
  toast('Admin PIN saved — money views are locked for screens that have not unlocked');
}

function openNewPinDialog() {
  return new Promise((resolve) => {
    const overlay = h('div', { class: 'overlay' });
    const close = (val) => {
      overlay.remove();
      document.removeEventListener('keydown', onKey);
      resolve(val);
    };
    const onKey = (e) => { if (e.key === 'Escape') close(null); };
    document.addEventListener('keydown', onKey);
    const a = h('input', { class: 'input', type: 'password', inputmode: 'numeric', maxlength: 8, placeholder: '4–8 digits' });
    const b = h('input', { class: 'input', type: 'password', inputmode: 'numeric', maxlength: 8, placeholder: 'repeat it' });
    const form = h('form', { class: 'dialog small', role: 'dialog', 'aria-modal': 'true', onsubmit: (e) => {
      e.preventDefault();
      if (a.value !== b.value) { toast('The two PINs do not match', 'error'); return; }
      if (!isValidPinFormat(a.value)) { toast('Use 4–8 digits', 'error'); return; }
      close(a.value.trim());
    } });
    form.append(
      h('div', { class: 'dialog-head' }, h('h3', {}, 'New admin PIN'), iconButton('x', () => close(null), 'Close')),
      h('div', { class: 'dialog-body' },
        h('label', { class: 'field' }, h('span', { class: 'field-label' }, 'New PIN'), a),
        h('label', { class: 'field' }, h('span', { class: 'field-label' }, 'Repeat'), b),
        h('p', { class: 'muted small' }, 'Stored only as a hash on the server. This is a shop-network gate, not bank-grade security — pick something the office remembers and the floor does not know.'),
      ),
      h('div', { class: 'dialog-foot' },
        h('button', { type: 'button', class: 'btn ghost', onclick: () => close(null) }, 'Cancel'),
        h('button', { type: 'submit', class: 'btn primary' }, icon('lock', 16), 'Save PIN'),
      ),
    );
    overlay.append(form);
    overlay.addEventListener('mousedown', (e) => { if (e.target === overlay) close(null); });
    document.body.append(overlay);
    a.focus();
  });
}

// Rendered in place of a money view while the gate is locked.
export function pinGatePanel(view) {
  const meta = collectionByName[view];
  return h('div', { class: 'view' }, h('div', { class: 'panel pin-gate' },
    h('div', { class: 'pin-gate-body' },
      h('div', { class: 'pin-gate-icon' }, icon('lock', 30)),
      h('div', { class: 'pin-gate-text' },
        h('h3', {}, 'Money is locked'),
        h('p', { class: 'muted' }, `${meta?.label || 'This area'} shows billing, payments and balances. Enter the admin PIN to view it on this screen.`),
      ),
      h('button', { class: 'btn primary', onclick: () => openPinDialog({ title: 'Enter Admin PIN', unlock: (pin) => store.unlock(pin) }) },
        icon('unlock', 16), 'Enter PIN'),
    ),
  ));
}
