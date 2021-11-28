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
import Select from "react-select";

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
  Link,
} from "react-router-dom";

export class calculate extends React.Component {
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
      calcValues: [{ name: "", variable1: "", operation: "", variable2: "" }],
    };
    this.handleSubmit = this.handleSubmit.bind(this);

    console.log(`constructor before trigger`);

    console.log(this.contract, this.currentUser, this.nearConfig, this.wallet);
  }

  state = {
    selectedOption: null,
  };
  handleChange1 = (selectedOption) => {
    this.setState({ selectedOption });

    console.log(`Option selected 1:`, selectedOption);
  };

  handleV1Change = (selectedOptionV1, index) => {
    this.setState({ selectedOptionV1 });
    console.log(`Option selected 2:`, selectedOptionV1);
  };

  handleV2Change = (selectedOptionV2) => {
    this.setState({ selectedOptionV2 });
    console.log(`Option selected:`, selectedOptionV2);
  };

  handleOperationChange = (selectedOptionOperation) => {
    this.setState({ selectedOptionOperation });
    console.log(`Option selected:`, selectedOptionOperation);
  };

  handleChange(i, e) {
    let calcValues = this.state.calcValues;

    console.log("form values ", calcValues);
    calcValues[i][e.target.name] = e.target.value;
    this.setState({ calcValues });
  }

  addFormFields() {
    this.setState({
      calcValues: [
        ...this.state.calcValues,
        { name: "", variable1: "", operation: "", variable2: "" },
      ],
    });
  }

  removeFormFields(i) {
    let calcValues = this.state.calcValues;
    calcValues.splice(i, 1);
    this.setState({ calcValues });
  }

  handleSubmit(event) {
    let variables = JSON.parse(localStorage.getItem("impactflow"));

    console.log("test test ", this.state.calcValues, JSON.stringify(variables));

    for (var i = 0; i < this.state.calcValues.length; i++) {
      var obj = {};
      obj.name = this.state.calcValues[i].name;
      obj.values = this.state.calcValues[i].name;
      if (obj) variables[variables.length] = obj;
      console.log("naked ", i, variables);
    }

    localStorage.setItem("impactflow", JSON.stringify(variables));
    //alert(JSON.stringify(this.state.formValues));

    window.location.href = "/output";
  }

  async componentDidMount() {
    console.log("componentDidMount");
    console.log(this.contract, this.currentUser, this.nearConfig, this.wallet);
    if (this.wallet && this.contract) await this.triggerOAuth();
    // this.forceUpdate()
  }

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
    const { selectedOptionV1 } = this.state;
    const { selectedOptionV2 } = this.state;
    const { selectedOptionOperation } = this.state;
    let variables = JSON.parse(localStorage.getItem("impactflow"));
    const options = [];

    const operation = [
      { label: "+", value: "+" },
      { label: "-", value: "-" },
      { label: "*", value: "*" },
      { label: "%", value: "/" },
    ];

    for (var i = 0; i < variables.length; i++) {
      console.log("variables ", variables);
      var obj = {};
      obj.value = variables[i].values;
      obj.label = variables[i].name;
      options.push(obj);
    }

    console.log("tst ", this.state.calcValues);

    for (var i = 0; i < this.state.calcValues.length; i++) {
      console.log("variables ", variables);
      var obj = {};
      obj.value = this.state.calcValues[i].name;
      obj.label = this.state.calcValues[i].name;
      options.push(obj);
    }

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
              <h3 class="text-color">Calculations - Step 2</h3>
            </div>
          </div>

          <form onSubmit={this.handleSubmit}>
            {this.state.calcValues.map((element, index) => (
              <div className="form-inline" key={index}>
                <div class="row">
                  <div class="col my-block m-2 px-4 flex-column align-items-start">
                    <div class="d-flex align-items-center flex-row justify-content-between w-100 mb-2">
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
                    <div class="d-flex justify-content-between w-100 mb-2 myselect align-items-center  flex-row">
                      <h6>Variable 1</h6>
                      <p>
                        {" "}
                        <Select
                          name="variable1"
                          value={selectedOptionV1}
                          onChange={this.handleV1Change}
                          options={options}
                        />
                      </p>
                    </div>
                    <div class="d-flex justify-content-between w-100 mb-2 myselect align-items-center  flex-row">
                      <h6>Operation</h6>
                      <p>
                        {" "}
                        <Select
                          name="operation"
                          value={selectedOptionOperation}
                          onChange={this.handleOperationChange}
                          options={operation}
                        />
                      </p>
                    </div>
                    <div class="d-flex justify-content-between w-100 mb-2 myselect align-items-center  flex-row">
                      <h6>Variable 2</h6>
                      <p>
                        {" "}
                        <Select
                          name="variable2"
                          value={selectedOptionV2}
                          onChange={this.handleV2Change}
                          options={options}
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

export default calculate;
