// eslint-disable-next-line no-unused-vars
import * as dotenv from "dotenv";
import React from "react";
import ReactDOM from "react-dom/client";
import "./assets/css/index.css";
import App from "./App.jsx";
import ThemeProvider from "./context/ThemeProvider.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ThemeProvider value="light">
      <App />
    </ThemeProvider>
  </React.StrictMode>
);
