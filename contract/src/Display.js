//this component displays the submitted contracts from firebase
import React, { Component } from "react";

import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import firebase from "./firebase.js";
import DeleteIcon from "@material-ui/icons/Delete";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import ContractTile from "./ContractTile.js";

export default class Display extends Component {
  constructor() {
    super();
    //submitted state will hold info pulled from firebase
    this.state = { submitted: [] };
  }

  componentDidMount() {
    //get data from firebase
    const results = firebase.database().ref("contracts");
    //every time there is a change, take snapshot, iterate through and put in submitted state
    results.on("value", snapshot => {
      let submittedContracts = snapshot.val();
      let submitted = [];
      for (let form in submittedContracts) {
        submitted.push({
          name: submittedContracts[form].name,
          company: submittedContracts[form].company,
          details: submittedContracts[form].details,
          sig: submittedContracts[form].sig,
          id: form
        });
      }
      this.setState({ submitted: submitted });
    });
  }

  //response when remove button is clicked
  handleRemove(e, id) {
    e.preventDefault();
    const RemoveForm = firebase.database().ref("/contracts/" + id);
    RemoveForm.remove();
  }
  removeAll(e) {
    e.preventDefault();
    for (let form in this.state.submitted) {
      const RemoveForm = firebase
        .database()
        .ref("/contracts/" + this.state.submitted[form].id);
      RemoveForm.remove();
    }
  }

  render() {
    return (
      <div>
        <AppBar position="static" style={{ backgroundColor: "#07575B" }}>
          <br />
        </AppBar>
        <AppBar position="static" style={{ backgroundColor: "#66A5AD" }}>
          <Toolbar>
            <Typography variant="title" color="inherit" style={{ flex: 1 }}>
              Submitted Contracts
            </Typography>
            <Button
              color="inherit"
              size="small"
              onClick={e => this.removeAll(e)}
            >
              Remove All
            </Button>
          </Toolbar>
        </AppBar>
        {this.state.submitted.map(form => (
          <ContractTile
            form={form}
            handleRemove={(e, id) => this.handleRemove(e, id)}
          />
        ))}
      </div>
    );
  }
}
