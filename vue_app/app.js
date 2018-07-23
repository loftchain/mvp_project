import Vue from 'vue'
import VueRouter from 'vue-router'

import 'vuetify/dist/vuetify.min.css'
import Vuetify from 'vuetify'

import VueAuth from './packages/auth'
import VueHttp from './packages/axios'
import VueMailChimp from './packages/mailchimp'

import store from './store'
import router from './router'

Vue.use(VueRouter)
Vue.use(Vuetify)
Vue.use(VueAuth)
Vue.use(VueHttp)
Vue.use(VueMailChimp)

import Base from './components/Base'

new Vue({
    el: '#app',
    router,
    store,
    render: (h) => h(Base)
})
