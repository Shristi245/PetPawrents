import React, { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import swal from "sweetalert2";
import "react-datepicker/dist/react-datepicker.css";
import { getLogInDetailsFromLocalStorage } from "../utils";
import { format } from "date-fns";
import Select from "react-select";

function AppointmentBookingPage() {
  const user = getLogInDetailsFromLocalStorage();

  const defaultBookingInfo = {
    pet_type: "",
    breed: "",
    service: [],
    date: "",
    time: "",
    is_aggressive: "",
    estimatedPrice: "",
  };

  const [bookingInfo, setBookingInfo] = useState(defaultBookingInfo);
  const [bookingDate, setBookingDate] = useState();
  // const [servicePrices] = useState({
  //   Grooming: 50,
  //   Vaccination: 100,
  //   NailTrimming: 30,
  // });
  // const [breedPrices] = useState({
  //   Dog: {
  //     "German Shepherd": 70,
  //     "Labrador Retriever": 60,
  //     // Add prices for other dog breeds
  //   },
  //   Cat: {
  //     Abyssinian: 40,
  //     "American Shorthair": 35,
  //     // Add prices for other cat breeds
  //   },
  // });
  // const [aggressionPrices] = useState({
  //   Violent: 20,
  //   "Semi-violent": 10,
  //   "Not-violent": 5,
  //   Unknown: 0,
  // });

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

  // const calculateEstimatedPrice = () => {
  //   let totalPrice = 0;

  //   // Calculate price based on selected services
  //   bookingInfo.services.forEach((service) => {
  //     totalPrice += servicePrices[service];
  //   });

  //   // Add price based on selected breed
  //   totalPrice += breedPrices[bookingInfo.pet_type][bookingInfo.breed] || 0;

  //   // Add price based on aggression level
  //   totalPrice += aggressionPrices[bookingInfo.is_aggressive];

  //   // Update estimated price in the state
  //   setBookingInfo({
  //     ...bookingInfo,
  //     estimatedPrice: totalPrice,
  //   });
  // };

  const dogBreeds = [
    "German Shepherd",
    "Labrador Retriever",
    "Golden Retriever",
    "Bulldog",
    "Beagle",
    "Poodle",
    "Rottweiler",
    "Yorkshire Terrier",
    "Dachshund",
    "Boxer",
    "Siberian Husky",
    "Doberman Pinscher",
    "Great Dane",
    "Shih Tzu",
    "Pug",
    "Chihuahua",
    "Maltese",
    "Border Collie",
    "Australian Shepherd",
    "Cocker Spaniel",
  ];

  const catBreeds = [
    "Abyssinian",
    "American Shorthair",
    "Bengal",
    "Birman",
    "Bombay",
    "British Shorthair",
    "Burmese",
    "Chartreux",
    "Cornish Rex",
    "Devon Rex",
    "Egyptian Mau",
    "Exotic Shorthair",
    "Maine Coon",
    "Manx",
    "Norwegian Forest Cat",
    "Oriental",
    "Persian",
    "Ragdoll",
    "Russian Blue",
    "Siamese",
    "Sphynx",
  ];

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
                {bookingInfo.pet_type === "Dog"
                  ? dogBreeds.map((breed) => (
                      <option key={breed} value={breed}>
                        {breed}
                      </option>
                    ))
                  : bookingInfo.pet_type === "Cat"
                  ? catBreeds.map((breed) => (
                      <option key={breed} value={breed}>
                        {breed}
                      </option>
                    ))
                  : null}
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
                name="is_aggressive"
                value={bookingInfo.is_aggressive}
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
                <option value="Unknown">Unknown</option>
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
                value={`$${bookingInfo.estimatedPrice}`}
                onChange={(e) =>
                  setBookingInfo({
                    ...bookingInfo,
                    estimatedPrice: e.target.value,
                  })
                }
                className="mt-1 block w-full py-2 rounded shadow-sm border-gray-300 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
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
      </div>
    </div>
  );
}

export default AppointmentBookingPage;
