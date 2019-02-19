import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router } from "react-router-dom";
// import Popup from 'react-popup';

import App from "./App";
import registerServiceWorker from "./registerServiceWorker";

import "./css/index.css";

ReactDOM.render(
  <Router>
    <App />
  </Router>,
  document.getElementById("root")
);
registerServiceWorker();
