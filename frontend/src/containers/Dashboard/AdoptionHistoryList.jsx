import React, { useState, useEffect } from "react";
import axios from "axios";
import AdminSideMenu from "../../Components/AdminSideMenu";
import { useDebounce } from "../../utils";
import Swal from "sweetalert2";
import { IoMdCheckmarkCircleOutline } from "react-icons/io";
import { RxCrossCircled } from "react-icons/rx";
import { IconButton } from "@material-tailwind/react";

const AdminAdoptionHistory = () => {
  const [adoptions, setAdoptions] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [searchText, setSearchText] = useState("");
  const debouncedSearchText = useDebounce(searchText);

  const fetchAppointmentHistory = async () => {
    try {
      const response = await axios.get(
        "http://127.0.0.1:8000/adoption-history/all/"
      );

      setFilteredUsers(response.data);
      setAdoptions(response.data);
    } catch (error) {
      console.error("Error fetching adopted history:", error);
    }
  };

  useEffect(() => {
    fetchAppointmentHistory();
  }, []);

  const updateAdoptionHistoryStatus = (id) => async () => {
    console.log(id);

    Swal.fire({
      title: "Are you sure?",
      text: "Yout will not be able to revert this!",
      icon: "info",
      showCancelButton: true,
      confirmButtonColor: "green",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, confirm it",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const res = await fetch(
          `http://127.0.0.1:8000/adoption-history/update-status/${id}/`,
          {
            method: "PATCH",
          }
        );

        if (!res.ok) {
          Swal.fire({
            title: "Error!",
            text: "Unable to change the status at the momebt",
            icon: "error",
          });
          return;
        }

        Swal.fire({
          title: "Success!",
          text: "Status changed successfully",
          icon: "success",
        });

        fetchAppointmentHistory();
      }
    });
  };

  //   useEffect(() => {
  //     const _searchText = debouncedSearchText.toLowerCase();
  //     const _filteredUsers = adoptions.filter(
  //       ({ user, pet_type, service, status }) => {
  //         const { email, phone, full_name } = user;
  //         return (
  //           email.toLowerCase().includes(_searchText) ||
  //           phone.toLowerCase().includes(_searchText) ||
  //           full_name.toLowerCase().includes(_searchText) ||
  //           pet_type.toLowerCase().includes(_searchText) ||
  //           service.toLowerCase().includes(_searchText) ||
  //           status.toLowerCase().includes(_searchText)
  //         );
  //       }
  //     );
  // setFilteredUsers(_filteredUsers);
  //   }, [debouncedSearchText, appointments]);

  //   const handleStatusChange = async (booking_id, newStatus) => {
  //     try {
  //       // Update the status on the server
  //       const res = await axios.put(
  //         `http://127.0.0.1:8000/bookingstatus/${booking_id}/`,
  //         {
  //           status: newStatus,
  //         }
  //       );
  //       fetchAppointments();
  //       console.log(res);

  //       // Show success message using SweetAlert
  //       Swal.fire({
  //         icon: "success",
  //         title: "Success!",
  //         text: `Booking status updated to ${newStatus}`,
  //         showConfirmButton: false,
  //         timer: 1500, // Close the alert after 1.5 seconds
  //       });
  //     } catch (error) {
  //       console.error("Error updating status:", error);

  //       // Show error message using SweetAlert
  //       Swal.fire({
  //         icon: "error",
  //         title: "Error!",
  //         text: "Failed to update booking status. Please try again later.",
  //       });
  //     }
  //   };

  return (
    <div className="flex overflow-hidden mb-32 ">
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
        <h1 className="text-4xl ml-3">Adoption History</h1>
        <div className="overflow-hidden w-full py-5">
          <div className=" text-xl w-full  overflow-y-scroll overflow-y-auto">
            <table className="w-full  border border-collapse  overflow-y-auto">
              <thead>
                <tr>
                  <th className="px-4 py-2 border">SN</th>
                  <th className="px-4 py-2 border">Pet</th>
                  <th className="px-4 py-2 border">User</th>
                  <th className="px-4 py-2 border">Email</th>
                  <th className="px-4 py-2 border">Adopted Date</th>
                  <th className="px-4 py-2 border">Status</th>
                  <th className="px-4 py-2 border">Action</th>
                </tr>
              </thead>
              <tbody className="text-center text-[#673405]">
                {filteredUsers.map((adoption, index) => (
                  <tr key={index} className="border">
                    <td className="px-4 py-2 border">{index + 1}</td>
                    <td className="px-4 py-2 border">{adoption.adopt.name}</td>
                    <td className="px-4 py-2 border">
                      {adoption.user.first_name}
                      {adoption.user.last_name}
                    </td>
                    <td className="px-4 py-2 border">{adoption.user.mobile}</td>
                    <td className="px-4 py-2 border">
                      {adoption.adopted_date}
                    </td>
                    <td className="px-4 py-2 border">{adoption.status}</td>
                    <td>
                      <div className="flex gap-x-2 pl-2">
                        <IconButton
                          onClick={updateAdoptionHistoryStatus(adoption.id)}
                          disabled={adoption.status === "adopted"}
                          variant="text"
                          size="sm"
                        >
                          <IoMdCheckmarkCircleOutline color="green" size={20} />
                        </IconButton>
                        {/* <RxCrossCircled color="red" /> */}
                      </div>
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

export default AdminAdoptionHistory;
