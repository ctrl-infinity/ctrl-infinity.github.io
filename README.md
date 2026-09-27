# Vinayak Gupta's portfolio

An Astro portfolio about building useful AI tools and owning their delivery.
The narrative and page-by-page design decisions are captured in
[docs/portfolio-design.md](docs/portfolio-design.md). Shared visual rules live in
[DESIGN.md](DESIGN.md); product truth and constraints live in [PRODUCT.md](PRODUCT.md).

## Development

Use Node **22.12 or newer** and install the locked dependencies with `npm ci`.

| Command | Purpose |
| --- | --- |
| `npm run dev -- --background` | Start the local Astro server |
| `npm run astro -- dev status` | Check the background server |
| `npm run astro -- dev logs` | Read server logs |
| `npm run astro -- dev stop` | Stop the background server |
| `npm run build` | Generate the static site in `dist` |
| `npm run check` | Check Astro and TypeScript types |
| `npm test` | Check the deterministic dispatch policy |
| `npm run test:e2e` | Check routes, responsive layouts, and interactions against the running dev server |
| `npm run preview` | Preview the production build |
| `npm run validate-resume` | Validate the resume data |

Browser checks use Playwright. Install Chromium once with `npx playwright install
chromium`, or use an installed browser: in PowerShell, set
`$env:PLAYWRIGHT_CHANNEL = 'msedge'` before running `npm run test:e2e`.
The default test URL is `http://127.0.0.1:4321`; set `BASE_URL` if the server uses
another port. Set `SCREENSHOT_DIR` to save desktop/mobile captures outside the
repository. No test calls an external AI service.

## Content

Navigation is **Home, Work, Playground, Resume**. Home introduces Vinayak, merges
the former About content, and includes a compact Currently notebook. Old `/about`
and `/now` links forward to the corresponding homepage anchors; static builds
emit meta-refresh pages with fallback links.

- `src/content/work`: project descriptions and case studies.
- `src/content/now`: homepage Currently notes, with explicit editorial update dates.
- `src/content/playground`: experiments and their explanations.
- `src/content/resume.json`: canonical professional and contact details.

The portfolio's illustrative conversations and local simulations are explicitly
labeled. They make no external AI calls and are not production telemetry.
Keep original project claims separate from illustrative material and document
measurement methodology before adding new metrics.
