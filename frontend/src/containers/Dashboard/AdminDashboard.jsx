import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import AdminSideMenu from "../../Components/AdminSideMenu";

const AdminDashboard = () => {
  // const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const [totalUsers, setTotalUsers] = useState(0);
  const [totalAppointments, setTotalAppointments] = useState(0);
  const [totalProducts, setTotalProducts] = useState(0);
  const [totalAdoptionDetails, setTotalAdoptionDetails] = useState(0);

  // const collapseSidebar = () => {
  //   setIsSidebarCollapsed(!isSidebarCollapsed);
  // };

  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };

  useEffect(() => {
    // Fetch data from backend
    axios
      .get(`http://127.0.0.1:8000/api/users/total/`)
      .then((response) => {
        const {
          totalUsers,
          totalAppointments,
          totalProducts,
          totalAdoptionDetails,
        } = response.data;
        setTotalUsers(totalUsers);
        setTotalAppointments(totalAppointments);
        setTotalProducts(totalProducts);
        setTotalAdoptionDetails(totalAdoptionDetails);
      })
      .catch((error) => {
        console.error("Error fetching dashboard summary:", error);
      });
  }, []);

  return (
    <div className="flex h-screen mb-32">
      {/* Side Menu */}
      <AdminSideMenu />
      {/* Main Content */}
      <div className="flex-1  px-9">
        <div className="p-4 flex items-center justify-end">
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

        <div className="grid grid-cols-4 gap-8 mt-8">
          {/* Total Users */}
          <div className="bg-gray-200 p-6 rounded-lg">
            <h2 className="text-xl font-semibold mb-4">Total Users</h2>
            <p className="text-3xl font-bold">{totalUsers}</p>
          </div>
          {/* Total Appointments */}
          <div className="bg-gray-200 p-6 rounded-lg">
            <h2 className="text-xl font-semibold mb-4">Total Appointments</h2>
            <p className="text-3xl font-bold">{totalAppointments}</p>
          </div>
          {/* Total Products */}
          <div className="bg-gray-200 p-6 rounded-lg">
            <h2 className="text-xl font-semibold mb-4">Total Products</h2>
            <p className="text-3xl font-bold">{totalProducts}</p>
          </div>
          {/* Total Adoption Details */}
          <div className="bg-gray-200 p-6 rounded-lg">
            <h2 className="text-xl font-semibold mb-4">
              Total Adoption Details
            </h2>
            <p className="text-3xl font-bold">{totalAdoptionDetails}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
