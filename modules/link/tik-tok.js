const axios = require("axios");

module.exports = (url) => {
  return new Promise(async (resolve, reject) => {
    try {
      var response = await axios.post(
        `https://downloader.bot/api/tiktok/info`,
        {
          url,
        }
      );

      resolve(response.data.data.mp4);
    } catch (error) {
      reject(error);
    }
  });
};
