const { credential } = require("firebase-admin");
const { initializeApp } = require("firebase-admin/app");
const { getStorage } = require("firebase-admin/storage");
const { getAuth } = require("firebase-admin/auth");

const firebaseAdmin = initializeApp({
	credential: credential.cert(require("@/firebase-key.json")),
});

const firebaseStorage = getStorage(firebaseAdmin);
const firebaseAuth = getAuth(firebaseAdmin);

module.exports = { firebaseStorage, firebaseAuth };
