'use strict'

const Schema = use('Schema')

class OrderType1Schema extends Schema {
  up () {
    this.create('order_type_1', (table) => {
      table.increments()
      table.string('type')
      table.timestamps()
    })
  }

  down () {
    this.drop('order_type_1')
  }
}

module.exports = OrderType1Schema
