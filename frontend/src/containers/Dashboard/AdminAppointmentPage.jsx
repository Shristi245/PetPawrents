import React, { useState, useEffect } from "react";
import axios from "axios";
import AdminSideMenu from "../../Components/AdminSideMenu";
import { getLogInDetailsFromLocalStorage, useDebounce } from "../../utils";
import Swal from "sweetalert2";
import {
  Alert,
  Button,
  Dialog,
  DialogBody,
  DialogFooter,
  DialogHeader,
  Input,
  Typography,
} from "@material-tailwind/react";
import { toast } from "react-toastify";
import { IoMdCheckmarkCircleOutline } from "react-icons/io";
import { FaRegCircleXmark } from "react-icons/fa6";

const AdminAppointments = () => {
  const [appointments, setAppointments] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [searchText, setSearchText] = useState("");
  const debouncedSearchText = useDebounce(searchText);

  const fetchAppointments = async () => {
    try {
      const response = await axios.get("http://127.0.0.1:8000/booking/");

      // Ensure status is set to "pending" for each appointment
      setFilteredUsers(response.data);
      setAppointments(response.data);
    } catch (error) {
      console.error("Error fetching appointments:", error);
    }
  };

  useEffect(() => {
    fetchAppointments();
  }, []);

  useEffect(() => {
    const _searchText = debouncedSearchText.toLowerCase();
    const _filteredUsers = appointments.filter(
      ({ user, pet_type, service, status }) => {
        const { email, phone, full_name } = user;
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

  const handleStatusChange = async (booking_id, newStatus, estimated_price) => {
    try {
      await axios.put(`http://127.0.0.1:8000/bookingstatus/${booking_id}/`, {
        status: newStatus,
      });

      // Show success message to the user
      Swal.fire({
        icon: "success",
        title: "Success!",
        text: `Booking status updated to ${newStatus}. An email notification has been sent.`,
      });

      // Refresh the appointments list
      fetchAppointments();

      const user = getLogInDetailsFromLocalStorage();

      if (newStatus === "accepted") {
        // Storing transaction amount
        await fetch("http://127.0.0.1:8000/transactions/create/", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            user: user.id,
            amount: estimated_price,
            transaction_type: "booking",
            reference_id: booking_id,
          }),
        });
      }
    } catch (error) {
      console.error("Error updating status:", error);

      // Show error message to the user
      Swal.fire({
        icon: "error",
        title: "Error!",
        text: "Failed to update booking status. Please try again later.",
      });
    }
  };
  return (
    <div className="flex overflow-hidden mb-32 h-screen ">
      {/* Include AdminSideMenu component */}
      <AdminSideMenu />

      {/* Main Content */}
      <div className="flex-1  px-9 overflow-hidden mt-8">
        {/* <div className="p-4 flex items-center justify-between">
          Search Bar
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
        </div> */}

        {/* Main content starts here */}
        <h1 className="text-4xl ml-3  ">Appointments</h1>
        <div className="overflow-hidden w-full py-5">
          <div className=" text-xl w-full   ">
            {appointments.length === 0 && (
              <Alert color="black">No appointments booked till now</Alert>
            )}
            <table className="w-full  border border-collapse ">
              <thead>
                <tr>
                  <th className="px-4 py-2 border">SN</th>
                  <th className="px-4 py-2 border">Full Name</th>
                  <th className="px-4 py-2 border">Email</th>
                  <th className="px-4 py-2 border">Phone</th>
                  <th className="px-4 py-2 border">Status</th>
                  <th className="px-4 py-2 border">Details</th>
                  <th className="px-4 py-2 border">Amount</th>
                  <th className="px-4 py-2 border">Service Charge</th>
                  <th className="px-4 py-2 border">Requests</th>
                </tr>
              </thead>
              <tbody className="text-center text-[#673405]">
                {filteredUsers.map((appointment, index) => (
                  <tr key={index} className="border">
                    <td className="px-4 py-2 border">{index + 1}</td>
                    <td className="px-9 py-2 border">
                      {appointment.user.first_name}
                      {appointment.user.last_name}
                    </td>
                    <td className="px-4 py-2 border">
                      {appointment.user.email}
                    </td>
                    <td className="px-4 py-2 border">
                      {appointment.user.mobile}
                    </td>

                    <td className="px-4 py-2 border">{appointment.status}</td>

                    <td className="px-4 py-2 border">
                      <AppointmentDetails
                        service={appointment.service}
                        pet_type={appointment.pet_type}
                        date={appointment.date}
                        time={appointment.time}
                        aggressive={appointment.aggressive}
                        breed={appointment.breed}
                        estimated_price={appointment.estimated_price}
                      />
                    </td>

                    <td className="px-4 py-2 border">
                      {appointment.estimated_price}
                    </td>

                    <td className="px-4 py-2 border">
                      <UpdateSerivceCharge
                        fetchAppointments={fetchAppointments}
                        booking_id={appointment.id}
                        estimated_price={appointment.estimated_price}
                        status={appointment.status}
                      />
                    </td>

                    <td className="px-4 py-2  flex justify-center space-x-5">
                      {appointment.status === "pending" && (
                        <>
                          <button
                            className=" hover:text-green-500 text-green-800 py-1"
                            onClick={() =>
                              handleStatusChange(
                                appointment.id,
                                "accepted",
                                appointment.estimated_price
                              )
                            }
                          >
                            <IoMdCheckmarkCircleOutline className="w-7 h-7" />
                          </button>
                          <button
                            className="hover:text-red-300 text-red-500 py-1 "
                            onClick={() =>
                              handleStatusChange(
                                appointment.id,
                                "rejected",
                                appointment.estimated_price
                              )
                            }
                          >
                            <FaRegCircleXmark className="w-6 h-6" />
                          </button>
                        </>
                      )}
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

const AppointmentDetails = ({
  pet_type,
  service,
  estimated_price,
  aggressive,
  breed,
  date,
  time,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleOpen = () => setIsOpen(!isOpen);

  return (
    <div>
      <Button onClick={handleOpen} size="sm">
        View Details
      </Button>
      <Dialog open={isOpen} handler={handleOpen}>
        <DialogHeader>
          <Typography variant="h5">Appointment Details</Typography>
        </DialogHeader>

        <DialogBody>
          <div className="space-y-4">
            <p>
              Pet Type:
              <span> {pet_type}</span>
            </p>

            <p>
              Service:
              <span> {service}</span>
            </p>

            <p>
              Breed:
              <span> {breed}</span>
            </p>

            <p>
              Aggressive:
              <span> {aggressive}</span>
            </p>

            <p>
              Appintment Date:
              <span> {date}</span>
            </p>

            <p>
              Time:
              <span> {time}</span>
            </p>

            <p>
              Estimated Price:
              <span> NRP {estimated_price}</span>
            </p>
          </div>
        </DialogBody>
      </Dialog>
    </div>
  );
};

const UpdateSerivceCharge = ({
  estimated_price,
  booking_id,
  status,
  fetchAppointments,
}) => {
  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(!open);

  const [amount, setAmount] = useState(estimated_price);

  const handleUpdateAmount = async (e) => {
    e.preventDefault();
    const user = getLogInDetailsFromLocalStorage();
    const res = await fetch(
      "http://127.0.0.1:8000/transactions/update-amount/",
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          user: user.id,
          reference_id: booking_id,
          amount: amount,
          transaction_type: "booking",
        }),
      }
    );

    if (res.ok) {
      handleOpen();
      fetchAppointments();
      toast.success("Total charge is updated");
      return;
    }

    toast.error("Unable to update at the moment");
  };

  return (
    <div>
      <Button
        className="sm"
        disabled={["rejected", "pending"].includes(status)}
        onClick={handleOpen}
      >
        Update
      </Button>
      <Dialog open={open} handler={handleOpen}>
        <DialogHeader>New Service Charge</DialogHeader>

        <DialogBody>
          <form id="amount-form" onSubmit={handleUpdateAmount}>
            <Input
              label="Amount"
              type="number"
              min={1}
              required
              value={amount}
              onChange={(e) => {
                setAmount(e.target.value);
              }}
            />
          </form>
        </DialogBody>

        <DialogFooter>
          <div className="space-x-5">
            <Button variant="text" onClick={handleOpen}>
              Close
            </Button>
            <Button color="green" type="submit" form="amount-form">
              Update
            </Button>
          </div>
        </DialogFooter>
      </Dialog>
    </div>
  );
};
