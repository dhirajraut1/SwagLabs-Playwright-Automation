import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: 'html',
  use: {
    testIdAttribute: 'data-test',
    trace: 'on-first-retry',
  },

  projects: [
    {
      name: 'e2e',
      use: { ...devices['Desktop Chrome'] },
    },
  ]
});
