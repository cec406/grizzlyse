// Single source of truth for the data model.
// Imported by the Node server (for validation + type coercion) and by the
// browser client (for rendering tables, forms and boards).
//
// Collections come in three kinds:
//   master data   — customers, parts, people, vendors, assets, jobs…
//   documents     — quotes, invoices, POs, bills: status machines with line
//                   items, totals and side effects (see shared/erp.js)
//   system        — append-only ledgers (stockmoves, ledger) and the chart of
//                   accounts; hidden from the nav and the "New" menu.
//
// Business profiles (shared/profiles.js) hide collections per industry — the
// data model stays the same for everyone.

import { PROFILE_KEYS } from './profiles.js';

export const APP_NAME = 'GrizzWorks';
export const APP_VERSION = '2.1.1';

export const TYPES = {
  TEXT: 'text',
  TEXTAREA: 'textarea',
  NUMBER: 'number',
  CURRENCY: 'currency',
  DATE: 'date',
  SELECT: 'select',
  REF: 'ref', // reference to another collection
  BOOL: 'bool',
  URL: 'url',
  EMAIL: 'email',
  TEL: 'tel',
  LINES: 'lines', // document line items (master-detail)
};

const PRIORITY = ['Low', 'Normal', 'High', 'Urgent'];
const WO_STATUS = ['Backlog', 'Scheduled', 'In Progress', 'Waiting Parts', 'Done'];
const TERMS = ['Due on receipt', 'Net 15', 'Net 30', 'Net 60'];

// A small palette used for status/priority chips in the UI.
export const COLORS = {
  Backlog: '#64748b',
  Scheduled: '#0ea5e9',
  'In Progress': '#f59e0b',
  'Waiting Parts': '#a855f7',
  Done: '#22c55e',
  Low: '#64748b',
  Normal: '#0ea5e9',
  High: '#f59e0b',
  Urgent: '#ef4444',
  // documents & jobs
  Draft: '#64748b',
  Sent: '#0ea5e9',
  Accepted: '#22c55e',
  Declined: '#ef4444',
  Partial: '#f59e0b',
  Paid: '#22c55e',
  Overdue: '#ef4444',
  Void: '#94a3b8',
  Ordered: '#0ea5e9',
  Received: '#22c55e',
  Closed: '#64748b',
  Unpaid: '#f59e0b',
  Quoted: '#0ea5e9',
  Active: '#22c55e',
  'On Hold': '#f59e0b',
  Cancelled: '#ef4444',
};

// Line-item kinds. Parts pull their price/cost from the parts collection and
// create stock moves when invoiced; labor is hours x rate; item is free-form.
export const LINE_KINDS = ['part', 'labor', 'item'];

// -- shared line schema (used by quotes, invoices, POs and bills) ------------
function docLineFields({ sale = false } = {}) {
  const fields = [
    { key: 'kind', label: 'Type', type: TYPES.SELECT, options: LINE_KINDS, default: sale ? 'part' : 'part' },
    { key: 'partId', label: 'Part', type: TYPES.REF, ref: 'parts', refLabel: 'name' },
    { key: 'description', label: 'Description', type: TYPES.TEXT },
    { key: 'qty', label: sale ? 'Qty' : 'Qty', type: TYPES.NUMBER, step: 'any', default: 1 },
    { key: 'unitPrice', label: sale ? 'Unit Price' : 'Unit Cost', type: TYPES.CURRENCY },
    { key: 'taxable', label: 'Taxable', type: TYPES.BOOL, default: true },
  ];
  return fields;
}

