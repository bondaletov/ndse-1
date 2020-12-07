const RIDDLE_HEAD = 1;
const RIDDLE_TAILS = 2;

const q = [{
        type: 'text',
        name: 'nickname',
        message: 'Input player name?',
        initial: 'anonymous'
    },
    {
        type: 'select',
        name: 'value',
        message: 'Flip a coin',
        choices: [
            { title: 'Head', value: RIDDLE_HEAD },
            { title: 'Tail', value: RIDDLE_TAILS },
        ],
    },
    {
        type: 'text',
        name: 'file',
        message: 'Set file name',
        initial: 'logs'
    }
];

// module.exports.questions = q;
module.exports = {
    questions: q,
    RIDDLE_HEAD,
    RIDDLE_TAILS
};