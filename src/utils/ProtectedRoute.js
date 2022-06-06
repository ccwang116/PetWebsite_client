import React from "react";
import { Route, Redirect } from "react-router-dom";
import { useSelector } from "react-redux";
const ProtectedRoute = ({ children, ...rest }) => {
  const auth = useSelector((state) => state.user.auth);
  return (
    <Route
      {...rest}
      render={(props) =>
        auth === true ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: "/login",
              state: { from: props.location },
            }}
          />
        )
      }
    />
  );
};

export default ProtectedRoute;
