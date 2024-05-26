import React, { useEffect } from "react";
import { getLogInDetailsFromLocalStorage } from "../utils";
import { toast } from "react-toastify";
import { Redirect } from "react-router-dom";
const ProtectAdminRoutes = ({ children }) => {
  const userInfo = getLogInDetailsFromLocalStorage();

  const isAdmin = userInfo?.user_type?.toLowerCase() === "admin";

  useEffect(() => {
    if (!isAdmin) {
      toast.info("You do not have permission to access this page");
    }
  }, [isAdmin]);

  return isAdmin ? children : <Redirect to="/" />;
};

export default ProtectAdminRoutes;
