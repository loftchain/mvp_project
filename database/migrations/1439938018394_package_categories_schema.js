'use strict'

const Schema = use('Schema')

class PackageCategoriesSchema extends Schema {
  up () {
    this.create('package_categories', (table) => {
      table.increments()
      table.string('name')
      table.timestamps()
    })
  }

  down () {
    this.drop('package_categories')
  }
}

module.exports = PackageCategoriesSchema
