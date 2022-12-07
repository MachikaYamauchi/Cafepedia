// Use this compo in App.js

import React from "react";
import { useSelector } from "react-redux";
import LoadingToRedirect from "./LoadingToRedirect";

const PrivateRoute = ({ children }) => {
  const { user } = useSelector((state) => ({ ...state.auth })); //get the user logged in

  // If user is logged in, goint to render the children whatever the route is rendering
  return user ? children : <LoadingToRedirect />;
};

export default PrivateRoute;
