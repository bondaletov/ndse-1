#!/usr/bin/env node

const { yargsOptions } = require('./assets/yargsOptions');
const { getStatFromFileByPath, analizeGameResults, handleLogs } = require('./core/logger');
const { showStats } = require('./core/showFinalMsg');

const getGamesAnalytic = async (argv) => {
    const fileName = argv.f;
    const data = await getStatFromFileByPath(fileName)
    const filledDataSet = analizeGameResults(data);
    const stats = handleLogs(filledDataSet);
    showStats(stats);
}

const argv = require("yargs")(process.argv.slice(2))
    .usage("Usage: stats <command> [args]")
    .command(
        ['$0'],
        "Получить статистику из лог файла",
        {},
        (argv) => getGamesAnalytic(argv)
    )
    .options(yargsOptions)
    .argv;