import { Button } from "@material-tailwind/react";
import { useLocation } from "react-router-dom";

const ProductCard = ({ image, title, price }) => {
  const location = useLocation();

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
          <Button color="green" size="sm">
            Edit
          </Button>

          <Button color="red" size="sm">
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
