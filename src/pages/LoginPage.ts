export class LoginPage {

    private get usernameInput() {
        return $('~test-Username');
    }

    private get passwordInput() {
        return $('~test-Password');
    }

    private get loginButton() {
        return $('//*[@text="LOGIN"]');
    }

    async enterUsername(username: string): Promise<void> {
        await this.usernameInput.setValue(username);
    }

    async enterPassword(password: string): Promise<void> {
        await this.passwordInput.setValue(password);
    }

    async clickLogin(): Promise<void> {
        await this.loginButton.click();
    }

    async login(username: string, password: string): Promise<void> {
        await this.enterUsername(username);
        await this.enterPassword(password);
        await this.clickLogin();
    }
}