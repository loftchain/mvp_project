import Vue from 'vue'
import VueRouter from 'vue-router'
import Vuelidate from 'vuelidate'

import 'vuetify/dist/vuetify.min.css'
import Vuetify from 'vuetify'

import VueConfig from 'vue-configuration';
import env from './env';

import VueAuth from './services/auth'
import VueHttp from './services/axios'

import store from './store'
import router from './router'


Vue.use(VueRouter)
Vue.use(Vuelidate)
Vue.use(Vuetify)
Vue.use(VueAuth)
Vue.use(VueHttp)
Vue.use(VueConfig, {
  config: env
});

import Base from './components/Base'

new Vue({
    el: '#app',
    router,
    store,
    render: (h) => h(Base)
})
