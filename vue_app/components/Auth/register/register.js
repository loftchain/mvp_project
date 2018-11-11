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
    user: { email: "", password: "", password_confirmed: "" },
  }),

  mounted() {
  },

  methods: {
    doLogin() {
      this.$http
        .post(`${window.basePath}/auth/login`, this.user)
        .then(response => {
          this.$auth.setToken(response.data.token);
          this.$router.push({ path: "/" });
        })
        .catch(err => {
          console.log("Error on create user");
        });
    },

    doRegister() {
      this.$http
        .post(`${window.basePath}/auth/register`, this.user)
        .then(response => {
          console.log(response);
          this.doLogin();
        })
        .catch(err => {
          console.log("Smth went wrong during register (Vue Js)");
        });
    },
  }
};
