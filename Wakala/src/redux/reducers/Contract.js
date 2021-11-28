import {useEffect, useState} from "react";
import Web3 from "web3";
import {newKitFromWeb3} from "@celo/contractkit";

const Contract = (options) => {
    const [email, setEmail] = useState("");
    const [publicAddress, setPublicAddress] = useState("");
    const [destinationAddress, setDestinationAddress] = useState("");
    const [sendAmount, setSendAmount] = useState(0);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [userMetadata, setUserMetadata] = useState({});
    const [txHash, setTxHash] = useState("");
    const [contractSendHash, setContractSendHash] = useState("");
    const [contractSending, setContractSending] = useState(false);
    const [sendingTransaction, setSendingTransaction] = useState(false);

    let vars = {
        magic: {}
    }

    this.constructor = function (options){
        vars = {...vars, ...options}
    }


    this.handlerSendTransaction = async (sendAmount) => {
        const magic = vars.magic
        const web3 = new Web3(magic.rpcProvider);
        const kit = newKitFromWeb3(web3);

        const {publicAddress} = vars.userMetadata;

        kit.defaultAccount = publicAddress;
        const oneGold = kit.web3.utils.toWei(sendAmount, 'ether');

        const tx = await kit.sendTransaction({
            from: publicAddress,
            to: destinationAddress,
            value: oneGold,
            gasPrice: 1000000000
        });

        const hash = await tx.getHash();
        const receipt = await tx.waitReceipt();

        setTxHash(hash);

        console.log('send transaction', hash, receipt);
    };

    this.handleContractSend = async () => {
        const magic = vars.magic
        const contractAddress = '0xcf71aB733148F70647129F3006E92439d11946A9';

        const abi = [
            {
                "constant": true,
                "inputs": [],
                "name": "getName",
                "outputs": [
                    {
                        "internalType": "string",
                        "name": "",
                        "type": "string"
                    }
                ],
                "payable": false,
                "stateMutability": "view",
                "type": "function"
            },
            {
                "constant": false,
                "inputs": [
                    {
                        "internalType": "string",
                        "name": "newName",
                        "type": "string"
                    }
                ],
                "name": "setName",
                "outputs": [],
                "payable": false,
                "stateMutability": "nonpayable",
                "type": "function"
            }
        ];
        const {publicAddress} = vars.userMetadata;

        const web3 = new Web3(magic.rpcProvider);
        const kit = newKitFromWeb3(web3);

        let instance = new web3.eth.Contract(abi, contractAddress);

        const txObject = await instance.methods.setName('new name');

        setContractSending(true);

        let tx = await kit.sendTransactionObject(txObject, {from: publicAddress, gasPrice: 1000000000});

        const hash = await tx.getHash();

        let receipt = await tx.waitReceipt();
        setContractSendHash(hash);

        setContractSending(false);
        console.log(hash, receipt)
    };
}
export default Contract;
