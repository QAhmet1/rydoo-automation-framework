
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
    beforeEach(() => {
        cy.visit('/login'); 
    });
    it(`should login successfully on QA`, () => {

    cy.location('hostname', { timeout: 20000 }).should('include', 'accounts.rydoo.com');

    const env = (Cypress.env('envName') || 'qa').toLowerCase();
        const email = Cypress.env(`${env}_user`);
        const password = Cypress.env(`${env}_pass`);

        // Fail fast with a clear message if credentials are missing in CI or local runs
        expect(email, `Cypress env '${env}_user' must be defined (see cypress.env.json or CI secrets)`).to.be.a('string').and.not.be.empty;
        expect(password, `Cypress env '${env}_pass' must be defined (see cypress.env.json or CI secrets)`).to.be.a('string').and.not.be.empty;

    cy.login_func(email, password);
    });
});