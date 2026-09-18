export class ProductsPage {

    private productItem(productName: string) {
        return $(
            `//*[@content-desc="test-Item"][.//*[@text="${productName}"]]`
        );
    }

    private addToCartButton(productName: string) {
        return this.productItem(productName).$(
            `.//*[@content-desc="test-ADD TO CART"]`
        );
    }

        private removeFromCartButton(productName: string) {
        return this.productItem(productName).$(
            `.//*[@content-desc="test-REMOVE"]`
        );
    }

     private goToCart() {
    return $('~test-Cart');
}


  async scrollToProduct(productName: string): Promise<void> {
`android=new UiScrollable(new UiSelector().scrollable(true)).scrollTextIntoView("${productName}")`}

    async addProductToCart(productName: string): Promise<void> {
        await this.scrollToProduct(productName);
        await this.addToCartButton(productName).click();
    }

        async removeProductfromCart(productName: string): Promise<void> {
        await this.scrollToProduct(productName);
        await this.removeFromCartButton(productName).click();
    }
async clickGoToCart(): Promise<void> {
    await this.goToCart().click();
}
}