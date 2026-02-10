
import loginData from "../fixtures/loginData.json"
describe('Rydoo Login - Negative Test Suite', () => {
    beforeEach(() => {
        cy.visit('/login'); 
    });
    
    loginData.standardScenarios.forEach((data) => {
        it(`Should display correct error for: ${data.name}`, () => {
            cy.loginOnExternalOrigin(data.email, data.pass,loginData.errorMessage);
        });
    });
});

describe('Rydoo Login - Security Boundary Tests', () => {
    beforeEach(() => {
        cy.visit('/login'); 
    });

    loginData.securityPayloads.forEach((payload) => {
        it(`Should block ${payload.name} before password step`, () => {
            // This command only checks the first step block
            cy.verifySecurityBlock(payload.value);
        });
    });
});

describe('Happy Path Login Execution', () => {
    beforeEach(() => {
        cy.visit('/login'); 
    });
    it(`should login successfully on QA`, () => {

    cy.location('hostname', { timeout: 20000 }).should('include', 'accounts.rydoo.com');

    const env = (Cypress.env('envName') || 'qa').toLowerCase();
        const email = Cypress.env()[`${env}_user` ];
        const password = Cypress.env()[`${env}_pass` ];

    cy.login(email, password);
    });
});