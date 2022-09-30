const puppeteer = require('puppeteer')
const fs = require('fs/promises')

async function start() {
    const browser = await puppeteer.launch()
    const page = await browser.newPage()
    await page.goto("https://www.cnn.com/")
    //await page.screenshot({path: "cnn.png", fullPage:true})

    const headline = await page.evaluate(() => {
        return Array.from(document.querySelectorAll("#homepage1-zone-1 > div.l-container > div > div.column.zn__column--idx-0 > ul > li:nth-child(1) > article > a > h2")).map(x => x.textContent)
    })
    await fs.writeFile("headline.txt", headline.join("\r\n"))

    const headlineBody = await page.evaluate(() => {
        return Array.from(document.querySelectorAll("")).map(x => x.textContent)
    })
    await fs.writeFile("headlineBody.txt", headline.join("\r\n"))

    const headlinePhoto = page.$$eval("", (imgs) => {
        return imgs.map(x => x.src)
    })

    await browser.close()
}

start()
