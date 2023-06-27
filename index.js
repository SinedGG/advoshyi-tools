require("dotenv").config();
const { Telegraf } = require("telegraf");

const separator = require("./modules/separator");

global.bot = new Telegraf(process.env.TG_TOKEN);

bot.command("lead", async (ctx) => {
  const { get } = require("./models/leaderboard");

  const board = await get();

  var text = ``;
  for (let i = 0; i < board.length; i++) {
    const { user } = await bot.telegram.getChatMember(
      process.env.MAIN_CHANNEL,
      board[i].tg_id
    );

    text += `${i + 1}. ${user.first_name} - ${board[i].score}\n`;
  }
  ctx.reply(text, {
    disable_notification: true,
  });
});

bot.on("text", (ctx) => {
  separator(ctx);
});

bot.launch();
console.log("Advoshyi-tools is running!");
