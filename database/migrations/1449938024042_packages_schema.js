'use strict'

const Schema = use('Schema')

class PackagesSchema extends Schema {
  up () {
    this.create('packages', (table) => {
      table.increments()
      table.integer('package_category_id').unsigned().references('id').inTable('package_categories')
      table.string('name')
      table.timestamps()
    })
  }

  down () {
    this.drop('packages')
  }
}

module.exports = PackagesSchema
