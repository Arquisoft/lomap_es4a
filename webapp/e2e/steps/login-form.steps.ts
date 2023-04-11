import { defineFeature, loadFeature } from 'jest-cucumber';
import puppeteer from "puppeteer";

const feature = loadFeature('./features/login-form.feature');

let page: puppeteer.Page;
let browser: puppeteer.Browser;

defineFeature(feature, test => {
  
  beforeAll(async () => {
    browser = process.env.GITHUB_ACTIONS
      ? await puppeteer.launch()
      : await puppeteer.launch({ headless: false, slowMo: 50 });
    page = await browser.newPage();

    await page
      .goto("http://localhost:3000", {
        waitUntil: "networkidle0",
      })
      .catch(() => {});
  });

  test('The user wants to log into the system', ({given,when,then}) => {

    given('An unlogged user', () => {
    });

    when('I select a pod provider and press submit', async () => {
      await expect(page).toClick('#selectPodProvider');
      await expect(page).toClick('li', { text: 'Solid Community' });
      await expect(page).toClick('button', { text: 'Log In' });
    });

    then('The pods provider login page should be shown in the screen', async () => {
      // await expect(page).toMatch('Login', {timeout: 1000}); // TODO: Revisar funcionamiento
    });
  });

  afterAll(async ()=>{
    browser.close();
  })

});

