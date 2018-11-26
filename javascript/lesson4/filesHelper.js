let fs = require('fs');

function getFiles(dir, results) {
    return new Promise((resolve, reject) => {
        if (!dir) {
            reject('Не передан путь!');
        }
        if (!results) {
            results = { files: [], dirs: [] }
        }
        fs.readdirSync(dir).forEach(file => {
            let absolute = dir + '/' + file;
            let relative = absolute.replace(__dirname + '/', '');
            if (fs.statSync(absolute).isDirectory()) {
                results.dirs.push(relative);
                getFiles(absolute, results);
            } else {
                results.files.push(relative);
            }
        });
        resolve(results);
    });
}

module.exports = { getFiles };