// State Engine Object managing data pipelines
const appState = {
  activeTab: 'dashboard',
  selectedInventorySku: null,
  activeShipmentId: 'SH-908',
  uploadedAnnouncementFile: null,
  
  // Material Inventory Initial Dataset
  inventory: [
    { sku: 'Y-101', name: 'Organic Long-Staple Cotton Yarn', category: 'yarn', quantity: 4200, threshold: 1500, slot: 'WH-A1', status: 'Optimal' },
    { sku: 'D-402', name: 'Synthetic Indigo Blue Reactive Dye', category: 'dye', quantity: 310, threshold: 500, slot: 'WH-C4', status: 'Low Stock' },
    { sku: 'F-208', name: 'Raw Heavy Denim Twill Canvas', category: 'fabric', quantity: 2800, threshold: 1000, slot: 'WH-B2', status: 'Optimal' },
    { sku: 'A-701', name: 'Brushed Brass Metal Zipper Enclosures', category: 'accessories', quantity: 180, threshold: 400, slot: 'WH-D2', status: 'Low Stock' }
  ],

  // PLM Workflow Architecture Dataset
  plmProjects: [
    { id: 'PROJ-01', name: 'Premium Heritage Denim Trousers', season: 'Autumn/Winter 2026', progress: 75, phase: 'Sample Refining' },
    { id: 'PROJ-02', name: 'Aerolite Recycled Nylon Windbreaker', season: 'Spring Cruise 2027', progress: 40, phase: 'Material Ingestion' },
    { id: 'PROJ-03', name: 'GOTS Lightweight Flax Linen Shirt', season: 'Summer 2026', progress: 95, phase: 'Compliance Clearance' }
  ],

  // Intercontinental Shipping Tracks Data
  shipments: [
    { id: 'SH-908', vessel: 'Pacific Titan V.40', route: 'Shanghai ➔ Hamburg', status: 'Delayed', coordinates: '53.5511, 9.9937', eta: 'June 24, 2026', mitigation: 'Rerouting alternate trim sourcing from local EU channels.' },
    { id: 'SH-874', vessel: 'Atlantic Breeze V.12', route: 'Alexandria ➔ Charleston', status: 'In Transit', coordinates: '32.7765, -79.9311', eta: 'June 19, 2026', mitigation: 'None. On track for production line loading.' }
  ],

  // Staff Leave Registry showing leave frequency count
  leaveRequests: [
    { id: 'LR-01', name: 'Amara Vance', dept: 'Dyeing House', range: 'June 18 - June 21', days: 3, frequency: '3rd time this quarter (High Risk)', status: 'Pending' },
    { id: 'LR-02', name: 'Carlos Mendez', dept: 'Weaving Yard', range: 'July 01 - July 10', days: 9, frequency: '1st time this year (Low Risk)', status: 'Approved' },
    { id: 'LR-03', name: 'Lin Woods', dept: 'Finishing Line', range: 'June 25 - June 26', days: 1, frequency: '5th request mapped (Chronic Absences)', status: 'Pending' }
  ],

  // Industrial 5S Continuous Improvement Ideas Logs
  kaizens: [
    { id: 'KZ-01', title: 'Color-Coded Spill Sump Mat Grid', pillar: 'Set in order (Seiton)', area: 'Dye Storage Dispenser Area', details: 'Establish visual square grids to store neutralizing chemicals.', status: 'In Progress' },
    { id: 'KZ-02', title: 'Weaving Loom Fly-Lint Collector Optimization', pillar: 'Shine (Seiso)', area: 'Main Circular Weaving Line C', details: 'Added suction extraction shields to minimize airborne contaminant deposits.', status: 'Completed' },
    { id: 'KZ-03', title: 'Standard Cleaning Kits Shadowboards', pillar: 'Standardize (Seiketsu)', area: 'Finishing Assembly Floor', details: 'Build hanging wooden shadow outlines for waste sweepers to sustain cleanliness tool accountability.', status: 'Proposed' }
  ],

  // Broadcast Hub containing dynamic reminders and attached filenames
  announcements: [
    { id: 'AN-101', title: 'Mandatory Environmental Discharge Audit Notice', body: 'All operations shifts must verify wastewater treatment records for the upcoming municipal GOTS audit.', attachment: 'GOTS_Water_SOP.pdf', followUpReminder: true },
    { id: 'AN-102', title: 'Scheduled Maintenance Shutdown: Boiler Unit 3', body: 'Boiler line 3 will go offline for certified structural safety inspections on Saturday morning.', attachment: null, followUpReminder: false }
  ],

  // RAG Compliance Mini Document Index Store
  ragDocs: [
    { id: 'DOC-1', title: 'OEKO-TEX Standard 100 Heavy Metals Limit Regulation', snippet: 'Extract section 4.2: Total content restrictions for extractable lead content must not exceed 90 mg/kg for Baby Class I product lines.' },
    { id: 'DOC-2', title: 'GOTS Effluent Guidelines & Waste Water Metrics', snippet: 'Extract section 5.1: Biological Oxygen Demand (BOD) must remain below 30 mg/L. pH balance threshold constraints are strictly set between 6.0 and 9.0 discharge ranges.' }
  ],

  chatThread: [
    { sender: 'ai', text: 'Hello Pravan, Enterprise Engine Online. Mapped dependencies for PLM workflows, low material stock variables, employee leave frequencies, and 5S tasks. How can I assist you?' }
  ]
};

