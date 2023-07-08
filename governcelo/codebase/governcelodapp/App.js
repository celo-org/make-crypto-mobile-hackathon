import 'react-native-gesture-handler';

import * as React from 'react';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import Proposals from './Proposals';
import LoginPage from './OAuth/LoginPage';
import NewCIP from './NewCIP';
import NewCGP from './NewCGP';
import { WalletConnectModal } from '@walletconnect/modal-react-native';
import { PROJECT_ID, PROJECT_NAME, PROJECT_DESCRIPTION } from '@env';

const Stack = createStackNavigator();

const providerMetadata = {
	name: PROJECT_NAME,
	description: PROJECT_DESCRIPTION,
	url: 'https://celo.org'
};


export default class App extends React.Component {
	render() {
		return (
			<>
			<NavigationContainer>
				<Stack.Navigator>
					<Stack.Screen name="Proposals" component={Proposals} options={{ headerShown: false }} />
					<Stack.Screen name="NewCIP" component={NewCIP} options={{ title: 'New Proposal' }} />
					<Stack.Screen name="NewCGP" component={NewCGP} options={{ title: 'New Proposal' }} />
					<Stack.Screen name="Sign In" component={LoginPage} />
				</Stack.Navigator>
			</NavigationContainer>
			<WalletConnectModal projectId={PROJECT_ID} providerMetadata={providerMetadata} />
			</>
		);
	}
}
