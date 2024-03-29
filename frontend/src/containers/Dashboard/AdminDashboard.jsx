import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import AdminSideMenu from "../../Components/AdminSideMenu";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUsers,
  faCalendarAlt,
  faBox,
  faDog,
} from "@fortawesome/free-solid-svg-icons";

const AdminDashboard = () => {
  // State variables
  const [totalUsers, setTotalUsers] = useState(0);
  const [totalAppointments, setTotalAppointments] = useState(0);
  const [totalProducts, setTotalProducts] = useState(0);
  const [totalAdoptionDetails, setTotalAdoptionDetails] = useState(0);

  // Fetch data effect
  useEffect(() => {
    // Fetch total users
    axios
      .get(`http://127.0.0.1:8000/api/users/total/`)
      .then((response) => setTotalUsers(response.data.totalUsers))
      .catch((error) => console.error("Error fetching total users:", error));

    // Fetch total appointments
    axios
      .get(`http://127.0.0.1:8000/api/appointments/total/`)
      .then((response) => setTotalAppointments(response.data.totalAppointments))
      .catch((error) =>
        console.error("Error fetching total appointments:", error)
      );

    // Fetch total products
    axios
      .get(`http://127.0.0.1:8000/api/products/total/`)
      .then((response) => setTotalProducts(response.data.totalProducts))
      .catch((error) => console.error("Error fetching total products:", error));

    // Fetch total adoption details
    axios
      .get(`http://127.0.0.1:8000/api/adoptiondetails/total/`)
      .then((response) =>
        setTotalAdoptionDetails(response.data.totalAdoptionDetails)
      )
      .catch((error) =>
        console.error("Error fetching total adoption details:", error)
      );
  }, []);

  return (
    <div className="flex h-screen mb-32">
      {/* Side Menu */}
      <AdminSideMenu />
      {/* Main Content */}
      <div className="flex-1  px-9">
        <div className="p-4 flex items-center justify-end"></div>

        <div className="grid grid-cols-4 gap-8 mt-8">
          {/* Total Users */}
          <div className="bg-gray-200 p-6 rounded-lg flex justify-between items-center">
            <div>
              <h2 className="text-xl font-semibold mb-4">Total Users</h2>
              <p className="text-3xl font-bold">{totalUsers}</p>
            </div>
            <FontAwesomeIcon
              icon={faUsers}
              size="2x"
              className="text-blue-500"
            />
          </div>
          {/* Total Appointments */}
          <div className="bg-gray-200 p-6 rounded-lg flex justify-between items-center">
            <div>
              <h2 className="text-xl font-semibold mb-4">Total Appointments</h2>
              <p className="text-3xl font-bold">{totalAppointments}</p>
            </div>
            <FontAwesomeIcon
              icon={faCalendarAlt}
              size="2x"
              className="text-green-500"
            />
          </div>
          {/* Total Products */}
          <div className="bg-gray-200 p-6 rounded-lg flex justify-between items-center">
            <div>
              <h2 className="text-xl font-semibold mb-4">Total Products</h2>
              <p className="text-3xl font-bold">{totalProducts}</p>
            </div>
            <FontAwesomeIcon
              icon={faBox}
              size="2x"
              className="text-amber-400"
            />
          </div>
          {/* Total Adoption Details */}
          <div className="bg-gray-200 p-6 rounded-lg flex justify-between items-center">
            <div>
              <h2 className="text-xl font-semibold mb-4">
                Total Adoption Details
              </h2>
              <p className="text-3xl font-bold">{totalAdoptionDetails}</p>
            </div>
            <FontAwesomeIcon icon={faDog} size="2x" className="text-red-500" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
