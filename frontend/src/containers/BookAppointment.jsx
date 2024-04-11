import React, { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import swal from "sweetalert2";
import "react-datepicker/dist/react-datepicker.css";
import { getLogInDetailsFromLocalStorage } from "../utils";
import { format } from "date-fns";
function AppointmentBookingPage() {
  const user = getLogInDetailsFromLocalStorage();

  const defaultBookingInfo = {
    pet_type: "",
    breed: "",
    service: "",
    date: "",
    time: "",
    is_aggressive: "",
  };

  const [bookingInfo, setBookingInfo] = useState(defaultBookingInfo);
  const [bookingDate, setBookingDate] = useState();

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
    const { name, value, type, checked } = e.target;

    // Use checked value if input type is checkbox, otherwise use the regular value
    const newValue = type === "checkbox" ? checked : value;

    setBookingInfo((prevInfo) => ({ ...prevInfo, [name]: newValue }));
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
        swal.fire({
          title: "Appointment Booked!",
          text: "Your appointment has been successfully booked.",
          icon: "success",
        });
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
    <div
      className="flex justify-center items-center mt-11 bg-no-repeat "
      style={{ backgroundImage: "url('images/appoint.png')" }}
    >
      <div className="container mx-auto px-9 py-10 shadow-2xl bg-blue rounded-[32px] w-[50%] mb-11">
        <h1 className="text-3xl font-bold text-center mb-8">
          Book an Appointment
        </h1>
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label
                htmlFor="service"
                className="block text-xl font-medium text-white"
              >
                Service
              </label>
              <select
                id="service"
                name="service"
                value={bookingInfo.service}
                onChange={handleChange}
                className="mt-1 block w-full py-2 rounded shadow-sm border-gray-300 focus:ring-indigo-500 focus:border-indigo-500  sm:text-sm"
                required
              >
                <option value="">Select Service</option>
                <option value="Grooming">Grooming</option>
                <option value="Vaccination">Vaccination</option>
                <option value="Nail trimming">Nail trimming</option>
              </select>
            </div>
            <div>
              <label
                htmlFor="petType"
                className="block text-xl font-medium text-white"
              >
                Pet Type
              </label>
              <select
                id="petType"
                name="pet_type"
                value={bookingInfo.pet_type}
                onChange={handleChange}
                className="mt-1 block w-full rounded py-2 shadow-sm border-gray-300 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                required
              >
                <option value="">Select Pet Type</option>
                <option value="Dog">Dog</option>
                <option value="Cat">Cat</option>
                <option value="Bird">Bird</option>
                <option value="Other">Other</option>
              </select>
            </div>
            <div>
              <label
                htmlFor="breed"
                className="block text-xl font-medium text-white"
              >
                Breed
              </label>
              <input
                type="text"
                id="breed"
                name="breed"
                value={bookingInfo.breed}
                onChange={handleChange}
                className="mt-1 block w-full rounded py-2 shadow-sm border-gray-300 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                required
              />
            </div>
            <div>
              <label
                htmlFor="date"
                className="block text-xl font-medium text-white"
              >
                Date
              </label>
              <div className="flex">
                <DatePicker
                  selected={bookingDate}
                  onChange={(date) => setBookingDate(date)}
                  minDate={new Date()}
                  className="mt-1 block w-full rounded py-2 px-3 shadow-sm border-gray-300 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  required
                />
              </div>
            </div>
            <div>
              <label
                htmlFor="time"
                className="block text-xl font-medium text-white"
              >
                Time
              </label>
              <input
                name="time"
                value={bookingInfo.time}
                onChange={handleChange}
                id="time"
                type="time"
                min="10:00"
                max="18:00"
                className="mt-1 block w-full rounded py-2  shadow-sm border-gray-300 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                required
              />
            </div>
            <div>
              <label
                htmlFor="aggressive"
                className="block text-lg font-medium text-white"
              >
                Is the pet aggressive?
              </label>
              <select
                id="aggressive"
                name="is_aggressive"
                value={bookingInfo.is_aggressive}
                onChange={handleChange}
                className="mt-1 block w-full rounded py-2 shadow-sm border-gray-300 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                required
              >
                <option value="">Select Aggressiveness</option>
                <option value="Violent">Violent</option>
                <option value="Semi-violent">Semi-violent</option>
                <option value="Others">Not-violent</option>
                <option value="Others">Unknown</option>
              </select>
            </div>
            <div className="col-span-2 mt-3">
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
    </div>
  );
}

export default AppointmentBookingPage;
