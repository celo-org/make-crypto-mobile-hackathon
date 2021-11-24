const db = require("../models");
const Nft = db.nfts;

// Create and Save a new Tutorial
exports.create = (req, res) => {
    var { cover,
        thumbnail,
        name,
        description,
        urlCover,
        urlThumnail,
        tags,
        ownerId,
        info
    } = req.body;
    // Validate request
    if (!req.body.name) {
        res.status(400).send({ message: "Content can not be empty!" });
        return;
    }

    // Create a Tutorial
    const nft = new Nft({
        name,
        description,
        tags,
        url,
        collectionId,
        number,
        batch,
        ownerId,
        creatorId
    });

    // Save Tutorial in the database
    nft
        .save(nft)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the Tutorial."
            });
        });
};

// Retrieve all Tutorials from the database.
exports.findAll = (req, res) => {
    var query = require('mongo-queryfilter').filter(req.query);
    return Nft
        .find(query)
        .then(data => {
            res.send(data)
        })
};

// Find a single Tutorial with an id
exports.findOne = (req, res) => {

};

// Update a Tutorial by the id in the request
exports.update = (req, res) => {

};

// Delete a Tutorial with the specified id in the request
exports.delete = (req, res) => {

};

// Delete all Tutorials from the database.
exports.deleteAll = (req, res) => {

};

// Find all published Tutorials
exports.findAllPublished = (req, res) => {

};