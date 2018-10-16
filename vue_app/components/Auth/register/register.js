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
  name: "RegisterForm",
  data: () => ({
    user: { email: "", password: "" },
    dictionary: {
      attributes: {
        email: "E-mail Address"
        // custom attributes
      },
      custom: {
        name: {
          required: () => "Name can not be empty",
          max: "The name field may not be greater than 10 characters"
          // custom messages
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
          this.$router.push({ path: "/" });
        })
        .catch(err => {
          console.log("Error on create user");
        });
    },

    doRegister() {
      this.$validator.validateAll();
      this.$http
        .post(`${window.basePath}/auth/register`, this.user)
        .then(response => {
          this.doLogin();
        })
        .catch(err => {
          console.log("verify your credentials");
        });
    },
  }
};
