import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import {
  useLocation,
  useParams,
} from "react-router-dom/cjs/react-router-dom.min";

const ResetPasswordConfirmPage = () => {
  const [email, setEmail] = useState("");
  const [newPassword1, setNewPassword1] = useState("");
  const [newPassword2, setNewPassword2] = useState("");
  const [error, setError] = useState("");
  const history = useHistory();
  const { search } = useLocation();

  const searchParams = new URLSearchParams(search);

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Add validation for email and passwords
    if (!email || !newPassword1 || !newPassword2) {
      setError("Please fill in all fields.");
      return;
    }
    if (newPassword1 !== newPassword2) {
      setError("Passwords do not match.");
      return;
    }
    // Fetch data from backend
    try {
      const response = await fetch("http://127.0.0.1:8000/reset-password/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          new_password1: newPassword1,
          new_password2: newPassword2,
          email,
          token: searchParams.get("token"),
        }),
      });

      // console.log(response);

      if (response.ok) {
        console.log("Password reset successfull.");
        // Redirect to login page after password reset is confirmed
        history.push("/login");
    } else {
        const errorData = await response.json();
        console.error("Error resetting password:", errorData); // Log entire response content
        throw new Error(errorData.detail); // Throw error with specific detail message
      }
    } catch (error) {
      console.error("Error resetting password:", error);
      setError(error.message);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <h2 className="text-2xl font-bold mb-4 text-center">Reset Password</h2>
        {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="email"
            >
              Email Address
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="email"
              type="email"
              placeholder="Enter your email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="newPassword1"
            >
              New Password
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="newPassword1"
              type="password"
              placeholder="Enter your new password"
              value={newPassword1}
              onChange={(e) => setNewPassword1(e.target.value)}
              required
            />
          </div>
          <div className="mb-6">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="newPassword2"
            >
              Confirm New Password
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="newPassword2"
              type="password"
              placeholder="Confirm your new password"
              value={newPassword2}
              onChange={(e) => setNewPassword2(e.target.value)}
              required
            />
          </div>
          <div className="flex items-center justify-center">
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="submit"
            >
              Reset Password
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ResetPasswordConfirmPage;
