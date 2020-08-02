import * as Knex from 'knex';
import {TableBuilder} from 'knex';
import {auditing} from './utils/auditing';
import PasswordService from '../services/PasswordService';

export async function up(knex: Knex) {
  await knex.schema.createTable('users', (table: TableBuilder) => {
    table
      .increments()
      .unsigned()
      .index()
      .primary();
    table.string('fullname', 50).notNullable();
    table.string('contact_number', 50).notNullable();
    table
      .string('username', 50)
      .notNullable()
      .unique();
    table.string('password', 100).notNullable();
    table
      .boolean('active')
      .notNullable()
      .defaultTo(true);
    auditing(knex, table);
  });

  await knex.schema.createTable('role', (table: TableBuilder) => {
    table
      .increments()
      .unsigned()
      .index()
      .primary();
    table.string('name', 30).notNullable();
    auditing(knex, table);
  });

  await knex.schema.createTable('user_role', (table: TableBuilder) => {
    table
      .increments()
      .unsigned()
      .index()
      .primary();
    table.integer('role_id').references('role.id');
    table.integer('user_id').references('users.id');
    auditing(knex, table);
  });

  await knex.schema.createTable('user_panics', (table: TableBuilder) => {
    table
      .increments()
      .unsigned()
      .index()
      .primary();
    table.float('latitude').notNullable();
    table.float('longitude').notNullable();
    table.integer('user_id').references('users.id');
    auditing(knex, table);
  });

  await knex('role').insert([
    {
      name: 'admin',
    },
    {
      name: 'user',
    },
  ]);

  const [role] = await knex('role').where({name: 'admin'});
  // add systemUser
  const [systemUser] = await knex('users')
    .insert({
      fullname: 'sindiso',
      contact_number: '0000000000',
      username: 'admin',
      password: await PasswordService.encrypt('password'),
    })
    .returning('*');

  await knex('user_role').insert({
    user_id: systemUser.id,
    role_id: role.id,
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema
    .dropTable('user_role')
    .dropTable('role')
    .dropTable('user_panics')
    .dropTable('users');
}
