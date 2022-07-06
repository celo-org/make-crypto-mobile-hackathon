import 'react-native-gesture-handler';

import * as React from 'react';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import Proposals from './Proposals';
import NewProposal from './NewProposal';
import LoginPage from './OAuth/LoginPage';

const Stack = createStackNavigator();


const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Proposals" component={Proposals} options={{ headerShown: false }}/>
        <Stack.Screen name="New Proposal" component={NewProposal} />
        <Stack.Screen name="Log In" component={LoginPage} />
      </Stack.Navigator>      
    </NavigationContainer>
  );
}

export default App;