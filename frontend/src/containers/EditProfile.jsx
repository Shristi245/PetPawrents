import React, { useState, useEffect } from "react";
import axios from "axios";
import { getLogInDetailsFromLocalStorage } from "../utils";
import swal from "sweetalert";
import { Link } from "react-router-dom/cjs/react-router-dom.min";

const EditProfile = () => {
  const user = getLogInDetailsFromLocalStorage();

  const defautInfo = {
    first_name: "",
    last_name: "",
    mobile: "",
    address: "",
    email: "",
    bio: "",
  };

  const [formData, setFormData] = useState(defautInfo);

  useEffect(() => {
    fetchProfileData();
  }, []);

  const fetchProfileData = async () => {
    try {
      const response = await axios.get(
        `http://127.0.0.1:8000/api/users/${user.id}`
      );
      const profileData = response.data;
      setFormData({
        first_name: profileData.first_name,
        last_name: profileData.last_name,
        mobile: profileData.mobile,
        address: profileData.address,
        email: profileData.email,
        bio: profileData.bio,
      });
    } catch (error) {
      console.error("Error fetching profile data:", error);
      // Handle error
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.patch(
        `http://127.0.0.1:8000/api/users/${user.id}/`,
        formData
      ); // Replace 'http://example.com/api/profile' with your actual endpoint
      // Handle success
      swal({
        title: "Success",
        text: "Profile updated successfully",
        icon: "success",
        position: "bottom-end",
        timer: 3000, // Close after 3 seconds
        button: false, // Hide the close button
      });
    } catch (error) {
      console.error("Error updating profile:", error);
      // Handle error
      swal({
        title: "Error",
        text: "Failed to update profile",
        icon: "error",
        position: "bottom-end",
        timer: 3000, // Close after 3 seconds
        button: false, // Hide the close button
      });
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-2xl font-bold mb-4">Edit Profile</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label
            htmlFor="first_name"
            className="block text-sm font-medium text-gray-700"
          >
            First Name
          </label>
          <input
            type="text"
            id="first_name"
            name="first_name"
            value={formData.first_name}
            onChange={handleChange}
            className="mt-1 focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="last_name"
            className="block text-sm font-medium text-gray-700"
          >
            Last Name
          </label>
          <input
            type="text"
            id="last_name"
            name="last_name"
            value={formData.last_name}
            onChange={handleChange}
            className="mt-1 focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="address"
            className="block text-sm font-medium text-gray-700"
          >
            Address
          </label>
          <input
            type="text"
            id="address"
            name="address"
            value={formData.address}
            onChange={handleChange}
            className="mt-1 focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-700"
          >
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="mt-1 focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
          />
        </div>

        <div className="mb-4">
          <label
            htmlFor="mobile"
            className="block text-sm font-medium text-gray-700"
          >
            Phone Number
          </label>
          <input
            type="mobile"
            id="mobile"
            name="mobile"
            value={formData.mobile}
            onChange={handleChange}
            className="mt-1 focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="bio"
            className="block text-sm font-medium text-gray-700"
          >
            Bio
          </label>
          <textarea
            id="bio"
            name="bio"
            value={formData.bio}
            onChange={handleChange}
            rows="3"
            className="mt-1 focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
          ></textarea>
        </div>

        <Link to="/profile" >
          <button
            type="submit"
            className="bg-blue-500 text-black px-4 py-2 rounded-md"
          >
            Save Changes
          </button>
        </Link>
      </form>
    </div>
  );
};

export default EditProfile;
