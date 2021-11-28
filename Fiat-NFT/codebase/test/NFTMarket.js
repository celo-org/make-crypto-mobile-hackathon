const StripeMarket = artifacts.require('StripeMarket.sol');
const NFT = artifacts.require('NFT.sol');


contract (StripeMarket, (accounts)=>{
  let stripeMarket, nft;
  const [trader1, trader2] = [accounts[1], accounts[2]];
  beforeEach(async () => {
    stripeMarket = await StripeMarket.new();
    nft = await NFT.new(stripeMarket.address);
  });
  it('should list price', async()=>{
    let listingPrice = await stripeMarket.getListingPrice()
    listingPrice = listingPrice.toString()
    console.log(listingPrice);
  })
  it.only('should create and list token', async()=>{
    let listingPrice = await stripeMarket.getListingPrice()
    listingPrice = listingPrice.toString()
    const auctionPrice = web3.utils.toWei('1', 'ether')
    await nft.createToken("https://media.npr.org/assets/img/2021/03/05/nyancat-still-6cda3c8e01b3b5db14f6db31ce262161985fb564-s900-c85.webp");
    let po = (await nft._tokenIds.call({from:accounts[0]}));
    const exp =  await stripeMarket.createItem(nft.address, po.words[0], auctionPrice, {from: accounts[0], value: listingPrice })

    await nft.createToken("https://d3hnfqimznafg0.cloudfront.net/images/Article_Images/ImageForArticle_876(1).jpg");
    let p = (await nft._tokenIds.call({from:accounts[0]}));
    await stripeMarket.createItem(nft.address,p.words[0], auctionPrice, {from: accounts[0], value: listingPrice })
    let itemId = (exp.logs[0].args.itemId.words[0]);

    await stripeMarket.createMarketSale(nft.address, itemId, { from: accounts[1], value: auctionPrice})
    let items = await stripeMarket.fetchItemsCreated({from:accounts[0]})
    console.log(items);
    console.log(`iteams!!!!!`);
    let items0 = await stripeMarket.fetchMyNFTs({from: accounts[1]})
    console.log(items[0]);

  });


})

/*
describe("NFTMarket", function() {
  it("Should create and execute market sales", async function() {
    const Market = await ethers.getContractFactory("NFTMarket")
    const market = await Market.deploy()
    await market.deployed()
    const marketAddress = market.address

    const NFT = await ethers.getContractFactory("NFT")
    const nft = await NFT.deploy(marketAddress)
    await nft.deployed()
    const nftContractAddress = nft.address

    let listingPrice = await market.getListingPrice()
    listingPrice = listingPrice.toString()

    const auctionPrice = ethers.utils.parseUnits('1', 'ether')

    await nft.createToken("https://www.mytokenlocation.com")
    await nft.createToken("https://www.mytokenlocation2.com")

    await market.createMarketItem(nftContractAddress, 1, auctionPrice, { value: listingPrice })
    await market.createMarketItem(nftContractAddress, 2, auctionPrice, { value: listingPrice })

    const [_, buyerAddress] = await ethers.getSigners()

    await market.connect(buyerAddress).createMarketSale(nftContractAddress, 1, { value: auctionPrice})

    items = await market.fetchMarketItems()
    items = await Promise.all(items.map(async i => {
      const tokenUri = await nft.tokenURI(i.tokenId)
      let item = {
        price: i.price.toString(),
        tokenId: i.price.toString(),
        seller: i.seller,
        owner: i.owner,
        tokenUri
      }
      return item
    }))
    console.log('items: ', items)
  })
})
*/
