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

export class output extends React.Component {
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
  }

  state = {
    selectedOption: null,
  };
  handleChange1 = (selectedOption) => {
    this.setState({ selectedOption });
  };

  handleV1Change = async (selectedOptionV1) => {
    this.setState({ selectedOptionV1 });
    console.log(`Option selected 2:`, selectedOptionV1);
    await this.caluclateTemperature();
  };

  handleV2Change = async (selectedOptionV2) => {
    await this.setState({ selectedOptionV2 });
    console.log(`Option selected:`, selectedOptionV2);
    let test = await this.caluclateTemperature();
  };

  handleOperationChange = async (selectedOptionOperation) => {
    this.setState({ selectedOptionOperation });
    console.log(`Option selected:`, selectedOptionOperation);
    await this.caluclateTemperature();
  };

  handleTimeV1Change = async (selectedTimeOptionV1) => {
    this.setState({ selectedTimeOptionV1 });
    console.log(`Option selected 2:`, selectedTimeOptionV1);
    await this.caluclateTime();
  };

  handleTimeV2Change = async (selectedTimeOptionV2) => {
    await this.setState({ selectedTimeOptionV2 });
    console.log(`Option selected:`, selectedTimeOptionV2);
    let test = await this.caluclateTime();
  };

  handleTimeOperationChange = async (selectedTimeOptionOperation) => {
    this.setState({ selectedTimeOptionOperation });
    console.log(`Option selected:`, selectedTimeOptionOperation);
    await this.caluclateTime();
  };

  handleCapitalV1Change = async (selectedCapitalOptionV1) => {
    this.setState({ selectedCapitalOptionV1 });
    console.log(`Option selected 2:`, selectedCapitalOptionV1);
    await this.caluclateCapital();
  };

  handleCapitalV2Change = async (selectedCapitalOptionV2) => {
    await this.setState({ selectedCapitalOptionV2 });
    console.log(`Option selected:`, selectedCapitalOptionV2);
    let test = await this.caluclateCapital();
  };

  handleCapitalOperationChange = async (selectedCapitalOptionOperation) => {
    this.setState({ selectedCapitalOptionOperation });
    console.log(`Option selected:`, selectedCapitalOptionOperation);
    await this.caluclateCapital();
  };

  caluclateTime = async () => {
    if (
      this.state.selectedTimeOptionV1 &&
      this.state.selectedTimeOptionV2 &&
      this.state.selectedTimeOptionOperation
    ) {
      const impactApiRoot = "https://impact.projectkelvin.io";
      const scoreCalculate = "/calculations/update-score";
      const impactRequestBody = {
        user: 'You',
        proposal_id: "Proposal",
        param1: this.state.selectedTimeOptionV1.value,
        operator: this.state.selectedTimeOptionOperation.value,
        param2: this.state.selectedTimeOptionV2.value,
        collection: "time",
      };

      const headers = {
        "Access-Control-Allow-Origin": "*",
      };

      this.setState({"timeResult":'Calculating...'});
      const impactResponse = await axios.post(
        `${impactApiRoot}${scoreCalculate}`,
        impactRequestBody,
        {
          headers: headers,
        }
      );

    this.setState({"timeResult":impactResponse.data});

    }
  };

  caluclateCapital = async () => {
    if (
      this.state.selectedCapitalOptionV1 &&
      this.state.selectedCapitalOptionV2 &&
      this.state.selectedCapitalOptionOperation
    ) {
      const impactApiRoot = "https://impact.projectkelvin.io";
      const scoreCalculate = "/calculations/update-score";
      const impactRequestBody = {
        user: 'You',
        proposal_id: "Proposal",
        param1: this.state.selectedCapitalOptionV1.value,
        operator: this.state.selectedCapitalOptionOperation.value,
        param2: this.state.selectedCapitalOptionV2.value,
        collection: "capital",
      };

      const headers = {
        "Access-Control-Allow-Origin": "*",
      };

        this.setState({"capitalResult":'Calculating...'});
      const impactResponse = await axios.post(
        `${impactApiRoot}${scoreCalculate}`,
        impactRequestBody,
        {
          headers: headers,
        }
      );

      this.setState({"capitalResult":impactResponse.data});

    }
  };

  caluclateTemperature = async () => {
    if (
      this.state.selectedOptionV1 &&
      this.state.selectedOptionV2 &&
      this.state.selectedOptionOperation
    ) {
      const impactApiRoot = "https://impact.projectkelvin.io";
      const scoreCalculate = "/calculations/update-score";
      const impactRequestBody = {
        user: 'You',
        proposal_id: "Proposal",
        param1: this.state.selectedOptionV1.value,
        operator: this.state.selectedOptionOperation.value,
        param2: this.state.selectedOptionV2.value,
        collection: "temperature",
      };

       this.setState({"temeratureResult":'Calculating...'});

      const impactResponse = await axios.post(
        `${impactApiRoot}${scoreCalculate}`,
        impactRequestBody
      );

 
       this.setState({"temeratureResult":impactResponse.data});
    }
  };

  handleChange(i, e) {
    let calcValues = this.state.calcValues;

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

    for (var i = 0; i < this.state.calcValues.length; i++) {
      var obj = {};
      obj.name = this.state.calcValues[i].name;
      obj.values = this.state.calcValues[i].name;
      variables[variables.length + i] = obj;
    }

    localStorage.setItem("impactflow", JSON.stringify(variables));
    //alert(JSON.stringify(this.state.formValues));
    window.location.href = "/output";
  }

  async componentDidMount() {
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
    const { selectedTimeOptionV1 } = this.state;
    const { selectedTimeOptionV2 } = this.state;
    const { selectedTimeOptionOperation } = this.state;
    const { selectedCapitalOptionV1 } = this.state;
    const { selectedCapitalOptionV2 } = this.state;
    const { selectedCapitalOptionOperation } = this.state;
    let variables = JSON.parse(localStorage.getItem("impactflow"));
    const options = [];

    const operation = [
      { label: "+", value: "+" },
      { label: "-", value: "-" },
      { label: "*", value: "*" },
      { label: "%", value: "/" },
    ];

    for (var i = 0; i < variables.length; i++) {
      var obj = {};
      obj.value = variables[i].values;
      obj.label = variables[i].name;
      options.push(obj);
    }

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
              <h3 class="text-color">Output - Step 3</h3>
            </div>
          </div>
          <div class="row">
            <div class="col my-block m-2 px-4 flex-column align-items-start">
              <h6 class="my-3 text-color">Temperature</h6>
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
              <div class="d-flex justify-content-between w-100 mb-2 myselect align-items-center  flex-row border-bottom pb-2">
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
              <div class="d-flex justify-content-between w-100 mb-2 align-items-center  flex-row">
                <h6>Result</h6>
                <p> {this.state.temeratureResult}</p>
              </div>
            </div>
          </div>

          <div class="row">
            <div class="col my-block m-2 px-4 flex-column align-items-start">
              <h6 class="my-3 text-color">Time</h6>
              <div class="d-flex justify-content-between w-100 mb-2 myselect align-items-center  flex-row">
                <h6>Variable 1</h6>
                <p>
                  {" "}
                  <Select
                    name="timevariable1"
                    value={selectedTimeOptionV1}
                    onChange={this.handleTimeV1Change}
                    options={options}
                  />
                </p>
              </div>
              <div class="d-flex justify-content-between w-100 mb-2 myselect align-items-center  flex-row">
                <h6>Operation</h6>
                <p>
                  {" "}
                  <Select
                    name="timeoperation"
                    value={selectedTimeOptionOperation}
                    onChange={this.handleTimeOperationChange}
                    options={operation}
                  />
                </p>
              </div>
              <div class="d-flex justify-content-between w-100 mb-2 myselect align-items-center  flex-row border-bottom pb-2">
                <h6>Variable 2</h6>
                <p>
                  {" "}
                  <Select
                    name="timevariable2"
                    value={selectedTimeOptionV2}
                    onChange={this.handleTimeV2Change}
                    options={options}
                  />
                </p>
              </div>
              <div class="d-flex justify-content-between w-100 mb-2 align-items-center  flex-row">
                <h6>Result</h6>
                <p>{this.state.timeResult} </p>
              </div>
            </div>
          </div>

          <div class="row">
            <div class="col my-block m-2 px-4 flex-column align-items-start">
              <h6 class="my-3 text-color">Capital</h6>

              <div class="d-flex justify-content-between w-100 mb-2 myselect align-items-center  flex-row">
                <h6>Variable 1</h6>
                <p>
                  {" "}
                  <Select
                    name="capitalvariable1"
                    value={selectedCapitalOptionV1}
                    onChange={this.handleCapitalV1Change}
                    options={options}
                  />
                </p>
              </div>
              <div class="d-flex justify-content-between w-100 mb-2 myselect align-items-center  flex-row">
                <h6>Operation</h6>
                <p>
                  {" "}
                  <Select
                    name="capitaloperation"
                    value={selectedCapitalOptionOperation}
                    onChange={this.handleCapitalOperationChange}
                    options={operation}
                  />
                </p>
              </div>
              <div class="d-flex justify-content-between w-100 mb-2 myselect align-items-center  flex-row border-bottom pb-2">
                <h6>Variable 2</h6>
                <p>
                  {" "}
                  <Select
                    name="capitalvariable2"
                    value={selectedCapitalOptionV2}
                    onChange={this.handleCapitalV2Change}
                    options={options}
                  />
                </p>
              </div>
              <div class="d-flex justify-content-between w-100 mb-2 align-items-center  flex-row">
                <h6>Result</h6>
                <p>{this.state.capitalResult} </p>
              </div>
            </div>
          </div>
          <div class="d-grid gap-2 mt-4">
           <a href="/" ><button class="btn btn-primary btn-color" type="button">
              {" "}
              Done
            </button></a>
          </div>
        </section>
      </div>
    );
  }
}

export default output;
