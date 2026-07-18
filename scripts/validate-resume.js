import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const projectRoot = path.resolve(__dirname, '..');
const jsonPath = path.join(projectRoot, 'src/content/resume.json');
const texPath = path.join(projectRoot, 'src/resume/resume.tex');

function logError(msg) {
  console.error(`\x1b[31m[Validation Error] ${msg}\x1b[0m`);
}

function logSuccess(msg) {
  console.log(`\x1b[32m[Validation Success] ${msg}\x1b[0m`);
}

try {
  // 1. Validate JSON exists and is parseable
  if (!fs.existsSync(jsonPath)) {
    logError('resume.json not found.');
    process.exit(1);
  }

  const rawJson = fs.readFileSync(jsonPath, 'utf8');
  let data;
  try {
    data = JSON.parse(rawJson);
  } catch (e) {
    logError(`resume.json is not valid JSON: ${e.message}`);
    process.exit(1);
  }

  // 2. Validate schema requirements
  let hasErrors = false;

  // Basics
  if (!data.basics) {
    logError('basics section is missing.');
    hasErrors = true;
  } else {
    const requiredBasics = ['name', 'email', 'summary'];
    requiredBasics.forEach(field => {
      if (!data.basics[field] || typeof data.basics[field] !== 'string') {
        logError(`basics.${field} must be a non-empty string.`);
        hasErrors = true;
      }
    });
  }

  // Skills
  if (!Array.isArray(data.skills)) {
    logError('skills section must be an array.');
    hasErrors = true;
  } else {
    data.skills.forEach((group, i) => {
      if (!group.category || typeof group.category !== 'string') {
        logError(`skills[${i}].category must be a non-empty string.`);
        hasErrors = true;
      }
      if (!Array.isArray(group.items) || group.items.some(item => typeof item !== 'string')) {
        logError(`skills[${i}].items must be an array of strings.`);
        hasErrors = true;
      }
    });
  }

  // Experience
  if (!Array.isArray(data.experience)) {
    logError('experience section must be an array.');
    hasErrors = true;
  } else {
    data.experience.forEach((job, i) => {
      const requiredFields = ['company', 'role', 'startDate', 'endDate'];
      requiredFields.forEach(field => {
        if (!job[field] || typeof job[field] !== 'string') {
          logError(`experience[${i}].${field} must be a non-empty string.`);
          hasErrors = true;
        }
      });
      if (!Array.isArray(job.highlights) || job.highlights.some(h => typeof h !== 'string')) {
        logError(`experience[${i}].highlights must be an array of strings.`);
        hasErrors = true;
      }
    });
  }

  // Projects
  if (!Array.isArray(data.projects)) {
    logError('projects section must be an array.');
    hasErrors = true;
  } else {
    data.projects.forEach((proj, i) => {
      if (!proj.title || typeof proj.title !== 'string') {
        logError(`projects[${i}].title must be a non-empty string.`);
        hasErrors = true;
      }
      if (!Array.isArray(proj.technologies) || proj.technologies.some(t => typeof t !== 'string')) {
        logError(`projects[${i}].technologies must be an array of strings.`);
        hasErrors = true;
      }
      if (!proj.description || typeof proj.description !== 'string') {
        logError(`projects[${i}].description must be a non-empty string.`);
        hasErrors = true;
      }
    });
  }

  // Education
  if (!Array.isArray(data.education)) {
    logError('education section must be an array.');
    hasErrors = true;
  } else {
    data.education.forEach((edu, i) => {
      const requiredFields = ['school', 'degree', 'gpa', 'startDate', 'endDate'];
      requiredFields.forEach(field => {
        if (!edu[field] || typeof edu[field] !== 'string') {
          logError(`education[${i}].${field} must be a non-empty string.`);
          hasErrors = true;
        }
      });
    });
  }

  if (hasErrors) {
    process.exit(1);
  }
  logSuccess('resume.json schema validation passed.');

  // 3. Validate resume.tex placeholders
  if (!fs.existsSync(texPath)) {
    logError('resume.tex not found. Running generation first...');
    logError('Please run "node scripts/build-tex.js" before validation.');
    process.exit(1);
  }

  const texContent = fs.readFileSync(texPath, 'utf8');
  const placeholderRegex = /\{\{[A-Z_]+\}\}/g;
  const matches = texContent.match(placeholderRegex);

  if (matches && matches.length > 0) {
    logError(`resume.tex contains unreplaced placeholders: ${matches.join(', ')}`);
    process.exit(1);
  }

  logSuccess('resume.tex template validation passed.');
  logSuccess('All resume build validations passed successfully!');
  process.exit(0);
} catch (err) {
  logError(`Validation script crashed: ${err.message}`);
  process.exit(1);
}
