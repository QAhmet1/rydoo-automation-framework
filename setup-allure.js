// Code explanations are in English [cite: 2026-01-05]
const fs = require('fs');
const path = require('path');
const os = require('os');

Target_Env: process.env.envName || 'QA (Default)'

const resultsDir = path.resolve(__dirname, 'allure-results');

if (!fs.existsSync(resultsDir)) {
    fs.mkdirSync(resultsDir, { recursive: true });
}

// Logic to detect execution environment
const isCI = process.env.GITHUB_ACTIONS === 'true';
const isDocker = fs.existsSync('/.dockerenv'); // Reliable way to detect Docker

const envInfo = {
    'Execution_Context': isCI ? 'GitHub Actions (CI/CD)' : (isDocker ? 'Local Docker Container' : 'Local Machine'),
    'Tester_Identity': isCI ? `GitHub Runner (${process.env.GITHUB_ACTOR})` : os.userInfo().username,
    'Operating_System': `${os.type()} ${os.release()}`,
    'Node_Version': process.version,
    'Project_Name': 'Rydoo-Login-Security-Suite',
    'Repository': isCI ? process.env.GITHUB_REPOSITORY : 'Local Branch'
};

const propertiesContent = Object.entries(envInfo)
    .map(([key, value]) => `${key}=${value}`)
    .join('\n');

fs.writeFileSync(path.join(resultsDir, 'environment.properties'), propertiesContent);
console.log(`✅ Allure Environment generated for: ${envInfo.Execution_Context}`);