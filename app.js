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
