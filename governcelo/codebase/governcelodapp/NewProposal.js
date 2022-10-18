import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, TextInput } from 'react-native';
import { CLIENT_ID, CLIENT_SECRET } from '@env';
import * as SecureStore from 'expo-secure-store';
import { Buffer } from 'buffer';
import { Octokit } from "@octokit/core";
import SnackBar from 'react-native-snackbar-component';
import { FontAwesome5 } from '@expo/vector-icons';

export default class NewProposal extends React.Component{

  state = {
    newbranchnum: 0,
    lastcommitsha: "",
    emailaddress: "",
    treesha: "",
    commitsha: "",
    owner_state: "",
    updaterefstr_state: "",
    defaultbranch_state: "",
    newbranchname: "",
    showlogout: false,
    makeproposaldisabled: false,
    showproposalnotmade: false,
    proposalsuccess: false
  };

  componentDidMount = async () => {
    
  };

  validate = async () => {
    this.setState({makeproposaldisabled: true});
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
          this.createbranch(retrievedpatoken);
        }
        else{
          this.setState({makeproposaldisabled: false, showproposalnotmade: true});
        }
      } 
      catch (error) {
        SecureStore.deleteItemAsync("patoken");
        
        let retrievedpatoken = await SecureStore.getItemAsync("patoken");
        if (retrievedpatoken == null) {
          this.setState({showlogout: true});
          if (this.state.showlogout) {
            setTimeout(() => {
              this.setState({makeproposaldisabled: false, showlogout: false});
            }, 5000);
          }
        }
      }
    }
    else if (retrievedpatoken == null) {
      this.setState({showlogout: true});
      if (this.state.showlogout) {
        setTimeout(() => {
          this.setState({makeproposaldisabled: false, showlogout: false});
        }, 5000);
      }
    }
  }
  
  createbranch = async (retrievedpatoken_) => {
    
    const octokit = new Octokit({
      auth: retrievedpatoken_
    });

    
    let user = await octokit.request('GET /user', {
      accept: 'application/vnd.github.v3+json'
    });
    let emails = await octokit.request('GET /user/emails', {
      accept: 'application/vnd.github.v3+json'
    })
    
    emails.data.forEach(email_ => {
      if (email_.visibility === "public" && email_.primary) {
        this.setState({emailaddress: email_.email})
      } 
      else if (email_.visibility === "public" && !email_.email.endsWith("@users.noreply.github.com") && ( this.state.emailaddress.endsWith("@users.noreply.github.com") || this.state.emailaddress.length == 0)){
        this.setState({emailaddress: email_.email})
      }
      else if (email_.email.endsWith("@users.noreply.github.com") && this.state.emailaddress.length == 0){
        this.setState({emailaddress: email_.email})
      }
    });

    let owner = user.data.login;
    this.setState({owner_state: user.data.login})

    //get a repo
    try {
      let repo = await octokit.request('GET /repos/{owner}/{repo}', {
        owner: owner,
        repo: 'make-crypto-mobile-hackathon'
      });
      
      if (repo.status === 200) {
        //get default branch 
        try {
          let defaultbranch = await octokit.request('GET /repos/{owner}/{repo}/branches/{branch}', {
            owner: owner,
            repo: 'make-crypto-mobile-hackathon',
            branch: repo.data.default_branch
          }); 
          this.setState({ lastcommitsha: defaultbranch.data.commit.sha, defaultbranch_state: repo.data.default_branch})
          
          
          //get branches
          let branches = await octokit.request('GET /repos/{owner}/{repo}/branches', {
            owner: owner,
            repo: 'make-crypto-mobile-hackathon'
          });
          
          let ownerdatestr = owner+'_'+new Date().toISOString().split('T')[0].replace(/-/g, "")
          branches.data.forEach(branch => {
            
            branch.name.startsWith(ownerdatestr) ?
            
            Number(branch.name.substr(ownerdatestr.length, branch.name.length - 1)) == NaN ? (this.setState({ newbranchnum: this.state.newbranchnum })) : (
              (Number(branch.name.substr(ownerdatestr.length, branch.name.length - 1)) + 1) > this.state.newbranchnum ? 
              (this.setState({ newbranchnum: Number(branch.name.substr(ownerdatestr.length, branch.name.length - 1)) + 1 }))
               : 
              (this.setState({ newbranchnum: this.state.newbranchnum }))
              

            )
            
            :
            this.setState({ newbranchnum: this.state.newbranchnum })
          });



        } catch (error) {
          console.log("defbrancherror", error);
        }
      }

    } catch (error) {
      console.log("repoerror", error);
    }
    

    let fullbranchname = owner+'_'+new Date().toISOString().split('T')[0].replace(/-/g, "")+this.state.newbranchnum
    this.setState({ newbranchname: fullbranchname })
    let refstr = 'refs/heads/'+fullbranchname
    

    try {
      let varnewbranch = await octokit.request('POST /repos/{owner}/{repo}/git/refs', {
        owner: owner,
        repo: 'make-crypto-mobile-hackathon',
        ref: refstr,
        sha: this.state.lastcommitsha
      });
      if(varnewbranch.status === 201){
        
        this.funccommitblob_step0(octokit, owner, refstr)
      }
      else{
        this.setState({makeproposaldisabled: false, showproposalnotmade: true});
      }
      
    } catch (error) {
      console.log("createbrancherror", error);
      this.setState({makeproposaldisabled: false, showproposalnotmade: true});
    }
    
  }

  funccommitblob_step0  = async (octokit_, owner_, refstr_) => {
    
    //blob 
    try {
      let commitblob = await octokit_.request('POST /repos/{owner}/{repo}/git/blobs', {
        accept: 'application/vnd.github.v3+json',
        owner: owner_,
        repo: 'make-crypto-mobile-hackathon',
        content: 'testcontent',        
        encoding: 'utf-8'        
      });
      if (commitblob.status === 201) {
        
        this.funccommittree_step1(commitblob.data.sha, refstr_, owner_, octokit_)
      }
      else{
        await octokit_.request('DELETE /repos/{owner}/{repo}/git/refs/{ref}', {
          owner: owner_,
          repo: 'make-crypto-mobile-hackathon',
          ref: refstr_
        })
        this.setState({makeproposaldisabled: false, showproposalnotmade: true});
      }
      
    } catch (error) {
      console.log("commitbloberror", error);
      this.setState({makeproposaldisabled: false, showproposalnotmade: true});
    }
    
  }

  funccommittree_step1 = async (commitblobsha_, updaterefs_refstr, owner_tree, octokit_tree) => {
    
    //tree 
    try {
      let vartreecommit = await octokit_tree.request('POST /repos/{owner}/{repo}/git/trees', {
        accept: 'application/vnd.github.v3+json',
        owner: owner_tree,
        repo: 'make-crypto-mobile-hackathon',
        base_tree: this.state.lastcommitsha,
        tree: [
          {
            path: 'newfile1.txt',
            mode: '100644',
            type: 'blob',
            sha: commitblobsha_
          }
        ]       
      });

      
      if (vartreecommit.status === 201) {
        this.setState({ treesha: vartreecommit.data.sha })
        this.funccommitauthor_step2(updaterefs_refstr, octokit_tree)
      } 
      else {
        
        await octokit_tree.request('DELETE /repos/{owner}/{repo}/git/refs/{ref}', {
          owner: owner_tree,
          repo: 'make-crypto-mobile-hackathon',
          ref: updaterefs_refstr
        })
        this.setState({makeproposaldisabled: false, showproposalnotmade: true});
      }
      

    } catch (error) {
      console.log("committreeerror", error);
      this.setState({makeproposaldisabled: false, showproposalnotmade: true});
    }
    
  }

  funccommitauthor_step2 = async (updaterefs_refstr_, octokit_author) => {
    //authoring
    try {
      let var_commit = await octokit_author.request('POST /repos/{owner}/{repo}/git/commits', {
        owner: this.state.owner_state,
        repo: 'make-crypto-mobile-hackathon',
        message: 'new file',
        author: {
          name: this.state.owner_state,
          email: this.state.emailaddress
        },
        parents: [this.state.lastcommitsha],
        tree: this.state.treesha
      });

      
      if (var_commit.status === 201) {
        this.setState({ commitsha: var_commit.data.sha, updaterefstr_state: updaterefs_refstr_ })
        this.funccommitrefs_step3(octokit_author)
      } 
      else {
        
        await octokit_author.request('DELETE /repos/{owner}/{repo}/git/refs/{ref}', {
          owner: this.state.owner_state,
          repo: 'make-crypto-mobile-hackathon',
          ref: this.state.updaterefstr_state
        })
        this.setState({makeproposaldisabled: false, showproposalnotmade: true});
      }
      

    } catch (error) {
      console.log("commit_error", error);
      this.setState({makeproposaldisabled: false, showproposalnotmade: true});
    }

    
  }

  funccommitrefs_step3 = async (octokit_updaterefs) => {
    try {
      let updaterefs = await octokit_updaterefs.request('POST /repos/{owner}/{repo}/git/'+this.state.updaterefstr_state, {
        owner: this.state.owner_state,
        repo: 'make-crypto-mobile-hackathon',
        ref: this.state.updaterefstr_state,        
        sha: this.state.commitsha        
      });
      
      if (updaterefs.status === 200) {
        this.funcmakePR(octokit_updaterefs);
      } 
      else {
        
        await octokit_updaterefs.request('DELETE /repos/{owner}/{repo}/git/refs/{ref}', {
          owner: this.state.owner_state,
          repo: 'make-crypto-mobile-hackathon',
          ref: this.state.updaterefstr_state
        })
        this.setState({makeproposaldisabled: false, showproposalnotmade: true});
      }
    } catch (error) {
      console.log("updaterefserror", error);
      this.setState({makeproposaldisabled: false, showproposalnotmade: true});
    }
  }

  //PR after commit is made
  funcmakePR = async (octokit_PR) => {
    try {
      let proposal = await octokit_PR.request('POST /repos/{owner}/{repo}/pulls', {
        owner: this.state.owner_state,
        repo: "make-crypto-mobile-hackathon",
        title: "test title",
        body: "test description",
        base: this.state.defaultbranch_state,  
        head: this.state.newbranchname
      });

      if (proposal.status === 201) {
        this.setState({proposalsuccess: true});
        setTimeout(() => {
          this.setState({makeproposaldisabled: false});
          this.setState({proposalsuccess: false});
        }, 5000);
      }
      else{
        this.setState({makeproposaldisabled: false, showproposalnotmade: true});
      }
      
      
    } catch (error) {
      console.log("makePRerror", error);
      this.setState({makeproposaldisabled: false, showproposalnotmade: true});
    }
  }

  render(){
    return (
      <View style={styles.container}>
        <StatusBar style="auto" translucent/>
        <TextInput style={styles.txtinputtitle} placeholder="test title" editable={false}/>
        <TextInput 
          style={styles.txtinputdescription} 
          placeholder="test description" 
          editable={false}
          multiline
          numberOfLines={10}
          textAlignVertical={'top'}/>
        {this.state.proposalsuccess ?
          <TouchableOpacity disabled={true} style={styles.styleproposalsuccess}>
            <FontAwesome5 name="check" size={24} color="#55bf7d" />
          </TouchableOpacity>
        : 
          <TouchableOpacity disabled={this.state.makeproposaldisabled} onPress={() => this.validate()} style={styles.makeprbutton}>
            <Text style={styles.txtmakepr}>MAKE PROPOSAL</Text>
          </TouchableOpacity> 
        }
        <SnackBar
          visible={this.state.showlogout} 
          textMessage="Governcelo has been denied authorization. Please log in" 
          messageStyle = {{marginRight: 7}}
          actionHandler={()=>{
            this.setState({makeproposaldisabled: false, showlogout: false});
          }} 
          accentColor="#fcc16b"
          actionText="OK"/>
        <SnackBar
          visible={this.state.showproposalnotmade} 
          textMessage="The proposal could not be made. Please try again." 
          messageStyle = {{marginRight: 7}}
          actionHandler={()=>{
            this.setState({showproposalnotmade: false});
          }} 
          accentColor="#fcc16b"
          actionText="OK"/>
        <SnackBar
          visible={this.state.proposalsuccess} 
          textMessage="Proposal made successfuly"
          actionHandler={()=>{}}
          accentColor="#55bf7d"
          actionText="OK" />
      </View>
    );
  }
  
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#ffffff'
  },
  txtinputtitle: {
    borderColor: "#999999",
    borderWidth: 1,
    paddingHorizontal: 2,
    paddingVertical: 2,
    borderRadius: 5,
    marginVertical: 5,
    width: '70%'
  },
  txtinputdescription: {
    justifyContent: "flex-start",
    borderColor: "#999999",
    borderWidth: 1,
    paddingHorizontal: 5,
    paddingVertical: 5,
    borderRadius: 5,
    marginVertical: 5,
    width: '70%'
  },
  makeprbutton: {
    backgroundColor: "#55bf7d",
    borderRadius: 5,
    paddingHorizontal: 35,
    paddingVertical: 10,
    marginVertical: 5
  },
  txtmakepr: {
    color: '#ffffff',
    fontSize: 13
  },
  styleproposalsuccess: {
    borderRadius: 5, 
    borderColor: "#55bf7d", 
    borderWidth: 1, 
    marginVertical: 5,
    paddingHorizontal: 75,
    paddingVertical: 5
  }
});
