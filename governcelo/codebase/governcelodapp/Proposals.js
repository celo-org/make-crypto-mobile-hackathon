import React from 'react';
import CIP from './CIP';
import CGP from './CGP';
import {createDrawerNavigator} from '@react-navigation/drawer';

const Drawer = createDrawerNavigator();

export default class Proposals extends React.Component {
  render() {
    return (
      <Drawer.Navigator
        drawerContentOptions={{ itemStyle: { marginVertical: 5 } }} initialRouteName="Improvement Proposals">
        <Drawer.Screen
          name="Improvement Proposals"
          options={{ drawerLabel: 'Improvement Proposals' }}
          component={CIP} />
        <Drawer.Screen
          name="Governance Proposals"
          options={{ drawerLabel: 'Governance Proposals' }}
          component={CGP} />
      </Drawer.Navigator>
    );
  }
}