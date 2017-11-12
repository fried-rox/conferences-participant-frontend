import React, { Component } from "react";
import { Link } from "react-router-dom";
import { PageHeader, ListGroup, ListGroupItem, Button } from "react-bootstrap";
//import Search from 'react-search'

import { invokeApig } from '../libs/awsLib';

import "./Home.css";

//import SearchNotes from "../components/SearchNotes";

export default class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: true,
      participants: [],
      search: '',
    };
  }

  async componentDidMount() {
    if (!this.props.isAuthenticated) {
      return;
    }

    try {
      const results = await this.conferences();
      this.setState({ participants: results });
    } catch (e) {
      alert(e);
    }

    this.setState({ isLoading: false });
  }

  conferences() {
    return invokeApig({ path: "/participants" });
  }

  searchList(event) {
    this.setState({search: event.target.value});
  }

  renderParticipantsList(participants) {
    return participants.map(
      (participant, i) =>
        i !== 0
          ? <ListGroupItem
              key={participant.participantId}
              href={`/participants/${participant.participantId}`}
              onClick={this.handleParticipantClick}
              header={participant.parLastName}>
                {"Created: " + new Date(participant.createdAt).toLocaleString()}
            </ListGroupItem>
          : null
    );
  }

  handleParticipantClick = event => {
    event.preventDefault();
    this.props.history.push(event.currentTarget.getAttribute("href"));
  }

  renderLander() {
    return (
      <div className="lander">
        <h1>Target Conferences Ltd</h1>
        <p>Online Managment System</p>
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

  renderParticipants(participants) {
    let filteredParticipants = this.state.participants.filter(
      (participant) => {
        return participant.parLastName.toLowerCase().indexOf(this.state.search.toLowerCase()) !== -1;
      }
    );
    return (
      <div className="participants">
        <PageHeader>Participants</PageHeader>
        <Button
          className="newpar"
          key="new"
          href="/participants/new"
          onClick={this.handleParticipantClick} >
            <b>{"\uFF0B"}</b> Create a new participant
        </Button>
        <input type="text"
          placeholder="Search list by name..."
          value={this.state.search}
          onChange={this.searchList.bind(this)} />

        <ListGroup className="participant-list">
          {!this.state.isLoading && this.renderParticipantsList(filteredParticipants)}
        </ListGroup>
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
