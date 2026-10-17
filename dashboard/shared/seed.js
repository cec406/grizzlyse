// Sample data so the shop is useful the moment it starts: a working fleet
// service business with customers, jobs, invoices, payments, purchase orders,
// bills and time entries — not just a board of work orders.
// Relative dates are generated at seed time so the demo always looks current.
// Demo company: Montana Fleet Solutions LLC — construction equipment fleet
// service and repair.
//
// ALL sample contacts are fictional: phone numbers use the reserved 555-01XX
// block, email/URL domains use the reserved .example TLD, and serials,
// account numbers, people and vendor names are invented.
//
// Seeded documents do NOT pass through the record engine (there is no server
// running at seed time). Instead shared/erp.js catchUp() posts them, derives
// paid/status and creates the stock moves the first time the database loads —
// one posting code path for seeds, imports and live edits alike. Part "qty"
// below is the desired CURRENT stock; the quantities sold on seeded invoices
// are added back programmatically so that posting the invoices lands exactly
// on the current number.
import { defaultSettings, docTotals, coerceLines, round2 } from './schema.js';
import * as erp from './erp.js';

function iso(offsetDays) {
  const d = new Date();
  d.setHours(12, 0, 0, 0);
  d.setDate(d.getDate() + offsetDays);
  return d.toISOString().slice(0, 10);
}

const uid = (p) => `${p}-${Math.random().toString(36).slice(2, 8)}`;

const line = (kind, { partId = '', description = '', qty = 1, unitPrice = 0, taxable = true }) => ({
  id: uid('ln'), kind, partId, description, qty, unitPrice, taxable,
});

