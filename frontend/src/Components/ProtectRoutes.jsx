import React, { useEffect } from "react";
import { getLogInDetailsFromLocalStorage } from "../utils";
import { toast } from "react-toastify";
import { Outlet, Redirect } from "react-router-dom";
const ProtectRoutes = ({ children }) => {
  const isUserLoggedIn = getLogInDetailsFromLocalStorage();


  useEffect(() => {
    if (!isUserLoggedIn) {
      toast.info("You need to log in to access this page");
    }
  }, [isUserLoggedIn]);

  return isUserLoggedIn ? children : <Redirect to="/login" />;
};

export default ProtectRoutes;
