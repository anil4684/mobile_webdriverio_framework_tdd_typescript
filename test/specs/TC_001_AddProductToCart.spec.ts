import { pages } from '../../test/fixtures/pages.fixture.ts';
import products from '../../src/data/TC_001_AddProductToCart.json' with { type: 'json' };

describe('TC_001_AddProductToCart', () => {


    it('should add Sauce Labs Backpack to cart', async () => {
        await pages.productsPage.addProductToCart( products.backpack.name );
        await browser.pause( 7000 );
    });
});

