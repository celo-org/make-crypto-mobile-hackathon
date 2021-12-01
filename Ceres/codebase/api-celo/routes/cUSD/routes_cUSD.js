var express = require('express');
var router = express.Router();
require("dotenv").config();
const crypto = require('../../utils/crypto_data');
const Kit = require('@celo/contractkit');
const kit = Kit.newKit(process.env.CELO_NETWORK);
const logger = require("../../config/logger");

router.post("/transferFundsToWallet", async function(req, res) {
    
    try{
   
      const stableTokenAddress = await kit.registry.addressFor(Kit.CeloContract.StableToken)
      const gasPriceMinimumContract = await kit.contracts.getGasPriceMinimum()
      const gasPriceMinimum = await gasPriceMinimumContract.getGasPriceMinimum(stableTokenAddress)
      const gasPrice = Math.ceil(gasPriceMinimum * 1.3) 
      await kit.setFeeCurrency(Kit.CeloContract.StableToken) 

      kit.addAccount(crypto.descriptografar(req.body.privateKey));
      const stableTokenContract = await kit.contracts.getStableToken();

      logger.debug(`transferFundsToWallet() - from ${req.body.fromWallet} - to ${req.body.toWallet} - amountToSend ${req.body.amountToSend} `);

      const tx = await stableTokenContract
        .transfer(req.body.toWallet, req.body.amountToSend)
        .send({ from: req.body.fromWallet, gasPrice: gasPrice});
      const hash = await tx.getHash();
      const receipt = await tx.waitReceipt();
      logger.debug(`transferFundsToWallet() - hashTransaction - ${hash}`);
      return res.status(200).json({message: "Transfer completed"});

    }catch(error){
      logger.error(`transferFundsToWallet() - error - ${error.message}` );
      return res.status(500).json({message: error.message});
    }
  });

  router.get("/getBalanceAccount/:walletAddress", async function(req, res) {
    
    // let token = crypto.criptografarHeader('abcdf_lovekey_abcdf')

    try{
      const { walletAddress } = req.params;
      let obj = {balanceWallet: ''};
       kit.contracts.getStableToken().then((stableToken) => {
        stableToken.balanceOf(walletAddress).then((balance)=>{
          obj.balanceWallet = balance.toNumber();
          logger.debug(`getBalanceAccount() - ${walletAddress} - ${obj.balanceWallet}`);
          return res.status(200).json(obj);
        });   
       });
    }catch(error){
      logger.error(`getBalanceAccount() - error - ${error.message}` );
      return res.status(500).json({message: "The balance could not be returned"});
    }
  });

module.exports = router;
