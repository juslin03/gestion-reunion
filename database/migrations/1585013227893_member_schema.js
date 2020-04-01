'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class MemberSchema extends Schema {
  up () {
    this.create('members', (table) => {
      table.increments()
      table.string('fname').notNullable()
      table.string('lname').notNullable()
      table.string('gender', 5).notNullable()
      table.string('email', 254).notNullable().unique()
      table.string('tel_code', 10).notNullable()
      table.string('tel', 200).notNullable().unique()
      table.date('birthdate').notNullable()
      table.string('birthplace', 254).notNullable()
      table.string('role')
      table.string('group', 254).notNullable()
      table.string('post', 254).notNullable()
      table.string('country', 254).notNullable()
      table.string('city').notNullable()
      table.string('cityzenship', 254).notNullable()
      table.string('pbox', 254).notNullable()
      table.date('term_start').notNullable()
      table.date('term_end').notNullable()
      table.integer('term_duration', 60).notNullable()
      table.string('password', 60).notNullable()
      table.string('compagny_init', 254).notNullable()
      table.datetime('last_login')
      table.integer('user_id').unsigned().references('id').inTable('users')
      table.timestamps()
    })
  }

  down () {
    this.drop('members')
  }
}

module.exports = MemberSchema
