const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

let countOfAttempts = 0;
const secret = Math.floor(Math.random() * (+10 + 1 - +0)) + +0;

rl.on('line', (line) => {
    countOfAttempts += 1;
    if (Number(line) === secret) {
        rl.close();
    } else {
        console.log(line > secret ? 'Больше' : 'Меньше');
    }
});

rl.on('close', () => {
    console.log('\x1b[36m%s\x1b[0m', `Отгадано число ${secret} с попытки ${countOfAttempts}`);
});