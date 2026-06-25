# TEX-FLOW — Enterprise Textile ERP & Operations Control Center

> A fully client-side, single-page application (SPA) for textile manufacturing operations — covering product lifecycle, inventory, logistics, HR, compliance, complaints, meetings, announcements, and 5S Kaizen management, with AI-powered insights and real-time analytics.

---

## Table of Contents

1. [Project Overview](#1-project-overview)
2. [Tech Stack](#2-tech-stack)
3. [File Structure](#3-file-structure)
4. [How to Run](#4-how-to-run)
5. [Module Reference](#5-module-reference)
   - [Dashboard](#51-dashboard)
   - [PLM & RAG Spec](#52-plm--rag-spec)
   - [Material Inventory](#53-material-inventory)
   - [Logistics Tracker](#54-logistics-tracker)
   - [AI Assistant](#55-ai-assistant)
   - [HR & Leave](#56-hr--leave)
   - [Announcements](#57-announcements)
   - [5S Kaizen](#58-5s-kaizen)
   - [Meetings](#59-meetings)
   - [Compliance](#510-compliance)
   - [Complaints](#511-complaints)
6. [Feature Deep-Dives](#6-feature-deep-dives)
   - [KPI Trend Sparklines](#61-kpi-trend-sparklines)
   - [Department Analytics](#62-department-analytics)
   - [Actionable Insights Engine](#63-actionable-insights-engine)
   - [Read Receipts & Acknowledgements](#64-read-receipts--acknowledgements)
   - [Attendance Tracking & Action Items](#65-attendance-tracking--action-items)
   - [Compliance Risk Scoring & Auto-Escalation](#66-compliance-risk-scoring--auto-escalation)
   - [Complaint Root Cause & Trend Analysis](#67-complaint-root-cause--trend-analysis)
   - [Global Notification Engine](#68-global-notification-engine)
   - [Client-Side RAG Engine](#69-client-side-rag-engine)
7. [Data Architecture](#7-data-architecture)
8. [UI Design System](#8-ui-design-system)
9. [Known Limitations & Extension Points](#9-known-limitations--extension-points)

---

## 1. Project Overview

TEX-FLOW is a **zero-dependency, browser-native** ERP dashboard built for a textile/garment manufacturing enterprise. It runs entirely from three files (`index.html`, `app.js`, `style.css`) with no build step, no backend, and no npm packages — all logic is vanilla JavaScript with SVG-based charts rendered inline.

The application was designed around five operational priorities:

- **Visibility** — surface business risks before they become production stoppages
- **Accountability** — track who read what, who attended what, and what's overdue
- **Traceability** — record complaints, compliance issues, and leave with full audit context
- **Improvement** — Kaizen and 5S workflows embedded directly into operations
- **Intelligence** — cross-module AI insights and a client-side RAG engine over compliance documents

---

## 2. Tech Stack

| Layer | Technology |
|---|---|
| Markup | HTML5 (semantic, single-page) |
| Styling | CSS3 with CSS Custom Properties (design tokens) |
| Logic | Vanilla JavaScript (ES6+, no frameworks) |
| Charts | Inline SVG (hand-crafted, no charting libraries) |
| Fonts | Google Fonts — Outfit (headings) + Plus Jakarta Sans (body) |
| AI Chat | Claude API (`claude-sonnet-4-6`) via `fetch` — client-side proxy |
| RAG | Client-side TF-IDF keyword scoring over in-memory document corpus |
| State | In-memory JavaScript arrays (no localStorage, no IndexedDB) |

---

## 3. File Structure

```
texflow/
├── index.html      # Full SPA shell — all 11 view panels, modals, notification drawer
├── app.js          # All state data, rendering functions, event handlers (~2900 lines)
└── style.css       # Design system, component styles, responsive rules (~1845 lines)
```

Everything is self-contained. No `node_modules`, no bundler, no `.env`. Open `index.html` directly in a browser.

---

## 4. How to Run

**Local (simplest):**
```bash
# Just open the file
open index.html
# or on Linux:
xdg-open index.html
```

**With a local server (recommended to avoid CORS on fonts):**
```bash
python3 -m http.server 8080
# Then visit http://localhost:8080
```

**Deployed:**  
Drop all three files into any static hosting service — GitHub Pages, Netlify, Vercel, Cloudflare Pages. No server-side configuration required.

> **Note on state persistence:** All data lives in JavaScript memory and resets on page reload. To persist data, wire each module's arrays (see [Data Architecture](#7-data-architecture)) to `localStorage` or a REST API — the render functions are already decoupled from data storage.

---

## 5. Module Reference

### 5.1 Dashboard

**Path:** Default view on load  
**Header title:** Dashboard Control Center

The dashboard is the operational nerve centre. It aggregates live data from every other module into one screen.

**Sections:**

| Section | Description |
|---|---|
| Stat Cards (3-up) | Active PLM projects, low-stock material count, cargo shipments in transit |
| KPI Trend Sparklines (4-up) | Production Output, Inventory Turnover, On-Time Delivery, Defect Rate — 6-month sparklines with delta badges |
| Department Performance Chart | Horizontal bar chart comparing current vs previous quarter scores for 6 departments |
| Actionable Insights | AI-generated cross-module recommendations with direct navigation links |
| Supply Warnings | Live alerts for low-stock materials and critical/delayed shipments |
| Active Garment Projects | Mini PLM summary with completion percentages |

---

### 5.2 PLM & RAG Spec

**Path:** Sidebar → PLM & RAG Spec

Manages garment product lifecycle from concept to completion, and hosts the client-side compliance document search engine.

**PLM Section:**
- Cards for each garment project showing category, season, lead designer, fabric specs, completion percentage, and a clickable 6-stage timeline (Concept → Tech Pack → Prototyping → Bulk Production → Quality Control → Completed)
- Clicking any stage node on the timeline promotes the project to that stage and recalculates completion percentage
- "New Design Project" button via prompt dialog

**RAG Section:**
- Document library with 5 pre-indexed compliance manuals (OEKO-TEX, GOTS v7.0, Indigo Dyeing SOP, Waterless CO₂ Dyeing Protocol, Linen Fiber Specifications)
- Keyword search with TF-IDF scoring returns the top 3 matching snippets with relevance scores
- Synthesized answer panel reconstructs compliance guidance from matched content
- "Ingest File" adds new documents to the in-memory corpus via prompt dialog

**Data source:** `plmProjects[]`, `ragDocuments[]`

---

### 5.3 Material Inventory

**Path:** Sidebar → Material Inventory

Tracks raw material stock across the warehouse with visual analytics.

**Features:**
- Filter tabs: All Items, Yarns, Fabrics, Dyes, Trims & Accessories
- Search bar filters by material name or SKU
- Status badges: `in-stock` (green) / `low-stock` (amber) based on reorder level threshold
- Edit Quantity modal adjusts physical stock counts inline
- Add Material via prompt dialog
- SVG bar chart: stock levels vs safety thresholds, bars highlight red when below reorder level
- SVG donut chart: volume distribution by category (Yarn, Fabric, Dye, Accessories)
- Dashboard alerts auto-populate from low-stock items

**Data source:** `inventory[]`

---

### 5.4 Logistics Tracker

**Path:** Sidebar → Logistics Tracker

Monitors intercontinental cargo shipments with a live SVG route map.

**Features:**
- World map SVG with route polylines and animated ship position dots calculated from `progress %`
- Status-coded routes: `on-time` (indigo), `delayed` (amber), `critical` (red)
- Shipment list panel with mini progress bars and ETA
- Detail panel: carrier, stage, origin/destination, ETA, full log timeline (newest first)
- Mitigation triggers: "Reroute" and "Expedite" buttons that update status and add log entries
- Selecting a shipment highlights its route on the map

**Data source:** `shipments[]`

---

### 5.5 AI Assistant

**Path:** Sidebar → AI Assistant

Conversational assistant with full context awareness across all live data modules.

**Intent routing:**
| Query type | Behaviour |
|---|---|
| Inventory keywords | Summarises stock levels, identifies shortfalls |
| Logistics keywords | Summarises transit status, delay details |
| PLM keywords | Summarises project pipeline and stage |
| Both inventory + logistics | Cross-correlates delayed shipments with low-stock items to detect production risk |
| Compliance keywords | Retrieves and synthesises from RAG document corpus |
| Unknown | Guided fallback with example queries |

**Quick Inquiry buttons** on the sidebar fire pre-written prompts covering the most common cross-module queries.

**Data source:** All live state arrays + `ragDocuments[]` + `chatHistory[]`

---

### 5.6 HR & Leave

**Path:** Sidebar → HR & Leave

Tracks employee leave frequency and maintains a full leave history log.

**Features:**
- Employee selector dropdown (populated from `employees[]`) — switches the frequency profile
- Leave frequency bars per leave type (Sick, Casual, Annual, Emergency, Maternity/Paternity) rendered as proportional horizontal bars
- Summary badges showing total days taken per type for the selected employee
- Log New Leave form: employee, leave type, date range, reason — calculates days automatically
- Full leave history table (all employees) with Export CSV
- Frequency data updates live as new leave is logged

**Data source:** `leaveRecords[]`, `employees[]`

---

### 5.7 Announcements

**Path:** Sidebar → Announcements  
**Badge:** Unread count (red pill)

Posts operational announcements to the team with full read/acknowledgement tracking.

**Features:**
- Priority levels: Normal (teal), Important (amber), Urgent (red) — with colour-coded left borders and badges
- **Read receipts:** Progress bar showing how many of the total recipients have opened the announcement
- **Acknowledgements:** Separate progress bar tracking who has explicitly confirmed action
- "Mark Read" and "Acknowledge" buttons update the current user's status inline
- Follow-up reminder date: displays a chip on the card showing the reminder date; overdue reminders turn red
- **Snooze Reminder:** shifts the follow-up date forward by 3 days
- File attachment: upload zone (stores filename reference; no actual file upload in SPA mode)
- Filter feed: All / Urgent / Important / Pending Follow-up
- New announcements auto-mark as read by the posting user

**Data source:** `announcements[]`

---

### 5.8 5S Kaizen

**Path:** Sidebar → 5S Kaizen

Logs and tracks continuous improvement items mapped to the 5S methodology.

**5S Category mapping:**

| S | Category | Colour |
|---|---|---|
| 1S | Sort — remove unnecessary items | Red |
| 2S | Set in Order — arrange for efficiency | Amber |
| 3S | Shine — clean and inspect | Teal |
| 4S | Standardize — create repeatable procedures | Indigo |
| 5S | Sustain — maintain discipline over time | Green |

**Features:**
- Stats row: Open Kaizens, Completed, 5S Score (% of items marked done)
- Filter by 5S category
- Kaizen cards: title, description, location, assignee, target date, "Mark Done" toggle
- Log New Kaizen form with all fields
- 5S Score updates live as items are completed

**Data source:** `kaizenItems[]`

---

### 5.9 Meetings

**Path:** Sidebar → Meetings  
**Badge:** Pending action item count

Schedules meetings, tracks attendance, and manages action item completion.

**Features:**
- Schedule Meeting form: title, date/time, location/platform, attendees (comma-separated), agenda
- Meeting cards show status badge (Upcoming / Completed) and pending/overdue action counts
- **Attendance tracking:** Each attendee chip is clickable — cycles through ⏳ Pending → ✅ Present → ❌ Absent
- **Attendance rate bar:** Visual percentage bar per meeting, colour-coded (green ≥75%, amber ≥50%, red <50%)
- **Action items:** Checkboxes toggle completion; overdue items (past due date) highlighted in red with ⚠️ OVERDUE label
- "+ Add Action" button prompts for description, assignee, and due date inline
- "Mark Complete" promotes a meeting to completed status
- Filter: All / Upcoming / Pending Actions / Completed
- Meeting Stats panel: upcoming count, completed count, total actions, actions done

**Data source:** `meetings[]`

---

### 5.10 Compliance

**Path:** Sidebar → Compliance  
**Badge:** Count of open critical + high risk issues

Manages compliance issues with risk scoring, overdue alerts, and automatic escalation.

**Features:**
- Risk tier stat cards: Critical, High, Medium, Resolved
- **Risk score bar:** Each issue displays a 10-segment visual score (Critical=10, High=7, Medium=4, Low=1)
- **Stacked category chart:** Horizontal bars broken down by risk level per category (Chemical, Environmental, Labor, Quality, Fire, Data)
- Overdue alert: shows exact number of days past due date in an amber badge
- **Auto-escalation engine:** Runs on every render — automatically flags issues as escalated based on overdue duration (Critical: day 0, High: day 2+, Medium: day 5+)
- Manual "Escalate" button promotes risk level one tier up
- "Mark Resolved" closes an issue
- Filter: All / Critical / Overdue / Escalated
- Log Compliance Issue form: title, category, risk level, due date, owner, description

**Data source:** `complianceIssues[]`

---

### 5.11 Complaints

**Path:** Sidebar → Complaints  
**Badge:** Open complaint count

Records operational complaints with category analysis, trend visualisation, and root cause detection.

**Features:**
- Stats row: Open Complaints, Recurring Issues (2+ occurrences), Top Category, Resolved This Month
- **6-month trend chart:** SVG line chart with monthly volume showing complaint pattern over time
- **Category breakdown:** Horizontal bars with percentage share and recurring issue count per category
- **Root cause analysis:** Complaint list checks for shared root cause keywords across complaints — surfaces a systemic issue warning when a pattern is detected
- Severity badges: Critical (red), High (amber), Medium (indigo), Low (green)
- Recurring badge: shown when `occurrences >= 2`; "+1 Occurrence" button increments
- "Resolve" closes a complaint
- Filter: All / Open / Recurring
- Log New Complaint form: title, category, severity, reporter, root cause, description

**Data source:** `complaints[]`

---

## 6. Feature Deep-Dives

### 6.1 KPI Trend Sparklines

Four sparkline charts on the dashboard visualise 6-month trends for core operational KPIs.

**Implementation:** Each sparkline is a pure SVG `<polyline>` with a gradient-filled `<polygon>` area beneath it. The last data point carries a coloured circle marker. A delta badge compares the last two values and applies `positive` (green) or `negative` (red) styling.

**Inverted metrics:** Defect Rate and Inventory Turnover (when declining) are flagged as negative even if the number went up — the `isInverted` flag in `drawSparkline()` handles this polarity swap.

**Data:** `kpiTrends` object with `.values[]` arrays for `production`, `inventory`, `otd`, `defect`.

---

### 6.2 Department Analytics

A horizontal grouped bar chart comparing each department's current performance score to the previous quarter.

**Implementation:** SVG `<rect>` elements drawn at proportional widths. The background (lighter) bar shows the previous score; the foreground bar shows the current score. Colour is threshold-based: ≥80 green, ≥65 amber, <65 red. Delta value shown inline.

**Data:** `deptData[]` array — each entry has `dept`, `score` (current), `prev` (last quarter), `issues` (open issue count).

---

### 6.3 Actionable Insights Engine

`renderActionableInsights()` cross-references live state from every module to generate prioritised recommendations.

**Logic sequence:**
1. Check `inventory[]` for items at or below `reorderLevel`
2. Check `shipments[]` for `status === 'critical'`
3. Check `complianceIssues[]` for unresolved critical risks
4. Check `complaints[]` for recurring issues (`occurrences >= 2`)
5. Check `kpiTrends.otd` for positive trend (surfaces good news)
6. Check `meetings[]` for pending action items

Each insight carries a type (`risk`, `critical`, `warning`, `info`, `positive`), an icon, descriptive text, and a navigation action that routes to the relevant module. Maximum 5 insights shown; if none, shows an all-clear message.

---

### 6.4 Read Receipts & Acknowledgements

Each announcement tracks two independent arrays: `readBy[]` and `ackBy[]`, against a `totalRecipients` count.

**Read** is triggered by clicking anywhere on the card or pressing "Mark Read". **Acknowledge** is a deliberate action confirming the user has acted on the announcement — it also auto-marks as read.

Percentages are calculated as `(readBy.length / totalRecipients) * 100` and rendered as progress bars. The sidebar badge shows unread count for the current user (`'Pravan M.'` by default).

**Reminder follow-up:** The `reminderDate` field compares to today's date on every render. Past-due reminders display an "Overdue" chip in red. The snooze function adds 3 days to `reminderDate`.

---

### 6.5 Attendance Tracking & Action Items

**Attendance:** Each attendee name is stored in `meeting.attendees[]`. Their status is stored in `meeting.attendance{}` as a key-value map (`true` = present, `false` = absent, absent key = pending). Clicking the chip cycles the state. The attendance rate bar divides present count by total attendees.

**Action Items:** Stored in `meeting.actionItems[]`, each with `{ id, text, assignee, due, done }`. Checkbox `onchange` handlers call `toggleActionItem()` which updates `done` and rerenders. Items where `!done && due < today` receive overdue styling. The meetings sidebar badge counts all incomplete action items across all meetings.

---

### 6.6 Compliance Risk Scoring & Auto-Escalation

**Risk scores:** A lookup maps risk levels to numeric scores (`critical:10, high:7, medium:4, low:1`). These are rendered as 10-cell dot tracks where filled cells use the risk colour.

**Auto-escalation engine (`runComplianceAutoEscalation()`):**

```
For each open, non-escalated compliance issue:
  daysOverdue = today - dueDate

  if risk === 'critical' and daysOverdue >= 0  → escalate
  if risk === 'high'     and daysOverdue >= 2  → escalate
  if risk === 'medium'   and daysOverdue >= 5  → escalate
```

This runs on every `renderCurrentView()` call, meaning escalation status is always current without needing a background timer. Escalated issues receive a 🔺 badge and are filterable via the "Escalated" filter.

Manual escalation also promotes the risk tier: medium → high → critical.

---

### 6.7 Complaint Root Cause & Trend Analysis

**Trend chart:** Simulates 6-month complaint volumes as an SVG line chart with gradient fill. The last data point uses the live count of open complaints + 2 to reflect current state.

**Category chart:** Groups complaints by `category`, calculates percentage share, and shows how many in each category are recurring (`occurrences >= 2`). This surfaces which complaint types have systemic patterns.

**Root cause detection:** For each complaint with a `rootCause` string, `renderComplaintsList()` scans all other complaints for a matching first word in their root cause. If matches exist, a systemic warning card is inserted beneath the description:

> 🔍 Similar root cause found in N other complaint(s) — systemic issue likely.

This pattern detection runs entirely in the browser with no ML — it is keyword-match based and intentionally lightweight.

---

### 6.8 Global Notification Engine

`updateNotifications()` aggregates pending items from all modules into the notification drawer.

**Sources:**

| Source | Trigger |
|---|---|
| Compliance | Any open issue with `due < today` |
| Meetings | Any action item with `!done && due < today` |
| Announcements | Any reminder with date within the next 3 days |
| Complaints | Any recurring complaint (`occurrences >= 2`, not resolved) |
| Compliance | Any critical issue not yet escalated |

The drawer is opened via the bell icon in the header. Each notification card navigates to its source module on click. The bell badge shows total notification count.

`updateNotifications()` is called after every state-mutating action (log, resolve, toggle, schedule) to keep counts current.

---

### 6.9 Client-Side RAG Engine

The RAG (Retrieval-Augmented Generation) engine runs entirely in the browser — no embeddings, no vector database.

**Indexing:**
Each document in `ragDocuments[]` is split by newline into snippets. Each snippet carries `docId`, `docTitle`, and `text`.

**Retrieval (TF-IDF approximation):**
The query is lowercased, stripped of punctuation, and split into tokens. Each token is checked against each snippet. Snippets are ranked by match count and the top 3 are returned.

**Synthesis:**
Matched content is used to construct a response. For known query types (OEKO-TEX, GOTS, indigo dyeing, waterless CO₂), specific compliance values are returned as structured bullets. For unknown queries, the top matched snippet text is returned directly.

The same engine backs both the PLM RAG search panel and the AI Assistant's compliance query handling.

---

## 7. Data Architecture

All state is held in module-level JavaScript arrays. Every array can be replaced with an API fetch without changing rendering logic.

| Variable | Type | Description |
|---|---|---|
| `inventory[]` | Array\<Object\> | Material SKUs with quantity, reorder level, location, supplier |
| `shipments[]` | Array\<Object\> | Cargo shipments with route coordinates, logs, status, progress |
| `plmProjects[]` | Array\<Object\> | Garment projects with stage timeline and fabric specs |
| `ragDocuments[]` | Array\<Object\> | Compliance document corpus for RAG retrieval |
| `chatHistory[]` | Array\<Object\> | AI chat message log (role, text, references, timestamp) |
| `announcements[]` | Array\<Object\> | Announcements with readBy, ackBy, reminderDate, fileName |
| `meetings[]` | Array\<Object\> | Meetings with attendees, attendance map, actionItems |
| `complianceIssues[]` | Array\<Object\> | Compliance issues with risk, due, owner, escalated flag |
| `complaints[]` | Array\<Object\> | Complaints with category, severity, occurrences, rootCause |
| `leaveRecords[]` | Array\<Object\> | Employee leave entries with type, date range, days |
| `employees[]` | Array\<Object\> | Employee roster with department and annual leave balance |
| `kaizenItems[]` | Array\<Object\> | 5S improvement items with category, location, assignee, done |
| `kpiTrends` | Object | 6-month value arrays for production, inventory, otd, defect |
| `deptData[]` | Array\<Object\> | Department scores (current and previous quarter) |

**Render pattern:**  
Every module follows `renderXView()` → reads from its data array → writes to DOM. No two-way data binding. State mutations always call the relevant render function to sync the UI.

---

## 8. UI Design System

All design tokens are defined as CSS custom properties on `:root` in `style.css`.

**Colour palette:**

| Token | Value | Role |
|---|---|---|
| `--bg-main` | `#090d16` | Page background |
| `--bg-sidebar` | `#0f1524` | Sidebar background |
| `--bg-card` | `#141c2f` | Card background |
| `--bg-input` | `#1b243b` | Input / tag background |
| `--accent-plm` | `#06b6d4` | Teal — PLM module |
| `--accent-inv` | `#6366f1` | Indigo — Inventory / Announcements |
| `--accent-log` | `#f59e0b` | Amber — Logistics / Complaints |
| `--accent-ai` | `#a855f7` | Violet — AI Assistant |
| `--status-success` | `#10b981` | Green — resolved, on-time |
| `--status-warning` | `#f59e0b` | Amber — delayed, important |
| `--status-danger` | `#ef4444` | Red — critical, overdue |

**Typography:**
- Headings: `Outfit` (Google Fonts) — 600–800 weight
- Body: `Plus Jakarta Sans` (Google Fonts) — 400–700 weight

**Layout:**
- Sidebar: fixed 260px width
- Main content: fluid, scrollable
- Cards use `var(--radius-md)` (12px) border radius and subtle `1px` borders
- Grid utilities: `.grid-2`, `.grid-3`, `.grid-4` for responsive column layouts

**Component classes:**
`.card`, `.btn`, `.btn-primary`, `.btn-sm`, `.btn-teal`, `.input-field`, `.form-group`, `.status-badge`, `.app-table`, `.modal-overlay`, `.view-panel`, `.sidebar-badge`, `.notif-bell`

---

## 9. Known Limitations & Extension Points

**Current limitations:**

- **No persistence** — all data resets on page reload. Wiring to `localStorage` or a REST API requires replacing array mutations with fetch calls in each action function.
- **Single user** — read receipts and acknowledgements use a hardcoded current user (`'Pravan M.'`). Multi-user support would require a session/auth layer.
- **Simulated file uploads** — announcement attachments store filename strings only. Actual binary upload needs a backend endpoint or Base64 storage.
- **AI Assistant is locally simulated** — the chat responses are rule-based intent matching, not live API calls. The `fetch` structure is in place for easy swap to a real endpoint.
- **RAG is keyword-based** — no semantic similarity. For production use, replace with actual embeddings (e.g., `@xenova/transformers` for browser-native inference or an external embedding API).
- **Charts are SVG-only** — interactive hover tooltips are not implemented; adding them requires SVG mouse event handlers.

**Extension points:**

- Replace any `let dataArray = [...]` with `async function loadData() { return fetch('/api/...') }` and update the corresponding `render*View()` to await it
- Add `localStorage.setItem('texflow_inventory', JSON.stringify(inventory))` after each mutation to persist the current session's state
- Swap the AI assistant's `generateAIResponse()` function with a real `fetch` to Claude or any LLM API — the chat history format already matches the Anthropic messages schema
- Add a login screen and user context to enable true multi-user read receipts and meeting attendance
- The notification engine (`updateNotifications()`) can be scheduled with `setInterval` to simulate real-time polling

---

*TEX-FLOW — built as a fully self-contained textile operations SPA. Drop the three files anywhere and it runs.*
