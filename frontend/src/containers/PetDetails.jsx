import React, { useState, useEffect } from "react";
import { getLogInDetailsFromLocalStorage } from "../utils";
import { Link } from "react-router-dom";

const PetDetails = () => {
  const user = getLogInDetailsFromLocalStorage();
  const [pet, setPet] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPet = async () => {
      try {
        const response = await fetch(
          `http://127.0.0.1:8000/pets/by_user/${user.id}/`
        );
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        if (data && data.length > 0) {
          // Set the first pet found for the user
          setPet(data[0]);
        } else {
          setPet(null);
        }
      } catch (error) {
        console.error("There was a problem with the fetch operation:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchPet();
  }, [user.id]);

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div className="max-w-md mx-auto">
      {pet ? (
        <div className="container mx-auto bg-white shadow-2xl space-y-5 text-xl my-11 rounded-lg border px-11 py-5">
          <div className="text-2xl font-bold mb-4 text-center underline">
            {pet.petname}'s Profile
          </div>
          <div className="flex space-x-3">
            <label className="block text-gray-700 font-bold mb-2">
              Pet Type:
            </label>
            <p>{pet.pettype}</p>
          </div>
          <div className="flex space-x-3">
            <label className="block text-gray-700 font-bold mb-2">Age:</label>
            <p>{pet.age} years old</p>
          </div>
          <div className="flex space-x-3">
            <label className="block text-gray-700 font-bold mb-2">
              Height:
            </label>
            <p>{pet.height} feet</p>
          </div>
          <div className="flex space-x-3">
            <label className="block text-gray-700 font-bold mb-2">
              Weight:
            </label>
            <p>{pet.weight} kg</p>
          </div>
        </div>
      ) : (
        <div className="text-center py-2 rounded-lg  mb-12 bg-cover">
          <img src="images/woohoo.png" alt="" />
          <p className="text-2xl text-black ">
            No pet details found for the user.
          </p>
          <Link to="/pet">
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
              Create My Pet Profile
            </button>
          </Link>
        </div>
      )}
    </div>
  );
};

export default PetDetails;
