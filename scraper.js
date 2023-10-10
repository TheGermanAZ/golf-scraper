const playwright = require("playwright");
const userAgent = require("user-agents");

const URL = "https://www.taylormadegolf.com/taylormade-clubs/?lang=en_US";

(async () => {
  const agent = new userAgent().random();

  const browser = await playwright.chromium.launch({ headless: false });
  const context = await browser.newContext({ userAgent: agent.toString() });
  const page = await context.newPage({ bypassCSP: true });
  await page.setDefaultTimeout(30000);
  await page.setViewportSize({ width: 800, height: 200 });
  await page.goto(URL);

  console.log(agent.toString());
  // console.log(agent2);

  await browser.close();
})().catch((e) => {
  console.error(e);
  process.exit(1);
});
