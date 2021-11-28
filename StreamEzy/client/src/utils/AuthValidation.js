import SignData from './SignData';

const AuthValidation = async (email, accountAddress, password,  web3, contract) => {

    let userAddress = await contract.methods.getUserAddress().call({ from: accountAddress });

    if (userAddress.toLowerCase() !== accountAddress.toLowerCase()) {
        return false;
    } else {
        let signedData = await SignData(email, accountAddress, web3);
        let passwordDigiCodeHash = await web3.eth.accounts.hashMessage(password + email);

        let hash = await web3.eth.accounts.hashMessage(signedData + passwordDigiCodeHash);

        // get hash from the contract
        let hashFromContract = await contract.methods.getSignatureHash().call({ from: accountAddress });

        if (hash === hashFromContract) {
            return true;
        } else {
            return false;
        }
    }
}

export default AuthValidation;