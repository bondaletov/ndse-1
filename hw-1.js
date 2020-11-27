#!/usr/bin/env node

function isEmptyObject(obj) {
    return !Object.keys(obj).length;
}

const FORMAT_DICT = {
    year : 'numeric',
    month : 'short',
    day :  '2-digit',
}

const makeDate = (argv) => {
    const commands = argv._;
    const isAdd = commands.includes('add');
    const isSub = commands.includes('sub');
    let date = new Date();
    if (!isAdd && !isSub) {
        return {madeDate: date};
    }

    const candidateArgs = ['m', 'd', 'y'].reduce((acc, el) => {
        return argv[el] && typeof argv[el] === 'number'
            ? Object.assign(acc, {[el]: isAdd ? argv[el] : argv[el] * -1})
            : acc;
    }, {});
    if (isEmptyObject(candidateArgs)) {
        throw new Error('At Least one argument required');
    }
    if (candidateArgs.hasOwnProperty('m')) {
        const newMonth = date.getMonth() + candidateArgs['m'];
        date = new Date(date.setMonth(newMonth));
    }
    if (candidateArgs.hasOwnProperty('d')) {
        const newDay = date.getTime() + 86400000 * candidateArgs['d'];
        date = new Date(newDay);
    }
    if (candidateArgs.hasOwnProperty('y')) {
        const currentYear = date.getFullYear();
        date = new Date(date.setFullYear(currentYear + candidateArgs['y']));
    }
    return {madeDate: date, isAdd, isSub};
}


function outpuDate(argv, tipWord) {
    console.log('\n-------------------');
    console.log('\x1b[36m%s\x1b[0m', tipWord);
    const formatConfig = {};
    for (const f in FORMAT_DICT) {
        if (argv[f]) {
            Object.assign(formatConfig, {[f]: FORMAT_DICT[f]});
        }
    }
    const result = isEmptyObject(formatConfig) || argv.isAdd || argv.isSub
        ? argv.madeDate.toISOString()
        : new Intl.DateTimeFormat('ru', formatConfig).format(argv.madeDate);
    console.log(result);
    console.log('-------------------\n');
}



const argv = require("yargs")(process.argv.slice(2))
    .usage("Usage: cmd <command> [args]")
    .command(
        ['current', '$0'],
        "Текущая дата и время в формате ISO",
        {},
        (argv) => outpuDate(argv, 'Текущая дата в формате ISO:')
    )
    .command(
        ['add'],
        "Получение даты в будущем в формате ISO",
        {},
        (argv) => outpuDate(argv, 'Дата и время в формате ISO вперед:')
    )
    .command(
        "sub",
        "Получение даты в прошлом в формате ISO",
        {},
        (argv) => outpuDate(argv, 'Дата и время в формате ISO назад:')
    )
    .options({
        help: { type: "boolean", alias: "h", describe: "показать помощь" },
        version: { type: "boolean", alias: "v", describe: "показать версию" },
        month: { type: "number | boolean", alias: "m", describe: "текущий месяц" },
        year: { type: "boolean | boolean", alias: "y", describe: "текущий год" },
        date: { type: "number | boolean", alias: ["d", "day"], describe: "текущий день" },
    })
    .middleware([makeDate]).argv;
