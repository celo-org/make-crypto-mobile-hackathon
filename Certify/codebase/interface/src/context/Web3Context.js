import {
	createContext,
	useEffect,
	useState,
	useCallback,
	useMemo,
} from "react";
import Web3Modal from "web3modal";
import Web3 from "web3";
import abi from "../utils/contractABI";
import WalletConnectProvider from "@walletconnect/web3-provider";

const Web3Context = createContext({
	balance: null,
	error: null,
	loadWeb3Modal: () => {},
	logoutOfWeb3Modal: () => {},
	accountAddress: "",
	contract: null,
});

const providerOptions = {
	walletconnect: {
		package: WalletConnectProvider,
		options: {
			rpc: {
				44787: "https://alfajores-forno.celo-testnet.org/",
			},
		},
	},
};

const Web3ContextProvider = (props) => {
	const [network, setNetwork] = useState("0xaef3");
	const [provider, setProvider] = useState();
	const [signedInAddress, setSignedInAddress] = useState("");

	const web3Modal = useMemo(() => {
		return new Web3Modal({
			providerOptions: providerOptions,
		});
	}, [network]);

	const { web3, contract } = useMemo(() => {
		const web3 = new Web3(
			provider || "https://alfajores-forno.celo-testnet.org/"
		);
		const contract = new web3.eth.Contract(
			abi.abi,
			"0x2D031B84bd6cF242619Bd52542dDbCcb8556b90e"
		);
		return { web3, contract };
	}, [provider]);

	// Modal Controls - Connect and Disconnect Wallets
	const loadWeb3Modal = useCallback(async () => {
		const newProvider = await web3Modal.connect();
		console.log("Connected", newProvider);
		if (!!newProvider.wc) {
			setProvider(newProvider);
			setSignedInAddress(newProvider.accounts[0]);
		} else {
			setProvider(newProvider);
			setSignedInAddress(newProvider.selectedAddress);
		}
	}, [web3Modal]);
	const logoutOfWeb3Modal = useCallback(async () => {
		setSignedInAddress("");
		await web3Modal.clearCachedProvider();
		window.location.reload();
	}, [web3Modal]);

	useEffect(() => {
		console.log(provider);
		if (provider) {
			// Subscribe to accounts change
			provider.on("accountsChanged", (accounts) => {
				console.log("accountsChanged", accounts, provider);
			});
			// Subscribe to chainId change
			provider.on("chainChanged", (chainId) => {
				console.log("Provider Chain Changed", chainId, provider);
			});
			// Subscribe to provider connection
			provider.on("connect", (info) => {
				console.log("Provider Connected", info);
			});
			// Subscribe to provider disconnection
			provider.on("disconnect", (error) => {
				console.log("disconnect", error);
			});
		}
	}, [provider]);

	return (
		<Web3Context.Provider
			value={{
				loadWeb3Modal,
				logoutOfWeb3Modal,
				accountAddress: signedInAddress,
				setNetwork,
				contract,
				web3,
			}}>
			{props.children}
		</Web3Context.Provider>
	);
};

// export default Web3ContextProvider;
export { Web3Context, Web3ContextProvider as default };
