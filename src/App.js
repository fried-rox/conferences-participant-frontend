import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { Nav, Navbar, NavItem } from "react-bootstrap"; //adding a navigation bar from bootstrap

import { authUser, signOutUser } from "./libs/awsLib";
import Routes from "./Routes";
import RouteNavItem from "./components/RouteNavItem";
// import Home from "./containers/Home";

import "./css/App.css";

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isAuthenticated: false,
      isAuthenticating: true
    };
  }

  userHasAuthenticated = authenticated => {
    this.setState({ isAuthenticated: authenticated });
  }

  handleLogout = event => {
    signOutUser();

    this.userHasAuthenticated(false);

    this.props.history.push('/login');
  }

  // navdashboard = event => {
  //   event.preventDefault();
  //   const id = window.location.pathname.split("/")[2];
  //   this.props.history.push(`/participant/${id}`);
  // }

  async componentDidMount() {
    try {
      if (await authUser()) {
        this.userHasAuthenticated(true);
      }
      localStorage.setItem("confIdKey2", window.location.pathname.split("/")[1]);
    }
    catch(e) {
      alert(e);
    }
    debugger;

    this.setState({ isAuthenticating: false });
  }

  render() {
    const childProps = {
      isAuthenticated: this.state.isAuthenticated,
      userHasAuthenticated: this.userHasAuthenticated
    };

    return (
      !this.state.isAuthenticating &&
      <div className="App-container">
        <Navbar fluid collapseOnSelect>
          <Navbar.Header>
            <Navbar.Brand>
              <p id="logo"> TARGET CONFERENCES LTD </p>
              <p id="explanation">Conference Organizers</p>
            </Navbar.Brand>
          </Navbar.Header>
          <Navbar.Collapse>
            <Nav pullRight>
              {this.state.isAuthenticated
                ? <NavItem id="logoutlink" onClick={this.handleLogout}>Logout</NavItem>
                : <RouteNavItem id="loginlink" key={1} href={`/${localStorage.getItem('confIdKey2')}/login`}>
                    Login
                  </RouteNavItem>
              }
            </Nav>
            <Nav>
              {this.state.isAuthenticated
                ? <RouteNavItem id="home" key={3} href={`/${localStorage.getItem('confIdKey2')}/signup`}>
                    Dashboard
                  </RouteNavItem>
                : []
              }
            </Nav>
          </Navbar.Collapse>
        </Navbar>
        <Routes childProps={childProps} />
      </div>
    );
  }
}

export default withRouter(App);
