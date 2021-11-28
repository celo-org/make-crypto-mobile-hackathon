import React from "react";
import axios from "axios";
import {
  Avatar,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Typography,
} from "@material-ui/core";
import ReactDOM from "react-dom";
import Header from "./Header";

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
  Link,
} from "react-router-dom";

export class inputs extends React.Component {
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

    this.state = {
      formValues: [{ name: "", values: "" }],
    };
    this.handleSubmit = this.handleSubmit.bind(this);

    console.log(`constructor before trigger`);

    console.log(this.contract, this.currentUser, this.nearConfig, this.wallet);
  }

  handleChange(i, e) {
    let formValues = this.state.formValues;
    formValues[i][e.target.name] = e.target.value;
    this.setState({ formValues });
  }

  addFormFields() {
    this.setState({
      formValues: [...this.state.formValues, { name: "", values: "" }],
    });
  }

  removeFormFields(i) {
    let formValues = this.state.formValues;
    formValues.splice(i, 1);
    this.setState({ formValues });
  }

  handleSubmit(event) {
    // event.preventDefault();
    localStorage.setItem("impactflow", JSON.stringify(this.state.formValues));
    //alert(JSON.stringify(this.state.formValues));
    window.location.href = "/calculate";
  }

  async componentDidMount() {
    console.log("componentDidMount");
    console.log(this.contract, this.currentUser, this.nearConfig, this.wallet);
    if (this.wallet && this.contract) await this.triggerOAuth();
    // this.forceUpdate()
  }

  handleClick = async () => {
    this.wallet.requestSignIn("gkolluri.testnet", "NEAR Guest Book");
  };

  handleTimeChange(value) {
    this.state.time = value;
  }

  handleTemperatureChange(value) {
    this.state.temperature = value;
  }

  handleCapitalChange(value) {
    this.state.capital = value;
  }

  async shouldComponentUpdate() {
    console.log(`shouldComponentUpdate`);
  }

  render() {
    console.log(`render start ${JSON.stringify(this.state.threads)}`);
    return (
      <div class="bg-white">
        <Header />
        <section class="container mb-3">
          <div class="row">
            <div class="col">
              <nav class="nav nav-pills nav-justified">
                <a class="nav-link active" aria-current="page" href="#">
                  Impact Flow
                </a>
                <a class="nav-link" href="/convo">
                  Impact Discussion
                </a>
              </nav>
            </div>
          </div>
        </section>
        <section class="container text-center ">
          <div class="row mb-3">
            <div class="col">
              <h3 class="text-color">Inputs - Step 1</h3>
            </div>
          </div>

          <form onSubmit={this.handleSubmit}>
            {this.state.formValues.map((element, index) => (
              <div className="form-inline" key={index}>
                <div class="row">
                  <div class="col my-block m-2 px-4 flex-column align-items-start">
                    <div class="d-flex justify-content-between w-100 mb-2  align-items-center  flex-row">
                      <h6>Name</h6>
                      <p>
                        <input
                          name="name"
                          onChange={(e) => this.handleChange(index, e)}
                          type="text"
                          placeholder="Variable Name"
                        />
                      </p>
                    </div>
                    <div class="d-flex justify-content-between w-100 mb-2  align-items-center  flex-row">
                      <h6>Values</h6>
                      <p>
                        <input
                          name="values"
                          onChange={(e) => this.handleChange(index, e)}
                          type="text"
                          placeholder="Comma Seperated"
                        />
                      </p>
                    </div>
                    <button
                      class="btn btn-primary w-100 btn-color"
                      onClick={() => this.removeFormFields(index)}
                      type="button"
                    >
                      {" "}
                      Remove
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </form>

          <div class="d-grid gap-2 mt-4">
            <button
              onClick={() => this.addFormFields()}
              type="button"
              class="btn btn-primary btn-color"
              data-bs-toggle="modal"
              data-bs-target="#exampleModal"
            >
              Add
            </button>
            <button
              class="btn btn-primary btn-color"
              onClick={() => this.handleSubmit()}
              type="submit"
            >
              {" "}
              Next
            </button>
          </div>
        </section>
      </div>
    );
  }
}

export default inputs;
