// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
// Code explanations are in English [cite: 2026-01-05, 2026-01-29]

// 1. Define selectors ONCE at the top
const LOGIN_SELECTORS = {
    username: '[data-testid="username"]',
    nextButton: '[data-testid="next-button"]',
    password: '[data-testid="password"]',
    loginButton: '[data-testid="login-button"]',
    errorContainer: '[data-testid="incorrect-credentials-error"]',
    requestError: '#request_error'
};

// 2. Optimized Command for standard Negative Login
Cypress.Commands.add('loginOnExternalOrigin', (email, password, expectedError) => {
    cy.origin('https://accounts.rydoo.com', { args: { email, password, expectedError, selectors: LOGIN_SELECTORS } }, 
    ({ email, password, expectedError, selectors }) => {
        cy.get(selectors.username).type(email);
        cy.get(selectors.nextButton).click();
        cy.get(selectors.password, { timeout: 10000 }).should('be.visible').type(password);
        cy.get(selectors.loginButton).click();

        cy.get(selectors.errorContainer, { timeout: 10000 })
            .should('be.visible')
            .find('span.error.required')
            .should('have.text', expectedError); 
    });
});

// 3. Optimized Command for security blocks
Cypress.Commands.add('verifySecurityBlock', (email) => {
    cy.origin('https://accounts.rydoo.com', { args: { email, selectors: LOGIN_SELECTORS } }, ({ email, selectors }) => {
        cy.get(selectors.username).type(email);
        cy.get(selectors.nextButton).click();

        cy.get(selectors.requestError, { timeout: 10000 })
            .should('be.visible')
            .find('span.error.required')
            .should('have.text', "We're not able to make a request. Please try again later.");
    });
});

// 4. Optimized Command for Happy Path Simulation
Cypress.Commands.add('login_func', (email, password) => {
    // Ensuring we are on the correct domain before starting
    cy.url({ timeout: 20000 }).should('include', 'accounts.rydoo.com');

    cy.origin('https://accounts.rydoo.com', { args: { email, password, selectors: LOGIN_SELECTORS } }, 
    ({ email, password, selectors }) => {
        cy.get(selectors.username, { timeout: 20000 }).should('be.visible').type(email);
        cy.get(selectors.nextButton).click();
        
        cy.get(selectors.password, { timeout: 15000 }).should('be.visible').type(password, { log: false });
        cy.get(selectors.loginButton).click();
        
        cy.log('Happy path simulation completed.');
    });
});