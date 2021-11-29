const ContractKit = require('@celo/contractkit');
const Web3 = require('web3');
const Nftzi = require('./abi/Nftzi.json');

require('dotenv').config();

const main = async () => {
  const web3 = new Web3('https://alfajores-forno.celo-testnet.org');
  const client = ContractKit.newKitFromWeb3(web3);

  const account = web3.eth.accounts.privateKeyToAccount(process.env.PRIVATE_KEY);
  const networkId = await web3.eth.net.getId();
  client.connection.addAccount(account.privateKey);
  const deployedNetwork = Nftzi.networks[networkId];

  let goldtoken = await client.contracts.getGoldToken()
  let celoBalance = await goldtoken.balanceOf(account.address)

    console.log(`Your account address: ${account.address}`)
    console.log(`Your account CELO balance: ${celoBalance.toString()}`)

  if (!deployedNetwork) {
    throw new Error(`${networkId} is not valid`);
  }

  let instance = new web3.eth.Contract(
    Nftzi.abi,
    deployedNetwork.address
    );

  // const txObject = await instance.methods.safeMint('https://static.tildacdn.com/tild3537-3262-4331-a437-346531316565/1_1.png', goldtoken.address);
  // let tx = await client.sendTransactionObject(txObject, { from: account.address })

  // let receipt = await tx.waitReceipt()
  //  console.log(receipt)

  const txObject = await instance.methods.safeMint('https://static.tildacdn.com/tild6438-3139-4463-b731-666462663831/3.png', goldtoken.address);
  let tx = await client.sendTransactionObject(txObject, { from: account.address })

  let receipt = await tx.waitReceipt()
   console.log(receipt)

  // let tickres = await instance.methods.callTick().call();
  // console.log(tickres)

  let tokens = await instance.methods.tokensInfo().call();
  console.log(tokens)

  let nftBalance = await instance.methods.balanceOf(account.address).call();
  console.log(nftBalance)

  let test1Balance = await instance.methods.balanceOf('0xeB059Ad7161E9b78D4782ccE1f59c1b8a63E31f5').call();
  console.log(test1Balance)

  let test2Balance = await instance.methods.balanceOf('0x3F50f234B0B8CA42b73B99A7B1deDFDdA56efeDA').call();
  console.log(test2Balance)

  // const tokensIds = []

  // instance.getPastEvents('Transfer', {
  //   filter: {
  //     _from: '0x0000000000000000000000000000000000000000'
  //   },
  //   fromBlock: 0
  // }).then((events) => {
  //   for (let event of events) {
  //     tokensIds.push(event.returnValues.tokenId)
  //   }

  //   tokensIds.forEach( async(i) => {
  //      const res = await instance.methods.tokenSummary(i).call();
  //      console.log(i, ': ', res);
  //   });
  // });
};

main().catch((err) => {
  console.error(err);
});

