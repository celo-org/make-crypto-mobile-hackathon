//import { Link } from 'react-router-dom';
import React, { Component } from "react";
import AuthValidation from "../utils/AuthValidation";
import { doc, getDoc } from "firebase/firestore"; 
import { db } from "../firebase";

import "../style/Loginpage.css";
const abi = [
		{
			"inputs": [],
			"stateMutability": "nonpayable",
			"type": "constructor"
		},
		{
			"inputs": [],
			"name": "getSignatureHash",
			"outputs": [
				{
					"internalType": "string",
					"name": "",
					"type": "string"
				}
			],
			"stateMutability": "view",
			"type": "function"
		},
		{
			"inputs": [],
			"name": "getUserAddress",
			"outputs": [
				{
					"internalType": "address",
					"name": "",
					"type": "address"
				}
			],
			"stateMutability": "view",
			"type": "function"
		},
		{
			"inputs": [],
			"name": "nbOfUsers",
			"outputs": [
				{
					"internalType": "uint256",
					"name": "",
					"type": "uint256"
				}
			],
			"stateMutability": "view",
			"type": "function"
		},
		{
			"inputs": [
				{
					"internalType": "string",
					"name": "_hash",
					"type": "string"
				}
			],
			"name": "register",
			"outputs": [],
			"stateMutability": "nonpayable",
			"type": "function"
		}
	]

const contractAddress = "0xfA5e1C827743fBf14997273caAB9eF73eB7566bF";
var contract;

class Login extends Component {
  state = {
    email: "",
    password: "",

    status: "",
    loggedIn: false,
  };

  onSignIn = async (event) => {
    event.preventDefault();

    if (this.state.email !== "" && this.state.password !== "") {
      let email = this.state.email.trim();
      let password = this.state.password.trim();

      let usernameToSend = email;

      //===
      if (password.length < 8) {
        window.alert("at least 8 characters for password");
        this.setState({
          status: "failed",
          password: "",
          digicode: "",
        });
        return;
      }

      let userAddress = await contract.methods
        .getUserAddress()
        .call({ from: this.props.account });

      if (userAddress === "0x0000000000000000000000000000000000000000") {
        window.alert("Account does not exists");
        this.setState({
          status: "failed",
          email: "",
          password: "",
        });
        return;
      } else {
        let validated = await AuthValidation(
          email,
          this.props.account,
          password,
          this.props.web3,
          contract
        );

        if (!validated) {
          window.alert("Incorrect log in");
          this.setState({
            status: "failed",
            email: "",
            password: "",
          });
          return;
        } else {
          window.alert("Sign in successful");
          this.setState({
            email: "",
            password: "",

            status: "success",

            loggedIn: true,
          });
          console.log(this.props.account);
          const user = await getDoc(doc(db,'users',this.props.account));
          console.log(user);
          window.localStorage.setItem("currentuser", JSON.stringify(user.data()));

          this.props.userSignedIn(this.state.loggedIn, usernameToSend);
          this.props.routeChange(`${this.props.route}`);
          return;
        }
      }
    }

    this.setState({
      email: "",
      password: "",
    });
  };
  componentDidMount() {
    contract = new this.props.web3.eth.Contract(abi, contractAddress);
    console.log(contract);
  }

  render() {
    console.log(this.props);
    return (
      <div className="login-body">
        <div className="login">
          <div class="container" id="container">
            <div class="form-container sign-in-container">
              <form action="#" className="frm">
                <h2 className="h2tag">Sign in</h2>
                <div class="social-container">
                  <a
                    href="https://www.facebook.com/"
                    class="social social-logo"
                  >
                    <i class="fab fa-facebook-f"></i>
                  </a>
                  <a href="https://www.google.com/" class="social social-logo">
                    <i class="fab fa-google-plus-g"></i>
                  </a>
                  <a
                    href="https://www.linkedin.com/"
                    class="social social-logo"
                  >
                    <i class="fab fa-linkedin-in"></i>
                  </a>
                </div>
                <span>or use your account</span>

                <input //email
                  required
                  type="text"
                  name="email"
                  placeholder="Email"
                  value={this.state.email}
                  autoComplete="email"
                  className="inp"
                  onInput={(e) => this.setState({ email: e.target.value })}
                />

                <input //password
                  required
                  type="password"
                  name="password"
                  placeholder="Password"
                  value={this.state.password}
                  autoComplete="current-password"
                  name="password"
                  className="inp"
                  onInput={(e) => this.setState({ password: e.target.value })}
                />

                <button onClick={this.onSignIn} className="butt">
                  Sign In
                </button>
              </form>
            </div>
            <div class="overlay-container">
              <div class="overlay">
                <div class="overlay-panel overlay-right">
                  <h1 className="h1tag">Hello, Friend!</h1>
                  <p className="para">
                    Enter your personal details and start journey with us
                  </p>

                  <div onClick={() => this.props.routeChange("/signup")}>
                    {" "}
                    <button className="ghost butt" id="signUp">
                      Sign Up
                    </button>{" "}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
export default Login;
