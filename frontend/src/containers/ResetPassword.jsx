import React, { useState, useContext } from "react";
import { useHistory } from "react-router-dom";
import AuthContext from "../context/AuthContext";

const ResetPasswordPage = () => {
  const { resetPassword } = useContext(AuthContext);
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const history = useHistory();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      await resetPassword(email);
      console.log("Reset password instructions sent successfully");
      history.push("/login"); // Redirect to login page after sending reset instructions
    } catch (error) {
      console.error("Error:", error);
      setError(
        "Failed to send reset password instructions. Please try again later."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="flex justify-center items-center h-screen bg-cover "
      style={{ backgroundImage: "url('images/reset-bg.png')" }}
    >
      <div
        className=" bg-gray-200 border border-gray-300 shadow-md rounded-[30px]  px-10 py-4  sm:w-96 lg:w-[37%] lg:h-[47%] transition-transform duration-200 ease-in-out transform hover:scale-110"
        style={{ backgroundImage: "url('images/reset.png')" }}
      >
        <h2 className="text-3xl font-bold mb-11  text-center">
          Reset Password
        </h2>

        <form onSubmit={handleSubmit}>
          <div className="mb-6">
            <label
              className="block text-black text-lg font-bold mb-2 mt-16"
              htmlFor="email"
            >
              Email Address
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 mt-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="email"
              type="email"
              placeholder="Enter your email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="flex items-center justify-start mt-7">
            <button
              className="hover:bg-blue-700 text-black hover:text-white text-xl font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="submit"
              disabled={loading}
            >
              {loading ? "Sending..." : "Reset Password"}
            </button>
          </div>
          {error && <p className="text-red-500 text-sm mt-4">{error}</p>}

        </form>
      </div>
    </div>
  );
};

export default ResetPasswordPage;
