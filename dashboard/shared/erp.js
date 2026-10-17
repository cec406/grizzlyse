// The money engine. Everything that makes this an ERP instead of a database:
// the chart of accounts, double-entry posting, stock moves, document status
// transitions, document numbering and the report math.
//
// Pure functions over a plain "db" object ({ ...collections, settings, meta }),
// so the Node server (lib/db.js), the browser demo (public/js/localdb.js) and
// the seed data all run the exact same code. Money correctness lives here.
import { collectionByName, docTotals, round2, coerceLines, daysUntil } from './schema.js';

// ---------------------------------------------------------------------------
// Chart of accounts (seeded on first run; users can add their own)
// ---------------------------------------------------------------------------
export const ACCOUNTS_SEED = [
  { code: '1000', name: 'Cash', type: 'Asset', description: 'Money in the bank / till' },
  { code: '1100', name: 'Accounts Receivable', type: 'Asset', description: 'Owed by customers' },
  { code: '1200', name: 'Inventory', type: 'Asset', description: 'Parts on the shelf at cost' },
  { code: '1300', name: 'Goods Received Not Invoiced', type: 'Liability', description: 'Received from vendors, bill not here yet' },
  { code: '2000', name: 'Accounts Payable', type: 'Liability', description: 'Owed to vendors' },
  { code: '2100', name: 'Sales Tax Payable', type: 'Liability', description: 'Collected from customers, owed to the tax authority' },
  { code: '2200', name: 'Input Tax', type: 'Asset', description: 'Sales tax paid on purchases (recoverable)' },
  { code: '3000', name: 'Opening Balance Equity', type: 'Equity', description: 'Where opening stock/assets came from' },
  { code: '4000', name: 'Income — Services', type: 'Income', description: 'Labor billed to customers' },
  { code: '4100', name: 'Income — Parts', type: 'Income', description: 'Parts billed to customers' },
  { code: '4900', name: 'Income — Other', type: 'Income', description: 'Anything else billed' },
  { code: '5000', name: 'COGS — Parts', type: 'Expense', description: 'Cost of parts sold' },
  { code: '5100', name: 'Materials & Purchases', type: 'Expense', description: 'Vendor bills (non-stock materials and costs)' },
  { code: '5200', name: 'Inventory Adjustments', type: 'Expense', description: 'Shrinkage, breakage, write-offs' },
];

export function ensureAccounts(db) {
  if (Array.isArray(db.accounts) && db.accounts.length) return;
  db.accounts = ACCOUNTS_SEED.map((a) => ({
    id: `acc-${a.code}`,
    code: a.code,
    name: a.name,
    type: a.type,
    description: a.description || '',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  }));
}

export function accountByCode(db, code) {
  return (db.accounts || []).find((a) => a.code === code) || null;
}

export function accountId(db, code) {
  const a = accountByCode(db, code);
  return a ? a.id : null;
}

// ---------------------------------------------------------------------------
// Document numbering: QUO-1001, INV-1001, PO-1001, BIL-1001 …
// ---------------------------------------------------------------------------
export const NUMBER_PREFIX = { quotes: 'QUO', invoices: 'INV', purchaseorders: 'PO', bills: 'BIL' };

export function nextDocNumber(db, collectionName) {
  const prefix = NUMBER_PREFIX[collectionName] || 'DOC';
  db.meta = { ...db.meta, seq: { invoice: 0, quote: 0, po: 0, bill: 0, ...db.meta?.seq } };
  const key = { quotes: 'quote', invoices: 'invoice', purchaseorders: 'po', bills: 'bill' }[collectionName];
  const n = (db.meta.seq[key] || 0) + 1;
  db.meta = { ...db.meta, seq: { ...db.meta.seq, [key]: n } };
  return `${prefix}-${1000 + n}`;
}

// ---------------------------------------------------------------------------
// Posting: append-only double-entry journal + stock moves
// ---------------------------------------------------------------------------

