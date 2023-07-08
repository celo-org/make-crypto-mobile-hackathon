import { useWalletConnectModal } from "@walletconnect/modal-react-native";
import Connect from "./Connect";
import Disconnect from "./Disconnect";
import { Text } from "react-native";
import React from "react";

function Connection() {

	const { isConnected, open, provider } = useWalletConnectModal();

	return (
		isConnected ?
		<Disconnect onPress={() => provider.disconnect()}>
			<Text style={{ color: "#fcc16b", marginHorizontal: 2 }}>DISCONNECT WALLET</Text>
		</Disconnect>
		:
		<Connect onPress={open}>
			<Text style={{ color: "#55bf7d", marginHorizontal: 2 }}>CONNECT WALLET</Text>
		</Connect>
	)
};

export default Connection;