// Initial App Fire Event Bindings
document.addEventListener('DOMContentLoaded', () => {
  renderActiveTab();
  updateCentralTaskNotifications();
});

// App Sidebar View Navigation Handler
function navigateToTab(tabName) {
  appState.activeTab = tabName;
  
  // Manage navigation active layout visual styling classes
  document.querySelectorAll('.sidebar-menu .menu-item').forEach(item => {
    item.classList.remove('active');
  });
  
  const selectedNavItem = document.querySelector(`.sidebar-menu .menu-item[data-tab="${tabName}"]`);
  if (selectedNavItem) selectedNavItem.classList.add('active');

  // Toggle View panels
  document.querySelectorAll('.view-panel').forEach(panel => {
    panel.classList.remove('active');
  });
  
  const activeViewEl = document.getElementById(`${tabName}-view`);
  if (activeViewEl) activeViewEl.classList.add('active');

  // Dynamically configure Header Title Context text
  const titleMap = {
    dashboard: 'Dashboard Control Center',
    plm: 'Product Lifecycle Management & Compliance Index',
    inventory: 'Material Inventory Asset Monitor',
    logistics: 'Intercontinental Logistics Fleet Deck',
    leave: 'Staff Absence Registry & Frequency Matrix',
    kaizen: '5S Kaizen Continuous Improvement Workspace',
    announcements: 'Operations Broadcast Hub & Follow-ups',
    ai: 'Textile Cognitive Assistant Core'
  };
  document.getElementById('current-header-title').textContent = titleMap[tabName] || 'Enterprise Resource Deck';

  renderActiveTab();
}

// Global Core Tab Orchestration Switch Renderer
function renderActiveTab() {
  switch (appState.activeTab) {
    case 'dashboard':
      renderDashboard();
      break;
    case 'plm':
      renderPLM();
      break;
    case 'inventory':
      renderInventory();
      break;
    case 'logistics':
      renderLogistics();
      break;
    case 'leave':
      renderLeaveRequests();
      break;
    case 'kaizen':
      renderKaizens();
      break;
    case 'announcements':
      renderAnnouncements();
      break;
    case 'ai':
      renderAiChat();
      break;
  }
}

