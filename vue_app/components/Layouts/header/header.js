import { mapState } from 'vuex'
export default {
  name: 'appHeader',

  computed: {
    ...mapState([
      'user'
    ])
  },

  methods: {

    toggleDrawer () {
      this.$emit('toggleDrawer')
    },

    logout ()
    {
      this.$auth.destroyToken();
      this.$router.push({ name: 'login' })
    }
  }
}
