
import { qaConfig } from '../../config/qa.config.ts'

const environment = process.env.ENV || 'qa';

export const envConfig = {
    environment,
    ...qaConfig
};

