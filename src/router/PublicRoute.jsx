import React, { useContext } from "react";
import { Navigate } from "react-router-dom";

import { AuthContext } from "../context/AuthContext";

const PublicRoute = ({ component: Component }) => {
  const { isLoggedIn } = useContext(AuthContext);

  return !isLoggedIn ? <Component /> : <Navigate to="/home" />;
};

export default PublicRoute;
