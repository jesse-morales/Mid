const puppeteer = require('puppeteer')
const fs = require('fs/promises')

async function start(website) {
    const browser = await puppeteer.launch()
    const page = await browser.newPage()
    await page.goto(website)
    //await page.screenshot({path: "cnn.png", fullPage:true})
    text()
    photo()

    await browser.close()
}

async function text() {

    const headline = await page.evaluate(() => {
        return Array.from(document.querySelectorAll("#homepage1-zone-1 > div.l-container > div > div.column.zn__column--idx-0 > ul > li:nth-child(1) > article > a > h2")).map(x => x.textContent)
    })
    await fs.writeFile("headline.txt", headline.join("\r\n"))

    await page.click("")
    const nexPage = await page.$eval("", el => el.textContent)

    const headlineBody = await page.evaluate(() => {
        return Array.from(document.querySelectorAll("")).map(x => x.textContent)
    })
    await fs.writeFile("headlineBody.txt", headline.join("\r\n"))

}

start()
