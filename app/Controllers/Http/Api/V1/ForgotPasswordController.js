'use strict'

const User = use('App/Models/User')
const randomString = require('randomstring')
const axios = require('axios')
const Env = use('Env')

class ForgotPasswordController {
    async sendResetLinkEmail({ request, session, view }) {
        const { email } = request.all();

        const user = await User
            .query()
            .where('email', email)
            .first();

        if (!user) {
            return {
                error: true,
                message: 'User not found',
                type: 'not_found_user'
            };
        }

        this.sendMessage(email, 'Forgot password', view.render('mails.send_reset_password_link', {
            link: Env.get('APP_URL') + '/forgot/password/' + user.token
        }));

        session.put('reset_password_email', user.email);
        session.put('reset_password_token', user.token);

        return user;
    }

    getUserInfo({ session }) {
        const userInfo = {
            email: session.get('reset_password_email'),
            token: session.get('reset_password_token')
        };

        return userInfo;
    }

    async passwordReset({ request, session, auth }) {
        const { email, password, password_confirmed } = request.all();

        const user = await User
            .query()
            .where('email', email)
            .first();

        if(user.email !== session.get('reset_password_email')) {
            return {
                error: true,
                message: 'Not found user email',
                type: 'not_found_email'
            };
        }

        if(password !== password_confirmed) {
            return {
                error: true,
                message: 'Password confirmed not equal',
                type: 'password_not_equal'
            };
        }

        if(user.token !== session.get('reset_password_token')) {
            return {
                error: true,
                message: 'Not found user token',
                type: 'not_found_token'
            };
        }

        user.password = password;
        user.token = randomString.generate(20)
        await user.save()

        const login = await auth.attempt(email, password)

        return login;
    }

    sendMessage(email, subject, view) {
        let url = 'https://api.unisender.com/ru/api/sendEmail';
        let params = {
            format: 'json',
            api_key: '6jnh15wbr5b1ndjzmykwcqmiqyfdk6xnyfkmei6e',//Env.get('UNISENDER_API_KEY'),
            email: email,
            sender_name: 'Supper support',//Env.get('UNISENDER_FROM_NAME'),
            sender_email: 'loftchain@gmail.com',//Env.get('UNISENDER_FROM_EMAIL'),
            subject: subject,
            body: view,
            list_id: 15233965,//Env.get('UNISENDER_LIST_ID'),
            lang: 'en',
        }

        axios({
            method: 'POST',
            url: url,
            headers: { 'Content-Type': 'application/x-www-form-urlencoded'},
            params: params,
        }).then(response => {
            console.log(response);
        })
            .catch((err) => {
                console.log("AXIOS ERROR: ", err);
            })
    }
}

module.exports = ForgotPasswordController
