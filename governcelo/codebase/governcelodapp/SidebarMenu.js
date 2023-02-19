import React from 'react';
import { SafeAreaView, View, StyleSheet, Image, Text, TouchableOpacity, ActivityIndicator } from 'react-native';
import { DrawerItemList, getDrawerStatusFromState, DrawerItem } from '@react-navigation/drawer';
import { Octokit } from "@octokit/core";
import {Feather, FontAwesome5} from '@expo/vector-icons';
import * as SecureStore from 'expo-secure-store';
import { CLIENT_ID, CLIENT_SECRET } from '@env';
import { Buffer } from 'buffer';
import NetInfo from "@react-native-community/netinfo";
 
export default class SidebarMenu extends React.Component{
  constructor(props) {
    super(props);
  }

  state = {
    logindisabled: true,
    loggedin: false,
    profilepicurl: "",
    username: "",
    showdenied: false,
    connected: false,
    reachable: false,
    validating: false,
    profilefetched: false,
    loggingout: false
  }

  componentDidMount = async () => {

    let retrievedpatoken = await SecureStore.getItemAsync("patoken");
    if (retrievedpatoken != null && retrievedpatoken.length > 0 ){
      this.setState({loggedin: true});
    }
    else{
      this.setState({logindisabled: false});
    }
    
    this.unsubscribe = NetInfo.addEventListener(state => {
      this.setState({connected: state.isConnected, reachable: state.isInternetReachable});

      if (this.state.connected) {
        if (this.state.reachable) {
          if (!this.state.validating) {
            this.validate();
          }
        }
        else{
          if (getDrawerStatusFromState(this.props.navigation.getState()) === "open"){
            
          }
        }
      }
      else{
        if (getDrawerStatusFromState(this.props.navigation.getState()) === "open"){
          
        }
      }
    });

    this.props.navigation.addListener('state', () => {
      if (getDrawerStatusFromState(this.props.navigation.getState()) === "open") {
        NetInfo.fetch().then(state => {
          this.setState({connected: state.isConnected, reachable: state.isInternetReachable});
          if (state.isConnected) {
            if (state.isInternetReachable) {
              if (!this.state.validating) {
                this.validate();
              }
            }
          }

        });
        
      }
    });
  }

  validate = async () => {
    this.setState({validating: true});
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
        else{
          this.setState({validating: false, profilefetched: false});
        }
      } 
      catch (error) {
        console.log("fetchprofile",error);
        if (error.toString() === "HttpError: Network request failed") {
          this.setState({validating: false, profilefetched: false});
        }
        else{
          SecureStore.deleteItemAsync("patoken"); 
          this.setState({loggedin: false});
          this.setState({profilepicurl: "", username: ""});
          this.setState({logindisabled: false});
          
          let retrievedpatoken = await SecureStore.getItemAsync("patoken");
          if (retrievedpatoken == null) {
            this.props.navigation.closeDrawer();
            this.props.iflogindenied_parent(true);
            this.setState({validating: false, profilefetched: false});
          }
        }
      }
    }
    else{
      this.setState({loggedin: false});
      this.setState({profilepicurl: "", username: ""});
      this.setState({logindisabled: false});
      this.setState({validating: false, profilefetched: false});
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
      this.setState({validating: false, profilefetched: true});
    }
    else{
      this.setState({validating: false, profilefetched: false});
    }
    
  }

  logout = async () => {
    await this.setState({loggingout: true});
    if (this.state.loggingout) {
      if (this.state.connected && this.state.reachable) {
        try {
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
            
            if(logoutresponse.hasOwnProperty('status') && logoutresponse.status === 204){
              SecureStore.deleteItemAsync("patoken"); 
              this.setState({loggedin: false, profilefetched: false});
              this.setState({profilepicurl: "", username: ""});
              this.setState({logindisabled: false});
              let retrievedpatoken2 = await SecureStore.getItemAsync("patoken");
              if (retrievedpatoken2 == null) {
                this.setState({loggingout: false});
                this.props.navigation.closeDrawer();
                this.props.loggedout_parent(true);
              }
            }
            else{
              this.setState({loggingout: false});
            }
          }
          else{
            this.setState({loggingout: false});
          }
        }
        catch (error) {
          if (error.toString() === "HttpError: Network request failed") {
            this.setState({loggingout: false});
          } 
          else {
            this.setState({loggingout: false});
          }
        }
      }
      else{
        this.setState({loggingout: false});
      }
    }
  }
  
  render(){
    return (
      <SafeAreaView style={{flex: 1, marginTop: 30}}>
        
        <View style={styles.profile}>
          {this.state.loggedin ?
            this.state.connected ? 
              (this.state.reachable ?
                (this.state.validating ?
                  (<ActivityIndicator style={{marginVertical: 54}} color="#55bf7d"/>) 
                : (this.state.profilefetched ? 
                    (
                      <View>
                        <Image
                          source={{uri: this.state.profilepicurl}}
                          style={styles.profilepicture}
                        />
                        <Text style={styles.username}>{this.state.username}</Text>
                      </View>
                    ) 
                  : (<Text style={{color: "#fcc16b", marginVertical: 54.5}}>Weak Connection</Text>)
                  )
                ) 
              : (<Text style={{color: "#fcc16b", marginVertical: 54.5}}>No Server Connection</Text>) 
              ) 
            : (<Text style={{color: "#fcc16b", marginVertical: 54.5}}>No Internet</Text>) 
          
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
            <DrawerItem 
              icon={() => <Feather name={'log-out'} size={20} style={{color: '#808080'}} />} 
              label="Log Out" 
              onPress={() => {
                if (!this.state.loggingout) {
                  this.logout()
                }
              }}/> 
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