// 1. DASHBOARD VIEW RENDER PIPELINE
function renderDashboard() {
  const lowStockCount = appState.inventory.filter(i => i.quantity < i.threshold).length;
  const pendingLeaves = appState.leaveRequests.filter(l => l.status === 'Pending').length;
  const activeKaizens = appState.kaizens.filter(k => k.status !== 'Completed').length;
  const followUpAnnouncements = appState.announcements.filter(a => a.followUpReminder).length;
  
  const totalAlertsCount = lowStockCount + pendingLeaves + activeKaizens + followUpAnnouncements;

  // Render top metric cards layout
  const grid = document.getElementById('dashboard-stats-grid');
  grid.innerHTML = `
    <div class="stat-card" style="border-left: 4px solid var(--accent-plm);">
      <span class="stat-title">Active PLM Blueprints</span>
      <span class="stat-val">${appState.plmProjects.length} Designs</span>
      <span class="stat-sub">Spanning ${appState.plmProjects.filter(p => p.progress > 80).length} final clearances</span>
    </div>
    <div class="stat-card" style="border-left: 4px solid var(--accent-leave);">
      <span class="stat-title">Leave Approvals Pending</span>
      <span class="stat-val">${pendingLeaves} Requests</span>
      <span class="stat-sub">Chronic frequency flagged items active</span>
    </div>
    <div class="stat-card" style="border-left: 4px solid var(--accent-kaizen);">
      <span class="stat-title">Pending 5S Improvements</span>
      <span class="stat-val">${activeKaizens} Cards</span>
      <span class="stat-sub">Targeting structural factory waste reduction</span>
    </div>
    <div class="stat-card" style="border-left: 4px solid var(--accent-announcement);">
      <span class="stat-title">Follow-up Monitors</span>
      <span class="stat-val">${followUpAnnouncements} Flagged</span>
      <span class="stat-sub">Awaiting confirmation replies</span>
    </div>
  `;

  // Populate Left Side: Actionable Supply Warnings
  const alertContainer = document.getElementById('dashboard-alerts-container');
  alertContainer.innerHTML = '';
  
  appState.inventory.forEach(item => {
    if (item.quantity < item.threshold) {
      const alertDiv = document.createElement('div');
      alertDiv.className = 'alert-row-item';
      alertDiv.innerHTML = `<strong>⚠️ CRITICAL LOW STOCK:</strong> Sku <code>${item.sku}</code> (${item.name}) count is <b>${item.quantity} units</b>. Minimum safety buffer requires ${item.threshold}.`;
      alertContainer.appendChild(alertDiv);
    }
  });

  appState.shipments.forEach(shipment => {
    if (shipment.status === 'Delayed') {
      const alertDiv = document.createElement('div');
      alertDiv.className = 'alert-row-item';
      alertDiv.style.backgroundColor = 'rgba(245, 158, 11, 0.05)';
      alertDiv.style.borderColor = 'rgba(245, 158, 11, 0.2)';
      alertDiv.innerHTML = `<strong>🚢 CARGO TRANSIT DELAY:</strong> ${shipment.vessel} on route <b>${shipment.route}</b> delayed. ETA shifted to ${shipment.eta}.`;
      alertContainer.appendChild(alertDiv);
    }
  });

  // Populate Right Side: Centralized integrated task summary loops
  const pipelineBox = document.getElementById('dashboard-summary-projects');
  pipelineBox.innerHTML = '';

  // Appending leave approval items to the action panel
  appState.leaveRequests.filter(l => l.status === 'Pending').forEach(req => {
    const row = document.createElement('div');
    row.style = 'padding: 10px; background: rgba(236,72,153,0.05); border: 1px solid rgba(236,72,153,0.2); border-radius: var(--radius-md); font-size:12px; display:flex; justify-content:space-between; align-items:center;';
    row.innerHTML = `
      <div>
        <span style="font-weight:700; color:var(--accent-leave)">[LEAVE FREQUENCY BADGE]</span> 
        <b>${req.name}</b> filed a ${req.days}-day request. <br>
        <small style="color:var(--text-muted)">Historical Frequency rate: ${req.frequency}</small>
      </div>
      <button class="btn btn-sm btn-leave" onclick="updateLeaveStatus('${req.id}', 'Approved')">Approve</button>
    `;
    pipelineBox.appendChild(row);
  });

  // Appending pending announcements follow-up reminders
  appState.announcements.filter(a => a.followUpReminder).forEach(ann => {
    const row = document.createElement('div');
    row.style = 'padding: 10px; background: rgba(59,130,246,0.05); border: 1px solid rgba(59,130,246,0.2); border-radius: var(--radius-md); font-size:12px; display:flex; justify-content:space-between; align-items:center;';
    row.innerHTML = `
      <div>
        <span style="font-weight:700; color:var(--accent-announcement)">[ANNOUNCEMENT FOLLOW-UP]</span> 
        <b>${ann.title}</b><br>
        <small style="color:var(--text-muted)">Verification reminder is actively broadcasting to personnel</small>
      </div>
      <button class="btn btn-sm" style="background:#1e2942" onclick="toggleAnnouncementReminder('${ann.id}')">Dismiss Reminder</button>
    `;
    pipelineBox.appendChild(row);
  });
}

// 2. PRODUCT LIFECYCLE MANAGEMENT RENDERER WITH LOGICAL RAG INTEGRATION
function renderPLM() {
  const container = document.getElementById('plm-projects-list');
  container.innerHTML = '';
  
  appState.plmProjects.forEach(proj => {
    const div = document.createElement('div');
    div.className = 'plm-project-card';
    div.innerHTML = `
      <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:8px;">
        <h3 style="font-size:14px; color:#fff">${proj.name}</h3>
        <span class="status-tag status-approved" style="background:rgba(99,102,241,0.15); color:var(--accent-plm)">${proj.phase}</span>
      </div>
      <div class="plm-meta-line">
        <span>ID: <code>${proj.id}</code></span>
        <span>Timeline Batch: <b>${proj.season}</b></span>
      </div>
      <div style="font-size:11px; margin-bottom:4px; display:flex; justify-content:space-between;">
        <span>Milestone Production Progress</span>
        <span>${proj.progress}%</span>
      </div>
      <div class="progress-container">
        <div class="progress-bar-fill" style="width: ${proj.progress}%"></div>
      </div>
    `;
    container.appendChild(div);
  });

  // Render Document Catalog Library list bindings
  const lib = document.getElementById('rag-document-library');
  lib.innerHTML = '';
  appState.ragDocs.forEach(doc => {
    const box = document.createElement('div');
    box.style = 'padding:10px; background:var(--bg-input); border:1px solid var(--border-color); border-radius:var(--radius-md); font-size:12px; margin-bottom:8px; cursor:pointer;';
    box.textContent = doc.title;
    box.onclick = () => {
      document.getElementById('rag-query-input').value = `Query regarding: ${doc.title}`;
      executeRagSearch(doc.snippet, doc.title);
    };
    lib.appendChild(box);
  });
}

