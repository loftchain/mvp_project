'use strict'

const Schema = use('Schema')

class CompaniesSchema extends Schema {
  up () {
    this.create('companies', (table) => {
      table.increments()
      table.integer('user_id').unsigned().references('id').inTable('users')
      table.string('company_business').notNullable()
      table.string('country').notNullable()
      table.string('location').notNullable()
      table.string('eth_wallet').notNullable()
      table.string('website').notNullable()
      table.string('phone').notNullable()
      table.string('document_path').notNullable()
      table.integer('speed')
      table.integer('quality')
      table.integer('comment_id').unsigned().references('id').inTable('comments')
      table.timestamps()
    })
  }

  down () {
    this.drop('companies')
  }
}

module.exports = CompaniesSchema
