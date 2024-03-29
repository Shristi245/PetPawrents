import axios from "axios";
import React, { useState, useEffect } from "react";
import { getLogInDetailsFromLocalStorage } from "../utils";
import { Link } from "react-router-dom/cjs/react-router-dom.min";

function UserProfile() {
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

  return (
    <div className="flex  h-screen bg-gray-100">
      <div className="bg-white p-8 mt-9 w-full justify-between rounded-lg shadow-md flex">
        {/* First div containing buttons */}
        <div className="flex flex-col mb-6 ml-20">
          <button className="bg-blue-500 text-white bg-[#1E5547] hover:bg-[#1ED1B1] text-3xl px-4 py-2 rounded-[20px] mb-16">
            Profile
          </button>
          {/* You may want to remove 'Edit Profile' button as we're on profile page */}
          <button
            className="bg-blue-500 text-white bg-[#1E5547] hover:bg-[#1ED1B1] text-3xl px-4 py-2 rounded-[20px] mb-16"
            disabled
          >
            <Link to="/edit-profile"> Edit Profile</Link>
          </button>
          <button className="bg-blue-500 text-white bg-[#1E5547] hover:bg-[#1ED1B1] text-3xl px-4 py-2 rounded-[20px] mb-16">
            View Orders
          </button>
        </div>
        {/* Second div containing profile picture */}
        <div className=" justify-center mb-6 rounded-full">
          {profile && (
            <>
              <img
                src={profile.image}
                alt="Profile"
                className="w-[100%] h-[30%] bg-gray-300 rounded-full"
              />{" "}
              <br />
              <p className="text-xl font-bold">{profile.username}</p>
            </>
          )}
        </div>
        {/* Third div containing user details */}
        <div className="flex flex-col items-start space-y-3 mb-6 mr-44 w-[20%]">
          {/* Display email and phone number */}
          {profile && (
            <p className="text-black text-2xl">
              Full Name: {profile.full_name}
            </p>
          )}
          {profile && (
            <p className="text-black text-2xl">Email: {profile.email}</p>
          )}
          {profile && (
            <p className="text-black text-2xl">
              Phone Number: {profile.mobile}
            </p>
          )}
          {profile && (
            <p className="text-black text-2xl">Address: {profile.email}</p>
          )}
          {profile && <p className="text-black text-2xl">Bio: {profile.bio}</p>}

          {/* Add more details as needed */}
        </div>
      </div>
    </div>
  );
}

export default UserProfile;
