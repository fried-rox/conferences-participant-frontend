import React, { Component } from "react";
// import { Navbar, Nav } from "react-bootstrap";

import RouteNavItem from "../components/RouteNavItem";

import "../css/Navigationbar.css";

export default class Navigationbar extends Component {

  handleDetailsClick = event => {
    event.preventDefault();
    this.props.history.push("/view_profile");
  }

  handleRegistrationClick = event => {
    event.preventDefault();
    this.props.history.push("/registration");
  }

  handleSubmissionClick = event => {
    event.preventDefault();
    this.props.history.push("/submit_abstract");
  }

  handleReviewClick = event => {
    event.preventDefault();
    this.props.history.push("/review_abstract");
  }

  render() {
    return (
      <div className="navbarsecond">
        <RouteNavItem key={4} id="home" onClick={this.handleDetailsClick}>Home</RouteNavItem>
        <RouteNavItem key={5} id="reg" onClick={this.handleRegistrationClick}>Bookings</RouteNavItem>
        <RouteNavItem key={6} id="absub" onClick={this.handleSubmissionClick}>Submission</RouteNavItem>
        <RouteNavItem key={7} id="abrev" onClick={this.handleReviewClick}>Review</RouteNavItem>
      </div>
    );
  }
}
