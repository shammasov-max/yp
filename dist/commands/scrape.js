"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const lib_1 = require("@oclif/core/lib/");
const scrapeThePostersDB_1 = require("../scrape/scrapeThePostersDB");
const downloadFile_1 = require("../download/downloadFile");
const lodash_1 = require("lodash");
const lib_2 = require("cli-ux/lib");
class Scrape extends lib_1.Command {
    constructor() {
        super(...arguments);
        this.index = 0;
        this.runWorker = async (id) => {
            const current = this.index;
            this.index++;
            if (current >= this.images.length)
                return;
            const src = this.images[current];
            const ext = '.jpg';
            console.log('Start loading file ' + current);
            await (0, downloadFile_1.default)(src, this.output, `${String(current).padStart(3, '0')}.${ext}`);
            console.log(`File ${current} of ${this.images.length} completed`);
            if (this.index < this.images.length) {
                await this.runWorker(id);
            }
        };
    }
    async run() {
        const { args, flags } = await this.parse(Scrape);
        let { url, output, login, password } = args;
        url = url || await lib_2.default.prompt('Введите адрес страницы с сайта thepostersdb.com для скрейпинга файлов');
        this.output = output;
        this.images = (await (0, scrapeThePostersDB_1.default)(url, login, password)).filter(i => i !== undefined);
        const result = await Promise.all((0, lodash_1.times)(4, this.runWorker));
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
