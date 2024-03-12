import axios from "axios";
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom"; // Import useParams from React Router

function UserProfile() {
  const [profile, setProfile] = useState(null);
  const { pk } = useParams(); // Get the URL parameter 'pk' using useParams

  useEffect(() => {
    const token = localStorage.getItem("token");
    axios
      .get(`http://127.0.0.1:8000/profile/`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setProfile(response.data);
      })
      .catch((error) => {
        console.error("Error fetching profile:", error);
      });
  }, [pk]);

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
            Edit Profile
          </button>
          <button className="bg-blue-500 text-white bg-[#1E5547] hover:bg-[#1ED1B1] text-3xl px-4 py-2 rounded-[20px] mb-16">
            View Orders
          </button>
        </div>
        {/* Second div containing profile picture */}
        <div className=" justify-center mb-6">
          {profile && (
            <>
              <img
                src={profile.image}
                alt="Profile"
                className="w-[100%] h-[30%] bg-gray-300 rounded-full"
              />{" "}
              <br />
              <p className="text-xl font-bold">{profile.full_name}</p>
            </>
          )}
        </div>
        {/* Third div containing user details */}
        <div className="flex flex-col items-center mb-6">
          {/* Display email and phone number */}
          <p className="text-gray-600">Email: {profile.email}</p>
          {/* Add more details as needed */}
        </div>
      </div>
    </div>
  );
}

export default UserProfile;
