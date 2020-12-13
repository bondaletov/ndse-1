const geoip = require('geoip-lite');

const getLocationByIp = ip => {
    const response = geoip.lookup(ip);
    return response.city ? response.city : response.ll.join(',');
};

module.exports.getLocationByIp = getLocationByIp;