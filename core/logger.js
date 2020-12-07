const fs = require('fs');
const path = require('path');

const isFileExist = path => {
    return new Promise((resolve, reject) => {
        fs.access(path, fs.constants.F_OK, err => err ? reject(false) : resolve(true));
    }).catch(err => err);
};

const getDataStr = (isFileExist, nickname, isWon) => {
    return isFileExist ?
        `${nickname},${isWon}\n` :
        `nickname,isWon\n${nickname},${isWon}\n`;
}

const writeToFile = (isFileExist, filePath, data) => {
    const options = {
        flags: isFileExist ? 'a' : 'w',
        encoding: 'utf8'
    };
    const writerStream = fs.createWriteStream(filePath, options);

    writerStream.write(data);
    writerStream.end();
    writerStream.on('error', err => {
        console.log(err.stack)
    });
}

module.exports.writeLog = async(nickname, isWon, fileName) => {
    const filePath = path.join(__dirname, '..', 'data', `${fileName}.csv`);

    const isExist = await isFileExist(filePath);
    const data = getDataStr(isExist, nickname, isWon);

    writeToFile(isExist, filePath, data);
}