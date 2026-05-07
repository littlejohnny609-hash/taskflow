const puppeteer = require("puppeteer");
(async () => {
  try {
    const browser = await puppeteer.launch({
      headless: "new"
    });
    const page = await browser.newPage();
    await page.goto("https://example.com");
    console.log("Browser working ✅");
    await browser.close();
  } catch (err) {
    console.error("Error:", err);
  }
})();