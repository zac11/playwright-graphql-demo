
import type { PlaywrightTestConfig } from "@playwright/test";
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
 * 
 */

 const config: PlaywrightTestConfig = {
  globalSetup: 'utils/globalSetup.ts',
  projects: [
    {
      name: 'graphql',
      testMatch: ['/tests/graphql.spec.ts']
    },
  ],
  timeout: 30 * 1000,
  testDir: path.join(__dirname, 'tests'),
  retries: 1,
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
