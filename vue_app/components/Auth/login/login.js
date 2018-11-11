import Vue from "vue";
import InvisibleRecaptcha from 'vue-invisible-recaptcha';

Vue.component('invisible-recaptcha', function (resolve, reject) {
  setTimeout(function () {
    resolve(InvisibleRecaptcha)
  }, 500)
})


export default {
  name: "LoginForm",
  data: () => ({
    user: { email: "", password: "" },
  }),

  mounted() {
  },

  methods: {
    doLogin() {
      this.$http
        .post(`${window.basePath}/auth/login`, this.user)
        .then(response => {
          this.$auth.setToken(response.data.token);
          this.$router.push({path: "/"});
        })
        .catch(err => {
          console.log("verify your credentials");
        });
    }
  }
};
