const puppeteer = require('puppeteer')
const fs = require('fs/promises')

async function start(website) {
    const browser = await puppeteer.launch()
    const page = await browser.newPage()
    await page.goto(website)
    //await page.screenshot({path: "cnn.png", fullPage:true})
    await headerText(page)
    await headerPhoto(page)
   // await bodyText(page)
    await browser.close()
}

async function headerText(page) {
    const headline = await page.evaluate(() => {
        return Array.from(document.querySelectorAll("#homepage1-zone-1 > div.l-container > div > div.column.zn__column--idx-0 > ul > li:nth-child(1) > article > a > h2")).map(x => x.textContent)
    })
    await fs.writeFile("headline.txt", headline.join("\r\n"))
}

async function headerPhoto(page) {
    await page.click("#homepage1-zone-1 > div.l-container > div > div.column.zn__column--idx-0 > ul > li:nth-child(1) > article > div > div.media > a")
    const photo = await page.evaluate(() => {
        return document.querySelectorAll("#homepage1-zone-1 > div.l-container > div > div.column.zn__column--idx-0 > ul > li:nth-child(1) > article > div > div.media > a > img").map(x => x.src)
    }) 
    await fs.writeFile("headerPhoto.png", photo)
}

async function bodyText(page) {
    const headlineBody = await page.evaluate(() => {
        return Array.from(document.querySelectorAll("body > div.layout__content-wrapper.layout-with-rail__content-wrapper > section.layout__wrapper.layout-with-rail__wrapper > section.layout__main-wrapper.layout-with-rail__main-wrapper > section.layout__main.layout-with-rail__main > article > section > main > div.article__content-container > div.article__content > p:nth-child(2)")).map(x => x.textContent)
    })
    await fs.writeFile("headlineBody.txt", headlineBody.join("\r\n"))
}

start("https://www.cnn.com")
