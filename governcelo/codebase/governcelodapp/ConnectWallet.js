import { useWalletConnect } from "@walletconnect/react-native-dapp";
import { Text, TouchableOpacity } from 'react-native';

export default function ConnectWallet() {
	const connector = useWalletConnect();

	return (
		<TouchableOpacity
			onPress={() => connector.connect()}
			style={{
				width: "55%",
				alignItems: 'center',
				justifyContent: 'center',
				borderWidth: 1,
				borderRadius: 5,
				borderColor: "#55bf7d",
				paddingVertical: 7,
				marginTop: 10
			}}>
			<Text style={{ color: "#55bf7d" }}>CONNECT WALLET</Text>
		</TouchableOpacity>
	);
};