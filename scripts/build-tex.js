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

// Replace Basics
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
let skillsTex = '\\begin{tabular}{ l l }\n';
data.skills.forEach(skill => {
    skillsTex += `    \\textbf{${escapeTex(skill.category)}} & ${escapeTex(skill.items.join(' | '))} \\\\\n`;
});
skillsTex += '\\end{tabular}';
template = template.replace('{{SKILLS}}', skillsTex);

// Build Experience
let expTex = '';
data.experience.forEach(job => {
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

fs.writeFileSync(outputPath, template);
console.log('LaTeX resume generated at src/resume/resume.tex');
