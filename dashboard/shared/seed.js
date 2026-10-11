// Sample shop data so the dashboard is useful the moment it starts.
// Relative dates are generated at seed time so the demo always looks current.
import { defaultSettings } from './schema.js';

function iso(offsetDays) {
  const d = new Date();
  d.setHours(12, 0, 0, 0);
  d.setDate(d.getDate() + offsetDays);
  return d.toISOString().slice(0, 10);
}

const uid = (p) => `${p}-${Math.random().toString(36).slice(2, 8)}`;

export function buildSeed() {
  const people = [
    { id: 'per-dana', name: 'Dana Whitfield', role: 'Lead Mechanic', shift: 'Day', status: 'Available', phone: 'ext. 204', email: 'dana@shop.local' },
    { id: 'per-miguel', name: 'Miguel Ortega', role: 'Millwright', shift: 'Day', status: 'On Job', phone: 'ext. 211', email: 'miguel@shop.local' },
    { id: 'per-sam', name: 'Sam Chen', role: 'Electrical Tech', shift: 'Swing', status: 'Available', phone: 'ext. 218', email: 'sam@shop.local' },
    { id: 'per-riley', name: 'Riley Novak', role: 'Apprentice', shift: 'Swing', status: 'Available', phone: 'ext. 220', email: 'riley@shop.local' },
    { id: 'per-jo', name: 'Jo Ramirez', role: 'Maintenance Planner', shift: 'Day', status: 'Available', phone: 'ext. 200', email: 'jo@shop.local' },
    { id: 'per-kim', name: 'Kim Patel', role: 'Night Watch', shift: 'Night', status: 'Off', phone: 'ext. 226', email: 'kim@shop.local' },
  ];

  const vendors = [
    { id: 'ven-motion', name: 'Motion Industrial Supply', category: 'Bearings, belts, seals', contact: 'R. Alvarez', phone: '555-0142', email: 'orders@motion.example', leadTimeDays: 2, notes: 'Net-30 account #MI-4471' },
    { id: 'ven-grainger', name: 'Grainger', category: 'General MRO', contact: 'Web order', phone: '555-0188', email: 'support@grainger.example', leadTimeDays: 1, notes: 'Will-call counter open 7a-5p' },
    { id: 'ven-lube', name: 'PetroLube Co.', category: 'Lubricants & coolant', contact: 'T. Brooks', phone: '555-0110', email: 'sales@petrolube.example', leadTimeDays: 5, notes: 'Bulk coolant delivery monthly' },
    { id: 'ven-tools', name: 'CutRight Tooling', category: 'Carbide & inserts', contact: 'L. Nguyen', phone: '555-0173', email: 'lnguyen@cutright.example', leadTimeDays: 7, notes: 'Regrind service available' },
    { id: 'ven-elec', name: 'Valley Electric Supply', category: 'Motors, contactors', contact: 'Front desk', phone: '555-0199', email: 'counter@valleyelec.example', leadTimeDays: 3, notes: '' },
  ];

  const assets = [
    { id: 'ast-lathe1', name: 'CNC Lathe #1', status: 'Running', category: 'CNC', criticality: 'High', location: 'Bay 1', manufacturer: 'Okuma', model: 'LB3000', serial: 'OK-LB-88231', installedOn: iso(-1460), notes: 'Primary production lathe. Dedicated to bearing housings.' },
    { id: 'ast-lathe2', name: 'CNC Lathe #2', status: 'Maintenance', category: 'CNC', criticality: 'High', location: 'Bay 2', manufacturer: 'Haas', model: 'ST-20', serial: 'HA-ST-55210', installedOn: iso(-900), notes: 'Spindle vibration flagged last week.' },
    { id: 'ast-mill1', name: 'Vertical Mill', status: 'Running', category: 'CNC', criticality: 'High', location: 'Bay 3', manufacturer: 'Haas', model: 'VF-4', serial: 'HA-VF-11930', installedOn: iso(-1100), notes: '' },
    { id: 'ast-forklift', name: 'Forklift #1', status: 'Running', category: 'Vehicle', criticality: 'Medium', location: 'Receiving dock', manufacturer: 'Toyota', model: '8FGCU25', serial: 'TOY-25001', installedOn: iso(-720), notes: 'LPG. Annual OSHA inspection due.' },
    { id: 'ast-compressor', name: 'Air Compressor', status: 'Running', category: 'Facility', criticality: 'High', location: 'Utility room', manufacturer: 'Atlas Copco', model: 'GA-30', serial: 'AC-GA-7740', installedOn: iso(-2000), notes: 'Feeds the whole shop. 3000 hr service interval.' },
    { id: 'ast-boiler', name: 'Process Boiler', status: 'Running', category: 'HVAC', criticality: 'High', location: 'Boiler room', manufacturer: 'Cleaver-Brooks', model: 'CB-50', serial: 'CB-50-0091', installedOn: iso(-3200), notes: 'State inspection certificate on wall.' },
    { id: 'ast-conveyor', name: 'Packaging Conveyor', status: 'Down', category: 'Facility', criticality: 'Medium', location: 'Shipping', manufacturer: 'Dorner', model: '3200', serial: 'DN-3200-114', installedOn: iso(-540), notes: 'Drive motor tripped breaker. Awaiting replacement.' },
    { id: 'ast-welder', name: 'MIG Welder', status: 'Running', category: 'Tooling', criticality: 'Low', location: 'Fab area', manufacturer: 'Miller', model: 'Millermatic 252', serial: 'MM-252-445', installedOn: iso(-400), notes: '' },
    { id: 'ast-panel', name: 'Main Electrical Panel', status: 'Running', category: 'Electrical', criticality: 'High', location: 'Utility room', manufacturer: 'Square D', model: 'NQ', serial: 'SQ-NQ-4100', installedOn: iso(-4000), notes: 'Thermal scan annually.' },
    { id: 'ast-forklift2', name: 'Scissor Lift', status: 'Running', category: 'Vehicle', criticality: 'Low', location: 'Fab area', manufacturer: 'Genie', model: 'GS-1930', serial: 'GN-1930-77', installedOn: iso(-600), notes: '' },
  ];

  const workorders = [
    { id: uid('wo'), title: 'Replace spindle bearings on Lathe #2', status: 'In Progress', priority: 'Urgent', assetId: 'ast-lathe2', assigneeId: 'per-dana', type: 'Corrective', due: iso(-1), estHours: 8, description: 'Vibration analysis confirms inner race defect. Bearings on order (SKU BR-6208).' },
    { id: uid('wo'), title: 'Conveyor drive motor replacement', status: 'Waiting Parts', priority: 'High', assetId: 'ast-conveyor', assigneeId: 'per-sam', type: 'Corrective', due: iso(1), estHours: 4, description: 'Motor shipped, ETA tomorrow. New VFD also needed.' },
    { id: uid('wo'), title: 'Quarterly air compressor service', status: 'Scheduled', priority: 'Normal', assetId: 'ast-compressor', assigneeId: 'per-miguel', type: 'Preventive', due: iso(2), estHours: 3, description: 'Oil, separator, filters, check discharge temp.' },
    { id: uid('wo'), title: 'Annual boiler inspection prep', status: 'Scheduled', priority: 'High', assetId: 'ast-boiler', assigneeId: 'per-jo', type: 'Inspection', due: iso(5), estHours: 2, description: 'Gather logs, verify relief valve tags before state inspector visit.' },
    { id: uid('wo'), title: 'Forklift annual load test', status: 'Backlog', priority: 'Normal', assetId: 'ast-forklift', assigneeId: 'per-kim', type: 'Inspection', due: iso(12), estHours: 1.5, description: 'Schedule with third-party inspector.' },
    { id: uid('wo'), title: 'Lubricate ways and ball screws', status: 'Backlog', priority: 'Low', assetId: 'ast-mill1', assigneeId: 'per-riley', type: 'Preventive', due: iso(7), estHours: 1, description: 'Way lube reservoir also low.' },
    { id: uid('wo'), title: 'Replace shop lighting fixtures (bay 1-3)', status: 'Backlog', priority: 'Normal', assetId: 'ast-panel', assigneeId: 'per-sam', type: 'Project', due: iso(20), estHours: 10, description: 'Convert to LED high-bays. Bulk order pending.' },
    { id: uid('wo'), title: 'Panel thermal scan', status: 'Done', priority: 'Normal', assetId: 'ast-panel', assigneeId: 'per-sam', type: 'Inspection', due: iso(-6), estHours: 1, description: 'No hotspots found. Photo report filed.' },
    { id: uid('wo'), title: 'Welder liner and tip replacement', status: 'Done', priority: 'Low', assetId: 'ast-welder', assigneeId: 'per-riley', type: 'Corrective', due: iso(-9), estHours: 0.5, description: '' },
    { id: uid('wo'), title: 'Guard rail repair near dock', status: 'In Progress', priority: 'High', assetId: null, assigneeId: 'per-miguel', type: 'Safety', due: iso(0), estHours: 3, description: 'Forklift clipped the guard rail. Fabricate new bracket.' },
    { id: uid('wo'), title: 'Coolant change - Lathe #1', status: 'Backlog', priority: 'Normal', assetId: 'ast-lathe1', assigneeId: 'per-dana', type: 'Preventive', due: iso(-3), estHours: 2, description: 'Sump cleaning overdue.' },
    { id: uid('wo'), title: 'Calibrate torque wrenches', status: 'Scheduled', priority: 'Normal', assetId: null, assigneeId: 'per-jo', type: 'Inspection', due: iso(9), estHours: 1, description: 'Send out for ISO calibration.' },
  ];

  const schedule = [
    { id: uid('pm'), task: 'Change way lube & check lube lines', assetId: 'ast-mill1', frequencyDays: 30, lastDone: iso(-36), assigneeId: 'per-riley', priority: 'Normal', notes: '' },
    { id: uid('pm'), task: 'Compressor oil & separator service', assetId: 'ast-compressor', frequencyDays: 90, lastDone: iso(-88), assigneeId: 'per-miguel', priority: 'High', notes: 'Also check drain valve.' },
    { id: uid('pm'), task: 'Boiler water chemistry test', assetId: 'ast-boiler', frequencyDays: 7, lastDone: iso(-2), assigneeId: 'per-kim', priority: 'High', notes: 'Log results in boiler binder.' },
    { id: uid('pm'), task: 'Forklift LPG hose & leak check', assetId: 'ast-forklift', frequencyDays: 60, lastDone: iso(-20), assigneeId: 'per-kim', priority: 'Normal', notes: '' },
    { id: uid('pm'), task: 'Grease conveyor bearings', assetId: 'ast-conveyor', frequencyDays: 30, lastDone: iso(-45), assigneeId: 'per-miguel', priority: 'Normal', notes: 'Do once motor replaced.' },
    { id: uid('pm'), task: 'Clean CNC chip conveyors', assetId: 'ast-lathe1', frequencyDays: 14, lastDone: iso(-12), assigneeId: 'per-dana', priority: 'Normal', notes: '' },
    { id: uid('pm'), task: 'HVAC filter replacement', assetId: 'ast-boiler', frequencyDays: 90, lastDone: iso(-70), assigneeId: 'per-jo', priority: 'Normal', notes: 'MERV 8, 4 filters.' },
    { id: uid('pm'), task: 'Thermal scan main panel', assetId: 'ast-panel', frequencyDays: 365, lastDone: iso(-140), assigneeId: 'per-sam', priority: 'High', notes: 'Hire licensed contractor.' },
    { id: uid('pm'), task: 'Scissor lift annual inspection', assetId: 'ast-forklift2', frequencyDays: 365, lastDone: iso(-300), assigneeId: 'per-jo', priority: 'Normal', notes: '' },
    { id: uid('pm'), task: 'Check fire extinguisher charges', assetId: null, frequencyDays: 30, lastDone: iso(-25), assigneeId: 'per-jo', priority: 'High', notes: 'All 14 stations.' },
  ];

  const parts = [
    { id: uid('part'), name: 'Bearing 6208-2RS', sku: 'BR-6208', qty: 2, minQty: 6, unit: 'ea', location: 'B12', vendorId: 'ven-motion', cost: 18.4, category: 'Bearings', notes: 'For Lathe #2 spindle job.' },
    { id: uid('part'), name: 'V-Belt A-Section 4L440', sku: 'BLT-4L440', qty: 11, minQty: 4, unit: 'ea', location: 'B14', vendorId: 'ven-motion', cost: 7.25, category: 'Belts', notes: '' },
    { id: uid('part'), name: 'TECO 2HP Conveyor Motor', sku: 'MTR-2HP-CV', qty: 0, minQty: 1, unit: 'ea', location: 'Floor', vendorId: 'ven-elec', cost: 320, category: 'Motors', notes: 'On order, ETA 1 day.' },
    { id: uid('part'), name: 'Way Lube ISO 68 (5 gal)', sku: 'LUB-ISO68', qty: 3, minQty: 2, unit: 'ea', location: 'Lub locker', vendorId: 'ven-lube', cost: 62, category: 'Lubricants', notes: '' },
    { id: uid('part'), name: 'Carbide Insert CNMG 432', sku: 'INS-CNMG432', qty: 40, minQty: 25, unit: 'ea', location: 'Drawer 3', vendorId: 'ven-tools', cost: 9.1, category: 'Tooling', notes: '' },
    { id: uid('part'), name: 'Compressor Air Filter', sku: 'FLT-AC-30', qty: 1, minQty: 3, unit: 'ea', location: 'B04', vendorId: 'ven-grainger', cost: 44.5, category: 'Filters', notes: '' },
    { id: uid('part'), name: 'Contactor 40A 3P', sku: 'CNT-40A', qty: 4, minQty: 2, unit: 'ea', location: 'B21', vendorId: 'ven-elec', cost: 78, category: 'Electrical', notes: '' },
    { id: uid('part'), name: 'Boiler Test Kit Reagent', sku: 'CHM-BLR-KIT', qty: 1, minQty: 2, unit: 'box', location: 'Lab shelf', vendorId: 'ven-grainger', cost: 130, category: 'Chemical', notes: '' },
    { id: uid('part'), name: 'MERV 8 Filter 20x25', sku: 'FLT-M8-2025', qty: 8, minQty: 6, unit: 'ea', location: 'Mezz', vendorId: 'ven-grainger', cost: 12, category: 'Filters', notes: '' },
    { id: uid('part'), name: 'MIG Contact Tips 0.035', sku: 'TIPS-035', qty: 25, minQty: 10, unit: 'ea', location: 'Drawer 7', vendorId: 'ven-grainger', cost: 1.6, category: 'Welding', notes: '' },
    { id: uid('part'), name: 'LPG Hose 1/4in', sku: 'HOSE-LPG-14', qty: 2, minQty: 1, unit: 'ft', location: 'B09', vendorId: 'ven-grainger', cost: 4.2, category: 'Hose', notes: '' },
    { id: uid('part'), name: 'Flood Coolant 5gal', sku: 'COOL-FLOOD5', qty: 4, minQty: 2, unit: 'ea', location: 'Lub locker', vendorId: 'ven-lube', cost: 88, category: 'Coolant', notes: '' },
  ];

  const resources = [
    { id: uid('res'), title: 'Lathe #2 Service Manual', type: 'Manual', url: '\\\\FILESRV\\shop\\manuals\\okuma-lb3000.pdf', category: 'CNC', owner: 'Maintenance', notes: 'Rev C, includes spindle torque specs.' },
    { id: uid('res'), title: 'Compressor Maintenance Log', type: 'Document', url: '\\\\FILESRV\\shop\\logs\\compressor-2026.xlsx', category: 'Facility', owner: 'Miguel', notes: 'Update after every service.' },
    { id: uid('res'), title: 'Lockout / Tagout Procedure', type: 'SOP', url: '\\\\FILESRV\\shop\\sops\\LOTO-001.pdf', category: 'Safety', owner: 'Safety Committee', notes: 'Required reading for all new hires.' },
    { id: uid('res'), title: 'Boiler Inspection Certificate', type: 'Document', url: '\\\\FILESRV\\shop\\compliance\\boiler-cert.pdf', category: 'Compliance', owner: 'Jo Ramirez', notes: 'Renews each year. Posted in boiler room.' },
    { id: uid('res'), title: 'Preventive Maintenance Calendar', type: 'Folder', url: '\\\\FILESRV\\shop\\pm', category: 'Planning', owner: 'Planner', notes: 'Master PM schedule and checklists.' },
    { id: uid('res'), title: 'Spare Parts Suppliers', type: 'Link', url: 'https://motion.example/account', category: 'Procurement', owner: 'Purchasing', notes: 'Net-30 login required.' },
    { id: uid('res'), title: 'Electrical Panel Thermal Reports', type: 'Folder', url: '\\\\FILESRV\\shop\\electrical\\scans', category: 'Electrical', owner: 'Sam Chen', notes: 'Annual IR scan images by year.' },
    { id: uid('res'), title: 'Forklift Safe Operation Video', type: 'Video', url: '\\\\FILESRV\\shop\\training\\forklift-safety.mp4', category: 'Training', owner: 'Safety Committee', notes: 'Show to new operators.' },
  ];

  return {
    meta: { version: 1, seededAt: new Date().toISOString() },
    settings: { ...defaultSettings },
    people,
    vendors,
    assets,
    workorders,
    schedule,
    parts,
    resources,
    activity: [
      { id: uid('act'), at: new Date().toISOString(), actor: 'system', text: `Database seeded with sample shop data` },
    ],
  };
}
