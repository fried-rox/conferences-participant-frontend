import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Button, Table } from "react-bootstrap";
//import Search from 'react-search'

import { invokeApig } from '../libs/awsLib';

//import SearchNotes from "../components/SearchNotes";

export default class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: true,
      participant: null,
      parTitle: "",
      parFirstName: "",
      parMiddleName: "",
      parLastName: "",
      parSuffix: "",
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
      mobilePhoneCode: "",
      mobilePhoneNumber: "",
      parNotes: "",
      };
  }

  async componentDidMount() {
    if (!this.props.isAuthenticated) {
      return;
    }

    try {
      const results = await this.getParticipants();
      debugger;
      this.setState({
        participant: results,
        parTitle: results.parTitle,
        parFirstName: results.parFirstName,
        parMiddleName: results.parMiddleName,
        parLastName: results.parLastName,
        parSuffix: results.parSuffix,
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
        mobilePhoneCode: results.mobilePhoneCode,
        mobilePhoneNumber: results.mobilePhoneNumber,
        parNotes: results.parNotes,
      });
    } catch (e) {
      alert(e);
    }

    this.setState({ isLoading: false });
  }

  // createParticipant(participant) {
  //   return invokeApig({
  //     path: "/participants",
  //     method: "POST",
  //     body: participant
  //   });
  // }

  getParticipants() {
    return invokeApig({ path: `/participants/${this.props.match.params.id}` });
    debugger;
  }

  handleParticipantClick = event => {
    event.preventDefault();
    this.props.history.push(event.currentTarget.getAttribute("href"));
  }

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

  renderParticipants() {
    return (
      <div>
        <div className="Participant">
          <h2> Participant Information </h2>
          <Button
            className="update"
            key={this.state.participantId}
            onClick={this.handleParticipantClick} >
              <b>{"\uFF0B"}</b> Edit
          </Button>
          <h3> Personal Details </h3>
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
                  <td>Suffix</td>
                  <td> {this.state.parSuffix} </td>
                </tr>
                <tr>
                  <td>Gender</td>
                  <td> {this.state.parGender} </td>
                </tr>
                <tr>
                  <td>Workplace</td>
                  <td> {this.state.parWork} Department: {this.state.parWorkDepartment} </td>
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
                  <td>Moobile Number</td>
                  <td> {this.state.mobilePhoneCode} - {this.state.mobilePhoneNumber} </td>
                </tr>
              </tbody>
            </Table>
          </div>
        </div>
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
