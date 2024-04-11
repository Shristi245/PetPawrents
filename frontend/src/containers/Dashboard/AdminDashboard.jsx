import React, { useState, useEffect } from "react";
import axios from "axios";
import AdminSideMenu from "../../Components/AdminSideMenu";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUsers,
  faCalendarAlt,
  faBox,
  faDog,
} from "@fortawesome/free-solid-svg-icons";
import CanvasJSReact from "@canvasjs/react-charts";
const { CanvasJSChart } = CanvasJSReact;

const AdminDashboard = () => {
  const [totalUsers, setTotalUsers] = useState(0);
  const [totalAppointments, setTotalAppointments] = useState(0);
  const [totalProducts, setTotalProducts] = useState(0);
  const [totalAdoptionDetails, setTotalAdoptionDetails] = useState(0);
  const [aggregatedData, setAggregatedData] = useState(null);
  const [bookingStatusData, setBookingStatusData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch total users
        const usersResponse = await axios.get(
          "http://127.0.0.1:8000/api/users/total/"
        );
        setTotalUsers(usersResponse.data.totalUsers);

        // Fetch total appointments
        const appointmentsResponse = await axios.get(
          "http://127.0.0.1:8000/api/appointments/total/"
        );
        setTotalAppointments(appointmentsResponse.data.totalAppointments);

        // Fetch total products
        const productsResponse = await axios.get(
          "http://127.0.0.1:8000/api/products/total/"
        );
        setTotalProducts(productsResponse.data.totalProducts);

        // Fetch total adoption details
        const adoptionResponse = await axios.get(
          "http://127.0.0.1:8000/api/adoptiondetails/total/"
        );
        setTotalAdoptionDetails(adoptionResponse.data.totalAdoptionDetails);

        // Fetch aggregated data
        const aggregatedResponse = await axios.get(
          "http://127.0.0.1:8000/count-analytics/"
        );
        setAggregatedData(aggregatedResponse.data);

        // Fetch booking status data
        const bookingStatusResponse = await axios.get(
          "http://127.0.0.1:8000/booking-status-analytics/"
        );
        setBookingStatusData(bookingStatusResponse.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const getProductAnalyticsOptions = (data) => {
    return {
      animationEnabled: true,
      exportEnabled: true,
      theme: "dark2",
      title: {
        text: "Product Analytics",
      },
      data: [
        {
          type: "pie",
          indexLabel: "{label}: {y}%",
          startAngle: -90,
          dataPoints: Object.entries(data).map(([label, count]) => ({
            y: count,
            label,
          })),
        },
      ],
    };
  };

  const formatBookingStatusData = (bookingStatusData) => {
    if (Array.isArray(bookingStatusData)) {
      return bookingStatusData.map((status) => ({
        y: status.count,
        label: status.status,
      }));
    } else {
      return [];
    }
  };

  return (
    <div className="flex h-screen mb-32">
      {/* Side Menu */}
      <AdminSideMenu />
      {/* Main Content */}
      <div className="flex-1 px-9">
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

        <div className="grid grid-cols-2 gap-8 mt-8">
          {/* Product Analytics Pie Chart */}
          <div className="bg-gray-200 p-6 rounded-lg">
            <h1 className="text-3xl font-bold">Count Per Services</h1>
            {aggregatedData && (
              <CanvasJSChart
                options={getProductAnalyticsOptions(aggregatedData)}
              />
            )}
          </div>
          {/* Booking Status Analytics Chart */}
          <div className="bg-gray-200 p-6 rounded-lg">
            <h1 className="text-3xl font-bold">Booking Status Analytics</h1>
            {bookingStatusData.length > 0 ? (
              <CanvasJSChart
                options={{
                  animationEnabled: true,
                  exportEnabled: true,
                  theme: "dark2",
                  title: { text: "Booking Status" },
                  data: [
                    {
                      type: "bar",
                      dataPoints: formatBookingStatusData(bookingStatusData),
                    },
                  ],
                }}
              />
            ) : (
              <p>No booking status data available.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
