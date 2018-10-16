import Vue from 'vue'
import VueRouter from 'vue-router'

import Login from '../components/Auth/login/index'
import Register from '../components/Auth/register/index'
import Forgot from '../components/Auth/forgot/index'

import ParentLayout from '../components/Layouts/_parentLayout/index'
import DashboardHome from '../Pages/Dashboard/Children/Home'
import DashboardContacts from '../Pages/Dashboard/Children/Contacts'

let router = new VueRouter({
    mode: 'history',
    routes: [
        { path: '/login', component: Login, name: 'login', meta: { requiredAuth: false } },
        { path: '/register', component: Register, name: 'register', meta: { requiredAuth: false } },
        { path: '/forgot', component: Forgot, name: 'forgot', meta: { requiredAuth: false } },
        {
            path: '/', component: ParentLayout, meta: { requiredAuth: true },
            children: [
                { path: '', component: DashboardHome, name: 'dashboard-home' },
                { path: 'contacts', component: DashboardContacts, name: 'dashboard-contacts' },
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
