// Textile Industry Web Application Core Logic

// === Global State Data ===
let inventory = [
  { id: 'inv-1', name: 'Organic Cotton Yarn (Ne 30/1)', sku: 'YRN-COT-ORG-30', category: 'yarn', quantity: 4500, unit: 'kg', reorderLevel: 1200, location: 'Warehouse A - Section 1', supplier: 'Nile Delta Fibers Co.', lastUpdated: '2026-06-10' },
  { id: 'inv-2', name: 'Mulberry Silk Yarn (20/22D)', sku: 'YRN-SLK-MUL-20', category: 'yarn', quantity: 350, unit: 'kg', reorderLevel: 500, location: 'Warehouse A - Cold Room', supplier: 'Huzhou Silk Trading Ltd.', lastUpdated: '2026-06-09' },
  { id: 'inv-3', name: 'Premium Flax Linen Fabric (240 GSM)', sku: 'FAB-LIN-FLX-240', category: 'fabric', quantity: 1800, unit: 'meters', reorderLevel: 600, location: 'Warehouse B - Roll Rack 3', supplier: 'Belgian Linen Weavers', lastUpdated: '2026-06-11' },
  { id: 'inv-4', name: 'Natural Indigo Dye Powder', sku: 'DYE-IND-NAT-99', category: 'dye', quantity: 120, unit: 'kg', reorderLevel: 250, location: 'Warehouse A - Chemical Safe 2', supplier: 'Gujarat EcoDyes Corp.', lastUpdated: '2026-06-08' },
  { id: 'inv-5', name: 'Recycled Polyester Fiber Roll', sku: 'FAB-PLY-REC-180', category: 'fabric', quantity: 3200, unit: 'meters', reorderLevel: 1000, location: 'Warehouse B - Roll Rack 7', supplier: 'RePet Solutions', lastUpdated: '2026-06-07' },
  { id: 'inv-6', name: 'Eco-Friendly Reactive Dye - Ocean Blue', sku: 'DYE-REA-BLU-10', category: 'dye', quantity: 80, unit: 'kg', reorderLevel: 100, location: 'Warehouse A - Chemical Safe 1', supplier: 'Gujarat EcoDyes Corp.', lastUpdated: '2026-06-10' },
  { id: 'inv-7', name: 'Natural Matte Horn Buttons (15mm)', sku: 'TRM-BTN-HRN-15', category: 'accessories', quantity: 15000, unit: 'pcs', reorderLevel: 5000, location: 'Warehouse B - Drawer Cabinet 12', supplier: 'Classic Trim Industries', lastUpdated: '2026-06-05' },
  { id: 'inv-8', name: 'YKK Brass Metal Zippers (20cm)', sku: 'TRM-ZIP-BRS-20', category: 'accessories', quantity: 850, unit: 'pcs', reorderLevel: 1000, location: 'Warehouse B - Drawer Cabinet 14', supplier: 'YKK Tokyo HQ', lastUpdated: '2026-06-11' }
];

let shipments = [
  {
    id: 'ship-1',
    trackingNumber: 'TX-902',
    name: 'Giza Organic Cotton shipment',
    origin: 'Alexandria, Egypt',
    destination: 'Milan, Italy',
    currentStage: 'Transit',
    status: 'delayed',
    progress: 45,
    eta: '2026-06-18',
    carrier: 'MedShipping Group',
    routeCoordinates: [
      { x: 220, y: 240 }, // Alexandria
      { x: 195, y: 220 }, // Mediterranean Sea
      { x: 165, y: 190 }, // Near Italy
      { x: 130, y: 135 }  // Milan
    ],
    logs: [
      { date: '2026-06-08 09:00', status: 'Departed Origin', location: 'Alexandria Port', description: 'Vessel MedCarrier-IV set sail carrying 50 bales of Giza Organic Cotton.' },
      { date: '2026-06-10 14:00', status: 'Vessel Slowdown', location: 'Mediterranean Sea', description: 'Vessel speed reduced to 8 knots due to localized storm and heavy swells.' },
      { date: '2026-06-11 10:00', status: 'Customs Pre-Check Alert', location: 'Transit', description: 'Customs electronic documentation pre-clearance initiated for arrival in Milan depot.' }
    ]
  },
  {
    id: 'ship-2',
    trackingNumber: 'TX-904',
    name: 'Mulberry Silk Weaves shipment',
    origin: 'Huzhou, China',
    destination: 'Los Angeles, USA',
    currentStage: 'Transit',
    status: 'on-time',
    progress: 70,
    eta: '2026-06-15',
    carrier: 'TransPacific Logistics',
    routeCoordinates: [
      { x: 500, y: 180 }, // Huzhou / Shanghai Port
      { x: 550, y: 160 }, // East China Sea
      { x: 600, y: 155 }, // Mid Pacific
      { x: 645, y: 165 }, // Near US Coast
      { x: 680, y: 180 }  // Los Angeles
    ],
    logs: [
      { date: '2026-06-01 07:00', status: 'Departed Origin', location: 'Shanghai Port', description: 'Container loaded onto PacificWings Cargo ship.' },
      { date: '2026-06-06 18:00', status: 'Mid-Ocean Transit', location: 'Pacific Ocean Coordinate 34N-162W', description: 'Vessel operating at standard cruising speed of 21 knots. Climatic conditions stable.' },
      { date: '2026-06-11 08:00', status: 'Nearing US Coast', location: 'Pacific Ocean', description: 'ETA confirmation sent. On schedule for docking on June 15.' }
    ]
  },
  {
    id: 'ship-3',
    trackingNumber: 'TX-908',
    name: 'Natural Indigo Dye Shipment',
    origin: 'Gujarat, India',
    destination: 'Hamburg, Germany',
    currentStage: 'Customs',
    status: 'critical',
    progress: 88,
    eta: '2026-06-14',
    carrier: 'EuroVessel Carriers',
    routeCoordinates: [
      { x: 380, y: 220 }, // Gujarat Port
      { x: 310, y: 250 }, // Indian Ocean / Arabian Sea Route
      { x: 220, y: 250 }, // Red Sea / Suez canal
      { x: 140, y: 220 }, // Gibraltar Strait
      { x: 75, y: 125 },  // English Channel
      { x: 100, y: 85 }   // Hamburg Port
    ],
    logs: [
      { date: '2026-05-20 11:00', status: 'Departed Origin', location: 'Mundra Port, Gujarat', description: 'Indigo dye containers loaded on container vessel EuroOcean.' },
      { date: '2026-06-02 15:00', status: 'Suez Transit', location: 'Suez Canal', description: 'Vessel transit completed on schedule.' },
      { date: '2026-06-09 10:00', status: 'Arrival at English Channel', location: 'North Sea', description: 'Ship arrived at local anchoring zone.' },
      { date: '2026-06-11 06:00', status: 'Port Congestion Alert', location: 'Hamburg Port', description: 'Docking delays encountered due to labor strike at Container Terminal Burchardkai. Docking delayed by 72 hours minimum. Cargo flagged as CRITICAL due to dye inventory shortage.' }
    ]
  },
  {
    id: 'ship-4',
    trackingNumber: 'TX-910',
    name: 'Premium Horn Buttons Shipment',
    origin: 'Tokyo, Japan',
    destination: 'Mumbai, India',
    currentStage: 'Delivered',
    status: 'on-time',
    progress: 100,
    eta: '2026-06-09',
    carrier: 'Nippon Cargo Lines',
    routeCoordinates: [
      { x: 535, y: 155 }, // Tokyo
      { x: 485, y: 215 }, // South China Sea
      { x: 430, y: 245 }, // Malacca Strait
      { x: 360, y: 235 }  // Mumbai
    ],
    logs: [
      { date: '2026-06-02 10:00', status: 'Departed Origin', location: 'Narita Terminal', description: 'Air cargo dispatched.' },
      { date: '2026-06-04 14:00', status: 'Arrived at Transit Hub', location: 'Singapore Changi Cargo Terminal', description: 'Dispatched to secondary connecting freight plane.' },
      { date: '2026-06-08 12:00', status: 'Customs Cleared', location: 'Mumbai Air Cargo Depot', description: 'Import duty verified, cargo cleared customs.' },
      { date: '2026-06-09 16:30', status: 'Delivered', location: 'Mumbai Factory Warehouse', description: 'Cargo received and checked into Inventory System. 15,000 horn buttons added.' }
    ]
  }
];

let plmProjects = [
  {
    id: 'plm-1',
    name: 'Summer Linen Blazer',
    code: 'PLM-SS26-BLZ01',
    category: 'Menswear / Tailored',
    stage: 'Prototyping',
    completionPercent: 50,
    leadDesigner: 'Sarah Jenkins',
    season: 'SS26 (Spring/Summer)',
    fabricSpecs: 'Premium Flax Linen (240 GSM) - SKU: FAB-LIN-FLX-240. Linen horn button configurations.',
    lastUpdated: '2026-06-10',
    timeline: [
      { stage: 'Concept', date: '2026-05-10', status: 'completed' },
      { stage: 'Tech Pack', date: '2026-05-24', status: 'completed' },
      { stage: 'Prototyping', date: '2026-06-05', status: 'active' },
      { stage: 'Bulk Production', date: 'Pending', status: 'pending' },
      { stage: 'Quality Control', date: 'Pending', status: 'pending' },
      { stage: 'Completed', date: 'Pending', status: 'pending' }
    ]
  },
  {
    id: 'plm-2',
    name: 'Recycled Denim Jacket',
    code: 'PLM-AW26-DNM02',
    category: 'Unisex / Outerwear',
    stage: 'Bulk Production',
    completionPercent: 75,
    leadDesigner: 'Marcus Vance',
    season: 'AW26 (Autumn/Winter)',
    fabricSpecs: 'Organic Cotton Weft Denim, Natural Indigo Dye (SKU: DYE-IND-NAT-99). Heavy duty copper rivets.',
    lastUpdated: '2026-06-11',
    timeline: [
      { stage: 'Concept', date: '2026-04-01', status: 'completed' },
      { stage: 'Tech Pack', date: '2026-04-15', status: 'completed' },
      { stage: 'Prototyping', date: '2026-05-02', status: 'completed' },
      { stage: 'Bulk Production', date: '2026-05-20', status: 'active' },
      { stage: 'Quality Control', date: 'Pending', status: 'pending' },
      { stage: 'Completed', date: 'Pending', status: 'pending' }
    ]
  },
  {
    id: 'plm-3',
    name: 'Organic Cotton Hoodie',
    code: 'PLM-SS26-HD04',
    category: 'Athleisure / Essentials',
    stage: 'Tech Pack',
    completionPercent: 25,
    leadDesigner: 'Elene Rostova',
    season: 'SS26 (Spring/Summer)',
    fabricSpecs: '100% GOTS Certified Organic Cotton Fleece (320 GSM). Organic Cotton Ribbing.',
    lastUpdated: '2026-06-08',
    timeline: [
      { stage: 'Concept', date: '2026-06-01', status: 'completed' },
      { stage: 'Tech Pack', date: '2026-06-08', status: 'active' },
      { stage: 'Prototyping', date: 'Pending', status: 'pending' },
      { stage: 'Bulk Production', date: 'Pending', status: 'pending' },
      { stage: 'Quality Control', date: 'Pending', status: 'pending' },
      { stage: 'Completed', date: 'Pending', status: 'pending' }
    ]
  },
  {
    id: 'plm-4',
    name: 'Premium Silk Slip Dress',
    code: 'PLM-SS26-DRS12',
    category: 'Womenswear / Evening',
    stage: 'Quality Control',
    completionPercent: 90,
    leadDesigner: 'Sarah Jenkins',
    season: 'SS26 (Spring/Summer)',
    fabricSpecs: 'Mulberry Silk Yarn weave (20/22D) - SKU: YRN-SLK-MUL-20. Charcoal sandwashed finish.',
    lastUpdated: '2026-06-11',
    timeline: [
      { stage: 'Concept', date: '2026-03-15', status: 'completed' },
      { stage: 'Tech Pack', date: '2026-04-01', status: 'completed' },
      { stage: 'Prototyping', date: '2026-04-20', status: 'completed' },
      { stage: 'Bulk Production', date: '2026-05-10', status: 'completed' },
      { stage: 'Quality Control', date: '2026-06-05', status: 'active' },
      { stage: 'Completed', date: 'Pending', status: 'pending' }
    ]
  }
];

let ragDocuments = [
  {
    id: 'doc-1',
    title: 'OEKO-TEX Standard 100 Compliance Directive',
    category: 'Compliance',
    lastUpdated: '2026-01-15',
    content: `OEKO-TEX® Standard 100 regulates hazardous chemicals in baby wear (Class I) and close-to-skin clothing (Class II).
1. Formaldehyde limits: Infant Class I limit is strictly 16 mg/kg (undetectable). Adult Class II limit is 75 mg/kg.
2. Heavy Metal limits: Lead (Pb) content must be below 90 mg/kg for all materials. Cadmium (Cd) must be below 40 mg/kg. Nickel release on metallic trims (like buttons and zippers) must not exceed 0.5 µg/cm²/week to prevent skin allergies.
3. pH value range: Must be within 4.0 to 7.5 to match natural human skin acidity. Polyester fibers require neutralization after high-temperature dyeing to fit this window.
4. Arylamines: Azo colorants releasing any of the 22 prohibited aromatic amines (e.g., benzidine, o-toluidine) must not exceed 20 mg/kg.`
  },
  {
    id: 'doc-2',
    title: 'Denim Indigo Dyeing SOP (Standard Operating Procedure)',
    category: 'Dyeing Recipe',
    lastUpdated: '2026-03-22',
    content: `Standard Operating Procedure for Continuous Indigo Dyeing of Warp Yarn for Denim Production:
1. Dye Bath Formulation: Indigo pigment concentration should be maintained at 2.5 g/L to 3.5 g/L. Sodium hydrosulfite (reducing agent) must be kept at 2.5 - 3.0 g/L. Sodium hydroxide (alkali) dosage must be regulated to maintain pH between 11.5 and 12.0.
2. Operating Parameters:
- Dye bath temperature: 28°C to 32°C. High temperature degrades hydrosulfite, causing poor dye reduction.
- Dipping time: 20 seconds per box (6-8 dye boxes configuration).
- Airing (oxidation) time: 60 seconds between boxes to allow oxygen to lock indigo into yarn core.
3. Troubleshooting: If color shade is too light (low intensity), check pH (pH < 11 causes poor solubility; pH > 12.5 causes excessive fiber swelling and poor dye exhaustion). Ensure hydrosulfite concentration does not drop below 2.0 g/L.`
  },
  {
    id: 'doc-3',
    title: 'Global Organic Textile Standard (GOTS) v7.0 Requirements',
    category: 'Compliance',
    lastUpdated: '2025-11-10',
    content: `The Global Organic Textile Standard (GOTS) outlines environmental and social criteria for organic fiber processing:
1. Fiber Composition:
- Products labeled "Organic" must contain at least 95% certified organic fibers.
- Products labeled "Made with Organic" must contain at least 70% certified organic fibers.
2. Prohibited Inputs: All chemical inputs (dyes, auxilaries, sizing agents) must be biodegradable and toxicologically safe. Formaldehyde, toxic heavy metals, GMO enzymes, and chlorinated solvents are completely banned.
3. Water Treatment: Wastewater from wet-processing units must be treated in an effluent treatment plant (ETP) before discharge. ETP pH must remain between 6.0 and 9.0, and chemical oxygen demand (COD) must be below 20 mg/L.`
  },
  {
    id: 'doc-4',
    title: 'Supercritical CO2 Waterless Dyeing Protocol',
    category: 'Manual',
    lastUpdated: '2026-02-18',
    content: `Waterless Dyeing Protocol using Supercritical Carbon Dioxide (scCO2) for Synthetic Fabrics:
1. Process Description: Liquid carbon dioxide is compressed beyond its critical point (73.8 bar, 31.1°C) to become supercritical. It is used as the solvent for disperse dyes, eliminating the need for process water and drying stages.
2. System Parameters:
- Operating temperature: 120°C for polyester, 110°C for nylon.
- Operating pressure: 250 bar to 280 bar to optimize dye solubility.
- Dyeing cycle time: 60 to 80 minutes.
3. Advantages: 95% dye exhaustion efficiency, no wastewater generation, and energy savings of up to 50% due to the elimination of the fabric drying process.`
  },
  {
    id: 'doc-5',
    title: 'Natural Linen Fiber Technical Specification',
    category: 'Standard',
    lastUpdated: '2025-08-05',
    content: `Technical Specifications for Linen (Flax) Fiber selection and processing:
1. Moisture Regain: Standard moisture regain of linen is 12%. Dry storage is critical; damp storage leads to mildew and severe loss of tensile strength.
2. Tensile Strength: Dry fiber strength ranges from 5.5 to 6.5 g/denier. Wet strength increases by approximately 20%, which is unique compared to synthetic fibers.
3. Grading standards: Fiber length must exceed 45cm for long flax spinning (used in premium suiting, warp yarns). Shorter fibers (tow) are allocated for weft-only coarse yarns.`
  }
];

let chatHistory = [
  {
    id: 'chat-1',
    role: 'assistant',
    text: "Hello! I am your Antigravity Textile AI Assistant. I have real-time access to your inventory, PLM pipeline, ocean shipments, and technical compliance manuals. How can I help you optimize your production today?",
    timestamp: '21:20'
  }
];

let activeTab = 'dashboard';
let activeShipmentId = 'ship-1';
let inventoryFilter = 'all';

// === KPI Trend Data ===
const kpiTrends = {
  production: { values: [820, 875, 910, 890, 940, 1020], unit: 'units' },
  inventory:  { values: [4.2, 4.0, 3.8, 3.5, 3.9, 3.6], unit: 'turns' },
  otd:        { values: [82, 85, 80, 87, 88, 91], unit: '%' },
  defect:     { values: [2.1, 1.8, 2.0, 1.6, 1.9, 2.2], unit: '%' }
};

// === Meetings Data ===
let meetings = [
  { id: 'mtg-1', title: 'Q2 Production Review', datetime: '2026-06-25T10:00', location: 'Conference Room A', agenda: 'Review production output, address denim dye shortage', attendees: ['Pravan M.', 'Sarah J.', 'Marcus V.', 'Elene R.'], attendance: { 'Pravan M.': true, 'Sarah J.': true, 'Marcus V.': false, 'Elene R.': true }, status: 'upcoming', actionItems: [ { id: 'ai-1', text: 'Expedite indigo dye reorder', assignee: 'Marcus V.', due: '2026-06-28', done: false }, { id: 'ai-2', text: 'Update bulk production timeline', assignee: 'Sarah J.', due: '2026-06-27', done: true } ] },
  { id: 'mtg-2', title: 'Supplier Audit — Gujarat EcoDyes', datetime: '2026-06-20T14:00', location: 'Virtual / Teams', agenda: 'Review GOTS compliance, COD and pH levels at ETP', attendees: ['Pravan M.', 'Marcus V.'], attendance: { 'Pravan M.': true, 'Marcus V.': true }, status: 'completed', actionItems: [ { id: 'ai-3', text: 'Request ETP discharge records for May', assignee: 'Pravan M.', due: '2026-06-22', done: true }, { id: 'ai-4', text: 'Issue non-conformance notice if COD > 20mg/L', assignee: 'Pravan M.', due: '2026-06-24', done: false } ] },
  { id: 'mtg-3', title: 'Safety Induction — New Floor Staff', datetime: '2026-06-30T09:00', location: 'Dyeing Floor Hall', agenda: 'Chemical handling, PPE requirements, emergency protocols', attendees: ['Pravan M.', 'Elene R.', 'Floor Staff (12)'], attendance: {}, status: 'upcoming', actionItems: [] }
];

