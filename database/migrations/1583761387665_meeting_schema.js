'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class MeetingSchema extends Schema {
  up () {
    this.create('meetings', (table) => {
      table.increments()
      table.string('m_type', 50).notNullable()
      table.string('m_subject', 50).notNullable()
      table.string('m_desc', 255).notNullable()
      table.integer('m_duration', 10).notNullable()
      table.date('m_date').notNullable()
      table.time('m_from').notNullable()
      table.time('m_to').notNullable()
      table.string('m_passowrd', 6).notNullable()
      table.string('m_key',10).unique()
      table.timestamps()
    })
  }

  down () {
    this.drop('meetings')
  }
}

module.exports = MeetingSchema
