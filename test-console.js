const puppeteer = require('puppeteer');
(async () => {
  try {
    const browser = await puppeteer.launch({ args: ['--no-sandbox'] });
    const page = await browser.newPage();
    page.on('console', msg => console.log('PAGE LOG:', msg.text()));
    page.on('pageerror', err => console.log('PAGE ERROR:', err.toString()));
    page.on('requestfailed', request => console.log('REQ FAILED:', request.url(), request.failure()?.errorText || request.response()?.status()));
    await page.goto('http://localhost:4200', { waitUntil: 'networkidle0' });
    const text = await page.$eval('#root', el => el.textContent);
    console.log('Root text:', text);
    await browser.close();
  } catch(e) {
    console.error(e);
  }
})();
