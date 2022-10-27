import process from "node:process";

export type Environment = NodeJS.ProcessEnv & {
  NODE_ENV: string;
  DATABASE_CLIENT: string;
  DATABASE_URI: string;
  DATBASE_HOST: string;
  DATABASE_PORT: string;
  DATABASE_USERNAME: string;
  DATABASE_PASSWORD: string;
  DATABASE_SCHEMA: string;
};

// @FIXME: Real world - validation;

export const env = process.env as Environment;
