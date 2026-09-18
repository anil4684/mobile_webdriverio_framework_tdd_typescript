export class CheckoutInformationPage {

    private firstNameInput() {
        return $('~test-First Name');
    }

    private lastNameInput() {
        return $('~test-Last Name');
    }

    private zipCodeInput() {
        return $('~test-Zip/Postal Code');
    }

    private continueButton() {
        return $('~test-CONTINUE');
    }

    async enterCheckoutInformation(
        firstName: string,
        lastName: string,
        zipCode: string
    ): Promise<void> {

        await this.firstNameInput().setValue(firstName);
        await this.lastNameInput().setValue(lastName);
        await this.zipCodeInput().setValue(zipCode);
    }

    async clickContinue(): Promise<void> {
        await this.continueButton().click();
    }
}