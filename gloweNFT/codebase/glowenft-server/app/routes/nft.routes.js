const auth = require("../../middleware/auth");
const ipfsAPI = require('ipfs-api');

//Connceting to the ipfs network via infura gateway
const ipfs = ipfsAPI('ipfs.infura.io', '5001', { protocol: 'https' })

module.exports = app => {
    const nfts = require("../controllers/nft.controller.js");

    var router = require("express").Router();

    //Getting the uploaded file via hash code.
    router.get('/getfile', auth, function (req, res) {
        //This hash is returned hash of addFile router.
        const validCID = req.query.cid;

        ipfs.files.get(validCID, function (err, files) {
            files.forEach((file) => {
                console.log(file)
                res.send(file)
                // console.log(file.content.toString('utf8'))
            })
        })

    })

    // Create a new nft
    router.post("/", auth, nfts.create);

    // Retrieve all nfts
    router.get("/", nfts.findAll);

    // Retrieve all published nfts
    router.get("/published", auth, nfts.findAllPublished);

    // Retrieve a single nft with id
    router.get("/:id", auth, nfts.findOne);

    // Update a nft with id
    router.put("/:id", auth, nfts.update);

    // Delete a nft with id
    router.delete("/:id", auth, nfts.delete);

    // Create a new nft
    router.delete("/", auth, nfts.deleteAll);

    //Addfile router for adding file a local file to the IPFS network without any local node
    router.post('/uploadtoipfs', auth, function (req, res) {

        ipfs.files.add(req.files.file.data, function (err, file) {
            if (err) {

            }

            res.send(file)
        })

    })


    app.use('/api/nfts', router);
};