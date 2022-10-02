const puppeteer = require('puppeteer')
const fs = require('fs/promises')

async function start(website) {
    const browser = await puppeteer.launch()
    const page = await browser.newPage()
    await page.goto(website)
    //await page.screenshot({path: "cnn.png", fullPage:true})
    headerText()
    headerPhoto()
    bodyText()

    await browser.close()
}

async function headerText() {

    const headline = await page.evaluate(() => {
        return Array.from(document.querySelectorAll("#homepage1-zone-1 > div.l-container > div > div.column.zn__column--idx-0 > ul > li:nth-child(1) > article > a > h2")).map(x => x.textContent)
    })
    await fs.writeFile("headline.txt", headline.join("\r\n"))

}

async function headerPhoto() {
   const photo = await page.evaluate(() => {
        return document.querySelectorAll("").map(x => x.src)
    }) 
    await fs.writeFile("headerPhoto.png")
}

async function bodyText() {

    await page.click("")
    const nextPage = await page.$eval("", el => el.textContent)

    const headlineBody = await page.evaluate(() => {
        return Array.from(document.querySelectorAll("")).map(x => x.textContent)
    })
    await fs.writeFile("headlineBody.txt", headlineBody.join("\r\n"))
}

start("https://www.cnn.com")
