# Tex-Flow Textile ERP & PLM Control Center

An advanced, high-fidelity ERP dashboard tailored for textile manufacturing, Product Lifecycle Management (PLM), raw material inventory, and transcontinental shipment logistics. The application features a client-side Retrieval-Augmented Generation (RAG) system for design compliance and an integrated, context-aware AI Assistant.

> **Design Note**: Developed as a zero-dependency HTML5 / CSS3 / Vanilla JS Single Page Application (SPA). This eliminates `node_modules` weight completely, making the application extremely lightweight (~100 KB total), fast-loading, and completely offline-friendly.

---

## 🚀 Key Features

### 1. Logistics updates
- **SVG Route Mapping**: Displays active transcontinental cargo lanes (e.g. Egypt ➔ Italy, India ➔ Germany) on a custom SVG world grid with crawling vessel dots showing real-time progress.
- **Milestone Logs**: Tracks departures, customs holds, speed reductions, and cargo dockings.
- **Incident Mitigation**: If a cargo is delayed or critical, click mitigation options (e.g. Genoa Reroute or Rotterdam Air Freight) to instantly update route coordinates, ETA, and logs.

### 2. PLM & RAG Spec Search
- **Stage Workflows**: View active garment product cards (blazers, denim jackets, hoodies) and advance them through production milestones (Concept, Tech Pack, Prototyping, Bulk Production, Quality Control).
- **RAG Knowledge Base**: 
  - Contains index records (OEKO-TEX chemical guidelines, Denim SOP recipes, GOTS environmental standards).
  - Ingest custom technical documents on the fly to index their text.
  - **Search & Retrieval**: Enter compliance queries (e.g., "lead limit", "hydrosulfite"). The client-side TF-IDF system ranks matching text chunks and synthesizes an answer referencing the source document.

### 3. Material Inventory
- **Interactive Stock Tables**: Tracks fibers, yarns, dyes, and trims. Includes search filters and category tags.
- **Stock adjustments**: Edit material quantities via interactive forms. Low stock warnings update across dashboards.
- **SVG Analytics**: Includes a custom-rendered vertical bar chart (safety margins relative to reorders) and a donut chart (total volume category allocation).

### 4. Integrated AI Assistant
- **Context-Aware Dialogue**: Chat with the assistant regarding stock anomalies, delayed vessel statuses, or compliance rules.
- **Cross-state Reasoning**: The AI crosses datasets on the fly. For example, asking *"Does the Indigo Dye delay in Hamburg affect our production?"* prompts the agent to trace:
  1. Hamburg port delay of shipment `TX-908`.
  2. Cargo contains Indigo Dye.
  3. Indigo Dye is currently at low stock.
  4. The PLM project "Recycled Denim Jacket" relies on Indigo Dye.
  5. Concludes that denim jacket bulk production is at risk and recommends air cargo mitigation.

---

## 📂 File Structure

```
textile-industry-app/
├── index.html       # Structural layouts, sidebar tabs, and base templates
├── style.css        # Premium custom CSS (HSL variables, glassmorphism, charts, transitions)
├── app.js           # App state, SVG rendering, RAG indexing engine, and AI assistant logic
└── README.md        # Documentation and guide
```

---

## 🛠️ How to Run

Since the application has **zero dependencies**, you can run it in two ways:

### Option A: Open Directly
Simply double-click the `index.html` file or drag it into any modern web browser.

### Option B: Local HTTP Server (Recommended)
Spun up a local web server (e.g., Python) to avoid local CORS blocks on advanced file actions:
```bash
# Start server in the project folder
python3 -m http.server 8080
```
Open your browser and navigate to: **[http://localhost:8080](http://localhost:8080)**
