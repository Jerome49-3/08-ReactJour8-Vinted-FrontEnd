// eslint-disable-next-line no-unused-vars
import * as dotenv from "dotenv";
import React from "react";
import ReactDOM from "react-dom/client";
import "./assets/css/index.css";
import App from "./App.jsx";
import ThemeProvider from "./context/ThemeProvider.jsx";
import * as Sentry from "@sentry/react";

// Sentry Init
Sentry.init({
  dsn: "https://3d7044201b1f0cf520ee5ba5549974ca@o4508718499758080.ingest.de.sentry.io/4508718503559248",
  integrations: [],
});

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Sentry.ErrorBoundary fallback={<h1>Something went wrong</h1>}>
      <ThemeProvider value="light">
        <App />
      </ThemeProvider>
    </Sentry.ErrorBoundary>
  </React.StrictMode>
);
