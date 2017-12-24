import React, { Component } from "react";
import { FormGroup, FormControl, ControlLabel, PageHeader  } from "react-bootstrap";

import LoaderButton from "../components/LoaderButton";
// import Home from "./Home";
// import config from "../config";
import { invokeApig } from "../libs/awsLib";

import "./CreateProfile.css";

export default class CreateProfile extends Component {
  constructor(props, context) {
    super(props, context);

    this.file = null;

    this.state = {
      isLoading: false,
      participantId: window.location.pathname.slice(13, 49),
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
    };
  }

  validateForm() {
    return this.state.parFirstName.length > 0 && this.state.parLastName.length > 0;
  }

  handleChange = event => {
    this.setState({
      [event.target.id]: event.target.value
    });
  }


  handleSubmit = async event => {
    event.preventDefault();

    try {
        const createParticipantObject = {
          participantId: this.state.participantId,
          parTitle: this.state.parTitle === "" ? undefined : this.state.parTitle,
          parFirstName: this.state.parFirstName === "" ? undefined : this.state.parFirstName,
          parMiddleName: this.state.parMiddleName === "" ? undefined : this.state.parMiddleName,
          parLastName: this.state.parLastName === "" ? undefined : this.state.parLastName,
          parGender: this.state.parGender === "" ? undefined : this.state.parGender,
          parWork: this.state.parWork === "" ? undefined : this.state.parWork,
          parWorkDepartment: this.state.parWorkDepartment === "" ? undefined : this.state.parWorkDepartment,
          parWorkStreet: this.state.parWorkStreet === "" ? undefined : this.state.parWorkStreet,
          parWorkCity: this.state.parWorkCity === "" ? undefined : this.state.parWorkCity,
          parWorkState: this.state.parWorkState === "" ? undefined : this.state.parWorkState,
          parWorkCountry: this.state.parWorkCountry === "" ? undefined : this.state.parWorkCountry,
          parWorkZIP: this.state.parWorkZIP === "" ? undefined : this.state.parWorkZIP,
          workPhoneCode: this.state.workPhoneCode === "" ? undefined : this.state.workPhoneCode,
          workPhoneNumber: this.state.workPhoneNumber === "" ? undefined : this.state.workPhoneNumber,
          parPersonalStreet: this.state.parPersonalStreet === "" ? undefined : this.state.parPersonalStreet,
          parPersonalCity: this.state.parPersonalCity === "" ? undefined : this.state.parPersonalCity,
          parPersonalState: this.state.parPersonalState === "" ? undefined : this.state.parPersonalState,
          parPersonalCountry: this.state.parPersonalCountry === "" ? undefined : this.state.parPersonalCountry,
          parPersonalZIP: this.state.parPersonalZIP === "" ? undefined : this.state.parPersonalZIP,
          mobilePhoneNumber: this.state.mobilePhoneNumber === "" ? undefined : this.state.mobilePhoneNumber,
          parNotes: this.state.parNotes === "" ? undefined : this.state.parNotes,
        }

        console.log(createParticipantObject);

      await this.createParticipant(createParticipantObject);
      const path = window.location.pathname.replace("createprofile", "viewprofile");
      console.log(path);
      this.props.history.push(path);
    } catch (e) {
      alert(e);
      this.setState({ isLoading: false });
    }
  }

  createParticipant(participant) {
    return invokeApig({
      path: "/participants",
      method: "POST",
      body: participant
    });
  }

