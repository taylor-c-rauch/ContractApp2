//this component holds the text fields to take input, and the submission button
import React, { Component } from "react";
import "./ContractForm.css";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles";
import grey from "@material-ui/core/colors/grey";
import SignaturePad from "react-signature-pad";

const theme = createMuiTheme({
  palette: {
    primary: grey
  }
});

export default class ContractForm extends Component {
  constructor(props) {
    super(props);
  }

  handleClear = () => {
    const signature = this.signaturePad;
    signature.clear();
  };

  render() {
    return (
      <div>
        <Card
          style={{
            marginLeft: 20,
            marginRight: 20,
            marginTop: 20,
            marginBottom: 20,
            backgroundColor: "#eff7f9"
          }}
        >
          <CardContent>
            <MuiThemeProvider theme={theme}>
              <TextField
                id="name"
                label="Name"
                fullWidth
                value={this.props.name}
                onChange={e => this.props.update("name", e.target.value)}
              />
              <TextField
                id="company"
                label="Company"
                fullWidth
                value={this.props.company}
                onChange={e => this.props.update("company", e.target.value)}
              />
              <TextField
                value={this.props.details}
                id="details"
                multiline
                rows="4"
                label="Details"
                fullWidth
                onChange={e => this.props.update("details", e.target.value)}
              />
              <br />
              <br />
              <potato>
                Electronic Signature (Please click ADD SIGNATURE before
                submitting)
              </potato>
            </MuiThemeProvider>

            <br />

            <SignaturePad ref={ref => (this.signaturePad = ref)} />
            <Button
              style={{ fontSize: "10px" }}
              onClick={e =>
                this.props.update("sig", this.signaturePad.toDataURL())
              }
            >
              Add Signature
            </Button>
            <Button style={{ fontSize: "10px" }} onClick={this.handleClear}>
              Clear Signature
            </Button>
          </CardContent>
        </Card>
        <center>
          <Grid container justify="center" spacing={8}>
            <Grid item>
              <Button
                onClick={e => {
                  this.props.submit(e);
                  this.handleClear();
                }}
              >
                {" "}
                Submit{" "}
              </Button>
            </Grid>
            <Grid item>
              <Button
                onClick={e => {
                  this.props.clear(e);
                  this.handleClear();
                }}
              >
                {" "}
                Clear{" "}
              </Button>
            </Grid>
          </Grid>
        </center>
      </div>
    );
  }
}
