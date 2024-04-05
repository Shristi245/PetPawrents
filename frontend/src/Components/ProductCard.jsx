import { useLocation } from "react-router-dom";
import { Link } from "react-router-dom/cjs/react-router-dom";
import Swal from "sweetalert2";
import React, { useState } from "react";
import { setItemsToCart } from "../utils";
import { toast } from "react-toastify";
import { FiEdit, FiTrash2 } from "react-icons/fi"; // Importing edit and delete icons from react-icons/fi

const ProductCard = ({ image, title, price, id, category, fetchProducts }) => {
  const location = useLocation();
  const [loading, setLoading] = useState(false);
  const [showCartIcon, setShowCartIcon] = useState(false);

  const handleAddToCart = (item) => () => {
    setItemsToCart(item);
    toast.success("Item is added to the cart");
  };

  // Function to handle edit action
  const handleEdit = () => {
    // Replace this with your logic for editing the product
    console.log("Editing product:", title);
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
          `http://127.0.0.1:8000/product/${id}/delete`,
          {
            method: "DELETE",
            headers: {
              "Content-Type": "application/json",
              // Include any authentication headers if required
            },
          }
        );

        if (response.ok) {
          fetchProducts();
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
    <div className="group  flex w-full max-w-xs flex-col overflow-hidden bg-white rounded-3xl p-3 relative">
      <div
        className="relative w-72 h-80 overflow-hidden "
        onMouseEnter={() => setShowCartIcon(true)}
        onMouseLeave={() => setShowCartIcon(false)}
      >
        <img src={image} alt={title} className="w-full h-full object-cover" />
        {showCartIcon && location.pathname !== "/admin-dashboard-products" && (
          <button
            className="absolute bottom-8 right-2 flex items-center justify-center w-10 h-10 bg-gray-900 text-white transition-all duration-400  hover:bg-gray-700"
            onClick={handleAddToCart({ image, title, price, id, category })}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="mr-2 h-5 w-5"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path d="M3 1a1 1 0 000 2h1.22l.305 1.222a.997.997 0 00.01.042l1.358 5.43-.893.892C3.74 11.846 4.632 14 6.414 14H15a1 1 0 000-2H6.414l1-1H14a1 1 0 00.894-.553l3-6A1 1 0 0017 3H6.28l-.31-1.243A1 1 0 005 1H3zM16 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM6.5 18a1.5 1.5 0 100-3 1.5 1.5 0 000 3z" />
            </svg>
          </button>
        )}
      </div>
      <div className="mt-4 pb-5">
        <h5 className="text-center tracking-tight text-gray-500">{title}</h5>
        <div className="mb-5 flex justify-center">
          <p>
            <span className="text-sm font-bold text-gray-900">
              NRP. {price}
            </span>
          </p>
        </div>
      </div>

      {location.pathname === "/admin-dashboard-products" ? (
        <div className="space-x-5 flex">
          <Link to={`/edit-product/${id}`}>
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
      ) : null}
    </div>
  );
};

export default ProductCard;