  render() {
    return (
      <div className="NewPar">
        <PageHeader>
          Create a Profile
        </PageHeader>
        <form onSubmit={this.handleSubmit}>
          <FormGroup controlId="parTitle">
            <ControlLabel>Title</ControlLabel>
            <FormControl
              onChange={this.handleChange}
              value={this.state.parTitle}
              componentClass="select">
                <option value="Mr">Mr</option>
                <option value="Mrs">Mrs</option>
                <option value="Ms">Ms</option>
                <option value="Prof">Prof</option>
                <option value="Dr">Dr</option>
            </FormControl>
          </FormGroup>
          <FormGroup controlId="parFirstName">
            <ControlLabel>First Name</ControlLabel>
            <FormControl
              onChange={this.handleChange}
              value={this.state.parFirstName}
              type="text"/>
          </FormGroup>
          <FormGroup controlId="parMiddleName">
            <ControlLabel>Middle Name</ControlLabel>
            <FormControl
              onChange={this.handleChange}
              value={this.state.parMiddleName}
              type="text"/>
          </FormGroup>
          <FormGroup controlId="parLastName">
            <ControlLabel>Last Name</ControlLabel>
            <FormControl
              onChange={this.handleChange}
              value={this.state.parLastName}
              type="text"/>
          </FormGroup>
          <FormGroup controlId="parGender">
            <ControlLabel>Gender</ControlLabel>
            <FormControl
              onChange={this.handleChange}
              value={this.state.parGender}
              componentClass="select">
                <option value="Female">Female</option>
                <option value="Male">Male</option>
            </FormControl>
          </FormGroup>
          <FormGroup controlId="parWork">
            <ControlLabel>Workplace</ControlLabel>
            <FormControl
              onChange={this.handleChange}
              value={this.state.parWork}
              type="text"/>
          </FormGroup>
          <FormGroup controlId="parWorkDepartment">
            <ControlLabel>Department</ControlLabel>
            <FormControl
              onChange={this.handleChange}
              value={this.state.parWorkDepartment}
              type="text"/>
          </FormGroup>
          <FormGroup controlId="parWorkStreet">
            <ControlLabel>Work Street Address</ControlLabel>
            <FormControl
              onChange={this.handleChange}
              value={this.state.parWorkStreet}
              type="text"/>
          </FormGroup>
          <FormGroup controlId="parWorkCity">
            <ControlLabel>City</ControlLabel>
            <FormControl
              onChange={this.handleChange}
              value={this.state.parWorkCity}
              type="text"/>
          </FormGroup>
          <FormGroup controlId="parWorkState">
            <ControlLabel>State</ControlLabel>
            <FormControl
              onChange={this.handleChange}
              value={this.state.parWorkState}
              type="text"/>
          </FormGroup>
          <FormGroup controlId="parWorkCountry">
            <ControlLabel>Country</ControlLabel>
            <FormControl
              onChange={this.handleChange}
              value={this.state.parWorkCountry}
              componentClass="select">
                <option value="Israel">Israel</option>
                <option value="South Africa">South Africa</option>
                <option value="England">England</option>
                <option value="China">China</option>
                <option value="India">India</option>
            </FormControl>
          </FormGroup>
          <FormGroup controlId="parWorkZIP">
            <ControlLabel>ZIP</ControlLabel>
            <FormControl
              onChange={this.handleChange}
              value={this.state.parWorkZIP}
              type="text"/>
          </FormGroup>
          <FormGroup controlId="workPhoneCode">
            <ControlLabel>Work Phone Code</ControlLabel>
            <FormControl
              onChange={this.handleChange}
              value={this.state.workPhoneCode}
              componentClass="select">
                <option value="00972"></option>
                <option value="00975"></option>
            </FormControl>
          </FormGroup>
          <FormGroup controlId="workPhoneNumber">
            <ControlLabel>Work Phone Number</ControlLabel>
            <FormControl
              onChange={this.handleChange}
              value={this.state.workPhoneNumber}
              type="text" />
          </FormGroup>
          <FormGroup controlId="parPersonalStreet">
            <ControlLabel>Personal Street Address</ControlLabel>
            <FormControl
              onChange={this.handleChange}
              value={this.state.parPersonalStreet}
              type="text"/>
          </FormGroup>
          <FormGroup controlId="parPersonalCity">
            <ControlLabel>City</ControlLabel>
            <FormControl
              onChange={this.handleChange}
              value={this.state.parPersonalCity}
              type="text"/>
          </FormGroup>
          <FormGroup controlId="parPersonalState">
            <ControlLabel>State</ControlLabel>
            <FormControl
              onChange={this.handleChange}
              value={this.state.parPersonalState}
              type="text"/>
          </FormGroup>
          <FormGroup controlId="parPersonalCountry">
            <ControlLabel>Country</ControlLabel>
            <FormControl
              onChange={this.handleChange}
              value={this.state.parPersonalCountry}
              componentClass="select">
                <option value="Israel">Israel</option>
                <option value="South Africa">South Africa</option>
                <option value="England">England</option>
                <option value="China">China</option>
                <option value="India">India</option>
            </FormControl>
          </FormGroup>
          <FormGroup controlId="parPersonalZIP">
            <ControlLabel>ZIP</ControlLabel>
            <FormControl
              onChange={this.handleChange}
              value={this.state.parPersonalZIP}
              type="text"/>
          </FormGroup>
          <FormGroup controlId="mobilePhoneNumber">
            <ControlLabel>Mobile Phone Number</ControlLabel>
            <FormControl
              onChange={this.handleChange}
              value={this.state.mobilePhoneNumber}
              type="text" />
          </FormGroup>
          <FormGroup controlId="parNotes">
            <ControlLabel>Notes</ControlLabel>
            <FormControl
              onChange={this.handleChange}
              value={this.state.parNotes}
              componentClass="textarea"/>
          </FormGroup>
          <LoaderButton
            className="create-button"
            block
            bsStyle="primary"
            bsSize="large"
            disabled={!this.validateForm()}
            type="submit"
            isLoading={this.state.isLoading}
            text="Create"
            loadingText="Creating…"
          />
        </form>
      </div>
    );
  }
}
