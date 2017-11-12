import React, { Component } from "react";
import { Navbar, Nav } from "react-bootstrap";

import RouteNavItem from "../components/RouteNavItem";

import './ConfNavbar.css';

export default class ConfNavbar extends Component {

  render() {
    return (
      <div>
        <Navbar className="nav-container">
          <Nav>
            <RouteNavItem key={4} href="#">Home</RouteNavItem>
            <RouteNavItem key={5} href="#">Registration</RouteNavItem>
            <RouteNavItem key={6} href="#">Abstract Submission</RouteNavItem>
          </Nav>
        </Navbar>
      </div>
    );
  }
}
