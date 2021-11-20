import { Client, MessageEmbed } from "discord.js";
import Web3 from "web3";

require("dotenv").config();
const QRContractKit = require("@celo/contractkit");
const bip39 = require("bip39");
const ethers = require("ethers");
const fs = require("fs");
const Bot = require("intelligo");
const QRCode = require("qrcode");

const AUTHOR = "@aleadorjan";
const ABOUT_CELO =
  "CELO is a utility and governance asset for the Celo community, which has a fixed supply and variable value. With CELO, you can help shape the direction of the Celo Platform.";

const BOT_NAME = "CeloAIDiscordBot";
const BOT_NAME_FOOTER = "CeloAIDiscordBot";
const EMBED_COLOR_PRIMARY = 0x35d07f;
const EMBED_COLOR_SECONDARY = 0xfbcc5c;
const IMAGE_DEFAULT = "https://i.imgur.com/vQrAXOC.png";
const LOGO = "https://i.imgur.com/vQrAXOC.png";
const CELO_LOGO_COLOR = "https://i.imgur.com/QZwffyT.png";
const URL_BOT = "https://celo.org/";
const MNEMONIC = process.env.MNEMONIC;
const SENDER_ADDRESS = process.env.PUBLIC_KEY;
const TOKEN_NAME = "CELO";
const DELETE_FILE_TIMEOUT = 10000;
const QR_FILE = "filename.png";
const QR_COLOR = "#36cf80";
const QR_BACKGROUND = "#1111";

const QR_REQUEST_PAY_10 = "celo://wallet/pay?address="+ SENDER_ADDRESS+"&displayName=user";
const URL_SOCIAL_MEDIUM = "https://medium.com/celoorg";
const URL_SOCIAL_GITHUB = "https://github.com/celo-org";
const URL_SOCIAL_TWITTER = "https://twitter.com/CeloOrg";
const URL_SOCIAL_FORUM = "https://forum.celo.org/";
const URL_SOCIAL_CHAT = "https://discord.gg/6yWMkgM";
const URL_SOCIAL_YOUTUBE =
  "https://youtube.com/channel/UCCZgos_YAJSXm5QX5D5Wkcw";
const URL_SOCIAL_INSTAGRAM = "https://www.instagram.com/celoorg/";
const URL_SOCIAL_DEFI = "https://defipulse.com/";
const URL_SOCIAL_LINKEDIN = "https://www.linkedin.com/company/celoOrg/";
const URL_SOCIAL_TWITCH = "https://www.twitch.tv/celoorg";
const URL_SOCIAL_REDIT = "https://www.reddit.com/r/celo/";
const URL_SOCIAL_TELEGRAM = "https://t.me/celoplatform";

console.log(`Starting bot...`);
console.log(`Connecting web3 to ..`);

