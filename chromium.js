const chrome = require('chrome-aws-lambda');
const puppeteer = require('puppeteer-core');

async function unshortUrl(url) {
    const browser = await puppeteer.launch({
        args: chrome.args,
        executablePath: await chrome.executablePath,
        headless: chrome.headless,
    });

    const page = await browser.newPage();
	await page.goto(url, { waitUntil: 'networkidle0' });
    return page.url();
}

module.exports = { unshortUrl };