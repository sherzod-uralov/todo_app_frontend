import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./styles/index.css";
import RouterBrowser from "./router/RouterBrowser.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterBrowser></RouterBrowser>
  </React.StrictMode>,
);
