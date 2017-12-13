import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Button } from "react-bootstrap";
// import decode from "jwt-decode";
// import { CognitoUserAttribute } from "amazon-cognito-identity-js";
// import Signup from "./Signup";
// import Login from "./Login";
//import Search from 'react-search'

import { invokeApig } from '../libs/awsLib';

import "./Home.css";

//import SearchNotes from "../components/SearchNotes";

export default class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: true,
      participant: []
    };
  }

  async componentDidMount() {
    if (!this.props.isAuthenticated) {
      return;
    }
    try {
      const results = await this.participant();
      this.setState({ participant: results });
    } catch (e) {
      alert(e);
    }

    this.setState({ isLoading: false });
  }

  participant() {
    return invokeApig({ path: "/participants" });
  }

  renderLander() {
    return (
      <div className="lander">
        <h1>Conference Title</h1>
        <div>
          <Link to="/signup" id="signupbtn">
            Signup
          </Link>
          <Link to="/login" id="loginbtn">
            Login
          </Link>
        </div>
      </div>
    );
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

  renderParticipants() {
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

  render() {
    return (
      <div className="Home">
        {this.props.isAuthenticated ? this.renderParticipants() : this.renderLander()}
      </div>
    );
  }
}