export const collections = [
  // ---------------- master data ----------------
  {
    name: 'customers',
    label: 'Customers',
    singular: 'Customer',
    icon: 'people',
    primary: 'name',
    defaultSort: { key: 'name', dir: 'asc' },
    fields: [
      { key: 'name', label: 'Customer', type: TYPES.TEXT, required: true, width: 'wide' },
      { key: 'phone', label: 'Phone', type: TYPES.TEL },
      { key: 'email', label: 'Email', type: TYPES.EMAIL },
      { key: 'address', label: 'Address', type: TYPES.TEXT, table: false },
      { key: 'terms', label: 'Payment Terms', type: TYPES.SELECT, options: TERMS, default: 'Due on receipt' },
      { key: 'taxExempt', label: 'Tax Exempt', type: TYPES.BOOL, default: false, table: false },
      { key: 'notes', label: 'Notes', type: TYPES.TEXTAREA, table: false },
    ],
  },
  {
    name: 'jobs',
    label: 'Jobs',
    singular: 'Job',
    icon: 'target',
    primary: 'title',
    defaultSort: { key: 'status', dir: 'asc' },
    statusKey: 'status',
    fields: [
      { key: 'title', label: 'Job', type: TYPES.TEXT, required: true, width: 'wide' },
      { key: 'status', label: 'Status', type: TYPES.SELECT, options: ['Quoted', 'Active', 'On Hold', 'Done', 'Cancelled'], default: 'Quoted' },
      { key: 'customerId', label: 'Customer', type: TYPES.REF, ref: 'customers', refLabel: 'name' },
      { key: 'budget', label: 'Estimate / Budget', type: TYPES.CURRENCY },
      { key: 'startDate', label: 'Start', type: TYPES.DATE },
      { key: 'dueDate', label: 'Due', type: TYPES.DATE },
      { key: 'location', label: 'Location', type: TYPES.TEXT },
      { key: 'description', label: 'Description', type: TYPES.TEXTAREA, table: false },
      { key: 'notes', label: 'Notes', type: TYPES.TEXTAREA, table: false },
    ],
  },
  {
    name: 'workorders',
    label: 'Work Orders',
    singular: 'Work Order',
    icon: 'clipboard',
    primary: 'title',
    defaultSort: { key: 'due', dir: 'asc' },
    statusKey: 'status',
    fields: [
      { key: 'title', label: 'Title', type: TYPES.TEXT, required: true, width: 'wide' },
      { key: 'status', label: 'Status', type: TYPES.SELECT, options: WO_STATUS, default: 'Backlog' },
      { key: 'priority', label: 'Priority', type: TYPES.SELECT, options: PRIORITY, default: 'Normal' },
      { key: 'assetId', label: 'Asset', type: TYPES.REF, ref: 'assets', refLabel: 'name' },
      { key: 'jobId', label: 'Job', type: TYPES.REF, ref: 'jobs', refLabel: 'title' },
      { key: 'assigneeId', label: 'Assigned To', type: TYPES.REF, ref: 'people', refLabel: 'name' },
      { key: 'type', label: 'Type', type: TYPES.SELECT, options: ['Corrective', 'Preventive', 'Inspection', 'Project', 'Safety'], default: 'Corrective' },
      { key: 'due', label: 'Due', type: TYPES.DATE },
      { key: 'estHours', label: 'Est. Hours', type: TYPES.NUMBER, step: 0.25 },
      { key: 'description', label: 'Description', type: TYPES.TEXTAREA, table: false },
    ],
  },
  {
    name: 'schedule',
    label: 'Maintenance Schedule',
    singular: 'Scheduled Task',
    icon: 'calendar',
    primary: 'task',
    defaultSort: { key: 'nextDue', dir: 'asc' },
    fields: [
      { key: 'task', label: 'Task', type: TYPES.TEXT, required: true, width: 'wide' },
      { key: 'nextDue', label: 'Next Due', type: 'computed' },
      { key: 'assetId', label: 'Asset', type: TYPES.REF, ref: 'assets', refLabel: 'name' },
      { key: 'frequencyDays', label: 'Every (days)', type: TYPES.NUMBER, step: 1, default: 30 },
      { key: 'lastDone', label: 'Last Done', type: TYPES.DATE },
      { key: 'assigneeId', label: 'Assigned To', type: TYPES.REF, ref: 'people', refLabel: 'name' },
      { key: 'priority', label: 'Priority', type: TYPES.SELECT, options: PRIORITY, default: 'Normal' },
      { key: 'notes', label: 'Notes', type: TYPES.TEXTAREA, table: false },
    ],
  },
  {
    name: 'parts',
    label: 'Parts & Inventory',
    singular: 'Part',
    icon: 'box',
    primary: 'name',
    defaultSort: { key: 'name', dir: 'asc' },
    fields: [
      { key: 'name', label: 'Part', type: TYPES.TEXT, required: true, width: 'wide' },
      { key: 'sku', label: 'SKU', type: TYPES.TEXT },
      { key: 'qty', label: 'Qty On Hand', type: TYPES.NUMBER, step: 'any', default: 0 },
      { key: 'minQty', label: 'Min Qty', type: TYPES.NUMBER, step: 1, default: 0 },
      { key: 'unit', label: 'Unit', type: TYPES.SELECT, options: ['ea', 'ft', 'm', 'lb', 'kg', 'L', 'gal', 'box', 'roll'], default: 'ea' },
      { key: 'location', label: 'Bin / Location', type: TYPES.TEXT },
      { key: 'vendorId', label: 'Vendor', type: TYPES.REF, ref: 'vendors', refLabel: 'name' },
      { key: 'cost', label: 'Unit Cost', type: TYPES.CURRENCY },
      { key: 'avgCost', label: 'Avg Cost', type: TYPES.CURRENCY, table: false },
      { key: 'price', label: 'Sale Price', type: TYPES.CURRENCY },
      { key: 'category', label: 'Category', type: TYPES.TEXT, table: false },
      { key: 'notes', label: 'Notes', type: TYPES.TEXTAREA, table: false },
    ],
  },
  {
    name: 'assets',
    label: 'Assets',
    singular: 'Asset',
    icon: 'machine',
    primary: 'name',
    defaultSort: { key: 'name', dir: 'asc' },
    statusKey: 'status',
    fields: [
      { key: 'name', label: 'Asset', type: TYPES.TEXT, required: true, width: 'wide' },
      { key: 'status', label: 'Status', type: TYPES.SELECT, options: ['Running', 'Down', 'Maintenance', 'Retired'], default: 'Running' },
      { key: 'workflowStatus', label: 'Workflow Status', type: TYPES.SELECT, options: ['Pending Triage', 'In Shop', 'Ready for Pickup', 'Completed'], default: 'Pending Triage' },
      { key: 'category', label: 'Category', type: TYPES.SELECT, options: ['Excavator', 'Loader', 'Dozer', 'Haul Truck', 'Lift', 'Service Truck', 'Power & Air', 'Facility', 'Other'], default: 'Other' },
      { key: 'criticality', label: 'Criticality', type: TYPES.SELECT, options: ['Low', 'Medium', 'High'], default: 'Medium' },
      { key: 'location', label: 'Location', type: TYPES.TEXT },
      { key: 'manufacturer', label: 'Make', type: TYPES.TEXT },
      { key: 'model', label: 'Model', type: TYPES.TEXT },
      { key: 'serial', label: 'Serial #', type: TYPES.TEXT },
      { key: 'installedOn', label: 'Installed', type: TYPES.DATE, table: false },
      { key: 'notes', label: 'Notes', type: TYPES.TEXTAREA, table: false },
    ],
  },
  // ---------------- documents (sell side) ----------------
  {
    name: 'quotes',
    label: 'Quotes',
    singular: 'Quote',
    icon: 'invoice',
    primary: 'number',
    doc: true,
    defaultSort: { key: 'date', dir: 'desc' },
    statusKey: 'status',
    fields: [
      { key: 'number', label: 'Quote #', type: TYPES.TEXT, readonly: true },
      { key: 'status', label: 'Status', type: TYPES.SELECT, options: ['Draft', 'Sent', 'Accepted', 'Declined'], default: 'Draft' },
      { key: 'customerId', label: 'Customer', type: TYPES.REF, ref: 'customers', refLabel: 'name' },
      { key: 'jobId', label: 'Job', type: TYPES.REF, ref: 'jobs', refLabel: 'title', table: false },
      { key: 'date', label: 'Date', type: TYPES.DATE, default: '' },
      { key: 'validUntil', label: 'Valid Until', type: TYPES.DATE },
      { key: 'lines', label: 'Line Items', type: TYPES.LINES, table: false, sale: true },
      { key: 'subtotal', label: 'Subtotal', type: TYPES.CURRENCY, readonly: true },
      { key: 'taxAmount', label: 'Tax', type: TYPES.CURRENCY, readonly: true },
      { key: 'total', label: 'Total', type: TYPES.CURRENCY, readonly: true },
      { key: 'taxRate', label: 'Tax %', type: TYPES.NUMBER, step: 'any', table: false },
      { key: 'notes', label: 'Notes', type: TYPES.TEXTAREA, table: false },
    ],
  },
  {
    name: 'invoices',
    label: 'Invoices',
    singular: 'Invoice',
    icon: 'invoice',
    primary: 'number',
    doc: true,
    defaultSort: { key: 'date', dir: 'desc' },
    statusKey: 'status',
    fields: [
      { key: 'number', label: 'Invoice #', type: TYPES.TEXT, readonly: true },
      { key: 'status', label: 'Status', type: TYPES.SELECT, options: ['Draft', 'Sent', 'Partial', 'Paid', 'Void'], default: 'Draft' },
      { key: 'customerId', label: 'Customer', type: TYPES.REF, ref: 'customers', refLabel: 'name' },
      { key: 'jobId', label: 'Job', type: TYPES.REF, ref: 'jobs', refLabel: 'title', table: false },
      { key: 'date', label: 'Date', type: TYPES.DATE, default: '' },
      { key: 'dueDate', label: 'Due', type: TYPES.DATE },
      { key: 'lines', label: 'Line Items', type: TYPES.LINES, table: false, sale: true },
      { key: 'subtotal', label: 'Subtotal', type: TYPES.CURRENCY, readonly: true },
      { key: 'taxAmount', label: 'Tax', type: TYPES.CURRENCY, readonly: true },
      { key: 'total', label: 'Total', type: TYPES.CURRENCY, readonly: true },
      { key: 'paid', label: 'Paid', type: TYPES.CURRENCY, readonly: true },
      { key: 'balance', label: 'Balance', type: 'computed' },
      { key: 'taxRate', label: 'Tax %', type: TYPES.NUMBER, step: 'any', table: false },
      { key: 'notes', label: 'Notes', type: TYPES.TEXTAREA, table: false },
    ],
  },
  {
    name: 'payments',
    label: 'Payments Received',
    singular: 'Payment',
    icon: 'dollar',
    primary: 'reference',
    defaultSort: { key: 'date', dir: 'desc' },
    fields: [
      { key: 'invoiceId', label: 'Invoice', type: TYPES.REF, ref: 'invoices', refLabel: 'number' },
      { key: 'date', label: 'Date', type: TYPES.DATE, default: '' },
      { key: 'amount', label: 'Amount', type: TYPES.CURRENCY, required: true },
      { key: 'method', label: 'Method', type: TYPES.SELECT, options: ['Cash', 'Check', 'Card', 'ACH', 'Other'], default: 'Cash' },
      { key: 'reference', label: 'Reference / Check #', type: TYPES.TEXT },
      { key: 'notes', label: 'Notes', type: TYPES.TEXTAREA, table: false },
    ],
  },
  // ---------------- documents (buy side) ----------------
  {
    name: 'vendors',
    label: 'Vendors',
    singular: 'Vendor',
    icon: 'truck',
    primary: 'name',
    defaultSort: { key: 'name', dir: 'asc' },
    fields: [
      { key: 'name', label: 'Vendor', type: TYPES.TEXT, required: true, width: 'wide' },
      { key: 'category', label: 'Supplies', type: TYPES.TEXT },
      { key: 'contact', label: 'Contact', type: TYPES.TEXT },
      { key: 'phone', label: 'Phone', type: TYPES.TEL },
      { key: 'email', label: 'Email', type: TYPES.EMAIL, table: false },
      { key: 'leadTimeDays', label: 'Lead Time (days)', type: TYPES.NUMBER, step: 1 },
      { key: 'notes', label: 'Notes', type: TYPES.TEXTAREA, table: false },
    ],
  },
  {
    name: 'purchaseorders',
    label: 'Purchase Orders',
    singular: 'Purchase Order',
    icon: 'cart',
    primary: 'number',
    doc: true,
    defaultSort: { key: 'date', dir: 'desc' },
    statusKey: 'status',
    fields: [
      { key: 'number', label: 'PO #', type: TYPES.TEXT, readonly: true },
      { key: 'status', label: 'Status', type: TYPES.SELECT, options: ['Draft', 'Ordered', 'Partial', 'Received', 'Closed'], default: 'Draft' },
      { key: 'vendorId', label: 'Vendor', type: TYPES.REF, ref: 'vendors', refLabel: 'name' },
      { key: 'jobId', label: 'Job', type: TYPES.REF, ref: 'jobs', refLabel: 'title', table: false },
      { key: 'date', label: 'Date', type: TYPES.DATE, default: '' },
      { key: 'expectedDate', label: 'Expected', type: TYPES.DATE },
      { key: 'lines', label: 'Line Items', type: TYPES.LINES, table: false },
      { key: 'subtotal', label: 'Subtotal', type: TYPES.CURRENCY, readonly: true },
      { key: 'total', label: 'Total', type: TYPES.CURRENCY, readonly: true },
      { key: 'receivedValue', label: 'Received Value', type: TYPES.CURRENCY, readonly: true, table: false },
      { key: 'notes', label: 'Notes', type: TYPES.TEXTAREA, table: false },
    ],
  },
  {
    name: 'bills',
    label: 'Vendor Bills',
    singular: 'Bill',
    icon: 'receipt',
    primary: 'number',
    doc: true,
    defaultSort: { key: 'date', dir: 'desc' },
    statusKey: 'status',
    fields: [
      { key: 'number', label: 'Bill #', type: TYPES.TEXT, readonly: true },
      { key: 'status', label: 'Status', type: TYPES.SELECT, options: ['Draft', 'Unpaid', 'Partial', 'Paid', 'Void'], default: 'Draft' },
      { key: 'vendorId', label: 'Vendor', type: TYPES.REF, ref: 'vendors', refLabel: 'name' },
      { key: 'poId', label: 'Purchase Order', type: TYPES.REF, ref: 'purchaseorders', refLabel: 'number', table: false },
      { key: 'jobId', label: 'Job', type: TYPES.REF, ref: 'jobs', refLabel: 'title', table: false },
      { key: 'date', label: 'Date', type: TYPES.DATE, default: '' },
      { key: 'dueDate', label: 'Due', type: TYPES.DATE },
      { key: 'lines', label: 'Line Items', type: TYPES.LINES, table: false },
      { key: 'subtotal', label: 'Subtotal', type: TYPES.CURRENCY, readonly: true },
      { key: 'taxAmount', label: 'Tax', type: TYPES.CURRENCY, readonly: true },
      { key: 'total', label: 'Total', type: TYPES.CURRENCY, readonly: true },
      { key: 'paid', label: 'Paid', type: TYPES.CURRENCY, readonly: true },
      { key: 'balance', label: 'Balance', type: 'computed' },
      { key: 'taxRate', label: 'Tax %', type: TYPES.NUMBER, step: 'any', table: false },
      { key: 'notes', label: 'Notes', type: TYPES.TEXTAREA, table: false },
    ],
  },
  {
    name: 'vendorpayments',
    label: 'Payments Sent',
    singular: 'Vendor Payment',
    icon: 'dollar',
    primary: 'reference',
    defaultSort: { key: 'date', dir: 'desc' },
    fields: [
      { key: 'billId', label: 'Bill', type: TYPES.REF, ref: 'bills', refLabel: 'number' },
      { key: 'date', label: 'Date', type: TYPES.DATE, default: '' },
      { key: 'amount', label: 'Amount', type: TYPES.CURRENCY, required: true },
      { key: 'method', label: 'Method', type: TYPES.SELECT, options: ['Cash', 'Check', 'Card', 'ACH', 'Other'], default: 'Check' },
      { key: 'reference', label: 'Reference / Check #', type: TYPES.TEXT },
      { key: 'notes', label: 'Notes', type: TYPES.TEXTAREA, table: false },
    ],
  },
  // ---------------- team ----------------
  {
    name: 'people',
    label: 'People',
    singular: 'Person',
    icon: 'people',
    primary: 'name',
    defaultSort: { key: 'name', dir: 'asc' },
    fields: [
      { key: 'name', label: 'Name', type: TYPES.TEXT, required: true, width: 'wide' },
      { key: 'role', label: 'Role', type: TYPES.TEXT },
      { key: 'payRate', label: 'Pay Rate ($/hr)', type: TYPES.CURRENCY, table: false },
      { key: 'shift', label: 'Shift', type: TYPES.SELECT, options: ['Day', 'Swing', 'Night', 'On-call'], default: 'Day' },
      { key: 'status', label: 'Status', type: TYPES.SELECT, options: ['Available', 'On Job', 'Off'], default: 'Available' },
      { key: 'phone', label: 'Phone', type: TYPES.TEL },
      { key: 'email', label: 'Email', type: TYPES.EMAIL, table: false },
    ],
  },
  {
    name: 'timeentries',
    label: 'Time',
    singular: 'Time Entry',
    icon: 'timer',
    primary: 'personId',
    defaultSort: { key: 'date', dir: 'desc' },
    fields: [
      { key: 'personId', label: 'Person', type: TYPES.REF, ref: 'people', refLabel: 'name' },
      { key: 'date', label: 'Date', type: TYPES.DATE, default: '' },
      { key: 'hours', label: 'Hours', type: TYPES.NUMBER, step: 0.25, required: true },
      { key: 'jobId', label: 'Job', type: TYPES.REF, ref: 'jobs', refLabel: 'title' },
      { key: 'woId', label: 'Work Order', type: TYPES.REF, ref: 'workorders', refLabel: 'title' },
      { key: 'billable', label: 'Billable', type: TYPES.BOOL, default: true },
      { key: 'rate', label: 'Rate override ($/hr)', type: TYPES.CURRENCY, table: false },
      { key: 'notes', label: 'Notes', type: TYPES.TEXT, table: false },
    ],
  },
  {
    name: 'resources',
    label: 'Shared Resources',
    singular: 'Resource',
    icon: 'folder',
    primary: 'title',
    defaultSort: { key: 'title', dir: 'asc' },
    fields: [
      { key: 'title', label: 'Title', type: TYPES.TEXT, required: true, width: 'wide' },
      { key: 'type', label: 'Type', type: TYPES.SELECT, options: ['Manual', 'SOP', 'Document', 'Drawing', 'Video', 'Folder', 'Link', 'Network Share'], default: 'Document' },
      { key: 'url', label: 'Path / URL', type: TYPES.URL, width: 'wide' },
      { key: 'category', label: 'Category', type: TYPES.TEXT },
      { key: 'owner', label: 'Owner / Dept', type: TYPES.TEXT },
      { key: 'notes', label: 'Notes', type: TYPES.TEXTAREA, table: false },
    ],
  },
  // ---------------- system (append-only, hidden from the nav) ----------------
  {
    name: 'stockmoves',
    label: 'Stock Moves',
    singular: 'Stock Move',
    icon: 'box',
    primary: 'partId',
    system: true,
    defaultSort: { key: 'date', dir: 'desc' },
    fields: [
      { key: 'partId', label: 'Part', type: TYPES.REF, ref: 'parts', refLabel: 'name' },
      { key: 'date', label: 'Date', type: TYPES.DATE },
      { key: 'qty', label: 'Qty Change', type: TYPES.NUMBER, step: 'any' },
      { key: 'unitCost', label: 'Unit Cost', type: TYPES.CURRENCY, table: false },
      { key: 'reason', label: 'Reason', type: TYPES.SELECT, options: ['Purchase', 'Sale', 'Adjustment', 'Return', 'Opening'], default: 'Adjustment' },
      { key: 'refType', label: 'From', type: TYPES.TEXT, table: false },
      { key: 'refId', label: 'Ref ID', type: TYPES.TEXT, table: false },
      { key: 'notes', label: 'Notes', type: TYPES.TEXTAREA, table: false },
    ],
  },
  {
    name: 'ledger',
    label: 'Journal',
    singular: 'Journal Entry',
    icon: 'chart',
    primary: 'memo',
    system: true,
    defaultSort: { key: 'date', dir: 'desc' },
    fields: [
      { key: 'date', label: 'Date', type: TYPES.DATE },
      { key: 'memo', label: 'Memo', type: TYPES.TEXT, width: 'wide' },
      { key: 'refType', label: 'Source', type: TYPES.TEXT },
      { key: 'refId', label: 'Ref ID', type: TYPES.TEXT, table: false },
      { key: 'lines', label: 'Lines', type: TYPES.LINES, table: false },
    ],
  },
  {
    name: 'accounts',
    label: 'Chart of Accounts',
    singular: 'Account',
    icon: 'chart',
    primary: 'name',
    system: true,
    defaultSort: { key: 'code', dir: 'asc' },
    fields: [
      { key: 'code', label: 'Code', type: TYPES.TEXT },
      { key: 'name', label: 'Account', type: TYPES.TEXT, required: true, width: 'wide' },
      { key: 'type', label: 'Type', type: TYPES.SELECT, options: ['Asset', 'Liability', 'Equity', 'Income', 'Expense'], default: 'Asset' },
      { key: 'description', label: 'Description', type: TYPES.TEXT, table: false },
    ],
  },
];

