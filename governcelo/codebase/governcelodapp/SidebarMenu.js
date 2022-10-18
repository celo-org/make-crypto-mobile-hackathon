import React from 'react';
import { SafeAreaView, View, StyleSheet, Image, Text, TouchableOpacity } from 'react-native';
import { DrawerItemList, getDrawerStatusFromState, DrawerItem } from '@react-navigation/drawer';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import { Octokit } from "@octokit/core";
import {Feather} from '@expo/vector-icons';
import * as SecureStore from 'expo-secure-store';
import { CLIENT_ID, CLIENT_SECRET } from '@env';
import { Buffer } from 'buffer';
 
export default class SidebarMenu extends React.Component{
  constructor(props) {
    super(props);
  }

  state = {
    logindisabled: true,
    loggedin: false,
    profilepicurl: "",
    username: "",
    showdenied: false
  }

  componentDidMount = async () => {
    
    this.props.navigation.addListener('state', () => {
      if (getDrawerStatusFromState(this.props.navigation.getState()) === "open") {
        this.validate();
      }
    });
  }

  validate = async () => {
    let retrievedpatoken = await SecureStore.getItemAsync("patoken");
    if (retrievedpatoken != null && retrievedpatoken.length > 0 ){
      try {
        const octokit = new Octokit();
        let basicAuth = Buffer.from(`${CLIENT_ID}:${CLIENT_SECRET}`).toString('base64');
        let response = await octokit.request('POST /applications/{client_id}/token', {
          headers: {
            authorization: `basic ${basicAuth}`
          },
          client_id: CLIENT_ID,
          access_token: retrievedpatoken
        });
        if(response.status === 200){
          this.profileview(retrievedpatoken);
        }
      } 
      catch (error) {
        SecureStore.deleteItemAsync("patoken"); 
        this.setState({loggedin: false});
        this.setState({profilepicurl: "", username: ""});
        this.setState({logindisabled: false});
        
        let retrievedpatoken = await SecureStore.getItemAsync("patoken");
        if (retrievedpatoken == null) {
          this.props.navigation.closeDrawer();
          this.props.iflogindenied_parent(true);
        }
      }
    }
    else{
      this.setState({loggedin: false});
      this.setState({profilepicurl: "", username: ""});
      this.setState({logindisabled: false});
    }
  }

  profileview = async (retrievedpatoken_) => {
    const octokit = new Octokit({
      auth: retrievedpatoken_
    });

    let user = await octokit.request('GET /user', {
      accept: 'application/vnd.github.v3+json'
    });
    
    if (user.status === 200) {
      this.setState({profilepicurl: user.data.avatar_url, username: user.data.login});
      this.setState({loggedin: true});
    }
    
  }

  logout = async () => {
    let retrievedpatoken = await SecureStore.getItemAsync("patoken");
    if (retrievedpatoken != null && retrievedpatoken.length > 0 ){
      const octokit = new Octokit();
      let basicAuth = Buffer.from(`${CLIENT_ID}:${CLIENT_SECRET}`).toString('base64');
      let logoutresponse = await octokit.request('DELETE /applications/{client_id}/token', {
        headers: {
          authorization: `basic ${basicAuth}`
        },
        client_id: CLIENT_ID,
        access_token: retrievedpatoken
      });
      
      if(logoutresponse.status === 204){
        SecureStore.deleteItemAsync("patoken"); 
        this.setState({loggedin: false});
        this.setState({profilepicurl: "", username: ""});
        this.setState({logindisabled: false});
        let retrievedpatoken2 = await SecureStore.getItemAsync("patoken");
        if (retrievedpatoken2 == null) {
          this.props.navigation.closeDrawer();
          this.props.loggedout_parent(true);
        }
      }
    }
  }
  
  render(){
    return (
      <SafeAreaView style={{flex: 1, marginTop: 30}}>
        
        <View style={styles.profile}>
          {this.state.loggedin ? 
          <View>
            <Image
              source={{uri: this.state.profilepicurl}}
              style={styles.profilepicture}
            />
            <Text style={styles.username}>{this.state.username}</Text>
          </View>
          : 
          <TouchableOpacity
            disabled={this.state.logindisabled}
            onPress={() => {this.props.navigation.navigate('Log In')}} 
            style={styles.loginbutton}>
              <FontAwesome5 name={'github'} size={20} style={{marginRight: 5}}/>
              <Text style={{marginLeft: 5}}>LOG IN</Text>
          </TouchableOpacity>
          }
        </View>
        <View style={styles.line}></View>
        <View style={{marginTop: 10}}>
          <DrawerItemList {...this.props} />
          {this.state.loggedin ?
           <DrawerItem icon={() => <Feather name={'log-out'} size={20} style={{color: '#808080'}} />} label="Log Out" onPress={() => this.logout()}/>
          : <></> }
          
        </View>
        
      </SafeAreaView>
    );
  }
};
 
const styles = StyleSheet.create({
  profilepicture: {
    resizeMode: 'center',
    width: 100,
    height: 100,
    borderRadius: 200,
    alignSelf: 'center',
    marginBottom: 5
  },
  profile: {
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10
  },
  username: { 
    fontWeight: 'bold',
    fontSize: 17,
  },
  line: {
    backgroundColor: '#dddddd',
    height: 1,
    width: '100%'
  },
  loginbutton: {
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 15,
    paddingVertical: 7,
    marginHorizontal: 10,
    marginVertical: 30
  }
});
