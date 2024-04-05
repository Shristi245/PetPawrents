import React, { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import axios from "axios";
import swal from "sweetalert2";
import "react-datepicker/dist/react-datepicker.css";
import { getLogInDetailsFromLocalStorage } from "../utils";
import { format } from "date-fns";

function AppointmentBookingPage() {
  const user = getLogInDetailsFromLocalStorage();

  const defaultBookingInfo = {
    pet_type: "",
    service: "",
    date: "",
    time: "",
  };

  const [bookingInfo, setBookingInfo] = useState(defaultBookingInfo);
  const [bookingDate, setBookingDate] = useState();

  const services = [
    { id: 1, name: "Grooming" },
    { id: 2, name: "Vaccination" },
    { id: 3, name: "Nail trimming" },
  ];

  useEffect(() => {
    if (!user) {
      // Redirect to login page or display authentication message
      swal.fire({
        title: "Authentication Required",
        text: "Please log in to book an appointment.",
        icon: "info",
      });
    }
  }, [user]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setBookingInfo((prevInfo) => ({ ...prevInfo, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!user) {
      swal.fire({
        title: "Authentication Required",
        text: "Please log in to book an appointment.",
        icon: "info",
      });
      return;
    }

    try {
      const data = {
        ...bookingInfo,
        date: format(new Date(bookingDate), "yyyy-MM-dd"),
        user: user.id,
      };

      const response = await fetch("http://127.0.0.1:8000/booking/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (response.status === 201) {
        // Booking successful
        // setBookingStatus("Your appointment has been booked successfully.");
        swal.fire({
          title: "Appointment Booked!",
          text: "Your appointment has been successfully booked.",
          icon: "success",
        });
        // Reset form fields
        setBookingInfo(defaultBookingInfo);
        setBookingDate("");
        return;
      }

      swal.fire({
        title: "Error!",
        text: "Unable to book an appointment",
        icon: "error",
      });
    } catch (error) {
      console.error("Error booking appointment:", error);
      swal.fire({
        title: "Error",
        text: "Failed to book appointment. Please try again.",
        icon: "error",
      });
    }
  };

  return (
    <div className="container mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold text-center mb-8">
        Book an Appointment
      </h1>
      {/* {status && <div className="mb-4 text-green-500">{status}</div>} */}
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label
              htmlFor="service"
              className="block text-sm font-medium text-gray-700"
            >
              Service
            </label>
            <select
              id="service"
              name="service"
              value={bookingInfo.service}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md shadow-sm border-gray-300 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              required
            >
              <option value="">Select Service</option>
              {services.map((service) => (
                <option key={service.id} value={service.name}>
                  {service.name}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label
              htmlFor="petType"
              className="block text-sm font-medium text-gray-700"
            >
              Pet Type
            </label>
            <input
              type="text"
              id="petType"
              name="pet_type"
              value={bookingInfo.pet_type}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md shadow-sm border-gray-300 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              required
            />
          </div>
          <div>
            <label
              htmlFor="date"
              className="block text-sm font-medium text-gray-700"
            >
              Date
            </label>
            <DatePicker
              selected={bookingDate}
              onChange={(date) => setBookingDate(date)}
              minDate={new Date()}
              className="mt-1 block w-full rounded-md shadow-sm border-gray-300 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              required
            />
          </div>

          <div>
            <label
              htmlFor="time"
              className="block text-sm font-medium text-gray-700"
            >
              Time
            </label>
            <input
              name="time"
              value={bookingInfo.time}
              onChange={handleChange}
              id="time"
              type="time"
            />
          </div>

          <div className="col-span-2">
            <button
              type="submit"
              className="inline-flex items-center px-4 py-2 bg-indigo-600 font-medium text-white rounded-md shadow sm:hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
            >
              Book Appointment
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default AppointmentBookingPage;
