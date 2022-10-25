const express = require('express');

const { knex } = require('./lib/knex');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get('/api/v1/disposables/', async (request, response) => {
  const disposables = await knex('disposables').select('*');

  return response.json(disposables);
});

app.get('/api/v1/disposables/:email', async (request, response) => {
  const { email } = request.params;

  const [, domain] = email.split('@');

  const data = await knex('disposables')
    .select('*')
    .where('domain', domain)
    .first();

  return response.json(data);
});

app.listen(3333, () => console.log('\nOK'));
