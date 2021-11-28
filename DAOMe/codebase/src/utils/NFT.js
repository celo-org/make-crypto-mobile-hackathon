import { ethers, ContractFactory } from "ethers";
import NFT from "../abi/NFT.json";
import { getNFTCollectionAddress } from "./Creator";
import axios from "axios";
import Creator from "../abi/Creator.json";

export const balanceOf = async (wallet, creatorAddress) => {
	const signer = wallet.getSigner();
	let collectionAddress = getNFTCollectionAddress(wallet, creatorAddress);
	let nftContract = new ethers.Contract(collectionAddress, NFT.abi, signer);
	let result = await nftContract.balanceOf(await signer.getAddress());
	return result;
};

export const mintNFT = async (
	wallet,
	creatorAddress,
	tokenURI,
	royaltyPercentage
) => {
	const signer = wallet.getSigner();
	let collectionAddress = await getNFTCollectionAddress(
		wallet,
		creatorAddress
	);
	let nftContract = new ethers.Contract(collectionAddress, NFT.abi, signer);
	let tx = await nftContract.createToken(tokenURI, royaltyPercentage);
	return tx;
};

export const tokenOwnedByUser = async (wallet, creatorAddress) => {
	const signer = wallet.getSigner();
	const ownerAddress = await signer.getAddress();

	let collectionAddress = await getNFTCollectionAddress(
		wallet,
		creatorAddress
	);

	let nftContract = new ethers.Contract(collectionAddress, NFT.abi, signer);
	let balanceOfOwner = await balanceOf(wallet, creatorAddress);
	let nfts = [];
	for (let i = 0; i < balanceOfOwner; i++) {
		let tokenId = await nftContract.tokenOfOwnerByIndex(ownerAddress, i);
		let tokenURI = await nftContract.tokenURI(tokenId);
		let response = await axios.get(tokenURI);
		const { name, description } = response.data;
		let ImageUrlSplit = response.data.image.split("/", 4);
		let imageUrl = `https://ipfs.io/ipfs/${
			ImageUrlSplit[ImageUrlSplit.length - 2] +
			"/" +
			ImageUrlSplit[ImageUrlSplit.length - 1]
		}`;
		let nft = {
			name,
			description,
			image: imageUrl,
			collectionAddress,
			creatorAddress,
			tokenId,
		};
		nfts.push(nft);
	}

	return nfts;
};

export const tokenMetadata = async (
	wallet,
	creatorAddress,
	collectionAddress,
	tokenId
) => {
	const signer = wallet.getSigner();
	let nftContract = new ethers.Contract(collectionAddress, NFT.abi, signer);
	let isApprovedByOwner = await nftContract.isApprovedToMarketplace(
		process.env.REACT_APP_MARKETPLACE_ADDRESS,
		tokenId
	);
	let owner = await nftContract.ownerOf(tokenId);
	let creatorContract = new ethers.Contract(
		creatorAddress,
		Creator.abi,
		signer
	);

	let creator = {};
	creator.username = await creatorContract.username();

	creator.name = await creatorContract.name();
	creator.bio = await creatorContract.bio();
	creator.profilePicUrl = await creatorContract.profilePicUrl();

	let tokenURI = await nftContract.tokenURI(tokenId);
	let response = await axios.get(tokenURI);

	const { name, description } = response.data;
	let ImageUrlSplit = response.data.image.split("/", 4);
	let imageUrl = `https://ipfs.io/ipfs/${
		ImageUrlSplit[ImageUrlSplit.length - 2] +
		"/" +
		ImageUrlSplit[ImageUrlSplit.length - 1]
	}`;

	let nft = {
		name,
		description,
		image: imageUrl,
		collectionAddress,
		tokenId,
		creator,
		owner,
		isApprovedByOwner,
	};

	return nft;
};

export const approveToMarketplace = async (
	wallet,
	collectionAddress,
	tokenId
) => {
	const signer = wallet.getSigner();
	let nftContract = new ethers.Contract(collectionAddress, NFT.abi, signer);
	let tx = await nftContract.approve(
		process.env.REACT_APP_MARKETPLACE_ADDRESS,
		tokenId
	);

	return tx;
};

export const withdrawRoyalty = async (collectionAddress, wallet) => {
	const signer = wallet.getSigner();
	let nftContract = new ethers.Contract(collectionAddress, NFT.abi, signer);
	let tx = await nftContract.withdraw();
	return tx;
};
