import { chromium } from 'playwright';
import assert from 'node:assert/strict';
import fs from 'node:fs';
const url=process.argv[2]||'http://127.0.0.1:5181/tide-almanac/';
const browser=await chromium.launch({executablePath:'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe',headless:true});
const results=[];
for(const width of [390,1440]){
 const page=await browser.newPage({viewport:{width,height:1000}}); const errors=[];page.on('pageerror',e=>errors.push(e.message));
 await page.goto(url);await page.locator('video').waitFor();await page.waitForFunction(()=>document.querySelector('video').readyState>=2);
 const video=await page.locator('video').evaluate(v=>({src:v.currentSrc,muted:v.muted,loop:v.loop,width:v.videoWidth}));assert.equal(video.muted,true);assert.equal(video.loop,true);
 await page.getByRole('button',{name:'Pause sea motion'}).click();assert.equal(await page.locator('video').evaluate(v=>v.paused),true);
 await page.getByRole('button',{name:'Play sea motion'}).click();
 for(const value of ['0','1','2']){await page.selectOption('#station',value);await page.locator('.station-portrait img').scrollIntoViewIfNeeded();await page.waitForFunction(()=>document.querySelector('.station-portrait img').complete);assert.ok(await page.locator('.station-portrait img').evaluate(i=>i.naturalWidth>0));}
 await page.selectOption('#station','0'); await page.locator('#memory').scrollIntoViewIfNeeded();await page.waitForFunction(()=>document.querySelector('.memory-photo img').complete);assert.match(await page.locator('.memory-photo figcaption').innerText(),/Not a historical photograph/);
 await page.evaluate(()=>scrollTo(0,0));await page.screenshot({path:`.impeccable/review/photo-${width}.png`,fullPage:true});
 assert.deepEqual(errors,[]);results.push({width,video,errors});
 await page.emulateMedia({reducedMotion:'reduce'});await page.waitForTimeout(100);assert.equal(await page.locator('video').count(),0);await page.close();
}
const page=await browser.newPage();await page.goto(url);const links=await page.locator('a[href^="https://"]').evaluateAll(es=>[...new Set(es.map(e=>e.href))]);
for(const link of links){try{const response=await page.request.get(link,{timeout:30000});results.push({link,status:response.status()});}catch(e){results.push({link,error:e.message.slice(0,200)});}}
await browser.close();fs.writeFileSync('.impeccable/review/photo-verification.json',JSON.stringify({url,results},null,2));console.log(JSON.stringify(results,null,2));