// Ingest Search Execution Logic Mocking
document.getElementById('rag-search-btn')?.addEventListener('click', () => {
  const text = document.getElementById('rag-query-input').value.toLowerCase();
  let found = false;
  
  for (let doc of appState.ragDocs) {
    if (doc.title.toLowerCase().includes(text) || text.includes('lead') && doc.id === 'DOC-1' || text.includes('gots') && doc.id === 'DOC-2') {
      executeRagSearch(doc.snippet, doc.title);
      found = true;
      break;
    }
  }
  if (!found) {
    document.getElementById('rag-output-answer').innerHTML = `<i>No direct match index found. Simulating fallback answer: Environmental requirements satisfy generic criteria standards.</i>`;
  }
});

function executeRagSearch(snippet, title) {
  document.getElementById('rag-output-answer').innerHTML = `<b>[Synthesized Core Decision Response]</b> <br> ${snippet}`;
  document.getElementById('rag-sources-list').innerHTML = `
    <div style="padding:6px; background:rgba(16,185,129,0.06); border:1px solid var(--accent-kaizen); border-radius:4px; font-size:11px;">
      <b>Source Document node matched:</b> ${title}
    </div>
  `;
}

// 3. MATERIAL INVENTORY MONITORS & DYNAMIC SVG CHART POPULATORS
let currentInventoryFilter = 'all';
function filterInventory(category, btnEl) {
  currentInventoryFilter = category;
  document.querySelectorAll('.filter-group .filter-btn').forEach(b => b.classList.remove('active'));
  btnEl.classList.add('active');
  renderInventory();
}

function searchInventory(query) {
  const lower = query.toLowerCase();
  const rows = document.querySelectorAll('#inventory-table-body tr');
  rows.forEach(row => {
    const text = row.textContent.toLowerCase();
    row.style.display = text.includes(lower) ? '' : 'none';
  });
}

