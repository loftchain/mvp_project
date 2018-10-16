import appHeader from '../header/index'
import appFooter from '../footer/index'
import appNavbar from '../navbar/index'

import { mapMutations } from 'vuex'

export default {
  components: { appHeader, appFooter, appNavbar },

  data: () => ({
    drawer: true
  }),

  mounted ()
  {
    this.getUserInfo()
  },

  methods: {

    ...mapMutations([
      'SET_USER'
    ]),

    getUserInfo ()
    {
      let headers = { 'Authorization': this.$auth.getToken() }
      this.$http.get(`${window.basePath}/auth/user`, {headers})
        .then(response => {
          this.SET_USER(response.data)
        })
        .catch(err => {
          alert('Error on get user data')
        })
    },

    toggleDrawer () {
      console.log(this.drawer);
      this.drawer = !this.drawer
      this.$emit('drawer', this.drawer)
    }

  }
}
