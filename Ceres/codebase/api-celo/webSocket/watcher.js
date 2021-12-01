const Web3 = require('web3');
const validate = require('./validate');
const confirmEtherTransaction = require('./confirm');
const Kit = require('@celo/contractkit');
const kit = Kit.newKit(process.env.CELO_NETWORK);
const InputDataDecoder = require('ethereum-input-data-decoder');
const TOKEN_ABI = require('./abi');
const decoder = new InputDataDecoder(TOKEN_ABI);
const axios = require('axios');
const logger = require("../config/logger");
var Schema = require("../config/dbconnection");
var API = require("../config/request");

const mapTransactions = new Map();

async function watchEtherTransfers() {
  // Instantiate web3 with WebSocket provider
  const web3 = new Web3(new Web3.providers.WebsocketProvider(process.env.WEB_SOCKET_CELO))

  validate.fillMapWallets();

  // Instantiate subscription object
  const subscription = web3.eth.subscribe('pendingTransactions')

  // Subscribe to pending transactions
  subscription.subscribe((error, result) => {
    if (error) logger.error(`watchEtherTransfers() - error - ${error.message}` );; 
  })
    .on('data', async (txHash) => {

      if( mapTransactions.get(txHash)){
            return
      }else {
        mapTransactions.set(txHash, true)
      }

      try {
        // Instantiate web3 with HttpProvider
        let date = new Date();

        // Get transaction details
        const trx = await kit.web3.eth.getTransaction(txHash);
        // // If transaction is not valid, simply return
        mapTransactions.delete(txHash)
        if ( trx == null || !trx.to == null) return
        
        const result = decoder.decodeData(trx.input);
        
        if(result.method == "transfer" || result.method == "transferFrom"){
            
            const valid = validate.validateTransaction(trx.from, result.inputs[0]);
            
            if(valid) {

              let date = new Date();
              let transactionDate = new Date(date.valueOf() - date.getTimezoneOffset() * 60000);

              let dataTransaction = {
                "status": "PENDING",
                "destination_address": '0x'+ result.inputs[0],
                "source_address": trx.from,
                "value": result.inputs[1].toNumber(),
                "txid": trx.hash,
                "gas": trx.gas,
                "transaction_date": date
              }

              var transaction = new Schema.Transaction({
                from: dataTransaction.source_address,
                to: dataTransaction.destination_address,
                value: dataTransaction.value,
                transactionDate : transactionDate,
                gas : trx.gas,
                transactionId: dataTransaction.txid,
                status: dataTransaction.status,
                successSent: true,
              });

              API.post(process.env.API_URL_REGISTER_TRANSACTIONS, dataTransaction).then(function (response) {
                
                confirmEtherTransaction(txHash, dataTransaction);
                transaction.save().then(item => {
                  logger.debug(`subscription() - new transaction pending ${trx.hash}`);
                }).catch(error => {
                  logger.error(`subscription() - new transaction pending ${trx.hash}`);
                });

              }).catch(function (error) {
                transaction.succeedSent = false;
                transaction.save().then(item => {
                  logger.debug(`subscription() - new transaction pending ${trx.hash}`);
                }).catch(error => {
                  logger.error(`subscription() - new transaction pending ${trx.hash}` );
                });
              });      
            } 
        }
        
        // // Initiate transaction confirmation
        // confirmEtherTransaction(txHash)

        // Unsubscribe from pending transactions.
        // subscription.unsubscribe()
      }
      catch (error) {
        logger.error(`watchEtherTransfers() - error - ${error.message}` );
      }
    })
}



module.exports = {
  watchEtherTransfers
}