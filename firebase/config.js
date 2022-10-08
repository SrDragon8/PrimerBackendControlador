var firebase = require("firebase-admin");

var serviceAccount = require("../kei.json");

modules.exports = firebase.initializeApp({
  credential: firebase.credential.cert(serviceAccount)
});

