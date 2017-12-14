import React, { Component } from "react";
import { FormGroup, FormControl, ControlLabel } from "react-bootstrap";
import { CognitoUserPool, AuthenticationDetails, CognitoUser } from "amazon-cognito-identity-js";
// import decode from "jwt-decode";
import uuid from "uuid";

// import { createParticipantObject } from "./CreateProfile";
import config from "../config";
import LoaderButton from "../components/LoaderButton";
import { invokeApig } from '../libs/awsLib';

import "./Login.css";

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
        this.setState({
          participant: results
        });
      } catch (e) {
        alert(e);
      }
      this.props.userHasAuthenticated(true);
      if (this.state.participant.length === 0) {
        this.props.history.push(`/participant/${this.state.dataGoersId.Value}/createprofile`);
      } else {
        this.props.history.push(`/participant/${this.state.participant[0].participantId}`);
      }
    } catch (e) {
      alert(e);
      this.setState({ isLoading: false });
    }
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
        onFailure: err => reject(err)
      })
    );
  }

  participant() {
    return invokeApig({ path: "/participants" });
  }

  render() {
    return (
      <div className="LogIn">
        <h1>Conference Title</h1>
        <p>Target Conferences Ltd</p>
        <form onSubmit={this.handleSubmit}>
          <FormGroup controlId="email" bsSize="large">
            <ControlLabel>Email</ControlLabel>
            <FormControl
              autoFocus
              type="email"
              value={this.state.email}
              onChange={this.handleChange}
            />
          </FormGroup>
          <FormGroup controlId="password" bsSize="large">
            <ControlLabel>Password</ControlLabel>
            <FormControl
              value={this.state.password}
              onChange={this.handleChange}
              type="password"
            />
          </FormGroup>
          <LoaderButton
            block
            bsSize="large"
            disabled={!this.validateForm()}
            type="submit"
            isLoading={this.state.isLoading}
            text="Login"
            loadingText="Logging in…"
          />
        </form>
      </div>
    );
  }
}
