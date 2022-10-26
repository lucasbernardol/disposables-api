import { Knex } from 'knex';

//@ts-ignore
import gists from '../../../../gists.json';

export async function seed(knex: Knex): Promise<void> {
  // Deletes ALL existing entries
  await knex('disposables').del();

  // Inserts seed entries
  //   await knex('table_name').insert([
  //     { id: 1, colName: 'rowValue1' },
  //     { id: 2, colName: 'rowValue2' },
  //     { id: 3, colName: 'rowValue3' },
  //   ]);

  await knex.transaction(async (trx) => {
    return trx.insert(gists).into('disposables').transacting(trx);
  });
}
