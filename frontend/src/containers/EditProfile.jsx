import React, { useState, useEffect } from "react";
import axios from "axios";
import { getLogInDetailsFromLocalStorage } from "../utils";
import swal from "sweetalert";
import { Link } from "react-router-dom/cjs/react-router-dom.min";
import { Input, Textarea } from "@material-tailwind/react";

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
    <div className="container mx-auto px-4 mt-9">
      <h2 className="text-2xl font-bold mb-4">Edit Profile</h2>
      <div className="flex justify-between mb-11">
        <div className="w-1/2">
          <form onSubmit={handleSubmit}>
            <div class="relative mb-4" data-te-input-wrapper-init>
              <Input
                type="text"
                id="first_name"
                name="first_name"
                label="First Name"
                value={formData.first_name}
                onChange={handleChange}
                className="mt-1 focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
              />
            </div>

            <div class="relative mb-4" data-te-input-wrapper-init>
              <Input
                type="text"
                id="last_name"
                name="last_name"
                label="Last Name"
                value={formData.last_name}
                onChange={handleChange}
                className="mt-1 focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
              />
            </div>

            <div class="relative mb-4" data-te-input-wrapper-init>
              <Input
                type="text"
                id="address"
                name="address"
                label="Address"
                value={formData.address}
                onChange={handleChange}
                className="mt-1 focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
              />
            </div>

            <div class="relative mb-4" data-te-input-wrapper-init>
              <Input
                type="email"
                label="Email"
                id="email"
                name="email"
                onChange={handleChange}
                className="mt-1 focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                value={formData.email}
              />
            </div>

            <div class="relative mb-4" data-te-input-wrapper-init>
              <Input
                type="mobile"
                id="mobile"
                name="mobile"
                label="Phone Number"
                value={formData.mobile}
                onChange={handleChange}
                className="mt-1 focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
              />
            </div>

            <div className="relative mb-4" data-te-input-wrapper-init>
              <Textarea
                id="bio"
                name="bio"
                value={formData.bio}
                label="Bio"
                onChange={handleChange}
                className="mt-1 focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
              />
            </div>

            <Link to="/profile">
              <button
                type="submit"
                className="bg-blue text-black px-4 py-2 rounded-md"
              >
                Save Changes
              </button>
            </Link>
          </form>
        </div>

        <div className="">
          <img src="images/editprofile.png" className="" alt="" />
          <p className="text-3xl text-center font-bold">
            Hi {formData.first_name}
          </p>
        </div>
      </div>
    </div>
  );
};

export default EditProfile;
