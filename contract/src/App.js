//main app component
import React, { Component } from "react";
import "./App.css";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import ContractForm from "./ContractForm.js";
import Display from "./Display.js";
import firebase from "./firebase.js";

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      company: "",
      details: "",
      sig: ""
    };
  }
  //this function will be passed to children components to update state in this component
  updateField(field, newVal) {
    this.setState({ [field]: newVal });
  }
  //response when submit button (in contractForm.js) is clicked
  handleClick(e) {
    if (this.state.name === "" || this.state.company === "") {
      return null;
    }
    if (this.state.details === "") {
      this.setState({ details: "N/A" });
    }
    e.preventDefault();
    //create object with info currently in state
    let form = {
      name: this.state.name,
      company: this.state.company,
      details: this.state.details,
      sig: this.state.sig
    };
    //push new object to firebase
    const results = firebase.database().ref("contracts");
    results.push(form);
    //reset fields
    this.setState({ name: "", company: "", details: "", sig: "" });
  }

  handleClear(e) {
    e.preventDefault();
    this.setState({ name: "", company: "", details: "", sig: "" });
  }

  render() {
    return (
      <div>
        <ContractForm
          update={(field, newVal) => this.updateField(field, newVal)}
          name={this.state.name}
          company={this.state.company}
          details={this.state.details}
          submit={e => this.handleClick(e)}
          clear={e => this.handleClear(e)}
        />
        <br />
        <Display />
      </div>
    );
  }
}
