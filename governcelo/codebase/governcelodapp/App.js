import 'react-native-gesture-handler';

import * as React from 'react';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';

import CIP from './CIP';
import CGP from './CGP';

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

function firstScreenStack({ navigation }) {
  return (
    <CIP/>
  );
}

function secondScreenStack({ navigation }) {
  return (
    <CGP/>
  );
}

function App() {
  return (
    <NavigationContainer>
      <Drawer.Navigator
        drawerContentOptions={{
          activeTintColor: '#e91e63',
          itemStyle: { marginVertical: 5 },
        }}>
        <Drawer.Screen
          name="Improvement Proposals"
          options={{ drawerLabel: 'Improvement Proposals' }}
          component={firstScreenStack} />
        <Drawer.Screen
          name="Governance Proposals"
          options={{ drawerLabel: 'Governance Proposals' }}
          component={secondScreenStack} />
      </Drawer.Navigator>
    </NavigationContainer>
  );
}

export default App;