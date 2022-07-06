import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View, AppState, TouchableOpacity, Image, Linking } from 'react-native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import { Octicons } from '@expo/vector-icons';
import * as Clipboard from 'expo-clipboard';
import axios from 'axios';
import {CLIENT_ID} from '@env';
import * as SecureStore from 'expo-secure-store';
import BackgroundTimer from 'react-native-background-timer';
import LoginModal from './LoginModal';
import SnackBar from 'react-native-snackbar-component';

export default class LoginPage extends React.Component{

  state = {
    view2visible: false,
    view3visible: false,
    getcodedisabled: false,
    copied: "",
    onlyurl: "",
    expiry: 0,
    usercode: "",
    showcheckinglogin: false,
    view1timerchecked: false,
    view2timerchecked: false,
    ifshowsnackbar: false,
    snackbarmessage: "",
    snackbartimeexpired: false,
    snackbardevicecode: false,
    snackbardenied: false
  };

  componentDidMount = async () => {
    this._mounted = true;
    SecureStore.setItemAsync("mountedfortimer", "truue");
    let authstatus = await SecureStore.getItemAsync("oauthstatus");
    if (authstatus != null && authstatus === "pending") {
      
      SecureStore.setItemAsync("remoun_t", "true"); 
      
      this.funcafterremoun_tset();
      
    }
    else if (authstatus == null) {
      this.setState({getcodedisabled: false});
      
    }
  };

  funcafterremoun_tset = async () => {
    let afterremoun_tset = await SecureStore.getItemAsync("remoun_t");
    if (afterremoun_tset != null && afterremoun_tset === "true"){
      SecureStore.setItemAsync("firsttimerchec_k", "2");
      SecureStore.setItemAsync("secondtimerchec_k", "2");
      this.funcafterremoun_tset2();
    }
  }

  funcafterremoun_tset2 = async () => {
    let retrievedfirsttimerchec_k = await SecureStore.getItemAsync("firsttimerchec_k");
    let retrievedsecondtimerchec_k = await SecureStore.getItemAsync("secondtimerchec_k");

    if (retrievedfirsttimerchec_k != null && retrievedfirsttimerchec_k === "2" && 
    retrievedsecondtimerchec_k != null && retrievedsecondtimerchec_k === "2"){
      this.setState({getcodedisabled: false});
      let ifslowingdown = await SecureStore.getItemAsync("slowdowninterval");
      let intervalforcheck = Number(await SecureStore.getItemAsync("intervaltim_e")) + 1000;
      let intervalforcheckslowdown = Number(await SecureStore.getItemAsync("slowdowninterval")) + 500;
      if (ifslowingdown != null && ifslowingdown.length != 0) {
        setTimeout(() => {
          this.forf_uncinterrupt();
        }, intervalforcheckslowdown);
      }
      else{
        setTimeout(() => {
          this.funcinterrupt(intervalforcheck);
        }, intervalforcheck);
      }
    }
  }

  funcgetcode = async () => {
    let authstatus = await SecureStore.getItemAsync("oauthstatus");
    if (authstatus == null){
      this.setState({getcodedisabled: true});

      if (this.state.getcodedisabled) {
        this.funcrequest();
      }
      
    }
    else if (authstatus != null && authstatus === "pending") {
      if (AppState.currentState === "active") {
        
        this.setState({showcheckinglogin: true});
        setTimeout(() => {
          this.setState({showcheckinglogin: false});
        },3000);
      }
      
    }
    
  };

