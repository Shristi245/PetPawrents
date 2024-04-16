import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useHistory } from "react-router-dom";
import Swal from "sweetalert2";

const EditUser = () => {
  const { userId } = useParams();
  const [user, setUser] = useState({
    first_name: "",
    last_name: "",
    email: "",
    mobile: "",
  });

  const history = useHistory();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get(
          `http://127.0.0.1:8000/api/users/${userId}/`
        );
        setUser(response.data);
      } catch (error) {
        console.error("Error fetching user:", error);
      }
    };
    fetchUser();
  }, [userId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://127.0.0.1:8000/api/users/${userId}/`, user);
      // Show success message using swal.fire
      Swal.fire({
        title: "User updated successfully!",
        icon: "success",
        toast: true,
        timer: 3000,
        position: "top-right",
        timerProgressBar: true,
        showConfirmButton: false,
      });
      history.push("/admin-dashboard-users");
    } catch (error) {
      console.error("Error updating user:", error);
      // Show error message using swal.fire
      Swal.fire({
        title: "An Error Occurred",
        text: error.message,
        icon: "error",
        toast: true,
        timer: 6000,
        position: "top-right",
        timerProgressBar: true,
        showConfirmButton: false,
      });
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="bg-white  w-[30%] p-8 rounded shadow-md">
        <h1 className="text-2xl font-bold mb-4">Edit User</h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="first_name" className="block text-gray-700">
              First Name:
            </label>
            <input
              type="text"
              id="first_name"
              name="first_name"
              value={user.first_name}
              onChange={handleChange}
              className="border border-gray-300 rounded-md px-3 py-2 w-full mt-1"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="last_name" className="block text-gray-700">
              Last Name:
            </label>
            <input
              type="text"
              id="last_name"
              name="last_name"
              value={user.last_name}
              onChange={handleChange}
              className="border border-gray-300 rounded-md px-3 py-2 w-full mt-1"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-700">
              Email:
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={user.email}
              onChange={handleChange}
              className="border border-gray-300 rounded-md px-3 py-2 w-full mt-1"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="phone_number" className="block text-gray-700">
              Phone Number:
            </label>
            <input
              type="text"
              id="mobile"
              name="mobile"
              value={user.mobile}
              onChange={handleChange}
              className="border border-gray-300 rounded-md px-3 py-2 w-full mt-1"
            />
          </div>
          <button
            type="submit"
            onClick={handleSubmit}
            className="bg-blue-500 text-black bg-[#56A6B8] font-bold py-2 px-4 rounded"
          >
            Save
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditUser;
