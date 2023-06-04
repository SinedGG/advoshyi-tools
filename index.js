require("dotenv").config();
const { Telegraf } = require("telegraf");

const separator = require("./modules/separator");

global.bot = new Telegraf(process.env.TG_TOKEN);

bot.on("text", (ctx) => {
  separator(ctx);
});

bot.launch();
