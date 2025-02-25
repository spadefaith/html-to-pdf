require('dotenv').config();
const puppeteer = require("puppeteer");

module.exports = async ({html,...rest})=>{
    const browser = await puppeteer.launch({
        headless: true,
        executablePath: process.env.CHROME_BIN,
        args: [
            '--no-sandbox',
            '--disable-setuid-sandbox',
            '--disable-gpu',
            '--disable-software-rasterizer',
            '--remote-debugging-port=9223'  // Change the port number here
        ],
    });
    const page = await browser.newPage();
    await page.setContent(html);
    const pdf = await page.pdf({ 
        format: "A4",
        printBackground: true,
        ...(rest || {})
    });
    await page.close();

    return pdf;
}