function renderInventory() {
  const tbody = document.getElementById('inventory-table-body');
  tbody.innerHTML = '';

  const filtered = appState.inventory.filter(item => {
    if (currentInventoryFilter === 'all') return true;
    return item.category === currentInventoryFilter;
  });

  filtered.forEach(item => {
    const isLow = item.quantity < item.threshold;
    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td><b>${item.name}</b><br><small style="color:var(--text-muted)">${item.sku}</small></td>
      <td><span style="text-transform:capitalize; font-size:11px;">${item.category}</span></td>
      <td><b style="${isLow ? 'color:#ef4444' : 'color:inherit'}">${item.quantity} units</b></td>
      <td><code>${item.slot}</code></td>
      <td><span class="status-tag ${isLow ? 'status-pending' : 'status-approved'}">${isLow ? 'Low Threshold' : 'Stable Sourcing'}</span></td>
      <td><button class="btn btn-sm btn-outline" onclick="openStockAdjustmentModal('${item.sku}')">Adjust</button></td>
    `;
    tbody.appendChild(tr);
  });

  renderInventoryCharts();
}

// Pure vanilla code rendering vectors for SVG graphs natively without CDN files
function renderInventoryCharts() {
  const barChart = document.getElementById('inventory-bar-chart');
  let barSvg = `<svg width="100%" height="100" style="overflow:visible;">`;
  appState.inventory.forEach((item, idx) => {
    const height = Math.min(item.quantity / 50, 80);
    const x = idx * 65 + 10;
    const y = 90 - height;
    const color = item.quantity < item.threshold ? '#ef4444' : 'var(--accent-inv)';
    barSvg += `
      <rect x="${x}" y="${y}" width="35" height="${height}" fill="${color}" rx="3"/>
      <text x="${x + 2}" y="105" fill="var(--text-muted)" font-size="9">${item.sku}</text>
    `;
  });
  barSvg += `</svg>`;
  barChart.innerHTML = barSvg;

  const pieChart = document.getElementById('inventory-pie-chart');
  pieChart.innerHTML = `
    <svg width="120" height="120" viewBox="0 0 32 32" style="transform: rotate(-90deg); border-radius: 50%;">
      <circle r="16" cx="16" cy="16" fill="transparent" stroke="var(--accent-plm)" stroke-width="32" stroke-dasharray="40 100" />
      <circle r="16" cx="16" cy="16" fill="transparent" stroke="var(--accent-inv)" stroke-width="32" stroke-dasharray="30 100" stroke-dashoffset="-40" />
      <circle r="16" cx="16" cy="16" fill="transparent" stroke="var(--accent-log)" stroke-width="32" stroke-dasharray="20 100" stroke-dashoffset="-70" />
      <circle r="16" cx="16" cy="16" fill="transparent" stroke="var(--accent-kaizen)" stroke-width="32" stroke-dasharray="10 100" stroke-dashoffset="-90" />
    </svg>
    <div style="font-size:10px; color:var(--text-muted); display:flex; flex-direction:column; gap:2px; margin-left:20px;">
      <div><span style="color:var(--accent-plm)">●</span> Yarns Vol</div>
      <div><span style="color:var(--accent-inv)">●</span> Fabrics Vol</div>
      <div><span style="color:var(--accent-log)">●</span> Dyes Vol</div>
      <div><span style="color:var(--accent-kaizen)">●</span> Accessories Vol</div>
    </div>
  `;
}

function openStockAdjustmentModal(sku) {
  appState.selectedInventorySku = sku;
  const item = appState.inventory.find(i => i.sku === sku);
  document.getElementById('modal-item-name').textContent = item.name;
  document.getElementById('edit-stock-qty').value = item.quantity;
  openModal('inventory-modal');
}

function saveStockEdit() {
  const qty = parseInt(document.getElementById('edit-stock-qty').value) || 0;
  const item = appState.inventory.find(i => i.sku === appState.selectedInventorySku);
  if (item) {
    item.quantity = qty;
    closeModal('inventory-modal');
    renderInventory();
    renderDashboard();
    updateCentralTaskNotifications();
  }
}

// 4. LOGISTICS FLEET INTERCONTINENTAL RENDER TRACKER
function renderLogistics() {
  const mapBox = document.getElementById('shipments-map-container');
  mapBox.innerHTML = `
    <svg width="100%" height="100%" style="background:#0f1626; border-radius:8px;" viewBox="0 0 400 180">
      <path d="M20,40 Q50,30 90,50 T180,40 T290,30 T380,50" fill="none" stroke="#1f293d" stroke-width="4"/>
      <path d="M40,120 Q120,150 200,130 T340,140" fill="none" stroke="#1f293d" stroke-width="4"/>
      <path d="M60,60 C120,90 200,100 280,50" fill="none" stroke="var(--accent-log)" stroke-dasharray="4 4" stroke-width="1.5"/>
      <circle cx="280" cy="50" r="5" fill="#ef4444" id="vessel-node-1"/>
      <circle cx="140" cy="80" r="5" fill="#10b981" id="vessel-node-2"/>
      <text x="290" y="52" fill="#fff" font-size="9">SH-908 (Delayed)</text>
    </svg>
  `;

  const panel = document.getElementById('shipments-list-panel');
  panel.innerHTML = '';
  appState.shipments.forEach(s => {
    const isSel = s.id === appState.activeShipmentId;
    const box = document.createElement('div');
    box.className = `shipment-list-box ${isSel ? 'active' : ''}`;
    box.onclick = () => { appState.activeShipmentId = s.id; renderLogistics(); };
    box.innerHTML = `
      <div style="display:flex; justify-content:between; font-size:12px; font-weight:700;">
        <span>Vessel: ${s.vessel}</span>
        <span style="margin-left:auto; color:${s.status === 'Delayed' ? '#ef4444' : '#10b981'}">${s.status}</span>
      </div>
      <div style="font-size:11px; color:var(--text-muted); margin-top:4px;">Logistics Link: ${s.route}</div>
    `;
    panel.appendChild(box);
  });

  // Render Detailed side breakdown layout panel
  const activeShipment = appState.shipments.find(s => s.id === appState.activeShipmentId);
  const detailPanel = document.getElementById('shipment-details-panel');
  if (activeShipment) {
    detailPanel.innerHTML = `
      <h3>Cargo Route Logistics Tracking</h3>
      <div style="margin-top:12px; display:flex; flex-direction:column; gap:8px; font-size:12px;">
        <div><b>Vessel Hull Register ID:</b> <code>${activeShipment.id}</code></div>
        <div><b>Operational Path:</b> ${activeShipment.route}</div>
        <div><b>Live Marine Gps Grid Coordinates:</b> <code>${activeShipment.coordinates}</code></div>
        <div><b>Anticipated Harbor Docking ETA:</b> <span style="color:var(--accent-log)">${activeShipment.eta}</span></div>
        <div style="margin-top:8px; padding:10px; background:var(--bg-input); border-radius:6px;">
          <h4 style="font-size:11px; color:#ef4444; margin-bottom:4px;">Automated Mitigation Contingency Plan</h4>
          <p style="font-size:11px; color:var(--text-muted)">${activeShipment.mitigation}</p>
        </div>
      </div>
    `;
  }
}

// 5. LEAVE REQUEST REGISTRY AND SYSTEM ABSENCE FREQUENCY TRACKERS ("Lev req")
function renderLeaveRequests() {
  const tbody = document.getElementById('leave-table-body');
  tbody.innerHTML = '';

  appState.leaveRequests.forEach(req => {
    // Generate logical frequency dynamic hazard alerts color categorization tags
    let freqClass = 'freq-low';
    if (req.frequency.includes('3rd')) freqClass = 'freq-med';
    if (req.frequency.includes('Chronic')) freqClass = 'freq-high';

    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td><b>${req.name}</b></td>
      <td>${req.dept}</td>
      <td><code>${req.range}</code></td>
      <td>${req.days} Production Days</td>
      <td><span class="freq-badge ${freqClass}">${req.frequency}</span></td>
      <td><span class="status-tag ${req.status === 'Pending' ? 'status-pending' : 'status-approved'}">${req.status}</span></td>
      <td>
        ${req.status === 'Pending' ? 
          `<button class="btn btn-sm btn-teal" onclick="updateLeaveStatus('${req.id}', 'Approved')">Approve</button>
           <button class="btn btn-sm" style="background:#ef4444; margin-left:4px;" onclick="updateLeaveStatus('${req.id}', 'Rejected')">Reject</button>` 
          : `<span style="font-size:11px; color:var(--text-muted);">Decision Concluded</span>`
        }
      </td>
    `;
    tbody.appendChild(tr);
  });
}

