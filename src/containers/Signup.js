import React, { Component } from "react";
// import Popup from "../components/Popup";

import { HelpBlock, FormGroup, FormControl, ControlLabel } from "react-bootstrap";
import { AuthenticationDetails, CognitoUserPool, CognitoUserAttribute } from "amazon-cognito-identity-js";
import uuid from "uuid";

import LoaderButton from "../components/LoaderButton";
import config from "../config";
import { invokeApig } from "../libs/awsLib";

import "../css/Signup.css";

export default class Signup extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: false,
      showPopup: true,
      email: "",
      password: "",
      confirmPassword: "",
      confirmationCode: "",
      newUser: null,
      dataGoersId: {
        Name: "",
        Value: null
      },
      conferenceId: "",
      participantId: "",
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

  togglePopup() {
    this.setState({
      showPopup: !this.state.showPopup
    });
  }

  validateForm() {
    return (
      this.state.parFirstName.length > 0 &&
      this.state.parLastName.length > 0 &&
      this.state.email.length > 0 &&
      this.state.password.length > 0 &&
      this.state.password === this.state.confirmPassword
    );
  }

  validateConfirmationForm() {
    return this.state.confirmationCode.length > 0;
  }

  handleChange = event => {
    this.setState({
      [event.target.id]: event.target.value
    });
  }

  handleSubmit = async event => {
    event.preventDefault();

    this.setState({ isLoading: true });

    try {
      const newUser = await this.signup(this.state.email, this.state.password);
      this.setState({
        newUser: newUser
      });
    } catch (e) {
      alert(e);
    }

    this.setState({ isLoading: false });
  }

  handleConfirmationSubmit = async event => {
    event.preventDefault();

    this.setState({ isLoading: true });

    try {
      await this.confirm(this.state.newUser, this.state.confirmationCode);
      await this.authenticate(
        this.state.newUser,
        this.state.email,
        this.state.password
      );

      this.props.userHasAuthenticated(true);

      try {
        const createParticipantObject = {
          conferenceId: localStorage.getItem("confIdKey"),
          participantId: this.state.dataGoersId.Value,
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
      await this.createParticipant(createParticipantObject);
      } catch (e) {
        alert(e);
      }
      debugger;
      localStorage.setItem("parRegId", this.state.dataGoersId.Value);
      this.props.history.push("/view_profile");
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

  signup(email, password) {
    const userPool = new CognitoUserPool({
      UserPoolId: config.cognito.USER_POOL_ID,
      ClientId: config.cognito.APP_CLIENT_ID
    });

    const attributeList = [];

    const dataEmail = {
      Name: 'email',
      Value: email
    };

    const dataGoersId = {
      Name: 'custom:participant-id',
      Value: uuid.v1()
    };

    this.setState({
      dataGoersId: dataGoersId
    })

    const attributeEmail = new CognitoUserAttribute(dataEmail);
    const attributeGoersID = new CognitoUserAttribute(dataGoersId);

    attributeList.push(attributeEmail);
    attributeList.push(attributeGoersID);

    console.log(attributeList);

    return new Promise((resolve, reject) =>
      userPool.signUp(email, password, attributeList, null, (err, result) => {
        if (err) {
          reject(err);
          return;
        }
        resolve(result.user);
      })
    );
  }

  //InvalidPasswordException: Password did not conform with policy: Password must have uppercase characters

  confirm(user, confirmationCode) {
    return new Promise((resolve, reject) =>
      user.confirmRegistration(confirmationCode, true, function(err, result) {
        if (err) {
          reject(err);
          return;
        }
        resolve(result);
      })
    );
  }

  authenticate(user, email, password) {
    const authenticationData = {
      Username: email,
      Password: password
    };
    const authenticationDetails = new AuthenticationDetails(authenticationData);

    return new Promise((resolve, reject) =>
      user.authenticateUser(authenticationDetails, {
        onSuccess: result => resolve(),
        onFailure: err => reject(err)
      })
    );
  }

  renderConfirmationForm() {
    return (
      <div className="confirm">
        <form onSubmit={this.handleConfirmationSubmit}>
          <FormGroup controlId="confirmationCode" bsSize="large">
            <ControlLabel>Confirmation Code</ControlLabel>
            <FormControl
              autoFocus
              type="tel"
              value={this.state.confirmationCode}
              onChange={this.handleChange}
            />
            <HelpBlock>Please check your email for the code.</HelpBlock>
          </FormGroup>
          <LoaderButton
            block
            bsSize="large"
            disabled={!this.validateConfirmationForm()}
            type="submit"
            isLoading={this.state.isLoading}
            text="Verify"
            loadingText="Verifying…"
          />
        </form>
      </div>
    );
  }

  renderForm() {
    return (
      <div className="SignUp">
        <img id="banner" src={require("../images/Banner.jpg")} alt="Conference Banner"/>
        <form onSubmit={this.handleSubmit}>
        <h3>Basic Details</h3>
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
          <h3>Affiliations</h3>
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
          <h3>Contact Details</h3>
          <FormGroup controlId="email">
            <ControlLabel>Email</ControlLabel>
            <FormControl
              autoFocus
              type="email"
              value={this.state.email}
              onChange={this.handleChange}
            />
          </FormGroup>
          <HelpBlock>Please use a valid email address.</HelpBlock>
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
          <h3>Security</h3>
          <FormGroup controlId="password">
            <ControlLabel>Password</ControlLabel>
            <FormControl
              value={this.state.password}
              onChange={this.handleChange}
              type="password"
            />
          </FormGroup>
          <HelpBlock>Must be at least 8 characters long with at least 1 number, 1 special character and 1 upper case letter.</HelpBlock>
          <FormGroup controlId="confirmPassword">
            <ControlLabel>Confirm Password</ControlLabel>
            <FormControl
              value={this.state.confirmPassword}
              onChange={this.handleChange}
              type="password"
            />
          </FormGroup>
          <LoaderButton
            block
            bsSize="large"
            disabled={!this.validateForm()}
            type="submit"
            isLoading={this.state.isLoading}
            text="Create Profile"
            loadingText="Creating a profile…"
          />
        </form>
      </div>
    );
  }

  render() {
    return (
      <div className="Signup">
        {this.state.newUser === null
          ? this.renderForm()
          : this.renderConfirmationForm()}
      </div>
    );
  }
}