export function buildSeed() {
  const people = [
    { id: 'per-jo', name: 'Jo Ramirez', role: 'Service Manager', shift: 'Day', status: 'Available', phone: 'ext. 200', email: 'jo@mtfleet.example', payRate: 48 },
    { id: 'per-dana', name: 'Dana Whitfield', role: 'Lead Mechanic', shift: 'Day', status: 'Available', phone: 'ext. 204', email: 'dana@mtfleet.example', payRate: 42 },
    { id: 'per-miguel', name: 'Miguel Ortega', role: 'Diesel Mechanic', shift: 'Day', status: 'On Job', phone: 'ext. 211', email: 'miguel@mtfleet.example', payRate: 38 },
    { id: 'per-sam', name: 'Sam Chen', role: 'Hydraulic Technician', shift: 'Swing', status: 'Available', phone: 'ext. 218', email: 'sam@mtfleet.example', payRate: 36 },
    { id: 'per-riley', name: 'Riley Novak', role: 'Field Service Tech', shift: 'Swing', status: 'Available', phone: 'ext. 220', email: 'riley@mtfleet.example', payRate: 32 },
    { id: 'per-kim', name: 'Kim Patel', role: 'Welder / Fabricator', shift: 'Night', status: 'Off', phone: 'ext. 226', email: 'kim@mtfleet.example', payRate: 40 },
  ];

  const vendors = [
    { id: 'ven-bigsky', name: 'Big Sky Equipment Parts', category: 'Filters, fluids, wear parts', contact: 'R. Alvarez', phone: '555-0142', email: 'orders@bigsky-parts.example', leadTimeDays: 2, notes: 'Net-30 account #BSEP-4471' },
    { id: 'ven-yellow', name: 'Yellow Iron Hydraulics', category: 'Hoses, cylinders, pumps', contact: 'T. Brooks', phone: '555-0110', email: 'sales@yellowiron.example', leadTimeDays: 4, notes: 'Hose pressing drop-off before 3p for next-day.' },
    { id: 'ven-under', name: 'Underfoot Undercarriage Co.', category: 'Tracks, sprockets, G.E.T.', contact: 'L. Nguyen', phone: '555-0173', email: 'lnguyen@underfoot.example', leadTimeDays: 7, notes: 'Wear-measurement service available.' },
    { id: 'ven-fleetwest', name: 'Fleetwest Fleet Supply', category: 'General MRO, DEF, batteries', contact: 'Web order', phone: '555-0188', email: 'support@fleetwest.example', leadTimeDays: 1, notes: 'Will-call counter open 7a-6p' },
    { id: 'ven-battery', name: 'Northern Battery & Electric', category: 'Starters, alternators, batteries', contact: 'Front desk', phone: '555-0199', email: 'counter@northbattery.example', leadTimeDays: 3, notes: '' },
  ];

  const customers = [
    { id: 'cus-bigsky', name: 'Big Sky Builders LLC', phone: '555-0155', email: 'fleet@bigskybuilders.example', address: '118 Canyon Ferry Rd, Big Sky', terms: 'Net 30', taxExempt: false, notes: 'Fleet maintenance contract — monthly walk-around + priority bay.' },
    { id: 'cus-helena', name: 'Helena County Road Department', phone: '555-0166', email: 'garage@helena-county.example', address: '2900 Airport Rd, Helena', terms: 'Net 30', taxExempt: true, notes: 'Tax-exempt (municipal). PO number required on every invoice.' },
    { id: 'cus-bozeman', name: 'Bozeman RV & Storage', phone: '555-0177', email: 'service@bozrv.example', address: '4 Frontage Rd, Bozeman', terms: 'Due on receipt', taxExempt: false, notes: 'Counter customer — pays on pickup.' },
    { id: 'cus-walkin', name: 'Counter / Walk-in', phone: '', email: '', address: '', terms: 'Due on receipt', taxExempt: false, notes: 'Catch-all for over-the-counter sales.' },
  ];

  const jobs = [
    { id: 'job-roads', title: 'County graders — spring overhaul', status: 'Active', customerId: 'cus-helena', budget: 24000, startDate: iso(-40), dueDate: iso(25), location: 'Helena county garage', description: 'Two graders: hydraulic overhauls, brake systems, PM catch-up. PO required per phase.' },
    { id: 'job-fleet', title: 'Big Sky fleet maintenance contract', status: 'Active', customerId: 'cus-bigsky', budget: 50000, startDate: iso(-90), dueDate: null, location: 'Big Sky site + shop', description: 'Standing contract: monthly PM, breakdown response, parts at contract rates.' },
    { id: 'job-drain', title: 'Yard drainage washout repair', status: 'Done', customerId: 'cus-bigsky', budget: 3200, startDate: iso(-45), dueDate: iso(-32), location: 'Shop yard', description: 'Runoff undermined the yard drain — dig-out, culvert, regrade.' },
  ];

  const assets = [
    { id: 'ast-exc320', name: 'Cat 320 Excavator', status: 'Running', category: 'Excavator', criticality: 'High', location: 'Big Sky job site', manufacturer: 'Caterpillar', model: '320 GC', serial: 'CAT-320-88231', installedOn: iso(-1460), notes: 'Primary excavator — dedicated to digging and trench work.' },
    { id: 'ast-dozer', name: 'Cat D6 Dozer', status: 'Maintenance', category: 'Dozer', criticality: 'High', location: 'Shop bay 2', manufacturer: 'Caterpillar', model: 'D6 XE', serial: 'CAT-D6-55210', installedOn: iso(-900), notes: 'Final drive leak flagged on site walk-around.' },
    { id: 'ast-haul', name: 'Volvo A25G Haul Truck', status: 'Down', category: 'Haul Truck', criticality: 'High', location: 'Helena job site', manufacturer: 'Volvo', model: 'A25G', serial: 'VOL-A25-30114', installedOn: iso(-1100), notes: 'Brake warning light and slow pedal response. Trailer booked to bring it in.' },
    { id: 'ast-loader', name: 'Cat 950M Wheel Loader', status: 'Running', category: 'Loader', criticality: 'High', location: 'Gravel pit', manufacturer: 'Caterpillar', model: '950M', serial: 'CAT-950-11930', installedOn: iso(-2000), notes: 'Loading trucks full time. Bucket G.E.T. wearing fast.' },
    { id: 'ast-skid', name: 'Bobcat S76 Skid Steer', status: 'Running', category: 'Loader', criticality: 'Medium', location: 'Bozeman yard', manufacturer: 'Bobcat', model: 'S76', serial: 'BOB-S76-25001', installedOn: iso(-720), notes: 'Tires at wear limit on the left side.' },
    { id: 'ast-cmptrack', name: 'Bobcat T66 Track Loader', status: 'Running', category: 'Loader', criticality: 'Medium', location: 'Bozeman yard', manufacturer: 'Bobcat', model: 'T66', serial: 'BOB-T66-7740', installedOn: iso(-540), notes: '' },
    { id: 'ast-backhoe', name: 'Deere 310L Backhoe', status: 'Running', category: 'Loader', criticality: 'Medium', location: 'Bozeman yard', manufacturer: 'John Deere', model: '310L', serial: 'JD-310-0091', installedOn: iso(-3200), notes: 'Kingpost play noted — rebuild quoted.' },
    { id: 'ast-tele', name: 'JLG 1055 Telehandler', status: 'Running', category: 'Lift', criticality: 'Medium', location: 'Big Sky job site', manufacturer: 'JLG', model: '1055', serial: 'JLG-1055-4100', installedOn: iso(-400), notes: 'ANSI annual inspection due.' },
    { id: 'ast-servtruck', name: 'Ford F-550 Service Truck', status: 'Running', category: 'Service Truck', criticality: 'Medium', location: 'Shop', manufacturer: 'Ford', model: 'F-550 + IMT crane', serial: 'FD-F550-445', installedOn: iso(-400), notes: 'Field response unit #1. Air compressor on board.' },
    { id: 'ast-gen', name: 'Cummins 60kW Towable Generator', status: 'Running', category: 'Power & Air', criticality: 'Low', location: 'Shop', manufacturer: 'Cummins', model: 'C60', serial: 'CUM-C60-1930', installedOn: iso(-600), notes: 'Rented out on weekends — log hours after every return.' },
    { id: 'ast-liftold', name: 'Genie GS-1930 Scissor Lift', status: 'Retired', category: 'Lift', criticality: 'Low', location: 'Yard — for sale', manufacturer: 'Genie', model: 'GS-1930', serial: 'GEN-1930-201', installedOn: iso(-2800), notes: 'Replaced by the telehandler. Listed for sale.' },
  ];

  const workorders = [
    { id: uid('wo'), title: 'Replace hydraulic hoses on D6 dozer', status: 'In Progress', priority: 'Urgent', assetId: 'ast-dozer', jobId: 'job-fleet', assigneeId: 'per-dana', type: 'Corrective', due: iso(-1), estHours: 6, description: 'Boom hose burst on site. New hose set from Yellow Iron Hydraulics being pressed tonight.' },
    { id: uid('wo'), title: 'Haul truck brake system diagnosis', status: 'Waiting Parts', priority: 'High', assetId: 'ast-haul', jobId: 'job-roads', assigneeId: 'per-miguel', type: 'Corrective', due: iso(1), estHours: 8, description: 'Brake accumulators and wear sensors on order. Truck down at Helena site.' },
    { id: uid('wo'), title: 'Cat 320 excavator 500-hr service', status: 'Scheduled', priority: 'Normal', assetId: 'ast-exc320', jobId: 'job-fleet', assigneeId: 'per-miguel', type: 'Preventive', due: iso(2), estHours: 4, description: 'Oil change, fuel filters, hydraulic samples, grease all pins.' },
    { id: uid('wo'), title: 'Wheel loader bucket teeth replacement', status: 'Waiting Parts', priority: 'High', assetId: 'ast-loader', jobId: 'job-fleet', assigneeId: 'per-sam', type: 'Corrective', due: iso(1), estHours: 3, description: 'Teeth and adapters from Underfoot — received, book a bay slot.' },
    { id: uid('wo'), title: 'Telehandler annual ANSI inspection', status: 'Scheduled', priority: 'High', assetId: 'ast-tele', jobId: 'job-fleet', assigneeId: 'per-jo', type: 'Inspection', due: iso(5), estHours: 2, description: 'Third-party inspector confirmed for Friday morning.' },
    { id: uid('wo'), title: 'Backhoe kingpost rebuild', status: 'Backlog', priority: 'Normal', assetId: 'ast-backhoe', jobId: 'job-fleet', assigneeId: 'per-dana', type: 'Corrective', due: iso(12), estHours: 12, description: 'Bushings and shims kit quoted — QUO-1001 with the customer.' },
    { id: uid('wo'), title: 'Skid steer tire replacement (x4)', status: 'Backlog', priority: 'Normal', assetId: 'ast-skid', assigneeId: 'per-riley', type: 'Corrective', due: iso(9), estHours: 4, description: 'Left-side tires at wear limit. Air-fit rings in shop.' },
    { id: uid('wo'), title: 'Track loader undercarriage measurement', status: 'Backlog', priority: 'Low', assetId: 'ast-cmptrack', assigneeId: 'per-riley', type: 'Inspection', due: iso(14), estHours: 2, description: 'Log wear % and quote by 60% rule.' },
    { id: uid('wo'), title: 'Generator 250-hr run test & PM', status: 'Scheduled', priority: 'Normal', assetId: 'ast-gen', assigneeId: 'per-miguel', type: 'Preventive', due: iso(3), estHours: 2, description: 'Load bank test, oil + filters, coolant check.' },
    { id: uid('wo'), title: 'Excavator boom crack weld repair', status: 'In Progress', priority: 'High', assetId: 'ast-exc320', jobId: 'job-fleet', assigneeId: 'per-kim', type: 'Corrective', due: iso(0), estHours: 5, description: 'Crack at boom pad. Weld prep complete, root pass tonight.' },
    { id: uid('wo'), title: 'Service truck crane load test & restock', status: 'Backlog', priority: 'Normal', assetId: 'ast-servtruck', assigneeId: 'per-kim', type: 'Safety', due: iso(10), estHours: 2, description: 'Annual crane certification test. Restock consumables after.' },
    { id: uid('wo'), title: 'Grader brake overhaul — unit 12', status: 'In Progress', priority: 'High', assetId: null, jobId: 'job-roads', assigneeId: 'per-miguel', type: 'Corrective', due: iso(4), estHours: 10, description: 'County grader at the shop. Accumulators on PO-1003 follow-up.' },
    { id: uid('wo'), title: 'DOT annual inspection — service truck', status: 'Done', priority: 'Normal', assetId: 'ast-servtruck', assigneeId: 'per-jo', type: 'Inspection', due: iso(-4), estHours: 1, description: 'Passed. Sticker in the cab, file updated.' },
    { id: uid('wo'), title: 'Generator fuel polishing', status: 'Done', priority: 'Low', assetId: 'ast-gen', assigneeId: 'per-miguel', type: 'Preventive', due: iso(-8), estHours: 2, description: 'Samples sent to lab — results clean.' },
  ];

  const schedule = [
    { id: uid('pm'), task: 'Excavator 250-hr service', assetId: 'ast-exc320', frequencyDays: 30, lastDone: iso(-33), assigneeId: 'per-miguel', priority: 'High', notes: 'Engine oil, samples, grease. Log meter hours.' },
    { id: uid('pm'), task: 'Grease pins & bushings (all units)', assetId: null, frequencyDays: 7, lastDone: iso(-2), assigneeId: 'per-riley', priority: 'Normal', notes: 'Dozer and loader first — heavy pins.' },
    { id: uid('pm'), task: 'DEF system & emissions check', assetId: 'ast-haul', frequencyDays: 30, lastDone: iso(-35), assigneeId: 'per-miguel', priority: 'High', notes: '' },
    { id: uid('pm'), task: 'Undercarriage wear measurement', assetId: 'ast-cmptrack', frequencyDays: 90, lastDone: iso(-85), assigneeId: 'per-riley', priority: 'Normal', notes: 'Photograph rollers and idlers.' },
    { id: uid('pm'), task: 'Backhoe service & bucket pins', assetId: 'ast-backhoe', frequencyDays: 30, lastDone: iso(-25), assigneeId: 'per-dana', priority: 'Normal', notes: '' },
    { id: uid('pm'), task: 'Hydraulic oil sample & analysis', assetId: 'ast-exc320', frequencyDays: 60, lastDone: iso(-10), assigneeId: 'per-sam', priority: 'Normal', notes: 'Send to lab, file results in the folder.' },
    { id: uid('pm'), task: 'Wheel loader 500-hr service', assetId: 'ast-loader', frequencyDays: 60, lastDone: iso(-18), assigneeId: 'per-miguel', priority: 'High', notes: 'Order filters two weeks ahead.' },
    { id: uid('pm'), task: 'Generator load bank test', assetId: 'ast-gen', frequencyDays: 90, lastDone: iso(-70), assigneeId: 'per-miguel', priority: 'Normal', notes: '30-minute full-load run.' },
    { id: uid('pm'), task: 'Skid steer hydraulic filter change', assetId: 'ast-skid', frequencyDays: 30, lastDone: iso(-6), assigneeId: 'per-riley', priority: 'Normal', notes: '' },
    { id: uid('pm'), task: 'Fleet DOT inspections', assetId: 'ast-servtruck', frequencyDays: 180, lastDone: iso(-90), assigneeId: 'per-jo', priority: 'Normal', notes: 'All titled units + trailers.' },
    { id: uid('pm'), task: 'Shop air compressor service', assetId: null, frequencyDays: 90, lastDone: iso(-45), assigneeId: 'per-sam', priority: 'Normal', notes: 'Shop compressor, not on the asset list.' },
  ];

  // Desired CURRENT on-hand values. Seeded invoice sales are added back on top
  // so posting those invoices lands exactly here.
  const partDefs = [
    { id: 'part-hose', name: 'Hydraulic Hose 3/4in x 48in', sku: 'HOSE-34-48', qty: 2, minQty: 8, unit: 'ea', location: 'Hyd rack', vendorId: 'ven-yellow', cost: 96, price: 145, category: 'Hydraulics', notes: 'Pre-made with JIC ends. Dozer boom set uses two.' },
    { id: 'part-tooth', name: 'Bucket Tooth — Cat 320 style', sku: 'TOOTH-320', qty: 12, minQty: 12, unit: 'ea', location: 'Wear parts', vendorId: 'ven-under', cost: 62, price: 98, category: 'G.E.T.', notes: 'Loader job received a dozen from Underfoot.' },
    { id: 'part-def', name: 'DEF — Diesel Exhaust Fluid (2.5 gal)', sku: 'DEF-25', qty: 4, minQty: 10, unit: 'ea', location: 'Fluid locker', vendorId: 'ven-fleetwest', cost: 14, price: 24, category: 'Fluids', notes: 'Haul truck drinks fast in summer.' },
    { id: 'part-retflt', name: 'Hydraulic Return Filter (Cat 320)', sku: 'FLT-RET-320', qty: 3, minQty: 3, unit: 'ea', location: 'Filter shelf', vendorId: 'ven-bigsky', cost: 52, price: 82, category: 'Filters', notes: '' },
    { id: 'part-bolts', name: 'Track Bolt Kit (T66)', sku: 'BOLT-T66', qty: 6, minQty: 5, unit: 'box', location: 'B12', vendorId: 'ven-under', cost: 110, price: 165, category: 'Undercarriage', notes: '' },
    { id: 'part-fuelflt', name: 'CAT 1R-0749 Fuel Filter', sku: 'FLT-1R0749', qty: 9, minQty: 6, unit: 'ea', location: 'Filter shelf', vendorId: 'ven-bigsky', cost: 28, price: 48, category: 'Filters', notes: 'Fits 320 and the 950M.' },
    { id: 'part-oil', name: '15W-40 Heavy Duty Engine Oil (5 gal)', sku: 'OIL-15W40-5', qty: 12, minQty: 6, unit: 'ea', location: 'Fluid locker', vendorId: 'ven-bigsky', cost: 78, price: 118, category: 'Fluids', notes: '' },
    { id: 'part-bat', name: 'Group 31 Battery', sku: 'BAT-G31', qty: 5, minQty: 4, unit: 'ea', location: 'Battery room', vendorId: 'ven-battery', cost: 189, price: 229, category: 'Electrical', notes: 'Keep one on the service truck.' },
    { id: 'part-grease', name: 'Grease — EP2 (14 oz tube)', sku: 'GREASE-EP2', qty: 30, minQty: 12, unit: 'ea', location: 'Fluid locker', vendorId: 'ven-bigsky', cost: 4.8, price: 6, category: 'Lubricants', notes: 'Weekly pin-greasing run.' },
    { id: 'part-starter', name: 'Starter — Deere 310L', sku: 'STR-310', qty: 2, minQty: 1, unit: 'ea', location: 'B21', vendorId: 'ven-battery', cost: 420, price: 560, category: 'Electrical', notes: '' },
    { id: 'part-belt', name: 'Serpentine Belt — F-550', sku: 'BLT-F550', qty: 4, minQty: 2, unit: 'ea', location: 'B14', vendorId: 'ven-fleetwest', cost: 38, price: 48, category: 'Belts', notes: '' },
    { id: 'part-dryer', name: 'Wheel Loader Air Dryer Cartridge', sku: 'DRY-950M', qty: 1, minQty: 2, unit: 'ea', location: 'Filter shelf', vendorId: 'ven-bigsky', cost: 145, price: 210, category: 'Filters', notes: '' },
  ];

  // ---- invoices (numbers fixed so the activity log and print view read well)
  const inv1Lines = [
    line('labor', { description: 'Grader hydraulic diagnosis & repair — unit 12', qty: 14, unitPrice: 110, taxable: false }),
    line('part', { partId: 'part-fuelflt', description: 'CAT 1R-0749 fuel filter (x4)', qty: 4, unitPrice: 48 }),
    line('item', { description: 'Shop supplies & disposal fees', qty: 1, unitPrice: 85 }),
  ];
  const inv2Lines = [
    line('part', { partId: 'part-hose', description: 'Hydraulic hose 3/4 × 48in (D6 boom set)', qty: 6, unitPrice: 145 }),
    line('labor', { description: 'Hose replacement & routing — D6 dozer', qty: 9, unitPrice: 110, taxable: false }),
    line('part', { partId: 'part-grease', description: 'EP2 grease (bulk pin service)', qty: 4, unitPrice: 6 }),
    line('item', { description: 'Freight — Yellow Iron expedited', qty: 1, unitPrice: 45 }),
  ];
  const inv3Lines = [
    line('part', { partId: 'part-bat', description: 'Group 31 battery', qty: 1, unitPrice: 229 }),
    line('part', { partId: 'part-belt', description: 'Serpentine belt — F-550', qty: 2, unitPrice: 48 }),
  ];
  const t = 6; // demo sales tax %
  const inv1 = docTotals(inv1Lines, t);
  const inv2 = docTotals(inv2Lines, t);
  const inv3 = docTotals(inv3Lines, t);

  const invoices = [
    { id: 'inv-seed-1', number: 'INV-1001', status: 'Sent', customerId: 'cus-helena', jobId: 'job-roads', date: iso(-25), dueDate: iso(5), lines: coerceLines(inv1Lines), subtotal: inv1.subtotal, taxAmount: inv1.taxAmount, total: inv1.total, paid: 0, taxRate: t, notes: 'County PO #HC-88213.' },
    { id: 'inv-seed-2', number: 'INV-1002', status: 'Sent', customerId: 'cus-bigsky', jobId: 'job-fleet', date: iso(-10), dueDate: iso(20), lines: coerceLines(inv2Lines), subtotal: inv2.subtotal, taxAmount: inv2.taxAmount, total: inv2.total, paid: 0, taxRate: t, notes: 'Fleet contract — monthly billing.' },
    { id: 'inv-seed-3', number: 'INV-1003', status: 'Sent', customerId: 'cus-bozeman', jobId: null, date: iso(-1), dueDate: iso(29), lines: coerceLines(inv3Lines), subtotal: inv3.subtotal, taxAmount: inv3.taxAmount, total: inv3.total, paid: 0, taxRate: t, notes: 'Counter sale — picked up.' },
  ];

  // ---- payments (catchUp derives invoice paid/status from these)
  const payments = [
    { id: 'pay-seed-1', invoiceId: 'inv-seed-1', date: iso(-20), amount: inv1.total, method: 'Check', reference: 'CH-1042', notes: 'County warrant.' },
    { id: 'pay-seed-2', invoiceId: 'inv-seed-2', date: iso(-3), amount: round2(1000), method: 'ACH', reference: 'ACH-77120', notes: 'Partial — balance on next draw.' },
  ];

  // ---- quotes
  const quo1Lines = [
    line('labor', { description: 'Kingpost rebuild — bushings, seals, shims', qty: 12, unitPrice: 110, taxable: false }),
    line('item', { description: 'Kingpost bushing kit (OEM)', qty: 1, unitPrice: 380 }),
  ];
  const quo1 = docTotals(quo1Lines, t);
  const quo2Lines = [
    line('item', { description: 'Grader blade set — 12ft carbide', qty: 2, unitPrice: 1450 }),
    line('labor', { description: 'Fit & align — per grader', qty: 6, unitPrice: 110, taxable: false }),
  ];
  const quo2 = docTotals(quo2Lines, t);
  const quotes = [
    { id: 'quo-seed-1', number: 'QUO-1001', status: 'Sent', customerId: 'cus-bigsky', jobId: 'job-fleet', date: iso(-4), validUntil: iso(26), lines: coerceLines(quo1Lines), subtotal: quo1.subtotal, taxAmount: quo1.taxAmount, total: quo1.total, taxRate: t, notes: 'Backhoe kingpost rebuild — as discussed on the site walk.' },
    { id: 'quo-seed-2', number: 'QUO-1002', status: 'Draft', customerId: 'cus-helena', jobId: 'job-roads', date: iso(-1), validUntil: '', lines: coerceLines(quo2Lines), subtotal: quo2.subtotal, taxAmount: quo2.taxAmount, total: quo2.total, taxRate: 0, notes: 'Waiting for the county PO number.' },
  ];

  // ---- purchasing
  const po2Lines = [
    { id: uid('ln'), kind: 'part', partId: 'part-tooth', description: 'Bucket tooth — 320 style', qty: 12, unitPrice: 62, taxable: true, receivedQty: 12 },
    { id: uid('ln'), kind: 'part', partId: 'part-bolts', description: 'Track bolt kit', qty: 1, unitPrice: 110, taxable: true, receivedQty: 1 },
  ];
  const po1Lines = [
    { id: uid('ln'), kind: 'part', partId: 'part-hose', description: 'Hydraulic hose 3/4 × 48in — boom set', qty: 6, unitPrice: 96, taxable: true, receivedQty: 0 },
  ];
  const po2Sub = round2(po2Lines.reduce((s, l) => s + l.qty * l.unitPrice, 0));
  const po1Sub = round2(po1Lines.reduce((s, l) => s + l.qty * l.unitPrice, 0));
  const purchaseorders = [
    { id: 'po-seed-1', number: 'PO-1001', status: 'Ordered', vendorId: 'ven-yellow', jobId: 'job-fleet', date: iso(-2), expectedDate: iso(2), lines: po1Lines, subtotal: po1Sub, total: po1Sub, receivedValue: 0, notes: 'Press before 3p for next-day. Needed for the D6 boom job.' },
    { id: 'po-seed-2', number: 'PO-1002', status: 'Received', vendorId: 'ven-under', jobId: 'job-fleet', date: iso(-9), expectedDate: iso(-2), lines: po2Lines, subtotal: po2Sub, total: po2Sub, receivedValue: po2Sub, notes: 'Received complete — wear photos filed.' },
  ];

  // Goods-receipt moves for the received PO (qty already reflected in parts).
  const stockmoves = [
    { id: uid('mv'), partId: 'part-tooth', date: iso(-9), qty: 12, unitCost: 62, reason: 'Purchase', refType: 'purchaseorder', refId: 'po-seed-2', notes: 'PO-1002', createdAt: new Date().toISOString() },
    { id: uid('mv'), partId: 'part-bolts', date: iso(-9), qty: 1, unitCost: 110, reason: 'Purchase', refType: 'purchaseorder', refId: 'po-seed-2', notes: 'PO-1002', createdAt: new Date().toISOString() },
  ];

  // ---- vendor bills
  const bil1Lines = coerceLines([
    line('part', { partId: 'part-tooth', description: 'Bucket tooth — 320 style', qty: 12, unitPrice: 62 }),
    line('part', { partId: 'part-bolts', description: 'Track bolt kit', qty: 1, unitPrice: 110 }),
  ]);
  const bil2Lines = coerceLines([
    line('part', { partId: 'part-def', description: 'DEF 2.5 gal (x4)', qty: 4, unitPrice: 14 }),
    line('part', { partId: 'part-oil', description: '15W-40 5gal (x4)', qty: 4, unitPrice: 78 }),
  ]);
  const bil1Sub = round2(bil1Lines.reduce((s, l) => s + l.qty * l.unitPrice, 0));
  const bil2Sub = round2(bil2Lines.reduce((s, l) => s + l.qty * l.unitPrice, 0));
  const bills = [
    { id: 'bil-seed-1', number: 'BIL-1001', status: 'Unpaid', vendorId: 'ven-under', poId: null, jobId: 'job-fleet', date: iso(-7), dueDate: iso(23), lines: bil1Lines, subtotal: bil1Sub, taxAmount: 0, total: bil1Sub, paid: 0, taxRate: 0, notes: 'Underfoot statement — wear parts for the fleet contract.' },
    { id: 'bil-seed-2', number: 'BIL-1002', status: 'Unpaid', vendorId: 'ven-fleetwest', poId: null, jobId: 'job-fleet', date: iso(-3), dueDate: iso(27), lines: bil2Lines, subtotal: bil2Sub, taxAmount: 0, total: bil2Sub, paid: 0, taxRate: 0, notes: 'Will-call — statement comes month-end.' },
  ];
  const vendorpayments = [
    { id: 'vpay-seed-1', billId: 'bil-seed-1', date: iso(-5), amount: bil1Sub, method: 'Check', reference: 'CH-2210', notes: 'Net-30 terms.' },
  ];

  // ---- time (labor cost = hours × person pay rate in the job report)
  const timeentries = [
    { id: uid('tim'), personId: 'per-dana', date: iso(-1), hours: 6, jobId: 'job-fleet', woId: null, billable: true, rate: null, notes: 'D6 boom hoses' },
    { id: uid('tim'), personId: 'per-sam', date: iso(-1), hours: 5, jobId: 'job-fleet', woId: null, billable: true, rate: null, notes: 'Press + install' },
    { id: uid('tim'), personId: 'per-kim', date: iso(-1), hours: 4, jobId: 'job-fleet', woId: null, billable: true, rate: null, notes: 'Boom weld' },
    { id: uid('tim'), personId: 'per-miguel', date: iso(-2), hours: 8, jobId: 'job-roads', woId: null, billable: true, rate: null, notes: 'Grader unit 12 hydraulics' },
    { id: uid('tim'), personId: 'per-dana', date: iso(-2), hours: 4, jobId: 'job-roads', woId: null, billable: true, rate: null, notes: '' },
    { id: uid('tim'), personId: 'per-miguel', date: iso(-26), hours: 10, jobId: 'job-roads', woId: null, billable: true, rate: null, notes: 'Grader diagnosis (invoiced on INV-1001)' },
    { id: uid('tim'), personId: 'per-riley', date: iso(-33), hours: 6, jobId: 'job-drain', woId: null, billable: false, rate: null, notes: 'Yard drainage — own cost, no billing' },
  ];

  // Parts: add the quantities sold on seeded invoices back so posting those
  // invoices lands exactly on the desired current stock.
  const sold = {};
  for (const inv of invoices) {
    for (const l of inv.lines) {
      if (l.kind === 'part' && l.partId) sold[l.partId] = (sold[l.partId] || 0) + (Number(l.qty) || 0);
    }
  }
  const parts = partDefs.map((p) => ({
    ...p,
    qty: round2((Number(p.qty) || 0) + (sold[p.id] || 0)),
    avgCost: p.cost,
  }));

  const resources = [
    { id: uid('res'), title: 'Cat 320 Service Manual', type: 'Manual', url: '\\\\FILESRV\\fleet\\manuals\\cat-320-gc.pdf', category: 'Manuals', owner: 'Maintenance', notes: 'Rev D — includes torque specs and test groups.' },
    { id: uid('res'), title: 'Fleet PM Checklists', type: 'Folder', url: '\\\\FILESRV\\fleet\\pm', category: 'Planning', owner: 'Planner', notes: 'Master 250/500-hr checklists by model.' },
    { id: uid('res'), title: 'DOT Annual Inspection Files', type: 'Document', url: '\\\\FILESRV\\fleet\\compliance\\dot-2026', category: 'Compliance', owner: 'Jo Ramirez', notes: 'Certificates and sticker records by unit.' },
    { id: uid('res'), title: 'Hydraulic Hose Pressing SOP', type: 'SOP', url: '\\\\FILESRV\\fleet\\sops\\hose-press.pdf', category: 'Safety', owner: 'Sam Chen', notes: 'Includes fitting torque chart.' },
    { id: uid('res'), title: 'Undercarriage Wear Photos', type: 'Folder', url: '\\\\FILESRV\\fleet\\undercarriage\\scans', category: 'Inspection', owner: 'Riley Novak', notes: 'Monthly wear measurements by unit.' },
    { id: uid('res'), title: 'Parts Suppliers Portal', type: 'Link', url: 'https://bigsky-parts.example/account', category: 'Procurement', owner: 'Purchasing', notes: 'Net-30 login required.' },
    { id: uid('res'), title: 'Operator Daily Inspection Sheets', type: 'Document', url: '\\\\FILESRV\\fleet\\daily-inspections', category: 'Field Ops', owner: 'Jo Ramirez', notes: 'Operators turn these in weekly.' },
    { id: uid('res'), title: 'Telehandler Load Chart Video', type: 'Video', url: '\\\\FILESRV\\fleet\\training\\jlg-1055.mp4', category: 'Training', owner: 'Safety Committee', notes: 'Show to new operators.' },
  ];

  // ---- opening books -------------------------------------------------------
  // The sample business starts with stock on the shelf; post an opening entry
  // (Inventory vs Opening Balance Equity) so the Inventory ledger account
  // always matches the stock valuation after the seeded sales post their COGS.
  const opening = {
    meta: { version: 2, seededAt: new Date().toISOString(), seq: { invoice: 3, quote: 2, po: 2, bill: 2 } },
    settings: {
      ...defaultSettings,
      defaultLaborRate: 110,
      defaultTaxRate: t,
      invoiceTermsDays: 30,
      bizPhone: '(406) 555-0122',
      bizEmail: 'service@mtfleet.example',
      bizAddress: '14 Railbed Rd, Bozeman, MT',
    },
    parts,
    invoices,
    ledger: [],
    accounts: [],
  };
  erp.ensureAccounts(opening);
  const currentStockValue = round2(parts.reduce((s, p) => s + (Number(p.qty) || 0) * (Number(p.avgCost) || Number(p.cost) || 0), 0));
  const seedCogs = round2(invoices.reduce((s, inv) => s + (inv.lines || []).filter((l) => l.kind === 'part').reduce((s2, l) => {
    const part = parts.find((p) => p.id === l.partId);
    return s2 + (Number(l.qty) || 0) * (Number(part?.avgCost) || Number(part?.cost) || 0);
  }, 0), 0));
  opening.ledger.unshift(erp.makeEntry(opening, {
    date: iso(-30),
    memo: 'Opening balances — stock on hand',
    refType: 'opening',
    refId: 'opening-inventory',
    lines: [
      { code: '1200', debit: round2(currentStockValue + seedCogs) },
      { code: '3000', credit: round2(currentStockValue + seedCogs) },
    ],
  }));

  return {
    meta: opening.meta,
    settings: opening.settings,
    // master data
    people,
    vendors,
    customers,
    jobs,
    assets,
    workorders,
    schedule,
    parts,
    resources,
    // money
    quotes,
    invoices,
    payments,
    purchaseorders,
    bills,
    vendorpayments,
    timeentries,
    // system
    stockmoves,
    ledger: opening.ledger,
    accounts: opening.accounts,
    activity: [
      { id: uid('act'), at: new Date().toISOString(), actor: 'system', text: 'Database seeded with Montana Fleet Solutions sample data' },
    ],
  };
}
