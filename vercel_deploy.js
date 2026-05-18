const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch({
    executablePath: '/snap/chromium/current/usr/lib/chromium-browser/chromium-browser',
    userDataDir: '/home/ubuntu/chromium-cdp-profile',
    headless: true,
    args: ['--no-sandbox', '--disable-dev-shm-usage']
  });
  
  const page = await browser.newPage();
  
  console.log('Navigating to Vercel...');
  await page.goto('https://vercel.com/new', { waitUntil: 'networkidle' });
  
  // Check current state
  const content = await page.content();
  console.log('Page loaded, URL:', page.url());
  
  // Look for Continue with GitHub button
  const githubBtn = await page.locator('text=Continue with GitHub').first();
  if (await githubBtn.isVisible()) {
    console.log('Found GitHub button, clicking...');
    await githubBtn.click();
    await page.waitForTimeout(5000);
    console.log('After click, URL:', page.url());
  }
  
  // Check for GitHub OAuth redirect
  if (page.url().includes('github.com/login')) {
    console.log('On GitHub login page...');
  }
  
  await browser.close();
  console.log('Done');
})();
