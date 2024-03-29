import React, { useState, useEffect } from "react";
import axios from "axios";
import AdminSideMenu from "../../Components/AdminSideMenu";
import { useDebounce } from "../../utils";

const AdminAppointments = () => {
  const [appointments, setAppointments] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [searchText, setSearchText] = useState("");
  const debouncedSearchText = useDebounce(searchText);

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const response = await axios.get("http://127.0.0.1:8000/appointments/");

        // Ensure status is set to "pending" for each appointment
        const appointmentsWithStatus = response.data.map((appointment) => ({
          ...appointment,
          status: "pending",
        }));
        setFilteredUsers(response.data);
        setAppointments(appointmentsWithStatus);
      } catch (error) {
        console.error("Error fetching appointments:", error);
      }
    };
    fetchAppointments();
  }, []);

  useEffect(() => {
    const _searchText = debouncedSearchText.toLowerCase();
    const _filteredUsers = appointments.filter(
      ({ email, phone, full_name, pet_type, service, status }) => {
        return (
          email.toLowerCase().includes(_searchText) ||
          phone.toLowerCase().includes(_searchText) ||
          full_name.toLowerCase().includes(_searchText) ||
          pet_type.toLowerCase().includes(_searchText) ||
          service.toLowerCase().includes(_searchText) ||
          status.toLowerCase().includes(_searchText)
        );
      }
    );
    setFilteredUsers(_filteredUsers);
  }, [debouncedSearchText, appointments]);

  const handleStatusChange = async (index, newStatus) => {
    try {
      const updatedAppointments = [...appointments];
      updatedAppointments[index].status = newStatus;
      setAppointments(updatedAppointments);
      // Update the status on the server
      await axios.put(
        `http://127.0.0.1:8000/appointments/${appointments[index].id}`,
        { status: newStatus }
      );
    } catch (error) {
      console.error("Error updating status:", error);
    }
  };

  return (
    <div className="flex overflow-hidden h-screen mb-32 ">
      {/* Include AdminSideMenu component */}
      <AdminSideMenu />

      {/* Main Content */}
      <div className="flex-1  px-9 overflow-hidden">
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

        {/* Main content starts here */}
        <h1 className="text-4xl ml-3">Appointments</h1>
        <div className="overflow-hidden w-full py-5">
          <div className=" text-xl w-full  overflow-x-scroll">
            <table className="w-full   border border-collapse overflow-x-scroll">
              <thead>
                <tr>
                  <th className="px-4 py-2 border">SN</th>
                  <th className="px-4 py-2 border">Full Name</th>
                  <th className="px-4 py-2 border">Email</th>
                  <th className="px-4 py-2 border">Phone</th>
                  <th className="px-4 py-2 border">Pet Type</th>
                  <th className="px-4 py-2 border">Service</th>
                  <th className="px-4 py-2 border">Date</th>
                  <th className="px-4 py-2 border">Time</th>
                  <th className="px-4 py-2 border">Status</th>
                  <th className="px-4 py-2 border">Requests</th>
                </tr>
              </thead>
              <tbody className="text-center text-[#673405]">
                {filteredUsers.map((appointment, index) => (
                  <tr key={index} className="border">
                    <td className="px-4 py-2 border">{index + 1}</td>
                    <td className="px-4 py-2 border">
                      {appointment.full_name}
                    </td>
                    <td className="px-4 py-2 border">{appointment.email}</td>
                    <td className="px-4 py-2 border">{appointment.phone}</td>
                    <td className="px-4 py-2 border">{appointment.pet_type}</td>
                    <td className="px-4 py-2 border">{appointment.service}</td>
                    <td className="px-4 py-2 border">{appointment.date}</td>
                    <td className="px-4 py-2 border">{appointment.time}</td>
                    <td className="px-4 py-2 border">{appointment.status}</td>
                    <td className="px-4 py-2 border flex justify-center">
                      <button
                        className="bg-[#1A8990] hover:bg-green-600 text-white py-1 px-7 rounded-[7px] mr-2"
                        onClick={() => handleStatusChange(index, "Accepted")}
                      >
                        Accept
                      </button>
                      <button
                        className="bg-[#E56262] hover:bg-red-500 text-black py-1 px-7 rounded-[7px]"
                        onClick={() => handleStatusChange(index, "Rejected")}
                      >
                        Cancel
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

export default AdminAppointments;
