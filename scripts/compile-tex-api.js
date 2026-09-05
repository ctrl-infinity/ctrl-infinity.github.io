import fs from 'fs';
import path from 'path';
import { fileURLToPath, pathToFileURL } from 'url';
import { parseArgs } from './build-tex.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.resolve(__dirname, '..');

export const DEFAULT_TEX = path.join(projectRoot, 'src/resume/resume.tex');
export const DEFAULT_PDF = path.join(projectRoot, 'public/resume/vinayak-gupta-resume.pdf');

/** Compile a LaTeX source string to a PDF Buffer via the public YtoTech LaTeX-on-HTTP API. */
export async function compileTex(texContent) {
  const response = await fetch('https://latex.ytotech.com/builds/sync', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      compiler: 'pdflatex',
      resources: [{ main: true, content: texContent }]
    })
  });
  if (!response.ok) {
    const errText = await response.text();
    throw new Error(`API returned status ${response.status}: ${errText}`);
  }
  return Buffer.from(await response.arrayBuffer());
}

/** Read a .tex file, compile it, and write the PDF. Returns the PDF path. */
export async function compileFile({ texPath = DEFAULT_TEX, pdfPath = DEFAULT_PDF } = {}) {
  if (!fs.existsSync(texPath)) {
    throw new Error(`${path.relative(projectRoot, texPath)} not found. Run "node scripts/build-tex.js" first.`);
  }
  console.log(`Reading ${path.relative(projectRoot, texPath)}...`);
  const texContent = fs.readFileSync(texPath, 'utf8');
  console.log('Sending request to public LaTeX compilation API (YtoTech)...');
  const buffer = await compileTex(texContent);
  fs.mkdirSync(path.dirname(pdfPath), { recursive: true });
  fs.writeFileSync(pdfPath, buffer);
  console.log(`PDF written to ${path.relative(projectRoot, pdfPath)}`);
  return pdfPath;
}

const isMain = process.argv[1] && import.meta.url === pathToFileURL(path.resolve(process.argv[1])).href;
if (isMain) {
  // Usage: node scripts/compile-tex-api.js [--input <resume.tex>] [--output <out.pdf>]
  const args = parseArgs(process.argv.slice(2));
  try {
    await compileFile({
      texPath: args.input ? path.resolve(args.input) : DEFAULT_TEX,
      pdfPath: args.output ? path.resolve(args.output) : DEFAULT_PDF,
    });
  } catch (error) {
    console.error('Failed to compile LaTeX to PDF via API:', error.message);
    process.exit(1);
  }
}
