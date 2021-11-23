const auth = require("../../middleware/auth");

module.exports = app => {
    const collections = require("../controllers/collection.controller.js");

    var router = require("express").Router();

    // Create a new collection
    router.post("/", auth, collections.create);

    // Retrieve all collections
    router.get("/", auth, collections.findAll);

    // Retrieve a single collection with id
    router.get("/:id", collections.findOne);

    // Update a collection with id
    router.put("/:id", collections.update);

    // Delete a collection with id
    router.delete("/:id", collections.delete);

    // Create a new collection
    router.delete("/", collections.deleteAll);

    app.use('/api/collections', router);
};