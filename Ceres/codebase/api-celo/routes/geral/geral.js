var express = require('express');
var router = express.Router();
const Web3 = require('web3');
var web3 = new Web3();
const crypto = require('../../utils/crypto_data');
const logger = require("../../config/logger");
var Mnemonic = require('bitcore-mnemonic');
const HDWallet = require("ethereum-hdwallet");
var Schema = require("../../config/dbconnection");
const validate = require('../../webSocket/validate');

router.get("/getNewAccount", function(req, res) {
    
  let identifier = req.query.identifier;
  if(!identifier) {
    getCustodialWallet(req, res);
  }else if(identifier && identifier == "celo") {
    getNonCustodialWallet(req, res);
  }
});

  async function getCustodialWallet(req, res) { 
    try{
      
      let obj = {address: '', privateKey: ''};
      let newAccount = web3.eth.accounts.create();
      obj.address = newAccount.address;
      obj.privateKey = crypto.criptografar(newAccount.privateKey);
      logger.debug(`getCustodialWallet() - new account ${newAccount.address}`);
      return res.status(200).json(obj);
    }catch(error){
      logger.error(`getCustodialWallet() - error - ${error.message}` );
      return res.status(500).json({message: error.message});
    }
  } 

   async function getNonCustodialWallet(req, res) {
    
    try{
      
      const code = new Mnemonic(Mnemonic.Words.ENGLISH);
      const xpriv = code.toHDPrivateKey();
      const hdwallet = HDWallet.fromMnemonic(code.toString());
      
      const pbk = hdwallet.derive(`m/44'/60'/0'/0/0`).getPublicKey().toString('hex');
      const pvk = hdwallet.derive(`m/44'/60'/0'/0/0`).getPrivateKey().toString('hex');
      const addr = `0x${hdwallet.derive(`m/44'/60'/0'/0/0`).getAddress().toString('hex')}`;

      var wallet = new Schema.Wallet({ publicKey: addr, privateKey: crypto.criptografar(pvk), 
        words: crypto.criptografarWords(code.toString()) });
      
      wallet.save().then(item => {
        logger.debug(`getNonCustodialWallet() - new account ${addr}`);
        validate.fillMapWallets();
        res.status(200).json({words: crypto.criptografarWords(code.toString()), publicKey: pbk, 
          privateKey: crypto.criptografar(pvk), address:addr});
      }).catch(error => {
        
        logger.error(`getNonCustodialWallet() - error - ${error.message}` );
        res.status(500).json({message: "Unable to save to database"});
      });
    } catch(error){
      logger.error(`getNonCustodialWallet() - error - ${error.message}` );
      return res.status(400).json({message: error.message});
    }

  };

  module.exports = router;