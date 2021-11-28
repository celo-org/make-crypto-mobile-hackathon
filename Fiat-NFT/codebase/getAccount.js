const ContractKit =  require('@celo/contractkit');

const Web3 =  require('web3');

require('dotenv').config();

const main =  async  ()  =>  {
  const web3 =  new  Web3(process.env.REST_URL);
	const client = ContractKit.newKitFromWeb3(web3);

	const account = web3.eth.accounts.create();

	console.log('address: ', account.address);
    console.log('privateKey: ', account.privateKey);
    console.log(account);
};

main().catch((err)  =>  {
	console.error(err);
});
