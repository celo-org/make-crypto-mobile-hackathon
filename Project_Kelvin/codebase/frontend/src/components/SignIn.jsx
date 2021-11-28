import React from "react";
import axios from "axios";
import { Avatar, List, ListItem, ListItemAvatar, ListItemText, Typography } from '@material-ui/core';
import ReactDOM from "react-dom";

import {
  BrowserRouter as Router,
  Switch,
  Route,Redirect,
  Link
} from "react-router-dom";

export class signIn extends React.Component {
  constructor(props) {
    super(props);
    console.log(props);
    this.contract = props.contract;
    this.currentUser = props.currentUser;
    this.nearConfig = props.nearConfig;
    this.wallet = props.wallet;
    this.address = props.address;
    this.connect = props.connect;

    this.state = {};

    console.log(`constructor before trigger`);

    console.log(this.contract, this.currentUser, this.nearConfig, this.wallet);
  }


  async componentDidMount() {
    console.log("componentDidMount");
    console.log(this.contract, this.currentUser, this.nearConfig, this.wallet);
    if (this.wallet && this.contract)
      await this.triggerOAuth();
    // this.forceUpdate()
  }



  handleClick = async () => {

		  this.wallet.requestSignIn(
      'gkolluri.testnet',
      'NEAR Guest Book'
    );
  }



  async shouldComponentUpdate() {
    console.log(`shouldComponentUpdate`);
  }

  




  render() {

    console.log(`render start ${JSON.stringify(this.state.threads)}`);
    return (



<div class="bg-white">
      <div className="base-container flow-container" ref={this.props.containerRef}>
       
            <section class="container-fluid">
        <div class="row">
            <div class="col splash-logo bg-color">
                <img src="https://cdn.kulfyapp.com/celo/full-logo.svg" alt=""/>
            </div>
        </div>
            <div class="d-grid gap-2 mt-4">
            <button  onClick={this.connect}  variant={"contained"} class="btn btn-primary btn-icon" type="button"> <img src="https://cdn.kulfyapp.com/celo/celo-circle.svg" alt="" /><span> Connect with Celo</span></button>
        </div>

    </section>
   
    </div>



 </div>
    )
  }
}

export default signIn;








