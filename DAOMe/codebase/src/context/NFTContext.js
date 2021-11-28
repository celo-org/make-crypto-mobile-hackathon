import React, { useContext, useState } from "react";
import {
	approveToMarketplace,
	mintNFT,
	tokenMetadata,
	tokenOwnedByUser,
	withdrawRoyalty,
} from "../utils/NFT";
import { CreatorsContext } from "./CreatorsContext";
import { Web3Context } from "./Web3Context";
import { useHistory } from "react-router-dom";
export const NFTContext = React.createContext(null);

export function NFTContextProvider({ children }) {
	const history = useHistory();
	const web3Context = useContext(Web3Context);
	const { wallet } = web3Context;

	const creatorsContext = useContext(CreatorsContext);
	const { creatorAddress, creator } = creatorsContext;

	const [loadingNFT, setLoadingNFT] = useState(false);
	const [gettingMetadata, setGettingMetadata] = useState(null);
	const [approvingToMarketplace, setApprovingToMarketplace] = useState(false);
	const [withdrawingRoyalty, setWithdrawingRoyalty] = useState(false);
	const [currentUserNFTs, setCurrentUserNFTs] = useState(null);

	async function mintNFTUsingSigner(
		tokenURI,
		royaltyPercentage,
		modalCloser
	) {
		try {
			let tx = await mintNFT(
				wallet,
				creatorAddress,
				tokenURI,
				royaltyPercentage
			);
			return tx;
		} catch (e) {
		} finally {
			modalCloser();
		}
	}

	async function getNFTsOwnerByUserUsingSigner() {
		setLoadingNFT(true);
		let result = await tokenOwnedByUser(wallet, creatorAddress);
		setCurrentUserNFTs(result);
		setLoadingNFT(false);
	}

	async function nftMetadataUsingSigner(
		creatorAddress,
		collectionAddress,
		tokenId
	) {
		setGettingMetadata(true);
		let nft = await tokenMetadata(
			wallet,
			creatorAddress,
			collectionAddress,
			tokenId
		);
		setGettingMetadata(false);
		return nft;
	}

	async function approveToMarketplaceUsingSigner(collectionAddress, tokenId) {
		setApprovingToMarketplace(true);
		try {
			let tx = await approveToMarketplace(
				wallet,
				collectionAddress,
				tokenId
			);
			await tx.wait();
			history.push("/");
		} catch (e) {
		} finally {
			setApprovingToMarketplace(false);
		}
	}

	async function withdrawRoyaltyUsingSigner() {
		setWithdrawingRoyalty(true);
		withdrawRoyalty(creator.nftCollectionAddress, wallet);
		setWithdrawingRoyalty(false);
	}

	return (
		<NFTContext.Provider
			value={{
				loadingNFT,
				gettingMetadata,
				approvingToMarketplace,
				withdrawingRoyalty,
				currentUserNFTs,
				mintNFTUsingSigner,
				getNFTsOwnerByUserUsingSigner,
				nftMetadataUsingSigner,
				approveToMarketplaceUsingSigner,
				withdrawRoyaltyUsingSigner,
			}}
		>
			{children}
		</NFTContext.Provider>
	);
}
