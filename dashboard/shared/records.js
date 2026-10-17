// The unified record engine. ONE implementation of create/update/remove,
// document status transitions, posting and activity logging — shared by the
// Node server (lib/db.js) and the browser demo database (public/js/localdb.js),
// so the two modes can never drift apart on money rules.
//
// The engine is synchronous and single-threaded by construction: each API
// handler runs to completion before the next, and the whole db is persisted
// atomically by the caller after every mutation (opts.afterMutation).
import { collections, collectionByName, coerceValue, coerceLines, docTotals, round2 } from './schema.js';
import * as erp from './erp.js';

export const ID_PREFIX = {
  workorders: 'wo',
  assets: 'ast',
  schedule: 'pm',
  parts: 'part',
  people: 'per',
  vendors: 'ven',
  resources: 'res',
  customers: 'cus',
  jobs: 'job',
  quotes: 'quo',
  invoices: 'inv',
  payments: 'pay',
  purchaseorders: 'po',
  bills: 'bil',
  vendorpayments: 'vpay',
  timeentries: 'tim',
  stockmoves: 'mv',
  ledger: 'je',
  accounts: 'acc',
};

// Which statuses allow a document to be edited (before it "means money").
const EDITABLE_STATUS = {
  quotes: ['Draft'],
  invoices: ['Draft'],
  purchaseorders: ['Draft', 'Ordered'],
  bills: ['Draft'],
};

// Document actions: op name → which status it may fire from.
const OP_FROM = {
  send: { quotes: ['Draft'], invoices: ['Draft'] },
  accept: { quotes: ['Sent'] },
  decline: { quotes: ['Sent'] },
  order: { purchaseorders: ['Draft'] },
  receive: { purchaseorders: ['Ordered', 'Partial'] },
  close: { purchaseorders: ['Received'] },
  record: { bills: ['Draft'] }, // a bill becomes Unpaid (posted) via "record"
  void: { invoices: ['Sent', 'Partial'], bills: ['Unpaid', 'Partial'] },
};

const PAYMENT_KIND = { payments: 'invoice', vendorpayments: 'bill' };
const PAYMENT_REF = { payments: 'invoiceId', vendorpayments: 'billId' };

