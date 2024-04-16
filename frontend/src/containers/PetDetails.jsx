import React from "react";

const PetDetails = ({ pet }) => {
  return (
    <div className="max-w-md mx-auto bg-white shadow-md rounded px-8 py-6 my-4">
      <div className="text-2xl font-bold mb-4">{pet.petname}</div>
      <div>
        <label className="block text-gray-700 font-bold mb-2">Pet Type:</label>
        <p>{pet.pettype}</p>
      </div>
      <div>
        <label className="block text-gray-700 font-bold mb-2">Age:</label>
        <p>{pet.age}</p>
      </div>
      <div>
        <label className="block text-gray-700 font-bold mb-2">Height:</label>
        <p>{pet.height}</p>
      </div>
      <div>
        <label className="block text-gray-700 font-bold mb-2">Weight:</label>
        <p>{pet.weight}</p>
      </div>
    </div>
  );
};

export default PetDetails;
