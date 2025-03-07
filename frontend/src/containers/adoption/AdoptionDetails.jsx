import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom/cjs/react-router-dom.min";
import AdoptionCard from "../../Components/AdoptionCard";
import { v4 as uuid } from "uuid";
import Swal from "sweetalert2";
import { Alert } from "@material-tailwind/react";

const AdoptionDetails = () => {
  const [adoptions, setAdoptions] = useState([]);

  const fetchAdoptions = async () => {
    const response = await fetch("http://127.0.0.1:8000/all/adoptiondetails/");
    const data = await response.json();

    setAdoptions(data || []);
  };

  useEffect(() => {
    fetchAdoptions();
  }, []);

  return (
    <div className="min-h-screen">
      <div className="text-center mt-9">
        <h1 className="text-4xl mb-4 trocchi-font">Adopt, Don't Shop!</h1>
        <p className="text-2xl">Our friends who</p>
        <p className="text-2xl">are looking for a home</p>
      </div>

      <div className="flex-1 px-16 py-11 pt-16 overflow-x-auto container mx-auto">
        {adoptions.length === 0 && (
          <Alert color="black" className="text-xl">
            No pets are available for the adoptions
          </Alert>
        )}

        <div className="grid grid-cols-3 gap-2 ml-20">
          {adoptions?.map((adoption) => (
            <AdoptionCard
              key={uuid()}
              id={adoption.id}
              image={adoption.image}
              name={adoption.name}
              description={adoption.description}
              fetchAdoptions={fetchAdoptions}
            />
          ))}
        </div>
      </div>

      <div className="flex flex-col container mx-auto md:flex-row justify-center space-y-4 md:space-y-0 md:space-x-9 h-auto mb-9  md:px-32 mt-32">
        <div className="flex bg-blue container mx-auto rounded-[88px] md:px-20">
          <div className="ml-4 md:ml-20">
            <img className="w-[70%]" src="images/goldy.png" alt="" />
          </div>
          <div className="py-6 md:py-20 text-white ml-16">
            <h1>In addition, you can also</h1>
            <h1>make a donation for these</h1>
            <h1>fur babies</h1>
            <button className="w-[80%] py-3 text-white text-2xl rounded-[30px] mt-7 bg-[#1A8990] transition-transform duration-200 ease-in-out transform hover:scale-90">
              <Link to="/donation">Make Donations</Link>
            </button>
          </div>
        </div>
      </div>

      <div className="bg-[#FBCA00] h-auto md:h-[100px] flex flex-col md:flex-row justify-center md:justify-between items-center px-4 md:px-16">
        <p className="py-4 md:py-9 text-xl poppins-font text-center md:text-left">
          Disclaimer: The donation feature is voluntary and not mandatory for
          using our pet grooming services.
        </p>
        <img className="md:mr-9 h-24 mt-1" src="images/bgadopt.jpg" alt="" />
      </div>
    </div>
  );
};

export default AdoptionDetails;
