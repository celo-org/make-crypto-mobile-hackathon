import { useWalletConnect } from "@walletconnect/react-native-dapp";
import { Text } from "react-native";

const AccountAddress = () => {
	const connector = useWalletConnect();

	return connector.connected ? <Text style={{ marginHorizontal: 20, marginTop: 20 }}>{connector.accounts[0]}</Text> : <></>;
};

export default AccountAddress;
