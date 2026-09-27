import { defineConfig } from '@playwright/test';

export default defineConfig({
  testDir: './tests/browser',
  use: {
    baseURL: process.env.BASE_URL ?? 'http://127.0.0.1:4321',
    channel: process.env.PLAYWRIGHT_CHANNEL,
  },
  workers: 2,
  reporter: 'list',
});
