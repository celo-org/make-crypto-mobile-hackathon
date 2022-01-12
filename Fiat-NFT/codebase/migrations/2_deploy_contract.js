const Nft = artifacts.require("NFT.sol");
const StripeMarket = artifacts.require("StripeMarket.sol");
module.exports = async function (deployer, _network, accounts) {
  const [trader1, trader2, trader3, trader4, _] = accounts;

  await deployer.deploy(StripeMarket);
  const stripeMarket  = await StripeMarket.deployed()

  await Promise.all(
    [Nft].map(contract => deployer.deploy(contract, stripeMarket.address))
  );
  const [nft] = await Promise.all(
    [Nft].map(contract => contract.deployed())
  );
  //nft.createToken("https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR1DF4MVzyS-y4BiRfjdeAVKsyzX4K6ns0PNw&usqp=CAU", {from: accounts[0]});
  //let amt = web3.utils.toWei('3', 'ether');
  //await web3.eth.sendTransaction({from:accounts[0],to: stripeMarket.address, value: amt})

}
