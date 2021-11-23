module.exports = app => {
    const users = require("../controllers/user.controller.js");

    var router = require("express").Router();

    // Register
    router.post("/register", users.register);

    // Login
    router.post("/login", users.login);

    // Retrieve all nfts
    router.get("/", users.findAll);

    app.use('/api/users', router);
};