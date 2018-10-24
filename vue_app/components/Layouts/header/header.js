import UnisenderMixin from '../../../services/unisender'
import { mapState } from 'vuex'


export default {

  name: 'appHeader',

  computed: {
    ...mapState([
      'user'
    ])

  },

  created(){
    console.log('hello from header');
  },

  mixins: [UnisenderMixin],
  methods: {

    toggleDrawer () {
      this.$emit('toggleDrawer')
    },

    logout ()
    {
      this.$auth.destroyToken();
      this.$router.push({ name: 'login' })
    },

    send () {
      this.sendEmail('nkt.millers@gmail.com', 'subject', '<h1>Hello from Vue js </h1>');
      // console.log(this.$config.get('UNISENDER_API_KEY'));
    }
  }
}
