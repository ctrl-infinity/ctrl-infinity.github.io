import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const projectRoot = path.resolve(__dirname, '..');
// Optional variant name compiles src/resume/variants/resume-<variant>.tex. Variant PDFs
// stay in src/resume/variants/ so they are not published with the site.
const variant = process.argv[2];
const texPath = variant
  ? path.join(projectRoot, `src/resume/variants/resume-${variant}.tex`)
  : path.join(projectRoot, 'src/resume/resume.tex');
const pdfDestPath = variant
  ? path.join(projectRoot, `src/resume/variants/vinayak-gupta-resume-${variant}.pdf`)
  : path.join(projectRoot, 'public/resume/vinayak-gupta-resume.pdf');
const texRel = path.relative(projectRoot, texPath);
const pdfRel = path.relative(projectRoot, pdfDestPath);

try {
  if (!fs.existsSync(texPath)) {
    console.error(`${texRel} not found. Please run "node scripts/build-tex.js${variant ? ` ${variant}` : ''}" first.`);
    process.exit(1);
  }

  console.log(`Reading ${texRel}...`);
  const texContent = fs.readFileSync(texPath, 'utf8');

  console.log('Sending request to public LaTeX compilation API (YtoTech)...');
  const response = await fetch('https://latex.ytotech.com/builds/sync', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      compiler: 'pdflatex',
      resources: [
        {
          main: true,
          content: texContent
        }
      ]
    })
  });

  if (!response.ok) {
    const errText = await response.text();
    throw new Error(`API returned status ${response.status}: ${errText}`);
  }

  console.log(`Received PDF response. Writing to ${pdfRel}...`);
  const arrayBuffer = await response.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);
  
  fs.mkdirSync(path.dirname(pdfDestPath), { recursive: true });
  fs.writeFileSync(pdfDestPath, buffer);
  console.log('PDF successfully compiled locally via API!');
} catch (error) {
  console.error('Failed to compile LaTeX to PDF via API:', error);
  process.exit(1);
}
