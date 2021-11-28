import "./App.css";
import Formate from "./utils/Formate";
//import { BrowserRouter, Switch, Router,Route, Link, Redirect } from 'react-router-dom';
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import Signup from "./components/Signup";
import Login from "./components/Login";
import Home from "./components/Home";
import About from "./components/About";
import GoLive from "./components/GoLive";
import UserProfile from "./components/UserProfile";
import Upload from "./components/Upload";
import LiveStreamCreator from "./components/LiveStreamCreator";
//import LiveStreamViewer from './components/LiveStreamViewer';
import Test from "./components/Test";
//import ViewVideoPage from './components/ViewVideoPage';
import React, { Component } from "react";
import web3Connection from "./web3Connection";

import Contract from "./Contract";
import background from "./assets/bg3.jpg";
import MetamaskFail from "./components/MetamaskFail";

class App extends Component {
  constructor() {
    super();
    this.state = {
      route: "/",
      videoLink: "",
      web3: null,
      account: null,
      contract: null,
      balance: null,
      signedUp: false,
      loggedIn: false,
      email: "",
    };
  }

  componentDidMount = async () => {
    try {
      const web3 = await web3Connection();
      const contract = await Contract(web3);
      const accounts = await web3.eth.getAccounts();

      this.setState({ web3, contract, account: accounts[0] }, this.start);
    } catch (error) {
      console.error(error);
    }
    await this.getAccount();
  };

  start = async () => {
    await this.getAccount();
    const { web3, contract, account } = this.state;
    console.log("web3 =", web3);
    console.log("Contract =", contract);
    console.log("Acoount =", account);
  };

  getAccount = async () => {
    if (this.state.web3 !== null || this.state.web3 !== undefined) {
      await window.ethereum.on("accountsChanged", async (accounts) => {
        this.setState({
          account: accounts[0],
          loggedIn: false,
        });

        this.state.web3.eth.getBalance(accounts[0], (err, balance) => {
          if (!err) {
            this.setState({
              balance: Formate(this.state.web3.utils.fromWei(balance, "ether")),
            });
          }
        });
      });
    }
  };

  accountCreated = async (signedUp) => {
    this.setState({ signedUp });
  };

  userSignedIn = async (loggedIn, email, address) => {
    this.setState({ loggedIn, email });
  };

  loggedOut = async (loggedIn) => {
    this.setState({ loggedIn });
  };

  render() {
    // console.log(window.localStorage.getItem("currentuser"))
    // console.log(this.state.signedUp)
    // console.log(this.state.loggedIn)
    
    const routeChange = (route) => {
      this.setState({ route });
    };

    if (!this.state.web3) {
      return <MetamaskFail />;
    }

    const routes = () => {
      switch (this.state.route) {
        case "/":
          return <Home routeChange={routeChange} />;
        // break;
        case "/about":
          return <About routeChange={routeChange} />;
        // break;
        case "/golive":
       
        if(window.localStorage.getItem("currentuser")===null)
        {
          // window.alert("Log IN to GoLive on StreamEZY")
          this.setState({route:"/login"});
          // return <Home routeChange={routeChange} />;
          <Login
              account={this.state.account}
              web3={this.state.web3}
              routeChange={routeChange}
              userSignedIn={this.userSignedIn}
              routeChange={routeChange}
            />

           


        }
        else
        {
          return <GoLive routeChange={routeChange} />;
        }

        //  break;
        case "/login":
          return (
            <Login
              account={this.state.account}
              web3={this.state.web3}
              routeChange={routeChange}
              userSignedIn={this.userSignedIn}
              routeChange={routeChange}
            />
          );
        //   break;
        case "/signup":
          return (
            <Signup
              contract={this.state.contract}
              account={this.state.account}
              web3={this.state.web3}
              accountCreated={this.accountCreated}
              routeChange={routeChange}
            />
          );
        //  break;
        case "/upload":
          
        if(window.localStorage.getItem("currentuser")===null)
        {
          //  window.alert("Log IN to Upload Videos on StreamEZY")
          this.setState({route:"/login"});
          // return <Home routeChange={routeChange} />;
          <Login
              account={this.state.account}
              web3={this.state.web3}
              routeChange={routeChange}
              userSignedIn={this.userSignedIn}
              routeChange={routeChange}
            />

        }
        else
        { 
          
         
          return <Upload routeChange={routeChange} />;
        }
         
        //  break;
        case "/profile":
          if(window.localStorage.getItem("currentuser")===null)
          {
            //  window.alert("Log IN to View your Profile on StreamEZY")
            this.setState({route:"/login"});
            // return <Home routeChange={routeChange} />;
            <Login
                account={this.state.account}
                web3={this.state.web3}
                routeChange={routeChange}
                userSignedIn={this.userSignedIn}
                routeChange={routeChange}
              />
  
          }
          else
          { 
            return (
            
              <UserProfile
                style={{
                  width: "100vw",
                  height: "100vh",
                  backgroundImage: `url(${background})`,
                  backgroundPosition: "center",
                  backgroundSize: "cover",
                  backgroundRepeat: "no-repeat",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
                routeChange={routeChange}
              />
            );
          
            
          }
         
        //  break;
        case "/stream-creator":
          return <LiveStreamCreator routeChange={routeChange} />;
        //  break;
        case "/test":
          return <Test routeChange={routeChange} />;
        //  break;
        default:
          return <Home routeChange={routeChange} />;
      }
    };
    return (
      <div className="App">
        {window.innerWidth > 650 ? <Sidebar routeChange={routeChange}/> : ""}
        <Navbar routeChange={routeChange} />
        {routes()}
      </div>
    );
  }
}
export default App;
