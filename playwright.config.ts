import { defineConfig, devices } from '@playwright/test';
import { environmentConfig } from './utils/environment';

/**
 * See https://playwright.dev/docs/test-configuration.
 */
export default defineConfig({
  testDir: './tests',

  outputDir: './test-results',

  /* Run tests in parallel */
  fullyParallel: false,

  /* Fail the build if test.only is accidentally committed */
  forbidOnly: !!process.env.CI,

  /* Retry failed tests only in CI */
  retries: process.env.CI ? 2 : 0,

  /* Use one worker in CI */
  workers: 1, //process.env.CI ? 1 : undefined,

  /* Test timeout */
  timeout: 120_000,

  /* Assertion timeout */
  expect: {
    timeout: 5_000,
  },

  /* Reporter */
  reporter: [
    ['list'],
    ['html', { open: 'never', outputFolder: 'playwright-report' }],
  ],

  /* Shared settings for all tests */
  use: {
    baseURL: environmentConfig.baseURL,

    trace: 'on-first-retry',

    screenshot: 'only-on-failure',

    video: 'retain-on-failure',

    headless: true,

    actionTimeout: 10_000,

    launchOptions: {
      //slowMo: 700,
    },
  },

  /* Browser projects */
  projects: [
    {
      name: 'chromium',
      use: {
        ...devices['Desktop Chrome'],
      },
    },

    // {
    //   name: 'firefox',
    //   use: {
    //     ...devices['Desktop Firefox'],
    //   },
    // },

    // {
    //   name: 'webkit',
    //   use: {
    //     ...devices['Desktop Safari'],
    //   },
    // },
  ],
});