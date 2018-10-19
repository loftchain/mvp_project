'use strict'

const Schema = use('Schema')

class MaterialsSchema extends Schema {
  up () {
    this.create('materials', (table) => {
      table.increments()
      table.integer('material_category_id').unsigned().references('id').inTable('material_categories')
      table.string('name')
      table.timestamps()
    })
  }

  down () {
    this.drop('materials')
  }
}

module.exports = MaterialsSchema
