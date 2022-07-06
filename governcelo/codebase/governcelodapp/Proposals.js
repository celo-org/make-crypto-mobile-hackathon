import React from 'react';
import CIP from './CIP';
import CGP from './CGP';
import {createDrawerNavigator} from '@react-navigation/drawer';
import SidebarMenu from './SidebarMenu';
import * as SecureStore from 'expo-secure-store';

const Drawer = createDrawerNavigator();

export default class Proposals extends React.Component {
  state = {
    propdenymodal: false,
    proploggedoutmodal: false
  };

  componentDidMount = async () => {
    let retrievedpatoken = await SecureStore.getItemAsync("patoken");
    if (retrievedpatoken != null && retrievedpatoken.length > 0 ){
      let retrievedmountedfortimer = await SecureStore.getItemAsync("mountedfortimer");
      if (retrievedmountedfortimer != null && retrievedmountedfortimer.length > 0 ){
        SecureStore.deleteItemAsync("mountedfortimer"); 
      }
    }
  };

  iflogindenied_parent = async (denied) => {
    if (denied) {
      this.setState({propdenymodal: denied});
      if (this.state.propdenymodal) {
        setTimeout(() => {
          this.setState({propdenymodal: false});
        }, 5000);
      }
    }
  }

  loggedout_parent = async (loggedout) => {
    if (loggedout) {
      this.setState({proploggedoutmodal: loggedout});
      if (this.state.proploggedoutmodal) {
        setTimeout(() => {
          this.setState({proploggedoutmodal: false});
        }, 1500)
      }
    }
  }

  render() {
    return (
      <Drawer.Navigator
        screenOptions={{ itemStyle: { marginVertical: 5 } }} 
        initialRouteName="Improvement Proposals"
        drawerContent={
          (props) => <SidebarMenu 
            {...props} 
            iflogindenied_parent={this.iflogindenied_parent}
            loggedout_parent={this.loggedout_parent}/>
          }>
        <Drawer.Screen
          name="Improvement Proposals"
          options={{ drawerLabel: 'Improvement Proposals', drawerActiveTintColor: '#000000' }} >
            {(props) => <CIP {...props} propdenymodal={this.state.propdenymodal} proploggedoutmodal={this.state.proploggedoutmodal}/>}
        </Drawer.Screen>
        <Drawer.Screen
          name="Governance Proposals"
          options={{ drawerLabel: 'Governance Proposals', drawerActiveTintColor: '#000000' }} >
            {(props) => <CGP {...props} propdenymodal={this.state.propdenymodal} proploggedoutmodal={this.state.proploggedoutmodal}/>}
        </Drawer.Screen>
      </Drawer.Navigator>
    );
  }
}