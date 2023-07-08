import { useWalletConnectModal } from "@walletconnect/modal-react-native";
import { Text } from "react-native";

function AccountAddress() {
	const { isConnected, address } = useWalletConnectModal();

	return isConnected ? <Text style={{ marginHorizontal: 20, marginTop: 20 }}>{address}</Text> : <></>;
};

export default AccountAddress;
