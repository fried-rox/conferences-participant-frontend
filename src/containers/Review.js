import React, { Component } from "react";

import Navigationbar from "./Navigationbar";

import "../css/Review.css";

export default class Review extends Component {

  render() {
    return (
      <div className="reviewfullpage">

        <Navigationbar {...this.props}/>

        <div className="reviewpage">
          <h1>Abstract Review</h1>
        </div>

      </div>
    );
  }
}
