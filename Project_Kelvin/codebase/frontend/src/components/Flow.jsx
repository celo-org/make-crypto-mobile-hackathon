import React from "react";
import axios from "axios";
import { Avatar, List, ListItem, ListItemAvatar, ListItemText, Typography } from '@material-ui/core';
import ReactDOM from "react-dom";
import { Dropdown,DropdownButton } from 'react-bootstrap';
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
        <div class="dropdown btn-small mt-3 d-flex justify-content-center">
        <DropdownButton class="btn btn-secondary dropdown-toggle"  id="dropdownMenuButton1" title="1 Month">
  <Dropdown.Item class="dropdown-item" href="#/action-1">1 Year</Dropdown.Item>
  <Dropdown.Item class="dropdown-item" href="#/action-2">10 Years</Dropdown.Item>
    <Dropdown.Item class="dropdown-item" href="#/action-3">100 Years</Dropdown.Item>

        
</DropdownButton>

        </div>
        <div class="text-circle flow-text" >
            <p>Human Lives</p>
        </div>
    </div>
    <a href={`/add-impact?id=${this.state.thread_id}`} class="add-btn"><img src="https://cdn.kulfyapp.com/kelvin/icons8-add.png" alt="" width="55" height="55" /></a>


      </div>
    )
  }
}

export default convoConnector;


