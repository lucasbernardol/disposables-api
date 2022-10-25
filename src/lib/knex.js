const { knex: Knex } = require('knex');

const config = require('../../knexfile');

const knex = Knex(config.development);

module.exports = { knex };
