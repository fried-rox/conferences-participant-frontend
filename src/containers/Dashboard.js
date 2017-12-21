import React, { Component } from "react";
import { Button, Table, HelpBlock } from "react-bootstrap";
// import decode from "jwt-decode";
// import { CognitoUserAttribute } from "amazon-cognito-identity-js";
// import Signup from "./Signup";
// import Login from "./Login";
//import Search from 'react-search'

import { invokeApig } from '../libs/awsLib';

import "./Dashboard.css";

//import SearchNotes from "../components/SearchNotes";

export default class Dashboard extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: true,
      participant: null,
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
      const results = await this.getParticipants();
      this.setState({
        participant: results,
        parTitle: results.parTitle,
        parFirstName: results.parFirstName,
        parMiddleName: results.parMiddleName,
        parLastName: results.parLastName,
        parGender: results.parGender,
        parWork: results.parWork,
        parWorkDepartment: results.parWorkDepartment,
        parWorkStreet: results.parWorkStreet,
        parWorkCity: results.parWorkCity,
        parWorkresults: results.parWorkresults,
        parWorkCountry: results.parWorkCountry,
        parWorkZIP: results.parWorkZIP,
        workPhoneCode: results.workPhoneCode,
        workPhoneNumber: results.workPhoneNumber,
        parPersonalStreet: results.parPersonalStreet,
        parPersonalCity: results.parPersonalCity,
        parPersonalresults: results.parPersonalresults,
        parPersonalCountry: results.parPersonalCountry,
        parPersonalZIP: results.parPersonalZIP,
        mobilePhoneNumber: results.mobilePhoneNumber,
        parNotes: results.parNotes
      });
    } catch (e) {
      alert(e);
    }

    this.setState({ isLoading: false });
  }

  getParticipants() {
    return invokeApig({ path: `/participants/${this.props.match.params.id}` });
  }

  handleParticipantClick = event => {
    event.preventDefault();
    this.props.history.push(`/participant/${this.props.match.params.id}/updateprofile`);
  }

  render() {
    return (
      <div className="Dashboard">

        <div className="profile">
          <Button id="profile" onClick={this.handleParticipantClick}>Update Profile</Button>
          <h2>Personal Details</h2>
          <HelpBlock>Please check your details and if anything has changed please ammend them by clicking the Update Profile button.</HelpBlock>
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
          <Button id="registration">Register</Button>
        </div>

        <div className="abstract">
          <h2>Scientific</h2>
          <Button id="abstract">Submit an Abstract</Button>
        </div>

      </div>
    );
  }
}
