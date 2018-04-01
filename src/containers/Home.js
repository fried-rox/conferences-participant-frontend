import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Button, Table, HelpBlock } from "react-bootstrap";

import { invokeApig } from '../libs/awsLib';

// import "./css/Home.css";

export default class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: true,
      participant: [],
      parTitle: "",
      parFirstName: "",
      parMiddleName: "",
      parLastName: "",
      parGender: "",
      parWork: "",
      parWorkDepartment: "",
      parWorkStreet: "",
      parWorkCity: "",
      parWorkState: "",
      parWorkCountry: "",
      parWorkZIP: "",
      workPhoneCode: "",
      workPhoneNumber: "",
      parPersonalStreet: "",
      parPersonalCity: "",
      parPersonalState: "",
      parPersonalCountry: "",
      parPersonalZIP: "",
      mobilePhoneNumber: "",
      parNotes: ""
    };
  }

  async componentDidMount() {
    if (!this.props.isAuthenticated) {
      return;
    }
    try {
      const results = await this.participant();
      debugger;
      this.setState({
        participant: results,
        parTitle: results[0].parTitle,
        parFirstName: results[0].parFirstName,
        parMiddleName: results[0].parMiddleName,
        parLastName: results[0].parLastName,
        parGender: results[0].parGender,
        parWork: results[0].parWork,
        parWorkDepartment: results[0].parWorkDepartment,
        parWorkStreet: results[0].parWorkStreet,
        parWorkCity: results[0].parWorkCity,
        parWorkresults: results[0].parWorkresults,
        parWorkCountry: results[0].parWorkCountry,
        parWorkZIP: results[0].parWorkZIP,
        workPhoneCode: results[0].workPhoneCode,
        workPhoneNumber: results[0].workPhoneNumber,
        parPersonalStreet: results[0].parPersonalStreet,
        parPersonalCity: results[0].parPersonalCity,
        parPersonalresults: results[0].parPersonalresults,
        parPersonalCountry: results[0].parPersonalCountry,
        parPersonalZIP: results[0].parPersonalZIP,
        mobilePhoneNumber: results[0].mobilePhoneNumber,
        parNotes: results[0].parNotes
      });
    } catch (e) {
      alert(e);
    }

    this.setState({ isLoading: false });
  }

  participant() {
    return invokeApig({ path: "/participants" });
    // path: `/participants/${this.props.match.params.id}`
  }

  handleParticipantClick = event => {
    event.preventDefault();
    this.props.history.push(`/participant/${this.props.match.params.id}/updateprofile`);
  }

  handleRegClick = event => {
    event.preventDefault();
    this.props.history.push(`/participant/${this.props.match.params.id}/registration`);
  }

  handleSubmissionClick = event => {
    event.preventDefault();
    this.props.history.push(`/participant/${this.props.match.params.id}/submitabstract`);
  }

  handleReviewClick = event => {
    event.preventDefault();
    this.props.history.push(`/participant/${this.props.match.params.id}/reviewabstract`);
  }

  renderLander() {
    return (
      <div className="lander">
        <h1> Conference Title </h1>
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

  renderDashboard() {
    return (
      <div className="Dashboard">

        <h1>Conference Title</h1>

        <div className="profile">
          <Button id="profile" onClick={this.handleParticipantClick}>Update Profile</Button>
          <h2>Personal Details</h2>
          <HelpBlock>Please check your details and if anything has changed please ammend them by clicking the <b>Update Profile</b> button.</HelpBlock>
          <div>
            <Table responsive>
              <tbody>
                <tr>
                  <td>Title</td>
                  <td> {this.state.parTitle} </td>
                </tr>
                <tr>
                  <td>First Name</td>
                  <td> {this.state.parFirstName} </td>
                </tr>
                <tr>
                  <td>Middle Name</td>
                  <td> {this.state.parMiddleName} </td>
                </tr>
                <tr>
                  <td>Last Name</td>
                  <td> {this.state.parLastName} </td>
                </tr>
                <tr>
                  <td>Gender</td>
                  <td> {this.state.parGender} </td>
                </tr>
                <tr>
                  <td>Workplace</td>
                  <td> {this.state.parWork} Department {this.state.parWorkDepartment} </td>
                </tr>
              </tbody>
            </Table>
          </div>
          <h3>Contact details</h3>
          <div>
            <Table responsive>
              <tbody>
                <tr>
                  <td>Work Address</td>
                  <td>{this.state.parWorkStreet}</td>
                </tr>
                <tr>
                  <td>Work Number</td>
                  <td> {this.state.workPhoneCode} - {this.state.workPhoneNumber} </td>
                </tr>
                <tr>
                  <td>Mobile Number</td>
                  <td> {this.state.mobilePhoneNumber} </td>
                </tr>
              </tbody>
            </Table>
          </div>
        </div>

        <div className="registration">
          <h2>Registration</h2>
          <Button id="registration" onClick={this.handleRegClick}>Register</Button>
          <HelpBlock>To register for the conference please click the <b>Register</b> button</HelpBlock>
        </div>

        <div className="abstract">
          <h2>Scientific</h2>
          <h3>Abstract Submission</h3>
          <Button id="abstract" onClick={this.handleSubmissionClick}>Submit an Abstract</Button>
          <HelpBlock>To submit an abstract please click the <b>Submit an Abstract</b> button</HelpBlock>
          <h3>Abstract Review</h3>
          <Button id="review" onClick={this.handleReviewClick}>Review Abstracts</Button>
          <HelpBlock>To review abstracts please click the <b>Review an Abstract</b> button</HelpBlock>
        </div>

      </div>
    );
  }

  render() {
    return (
      <div className="Home">
        {this.props.isAuthenticated ? this.renderDashboard() : this.renderLander() }
      </div>
    );
  }
}
