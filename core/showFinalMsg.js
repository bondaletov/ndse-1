const { bold, white } = require('kleur');

const isWon = (player) => console.log(white().bgCyan().italic(
    `Winner winner chicken dinner! Victory!\nPraise ${player}!`
));

const isLost = (player) => console.log(bold().yellow().bgRed().italic(`Player ${player} lost! Try again :-)`))

const showStats = stats => {
    console.log(bold().bgBlack().white(`============WINNERS============`));
    console.table(stats);
    // stats.forEach((s, index) => {
    //     const line = `${index}  |  ${s.nickname}  |   ${s.ratio}`
    //     console.log(line);
    // });
    console.log(bold().bgBlack().white(`===============================`));
}

module.exports.showFinalMsg = (isWonPlayer, player) => isWonPlayer ? isWon(player) : isLost(player);
module.exports.showStats = showStats;