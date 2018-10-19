'use strict'

const Schema = use('Schema')

class RespondsSchema extends Schema {
  up () {
    this.create('responds', (table) => {
      table.increments()
      table.integer('order_id').unsigned().references('id').inTable('orders')
      table.integer('company_id').unsigned().references('id').inTable('companies')
      table.string('header')
      table.string('name')
      table.string('description')
      table.timestamp('delivery_time')
      table.string('price')
      table.timestamps()
    })
  }

  down () {
    this.drop('responds')
  }
}

module.exports = RespondsSchema
