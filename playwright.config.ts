// @ts-check
import type { PlaywrightTestConfig } from '@playwright/test';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

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