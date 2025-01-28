// eslint-disable-next-line no-unused-vars
import * as dotenv from "dotenv";
import React from "react";
import ReactDOM from "react-dom/client";
import "./assets/css/index.css";
import App from "./App.jsx";
import ThemeProvider from "./context/ThemeProvider.jsx";
import * as Sentry from "@sentry/react";
// eslint-disable-next-line no-unused-vars
import { BrowserTracing, Replay, init, ErrorBoundary } from "@sentry/react";

// Sentry Init
Sentry.init({
  dsn: import.meta.env.VITE_REACT_APP_SENTRY_DSN,
  integrations: [new Sentry.BrowserTracing(), new Sentry.Replay()],
  tracesSampleRate: 1.0,
  tracePropagationTargets: [
    import.meta.env.VITE_REACT_APP_SENTRY_CONFIG_URL_FRONTEND,
    import.meta.env.VITE_REACT_APP_SENTRY_CONFIG_URL_BACKEND,
  ],
  replaysSessionSampleRate: 0.1,
  replaysOnErrorSampleRate: 1.0,
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
