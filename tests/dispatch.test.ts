import test from 'node:test';
import assert from 'node:assert/strict';
import { decideDispatch, type AgentState } from '../src/lib/dispatch.ts';

const states: AgentState[] = ['ready', 'timeout', 'unavailable'];

for (const primary of states) {
  for (const routeKnown of [false, true]) {
    for (const fallbackAvailable of [false, true]) {
      test(`identity blocks ${primary}, route=${routeKnown}, fallback=${fallbackAvailable}`, () => {
        const result = decideDispatch({ tenantVerified: false, routeKnown, primary, fallbackAvailable });
        assert.equal(result.destination, 'blocked');
        assert.deepEqual(result.trace, ['Request', 'Identity missing', 'Stop']);
      });
    }
  }
  test(`unknown route never dispatches to ${primary}`, () => {
    assert.equal(decideDispatch({ tenantVerified: true, routeKnown: false, primary, fallbackAvailable: true }).destination, 'human');
  });
}

test('a ready primary is preferred over fallback', () => {
  assert.equal(decideDispatch({ tenantVerified: true, routeKnown: true, primary: 'ready', fallbackAvailable: true }).destination, 'primary');
});

for (const primary of ['timeout', 'unavailable'] as const) {
  test(`${primary} uses a known fallback`, () => {
    assert.equal(decideDispatch({ tenantVerified: true, routeKnown: true, primary, fallbackAvailable: true }).destination, 'fallback');
  });
  test(`${primary} without fallback surfaces failure`, () => {
    const result = decideDispatch({ tenantVerified: true, routeKnown: true, primary, fallbackAvailable: false });
    assert.equal(result.destination, 'human');
    assert.equal(result.trace.at(-1), 'Human intervention');
  });
}
