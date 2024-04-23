import axios from "axios";
import React, { useState, useEffect } from "react";
import { getLogInDetailsFromLocalStorage } from "../utils";
import { Link } from "react-router-dom/cjs/react-router-dom.min";
import { updloadImageToFirebase } from "../utils";
import { toast } from "react-toastify";

const UserProfile = (userID) => {
  const [profile, setProfile] = useState(null);
  // Get the URL parameter 'pk' using useParams

  useEffect(() => {
    const fetchUserInfo = async () => {
      const loggedInUser = getLogInDetailsFromLocalStorage();

      if (!loggedInUser?.id) return;

      axios
        .get(`http://127.0.0.1:8000/api/users/${loggedInUser?.id}/`)
        .then((response) => {
          setProfile(response.data);
          console.log(response.data);
        })
        .catch((error) => {
          console.error("Error fetching profile:", error);
        });
    };

    fetchUserInfo();
  }, []);

  const handleImageChange = (e) => {
    handleUploadProfile(e.target.files[0]);
  };

  const handleUploadProfile = async (profileImgFile) => {
    if (!profileImgFile) {
      toast.error("Please select an image");
      return;
    }
    const user = getLogInDetailsFromLocalStorage();
    try {
      const imgUrl = await updloadImageToFirebase(profileImgFile); // Assuming uploadImageToFirebase handles uploading the image file to Firebase Storage

      const res = await axios.put(
        `http://127.0.0.1:8000/users/${user.id}/profile-image/`,
        {
          image: imgUrl,
        }
      );

      if (res.status === 200) {
        toast.success("Profile image updated successfully");
        // Optionally, update the UI or reset any state related to the profile image
      } else {
        toast.error("Unable to update profile image");
      }
    } catch (error) {
      console.error("Error updating profile image:", error);
      toast.error("An error occurred while updating profile image");
    }
  };

  return (
    <div className="flex bg-white">
      <div className="bg-white p-8 mt-9 pl-32 w-full justify-between rounded-lg shadow-md flex">
        {/* First div containing buttons */}
        <div className="flex flex-col ml-20">
          <button className="bg-blue-500 text-white shadow-inner hover:text-black  bg-[#56A6B8]  text-3xl py-3 rounded-[20px] mb-5">
            Profile
          </button>
          {/* You may want to remove 'Edit Profile' button as we're on profile page */}
          <button
            className="bg-blue-500 text-white hover:text-black shadow-inner bg-[#56A6B8] text-3xl px-4 py-3 rounded-[20px] mb-5"
            disabled
          >
            <Link to="/edit-profile"> Edit Profile</Link>
          </button>
          <button className="bg-blue-500 text-white shadow-inner hover:text-black bg-[#56A6B8] text-3xl px-4 py-3 rounded-[20px] mb-5">
            <Link to="/orders-list">View Orders</Link>
          </button>

          <button
            className="bg-blue-500 text-white shadow-inner hover:text-black bg-[#56A6B8] text-3xl px-4 py-3 rounded-[20px] mb-5"
            disabled
          >
            <Link to="/adoption-history"> Adoption History</Link>
          </button>

          <button
            className="bg-blue-500 text-white shadow-inner hover:text-black  bg-[#56A6B8] text-3xl px-4 py-3 rounded-[20px] mb-5"
            disabled
          >
            <Link to="/pet-details"> Pet Details</Link>
          </button>

          <button
            className="bg-blue-500 text-white shadow-inner hover:text-black  bg-[#56A6B8] text-3xl px-4 py-3 rounded-[20px] "
            disabled
          >
            <Link to="/change-password"> Change Password</Link>
          </button>
        </div>
        {/* Second div containing profile picture */}
        <div className=" justify-center mb-6 rounded-full">
          {profile && (
            <>
              <div className="w-60 h-60 rounded-full bg-gray-500 flex ">
                <img
                  src={profile.image}
                  alt="Profile"
                  className="w-full h-full object-cover rounded-full border-2 border-black "
                />
              </div>
              <br />
              <div className="flex flex-col text-center">
                <p className="text-2xl font-bold">{profile.username}</p>
                <button
                  onClick={() => {
                    document.getElementById("profileimage").click();
                  }}
                  className="bg-blue text-white rounded-lg py-1 mt-3 hover:bg-[#BB9B81]"
                >
                  Choose Image
                </button>
                <input
                  type="file"
                  id="profileimage"
                  name="image"
                  accept="image/*"
                  className="hidden"
                  onChange={handleImageChange}
                />
              </div>
            </>
          )}
        </div>
        {/* Third div containing user details */}
        <div className="flex flex-col items-start space-y-6 mr-60 w-[22%]">
          {/* Display email and phone number */}
          {profile && (
            <>
              <div className="flex items-center text-2xl gap-4">
                <p className="text-black">First Name:</p>
                <p className="text-[#673405]"> {profile.first_name}</p>
              </div>

              <div className="flex items-center text-2xl gap-4 ">
                <p className="text-black">Last Name:</p>
                <p className="text-[#673405]">{profile.last_name}</p>
              </div>

              <div className="flex items-center text-2xl gap-4 mb-3">
                <p className="text-black text-2xl">Email: </p>
                <p> {profile.email}</p>
              </div>

              <div className="flex items-center text-2xl gap-4 mb-3">
                <p className="text-black text-2xl flex items-center">Phone:</p>
                <p> {profile.mobile}</p>
              </div>

              <div className="flex items-center text-2xl gap-4 mb-3">
                <p className="text-black text-2xl">Address:</p>
                <p> {profile.address}</p>
              </div>

              <div className="flex items-start text-2xl gap-4 mb-3">
                <p className="text-black text-2xl">Bio:</p>
                <p> {profile.bio}</p>
              </div>

              <Link to="/edit-profile">
                <button className="bg-[#FEC200] text-white shadow-2xl hover:text-white  text-lg px-9 py-2 rounded-[20px] transition-transform duration-200 ease-in-out transform hover:scale-90">
                  Edit
                </button>
              </Link>
            </>
          )}
          {/* Add more details as needed */}
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
