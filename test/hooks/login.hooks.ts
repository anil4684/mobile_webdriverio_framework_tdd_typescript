import { envConfig } from '../../config/env.config.ts';
import { pages } from '../fixtures/pages.fixture.ts';

export async function loginBeforeTest(): Promise<void> {
    await pages.loginPage.login(
        envConfig.username,
        envConfig.password
    );
}