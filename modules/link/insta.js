const puppeteer = require("puppeteer-extra");
const stealthPlugin = require("puppeteer-extra-plugin-stealth")();

module.exports = (url) => {
  return new Promise(async (resolve, reject) => {
    try {
      stealthPlugin.enabledEvasions.delete("chrome.runtime");
      stealthPlugin.enabledEvasions.delete("navigator.languages");
      puppeteer.use(stealthPlugin);

      var arg = { headless: true };

      if (process.platform == "linux")
        arg.executablePath = "/usr/bin/chromium-browser";

      const browser = await puppeteer.launch(arg);

      const page = await browser.newPage();

      await page.evaluateOnNewDocument(() => {
        delete navigator.__proto__.webdriver;
      });
      await page.setRequestInterception(true);

      page.on("request", (request) => {
        if (["image", "stylesheet", "font"].includes(request.resourceType())) {
          request.abort();
        } else {
          request.continue();
        }
      });

      await page.goto("https://snapinsta.app/");
      await page.waitForSelector('input[name="url"]');
      await page.type('input[name="url"]', url, {
        delay: 100,
      });

      await page.click(".btn-get");
      await page.waitForSelector(".download-media");

      const href = await page.evaluate(() => {
        const button = document.querySelector(".download-media");
        return button.getAttribute("href");
      });

      browser.close();
      resolve(href);
    } catch (error) {
      reject(error);
    }
  });
};
