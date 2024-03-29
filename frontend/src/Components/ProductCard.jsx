import { Button } from "@material-tailwind/react";
import { useLocation } from "react-router-dom";
import { Link } from "react-router-dom/cjs/react-router-dom";

const ProductCard = ({ image, title, price, id }) => {
  const location = useLocation();

  // Function to handle edit action
  const handleEdit = () => {
    // Replace this with your logic for editing the product
    console.log("Editing product:", title);
  };

  // Function to handle delete action
  const handleDelete = () => {
    // Replace this with your logic for deleting the product
    console.log("Deleting product:", title);
  };

  return (
    <div className="border w-[300px] px-3 py-2">
      <img
        src={image}
        alt={title}
        className="service-image hover:shadow-xl w-full h-[250px] object-cover"
      />
      <h3
        className="text-lg font-semibold mt-4"
        style={{ fontFamily: "poppins" }}
      >
        {title}
      </h3>

      <p className="it">
        <b>Price</b> NPR {price}
      </p>

      {location.pathname === "/admin-dashboard-products" ? (
        <div className="space-x-5 mt-5">
          <Link to={`/edit-product/${id}`}>
            <Button color="green" size="sm" onClick={handleEdit}>
              Edit
            </Button>
          </Link>

          <Button color="red" size="sm" onClick={handleDelete}>
            Delete
          </Button>
        </div>
      ) : (
        <button className="bg-blue-500 text-white px-4 py-2 rounded-md mt-2 w-full">
          Add to cart
        </button>
      )}
    </div>
  );
};

export default ProductCard;
