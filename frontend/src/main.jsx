import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { ErrorBoundary } from "react-error-boundary";
import Router from "./router/Router.jsx";
import FallbackComponent from "./pages/Error/ErrorPage.jsx";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ErrorBoundary FallbackComponent={FallbackComponent}>
      <BrowserRouter>
        <Router />
      </BrowserRouter>
    </ErrorBoundary>
  </React.StrictMode>
);
