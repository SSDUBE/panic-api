import * as Knex from 'knex';
import {TableBuilder} from 'knex';

export function auditing(knex: Knex, table: TableBuilder) {
  table
    .timestamp('created_at')
    .defaultTo(knex.fn.now())
    .notNullable();
}
