const { chromium } = require("playwright");
(async () => {
  const result = {
    success: false,
    message: "",
  };
  try {
    const browser = await chromium.launch({
      headless: true,
      args: ["--no-sandbox"]
    });
    const page = await browser.newPage();
    // ⚠️ CHANGE THIS TO TEST URL
    const targetURL = "https://example.com/contact";
    await page.goto(targetURL, {
      waitUntil: "domcontentloaded",
      timeout: 60000,
    });
    // Wait a little
    await page.waitForTimeout(3000);
    // Try filling common fields
    const nameField = await page.$("input[name='name'], input[type='text']");
    if (nameField) {
      await nameField.fill("John Wanjiku");
    }
    const emailField = await page.$("input[type='email']");
    if (emailField) {
      await emailField.fill("john@email.com");
    }
    const messageField = await page.$("textarea");
    if (messageField) {
      await messageField.fill(
        "Hello, my name is John Wanjiku. I am interested in any IT or AI-related opportunities. I would love to contribute and improve your systems. Please let me know if there are any available positions."
      );
    }
    // Try clicking submit
    const submitBtn = await page.$(
      "button[type='submit'], input[type='submit']"
    );
    if (submitBtn) {
      await submitBtn.click();
      await page.waitForTimeout(5000);
    }
    await browser.close();
    result.success = true;
    result.message = "Form auto-filled and submitted successfully.";
  } catch (err) {
    result.success = false;
    result.message = err.message;
  }
  console.log(JSON.stringify(result, null, 2));
})();