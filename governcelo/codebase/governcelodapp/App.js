import 'react-native-gesture-handler';

import * as React from 'react';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import Proposals from './Proposals';
import NewProposal from './NewProposal';
import LoginPage from './OAuth/LoginPage';
import NewCIP from './NewCIP';

const Stack = createStackNavigator();


export default class App extends React.Component{
  render(){
    return (
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Proposals" component={Proposals} options={{ headerShown: false }}/>
          <Stack.Screen name="New Proposal" component={NewProposal} />
          <Stack.Screen name="NewCIP" component={NewCIP} options={{title: 'New Proposal'}} />
          <Stack.Screen name="Log In" component={LoginPage} />
        </Stack.Navigator>      
      </NavigationContainer>
    );
  }
}
