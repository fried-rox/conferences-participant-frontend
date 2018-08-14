import React, { Component } from "react";
import { Button, Table, HelpBlock } from "react-bootstrap";
// import decode from "jwt-decode";
// import { CognitoUserAttribute } from "amazon-cognito-identity-js";
// import Signup from "./Signup";
// import Login from "./Login";
//import Search from 'react-search'

import { invokeApig } from '../libs/awsLib';
import Login from "./Login";
import Navigationbar from "./Navigationbar";

import "../css/Dashboard.css";

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
      parNotes: "",
      conferenceTitle: ""
    };
  }

  async componentDidMount() {
    if (!this.props.isAuthenticated) {
      return;
    }
    try {
      const confResults = await this.getConference();
      debugger;
      const results = await this.getParticipants();
      debugger;
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
        parNotes: results.parNotes,
        conferenceTitle: confResults.confTitle
      });
    } catch (e) {
      alert(e);
    }

    this.setState({ isLoading: false });
  }

  getParticipants() {
    return invokeApig({ path: `/participants/${localStorage.getItem("parRegId")}` });
  }

  getConference() {
    return invokeApig({ path: `/conferences/${localStorage.getItem("confIdKey")}` });
  }

  handleParticipantClick = event => {
    event.preventDefault();
    this.props.history.push(`/update_profile`);
  }

  handleRegClick = event => {
    event.preventDefault();
    this.props.history.push(`/registration`);
  }

  handleAbstractClick = event => {
    event.preventDefault();
    this.props.history.push(`/submit_abstract`);
  }

  handleReviewClick = event => {
    event.preventDefault();
    this.props.history.push(`/review_abstract`);
  }

  renderDashboard() {
    return (
      <div className="MainHomeDashboard">

        <Navigationbar {...this.props}/>

        <div className="Dashboard">

          <div className="profile">
            <h2>{this.state.parTitle} {this.state.parFirstName} {this.state.parMiddleName} {this.state.parLastName}</h2>
            <HelpBlock id="edit">Please check if there are any changes.</HelpBlock>
            <div className="editinginfo">
              <Button id="editbtn" onClick={this.handleParticipantClick}>
                <span className="glyphicon glyphicon-pencil"></span></Button>
              <HelpBlock id="editclick">CLICK TO EDIT</HelpBlock>
            </div>
            <h3>Basic Details</h3>
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
            <h3>Contact Details</h3>
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

          <div className="participation">
            <img id="banner" src={require("../images/Banner.jpg")} alt="Conference Banner"/>
            <h3>Welcome to {this.state.conferenceTitle}</h3>
            <div className="registration">
              <Button id="registrationbtn" onClick={this.handleRegClick}><span className="glyphicon glyphicon-check"></span></Button>
              <HelpBlock id="reginfo">Bookings</HelpBlock>
            </div>

            <div className="abstract">
              <Button id="abstractbtn" onClick={this.handleAbstractClick}><span className="glyphicon glyphicon-list-alt"></span></Button>
              <HelpBlock id="subinfo">Abstract Submission</HelpBlock>
            </div>

            <div className="review">
              <Button id="reviewbtn" onClick={this.handleReviewClick}><span className="glyphicon glyphicon-eye-open"></span></Button>
              <HelpBlock id="revinfo">You are a reviewer for this event. Click here to review what has been assigned to you.</HelpBlock>
            </div>
          </div>

        </div>

      </div>
    );
  }

  renderLander() {
    return (
      <Login />
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
