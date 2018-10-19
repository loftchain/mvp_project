'use strict'

const Schema = use('Schema')

class OrderType3Schema extends Schema {
  up () {
    this.create('order_type_3', (table) => {
      table.increments()
      table.string('type')
      table.timestamps()
    })
  }

  down () {
    this.drop('order_type_3')
  }
}

module.exports = OrderType3Schema