// === Compliance Data ===
let complianceIssues = [
  { id: 'ci-1', title: 'Indigo dye bath pH > 12.5 — Dyeing Unit 3', category: 'Chemical', risk: 'critical', due: '2026-06-20', owner: 'Marcus V.', desc: 'pH readings consistently above 12.5 causing excess fiber swelling and dye loss.', status: 'open', escalated: true, createdDate: '2026-06-10' },
  { id: 'ci-2', title: 'ETP COD Discharge — above 20 mg/L', category: 'Environmental', risk: 'high', due: '2026-06-18', owner: 'Environmental Dept.', desc: 'Wastewater COD measured at 28 mg/L, exceeding GOTS v7.0 limit of 20 mg/L.', status: 'open', escalated: false, createdDate: '2026-06-11' },
  { id: 'ci-3', title: 'Missing PPE documentation — Floor Team B', category: 'Labor', risk: 'medium', due: '2026-06-30', owner: 'HR Dept.', desc: 'Personal protective equipment training records missing for 6 floor staff.', status: 'open', escalated: false, createdDate: '2026-06-08' },
  { id: 'ci-4', title: 'Nickel release on trim buttons > 0.5 µg/cm²/wk', category: 'Quality', risk: 'high', due: '2026-06-15', owner: 'QA Lab', desc: 'Tested batch of horn buttons shows nickel release at 0.8 µg/cm²/week, exceeding OEKO-TEX limit.', status: 'open', escalated: true, createdDate: '2026-06-05' },
  { id: 'ci-5', title: 'Fire exit blocked — Warehouse B aisle 7', category: 'Fire', risk: 'critical', due: '2026-06-12', owner: 'Facilities', desc: 'Yarn trolley stacked blocking emergency fire exit path. Immediate clearance required.', status: 'resolved', escalated: false, createdDate: '2026-06-04' },
  { id: 'ci-6', title: 'Outdated SOP manuals — Waterless dyeing unit', category: 'Data', risk: 'low', due: '2026-07-05', owner: 'Documentation Team', desc: 'CO2 dyeing SOP revision v3.1 not distributed to floor operators.', status: 'open', escalated: false, createdDate: '2026-06-12' }
];

// === Complaints Data ===
let complaints = [
  { id: 'cp-1', title: 'Silk fabric rolls delivered with water stains', category: 'Quality', severity: 'high', reporter: 'QA Lab', cause: 'Improper waterproofing during transit', desc: 'Batch YRN-SLK-MUL-20 received with moisture damage on 12% of rolls.', status: 'open', date: '2026-06-10', occurrences: 3 },
  { id: 'cp-2', title: 'Denim jacket shipment delayed 8 days past ETA', category: 'Delivery', severity: 'high', reporter: 'Logistics Team', cause: 'Port congestion — Hamburg strike', desc: 'PLM-AW26-DNM02 bulk production delayed due to TX-908 port hold.', status: 'open', date: '2026-06-11', occurrences: 1 },
  { id: 'cp-3', title: 'Reactive dye bleeding on 40°C wash test', category: 'Quality', severity: 'critical', reporter: 'QA Lab', cause: 'Insufficient fixation time during dyeing', desc: 'Ocean Blue reactive dye shows color bleeding after standard wash. OEKO-TEX non-compliant.', status: 'investigating', date: '2026-06-08', occurrences: 2 },
  { id: 'cp-4', title: 'Zipper teeth breaking on YKK batch #B2209', category: 'Equipment', severity: 'medium', reporter: 'Production Floor', cause: 'Substandard alloy in zipper tooth casting', desc: 'YKK zippers from batch B2209 failing at <5 cycle stress test. Affects 200 units.', status: 'resolved', date: '2026-06-05', occurrences: 1 },
  { id: 'cp-5', title: 'Late PO confirmations from Classic Trim Industries', category: 'Supplier', severity: 'medium', reporter: 'Procurement', cause: 'Communication gap — no acknowledgement protocol', desc: 'POs sent but no confirmation received within 72h SLA repeatedly.', status: 'open', date: '2026-06-09', occurrences: 4 },
  { id: 'cp-6', title: 'Cotton yarn tension inconsistency — loom machine C3', category: 'Process', severity: 'high', reporter: 'Weaving Floor', cause: 'Machine calibration drift', desc: 'Ne 30/1 cotton showing ±15% tension variance. Machine C3 last calibrated 6 months ago.', status: 'open', date: '2026-06-12', occurrences: 2 }
];

// === DOM Nodes ===
const navItems = document.querySelectorAll('.menu-item');
const viewPanels = document.querySelectorAll('.view-panel');
const modalOverlay = document.getElementById('inventory-modal');

// === Initialization ===
document.addEventListener('DOMContentLoaded', () => {
  setupNavigation();
  setupInventoryEvents();
  setupRAGEvents();
  setupLogisticsEvents();
  setupAIEvents();
  initNotifications();
  
  // Initial draw
  renderCurrentView();
});

// === Navigation Handler ===
function setupNavigation() {
  navItems.forEach(item => {
    item.addEventListener('click', () => {
      const tabName = item.getAttribute('data-tab');
      activeTab = tabName;
      
      navItems.forEach(n => n.classList.remove('active'));
      item.classList.add('active');
      
      viewPanels.forEach(p => p.classList.remove('active'));
      const activePanel = document.getElementById(`${tabName}-view`);
      if (activePanel) activePanel.classList.add('active');
      
      renderCurrentView();
    });
  });
}

function renderCurrentView() {
  // Update header text
  const headerTitle = document.getElementById('current-header-title');
  if (headerTitle) {
    headerTitle.textContent = activeTab.charAt(0).toUpperCase() + activeTab.slice(1) + ' Control Center';
  }
  
  if (activeTab === 'dashboard') {
    renderDashboardView();
  } else if (activeTab === 'plm') {
    renderPLMView();
  } else if (activeTab === 'inventory') {
    renderInventoryView();
  } else if (activeTab === 'logistics') {
    renderLogisticsView();
  } else if (activeTab === 'ai') {
    renderAIView();
  } else if (activeTab === 'hr') {
    renderHRView();
  } else if (activeTab === 'announcements') {
    renderAnnouncementsView();
  } else if (activeTab === 'kaizen') {
    renderKaizenView();
  } else if (activeTab === 'meetings') {
    renderMeetingsView();
  } else if (activeTab === 'compliance') {
    renderComplianceView();
  } else if (activeTab === 'complaints') {
    renderComplaintsView();
  }
}

// === Dashboard Controller ===
function renderDashboardView() {
  // 1. Calculate stats
  const totalSku = inventory.length;
  const lowStockCount = inventory.filter(item => item.quantity <= item.reorderLevel).length;
  const activePlmCount = plmProjects.filter(p => p.stage !== 'Completed').length;
  const transitShipments = shipments.filter(s => s.currentStage !== 'Delivered').length;
  const criticalShipments = shipments.filter(s => s.status === 'critical').length;
  
  // 2. Render Stat Cards
  const statsGrid = document.querySelector('#dashboard-view .grid-3');
  if (statsGrid) {
    statsGrid.innerHTML = `
      <div class="card stat-card plm">
        <div class="stat-header">
          <span>Active Projects</span>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/></svg>
        </div>
        <div class="stat-value">${activePlmCount}</div>
        <div class="stat-desc">Ongoing PLM design cycles</div>
      </div>
      
      <div class="card stat-card inventory">
        <div class="stat-header">
          <span>Low Stock Materials</span>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>
        </div>
        <div class="stat-value ${lowStockCount > 0 ? 'text-warning' : ''}">${lowStockCount}</div>
        <div class="stat-desc">Below safety thresholds</div>
      </div>
      
      <div class="card stat-card logistics">
        <div class="stat-header">
          <span>Cargo Shipments</span>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="2" y="3" width="20" height="14" rx="2" ry="2"/><line x1="2" y1="10" x2="22" y2="10"/><path d="M12 2v20"/><path d="m17 5-5-5-5 5"/></svg>
        </div>
        <div class="stat-value">${transitShipments} <span style="font-size: 14px; font-weight: normal; color: var(--text-muted)">In Transit</span></div>
        <div class="stat-desc">${criticalShipments} shipments flagged critical</div>
      </div>
    `;
  }
  
  // 3. Render Alerts Panel
  const alertsContainer = document.getElementById('dashboard-alerts-container');
  if (alertsContainer) {
    let html = '';
    
    // Low Stock Alerts
    inventory.forEach(item => {
      if (item.quantity <= item.reorderLevel) {
        html += `
          <div class="alert-item warning">
            <div class="alert-icon warning">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>
            </div>
            <div class="alert-body">
              <h4>Low Stock Alert: ${item.name}</h4>
              <p>Current stock is <strong>${item.quantity} ${item.unit}</strong> (Reorder level: ${item.reorderLevel} ${item.unit}). Located in ${item.location}.</p>
              <button class="btn btn-sm btn-primary" onclick="reorderMaterial('${item.id}')">Order Restock</button>
            </div>
          </div>
        `;
      }
    });
    
    // Critical Shipments Alerts
    shipments.forEach(s => {
      if (s.status === 'critical' || s.status === 'delayed') {
        const statusClass = s.status === 'critical' ? 'critical' : 'warning';
        html += `
          <div class="alert-item ${statusClass}">
            <div class="alert-icon ${statusClass}">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
            </div>
            <div class="alert-body">
              <h4>Logistics Alert: ${s.name} (${s.trackingNumber})</h4>
              <p>Status: <strong style="text-transform: uppercase; color: ${s.status === 'critical' ? 'var(--status-danger)' : 'var(--status-warning)'}">${s.status}</strong>. ${s.logs[s.logs.length - 1].description}</p>
              <button class="btn btn-sm" onclick="navigateToTab('logistics', '${s.id}')">View shipment details</button>
            </div>
          </div>
        `;
      }
    });
    
    if (!html) {
      html = '<div style="color: var(--text-muted); font-size: 13px; text-align: center; padding: 24px;">All systems operational. No warnings detected.</div>';
    }
    
    alertsContainer.innerHTML = html;
  }
  
  // 4. Render Dashboard Summary Map & Summary Projects List
  renderDashboardSummary();

  // 5. KPI Sparklines
  renderKPISparklines();

  // 6. Department Analytics
  renderDeptAnalytics();

  // 7. Actionable Insights
  renderActionableInsights();
}

function renderKPISparklines() {
  const configs = [
    { id: 'kpi-prod-sparkline', data: kpiTrends.production.values, color: '#10b981', fill: 'rgba(16,185,129,0.15)' },
    { id: 'kpi-inv-sparkline',  data: kpiTrends.inventory.values,  color: '#f59e0b', fill: 'rgba(245,158,11,0.15)' },
    { id: 'kpi-otd-sparkline',  data: kpiTrends.otd.values,        color: '#6366f1', fill: 'rgba(99,102,241,0.15)' },
    { id: 'kpi-defect-sparkline', data: kpiTrends.defect.values,   color: '#ef4444', fill: 'rgba(239,68,68,0.15)' }
  ];
  configs.forEach(cfg => {
    const el = document.getElementById(cfg.id);
    if (!el) return;
    const W = 200, H = 60, pad = 6;
    const vals = cfg.data;
    const mn = Math.min(...vals), mx = Math.max(...vals);
    const scaleX = i => pad + (i / (vals.length - 1)) * (W - pad * 2);
    const scaleY = v => H - pad - ((v - mn) / (mx - mn || 1)) * (H - pad * 2);
    const pts = vals.map((v, i) => `${scaleX(i)},${scaleY(v)}`).join(' ');
    const areaPath = `M${scaleX(0)},${H} ` + vals.map((v, i) => `L${scaleX(i)},${scaleY(v)}`).join(' ') + ` L${scaleX(vals.length-1)},${H} Z`;
    el.innerHTML = `<svg viewBox="0 0 ${W} ${H}" width="100%" height="52">
      <defs><linearGradient id="sg${cfg.id}" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stop-color="${cfg.color}" stop-opacity="0.4"/><stop offset="100%" stop-color="${cfg.color}" stop-opacity="0"/></linearGradient></defs>
      <path d="${areaPath}" fill="url(#sg${cfg.id})"/>
      <polyline points="${pts}" fill="none" stroke="${cfg.color}" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>
      ${vals.map((v, i) => `<circle cx="${scaleX(i)}" cy="${scaleY(v)}" r="3" fill="${cfg.color}"/>`).join('')}
      ${vals.map((v, i) => `<text x="${scaleX(i)}" y="${scaleY(v) - 7}" text-anchor="middle" font-size="9" fill="rgba(255,255,255,0.55)">${v}</text>`).join('')}
    </svg>`;
  });
}

function renderDeptAnalytics() {
  const el = document.getElementById('dept-analytics-chart');
  if (!el) return;
  const depts = [
    { name: 'Dyeing',     current: 78, prev: 72 },
    { name: 'Weaving',    current: 85, prev: 88 },
    { name: 'QA Lab',     current: 91, prev: 89 },
    { name: 'Logistics',  current: 67, prev: 74 },
    { name: 'Packaging',  current: 82, prev: 79 },
  ];
  const W = 400, barH = 28, gap = 14, padL = 80, padR = 40;
  const H = depts.length * (barH + gap) + 20;
  let rows = '';
  depts.forEach((d, i) => {
    const y = 10 + i * (barH + gap);
    const cW = (d.current / 100) * (W - padL - padR);
    const pW = (d.prev / 100) * (W - padL - padR);
    const delta = d.current - d.prev;
    const col = delta >= 0 ? '#10b981' : '#ef4444';
    rows += `
      <g>
        <text x="${padL - 8}" y="${y + barH/2 + 4}" text-anchor="end" font-size="11" fill="rgba(255,255,255,0.55)">${d.name}</text>
        <rect x="${padL}" y="${y}" width="${pW}" height="${barH}" rx="4" fill="rgba(255,255,255,0.06)"/>
        <rect x="${padL}" y="${y+4}" width="${cW}" height="${barH - 8}" rx="3" fill="${col}" opacity="0.85"/>
        <text x="${padL + cW + 6}" y="${y + barH/2 + 4}" font-size="10" fill="${col}" font-weight="700">${d.current}% <tspan fill="rgba(255,255,255,0.35)" font-weight="400">(${delta >= 0 ? '+' : ''}${delta}%)</tspan></text>
      </g>`;
  });
  el.innerHTML = `<svg viewBox="0 0 ${W} ${H}" width="100%">
    <text x="${padL}" y="8" font-size="9" fill="rgba(255,255,255,0.25)">0%    25%    50%    75%    100%</text>
    ${rows}
  </svg>`;
}

function renderActionableInsights() {
  const el = document.getElementById('dashboard-insights-container');
  if (!el) return;
  const insights = [];

  // Inventory risk
  const lowStock = inventory.filter(i => i.quantity <= i.reorderLevel);
  if (lowStock.length > 0) {
    insights.push({ icon: '🔴', type: 'risk', title: `${lowStock.length} Materials Below Safety Stock`, body: `${lowStock.map(i=>i.name.split(' ').slice(0,2).join(' ')).join(', ')} need immediate reorder.`, action: 'Go to Inventory', tab: 'inventory' });
  }

  // Critical shipments
  const criticalShips = shipments.filter(s => s.status === 'critical');
  if (criticalShips.length > 0) {
    insights.push({ icon: '🚨', type: 'critical', title: `Critical Shipment Delay — ${criticalShips[0].trackingNumber}`, body: `${criticalShips[0].name} is blocked at ${criticalShips[0].currentStage}. Consider air freight reroute.`, action: 'View Logistics', tab: 'logistics' });
  }

  // Compliance issues
  const openCritComp = complianceIssues.filter(c => c.risk === 'critical' && c.status !== 'resolved');
  if (openCritComp.length > 0) {
    insights.push({ icon: '⚠️', type: 'warning', title: `${openCritComp.length} Critical Compliance Issues Unresolved`, body: openCritComp[0].title + ' — immediate action required.', action: 'View Compliance', tab: 'compliance' });
  }

  // Recurring complaints
  const recurring = complaints.filter(c => c.occurrences >= 2 && c.status !== 'resolved');
  if (recurring.length > 0) {
    insights.push({ icon: '🔁', type: 'warning', title: `${recurring.length} Recurring Complaints Detected`, body: `${recurring[0].title} has occurred ${recurring[0].occurrences}x. Root cause analysis recommended.`, action: 'View Complaints', tab: 'complaints' });
  }

  // Positive trend
  const otdVals = kpiTrends.otd.values;
  if (otdVals[otdVals.length-1] > otdVals[otdVals.length-2]) {
    insights.push({ icon: '✅', type: 'positive', title: 'On-Time Delivery Trending Up', body: `OTD improved from ${otdVals[otdVals.length-2]}% to ${otdVals[otdVals.length-1]}% this month. Logistics optimization is working.`, action: null });
  }

  // Pending meeting actions
  const pendingActions = meetings.flatMap(m => m.actionItems.filter(a => !a.done));
  if (pendingActions.length > 0) {
    insights.push({ icon: '📋', type: 'info', title: `${pendingActions.length} Pending Meeting Action Items`, body: `Oldest: "${pendingActions[0].text}" assigned to ${pendingActions[0].assignee}.`, action: 'View Meetings', tab: 'meetings' });
  }

  const colors = { risk: '#ef4444', critical: '#ef4444', warning: '#f59e0b', positive: '#10b981', info: '#6366f1' };
  el.innerHTML = insights.map(ins => `
    <div class="insight-card" style="border-left-color:${colors[ins.type]};">
      <div class="insight-header">
        <span class="insight-icon">${ins.icon}</span>
        <strong class="insight-title">${ins.title}</strong>
      </div>
      <p class="insight-body">${ins.body}</p>
      ${ins.action ? `<button class="btn btn-sm insight-action-btn" onclick="navigateToTab('${ins.tab}')" style="border-color:${colors[ins.type]};color:${colors[ins.type]};margin-top:6px;">${ins.action} →</button>` : ''}
    </div>
  `).join('');
}

function renderDashboardSummary() {
  const summaryProjects = document.getElementById('dashboard-summary-projects');
  if (summaryProjects) {
    summaryProjects.innerHTML = plmProjects.map(p => `
      <div style="display: flex; justify-content: space-between; align-items: center; padding: 12px; border-bottom: 1px solid var(--border-color)">
        <div>
          <h4 style="font-size: 13px">${p.name}</h4>
          <span style="font-size: 10px; color: var(--accent-plm)">${p.code} • ${p.stage}</span>
        </div>
        <div style="font-size: 12px; font-weight: 700; color: var(--text-muted)">${p.completionPercent}%</div>
      </div>
    `).join('');
  }
}

// Global actions helper
window.navigateToTab = function(tabName, id) {
  const item = document.querySelector(`.menu-item[data-tab="${tabName}"]`);
  if (item) {
    if (tabName === 'logistics' && id) {
      activeShipmentId = id;
    }
    item.click();
  }
};

window.reorderMaterial = function(id) {
  const item = inventory.find(i => i.id === id);
  if (item) {
    // Increase quantity simulated
    item.quantity += Math.ceil(item.reorderLevel * 1.5);
    item.lastUpdated = new Date().toISOString().split('T')[0];
    alert(`Restock order placed for ${item.name}! Added simulated stock.`);
    renderCurrentView();
  }
};

