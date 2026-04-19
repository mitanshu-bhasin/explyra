const puppeteer = require('puppeteer');

(async () => {
    const browser = await puppeteer.launch({ headless: "new" });
    const page = await browser.newPage();
    
    page.on('console', msg => console.log('PAGE LOG:', msg.text()));
    page.on('pageerror', err => console.log('PAGE ERROR:', err.message));

    await page.goto('http://localhost:8080/login.html');
    
    // wait for load
    await page.waitForSelector('#login-identifier');
    
    // type email
    await page.type('#login-identifier', 'test@explyra.com');
    
    // click next
    await page.click('#identifierBtn');
    
    // wait a bit
    await new Promise(r => setTimeout(r, 2000));
    
    // check what's visible
    const stepsHtml = await page.evaluate(() => {
        return document.querySelector('#auth-steps').innerHTML;
    });
    console.log("Steps HTML:", stepsHtml);
    
    await browser.close();
})();
