'use strict'

const Schema = use('Schema')

class UserSchema extends Schema {
    up() {
        this.create('users', table => {
            table.increments()
            table.string('name').notNullable()
            table.string('email').notNullable().unique()
            table.string('password').notNullable()
            table.string('ip_address')
            table.string('user_agent')
            table.string('token')
            table.integer('reg_attempts', 5).defaultTo(0)
            table.integer('reset_attempts', 5).defaultTo(0)
            table.string('remember_token', 255)
            table.timestamps()
        })
    }

    down() {
        this.drop('users')
    }
}

module.exports = UserSchema
