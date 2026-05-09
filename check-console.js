const puppeteer = require('puppeteer');

(async () => {
  try {
    const browser = await puppeteer.launch({ headless: 'new', args: ['--no-sandbox', '--disable-setuid-sandbox'] });
    const page = await browser.newPage();

    page.on('console', msg => console.log('BROWSER CONSOLE:', msg.type(), msg.text()));
    page.on('pageerror', error => console.error('BROWSER ERROR:', error.message));
    page.on('requestfailed', request => console.error('REQUEST FAILED:', request.url(), request.failure() ? request.failure().errorText : ''));

    console.log('Navigating to http://localhost:3001/dashboard/agents/executive-assistant');
    await page.goto('http://localhost:3001/dashboard/agents/executive-assistant', { waitUntil: 'networkidle2' });

    console.log('Page loaded. Waiting 2 seconds...');
    await new Promise(resolve => setTimeout(resolve, 2000));

    await browser.close();
  } catch (err) {
    console.error('Puppeteer Error:', err);
  }
})();
