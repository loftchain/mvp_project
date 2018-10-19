'use strict'

const Schema = use('Schema')

class TransactionsSchema extends Schema {
  up () {
    this.create('transactions', (table) => {
      table.increments()
      table.integer('company_id').unsigned().references('id').inTable('companies')
      table.timestamp('date')
      table.string('transaction_id')
      table.string('amount')
      table.string('token_amount')
      table.boolean('status')
      table.timestamps()
    })
  }

  down () {
    this.drop('transactions')
  }
}

module.exports = TransactionsSchema
