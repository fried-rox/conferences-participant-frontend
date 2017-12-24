import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { Nav, Navbar, NavItem } from "react-bootstrap"; //adding a navigation bar from bootstrap

import { authUser, signOutUser } from "./libs/awsLib";
import Routes from "./Routes";
import RouteNavItem from "./components/RouteNavItem";
// import Home from "./containers/Home";
import "./App.css";

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

    this.props.history.push("/login");
  }

  async componentDidMount() {
    try {
      if (await authUser()) {
        this.userHasAuthenticated(true);
      }
    }
    catch(e) {
      alert(e);
    }

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
        <Navbar collapseOnSelect className="Navbar-container">
          <Navbar.Header>
            <Navbar.Brand>
              <img id="logo" src={require('./images/android.png')} alt="Target conference logo"/>
            </Navbar.Brand>
            <Navbar.Toggle />
          </Navbar.Header>
          <Navbar.Collapse>
            <Nav pullRight>
              {this.state.isAuthenticated
                ? <NavItem id="logoutlink" onClick={this.handleLogout}>Logout</NavItem>
                : [
                    <RouteNavItem id="signuplink" key={1} href="/signup">
                      Signup
                    </RouteNavItem>,
                    <RouteNavItem id="loginlink" key={2} href="/login">
                      Login
                    </RouteNavItem>
                  ]}
            </Nav>
            <Nav pullLeft>
              {this.state.isAuthenticated
                ? <RouteNavItem id="dashboard" key={3} href={`/participant/${this.props.match.params.id}`}>
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
