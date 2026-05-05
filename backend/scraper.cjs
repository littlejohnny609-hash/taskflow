const { chromium } = require("playwright");
async function delay(ms) {
  return new Promise(res => setTimeout(res, ms));
}
(async () => {
  const browser = await chromium.launch({
    headless: true,
    args: ["--no-sandbox"]
  });
  const context = await browser.newContext({
    userAgent:
      "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/122 Safari/537.36",
    viewport: { width: 1366, height: 768 }
  });
  const page = await context.newPage();
  const result = {
    amazon: [],
    walmart: [],
    comparison: {}
  };
  // =========================
  // AMAZON (WORKING SELECTOR)
  // =========================
  try {
    await page.goto("https://www.amazon.com/s?k=playstation+5", {
      waitUntil: "domcontentloaded",
      timeout: 60000
    });
    await delay(4000);
    const amazonItems = await page.$$eval(
      "div[data-component-type='s-search-result']",
      items =>
        items.slice(0, 5).map(el => ({
          title:
            el.querySelector("h2 span")?.innerText?.trim() || "No title",
          price:
            el.querySelector(".a-price .a-offscreen")?.innerText ||
            "0"
        }))
    );
    result.amazon = amazonItems;
  } catch (err) {
    result.amazon = {
      error: "Amazon failed",
      reason: err.message
    };
  }
  // =========================
  // WALMART (FIXED SAFE VERSION)
  // =========================
  try {
    await page.goto("https://www.walmart.com/search?q=playstation+5", {
      waitUntil: "domcontentloaded",
      timeout: 60000
    });
    await delay(5000);
    const walmartItems = await page.$$eval(
      "div[data-item-id]",
      items =>
        items.slice(0, 5).map(el => {
          const title =
            el.querySelector("span")?.innerText?.trim() || "No title";
          const price =
            el.querySelector("[itemprop='price']")?.getAttribute("content") ||
            el.querySelector("span")?.innerText ||
            "0";
          return { title, price };
        })
    );
    result.walmart = walmartItems.length
      ? walmartItems
      : [{ title: "No Walmart data", price: "0" }];
  } catch (err) {
    result.walmart = {
      error: "Walmart failed",
      reason: err.message
    };
  }
  // =========================
  // COMPARISON (SAFE)
  // =========================
  const extract = arr =>
    Array.isArray(arr)
      ? arr
          .map(p => parseFloat(String(p.price).replace(/[^0-9.]/g, "")))
          .filter(n => !isNaN(n))
      : [];
  const avg = arr =>
    arr.length ? arr.reduce((a, b) => a + b, 0) / arr.length : 0;
  const amazonAvg = avg(extract(result.amazon));
  const walmartAvg = avg(extract(result.walmart));
  result.comparison = {
    amazonAverage: amazonAvg,
    walmartAverage: walmartAvg,
    cheaperStore:
      amazonAvg && walmartAvg
        ? amazonAvg < walmartAvg
          ? "Amazon"
          : "Walmart"
        : "Unknown"
  };
  console.log(JSON.stringify(result, null, 2));
  await browser.close();
})();