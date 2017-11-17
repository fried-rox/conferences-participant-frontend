import React, { Component } from "react";
import { FormGroup, FormControl, ControlLabel } from "react-bootstrap";
import { CognitoUserPool, AuthenticationDetails, CognitoUser } from "amazon-cognito-identity-js";
import decode from "jwt-decode";

import config from "../config";
import LoaderButton from "../components/LoaderButton";

import "./Login.css";

export default class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: false,
      email: "",
      password: "",
      message: ""
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
      await this.login(this.state.email, this.state.password);
      this.props.userHasAuthenticated(true);
    } catch (e) {
      alert(e);
      this.setState({ isLoading: false });
    }
  }

  async login(email, password) {
    const userPool = new CognitoUserPool({
      UserPoolId: config.cognito.USER_POOL_ID,
      ClientId: config.cognito.APP_CLIENT_ID
    });
    const user = new CognitoUser({ Username: email, Pool: userPool });
    const authenticationData = { Username: email, Password: password };
    const authenticationDetails = new AuthenticationDetails(authenticationData);

    try{
      const goersID = await decode(user.getIdToken().getJwtToken)["custom:participant-id"];
      console.log(goersID);
      const tokenExp = decode(user.accessToken.jwtToken)["exp"];
      debugger;
      const now = Math.round(new Date().getTime()/1000.0);

      window.localStorage.setItem('value', goersID);
      console.log(goersID);

      if (now < tokenExp) {
        this.props.history.push(`participant/${this.goersID}`);
      } else {
        this.setState({message: "Login session has expire, please login back in"})
      }
    }
    catch(e){
      this.setState({
        message: e.message
      });
    }

    return new Promise((resolve, reject) =>
      user.authenticateUser(authenticationDetails, {
        onSuccess: result => resolve(result),
        onFailure: err => reject(err)
      })
    );
  }

  // async login() {
  //   try{
  //     const loggedIn = await this.loginCog();
  //     const goersID = decode(loggedIn.getIdToken().getJwtToken)["custom:participant-id"];
  //     const tokenExp = decode(loggedIn.accessToken.jwtToken)["exp"];
  //     debugger;
  //     const now = Math.round(new Date().getTime()/1000.0);
  //
  //     window.localStorage.setItem('value', goersID);
  //     console.log(goersID);
  //
  //     if (now < tokenExp) {
  //       this.props.history.push(`participant/${this.goersID}`);
  //     } else {
  //       this.setState({message: "Login session has expire, please login back in"})
  //     }
  //   }
  //   catch(e){
  //     this.setState({
  //       message: e.message
  //     });
  //   }
  // }

  render() {
    return (
      <div className="Login">
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
