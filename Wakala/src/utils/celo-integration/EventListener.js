import { ContractKit } from "@celo/contractkit";


let web3;

export default init = () => {
    web3 = ContractKit.newKit('wss://alfajores-forno.celo-testnet.org/ws').web3;
}

const listenToEvent = (eventId, callback) => {
    return web3.eth.subscribe(eventId, {}, callback);
}

const stopListeningToEvent = (subscriptionObject, callback) => {
    subscriptionObject.unsubscribe(callback);
}

const stopAllEventListeners = () => {
    web3.eth.clearSubscriptions();
}


module.exports.listenToEvent = listenToEvent;
module.exports.stopListeningToEvent = stopListeningToEvent;
module.exports.stopAllEventListeners = stopAllEventListeners;

