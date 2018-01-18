var GoogleRequestHandler = require('./GoogleRequestHandler');
var AlexaRequestHandler = require('./AlexaRequestHandler');

module.exports = {
    "FromGoogle": GoogleRequestHandler,
    "FromAlexa": AlexaRequestHandler
}