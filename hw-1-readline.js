const readline = require('readline');

const rl = readline.createInterface(process.stdin);

let countOfAttempts = 0;
let secret;
const start = () => {
    secret = Math.round(Math.random() * 100);
    console.log('Загадано число в диапазоне от 0 до 100');
};

rl.on('resume', () => {
    console.log('Readline resumed.');
});

rl.on('line', (line) => {
    countOfAttempts += 1;
    if (Number(line) === secret) {
        console.log('\x1b[36m%s\x1b[0m', `Отгадано число ${secret} с попытки ${countOfAttempts}\n\n`);
        start();
    } else {
        console.log(line > secret ? 'Больше' : 'Меньше');
    }
});

start();