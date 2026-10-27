import { test } from 'node:test';
import assert from 'node:assert/strict';
import { copyFileSync, mkdirSync, mkdtempSync, readFileSync, rmSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { spawnSync } from 'node:child_process';

const resume = JSON.parse(readFileSync('src/content/resume.json', 'utf8'));
const expectedSkills = [
  { category: 'Programming', items: ['Python'] },
  { category: 'Agents & evaluation', items: ['Claude Code', 'Azure OpenAI', 'Microsoft Agent Framework', 'A2A', 'MCP', 'RAG', 'evaluation regression gates'] },
  { category: 'Cloud & delivery', items: ['Azure', 'Container Apps', 'Bicep', 'Terraform', 'Docker', 'Kubernetes', 'Azure DevOps', 'GitHub Actions', 'OpenTelemetry'] },
  { category: 'Data', items: ['SQL', 'Databricks', 'Azure Data Factory', 'Apache Spark'] },
];
const slugs = ['code-review-agent', 'multi-agent-orchestration-platform', 'mobile-payments-rag'];

test('resume has exactly the approved four groups and 21 skills', () => {
  assert.deepEqual(resume.skills, expectedSkills);
  assert.equal(resume.skills.flatMap(group => group.items).length, 21);
});

test('resume selects three canonical professional projects with absolute links', () => {
  assert.deepEqual(resume.projects.map(project => project.title), [
    'Code Review Agent for Azure DevOps', 'Multi-Agent Orchestration Platform', 'Enterprise Mobile Payments RAG Engine',
  ]);
  assert.deepEqual(resume.projects.map(project => project.url), slugs.map(slug => `https://ctrl-infinity.github.io/work/${slug}`));
  assert.match(resume.projects[0].description, /approximately 30-40 PRs.*5-6 repositories/);
  assert.match(resume.projects[1].description, /UAT.*March 2026/);
  assert.match(resume.projects[1].description, /Five agents/);
  assert.match(resume.projects[2].description, /reported/i);
});

test('actual LaTeX generator preserves identity, milestones, links and escaping without GPA', () => {
  const result = spawnSync(process.execPath, ['scripts/build-tex.js'], { encoding: 'utf8' });
  assert.equal(result.status, 0, result.stderr + result.stdout);
  const tex = readFileSync('src/resume/resume.tex', 'utf8');
  for (const text of ['Selected professional work', 'AI Engineer', 'Open to roles in India and internationally', 'March 2026', 'July 2026']) {
    assert.ok(tex.includes(text), text);
  }
  for (const slug of slugs) assert.ok(tex.includes(`\\href{https://ctrl-infinity.github.io/work/${slug}}`), slug);
  assert.match(tex, /20\\%/);
  assert.match(tex, /60\\%/);
  assert.match(tex, /Agents \\& evaluation/);
  assert.equal((tex.match(/\\begin\{minipage\}/g) ?? []).length, resume.experience.length, 'Keep each employment entry together');
  assert.doesNotMatch(tex, /GPA:|\{\{[A-Z_]+\}\}|Wireless Charging System|Semantics-based IR System/);
  for (const job of resume.experience) assert.ok(tex.includes(job.role), job.role);
});

for (const section of ['experience', 'education']) {
  test(`generator accepts an omitted or null optional ${section} location`, () => {
    const fixture = mkdtempSync(join(tmpdir(), 'portfolio-resume-generation-'));
    try {
      mkdirSync(join(fixture, 'scripts'));
      mkdirSync(join(fixture, 'src', 'content'), { recursive: true });
      mkdirSync(join(fixture, 'src', 'resume'));
      writeFileSync(join(fixture, 'package.json'), '{"type":"module"}');
      copyFileSync('scripts/build-tex.js', join(fixture, 'scripts', 'build-tex.js'));
      copyFileSync('src/resume/template.tex', join(fixture, 'src', 'resume', 'template.tex'));
      for (const location of [undefined, null]) {
        const data = structuredClone(resume);
        data[section][0].location = location;
        writeFileSync(join(fixture, 'src', 'content', 'resume.json'), JSON.stringify(data));
        const result = spawnSync(process.execPath, [join(fixture, 'scripts', 'build-tex.js')], { encoding: 'utf8' });
        assert.equal(result.status, 0, result.stderr + result.stdout);
        const tex = readFileSync(join(fixture, 'src', 'resume', 'resume.tex'), 'utf8');
        assert.match(tex, /SimCorp/);
        assert.match(tex, /Selected professional work/);
        assert.doesNotMatch(tex, /undefined|null|\{\{[A-Z_]+\}\}/);
      }
    } finally {
      rmSync(fixture, { recursive: true, force: true });
    }
  });
}

test('validator rejects missing identity and malformed or missing HTTPS project URLs', () => {
  const fixture = mkdtempSync(join(tmpdir(), 'portfolio-resume-validation-'));
  try {
    mkdirSync(join(fixture, 'scripts'));
    mkdirSync(join(fixture, 'src', 'content'), { recursive: true });
    mkdirSync(join(fixture, 'src', 'resume'));
    writeFileSync(join(fixture, 'package.json'), '{"type":"module"}');
    copyFileSync('scripts/validate-resume.js', join(fixture, 'scripts', 'validate-resume.js'));
    writeFileSync(join(fixture, 'src', 'resume', 'resume.tex'), 'No unresolved placeholders.');
    const cases = [
      ['label', ' '], ['opportunities', undefined],
      ['url', undefined], ['url', null], ['url', 'http://example.com'], ['url', 'not a URL'],
      ['url', 'https:example.com'], ['url', 'https:/example.com'], ['url', 'https:///example.com'],
    ];
    for (const [field, value] of cases) {
      const data = structuredClone(resume);
      if (field === 'url') data.projects[0].url = value;
      else data.basics[field] = value;
      writeFileSync(join(fixture, 'src', 'content', 'resume.json'), JSON.stringify(data));
      const result = spawnSync(process.execPath, [join(fixture, 'scripts', 'validate-resume.js')], { encoding: 'utf8' });
      assert.equal(result.status, 1, `${field}: ${result.stdout}${result.stderr}`);
      assert.match(result.stderr, new RegExp(field));
      assert.doesNotMatch(result.stderr, /crashed/);
    }
  } finally {
    rmSync(fixture, { recursive: true, force: true });
  }
});