// Build a balanced journal entry. lines: [{ code, debit, credit }].
export function makeEntry(db, { date, memo, refType = '', refId = '', lines }) {
  const booked = lines
    .map((l) => ({
      accountId: accountId(db, l.code),
      debit: round2(l.debit || 0),
      credit: round2(l.credit || 0),
    }))
    .filter((l) => l.debit !== 0 || l.credit !== 0);
  const debits = round2(booked.reduce((s, l) => s + l.debit, 0));
  const credits = round2(booked.reduce((s, l) => s + l.credit, 0));
  if (Math.abs(debits - credits) > 0.005) {
    throw new Error(`Journal entry does not balance (D ${debits} / C ${credits}): ${memo}`);
  }
  return {
    id: `je-${Date.now().toString(36)}-${Math.floor(Math.random() * 1e6).toString(36)}`,
    date,
    memo,
    refType,
    refId,
    lines: booked,
    createdAt: new Date().toISOString(),
  };
}

export function hasPosted(db, refId) {
  return (db.ledger || []).some((e) => e.refId === refId);
}

// A stock move. qty > 0 = into stock, qty < 0 = out. Moving-average cost is
// maintained on the part so COGS is real without a heavyweight costing system.
export function makeMove(db, { partId, date, qty, unitCost, reason, refType = '', refId = '', notes = '', apply = true }) {
  const move = {
    id: `mv-${Date.now().toString(36)}-${Math.floor(Math.random() * 1e6).toString(36)}`,
    partId,
    date,
    qty: round2(qty),
    unitCost: round2(unitCost || 0),
    reason,
    refType,
    refId,
    notes,
    createdAt: new Date().toISOString(),
  };
  db.stockmoves.unshift(move);
  if (apply) applyMoveToPart(db, move);
  return move;
}

function applyMoveToPart(db, move) {
  const part = (db.parts || []).find((p) => p.id === move.partId);
  if (!part) return;
  const qty = Number(move.qty) || 0;
  const cost = Number(move.unitCost) || 0;
  if (qty > 0 && cost > 0) {
    // moving average on the way in
    const oldQty = Number(part.qty) || 0;
    const oldAvg = Number(part.avgCost) || Number(part.cost) || 0;
    const totalQty = oldQty + qty;
    const avg = totalQty > 0 ? round2((oldQty * oldAvg + qty * cost) / totalQty) : cost;
    part.avgCost = avg;
  }
  part.qty = round2((Number(part.qty) || 0) + qty);
}

// Post a sent/partial/paid invoice: AR + income + tax on the ledger, plus a
// stock move (and COGS) for every part line.
export function postInvoice(db, invoice) {
  if (hasPosted(db, invoice.id)) return;
  const lines = invoice.lines || [];
  const byKind = (kind) => lines.filter((l) => l.kind === kind).reduce((s, l) => s + l.qty * l.unitPrice, 0);
  const svc = byKind('labor');
  const prts = byKind('part');
  const other = byKind('item');
  const memo = `Invoice ${invoice.number}${invoice.customerId ? ' — ' + customerName(db, invoice.customerId) : ''}`;
  const entries = [
    makeEntry(db, {
      date: invoice.date,
      memo,
      refType: 'invoice',
      refId: invoice.id,
      lines: [
        { code: '1100', debit: invoice.total },
        svc ? { code: '4000', credit: svc } : null,
        prts ? { code: '4100', credit: prts } : null,
        other ? { code: '4900', credit: other } : null,
        invoice.taxAmount ? { code: '2100', credit: invoice.taxAmount } : null,
      ].filter(Boolean),
    }),
  ];
  db.ledger.unshift(entries[0]);

  // Stock: part lines leave the shelf at moving-average cost.
  for (const line of lines) {
    if (line.kind !== 'part' || !line.partId) continue;
    const part = (db.parts || []).find((p) => p.id === line.partId);
    const cost = Number(part?.avgCost) || Number(part?.cost) || 0;
    const value = round2((Number(line.qty) || 0) * cost);
    makeMove(db, {
      partId: line.partId,
      date: invoice.date,
      qty: -Math.abs(Number(line.qty) || 0),
      unitCost: cost,
      reason: 'Sale',
      refType: 'invoice',
      refId: invoice.id,
      notes: invoice.number,
    });
    if (value > 0) {
      db.ledger.unshift(makeEntry(db, {
        date: invoice.date,
        memo: `COGS ${invoice.number} — ${line.description || part?.name || 'part'}`,
        refType: 'invoice-cogs',
        refId: invoice.id,
        lines: [
          { code: '5000', debit: value },
          { code: '1200', credit: value },
        ],
      }));
    }
  }
  invoice.posted = true;
}

