const { chromium } = require("playwright");
const userAgent = require("random-useragent");
const fs = require("fs");

const amzURL =
  "https://www.amazon.com/s?k=taylormade+driver&crid=M38PZ1VHMI9G&sprefix=taylormade+driver%2Caps%2C172&ref=nb_sb_noss_1";

const scrape = async () => {
  const agent = userAgent.getRandom();

  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({ userAgent: agent });
  const page = await context.newPage({ bypassCSP: true });
  await page.setDefaultTimeout(30000);
  await page.setViewportSize({ width: 800, height: 600 });
  await page.goto(amzURL);

  const products = await page.$$(
    ".s-main-slot.s-result-list.s-search-results.sg-row > .s-result-item"
  );

  for (const product of products) {
    try {
      let productName = await product.$(
        ".a-size-medium.a-color-base.a-text-normal"
      );
      let productPrice = await product.$(".a-offscreen");
      let productImage = await product.$(".s-image");
      productName = await productName?.evaluate((e) => e.innerText);
      productPrice = await productPrice?.evaluate((e) => e.innerText);
      productImage = await productImage?.evaluate((e) => e.src);
      try {
        fs.appendFile(
          "results.csv",
          `${productName.replace(/,/g, ".")}, ${productPrice.replace(
            /,/g,
            "."
          )}, ${productImage}\n`,
          (err) => {
            if (err) throw err;
          }
        );
      } catch (e) {
        console.log(e);
      }
    } catch (e) {
      console.log(e);
    }
  }
  await browser.close();
};

const main = async () => {
  scrape().catch((e) => {
    console.error(e);
    process.exit(1);
  });
};

main();
