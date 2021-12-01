const Web3 = require('web3');
const axios = require('axios');
const logger = require("../config/logger");
var Schema = require("../config/dbconnection");
var API = require("../config/request");
const Kit = require('@celo/contractkit');
const kit = Kit.newKit(process.env.CELO_NETWORK);

async function getConfirmations(txHash) {
  try {
    // Instantiate web3 with HttpProvider
    const web3 = new Web3(process.env.WEB_SOCKET_CELO);

    // Get transaction details
    const trx = await web3.eth.getTransaction(txHash);

    // Get current block number
    const currentBlock = await web3.eth.getBlockNumber();

    // When transaction is unconfirmed, its block number is null.
    // In this case we return 0 as number of confirmations
    return trx.blockNumber === null ? 0 : currentBlock - trx.blockNumber;
  }
  catch (error) {
    logger.error(`getConfirmations()  - ${error.message}`);
  }
}

async function confirmEtherTransaction(txHash, dataTransaction, confirmations = 3) {
    
    setTimeout(async () => {
    // Get current number of confirmations and compare it with sought-for value
    const trxConfirmations = await getConfirmations(txHash);
    logger.debug('Transaction with hash ' + txHash + ' has ' + trxConfirmations + ' confirmation(s)');

    if (trxConfirmations >= confirmations) {
      // Handle confirmation event according to your business logic

      logger.debug('Transaction with hash ' + txHash + ' has been successfully confirmed', new Date());
     

      let blockNumber = (await kit.web3.eth.getTransaction(txHash)).blockNumber;
      let transactionTimestamp = (await kit.web3.eth.getBlock(blockNumber)).timestamp;


      dataTransaction.status = "COMPLETED";

      let transactionDateJson = new Date(transactionTimestamp * 1000);
      let transactionDateDataBase = new Date(transactionDateJson.valueOf() - transactionDateJson.getTimezoneOffset() * 60000);

      dataTransaction.transaction_date = transactionDateJson;


      var transaction = new Schema.Transaction({
        from: dataTransaction.source_address,
        to: dataTransaction.destination_address,
        value: dataTransaction.value,
        transactionDate : transactionDateDataBase,
        gas : dataTransaction.gas,
        transactionId: dataTransaction.txid,
        status: dataTransaction.status,
        successSent: true
      });

      API.post(process.env.API_URL_REGISTER_TRANSACTIONS, dataTransaction).then(function (response) {
        
        transaction.save().then(item => {
          logger.debug(`confirmEtherTransaction() - new transaction completed ${dataTransaction.transactionId}`);
        }).catch(error => {
          logger.error(`confirmEtherTransaction() - new transaction completed ${dataTransaction.transactionId}` );
        });

      }).catch(function (error) {
        
        transaction.succeedSent = false;
        transaction.save().then(item => {
            logger.debug(`subscription() - new transaction completed ${dataTransaction.transactionId}`);
          }).catch(error => {
            logger.error(`subscription() - new transaction completed ${dataTransaction.transactionId}`);
          });
      });

      return;
    }
    // Recursive call
    return confirmEtherTransaction(txHash, dataTransaction, confirmations)
  }, 30 * 1000)
}

module.exports = confirmEtherTransaction