export function makeEngine(db, opts = {}) {
  const now = opts.now || (() => new Date().toISOString());
  const actorDefault = opts.actorDefault || 'unknown';
  const capActivity = opts.capActivity ?? 300;
  const onExtras = opts.onExtras || (() => {});
  const afterMutation = opts.afterMutation || (() => {});
  let idCounter = 0;

  const newId = (prefix) => `${prefix}-${now().slice(0, 10).replace(/-/g, '')}${(idCounter++).toString(36)}${Math.floor(Math.random() * 1e6).toString(36)}`;

  // ---- shape --------------------------------------------------------------
  function ensureShape() {
    for (const c of collections) if (!Array.isArray(db[c.name])) db[c.name] = [];
    if (!Array.isArray(db.activity)) db.activity = [];
    if (!db.settings || typeof db.settings !== 'object') db.settings = {};
    if (!db.meta || typeof db.meta !== 'object') db.meta = { version: 2 };
    erp.catchUp(db);
  }

  function logActivity(actor, text) {
    const entry = { id: newId('act'), at: now(), actor: actor || actorDefault, text };
    db.activity.unshift(entry);
    db.activity = db.activity.slice(0, capActivity);
    return entry;
  }

  function emitExtras(list) {
    if (list?.length) onExtras(list);
  }

  // ---- coercion -----------------------------------------------------------
  function coerceRecord(collectionName, input, base = {}) {
    const col = collectionByName[collectionName];
    const out = { ...base };
    for (const field of col.fields) {
      if (field.type === 'computed' || field.readonly) continue;
      if (!Object.prototype.hasOwnProperty.call(input, field.key)) continue;
      if (field.type === 'lines') out[field.key] = coerceLines(input[field.key]);
      else out[field.key] = coerceValue(field, input[field.key]);
    }
    return out;
  }

  function isDoc(name) {
    return Boolean(collectionByName[name]?.doc);
  }

  // Fill in document bookkeeping: number, totals, derived fields.
  function finalizeDoc(name, record) {
    if (!record.number) record.number = erp.nextDocNumber(db, name);
    const meta = collectionByName[name];
    const linesField = meta.fields.find((f) => f.type === 'lines');
    const lines = record.lines || [];
    const totals = docTotals(lines, record.taxRate ?? 0);
    record.subtotal = totals.subtotal;
    record.total = totals.total;
    if (meta.fields.some((f) => f.key === 'taxAmount')) record.taxAmount = totals.taxAmount;
    if (!record.taxRate && record.taxRate !== 0) {
      record.taxRate = linesField?.sale ? Number(db.settings?.defaultTaxRate) || 0 : 0;
    }
    if (meta.fields.some((f) => f.key === 'paid') && record.paid === undefined) record.paid = 0;
    if (linesField?.sale && !record.taxExempt) {
      const cust = (db.customers || []).find((c) => c.id === record.customerId);
      if (cust?.taxExempt) record.taxRate = 0;
    }
    record.taxAmount = meta.fields.some((f) => f.key === 'taxAmount') ? docTotals(lines, record.taxRate).taxAmount : undefined;
    const retot = docTotals(lines, record.taxRate);
    record.subtotal = retot.subtotal;
    record.total = retot.total;
    if (meta.fields.some((f) => f.key === 'taxAmount')) record.taxAmount = retot.taxAmount;
    if (!record.date) record.date = now().slice(0, 10);
  }

  // Payment bookkeeping: validate, then post/unpost and keep the linked doc true.
  function validatePayment(name, input) {
    const kind = PAYMENT_KIND[name];
    const refKey = PAYMENT_REF[name];
    const list = kind === 'invoice' ? db.invoices : db.bills;
    const doc = (list || []).find((d) => d.id === input[refKey]);
    if (!doc) throw new Error(kind === 'invoice' ? 'Choose the invoice this payment belongs to' : 'Choose the bill this payment belongs to');
    if (doc.status === 'Draft') throw new Error(`Send ${doc.number} before recording payments on it`);
    if (doc.status === 'Void') throw new Error(`${doc.number} is void — payments cannot be recorded on it`);
    if (!(Number(input.amount) > 0)) throw new Error('Amount must be greater than zero');
    const balance = erp.invoiceBalance(doc) + (existingAmount(name, input.id) || 0);
    if (Number(input.amount) > balance + 0.005) {
      throw new Error(`That is more than the outstanding balance (${balance.toFixed(2)})`);
    }
    return doc;
  }

  function existingAmount(name, id) {
    if (!id) return 0;
    const record = (db[name] || []).find((r) => r.id === id);
    return record ? Number(record.amount) || 0 : 0;
  }

  function postPaymentRecord(name, payment) {
    const doc = validatePayment(name, payment);
    if (name === 'payments') erp.postPayment(db, payment);
    else erp.postVendorPayment(db, payment);
    return doc;
  }

  function paymentExtras(name, doc) {
    return [{ collection: name === 'payments' ? 'invoices' : 'bills', item: doc }];
  }

  // ---- CRUD ---------------------------------------------------------------
  function create(collectionName, input, actor) {
    const col = collectionByName[collectionName];
    const record = coerceRecord(collectionName, input, {});
    for (const field of col.fields) {
      if (record[field.key] === undefined && field.default !== undefined) record[field.key] = field.default;
    }
    if (isDoc(collectionName)) finalizeDoc(collectionName, record);
    record.id = newId(ID_PREFIX[collectionName] || 'rec');
    record.createdAt = now();
    record.updatedAt = record.createdAt;

    if (PAYMENT_KIND[collectionName]) {
      // Validate before anything is written.
      const doc = validatePayment(collectionName, record);
      db[collectionName].unshift(record);
      if (collectionName === 'payments') erp.postPayment(db, record);
      else erp.postVendorPayment(db, record);
      const note = logActivity(actor, `Recorded ${col.singular.toLowerCase()} ${Number(record.amount).toFixed(2)} on ${doc.number}`);
      afterMutation();
      emitExtras(paymentExtras(collectionName, doc));
      emitRecord({ type: 'create', collection: collectionName, item: record, activity: note, actor });
      return record;
    }

    db[collectionName].unshift(record);
    const label = record[col.primary] || record.id;
    const note = logActivity(actor, `Added ${col.singular.toLowerCase()} "${label}"`);
    afterMutation();
    emitRecord({ type: 'create', collection: collectionName, item: record, activity: note, actor });
    return record;
  }

  function update(collectionName, id, patch, actor) {
    const col = collectionByName[collectionName];
    const record = db[collectionName].find((r) => r.id === id);
    if (!record) return null;

    if (isDoc(collectionName) && !EDITABLE_STATUS[collectionName].includes(record.status)) {
      throw new Error('Posted documents are locked. Void it and create a corrected one instead.');
    }
    const merged = coerceRecord(collectionName, patch, record);

    if (PAYMENT_KIND[collectionName]) {
      // Re-validate with the merged values, reverse the old posting, re-post.
      const doc = validatePayment(collectionName, merged);
      if (collectionName === 'payments') erp.unpostPayment(db, record);
      else erp.unpostVendorPayment(db, record);
      Object.assign(record, merged);
      if (collectionName === 'payments') erp.postPayment(db, record);
      else erp.postVendorPayment(db, record);
      record.updatedAt = now();
      const note = logActivity(actor, `Updated ${col.singular.toLowerCase()} on ${doc.number}`);
      afterMutation();
      emitExtras(paymentExtras(collectionName, doc));
      emitRecord({ type: 'update', collection: collectionName, item: record, activity: note, actor });
      return record;
    }

    if (isDoc(collectionName)) {
      Object.assign(record, merged);
      finalizeDoc(collectionName, record); // totals recompute from the new lines
    } else {
      // Parts: a manual qty change (the +/- buttons, inline edit) is recorded
      // as an adjustment move so the stock history never has gaps.
      if (collectionName === 'parts' && merged.qty !== undefined) {
        const before = Number(record.qty) || 0;
        const after = Number(merged.qty) || 0;
        const delta = round2(after - before);
        if (delta !== 0) {
          erp.makeMove(db, {
            partId: record.id,
            date: now().slice(0, 10),
            qty: delta,
            unitCost: Number(record.avgCost) || Number(record.cost) || 0,
            reason: 'Adjustment',
            refType: 'manual',
            apply: false,
          });
        }
      }
      Object.assign(record, merged);
    }
    record.updatedAt = now();
    const label = record[col.primary] || record.id;
    const note = logActivity(actor, `Updated ${col.singular.toLowerCase()} "${label}"`);
    afterMutation();
    emitRecord({ type: 'update', collection: collectionName, item: record, activity: note, actor });
    return record;
  }

  function remove(collectionName, id, actor) {
    const col = collectionByName[collectionName];
    const idx = db[collectionName].findIndex((r) => r.id === id);
    if (idx === -1) return null;
    const record = db[collectionName][idx];

    if (collectionName === 'ledger' || collectionName === 'stockmoves') {
      throw new Error('The journal and stock history are append-only — entries cannot be deleted.');
    }
    if (isDoc(collectionName) && !EDITABLE_STATUS[collectionName].includes(record.status)) {
      throw new Error('Only draft documents can be deleted. Void a posted document instead.');
    }
    if (PAYMENT_KIND[collectionName]) {
      const doc = paymentExtras(collectionName, record)[0].item;
      // Remove first, THEN unpost — the reversal must recompute paid/status
      // without counting the payment that is being deleted.
      db[collectionName].splice(idx, 1);
      if (collectionName === 'payments') erp.unpostPayment(db, record);
      else erp.unpostVendorPayment(db, record);
      const note = logActivity(actor, `Deleted ${col.singular.toLowerCase()} — ${doc.number} updated`);
      afterMutation();
      emitExtras(paymentExtras(collectionName, doc));
      emitRecord({ type: 'delete', collection: collectionName, item: record, activity: note, actor });
      return record;
    }

    db[collectionName].splice(idx, 1);
    const label = record[col.primary] || record.id;
    const note = logActivity(actor, `Deleted ${col.singular.toLowerCase()} "${label}"`);
    afterMutation();
    emitRecord({ type: 'delete', collection: collectionName, item: record, activity: note, actor });
    return record;
  }

  // ---- document workflow operations ----------------------------------------
  // op(collection, id, 'send'|'accept'|'receive'|…, payload, actor)
  function op(collectionName, id, action, payload = {}, actor) {
    const col = collectionByName[collectionName];
    const record = db[collectionName].find((r) => r.id === id);
    if (!record) return null;
    const allowed = OP_FROM[action]?.[collectionName];
    if (!allowed) throw new Error(`"${action}" is not an operation on ${col.singular.toLowerCase()}s`);
    if (!allowed.includes(record.status)) {
      throw new Error(`Cannot ${action} a ${col.singular.toLowerCase()} in status "${record.status}"`);
    }

    let created = null;
    const today = now().slice(0, 10);

    switch (action) {
      case 'send': {
        if (collectionName === 'quotes') record.status = 'Sent';
        else {
          // Invoice goes live: must have at least one line.
          if (!(record.lines || []).length) throw new Error('Add at least one line item before sending');
          erp.postInvoice(db, record);
          record.status = record.paid >= record.total - 0.005 ? 'Paid' : 'Sent';
        }
        logActivity(actor, `Sent ${col.singular.toLowerCase()} ${record.number}`);
        break;
      }
      case 'accept': {
        record.status = 'Accepted';
        // Convert to a draft invoice — the whole point of a quote.
        created = {
          id: newId(ID_PREFIX.invoices),
          number: erp.nextDocNumber(db, 'invoices'),
          status: 'Draft',
          customerId: record.customerId || null,
          jobId: record.jobId || null,
          date: today,
          dueDate: addDays(today, Number(db.settings?.invoiceTermsDays) || 30),
          lines: coerceLines(record.lines),
          subtotal: record.subtotal,
          taxAmount: record.taxAmount || 0,
          total: record.total,
          taxRate: record.taxRate || 0,
          paid: 0,
          notes: `From quote ${record.number}`,
          posted: false,
          createdAt: now(),
          updatedAt: now(),
        };
        db.invoices.unshift(created);
        logActivity(actor, `Quote ${record.number} accepted — invoice ${created.number} drafted`);
        break;
      }
      case 'decline': {
        record.status = 'Declined';
        logActivity(actor, `Quote ${record.number} declined`);
        break;
      }
      case 'order': {
        record.status = 'Ordered';
        logActivity(actor, `Purchase order ${record.number} sent to ${store_label('vendors', record.vendorId)}`);
        break;
      }
      case 'receive': {
        const receipts = Array.isArray(payload.lines) ? payload.lines : [];
        const { received, parts } = erp.receiveGoods(db, record, receipts, actor);
        if (!received.length) throw new Error('Nothing to receive — enter a quantity on at least one line');
        logActivity(actor, `Received goods on ${record.number} (${received.reduce((s, r) => s + r.qty, 0)} units)`);
        emitExtras(parts.map((item) => ({ collection: 'parts', item })));
        break;
      }
      case 'close': {
        record.status = 'Closed';
        logActivity(actor, `Closed purchase order ${record.number}`);
        break;
      }
      case 'record': {
        if (!(record.lines || []).length) throw new Error('Add at least one line item before recording the bill');
        erp.postBill(db, record);
        record.status = 'Unpaid';
        logActivity(actor, `Recorded bill ${record.number} — owed to ${store_label('vendors', record.vendorId)}`);
        break;
      }
      case 'void': {
        if (collectionName === 'invoices') erp.unpostInvoice(db, record);
        else erp.unpostBill(db, record);
        logActivity(actor, `Voided ${col.singular.toLowerCase()} ${record.number} — books reversed`);
        break;
      }
      default:
        throw new Error('Unknown operation');
    }
    record.updatedAt = now();
    afterMutation();
    emitRecord({ type: 'update', collection: collectionName, item: record, activity: db.activity[0], actor });
    if (created) {
      emitRecord({ type: 'create', collection: 'invoices', item: created, activity: db.activity[0], actor });
    }
    return { record, created };
  }

  function store_label(name, id) {
    if (!id) return '';
    const meta = collectionByName[name];
    const rec = (db[name] || []).find((r) => r.id === id);
    return rec ? rec[meta.primary] || rec.id : '';
  }

  function addDays(iso, days) {
    const d = new Date(iso + 'T00:00:00');
    d.setDate(d.getDate() + days);
    return d.toISOString().slice(0, 10);
  }

  // Emission is pluggable so the same engine works behind SSE (server) or
  // direct listeners (browser demo).
  let emitRecord = (event) => {};

  function setEmitter(fn) {
    emitRecord = fn || ((event) => {});
  }

  function updateSettings(patch, actor) {
    db.settings = { ...db.settings, ...patch };
    const note = logActivity(actor, 'Updated settings');
    afterMutation();
    emitRecord({ type: 'settings', settings: db.settings, activity: note, actor });
    return db.settings;
  }

  function clear() {
    for (const c of collections) db[c.name] = [];
    const note = logActivity('_system', 'Cleared all records — database is empty');
    erp.catchUp(db); // re-seed chart of accounts
    afterMutation();
    emitRecord({ type: 'reload', actor: '_system', activity: note });
    return db;
  }

  function replaceAll(incoming, actor) {
    const next = { ...incoming };
    for (const c of collections) if (!Array.isArray(next[c.name])) next[c.name] = [];
    if (!Array.isArray(next.activity)) next.activity = [];
    if (!next.settings || typeof next.settings !== 'object') next.settings = { ...db.settings };
    next.meta = { ...(next.meta || {}), version: 2, restoredAt: now() };
    Object.keys(db).forEach((k) => delete db[k]);
    Object.assign(db, next);
    ensureShape();
    const note = logActivity(actor, 'Restored database from backup');
    afterMutation();
    emitRecord({ type: 'reload', actor, activity: note });
    return db;
  }

  ensureShape();

  return {
    ensureShape,
    create,
    update,
    remove,
    op,
    updateSettings,
    clear,
    replaceAll,
    setEmitter,
    logActivity,
    newId,
  };
}
