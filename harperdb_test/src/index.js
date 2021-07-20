import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { HarperDBProvider } from "use-harperdb";

const url = process.env.REACT_APP_DB_URL;
const user = process.env.REACT_APP_USER;
const password = process.env.REACT_APP_PASSWORD;

ReactDOM.render(
  <React.StrictMode>
    <HarperDBProvider url={url} user={user} password={password}>
      <App />
    </HarperDBProvider>
  </React.StrictMode>,
  document.getElementById("root")
);

reportWebVitals();
