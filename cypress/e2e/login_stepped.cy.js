
import loginData from "../fixtures/loginData.json"
describe('Rydoo Login - Negative Test Suite', () => {
    beforeEach(() => {
        cy.visit('/login'); 
    });
    
    loginData.standardScenarios.forEach((data) => {
        it(`Should display correct error for: ${data.name}`, () => {
            // cy.visit('/login'); 
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
    const currentEnv = (Cypress.env('envName') || 'qa').toLowerCase();
    const email = Cypress.env(`${currentEnv}_user`);
    const password = Cypress.env(`${currentEnv}_pass`);

    beforeEach(() => {
        cy.visit('/login'); 
    });

    it(`should login successfully on ${currentEnv.toUpperCase()} envirenment`, () => {
        
        expect(email, `Credential check for ${currentEnv}`).to.not.be.undefined;
        cy.location('hostname', { timeout: 20000 }).should('include', 'accounts.rydoo.com');

        cy.login_func(email, password);
    });
});