const playwright = require("playwright");
const userAgent = require("random-useragent");

const tmURL = "https://www.taylormadegolf.com/taylormade-clubs/?lang=en_US";
const wilURL = "https://www.wilson.com/en-us/golf/irons";

(async () => {
  const agent = userAgent.getRandom();

  const browser = await playwright.chromium.launch({ headless: false });
  const context = await browser.newContext({ userAgent: agent });
  const page = await context.newPage({ bypassCSP: true });
  await page.setDefaultTimeout(30000);
  await page.setViewportSize({ width: 800, height: 600 });
  await page.goto(wilURL);

  const selector = "segmented-product-list_list";
  await page.locator(selector).waitFor();
  const list = await page.$(selector);

  // const irons = await list.evaluate(e => e.innerHTML);

  // console.log(irons);
  console.log(list);

  await browser.close();
})().catch((e) => {
  console.error(e);
  process.exit(1);
});
