import React, { Component } from "react";

import Navigationbar from "./Navigationbar";

import "../css/Submission.css";

export default class Submission extends Component {

  render() {
    return (
      <div className="submissionfullpage">

        <Navigationbar {...this.props}/>

        <div className="submission">
          <h1>Abstract Submission</h1>
        </div>

      </div>
    );
  }
}
