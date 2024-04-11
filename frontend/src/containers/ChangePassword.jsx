import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";
import { getLogInDetailsFromLocalStorage } from "../utils";
// import { useLocation } from "react-router-dom/cjs/react-router-dom.min";
const ChangePasswordPage = () => {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const history = useHistory();
  // const { search } = useLocation();

  // const searchParams = new URLSearchParams(search);
  useEffect(() => {
    // Check if user is authenticated, if not, redirect to login page
    if (!localStorage.getItem("loginDetails")) {
      history.push("/login");
    }
  }, [history]);

  const handleChangePassword = async () => {
    const user = getLogInDetailsFromLocalStorage();
    try {
      const response = await axios.post(
        `http://localhost:8000/change-password/${user.id}/`,
        {
          old_password: oldPassword,
          new_password: newPassword,
          confirm_password: confirmPassword,
        }
      );
      console.log("Password changed successfully:", response.data);
      // Reset form fields
      setOldPassword("");
      setNewPassword("");
      setConfirmPassword("");
      // Show success message using Swal
      Swal.fire({
        icon: "success",
        title: "Success",
        text: "Password changed successfully!",
      });
    } catch (error) {
      console.error("Error changing password:", error.response.data);
      // Show error message using Swal
      Swal.fire({
        icon: "error",
        title: "Error",
        text: error.response.data.detail,
      });
    }
  };

  return (
    <div className="container mx-auto mt-8 mb-5">
      <h1 className="text-3xl font-bold mb-4">Change Password</h1>
      <div className="mb-4">
        <label
          className="block text-gray-700 text-sm font-bold mb-2"
          htmlFor="oldPassword"
        >
          Old Password
        </label>
        <input
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="oldPassword"
          type="password"
          placeholder="Old Password"
          value={oldPassword}
          onChange={(e) => setOldPassword(e.target.value)}
        />
      </div>
      <div className="mb-4">
        <label
          className="block text-gray-700 text-sm font-bold mb-2"
          htmlFor="newPassword"
        >
          New Password
        </label>
        <input
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="newPassword"
          type="password"
          placeholder="New Password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
        />
      </div>
      <div className="mb-4">
        <label
          className="block text-gray-700 text-sm font-bold mb-2"
          htmlFor="confirmPassword"
        >
          Confirm Password
        </label>
        <input
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="confirmPassword"
          type="password"
          placeholder="Confirm Password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
      </div>
      <button
        className="bg-blue hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        type="button"
        onClick={handleChangePassword}
      >
        Change Password
      </button>
    </div>
  );
};

export default ChangePasswordPage;