export const collectionByName = Object.fromEntries(collections.map((c) => [c.name, c]));

export const DOC_COLLECTIONS = collections.filter((c) => c.doc).map((c) => c.name);
export const SYSTEM_COLLECTIONS = collections.filter((c) => c.system).map((c) => c.name);

// Which fields get type-coerced on the server before persisting.
export function coerceValue(field, value) {
  if (value === null || value === undefined || value === '') {
    if (field.type === TYPES.NUMBER || field.type === TYPES.CURRENCY) return null;
    if (field.type === TYPES.BOOL) return false;
    return value === undefined ? '' : value;
  }
  switch (field.type) {
    case TYPES.NUMBER:
    case TYPES.CURRENCY: {
      const n = Number(value);
      return Number.isFinite(n) ? n : null;
    }
    case TYPES.BOOL:
      return value === true || value === 'true' || value === 1 || value === '1';
    default:
      return String(value);
  }
}

// Normalize one document's line items: assign ids, coerce types, keep the
// known keys only. Shared by the server engine and the browser demo engine.
export function coerceLines(raw, rnd = Math.random) {
  if (!Array.isArray(raw)) return [];
  return raw
    .filter((l) => l && typeof l === 'object')
    .map((l, i) => ({
      id: typeof l.id === 'string' && l.id ? l.id : `ln-${i}-${Math.floor(rnd() * 1e6).toString(36)}`,
      kind: LINE_KINDS.includes(l.kind) ? l.kind : 'item',
      partId: l.partId ? String(l.partId) : '',
      description: String(l.description ?? ''),
      qty: Number(l.qty) || 0,
      unitPrice: Number(l.unitPrice) || 0,
      taxable: l.taxable !== false,
    }))
    .filter((l) => l.qty !== 0 || l.unitPrice !== 0 || l.description);
}

