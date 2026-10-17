// Business profiles. One product, several "flavors": a profile decides which
// collections show up in the navigation / "New" menu / global search, and the
// default settings a new business starts with. The engine and data model are
// identical for every profile — this is configuration, not forks.
export const PROFILES = {
  general: {
    label: 'Everything (full works)',
    blurb: 'Jobs, work orders, service, purchasing and money — nothing hidden.',
    hide: [],
    defaults: {},
    kioskViews: 'overview,workorders,schedule,parts,assets,about',
  },
  shop: {
    label: 'Repair / equipment shop',
    blurb: 'Work orders, PM schedules, parts and assets up front. Jobs hidden — billing goes out per work order.',
    hide: ['jobs'],
    defaults: { defaultLaborRate: 95 },
    kioskViews: 'overview,workorders,schedule,parts,assets,about',
  },
  construction: {
    label: 'Construction & trades',
    blurb: 'Jobs and job costing front and center; quotes, progress billing and purchasing emphasized.',
    hide: [],
    defaults: { defaultLaborRate: 85 },
    kioskViews: 'overview,jobs,workorders,quotes,invoices,about',
  },
  retail: {
    label: 'Retail / counter shop',
    blurb: 'Inventory, sales and purchasing. The maintenance machinery is hidden.',
    hide: ['workorders', 'schedule', 'assets', 'jobs', 'timeentries'],
    defaults: { defaultTaxRate: 7 },
    kioskViews: 'overview,invoices,parts,about',
  },
};

export const PROFILE_KEYS = Object.keys(PROFILES);

export function profileOf(name) {
  return PROFILES[name] || PROFILES.general;
}

// The collections a profile HIDES (nav, "New" menu, global search). Callers
// combine this with the real collection list — profiles deliberately knows
// nothing about the schema, so there is no registration step to forget.
export function hiddenNames(profileName) {
  return new Set(profileOf(profileName).hide || []);
}
