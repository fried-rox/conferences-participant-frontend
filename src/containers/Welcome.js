import React, { Component } from "react";
import { Button } from "react-bootstrap";
// import decode from "jwt-decode";
// import { CognitoUserAttribute } from "amazon-cognito-identity-js";
// import Signup from "./Signup";
// import Login from "./Login";
//import Search from 'react-search'

// import { invokeApig } from '../libs/awsLib';

import "./Welcome.css";

//import SearchNotes from "../components/SearchNotes";

export default class Welcome extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: true
    };
  }

  async componentDidMount() {
    if (!this.props.isAuthenticated) {
      return;
    }
  }

  handleParticipantClick = event => {
    event.preventDefault();
    const path = window.location.pathname;
    console.log(path);
    const id = path.slice(13, path.length);
    console.log(id);
    this.props.history.push(path + "/viewprofile");
  }
  //event.currentTarget.getAttribute(`/participants/${this.state.newUser.username}`)

  render() {
    return (
      <div>
        <Button
          className="profile"
          onClick={this.handleParticipantClick}>Profile</Button>
        <Button className="regisration">Registration</Button>
        <Button className="abstract">Abstract Submission</Button>
      </div>
    );
  }
}
