'use strict'

const Schema = use('Schema')

class MaterialCategorySchema extends Schema {
  up () {
    this.create('material_categories', (table) => {
      table.increments()
      table.string('name')
      table.timestamps()
    })
  }

  down () {
    this.drop('material_categories')
  }
}

module.exports = MaterialCategorySchema
