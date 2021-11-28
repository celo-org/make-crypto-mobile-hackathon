import wakalaEscrowAbi from "../celo-integration/WakalaEscrow.abi.json";
import ERC20Abi from "../celo-integration/ERC20.abi.json"
import {CONTRACT_ADDRESS, ERC20_ADDRESS} from "../Constants";
import {CeloContract, newKitFromWeb3} from '@celo/contractkit'
import Web3 from "web3";

function ContractMethods(magic) {

    const root = this;
    let web3 = new Web3(magic.rpcProvider)
    let kit = newKitFromWeb3(web3);
    let contract = new kit.web3.eth.Contract(wakalaEscrowAbi, CONTRACT_ADDRESS);
    let ERC20 = new kit.web3.eth.Contract(ERC20Abi, ERC20_ADDRESS);

    const events = [
        "AgentPairingEvent",
        "TransactionInitEvent",
        "ClientConfirmationEvent",
        "AgentConfirmationEvent",
        "ConfirmationCompletedEvent",
        "TransactionCompletionEvent"
    ]
    let stableToken
    let transactions = []

    this.constructor = function (magicInstance) {
        this.magic = magicInstance
        this.kit = kit
        this.contract = contract
        this.web3 = web3
        this.ERC20 = ERC20
        this.initialized = false
    }

    this.init = async () => {
        const accounts = await kit.web3.eth.getAccounts()
        kit.defaultAccount = accounts[0]
        web3.eth.defaultAccount = accounts[0]
        await kit.setFeeCurrency(CeloContract.StableToken) // To use cUSD
        stableToken = await kit.contracts.getStableToken() // To use cUSD
        this.stableToken = stableToken
        this.initialized = true
    }

    async function approveTransaction(amount) {
        try {
            let txObject = await ERC20.methods.approve(CONTRACT_ADDRESS, amount)
            let tx = await kit.sendTransactionObject(txObject, {'from': kit.defaultAccount, feeCurrency: stableToken.address});
            let receipt = await tx.waitReceipt();
            console.log("From Approve", receipt)
            return receipt
        } catch (e) {
            console.log(e, "approveTransaction catch")
        }
    }

    function getAmountInGolds(sendAmount) {
        return kit.web3.utils.toWei(sendAmount, 'ether');
    }

    this.initializeDepositTransaction = async (amount) => {
        await approveTransaction(getAmountInGolds(amount + 1))
        let txObject = await contract.methods.initializeDepositTransaction(getAmountInGolds(amount));
        let tx = await kit.sendTransactionObject(txObject, {'from': kit.defaultAccount, feeCurrency: stableToken.address});
        let receipt = await tx.waitReceipt();
        console.log("From initializeDepositTransaction", receipt)
        return receipt
    };

    this.initializeWithdrawalTransaction = async (amount) => {
        await approveTransaction(getAmountInGolds(amount + 1))
        let txObject = await contract.methods.initializeWithdrawalTransaction(getAmountInGolds(amount));
        let tx = await kit.sendTransactionObject(txObject, {'from': kit.defaultAccount, feeCurrency: stableToken.address});
        let receipt = await tx.waitReceipt();
        console.log("From initializeWithdrawalTransaction", receipt)
        return receipt
    };

    this.agentAcceptDepositTransaction = async (transactionId) => {
        let txObject = await contract.methods.agentAcceptDepositTransaction(transactionId);
        let tx = await kit.sendTransactionObject(txObject, {'from': kit.defaultAccount, feeCurrency: stableToken.address});
        let receipt = await tx.waitReceipt();
        console.log("From agentAcceptDepositTransaction", receipt)
        return receipt
    };

    this.agentAcceptWithdrawalTransaction = async (transactionId) => {
        let txObject = await contract.methods.agentAcceptWithdrawalTransaction(transactionId);
        let tx = await kit.sendTransactionObject(txObject, {'from': kit.defaultAccount, feeCurrency: stableToken.address});
        let receipt = await tx.waitReceipt();
        console.log("From agentAcceptWithdrawalTransaction", receipt)
        return receipt
    };

    this.clientConfirmPayment = async (transactionId) => {
        let txObject = await contract.methods.clientConfirmPayment(transactionId);
        let tx = await kit.sendTransactionObject(txObject, {'from': kit.defaultAccount, feeCurrency: stableToken.address});
        let receipt = await tx.waitReceipt();
        console.log("From clientConfirmPayment", receipt)
        return receipt
    };

    this.agentConfirmPayment = async (transactionId) => {
        let txObject = await contract.methods.agentConfirmPayment(transactionId);
        let tx = await kit.sendTransactionObject(txObject, {'from': kit.defaultAccount, feeCurrency: stableToken.address});
        let receipt = await tx.waitReceipt();
        console.log("From agentConfirmPayment", receipt)
        return receipt
    };

    function mapEventToTransaction(eventWTX = []) {
        const Status = ["AWAITING_AGENT", "AWAITING_CONFIRMATIONS", "CONFIRMED", "CANCELED", "DONE"]
        const TransactionType = ["DEPOSIT", "WITHDRAWAL"]
        return {
            id: parseInt(eventWTX[0]),
            txType: TransactionType[parseInt(eventWTX[1])],
            clientAddress: eventWTX[2],
            agentAddress: eventWTX[3],
            status: Status[parseInt(eventWTX[4])],
            amount: kit.web3.utils.fromWei(eventWTX[5], 'ether'),
            agentFee: eventWTX[6],
            wakalaFee: eventWTX[7],
            grossAmount: eventWTX[8],
            agentApproval: eventWTX[9],
            clientApproval: eventWTX[10],
        }
    }

    this.initEventListeners = () => {
        let options = {
            filter: {
                value: [],
            },
            fromBlock: 0
        };
        events.forEach((WakalaEvent) => {
            contract.events[WakalaEvent](options)
                //data – Will fire each time an event of the type you are listening for has been emitted
                .on('data', event => {
                    handleEvent(event)
                })
                //changed – Will fire for each event of the type you are listening for that has been removed from the blockchain.
                .on('changed', changed => console.log(WakalaEvent, changed))
                //error – Will fire if an error in the event subscription occurs.
                .on('error', err => {
                    console.log(WakalaEvent, err)
                })
                //connected – Will fire when the subscription has successfully established a connection. It will return a subscription id. This event only fires once.
                .on('connected', str => console.log(WakalaEvent, str))
        })

      return transactions
    }
    function handleEvent(event, callback = null){
        if (event.returnValues.wtx !== null) {
            let wakalaTransaction = mapEventToTransaction(event.returnValues.wtx)
            if(wakalaTransaction.agentAddress === kit.defaultAccount
                && (wakalaTransaction.status !== "AWAITING_AGENT" && wakalaTransaction.status !== "DONE")){
                transactions.push(wakalaTransaction)
            }else if(wakalaTransaction.agentAddress !== kit.defaultAccount && wakalaTransaction.status !== "DONE"){
                transactions.push(wakalaTransaction)
            }
        if(callback instanceof Function) callback(wakalaTransaction)
        //console.log(wakalaTransaction)
        }
    }
    this.getTransactions = () => {
        return transactions
    }
    this.getPastEvents = (callback) => {
        //Past Events
        let options = {
            filter: {
                value: []
            },
            fromBlock: 0,                  //Number || "earliest" || "pending" || "latest"
            toBlock: 'latest'
        };
        events.map((WakalaEvent) => {
            contract.getPastEvents(WakalaEvent, options)
                .then(results => {
                    if (results.length !== 0) {
                        results.forEach(event => handleEvent(event, callback))
                    }
                })
                .catch(err => {
                    console.log(WakalaEvent, err)
                });
        })
        return transactions
    }
    this.constructor(magic);
}

export default ContractMethods;
