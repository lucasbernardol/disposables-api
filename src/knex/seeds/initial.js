const gists = require('../../../gists.json');

const { setInterval } = require('node:timers/promises');

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  // Deletes ALL existing entries
  //console.log(gists);

  // Trasactions not working.. why?

  await knex('disposables').del();

  for (let i = 0; i < gists.length; i++) {
    await setInterval(200);

    await knex('disposables').insert(gists[i]);
  }
};
