import {Command, Flags,} from '@oclif/core/lib/'
import {} from '@oclif/plugin-plugins'
import grabImagesUrls from '../scrape/scrapeThePostersDB';
import downloadFile from '../download/downloadFile';
import { times } from 'lodash';
import CliUx from 'cli-ux/lib'
import * as R from 'ramda'

export default class Scrape extends Command {
  static description = 'Скачать файлы на печать из списка xls файла'

  static examples = [
    '$ yp scrape https://theposterdb.com/posters/486 ./9999 Iron-Man'
  ]

  static args = [
    {name: 'url',  description: 'Адрес страницы на сайта https://theposterdb.com/', default:undefined},
    {name: 'output', description: 'Папка для размеения скаченных файлов', default: './'},
    {name: 'login', default: 'shammasov'},
    {name:'password', default:'Nq_mUmBrC8a@k4X'}
  ]

  private output: string
  private images: string[]
  public async run(): Promise<void> {
    const {args, flags} = await this.parse(Scrape)

    let {url, output, login, password} = args
    url = url || await CliUx.prompt('Введите адрес страницы с сайта thepostersdb.com для скрейпинга файлов')
    this.output = output
    this.images = (await grabImagesUrls(url, login, password)).filter(i => i!==undefined)

    const chunks = R.splitEvery(Math.ceil(this.images.length/10), this.images)
    const result = await Promise.all(chunks.map(c=> this.runWorker(c)))
    console.log('Job is completed, your files are here '+process.cwd())
    this.exit(0)
  }
  private index = 0

  public runWorker = async (list: string[]) => {
    while(list.length) {
    const src = list.pop()
    const ext = '.jpg'
    const current = this.index++

    await downloadFile(src, this.output, `${String(current).padStart(3,'0')}${ext}`)

    console.log(`File ${current} of ${this.images.length-1} completed`)

  }
  }


}



