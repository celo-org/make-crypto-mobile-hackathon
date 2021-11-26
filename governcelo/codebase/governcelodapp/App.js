import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View, FlatList } from 'react-native';
import { Octokit } from "@octokit/core";

export default class App extends React.Component{

  state = {
    listofPRs_data: []
  };

  componentDidMount = async () => {
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
    backgroundColor: '#dddddd',
    marginTop: 20
  },
  aCIPstyle: {
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
  }
});
