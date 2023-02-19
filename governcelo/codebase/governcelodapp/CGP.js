import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View, FlatList, Dimensions, TouchableOpacity, Alert, RefreshControl, ActivityIndicator } from 'react-native';
import { Octokit } from "@octokit/core";
import * as SecureStore from 'expo-secure-store';
import LoggedoutModal from './OAuth/LoggedoutModal';
import SnackBar from 'react-native-snackbar-component';
import { MaterialCommunityIcons, AntDesign } from '@expo/vector-icons';
import NetInfo from "@react-native-community/netinfo";

export default class CGP extends React.Component{

  state = {
    listofPRs_data: [],
    snackbarvisible: true,
    fabtop: 0.0,
    distance: 0.0,
    refreshing: false,
    connected: false,
    reachable: false,
    fetching: false,
    weakconnection: false,
    fetchedcgps: false,
    validating: false,
    cannotfetch: false,
    firsttrial: true
  };

  funcnotloggedin = async () => {
    Alert.alert(
      "", 
      "Log in to make a proposal", 
      [ 
        {
          text: "DISMISS",
          onPress: () => {},
          style: "cancel"
        }
      ],
      {cancelable: true}
    );
  }

  ifloggedin = async () => {
    let retrievedpatoken = await SecureStore.getItemAsync("patoken");
    if (retrievedpatoken != null && retrievedpatoken.length > 0 ) {
      this.props.navigation.navigate('New Proposal');
    }
    else{
      this.funcnotloggedin();
    }
  };

  componentDidMount = async () => {
    this._mounted = true;
    this.setState({fabtop: 0.725 * (Dimensions.get('window').height)});

    NetInfo.fetch().then(state => {
      if (state.isConnected) {
        if (state.isInternetReachable) {
          this.setState({connected: state.isConnected, reachable: state.isInternetReachable});
          this.fetchcgps();
        }
        else{
          this.setState({connected: state.isConnected, reachable: state.isInternetReachable, firsttrial: false});
        }
      }
      else{
        this.setState({connected: state.isConnected, reachable: state.isInternetReachable, firsttrial: false});
      }
    });
    
  };

  fetchcgps = async () => {
    this.setState({fetchedcgps: false});
    const octokit = new Octokit();
    this.setState({validating: true});
    if (await this.validate(octokit)){
      this.setState({validating: false});
      this.setState({fetching: true});

      try {
        const listofPRs_ = await octokit.request('GET /repos/{owner}/{repo}/pulls', {
          owner: 'celo-org',
          repo: 'governance'
        });
  
        this.setState({listofPRs_data: listofPRs_.data});
        this.setState({fetching: false});
      } 
      catch (error) {
        console.log("listofPRserror", error);
        this.setState({fetching: false});
        this.setState({cannotfetch: true});
      }

      this.setState({firsttrial: false});
    }
    else if (this.state.weakconnection){
      this.setState({validating: false, firsttrial: false});
    }
    else{
      this.setState({validating: false, cannotfetch: true, firsttrial: false});
    }

    this.setState({fetchedcgps: true, refreshing: false});
  }

  validate = async (octokit) => {
    
    try {
      const celo = await octokit.request('GET /users/{username}', {
        username: 'celo-org'
      });
      if (celo.status === 200 && celo.data.id === 37552875){
        return true;
      }
      else{
        return false;
      }
    }
    catch (error) {
      if (error.toString() === "HttpError: Network request failed"){
        this.setState({weakconnection: true});
      }
      else{
        this.setState({cannotfetch: true});
      }
      return false;
    }
  }

  refresh = async () => {
    this.setState({weakconnection: false, cannotfetch: false, listofPRs_data: []});
    NetInfo.fetch().then(state => {
      if (state.isConnected) {
        if (state.isInternetReachable) {
          this.setState({connected: state.isConnected, reachable: state.isInternetReachable});
          this.fetchcgps();
        }
        else{
          this.setState({connected: state.isConnected, reachable: state.isInternetReachable, refreshing: false});
        }
      }
      else{
        this.setState({connected: state.isConnected, reachable: state.isInternetReachable, refreshing: false});
      }
    });
  }

  componentWillUnmount = async () => {
    this._mounted = false;
  }

