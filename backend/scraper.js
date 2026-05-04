const { chromium } = require('playwright');
(async () => {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();
  await page.goto('https://www.amazon.com/');
  await page.fill('input[name="field-keywords"]', 'PlayStation 5');
  await page.press('input[name="field-keywords"]', 'Enter');
  await page.waitForSelector('.s-result-item');
  const products = await page.$$eval('.s-result-item', items =>
    items.slice(0, 5).map(item => {
      const title = item.querySelector('h2 span')?.innerText;
      const price = item.querySelector('.a-price-whole')?.innerText;
      return { title, price };
    })
  );
  console.log(JSON.stringify(products));
  await browser.close();
})();