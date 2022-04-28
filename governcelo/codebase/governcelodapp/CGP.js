import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View, FlatList, Dimensions, TouchableOpacity } from 'react-native';
import { Octokit } from "@octokit/core";
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

export default class CGP extends React.Component{

  state = {
    listofPRs_data: []
  };

  componentDidMount = async () => {
    const octokit = new Octokit();

    try {
      const listofPRs_ = await octokit.request('GET /repos/{owner}/{repo}/pulls', {
        owner: 'celo-org',
        repo: 'governance'
      });

      this.setState({listofPRs_data: listofPRs_.data});
    } catch (error) {
      console.log("listofPRserror", error);
    }
    
  };

  render(){
    return (
      <View style={styles.containercgp}>
        <StatusBar style="auto" translucent/>
        <FlatList
          style={styles.flatliststyle}
          data={this.state.listofPRs_data}
          renderItem={({ item }) => {
            return (
              <View style={styles.aCGPstyle}>
                <Text style={styles.username}>{item.user.login}</Text>
                <Text style={styles.title}>{item.title}</Text>
                <Text>{item.body}</Text>
              </View>
            );
        }}/>    
        <TouchableOpacity style={styles.fab} onPress={() => this.props.navigation.navigate('New Proposal')}>
          <FontAwesome5 name={'pen'} size={20} color="#ffffff"/>
        </TouchableOpacity>    
        
      </View>
    );
  }
  
}

const styles = StyleSheet.create({
  containercgp: {
    flex: 1,
    backgroundColor: '#dddddd',
    alignItems: 'center',
    justifyContent: 'center'
  },
  flatliststyle: {
    backgroundColor: '#dddddd'
  },
  aCGPstyle: {
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
    right: '9.4%',
    width: 55,
    height: 55
  }
});