function updateLeaveStatus(id, targetStatus) {
  const req = appState.leaveRequests.find(l => l.id === id);
  if (req) {
    req.status = targetStatus;
    renderLeaveRequests();
    renderDashboard();
    updateCentralTaskNotifications();
  }
}

function submitNewLeave(event) {
  event.preventDefault();
  const name = document.getElementById('leave-emp-name').value;
  const dept = document.getElementById('leave-dept').value;
  const range = document.getElementById('leave-range').value;
  const days = document.getElementById('leave-days').value;

  // Track historically loaded frequency metrics simulation logic checks
  const existingMatches = appState.leaveRequests.filter(l => l.name.toLowerCase() === name.toLowerCase()).length;
  const frequencyLabel = existingMatches > 0 ? `${existingMatches + 1}th request filed (Frequency Elevated)` : '1st request filed (Low Frequency)';

  appState.leaveRequests.push({
    id: `LR-0${appState.leaveRequests.length + 1}`,
    name, dept, range, days,
    frequency: frequencyLabel,
    status: 'Pending'
  });

  document.getElementById('leave-form').reset();
  closeModal('leave-modal');
  renderLeaveRequests();
  renderDashboard();
  updateCentralTaskNotifications();
}

// 6. INDUSTRIAL 5S KAIZEN HUB LAYOUT RENDER DIRECTIVES
function renderKaizens() {
  const container = document.getElementById('kaizen-cards-container');
  container.innerHTML = '';

  appState.kaizens.forEach(kz => {
    const card = document.createElement('div');
    card.className = 'kaizen-card';
    card.style.borderTopColor = kz.status === 'Completed' ? '#10b981' : (kz.status === 'In Progress' ? '#f59e0b' : '#3b82f6');
    card.innerHTML = `
      <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:8px;">
        <span class="kaizen-badge">${kz.pillar}</span>
        <span class="status-tag ${kz.status === 'Completed' ? 'status-approved' : 'status-pending'}">${kz.status}</span>
      </div>
      <h4 style="font-size:13px; margin-bottom:6px; color:#fff;">${kz.title}</h4>
      <p style="font-size:11px; color:var(--text-muted); margin-bottom:10px;"><b>Zone Area Location:</b> ${kz.area}</p>
      <p style="font-size:12px; color:var(--text-main); font-style:italic;">"${kz.details}"</p>
      
      ${kz.status !== 'Completed' ? 
        `<div style="margin-top:12px; display:flex; gap:6px; justify-content:flex-end;">
          <button class="btn btn-sm btn-outline" onclick="advanceKaizenStatus('${kz.id}', 'In Progress')">Set Progress</button>
          <button class="btn btn-sm btn-kaizen" onclick="advanceKaizenStatus('${kz.id}', 'Completed')">Complete</button>
         </div>` : ''
      }
    `;
    container.appendChild(card);
  });
}

function advanceKaizenStatus(id, nextState) {
  const kz = appState.kaizens.find(k => k.id === id);
  if (kz) {
    kz.status = nextState;
    renderKaizens();
    renderDashboard();
    updateCentralTaskNotifications();
  }
}

function submitNewKaizen(event) {
  event.preventDefault();
  const title = document.getElementById('kaizen-title').value;
  const pillar = document.getElementById('kaizen-pillar').value;
  const area = document.getElementById('kaizen-location').value;
  const details = document.getElementById('kaizen-details').value;

  appState.kaizens.push({
    id: `KZ-0${appState.kaizens.length + 1}`,
    title, pillar, area, details,
    status: 'Proposed'
  });

  document.getElementById('kaizen-form').reset();
  closeModal('kaizen-modal');
  renderKaizens();
  renderDashboard();
  updateCentralTaskNotifications();
}

