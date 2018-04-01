import React, { Component } from "react";
import { Navbar, Nav } from "react-bootstrap";

import RouteNavItem from "../components/RouteNavItem";

// import './Navigationbar.css';

export default class Navigationbar extends Component {

  handleDashboardClick = event => {
    event.preventDefault();
    this.props.history.push(`/participant/${this.props.match.params.id}`);
  }

  render() {
    return (
      <div>
        <Navbar className="nav-container">
          <Nav>
            <RouteNavItem key={4} onClick={this.handleDashboardClick}>Dashboard</RouteNavItem>
            <RouteNavItem key={5} href="#">Profile</RouteNavItem>
            <RouteNavItem key={6} href="#">Registration</RouteNavItem>
            <RouteNavItem key={7} href="#">Scientific</RouteNavItem>
          </Nav>
        </Navbar>
      </div>
    );
  }
}
