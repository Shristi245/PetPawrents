import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import AdminSideMenu from "../../Components/AdminSideMenu";

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);

  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get("http://127.0.0.1:8000/api/users/");
        setUsers(response.data);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };
    fetchUsers();
  }, []);

  // Function to handle edit action

  // Function to handle delete action
  const handleDelete = async (userId) => {
    console.log("Delete user with ID:", userId);
    try {
      // Send delete request to backend API
      await axios.delete(`http://127.0.0.1:8000/users/${userId}`);
      // Update users state to reflect deletion
      setUsers(users.filter((user) => user.id !== userId));
      // Show success message
      console.log("User deleted successfully.");
    } catch (error) {
      console.error("Error deleting user:", error);
      // Add error handling logic here
      let errorMessage = "Failed to delete user. Please try again.";
      // Check if specific error message can be provided based on error status
      if (error.response && error.response.status === 404) {
        errorMessage = "User not found.";
      }
      // Display error message to user
      alert(errorMessage);
    }
  };

  return (
    <div className="flex h-screen mb-32">
      <AdminSideMenu />
      {/* Main Content */}
      <div className="flex-1  px-9">
        <div className="p-4 flex items-center justify-between">
          {/* Search Bar */}
          <div className="relative  ">
            <input
              type="text"
              className=" text-black text-xl px-3 py-1 rounded-full focus:outline-none"
              placeholder="Type to search..."
            />
            <button className="absolute right-0 top-0 mt-1 mr-2">
              <svg
                className="h-6 w-6 text-black fill-current"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
              >
                <path d="M19.71 18.29l-5.47-5.47A5.93 5.93 0 0 0 14 10c0-3.31-2.69-6-6-6S2 6.69 2 10s2.69 6 6 6c1.3 0 2.49-.41 3.47-1.11l5.47 5.47c.39.39 1.02.39 1.41 0 .38-.39.39-1.02 0-1.41zM4 10c0-2.21 1.79-4 4-4s4 1.79 4 4-1.79 4-4 4-4-1.79-4-4z" />
              </svg>
            </button>
          </div>

          {/* User Profile */}
          <div className="flex items-center">
            <div className="relative">
              <button
                className="text-white hover:text-amber-400 focus:outline-none"
                onClick={toggleDropdown}
              >
                <img
                  className="w-12 h-12 rounded-full object-cover"
                  src="https://via.placeholder.com/150"
                  alt="Profile"
                />
              </button>
              {showDropdown && (
                <div className="absolute top-0 right-0 mt-10 bg-gray-700 text-white py-2 px-4 rounded-lg shadow-lg">
                  <button
                    className="block w-full text-left hover:bg-gray-600 py-1"
                    onClick={() => console.log("Account settings clicked")}
                  >
                    Account Settings
                  </button>
                  <button
                    className="block w-full text-left hover:bg-gray-600 py-1"
                    onClick={() => console.log("Logout clicked")}
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Your main content goes here */}
        <h1 className="text-4xl ml-3">Users</h1>
        <div className="  py-5">
          <div className="overflow-x-auto text-xl">
            <table className="w-full ">
              <thead>
                <tr>
                  <th className="px-4 py-2">SN</th>
                  <th className="px-4 py-2">First Name</th>
                  <th className="px-4 py-2">Last Name</th>
                  <th className="px-4 py-2 ">Email</th>
                  <th className="px-4 py-2">Phone Number</th>
                </tr>
              </thead>
              <tbody className=" text-center">
                {users.map((user, index) => (
                  <tr key={user.id} className="">
                    <td className="px-4 py-2">{index + 1}</td>
                    <td className="px-4 py-2">{user.first_name}</td>
                    <td className="px-4 py-2">{user.last_name}</td>
                    <td className="px-2 py-2">{user.email}</td>
                    <td className="px-4 py-2 ">{user.mobile}</td>
                    <td className="px-4 py-2 flex ">
                      <Link
                        to={`/admin-dashboard-edituser/${user.id}`}
                        className=" text-white font-bold py-2 px-4 rounded ml-2"
                      >
                        <img
                          src="images/edit-icon.png"
                          alt=""
                          className="w-6 h-6 "
                        />
                      </Link>
                      <button
                        className=" text-black font-bold py-2 px-4 rounded"
                        onClick={() => handleDelete(user.id)}
                      >
                        <img
                          src="images/delete-icon.png"
                          alt=""
                          className="w-6 h-6 "
                        />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserList;
