import 'dotenv/config';

import path from 'node:path';

import type { Knex } from 'knex';

const config: { [key: string]: Knex.Config } = {
  /* development: {
    client: "sqlite3",
    connection: {
      filename: "./dev.sqlite3"
    }
  }, */

  development: {
    client: 'postgresql',
    connection: {
      charset: 'utf-8',
      host: process.env.DATABASE_HOST,
      database: process.env.DATABASE_SCHEMA,
      user: process.env.DATABASE_USERNAME,
      password: process.env.DATABASE_PASSWORD,
      port: Number.parseInt(process.env.DATABASE_PORT as string, 10) || 5432,
    },

    migrations: {
      tableName: 'migrations',
      extension: 'ts',
      directory: path.resolve(
        __dirname,
        'src',
        'query-builder',
        'knex',
        'migrations'
      ),
    },
    seeds: {
      extension: 'ts',
      recursive: true,
      directory: path.resolve(
        __dirname,
        'src',
        'query-builder',
        'knex',
        'seeds'
      ),
    },
    pool: {
      min: 2,
      max: 10,
    },
  },

  /*
  production: {
    client: 'postgresql',
    connection: {
      database: 'my_db',
      user: 'username',
      password: 'password',
    },
    pool: {
      min: 2,
      max: 10,
    },
    migrations: {
      tableName: 'knex_migrations',
    },
  }, */
};

export default config;
