import { test, expect, type Page, type TestInfo } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

const routes = ['/', '/work', '/work/code-review-agent', '/work/multi-agent-orchestration-platform', '/resume'];

async function scan(page: Page, info: TestInfo) {
  await page.evaluate(() => document.fonts.ready);
  const results = await new AxeBuilder({ page }).analyze();
  await info.attach('accessibility-results', {
    body: JSON.stringify(results.violations, null, 2),
    contentType: 'application/json',
  });
  expect(results.violations.filter(violation =>
    violation.impact === 'critical' || violation.impact === 'serious'
  )).toEqual([]);
}

for (const route of routes) {
  test(`accessibility of ${route}`, async ({ page }, info) => {
    await page.goto(route);
    if (route === '/work') await expect(page.getByRole('button', { name: 'Professional', exact: true })).toBeEnabled();
    await scan(page, info);
  });
}

test('accessibility of all work with earlier entries open', async ({ page }, info) => {
  await page.goto('/work');
  await page.getByRole('button', { name: 'All work', exact: true }).click();
  await page.locator('.earlier-work summary').click();
  await scan(page, info);
});

test('accessibility of the open mobile navigation', async ({ page }, info) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto('/');
  await page.getByRole('button', { name: 'Open menu' }).click();
  await scan(page, info);
});

test('accessibility of the open reviewer stage', async ({ page }, info) => {
  await page.goto('/work/code-review-agent');
  await page.locator('.stage-details summary').first().click();
  await scan(page, info);
});
