import React, { Component } from "react";
//import { Link } from 'react-router-dom';
import AuthenticationHash from "../utils/AuthenticationHash";
import "../style/Loginpage.css";
import { doc, setDoc } from "firebase/firestore"; 
import { db } from "../firebase";

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

const contractAddress = "0xb9f535A23eB17EbA5Fa05d138f25BC286cD758F4";
var contract;

class SignUp extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",

      status: "",
      signedUp: false,
    };
  }

  onSignUp = async (event) => {
    event.preventDefault();
    console.log(this.state.password);
    console.log(this.state.confirmPassword);
    console.log(this.state.name);
    console.log(this.state.email);
    if (
      this.state.password !== this.state.confirmPassword ||
      this.state.name === "" ||
      this.state.email === "" ||
      this.state.password === "" ||
      this.state.confirmPassword === ""
    ) {
      window.alert("Enter Valid Details!");
      this.setState({
        // alertMessage: "Error!",
        status: "failed",
        password: "",
        confirmPassword: "",
      });
      return;
    }

    if (
      this.state.name !== "" &&
      this.state.password !== "" &&
      this.state.email !== "" &&
      this.state.confirmPassword !== ""
    ) {
      let name = this.state.name.trim();
      let password = this.state.password.trim();
      let email = this.state.email.trim();
      let confirmPassword = this.state.confirmPassword.trim();
      //===
      if (password.length < 8) {
        window.alert("at least 8 characters for password");
        this.setState({
          status: "failed",
          password: "",
          confirmPassword: "",
        });
        return;
      } else {
      }
      let userAddress = await contract.methods
        .getUserAddress()
        .call({ from: this.props.account });
      console.log(userAddress);
      if (userAddress !== "0x0000000000000000000000000000000000000000") {
        window.alert("this account already exists");
        this.setState({
          status: "failed",
          name: "",
          password: "",
          email: "",
          confirmPassword: "",
        });

        return;
      } else {
        window.alert("okay");
        console.log(this.props.web3);
        let hash = await AuthenticationHash(
          email,
          this.props.account,
          password,
          this.props.web3
        );
        console.log(this.props.account);
        await contract.methods
          .register(hash)
          .send({ from: this.props.account });
        window.alert("Signup successful");

        this.setState({
          name: "",
          password: "",
          email: "",
          confirmPassword: "",
          status: "success",

          signedUp: true,
        });

        this.props.accountCreated(this.state.signedUp);
        setDoc(doc(db, "users", this.props.account), {
          email: email,
          name:name,
          likedVideos:[],
          subscribers:[],
          address:this.props.account
        })
        window.localStorage.setItem("currentuser", JSON.stringify({
          address: this.props.account,
          email: email,
          name:name,
        }));
        this.props.routeChange(`${this.props.route}`);
        return;
      }
    }
  };

  componentDidMount() {
    contract = new this.props.web3.eth.Contract(abi, contractAddress);
    console.log(contract);
  }

  render() {
    console.log(this.state.signedUp);
    console.log(this.props);
    return (
      <div className="login-body">
        <div className="login">
          <div class="container" id="container">
            <div class="form-container sign-in-container">
              <form className="frm">
                <h2 className="h2tag">Register</h2>
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
                <span>Create your account</span>

                <input //username
                  required
                  type="text"
                  name="name"
                  placeholder="Name"
                  value={this.state.name}
                  autoComplete="Name"
                  className="inp"
                  onChange={(e) => this.setState({ name: e.target.value })}
                />

                <input //email
                  required
                  type="email"
                  name="email"
                  placeholder="Email"
                  className="inp"
                  value={this.state.email}
                  autoComplete="email"
                  onChange={(e) => this.setState({ email: e.target.value })}
                />

                <input //password
                  required
                  type="password"
                  name="password"
                  placeholder="password"
                  value={this.state.password}
                  autoComplete="current-password"
                  onChange={(e) => this.setState({ password: e.target.value })}
                  name="password"
                  type="password"
                  placeholder="Password"
                  className="inp"
                />

                <input //confirmPassword
                  required
                  type="password"
                  name="Confirm Password"
                  placeholder="Confirm Password"
                  value={this.state.confirmPassword}
                  className="inp"
                  autoComplete="current-password"
                  onChange={(e) =>
                    this.setState({ confirmPassword: e.target.value })
                  }
                />

                <button
                  onClick={(event) => this.onSignUp(event)}
                  className="butt"
                >
                  Sign Up
                </button>
              </form>
            </div>
            <div class="overlay-container">
              <div class="overlay">
                <div class="overlay-panel overlay-right">
                  <h1 className="h1tag">Hello, Friend!</h1>
                  <p className="para">Already have an account with us?</p>
                  <div onClick={() => this.props.routeChange("/login")}>
                    {" "}
                    <button className="ghost butt" id="signUp">
                      Sign In
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

export default SignUp;