const client: Client = new Client();
const web3 = new Web3(process.env.RPC_URL);
const kit = QRContractKit.newKitFromWeb3(web3);

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
  { input: "create account", output: "create" },
  { input: "send tokens", output: "qr" },
  { input: "get tokens", output: "qr" },
  { input: "get tokens", output: "qr" },
  { input: "social", output: "social" },
  { input: "social media", output: "social" },
  { input: "celo", output: "social" },
]);
const deleteQRFile = () => {
  fs.unlinkSync(QR_FILE);
};
client.on("ready", () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

client.on("message", async (msg) => {
  try {
    const result = bot.answer(msg.content);
    const responseAI = result[0];
    if (msg.author.bot) return;
    const command = msg.content;
    console.log(`${msg.author.username} said: ${msg.content}`);
    console.log(`AI said: ${responseAI}`);

    if (command === "!create" || responseAI === "create") {
      let mnemonic = bip39.generateMnemonic();
      const wallet = ethers.Wallet.fromMnemonic(mnemonic);
      const createEmbed = new MessageEmbed()
        .setURL("Account Created")
        .setColor(EMBED_COLOR_PRIMARY)
        .setDescription(ABOUT_CELO)
        .setURL(URL_BOT)
        .setAuthor("Author: " + AUTHOR, IMAGE_DEFAULT, URL_BOT)
        .setThumbnail(LOGO)
        .setTitle("AI")
        .addField(`Your public key`, " address" + `${wallet.address}`, false)
        .addField(`Your mnemonic phrase`, " timestamp: " + `${mnemonic}`, false)
        .setImage(LOGO)
        .setFooter(BOT_NAME_FOOTER, IMAGE_DEFAULT)
        .setTimestamp();
      msg.author.send(createEmbed);
    }
    if (command === "!celo" || responseAI === "celo") {
      const socialEmbed = new MessageEmbed()
        .setColor(EMBED_COLOR_PRIMARY)
        .setURL(URL_BOT)
        .setAuthor("author: " + msg.author.username, CELO_LOGO_COLOR, URL_BOT)
        .setDescription(BOT_NAME)
        .setThumbnail(LOGO)
        .addFields(
          { name: "blog", value: URL_SOCIAL_MEDIUM, inline: true },
          { name: "github", value: URL_SOCIAL_GITHUB, inline: true },
          { name: "twitter", value: URL_SOCIAL_TWITTER, inline: true },
          { name: "forum", value: URL_SOCIAL_FORUM, inline: true },
          { name: "chat", value: URL_SOCIAL_CHAT, inline: true },
          { name: "youtube", value: URL_SOCIAL_YOUTUBE, inline: true },
          { name: "defi", value: URL_SOCIAL_DEFI, inline: true },
          { name: "linkedin", value: URL_SOCIAL_LINKEDIN, inline: true },
          { name: "twitch", value: URL_SOCIAL_TWITCH, inline: true },
          { name: "redit", value: URL_SOCIAL_REDIT, inline: true },
          { name: "telegram", value: URL_SOCIAL_TELEGRAM, inline: true }
        )
        .setImage(LOGO)
        .setFooter(BOT_NAME_FOOTER, IMAGE_DEFAULT)
        .setTimestamp();
      msg.channel.send(socialEmbed);
    }

    if (command === "!balance" || responseAI === "balance") {
      const accountBalance = BigInt(await web3.eth.getBalance(SENDER_ADDRESS));
      const msgEmbed = new MessageEmbed()
        .setColor(EMBED_COLOR_PRIMARY)
        .setDescription(BOT_NAME)
        .setURL(URL_BOT)
        .setThumbnail(IMAGE_DEFAULT)
        .setAuthor("Author: " + AUTHOR, IMAGE_DEFAULT, URL_BOT)
        .setThumbnail(LOGO)
        .addField("Your public key", SENDER_ADDRESS, true)
        .addField(
          "Current account balance",
          `${accountBalance / 10n ** 18n} ${TOKEN_NAME}`
        )
        .setImage(LOGO)
        .setFooter(BOT_NAME_FOOTER, IMAGE_DEFAULT)
        .setTimestamp();
      msg.channel.send(msgEmbed);

      client.user.setActivity("getTokens", { type: "WATCHING" });
      // client.user.setAvatar(IMAGE_DEFAULT)
    }
    if (command === "!price" || responseAI === "price") {
      const oneGold = await kit.web3.utils.toWei("1", "ether");
      const exchange = await kit.contracts.getExchange();
      console.log(oneGold);
      console.log(exchange);
      const amountOfcUsd = await exchange.quoteGoldSell(oneGold);
      let convertAmount = amountOfcUsd / 10000000000000000;
      const createPriceEmbed = new MessageEmbed()
        .setColor(EMBED_COLOR_PRIMARY)
        .setAuthor("Author: " + AUTHOR, IMAGE_DEFAULT, URL_BOT)
        .addField("1 ETH/CELO", `${convertAmount}`)
        .setThumbnail(LOGO)
        .setTitle(`ETH Price to CELO`)
        .setURL(URL_BOT)
        .setTimestamp()
        .setImage(LOGO)
        .setThumbnail(IMAGE_DEFAULT)
        .setFooter("Convert ETH - CELO", IMAGE_DEFAULT);
        client.user.setActivity("price Query", { type: "WATCHING" });
   
      msg.channel.send(createPriceEmbed);
    }
    if (command === "!qr" || responseAI === "qr") {
      QRCode.toFile(
        QR_FILE,
        QR_REQUEST_PAY_10,
        {
          color: {
            dark: QR_COLOR,
            light: QR_BACKGROUND,
          },
          scale: 6,
        },
        function (err) {
          if (err) throw err;
          console.log("done");
        }
      );
      const createQREmbed = new MessageEmbed()
        .setColor(EMBED_COLOR_PRIMARY)
        .addField("send request to pay ", QR_REQUEST_PAY_10)
        .setAuthor("Author: " + AUTHOR, IMAGE_DEFAULT, URL_BOT)
        .setTitle(`QR pay/receive with ` + BOT_NAME + URL_BOT)
        .setURL(URL_BOT)
        .setThumbnail(LOGO)
        .setFooter(BOT_NAME_FOOTER);
      msg.channel.send(createQREmbed);
      msg.channel.send({ files: [QR_FILE] });
      client.user.setActivity("qr Generation", { type: "WATCHING" });
   
      setTimeout(deleteQRFile, DELETE_FILE_TIMEOUT);
    }
  } catch (e) {
    const errorEmbed = new MessageEmbed()
      .setColor(EMBED_COLOR_PRIMARY)
      .addField("Error please try again :) ", QR_REQUEST_PAY_10)
      .setAuthor("Author: " + AUTHOR, IMAGE_DEFAULT, URL_BOT)
      .setTitle(`Error ` + BOT_NAME + URL_BOT)
      .setURL(URL_BOT)
      .setThumbnail(LOGO)
      .setFooter(BOT_NAME_FOOTER);
    msg.channel.send(errorEmbed);
    client.user.setActivity("error", { type: "WATCHING" });
   
    console.log(new Date().toISOString(), "ERROR", e.stack || e);
  }
});

client.login(process.env.DISCORD_TOKEN);
