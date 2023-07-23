import React from "react";
import { Navigate } from "react-router-dom";
import { auth } from "../firebase";

const WithAuthCheck = (Component) => {
  return (props) => {
    const user = auth.currentUser;

    // If the user is not logged in, redirect to the default login page
    if (!user) {
      return <Navigate to="/" />;
    }

    // If the user is logged in, render the wrapped component
    return <Component {...props} />;
  };
};

export default WithAuthCheck;
