import { ethers } from "ethers";
import Creator from "../abi/Creator.json";

export const getNFTCollectionAddress = async (wallet, creatorAddress) => {
	const signer = wallet.getSigner();
	const creatorContract = new ethers.Contract(
		creatorAddress,
		Creator.abi,
		signer
	);
	let result = await creatorContract.nftCollectionAddress();
	return result;
};
