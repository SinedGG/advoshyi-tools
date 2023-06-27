const axios = require("axios");
const cheerio = require("cheerio");
const _eval = require("eval");

module.exports = (url) => {
  return new Promise(async (resolve, reject) => {
    try {
      const form = new FormData();
      form.append("q", url);

      var response = await axios.post(
        `https://v3.saveinsta.app/api/ajaxSearch`,
        form
      );

      var html = response.data.data;
      var str = cheerio.load(html);
      str = str("a.abutton.btn-premium").attr("href");

      resolve(str);
    } catch (error) {
      reject(error);
    }
  });
};
