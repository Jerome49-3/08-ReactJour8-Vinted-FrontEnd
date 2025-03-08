/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
import * as React from "react";
import axios from "axios";
import { useState } from "react";

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, errorMessage: "" };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, info) {
    this.setState({ errorMessage: error.message });
    const fetchError = async () => {
      try {
        const response = await axios.post("/errorLogs", {
          message: error.message,
          stack: error.stack,
          componentStack: info.componentStack,
          date: Date.now(),
        });
        console.log("response POST on ErrorBoundary:", response);
      } catch (error) {
        console.log("error in POST on ErrorBoundary:", error);
      }
    };
    fetchError();
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback;
    }

    return this.props.children;
  }
}
export default ErrorBoundary;
