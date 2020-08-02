const {knexSnakeCaseMappers} = require('objection');

const {connection} = require('./src/db');

const {KNEX_SEED = false} = process.env;

// Note: we specifically do not use the shared db config due to this bug
// https://github.com/tgriesser/knex/issues/2644
module.exports = {
  development: {
    debug: false,
    client: 'postgres',
    connection,
    pool: {
      min: 2,
      max: 10,
    },
    seeds: {
      directory: './src/seeds/',
    },
    migrations: {
      directory: './src/migrations',
    },
    ...knexSnakeCaseMappers(),
  },

  production: {
    client: 'postgres',
    connection,
    pool: {
      min: 2,
      max: 10,
    },
    seeds: {
      directory: './src/seeds/prod',
    },
    migrations: {
      directory: './src/migrations',
    },
    ...knexSnakeCaseMappers(),
  },
};