  funcrequest = async () => {
    
    try {
      const response = await axios.post("https://github.com/login/device/code", {
          client_id: CLIENT_ID,
          scope: "repo:status, public_repo, read:user, user:email"
        }, {
          headers: {
            "Accept": "application/json" 
          }
      });

      if (response.data.hasOwnProperty('verification_uri') && response.data.hasOwnProperty('user_code') && response.data.hasOwnProperty('device_code')) {
        
        SecureStore.setItemAsync("user_code", response.data.user_code);
        SecureStore.setItemAsync("device_code", response.data.device_code);
        SecureStore.setItemAsync("verification_uri", response.data.verification_uri);
        
        let setintervaltime = ((response.data.interval * 1000) + 500).toString();
        SecureStore.setItemAsync("intervaltim_e", setintervaltime);
        
        this.setState({expiry: Math.trunc(response.data.expires_in / 60)});
        
      }
      else{
        console.log("invalid", "invalid response");
      }

    } 
    catch (error) {
      console.log("error", error);
    }

    let retrieveduser_code = await SecureStore.getItemAsync("user_code");
    let retrieveddevice_code = await SecureStore.getItemAsync("device_code");
    let retrievedverification_uri = await SecureStore.getItemAsync("verification_uri");

    if (retrieveduser_code != null && retrieveduser_code.length > 0
      && retrieveddevice_code != null && retrieveddevice_code.length > 0
      && retrievedverification_uri != null && retrievedverification_uri.length > 0) {
        
        this.funcstarttimer(retrieveduser_code, retrieveddevice_code, retrievedverification_uri);
        
    }
    
  }

  funcstarttimer = async (usercode_p, devicecode_p, verificationuri_p) => {
    
    let authstatus = await SecureStore.getItemAsync("oauthstatus");
    if (authstatus == null) {
      SecureStore.setItemAsync("oauthstatus", "pending");
      
      this.funcvarinterval(usercode_p, devicecode_p, verificationuri_p);
      
      this.funcusercode();
      this.funcurl();
      this.setState({view3visible: true});      

    }
    
  }

  funcvarinterval = async (usercode_p0, devicecode_p0, verificationuri_p0) => {    
    
    
    
    this.varinterval = BackgroundTimer.setInterval(() => {
      this.funcpoll(usercode_p0, devicecode_p0, verificationuri_p0);
      
    }, Number(await SecureStore.getItemAsync("intervaltim_e")));    
  }