// Void a sent invoice: mirrored reversal entries + returns to stock. History
// is never deleted — that is what makes the books trustworthy.
export function unpostInvoice(db, invoice) {
  const paid = Number(invoice.paid) || 0;
  if (paid > 0) throw new Error('This invoice has payments recorded. Refund them (delete the payments) before voiding.');
  // Reversal journal entries (mirrored).
  const original = (db.ledger || []).filter((e) => e.refId === invoice.id);
  for (const e of original) {
    db.ledger.unshift(makeEntry(db, {
      date: new Date().toISOString().slice(0, 10),
      memo: `Void ${invoice.number} — reversal`,
      refType: 'invoice-void',
      refId: invoice.id,
      lines: e.lines.map((l) => ({ code: codeOfAccount(db, l.accountId), debit: l.credit, credit: l.debit })),
    }));
  }
  // Returns to stock at the same cost.
  for (const line of invoice.lines || []) {
    if (line.kind !== 'part' || !line.partId) continue;
    const part = (db.parts || []).find((p) => p.id === line.partId);
    const cost = Number(part?.avgCost) || Number(part?.cost) || 0;
    makeMove(db, {
      partId: line.partId,
      date: new Date().toISOString().slice(0, 10),
      qty: Math.abs(Number(line.qty) || 0),
      unitCost: cost,
      reason: 'Return',
      refType: 'invoice-void',
      refId: invoice.id,
      notes: `Void of ${invoice.number}`,
    });
  }
  invoice.posted = false;
  invoice.status = 'Void';
}

export function codeOfAccount(db, id) {
  const a = (db.accounts || []).find((x) => x.id === id);
  return a?.code || '1000';
}

// Post a customer payment against an invoice.
export function postPayment(db, payment) {
  const invoice = (db.invoices || []).find((i) => i.id === payment.invoiceId);
  if (!invoice) throw new Error('Payment needs an existing invoice');
  if (!(Number(payment.amount) > 0)) throw new Error('Payment amount must be greater than zero');
  const already = (db.ledger || []).some((e) => e.refId === payment.id);
  if (!already) {
    db.ledger.unshift(makeEntry(db, {
      date: payment.date,
      memo: `Payment on ${invoice.number}${payment.reference ? ' — ref ' + payment.reference : ''}`,
      refType: 'payment',
      refId: payment.id,
      lines: [
        { code: '1000', debit: payment.amount },
        { code: '1100', credit: payment.amount },
      ],
    }));
  }
  recomputePaid(db, invoice, 'invoice');
  return invoice;
}

export function unpostPayment(db, payment) {
  const invoice = (db.invoices || []).find((i) => i.id === payment.invoiceId);
  const reversal = (db.ledger || []).filter((e) => e.refId === payment.id);
  for (const e of reversal) {
    db.ledger.unshift(makeEntry(db, {
      date: new Date().toISOString().slice(0, 10),
      memo: `Reversal — deleted payment on ${invoice?.number || 'invoice'}`,
      refType: 'payment-void',
      refId: payment.id,
      lines: e.lines.map((l) => ({ code: codeOfAccount(db, l.accountId), debit: l.credit, credit: l.debit })),
    }));
  }
  if (invoice) recomputePaid(db, invoice, 'invoice');
}

// Post a vendor bill: expense + input tax, minus goods-received already booked.
export function postBill(db, bill) {
  if (hasPosted(db, bill.id)) return;
  const lineTotal = (kind) => (bill.lines || []).filter((l) => l.kind === kind).reduce((s, l) => s + l.qty * l.unitPrice, 0);
  const partsCost = lineTotal('part');
  const other = lineTotal('labor') + lineTotal('item');
  const expenseCode = '5100'; // one materials account at this scale
  const lines = [
    partsCost + other > 0 ? { code: expenseCode, debit: round2(partsCost + other) } : null,
    bill.taxAmount ? { code: '2200', debit: bill.taxAmount } : null,
  ].filter(Boolean);
  // Clear goods-received-not-invoiced for the linked PO (variance stays in expense).
  const po = bill.poId ? (db.purchaseorders || []).find((p) => p.id === bill.poId) : null;
  if (po) {
    const clear = round2(Math.min(Number(po.receivedValue) || 0, round2(partsCost + other)));
    if (clear > 0) {
      lines.push({ code: '1300', debit: clear });
      lines.push({ code: '5100', credit: clear });
      po.receivedValue = round2((Number(po.receivedValue) || 0) - clear);
    }
  }
  lines.push({ code: '2000', credit: bill.total });
  db.ledger.unshift(makeEntry(db, {
    date: bill.date,
    memo: `Bill ${bill.number}${bill.vendorId ? ' — ' + vendorName(db, bill.vendorId) : ''}`,
    refType: 'bill',
    refId: bill.id,
    lines,
  }));
  bill.posted = true;
}

