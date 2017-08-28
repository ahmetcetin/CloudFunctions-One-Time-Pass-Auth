const functions = require('firebase-functions');
const admin = require('firebase-admin');

const createUser = require('./createUser');
const requestOneTimePass = require('./requestOneTimePass');
const verifyOneTimePass = require('./verifyOneTimePass');

const serviceAccount = require('./serviceAccount.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://one-time-password-75163.firebaseio.com"
});

exports.createUser = functions.https.onRequest(createUser);
exports.requestOneTimePass = functions.https.onRequest(requestOneTimePass);
exports.verifyOneTimePass = functions.https.onRequest(verifyOneTimePass);