  funcpoll = async (usercode_p1, devicecode_p1, verificationuri_p1) => {
    
    this.funcsetinterval();
    
    
    
    try {
      const pollresponse = await axios.post("https://github.com/login/oauth/access_token", {
        client_id: CLIENT_ID,
        device_code: devicecode_p1,
        grant_type: "urn:ietf:params:oauth:grant-type:device_code"
      }, {
        headers: {
          "Accept": "application/json" 
        }
      });
      
      
      if (pollresponse.data.hasOwnProperty('access_token')) {
        BackgroundTimer.clearInterval(this.varinterval);
        
        if (AppState.currentState === "active") {
          this.setState({usercode: ""});
        }
        
        SecureStore.deleteItemAsync("oauthstatus");
        SecureStore.deleteItemAsync("user_code");
        SecureStore.deleteItemAsync("device_code");
        SecureStore.deleteItemAsync("verification_uri");
        SecureStore.deleteItemAsync("intervaltim_e");
        
        let afterremoun_tset = await SecureStore.getItemAsync("remoun_t");
        let retrievedfirsttimerchec_k = await SecureStore.getItemAsync("firsttimerchec_k");
        let retrievedsecondtimerchec_k = await SecureStore.getItemAsync("secondtimerchec_k");
        if (afterremoun_tset != null){
          SecureStore.deleteItemAsync("remoun_t"); 
        }
        if (retrievedfirsttimerchec_k != null) {
          SecureStore.deleteItemAsync("firsttimerchec_k"); 
        }
        if (retrievedsecondtimerchec_k != null) {
          SecureStore.deleteItemAsync("secondtimerchec_k"); 
        }
        
        
        SecureStore.setItemAsync("patoken", pollresponse.data.access_token);
        
        this.props.navigation.navigate('Proposals');
        
      }
      else if (pollresponse.data.hasOwnProperty('error') && pollresponse.data.error === "slow_down") {
        
        BackgroundTimer.clearInterval(this.varinterval);
        
        let newpollinterval = (pollresponse.data.interval + 1) * 1000;
        
        SecureStore.setItemAsync("slowdowninterval", newpollinterval.toString());
        
        setTimeout(() => {
          SecureStore.deleteItemAsync("slowdowninterval"); 
          this.funcvarinterval(usercode_p1, devicecode_p1, verificationuri_p1);
        }, newpollinterval);
        

      }
      else if (pollresponse.data.hasOwnProperty('error') && pollresponse.data.error === "expired_token"){
        BackgroundTimer.clearInterval(this.varinterval);
        
        SecureStore.deleteItemAsync("oauthstatus");
        SecureStore.deleteItemAsync("user_code");
        SecureStore.deleteItemAsync("device_code");
        SecureStore.deleteItemAsync("verification_uri");
        SecureStore.deleteItemAsync("intervaltim_e");
        
        let afterremoun_tset = await SecureStore.getItemAsync("remoun_t");
        let retrievedfirsttimerchec_k = await SecureStore.getItemAsync("firsttimerchec_k");
        let retrievedsecondtimerchec_k = await SecureStore.getItemAsync("secondtimerchec_k");
        if (afterremoun_tset != null){
          SecureStore.deleteItemAsync("remoun_t"); 
        }
        if (retrievedfirsttimerchec_k != null) {
          SecureStore.deleteItemAsync("firsttimerchec_k"); 
        }
        if (retrievedsecondtimerchec_k != null) {
          SecureStore.deleteItemAsync("secondtimerchec_k"); 
        }
        
        
        if (AppState.currentState === "active") {
          this.setState({usercode: ""});
          this.setState({snackbartimeexpired: true});
        }
      }
      else if (pollresponse.data.hasOwnProperty('error') && pollresponse.data.error === "incorrect_device_code"){
        BackgroundTimer.clearInterval(this.varinterval);
        
        SecureStore.deleteItemAsync("oauthstatus");
        SecureStore.deleteItemAsync("user_code");
        SecureStore.deleteItemAsync("device_code");
        SecureStore.deleteItemAsync("verification_uri");
        SecureStore.deleteItemAsync("intervaltim_e");
        
        let afterremoun_tset = await SecureStore.getItemAsync("remoun_t");
        let retrievedfirsttimerchec_k = await SecureStore.getItemAsync("firsttimerchec_k");
        let retrievedsecondtimerchec_k = await SecureStore.getItemAsync("secondtimerchec_k");
        if (afterremoun_tset != null){
          SecureStore.deleteItemAsync("remoun_t"); 
        }
        if (retrievedfirsttimerchec_k != null) {
          SecureStore.deleteItemAsync("firsttimerchec_k"); 
        }
        if (retrievedsecondtimerchec_k != null) {
          SecureStore.deleteItemAsync("secondtimerchec_k"); 
        }
          
        if (AppState.currentState === "active") {
          this.setState({usercode: ""});
          this.setState({snackbardevicecode: true});
        }
      }
      else if (pollresponse.data.hasOwnProperty('error') && pollresponse.data.error === "access_denied"){
        BackgroundTimer.clearInterval(this.varinterval);

        SecureStore.deleteItemAsync("oauthstatus");
        SecureStore.deleteItemAsync("user_code");
        SecureStore.deleteItemAsync("device_code");
        SecureStore.deleteItemAsync("verification_uri");
        SecureStore.deleteItemAsync("intervaltim_e");
        
        let afterremoun_tset = await SecureStore.getItemAsync("remoun_t");
        let retrievedfirsttimerchec_k = await SecureStore.getItemAsync("firsttimerchec_k");
        let retrievedsecondtimerchec_k = await SecureStore.getItemAsync("secondtimerchec_k");
        if (afterremoun_tset != null){
          SecureStore.deleteItemAsync("remoun_t"); 
        }
        if (retrievedfirsttimerchec_k != null) {
          SecureStore.deleteItemAsync("firsttimerchec_k"); 
        }
        if (retrievedsecondtimerchec_k != null) {
          SecureStore.deleteItemAsync("secondtimerchec_k"); 
        }
        
        
        if (AppState.currentState === "active") {
          this.setState({usercode: ""});
          this.setState({snackbardenied: true});
        }
      }
    }
    catch (error) {
      console.log("pollerror", error);
    }
      

  }

