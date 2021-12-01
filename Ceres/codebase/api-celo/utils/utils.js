const crypto = require('./crypto_data');

function checkHeader(request) {
    let arraySecret = crypto.descriptografarHeader(request.headers['lovekey']).data.split('_');
    return arraySecret[0] === arraySecret[2] && arraySecret[1] === process.env.JWT_HEADER_SECRET;
}

module.exports = {
    checkHeader
}