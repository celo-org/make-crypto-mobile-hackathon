const SignData = async (name, accountAddress, web3) => {
    let signedData;
  console.log(web3,web3.eth)
    await web3.eth.personal.sign(
        name,
        accountAddress,
        (err, signature) => {
            if (err) {
                signedData = err;
            } else {
                signedData = web3.eth.accounts.hashMessage(signature);
            }
        }
    );

    return signedData;
}

export default SignData;