  funcsetinterval = async () => {

    let afterremoun_tset = await SecureStore.getItemAsync("remoun_t");
    let retrievedfirsttimerchec_k = await SecureStore.getItemAsync("firsttimerchec_k");
    let retrievedsecondtimerchec_k = await SecureStore.getItemAsync("secondtimerchec_k");
    let retrievedmountedfortimer = await SecureStore.getItemAsync("mountedfortimer");
    
    
    if (afterremoun_tset != null && afterremoun_tset === "true" && retrievedmountedfortimer != null && retrievedmountedfortimer === "truue"){
      
      if (retrievedfirsttimerchec_k != null && retrievedfirsttimerchec_k === "2"
        && retrievedsecondtimerchec_k != null && retrievedsecondtimerchec_k === "2") {
          SecureStore.setItemAsync("firsttimerchec_k", "0");
      }
      else if (retrievedfirsttimerchec_k != null && retrievedfirsttimerchec_k === "0"
        && retrievedsecondtimerchec_k != null && retrievedsecondtimerchec_k === "2"){
          SecureStore.setItemAsync("secondtimerchec_k", "1");
      }
      else if (retrievedfirsttimerchec_k != null && retrievedfirsttimerchec_k === "0"
        && retrievedsecondtimerchec_k != null && retrievedsecondtimerchec_k === "1"){
          SecureStore.setItemAsync("firsttimerchec_k", "1");
          SecureStore.setItemAsync("secondtimerchec_k", "0");
      }
      else if (retrievedfirsttimerchec_k != null && retrievedfirsttimerchec_k === "1"
        && retrievedsecondtimerchec_k != null && retrievedsecondtimerchec_k === "0"){
          SecureStore.setItemAsync("firsttimerchec_k", "0");
          SecureStore.setItemAsync("secondtimerchec_k", "1");
        }
    }
    
    
  }

  funccopied = async () => {
    let retrieveduser_code = await SecureStore.getItemAsync("user_code");
    if (AppState.currentState === "active" && retrieveduser_code != null && retrieveduser_code.length != 0) {
      Clipboard.setString(retrieveduser_code);
      this.setState({copied: "copied!"});
      setTimeout(() => {
        this.setState({copied: ""});
      },2000);
    }
  }

  funcusercode = async () => {
    let retrieveduser_code = await SecureStore.getItemAsync("user_code");
    if (retrieveduser_code != null && retrieveduser_code.length != 0) {
      this.setState({usercode: retrieveduser_code});
      return retrieveduser_code;
    }
  }

  funcurl = async () => {
    let retrievedverification_uri = await SecureStore.getItemAsync("verification_uri");
    if (retrievedverification_uri != null && retrievedverification_uri.length != 0) {
      this.setState({onlyurl: retrievedverification_uri});
      return retrievedverification_uri;
    }
  }

  forf_uncinterrupt = async () => {
    let intervalforcheck = Number(await SecureStore.getItemAsync("intervaltim_e")) + 1000;
    
    setTimeout(() => {
      this.funcinterrupt(0);
    }, intervalforcheck);
  }

  funcinterrupt = async (ifnotmidstslowdownms) => {
    if (ifnotmidstslowdownms > 0) {
      //not a slow_down
    }
    
    
    let retrievedfirsttimerchec_k = await SecureStore.getItemAsync("firsttimerchec_k");
    let retrievedsecondtimerchec_k = await SecureStore.getItemAsync("secondtimerchec_k");
    if (retrievedfirsttimerchec_k != null && retrievedfirsttimerchec_k === "2" && 
      retrievedsecondtimerchec_k != null && retrievedsecondtimerchec_k === "2"){
      
      
      SecureStore.deleteItemAsync("oauthstatus"); 
      SecureStore.deleteItemAsync("user_code");
      SecureStore.deleteItemAsync("device_code");
      SecureStore.deleteItemAsync("verification_uri");
      SecureStore.deleteItemAsync("intervaltim_e");
      SecureStore.deleteItemAsync("firsttimerchec_k");
      SecureStore.deleteItemAsync("secondtimerchec_k");
      

      this.showwasinterrupted();
    }
    else if (retrievedfirsttimerchec_k != null && retrievedfirsttimerchec_k === "2") {
      setTimeout(() => {
        this.funcinterruptnested();
      }, Number(await SecureStore.getItemAsync("intervaltim_e")));
    }
    else if (retrievedsecondtimerchec_k != null && retrievedsecondtimerchec_k === "2") {
      setTimeout(() => {
        this.funcinterruptnested2nd();
      }, Number(await SecureStore.getItemAsync("intervaltim_e")));
    }
    else if (retrievedfirsttimerchec_k != null && 
      (retrievedfirsttimerchec_k === "0" || retrievedfirsttimerchec_k === "1") &&
      retrievedsecondtimerchec_k != null && 
      (retrievedsecondtimerchec_k === "0" || retrievedsecondtimerchec_k === "1")) {
        
        this.showstillrunning();
    }  
    
  }

