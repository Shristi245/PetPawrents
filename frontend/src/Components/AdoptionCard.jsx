import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import { FiEdit, FiTrash2 } from "react-icons/fi"; // Importing edit and delete icons from react-icons/fi
import Swal from "sweetalert2";
import { Link } from "react-router-dom/cjs/react-router-dom";

const AdoptionCard = ({ image, id, name, description, fetchAdoptions }) => {
  const [showFullDescription, setShowFullDescription] = useState(false);
  const [loading, setLoading] = useState(false);

  const location = useLocation();

  const toggleDescription = () => {
    setShowFullDescription(!showFullDescription);
  };

  // Function to handle edit action
  const handleEdit = () => {
    // Replace this with your logic for editing the product
    console.log("Editing product:", name);
  };

  // Function to handle delete action
  const handleDelete = async () => {
    // Display confirmation modal
    const result = await Swal.fire({
      title: "Are you sure?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    });

    // If user confirms deletion, proceed with delete operation
    if (result.isConfirmed) {
      setLoading(true);
      try {
        // Make an API call to delete the product with the given ID
        const response = await fetch(
          `http://127.0.0.1:8000/adoption/${id}/delete`,
          {
            method: "DELETE",
            headers: {
              "Content-Type": "application/json",
              // Include any authentication headers if required
            },
          }
        );

        if (response.ok) {
          
          fetchAdoptions();
          console.log(`Product deleted successfully`);
          // Optionally, you can perform additional actions such as updating the UI
        } else {
          console.error("Failed to delete product:", response.statusText);
          // Handle error scenario, show error message or perform any other actions
        }
      } catch (error) {
        console.error("Error deleting product:", error);
        // Handle error scenario, show error message or perform any other actions
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <div className=" w-[270px] h-[390px] px-3 py-2 text-center">
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
      {!showFullDescription && (
        <button
          className="text-blue-500 hover:underline"
          onClick={toggleDescription}
        >
          Read More
        </button>
      )}
      {showFullDescription && (
        <button
          className="text-blue-500 hover:underline"
          onClick={toggleDescription}
        >
          Read Less
        </button>
      )}

      {location.pathname === "/admin-dashboard-adoption" ? (
        <div className="space-x-5 flex">
          <Link to={`/edit-adoption/${id}`}>
            <FiEdit
              className="text-blue-500 cursor-pointer"
              size={24}
              onClick={handleEdit}
            />
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
        <button className="bg-blue-500 text-white px-4 py-2 rounded-md mt-2 w-full">
          Adopt
        </button>
      )}
    </div>
  );
};

export default AdoptionCard;
