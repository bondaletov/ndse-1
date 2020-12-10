#!/usr/bin/env node

const prompts = require('prompts');
const { writeLog } = require('./core/logger');
const { getRandomInt } = require('./core/getRandomInt');
const { questions, RIDDLE_TAILS, RIDDLE_HEAD } = require('./assets/questions');
const { yargsOptions } = require('./assets/yargsOptions');
const { isPlayerWon } = require('./core/isPlayerWon');
const { showFinalMsg } = require('./core/showFinalMsg');

prompts.override(require('yargs')(process.argv.slice(2)).options(yargsOptions).argv);

(async() => {
    const riddle = getRandomInt(RIDDLE_HEAD, RIDDLE_TAILS);

    const { nickname, value, file } = await prompts(questions);
    const isWon = isPlayerWon(riddle, value);

    showFinalMsg(isWon, nickname)
    await writeLog(nickname, isWon, file);
})();