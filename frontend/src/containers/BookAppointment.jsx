import React, { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import swal from "sweetalert2";
import "react-datepicker/dist/react-datepicker.css";
import { getLogInDetailsFromLocalStorage } from "../utils";
import { format } from "date-fns";
import Select from "react-select";
import {
  AGRRESIVE_CHARGE,
  BREEDS,
  BREED_SERVICE_CHARGE,
  SERVICE_PRICES,
} from "../constants";

function AppointmentBookingPage() {
  const user = getLogInDetailsFromLocalStorage();

  const defaultBookingInfo = {
    pet_type: "",
    breed: "",
    service: [],
    date: "",
    time: "",
    aggressive: "",
    estimated_price: "",
  };

  const [bookingInfo, setBookingInfo] = useState(defaultBookingInfo);
  const [bookingDate, setBookingDate] = useState();

  useEffect(() => {
    if (!user) {
      swal.fire({
        title: "Authentication Required",
        text: "Please log in to book an appointment.",
        icon: "info",
      });
    }
  }, [user]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setBookingInfo({
      ...bookingInfo,
      [name]: value,
    });
  };

  const handleServicesChange = (selectedOptions) => {
    const optionsArray = Array.isArray(selectedOptions)
      ? selectedOptions
      : [selectedOptions];
    const selectedServices = optionsArray.map((option) => option.value);

    setBookingInfo({
      ...bookingInfo,
      service: selectedServices, // Set service to an array of selected services
    });
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

    // Check if services are selected
    if (bookingInfo.service.length === 0) {
      swal.fire({
        title: "Service Required",
        text: "Please select at least one service.",
        icon: "error",
      });
      return;
    }

    try {
      const data = {
        ...bookingInfo,
        service: bookingInfo.service.toString(),
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
          text: "Your appointment is currently pending. Please wait to receive the status of your booking",
          icon: "success",
        });
        setBookingInfo(defaultBookingInfo);
        setBookingDate("");
        return;
      }

      const resMessage = await response.json();

      swal.fire({
        title: "Error!",
        text: resMessage?.error || "Unable to book an appointment",
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

  const calculateEstimatedPrice = () => {
    const { pet_type, service, breed, aggressive } = bookingInfo;

    let estimatedPrice = 0;

    if (service.length !== 0) {
      const serviceCharge = service.reduce((acc, item) => {
        const servicePrice = SERVICE_PRICES[item] || 0;
        console.log(servicePrice);
        return (
          acc + (isNaN(parseInt(servicePrice)) ? 0 : parseInt(servicePrice))
        );
      }, 0);

      estimatedPrice += serviceCharge;
    }

    if (pet_type && breed) {
      const breedCharge =
        BREED_SERVICE_CHARGE[pet_type.toLowerCase()][breed] || 0;
      estimatedPrice += breedCharge;
    }

    if (aggressive) {
      const agrresiveCharge = AGRRESIVE_CHARGE[aggressive] || 0;
      estimatedPrice += agrresiveCharge;
    }

    setBookingInfo((prevInfo) => {
      return { ...prevInfo, estimated_price: estimatedPrice };
    });
  };

  useEffect(() => {
    calculateEstimatedPrice();
  }, [
    bookingInfo.aggressive,
    bookingInfo.breed,
    bookingInfo.pet_type,
    bookingInfo.service,
  ]);

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
                Services
              </label>
              <Select
                id="service"
                name="service"
                value={bookingInfo.service.map((service) => ({
                  value: service,
                  label: service,
                }))}
                onChange={handleServicesChange}
                options={[
                  { value: "Grooming", label: "Grooming" },
                  { value: "Vaccination", label: "Vaccination" },
                  { value: "NailTrimming", label: "Nail Trimming" },
                ]}
                isMulti
              />
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
                className=" block w-full rounded py-2 lg:text-lg  px-2 shadow-sm border-gray-300 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                required
              >
                <option value="" className="text-blue">
                  Select Pet Type
                </option>
                <option value="Dog">Dog</option>
                <option value="Cat">Cat</option>
              </select>
            </div>
            <div>
              <label
                htmlFor="breed"
                className="block text-xl font-medium text-white"
              >
                Breed
              </label>
              <select
                id="breed"
                name="breed"
                value={bookingInfo.breed}
                onChange={handleChange}
                className="mt-1 block w-full rounded py-2 lg:text-lg px-2 shadow-sm border-gray-300 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                required
              >
                <option value="" className="text-blue">
                  Select Breed
                </option>
                {BREEDS[bookingInfo.pet_type.toLowerCase()]?.map((breed) => (
                  <option key={breed} value={breed}>
                    {breed}
                  </option>
                ))}
                <option value="Unknown">Unknown</option>
              </select>
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
                className="mt-1 block w-full rounded py-2 px-2 shadow-sm border-gray-300 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
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
                name="aggressive"
                value={bookingInfo.aggressive}
                onChange={handleChange}
                className="mt-1 block w-full rounded py-2 lg:text-lg shadow-sm px-2 border-gray-300 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                required
              >
                <option value="" className="text-blue">
                  Select Aggressiveness
                </option>
                <option value="Violent">Violent</option>
                <option value="Semi-violent">Semi-violent</option>
                <option value="Not-violent">Not-violent</option>
              </select>
            </div>
            <div className="mt-4">
              <label
                htmlFor="estimatedPrice"
                className="block text-xl font-medium text-white"
              >
                Estimated Price
              </label>
              <input
                id="estimatedPrice"
                name="estimatedPrice"
                type="text"
                value={`NPR ${bookingInfo.estimated_price}`}
                className="mt-1 block px-2 w-full py-2 rounded shadow-sm border-gray-300 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
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
        <p className="text-right w-full mt-5 text-white">
          Note: The price may vary according to taken services.
        </p>
      </div>
    </div>
  );
}

export default AppointmentBookingPage;
