import React, { useContext, useState, useEffect } from "react";
import {
	isUserRegistered,
	getCreatorAddressBySender,
	getCreatorAddressByUsername,
	registerUser,
	getCreatorObjFromAddress,
} from "../utils/Creators";
import { Web3Context } from "./Web3Context";

const validNetworkOptions = {
	chainId: "0xaef3",
	chainName: "Alfajores Testnet",
	nativeCurrency: { name: "Celo", symbol: "CELO", decimals: 18 },
	rpcUrls: ["https://alfajores-forno.celo-testnet.org"],
	blockExplorerUrls: ["https://alfajores-blockscout.celo-testnet.orgs"],
};

export const CreatorsContext = React.createContext(null);

export function CreatorsContextProvider({ children }) {
	const web3Context = useContext(Web3Context);
	const { account, wallet, provider, chainId } = web3Context;
	const [checkingUserRegistered, setCheckingUserRegistered] = useState(false);
	const [creatorAddress, setCreatorAddress] = useState(null);
	const [creator, setCreator] = useState({});
	const [creatorRegistered, setCreatorRegistered] = useState(false);
	const [userRegistered, setUserRegistered] = useState(null);

	useEffect(() => {
		if (chainId === validNetworkOptions.chainId && account !== null) {
			setCheckingUserRegistered(true);
			const init = async () => {
				async function checkUserRegistered() {
					let result = await isUserRegistered(wallet);
					return result;
				}

				checkUserRegistered().then((result) => {
					setUserRegistered(result);
					setCheckingUserRegistered(false);
				});
			};
			init();
		}
	}, [account, chainId]);

	useEffect(() => {
		if (
			userRegistered !== null &&
			userRegistered !== false &&
			wallet !== null
		) {
			(async function () {
				let result = await getCreatorAddressBySenderUsingSigner();
				setCreatorAddress(result);
			})();
		}
	}, [userRegistered]);

	async function getCreatorAddressBySenderUsingSigner() {
		let result = await getCreatorAddressBySender(wallet);
		return result;
	}

	useEffect(() => {
		if (creatorAddress !== null && wallet !== null && provider != null) {
			async function getCreatorObjUsingSigner() {
				getCreatorObjFromAddress(wallet, creatorAddress, provider).then(
					(result) => {
						setCreator(result);
					}
				);
			}
			getCreatorObjUsingSigner();
		}
	}, [creatorAddress]);

	useEffect(() => {
		if (creatorRegistered == true) {
			(async function () {
				let result = await getCreatorAddressBySenderUsingSigner(wallet);
				setCreatorAddress(result);
				setCreatorRegistered(false);
				setUserRegistered(true);
			})();
		}
	}, [creatorRegistered]);

	async function getCreatorAddressFromUsername(username) {
		let result = await getCreatorAddressByUsername(wallet, username);
		return result;
	}

	async function registerCreator(creator) {
		const tx = await registerUser(wallet, creator);
		await tx.wait();
		setCreatorRegistered(true);
	}

	async function checkUserRegistered() {
		let result = await isUserRegistered(wallet);
		return result;
	}

	return (
		<CreatorsContext.Provider
			value={{
				checkingUserRegistered,
				creatorAddress,
				creator,
				userRegistered,
				getCreatorAddressFromUsername,
				registerCreator,
				checkUserRegistered,
			}}
		>
			{children}
		</CreatorsContext.Provider>
	);
}