  funcinterruptnested2nd = async () => {
    let a2ndretrievedfirsttimerchec_k = await SecureStore.getItemAsync("firsttimerchec_k");
    let a2ndretrievedsecondtimerchec_k = await SecureStore.getItemAsync("secondtimerchec_k");
    
    if (a2ndretrievedsecondtimerchec_k != null && a2ndretrievedsecondtimerchec_k === "2"){
          
      
      
      SecureStore.deleteItemAsync("oauthstatus"); 
      SecureStore.deleteItemAsync("user_code");
      SecureStore.deleteItemAsync("device_code");
      SecureStore.deleteItemAsync("verification_uri");
      SecureStore.deleteItemAsync("intervaltim_e");
      SecureStore.deleteItemAsync("firsttimerchec_k");
      SecureStore.deleteItemAsync("secondtimerchec_k");
      

      this.showwasinterrupted();          
    }
    else if (a2ndretrievedfirsttimerchec_k != null && 
      (a2ndretrievedfirsttimerchec_k === "0" || a2ndretrievedfirsttimerchec_k === "1") &&
      a2ndretrievedsecondtimerchec_k != null && 
      (a2ndretrievedsecondtimerchec_k === "0" || a2ndretrievedsecondtimerchec_k === "1")) {
        
        this.showstillrunning();
    }
  }

  funcinterruptnested = async () => {
    let a2ndretrievedfirsttimerchec_k = await SecureStore.getItemAsync("firsttimerchec_k");
    let a2ndretrievedsecondtimerchec_k = await SecureStore.getItemAsync("secondtimerchec_k");

    if (a2ndretrievedfirsttimerchec_k != null && a2ndretrievedfirsttimerchec_k === "2") {
      
      
      SecureStore.deleteItemAsync("oauthstatus"); 
      SecureStore.deleteItemAsync("user_code");
      SecureStore.deleteItemAsync("device_code");
      SecureStore.deleteItemAsync("verification_uri");
      SecureStore.deleteItemAsync("intervaltim_e");
      SecureStore.deleteItemAsync("firsttimerchec_k");
      SecureStore.deleteItemAsync("secondtimerchec_k");
      

      this.showwasinterrupted();
    }
    else if (a2ndretrievedfirsttimerchec_k != null && 
      (a2ndretrievedfirsttimerchec_k === "0" || a2ndretrievedfirsttimerchec_k === "1") &&
      a2ndretrievedsecondtimerchec_k != null && 
      (a2ndretrievedsecondtimerchec_k === "0" || a2ndretrievedsecondtimerchec_k === "1")) {
        
        this.showstillrunning();
    }
  }

  showwasinterrupted = async () => {
    let retrievedmountedfortimer = await SecureStore.getItemAsync("mountedfortimer");
    if(retrievedmountedfortimer != null && retrievedmountedfortimer === "truue"){
      this.setState({getcodedisabled: true});
      this.setState({ifshowsnackbar: true});
      this.setState({snackbarmessage: "Log-in was interrupted. You will need to start all over"});
    }
  }

