let fs = require('fs');
let { promisify } = require('util');
let readdir = promisify(fs.readdir);

async function getFiles(dir, results) {
    if (!dir) {
        throw new Error('Не передан путь!');
    }
    if (!results) {
        results = {files: [], dirs: []}
    }
    const subDirs = await readdir(dir);
    return Promise.all(subDirs.map(async (file) => {
        let absolute = dir + '/' + file;
        let relative = absolute.replace(__dirname + '/', '');
        if (fs.statSync(absolute).isDirectory()) {
            results.dirs.push(relative);
            await getFiles(absolute, results);
        } else {
            results.files.push(relative);
        }
        return results;
    }));
}

module.exports = { getFiles };