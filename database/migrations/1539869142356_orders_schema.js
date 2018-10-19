'use strict'

const Schema = use('Schema')

class OrdersSchema extends Schema {
  up () {
    this.create('orders', (table) => {
      table.increments()
      table.integer('company_id').unsigned().references('id').inTable('companies')
      table.integer('type1_id').unsigned().references('id').inTable('order_type_1')  //product or service
      table.integer('type2_id').unsigned().references('id').inTable('order_type_2')  //to buy or to sell, want to perform or looking for performer
      table.integer('type3_id').unsigned().references('id').inTable('order_type_3')  //active or finished
      table.string('header')
      table.string('name')
      table.string('description')
      table.integer('material_id').unsigned().references('id').inTable('materials')
      table.integer('package_id').unsigned().references('id').inTable('packages')
      table.timestamp('tender_end_date')
      table.string('location')
      table.string('price')
      table.string('prepayment').defaultTo(null)
      table.string('deferred_payment').defaultTo(null)
      table.timestamps()
    })
  }

  down () {
    this.drop('orders')
  }
}

module.exports = OrdersSchema
