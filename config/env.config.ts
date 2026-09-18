import dotenv from 'dotenv';
import path from 'node:path';

const environment = process.env.ENV ?? 'qa';

const envFile = path.join(
    process.cwd(),
    'env',
    `${environment}.env`
);

dotenv.config({
    path: envFile
});

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