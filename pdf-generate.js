require('dotenv').config();
const puppeteer = require("puppeteer");

module.exports = async ({html,...rest})=>{
    const browser = await puppeteer.launch({
        headless: true,
        executablePath: process.env.CHROME_BIN,
        args: ["--no-sandbox", "--disabled-setupid-sandbox"],
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