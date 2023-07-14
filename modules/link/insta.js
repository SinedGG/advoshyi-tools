const axios = require("axios");
const cheerio = require("cheerio");
const _eval = require("eval");

module.exports = (url) => {
  return new Promise(async (resolve, reject) => {
    try {
      const form = new FormData();
      form.append("url", url);

      var response = await axios.post(
        `https://snapsave.app/uk/action.php`,
        form
      );

      var html = response.data.replace(`eval`, ` module.exports = `);
      var res = _eval(html);
      res = res.replace(/\\/g, " ");
      var str = cheerio.load(res);
      str = str(".download-items__btn a").attr("href");

      resolve(str);
    } catch (error) {
      reject(error);
    }
  });
};
