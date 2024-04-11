import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import { FiEdit, FiTrash2 } from "react-icons/fi";
import Swal from "sweetalert2";
import { Link } from "react-router-dom/cjs/react-router-dom";
import { getLogInDetailsFromLocalStorage } from "../utils";

const AdoptionCard = ({ image, id, name, description, fetchAdoptions }) => {
  const user = getLogInDetailsFromLocalStorage();
  const [showFullDescription, setShowFullDescription] = useState(false);
  const [loading, setLoading] = useState(false);
  const [adoptionDate, setAdoptionDate] = useState("");
  const location = useLocation();

  const toggleDescription = () => {
    setShowFullDescription(!showFullDescription);
  };

  const submitAdoptionDetails = async (adoptionID) => {
    try {
      const response = await fetch("http://127.0.0.1:8000/user-adopted-pets/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          adopted_date: adoptionDate,
          user: user.id,
          adopt: adoptionID,
        }),
      });
      if (!response.ok) {
        throw new Error("Failed to adopt pet");
      }
      return response.json();
    } catch (error) {
      throw new Error("Failed to adopt pet: " + error.message);
    }
  };

  const handleAdoptButtonClick = (adoptionID) => async () => {
    try {
      const date = await Swal.fire({
        title: "Enter Adoption Date",
        input: "date",
        inputLabel: "Adoption Date",
        inputPlaceholder: "Select a date",
        showCancelButton: true,
        confirmButtonText: "Adopt",
        cancelButtonText: "Cancel",
        preConfirm: (date) => {
          const currentDate = new Date();
          const selectedDate = new Date(date);
          if (currentDate >= selectedDate) {
            throw new Error("Date Cannot be in the past");
          }
          setAdoptionDate(date);
          return date;
        },
      });
      if (date.isConfirmed) {
        const result = await Swal.fire({
          title: "Are you sure?",
          icon: "info",
          showCancelButton: true,
          confirmButtonColor: "green",
          cancelButtonColor: "#d33",
          confirmButtonText: "Yes, adopt it",
        });
        if (result.isConfirmed) {
          await submitAdoptionDetails(adoptionID);
          Swal.fire({
            title: "Success!",
            text: "Please pick up your pet within the mentioned time",
            icon: "success",
          });
          setAdoptionDate("");
          fetchAdoptions();
        }
      }
    } catch (error) {
      Swal.fire({
        title: "Error!",
        text: error.message,
        icon: "error",
      });
    }
  };

  const handleDelete = async () => {
    // Your delete logic here
  };

  return (
    <div className="w-[270px] h-[390px] px-3 py-2 text-center">
      <img
        src={image}
        alt={name}
        className="service-image border hover:shadow-xl rounded-[32px] w-full h-[250px] object-cover"
      />
      <h3
        className="text-lg font-semibold mt-4"
        style={{ fontFamily: "poppins" }}
      >
        {name}
      </h3>
      <p className="mt-2">
        {showFullDescription ? description : `${description.slice(0, 100)}...`}
      </p>
      <button
        className="text-blue-500 hover:underline"
        onClick={toggleDescription}
      >
        {showFullDescription ? "Read Less" : "Read More"}
      </button>

      {location.pathname === "/admin-dashboard-adoption" ? (
        <div className="space-x-5 flex">
          <Link to={`/edit-adoption/${id}`}>
            <FiEdit className="text-blue-500 cursor-pointer" size={24} />
          </Link>
          <FiTrash2
            className={`text-red-500 cursor-pointer ${
              loading ? "opacity-50" : ""
            }`}
            size={24}
            onClick={handleDelete}
            disabled={loading}
          />
        </div>
      ) : (
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded-md mt-2 w-full"
          onClick={handleAdoptButtonClick(id)}
        >
          Adopt
        </button>
      )}
    </div>
  );
};

export default AdoptionCard;
