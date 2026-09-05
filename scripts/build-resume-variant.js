// Build one or all tailored resume variants without touching the public resume.
//
//   node scripts/build-resume-variant.js <slug>      # docs/applications/resumes/<slug>.json
//   node scripts/build-resume-variant.js --all
//   node scripts/build-resume-variant.js <slug> --no-pdf   # render .tex only
//
// Output: docs/applications/build/<slug>.tex and docs/applications/pdf/<slug>.pdf (both git-ignored).
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { buildTex, parseArgs, DEFAULT_TEMPLATE } from './build-tex.js';
import { compileFile } from './compile-tex-api.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const projectRoot = path.resolve(__dirname, '..');
const variantsDir = path.join(projectRoot, 'docs/applications/resumes');
const buildDir = path.join(projectRoot, 'docs/applications/build');
const pdfDir = path.join(projectRoot, 'docs/applications/pdf');

const args = parseArgs(process.argv.slice(2));
let slugs = args._ ?? [];
if (args.all) {
  slugs = fs.readdirSync(variantsDir).filter(f => f.endsWith('.json')).map(f => f.replace(/\.json$/, ''));
}
if (slugs.length === 0) {
  console.error('Usage: node scripts/build-resume-variant.js <slug> [<slug> ...] | --all   [--no-pdf]');
  process.exit(1);
}

let failed = false;
for (const slug of slugs) {
  const jsonPath = path.join(variantsDir, `${slug}.json`);
  if (!fs.existsSync(jsonPath)) {
    console.error(`No variant found at ${path.relative(projectRoot, jsonPath)}`);
    failed = true;
    continue;
  }
  const texPath = path.join(buildDir, `${slug}.tex`);
  buildTex({ jsonPath, templatePath: DEFAULT_TEMPLATE, outputPath: texPath });
  console.log(`[${slug}] tex -> ${path.relative(projectRoot, texPath)}`);
  if (args['no-pdf']) continue;
  try {
    await compileFile({ texPath, pdfPath: path.join(pdfDir, `${slug}.pdf`) });
  } catch (err) {
    console.error(`[${slug}] PDF compile failed: ${err.message}`);
    failed = true;
  }
}
process.exit(failed ? 1 : 0);