// === PLM & RAG Controller ===
function renderPLMView() {
  // Render Projects
  const plmList = document.getElementById('plm-projects-list');
  if (plmList) {
    plmList.innerHTML = plmProjects.map(p => {
      const activeStageIndex = p.timeline.findIndex(t => t.stage === p.stage);
      
      const timelineNodesHtml = p.timeline.map((t, idx) => {
        let statusClass = '';
        if (t.status === 'completed') statusClass = 'completed';
        else if (t.status === 'active') statusClass = 'active';
        
        return `<div class="plm-stage-node ${statusClass}" data-stage-name="${t.stage}" onclick="updateProjectStage('${p.id}', '${t.stage}')"></div>`;
      }).join('');
      
      return `
        <div class="card plm-project-card">
          <div class="project-meta">
            <span>${p.category}</span>
            <span>${p.season}</span>
          </div>
          <h3 style="margin-bottom: 4px">${p.name}</h3>
          <p style="font-size: 11px; color: var(--text-muted); font-family: monospace">${p.code}</p>
          
          <div class="project-progress-bar">
            <div class="project-progress-fill" style="width: ${p.completionPercent}%"></div>
          </div>
          
          <div style="font-size: 12px; color: var(--text-muted); margin-bottom: 12px">
            <strong>Specs:</strong> ${p.fabricSpecs}
          </div>
          
          <div class="plm-stages-flow">
            ${timelineNodesHtml}
          </div>
          
          <div style="display: flex; justify-content: space-between; align-items: center; margin-top: auto; padding-top: 16px; border-top: 1px solid var(--border-color)">
            <span style="font-size: 11px; color: var(--text-muted)">Lead: <strong>${p.leadDesigner}</strong></span>
            <span style="font-size: 11px; color: var(--text-muted)">Updated: ${p.lastUpdated}</span>
          </div>
        </div>
      `;
    }).join('');
  }
  
  // Render Documents library
  renderRAGLibrary();
}

window.updateProjectStage = function(projId, stageName) {
  const p = plmProjects.find(item => item.id === projId);
  if (p) {
    p.stage = stageName;
    
    // Set percentages automatically based on stage
    const stages = ['Concept', 'Tech Pack', 'Prototyping', 'Bulk Production', 'Quality Control', 'Completed'];
    const idx = stages.indexOf(stageName);
    p.completionPercent = Math.round(((idx + 1) / stages.length) * 100);
    
    // Reset timelines
    p.timeline.forEach(t => {
      const tIdx = stages.indexOf(t.stage);
      if (tIdx < idx) {
        t.status = 'completed';
        if (t.date === 'Pending') t.date = new Date().toISOString().split('T')[0];
      } else if (tIdx === idx) {
        t.status = 'active';
        t.date = new Date().toISOString().split('T')[0];
      } else {
        t.status = 'pending';
        t.date = 'Pending';
      }
    });
    
    p.lastUpdated = new Date().toISOString().split('T')[0];
    renderCurrentView();
  }
};

window.addNewPLMProject = function() {
  const name = prompt("Enter garment project name (e.g. Organic Wool Knitwear):");
  if (!name) return;
  const leadDesigner = prompt("Enter lead designer:", "Sarah Jenkins");
  if (!leadDesigner) return;
  
  const id = `plm-${plmProjects.length + 1}`;
  const code = `PLM-SS26-KNT${Math.floor(Math.random() * 90 + 10)}`;
  
  plmProjects.push({
    id,
    name,
    code,
    category: 'Casualwear / Knits',
    stage: 'Concept',
    completionPercent: 15,
    leadDesigner,
    season: 'SS26 (Spring/Summer)',
    fabricSpecs: 'Organic Wool thread, localized spinning.',
    lastUpdated: new Date().toISOString().split('T')[0],
    timeline: [
      { stage: 'Concept', date: new Date().toISOString().split('T')[0], status: 'active' },
      { stage: 'Tech Pack', date: 'Pending', status: 'pending' },
      { stage: 'Prototyping', date: 'Pending', status: 'pending' },
      { stage: 'Bulk Production', date: 'Pending', status: 'pending' },
      { stage: 'Quality Control', date: 'Pending', status: 'pending' },
      { stage: 'Completed', date: 'Pending', status: 'pending' }
    ]
  });
  
  renderCurrentView();
};

// === RAG Engine ===
function renderRAGLibrary() {
  const docList = document.getElementById('rag-document-library');
  if (docList) {
    docList.innerHTML = ragDocuments.map(doc => `
      <div class="doc-list-item" onclick="viewDocumentContents('${doc.id}')">
        <div class="doc-list-header">
          <h4>${doc.title}</h4>
          <span class="doc-badge ${doc.category.toLowerCase().replace(' ', '-')}">${doc.category}</span>
        </div>
        <div class="doc-excerpt">${doc.content}</div>
      </div>
    `).join('');
  }
}

window.viewDocumentContents = function(id) {
  const doc = ragDocuments.find(d => d.id === id);
  if (doc) {
    const outputAnswer = document.getElementById('rag-output-answer');
    const sourcesList = document.getElementById('rag-sources-list');
    
    if (outputAnswer) {
      outputAnswer.innerHTML = `<h3 style="margin-bottom: 8px; font-size: 15px; color: var(--accent-plm)">${doc.title}</h3>${doc.content}`;
    }
    
    if (sourcesList) {
      sourcesList.innerHTML = `
        <div class="source-snippet-card">
          <div class="source-meta">
            <span>FULL ARCHIVE</span>
            <span>Category: ${doc.category}</span>
          </div>
          <div class="source-snippet-text">Displaying full indexed text corpus. Last updated on ${doc.lastUpdated}.</div>
        </div>
      `;
    }
  }
};

function setupRAGEvents() {
  const searchBtn = document.getElementById('rag-search-btn');
  const queryInput = document.getElementById('rag-query-input');
  
  if (searchBtn && queryInput) {
    const handleSearch = () => {
      const query = queryInput.value.trim();
      if (!query) return;
      
      performRAGSearch(query);
    };
    
    searchBtn.addEventListener('click', handleSearch);
    queryInput.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') handleSearch();
    });
  }
}

function performRAGSearch(query) {
  const outputAnswer = document.getElementById('rag-output-answer');
  const sourcesList = document.getElementById('rag-sources-list');
  
  // 1. Text chunking: Split documents into paragraphs/sentences
  let snippets = [];
  ragDocuments.forEach(doc => {
    // Split into sentences (or lines)
    const lines = doc.content.split('\n');
    lines.forEach(line => {
      if (line.trim().length > 15) {
        snippets.push({
          docId: doc.id,
          docTitle: doc.title,
          text: line.trim()
        });
      }
    });
  });
  
  // 2. Keyword Index Search (TF-IDF approximated)
  const queryWords = query.toLowerCase().replace(/[^a-z0-9 ]/g, '').split(' ').filter(w => w.length > 2);
  
  let matches = snippets.map(snippet => {
    let score = 0;
    const snippetLower = snippet.text.toLowerCase();
    
    queryWords.forEach(word => {
      if (snippetLower.includes(word)) {
        score += 1;
        // Boost score if consecutive query words exist
        if (query.toLowerCase().includes(word)) {
          score += 0.5;
        }
      }
    });
    
    return { ...snippet, score };
  })
  .filter(match => match.score > 0)
  .sort((a, b) => b.score - a.score)
  .slice(0, 3); // top 3 matching nodes
  
  // 3. Simulated Generative LLM Response drafting
  if (matches.length === 0) {
    if (outputAnswer) {
      outputAnswer.textContent = `No matching textile standard or dye recipe was found for the query: "${query}". Try searching for keywords like "formaldehyde", "lead", "indigo pH", "GOTS GOTS", or "waterless".`;
    }
    if (sourcesList) {
      sourcesList.innerHTML = '<div style="color: var(--text-muted); font-size: 11px">No matching references.</div>';
    }
    return;
  }
  
  // Construct dynamic synthesis response
  let synthesisText = `Based on the retrieved technical document records, here is the synthesized answer for: "${query}":\n\n`;
  
  const bestMatch = matches[0];
  const containsLead = query.toLowerCase().includes('lead') || query.toLowerCase().includes('metal') || query.toLowerCase().includes('oeko');
  const containsIndigo = query.toLowerCase().includes('indigo') || query.toLowerCase().includes('dye') || query.toLowerCase().includes('ph');
  const containsGots = query.toLowerCase().includes('gots') || query.toLowerCase().includes('organic');
  const containsWaterless = query.toLowerCase().includes('waterless') || query.toLowerCase().includes('co2') || query.toLowerCase().includes('carbon');
  
  if (containsLead) {
    synthesisText += `• Heavy metals such as **Lead (Pb)** must have a total concentration **below 90 mg/kg** for all processed textiles according to OEKO-TEX Standard 100 compliance guidelines.\n• For infant garments (Class I), formaldehyde is restricted to 16 mg/kg (undetectable). Nickel releases on metal accessories must remain below 0.5 µg/cm²/week.`;
  } else if (containsIndigo) {
    synthesisText += `• In denim indigo dyeing operations, the **pH values must remain strictly between 11.5 and 12.0** (regulated with sodium hydroxide). This ensures proper dye reduction.\n• The hydrosulfite reducing agent must be kept at 2.5 - 3.0 g/L, and dipping times should stay at 20 seconds, followed by 60 seconds of air oxidation.`;
  } else if (containsGots) {
    synthesisText += `• Products certified under **GOTS v7.0** labeled "Organic" require a minimum of **95% certified organic fibers**. Products labeled "Made with Organic" require at least **70%**.\n• Effluent water treatment standards require ETP discharge pH to remain between 6.0 and 9.0, with a chemical oxygen demand (COD) under 20 mg/L.`;
  } else if (containsWaterless) {
    synthesisText += `• The waterless dyeing process compresses **carbon dioxide** beyond its critical state of 73.8 bar and 31.1°C to act as a disperse solvent at **120°C (polyester) and 250-280 bar pressure**.\n• This system achieves a 95% dye exhaustion efficiency and bypasses the energy-intensive drying phases completely.`;
  } else {
    // Generic synthesis from match text
    synthesisText += `• Document [${bestMatch.docTitle}] indicates: "${bestMatch.text}"\n`;
    if (matches[1]) {
      synthesisText += `• Additionally, records state: "${matches[1].text}"`;
    }
  }
  
  synthesisText += `\n\n[Synthesis finalized via Local Agentic RAG core]`;
  
  if (outputAnswer) {
    outputAnswer.innerHTML = synthesisText.replace(/\n/g, '<br>').replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
  }
  
  if (sourcesList) {
    sourcesList.innerHTML = matches.map(match => `
      <div class="source-snippet-card">
        <div class="source-meta">
          <span>${match.docTitle}</span>
          <span>Score: ${(match.score * 100).toFixed(0)}</span>
        </div>
        <div class="source-snippet-text">"${match.text}"</div>
      </div>
    `).join('');
  }
}

window.simulateUploadDocument = function() {
  const title = prompt("Enter document title (e.g. ISO 9001 Spinning Standard):");
  if (!title) return;
  const content = prompt("Paste document text contents:");
  if (!content) return;
  
  ragDocuments.push({
    id: `doc-${ragDocuments.length + 1}`,
    title,
    category: 'Manual',
    lastUpdated: new Date().toISOString().split('T')[0],
    content
  });
  
  renderRAGLibrary();
  alert("Document successfully ingested and indexed into RAG database!");
};

// === Inventory Tracker Controller ===
function renderInventoryView() {
  // 1. Render Table
  const tableBody = document.getElementById('inventory-table-body');
  if (tableBody) {
    let filteredItems = inventory;
    
    if (inventoryFilter !== 'all') {
      filteredItems = inventory.filter(item => item.category === inventoryFilter);
    }
    
    tableBody.innerHTML = filteredItems.map(item => {
      const isLow = item.quantity <= item.reorderLevel;
      const statusText = isLow ? 'low-stock' : 'in-stock';
      const statusBadge = `<span class="status-badge ${statusText}">${statusText.replace('-', ' ')}</span>`;
      
      return `
        <tr>
          <td>
            <div style="font-weight: 700">${item.name}</div>
            <div style="font-size: 11px; color: var(--text-muted)">${item.sku}</div>
          </td>
          <td><span style="text-transform: capitalize; padding: 4px 8px; border-radius: 4px; background: rgba(255,255,255,0.03); border:1px solid var(--border-color)">${item.category}</span></td>
          <td style="font-weight: 600">${item.quantity.toLocaleString()} ${item.unit}</td>
          <td>${item.location}</td>
          <td>${statusBadge}</td>
          <td>
            <button class="btn btn-sm" onclick="openStockEditModal('${item.id}')">Edit Quantity</button>
          </td>
        </tr>
      `;
    }).join('');
  }
  
  // 2. Draw SVG Charts
  drawInventoryCharts();
}

function drawInventoryCharts() {
  const barChartDiv = document.getElementById('inventory-bar-chart');
  const pieChartDiv = document.getElementById('inventory-pie-chart');
  
  if (barChartDiv) {
    // Create an SVG bar chart
    // Get materials
    const maxVal = Math.max(...inventory.map(i => i.quantity));
    
    let barsHtml = '';
    const chartHeight = 180;
    const chartWidth = 500;
    const paddingLeft = 50;
    const paddingBottom = 40;
    
    inventory.forEach((item, idx) => {
      const barWidth = 35;
      const gap = 20;
      const x = paddingLeft + idx * (barWidth + gap);
      const isLow = item.quantity <= item.reorderLevel;
      
      // Calculate scaling
      const valHeight = (item.quantity / maxVal) * (chartHeight - 20);
      const y = chartHeight - valHeight;
      
      barsHtml += `
        <g class="chart-group">
          <!-- Hover label tooltip -->
          <text class="chart-label-value" x="${x + barWidth/2}" y="${y - 8}">${item.quantity}</text>
          
          <rect class="chart-bar ${isLow ? 'low' : ''}" x="${x}" y="${y}" width="${barWidth}" height="${valHeight}" rx="4"></rect>
          <text class="chart-label" x="${x + barWidth/2}" y="${chartHeight + 16}" text-anchor="middle" transform="rotate(-15, ${x + barWidth/2}, ${chartHeight + 16})" style="font-size: 8px">${item.name.substring(0, 15)}...</text>
        </g>
      `;
    });
    
    // Draw Grid Lines
    let gridsHtml = '';
    const steps = 4;
    for (let i = 0; i <= steps; i++) {
      const yVal = 10 + i * ((chartHeight - 30) / steps);
      const labelVal = Math.round(maxVal - (i * (maxVal / steps)));
      gridsHtml += `
        <line class="chart-grid-line" x1="${paddingLeft}" y1="${yVal}" x2="${chartWidth}" y2="${yVal}"></line>
        <text class="chart-label" x="10" y="${yVal + 4}">${labelVal}</text>
      `;
    }
    
    barChartDiv.innerHTML = `
      <svg viewBox="0 0 ${chartWidth} ${chartHeight + 50}" width="100%" height="100%">
        ${gridsHtml}
        <!-- X Axis -->
        <line class="chart-axis-line" x1="${paddingLeft}" y1="${chartHeight}" x2="${chartWidth}" y2="${chartHeight}"></line>
        <!-- Y Axis -->
        <line class="chart-axis-line" x1="${paddingLeft}" y1="10" x2="${paddingLeft}" y2="${chartHeight}"></line>
        ${barsHtml}
      </svg>
    `;
  }
  
  if (pieChartDiv) {
    // Draw Donut Chart representing category counts
    const categories = { yarn: 0, fabric: 0, dye: 0, accessories: 0 };
    inventory.forEach(item => {
      categories[item.category] += item.quantity;
    });
    
    const total = Object.values(categories).reduce((a, b) => a + b, 0);
    const colors = { yarn: '#6366f1', fabric: '#06b6d4', dye: '#f59e0b', accessories: '#a855f7' };
    
    let accumulatedPercent = 0;
    let pathSegments = '';
    const radius = 60;
    const cx = 80;
    const cy = 80;
    const circumference = 2 * Math.PI * radius;
    
    Object.entries(categories).forEach(([cat, val]) => {
      const percentage = val / total;
      const strokeDash = percentage * circumference;
      const strokeOffset = circumference - (accumulatedPercent * circumference);
      
      pathSegments += `
        <circle class="donut-segment" cx="${cx}" cy="${cy}" r="${radius}"
                stroke="${colors[cat]}" stroke-dasharray="${strokeDash} ${circumference - strokeDash}"
                stroke-dashoffset="${strokeOffset}" transform="rotate(-90 ${cx} ${cy})">
        </circle>
      `;
      accumulatedPercent += percentage;
    });
    
    // Build legend
    let legendHtml = '';
    Object.entries(categories).forEach(([cat, val]) => {
      legendHtml += `
        <div class="legend-item">
          <div class="legend-color" style="background-color: ${colors[cat]}"></div>
          <span style="text-transform: capitalize; color: var(--text-main)">${cat}</span>
          <span style="color: var(--text-muted); margin-left: auto;">${val.toLocaleString()}</span>
        </div>
      `;
    });
    
    pieChartDiv.innerHTML = `
      <div class="chart-container" style="display: grid; grid-template-columns: 1fr 1fr; width: 100%;">
        <svg width="160" height="160" viewBox="0 0 160 160">
          ${pathSegments}
          <circle class="donut-center" cx="${cx}" cy="${cy}" r="42"></circle>
          <text class="donut-text-val" x="${cx}" y="${cy + 2}">${(total/1000).toFixed(0)}k</text>
          <text class="donut-text-lbl" x="${cx}" y="${cy + 16}">Total Units</text>
        </svg>
        <div class="chart-legend">
          ${legendHtml}
        </div>
      </div>
    `;
  }
}

function setupInventoryEvents() {
  const filterButtons = document.querySelectorAll('.filter-btn');
  filterButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      filterButtons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      inventoryFilter = btn.getAttribute('data-filter');
      renderInventoryView();
    });
  });
  
  // Search inventory
  const searchInput = document.getElementById('inventory-search');
  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      const q = e.target.value.toLowerCase();
      const filtered = inventory.filter(item => item.name.toLowerCase().includes(q) || item.sku.toLowerCase().includes(q));
      
      const tableBody = document.getElementById('inventory-table-body');
      if (tableBody) {
        tableBody.innerHTML = filtered.map(item => {
          const isLow = item.quantity <= item.reorderLevel;
          const statusText = isLow ? 'low-stock' : 'in-stock';
          const statusBadge = `<span class="status-badge ${statusText}">${statusText.replace('-', ' ')}</span>`;
          return `
            <tr>
              <td>
                <div style="font-weight: 700">${item.name}</div>
                <div style="font-size: 11px; color: var(--text-muted)">${item.sku}</div>
              </td>
              <td><span style="text-transform: capitalize; padding: 4px 8px; border-radius: 4px; background: rgba(255,255,255,0.03); border:1px solid var(--border-color)">${item.category}</span></td>
              <td style="font-weight: 600">${item.quantity.toLocaleString()} ${item.unit}</td>
              <td>${item.location}</td>
              <td>${statusBadge}</td>
              <td>
                <button class="btn btn-sm" onclick="openStockEditModal('${item.id}')">Edit Quantity</button>
              </td>
            </tr>
          `;
        }).join('');
      }
    });
  }
}

// Edit Stock Modal
let currentEditId = '';
window.openStockEditModal = function(id) {
  const item = inventory.find(i => i.id === id);
  if (item) {
    currentEditId = id;
    document.getElementById('modal-item-name').textContent = item.name;
    document.getElementById('edit-stock-qty').value = item.quantity;
    modalOverlay.classList.add('active');
  }
};

window.closeStockModal = function() {
  modalOverlay.classList.remove('active');
};

window.saveStockEdit = function() {
  const qty = parseInt(document.getElementById('edit-stock-qty').value);
  if (isNaN(qty) || qty < 0) {
    alert("Please enter a valid stock quantity.");
    return;
  }
  
  const item = inventory.find(i => i.id === currentEditId);
  if (item) {
    item.quantity = qty;
    item.lastUpdated = new Date().toISOString().split('T')[0];
    closeStockModal();
    renderCurrentView();
  }
};

window.openAddNewMaterialModal = function() {
  const name = prompt("Enter material name (e.g. Organic Hemp Rolls):");
  if (!name) return;
  const sku = prompt("Enter SKU (e.g. FAB-HMP-ORG-150):");
  if (!sku) return;
  const category = prompt("Enter category (fabric, yarn, dye, accessories):", "fabric");
  if (!category) return;
  const quantity = parseInt(prompt("Enter quantity:", "1000"));
  if (isNaN(quantity)) return;
  const unit = prompt("Enter unit (meters, kg, pcs):", "meters");
  
  inventory.push({
    id: `inv-${inventory.length + 1}`,
    name,
    sku,
    category,
    quantity,
    unit,
    reorderLevel: Math.ceil(quantity * 0.3),
    location: 'Warehouse B - Section 5',
    supplier: 'EcoTextile Co.',
    lastUpdated: new Date().toISOString().split('T')[0]
  });
  renderCurrentView();
};

