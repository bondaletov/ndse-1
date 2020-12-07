const { bold, white } = require('kleur');

const isWon = (player) => console.log(white().bgCyan().italic(
    `Winner winner chicken dinner! Victory!\nPraise ${player}!`
));

const isLost = (player) => console.log(bold().yellow().bgRed().italic(`Player ${player} lost! Try again :-)`))

module.exports.showFinalMsg = (isWonPlayer, player) => isWonPlayer ? isWon(player) : isLost(player);