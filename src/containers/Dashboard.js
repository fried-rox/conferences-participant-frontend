import React, { Component } from "react";
import { Button } from "react-bootstrap";
// import decode from "jwt-decode";
// import { CognitoUserAttribute } from "amazon-cognito-identity-js";
// import Signup from "./Signup";
// import Login from "./Login";
//import Search from 'react-search'

// import { invokeApig } from '../libs/awsLib';

import "./Dashboard.css";

//import SearchNotes from "../components/SearchNotes";

export default class Dashboard extends Component {
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

  render() {
    return (
      <div className="Dashboard">

        <div className="profile">
          <Button onClick={this.handleParticipantClick}>Profile</Button>
        </div>

        <div className="registration">
          <Button>Registration</Button>
        </div>

        <div className="abstract">
          <Button>Abstract Submission</Button>
        </div>

      </div>
    );
  }
}