export function unpostBill(db, bill) {
  const paid = Number(bill.paid) || 0;
  if (paid > 0) throw new Error('This bill has payments recorded. Delete those payments first.');
  const original = (db.ledger || []).filter((e) => e.refId === bill.id);
  for (const e of original) {
    db.ledger.unshift(makeEntry(db, {
      date: new Date().toISOString().slice(0, 10),
      memo: `Void ${bill.number} — reversal`,
      refType: 'bill-void',
      refId: bill.id,
      lines: e.lines.map((l) => ({ code: codeOfAccount(db, l.accountId), debit: l.credit, credit: l.debit })),
    }));
  }
  bill.posted = false;
  bill.status = 'Void';
}

export function postVendorPayment(db, payment) {
  const bill = (db.bills || []).find((b) => b.id === payment.billId);
  if (!bill) throw new Error('Payment needs an existing bill');
  if (!(Number(payment.amount) > 0)) throw new Error('Payment amount must be greater than zero');
  const already = (db.ledger || []).some((e) => e.refId === payment.id);
  if (!already) {
    db.ledger.unshift(makeEntry(db, {
      date: payment.date,
      memo: `Payment to ${bill.vendorId ? vendorName(db, bill.vendorId) : 'vendor'} on ${bill.number}`,
      refType: 'vendorpayment',
      refId: payment.id,
      lines: [
        { code: '2000', debit: payment.amount },
        { code: '1000', credit: payment.amount },
      ],
    }));
  }
  recomputePaid(db, bill, 'bill');
  return bill;
}

export function unpostVendorPayment(db, payment) {
  const bill = (db.bills || []).find((b) => b.id === payment.billId);
  const reversal = (db.ledger || []).filter((e) => e.refId === payment.id);
  for (const e of reversal) {
    db.ledger.unshift(makeEntry(db, {
      date: new Date().toISOString().slice(0, 10),
      memo: 'Reversal — deleted vendor payment',
      refType: 'vendorpayment-void',
      refId: payment.id,
      lines: e.lines.map((l) => ({ code: codeOfAccount(db, l.accountId), debit: l.credit, credit: l.debit })),
    }));
  }
  if (bill) recomputePaid(db, bill, 'bill');
}

