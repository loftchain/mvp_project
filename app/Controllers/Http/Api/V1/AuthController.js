'use strict'

const User = use('App/Models/User')
const { validate } = use('Validator')

class AuthController {

    async login ({ request, response, auth })
    {
        const { email, password } = request.all()
        const login = await auth.attempt(email, password)

        return login
    }

    async register ({ request, response, auth })
    {
        const rules = {
            name: 'required|unique:users,name',
            email: 'required|email|unique:users,email',
            password: 'required|min:6|max:30'
        }

        const messages = {
            'name.required': 'This field is required',
            'email.required': 'This field is required',
            'password.required': 'Enter a valid password'
        }

        const validation = await validate(request.all(), rules, messages)
        
        if (validation.fails()) {
            return validation.messages()
            // return response.send({errors: validation.messages() })
        }

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
