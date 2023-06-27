const tiktok = require(`./link/tik-tok`);
const insta = require(`./link/insta`);

module.exports = async (ctx) => {
  try {
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
    } else
      await bot.telegram.sendVideo(ctx.chat.id, url, {
        reply_to_message_id: ctx.message.message_id,
        disable_notification: true,
      });
  } catch (error) {
    console.log(error);
  }
};
