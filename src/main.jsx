// eslint-disable-next-line no-unused-vars
import * as dotenv from "dotenv";
import React from "react";
import ReactDOM from "react-dom/client";
import "./assets/css/index.css";
import App from "./App.jsx";
import ThemeProvider from "./context/ThemeProvider.jsx";
import { BrowserRouter as Router } from "react-router-dom";
//Provider
import { UserProvider } from "./context/UserProvider";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ThemeProvider value="light">
      <Router>
        <UserProvider>
          <App />
        </UserProvider>
      </Router>
    </ThemeProvider>
  </React.StrictMode>
);
