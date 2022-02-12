import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import "./index.css";
import { Content } from "./App";

ReactDOM.render(
  <React.StrictMode>
    <App Content={<Content />} />
  </React.StrictMode>,
  document.getElementById("root")
);
