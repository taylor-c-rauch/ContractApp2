//this component formats the tiles that display the submitted contrac†s

import React, { Component } from "react";
import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import firebase from "./firebase.js";
import DeleteIcon from "@material-ui/icons/Delete";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";

import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";

export default class ContractTile extends Component {
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
          <List>
            <ListItem>
              <Typography>
                <strong>Name: </strong>
                {this.props.form.name}
                <br />
                <strong>Company: </strong>
                {this.props.form.company}
                <br />
                <strong>Details: </strong>
                {this.props.form.details}
                <br />
                <img src={this.props.form.sig} width="200" />
              </Typography>
              <ListItemSecondaryAction>
                <Button
                  mini
                  onClick={e => this.props.handleRemove(e, this.props.form.id)}
                >
                  <DeleteIcon />
                </Button>
              </ListItemSecondaryAction>
            </ListItem>
          </List>
        </Card>
      </div>
    );
  }
}