// Document totals. Money math lives in ONE place (this file) and both engines
// use it — cents-safe by construction.
export function docTotals(lines, taxRate = 0, taxExempt = false) {
  const list = Array.isArray(lines) ? lines : [];
  const subtotal = round2(list.reduce((sum, l) => sum + (Number(l.qty) || 0) * (Number(l.unitPrice) || 0), 0));
  const taxable = list.filter((l) => l.taxable !== false).reduce((sum, l) => sum + (Number(l.qty) || 0) * (Number(l.unitPrice) || 0), 0);
  const rate = taxExempt ? 0 : (Number(taxRate) || 0);
  const taxAmount = round2((taxable * rate) / 100);
  return { subtotal, taxAmount, total: round2(subtotal + taxAmount) };
}

export function round2(n) {
  return Math.round((Number(n) || 0) * 100) / 100;
}

// Compute the derived fields (used by the client and available to the server).
export function computeFields(collectionName, item) {
  const out = {};
  if (collectionName === 'schedule') {
    const freq = Number(item.frequencyDays) || 0;
    if (item.lastDone && freq > 0) {
      const d = new Date(item.lastDone + 'T00:00:00');
      d.setDate(d.getDate() + freq);
      out.nextDue = d.toISOString().slice(0, 10);
    } else {
      out.nextDue = item.lastDone || '';
    }
    out.daysUntilDue = out.nextDue ? daysUntil(out.nextDue) : null;
  }
  if (collectionName === 'invoices' || collectionName === 'bills') {
    const total = Number(item.total) || 0;
    const paid = Number(item.paid) || 0;
    out.balance = round2(total - paid);
    out.daysUntilDue = item.dueDate ? daysUntil(item.dueDate) : null;
    out.isOverdue = out.balance > 0 && out.daysUntilDue !== null && out.daysUntilDue < 0;
  }
  return out;
}

