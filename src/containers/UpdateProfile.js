import React, { Component } from "react";
import { FormGroup, FormControl, ControlLabel, Button  } from "react-bootstrap";

import LoaderButton from "../components/LoaderButton";
import { invokeApig } from "../libs/awsLib";
import Navigationbar from "./Navigationbar";

import "../css/UpdateProfile.css";

export default class UpdateProfile extends Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      isLoading: false,
      participant: "",
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

  async componentDidMount() {
    try {
      const results = await this.getParticipant();
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
      });
    } catch (e) {
      alert(e);
    }
  }

  getParticipant() {
    return invokeApig({ path: `/participants/${localStorage.getItem("parRegId")}` });
  }

  validateForm() {
    return this.state.parFirstName.length > 0 && this.state.parLastName.length > 0;
  }

  handleChange = event => {
    this.setState({
      [event.target.id]: event.target.value
    });
  }

  saveParticipant(participant) {
    return invokeApig({
      path: `/participants/${localStorage.getItem("parRegId")}`,
      method: "PUT",
      body: participant
    });
  }

  handleSubmit = async event => {

    event.preventDefault();

    this.setState({ isLoading: true });

    try {
      await this.saveParticipant({
        ...this.state.participant,
        parTitle: this.state.parTitle,
        parFirstName: this.state.parFirstName,
        parMiddleName: this.state.parMiddleName,
        parLastName: this.state.parLastName,
        parGender: this.state.parGender,
        parWork: this.state.parWork,
        parWorkDepartment: this.state.parWorkDepartment,
        parWorkStreet: this.state.parWorkStreet,
        parWorkCity: this.state.parWorkCity,
        parWorkresults: this.state.parWorkresults,
        parWorkCountry: this.state.parWorkCountry,
        parWorkZIP: this.state.parWorkZIP,
        workPhoneCode: this.state.workPhoneCode,
        workPhoneNumber: this.state.workPhoneNumber,
        parPersonalStreet: this.state.parPersonalStreet,
        parPersonalCity: this.state.parPersonalCity,
        parPersonalState: this.state.parPersonalState,
        parPersonalCountry: this.state.parPersonalCountry,
        parPersonalZIP: this.state.parPersonalZIP,
        mobilePhoneNumber: this.state.mobilePhoneNumber,
        parNotes: this.state.parNotes
      });
      this.props.history.push("/view_profile");
    } catch (e) {
      alert(e);

    this.setState({ isLoading: false });
    }
  }

  render() {
    return (
      <div>

        <Navigationbar {...this.props}/>

        <div className="UpdateProfile">

          <div className="idenification">
            <span class="glyphicon glyphicon-user"></span>
            <h1>{this.state.parTitle} {this.state.parFirstName} {this.state.parMiddleName} {this.state.parLastName}</h1>
          </div>

          <div className="ParticipantUpdate">
          {this.state.participant &&
            <form onSubmit={this.handleSubmit}>
              <h2>Basic Details</h2>
              <FormGroup controlId="parTitle">
                <ControlLabel>Title</ControlLabel>
                <FormControl
                  onChange={this.handleChange}
                  value={this.state.parTitle || ''}
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
                  value={this.state.parFirstName || ''}
                  type="text"/>
              </FormGroup>
              <FormGroup controlId="parMiddleName">
                <ControlLabel>Middle Name</ControlLabel>
                <FormControl
                  onChange={this.handleChange}
                  value={this.state.parMiddleName || ''}
                  type="text"/>
              </FormGroup>
              <FormGroup controlId="parLastName">
                <ControlLabel>Last Name</ControlLabel>
                <FormControl
                  onChange={this.handleChange}
                  value={this.state.parLastName || ''}
                  type="text"/>
              </FormGroup>
              <FormGroup controlId="parGender">
                <ControlLabel>Gender</ControlLabel>
                <FormControl
                  onChange={this.handleChange}
                  value={this.state.parGender || ''}
                  componentClass="select">
                    <option value="Female">Female</option>
                    <option value="Male">Male</option>
                </FormControl>
              </FormGroup>
              <h2>Affiliations</h2>
              <FormGroup controlId="parWork">
                <ControlLabel>Workplace</ControlLabel>
                <FormControl
                  onChange={this.handleChange}
                  value={this.state.parWork || ''}
                  type="text"/>
              </FormGroup>
              <FormGroup controlId="parWorkDepartment">
                <ControlLabel>Department</ControlLabel>
                <FormControl
                  onChange={this.handleChange}
                  value={this.state.parWorkDepartment || ''}
                  type="text"/>
              </FormGroup>
              <FormGroup controlId="parWorkStreet">
                <ControlLabel>Work Street Address</ControlLabel>
                <FormControl
                  onChange={this.handleChange}
                  value={this.state.parWorkStreet || ''}
                  type="text"/>
              </FormGroup>
              <FormGroup controlId="parWorkCity">
                <ControlLabel>City</ControlLabel>
                <FormControl
                  onChange={this.handleChange}
                  value={this.state.parWorkCity || ''}
                  type="text"/>
              </FormGroup>
              <FormGroup controlId="parWorkState">
                <ControlLabel>State</ControlLabel>
                <FormControl
                  onChange={this.handleChange}
                  value={this.state.parWorkState || ''}
                  type="text"/>
              </FormGroup>
              <FormGroup controlId="parWorkCountry">
                <ControlLabel>Country</ControlLabel>
                <FormControl
                  onChange={this.handleChange}
                  value={this.state.parWorkCountry || ''}
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
                  value={this.state.parWorkZIP || ''}
                  type="text"/>
              </FormGroup>
              <FormGroup controlId="workPhoneCode">
                <ControlLabel>Work Phone Code</ControlLabel>
                <FormControl
                  onChange={this.handleChange}
                  value={this.state.workPhoneCode || ''}
                  componentClass="select">
                    <option value="00972"></option>
                    <option value="00975"></option>
                </FormControl>
              </FormGroup>
              <FormGroup controlId="workPhoneNumber">
                <ControlLabel>Work Phone Number</ControlLabel>
                <FormControl
                  onChange={this.handleChange}
                  value={this.state.workPhoneNumber || ''}
                  type="text" />
              </FormGroup>
              <Button
                id="newaffiliation">
                <span class="glyphicon glyphicon-plus"></span>
                  Add Affiliation
              </Button>
              <h2>Contact Details</h2>
              <FormGroup controlId="parPersonalStreet">
                <ControlLabel>Personal Street Address</ControlLabel>
                <FormControl
                  onChange={this.handleChange}
                  value={this.state.parPersonalStreet || ''}
                  type="text"/>
              </FormGroup>
              <FormGroup controlId="parPersonalCity">
                <ControlLabel>City</ControlLabel>
                <FormControl
                  onChange={this.handleChange}
                  value={this.state.parPersonalCity || ''}
                  type="text"/>
              </FormGroup>
              <FormGroup controlId="parPersonalState">
                <ControlLabel>State</ControlLabel>
                <FormControl
                  onChange={this.handleChange}
                  value={this.state.parPersonalState || ''}
                  type="text"/>
              </FormGroup>
              <FormGroup controlId="parPersonalCountry">
                <ControlLabel>Country</ControlLabel>
                <FormControl
                  onChange={this.handleChange}
                  value={this.state.parPersonalCountry || ''}
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
                  value={this.state.parPersonalZIP || ''}
                  type="text"/>
              </FormGroup>
              <FormGroup controlId="mobilePhoneNumber">
                <ControlLabel>Mobile Phone Number</ControlLabel>
                <FormControl
                  onChange={this.handleChange}
                  value={this.state.mobilePhoneNumber || ''}
                  type="text" />
              </FormGroup>
              <h2>Extra Information</h2>
              <FormGroup controlId="parNotes">
                <ControlLabel>Notes</ControlLabel>
                <FormControl
                  onChange={this.handleChange}
                  value={this.state.parNotes || ''}
                  componentClass="textarea"/>
              </FormGroup>
              <LoaderButton
                className="create-button"
                block
                disabled={!this.validateForm()}
                type="submit"
                isLoading={this.state.isLoading}
                text="Update"
                loadingText="Updating…"
              />
            </form>}
          </div>

        </div>
      </div>
    );
  }
}
