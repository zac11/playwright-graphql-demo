import type { PlaywrightTestConfig } from '@playwright/test';
import { devices } from '@playwright/test';

/**
 * Read environment variables from file.
 * https://github.com/motdotla/dotenv
 */
// require('dotenv').config();

/**
 * See https://playwright.dev/docs/test-configuration.
 */
const config: PlaywrightTestConfig = {
    globalSetup: './utils/globalSetup.ts',
  testDir: './tests',
  timeout: 50 * 1000,
  expect: {
    /**
     * Maximum time expect() should wait for the condition to be met.
     * For example in `await expect(locator).toHaveText();`
     */
    timeout: 5000
  },

  retries: 0,
 
  use: {
 
    trace: 'on',
    contextOptions:{
        ignoreHTTPSErrors: true
    },
    baseURL: process.env.BASE_URL
  },

  projects: [
    {
            name: 'graphql',
            testMatch: ['./tests/graphql.spec.ts']
          
    },
  ],

 
   outputDir: 'test-results/',
};

export default config;
