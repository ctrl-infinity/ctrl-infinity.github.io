import { test, expect } from '@playwright/test';
import { mkdir, readFile } from 'node:fs/promises';
import { join } from 'node:path';
import resumeData from '../../src/content/resume.json' with { type: 'json' };

const routes = ['/', '/work', '/work/code-review-agent', '/playground', '/resume', '/playground/dispatch-lab'];

for (const width of [320, 390, 768, 1440]) {
  test(`routes and layout at ${width}px`, async ({ page }) => {
    await page.setViewportSize({ width, height: 900 });
    const errors: string[] = [];
    page.on('pageerror', (error) => errors.push(error.message));
    for (const route of routes) {
      const response = await page.goto(route);
      expect(response?.status(), route).toBe(200);
      await expect(page.locator('main h1')).toHaveCount(1);
      await page.evaluate(() => document.fonts.ready);
      expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth), route).toBe(true);
      if (process.env.SCREENSHOT_DIR && [390, 1440].includes(width)) {
        await mkdir(process.env.SCREENSHOT_DIR, { recursive: true });
        await page.screenshot({
          path: join(process.env.SCREENSHOT_DIR, `${route.replaceAll('/', '-') || 'home'}-${width}.png`),
          fullPage: true,
          style: 'astro-dev-toolbar { display: none !important; }',
        });
      }
    }
    expect(errors).toEqual([]);
  });
}

test('gallery filters and every case study stay reachable', async ({ page }) => {
  await page.goto('/work');
  const cards = page.locator('.work-card');
  const all = await cards.count();
  expect(all).toBeGreaterThan(4);
  const links = await cards.locator('a.text-link[href^="/work/"]').evaluateAll((elements) => elements.map((element) => element.getAttribute('href')!));
  expect(links).toHaveLength(all);
  await page.getByRole('button', { name: 'Professional', exact: true }).click();
  await expect(page.getByRole('button', { name: 'Professional', exact: true })).toHaveAttribute('aria-pressed', 'true');
  expect(await cards.count()).toBeLessThan(all);
  await page.getByRole('button', { name: 'All work', exact: true }).click();
  await expect(cards).toHaveCount(all);
  for (const href of links) {
    expect((await page.goto(href))?.status(), href).toBe(200);
    await expect(page.locator('main h1')).toHaveCount(1);
  }
});

test('case-study stages work with keyboard', async ({ page }) => {
  await page.goto('/work/code-review-agent');
  const detail = page.locator('.stage-details details').first();
  await detail.locator('summary').focus();
  await page.keyboard.press('Enter');
  await expect(detail).toHaveAttribute('open', '');
  await expect(detail.getByText('The boundary.', { exact: false })).toBeVisible();
});

test('lab responds, respects identity, and resets', async ({ page }) => {
  await page.goto('/playground');
  const result = page.getByRole('status');
  await expect(page.getByLabel('Primary agent')).toBeEnabled();
  await page.getByLabel('Primary agent').selectOption('timeout');
  await expect(result).toContainText('Dispatch to the fallback agent.');
  await page.getByLabel('Tenant identity is verified').uncheck();
  await expect(result).toContainText('Stop at the identity boundary.');
  await page.getByLabel('Tenant identity is verified').check();
  await page.getByLabel('A known fallback is available').uncheck();
  await expect(result).toContainText('Make the failure visible.');
  await page.getByLabel('A matching domain route exists').uncheck();
  await expect(result).toContainText('Ask for a clearer route.');
  await page.getByRole('button', { name: 'Reset conditions' }).click();
  await expect(result).toContainText('Dispatch to the primary agent.');
  await expect(page.getByLabel('Tenant identity is verified')).toBeChecked();
  await expect(page.getByLabel('A matching domain route exists')).toBeChecked();
  await expect(page.getByLabel('A known fallback is available')).toBeChecked();
});

test('mobile menu and reduced motion', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.goto('/');
  await page.getByRole('button', { name: 'Open menu' }).click();
  await expect(page.locator('#mobile-menu')).toBeVisible();
  expect(await page.locator('#mobile-menu').evaluate((element) => getComputedStyle(element).animationName)).toBe('none');
  await page.keyboard.press('Escape');
  await expect(page.locator('#mobile-menu')).toBeHidden();
  await expect(page.getByRole('button', { name: 'Open menu' })).toBeFocused();
});

