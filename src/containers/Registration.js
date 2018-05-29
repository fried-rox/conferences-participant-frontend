import React, { Component } from "react";

import Navigationbar from "./Navigationbar";

import { invokeApig } from "../libs/awsLib";

import "../css/Registration.css";

export default class Registration extends Component {
  constructor(props) {
    super(props);

    this.state= {
      isLoading: false,
      regcategory: null,
      regResult: "",
      // conferenceId: "",
      regFullName: "",
      regAbbrName: "",
      regCurrency: "",
      regLanguage: "",
      addScience: "",
      addTours: "",
      addHotel: "",
      addAP: "",
      regFee: "",
      payCash: "",
      payCheque: "",
      payCard: "",
      payGuard: "",
      payEFT: "",
      regNotes: ""
    };
  }

  async componentDidMount() {
    try {
      const results = await this.getRegCategories();
      const resultsconf = await this.getConference();
      await results.map( (regResult) =>
        regResult.conferenceId === localStorage.getItem("confIdKey") ? localStorage.setItem("regCategoryId", regResult.regCategoryId) : null);
      debugger;
      this.setState({
        conference: resultsconf,
        conferenceTitle: resultsconf.confTitle,
        regcategories: results
      });
    } catch (e) {
      alert(e);
    }
  }

  getRegCategories() {
    return invokeApig({ path: `/regcategories` })
  }

  getConference() {
    return invokeApig({ path: `/conferences/${localStorage.getItem("confIdKey")}` })
  }

  render() {
    return (
      <div className="registrationfullpage">

        <Navigationbar {...this.props}/>

        <div className="registration">
          <h1>Registration for {this.state.conferenceTitle}</h1>
          <h3>Please select the relevant registration category:</h3>
        </div>

      </div>
    );
  }
}
