# Continuum AI — Project System Explorer

Interactive presentation prototype for the Continuum AI capstone project. Demonstrates planned system architecture, team ownership, data flows, routing visualization, and mock Control Tower screens.

**This is a frontend-only demo** — all data is mocked and labeled accordingly.

## Quick Start

```bash
cd continuum-explorer
npm install
npm run dev
```

Open [http://localhost:5173](http://localhost:5173)

## Features

- **Overview** — KPI cards, charts, system health, security flow, dependency graph, globe routing
- **Architecture** — Interactive React Flow diagram with click-to-inspect components
- **Components** — Searchable catalog of all 20 subsystems
- **Data Flow** — Animated simulation of request lifecycle + AI pipeline
- **Team** — Six-member ownership map (Sreenand, Sooraj, Nabin, Salem, Nikhil, Deekshith)
- **Roadmap** — Six-phase development timeline
- **Demo** — Mock Control Tower screens (login, dashboard, fleet, routes, admin)
- **Presentation Mode** — Guided 9-step demo with keyboard navigation (← → Esc)

## Tech Stack

React · Vite · Tailwind CSS · React Flow · Recharts · Framer Motion · Lucide React

## Customizing Content

Edit [`src/data/projectData.js`](src/data/projectData.js) to update team members, components, architecture nodes, KPIs, roadmap phases, and presentation steps.

## Build

```bash
npm run build
npm run preview
```
