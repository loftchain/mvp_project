// var Mailchimp = require('mailchimp-api-v3')
//
// var mailchimp = new Mailchimp(api_key);
// const API = this.$config.MAILCHIMP_FROM_NAME
export default function (Vue) {

  Vue.mailchimp = {

    options(email) {
      return{
        subject_line: "Your Purchase Receipt",
        from_name: this.$config.MAILCHIMP_FROM_NAME,
        from_email: this.$config.MAILCHIMP_FROM_EMAIL,
        to_name: email
      }

    },

    createCampaign(email, template){
      this.$http
        .post(`https://usX.api.mailchimp.com/3.0/campaigns`, {
          user: `anystring:${this.$config.MAILCHIMP_API_KEY}`,
          header : `content-type: application/json`,
          data  : `{"recipients": {"list_id":"${this.$config.MAILCHIMP_LIST_ID}"},"type":"regular","settings":${this.options(email)}`,
          include: template
        })
        .then(response => {
          console.log(response);
          console.log('cool works!');
          
        })
        .catch(err => {
          console.log("smth went wrong with mailchimp");
        });
    },

    sendCampaign(){

    },


  }

  Object.defineProperties(Vue.prototype, {
    $mailchimp: {
      get: () => {
        return Vue.mailchimp
      }
    }
  })

}
