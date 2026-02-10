// Code explanations are in English [cite: 2026-01-05, 2026-01-29]
const { defineConfig } = require("cypress");
const allureWriter = require('@shelex/cypress-allure-plugin/writer');
const fs = require('fs-extra');
const path = require('path');

/**
 * Function to load environment-specific configuration files (qa.json, prod.json)
 * @param {string} file - The name of the environment
 * @returns {Promise} - The JSON content of the configuration file
 */
function getConfigurationByFile(file) {
  const pathToConfigFile = path.resolve('cypress', 'environments', `${file}.json`);
  return fs.readJson(pathToConfigFile);
}

module.exports = defineConfig({
  e2e: {
    // Basic settings
    chromeWebSecurity: false,
    viewportWidth: 1280,
    viewportHeight: 720,
    video: false, 
    screenshotOnRunFailure: true,
    
    // Pattern to find test files
    specPattern: 'cypress/e2e/**/*.cy.{js,jsx,ts,tsx}',

    async setupNodeEvents(on, config) {
  // 1. Get envName from CLI or default to 'qa'
  const version = config.env.envName || 'qa';
  console.log(`--- ATTEMPTING TO LOAD ENVIRONMENT: ${version.toUpperCase()} ---`);

  // 2. Load the specific JSON file (prod.json or qa.json)
  const envConfig = await getConfigurationByFile(version);

  // 3. MERGE STRATEGY:
  // We prioritize the specific environment file, but KEEP the CLI arguments like envName
  config.env = { ...config.env, ...envConfig };

  // 3b. Optionally enrich environment with secrets from the host (useful in CI)
  const secretEnv = {
    qa_user: process.env.QA_USER,
    qa_pass: process.env.QA_PASS,
    prod_user: process.env.PROD_USER,
    prod_pass: process.env.PROD_PASS,
  };

  Object.entries(secretEnv).forEach(([key, value]) => {
    if (value) {
      config.env[key] = value;
    }
  });

  // 4. Force override baseUrl from the loaded file
  config.baseUrl = envConfig.baseUrl;

  console.log('--- FINAL ENV CHECK ---');
  // Use brackets to avoid deprecation warnings
  console.log('Environment:', version);
  console.log('Email:', config.env[`${version}_user`]);
  console.log('-----------------------');

  allureWriter(on, config);
  return config;
},

    // Default environment variables used as a baseline
    env: {
      allure: true,
      allureReuseAfterSpec: true,
      allureResultsPath: "allure-results"
    }
  },
});