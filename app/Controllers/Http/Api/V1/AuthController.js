'use strict'

const User = use('App/Models/User')
const Logger = use('Logger')

class AuthController {

    async login ({ request, response, auth })
    {
        Logger.transport('file').info('debug');
        const { email, password } = request.all()
        const login = await auth.attempt(email, password)
        return login
    }

    async register ({ request, response, auth })
    {
        const { name, email, password } = request.all()
        const user = await User.create({name, email, password})

        return user
    }

    async getUserInfo ({ request, response, auth })
    {
        return await auth.getUser()
    }

}

module.exports = AuthController