// === Logistics Tracker Controller ===
function renderLogisticsView() {
  // 1. Render Shipments List Panel
  const listPanel = document.getElementById('shipments-list-panel');
  if (listPanel) {
    listPanel.innerHTML = shipments.map(s => {
      const activeClass = s.id === activeShipmentId ? 'active' : '';
      let statusColor = 'var(--accent-plm)';
      if (s.status === 'delayed') statusColor = 'var(--status-warning)';
      else if (s.status === 'critical') statusColor = 'var(--status-danger)';
      
      return `
        <div class="doc-list-item ${activeClass}" onclick="selectShipment('${s.id}')" style="border-left: 4px solid ${statusColor}">
          <div class="doc-list-header">
            <h4 style="font-weight: 700">${s.name}</h4>
            <span style="font-size: 10px; font-weight: 700; color: ${statusColor}; text-transform: uppercase;">${s.status}</span>
          </div>
          <div style="font-size: 11px; color: var(--text-muted); display: flex; justify-content: space-between; margin-top: 6px;">
            <span>Tracking: <strong>${s.trackingNumber}</strong></span>
            <span>ETA: <strong>${s.eta}</strong></span>
          </div>
          <!-- Progress bar -->
          <div style="height: 4px; background: rgba(255,255,255,0.03); border-radius: 2px; margin-top: 8px; overflow:hidden;">
            <div style="height:100%; background: ${statusColor}; width: ${s.progress}%"></div>
          </div>
        </div>
      `;
    }).join('');
  }
  
  // 2. Draw Map & Ship marker
  drawLogisticsMap();
  
  // 3. Render Shipment Details & Timeline
  renderShipmentDetails();
}

function drawLogisticsMap() {
  const mapDiv = document.getElementById('shipments-map-container');
  if (mapDiv) {
    let lanesHtml = '';
    let shipsHtml = '';
    
    shipments.forEach(s => {
      // Build routing path string from coordinates
      let pathString = `M ${s.routeCoordinates[0].x} ${s.routeCoordinates[0].y}`;
      for (let i = 1; i < s.routeCoordinates.length; i++) {
        pathString += ` L ${s.routeCoordinates[i].x} ${s.routeCoordinates[i].y}`;
      }
      
      // Calculate cargo dot placement along the path based on progress
      const pathSegCount = s.routeCoordinates.length - 1;
      const progressFraction = s.progress / 100;
      
      // Approximate position coordinates
      const currentSegmentDouble = progressFraction * pathSegCount;
      const currentSegIndex = Math.floor(currentSegmentDouble);
      const remainder = currentSegmentDouble - currentSegIndex;
      
      let shipX = s.routeCoordinates[s.routeCoordinates.length - 1].x;
      let shipY = s.routeCoordinates[s.routeCoordinates.length - 1].y;
      
      if (currentSegIndex < pathSegCount) {
        const p1 = s.routeCoordinates[currentSegIndex];
        const p2 = s.routeCoordinates[currentSegIndex + 1];
        shipX = p1.x + (p2.x - p1.x) * remainder;
        shipY = p1.y + (p2.y - p1.y) * remainder;
      }
      
      const isSelected = s.id === activeShipmentId;
      
      // Route lines
      lanesHtml += `
        <path class="map-route-line ${s.status}" d="${pathString}" 
              style="opacity: ${isSelected ? '1' : '0.45'}; stroke-width: ${isSelected ? '3' : '2'}">
        </path>
      `;
      
      // Ships dots
      shipsHtml += `
        <g style="cursor: pointer" onclick="selectShipment('${s.id}')">
          <circle class="map-ship-dot ${s.status}" cx="${shipX}" cy="${shipY}" r="7"></circle>
          <!-- Label -->
          <text class="map-label" x="${shipX + 10}" y="${shipY - 10}" 
                style="font-size: 8px; fill: ${isSelected ? 'var(--text-main)' : 'var(--text-muted)'}; font-weight: ${isSelected ? '800' : '400'}">
            ${s.trackingNumber}
          </text>
        </g>
      `;
    });
    
    // Add anchor ports
    const ports = [
      { name: 'Alexandria', x: 220, y: 240 },
      { name: 'Milan Port Depot', x: 130, y: 135 },
      { name: 'Huzhou / Shanghai', x: 500, y: 180 },
      { name: 'Los Angeles Port', x: 680, y: 180 },
      { name: 'Gujarat Mundra', x: 380, y: 220 },
      { name: 'Hamburg Terminal', x: 100, y: 85 },
      { name: 'Tokyo Port', x: 535, y: 155 },
      { name: 'Mumbai Airport', x: 360, y: 235 }
    ];
    
    let portsHtml = ports.map(p => `
      <g>
        <rect class="map-port-marker" x="${p.x - 3}" y="${p.y - 3}" width="6" height="6" rx="1"></rect>
        <text class="map-label" x="${p.x - 12}" y="${p.y + 12}" style="font-size: 7px; fill: rgba(255,255,255,0.4)">${p.name}</text>
      </g>
    `).join('');
    
    mapDiv.innerHTML = `
      <svg class="world-map-svg" viewBox="0 0 720 320" width="100%" height="100%">
        <!-- Decorative Grid Lines -->
        <g stroke="rgba(255,255,255,0.02)" stroke-width="1">
          <line x1="0" y1="80" x2="720" y2="80"></line>
          <line x1="0" y1="160" x2="720" y2="160"></line>
          <line x1="0" y1="240" x2="720" y2="240"></line>
          <line x1="180" y1="0" x2="180" y2="320"></line>
          <line x1="360" y1="0" x2="360" y2="320"></line>
          <line x1="540" y1="0" x2="540" y2="320"></line>
        </g>
        
        <!-- Ocean Routes -->
        ${lanesHtml}
        <!-- Harbor Ports -->
        ${portsHtml}
        <!-- Shipping Vessels -->
        ${shipsHtml}
      </svg>
    `;
  }
}

function renderShipmentDetails() {
  const detailPanel = document.getElementById('shipment-details-panel');
  if (detailPanel) {
    const s = shipments.find(item => item.id === activeShipmentId);
    if (!s) {
      detailPanel.innerHTML = '<div style="color: var(--text-muted); font-size: 13px; text-align: center; padding: 24px;">Select a shipment to view status tracking logs.</div>';
      return;
    }
    
    const logsHtml = s.logs.map((log, idx) => {
      const isActive = idx === s.logs.length - 1;
      const isCompleted = idx < s.logs.length - 1;
      let stepClass = '';
      if (isActive) stepClass = 'active';
      else if (isCompleted) stepClass = 'completed';
      
      return `
        <div class="timeline-step ${stepClass}">
          <div class="timeline-step-date">${log.date}</div>
          <div class="timeline-step-title">${log.status} • <span style="color: var(--text-muted)">${log.location}</span></div>
          <div class="timeline-step-desc">${log.description}</div>
        </div>
      `;
    }).reverse().join(''); // show newest logs on top
    
    let mitigateActionHtml = '';
    if (s.status === 'delayed') {
      mitigateActionHtml = `
        <div style="margin-top: 18px; padding: 12px; background: var(--accent-log-glow); border: 1px solid rgba(245, 158, 11, 0.2); border-radius: var(--radius-md)">
          <h4 style="font-size: 12px; color: var(--accent-log); margin-bottom: 6px;">Delayed Mitigation Option</h4>
          <p style="font-size: 11px; color: var(--text-muted); margin-bottom: 10px;">Vessel delayed in Mediterranean. Select logistics mitigation action:</p>
          <button class="btn btn-sm btn-primary" onclick="triggerMitigation('reroute', '${s.id}')">Reroute to Genoa Depot</button>
        </div>
      `;
    } else if (s.status === 'critical') {
      mitigateActionHtml = `
        <div style="margin-top: 18px; padding: 12px; background: rgba(239, 68, 68, 0.08); border: 1px solid rgba(239, 68, 68, 0.2); border-radius: var(--radius-md)">
          <h4 style="font-size: 12px; color: var(--status-danger); margin-bottom: 6px;">Critical Port Lockout Mitigation</h4>
          <p style="font-size: 11px; color: var(--text-muted); margin-bottom: 10px;">Labor strike in Hamburg. Re-routing cargo is recommended to prevent stockouts.</p>
          <button class="btn btn-sm btn-primary" style="background: var(--status-danger); border-color:var(--status-danger)" onclick="triggerMitigation('expedite', '${s.id}')">Redirect to Rotterdam Air Freight</button>
        </div>
      `;
    }
    
    detailPanel.innerHTML = `
      <div class="card-title-bar">
        <h3>${s.name}</h3>
        <span class="status-badge" style="background-color: var(--bg-input); font-family: monospace;">${s.trackingNumber}</span>
      </div>
      
      <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 12px; font-size: 12px; color: var(--text-muted); margin-bottom: 16px;">
        <div>Carrier: <strong style="color: var(--text-main)">${s.carrier}</strong></div>
        <div>Current Stage: <strong style="color: var(--text-main); text-transform: uppercase;">${s.currentStage}</strong></div>
        <div>Origin: <strong style="color: var(--text-main)">${s.origin}</strong></div>
        <div>Destination: <strong style="color: var(--text-main)">${s.destination}</strong></div>
        <div>ETA: <strong style="color: var(--accent-log)">${s.eta}</strong></div>
        <div>Transit Progress: <strong style="color: var(--text-main)">${s.progress}%</strong></div>
      </div>
      
      <h4 style="font-size: 12px; text-transform: uppercase; color: var(--text-muted); margin-top: 12px;">Transit Milestone Tracking</h4>
      <div class="shipment-timeline-track">
        ${logsHtml}
      </div>
      
      ${mitigateActionHtml}
    `;
  }
}

window.selectShipment = function(id) {
  activeShipmentId = id;
  renderLogisticsView();
};

window.triggerMitigation = function(actionType, id) {
  const s = shipments.find(item => item.id === id);
  if (s) {
    if (actionType === 'reroute') {
      s.status = 'on-time';
      s.destination = 'Genoa Depot, Italy';
      s.progress = 65;
      s.eta = '2026-06-15'; // 3 days saved
      s.logs.push({
        date: new Date().toISOString().split('T')[0] + ' 12:00',
        status: 'Rerouting Activated',
        location: 'West Mediterranean Sea',
        description: 'Mitigation trigger: Vessel diverted to Genoa Port. Port processing clearance pre-registered.'
      });
      alert(`Cargo rerouted to Genoa! Status recovered to On Time.`);
    } else if (actionType === 'expedite') {
      s.status = 'on-time';
      s.destination = 'Rotterdam -> Hamburg (Air Freight)';
      s.progress = 95;
      s.eta = '2026-06-12'; // Immediate next day arrival
      s.logs.push({
        date: new Date().toISOString().split('T')[0] + ' 13:00',
        status: 'Air Cargo Dispatched',
        location: 'Rotterdam Airport Hub',
        description: 'Mitigation trigger: Cargo container picked up and transferred to secondary air freighter.'
      });
      alert(`Cargo transferred to Air Freight! Estimated arrival tomorrow.`);
    }
    renderCurrentView();
  }
};

function setupLogisticsEvents() {
  // Setup is done via onclick handlers bound to global window
}

// === AI Assistant Controller ===
function renderAIView() {
  // Render message history
  const messageThread = document.getElementById('ai-chat-thread');
  if (messageThread) {
    messageThread.innerHTML = chatHistory.map(msg => {
      const isUser = msg.role === 'user';
      const avatar = isUser ? 'ME' : 'AI';
      
      let refHtml = '';
      if (msg.references && msg.references.length > 0) {
        refHtml = `
          <div class="chat-references-block">
            <span style="font-size: 10px; color: var(--text-muted); display: block; margin-bottom: 4px;">Retrieved standards context:</span>
            ${msg.references.map(ref => `<span class="chat-ref-badge" onclick="navigateToTab('plm'); viewDocumentContents('${ref.docId}');">📚 ${ref.docTitle}</span>`).join('')}
          </div>
        `;
      }
      
      return `
        <div class="chat-message ${msg.role}">
          <div class="avatar" style="background: ${isUser ? 'linear-gradient(135deg, var(--accent-inv), #818cf8)' : 'linear-gradient(135deg, var(--accent-ai), #c084fc)'}; flex-shrink: 0;">
            ${avatar}
          </div>
          <div class="msg-bubble">
            <div style="white-space: pre-wrap;">${msg.text}</div>
            ${refHtml}
          </div>
        </div>
      `;
    }).join('');
    
    // Auto Scroll to bottom
    messageThread.scrollTop = messageThread.scrollHeight;
  }
}

function setupAIEvents() {
  const sendBtn = document.getElementById('ai-send-btn');
  const chatInput = document.getElementById('ai-chat-input');
  
  if (sendBtn && chatInput) {
    const handleSend = () => {
      const text = chatInput.value.trim();
      if (!text) return;
      
      // Add user message
      chatHistory.push({
        id: `chat-${chatHistory.length + 1}`,
        role: 'user',
        text,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      });
      
      chatInput.value = '';
      renderAIView();
      
      // Simulate typing indicator
      const messageThread = document.getElementById('ai-chat-thread');
      const typingIndicator = document.createElement('div');
      typingIndicator.className = 'chat-message assistant';
      typingIndicator.id = 'ai-typing-indicator';
      typingIndicator.innerHTML = `
        <div class="avatar" style="background: linear-gradient(135deg, var(--accent-ai), #c084fc); flex-shrink: 0;">AI</div>
        <div class="msg-bubble" style="background-color: rgba(255, 255, 255, 0.03); border: 1px solid var(--border-color)">
          <div class="msg-typing-indicator">
            <div class="msg-typing-dot"></div>
            <div class="msg-typing-dot"></div>
            <div class="msg-typing-dot"></div>
          </div>
        </div>
      `;
      if (messageThread) {
        messageThread.appendChild(typingIndicator);
        messageThread.scrollTop = messageThread.scrollHeight;
      }
      
      // Delay response simulation
      setTimeout(() => {
        const typingNode = document.getElementById('ai-typing-indicator');
        if (typingNode) typingNode.remove();
        
        generateAIResponse(text);
      }, 1200);
    };
    
    sendBtn.addEventListener('click', handleSend);
    chatInput.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') handleSend();
    });
  }
}

// Prompt suggestions clicking handler
window.sendSuggestedPrompt = function(promptText) {
  const chatInput = document.getElementById('ai-chat-input');
  if (chatInput) {
    chatInput.value = promptText;
    const sendBtn = document.getElementById('ai-send-btn');
    if (sendBtn) sendBtn.click();
  }
};

// === AI Reasoning Agent core logic ===
function generateAIResponse(userText) {
  const query = userText.toLowerCase();
  
  // Base response template variables
  let responseText = '';
  let references = [];
  
  // 1. Perform RAG query matching first (in background) to see if we have relevant documentation
  let ragSnippetResults = [];
  let docKeywords = ['limit', 'standard', 'oeko', 'gots', 'comply', 'compliance', 'effluent', 'ph', 'indigo', 'lead', 'formaldehyde', 'dyeing', 'waterless', 'co2', 'chemical', 'temperature', 'linen', 'tensile', 'strength'];
  
  const hasDocKeywords = docKeywords.some(keyword => query.includes(keyword));
  if (hasDocKeywords) {
    // Search snippets
    let snippets = [];
    ragDocuments.forEach(doc => {
      doc.content.split('\n').forEach(line => {
        if (line.trim().length > 15) {
          snippets.push({
            docId: doc.id,
            docTitle: doc.title,
            text: line.trim()
          });
        }
      });
    });
    
    const queryWords = query.replace(/[^a-z0-9 ]/g, '').split(' ').filter(w => w.length > 2);
    let matches = snippets.map(snippet => {
      let score = 0;
      const snippetLower = snippet.text.toLowerCase();
      queryWords.forEach(word => {
        if (snippetLower.includes(word)) score += 1;
      });
      return { ...snippet, score };
    })
    .filter(match => match.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, 2);
    
    if (matches.length > 0) {
      references = matches.map(m => ({
        docId: m.docId,
        docTitle: m.docTitle,
        snippet: m.text,
        matchScore: m.score
      }));
    }
  }
  
  // 2. Intent Recognition & State Mapping
  const containsInventory = query.includes('inventory') || query.includes('stock') || query.includes('yarn') || query.includes('fabric') || query.includes('dye') || query.includes('material');
  const containsLogistics = query.includes('logistics') || query.includes('shipment') || query.includes('vessel') || query.includes('delay') || query.includes('transit') || query.includes('port') || query.includes('tx-');
  const containsPlm = query.includes('plm') || query.includes('project') || query.includes('stage') || query.includes('design') || query.includes('blazer') || query.includes('jacket') || query.includes('hoodie');
  
  if (containsInventory && containsLogistics) {
    // Inter-tab integration query: "Is the delay impacting inventory?"
    const delayedShipments = shipments.filter(s => s.status !== 'on-time');
    const lowStockItems = inventory.filter(item => item.quantity <= item.reorderLevel);
    
    responseText = `Analyzing the correlation between transit delays and stock capacity:\n\n`;
    
    if (delayedShipments.length > 0) {
      responseText += `1. **Logistics Bottlenecks**: There are currently **${delayedShipments.length} active delays** in transit:\n`;
      delayedShipments.forEach(s => {
        responseText += `   • **Shipment ${s.trackingNumber}** (${s.name}) is **${s.status.toUpperCase()}**. It is currently at the ${s.currentStage} stage (ETA: ${s.eta}).\n`;
      });
      
      responseText += `\n2. **Inventory Safety Risks**: We have **${lowStockItems.length} materials** running low:\n`;
      let impactDetected = false;
      
      lowStockItems.forEach(item => {
        responseText += `   • **${item.name}**: Stock is **${item.quantity} ${item.unit}** (threshold ${item.reorderLevel} ${item.unit}).\n`;
        
        // Detect if cargo carries this item
        const matchingShipment = delayedShipments.find(s => s.name.toLowerCase().includes(item.category) || s.name.toLowerCase().includes(item.name.split(' ')[1].toLowerCase()));
        if (matchingShipment) {
          impactDetected = true;
          responseText += `     ⚠️ *CRITICAL IMPACT*: This low stock is directly dependent on delayed shipment **${matchingShipment.trackingNumber}**! Recommended action: Trigger the reroute or expedite mitigation protocol in the **Logistics** panel immediately.\n`;
        }
      });
      
      if (!impactDetected) {
        responseText += `\nNo direct cargo dependencies found for the remaining low-stock items. We recommend requesting restocks manually from the **Inventory** panel.`;
      }
    } else {
      responseText += `All shipments are operating on time. We have ${lowStockItems.length} items below safety stock thresholds, which can be restocked standardly in the Inventory manager.`;
    }
    
  } else if (containsInventory) {
    const lowStockItems = inventory.filter(item => item.quantity <= item.reorderLevel);
    responseText = `### Inventory Analysis\n\nWe currently track **${inventory.length} total material SKU catalog entries**.\n`;
    
    if (lowStockItems.length > 0) {
      responseText += `⚠️ **${lowStockItems.length} alerts require attention** (below reorder safety margins):\n\n`;
      lowStockItems.forEach(item => {
        responseText += `• **${item.name}** (SKU: \`${item.sku}\`)\n`;
        responseText += `  - Current Stock: **${item.quantity} ${item.unit}**\n`;
        responseText += `  - Reorder Threshold: **${item.reorderLevel} ${item.unit}**\n`;
        responseText += `  - Supplier: *${item.supplier}* (${item.location})\n\n`;
      });
      responseText += `*Recommendation*: You can restock these materials with one click using the "Order Restock" button on the **Dashboard** or by adjusting quantities in the **Inventory** table.`;
    } else {
      responseText += `✅ All raw materials and hardware trims are currently in stock above safety thresholds.`;
    }
    
  } else if (containsLogistics) {
    const activeDelayed = shipments.filter(s => s.status !== 'on-time');
    responseText = `### Shipping & Logistics Registry\n\n`;
    
    if (activeDelayed.length > 0) {
      responseText += `We have **${activeDelayed.length} cargo anomalies** out of ${shipments.length} total shipments:\n\n`;
      activeDelayed.forEach(s => {
        responseText += `• **${s.name}** (\`${s.trackingNumber}\`) - Status: <strong style="color: ${s.status === 'critical' ? 'var(--status-danger)' : 'var(--status-warning)'}">${s.status.toUpperCase()}</strong>\n`;
        responseText += `  - Route: ${s.origin} ➔ ${s.destination}\n`;
        responseText += `  - ETA: **${s.eta}** | Current Stage: **${s.currentStage}** (${s.progress}% complete)\n`;
        responseText += `  - Current Log: *"${s.logs[s.logs.length - 1].description}"*\n\n`;
      });
      responseText += `*Mitigation*: Open the **Logistics** panel to reroute or expedite these active cargos.`;
    } else {
      responseText += `✅ All ${shipments.length} transcontinental shipments are currently marked **On Time** and operating on schedule.`;
    }
    
  } else if (containsPlm) {
    responseText = `### Product Lifecycle Management (PLM) Report\n\nThere are **${plmProjects.length} active garment design projects** in the pipeline:\n\n`;
    plmProjects.forEach(p => {
      responseText += `• **${p.name}** (\`${p.code}\`)\n`;
      responseText += `  - Stage: **${p.stage}** (${p.completionPercent}% complete)\n`;
      responseText += `  - Designer: ${p.leadDesigner} | Season: *${p.season}*\n`;
      responseText += `  - Specs: *${p.fabricSpecs}*\n\n`;
    });
    
  } else if (references.length > 0) {
    // If user asked standard document questions (RAG)
    const bestRef = references[0];
    responseText = `### Technical Standards Synthesis\n\nBased on our indexed specifications library, here is the synthesis of our compliance standards regarding your query:\n\n`;
    
    if (query.includes('oeko') || query.includes('lead') || query.includes('formaldehyde')) {
      responseText += `According to the **${bestRef.docTitle}**:\n`;
      responseText += `• **Lead restrictions**: Maximum permissible limits are **90 mg/kg** for all processed raw fibers and trims.\n`;
      responseText += `• **Formaldehyde**: Strictly forbidden for infants (Class I, < 16 mg/kg) and capped at 75 mg/kg for adult clothing.\n`;
      responseText += `• **pH Acidity**: Must be balanced between 4.0 and 7.5 to avoid skin reaction.`;
    } else if (query.includes('gots') || query.includes('organic')) {
      responseText += `According to the **${bestRef.docTitle}**:\n`;
      responseText += `• **Organic Fabric composition**: Labels claiming "Organic" must verify **95% GOTS certified fibers**. Labels stating "Made with Organic" must verify at least **70%**.\n`;
      responseText += `• **Water treatment**: Wet-processing units must route all wastewater to an effluent treatment plant (ETP), outputting pH between 6.0 and 9.0 and Chemical Oxygen Demand (COD) below 20 mg/L.`;
    } else if (query.includes('indigo') || query.includes('dye')) {
      responseText += `According to the **${bestRef.docTitle}**:\n`;
      responseText += `• **pH bath levels**: Must be maintained precisely between **11.5 and 12.0** to ensure indigo chemical reduction and solubility.\n`;
      responseText += `• **Formulation parameters**: Keep indigo pigment concentration at 2.5 - 3.5 g/L and sodium hydrosulfite at 2.5 - 3.0 g/L. Temperature range: 28°C - 32°C.`;
    } else {
      responseText += `Retrieved text snippet from **${bestRef.docTitle}**:\n\n`;
      responseText += `*"${bestRef.snippet}"*\n\n`;
      if (references[1]) {
        responseText += `Also, referencing **${references[1].docTitle}**:\n`;
        responseText += `*"${references[1].snippet}"*`;
      }
    }
    
  } else {
    // General fallback responses
    responseText = `I understand your message regarding "${userText}". How can I help you coordinate? You can ask me about:
1. **Inventory stock levels** (e.g., "Which materials are low in stock?")
2. **Logistics delay statuses** (e.g., "Summarize cargo transit status")
3. **PLM production timelines** (e.g., "Show me PLM project progress")
4. **Technical specifications (RAG)** (e.g., "What is the OEKO-TEX lead limit?" or "Show indigo dye pH standards")`;
  }
  
  // Save AI response
  chatHistory.push({
    id: `chat-${chatHistory.length + 1}`,
    role: 'assistant',
    text: responseText,
    timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    references
  });
  
  renderAIView();
}

