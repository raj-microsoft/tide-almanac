import { chromium } from 'playwright';
const browser=await chromium.launch({executablePath:'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe',headless:true});
const page=await browser.newPage({viewport:{width:1440,height:1000}});page.on('pageerror',console.error);
await page.goto('http://127.0.0.1:5181/tide-almanac/');await page.locator('h1').waitFor();await page.evaluate(()=>document.fonts.ready);await page.waitForTimeout(600);await page.screenshot({path:'.impeccable/review/hero.png',fullPage:true});console.log(await page.title());await browser.close();
