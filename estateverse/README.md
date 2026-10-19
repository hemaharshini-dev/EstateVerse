# EstateVerse

EstateVerse is a small portfolio concept for exploring a fictional Hyderabad residential development. It demonstrates an interactive property discovery flow inspired by real-estate digital-twin products. Aurelia Heights, its apartment inventory, prices, and layouts are fictional.

## Run locally

```bash
npm install
npm run dev
```

Open `http://localhost:3000`. The project also supports `npm run build` and `npm start` for a production build.

## Demo flow

1. Filter the local apartment records or try a supported search such as `2 BHK under 80 lakh` or `A-0402`.
2. Select a result or a highlighted apartment in the development overview.
3. Open **View in 3D** to inspect the furnished apartment cutaway. Choose a room in the viewer or floor plan to highlight the same room in the 3D scene.
4. Return to the development overview or open session insights to see unit and room selections, searches, filter changes, and floor-plan opens from the current visit.

Use **Quick tour** for a short walkthrough. Search is deterministic local matching, not an LLM. Session insights stay in page state and are not sent or persisted.

## Scope and accuracy

- 15 fictional apartment records stored in `src/data/apartments.ts`.
- Procedural Three.js site and furnished apartment geometry in `src/components/DevelopmentScene.tsx`.
- Filters, supported search phrases, selection state, room linking, floor plan, and session-only analytics are in `src/app/page.tsx`.
- The 3D apartment and SVG floor plan are conceptual illustrations, not construction-accurate models or drawings. Price is sample data in lakh INR.
- No API keys, external database, paid service, or backend is required. The core 3D experience uses generated geometry rather than remote images.

See [MVP_PLAN.md](./MVP_PLAN.md) for the product scope and implementation outline.
