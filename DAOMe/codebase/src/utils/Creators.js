import { ethers } from "ethers";
import Creators from "../abi/Creators.json";
import Creator from "../abi/Creator.json";

export const isUserRegistered = async (wallet) => {
	const signer = wallet.getSigner();
	const creatorsContract = new ethers.Contract(
		process.env.REACT_APP_CREATORS_CONTRACT_ADDRESS,
		Creators.abi,
		signer
	);
	let accounts = await wallet.listAccounts();
	let result = await creatorsContract.isUserRegistered(accounts[0]);
	return result;
};

export const getCreatorAddressByUsername = async (wallet, username) => {
	const signer = wallet.getSigner();
	const creatorsContract = new ethers.Contract(
		process.env.REACT_APP_CREATORS_CONTRACT_ADDRESS,
		Creators.abi,
		signer
	);
	let result = await creatorsContract.getCreatorAddressByUsername(username);
	return result;
};

export const registerUser = async (wallet, creator) => {
	const signer = wallet.getSigner();
	const creatorsContract = new ethers.Contract(
		process.env.REACT_APP_CREATORS_CONTRACT_ADDRESS,
		Creators.abi,
		signer
	);

	let tx = await creatorsContract.registerUser(
		creator.username,
		creator.name,
		creator.bio,
		creator.profilePicUrl,
		creator.nftCollectionName,
		creator.nftCollectionSymbol
	);

	return tx;
};

export const getCreatorAddressBySender = async (wallet) => {
	const signer = wallet.getSigner();
	const creatorsContract = new ethers.Contract(
		process.env.REACT_APP_CREATORS_CONTRACT_ADDRESS,
		Creators.abi,
		signer
	);
	let result = await creatorsContract.getCreatorAddressBySender();
	return result;
};

export const getCreatorObjFromAddress = async (
	wallet,
	contractAddress,
	provider
) => {
	const signer = await wallet.getSigner();

	const creatorContract = new ethers.Contract(
		contractAddress,
		Creator.abi,
		signer
	);

	let username = await creatorContract.username();
	let name = await creatorContract.name();
	let bio = await creatorContract.bio();

	let profilePicUrl = await creatorContract.profilePicUrl();
	let nftCollectionName = await creatorContract.nftCollectionName();
	let nftCollectionSymbol = await creatorContract.nftCollectionSymbol();
	let nftCollectionAddress = await creatorContract.nftCollectionAddress();

	let royaltyEarned = ethers.utils.formatEther(
		(await provider.getBalance(nftCollectionAddress)).toString()
	);

	return {
		username,
		name,
		bio,
		nftCollectionName,
		nftCollectionSymbol,
		nftCollectionAddress,
		profilePicUrl,
		royaltyEarned,
	};
};