  render(){
    return (
      <View style={styles.container}>
        <StatusBar style="auto" translucent/>
        <FlatList
          data={this.state.listofPRs_data}
          contentContainerStyle={this.state.listofPRs_data.length > 0 ? {} : styles.contentcontainerstyle}
          refreshControl={
            this.state.firsttrial ?
              <></>
            :
              <RefreshControl
                colors={["#55bf7d"]}
                tintColor={"#55bf7d"}
                refreshing={this.state.refreshing}
                onRefresh={() => {
                  this.setState({refreshing: true});
                  this.refresh();
                }}/>
          }
          ListEmptyComponent={
            <>
            <View style={{alignItems: 'center'}}>
              {this.state.connected && this.state.reachable ?
                this.state.validating ?
                  (<></>) 
                : (this.state.weakconnection ?
                    (<Text style={{color: "#fcc16b"}}>Pull down to refresh</Text>) 
                  : (this.state.cannotfetch ?
                      (<Text style={{color: "#fcc16b"}}>Pull down to refresh</Text>) 
                    : (this.state.fetching ?
                        (<></>) 
                      : (this.state.cannotfetch ?
                          (<Text style={{color: "#fcc16b"}}>Pull down to refresh</Text>) 
                        : (this.state.listofPRs_data.length == 0 && this.state.fetchedcgps ?
                            (<Text style={{color: "#fcc16b"}}>Pull down to refresh</Text>) 
                          : (<></>)))))) 
              : <Text style={{color: "#fcc16b"}}>Pull down to refresh</Text>}
            </View>
            {this.props.proploggedoutmodal && this._mounted ? <LoggedoutModal/> : <View style={{flex: 1}}></View>}
            <View style={{flex: 9, alignItems: 'center', justifyContent: 'center'}}>
              {this.state.connected ? 
                this.state.reachable ? 
                  (this.state.validating ?
                    (this.state.firsttrial ? (<ActivityIndicator size="large" color="#55bf7d"/>) : (<></>)) 
                  : (this.state.weakconnection ?
                      (
                      <>
                        <MaterialCommunityIcons name="connection" size={60} style={{color: "#fcc16b"}}/>
                        <Text style={{fontSize: 18, color: "#fcc16b"}}>Weak Connection</Text>
                      </>) 
                    : (this.state.cannotfetch ?
                        (
                        <>
                          <AntDesign name="exclamationcircleo" size={60} style={{color: "#fcc16b"}}/>
                          <Text style={{fontSize: 18, color: "#fcc16b"}}>Cannot Fetch Proposals</Text>
                        </>) 
                      : (this.state.fetching ?
                          (this.state.firsttrial ? (<ActivityIndicator size="large" color="#55bf7d"/>) : (<></>)) 
                        : (this.state.cannotfetch ?
                            (
                            <>
                              <AntDesign name="exclamationcircleo" size={60} style={{color: "#fcc16b"}}/>
                              <Text style={{fontSize: 18, color: "#fcc16b"}}>Cannot Fetch Proposals</Text>
                            </>) 
                          : (this.state.listofPRs_data.length == 0 && this.state.fetchedcgps ?
                              (
                              <>
                                <MaterialCommunityIcons name="file-cancel-outline" size={60} style={{color: "#fcc16b"}}/>
                                <Text style={{fontSize: 18, color: "#fcc16b"}}>No proposals at the moment</Text>
                              </>) 
                            : (<></>))))))) 
                : (
                  <>
                    <MaterialCommunityIcons name="connection" size={60} style={{color: "#fcc16b"}}/>
                    <Text style={{fontSize: 18, color: "#fcc16b"}}>No Server Connection</Text>
                  </>)
              : 
                <>
                  <MaterialCommunityIcons name="connection" size={60} style={{color: "#fcc16b"}}/>
                  <Text style={{fontSize: 18, color: "#fcc16b"}}>No Internet</Text>
                </>
              }
            </View>
            </>
          }
          renderItem={({ item }) => {
            return (
              <View style={styles.aCGPstyle}>
                <Text style={styles.username}>{item.user.login}</Text>
                <Text style={styles.title}>{item.title}</Text>
                <Text>{item.body}</Text>
              </View>
            );
          }}
          ItemSeparatorComponent={() => <View style={{ height: 2, backgroundColor: '#dddddd'}}></View>}
          ListFooterComponent={() => <View></View>}
          ListFooterComponentStyle={{backgroundColor: '#ffffff', height: 0.15 * (Dimensions.get('window').height)}}/>
        
        {this.props.proploggedoutmodal && this._mounted && this.state.listofPRs_data.length > 0 ? <LoggedoutModal/> : <></> }
        <TouchableOpacity 
          style={{
            justifyContent: "center",
            alignItems: "center",
            borderRadius: 35,
            position: "absolute",
            backgroundColor: '#999999',
            top: this.state.fabtop,
            right: '4.7%',
            width: 55,
            height: 55
          }} 
          onPress={
            () => {this.ifloggedin()}
          }>
          <MaterialCommunityIcons name="pencil" size={24} color="#ffffff" />
        </TouchableOpacity>    
        {this._mounted ? 
          <SnackBar
            visible={this.props.propdenymodal && this.state.snackbarvisible} 
            textMessage="Governcelo has been denied authorization. Please log in" 
            messageStyle = {{marginRight: 7}}
            actionHandler={() => this.setState({snackbarvisible: false})} 
            distanceCallback={(distance) => 
              this.props.propdenymodal && this.state.snackbarvisible ?
              this.setState({fabtop: this.state.fabtop - distance, distance: distance}) 
              :
              this.setState({fabtop: this.state.fabtop + this.state.distance, distance: 0.0})
            }
            accentColor="#fcc16b"
            actionText="OK"/>
        : <></>}
        
      </View>
    );
  }
  
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  contentcontainerstyle: {flex: 10, width: Dimensions.get('window').width},
  aCGPstyle: {
    width: Dimensions.get('window').width,
    backgroundColor: '#ffffff',
    paddingHorizontal: 15,
    paddingVertical: 5,
    borderRadius: 2,
    elevation: 10
  },
  username: {
    fontWeight: 'bold',
    fontSize: 15,
    color: '#808080'
  },
  title: { 
    fontWeight: 'bold',
    fontSize: 17,
    marginVertical: 9
  }
});
