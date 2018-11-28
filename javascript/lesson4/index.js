const fs = require('fs');
const path = require('path');
const mock = require('mock-fs');

mock({
    'test': {
        'foo': {
            'bar': {
                'baz': {},
                'bar1.txt': 'test',
                'bar2.txt': 'test',
            },
            'f1.txt': 'test',
            'f2.txt': 'test',
    }},
});


const fileHelper =  require('./filesHelper');

if (process.argv.length <= 2) {
    throw new Error("Usage: " + __filename);
}
// Get cli argument
let dirPath = process.argv[2];

//Check param
absolutePath = getAbsolutePath(dirPath);
if (absolutePath) {
    dirPath = absolutePath;
}
if (!fs.existsSync(dirPath)) {
    throw new Error(`Error: Directory ${dirPath} not exist.`);
}
if (!fs.statSync(dirPath).isDirectory()) {
    throw new Error(`Error: ${dirPath} is not directory.`);
}

function getAbsolutePath(dirPath) {
    if (!path.isAbsolute(dirPath)) {
        return __dirname + '/' + dirPath;
    }
}

fileHelper.getFiles(dirPath).then(result => {
    console.log("Result:", result[0]);
});

mock.restore();
