'use strict'

const Schema = use('Schema')

class OrderType2Schema extends Schema {
  up () {
    this.create('order_type_2', (table) => {
      table.increments()
      table.string('type')
      table.timestamps()
    })
  }

  down () {
    this.drop('order_type_2')
  }
}

module.exports = OrderType2Schema
