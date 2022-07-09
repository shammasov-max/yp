import * as puppeteer from 'puppeteer'
import {range, times} from 'ramda'
const website = 'https://theposterdb.com'

const grabImagesUrls = async (url:string, login:string, password:string) => {

  const browser = await puppeteer.launch({headless: true});
  const page = await browser.newPage();
  await page.setViewport({width: 1200, height: 720});
  await page.goto('https://theposterdb.com/login', { waitUntil: 'networkidle0' }); // wait until page load
  await page.type('#login', login);
  await page.type('#password', password);
  // click and wait for navigation
  await Promise.all([
    page.click('body > main > div.container > div > div > div > div.card-body > form > div.form-group.mb-0.d-flex.flex-row.justify-content-between.flex-wrap > button'),
    page.waitForNavigation({ waitUntil: 'networkidle0' }),
  ]);

  let allPics: string[] = []
  const pagesInParallel = 1
  const pages = [
    page,

  ]
  while(pages.length < pagesInParallel) {


    pages.push(await browser.newPage())
  }
  // Go to https://theposterdb.com/posters/486
  const loadSubPage = async (index: number) => {
    const page = pages[index % pagesInParallel]
    await page.goto(`${url}?page=${index}`, {waitUntil:'networkidle0'})
    const hrefs = await page.$$eval('a', as => as.map(a => a.href))
    //https://theposterdb.com/api/assets/5913/download?performed_by=shammasov
    const pics = hrefs.filter(h => h.endsWith('download?performed_by=shammasov'))
    console.log('Check page ' + index)
    return pics
  }

  const loadPagesParallel = async (start: number, end: number) => {
    return (await Promise.all(range(start,end,).map(loadSubPage))).flat().filter(i => i !== undefined)
  }
  let i = 1

  let pics = await loadPagesParallel(i, i+pagesInParallel)
  while (pics.length > 0) {
    allPics = [...allPics, ...pics]
    console.log('Found ' + allPics.length + ' in total')
    if(pics.length === 24 * pagesInParallel) {
      i += pagesInParallel
      pics = await loadPagesParallel(i, i + pagesInParallel)
    } else{
      break
    }
  }

  console.log(` Totally ${(i - 1)} pages with ${allPics.length} images `)
  return allPics
}

export default grabImagesUrls
