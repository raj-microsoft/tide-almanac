import { chromium } from 'playwright';
import assert from 'node:assert/strict';
import fs from 'node:fs';
const url=process.argv[2]||'http://127.0.0.1:5181/tide-almanac/';
const browser=await chromium.launch({executablePath:'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe',headless:true});
const findings=[];
for(const width of [1440,390]){
 const page=await browser.newPage({viewport:{width,height:1000},reducedMotion:'reduce'});const errors=[];page.on('pageerror',e=>errors.push(e.message));
 const response=await page.goto(url);assert.equal(response.status(),200);await page.locator('h1').waitFor();await page.evaluate(()=>document.fonts.ready);await page.waitForTimeout(500);
 assert.equal(await page.locator('h1').innerText(),'Between land\nand a changing sea.');
 assert.ok(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth),'No horizontal overflow');
 const initial=await page.locator('.height').innerText();await page.selectOption('#station','1');await page.locator('#time').fill('15');await page.locator('#time').dispatchEvent('input');await page.waitForTimeout(380);assert.notEqual(await page.locator('.height').innerText(),initial);assert.match(await page.locator('.chart-caption').innerText(),/Whitby/);
 await page.getByRole('button',{name:'Show data table'}).click();assert.equal(await page.locator('tbody tr').count(),9);await page.getByRole('button',{name:'Hide data table'}).click();
 await page.getByRole('button',{name:'New moon',exact:true}).click();assert.equal(await page.locator('.phase-description h3').innerText(),'New moon');assert.equal(await page.getByRole('button',{name:'New moon',exact:true}).getAttribute('aria-pressed'),'true');
 await page.locator('#time').focus();await page.keyboard.press('ArrowRight');assert.equal(await page.locator('#time').inputValue(),'15.25');
 await page.selectOption('#station','0');await page.locator('#time').fill('9');await page.locator('#time').dispatchEvent('input');await page.getByRole('button',{name:'Full moon',exact:true}).click();await page.evaluate(()=>scrollTo(0,0));await page.waitForTimeout(400);
 await page.screenshot({path:`.impeccable/review/${width===1440?'desktop':'mobile'}.png`,fullPage:true});assert.deepEqual(errors,[]);findings.push({width,http:response.status(),overflow:false,stationAndTime:'pass',moon:'pass',table:'pass',keyboard:'pass',reducedMotion:'pass',errors});await page.close();
}
const page=await browser.newPage({viewport:{width:1440,height:1000},reducedMotion:'no-preference'});await page.goto(url);await page.locator('h1').waitFor();await page.waitForTimeout(450);await page.locator('#time').fill('3');await page.locator('#time').dispatchEvent('input');await page.waitForTimeout(380);const rotation=await page.locator('.dial g').last().getAttribute('style');findings.push({normalMotion:'tested',dialStyle:rotation});await browser.close();fs.writeFileSync('.impeccable/review/verification.json',JSON.stringify({url,findings},null,2));console.log(JSON.stringify(findings,null,2));
