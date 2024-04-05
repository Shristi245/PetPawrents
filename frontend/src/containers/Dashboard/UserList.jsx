import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import AdminSideMenu from "../../Components/AdminSideMenu";
import Swal from "sweetalert2";
import { useDebounce } from "../../utils";

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);

  const [searchText, setSearchText] = useState("");
  const debouncedSearchText = useDebounce(searchText);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get("http://127.0.0.1:8000/api/users/");
        setUsers(response.data);
        setFilteredUsers(response.data);
        console.log(users);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };
    fetchUsers();
  }, []);

  useEffect(() => {
    const _searchText = debouncedSearchText.toLowerCase();
    const _filteredUsers = users.filter(
      ({ first_name, last_name, email, username, mobile }) => {
        return (
          first_name.toLowerCase().includes(_searchText) ||
          last_name.toLowerCase().includes(_searchText) ||
          email.toLowerCase().includes(_searchText) ||
          username.toLowerCase().includes(_searchText) ||
          mobile.toLowerCase().includes(_searchText)
        );
      }
    );
    setFilteredUsers(_filteredUsers);
  }, [debouncedSearchText, users]);

  // Function to handle edit action

  // Function to handle delete action
  const handleDelete = async (userId) => {
    Swal.fire({
      title: "Do you want to delete this user?",
      showDenyButton: true,
      confirmButtonText: "Yes",
      denyButtonText: "No",
    }).then(async (result) => {
      if (result.isConfirmed) {
        console.log("Delete user with ID:", userId);
        try {
          await axios.delete(
            `http://127.0.0.1:8000/api/users/${userId}/delete`
          );
          setUsers(users.filter((user) => user.id !== userId));
          // Show success message using SweetAlert
          Swal.fire({
            icon: "success",
            title: "Success",
            text: "User deleted successfully!",
          });
        } catch (error) {
          console.error("Error deleting user:", error);
          let errorMessage = "Failed to delete user. Please try again.";
          if (error.response && error.response.status === 404) {
            errorMessage = "User not found.";
          }
          // Show error message using SweetAlert
          Swal.fire({
            icon: "error",
            title: "Error",
            text: errorMessage,
          });
        }
      } else if (result.isDenied) {
        Swal.fire("User deletion cancelled", "", "info");
      }
    });
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
              onChange={(e) => setSearchText(e.target.value)}
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
        </div>

        {/* Your main content goes here */}
        <h1 className="text-4xl ml-3">Users</h1>
        <div className="  py-5">
          <div className="overflow-x-auto text-xl">
            <table className="w-full border border-collapse">
              <thead>
                <tr>
                  <th className="px-4 py-2 border">SN</th>
                  <th className="px-4 py-2 border">First Name</th>
                  <th className="px-4 py-2 border">Last Name</th>
                  <th className="px-4 py-2 border">Email</th>
                  <th className="px-4 py-2 border">Phone Number</th>
                </tr>
              </thead>
              <tbody className=" text-center">
                {filteredUsers.map((user, index) => (
                  <tr key={user.id} className="border">
                    <td className="px-4 py-2 border">{index + 1}</td>
                    <td className="px-4 py-2 border">{user.first_name}</td>
                    <td className="px-4 py-2 border">{user.last_name}</td>
                    <td className="px-2 py-2 border">{user.email}</td>
                    <td className="px-4 py-2 border ">{user.mobile}</td>
                    <td className="px-4 py-2 border flex ">
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