// Receive goods on a purchase order: stock in + Inventory/GRIR posting.
// Returns { received, parts } — parts lists every part record that changed, so
// callers can broadcast the update.
export function receiveGoods(db, po, receipts, actor = '') {
  // receipts: [{ lineId, qty }]
  const today = new Date().toISOString().slice(0, 10);
  let receivedValue = 0;
  const receivedNow = [];
  const changedParts = new Map();
  for (const r of receipts) {
    const line = (po.lines || []).find((l) => l.id === r.lineId);
    if (!line) continue;
    const qty = Number(r.qty) || 0;
    if (qty <= 0) continue;
    const open = (Number(line.qty) || 0) - (Number(line.receivedQty) || 0);
    if (qty > open + 1e-9) throw new Error(`Cannot receive ${qty} of ${line.description || 'line'} — only ${max2(open)} outstanding`);
    line.receivedQty = round2((Number(line.receivedQty) || 0) + qty);
    const value = round2(qty * (Number(line.unitPrice) || 0));
    receivedValue = round2(receivedValue + value);
    receivedNow.push({ line, qty, value });
    const part = (db.parts || []).find((p) => p.id === line.partId);
    makeMove(db, {
      partId: line.partId,
      date: today,
      qty,
      unitCost: Number(line.unitPrice) || 0,
      reason: 'Purchase',
      refType: 'purchaseorder',
      refId: po.id,
      notes: po.number,
      apply: false, // qty applied below with moving-average in one pass
    });
    if (part) {
      const oldQty = Number(part.qty) || 0;
      const oldAvg = Number(part.avgCost) || Number(part.cost) || 0;
      const totalQty = oldQty + qty;
      if (totalQty > 0 && (Number(line.unitPrice) || 0) > 0) {
        part.avgCost = round2((oldQty * oldAvg + qty * (Number(line.unitPrice) || 0)) / totalQty);
      }
      part.qty = round2(oldQty + qty);
      part.updatedAt = new Date().toISOString();
      changedParts.set(part.id, part);
    }
  }
  if (receivedValue > 0) {
    po.receivedValue = round2((Number(po.receivedValue) || 0) + receivedValue);
    db.ledger.unshift(makeEntry(db, {
      date: today,
      memo: `Goods received ${po.number}${actor ? ' — by ' + actor : ''}`,
      refType: 'po-receipt',
      refId: po.id,
      lines: [
        { code: '1200', debit: receivedValue },
        { code: '1300', credit: receivedValue },
      ],
    }));
  }
  // Derive PO status.
  const allIn = (po.lines || []).every((l) => (Number(l.receivedQty) || 0) >= (Number(l.qty) || 0));
  const anyIn = (po.lines || []).some((l) => (Number(l.receivedQty) || 0) > 0);
  if (allIn && (po.lines || []).length) po.status = 'Received';
  else if (anyIn) po.status = 'Partial';
  else if (po.status === 'Draft') po.status = 'Ordered';
  return { received: receivedNow, parts: [...changedParts.values()] };
}

function max2(n) {
  return Math.round((Number(n) || 0) * 100) / 100;
}

function customerName(db, id) {
  return (db.customers || []).find((c) => c.id === id)?.name || '';
}
function vendorName(db, id) {
  return (db.vendors || []).find((v) => v.id === id)?.name || '';
}

// ---------------------------------------------------------------------------
// Derived document state
// ---------------------------------------------------------------------------

// kind: 'invoice' | 'bill' — tells us which payment list settles this doc.
export function recomputePaid(db, doc, kind) {
  const payments = kind === 'invoice' ? db.payments : db.vendorpayments;
  const refKey = kind === 'invoice' ? 'invoiceId' : 'billId';
  const paid = round2((payments || []).filter((p) => p[refKey] === doc.id)
    .reduce((s, p) => s + (Number(p.amount) || 0), 0));
  doc.paid = paid;
  const total = Number(doc.total) || 0;
  if (doc.status !== 'Void' && doc.status !== 'Draft') {
    if (paid >= total - 0.005) doc.status = 'Paid';
    else if (paid > 0) doc.status = 'Partial';
    else doc.status = kind === 'invoice' ? 'Sent' : 'Unpaid';
  }
  return doc;
}

export function invoiceBalance(inv) {
  return round2((Number(inv.total) || 0) - (Number(inv.paid) || 0));
}

export function docIsOpen(doc) {
  return ['Sent', 'Partial', 'Unpaid'].includes(doc.status);
}

// ---------------------------------------------------------------------------
// catch-up: make an imported/restored/legacy database consistent. Idempotent —
// safe to run on every boot. This is also the migration path for old files.
// ---------------------------------------------------------------------------
export function catchUp(db) {
  ensureAccounts(db);
  const live = ['Sent', 'Partial', 'Paid', 'Unpaid']; // posted-or-should-be statuses
  // 1) invoices: recompute paid from payments, derive status, post if missing.
  for (const inv of db.invoices || []) {
    recomputePaid(db, inv, 'invoice');
    if (live.includes(inv.status) && !hasPosted(db, inv.id)) {
      try { postInvoice(db, inv); } catch { /* incomplete data — leave unposted */ }
    }
  }
  // 2) bills.
  for (const bill of db.bills || []) {
    recomputePaid(db, bill, 'bill');
    if (live.includes(bill.status) && !hasPosted(db, bill.id)) {
      try { postBill(db, bill); } catch { /* incomplete data */ }
    }
  }
  // 3) payments whose entries went missing (import/restore edge).
  for (const p of db.payments || []) {
    if (!hasPosted(db, p.id)) {
      const inv = (db.invoices || []).find((i) => i.id === p.invoiceId);
      if (inv && inv.status !== 'Void' && inv.status !== 'Draft') { try { postPayment(db, p); } catch { /* ignore */ } }
    }
  }
  for (const p of db.vendorpayments || []) {
    if (!hasPosted(db, p.id)) {
      const bill = (db.bills || []).find((b) => b.id === p.billId);
      if (bill && bill.status !== 'Void' && bill.status !== 'Draft') { try { postVendorPayment(db, p); } catch { /* ignore */ } }
    }
  }
}

