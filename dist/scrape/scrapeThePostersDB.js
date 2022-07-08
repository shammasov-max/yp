"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const playwright_1 = require("playwright");
const ramda_1 = require("ramda");
const website = 'https://theposterdb.com';
const grabImagesUrls = async (url, login, password) => {
    const browser = await playwright_1.chromium.launch({ headless: true });
    const context = await browser.newContext();
    const page = await context.newPage();
    // Navigate explicitly, similar to entering a URL in the browser.
    await page.goto(website);
    // Click text=Sign In
    await page.locator('text=Sign In').click();
    // Click [placeholder="Email Address \/ Username"]
    await page.locator('[placeholder="Email Address \\/ Username"]').click();
    // Fill [placeholder="Email Address \/ Username"]
    await page.locator('[placeholder="Email Address \\/ Username"]').fill(login);
    // Press Tab
    await page.locator('[placeholder="Email Address \\/ Username"]').press('Tab');
    // Fill [placeholder="Password"]
    await page.locator('[placeholder="Password"]').fill(password);
    // Click button:has-text("Sign In")
    await page.locator('button:has-text("Sign In")').click();
    let allPics = [];
    const pagesInParallel = 3;
    const pages = [
        page,
    ];
    while (pages.length < pagesInParallel) {
        pages.push(await context.newPage());
    }
    // Go to https://theposterdb.com/posters/486
    const loadSubPage = async (index) => {
        const page = pages[index % pagesInParallel];
        await page.goto(`${url}?page=${index}`);
        const elements = await page.$$('[title="Download Poster"]');
        const pics = await Promise.all(elements.map(a => a.getAttribute('href')));
        console.log('Check page ' + index);
        return pics;
    };
    const loadPagesParallel = async (start, end) => {
        return (await Promise.all((0, ramda_1.range)(start, end).map(loadSubPage))).flat().filter(i => i !== undefined);
    };
    let i = 1;
    let pics = await loadPagesParallel(i, i + pagesInParallel);
    while (pics.length > 0) {
        allPics = [...allPics, ...pics];
        console.log('Found ' + allPics.length + ' in total');
        if (pics.length === 24 * pagesInParallel) {
            i += pagesInParallel;
            pics = await loadPagesParallel(i, i + pagesInParallel);
        }
        else {
            break;
        }
    }
    console.log(` Totally ${(i - 1)} pages with ${allPics.length} images `);
    return allPics;
};
exports.default = grabImagesUrls;
