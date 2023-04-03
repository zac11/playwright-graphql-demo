import type { PlaywrightTestConfig } from '@playwright/test';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

/**
 * Read environment variables from file.
 * https://github.com/motdotla/dotenv
 */
// require('dotenv').config();

/**
 * See https://playwright.dev/docs/test-configuration.
 */
const newconfig: PlaywrightTestConfig = {
 globalSetup: 'utils/globalSetup.ts',
  testDir: '/tests',
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
            testMatch: '**/graphql.spec.ts'
          
    },
  ],

 
   outputDir: 'test-results/',
};

export default newconfig;
