// @ts-check
import type { PlaywrightTestConfig } from '@playwright/test';


/**
 * @see https://playwright.dev/docs/test-configuration
 * @type {import('@playwright/test').PlaywrightTestConfig}
 */
const config: PlaywrightTestConfig = {
  globalSetup: './utils/globalSetup.ts',
  projects: [
    {
      name: 'graphql',
      //testMatch: ['/tests/graphql.spec.ts']
      testMatch: /graphql\.spec\.ts$/
    },
  ],
  timeout: 30 * 1000,
  testDir: './tests',
  retries: 0,
  outputDir: 'test-results/',
  use: {
    trace: 'on',
    contextOptions: {
      ignoreHTTPSErrors: true,
    },
    baseURL: process.env.BASE_URL,
  },
};
export default config;