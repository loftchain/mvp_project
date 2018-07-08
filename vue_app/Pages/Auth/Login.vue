<template>
    <v-app id="inspire">
        <v-content>
            <v-container fluid fill-height>
                <v-layout align-center justify-center>
                    <v-flex xs12 sm8 md4>
                        <v-form @submit.prevent="doLogin" lazy-validation>
                        <v-card class="elevation-12">
                            <v-toolbar dark color="primary">
                                <v-toolbar-title>Login form</v-toolbar-title>
                            </v-toolbar>
                            <v-card-text>

                                    <v-text-field
                                        v-validate="'required|email'"
                                        :error-messages="errors.collect('email')"
                                        data-vv-name="email"
                                        prepend-icon="person"
                                        name="login"
                                        label="Email"
                                        type="email"
                                        v-model="user.email"
                                        required>
                                    </v-text-field>
                                    <v-text-field
                                        v-validate="'required|min:3|max:128'"
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
                                <router-link :to="{ name: 'register' }" class="btn btn--depressed">
                                    Register
                                </router-link>
                                <v-spacer></v-spacer>
                              <invisible-recaptcha
                                sitekey="6LdW4mIUAAAAACGlppsS93XhIgLZhki4XPAqOOkN"
                                :callback="doLogin"
                                class="btn btn-danger"
                                color="primary"
                                type="submit">
                                Login
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
  export default {
    components: { "invisible-recaptcha": InvisibleRecaptcha },
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
</script>
