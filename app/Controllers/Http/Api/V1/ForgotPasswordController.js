'use strict'

const User = use('App/Models/User')

class ForgotPasswrodController {
    async sendResetLinkEmail({ request, session }) {
        const { email } = request.all();

        const user = await User
            .query()
            .where('email', email)
            .first();

        session.put('reset_password_email', user.email);
        session.put('reset_password_token', user.token);

        return user
    }

    getUserInfo({ session }) {
        const userInfo = {
            email: session.get('reset_password_email'),
            token: session.get('reset_password_token')
        };

        return userInfo;
    }
}

module.exports = ForgotPasswrodController
