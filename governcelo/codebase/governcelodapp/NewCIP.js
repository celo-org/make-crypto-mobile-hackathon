import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, TextInput, Dimensions, VirtualizedList, Alert } from 'react-native';
import { CLIENT_ID, CLIENT_SECRET } from '@env';
import * as SecureStore from 'expo-secure-store';
import { Buffer } from 'buffer';
import { Octokit } from "@octokit/core";
import SnackBar from 'react-native-snackbar-component';
import { FontAwesome5, AntDesign } from '@expo/vector-icons';
import { List } from 'react-native-paper';
import CIPSuccessModal from './CIP/CIPSuccessModal';

export default class NewCIP extends React.PureComponent{

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
    proposalsuccess: false,
    proptestcases: [{testcaseno: 0, testcasetxt: ""}],
    slicedtestcases: [{testcaseno: 0, testcasetxt: ""}],
    rerender: false,
    showall: false,
    currenttestcase: "",
    expandtypelist: false,
    typeofproposal: "",
    standardstrack: "",
    meta: "",
    informational: "",
    title: "",
    discussionsto: "",
    category: "Category Ring",
    simplesummary: "",
    cipsrequired: "",
    cipstoreplace: "",
    abstract: "",
    motivation: "",
    specification: "",
    rationale: "",
    backwardscompatibility: "",
    implementation: "",
    securityconsiderations: "",
    requiredfields: false,
    forkedrepo: ""
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
        owner: this.state.forkedrepo.split('/')[0],
        repo: this.state.forkedrepo.split('/')[1]
      });
      
      if (repo.status === 200) {
        //get default branch 
        try {
          let defaultbranch = await octokit.request('GET /repos/{owner}/{repo}/branches/{branch}', {
            owner: this.state.forkedrepo.split('/')[0],
            repo: this.state.forkedrepo.split('/')[1],
            branch: repo.data.default_branch
          }); 
          this.setState({ lastcommitsha: defaultbranch.data.commit.sha, defaultbranch_state: repo.data.default_branch})
          
          
          //get branches
          let branches = await octokit.request('GET /repos/{owner}/{repo}/branches', {
            owner: this.state.forkedrepo.split('/')[0],
            repo: this.state.forkedrepo.split('/')[1]
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
        owner: this.state.forkedrepo.split('/')[0],
        repo: this.state.forkedrepo.split('/')[1],
        ref: refstr,
        sha: this.state.lastcommitsha
      });
      if(varnewbranch.status === 201){
        
        this.funccommitblob_step0(octokit, refstr)
      }
      else{
        this.setState({makeproposaldisabled: false, showproposalnotmade: true});
      }
      
    } catch (error) {
      console.log("createbrancherror", error);
      this.setState({makeproposaldisabled: false, showproposalnotmade: true});
    }
    
  }

  funccommitblob_step0  = async (octokit_, refstr_) => {
    
    //blob 
    try {
      let commitblob = await octokit_.request('POST /repos/{owner}/{repo}/git/blobs', {
        accept: 'application/vnd.github.v3+json',
        owner: this.state.forkedrepo.split('/')[0],
        repo: this.state.forkedrepo.split('/')[1],
        content: await this.cipcontent(),        
        encoding: 'utf-8'        
      });
      if (commitblob.status === 201) {
        
        this.funccommittree_step1(commitblob.data.sha, refstr_, octokit_)
      }
      else{
        await octokit_.request('DELETE /repos/{owner}/{repo}/git/refs/{ref}', {
          owner: this.state.forkedrepo.split('/')[0],
          repo: this.state.forkedrepo.split('/')[1],
          ref: refstr_
        })
        this.setState({makeproposaldisabled: false, showproposalnotmade: true});
      }
      
    } catch (error) {
      console.log("commitbloberror", error);
      this.setState({makeproposaldisabled: false, showproposalnotmade: true});
    }
    
  }

  funccommittree_step1 = async (commitblobsha_, updaterefs_refstr, octokit_tree) => {
    
    //tree 
    try {
      let vartreecommit = await octokit_tree.request('POST /repos/{owner}/{repo}/git/trees', {
        accept: 'application/vnd.github.v3+json',
        owner: this.state.forkedrepo.split('/')[0],
        repo: this.state.forkedrepo.split('/')[1],
        base_tree: this.state.lastcommitsha,
        tree: [
          {
            path: 'CIPs/cip-draft_'+await this.abbrevfunc()+'.md',
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
          owner: this.state.forkedrepo.split('/')[0],
          repo: this.state.forkedrepo.split('/')[1],
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
        owner: this.state.forkedrepo.split('/')[0],
        repo: this.state.forkedrepo.split('/')[1],
        message: 'new CIP',
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
          owner: this.state.forkedrepo.split('/')[0],
          repo: this.state.forkedrepo.split('/')[1],
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
        owner: this.state.forkedrepo.split('/')[0],
        repo: this.state.forkedrepo.split('/')[1],
        ref: this.state.updaterefstr_state,        
        sha: this.state.commitsha        
      });
      
      if (updaterefs.status === 200) {
        this.funcmakePR(octokit_updaterefs);
      } 
      else {
        
        await octokit_updaterefs.request('DELETE /repos/{owner}/{repo}/git/refs/{ref}', {
          owner: this.state.forkedrepo.split('/')[0],
          repo: this.state.forkedrepo.split('/')[1],
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
      let repo = await octokit_PR.request('GET /repos/{owner}/{repo}', {
        owner: 'celo-org',
        repo: 'celo-proposals'
      });
      if (repo.status === 200) {
        try {
          let proposal = await octokit_PR.request('POST /repos/{owner}/{repo}/pulls', {
            owner: 'celo-org',
            repo: "celo-proposals",
            title: this.state.title,
            body: this.state.simplesummary,
            base: repo.data.default_branch,
            head: this.state.forkedrepo.split('/')[0]+":"+this.state.newbranchname
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
    } 
    catch (error) {
      console.log("prdefaultbrancherror",error);
    }
    
  }

  abbrevfunc = async () => {
    let nextcharstartsword = false;
    let abbrev = "";
    for (let i = 0; i < this.state.title.length; i++) {
      if (i == 0) {
        if (this.state.title.substr(0, 1).match(/\w/) != null){
          abbrev = this.state.title.substr(0, 1).toUpperCase();
        }
        else{
          abbrev = "_"
        }
      }
    
      if (nextcharstartsword) {
        
        if (this.state.title.charAt(i).match(/\w/) != null) {
          abbrev = abbrev + this.state.title.charAt(i).toUpperCase()
        }
        else{
          abbrev = abbrev + "_"
        }
      }
    
      if (this.state.title.charAt(i) === " ") {
        nextcharstartsword = true;
      }
      else{
        nextcharstartsword = false;
      }

      if (i + 1 === this.state.title.length) {
        return abbrev;
      }
    
    }
  }

  cipcontent = async () => {
    if (this.state.proptestcases.length > 1) {
      let alltestcases = "";
      for (let i = 0; i < this.state.proptestcases.length; i++) {
        if (this.state.proptestcases[i].testcasetxt.length > 0) {
          alltestcases = alltestcases + this.state.proptestcases[i].testcasetxt+"\n";
        }
        
        if (i + 1 === this.state.proptestcases.length) {
          let categorystr = this.state.typeofproposal === "Standards Track" ? "category: "+this.state.category+"\n" : "";
          
          let proposalcontent = 
          "---\n"
          +"cip:\n"
          +"title: "+this.state.title+"\n"
          +"author: "+this.state.owner_state+" (@"+this.state.owner_state+")\n"
          +"discussions-to: "+this.state.discussionsto+"\n"
          +"status: Draft\n"
          +"type: "+this.state.typeofproposal+"\n"
          +categorystr
          +"created: "+new Date().toISOString().split('T')[0]+"\n"
          +"requires: "+this.state.cipsrequired+"\n"
          +"replaces: "+this.state.cipstoreplace+"\n"
          +"license: Apache 2.0\n"
          +"---\n"
          +"## Simple Summary\n"
          +this.state.simplesummary+"\n"
          +"\n"
          +"## Abstract\n"
          +this.state.abstract+"\n"
          +"\n"
          +"## Motivation\n"
          +this.state.motivation+"\n"
          +"\n"
          +"## Specification\n"
          +this.state.specification+"\n"
          +"\n"
          +"## Rationale\n"
          +this.state.rationale+"\n"
          +"\n"
          +"## Backwards Compatibility\n"
          +this.state.backwardscompatibility+"\n"
          +"\n"
          +"## Test Cases\n"
          +alltestcases
          +"\n"
          +"## Implementation\n"
          +this.state.implementation+"\n"
          +"\n"
          +"## Security Considerations\n"
          +this.state.securityconsiderations+"\n"
          +"\n"
          +"## License\n"
          +"This work is licensed under the Apache License, Version 2.0.\n";
          return proposalcontent;
          
        }
        
      }
    }
    
    
  }

  required = async () => {
    if (this.state.title.length > 0 
      && this.state.discussionsto.length > 0
      && this.state.simplesummary.length > 0
      && this.state.abstract.length > 0
      && this.state.motivation.length > 0
      && this.state.specification.length > 0
      && this.state.rationale.length > 0
      && this.state.backwardscompatibility.length > 0
      && this.state.securityconsiderations.length > 0
      && this.state.proptestcases.length > 1
      && (this.state.typeofproposal === "Meta" || this.state.typeofproposal === "Informational" || 
        (this.state.typeofproposal === "Standards Track" && this.state.category != "Category Ring"))) {
      
      if (this.state.forkedrepo.length == 0) {
        this.alertcreatefork();
      } 
      else {
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
            if (response.status === 200) {
              try {
                const octokit = new Octokit({
                  auth: retrievedpatoken
                });
                let repo = await octokit.request('GET /repos/{owner}/{repo}', {
                  owner: this.state.forkedrepo.split('/')[0],
                  repo: this.state.forkedrepo.split('/')[1]
                });
                if (repo.status === 200) {
                  this.validate();
                } else {
                  this.alertcreatefork();
                }
              } 
              catch (error) {
                this.setState({forkedrepo: ""});
                this.alertcreatefork();
              }
            }
          } 
          catch (error) {
            SecureStore.deleteItemAsync("patoken");
            
            let retrievedpatoken = await SecureStore.getItemAsync("patoken");
            if (retrievedpatoken == null) {
              this.setState({showlogout: true});
              if (this.state.showlogout) {
                setTimeout(() => {
                  this.setState({showlogout: false});
                }, 5000);
              }
            }
          }
          
        }
        else if (retrievedpatoken == null) {
          this.setState({showlogout: true});
          if (this.state.showlogout) {
            setTimeout(() => {
              this.setState({showlogout: false});
            }, 5000);
          }
        }
        
      }

    }
    else{
      this.setState({requiredfields: true});
      setTimeout(() => {
        this.setState({requiredfields: false});
      }, 3000);
      
    }
  }

  alertcreatefork = async () => {
    Alert.alert(
      "Fork Repository?", 
      "To make a proposal, the celo-proposals repository needs to be forked to your account.", 
      [ 
        {
          text: "Cancel",
          onPress: () => {},
          style: "cancel"
        },
        { 
          text: "Fork",
          onPress: () => this.createfork()
        }
      ],
      {cancelable: true}
    );
  }

  createfork = async () => {
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
        if (response.status === 200) {
          const octokituser = new Octokit({
            auth: retrievedpatoken
          });
          let createfork = await octokituser.request('POST /repos/{owner}/{repo}/forks', {
            owner: 'celo-org',
            repo: 'celo-proposals'
          });
          
          if (createfork.status === 202) {
            this.setState({forkedrepo: createfork.data.full_name});
            Alert.alert(
              "", 
              "celo-proposals forked successfuly. Submit your proposal", 
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
        }
      } 
      catch (error) {
        SecureStore.deleteItemAsync("patoken");
          
        let retrievedpatoken = await SecureStore.getItemAsync("patoken");
        if (retrievedpatoken == null) {
          this.setState({showlogout: true});
          if (this.state.showlogout) {
            setTimeout(() => {
              this.setState({showlogout: false});
            }, 5000);
          }
        }
      }
    }
    else if (retrievedpatoken == null) {
      this.setState({showlogout: true});
      if (this.state.showlogout) {
        setTimeout(() => {
          this.setState({showlogout: false});
        }, 5000);
      }
    }
    
  }

  render(){
    return (
      <View>
        <VirtualizedList
          style={{backgroundColor: "#ffffff"}}
          data={this.state.slicedtestcases}
          initialNumToRender={6}
          onEndReached={() => {}}
          keyboardShouldPersistTaps={'handled'}
          onEndReachedThreshold={0.9}
          keyExtractor={testcase => testcase.id}
          getItem={( testcase, index ) => {
            return {
              id: index
            }
          }}
          getItemCount={() => {
            return this.state.proptestcases.length
          }}
          ListHeaderComponent={
            <View style={styles.container}>
              <StatusBar style="auto" translucent/>
              <Text style={{alignSelf: 'center', color: '#ff0000', fontSize: 12}}>Fields marked with '*' are required</Text>
              {this.state.typeofproposal === "" ? <Text style={{alignSelf: 'flex-end', marginRight: '15%', color: '#ff0000'}}>*</Text> : <View style={{marginTop: 10}}/>}
              <List.Accordion
                title={"Type of Proposal"}
                expanded={this.state.expandtypelist}
                titleStyle={{color: "#000000"}}
                style={{width: 0.7 * Dimensions.get('window').width}}
                onPress={() => this.setState({expandtypelist: !this.state.expandtypelist})}>
                <List.Item 
                  title="Standards Track" 
                  onPress={() => {
                    this.setState({typeofproposal: "Standards Track", standardstrack: "check", meta: "", informational: ""})
                  }} 
                  right={() => <List.Icon color={'#55bf7d'} icon={this.state.standardstrack} />}/>
                <List.Item 
                  title="Meta" 
                  onPress={() => {
                    this.setState({typeofproposal: "Meta", standardstrack: "", meta: "check", informational: ""})
                  }} 
                  right={() => <List.Icon color={'#55bf7d'} icon={this.state.meta} />}/>
                <List.Item 
                  title="Informational" 
                  onPress={() => {
                    this.setState({typeofproposal: "Informational", standardstrack: "", meta: "", informational: "check"})
                  }} 
                  right={() => <List.Icon color={'#55bf7d'} icon={this.state.informational} />}/>          
              </List.Accordion>
              {this.state.title.length > 0 ? <View style={{marginTop: 5}}/> : <Text style={{alignSelf: 'flex-end', marginRight: '15%', color: '#ff0000'}}>*</Text>}
              <TextInput 
                style={styles.requiredinputtitle} 
                placeholder="Title"
                multiline
                onChangeText={text => this.setState({title: text})} />
              {this.state.discussionsto.length > 0 ? <View style={{marginTop: 5}}/> : <Text style={{alignSelf: 'flex-end', marginRight: '15%', color: '#ff0000'}}>*</Text>}
              <TextInput 
                style={styles.requiredinputtitle} 
                placeholder="Discussions-to"
                multiline
                onChangeText={text => this.setState({discussionsto: text})} />
              {this.state.typeofproposal === "Standards Track" ? 
                <View style={{width: '70%', flexDirection: 'column'}}>
                  {this.state.typeofproposal === "Standards Track" && this.state.category === "Category Ring" ?
                  <Text style={{alignSelf: 'flex-end', color: '#ff0000'}}>*</Text>
                  : <></>}
                  <Text>{this.state.category}</Text>
                  <View style={{flexDirection: 'row', justifyContent: 'space-around'}}>
                    <TouchableOpacity onPress={() => this.setState({category: "Ring 0"})} style={styles.ringstyle}><Text>0</Text></TouchableOpacity>
                    <TouchableOpacity onPress={() => this.setState({category: "Ring 1"})} style={styles.ringstyle}><Text>1</Text></TouchableOpacity>
                    <TouchableOpacity onPress={() => this.setState({category: "Ring 2"})} style={styles.ringstyle}><Text>2</Text></TouchableOpacity>
                    <TouchableOpacity onPress={() => this.setState({category: "Ring 3"})} style={styles.ringstyle}><Text>3</Text></TouchableOpacity>
                  </View>
                </View>
              : <></>}
              <TextInput 
                style={styles.txtinputtitle} 
                placeholder="CIPs required"
                multiline
                onChangeText={text => this.setState({cipsrequired: text})}
                value={this.state.cipsrequired} />
              <TextInput 
                style={styles.txtinputtitle} 
                placeholder="CIPs to replace "
                multiline
                onChangeText={text => this.setState({cipstoreplace: text})}
                value={this.state.cipstoreplace} />
              {this.state.simplesummary.length > 0 ? <View style={{marginTop: 5}}/> : <Text style={{alignSelf: 'flex-end', marginRight: '15%', color: '#ff0000'}}>*</Text>}
              <TextInput 
                style={styles.requiredinputdescription} 
                placeholder="Simple Summary"
                onChangeText={text => this.setState({simplesummary: text})} 
                multiline
                numberOfLines={5}
                textAlignVertical={'top'}/>
              {this.state.abstract.length > 0 ? <View style={{marginTop: 5}}/> : <Text style={{alignSelf: 'flex-end', marginRight: '15%', color: '#ff0000'}}>*</Text>}
              <TextInput 
                style={styles.requiredinputdescription} 
                placeholder="Abstract"
                onChangeText={text => this.setState({abstract: text})} 
                value={this.state.abstract}
                multiline
                numberOfLines={5}
                textAlignVertical={'top'}/>
              {this.state.motivation.length > 0 ? <View style={{marginTop: 5}}/> : <Text style={{alignSelf: 'flex-end', marginRight: '15%', color: '#ff0000'}}>*</Text>}
              <TextInput 
                style={styles.requiredinputdescription} 
                placeholder="Motivation"
                onChangeText={text => this.setState({motivation: text})} 
                value={this.state.motivation}
                multiline
                numberOfLines={5}
                textAlignVertical={'top'}/>
              {this.state.specification.length > 0 ? <View style={{marginTop: 5}}/> : <Text style={{alignSelf: 'flex-end', marginRight: '15%', color: '#ff0000'}}>*</Text>}
              <TextInput 
                style={styles.requiredinputdescription} 
                placeholder="Specification"
                onChangeText={text => this.setState({specification: text})} 
                value={this.state.specification}
                multiline
                numberOfLines={5}
                textAlignVertical={'top'}/>
              {this.state.rationale.length > 0 ? <View style={{marginTop: 5}}/> : <Text style={{alignSelf: 'flex-end', marginRight: '15%', color: '#ff0000'}}>*</Text>}
              <TextInput 
                style={styles.requiredinputdescription} 
                placeholder="Rationale"
                onChangeText={text => this.setState({rationale: text})} 
                value={this.state.rationale}
                multiline
                numberOfLines={5}
                textAlignVertical={'top'}/>
              {this.state.backwardscompatibility.length > 0 ? <View style={{marginTop: 5}}/> : <Text style={{alignSelf: 'flex-end', marginRight: '15%', color: '#ff0000'}}>*</Text>}
              <TextInput 
                style={styles.requiredinputdescription} 
                placeholder="Backwards Compatibility"
                onChangeText={text => this.setState({backwardscompatibility: text})} 
                value={this.state.backwardscompatibility}
                multiline
                numberOfLines={5}
                textAlignVertical={'top'}/>
              <TextInput 
                style={styles.txtinputdescription} 
                placeholder="Implementation"
                onChangeText={text => this.setState({implementation: text})} 
                value={this.state.implementation}
                multiline
                numberOfLines={5}
                textAlignVertical={'top'}/>
              {this.state.securityconsiderations.length > 0 ? <View style={{marginTop: 5}}/> : <Text style={{alignSelf: 'flex-end', marginRight: '15%', color: '#ff0000'}}>*</Text>}
              <TextInput 
                style={styles.requiredinputdescription} 
                placeholder="Security Considerations"
                onChangeText={text => this.setState({securityconsiderations: text})} 
                value={this.state.securityconsiderations}
                multiline
                numberOfLines={5}
                textAlignVertical={'top'}/>
              <View style={{marginVertical: 5, borderTopWidth: 1, width: '80%', borderColor: '#999999'}} />
              <Text style={{fontSize: 15, fontWeight: 'bold', alignSelf: 'flex-start', marginLeft: '15%'}}>Test Cases</Text>
            </View>
          }
          renderItem={({ index }) => {
            return(
              <View style={{flexDirection: 'column'}}>
                {this.state.showall ? 
                  <View style={{flexDirection: 'row', flex: 10, paddingHorizontal: '5%', alignItems: 'center', justifyContent: 'center'}}>
                    {index + 1 === this.state.proptestcases.length ? <></> 
                    : 
                      <>
                        <View style={{flex: 0.5}}/>
                        <View style={{flex: 8.5, marginVertical: 5}}>
                          <Text>{(index + 1)+". "}{this.state.proptestcases[index].testcasetxt}</Text>
                        </View>
                      </>}
                    {this.state.proptestcases.length - 2 === index && this.state.proptestcases.length >= 1 ?
                      <View style={{flex: 1}}>
                        <TouchableOpacity 
                          style={{paddingHorizontal: '5%'}}
                          onPress={() => {
                            this.state.proptestcases.splice(index, 1);
                            if (this.state.proptestcases.length <= 8) {
                              this.state.slicedtestcases.splice(index, 1);
                            }
                            this.setState({rerender: !this.state.rerender});
                          }}>
                          <AntDesign name="close" size={22} color="#999999"/>
                        </TouchableOpacity>
                      </View>
                    : <View style={{flex: 1}}/>}
                  </View>
                :
                  
                  <View style={{flexDirection: 'row', flex: 10, paddingHorizontal: '5%', alignItems: 'center', justifyContent: 'center'}}>
                    {this.state.proptestcases.length >= 9 ? 
                      index < 5 && this.state.slicedtestcases[index].testcasetxt.length > 0 ? 
                        (<>
                          <View style={{flex: 0.5}}/>
                          <View style={{flex: 8.5, marginVertical: 5}}>
                            <Text>{(index + 1)+". "}{this.state.slicedtestcases[index].testcasetxt}</Text>
                          </View>
                          </>) 
                        : (<></>) 
                    : this.state.slicedtestcases[index].testcasetxt.length > 0 ? 
                      (
                        <>
                        <View style={{flex: 0.5}}/>
                        <View style={{flexDirection: 'row', flex: 8.5, marginVertical: 5}}>
                          <Text>{(index + 1)+". "}{this.state.slicedtestcases[index].testcasetxt}</Text>
                        </View>
                        </>) 
                      : (<></>)}
                    {this.state.proptestcases.length - 2 === index && this.state.proptestcases.length >= 1 && this.state.proptestcases.length < 9 ? 
                      <View style={{flex: 1}}>
                        <TouchableOpacity
                          style={{marginLeft: 5}}
                          onPress={() => {
                            this.state.proptestcases.splice(index, 1);
                            this.state.slicedtestcases.splice(index, 1);
                            this.setState({rerender: !this.state.rerender});
                          }}>
                          <AntDesign name="close" size={22} color="#999999"/>
                        </TouchableOpacity>
                      </View>
                    : <View style={{flex: 1}}/>}
                  </View>}
                {/*last testcases*/}
                {index + 1 === this.state.proptestcases.length && this.state.proptestcases.length >= 9 && !this.state.showall ? 
                  <>
                  <Text 
                    style={{color: '#0000ff', marginVertical: 10, alignSelf: 'center'}}
                    onPress={() => this.setState({showall: true})}>
                      Show all...
                  </Text>
                  <View style={{flexDirection: 'row', flex: 10, paddingHorizontal: '5%', alignItems: 'center', justifyContent: 'center'}}>
                    <View style={{flex: 0.5}}/>
                    <View style={{flex: 8.5}}>
                      <Text>{(this.state.proptestcases.length - 2)+". "}{this.state.proptestcases[index - 2].testcasetxt}</Text>
                    </View>
                    <View style={{flex: 1}}/>
                  </View>
                  <View style={{flexDirection: 'row', flex: 10, paddingHorizontal: '5%', alignItems: 'center', justifyContent: 'center'}}>
                    <View style={{flex: 0.5}}/>
                    <View style={{flex: 8.5, marginVertical: 5}}>
                      <Text>{(this.state.proptestcases.length - 1)+". "}{this.state.proptestcases[index - 1].testcasetxt}</Text>
                    </View>
                    <View style={{flex: 1}}>
                      <TouchableOpacity 
                        style={{paddingHorizontal: '5%'}}
                        onPress={() => {
                          this.state.proptestcases.splice(index, 1);
                          this.setState({rerender: !this.state.rerender});
                        }}>
                        <AntDesign name="close" size={22} color="#999999"/>
                      </TouchableOpacity>
                    </View>
                  </View> 
                  </>
                : <></>}
                
                {index + 1 === this.state.proptestcases.length ? 
                  <>
                  {index === 0 && this.state.currenttestcase.length === 0 ?
                  <Text style={{alignSelf: 'flex-end', marginRight: '20%', color: '#ff0000'}}>*</Text>
                  : <></>}
                  <View style={{flexDirection: 'row', width: '100%', alignItems: 'stretch'}}>
                    <View style={{width: '10%'}}/>
                    <TextInput
                      style={styles.txtinputtestcase} 
                      placeholder={"No. "+(this.state.proptestcases.length)} 
                      onChangeText={(text) => this.setState({currenttestcase: text})} 
                      value={this.state.currenttestcase}
                      multiline
                      numberOfLines={3}
                      textAlignVertical={'top'}/>
                    <View style={{width: '20%', alignItems: 'center', justifyContent: 'space-around'}}>
                      <TouchableOpacity 
                        onPress={() => {
                          if (this.state.currenttestcase.length > 0){
                            if(this.state.proptestcases.length < 8){
                              this.state.slicedtestcases.splice(index, 1, {testcaseno: index, testcasetxt: this.state.currenttestcase});
                              if (this.state.slicedtestcases[this.state.slicedtestcases.length - 1].testcasetxt.length === 0) {
                                
                              } else {
                                this.state.slicedtestcases.push({testcaseno: index + 1, testcasetxt: ""});
                              }
                            }
                            this.state.proptestcases.splice(index, 1, {testcaseno: index, testcasetxt: this.state.currenttestcase});
                            if (this.state.proptestcases[this.state.proptestcases.length - 1].testcasetxt.length === 0) {
                              
                            } else {
                              this.state.proptestcases.push({testcaseno: index + 1, testcasetxt: ""});
                            }
                            
                            this.setState({rerender: !this.state.rerender, showall: false, currenttestcase: ""});
                          }
                        }}>
                        <Text style={{fontSize: 15, fontWeight: 'bold', color: '#55bf7d'}}>Add</Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                  </>
                : <></>}
              </View>     
            );
          }}
          ListFooterComponent={
            <View style={styles.container}>
              {this.state.proposalsuccess ?
                <TouchableOpacity disabled={true} style={styles.styleproposalsuccess}>
                  <FontAwesome5 name="check" size={24} color="#55bf7d" />
                </TouchableOpacity>
              : 
                <TouchableOpacity disabled={this.state.makeproposaldisabled} onPress={() => this.required()} style={styles.makeprbutton}>
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
                visible={this.state.requiredfields} 
                textMessage="Fields marked with '*' are required" 
                messageStyle = {{marginRight: 7}}
                actionHandler={()=>{
                  this.setState({requiredfields: false});
                }} 
                accentColor="#fcc16b"
                actionText="OK"/>
            </View>
          }
        />
        {this.state.proposalsuccess ? <CIPSuccessModal/> : <></>}
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
  txtinputtitle: {
    borderColor: "#999999",
    borderWidth: 1,
    padding: 2,
    borderRadius: 5,
    marginVertical: 5,
    width: '70%'
  },
  requiredinputtitle: {
    borderColor: "#999999",
    borderWidth: 1,
    padding: 2,
    borderRadius: 5,
    marginBottom: 5,
    width: '70%'
  },
  txtinputdescription: {
    borderColor: "#999999",
    borderWidth: 1,
    padding: 5,
    borderRadius: 5,
    marginVertical: 5,
    width: '70%'
  },
  requiredinputdescription: {
    borderColor: "#999999",
    borderWidth: 1,
    padding: 5,
    borderRadius: 5,
    marginBottom: 5,
    width: '70%'
  },
  ringstyle: {
    paddingHorizontal: 15,
    paddingVertical: 10,
    backgroundColor: "#dddddd"
  },
  txtinputtestcase: {
    borderColor: "#999999",
    borderWidth: 1,
    padding: 5,
    borderRadius: 5,
    marginVertical: 5,
    width: '70%'
  },
  makeprbutton: {
    backgroundColor: "#55bf7d",
    borderRadius: 5,
    paddingHorizontal: 35,
    paddingVertical: 10,
    marginVertical: 20
  },
  txtmakepr: {
    color: '#ffffff',
    fontSize: 13
  },
  styleproposalsuccess: {
    borderRadius: 5, 
    borderColor: "#55bf7d", 
    borderWidth: 1,
    marginVertical: 20,
    paddingHorizontal: 75,
    paddingVertical: 5
  }
});
