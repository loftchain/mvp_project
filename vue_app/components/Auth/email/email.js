import Vue from "vue";
import InvisibleRecaptcha from 'vue-invisible-recaptcha';
import UnisenderMixin from '../../../mixins/unisender'

Vue.component('invisible-recaptcha', function (resolve, reject) {
    setTimeout(function () {
        resolve(InvisibleRecaptcha)
    }, 500)
})

export default {
    mixins: [UnisenderMixin],
    name: 'email',
    components: {},
    props: [],
    data() {
        return {
            user: {email: ''},
            error: {error: false, message: '', type: null}
        }
    },
    computed: {},
    mounted() {

    },
    methods: {
        getUserToken() {
            this.$http.post(`${window.basePath}/forgot/email`, this.user)
                .then((response) => {
                    const {data} = response
                    // const res = this.send(window.origin + '/forgot/password/' + response.data.token)
                    if (!data.error) {
                        console.log(data)
                        this.$router.push({path: "/"});
                    } else {
                        this.error = data
                    }
                })
        },

        send(link) {
            this.sendEmail(
                this.user.email,
                'Forgot password?',
                link
            )
        }
    }
}
