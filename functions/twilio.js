const twilio = require('twilio');

const { accountSid, authToken } = require('./twilio.json');

module.exports = new twilio.Twilio(accountSid, authToken);
