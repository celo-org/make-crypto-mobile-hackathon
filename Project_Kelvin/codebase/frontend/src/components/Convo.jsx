import React from "react";
import axios from "axios";
import { Avatar, List, ListItem, ListItemAvatar, ListItemText, Typography } from '@material-ui/core';
import ReactDOM from "react-dom";
import Header from './Header';
import {ethers} from 'ethers';


import { Link, useLocation, BrowserRouter as Router } from "react-router-dom";

export class convoConnector extends React.Component {



  constructor(props) {
    super(props);
    console.log(props);
    this.contract = props.contract;
    this.currentUser = props.currentUser;

    this.address = props.address;
    this.kit = props.kit;

    this.state = {message:''};




    console.log(`constructor before trigger`);

    console.log(this.address,this.contract, this.currentUser, this.nearConfig, this.wallet);
  }

  async componentDidMount() {
    console.log("componentDidMount");


   let thread_id = 'default_thread'
    let search = window.location.search;
    let params = new URLSearchParams(search);
    thread_id = params.get('id');
    console.log('thread_id ',thread_id);
    this.setState({thread_id:thread_id})

    console.log(this.address,this.contract, this.currentUser, this.nearConfig, this.wallet);
   // await this.triggerOAuth();
    if (this.wallet && this.contract)
      await this.triggerOAuth();
    // this.forceUpdate()
  }

  



   submitMessage = async (e) => {

   e.preventDefault();

    const convoApiRoot = 'https://theconvo.space/api';
    const convoApiToken = 'CONVO'

    axios.defaults.headers.common = {
      "Content-Type": "application/json"
    }
    console.log('sumit message',this.state.thread_id);

    // Post Comment by threadId
     const postCommentsRequestPath = `/comments`;
     let postCommentsRequestBody = {
       "token": this.state.token,
       "signerAddress": this.wallet.getAccountId(),
       "comment": this.state.message,
       "threadId": this.state.thread_id,
       "url": encodeURIComponent("https://projectkelvin.io")
     };
     

     console.log(`send request to convo URL: ${convoApiRoot}${postCommentsRequestPath}?apikey=${convoApiToken} with data: ${JSON.stringify(postCommentsRequestBody)}`);
     const postCommentsResponse = await axios.post(`${convoApiRoot}${postCommentsRequestPath}?apikey=${convoApiToken}`, postCommentsRequestBody);
     console.log(`postComments Response from convo: ${JSON.stringify(postCommentsResponse)}`);
    
    this.state.message = '';
 
   
    await this.triggerOAuth();

   }



  async shouldComponentUpdate() {
    console.log(`shouldComponentUpdate`);
  }

  triggerOAuth = async () => {

    let provider;
    provider = this.kit.web3.getDefaultPro;


    console.log('kit is ',this.kit.web3);




    // Sample signature generation code using near-api-js.js
    const convoApiRoot = 'https://theconvo.space/api';
    const convoApiToken = 'CONVO'

    axios.defaults.headers.common = {
      "Content-Type": "application/json"
    }


console.log('before signature ',this.kit.web3.currentProvider);

    // Sample signature generation code using ethers.js
let timestamp = Date.now();
let signerAddress = this.address;
let data = `I allow this site to access my data on The Convo Space using the account ${signerAddress}. Timestamp:${timestamp}`;
//let signature = await provider.send('personal_sign',[ ethers.utils.hexlify(ethers.utils.toUtf8Bytes(data)), signerAddress.toLowerCase() ]);
let signature = await provider.send('personal_sign',[ ethers.utils.hexlify(ethers.utils.toUtf8Bytes(data)), signerAddress.toLowerCase() ]);
 console.log('signature ',signature);

const authTokenRequestPath = '/auth';

let authBody = {
  "signature": signature,
  "signerAddress": signerAddress,
  "timestamp": timestamp,
  "chain": "celo"
};


    // console.log(`send request to convo URL: ${convoApiRoot}${authTokenRequestPath}?apikey=${convoApiToken} with Data: ${JSON.stringify(authTokenRequestBody)}`);
    //const authResponse = await axios.post(`${convoApiRoot}${authTokenRequestPath}?apikey=${convoApiToken}`, authBody);
    // console.log(`auth Response from convo: ${JSON.stringify(authResponse)}`);
   // this.authToken = authResponse.data.message;
    //this.setState({token: authResponse.data.message})

    // Validate Token
    const validateTokenRequestPath = '/validateAuth';
    const validateTokenRequestBody = {
      "signerAddress": this.address,
      "token": this.authToken
    };
    // console.log(`send request to convo URL: ${convoApiRoot}${validateTokenRequestPath}?apikey=${convoApiToken} with data: ${JSON.stringify(validateTokenRequestBody)}`);
    const validateTokenResponse = await axios.post(`${convoApiRoot}${validateTokenRequestPath}?apikey=${convoApiToken}`, validateTokenRequestBody);
    // console.log(`validateToken Response from convo: ${JSON.stringify(validateTokenResponse)}`);

    let thread_id = 'default_thread'
    let search = window.location.search;
    let params = new URLSearchParams(search);
    thread_id = params.get('id');

    // Query threads
    const queryThreadsRequestPath = '/comments';
    // console.log(`send request to convo URL: ${convoApiRoot}${queryThreadsRequestPath}?apikey=${convoApiToken} with no data`);
    this.queryThreadsResponse = await axios.get(`${convoApiRoot}${queryThreadsRequestPath}?apikey=${convoApiToken}&threadId=${thread_id}`);
    this.setState({ threads: this.queryThreadsResponse.data });
    this.threads = this.queryThreadsResponse.data;
    this.setState({threads: this.threads})

    const listView = 
      this.state.threads.map(function(item, index){
                    return (<>


                        <div class="tread d-flex flex-row mt-3">
                <img src="https://cdn.kulfyapp.com/kelvin/dp.png" alt="" width="48" height="48" class="me-2"/>
                <div class="context">
                    <h6 class="username  color-text">
                        @{item.author}
                    </h6>
                    <p class="message">
                        {item.text}
                    </p>
                </div>
            </div>
                    </>);
                  });




    console.log('listview ',listView);



    ReactDOM.render(
      listView,
      document.getElementById('threads-list')
    );



  }

  render() {
    console.log(`render start ${JSON.stringify(this.state.threads)}`);
    return (

      <div className="base-container page-wrapper" ref={this.props.containerRef}>
            <Header />
      <ul class="nav nav-pills nav-fill mt-2 mx-2 ">
        <li class="nav-item">
            <a class="nav-link  text-white" aria-current="page" href={`/inputs`}>Impact Flow</a>
        </li>
        <li class="nav-item">
            <a class="nav-link active  color-bg " href={`/convo?id=${this.state.thread_id}`}>Impact Discussion</a>
        </li>
    </ul>

<div className="base-container" ref={this.props.containerRef}>

        <div class="container ">
        <div class="discussions">
        <div className="content">
          <List id="threads-list">

           
           

 no threads yet...



          </List>
        </div>
   <div class="send">
            <input type="text" name="message" onChange={e => this.setState({ message: e.target.value })}   placeholder="Message"/>
            <a href="# " onClick={this.submitMessage.bind(this)} class="send-btn "><img src="https://cdn.kulfyapp.com/kelvin/send-btn.svg " alt=" " width="46 " height="47"/></a>
        </div>
        </div></div>
      </div>

    <div class="container ">
    </div>
      </div>
    )
  }
}

export default convoConnector;

