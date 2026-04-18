const { chromium } = require("playwright");

async function apply(url, message) {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();

  await page.goto(url, { waitUntil: "load" });

  // ⚠️ These selectors depend on the site
  // Example generic form filling:
  await page.fill("input[name='name']", "John Wanjiku");
  await page.fill("input[name='email']", "john@example.com");
  await page.fill("textarea", message);

  await page.click("button[type='submit']");

  await browser.close();

  return "Form submitted successfully";
}

module.exports = { apply };