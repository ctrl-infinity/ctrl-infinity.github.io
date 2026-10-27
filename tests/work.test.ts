import { test } from 'node:test';
import assert from 'node:assert/strict';
import { formatWorkStatus, partitionWork } from '../src/lib/work.ts';
import type { WorkCardProps } from '../src/components/WorkCard.tsx';

test('formats maturity without inferring a production launch', () => {
  assert.equal(formatWorkStatus('active-use', 'July 2026'), 'Active team use since July 2026');
  assert.equal(formatWorkStatus('uat', 'March 2026'), 'In UAT since March 2026');
  assert.equal(formatWorkStatus('production', '2024'), 'In production (2024)');
  assert.equal(formatWorkStatus('built'), 'Built for the team');
  assert.equal(formatWorkStatus('experiment'), 'Experiment');
  assert.equal(formatWorkStatus('uat'), 'In UAT');
});

const fixtures: WorkCardProps[] = [
  { slug: 'reviewer', featured: true, category: 'professional' },
  { slug: 'orchestrator', featured: true, category: 'professional' },
  { slug: 'story', category: 'professional' },
  { slug: 'academic', featured: true, earlier: true, category: 'side-project' },
].map(project => ({ title: project.slug, description: 'Example', role: 'Contributor', tags: [], ...project }));

test('partitions professional work without mutating source order', () => {
  const result = partitionWork(fixtures, 'professional');
  assert.deepEqual(result.featured.map(project => project.slug), ['reviewer', 'orchestrator']);
  assert.deepEqual(result.remaining.map(project => project.slug), ['story']);
  assert.deepEqual(result.earlier, []);
  assert.equal(result.count, 3);
  assert.deepEqual(fixtures.map(project => project.slug), ['reviewer', 'orchestrator', 'story', 'academic']);
});

test('earlier takes precedence over featured and counts closed entries', () => {
  const result = partitionWork(fixtures, 'all');
  assert.equal(result.count, 4);
  assert.deepEqual(result.earlier.map(project => project.slug), ['academic']);
  assert.equal(result.featured.length, 2);
  assert.equal(partitionWork(fixtures, 'side-project').earlier.length, 1);
});

test('empty and unmatched collections have no invented fallback', () => {
  const empty = { featured: [], remaining: [], earlier: [], count: 0 };
  assert.deepEqual(partitionWork([], 'professional'), empty);
  assert.deepEqual(partitionWork(fixtures, 'missing-category'), empty);
});
