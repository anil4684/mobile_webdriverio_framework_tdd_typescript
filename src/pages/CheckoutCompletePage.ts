export class CheckoutCompletePage {

    private thankYouMessage() {
        return $('//*[@text="THANK YOU FOR YOU ORDER"]');
    }

    async verifyThankYouMessage(): Promise<void> {
        await expect(this.thankYouMessage()).toBeDisplayed();
    }
}