// ---------------------------------------------------------------------------
// Reports — pure reads over the collections. Small-shop scale means these can
// be computed in-memory in microseconds; no warehouse, no worker.
// ---------------------------------------------------------------------------
export const OPEN_AR = ['Sent', 'Partial'];
export const OPEN_AP = ['Unpaid', 'Partial'];

function agingBuckets(docs, parties, dateKey, openStatuses) {
  const today = new Date();
  const rows = new Map();
  let total = 0;
  for (const doc of docs) {
    if (!openStatuses.includes(doc.status)) continue;
    const balance = round2((Number(doc.total) || 0) - (Number(doc.paid) || 0));
    if (balance <= 0.005) continue;
    const partyId = doc.customerId || doc.vendorId;
    const party = parties.find((p) => p.id === partyId);
    const key = partyId || '—';
    if (!rows.has(key)) rows.set(key, { party: party?.name || 'Unassigned', current: 0, d30: 0, d60: 0, d90: 0, older: 0, total: 0 });
    const row = rows.get(key);
    const due = doc[dateKey] ? new Date(doc[dateKey] + 'T00:00:00') : new Date(doc.date + 'T00:00:00');
    const days = Math.floor((today - due) / 86400000);
    const bucket = days <= 0 ? 'current' : days <= 30 ? 'd30' : days <= 60 ? 'd60' : days <= 90 ? 'd90' : 'older';
    row[bucket] = round2(row[bucket] + balance);
    row.total = round2(row.total + balance);
    total = round2(total + balance);
  }
  return { rows: [...rows.values()].sort((a, b) => b.total - a.total), total };
}

export function arAging(db) {
  return agingBuckets(db.invoices || [], db.customers || [], 'dueDate', OPEN_AR);
}

export function apAging(db) {
  return agingBuckets(db.bills || [], db.vendors || [], 'dueDate', OPEN_AP);
}

export function pnl(db, months = 12) {
  // month keys YYYY-MM, oldest → newest, ending this month
  const now = new Date();
  const keys = [];
  for (let i = months - 1; i >= 0; i--) {
    const d = new Date(now.getFullYear(), now.getMonth() - i, 1);
    keys.push(`${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}`);
  }
  const byMonth = Object.fromEntries(keys.map((k) => [k, { income: 0, expense: 0, detail: {} }]));
  const totals = { income: 0, expense: 0 };
  for (const entry of db.ledger || []) {
    if (!entry.date) continue;
    const key = entry.date.slice(0, 7);
    if (!(key in byMonth)) continue;
    const typeOf = (id) => (db.accounts || []).find((a) => a.id === id)?.type;
    for (const line of entry.lines) {
      const t = typeOf(line.accountId);
      if (t === 'Income') {
        const v = round2((line.credit || 0) - (line.debit || 0));
        if (v > 0) { byMonth[key].income = round2(byMonth[key].income + v); totals.income = round2(totals.income + v); byMonth[key].detail[accountName(db, line.accountId)] = round2((byMonth[key].detail[accountName(db, line.accountId)] || 0) + v); }
      } else if (t === 'Expense') {
        const v = round2((line.debit || 0) - (line.credit || 0));
        if (v > 0) { byMonth[key].expense = round2(byMonth[key].expense + v); totals.expense = round2(totals.expense + v); byMonth[key].detail[accountName(db, line.accountId)] = round2((byMonth[key].detail[accountName(db, line.accountId)] || 0) + v); }
      }
    }
  }
  return { keys, byMonth, totals, net: round2(totals.income - totals.expense) };
}

