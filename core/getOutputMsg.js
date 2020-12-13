const { sendGetRequest } = require('./getWeather');

const getOutputMsg = async query => {
    const payload = await sendGetRequest(query);
    const line = '=============================\n';
    return line
        + `Is ${payload.temperature} and ${payload.weather_descriptions.join(', ')} in ${payload.country}, ${payload.name}.\nLocal time: ${payload.localtime}\n`
        + line;
}

module.exports.getOutputMsg = getOutputMsg;