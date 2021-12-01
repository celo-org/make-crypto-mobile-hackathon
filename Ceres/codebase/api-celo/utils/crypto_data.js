const crypto = require("crypto");
const jwt = require("jsonwebtoken");

function criptografar(data) {
    var mykey = crypto.createCipher(process.env.ALGORITM, process.env.SECRET);
    var mystr = mykey.update(data, process.env.ENCODING, process.env.TYPE);
    mystr += mykey.final(process.env.TYPE);
    return mystr;
};

function criptografarWords(data) {
    var mykey = crypto.createCipher(process.env.ALGORITM, process.env.SECRET_WORDS);
    var mystr = mykey.update(data, process.env.ENCODING, process.env.TYPE);
    mystr += mykey.final(process.env.TYPE);
    return mystr;
};


function descriptografar(data) {
    var mykey = crypto.createDecipher(process.env.ALGORITM, process.env.SECRET );
    var mystr = mykey.update(data, process.env.TYPE, process.env.ENCODING);
    mystr += mykey.final(process.env.ENCODING);
    return mystr;
};

function descriptografarWords(data) {
    var mykey = crypto.createDecipher(process.env.ALGORITM, process.env.SECRET_WORDS );
    var mystr = mykey.update(data, process.env.TYPE, process.env.ENCODING);
    mystr += mykey.final(process.env.ENCODING);
    return mystr;
};


function criptografarHeader(data) {
    
    let token = jwt.sign({ data }, process.env.JWT_KEY, {algorithm: process.env.JWT_ALGORITM, 
        expiresIn: process.env.JWT_EXPIRY_SECONDS, });
    return token;
};


function descriptografarHeader(data) {
   
    let payload = jwt.verify(data, process.env.JWT_KEY);
    return payload;
};


module.exports = {
    criptografar, descriptografar, criptografarHeader, descriptografarHeader, 
    criptografarWords, descriptografarWords
}