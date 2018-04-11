import React from "react";
// import Popup from 'react-popup';

import "../css/Popup.css";

export default class Popup extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      emailSearch: '',
    };
  }

  checkingEmail() {
    return;
  }

  render() {
    return (
      <div className='popup'>
        <div className='popup_inner'>
          <h1>{this.props.text}</h1>
          <input />
          <button onClick={this.checkingEmail.bind(this)}>Enter</button>
        </div>
      </div>
    );
  }
}
