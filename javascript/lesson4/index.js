const fs = require('fs');
const path = require('path');

const fileHelper =  require('./filesHelper');

if (process.argv.length <= 2) {
    console.error("Usage: " + __filename);
    process.exit(-1);
}
// Get cli argument
let dirPath = process.argv[2];

//Check param
absolutePath = getAbsolutePath(dirPath);
if (absolutePath) {
    dirPath = absolutePath;
}
if (!fs.existsSync(dirPath)) {
    console.error(`Error: Directory ${dirPath} not exist.`);
    process.exit(-1);
}
if (!fs.statSync(dirPath).isDirectory()) {
    console.error(`Error: ${dirPath} is not directory.`);
    process.exit(-1);
}

function getAbsolutePath(dirPath) {
    if (!path.isAbsolute(dirPath)) {
        return __dirname + '/' + dirPath;
    }
}

fileHelper.getFiles(dirPath).then(result => {
    console.log("Result:", result);
});