// ============================================================
// === FEATURE 2: ANNOUNCEMENTS — Read Receipts & Reminders ===
// ============================================================
let announcements = [
  { id: 'ann-1', title: 'Indigo Dye Shortage — Production Adjustment', body: 'Due to Hamburg port delays, indigo dye stocks are critically low. Dyeing floor must reduce batch sizes by 30% until TX-908 clears.', priority: 'urgent', date: '2026-06-11', reminderDate: '2026-06-18', fileName: null, readBy: ['Pravan M.', 'Sarah J.'], ackBy: ['Pravan M.'], totalRecipients: 5 },
  { id: 'ann-2', title: 'Monthly 5S Inspection — June 30th', body: 'All department heads must ensure workstations are cleared, labeled, and documented before June 30th audit. Checklists available from HR.', priority: 'important', date: '2026-06-09', reminderDate: '2026-06-28', fileName: '5S_Checklist_June.pdf', readBy: ['Sarah J.', 'Marcus V.', 'Elene R.'], ackBy: ['Marcus V.', 'Elene R.'], totalRecipients: 8 },
  { id: 'ann-3', title: 'New GOTS v7.0 Documentation Distributed', body: 'Updated GOTS v7.0 compliance guidelines have been uploaded to the PLM RAG library. All production staff must review sections 2 and 3.', priority: 'normal', date: '2026-06-08', reminderDate: null, fileName: 'GOTS_v7_Summary.pdf', readBy: ['Pravan M.', 'Sarah J.', 'Marcus V.', 'Elene R.'], ackBy: ['Pravan M.', 'Sarah J.', 'Marcus V.', 'Elene R.'], totalRecipients: 4 }
];
let annFileBuffer = null;
let annCurrentFilter = 'all';

function renderAnnouncementsView() {
  // Populate feed
  renderAnnouncementsFeed();
  // Update badge
  const unreadAnn = announcements.filter(a => !a.readBy.includes('Pravan M.')).length;
  const badge = document.getElementById('announce-badge');
  if (badge) { badge.textContent = unreadAnn; badge.style.display = unreadAnn > 0 ? 'inline-block' : 'none'; }
}

function renderAnnouncementsFeed() {
  const feed = document.getElementById('announcements-feed');
  if (!feed) return;
  const today = new Date().toISOString().split('T')[0];
  let filtered = announcements;
  if (annCurrentFilter === 'urgent') filtered = announcements.filter(a => a.priority === 'urgent');
  else if (annCurrentFilter === 'important') filtered = announcements.filter(a => a.priority === 'important');
  else if (annCurrentFilter === 'pending-followup') filtered = announcements.filter(a => a.reminderDate && a.reminderDate >= today);

  feed.innerHTML = filtered.map(a => {
    const readPct = Math.round((a.readBy.length / a.totalRecipients) * 100);
    const ackPct = Math.round((a.ackBy.length / a.totalRecipients) * 100);
    const isOverdue = a.reminderDate && a.reminderDate < today;
    const myRead = a.readBy.includes('Pravan M.');
    const myAck = a.ackBy.includes('Pravan M.');
    return `
      <div class="ann-card ${a.priority}" onclick="markAnnRead('${a.id}')">
        <div class="ann-card-header">
          <strong style="font-size:13px;">${myRead ? '' : '<span style="display:inline-block;width:7px;height:7px;border-radius:50%;background:var(--accent-inv);margin-right:6px;vertical-align:middle;"></span>'}${a.title}</strong>
          <span class="ann-priority-badge ${a.priority}">${a.priority}</span>
        </div>
        <p style="font-size:12px;color:var(--text-muted);line-height:1.5;">${a.body}</p>
        <div class="ann-card-meta">
          <span style="font-size:11px;color:var(--text-muted);">📅 ${a.date}</span>
          ${a.fileName ? `<button class="ann-attachment-link">📎 ${a.fileName}</button>` : ''}
          ${a.reminderDate ? `<span class="ann-followup-chip ${isOverdue ? 'overdue' : ''}">🔔 Follow-up: ${a.reminderDate}${isOverdue ? ' (Overdue)' : ''}</span>` : ''}
        </div>
        <!-- Read receipts -->
        <div class="ann-receipt-row">
          <div class="ann-receipt-bar-wrap">
            <span class="ann-receipt-label">👁 Read</span>
            <div class="ann-receipt-track"><div class="ann-receipt-fill" style="width:${readPct}%;background:var(--accent-inv);"></div></div>
            <span class="ann-receipt-count">${a.readBy.length}/${a.totalRecipients}</span>
          </div>
          <div class="ann-receipt-bar-wrap">
            <span class="ann-receipt-label">✅ Ack</span>
            <div class="ann-receipt-track"><div class="ann-receipt-fill" style="width:${ackPct}%;background:var(--status-success);"></div></div>
            <span class="ann-receipt-count">${a.ackBy.length}/${a.totalRecipients}</span>
          </div>
        </div>
        <div style="display:flex;gap:8px;margin-top:10px;">
          ${!myRead ? `<button class="btn btn-sm" onclick="event.stopPropagation();markAnnRead('${a.id}')">Mark Read</button>` : '<span style="font-size:11px;color:var(--status-success);">✓ Read</span>'}
          ${!myAck ? `<button class="btn btn-sm btn-primary" onclick="event.stopPropagation();markAnnAck('${a.id}')">Acknowledge</button>` : '<span style="font-size:11px;color:var(--status-success);">✓ Acknowledged</span>'}
          ${a.reminderDate && !isOverdue ? `<button class="btn btn-sm" onclick="event.stopPropagation();snoozeReminder('${a.id}')" style="margin-left:auto;">Snooze Reminder</button>` : ''}
        </div>
      </div>`;
  }).join('') || '<div style="color:var(--text-muted);padding:20px;text-align:center;">No announcements match this filter.</div>';
}

window.markAnnRead = function(id) {
  const a = announcements.find(x => x.id === id);
  if (a && !a.readBy.includes('Pravan M.')) { a.readBy.push('Pravan M.'); renderAnnouncementsFeed(); }
};
window.markAnnAck = function(id) {
  const a = announcements.find(x => x.id === id);
  if (a) {
    if (!a.readBy.includes('Pravan M.')) a.readBy.push('Pravan M.');
    if (!a.ackBy.includes('Pravan M.')) a.ackBy.push('Pravan M.');
    renderAnnouncementsFeed();
  }
};
window.snoozeReminder = function(id) {
  const a = announcements.find(x => x.id === id);
  if (a && a.reminderDate) {
    const d = new Date(a.reminderDate); d.setDate(d.getDate() + 3);
    a.reminderDate = d.toISOString().split('T')[0];
    renderAnnouncementsFeed();
    alert('Reminder snoozed by 3 days.');
  }
};
window.filterAnnouncements = function(filter, btn) {
  annCurrentFilter = filter;
  document.querySelectorAll('.ann-filter-btn').forEach(b => b.classList.remove('active'));
  if (btn) btn.classList.add('active');
  renderAnnouncementsFeed();
};
window.handleAnnFileSelect = function(e) {
  const file = e.target.files[0];
  if (!file) return;
  annFileBuffer = file.name;
  const zone = document.getElementById('ann-file-zone');
  const label = document.getElementById('ann-file-label');
  if (zone) zone.classList.add('has-file');
  if (label) label.textContent = '📎 ' + file.name;
};
window.postAnnouncement = function() {
  const title = document.getElementById('ann-title').value.trim();
  const body = document.getElementById('ann-body').value.trim();
  const priority = document.getElementById('ann-priority').value;
  const reminderDate = document.getElementById('ann-reminder-date').value;
  if (!title || !body) { alert('Title and message are required.'); return; }
  announcements.unshift({ id: `ann-${Date.now()}`, title, body, priority, date: new Date().toISOString().split('T')[0], reminderDate: reminderDate || null, fileName: annFileBuffer, readBy: ['Pravan M.'], ackBy: [], totalRecipients: 5 });
  annFileBuffer = null;
  document.getElementById('ann-title').value = '';
  document.getElementById('ann-body').value = '';
  document.getElementById('ann-reminder-date').value = '';
  const zone = document.getElementById('ann-file-zone');
  const label = document.getElementById('ann-file-label');
  if (zone) zone.classList.remove('has-file');
  if (label) label.textContent = 'Click to attach a file';
  renderAnnouncementsView();
  updateNotifications();
};

// ============================================================
// === FEATURE 3: MEETINGS — Attendance, Action Items        ===
// ============================================================
let meetingFilter = 'all';
function renderMeetingsView() {
  updateMeetingStats();
  renderMeetingsList();
  updateMeetingsBadge();
}

function updateMeetingsBadge() {
  const pendingCount = meetings.flatMap(m => m.actionItems.filter(a => !a.done)).length;
  const badge = document.getElementById('meetings-badge');
  if (badge) { badge.textContent = pendingCount; badge.style.display = pendingCount > 0 ? 'inline-block' : 'none'; }
}

function updateMeetingStats() {
  const statsEl = document.getElementById('meeting-stats');
  if (!statsEl) return;
  const upcoming = meetings.filter(m => m.status === 'upcoming').length;
  const completed = meetings.filter(m => m.status === 'completed').length;
  const totalActions = meetings.flatMap(m => m.actionItems).length;
  const doneActions = meetings.flatMap(m => m.actionItems.filter(a => a.done)).length;
  const stats = [
    { label: 'Upcoming', val: upcoming, color: '#6366f1' },
    { label: 'Completed', val: completed, color: '#10b981' },
    { label: 'Action Items', val: totalActions, color: '#f59e0b' },
    { label: 'Items Done', val: doneActions, color: '#10b981' }
  ];
  statsEl.innerHTML = stats.map(s => `
    <div style="padding:10px;background:var(--bg-input);border-radius:var(--radius-sm);text-align:center;">
      <div style="font-size:20px;font-weight:700;color:${s.color};">${s.val}</div>
      <div style="font-size:11px;color:var(--text-muted);">${s.label}</div>
    </div>`).join('');
}

function renderMeetingsList() {
  const el = document.getElementById('meetings-list');
  if (!el) return;
  const today = new Date().toISOString().split('T')[0];
  let filtered = meetings;
  if (meetingFilter === 'upcoming') filtered = meetings.filter(m => m.status === 'upcoming');
  else if (meetingFilter === 'completed') filtered = meetings.filter(m => m.status === 'completed');
  else if (meetingFilter === 'pending-actions') filtered = meetings.filter(m => m.actionItems.some(a => !a.done));

  el.innerHTML = filtered.map(m => {
    const pendingActions = m.actionItems.filter(a => !a.done).length;
    const dtStr = new Date(m.datetime).toLocaleString('en-IN', { dateStyle: 'medium', timeStyle: 'short' });
    const attendanceHtml = m.attendees.map(att => {
      const present = m.attendance[att];
      const statusIcon = present === true ? '✅' : present === false ? '❌' : '⏳';
      const statusColor = present === true ? 'var(--status-success)' : present === false ? 'var(--status-danger)' : 'var(--text-muted)';
      return `<div class="attendee-chip" style="border-color:${statusColor};" onclick="toggleAttendance('${m.id}','${att}')">${statusIcon} ${att}</div>`;
    }).join('');
    const actionsHtml = m.actionItems.map(ai => `
      <div class="action-item-row ${ai.done ? 'done' : ''}">
        <input type="checkbox" ${ai.done ? 'checked' : ''} onchange="toggleActionItem('${m.id}','${ai.id}',this.checked)">
        <div class="action-item-body">
          <span class="action-item-text">${ai.text}</span>
          <span class="action-item-meta">→ ${ai.assignee} · Due ${ai.due}</span>
        </div>
      </div>`).join('');
    return `
      <div class="meeting-card ${m.status}">
        <div class="meeting-card-header">
          <div>
            <h4>${m.title}</h4>
            <span class="meeting-meta">📅 ${dtStr} &nbsp;·&nbsp; 📍 ${m.location}</span>
          </div>
          <div style="display:flex;gap:8px;align-items:center;">
            ${pendingActions > 0 ? `<span class="pending-badge">${pendingActions} pending</span>` : ''}
            <span class="meeting-status-badge ${m.status}">${m.status}</span>
          </div>
        </div>
        <p class="meeting-agenda">📋 ${m.agenda}</p>
        <div class="meeting-section-title">Attendance</div>
        <div class="attendees-wrap">${attendanceHtml}</div>
        <div style="display:flex;justify-content:space-between;align-items:center;margin-top:14px;">
          <div class="meeting-section-title" style="margin-top:0;">Action Items</div>
          <button class="btn btn-sm" onclick="addActionItem('${m.id}')">+ Add Action</button>
        </div>
        <div class="action-items-list">${actionsHtml || '<div style="font-size:12px;color:var(--text-muted);padding:8px 0;">No action items logged yet.</div>'}</div>
      </div>`;
  }).join('') || '<div style="color:var(--text-muted);padding:20px;text-align:center;">No meetings match this filter.</div>';
}

window.filterMeetings = function(filter, btn) {
  meetingFilter = filter;
  document.querySelectorAll('.mtg-filter-btn').forEach(b => b.classList.remove('active'));
  if (btn) btn.classList.add('active');
  renderMeetingsList();
};
window.toggleAttendance = function(meetingId, attendee) {
  const m = meetings.find(x => x.id === meetingId);
  if (!m) return;
  const curr = m.attendance[attendee];
  m.attendance[attendee] = curr === true ? false : curr === false ? undefined : true;
  if (m.attendance[attendee] === undefined) delete m.attendance[attendee];
  renderMeetingsList();
};
window.toggleActionItem = function(meetingId, actionId, done) {
  const m = meetings.find(x => x.id === meetingId);
  if (!m) return;
  const ai = m.actionItems.find(a => a.id === actionId);
  if (ai) { ai.done = done; renderMeetingsList(); updateMeetingStats(); updateNotifications(); }
};
window.addActionItem = function(meetingId) {
  const text = prompt('Action item description:');
  if (!text) return;
  const assignee = prompt('Assign to:', 'Pravan M.');
  if (!assignee) return;
  const due = prompt('Due date (YYYY-MM-DD):', new Date().toISOString().split('T')[0]);
  const m = meetings.find(x => x.id === meetingId);
  if (m) {
    m.actionItems.push({ id: `ai-${Date.now()}`, text, assignee, due: due || '', done: false });
    renderMeetingsList(); updateMeetingStats(); updateNotifications();
  }
};
window.scheduleMeeting = function() {
  const title = document.getElementById('mtg-title').value.trim();
  const datetime = document.getElementById('mtg-datetime').value;
  const location = document.getElementById('mtg-location').value.trim();
  const attendeesRaw = document.getElementById('mtg-attendees').value.trim();
  const agenda = document.getElementById('mtg-agenda').value.trim();
  if (!title || !datetime) { alert('Title and date/time are required.'); return; }
  const attendees = attendeesRaw ? attendeesRaw.split(',').map(s => s.trim()) : [];
  meetings.unshift({ id: `mtg-${Date.now()}`, title, datetime, location, agenda, attendees, attendance: {}, status: 'upcoming', actionItems: [] });
  ['mtg-title','mtg-datetime','mtg-location','mtg-attendees','mtg-agenda'].forEach(id => { const el = document.getElementById(id); if (el) el.value = ''; });
  renderMeetingsView(); updateNotifications();
};

