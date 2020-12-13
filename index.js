const prompts = require('prompts');
const publicIp = require('public-ip');

const { getLocationByIp } = require('./core/getLocationByIp');
const { getOutputMsg } = require('./core/getOutputMsg');

(async() => {
    const ip = await publicIp.v4();
    const location = getLocationByIp(ip);
    const {loc} = await prompts([{
        type: 'text',
        name: 'loc',
        message: 'Input city?',
        initial: location
    },]);
    const msg = await getOutputMsg(loc);

    console.log(msg);
})();