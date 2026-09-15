import dotenv from 'dotenv';
import path from 'path';
import {
  Environment,
  Environments,
} from '../constants/Environments';

const environment =
  (process.env.TEST_ENV as Environment) || Environments.DEV;

const envFile = path.resolve(
  process.cwd(),
  `env/.env.${environment}`
);

dotenv.config({
  path: envFile,
});

if (!process.env.BASE_URL) {
  throw new Error(
    `BASE_URL is not defined for environment: ${environment}`
  );
}

export const environmentConfig = {
  environment,
  baseURL: process.env.BASE_URL,
} as const;