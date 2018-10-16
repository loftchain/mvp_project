import Vue from "vue";
import VeeValidate from "vee-validate";
import InvisibleRecaptcha from 'vue-invisible-recaptcha';

Vue.use(VeeValidate);

Vue.component('invisible-recaptcha', function (resolve, reject) {
  setTimeout(function () {
    resolve(InvisibleRecaptcha)
  }, 500)
})


export default {
  $_veeValidate: {
    validator: "new"
  },
  name: "LoginForm",
  data: () => ({
    user: {
      email: "",
      password: ""
    },
    dictionary: {
      attributes: {
        email: "E-mail Address"
      },
      custom: {
        email: {
          required: "Name can not be empty",
          min: "email is too short"
        },
        password: {
          required: "Password field is required",
          min: "Password is too short",
          max: "Password is too large"
        }
      }
    }
  }),

  mounted() {
    this.$validator.localize("en", this.dictionary);
  },

  methods: {
    doLogin() {
      this.$validator.validateAll();

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
