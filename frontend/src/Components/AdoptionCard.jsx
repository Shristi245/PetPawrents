import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import { Button } from "@material-tailwind/react";

const AdoptionCard = ({ image, name, description }) => {
  const [showFullDescription, setShowFullDescription] = useState(false);
  const location = useLocation();

  const toggleDescription = () => {
    setShowFullDescription(!showFullDescription);
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
          Adopt
        </button>
      )}
    </div>
  );
};

export default AdoptionCard;
