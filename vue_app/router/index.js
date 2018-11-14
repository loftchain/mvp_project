import Vue from 'vue'
import VueRouter from 'vue-router'

import Login from '../components/Auth/login/index'
import Register from '../components/Auth/register/index'
import Forgot from '../components/Auth/forgot/index'
import Email from "../components/Auth/email/index";

import ParentLayout from '../components/Layouts/_parentLayout/index'
import Home from '../components/Home/Home'

let router = new VueRouter({
    mode: 'history',
    routes: [
        { path: '/login', component: Login, name: 'login', meta: { requiredAuth: false } },
        { path: '/register', component: Register, name: 'register', meta: { requiredAuth: false } },
        { path: '/forgot/password/:token', component: Forgot, name: 'forgot', meta: { requiredAuth: false } },
        { path: '/forgot/email', component: Email, name: 'email', meta: { requiredAuth: false } },
        {
            path: '/', component: ParentLayout, meta: { requiredAuth: true },
            children: [
                { path: '', component: Home, name: 'home' },
            ]
        },
    ]
})

router.beforeEach((to, from, next) => {
    if (to.matched.some(record => record.meta.requiredAuth)) {
        if (Vue.auth.isAuthenticated()) next()
        else next({ path: '/login' })
    } else {
        next()
    }
})

export default router;