export function daysUntil(dateStr) {
  if (!dateStr) return null;
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const target = new Date(dateStr + 'T00:00:00');
  if (Number.isNaN(target.getTime())) return null;
  return Math.round((target - today) / 86400000);
}

export function isOverdue(item) {
  const d = daysUntil(item.due ?? item.nextDue);
  return d !== null && d < 0 && !isClosed(item);
}

export function isClosed(item) {
  return item.status === 'Done' || item.status === 'Retired';
}

export const settingsSchema = [
  { key: 'shopName', label: 'Shop name', type: TYPES.TEXT, default: 'Montana Fleet Solutions LLC' },
  { key: 'profile', label: 'Business profile', type: TYPES.SELECT, options: PROFILE_KEYS, default: 'general' },
  { key: 'shopSubtitle', label: 'Shop subtitle / location', type: TYPES.TEXT, default: 'Construction Equipment Fleet Service' },
  { key: 'shiftPattern', label: 'Shift pattern', type: TYPES.TEXT, default: 'Day 6a-2p · Swing 2p-10p · On-call weekends' },
  { key: 'brandName', label: 'Company / brand name', type: TYPES.TEXT, default: 'Montana Fleet Solutions LLC' },
  { key: 'brandTagline', label: 'Brand tagline', type: TYPES.TEXT, default: 'Heavy equipment fleet maintenance & repair' },
  { key: 'brandUrl', label: 'Company website URL', type: TYPES.TEXT, default: '' },
  { key: 'bizAddress', label: 'Address (on invoices)', type: TYPES.TEXT, default: '' },
  { key: 'bizPhone', label: 'Phone (on invoices)', type: TYPES.TEXT, default: '' },
  { key: 'bizEmail', label: 'Email (on invoices)', type: TYPES.TEXT, default: '' },
  { key: 'defaultLaborRate', label: 'Default labor rate ($/hr)', type: TYPES.CURRENCY, default: 95 },
  { key: 'defaultTaxRate', label: 'Default tax rate (%)', type: TYPES.NUMBER, default: 0 },
  { key: 'invoiceTermsDays', label: 'Invoice terms (days)', type: TYPES.NUMBER, default: 30 },
  { key: 'showWelcome', label: 'Show intro on first visit', type: TYPES.BOOL, default: true },
  { key: 'lowStockAlerts', label: 'Highlight low-stock parts', type: TYPES.BOOL, default: true },
  { key: 'staleDays', label: 'Flag work orders idle after (days)', type: TYPES.NUMBER, default: 7 },
  { key: 'rotateSeconds', label: 'Wall board rotation (seconds)', type: TYPES.NUMBER, default: 14 },
  { key: 'kioskViews', label: 'Wall board views', type: TYPES.TEXT, default: 'overview,workorders,schedule,parts,assets,about' },
];

export const KIOSK_VIEWS = {
  overview: 'Shop Overview',
  workorders: 'Work Order Board',
  schedule: 'Preventive Maintenance',
  parts: 'Parts & Stock Alerts',
  assets: 'Asset Status',
  about: 'About This Demo',
};

export const defaultSettings = Object.fromEntries(
  settingsSchema.map((s) => [s.key, s.default]),
);
