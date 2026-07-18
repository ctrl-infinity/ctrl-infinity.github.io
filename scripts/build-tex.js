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

// Helper to escape special LaTeX characters
const escapeTex = (str) => {
    return str.replace(/\\/g, '\\textbackslash{}')
              .replace(/&/g, '\\&')
              .replace(/%/g, '\\%')
              .replace(/\$/g, '\\$')
              .replace(/#/g, '\\#')
              .replace(/_/g, '\\_')
              .replace(/{/g, '\\{')
              .replace(/}/g, '\\}')
              .replace(/~/g, '\\textasciitilde{}')
              .replace(/\^/g, '\\textasciicircum{}');
};

// Replace Basics
template = template.replace('{{NAME}}', escapeTex(data.basics.name));
template = template.replace('{{EMAIL}}', escapeTex(data.basics.email));

// Build Experience
let expTex = '';
data.experience.forEach(job => {
    expTex += `\\noindent\\textbf{${escapeTex(job.company)}} \\hfill ${escapeTex(job.startDate)} -- ${escapeTex(job.endDate)}\\\\\n`;
    expTex += `\\textit{${escapeTex(job.role)}}\n`;
    expTex += `\\begin{itemize}[leftmargin=*,nosep]\n`;
    job.highlights.forEach(h => {
        expTex += `    \\item ${escapeTex(h)}\n`;
    });
    expTex += `\\end{itemize}\n\\vspace{0.3cm}\n`;
});
template = template.replace('{{EXPERIENCE}}', expTex);

// Build Education
let eduTex = '';
data.education.forEach(edu => {
    eduTex += `\\noindent\\textbf{${escapeTex(edu.school)}} \\hfill ${escapeTex(edu.startDate)} -- ${escapeTex(edu.endDate)}\\\\\n`;
    eduTex += `${escapeTex(edu.degree)}\n\\vspace{0.3cm}\n`;
});
template = template.replace('{{EDUCATION}}', eduTex);

// Build Skills
let skillsTex = '';
data.skills.forEach(skill => {
    skillsTex += `\\noindent\\textbf{${escapeTex(skill.category)}:} ${escapeTex(skill.items.join(', '))}\\\\\n`;
});
template = template.replace('{{SKILLS}}', skillsTex);

fs.writeFileSync(outputPath, template);
console.log('LaTeX resume generated at src/resume/resume.tex');