// 7. ANNOUNCEMENTS WITH MOCK UPLOADS AND TIMEOUT FOLLOWUPS Directives
function renderAnnouncements() {
  const feed = document.getElementById('announcements-feed-container');
  feed.innerHTML = '';

  appState.announcements.forEach(ann => {
    const item = document.createElement('div');
    item.className = 'announcement-item-box';
    item.innerHTML = `
      <div style="display:flex; justify-content:space-between; align-items:center;">
        <h4 style="font-size:13px; color:var(--accent-announcement)">${ann.title}</h4>
        <span class="status-tag" style="background:${ann.followUpReminder ? 'rgba(239,68,68,0.15)' : 'rgba(255,255,255,0.05)'}; color:${ann.followUpReminder ? '#f87171' : 'var(--text-muted)'}">
          ${ann.followUpReminder ? '🔔 Follow-up Reminder Active' : '✓ Broadcast Standard'}
        </span>
      </div>
      <p style="font-size:12px; color:var(--text-main); margin:8px 0;">${ann.body}</p>
      
      <div style="display:flex; align-items:center; justify-content:space-between; margin-top:10px; font-size:11px; color:var(--text-muted);">
        <div>
          ${ann.attachment ? 
            `📎 Attached Resource Spec: <a href="#" style="color:var(--accent-inv); text-decoration:none;" onclick="alert('Downloading: ${ann.attachment}')"><b>${ann.attachment}</b></a>` 
            : '<i>No document assets attached to this release.</i>'
          }
        </div>
        <button class="btn btn-sm btn-outline" onclick="toggleAnnouncementReminder('${ann.id}')">
          Toggle Reminder Flag
        </button>
      </div>
    `;
    feed.appendChild(item);
  });
}

// Capture local user system simulated file data transfers
function handleAnnouncementFileSelect(inputEl) {
  if (inputEl.files && inputEl.files[0]) {
    appState.uploadedAnnouncementFile = inputEl.files[0].name;
    document.getElementById('file-upload-status').textContent = `Ready: ${inputEl.files[0].name}`;
    document.getElementById('file-upload-status').style.color = 'var(--accent-kaizen)';
  }
}

function toggleAnnouncementReminder(id) {
  const ann = appState.announcements.find(a => a.id === id);
  if (ann) {
    ann.followUpReminder = !ann.followUpReminder;
    renderAnnouncements();
    renderDashboard();
    updateCentralTaskNotifications();
  }
}

function createNewAnnouncement(event) {
  event.preventDefault();
  const title = document.getElementById('announce-title').value;
  const body = document.getElementById('announce-body').value;
  const followUpReminder = document.getElementById('announce-reminder-toggle').checked;
  const attachment = appState.uploadedAnnouncementFile; // Read file name from memory block

  appState.announcements.unshift({
    id: `AN-${100 + appState.announcements.length + 1}`,
    title, body, attachment, followUpReminder
  });

  // Reset inputs parameters
  document.getElementById('announcement-form').reset();
  appState.uploadedAnnouncementFile = null;
  document.getElementById('file-upload-status').textContent = 'No attachment uploaded';
  document.getElementById('file-upload-status').style.color = 'var(--text-muted)';
  
  renderAnnouncements();
  renderDashboard();
  updateCentralTaskNotifications();
}

// 8. COGNITIVE CONTEXT CHAT SYSTEM INTELLIGENCE CORE
function renderAiChat() {
  const thread = document.getElementById('ai-chat-thread');
  thread.innerHTML = '';
  appState.chatThread.forEach(m => {
    const div = document.createElement('div');
    div.className = `chat-msg ${m.sender}`;
    div.innerHTML = m.text;
    thread.appendChild(div);
  });
  thread.scrollTop = thread.scrollHeight;
}

function handleAiChatSubmit() {
  const input = document.getElementById('ai-chat-input');
  const txt = input.value.trim();
  if(!txt) return;

  appState.chatThread.push({ sender: 'user', text: txt });
  input.value = '';
  renderAiChat();

  setTimeout(() => {
    let responseText = `I am synthesizing context parameters for your inquiry: "${txt}". <br><br>`;
    const query = txt.toLowerCase();

    if (query.includes('leave') || query.includes('absent') || query.includes('frequency')) {
      responseText += `<b>Absence Frequency Analysis Node:</b><br>`;
      appState.leaveRequests.forEach(l => {
        responseText += `• ${l.name} (${l.dept}): status is <b>${l.status}</b>. Metric frequency weight mapped: <i>${l.frequency}</i>.<br>`;
      });
    } else if (query.includes('kaizen') || query.includes('5s')) {
      responseText += `<b>Industrial 5S Kaizen Audit Ledger:</b><br>`;
      appState.kaizens.forEach(k => {
        responseText += `• [${k.pillar}] ${k.title} located at <i>${k.area}</i> is marked <b>${k.status}</b>.<br>`;
      });
    } else if (query.includes('announcement') || query.includes('reminder') || query.includes('follow')) {
      responseText += `<b>Follow-up Announcement Broadcast Verification status:</b><br>`;
      appState.announcements.forEach(a => {
        responseText += `• Topic: "${a.title}" -> Follow up reminder active state: <b>${a.followUpReminder}</b>.<br>`;
      });
    } else if (query.includes('low') || query.includes('stock') || query.includes('inventory')) {
      responseText += `<b>Inventory Sourcing Core Exceptions:</b><br>`;
      appState.inventory.forEach(i => {
        if(i.quantity < i.threshold) {
          responseText += `• SKU <code>${i.sku}</code> Low stock risk on line: ${i.quantity} units left.<br>`;
        }
      });
    } else {
      responseText += `Cross-reference compilation indicates normal tracking parameters. Access specialized sub-tabs (Leave Frequencies, 5S Hub, Follow-ups) to execute explicit system variable modifications manually.`;
    }

    appState.chatThread.push({ sender: 'ai', text: responseText });
    renderAiChat();
  }, 450);
}

