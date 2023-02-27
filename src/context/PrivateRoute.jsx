import React, { useContext, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { UserContext } from "./UserContext";

const PrivateRoute = ({ children }) => {
  const token = localStorage.getItem("token");
  const navigate = useNavigate();
  const context = useContext(UserContext);
  const location = useLocation();

  useEffect(() => {
    if (token && !context?.isUserLoggedIn) {
      navigate("/");
    } else if (!token && context?.isUserLoggedIn) {
      navigate("/");
    }
  }, [context?.isUserLoggedIn]);

  if (!context?.isUserLoggedIn) {
    return <h2>Not Authorized</h2>;
  }

  return <>{children}</>;
};

export default PrivateRoute;
