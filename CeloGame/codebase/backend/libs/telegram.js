const AWS = require('aws-sdk')
const config = require('./config')

const sm = new AWS.SecretsManager({
    region: config.region
});

const TelegramBot = require('node-telegram-bot-api');

module.exports = class {
  async setup() {
    const token = (await sm.getSecretValue({SecretId: config.telegram.secret}).promise()).SecretString
    this.bot = new TelegramBot(token, {polling: true});
  }

  async send({ message, chatId }) {
    try {
      if(!this.bot) await this.setup()
      return await this.bot.sendMessage(chatId, message)
    } catch (err) {
      console.error(err)
      throw err
    }
  }
}
