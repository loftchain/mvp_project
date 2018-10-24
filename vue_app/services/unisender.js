export default {
  methods: {
    sendEmail(email, subject, view){

      let url = 'https://api.unisender.com/ru/api/sendEmail';
      let params = {
        format: 'json',
        api_key: this.$config.get('UNISENDER_API_KEY'),
        email: email,
        sender_name: this.$config.get('UNISENDER_FROM_NAME'),
        sender_email: this.$config.get('UNISENDER_FROM_EMAIL'),
        subject: subject,
        body: view,
        list_id: this.$config.get('UNISENDER_LIST_ID'),
        lang: 'en',
      }

      this.$http({
        method: 'POST',
        url: url,
        headers: { 'Content-Type': 'application/x-www-form-urlencoded'},
        params: params,
      }).then(response => {
          console.log(response);
        })
        .catch((err) => {
          console.log("AXIOS ERROR: ", err);
        })
    }
  }
}
