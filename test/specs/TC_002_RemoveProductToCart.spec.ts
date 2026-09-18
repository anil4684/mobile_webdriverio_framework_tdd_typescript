import { pages } from '../../test/fixtures/pages.fixture.ts';
import products from '../../src/data/TC_002_RemoveProductToCart.json' with { type: 'json' };

describe('TC_002_RemoveProductToCart', () => {


    it('should add Sauce Labs Backpack to cart', async () => {
        await pages.productsPage.addProductToCart( products.backpack.name );
        await browser.pause( 10000 );
        await pages.productsPage.removeProductfromCart( products.backpack.name );
        await browser.pause( 10000 );

    });
});

