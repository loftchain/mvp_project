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
        user: {token: "", email: "", password: "", password_confirmed: ""},
        error: {error: false, message: '', type: null},
    }),

    mounted() {
        this.getUserInfo()
    },

    methods: {
        doForgot() {
            this.$http.post(`${window.basePath}/password/reset`, this.user)
                .then((res) => {
                    const {data} = res;
                    if(!data.error) {
                        this.$auth.setToken(data.token);
                        this.$router.push({path: "/"});
                    } else {
                        this.error = data
                        console.log(data)
                    }

                })
        },

        getUserInfo() {
            this.$http.get(`${window.basePath}/forgot/info`)
                .then((res) => {
                    this.user = res.data;
                })
        },
    }
};
