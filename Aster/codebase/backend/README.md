`firebase serve` to run serve locally
`firebase deploy` to deploy apis to server

need to add firebase configurations in /functions/util/config.js

const firebaseConfig = {
    apiKey: "",
    authDomain: "",
    projectId: "",
    storageBucket: "",
    messagingSenderId: "",
    appId: "",
    measurementId: ""
};

module.exports = { firebaseConfig };