test('content and native disclosures remain usable without JavaScript', async ({ browser }) => {
  const context = await browser.newContext({ javaScriptEnabled: false });
  const page = await context.newPage();
  await page.goto('/playground');
  await expect(page.getByRole('status')).toContainText('Dispatch to the primary agent.');
  await expect(page.getByLabel('Primary agent')).toBeDisabled();
  await expect(page.getByText('Static example.', { exact: false })).toBeVisible();
  await page.goto('/work');
  expect(await page.locator('.work-card').count()).toBeGreaterThan(4);
  await page.goto('/work/code-review-agent');
  await page.locator('.stage-details summary').first().click();
  await expect(page.locator('.stage-details details').first()).toHaveAttribute('open', '');
  await page.goto('/resume');
  await expect(page.locator('.resume-highlights li')).toHaveCount(resumeData.experience.reduce((count, job) => count + job.highlights.length, 0));
  await expect(page.locator('.resume-entry-body').first()).toBeVisible();
  await context.close();
});

test('resume preserves source content and downloads the existing PDF', async ({ page }) => {
  await page.goto('/resume');
  await expect(page.locator('#resume-experience article')).toHaveCount(resumeData.experience.length);
  await expect(page.locator('#resume-projects article')).toHaveCount(resumeData.projects.length);
  await expect(page.locator('#resume-education article')).toHaveCount(resumeData.education.length);
  const plain = (text: string) => text.replace(/\*\*/g, '');
  await expect(page.locator('.resume-overview')).toContainText(plain(resumeData.basics.summary));
  for (const job of resumeData.experience) {
    const article = page.locator('#resume-experience article').filter({ has: page.getByRole('heading', { name: job.role, exact: true }) });
    for (const text of [job.company, job.startDate, job.endDate, job.location, ...job.highlights]) {
      await expect(article).toContainText(plain(text));
    }
  }
  for (const project of resumeData.projects) {
    const article = page.locator('#resume-projects article').filter({ has: page.getByRole('heading', { name: project.title, exact: true }) });
    await expect(article).toContainText(plain(project.description));
    for (const technology of project.technologies) await expect(article).toContainText(technology);
    if (project.github) await expect(article.getByRole('link')).toHaveAttribute('href', project.github);
  }
  for (const group of resumeData.skills) {
    const row = page.locator('.resume-skills > div').filter({ hasText: group.category });
    for (const item of group.items) await expect(row).toContainText(item);
  }
  for (const education of resumeData.education) {
    const article = page.locator('#resume-education article').filter({ hasText: education.school });
    for (const text of Object.values(education)) await expect(article).toContainText(text);
  }
  await page.getByRole('navigation', { name: 'Resume sections' }).getByRole('link', { name: 'Education' }).click();
  await expect(page).toHaveURL(/#resume-education$/);
  await expect(page.locator('#education-title')).toBeInViewport();
  const downloadEvent = page.waitForEvent('download');
  await page.getByRole('link', { name: 'Download PDF' }).click();
  const download = await downloadEvent;
  expect(download.suggestedFilename()).toBe('vinayak-gupta-resume.pdf');
  const path = await download.path();
  expect(path).not.toBeNull();
  const actual = await readFile(path!);
  const original = await readFile(join(process.cwd(), 'public', 'resume', 'vinayak-gupta-resume.pdf'));
  expect(actual.equals(original)).toBe(true);
});

test('main page headings and shells share the same design tokens', async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 900 });
  const measurements = [];
  for (const route of ['/work', '/playground', '/resume']) {
    await page.goto(route);
    measurements.push(await page.locator('.page-heading').evaluate((element) => {
      const heading = getComputedStyle(element.querySelector('h1')!);
      const shell = element.closest('.site-shell')!.getBoundingClientRect();
      return { font: heading.fontFamily, size: heading.fontSize, weight: heading.fontWeight, lineHeight: heading.lineHeight, width: shell.width, left: shell.left };
    }));
    await expect(page.locator('#site-nav a[aria-current="page"]:visible')).toHaveAttribute('href', route);
  }
  for (const measurement of measurements) expect(measurement).toEqual(measurements[0]);
});

test('homepage introduces Vinayak before its two compact project previews', async ({ page }) => {
  for (const viewport of [{ width: 1440, height: 900 }, { width: 390, height: 844 }]) {
    await page.setViewportSize(viewport);
    await page.goto('/');
    await expect(page.getByRole('heading', { level: 1 })).toContainText('Vinayak');
    await expect(page.locator('#about')).toContainText('10 teams');
    await expect(page.locator('.selected-work article')).toHaveCount(2);
    await expect(page.locator('.selected-work .project-visual')).toHaveCount(0);
    const preview = await page.locator('.selected-work article').first().boundingBox();
    expect(preview!.y).toBeGreaterThanOrEqual(viewport.height);
    const sections = await page.locator('#about, #selected-work, #currently, #beyond-code').evaluateAll((elements) => elements.map((element) => element.id));
    expect(sections).toEqual(['about', 'selected-work', 'currently', 'beyond-code']);
    const selectedLinks = page.locator('.selected-work article a.text-link');
    await expect(selectedLinks.nth(0)).toHaveAttribute('href', '/work/code-review-agent');
    await expect(selectedLinks.nth(1)).toHaveAttribute('href', '/work/story-to-pr');
  }
});

