import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View, FlatList, Dimensions, TouchableOpacity, Alert } from 'react-native';
import { Octokit } from "@octokit/core";
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import * as SecureStore from 'expo-secure-store';
import LogoutModal from './OAuth/LogoutModal';
import LoggedoutModal from './OAuth/LoggedoutModal';

export default class CIP extends React.Component{

  state = {
    listofPRs_data: []
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
    const octokit = new Octokit();

    try {
      const listofPRs_ = await octokit.request('GET /repos/{owner}/{repo}/pulls', {
        owner: 'celo-org',
        repo: 'celo-proposals'
      });
      
      this.setState({listofPRs_data: listofPRs_.data});
    } catch (error) {
      
      console.log("listofPRserror", error);
    }
    
  };

  componentWillUnmount = async () => {
    this._mounted = false;
  }

  render(){
    return (
      <View style={styles.container}>
        <StatusBar style="auto" translucent/>
        <FlatList
          style={styles.flatliststyle}
          data={this.state.listofPRs_data}
          renderItem={({ item }) => {
            return (
              <View style={styles.aCIPstyle}>
                <Text style={styles.username}>{item.user.login}</Text>
                <Text style={styles.title}>{item.title}</Text>
                <Text>{item.body}</Text>
              </View>
            );
        }}/>
        {this.props.propdenymodal && this._mounted ? <LogoutModal/> : <></> }
        {this.props.proploggedoutmodal && this._mounted ? <LoggedoutModal/> : <></> }
        <TouchableOpacity 
          style={styles.fab} 
          onPress={
            () => {this.ifloggedin()}
          }>
          <FontAwesome5 name={'pen'} size={20} color="#ffffff"/>
        </TouchableOpacity>
        
      </View>
    );
  }
  
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#dddddd',
    alignItems: 'center',
    justifyContent: 'center'
  },
  flatliststyle: {
    backgroundColor: '#dddddd'
  },
  aCIPstyle: {
    width: Dimensions.get('window').width,
    backgroundColor: '#ffffff',
    paddingHorizontal: 15,
    paddingVertical: 5,
    marginBottom: 2,
    borderRadius: 2,
    elevation: 10
  },
  username: {
    fontWeight: 'bold',
    fontSize: 15,
    color: 'grey'
  },
  title: { 
    fontWeight: 'bold',
    fontSize: 17,
    marginVertical: 9
  },
  fab: {
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 35,
    position: "absolute",
    backgroundColor: '#999999',
    bottom: '5.7%',
    right: '4.7%',
    width: 55,
    height: 55
  }
});
