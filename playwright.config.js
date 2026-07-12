// @ts-check
import { defineConfig, devices } from '@playwright/test';

/**
 * @see https://playwright.dev/docs/test-configuration
 */
export default defineConfig({
  projects: [
    // {
    //   name: 'chromium',
    //   use: { ...devices['Desktop Chrome'] },
    // },
    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] },
    },
   
    /* Remove or comment out this section:
    {
      name: 'webkit',
      use: { ...devices['Desktop Safari'] },
    },
    */
  ],
  expect:{
    timeout: 60 * 1000, 
  },
  use:{
    headless: false,
  }
  
});