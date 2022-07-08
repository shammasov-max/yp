"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const download = require("download");
exports.default = async (url, directory, filename) => {
    await download(url, directory, { filename });
};