function sendSuggestedPrompt(promptText) {
  document.getElementById('ai-chat-input').value = promptText;
  handleAiChatSubmit();
}

// 9. CENTRAL REMINDER NOTIFICATION CORE MANAGEMENT ENGINE
function toggleNotificationDropdown() {
  document.getElementById('notification-dropdown-panel').classList.toggle('open');
}

function dismissAllNotifications(e) {
  e.stopPropagation();
  document.getElementById('global-task-badge').style.display = 'none';
  document.getElementById('notification-dropdown-panel').classList.remove('open');
}

function updateCentralTaskNotifications() {
  const listEl = document.getElementById('global-notifications-list');
  listEl.innerHTML = '';
  let count = 0;

  // Scan 1: Leave Requests Pending items
  appState.leaveRequests.forEach(l => {
    if (l.status === 'Pending') {
      count++;
      const div = document.createElement('div');
      div.className = 'notif-item';
      div.innerHTML = `
        <div class="notif-meta"><span>⚠️ Staff Leave Approval</span><span>Freq Alert</span></div>
        <div><b>${l.name}</b> requested leave. Frequency parameter: <i>${l.frequency}</i>.</div>
      `;
      listEl.appendChild(div);
    }
  });

  // Scan 2: Incomplete 5S Kaizens items
  appState.kaizens.forEach(k => {
    if (k.status === 'Proposed' || k.status === 'In Progress') {
      count++;
      const div = document.createElement('div');
      div.className = 'notif-item';
      div.innerHTML = `
        <div class="notif-meta"><span>🔧 5S Kaizen Action Task</span><span>${k.status}</span></div>
        <div>"${k.title}" requires operational implementation on floor zone.</div>
      `;
      listEl.appendChild(div);
    }
  });

  // Scan 3: Low stock items
  appState.inventory.forEach(i => {
    if (i.quantity < i.threshold) {
      count++;
      const div = document.createElement('div');
      div.className = 'notif-item';
      div.innerHTML = `
        <div class="notif-meta"><span style="color:#ef4444">🚨 Low Material Stock Alert</span><span>SKU ${i.sku}</span></div>
        <div>Sourcing buffer threshold broken. Only <b>${i.quantity} units</b> remain.</div>
      `;
      listEl.appendChild(div);
    }
  });

  // Scan 4: Active Announcement Follow-up reminders
  appState.announcements.forEach(a => {
    if (a.followUpReminder) {
      count++;
      const div = document.createElement('div');
      div.className = 'notif-item';
      div.innerHTML = `
        <div class="notif-meta"><span>📢 Announcement Follow-Up</span><span>Awaiting Reply</span></div>
        <div>Directives regarding "${a.title}" require shift leader feedback loop checklist.</div>
      `;
      listEl.appendChild(div);
    }
  });

  // Update DOM interface badge metrics indicators counters dynamically
  document.getElementById('global-task-badge').textContent = count;
  document.getElementById('global-task-badge').style.display = count > 0 ? 'flex' : 'none';
  document.getElementById('nav-leave-count').textContent = appState.leaveRequests.filter(l => l.status === 'Pending').length;
  document.getElementById('nav-announce-count').textContent = appState.announcements.filter(a => a.followUpReminder).length;

  if (count === 0) {
    listEl.innerHTML = `<div style="padding:16px; font-size:12px; color:var(--text-muted); text-align:center;">All operational loops completed. No pending tasks recorded.</div>`;
  }
}

// Modal Toggle Utilities
function openModal(id) { document.getElementById(id).classList.add('open'); }
function closeModal(id) { document.getElementById(id).classList.remove('open'); }

// Fallback project addition mock bindings to maintain absolute integration
function openNewProjectModal() { openModal('project-modal'); }
function openAddNewMaterialModal() { alert('Add Material feature interface mapped to ERP warehouse core API bindings.'); }
function simulateUploadDocument() { alert('Simulating Ingestion of compliance PDF documentation...'); }

function submitNewProject(event) {
  event.preventDefault();
  const name = document.getElementById('proj-name').value;
  const season = document.getElementById('proj-season').value;
  appState.plmProjects.push({
    id: `PROJ-0${appState.plmProjects.length + 1}`,
    name, season, progress: 10, phase: 'Material Ingestion'
  });
  document.getElementById('project-form').reset();
  closeModal('project-modal');
  renderPLM();
  renderDashboard();
}