function accountName(db, id) {
  return (db.accounts || []).find((a) => a.id === id)?.name || '—';
}

export function jobCosting(db) {
  const rows = [];
  for (const job of db.jobs || []) {
    const invoices = (db.invoices || []).filter((i) => i.jobId === job.id && i.status !== 'Void' && i.status !== 'Draft');
    const pos = (db.purchaseorders || []).filter((p) => p.jobId === job.id);
    const bills = (db.bills || []).filter((b) => b.jobId === job.id && b.status !== 'Void' && b.status !== 'Draft');
    const time = (db.timeentries || []).filter((t) => t.jobId === job.id);
    const rateOf = (t) => Number(t.rate) || (db.people || []).find((p) => p.id === t.personId)?.payRate || Number(db.settings?.defaultLaborRate) || 0;
    const invoiced = round2(invoices.reduce((s, i) => s + (Number(i.total) || 0), 0));
    const collected = round2(invoices.reduce((s, i) => s + (Number(i.paid) || 0), 0));
    const cogs = round2(invoices.reduce((s, i) => s + (i.lines || []).filter((l) => l.kind === 'part').reduce((s2, l) => {
      const part = (db.parts || []).find((p) => p.id === l.partId);
      return s2 + (Number(l.qty) || 0) * (Number(part?.avgCost) || Number(part?.cost) || 0);
    }, 0), 0));
    const materials = round2(bills.reduce((s, b) => s + (Number(b.subtotal) || 0), 0));
    const labor = round2(time.reduce((s, t) => s + (Number(t.hours) || 0) * rateOf(t), 0));
    const committed = round2(pos.reduce((s, p) => s + Math.max(0, (Number(p.subtotal) || 0) - (Number(p.receivedValue) || 0)), 0));
    rows.push({
      job,
      invoiced,
      collected,
      cogs,
      materials,
      labor,
      committed,
      cost: round2(cogs + materials + labor),
      margin: round2(invoiced - cogs - materials - labor),
    });
  }
  return rows.sort((a, b) => b.invoiced - a.invoiced);
}

export function inventoryValuation(db) {
  const rows = (db.parts || []).map((p) => ({
    part: p,
    value: round2((Number(p.qty) || 0) * (Number(p.avgCost) || Number(p.cost) || 0)),
    retail: round2((Number(p.qty) || 0) * (Number(p.price) || 0)),
  }));
  return {
    rows,
    value: round2(rows.reduce((s, r) => s + r.value, 0)),
    retail: round2(rows.reduce((s, r) => s + r.retail, 0)),
  };
}

export function salesByCustomer(db) {
  const map = new Map();
  for (const inv of db.invoices || []) {
    if (inv.status === 'Void' || inv.status === 'Draft') continue;
    const key = inv.customerId || '—';
    const name = customerName(db, inv.customerId) || 'Unassigned';
    if (!map.has(key)) map.set(key, { name, invoiced: 0, paid: 0, count: 0 });
    const row = map.get(key);
    row.invoiced = round2(row.invoiced + (Number(inv.total) || 0));
    row.paid = round2(row.paid + (Number(inv.paid) || 0));
    row.count += 1;
  }
  return [...map.values()].sort((a, b) => b.invoiced - a.invoiced);
}

export function moneyOut(db) {
  // what we owe, right now
  return apAging(db).total;
}

export function moneyIn(db) {
  return arAging(db).total;
}

export function revenueSince(db, isoDate) {
  return round2((db.invoices || [])
    .filter((i) => i.status !== 'Void' && i.status !== 'Draft' && i.date >= isoDate)
    .reduce((s, i) => s + (Number(i.total) || 0), 0));
}

// Ledger rows for the Journal report (recent first, capped).
export function journalRows(db, limit = 200) {
  const account = (id) => accountName(db, id);
  return (db.ledger || []).slice(0, limit).map((e) => ({
    ...e,
    readable: e.lines.map((l) => `${account(l.accountId)} ${l.debit ? 'Dr ' + fmt2(l.debit) : 'Cr ' + fmt2(l.credit)}`).join(' · '),
    amount: round2(e.lines.reduce((s, l) => s + (l.debit || 0), 0)),
  }));
}

function fmt2(n) {
  return (Number(n) || 0).toFixed(2);
}
