const { ethers } = require("hardhat");

async function getDeployerBalance(deployer) {
	return `Deployer Balance: ${ethers.utils.formatEther(
		await deployer.getBalance()
	)}`;
}

async function main() {
	const [deployer] = await ethers.getSigners();

	console.log(`Deploying using address: ${deployer.address}`);

	console.log(await getDeployerBalance(deployer));

	console.log("Deploying Marketplace Contract");
	const NFTMarket = await ethers.getContractFactory("NFTMarket");
	const nftMarket = await NFTMarket.deploy();
	await nftMarket.deployed();

	console.log(await getDeployerBalance(deployer));
	console.log(`Marketplace Deployed at ${nftMarket.address}`);

	console.log("Deploying Creators Contract");
	const Creators = await ethers.getContractFactory("Creators");
	const creators = await Creators.deploy();
	await creators.deployed();
	console.log(`Creators deployed at ${creators.address}`);

	console.log(await getDeployerBalance(deployer));
}

main()
	.then(() => process.exit(0))
	.catch((error) => {
		console.error(error);
		process.exit(1);
	});
