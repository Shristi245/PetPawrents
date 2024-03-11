import React, { useState } from "react";

function AppointmentPage() {
  const [fullName, setFullName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [petType, setPetType] = useState("");
  const [selectedService, setSelectedService] = useState("");
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [appointmentTime, setAppointmentTime] = useState("");

  const services = ["Bath", "Haircut", "Nail Trim"];

  const handleFullNameChange = (event) => {
    setFullName(event.target.value);
  };

  const handlePhoneNumberChange = (event) => {
    setPhoneNumber(event.target.value);
  };

  const handlePetTypeChange = (event) => {
    setPetType(event.target.value);
  };

  const handleServiceChange = (event) => {
    setSelectedService(event.target.value);
  };

  const handleDateChange = (event) => {
    setSelectedDate(new Date(event.target.value));
  };

  const handleTimeChange = (event) => {
    setAppointmentTime(event.target.value);
  };

  const isTimeSlotAvailable = (timeSlot) => {
    // Replace this logic with your actual appointment data fetching
    // This is a placeholder to demonstrate time slot availability visualization
    return Math.random() > 0.5; // Simulate random availability
  };

  const timeSlots = [
    "11:00 AM",
    "11:30 AM",
    "12:00 PM",
    "12:30 PM",
    "1:00 PM",
    "1:30 PM",
    "2:00 PM",
    "2:30 PM",
    "3:00 PM",
    "3:30 PM",
    "4:00 PM",
    "4:30 PM",
    "5:00 PM",
    "5:30 PM",
    "6:00 PM",
  ];

  const renderTimeSlots = () => {
    return timeSlots.map((timeSlot) => (
      <div key={timeSlot} className="flex items-center mb-2">
        <input
          type="radio"
          id={timeSlot}
          name="appointmentTime"
          value={timeSlot}
          className="mr-2 focus:ring-indigo-500 focus:border-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded"
          checked={appointmentTime === timeSlot}
          onChange={handleTimeChange}
          disabled={!isTimeSlotAvailable(timeSlot)}
        />
        <label htmlFor={timeSlot} className="text-sm font-medium text-gray-700">
          {timeSlot} {isTimeSlotAvailable(timeSlot) ? "" : "(Unavailable)"}
        </label>
      </div>
    ));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    // Replace this with your actual appointment booking logic
    // This is a placeholder to show a success message
    console.log("Appointment submitted successfully!");

    setFullName("");
    setPhoneNumber("");
    setPetType("");
    setSelectedService("");
    setSelectedDate(new Date());
    setAppointmentTime("");
  };

  return (
    <div className="container mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold text-center mb-8">
        Book an Appointment
      </h1>
      <form className="grid grid-cols-2 gap-4" onSubmit={handleSubmit}>
        <div>
          <label
            htmlFor="fullName"
            className="block text-sm font-medium text-gray-700"
          >
            Full Name
          </label>
          <input
            type="text"
            id="fullName"
            name="fullName"
            className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full rounded-md shadow-sm sm:text-sm"
            value={fullName}
            onChange={handleFullNameChange}
            required
          />
        </div>
        <div>
          <label
            htmlFor="phoneNumber"
            className="block text-sm font-medium text-gray-700"
          >
            Phone Number
          </label>
          <input
            type="tel"
            id="phoneNumber"
            name="phoneNumber"
            className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full rounded-md shadow-sm sm:text-sm"
            value={phoneNumber}
            onChange={handlePhoneNumberChange}
            required
          />
        </div>
        <div>
          <label
            htmlFor="petType"
            className="block text-sm font-medium text-gray-700"
          >
            Pet Type
          </label>
          <select
            id="petType"
            name="petType"
            className="mt-1 block w-full rounded-md shadow-sm border-gray-300 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            value={petType}
            onChange={handlePetTypeChange}
            required
          >
            <option value="">Select Pet Type</option>
            <option value="dog">Dog</option>
            <option value="cat">Cat</option>
          </select>
        </div>
        <div>
          <label
            htmlFor="selectedService"
            className="block text-sm font-medium text-gray-700"
          >
            Service
          </label>
          <select
            id="selectedService"
            name="selectedService"
            className="mt-1 block w-full rounded-md shadow-sm border-gray-300 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            value={selectedService}
            onChange={handleServiceChange}
            required
          >
            <option value="">Select Service</option>
            {services.map((service) => (
              <option key={service} value={service}>
                {service}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label
            htmlFor="phoneNumber"
            className="block text-sm font-medium text-gray-700"
          >
            Phone Number
          </label>
          <input
            type="tel"
            id="phoneNumber"
            name="phoneNumber"
            className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full rounded-md shadow-sm sm:text-sm"
            value={phoneNumber}
            onChange={handlePhoneNumberChange}
            required
          />
        </div>
        <div>
          <label
            htmlFor="petType"
            className="block text-sm font-medium text-gray-700"
          >
            Pet Type
          </label>
          <select
            id="petType"
            name="petType"
            className="mt-1 block w-full rounded-md shadow-sm border-gray-300 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            value={petType}
            onChange={handlePetTypeChange}
            required
          >
            <option value="">Select Pet Type</option>
            <option value="dog">Dog</option>
            <option value="cat">Cat</option>
          </select>
        </div>
        <div>
          <label
            htmlFor="selectedService"
            className="block text-sm font-medium text-gray-700"
          >
            Service
          </label>
          <select
            id="selectedService"
            name="selectedService"
            className="mt-1 block w-full rounded-md shadow-sm border-gray-300 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            value={selectedService}
            onChange={handleServiceChange}
            required
          >
            <option value="">Select Service</option>
            {services.map((service) => (
              <option key={service} value={service}>
                {service}
              </option>
            ))}
          </select>
        </div>
        ... (previous code)
        <div colSpan={2}>
          <label
            htmlFor="selectedDate"
            className="block text-sm font-medium text-gray-700"
          >
            Date
          </label>
          <input
            type="date"
            id="selectedDate"
            name="selectedDate"
            className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full rounded-md shadow-sm sm:text-sm"
            value={selectedDate.toISOString().split("T")[0]}
            onChange={handleDateChange}
            required
          />
        </div>
        <div colSpan={2}>
          <label
            htmlFor="appointmentTime"
            className="block text-sm font-medium text-gray-700"
          >
            Time Slot
          </label>
          <div className="grid grid-cols-1 gap-2">{renderTimeSlots()}</div>
        </div>
        <div colSpan={2}>
          <button
            type="submit"
            className="inline-flex items-center px-4 py-2 bg-indigo-600 font-medium text-white rounded-md shadow sm:hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
            disabled={
              !fullName ||
              !phoneNumber ||
              !petType ||
              !selectedService ||
              !appointmentTime
            }
          >
            Book Appointment
          </button>
        </div>
      </form>
    </div>
  );
}

export default AppointmentPage;
