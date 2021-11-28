import SignData from './SignData';

const AuthenticationHash = async (email, accountAddress, password, web3) => {
    let signedMessage = await SignData(email, accountAddress, web3);
    let passwordDigiCodeHash = await web3.eth.accounts.hashMessage(password + email);

    return await web3.eth.accounts.hashMessage(signedMessage + passwordDigiCodeHash);
}

export default AuthenticationHash;