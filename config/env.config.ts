import dotenv from 'dotenv';
import path from 'node:path';

const envArg = process.argv.find(arg => arg.startsWith('--env='));

const environment = (
    envArg?.split('=')[1] ??
    process.env.ENV ??
    'qa'
).toLowerCase();

const envFile = path.join(
    process.cwd(),
    'env',
    `${environment}.env`
);

const result = dotenv.config({ path: envFile });

if (result.error) {
    throw new Error(`Unable to load environment file: ${envFile}`);
}

function getRequiredEnv(name: string): string {
    const value = process.env[name];

    if (!value) {
        throw new Error(
            `Required environment variable '${name}' is missing from ${envFile}`
        );
    }

    return value;
}

export const envConfig = {
    environment,
    username: getRequiredEnv('APP_USERNAME'),
    password: getRequiredEnv('APP_PASSWORD')
};