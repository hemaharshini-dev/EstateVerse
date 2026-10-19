# EstateVerse

EstateVerse is a portfolio MVP for interactive residential property discovery. It uses a fictional Hyderabad development, **Aurelia Heights**, to demonstrate a buyer journey from browsing a development to inspecting an individual apartment.

This is an independent concept project. It is not an official Flux Real product, and it does not connect to Flux Real services or customer data.

## What the project implements

- **Procedural 3D development view:** Orbit and zoom around a generated three-tower scene. Apartments in the local inventory are selectable, and visual states distinguish matches from the current selection.
- **Local apartment inventory:** 15 typed fictional records with unit ID, tower, floor, bedroom count, area, indicative price, facing, and availability.
- **Property discovery:** Filter by budget, floor area, bedrooms, facing, and availability; sort the inventory by tower/floor or price.
- **Deterministic search:** Search supported terms such as `2 BHK under 80 lakh`, `north facing`, `available`, or `A-0402`. Results are matched against the local records. Unsupported terms are reported instead of being answered with invented property data.
- **Synchronized unit details:** Selecting a matching unit updates its details and highlights it in the development view. The selected flat action opens its illustrative furnished 3D cutaway.
- **Room-level inspection:** Choose rooms from the flat viewer or the illustrative floor plan to highlight the corresponding room in 3D.
- **Visit-level engagement summary:** Session insights count unit and room selections, searches, filter changes, and floor-plan opens during the current page visit.
- **Quick tour:** A user-started four-step guide explains the main discovery, inspection, and insights flows.

## Quick walkthrough for a Flux Real review

1. Start with **Quick tour** to orient the reviewer to the buyer journey.
2. Search for **`2 BHK under 80 lakh`**. Point out that the search is an explicit local rule match and shows the supported criteria and result count.
3. Select a result, or click a highlighted apartment in the development view. Show that the selected unit’s details and 3D selection stay in sync.
4. Choose **View in 3D** to move from the development overview to the selected flat. Select a room from the room controls; optionally open **Floor plan**, choose a room there, then use **View ... in the 3D flat** to inspect it.
5. Return to **Development** and open **Session insights**. Explain that these are simple interaction counts for this browser visit, not CRM events or backend analytics.

### Suggested short narration

> “I built this as a small property-discovery experience: a buyer can narrow local inventory, select a home in either the list or the 3D development, and move into a room-level flat view. The search is deterministic and transparent, and the visit panel shows the interactions this prototype can measure. The sample homes, prices, and floor plan are fictional, so this demonstrates the product flow without implying a live property feed or CRM integration.”

## Run locally

Requirements: Node.js and npm.

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000). To create and run a production build:

```bash
npm run build
npm start
```

## Tech stack

- Next.js App Router and TypeScript
- React Three Fiber, Three.js, and Drei for generated 3D scenes
- Tailwind CSS, with project-specific styling in `src/app/globals.css`
- Framer Motion for interface transitions
- Recharts for the session interaction chart
- Lucide React for icons

## Project structure

- `src/app/page.tsx` — discovery screen, filters, local search, selected-home details, room selection, Quick tour, and session insights.
- `src/app/globals.css` — responsive layout and visual styling.
- `src/components/DevelopmentScene.tsx` — procedural development and apartment scenes, camera controls, and selectable units/rooms.
- `src/data/apartments.ts` — typed fictional apartment inventory and price formatting.
- `MVP_PLAN.md` — product goal, MVP journey, scope boundaries, and implementation outline.

## Scope and limitations

- No paid APIs, API keys, external database, or required backend.
- No externally hosted image is needed for the core 3D scene; the geometry is generated in code.
- Search uses a fixed set of recognized criteria over local records. It does not use an LLM.
- The development, apartment cutaway, and floor plan are conceptual illustrations. They are not construction-accurate assets or verified property listings.
- Engagement counts are held in application state for the current visit; they are not persisted or transmitted.
