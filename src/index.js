import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { BrowserRouter as BR } from "react-router-dom";
ReactDOM.render(
  <React.StrictMode>
    <BR>
      <App />
    </BR>
  </React.StrictMode>,
  document.getElementById("root")
);