// ============================================================
// === FEATURE 4: COMPLIANCE — Risk Scoring & Escalation    ===
// ============================================================
let compFilterMode = 'all';
function renderComplianceView() {
  updateComplianceCounts();
  renderComplianceList();
  renderComplianceRiskChart();
  updateComplianceBadge();
}

function updateComplianceBadge() {
  const open = complianceIssues.filter(c => c.status !== 'resolved' && (c.risk === 'critical' || c.risk === 'high')).length;
  const badge = document.getElementById('compliance-badge');
  if (badge) { badge.textContent = open; badge.style.display = open > 0 ? 'inline-block' : 'none'; }
}

function updateComplianceCounts() {
  const today = new Date().toISOString().split('T')[0];
  const open = complianceIssues.filter(c => c.status !== 'resolved');
  document.getElementById('comp-critical-count').textContent = open.filter(c => c.risk === 'critical').length;
  document.getElementById('comp-high-count').textContent = open.filter(c => c.risk === 'high').length;
  document.getElementById('comp-medium-count').textContent = open.filter(c => c.risk === 'medium').length;
  document.getElementById('comp-resolved-count').textContent = complianceIssues.filter(c => c.status === 'resolved').length;
}

function renderComplianceList() {
  const el = document.getElementById('compliance-list');
  if (!el) return;
  const today = new Date().toISOString().split('T')[0];
  let filtered = complianceIssues;
  if (compFilterMode === 'critical') filtered = complianceIssues.filter(c => c.risk === 'critical' && c.status !== 'resolved');
  else if (compFilterMode === 'overdue') filtered = complianceIssues.filter(c => c.due < today && c.status !== 'resolved');
  else if (compFilterMode === 'escalated') filtered = complianceIssues.filter(c => c.escalated);

  const riskColors = { critical: '#ef4444', high: '#f59e0b', medium: '#6366f1', low: '#10b981' };
  const riskScore = { critical: 10, high: 7, medium: 4, low: 1 };
  el.innerHTML = filtered.map(c => {
    const isOverdue = c.due < today && c.status !== 'resolved';
    const score = riskScore[c.risk];
    const scoreBars = Array.from({length: 10}, (_, i) => `<div class="risk-score-cell ${i < score ? 'filled' : ''}" style="${i < score ? `background:${riskColors[c.risk]}` : ''}"></div>`).join('');
    return `
      <div class="compliance-card" style="border-left:3px solid ${riskColors[c.risk]};">
        <div class="compliance-card-header">
          <div style="flex:1;">
            <div style="display:flex;align-items:center;gap:8px;margin-bottom:4px;">
              <span class="risk-badge risk-${c.risk}">${c.risk.toUpperCase()}</span>
              ${c.escalated ? '<span class="escalated-badge">🔺 ESCALATED</span>' : ''}
              ${isOverdue ? '<span class="overdue-badge">⏰ OVERDUE</span>' : ''}
              ${c.status === 'resolved' ? '<span class="resolved-badge">✅ Resolved</span>' : ''}
            </div>
            <h4 style="font-size:13px;">${c.title}</h4>
            <p style="font-size:11px;color:var(--text-muted);margin-top:4px;">${c.desc}</p>
          </div>
        </div>
        <div style="display:flex;gap:6px;align-items:center;margin-top:10px;">
          <span style="font-size:10px;color:var(--text-muted);margin-right:4px;">Risk Score:</span>
          <div class="risk-score-track">${scoreBars}</div>
          <span style="font-size:10px;color:${riskColors[c.risk]};font-weight:700;">${score}/10</span>
        </div>
        <div class="comp-meta">
          <span>📁 ${c.category}</span>
          <span>👤 ${c.owner}</span>
          <span>📅 Due: <strong style="color:${isOverdue ? 'var(--status-danger)' : 'var(--text-main)'};">${c.due}</strong></span>
        </div>
        <div style="display:flex;gap:8px;margin-top:10px;flex-wrap:wrap;">
          ${c.status !== 'resolved' ? `<button class="btn btn-sm" style="color:var(--status-success);border-color:var(--status-success);" onclick="resolveCompliance('${c.id}')">Mark Resolved</button>` : ''}
          ${!c.escalated && c.status !== 'resolved' ? `<button class="btn btn-sm" style="color:var(--status-danger);border-color:var(--status-danger);" onclick="escalateCompliance('${c.id}')">Escalate</button>` : ''}
        </div>
      </div>`;
  }).join('') || '<div style="color:var(--text-muted);padding:20px;text-align:center;">No compliance issues match this filter.</div>';
}

function renderComplianceRiskChart() {
  const el = document.getElementById('compliance-risk-chart');
  if (!el) return;
  const cats = {};
  complianceIssues.filter(c => c.status !== 'resolved').forEach(c => { cats[c.category] = (cats[c.category] || 0) + 1; });
  const entries = Object.entries(cats).sort((a,b) => b[1]-a[1]);
  const max = Math.max(...entries.map(e => e[1]), 1);
  const colors = ['#ef4444','#f59e0b','#6366f1','#10b981','#a855f7','#06b6d4'];
  el.innerHTML = entries.map((e, i) => `
    <div style="display:flex;align-items:center;gap:8px;margin-bottom:10px;">
      <span style="font-size:11px;color:var(--text-muted);width:100px;flex-shrink:0;">${e[0]}</span>
      <div style="flex:1;height:12px;background:rgba(255,255,255,0.04);border-radius:6px;overflow:hidden;">
        <div style="height:100%;width:${(e[1]/max)*100}%;background:${colors[i%colors.length]};border-radius:6px;"></div>
      </div>
      <span style="font-size:11px;font-weight:700;color:${colors[i%colors.length]};width:16px;">${e[1]}</span>
    </div>`).join('');
}

window.filterCompliance = function(mode, btn) {
  compFilterMode = mode;
  document.querySelectorAll('.comp-filter').forEach(b => b.classList.remove('active'));
  if (btn) btn.classList.add('active');
  renderComplianceList();
};
window.resolveCompliance = function(id) {
  const c = complianceIssues.find(x => x.id === id);
  if (c) { c.status = 'resolved'; renderComplianceView(); updateNotifications(); }
};
window.escalateCompliance = function(id) {
  const c = complianceIssues.find(x => x.id === id);
  if (c) {
    c.escalated = true;
    c.risk = c.risk === 'medium' ? 'high' : c.risk === 'high' ? 'critical' : c.risk;
    alert(`Issue "${c.title}" has been escalated to ${c.risk.toUpperCase()} priority and flagged for management review.`);
    renderComplianceView(); updateNotifications();
  }
};
window.logComplianceIssue = function() {
  const title = document.getElementById('comp-title').value.trim();
  if (!title) { alert('Title is required.'); return; }
  complianceIssues.unshift({
    id: `ci-${Date.now()}`,
    title,
    category: document.getElementById('comp-category').value,
    risk: document.getElementById('comp-risk').value,
    due: document.getElementById('comp-due').value || '',
    owner: document.getElementById('comp-owner').value || 'Unassigned',
    desc: document.getElementById('comp-desc').value,
    status: 'open', escalated: false,
    createdDate: new Date().toISOString().split('T')[0]
  });
  ['comp-title','comp-due','comp-owner','comp-desc'].forEach(id => { const el = document.getElementById(id); if (el) el.value=''; });
  renderComplianceView(); updateNotifications();
};

// ============================================================
// === FEATURE 5: COMPLAINTS — Categories & Trend Analysis  ===
// ============================================================
let cmplFilter = 'all';
function renderComplaintsView() {
  updateComplaintStats();
  renderComplaintsList();
  renderComplaintsTrendChart();
  renderComplaintsCategoryChart();
  updateComplaintsBadge();
}

function updateComplaintsBadge() {
  const open = complaints.filter(c => c.status !== 'resolved').length;
  const badge = document.getElementById('complaints-badge');
  if (badge) { badge.textContent = open; badge.style.display = open > 0 ? 'inline-block' : 'none'; }
}

function updateComplaintStats() {
  const open = complaints.filter(c => c.status !== 'resolved');
  document.getElementById('cmpl-open-count').textContent = open.length;
  document.getElementById('cmpl-recurring-count').textContent = open.filter(c => c.occurrences >= 2).length;
  document.getElementById('cmpl-resolved-count').textContent = complaints.filter(c => c.status === 'resolved').length;
  const catFreq = {};
  open.forEach(c => { catFreq[c.category] = (catFreq[c.category] || 0) + 1; });
  const topCat = Object.entries(catFreq).sort((a,b)=>b[1]-a[1])[0];
  const topCatEl = document.getElementById('cmpl-top-category');
  if (topCatEl) topCatEl.textContent = topCat ? topCat[0] : '—';
}

function renderComplaintsList() {
  const el = document.getElementById('complaints-list');
  if (!el) return;
  let filtered = complaints;
  if (cmplFilter === 'open') filtered = complaints.filter(c => c.status !== 'resolved');
  else if (cmplFilter === 'recurring') filtered = complaints.filter(c => c.occurrences >= 2);
  const sevColors = { critical: '#ef4444', high: '#f59e0b', medium: '#6366f1', low: '#10b981' };
  el.innerHTML = filtered.map(c => `
    <div class="complaint-row" style="border-left:3px solid ${sevColors[c.severity]};">
      <div style="display:flex;justify-content:space-between;align-items:flex-start;gap:8px;">
        <div style="flex:1;">
          <div style="display:flex;gap:6px;align-items:center;margin-bottom:4px;flex-wrap:wrap;">
            <span class="sev-badge sev-${c.severity}">${c.severity.toUpperCase()}</span>
            <span class="cat-badge">${c.category}</span>
            ${c.occurrences >= 2 ? `<span class="recurring-badge">🔁 Recurring (${c.occurrences}×)</span>` : ''}
            <span style="font-size:10px;color:var(--text-muted);">${c.status}</span>
          </div>
          <strong style="font-size:13px;">${c.title}</strong>
          <p style="font-size:11px;color:var(--text-muted);margin-top:4px;">${c.desc}</p>
          ${c.cause ? `<div style="margin-top:6px;padding:6px 10px;background:rgba(245,158,11,0.08);border-radius:6px;font-size:11px;"><strong style="color:var(--accent-log);">Root Cause:</strong> ${c.cause}</div>` : ''}
        </div>
        <div style="display:flex;flex-direction:column;align-items:flex-end;gap:6px;flex-shrink:0;">
          <span style="font-size:11px;color:var(--text-muted);">${c.date}</span>
          <span style="font-size:11px;color:var(--text-muted);">By: ${c.reporter}</span>
          ${c.status !== 'resolved' ? `<button class="btn btn-sm" style="color:var(--status-success);border-color:var(--status-success);font-size:11px;" onclick="resolveComplaint('${c.id}')">Resolve</button>` : ''}
        </div>
      </div>
    </div>`).join('') || '<div style="color:var(--text-muted);padding:20px;text-align:center;">No complaints found.</div>';
}

function renderComplaintsTrendChart() {
  const el = document.getElementById('complaints-trend-chart');
  if (!el) return;
  // Simulated 6-month trend data by category
  const months = ['Jan','Feb','Mar','Apr','May','Jun'];
  const trendData = {
    Quality:   [3, 4, 2, 5, 3, 4],
    Delivery:  [1, 2, 3, 2, 1, 2],
    Supplier:  [2, 1, 2, 3, 4, 3],
    Process:   [1, 1, 2, 1, 2, 2]
  };
  const colors = { Quality: '#ef4444', Delivery: '#f59e0b', Supplier: '#6366f1', Process: '#10b981' };
  const W = 380, H = 120, padL = 30, padB = 24, padT = 8, padR = 10;
  const allVals = Object.values(trendData).flat();
  const maxV = Math.max(...allVals);
  const scX = i => padL + (i / (months.length-1)) * (W - padL - padR);
  const scY = v => H - padB - ((v / maxV) * (H - padB - padT));
  let lines = '';
  let dots = '';
  Object.entries(trendData).forEach(([cat, vals]) => {
    const pts = vals.map((v,i) => `${scX(i)},${scY(v)}`).join(' ');
    lines += `<polyline points="${pts}" fill="none" stroke="${colors[cat]}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" opacity="0.9"/>`;
    vals.forEach((v, i) => { dots += `<circle cx="${scX(i)}" cy="${scY(v)}" r="3.5" fill="${colors[cat]}"/>`; });
  });
  const gridLines = [0,2,4].map(v => `<line x1="${padL}" y1="${scY(v)}" x2="${W-padR}" y2="${scY(v)}" stroke="rgba(255,255,255,0.05)" stroke-width="1"/><text x="${padL-4}" y="${scY(v)+4}" text-anchor="end" font-size="9" fill="rgba(255,255,255,0.3)">${v}</text>`).join('');
  const xLabels = months.map((m,i) => `<text x="${scX(i)}" y="${H-padB+14}" text-anchor="middle" font-size="9" fill="rgba(255,255,255,0.4)">${m}</text>`).join('');
  const legend = Object.entries(colors).map(([k,v],i) => `<g><rect x="${20 + i*90}" y="0" width="10" height="10" rx="2" fill="${v}"/><text x="${33+i*90}" y="9" font-size="10" fill="rgba(255,255,255,0.6)">${k}</text></g>`).join('');
  el.innerHTML = `<svg viewBox="0 0 ${W} ${H+18}" width="100%">
    <g transform="translate(0,16)">${legend}</g>
    <g transform="translate(0,20)">${gridLines}${lines}${dots}${xLabels}</g>
  </svg>`;
}

function renderComplaintsCategoryChart() {
  const el = document.getElementById('complaints-category-chart');
  if (!el) return;
  const cats = {};
  complaints.forEach(c => { cats[c.category] = (cats[c.category]||0) + 1; });
  const entries = Object.entries(cats).sort((a,b)=>b[1]-a[1]);
  const total = entries.reduce((s,[,v])=>s+v, 0);
  const colors = ['#ef4444','#f59e0b','#6366f1','#10b981','#a855f7','#06b6d4','#f97316'];
  // Donut
  const R = 55, cx = 70, cy = 70, cR = 2*Math.PI*R;
  let offset = 0;
  const segments = entries.map(([cat,val],i) => {
    const pct = val/total;
    const dash = pct * cR;
    const seg = `<circle cx="${cx}" cy="${cy}" r="${R}" fill="none" stroke="${colors[i%colors.length]}" stroke-width="22" stroke-dasharray="${dash} ${cR-dash}" stroke-dashoffset="${-offset*cR}" transform="rotate(-90 ${cx} ${cy})"/>`;
    offset += pct;
    return seg;
  }).join('');
  const legendRows = entries.map(([cat,val],i) => `<div style="display:flex;align-items:center;gap:6px;font-size:11px;margin-bottom:6px;"><div style="width:10px;height:10px;border-radius:2px;background:${colors[i%colors.length]};flex-shrink:0;"></div><span style="color:var(--text-muted);flex:1;">${cat}</span><span style="font-weight:700;color:var(--text-main);">${val}</span></div>`).join('');
  el.innerHTML = `<div style="display:flex;align-items:center;gap:16px;">
    <svg width="140" height="140" viewBox="0 0 140 140">${segments}<circle cx="${cx}" cy="${cy}" r="${R-11}" fill="var(--bg-card)"/><text x="${cx}" y="${cy+4}" text-anchor="middle" font-size="16" font-weight="700" fill="var(--text-main)">${total}</text><text x="${cx}" y="${cy+17}" text-anchor="middle" font-size="9" fill="var(--text-muted)">Total</text></svg>
    <div style="flex:1;">${legendRows}</div>
  </div>`;
}

window.filterComplaints = function(filter, btn) {
  cmplFilter = filter;
  document.querySelectorAll('.cmpl-filter').forEach(b => b.classList.remove('active'));
  if (btn) btn.classList.add('active');
  renderComplaintsList();
};
window.resolveComplaint = function(id) {
  const c = complaints.find(x => x.id === id);
  if (c) { c.status = 'resolved'; renderComplaintsView(); updateNotifications(); }
};
window.logComplaint = function() {
  const title = document.getElementById('cmpl-title').value.trim();
  if (!title) { alert('Title is required.'); return; }
  complaints.unshift({
    id: `cp-${Date.now()}`, title,
    category: document.getElementById('cmpl-category').value,
    severity: document.getElementById('cmpl-severity').value,
    reporter: document.getElementById('cmpl-reporter').value || 'Anonymous',
    cause: document.getElementById('cmpl-cause').value,
    desc: document.getElementById('cmpl-desc').value,
    status: 'open', date: new Date().toISOString().split('T')[0], occurrences: 1
  });
  // Check for recurring
  const cat = document.getElementById('cmpl-category').value;
  const similar = complaints.filter(c => c.category === cat && c.id !== complaints[0].id);
  if (similar.length > 0) {
    const prev = similar.find(c => c.title.toLowerCase().includes(title.split(' ')[0].toLowerCase()));
    if (prev) { prev.occurrences++; complaints[0].occurrences = 2; }
  }
  ['cmpl-title','cmpl-reporter','cmpl-cause','cmpl-desc'].forEach(id => { const el=document.getElementById(id); if(el) el.value=''; });
  renderComplaintsView(); updateNotifications();
};

// ============================================================
// === STUB RENDER FUNCTIONS FOR EXISTING MODULES           ===
// ============================================================
function renderHRView() {
  // Populate employee selects
  const employees = ['Pravan M.', 'Sarah J.', 'Marcus V.', 'Elene R.', 'Ravi K.', 'Anita S.'];
  ['leave-employee-select','new-leave-emp'].forEach(id => {
    const el = document.getElementById(id);
    if (el && !el.options.length) { employees.forEach(e => { const o = document.createElement('option'); o.value=e; o.textContent=e; el.appendChild(o); }); }
  });
  renderLeaveProfile();
  renderLeaveTable();
}

let leaveRecords = [
  { emp: 'Marcus V.', type: 'Sick', from: '2026-06-02', to: '2026-06-03', days: 2, reason: 'Fever' },
  { emp: 'Sarah J.', type: 'Annual', from: '2026-06-05', to: '2026-06-07', days: 3, reason: 'Vacation' },
  { emp: 'Pravan M.', type: 'Casual', from: '2026-06-09', to: '2026-06-09', days: 1, reason: 'Personal work' },
  { emp: 'Elene R.', type: 'Sick', from: '2026-06-10', to: '2026-06-11', days: 2, reason: 'Migraine' },
  { emp: 'Marcus V.', type: 'Casual', from: '2026-06-15', to: '2026-06-15', days: 1, reason: 'Family event' },
  { emp: 'Ravi K.', type: 'Emergency', from: '2026-06-12', to: '2026-06-13', days: 2, reason: 'Family emergency' },
];

function renderLeaveProfile() {
  const sel = document.getElementById('leave-employee-select');
  if (!sel) return;
  const emp = sel.value;
  const section = document.getElementById('leave-profile-section');
  if (!section) return;
  const empRecords = leaveRecords.filter(r => r.emp === emp);
  const freq = { Sick: 0, Casual: 0, Annual: 0, Emergency: 0, Maternity: 0 };
  empRecords.forEach(r => { freq[r.type] = (freq[r.type]||0) + r.days; });
  const maxDays = Math.max(...Object.values(freq), 1);
  const colors = { Sick:'#ef4444', Casual:'#6366f1', Annual:'#10b981', Emergency:'#f59e0b', Maternity:'#a855f7' };
  const total = Object.values(freq).reduce((a,b)=>a+b,0);
  section.innerHTML = `<div style="margin-bottom:10px;"><span style="font-size:22px;font-weight:700;">${total}</span><span style="font-size:12px;color:var(--text-muted);margin-left:6px;">days taken this year</span></div>` +
    Object.entries(freq).map(([type, days]) => `
      <div class="leave-freq-bar">
        <span class="leave-freq-label">${type}</span>
        <div class="leave-freq-track"><div class="leave-freq-fill" style="width:${(days/maxDays)*100}%;background:${colors[type]};"></div></div>
        <span class="leave-freq-count">${days}d</span>
      </div>`).join('');
}