  showstillrunning = async () => {
    let retrievedmountedfortimer = await SecureStore.getItemAsync("mountedfortimer");
    
    if (retrievedmountedfortimer != null && retrievedmountedfortimer === "truue") {
      this.setState({showcheckinglogin: false});
      this.setState({getcodedisabled: true});
      this.setState({view1timerchecked: true});
      this.setState({view2timerchecked: true});
      if (this.state.view1timerchecked && this.state.view2timerchecked) {
        this.funcusercode();
        this.funcurl();
        this.setState({view3visible: true});
      }
    }
  }

  componentWillUnmount = async () => {
    this._mounted = false;
    this.setState({usercode: ""});
    this.setState({onlyurl: ""});
    this.setState({expiry: 0});
    
    let retrievedfirsttimerchec_k = await SecureStore.getItemAsync("firsttimerchec_k");
    let retrievedsecondtimerchec_k = await SecureStore.getItemAsync("secondtimerchec_k");
    if (retrievedfirsttimerchec_k != null) {
      SecureStore.deleteItemAsync("firsttimerchec_k");
      SecureStore.setItemAsync("firsttimerchec_k", "2");
    }
    else{
      SecureStore.setItemAsync("firsttimerchec_k", "2");
    }
    if (retrievedsecondtimerchec_k != null){
      SecureStore.deleteItemAsync("secondtimerchec_k");
      SecureStore.setItemAsync("secondtimerchec_k", "2");
    }
    else{
      SecureStore.setItemAsync("secondtimerchec_k", "2");
    }
    SecureStore.deleteItemAsync("mountedfortimer");
    SecureStore.setItemAsync("mountedfortimer", "falsse");
    
  }

