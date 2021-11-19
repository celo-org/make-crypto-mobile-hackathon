import { Client, MessageEmbed } from "discord.js";
import Web3 from "web3";
require("dotenv").config();
const Bot = require("intelligo");
const AUTHOR = "@aleadorjan";
const BOT_NAME = "CeloAIDiscordBot";
const BOT_NAME_FOOTER = "CeloAIDiscordBot";
const EMBED_COLOR_PRIMARY = 0x35d07f;
const EMBED_COLOR_SECONDARY = 0xfbcc5c;
const IMAGE_DEFAULT = "https://i.imgur.com/vQrAXOC.png"
const LOGO = "https://i.imgur.com/vQrAXOC.png";
const URL_BOT = "https://celo.org/";
const MNEMONIC = process.env.MNEMONIC;
const SENDER_ADDRESS = process.env.PUBLIC_KEY;
const TOKEN_NAME = 'CELO'
console.log(`Starting bot...`);
console.log(`Connecting web3 to ..`);

const client: Client = new Client();
const web3 = new Web3(process.env.RPC_URL);
const bot = new Bot.MessengerBot({
  PAGE_ACCESS_TOKEN: "PAGE_ACCESS_TOKEN",
  VALIDATION_TOKEN: "VALIDATION_TOKEN",
  APP_SECRET: "APP_SECRET",
});
//Training the AI Bot  
bot.learn([
  {
    input: "What is my balance",
    output: "!balance" + process.env.PUBLIC_KEY,
  },
  { input: "account balance", output: "balance" },
  { input: "my balance", output: "balance" },

]);
client.on("ready", () => {
  console.log(`Logged in as ${client.user.tag}!`);
});


client.on("message", async (msg) => {
  try {
    const result = bot.answer(msg.content);
    if (msg.author.bot) return;
    const command = msg.content;
    const responseAI = result[0];
    console.log(`${msg.author.username} said: ${msg.content}`)
    console.log(`AI said: ${responseAI}`)
    if (command === "!balance" || responseAI === "balance") {
          const accountBalance = BigInt(await web3.eth.getBalance(SENDER_ADDRESS));
              const msgEmbed = new MessageEmbed()
              .setColor(EMBED_COLOR_PRIMARY)
              .setDescription(BOT_NAME)
              .setURL(URL_BOT)
              .setAuthor("Author: " + AUTHOR, IMAGE_DEFAULT, URL_BOT)
              .setThumbnail(LOGO)
              .addField("Your public key", SENDER_ADDRESS, true)  
              .addField("Current account balance", `${accountBalance / (10n ** 18n)} ${TOKEN_NAME}`)
              .setImage(LOGO)
              .setFooter(BOT_NAME_FOOTER, IMAGE_DEFAULT)
              .setTimestamp();
            msg.channel.send(msgEmbed);
     
        client.user.setActivity("getTokens", { type: "WATCHING" });
         // client.user.setAvatar(IMAGE_DEFAULT)
    }
  } catch (e) {
    msg.reply("ERROR");
    console.log(new Date().toISOString(), "ERROR", e.stack || e);
  }
});

client.login(process.env.DISCORD_TOKEN);
