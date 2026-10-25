import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const jsonPath = path.resolve(__dirname, '../src/content/resume.json');
const templatePath = path.resolve(__dirname, '../src/resume/template.tex');
const outputPath = path.resolve(__dirname, '../src/resume/resume.tex');

const data = JSON.parse(fs.readFileSync(jsonPath, 'utf8'));
let template = fs.readFileSync(templatePath, 'utf8');

// Replace once so braces introduced by an escape are not escaped again.
const escapeTex = (str) => {
    const escapes = {
        '\\': '\\textbackslash{}', '%': '\\%', '$': '\\$', '#': '\\#',
        '_': '\\_', '{': '\\{', '}': '\\}', '~': '\\textasciitilde{}',
        '^': '\\textasciicircum{}', '&': '\\&',
    };
    return str.replace(/[\\%$#_{}~^&]/g, (character) => escapes[character]);
};

// Helper to handle markdown bold **text** -> \textbf{text}
const formatBold = (str) => {
    return str.replace(/\*\*(.*?)\*\*/g, '\\textbf{$1}');
};

// Replace Basics
template = template.replace('{{NAME}}', () => escapeTex(data.basics.name));
template = template.replace('{{LABEL}}', () => escapeTex(data.basics.label));
template = template.replace('{{OPPORTUNITIES}}', () => escapeTex(data.basics.opportunities));

const basics = data.basics;
let contactParts = [];
if (basics.location) contactParts.push(escapeTex(basics.location));
if (basics.email) contactParts.push(escapeTex(basics.email));
if (basics.phone) contactParts.push(escapeTex(basics.phone));

if (basics.linkedin) {
  contactParts.push(`\\href{${escapeTex(basics.linkedin)}}{LinkedIn}`);
}
if (basics.github) {
  contactParts.push(`\\href{${escapeTex(basics.github)}}{GitHub}`);
}

template = template.replace('{{CONTACT}}', () => contactParts.join(' | '));
template = template.replace('{{ABOUT}}', () => formatBold(escapeTex(data.basics.summary)));

// Build Skills
let skillsTex = '\\begin{tabularx}{\\textwidth}{@{} l >{\\raggedright\\arraybackslash}X @{}}\n';
data.skills.forEach(skill => {
    skillsTex += `    \\textbf{${escapeTex(skill.category)}} & ${escapeTex(skill.items.join(' | '))} \\\\[3pt]\n`;
});
skillsTex += '\\end{tabularx}';
template = template.replace('{{SKILLS}}', () => skillsTex);

// Build Experience
let expTex = '';
data.experience.forEach(job => {
    expTex += `\\begin{minipage}{\\textwidth}\\raggedright\n`;
    expTex += `\\textbf{${escapeTex(job.company)}} \\hfill ${escapeTex(job.location)}\\\\\n`;
    expTex += `\\textit{${escapeTex(job.role)}} \\hfill ${escapeTex(job.startDate)} - ${escapeTex(job.endDate)}\\\\\n`;
    expTex += `\\begin{itemize}\n`;
    job.highlights.forEach(h => {
        expTex += `    \\item ${formatBold(escapeTex(h))}\n`;
    });
    expTex += `\\end{itemize}\n\\end{minipage}\\par\\vspace{1.5mm}\n`;
});
template = template.replace('{{EXPERIENCE}}', () => expTex);

// Build Projects
let projTex = '\\begin{itemize}\n';
data.projects.forEach(proj => {
    projTex += `    \\item \\href{${escapeTex(proj.url)}}{\\textbf{${escapeTex(proj.title)}}}\\\\\n`;
    projTex += `\\textit{${escapeTex(proj.technologies.join(', '))}}\\\\\n`;
    projTex += `${formatBold(escapeTex(proj.description))}\n`;
});
projTex += '\\end{itemize}\n';
template = template.replace('{{PROJECTS}}', () => projTex);

// Build Education
let eduTex = '';
data.education.forEach(edu => {
    eduTex += `\\textbf{${escapeTex(edu.school)}}\\hfill ${escapeTex(edu.location)}\\\\\n`;
    eduTex += `${escapeTex(edu.degree)} \\hfill ${escapeTex(edu.startDate)} - ${escapeTex(edu.endDate)}\\\\\n`;
    eduTex += `\\vspace{2mm}\n`;
});
template = template.replace('{{EDUCATION}}', () => eduTex);

fs.writeFileSync(outputPath, template);
console.log('LaTeX resume generated at src/resume/resume.tex');