  render(){
    return (
      <View style={styles.container}>
        <StatusBar style="auto" translucent/>
        {this.state.view1timerchecked ? 
          <View style={{ marginBottom: '10%'}}></View>
          : 
          <View style={{ marginBottom: '10%'}}>
            <View style={{ paddingHorizontal: '5%', alignItems: 'center', justifyContent: 'center', flexDirection: 'row' }}>
              <Image source={require("./../assets/circle-solid.png")} style={{ resizeMode: 'center', width: 8, height: 8 }}/>
              <Text style={{paddingHorizontal: '5%', fontSize: 15}}>Before you continue, make sure you are logged in to GitHub from your browser.</Text>
            </View>
            
            {this.state.view2visible ? <></>
            : 
            <TouchableOpacity
              style={styles.buttonstep1}
              onPress={() => { this.setState({view2visible: true}) }}>
              <Text style={styles.buttontext}>Next</Text>
              <FontAwesome5 name={'arrow-down'} size={18} style={styles.arrowdown}/>
            </TouchableOpacity>
            }
          </View>
        }
        {this.state.view2timerchecked ?
          <View style={{ paddingHorizontal: '5%', alignItems: 'center', justifyContent: 'center', flexDirection: 'row' }}>
            <Text style={{paddingHorizontal: '5%', fontSize: 15}}>Continue</Text>
          </View>
        : 
          <View>
            {this.state.view2visible ? 
            <View style={styles.viewstep2}>
              <View style={{ paddingHorizontal: '5%', alignItems: 'center', justifyContent: 'center', flexDirection: 'row' }}>
                <Image source={require("./../assets/circle-solid.png")} style={{ resizeMode: 'center', width: 8, height: 8 }}/>
                <Text style={{paddingHorizontal: '5%', fontSize: 15}}>You will get a one time code that authorizes Governcelo.</Text>
              </View>
              {this.state.view3visible ? <></>
              :
              <TouchableOpacity
                style={styles.buttonstep2}
                onPress={() => this.funcgetcode()}
                disabled={this.state.getcodedisabled}> 
                <Text style={styles.buttontext}>Get Code</Text>
                <FontAwesome5 name={'arrow-down'} size={18} style={styles.arrowdown}/>
              </TouchableOpacity>
              }
            </View>
          : <></>}
          </View>
        }
          
        {this.state.showcheckinglogin ? 
          <LoginModal/>
        : <></>}
        {this.state.view3visible && this.state.usercode != null && this.state.usercode.length != 0 ?
          <View style={{ marginBottom: '10%'}}>
            <View style={{alignSelf: 'center', justifyContent: 'center', flexDirection: 'column', marginTop: '14%', marginBottom: '10%'}}>
              
              <View style={{ flexDirection: 'row', alignSelf: 'flex-end', marginBottom: 3 }}><Text style={{color: '#55bf7d'}}>{this.state.copied}</Text></View>
              <View style={{ flexDirection: 'row' }}>
                <Text style={{fontWeight: 'bold', fontSize: 25, marginRight: 14}}>{this.state.usercode}</Text>
                {this.state.usercode.length != 0 ? 
                  <TouchableOpacity onPress={() => this.funccopied()}>
                    <FontAwesome5 name="copy" size={24} style={{marginLeft: 7, marginRight: 7, marginTop: 4}}/>
                  </TouchableOpacity>
                : <></>}
              </View>
            </View>
            {this.state.usercode.length != 0 && this.state.onlyurl.length != 0 ?
              <TouchableOpacity
                style={styles.buttonstep3}
                onPress={() => Linking.openURL(this.state.onlyurl)}> 
                <Text style={styles.buttontext}>Enter Code</Text>
                <Octicons name="link-external" size={18} style={styles.arrowdown} />
              </TouchableOpacity> 
            : <></> }
            
            {this.state.usercode.length != 0 && this.state.onlyurl != null && this.state.onlyurl.length != 0 ? 
            <View style={{ paddingHorizontal: '5%'}}>
              <Text style={{ alignSelf: 'center', marginTop: '17%'}}>Use this code at </Text>
              <Text style={{ alignSelf: 'center'}}><Text style={{color: '#0000ff'}}>{this.state.onlyurl}</Text> ONLY</Text>
              {this.state.expiry > 0 ? <Text style={{ alignSelf: 'center'}}>This code expires after {this.state.expiry} minutes</Text> : <></>}
            </View>
            : <></>}
          </View>
        :<></>}
        
        <SnackBar
          visible={this.state.ifshowsnackbar} 
          textMessage={this.state.snackbarmessage} 
          messageStyle = {{marginRight: 7}}
          actionHandler={()=>{this.props.navigation.navigate('Proposals')}} 
          accentColor="#fcc16b"
          actionText="OK"/>
        <SnackBar
          visible={this.state.snackbartimeexpired} 
          textMessage="Your code has expired. You will need to start all over" 
          messageStyle = {{marginRight: 7}}
          actionHandler={()=>{this.props.navigation.navigate('Proposals')}} 
          accentColor="#fcc16b"
          actionText="OK"/>
        <SnackBar
          visible={this.state.snackbardevicecode} 
          textMessage="Please restart the Log-in" 
          messageStyle = {{marginRight: 7}}
          actionHandler={()=>{this.props.navigation.navigate('Proposals')}} 
          accentColor="#fcc16b"
          actionText="OK"/>
        <SnackBar
          visible={this.state.snackbardenied} 
          textMessage="You have denied Governcelo authorization" 
          messageStyle = {{marginRight: 7}}
          actionHandler={()=>{this.props.navigation.navigate('Proposals')}} 
          accentColor="#fcc16b"
          actionText="OK"/>
      </View>
    );
  }
  
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'stretch',
    paddingVertical: '15%',
    backgroundColor: '#ffffff'
  },
  buttonstep1: {
    alignSelf: 'flex-end',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    paddingHorizontal: 15,
    marginTop: 5,
    marginRight: '5%'
  },
  buttontext: {
    fontSize: 18, 
    fontWeight: 'bold',
    color: '#fcc16b'
  },
  arrowdown: {
    marginLeft: 5,
    color: '#fcc16b'
  },
  viewstep2: {
  },
  buttonstep2: {
    alignSelf: 'flex-end',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    paddingHorizontal: 15,
    marginTop: 5,
    marginRight: '5%'
  },
  buttonstep3: {
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 15,
    paddingVertical: 7,
    borderColor: '#fcc16b'
  }
});
