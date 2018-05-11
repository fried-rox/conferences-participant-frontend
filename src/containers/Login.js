import React, { Component } from "react";
// import { Link } from "react-router-dom";
import { FormGroup, FormControl, ControlLabel } from "react-bootstrap";
import { CognitoUserPool, AuthenticationDetails, CognitoUser } from "amazon-cognito-identity-js";
// import decode from "jwt-decode";
import uuid from "uuid";

// import { createParticipantObject } from "./CreateProfile";
import config from "../config";
import LoaderButton from "../components/LoaderButton";
import { invokeApig } from '../libs/awsLib';

import "../css/Login.css";

export default class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: false,
      email: "",
      password: "",
      message: "",
      newUser: null,
      participant: [],
      participantId: "",
      dataGoersId: {
        Name: "",
        Value: null
      }
    };
  }

  validateForm() {
    return this.state.email.length > 0 && this.state.password.length > 0;
  }

  handleChange = event => {
    this.setState({
      [event.target.id]: event.target.value
    });
  }

  handleSubmit = async event => {
    event.preventDefault();

    this.setState({ isLoading: true });

    try {
      const newUser = await this.login(this.state.email, this.state.password);
      debugger;
      this.setState({
        newUser: newUser
      });

      try {
        const results = await this.participant();
        debugger;
        this.setState({
          participant: results,
          participantId: results[0].participantId
        });
        localStorage.setItem("parRegId", this.state.participantId);
      } catch (e) {
        alert(e);
      }
      this.props.userHasAuthenticated(true);

    this.props.history.push(`/view_profile`);
    } catch (e) {
      alert(e);
      this.setState({ isLoading: false });
    }
  }

  handleCreateProfile = event => {
    event.preventDefault();
    this.props.history.push(`/new_cat_reg/${localStorage.getItem("confIdKey")}`);
  }

  login(email, password) {
    const userPool = new CognitoUserPool({
      UserPoolId: config.cognito.USER_POOL_ID,
      ClientId: config.cognito.APP_CLIENT_ID
    });
    const user = new CognitoUser({ Username: email, Pool: userPool });
    const authenticationData = { Username: email, Password: password };
    const authenticationDetails = new AuthenticationDetails(authenticationData);

    const dataGoersId = {
      Name: 'custom:participant-id',
      Value: uuid.v1()
    };

    this.setState({
      dataGoersId: dataGoersId
    })
    // const attributeGoersID = new CognitoUserAttribute(dataGoersId);
    // const goersID = decode(dataGoersId.getIdToken().getJwtToken)["custom:participant-id"];
    // const tokenExp = decode(dataGoersId.accessToken.jwtToken)["exp"];
    // const now = Math.round(new Date().getTime()/1000.0);
    //
    // window.localStorage.setItem('value', goersID);
    //
    // if (now < tokenExp) {
    //
    // } else {
    //   this.renderLander();
    // }

    return new Promise((resolve, reject) =>
      user.authenticateUser(authenticationDetails, {
        onSuccess: result => resolve(result),
        // onFailure: err => reject(err)
        onFailure: function(err) {
          if (err.code === 'UserNotFoundException') {
            reject("The email address entered does not exist in the system");
          } else if (err.code === 'NotAuthorizedException') {
            reject("Incorrect password");
          } else {
            reject(err.message);
          }
        }
      })
    );
  }

  participant() {
    return invokeApig({ path: "/participants" });
  }

  render() {
    return (
      <div className="LogIn">

        <div className="LogInMiddle">
          <img id="banner" src={require("../images/Banner.jpg")} alt="Conference Banner"/>
          <h2>LOGIN</h2>
          <p>*You may have previously attended an event organised by <img id="favicon_logo" src={require("../images/favicon.ico")} alt=""/><img id="logo" src={require("../images/target_logo_one.png")} alt="Target Conferences Ltd"/>.</p>
          <p> To check please Login:</p>
          <form onSubmit={this.handleSubmit}>
            <FormGroup controlId="email">
              <ControlLabel>Email</ControlLabel>
              <FormControl
                autoFocus
                type="email"
                value={this.state.email}
                onChange={this.handleChange}
              />
            </FormGroup>
            <FormGroup controlId="password">
              <ControlLabel>Password</ControlLabel>
              <FormControl
                value={this.state.password}
                onChange={this.handleChange}
                type="password"
              />
            </FormGroup>
            <LoaderButton
              id="loginbtn"
              block
              disabled={!this.validateForm()}
              type="submit"
              isLoading={this.state.isLoading}
              text="Login"
              loadingText="Logging in…"
            />
          </form>
        </div>

        <div className="signuplink">
          <p>YOUR EMAIL ADDRESS DOES NOT EXIST IN THE SYSTEM?</p>
          <LoaderButton
            id="signupbtn"
            block
            type="submit"
            onClick={this.handleCreateProfile}
            text="REGISTER HERE"
          />
        </div>

      </div>
    );
  }
}
