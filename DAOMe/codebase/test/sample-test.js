const { ethers } = require("hardhat");

describe("NFT", function () {
	it("Creating a creator, launching an NFT collection, launching a token and listing NFT on marketplace for the token", async function () {
		// deploying marketplace
		let NFTMarket = await ethers.getContractFactory("NFTMarket");
		let nftMarket = await NFTMarket.deploy();
		await nftMarket.deployed();

		const listingPrice = await nftMarket.getListingPrice();

		// deploying creators contract
		let Creators = await ethers.getContractFactory("Creators");
		let creators = await Creators.deploy();
		await creators.deployed();

		const [firstSigner, buyerSigner] = await ethers.getSigners();

		// create creator
		await creators.registerUser(
			"azure1050",
			"test",
			"Test",
			"http://www.google.com",
			"NFTCollection",
			"NFT"
		);

		// get creator address from creators.
		let creator = await creators.getCreatorAddressByUsername("azure1050");
		let Creator = await ethers.getContractFactory("Creator");
		let creatorContract = await Creator.attach(creator);

		// get nftCollectionAddress from creators.
		let nftContractAddress = await creatorContract.nftCollectionAddress();
		let NFT = await ethers.getContractFactory("NFT");

		let nftContract = await NFT.attach(nftContractAddress);

		// mint an nft
		await nftContract
			.connect(firstSigner)
			.createToken(
				"https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__480.jpg",
				5
			);
		await nftContract
			.connect(firstSigner)
			.createToken(
				"https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__480.jpg",
				5
			);
		await nftContract
			.connect(buyerSigner)
			.createToken(
				"https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__480.jpg",
				5
			);
		await nftContract
			.connect(firstSigner)
			.createToken(
				"https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__480.jpg",
				5
			);

		// approving token
		await nftContract.connect(firstSigner).approve(nftMarket.address, 1);

		// list on marketplace
		await nftMarket
			.connect(firstSigner)
			.createMarketItem(
				nftContractAddress,
				1,
				ethers.utils.parseUnits("0.1", "ether"),
				{ value: listingPrice }
			);

		let balanceOf = (
			await nftContract.balanceOf(firstSigner.address)
		).toString();
		let marketplaceBalance = (
			await nftContract.balanceOf(nftMarket.address)
		).toString();

		let fetchMarketItems = await nftMarket.fetchMarketItems();
		for (let i = 0; i < parseInt(balanceOf); i++) {
			console.log(
				await nftContract.tokenOfOwnerByIndex(firstSigner.address, i)
			);
		}

		await nftMarket
			.connect(buyerSigner)
			.createMarketSale(nftContractAddress, 1, {
				value: ethers.utils.parseUnits("0.1", "ether"),
			});
	});

	it("register user", async () => {
		const Creators = await ethers.getContractFactory("Creators");
		let creators = await Creators.deploy();
		await creators.deployed();
		let result = await creators.registerUser(
			"second",
			"Second",
			"second",
			"Second",
			"Second",
			"seoond"
		);
		let acutalResult = await result.wait();
		console.log(acutalResult);
	});
});
