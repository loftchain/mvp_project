import Vue from "vue";
import InvisibleRecaptcha from 'vue-invisible-recaptcha';

Vue.component('invisible-recaptcha', function (resolve, reject) {
  setTimeout(function () {
    resolve(InvisibleRecaptcha)
  }, 500)
})

export default {
  name: "RegisterForm",
  data: () => ({
    user: { email: ""},
  }),

  mounted() {},

  methods: {
    doForgot() {}
  }
};
