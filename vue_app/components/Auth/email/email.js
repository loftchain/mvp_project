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
  data () {
    return {
      user: {email: ''}
    }
  },
  computed: {

  },
  mounted () {

  },
  methods: {
    send() {
      this.sendEmail(
          this.user.email,
          'Forgot password?',
          'test'
      )
    }
  }
}