test('four-page navigation matches on desktop and mobile with correct active states', async ({ page }) => {
  for (const width of [1440, 390]) {
    await page.setViewportSize({ width, height: 900 });
    for (const route of ['/', '/work', '/playground', '/resume', '/work/code-review-agent']) {
      await page.goto(route);
      if (width === 390) await page.getByRole('button', { name: 'Open menu' }).click();
      const links = page.locator('#site-nav [data-page-link]:visible');
      expect(await links.allTextContents()).toEqual(['Home', 'Work', 'Playground', 'Resume']);
      const current = page.locator('#site-nav [data-page-link][aria-current="page"]:visible');
      await expect(current).toHaveCount(1);
      await expect(current).toHaveAttribute('href', route.startsWith('/work') ? '/work' : route);
    }
  }
});

test('old About and Now routes lead to accessible homepage sections', async ({ browser }) => {
  const context = await browser.newContext({ javaScriptEnabled: false });
  const page = await context.newPage();
  for (const [route, anchor] of [['/about', 'about'], ['/now', 'currently'], ['/about/', 'about'], ['/now/', 'currently']]) {
    await page.goto(route);
    await expect(page).toHaveURL(new RegExp(`/#${anchor}$`));
    await expect(page.locator(`#${anchor}`)).toBeInViewport();
  }
  const entries = page.locator('#currently details');
  await expect(entries).toHaveCount(2);
  await expect(page.locator('#currently time').first()).toHaveAttribute('datetime', '2026-09-27');
  await entries.first().locator('summary').click();
  await expect(entries.first()).toHaveAttribute('open', '');
  await expect(entries.first()).toContainText('Operating and extending');
  await expect(entries.first().getByRole('link')).toHaveAttribute('href', '/work/code-review-agent');
  await context.close();
});

test('editorial cards have paper depth, hover lighting, and keyboard feedback', async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.emulateMedia({ reducedMotion: 'no-preference' });
  await page.goto('/work');
  const cards = page.locator('.work-card');
  await expect(cards).toHaveCount(8);
  for (const card of await cards.all()) {
    await expect(card).toHaveCSS('border-top-width', '1px');
    await expect(card).toHaveCSS('border-radius', '0px');
    await expect(card).not.toHaveCSS('box-shadow', 'none');
    await expect(card).toHaveCSS('background-color', 'rgb(255, 254, 251)');
  }
  const card = cards.first();
  const restShadow = await card.evaluate((element) => getComputedStyle(element).boxShadow);
  const save = async (name: string) => {
    if (!process.env.SCREENSHOT_DIR) return;
    await mkdir(process.env.SCREENSHOT_DIR, { recursive: true });
    await page.screenshot({
      path: join(process.env.SCREENSHOT_DIR, `${name}.png`),
      style: 'astro-dev-toolbar { display: none !important; }',
    });
  };
  await save('cards-rest');
  await card.hover();
  await expect(card).toHaveCSS('border-top-color', 'rgb(75, 85, 99)');
  await expect(card).not.toHaveCSS('transform', 'none');
  await expect(card).not.toHaveCSS('box-shadow', restShadow);
  await expect.poll(() => card.evaluate((element) => getComputedStyle(element, '::after').opacity)).toBe('1');
  await save('cards-hover');
  await page.mouse.move(0, 0);
  await card.locator('a.text-link').focus();
  await expect(card).toHaveCSS('border-top-color', 'rgb(75, 85, 99)');
  await expect(card.locator('a.text-link')).toHaveCSS('outline-style', 'solid');
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await card.hover();
  await expect(card).toHaveCSS('transform', 'none');
  await expect(card).toHaveCSS('transition-duration', '0s');
  await page.goto('/playground');
  const lab = page.locator('.lab-panel');
  await lab.hover();
  await expect(lab).toHaveCSS('transform', 'none');
});

test('touch cards retain their boundary without hover or tilt', async ({ browser }) => {
  const context = await browser.newContext({ hasTouch: true, isMobile: true, viewport: { width: 390, height: 844 } });
  const page = await context.newPage();
  await page.goto('/work');
  const card = page.locator('.work-card').first();
  await expect(card).toHaveCSS('border-top-width', '1px');
  await card.locator('.metadata').first().tap();
  await expect(card).toHaveCSS('transform', 'none');
  await context.close();
});
