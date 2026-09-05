import fs from 'fs';
import path from 'path';
import { fileURLToPath, pathToFileURL } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.resolve(__dirname, '..');

export const DEFAULT_JSON = path.join(projectRoot, 'src/content/resume.json');
export const DEFAULT_TEMPLATE = path.join(projectRoot, 'src/resume/template.tex');
export const DEFAULT_OUTPUT = path.join(projectRoot, 'src/resume/resume.tex');

// Helper to escape special LaTeX characters
const escapeTex = (str) => {
    if (!str) return '';
    return str.replace(/\\/g, '\\textbackslash{}')
              .replace(/%/g, '\\%')
              .replace(/\$/g, '\\$')
              .replace(/#/g, '\\#')
              .replace(/_/g, '\\_')
              .replace(/{/g, '\\{')
              .replace(/}/g, '\\}')
              .replace(/~/g, '\\textasciitilde{}')
              .replace(/\^/g, '\\textasciicircum{}')
              .replace(/&/g, '\\&'); // Escape & last so we don't double escape it
};

// Helper to handle markdown bold **text** -> \textbf{text}
const formatBold = (str) => {
    return str.replace(/\*\*(.*?)\*\*/g, '\\textbf{$1}');
};

/** Render a resume JSON object into the LaTeX template. Pure: no file I/O. */
export function renderTex(data, template) {
    template = template.replace('{{NAME}}', escapeTex(data.basics.name));

    const basics = data.basics;
    let contactParts = [];
    if (basics.location) contactParts.push(escapeTex(basics.location));
    if (basics.email) contactParts.push(escapeTex(basics.email));
    if (basics.phone) contactParts.push(escapeTex(basics.phone));

    let linkParts = [];
    if (basics.linkedin) {
      linkParts.push(`\\href{${basics.linkedin}}{\\faLinkedin}`);
    }
    if (basics.github) {
      linkParts.push(`\\href{${basics.github}}{\\faGithub}`);
    }

    let contactLine = contactParts.join(' | ');
    if (linkParts.length > 0) {
      contactLine += ' | \\\\ ' + linkParts.join(' | ');
    }
    template = template.replace('{{CONTACT}}', contactLine);
    template = template.replace('{{ABOUT}}', formatBold(escapeTex(data.basics.summary)));

    // Build Skills
    let skillsTex = '\\begin{tabularx}{\\textwidth}{@{} l X @{}}\n';
    data.skills.forEach(skill => {
        skillsTex += `    \\textbf{${escapeTex(skill.category)}} & ${escapeTex(skill.items.join(' | '))} \\\\[3pt]\n`;
    });
    skillsTex += '\\end{tabularx}';
    template = template.replace('{{SKILLS}}', skillsTex);

    // Build Experience
    let expTex = '';
    data.experience.forEach(job => {
        expTex += `\\needspace{5\\baselineskip}\n`; // keep the job header with its first bullets
        expTex += `\\textbf{${escapeTex(job.company)}} \\hfill ${escapeTex(job.location)}\\\\\n`;
        expTex += `\\textit{${escapeTex(job.role)}} \\hfill ${escapeTex(job.startDate)} - ${escapeTex(job.endDate)}\\\\\n`;
        expTex += `\\vspace{-1mm}\n`;
        expTex += `\\begin{itemize} \\itemsep 1pt\n`;
        job.highlights.forEach(h => {
            expTex += `    \\item ${formatBold(escapeTex(h))}\n`;
        });
        expTex += `\\end{itemize}\n\\vspace{1.5mm}\n`;
    });
    template = template.replace('{{EXPERIENCE}}', expTex);

    // Build Projects
    let projTex = '\\begin{itemize}\n';
    data.projects.forEach(proj => {
        projTex += `    \\needspace{3\\baselineskip}\n`;
        projTex += `    \\item {\\textbf{${escapeTex(proj.title)}}} {\\sl ${escapeTex(proj.technologies.join(', '))}} `;
        if (proj.github) {
            projTex += `\\href{${proj.github}}{\\faGithub} `;
        }
        projTex += `\\\\\n${formatBold(escapeTex(proj.description))}\\\\\n`;
    });
    projTex += '\\end{itemize}\n';
    template = template.replace('{{PROJECTS}}', projTex);

    // Build Education
    let eduTex = '';
    data.education.forEach(edu => {
        eduTex += `\\textbf{${escapeTex(edu.school)}}\\hfill ${escapeTex(edu.location)}\\\\\n`;
        eduTex += `${escapeTex(edu.degree)} \\textit{GPA: ${escapeTex(edu.gpa)}} \\hfill ${escapeTex(edu.startDate)} - ${escapeTex(edu.endDate)}\\\\\n`;
        eduTex += `\\vspace{2mm}\n`;
    });
    template = template.replace('{{EDUCATION}}', eduTex);

    return template;
}

/** Read JSON + template from disk, render, and write the .tex file. Returns the output path. */
export function buildTex({ jsonPath = DEFAULT_JSON, templatePath = DEFAULT_TEMPLATE, outputPath = DEFAULT_OUTPUT } = {}) {
    const data = JSON.parse(fs.readFileSync(jsonPath, 'utf8'));
    const template = fs.readFileSync(templatePath, 'utf8');
    const tex = renderTex(data, template);
    fs.mkdirSync(path.dirname(outputPath), { recursive: true });
    fs.writeFileSync(outputPath, tex);
    return outputPath;
}

export function parseArgs(argv) {
    const args = {};
    for (let i = 0; i < argv.length; i++) {
        const a = argv[i];
        if (a.startsWith('--')) {
            const key = a.slice(2);
            const next = argv[i + 1];
            if (next !== undefined && !next.startsWith('--')) { args[key] = next; i++; }
            else args[key] = true;
        } else {
            (args._ ??= []).push(a);
        }
    }
    return args;
}

const isMain = process.argv[1] && import.meta.url === pathToFileURL(path.resolve(process.argv[1])).href;
if (isMain) {
    // Usage: node scripts/build-tex.js [--input <resume.json>] [--output <resume.tex>] [--template <template.tex>]
    const args = parseArgs(process.argv.slice(2));
    const out = buildTex({
        jsonPath: args.input ? path.resolve(args.input) : DEFAULT_JSON,
        templatePath: args.template ? path.resolve(args.template) : DEFAULT_TEMPLATE,
        outputPath: args.output ? path.resolve(args.output) : DEFAULT_OUTPUT,
    });
    console.log(`LaTeX resume generated at ${path.relative(projectRoot, out)}`);
}
