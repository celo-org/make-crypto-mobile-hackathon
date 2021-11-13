import React from "react";
import axios from "axios";
import { Avatar, List, ListItem, ListItemAvatar, ListItemText, Typography } from '@material-ui/core';
import ReactDOM from "react-dom";
import { Redirect } from "react-router-dom";
import Header from './Header';

export class convoConnector extends React.Component {
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
            let thread_id = 'default_thread'
    let search = window.location.search;
    let params = new URLSearchParams(search);
    thread_id = params.get('id');
    console.log('thread_id ',thread_id);
    this.setState({thread_id:thread_id})
    console.log(this.contract, this.currentUser, this.nearConfig, this.wallet);

  }

  async shouldComponentUpdate() {
    console.log(`shouldComponentUpdate`);
  }



  render() {
    console.log(`render start ${JSON.stringify(this.state.threads)}`);
    return (
      <div className="base-container" ref={this.props.containerRef}>

     <Header />
    <ul class="nav nav-pills nav-fill mt-2 mx-2 ">
        <li class="nav-item">
            <a class="nav-link text-white " aria-current="page" href={`/impact?id=${this.state.thread_id}`}>Impact Flow</a>
        </li>
        <li class="nav-item">
            <a class="nav-link  active color-bg " href={`/convo?id=${this.state.thread_id}`}>Impact Discussion</a>
        </li>
    </ul>
    <div class="container flow-container" >
        <div class="d-flex justify-content-center flex-column mt-5 options-list">
            <a href={`/airline?id=${this.state.thread_id}`} class="options-item">Airline Flight</a>
            <a href={`/airline?id=${this.state.thread_id}`} class="options-item">Shopping</a>
            <a href={`/airline?id=${this.state.thread_id}`} class="options-item">Food</a>
        </div>


    </div>
   

      </div>
    )
  }
}

export default convoConnector;


