# Resume generation

[resume.json](../content/resume.json) supplies both the
[web resume](../pages/resume.astro) and the downloadable PDF.
[build-tex.js](../../scripts/build-tex.js) fills [template.tex](template.tex);
the generated `src/resume/resume.tex` is ignored.

Keep the AI Engineer identity separate from actual employment titles. The four
skills groups contain the approved 21 entries. Selected professional work is
reviewer, orchestrator, then RAG, with absolute HTTPS case-study URLs. Preserve
approximate reviewer coverage, the July/March 2026 milestones, five UAT agents,
and the RAG reported-results qualifier. GPA remains in source data but is not
displayed on the web or PDF. Earlier projects remain accessible through Work.

## Local build

From the repository root:

```powershell
npm test
node scripts\build-tex.js
npm run validate-resume
pdflatex -interaction=nonstopmode -halt-on-error -output-directory=src\resume src\resume\resume.tex
Copy-Item src\resume\resume.pdf public\resume\vinayak-gupta-resume.pdf
```

Tectonic is an alternative local TeX engine:

```powershell
tectonic --keep-logs --outdir src\resume src\resume\resume.tex
```

Use a trusted local installation or the existing GitHub Actions build. Do not
send the resume to an external compilation API. Tectonic may download TeX
packages, but compilation itself is local.

The template uses 11pt sans-serif text on A4. Inspect **every generated page**
before copying it to the public path: at most two pages, no clipped or
overlapping text, all selected-project links clickable, and content consistent
with JSON. Check the actual PDF, not just generated TeX. Do not add an automatic
"updated" date based on build time.

## CI and publication

The existing [Pages workflow](../../.github/workflows/deploy.yml) generates TeX,
validates source and placeholders, compiles with `xu-cheng/latex-action`, copies
the PDF into `public/resume`, then builds Astro. Its configured branch triggers
remain unchanged; only `main` deploys. A local `npm run build` **does not compile
the PDF**, so regenerate the committed public artifact when resume data changes.

The public URL stays `/resume/vinayak-gupta-resume.pdf`. Browser tests compare the
download against this actual file. Never push or deploy solely to obtain a PDF
without authorization.
