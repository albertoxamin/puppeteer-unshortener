const chrome = require('chrome-aws-lambda');
const puppeteer = require('puppeteer-core');

async function unshortUrl(url) {
    const browser = await puppeteer.launch({
        args: chrome.args,
        executablePath: await chrome.executablePath,
        headless: chrome.headless,
    });

	const page = await browser.newPage();
	await page.setRequestInterception(true);
	const userAgent = 'Mozilla/5.0 (X11; Linux x86_64)' + 'AppleWebKit/537.36 (KHTML, like Gecko) Chrome/64.0.3282.39 Safari/537.36';
	await page.setUserAgent(userAgent);
	page.on('request', (req) => {
		if (req.resourceType() == 'stylesheet' || req.resourceType() == 'font' || req.resourceType() == 'image') {
			req.abort()
		} else {
			req.continue()
		}
	});
	await page.goto(url, { waitUntil: 'networkidle0' });
    return page.url();
}

module.exports = { unshortUrl };