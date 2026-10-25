import { test } from 'node:test';
import assert from 'node:assert/strict';
import { formatWorkStatus } from '../src/lib/work.ts';

test('formats maturity without inferring a production launch', () => {
  assert.equal(formatWorkStatus('active-use', 'July 2026'), 'Active team use since July 2026');
  assert.equal(formatWorkStatus('uat', 'March 2026'), 'In UAT since March 2026');
  assert.equal(formatWorkStatus('production', '2024'), 'In production (2024)');
  assert.equal(formatWorkStatus('built'), 'Built for the team');
  assert.equal(formatWorkStatus('experiment'), 'Experiment');
  assert.equal(formatWorkStatus('uat'), 'In UAT');
});
