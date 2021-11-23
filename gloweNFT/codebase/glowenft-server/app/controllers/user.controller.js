const db = require("../models");
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const User = db.users;

// Create and Save a new Tutorial
exports.register = async (req, res) => {
    // Our register logic starts here
    try {
        // Get user input
        const { first_name, last_name, email, password, username, coverImage, profileImage } = req.body;

        // Validate user input
        if (!(email && password && username)) {
            res.status(400).send("All input is required");
        }

        // check if user already exist
        // Validate if user exist in our database
        const oldUser = await User.findOne({ email });

        if (oldUser) {
            return res.status(409).send("User Already Exist. Please Login");
        }

        const salt = await bcrypt.genSalt(10);
        //Encrypt user password
        encryptedPassword = await bcrypt.hash(password, salt);

        // Create user in our database
        const user = await User.create({
            username,
            first_name,
            last_name,
            email: email.toLowerCase(), // sanitize: convert email to lowercase
            password: encryptedPassword,
            coverImage, profileImage
        });

        // Create token
        const token = jwt.sign(
            { user_id: user._id, email },
            process.env.TOKEN_KEY,
            {
                expiresIn: "2h",
            }
        );
        // save user token
        user.token = token;

        // return new user
        res.status(201).json(user);
    } catch (err) {
        console.log(err);
    }
    // Our register logic ends here
};

// Retrieve all Tutorials from the database.
exports.login = async (req, res) => {
    try {
        // Get user input
        const { email, password } = req.body;

        // Validate user input
        if (!(email && password)) {
            res.status(400).send("All input is required");
        }
        // Validate if user exist in our database
        const user = await User.findOne({ email });

        if (user && (await bcrypt.compare(password, user.password))) {
            // Create token
            const token = jwt.sign(
                { user_id: user._id, email },
                process.env.TOKEN_KEY,
                {
                    expiresIn: "2h",
                }
            );

            // save user token
            user.token = token;

            // user
            res.status(200).json(user);
        }
        res.status(400).send("Invalid Credentials");
    } catch (err) {
        console.log(err);
    }

};

// Retrieve all Tutorials from the database.
exports.findAll = (req, res) => {
    var query = require('mongo-queryfilter').filter(req.query);
    return User
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