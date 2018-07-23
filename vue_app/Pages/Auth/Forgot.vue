<template>
    <v-app id="inspire">
        <v-content>
            <v-container fluid fill-height>
                <v-layout align-center justify-center>
                    <v-flex xs12 sm8 md4>
                        <v-form @submit.prevent="doRegister" lazy-validation>
                            <v-card class="elevation-12">
                                <v-toolbar dark color="primary">
                                    <v-toolbar-title>Register form</v-toolbar-title>
                                </v-toolbar>
                                <v-card-text>

                                    <v-text-field
                                        v-validate="'required|max:55'"
                                        :counter="55"
                                        :error-messages="errors.collect('name')"
                                        data-vv-name="name"
                                        required
                                        prepend-icon="person"
                                        name="name"
                                        label="Name"
                                        type="text"
                                        v-model="user.name">
                                    </v-text-field>

                                    <v-text-field
                                        v-validate="'required|email'"
                                        :error-messages="errors.collect('email')"
                                        data-vv-name="email"
                                        prepend-icon="person"
                                        name="email"
                                        label="Email"
                                        type="email"
                                        v-model="user.email"
                                        required>
                                    </v-text-field>

                                    <v-text-field
                                        v-validate="'required|min:3|max:128'"
                                        :counter="3"
                                        :error-messages="errors.collect('password')"
                                        data-vv-name="password"
                                        prepend-icon="lock"
                                        name="password"
                                        label="Password"
                                        id="password"
                                        type="password"
                                        v-model="user.password"
                                        required>
                                    </v-text-field>

                                </v-card-text>
                                <v-card-actions>
                                    <router-link :to="{ name: 'login' }" class="btn btn--depressed">
                                        forgot your password
                                    </router-link>
                                    <v-spacer></v-spacer>
                                    <invisible-recaptcha
                                      sitekey="6LdW4mIUAAAAACGlppsS93XhIgLZhki4XPAqOOkN"
                                      :callback="doRegister"
                                      class="btn btn-danger"
                                      color="primary"
                                      type="submit">
                                      Register
                                    </invisible-recaptcha>
                                </v-card-actions>
                            </v-card>
                        </v-form>
                    </v-flex>
                </v-layout>
            </v-container>
        </v-content>
    </v-app>
</template>

<script>
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
</script>
