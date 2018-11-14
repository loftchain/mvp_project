'use strict'

const User = use('App/Models/User')
const Logger = use('Logger')
const randomString = require('randomstring')

class AuthController {

  async login({request, response, auth}) {
    Logger.transport('file').info('login');
    const {email, password} = request.all()
    const login = await auth.attempt(email, password)
    return login
  }

  async register({request, response, auth}) {

    const { email, password, password_confirmed } = request.all()
    const user = await User.create({ email, password, token: randomString.generate(20) })
    Logger.transport('file').info(user);

    return user
  }

  async getUserInfo({request, response, auth}) {
    return await auth.getUser()
  }

}

module.exports = AuthController
