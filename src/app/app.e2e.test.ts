import puppeteer, { Browser, Page } from 'puppeteer';

import { delay } from './test-mocks';

describe("App", () => {
  let browser: Browser;
  let page: Page;

  beforeAll(async () => {
    browser = await puppeteer.launch();
    page = await browser.newPage();
  });

  test("Scenario: start questionnaire, asnwer questions, get results, restart", async () => {
    await page.goto(`http://localhost:3000`);
    await page.waitForSelector("#root");

    let startButton;

    startButton = await page.waitForSelector("text/Start");
    expect(startButton).toBeTruthy();
    await startButton?.click();
    await delay(5001);

    await page.content();

    let nextButton;
    let options;

    for (let i = 0; i < 5; i++) {
      nextButton = await page.waitForSelector("text/Next");
      expect(nextButton).toBeTruthy();
      options = await page.$$("input[type=checkbox], input[type=radio]");
      expect(options).toBeTruthy();
      await options[0].click();
      nextButton = await page.waitForSelector("text/Next")
      await nextButton?.click();
    }

    const tryAgainButton = await page.waitForSelector("text/Try again");
    expect(tryAgainButton).toBeTruthy();
    await tryAgainButton?.click();

    startButton = await page.waitForSelector("text/Start");
    expect(startButton).toBeTruthy();
  }, 100000);

  afterAll(() => browser.close());
});
