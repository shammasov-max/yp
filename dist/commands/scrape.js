"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const lib_1 = require("@oclif/core/lib/");
const scrapeThePostersDB_1 = require("../scrape/scrapeThePostersDB");
const downloadFile_1 = require("../download/downloadFile");
const lib_2 = require("cli-ux/lib");
const R = require("ramda");
class Scrape extends lib_1.Command {
    constructor() {
        super(...arguments);
        this.index = 0;
        this.runWorker = async (list) => {
            while (list.length) {
                const src = list.pop();
                const ext = '.jpg';
                const current = this.index++;
                await (0, downloadFile_1.default)(src, this.output, `${String(current).padStart(3, '0')}${ext}`);
                console.log(`File ${current} of ${this.images.length - 1} completed`);
            }
        };
    }
    async run() {
        const { args, flags } = await this.parse(Scrape);
        let { url, output, login, password } = args;
        url = url || await lib_2.default.prompt('Введите адрес страницы с сайта thepostersdb.com для скрейпинга файлов');
        this.output = output;
        this.images = (await (0, scrapeThePostersDB_1.default)(url, login, password)).filter(i => i !== undefined);
        const chunks = R.splitEvery(Math.ceil(this.images.length / 10), this.images);
        const result = await Promise.all(chunks.map(c => this.runWorker(c)));
        console.log('Job is completed, your files are here ' + process.cwd());
        this.exit(0);
    }
}
exports.default = Scrape;
Scrape.description = 'Скачать файлы на печать из списка xls файла';
Scrape.examples = [
    '$ yp scrape https://theposterdb.com/posters/486 ./9999 Iron-Man'
];
Scrape.args = [
    { name: 'url', description: 'Адрес страницы на сайта https://theposterdb.com/', default: undefined },
    { name: 'output', description: 'Папка для размеения скаченных файлов', default: './' },
    { name: 'login', default: 'shammasov' },
    { name: 'password', default: 'Nq_mUmBrC8a@k4X' }
];
