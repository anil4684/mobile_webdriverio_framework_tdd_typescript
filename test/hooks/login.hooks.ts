import { pages } from '../../test/fixtures/pages.fixture.ts';
import { qaConfig } from '../../config/qa.config.ts';

export async function loginBeforeTest(): Promise<void> {
    await pages.loginPage.login(
        qaConfig.username,
        qaConfig.password
    );
}   