require('dotenv').config();
const puppeteer = require("puppeteer");

let browser;

module.exports = async (html)=>{
    if(!browser){
        browser = await puppeteer.launch({
            headless: true,
            executablePath: process.env.CHROME_BIN,
            args: ["--no-sandbox", "--disabled-setupid-sandbox"],
        });
    }
    const page = await browser.newPage();
    await page.setContent(html);
    const pdf = await page.pdf({ format: "A4" });
    await page.close();


    console.log(16,html);

    return pdf;
}