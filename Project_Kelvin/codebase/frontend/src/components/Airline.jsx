import React from "react";
import axios from "axios";
import { Avatar, List, ListItem, ListItemAvatar, ListItemText, Typography } from '@material-ui/core';
import ReactDOM from "react-dom";
import { Redirect } from "react-router-dom";
import Header from './Header';

export class airlineEstimate extends React.Component {
  constructor(props) {
    super(props);
    console.log(props);
    this.contract = props.contract;
    this.currentUser = props.currentUser;
    this.nearConfig = props.nearConfig;
    this.wallet = props.wallet;

    this.state = {from: '',to:''};


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

  submitAirline = async (e) => {
  console.log("before setting state ",this.state);
        console.log("test 123",this.state);
e.preventDefault();

           // Sample climate api using carboninterface.com
    const climateApiRoot = 'https://www.carboninterface.com/api/v1';
    const climateApiToken = 'c87SduMH2ZQS7p3f8DAqKw'

    axios.defaults.headers.common = {
    "Authorization": "Bearer "+climateApiToken,
      "Content-Type": "application/json"
    }

   
    const authResponse = await axios.get(`${climateApiRoot}/auth`);
     console.log(`auth Response from convo: ${JSON.stringify(authResponse.data)}`);
    


    // estimates 
    const estimatesRequestPath = '/estimates';
    const estimatesRequestBody = {
        "type": "flight",
        "passengers": 2,
        "legs": [
          {"departure_airport": this.state.from, "destination_airport": this.state.to},
          {"departure_airport": this.state.to, "destination_airport": this.state.from}
        ]
    };
    
    const estimateResponse = await axios.post(`${climateApiRoot}${estimatesRequestPath}`, estimatesRequestBody);
     console.log(`estimate Response from climate api: ${JSON.stringify(estimateResponse.data.data.attributes.carbon_lb)}`);
     localStorage.setItem('carbon', estimateResponse.data.data.attributes.carbon_lb);
     localStorage.setItem('from', this.state.from);
     localStorage.setItem('to', this.state.to);
     window.location.href = "/impact?id="+this.state.thread_id;

  }

  async shouldComponentUpdate() {
    console.log(`shouldComponentUpdate`);
  }

  handleFromChange(value) {
    this.state.from = value;
  }

  handleToChange(value) {
    this.state.to = value;
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
        <h1 class="text-centers carbon-text" >Carbon Emission Analysis</h1>
        <h6 class="mt-3 text-center">Transaction Type</h6>


        <div class="airline-container" >
         
            
            <input class="mb-2" type="text" name="from" onChange={e => this.setState({ from: e.target.value })}   placeholder="From" />
            <input class="mb-2" type="text"  name="to" onChange={e => this.setState({ to: e.target.value })} placeholder="To" />
            <select class="form-select mb-2 select-dropdown" aria-label="Default select example">
                <option selected>Round Trip</option>
                <option value="1">One Way</option>
                
              </select>
        </div>


        <div class="d-flex justify-content-center flex-column mt-5 options-list">
            <a href="#" onClick={this.submitAirline.bind(this)} class="options-item">Submit</a>
        </div>
    
    </div>
   
</div>
     
    )
  }
}

export default airlineEstimate;


