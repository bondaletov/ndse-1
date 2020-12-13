const axios = require('axios').default;
const myAPIKey = process.env.myAPIKey;

const sendGetRequest = async (query) => {
    try {
        const resp = await axios.get(`http://api.weatherstack.com/current?access_key=${myAPIKey}&query=${query}`);
        return (getPayloadFromRes(resp.data));
    } catch (err) {
        console.error(err);
    }
};

const getPayloadFromRes = res => {
    try {
        return {
            country: res.location.country,
            name: (res.location || {name: 'unknown city'}).name,
            localtime: res.location.localtime,
            weather_descriptions: res.current.weather_descriptions,
            temperature: res.current.temperature,
        };;
    } catch (err) {
        console.error(err);
    }
}

module.exports.sendGetRequest = sendGetRequest;