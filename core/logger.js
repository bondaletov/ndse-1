const fs = require('fs');
const path = require('path');

const WONS = 'wons';
const LOSTS = 'losts';

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

const getStatFromFileByPath = async (fileName) => {
    return new Promise(async (resolve, reject) => {
        const filePath = getFilePath(fileName);
        const isExist = await isFileExist(filePath);
        if (!isExist) {
            throw new Error(`File ${fileName}.csv doesn't exist. Try another file.`);
        }

        let chunks = '';
        let readStream = fs.createReadStream(filePath, 'utf8');
        readStream.on("data", function (chunk) {
            chunks += chunk;
        });

        readStream.on('error', function (err) {
            reject(err);
        });

        readStream.on("end", () => {
            resolve(chunks);
        })
    });
}

const getFilePath = fileName => path.join(__dirname, '..', 'data', `${fileName}.csv`);

function csvToJson(csvText) {
    const lines = csvText.split('\n');
    const result = [];
    const headers = lines[0].split(',');
    for (let i = 1; i < lines.length; i++) {
        if (!lines[i]) {
            break;
        }
        const obj = {};
        const currentline = lines[i].split(',');
        for (let j = 0; j < headers.length; j++) {
            obj[headers[j]] = currentline[j];
        }
        result.push(obj);
    }
    return result;
}

const analizeGameResults = data => {
    const dataSet = csvToJson(data);
    return dataSet.reduce((res, game) => {
        if (!res[game.nickname]) {
            const userCard = {
                [game.nickname] : {
                    [WONS]: 0,
                    [LOSTS]: 0,
                }
            }
            Object.assign(res, userCard);
        }
        const playerStat = res[game.nickname];
        const prop = game.isWon == 'true' ? WONS : LOSTS;
        playerStat[prop] = playerStat[prop] + 1;

        return {
            ...res,
            [game.nickname] : playerStat
        };
    }, {});
}

const handleLogs = dataSet => {
    const stats = [];
    for (let player in dataSet) {
        const { wons, losts} = dataSet[player];
        const total = wons + losts;
        const ratio = wons / total * 100;
        const p = {
            nickname : player,
            ratio : parseInt(ratio),
            ...dataSet[player],
            total : total,
        };
        stats.push(p);
    }

    return stats.sort((a,b) => b.ratio - a.ratio);
}


module.exports.writeLog = async(nickname, isWon, fileName) => {
    const filePath = getFilePath(fileName);

    const isExist = await isFileExist(filePath);
    const data = getDataStr(isExist, nickname, isWon);

    writeToFile(isExist, filePath, data);
};

module.exports.getStatFromFileByPath = getStatFromFileByPath;
module.exports.analizeGameResults = analizeGameResults;
module.exports.handleLogs = handleLogs;