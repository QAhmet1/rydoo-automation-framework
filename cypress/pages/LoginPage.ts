class LoginPage {
    // Selectors - Using data-testid for better stability
    get usernameInput() { return cy.get('[data-testid="username"]'); }
    get passwordInput() { return cy.get('[data-testid="password"]'); }
    get nextButton() { return cy.get('[data-testid="next-button"]'); }
    get loginButton() { return cy.get('[data-testid="login-button"]'); }
    get usernameCheckmark() { return cy.get('[data-testid="checkmark-username"]'); }
    get passwordCheckmark() { return cy.get('[data-testid="checkmark-password"]'); }
    get errorMessage() { return cy.get('[data-testid="incorrect-credentials-error"]'); }

    /**
     * Actions: Dynamic flow handling
     */
    enterUsername(email) {
        this.usernameInput.click().clear().type(email);
        // We click outside or use blur to trigger the checkmark
        this.usernameInput.blur();
        this.usernameCheckmark.should('be.visible');
        this.nextButton.click();
    }

    enterPassword(pass) {
        // Password field becomes visible after 'Next'
        this.passwordInput.should('be.visible').type(pass);
        this.passwordCheckmark.should('be.visible');
        this.loginButton.click();
    }

    loginFlow(email, pass) {
        this.enterUsername(email);
        this.nextButton.should('be.enabled').click()
        this.enterPassword(pass);
        this.loginButton.should('be.enabled').click()

        // Assertion will follow here
    }
}

export const loginPage = new LoginPage();