import React, { useEffect } from "react";
import { Navigate } from "react-router-dom";
import { auth } from "../firebase";

const WithAuthCheck = (Component) => {
  const WithAuthComponent = (props) => {
    const user = auth.currentUser;

    useEffect(() => {
      const unsubscribe = auth.onAuthStateChanged((user) => {
        if (!user) {
          // Redirect to login page if user is not logged in
          // You can customize the route to redirect to as needed
          <Navigate to="/login" />;
        }
      });

      return () => {
        // Clean up the auth state change subscription when the component unmounts
        unsubscribe();
      };
    }, []);

    // If the user is logged in, render the wrapped component
    return user ? <Component {...props} /> : null;
  };

  return WithAuthComponent;
};

export default WithAuthCheck;
