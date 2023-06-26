import { useWalletConnect } from "@walletconnect/react-native-dapp";
import Connect from "./Connect";
import Disconnect from "./Disconnect";
import { Text } from "react-native";
import React from "react";

const Connection = () => {
	const connector = useWalletConnect();

	return (
		connector.connected ?
		<Disconnect onPress={() => connector.killSession()}>
			<Text style={{ color: "#fcc16b", marginHorizontal: 2 }}>DISCONNECT WALLET</Text>
		</Disconnect>
		:
		<Connect onPress={() => connector.connect()}>
			<Text style={{ color: "#55bf7d", marginHorizontal: 2 }}>CONNECT WALLET</Text>
		</Connect>
	)
};

export default Connection;