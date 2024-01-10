import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "../components/Login.jsx";
import Register from "../components/register.jsx";
import App from "../App.jsx";
import PrivateRoute from "../utils/PrivateRoute.jsx";

const RouterBrowser = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route element={<PrivateRoute />}>
          <Route path="/" element={<App />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default RouterBrowser;
