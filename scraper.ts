const playwright = require("playwright");
const userAgent = require("random-useragent");

const amzURL =
  "https://www.amazon.com/s?k=taylormade+driver&crid=3UWOKCU781EWC&qid=1697179223&sprefix=taylormade+%2Caps%2C240&ref=sr_pg_1";

(async () => {
  const agent = userAgent.getRandom();

  const browser = await playwright.chromium.launch({ headless: false });
  const context = await browser.newContext({ userAgent: agent });
  const page = await context.newPage({ bypassCSP: true });
  await page.setDefaultTimeout(30000);
  await page.setViewportSize({ width: 800, height: 600 });
  await page.goto(amzURL);

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
