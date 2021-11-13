import React from "react";
import axios from "axios";
import { Avatar, List, ListItem, ListItemAvatar, ListItemText, Typography } from '@material-ui/core';
import ReactDOM from "react-dom";
import Header from './Header';
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
		console.log("test 123");
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



      <div className="base-container flow-container" ref={this.props.containerRef}>
       
         <Header />
   <div className="container page-wrapper d-flex flex-column justify-content-center">
                <div>
                    <a onClick={this.handleClick}>
                        <div className="login-button">
                      
                            <img src="https://cdn.kulfyapp.com/kelvin/Mask Group 1.png" alt="" />

                            <span>Connect with Near Wallet</span>
                        </div>
                    </a>
                </div>
                <a href="#">
                    <div className="login-button">
                        <img src="https://cdn.kulfyapp.com/kelvin/icons8-facebook.png" alt="" />
                        <span>Connect with Facebook</span>
                    </div>
                </a>

            </div>
      </div>
    )
  }
}

export default signIn;








