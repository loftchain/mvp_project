import Vue from 'vue'
import vueConfig  from 'vue-config'


const configs = {
  MAILCHIMP_API_KEY: 'd3f58cfc0b7b89981bf77b6820d29985-us18',
  MAILCHIMP_LIST_ID: '184e5d52d7',
  MAILCHIMP_FROM_NAME: 'Supper support',
  MAILCHIMP_FROM_EMAIL: 'support@loftchain.io',
}

Vue.use(vueConfig, configs)
