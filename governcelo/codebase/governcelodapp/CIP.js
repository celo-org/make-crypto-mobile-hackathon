import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View, FlatList, Dimensions, TouchableOpacity, Alert } from 'react-native';
import { Octokit } from "@octokit/core";
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import * as SecureStore from 'expo-secure-store';
import LoggedoutModal from './OAuth/LoggedoutModal';
import SnackBar from 'react-native-snackbar-component';

export default class CIP extends React.Component{

  state = {
    listofPRs_data: [],
    snackbarvisible: true,
    fabtop: 0.0,
    distance: 0.0
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
      this.props.navigation.navigate('NewCIP');
    }
    else{
      this.funcnotloggedin();
    }
  };

  componentDidMount = async () => {
    this._mounted = true;
    const octokit = new Octokit();
    this.setState({fabtop: 0.725 * (Dimensions.get('window').height)});

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
          }}
          ItemSeparatorComponent={() => <View style={{ height: 2, backgroundColor: '#dddddd'}}></View>}
          ListFooterComponent={() => <View></View>}
          ListFooterComponentStyle={{backgroundColor: '#ffffff', height: 0.15 * (Dimensions.get('window').height)}}/>
        
        {this.props.proploggedoutmodal && this._mounted ? <LoggedoutModal/> : <></> }
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
          <FontAwesome5 name={'pen'} size={20} color="#ffffff"/>
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
    flex: 1,
    backgroundColor: '#ffffff',
    alignItems: 'center',
    justifyContent: 'center'
  },
  flatliststyle: {
    backgroundColor: '#ffffff'
  },
  aCIPstyle: {
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
