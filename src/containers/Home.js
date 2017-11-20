import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Button } from "react-bootstrap";
// import decode from "jwt-decode";
// import { CognitoUserAttribute } from "amazon-cognito-identity-js";
// import Signup from "./Signup";
// import Login from "./Login";
//import Search from 'react-search'

// import { invokeApig } from '../libs/awsLib';

import "./Home.css";

//import SearchNotes from "../components/SearchNotes";

export default class Home extends Component {
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
    //
    // const attributeGoersID = await Login.CognitoUserAttribute(goersID);
    // if (attributeGoersID.Value === "") {
    //   alert("Please relogin");
    // } else {
    //   console.log(attributeGoersID);
    // }
  };
    // try {
    //   const results = await this.participants();
    //   this.setState({ participants: results });
    // } catch (e) {
    //   alert(e);
    // }
    //
    // this.setState({ isLoading: false });
  // }

  // participants() {
  //   return invokeApig({ path: `/participants/${this.props.match.params.id}` });
  // }

  renderLander() {
    return (
      <div className="lander">
        <h1>Conference Title</h1>
        <div>
          <Link to="/login" className="btn btn-info btn-lg">
            Login
          </Link>
          <Link to="/signup" className="btn btn-success btn-lg">
            Signup
          </Link>
        </div>
      </div>
    );
  }

  handleParticipantClick = event => {
    event.preventDefault();
    const path = window.location.pathname;
    console.log(path);
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
