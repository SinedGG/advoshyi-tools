const tiktok = require(`./link/tik-tok`);
const insta = require(`./link/insta`);

const { add: addScore } = require(`../models/leaderboard`);

module.exports = async (ctx) => {
  try {
    console.log(
      `Request from ${ctx.from.username} (${ctx.from.id}) - ${ctx.message.text} `
    );

    const startTime = performance.now();

    const text = ctx.message.text;

    var url;

    if (text.includes(`tiktok.com`)) url = await tiktok(text);
    if (text.includes(`instagram.com/reel`)) url = await insta(text);

    if (!url) return;

    if (
      ctx.chat.id == process.env.MAIN_CHANNEL ||
      ctx.chat.id == process.env.MEDIA_CHANNEL
    ) {
      var username = ctx.from.username;
      if (!username) username = ctx.from.first_name;
      else username = `@${username}`;
      await bot.telegram.sendVideo(process.env.MEDIA_CHANNEL, url, {
        caption: `Надіслано - ${username} \nпосилання - [клац](${text})`,
        disable_notification: true,
        parse_mode: "Markdown",
      });
      addScore(ctx.from.id);
    } else
      await bot.telegram.sendVideo(ctx.chat.id, url, {
        reply_to_message_id: ctx.message.message_id,
        disable_notification: true,
      });

    const endTime = performance.now();
    const executionTime = endTime - startTime;
    console.log(`Execution time: ${formatTime(executionTime)}`);
  } catch (error) {
    console.log(error);
  }
};

function formatTime(milliseconds) {
  if (milliseconds < 1000) {
    return milliseconds + " ms";
  } else if (milliseconds < 60000) {
    return (milliseconds / 1000).toFixed(2) + " seconds";
  } else {
    return (milliseconds / 60000).toFixed(2) + " minutes";
  }
}
