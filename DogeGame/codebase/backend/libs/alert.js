const config = require('./config')

// gabmail
const axios = require('axios');
const querystring = require('querystring');

module.exports = class {
  async gabmail({
    recipients, from, subject, text
  }) {
    try {
      console.log('SENDING EMAIL')
      console.log(recipients, from, subject, text)

      const params = { to: recipients.join(), from, subject, text }
      await axios.get(`https://anacoinda.com/c/sendEmail.php?${querystring.stringify(params)}`)

      console.log({params})
    } catch (err) {
      console.error(err)
    }
  }
}
