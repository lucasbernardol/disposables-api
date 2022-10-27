import Knex from "knex";
import type { Knex as KnexTypes } from "knex";

import { env } from "@config/environment.config";
import type { Environment } from "@config/environment.config";

// Using knexfile
const KNEXFILE = "../../knexfile";

const _require = (path: string = KNEXFILE): any => {
  return require(path).default;
};

const isDevelopment = (mode: string): boolean => {
  return mode?.toLowerCase() === "development";
};

const useKnexConfig = (env: Environment): KnexTypes.Config => {
  const _BASE: KnexTypes.Config = {
    client: env.DATABASE_CLIENT,
    connection: {
      connectionString: env.DATABASE_URI,
    },
  };

  return isDevelopment(env.NODE_ENV) ? _require().development : _BASE;
};

export const knex = Knex(useKnexConfig(env));