function renderLeaveTable() {
  const tbody = document.getElementById('leave-table-body');
  if (!tbody) return;
  tbody.innerHTML = leaveRecords.slice().reverse().map(r => `
    <tr><td>${r.emp}</td><td>${r.type}</td><td>${r.from}</td><td>${r.to}</td><td>${r.days}</td><td>${r.reason}</td></tr>`).join('');
}

window.logNewLeave = function() {
  const emp = document.getElementById('new-leave-emp').value;
  const type = document.getElementById('new-leave-type').value;
  const from = document.getElementById('new-leave-from').value;
  const to = document.getElementById('new-leave-to').value;
  const reason = document.getElementById('new-leave-reason').value;
  if (!from || !to) { alert('From and To dates are required.'); return; }
  const days = Math.max(1, Math.round((new Date(to)-new Date(from))/(86400000))+1);
  leaveRecords.push({ emp, type, from, to, days, reason });
  renderLeaveTable();
  renderLeaveProfile();
  alert(`Leave logged for ${emp}.`);
};
window.exportLeaveCSV = function() {
  const headers = ['Employee','Type','From','To','Days','Reason'];
  const rows = leaveRecords.map(r => [r.emp,r.type,r.from,r.to,r.days,r.reason].join(','));
  const csv = [headers.join(','), ...rows].join('\n');
  const a = document.createElement('a');
  a.href = 'data:text/csv,' + encodeURIComponent(csv);
  a.download = 'leave_records.csv';
  a.click();
};

let kaizenItems = [
  { id: 'kz-1', title: 'Yarn trolley blocking fire exit', category: 'Sort', location: 'Warehouse B', desc: 'Remove excess trolley stack from fire corridor.', assignee: 'Facilities', targetDate: '2026-06-20', done: false },
  { id: 'kz-2', title: 'Label chemical storage cabinets', category: 'Set in Order', location: 'Warehouse A – Chem Safe', desc: 'All dye/chemical containers must be color-coded and labeled per GOTS.', assignee: 'Marcus V.', targetDate: '2026-06-25', done: false },
  { id: 'kz-3', title: 'Daily loom machine wipe-down SOP', category: 'Shine', location: 'Weaving Floor', desc: 'Implement daily cleaning routine for Loom Machines C1–C6.', assignee: 'Floor Team A', targetDate: '2026-06-22', done: true },
  { id: 'kz-4', title: 'Standardize dye batch records format', category: 'Standardize', location: 'Dyeing Unit', desc: 'Unify batch record format across all dyeing SOPs.', assignee: 'Marcus V.', targetDate: '2026-06-30', done: false },
  { id: 'kz-5', title: '5S audit board — weekly visual check', category: 'Sustain', location: 'All Departments', desc: 'Post visual 5S compliance board per department for daily review.', assignee: 'Pravan M.', targetDate: '2026-07-05', done: false },
];
let kaizenFilterCat = 'all';

function renderKaizenView() {
  const open = kaizenItems.filter(k => !k.done).length;
  const done = kaizenItems.filter(k => k.done).length;
  document.getElementById('kaizen-open-count').textContent = open;
  document.getElementById('kaizen-done-count').textContent = done;
  const score = Math.round((done / Math.max(kaizenItems.length, 1)) * 100);
  document.getElementById('kaizen-5s-score').textContent = score + '%';
  renderKaizenCards();
}

function renderKaizenCards() {
  const el = document.getElementById('kaizen-cards-container');
  if (!el) return;
  let filtered = kaizenItems;
  if (kaizenFilterCat !== 'all') filtered = kaizenItems.filter(k => k.category === kaizenFilterCat);
  const catClass = c => c.replace(' ','-');
  el.innerHTML = filtered.map(k => `
    <div class="kaizen-card">
      <div class="kaizen-card-header">
        <span class="kaizen-s-badge ${catClass(k.category)}">${k.category}</span>
        <button class="kaizen-status-btn ${k.done?'done':''}" onclick="toggleKaizen('${k.id}')">${k.done ? '✓ Done' : 'Mark Done'}</button>
      </div>
      <h4 style="font-size:13px;margin:8px 0 4px;">${k.title}</h4>
      <p style="font-size:11px;color:var(--text-muted);">${k.desc}</p>
      <div class="kaizen-meta"><span>📍 ${k.location}</span><span>👤 ${k.assignee}</span><span>📅 ${k.targetDate}</span></div>
    </div>`).join('') || '<div style="color:var(--text-muted);text-align:center;padding:20px;">No kaizen items in this category.</div>';
}

window.filterKaizen = function(cat, btn) {
  kaizenFilterCat = cat;
  document.querySelectorAll('.kaizen-filter').forEach(b => b.classList.remove('active'));
  if (btn) btn.classList.add('active');
  renderKaizenCards();
};
window.toggleKaizen = function(id) {
  const k = kaizenItems.find(x => x.id === id);
  if (k) { k.done = !k.done; renderKaizenView(); }
};
window.logKaizen = function() {
  const title = document.getElementById('kz-title').value.trim();
  if (!title) { alert('Title is required.'); return; }
  kaizenItems.unshift({ id:`kz-${Date.now()}`, title, category: document.getElementById('kz-category').value, location: document.getElementById('kz-location').value, desc: document.getElementById('kz-desc').value, assignee: document.getElementById('kz-assignee').value, targetDate: document.getElementById('kz-target-date').value, done: false });
  ['kz-title','kz-location','kz-desc','kz-assignee','kz-target-date'].forEach(id => { const el=document.getElementById(id); if(el) el.value=''; });
  renderKaizenView();
};

// ============================================================
// === GLOBAL NOTIFICATION ENGINE                           ===
// ============================================================
function initNotifications() { updateNotifications(); }

function updateNotifications() {
  const today = new Date().toISOString().split('T')[0];
  const items = [];

  // Overdue compliance
  complianceIssues.filter(c => c.status !== 'resolved' && c.due < today).forEach(c => {
    items.push({ type: 'compliance', icon: '⚠️', title: `Compliance Overdue: ${c.title.substring(0,40)}...`, body: `Risk: ${c.risk.toUpperCase()} · Due: ${c.due}`, tab: 'compliance' });
  });

  // Pending meeting actions (overdue)
  meetings.flatMap(m => m.actionItems.filter(a => !a.done && a.due < today)).forEach(ai => {
    items.push({ type: 'meeting', icon: '📋', title: `Action Overdue: ${ai.text.substring(0,40)}`, body: `Assigned to ${ai.assignee} · Due ${ai.due}`, tab: 'meetings' });
  });

  // Upcoming announcement follow-ups (within 3 days)
  const in3 = new Date(); in3.setDate(in3.getDate()+3);
  const in3Str = in3.toISOString().split('T')[0];
  announcements.filter(a => a.reminderDate && a.reminderDate >= today && a.reminderDate <= in3Str).forEach(a => {
    items.push({ type: 'announce', icon: '🔔', title: `Reminder Due: ${a.title.substring(0,40)}`, body: `Follow-up date: ${a.reminderDate}`, tab: 'announcements' });
  });

  // Recurring complaints
  complaints.filter(c => c.occurrences >= 2 && c.status !== 'resolved').forEach(c => {
    items.push({ type: 'complaint', icon: '🔁', title: `Recurring Complaint: ${c.title.substring(0,35)}`, body: `Occurred ${c.occurrences}x · Category: ${c.category}`, tab: 'complaints' });
  });

  // Critical compliance not escalated
  complianceIssues.filter(c => c.risk === 'critical' && !c.escalated && c.status !== 'resolved').forEach(c => {
    items.push({ type: 'compliance', icon: '🚨', title: `Critical Unescalated: ${c.title.substring(0,35)}`, body: `Consider escalation now`, tab: 'compliance' });
  });

  // Update bell badge
  const countEl = document.getElementById('notif-count');
  if (countEl) { countEl.textContent = items.length; countEl.classList.toggle('visible', items.length > 0); }

  // Populate drawer
  const list = document.getElementById('notif-list');
  if (list) {
    list.innerHTML = items.length === 0
      ? '<div style="color:var(--text-muted);font-size:13px;text-align:center;padding:24px;">No pending reminders. All clear! ✅</div>'
      : items.map(n => `
          <div class="notif-item type-${n.type}" onclick="navigateToTab('${n.tab}');toggleNotifPanel()">
            <h4>${n.icon} ${n.title}</h4>
            <p>${n.body}</p>
            <div class="notif-time">Tap to view →</div>
          </div>`).join('');
  }

  // Update sidebar badge counts
  const meetBadge = document.getElementById('meetings-badge');
  const pendingMeetActions = meetings.flatMap(m => m.actionItems.filter(a => !a.done)).length;
  if (meetBadge) { meetBadge.textContent = pendingMeetActions; meetBadge.style.display = pendingMeetActions > 0 ? 'inline-block' : 'none'; }

  const compBadge = document.getElementById('compliance-badge');
  const openCritComp = complianceIssues.filter(c => c.status !== 'resolved' && (c.risk === 'critical' || c.risk === 'high')).length;
  if (compBadge) { compBadge.textContent = openCritComp; compBadge.style.display = openCritComp > 0 ? 'inline-block' : 'none'; }

  const cmplBadge = document.getElementById('complaints-badge');
  const openCmpls = complaints.filter(c => c.status !== 'resolved').length;
  if (cmplBadge) { cmplBadge.textContent = openCmpls; cmplBadge.style.display = openCmpls > 0 ? 'inline-block' : 'none'; }
}

window.toggleNotifPanel = function() {
  const drawer = document.getElementById('notif-drawer');
  const overlay = document.getElementById('notif-overlay');
  if (drawer) drawer.classList.toggle('open');
  if (overlay) overlay.classList.toggle('visible');
  updateNotifications();
};

// ============================================================
// === ENHANCEMENT 1: KPI TRENDS, DEPT ANALYTICS, INSIGHTS ===
// ============================================================

const kpiData = {
  production: { values: [82, 88, 79, 91, 85, 94], label: 'units/day avg' },
  inventory:  { values: [72, 68, 65, 70, 63, 60], label: 'turnover %' },
  otd:        { values: [78, 81, 80, 85, 88, 91], label: 'on-time %' },
  defect:     { values: [3.2, 2.8, 3.5, 2.9, 3.1, 3.8], label: 'defect rate %' }
};

const deptData = [
  { dept: 'Dyeing',     score: 61, prev: 74, issues: 2 },
  { dept: 'Weaving',    score: 82, prev: 78, issues: 0 },
  { dept: 'Cutting',    score: 77, prev: 80, issues: 1 },
  { dept: 'Finishing',  score: 90, prev: 85, issues: 0 },
  { dept: 'QC',         score: 68, prev: 72, issues: 1 },
  { dept: 'Logistics',  score: 55, prev: 65, issues: 3 }
];

function drawSparkline(containerId, values, color, isInverted) {
  const el = document.getElementById(containerId);
  if (!el) return;
  const W = 260, H = 56, pad = 6;
  const min = Math.min(...values), max = Math.max(...values);
  const range = max - min || 1;
  const pts = values.map((v, i) => {
    const x = pad + (i / (values.length - 1)) * (W - pad * 2);
    const y = H - pad - ((v - min) / range) * (H - pad * 2);
    return `${x},${y}`;
  });
  const trend = values[values.length - 1] > values[values.length - 2];
  const lineColor = isInverted ? (trend ? '#ef4444' : '#10b981') : (trend ? '#10b981' : '#ef4444');
  const gradId = containerId + '-grad';
  el.innerHTML = `<svg viewBox="0 0 ${W} ${H}" width="100%" height="${H}" style="display:block;">
    <defs>
      <linearGradient id="${gradId}" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stop-color="${lineColor}" stop-opacity="0.25"/>
        <stop offset="100%" stop-color="${lineColor}" stop-opacity="0"/>
      </linearGradient>
    </defs>
    <polygon points="${pts.join(' ')} ${W-pad},${H} ${pad},${H}" fill="url(#${gradId})"/>
    <polyline points="${pts.join(' ')}" fill="none" stroke="${lineColor}" stroke-width="2" stroke-linejoin="round" stroke-linecap="round"/>
    ${values.map((v, i) => {
      const x = pad + (i / (values.length - 1)) * (W - pad * 2);
      const y = H - pad - ((v - min) / range) * (H - pad * 2);
      return i === values.length - 1 ? `<circle cx="${x}" cy="${y}" r="3.5" fill="${lineColor}" stroke="var(--bg-card)" stroke-width="1.5"/>` : '';
    }).join('')}
    <text x="${W - pad}" y="${H - 4}" text-anchor="end" font-size="11" fill="${lineColor}" font-weight="700">${values[values.length-1]}</text>
  </svg>`;
}

function drawDeptChart() {
  const el = document.getElementById('dept-analytics-chart');
  if (!el) return;
  const W = 420, H = 180, barH = 18, gap = 8, labelW = 72, pad = 10;
  const max = 100;
  let html = `<svg viewBox="0 0 ${W} ${H}" width="100%" style="display:block;overflow:visible;">`;
  deptData.forEach((d, i) => {
    const y = pad + i * (barH + gap);
    const prevW = (d.prev / max) * (W - labelW - 60);
    const currW = (d.score / max) * (W - labelW - 60);
    const color = d.score >= 80 ? '#10b981' : d.score >= 65 ? '#f59e0b' : '#ef4444';
    const delta = d.score - d.prev;
    const deltaStr = (delta >= 0 ? '+' : '') + delta;
    const deltaColor = delta >= 0 ? '#10b981' : '#ef4444';
    html += `
      <text x="0" y="${y + barH - 4}" font-size="10" fill="var(--text-muted)" font-family="var(--font-body)">${d.dept}</text>
      <rect x="${labelW}" y="${y}" width="${prevW}" height="${barH}" rx="3" fill="rgba(255,255,255,0.04)"/>
      <rect x="${labelW}" y="${y}" width="${currW}" height="${barH}" rx="3" fill="${color}" opacity="0.85"/>
      <text x="${labelW + currW + 6}" y="${y + barH - 4}" font-size="10" fill="${color}" font-weight="700">${d.score}</text>
      <text x="${labelW + currW + 28}" y="${y + barH - 4}" font-size="9" fill="${deltaColor}">${deltaStr}</text>
    `;
  });
  html += '</svg>';
  el.innerHTML = html;
}

function renderDashboardInsights() {
  const el = document.getElementById('dashboard-insights-container');
  if (!el) return;
  const insights = [];
  const lowStock = inventory.filter(i => i.quantity <= i.reorderLevel);
  if (lowStock.length > 0) insights.push({ type: 'warning', icon: '📦', text: `${lowStock.length} material${lowStock.length > 1 ? 's' : ''} below reorder level — risk of production stoppage within 7–14 days.`, action: 'inventory' });
  const critShip = shipments.filter(s => s.status === 'critical');
  if (critShip.length > 0) insights.push({ type: 'danger', icon: '🚢', text: `${critShip[0].name} is CRITICAL at ${critShip[0].currentStage}. Expedite or reroute before stock impact.`, action: 'logistics' });
  const openComp = complianceIssues.filter(c => c.status !== 'resolved' && c.risk === 'critical');
  if (openComp.length > 0) insights.push({ type: 'danger', icon: '⚖️', text: `${openComp.length} critical compliance issue${openComp.length > 1 ? 's' : ''} unresolved. Consider immediate escalation.`, action: 'compliance' });
  const dyeingDept = deptData.find(d => d.dept === 'Dyeing');
  if (dyeingDept && dyeingDept.score < 65) insights.push({ type: 'warning', icon: '🏭', text: `Dyeing department performance dropped ${Math.abs(dyeingDept.score - dyeingDept.prev)}pts vs last quarter. Investigate process deviations.`, action: 'kaizen' });
  const recurringCmpls = complaints.filter(c => c.occurrences >= 2 && c.status !== 'resolved');
  if (recurringCmpls.length > 0) insights.push({ type: 'info', icon: '🔁', text: `${recurringCmpls.length} recurring complaint pattern detected in "${recurringCmpls[0].category}". Root cause analysis recommended.`, action: 'complaints' });
  const pendingActions = meetings.flatMap(m => m.actionItems.filter(a => !a.done));
  if (pendingActions.length >= 3) insights.push({ type: 'info', icon: '📋', text: `${pendingActions.length} meeting action items pending completion. Review accountability in Meetings tab.`, action: 'meetings' });
  if (insights.length === 0) insights.push({ type: 'success', icon: '✅', text: 'All KPIs within acceptable range. No immediate action required.', action: null });

  const colorMap = { danger: '#ef4444', warning: '#f59e0b', info: '#6366f1', success: '#10b981' };
  el.innerHTML = insights.slice(0, 5).map(ins => `
    <div class="insight-card" style="border-left:3px solid ${colorMap[ins.type]};" onclick="${ins.action ? `navigateToTab('${ins.action}')` : ''}">
      <span style="font-size:16px;">${ins.icon}</span>
      <p style="font-size:12px;color:var(--text-main);flex:1;">${ins.text}</p>
      ${ins.action ? `<span style="font-size:10px;color:${colorMap[ins.type]};white-space:nowrap;cursor:pointer;">View →</span>` : ''}
    </div>`).join('');
}

function renderKPITrends() {
  drawSparkline('kpi-prod-sparkline', kpiData.production.values, '#10b981', false);
  drawSparkline('kpi-inv-sparkline', kpiData.inventory.values, '#6366f1', true);
  drawSparkline('kpi-otd-sparkline', kpiData.otd.values, '#06b6d4', false);
  drawSparkline('kpi-defect-sparkline', kpiData.defect.values, '#ef4444', true);
  const vals = kpiData.production.values;
  const delta = ((vals[vals.length-1] - vals[vals.length-2]) / vals[vals.length-2] * 100).toFixed(1);
  const prodDelta = document.getElementById('kpi-prod-delta');
  if (prodDelta) { prodDelta.textContent = (delta >= 0 ? '↑' : '↓') + ' ' + Math.abs(delta) + '%'; prodDelta.className = 'kpi-trend-delta ' + (delta >= 0 ? 'positive' : 'negative'); }
  drawDeptChart();
  renderDashboardInsights();
}

// ============================================================
// === ENHANCEMENT 2: ANNOUNCEMENTS — Enhanced Read Receipts ==
// ============================================================

// Patch into existing renderAnnouncementsView to add recipient list modal
window.viewReadReceipts = function(annId) {
  const a = announcements.find(x => x.id === annId);
  if (!a) return;
  const unread = a.totalRecipients - a.readBy.length;
  alert(`Read Receipts for "${a.title}"\n\nRead by (${a.readBy.length}): ${a.readBy.join(', ')}\nPending (${unread}): ${unread} recipients haven't opened yet.\n\nAcknowledged by (${a.ackBy.length}): ${a.ackBy.join(', ')}`);
};

// ============================================================
// === ENHANCEMENT 3: MEETINGS — Attendance Rate Tracking   ===
// ============================================================

function getMeetingAttendanceRate(m) {
  if (!m.attendees.length) return null;
  const present = m.attendees.filter(a => m.attendance[a] === true).length;
  return Math.round((present / m.attendees.length) * 100);
}

