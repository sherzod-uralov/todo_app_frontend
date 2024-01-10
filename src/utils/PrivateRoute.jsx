import React, { useState } from "react";
import { Navigate, Outlet, useNavigate } from "react-router-dom";

const PrivateRoute = () => {
  const [token, setToken] = useState(localStorage.getItem("authToken"));
  const navigate = useNavigate();

  return token ? <Outlet /> : <Navigate to="/register" />;
};
export default PrivateRoute;
