const { config } = require("../config/config");
const { initializeApp, applicationDefault } = require("firebase-admin/app");
const { getFirestore } = require("firebase-admin/firestore");
const { getStorage } = require("firebase-admin/storage");
const credentials = config.google_credentials;

initializeApp({
  credential: applicationDefault(),
});

const firestore = getFirestore();
const storage = getStorage();

module.exports = {
  firestore,
  storage,
};