// Augment meeting card render to show attendance rate
const _origRenderMeetingsList = renderMeetingsList;
function renderMeetingsList() {
  const el = document.getElementById('meetings-list');
  if (!el) return;
  let filtered = meetings;
  if (meetingFilter === 'upcoming') filtered = meetings.filter(m => m.status === 'upcoming');
  else if (meetingFilter === 'completed') filtered = meetings.filter(m => m.status === 'completed');
  else if (meetingFilter === 'pending-actions') filtered = meetings.filter(m => m.actionItems.some(a => !a.done));
  const today = new Date().toISOString().split('T')[0];

  el.innerHTML = filtered.map(m => {
    const pendingActions = m.actionItems.filter(a => !a.done).length;
    const overdueActions = m.actionItems.filter(a => !a.done && a.due && a.due < today).length;
    const dtStr = new Date(m.datetime).toLocaleString('en-IN', { dateStyle: 'medium', timeStyle: 'short' });
    const attendanceRate = getMeetingAttendanceRate(m);
    const attendanceHtml = m.attendees.map(att => {
      const present = m.attendance[att];
      const statusIcon = present === true ? '✅' : present === false ? '❌' : '⏳';
      const statusColor = present === true ? 'var(--status-success)' : present === false ? 'var(--status-danger)' : 'var(--text-muted)';
      return `<div class="attendee-chip" style="border-color:${statusColor};" onclick="toggleAttendance('${m.id}','${att}')">${statusIcon} ${att}</div>`;
    }).join('');
    const actionsHtml = m.actionItems.map(ai => {
      const isOverdue = !ai.done && ai.due && ai.due < today;
      return `
        <div class="action-item-row ${ai.done ? 'done' : ''} ${isOverdue ? 'overdue' : ''}">
          <input type="checkbox" ${ai.done ? 'checked' : ''} onchange="toggleActionItem('${m.id}','${ai.id}',this.checked)">
          <div class="action-item-body">
            <span class="action-item-text">${ai.text}</span>
            <span class="action-item-meta ${isOverdue ? 'overdue-text' : ''}">→ ${ai.assignee} · Due ${ai.due}${isOverdue ? ' ⚠️ OVERDUE' : ''}</span>
          </div>
        </div>`;
    }).join('');
    return `
      <div class="meeting-card ${m.status}">
        <div class="meeting-card-header">
          <div>
            <h4>${m.title}</h4>
            <span class="meeting-meta">📅 ${dtStr} &nbsp;·&nbsp; 📍 ${m.location}</span>
          </div>
          <div style="display:flex;gap:8px;align-items:center;flex-wrap:wrap;">
            ${overdueActions > 0 ? `<span class="pending-badge" style="background:rgba(239,68,68,0.15);color:#ef4444;">${overdueActions} overdue</span>` : ''}
            ${pendingActions > 0 ? `<span class="pending-badge">${pendingActions} pending</span>` : ''}
            <span class="meeting-status-badge ${m.status}">${m.status}</span>
            ${attendanceRate !== null ? `<span class="attendance-rate-badge">${attendanceRate}% attended</span>` : ''}
          </div>
        </div>
        <p class="meeting-agenda">📋 ${m.agenda}</p>
        <div class="meeting-section-title">Attendance <span style="font-size:10px;color:var(--text-muted);">(click to toggle)</span></div>
        <div class="attendees-wrap">${attendanceHtml || '<span style="font-size:12px;color:var(--text-muted);">No attendees listed.</span>'}</div>
        ${attendanceRate !== null ? `
          <div class="attendance-bar-wrap">
            <div class="attendance-bar-track"><div class="attendance-bar-fill" style="width:${attendanceRate}%;background:${attendanceRate >= 75 ? '#10b981' : attendanceRate >= 50 ? '#f59e0b' : '#ef4444'};"></div></div>
            <span style="font-size:10px;color:var(--text-muted);">${m.attendees.filter(a=>m.attendance[a]===true).length}/${m.attendees.length} present</span>
          </div>` : ''}
        <div style="display:flex;justify-content:space-between;align-items:center;margin-top:14px;">
          <div class="meeting-section-title" style="margin-top:0;">Action Items</div>
          <div style="display:flex;gap:6px;">
            <button class="btn btn-sm" onclick="completeMeeting('${m.id}')" style="font-size:10px;">Mark Complete</button>
            <button class="btn btn-sm" onclick="addActionItem('${m.id}')">+ Add Action</button>
          </div>
        </div>
        <div class="action-items-list">${actionsHtml || '<div style="font-size:12px;color:var(--text-muted);padding:8px 0;">No action items logged yet.</div>'}</div>
      </div>`;
  }).join('') || '<div style="color:var(--text-muted);padding:20px;text-align:center;">No meetings match this filter.</div>';
}

window.completeMeeting = function(id) {
  const m = meetings.find(x => x.id === id);
  if (m) { m.status = 'completed'; renderMeetingsView(); updateNotifications(); }
};

// ============================================================
// === ENHANCEMENT 4: COMPLIANCE — Auto Escalation Engine   ===
// ============================================================

function runComplianceAutoEscalation() {
  const today = new Date().toISOString().split('T')[0];
  let escalated = 0;
  complianceIssues.forEach(c => {
    if (c.status === 'resolved' || c.escalated) return;
    const dueDate = new Date(c.due);
    const todayDate = new Date(today);
    const daysOverdue = Math.floor((todayDate - dueDate) / 86400000);
    // Auto-escalate: critical items immediately, high after 2 days overdue, medium after 5 days
    const shouldEscalate =
      (c.risk === 'critical' && daysOverdue >= 0) ||
      (c.risk === 'high' && daysOverdue >= 2) ||
      (c.risk === 'medium' && daysOverdue >= 5);
    if (shouldEscalate) { c.escalated = true; escalated++; }
  });
  return escalated;
}

function renderComplianceRiskChart() {
  const el = document.getElementById('compliance-risk-chart');
  if (!el) return;
  // Stacked risk breakdown by category
  const cats = {};
  const riskLevels = ['critical','high','medium','low'];
  const riskColors = { critical:'#ef4444', high:'#f59e0b', medium:'#6366f1', low:'#10b981' };
  complianceIssues.filter(c => c.status !== 'resolved').forEach(c => {
    if (!cats[c.category]) cats[c.category] = { critical:0, high:0, medium:0, low:0, total:0 };
    cats[c.category][c.risk]++;
    cats[c.category].total++;
  });
  const entries = Object.entries(cats).sort((a,b) => b[1].total - a[1].total);
  if (entries.length === 0) { el.innerHTML = '<div style="color:var(--text-muted);font-size:12px;text-align:center;padding:16px;">No open issues</div>'; return; }
  const maxTotal = Math.max(...entries.map(e => e[1].total));
  el.innerHTML = entries.map(([cat, counts]) => {
    const bars = riskLevels.map(r => counts[r] > 0 ? `<div style="height:100%;width:${(counts[r]/maxTotal)*100}%;background:${riskColors[r]};display:inline-block;"></div>` : '').join('');
    return `
      <div style="display:flex;align-items:center;gap:8px;margin-bottom:10px;">
        <span style="font-size:11px;color:var(--text-muted);width:90px;flex-shrink:0;">${cat}</span>
        <div style="flex:1;height:14px;background:rgba(255,255,255,0.04);border-radius:4px;overflow:hidden;display:flex;">${bars}</div>
        <span style="font-size:11px;font-weight:700;color:var(--text-main);width:16px;">${counts.total}</span>
      </div>`;
  }).join('') + `<div style="display:flex;gap:12px;margin-top:12px;flex-wrap:wrap;">${riskLevels.map(r=>`<span style="font-size:10px;display:flex;align-items:center;gap:4px;"><span style="width:8px;height:8px;border-radius:50%;background:${riskColors[r]};display:inline-block;"></span>${r}</span>`).join('')}</div>`;
}

// Override compliance list render with enhanced version
function renderComplianceList() {
  const el = document.getElementById('compliance-list');
  if (!el) return;
  const today = new Date().toISOString().split('T')[0];
  let filtered = complianceIssues;
  if (compFilterMode === 'critical') filtered = complianceIssues.filter(c => c.risk === 'critical' && c.status !== 'resolved');
  else if (compFilterMode === 'overdue') filtered = complianceIssues.filter(c => c.due && c.due < today && c.status !== 'resolved');
  else if (compFilterMode === 'escalated') filtered = complianceIssues.filter(c => c.escalated);

  const riskColors = { critical:'#ef4444', high:'#f59e0b', medium:'#6366f1', low:'#10b981' };
  const riskScore = { critical:10, high:7, medium:4, low:1 };
  el.innerHTML = filtered.map(c => {
    const dueDate = c.due ? new Date(c.due) : null;
    const todayDate = new Date(today);
    const isOverdue = dueDate && dueDate < todayDate && c.status !== 'resolved';
    const daysOverdue = isOverdue ? Math.floor((todayDate - dueDate) / 86400000) : 0;
    const score = riskScore[c.risk];
    const scoreBars = Array.from({length:10}, (_,i) => `<div class="risk-score-cell ${i<score?'filled':''}" style="${i<score?`background:${riskColors[c.risk]}`:''};"></div>`).join('');
    return `
      <div class="compliance-card" style="border-left:3px solid ${riskColors[c.risk]};">
        <div class="compliance-card-header">
          <div style="flex:1;">
            <div style="display:flex;align-items:center;gap:6px;margin-bottom:4px;flex-wrap:wrap;">
              <span class="risk-badge risk-${c.risk}">${c.risk.toUpperCase()}</span>
              ${c.escalated ? '<span class="escalated-badge">🔺 ESCALATED</span>' : ''}
              ${isOverdue ? `<span class="overdue-badge">⏰ ${daysOverdue}d OVERDUE</span>` : ''}
              ${c.status === 'resolved' ? '<span class="resolved-badge">✅ Resolved</span>' : ''}
            </div>
            <h4 style="font-size:13px;">${c.title}</h4>
            <p style="font-size:11px;color:var(--text-muted);margin-top:4px;">${c.desc}</p>
          </div>
        </div>
        <div style="display:flex;gap:6px;align-items:center;margin-top:10px;">
          <span style="font-size:10px;color:var(--text-muted);margin-right:4px;">Risk Score:</span>
          <div class="risk-score-track">${scoreBars}</div>
          <span style="font-size:10px;color:${riskColors[c.risk]};font-weight:700;">${score}/10</span>
        </div>
        <div class="comp-meta">
          <span>📁 ${c.category}</span><span>👤 ${c.owner}</span>
          <span>📅 Due: <strong style="color:${isOverdue?'var(--status-danger)':'var(--text-main)'};">${c.due || '—'}</strong></span>
          ${isOverdue && !c.escalated ? `<button class="btn btn-sm auto-escalate-hint" onclick="escalateCompliance('${c.id}')">Auto-Escalate Now</button>` : ''}
        </div>
        <div style="display:flex;gap:8px;margin-top:10px;flex-wrap:wrap;">
          ${c.status !== 'resolved' ? `<button class="btn btn-sm" style="color:var(--status-success);border-color:var(--status-success);" onclick="resolveCompliance('${c.id}')">Mark Resolved</button>` : ''}
          ${!c.escalated && c.status !== 'resolved' ? `<button class="btn btn-sm" style="color:var(--status-danger);border-color:var(--status-danger);" onclick="escalateCompliance('${c.id}')">Escalate</button>` : ''}
        </div>
      </div>`;
  }).join('') || '<div style="color:var(--text-muted);padding:20px;text-align:center;">No compliance issues match this filter.</div>';
}

// ============================================================
// === ENHANCEMENT 5: COMPLAINTS — Trend + Root Cause       ===
// ============================================================

function renderComplaintsTrendChart() {
  const el = document.getElementById('complaints-trend-chart');
  if (!el) return;
  const months = ['Jan','Feb','Mar','Apr','May','Jun'];
  // Simulate monthly complaint volumes
  const data = [4, 7, 5, 9, 6, complaints.filter(c=>c.status!=='resolved').length + 2];
  const W = 360, H = 100, padL = 30, padB = 24, padT = 10;
  const max = Math.max(...data, 1);
  const pts = data.map((v, i) => {
    const x = padL + (i / (data.length - 1)) * (W - padL - 10);
    const y = padT + ((max - v) / max) * (H - padB - padT);
    return { x, y, v };
  });
  const polyline = pts.map(p => `${p.x},${p.y}`).join(' ');
  const areaPoints = `${pts[0].x},${H - padB} ` + polyline + ` ${pts[pts.length-1].x},${H-padB}`;
  const dots = pts.map((p, i) => `
    <circle cx="${p.x}" cy="${p.y}" r="4" fill="#f59e0b" stroke="var(--bg-card)" stroke-width="1.5"/>
    <text x="${p.x}" y="${p.y - 8}" text-anchor="middle" font-size="9" fill="#f59e0b" font-weight="700">${p.v}</text>
    <text x="${p.x}" y="${H - 6}" text-anchor="middle" font-size="8" fill="var(--text-muted)">${months[i]}</text>
  `).join('');
  el.innerHTML = `<svg viewBox="0 0 ${W} ${H}" width="100%" style="display:block;">
    <defs><linearGradient id="ctrend-grad" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#f59e0b" stop-opacity="0.2"/>
      <stop offset="100%" stop-color="#f59e0b" stop-opacity="0"/>
    </linearGradient></defs>
    <polygon points="${areaPoints}" fill="url(#ctrend-grad)"/>
    <polyline points="${polyline}" fill="none" stroke="#f59e0b" stroke-width="2" stroke-linejoin="round"/>
    ${Array.from({length:4},(_,i)=>{const y=padT+(i/3)*(H-padB-padT);return`<line x1="${padL}" y1="${y}" x2="${W-10}" y2="${y}" stroke="rgba(255,255,255,0.03)" stroke-width="1"/><text x="${padL-4}" y="${y+4}" text-anchor="end" font-size="8" fill="var(--text-muted)">${Math.round(max-i*(max/3))}</text>`;}).join('')}
    ${dots}
  </svg>`;
}

function renderComplaintsCategoryChart() {
  const el = document.getElementById('complaints-category-chart');
  if (!el) return;
  const cats = {};
  complaints.forEach(c => { cats[c.category] = (cats[c.category] || 0) + 1; });
  const total = complaints.length || 1;
  const entries = Object.entries(cats).sort((a,b) => b[1]-a[1]);
  const colors = ['#ef4444','#f59e0b','#6366f1','#06b6d4','#a855f7','#10b981'];
  const maxVal = Math.max(...entries.map(e=>e[1]),1);
  el.innerHTML = entries.map((e,i) => {
    const pct = Math.round((e[1]/total)*100);
    const recurrenceCount = complaints.filter(c=>c.category===e[0] && c.occurrences>=2).length;
    return `
      <div style="margin-bottom:12px;">
        <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:4px;">
          <span style="font-size:12px;color:var(--text-main);">${e[0]}</span>
          <div style="display:flex;gap:8px;align-items:center;">
            ${recurrenceCount > 0 ? `<span style="font-size:10px;color:#f59e0b;background:rgba(245,158,11,0.1);padding:1px 6px;border-radius:10px;">🔁 ${recurrenceCount} recurring</span>` : ''}
            <span style="font-size:11px;font-weight:700;color:${colors[i%colors.length]};">${e[1]} (${pct}%)</span>
          </div>
        </div>
        <div style="height:10px;background:rgba(255,255,255,0.04);border-radius:5px;overflow:hidden;">
          <div style="height:100%;width:${(e[1]/maxVal)*100}%;background:${colors[i%colors.length]};border-radius:5px;transition:width 0.5s;"></div>
        </div>
      </div>`;
  }).join('') || '<div style="color:var(--text-muted);font-size:12px;">No complaints yet.</div>';
}

// Override complaint list render with root cause analysis
function renderComplaintsList() {
  const el = document.getElementById('complaints-list');
  if (!el) return;
  let filtered = complaints;
  if (cmplFilter === 'open') filtered = complaints.filter(c => c.status !== 'resolved');
  else if (cmplFilter === 'recurring') filtered = complaints.filter(c => c.occurrences >= 2);
  const sevColors = { critical:'#ef4444', high:'#f59e0b', medium:'#6366f1', low:'#10b981' };
  el.innerHTML = filtered.map(c => {
    // Root cause pattern detection
    const sameRootCause = complaints.filter(x => x.id !== c.id && x.rootCause && c.rootCause && x.rootCause.toLowerCase().includes(c.rootCause.split(' ')[0].toLowerCase()));
    const rootCauseInsight = sameRootCause.length > 0 ? `<div style="margin-top:6px;padding:6px 10px;background:rgba(245,158,11,0.08);border-radius:6px;border-left:2px solid #f59e0b;font-size:11px;color:#f59e0b;">🔍 Similar root cause found in ${sameRootCause.length} other complaint(s) — systemic issue likely.</div>` : '';
    return `
      <div class="complaint-row" style="border-left:3px solid ${sevColors[c.severity]};">
        <div style="display:flex;justify-content:space-between;align-items:flex-start;gap:8px;">
          <div style="flex:1;">
            <div style="display:flex;gap:6px;align-items:center;margin-bottom:4px;flex-wrap:wrap;">
              <span class="sev-badge sev-${c.severity}">${c.severity.toUpperCase()}</span>
              <span class="cat-badge">${c.category}</span>
              ${c.occurrences >= 2 ? `<span class="recurring-badge">🔁 Recurring (${c.occurrences}×)</span>` : ''}
              <span style="font-size:10px;color:var(--text-muted);">${c.status}</span>
            </div>
            <strong style="font-size:13px;">${c.title}</strong>
            <p style="font-size:11px;color:var(--text-muted);margin-top:4px;">${c.desc}</p>
            ${c.rootCause ? `<div style="font-size:11px;margin-top:4px;"><span style="color:var(--text-muted);">Root Cause: </span><strong style="color:var(--text-main);">${c.rootCause}</strong></div>` : ''}
            ${rootCauseInsight}
          </div>
          <div style="display:flex;flex-direction:column;gap:6px;align-items:flex-end;">
            <span style="font-size:10px;color:var(--text-muted);">${c.reporter}</span>
            <span style="font-size:10px;color:var(--text-muted);">${c.date}</span>
          </div>
        </div>
        <div style="display:flex;gap:8px;margin-top:10px;">
          ${c.status !== 'resolved' ? `<button class="btn btn-sm" style="color:var(--status-success);border-color:var(--status-success);" onclick="resolveComplaint('${c.id}')">Resolve</button>` : '<span style="font-size:11px;color:var(--status-success);">✓ Resolved</span>'}
          <button class="btn btn-sm" onclick="markRecurring('${c.id}')">+1 Occurrence</button>
        </div>
      </div>`;
  }).join('') || '<div style="color:var(--text-muted);padding:20px;text-align:center;font-size:13px;">No complaints match this filter.</div>';
}

window.filterComplaints = function(filter, btn) {
  cmplFilter = filter;
  document.querySelectorAll('.cmpl-filter').forEach(b => b.classList.remove('active'));
  if (btn) btn.classList.add('active');
  renderComplaintsList();
};
window.resolveComplaint = function(id) {
  const c = complaints.find(x => x.id === id);
  if (c) { c.status = 'resolved'; renderComplaintsView(); updateNotifications(); }
};
window.markRecurring = function(id) {
  const c = complaints.find(x => x.id === id);
  if (c) { c.occurrences = (c.occurrences || 1) + 1; renderComplaintsView(); updateNotifications(); }
};

// ============================================================
// === PATCH: Hook renderDashboardView to include new sections =
// ============================================================
const _origRenderDashboard = renderDashboardView;
function renderDashboardView() {
  _origRenderDashboard();
  renderKPITrends();
}

// ============================================================
// === PATCH: Hook renderCurrentView for new tabs            ===
// ============================================================
const _origRenderCurrentView = renderCurrentView;
function renderCurrentView() {
  _origRenderCurrentView();
  // Run auto-escalation silently on every render
  runComplianceAutoEscalation();
  updateNotifications();
}

// ============================================================
// === PATCH: DOMContentLoaded — run new initializers        ===
// ============================================================
document.addEventListener('DOMContentLoaded', () => {
  // KPI trends are rendered in renderDashboardView call above
  // Run auto-escalation on boot
  setTimeout(() => {
    runComplianceAutoEscalation();
    updateNotifications();
  }, 200);
});
