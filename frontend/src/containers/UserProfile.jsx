import axios from "axios";
import React, { useState, useEffect } from "react";
import { getLogInDetailsFromLocalStorage } from "../utils";
import { Link } from "react-router-dom/cjs/react-router-dom.min";
import { updloadImageToFirebase } from "../utils";
import { toast } from "react-toastify";

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
            <Link to="/orders-list">View Orders</Link>
          </button>

          <button
            className="bg-blue-500 text-white bg-[#1E5547] hover:bg-[#1ED1B1] text-3xl px-4 py-2 rounded-[20px] mb-16"
            disabled
          >
            <Link to=""> Adoption History</Link>
          </button>

          <button
            className="bg-blue-500 text-white bg-[#1E5547] hover:bg-[#1ED1B1] text-3xl px-4 py-2 rounded-[20px] mb-16"
            disabled
          >
            <Link to=""> Pet Details</Link>
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
                  className="w-full h-full object-cover rounded-full"
                />
              </div>
              <br />
              <div className="flex flex-col text-center">
                <p className="text-xl font-bold">{profile.username}</p>
                <button
                  onClick={() => {
                    document.getElementById("profileimage").click();
                  }}
                  className="bg-[#1E5547] text-white rounded-lg py-1 hover:bg-[#1ED1B1]"
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
                />{" "}
              </div>
            </>
          )}
        </div>
        {/* Third div containing user details */}
        <div className="flex flex-col items-start space-y-3 mb-6 mr-44 w-[20%]">
          {/* Display email and phone number */}
          {profile && (
            <>
              <div className="flex items-center text-2xl gap-4">
                <p className="text-black">First Name:</p>
                <p className="text-[#673405]"> {profile.first_name}</p>
              </div>

              <div className="flex items-center text-2xl gap-4">
                <p className="text-black text-2xl">Last Name:</p>
                <p className="text-[#673405]">{profile.last_name}</p>
              </div>

              <div className="flex items-center text-2xl gap-4">
                <p className="text-black text-2xl">Email: </p>
                <p> {profile.email}</p>
              </div>

              <div className="flex items-center text-2xl gap-4">
                <p className="text-black text-2xl flex items-center">
                  Phone number:
                </p>
                <p> {profile.mobile}</p>
              </div>

              <div className="flex items-center text-2xl gap-4">
                <p className="text-black text-2xl">Address:</p>
                <p> {profile.email}</p>
              </div>

              <div className="flex items-center text-2xl gap-4">
                <p className="text-black ">Bio:</p>
                <p> {profile.bio}</p>
              </div>
            </>
          )}
          {/* Add more details as needed */}x
        </div>
      </div>
    </div>
  );
}

export default UserProfile;
