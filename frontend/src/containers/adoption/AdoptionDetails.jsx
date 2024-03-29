import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom/cjs/react-router-dom.min";
import AdoptionCard from "../../Components/AdoptionCard";
import { v4 as uuid } from "uuid";

const AdoptionDetails = () => {
  const [adoptions, setAdoptions] = useState();

  useEffect(() => {
    const fetchAdoptions = async () => {
      const response = await fetch(
        "http://127.0.0.1:8000/all/adoptiondetails/"
      );
      const data = await response.json();

      setAdoptions(data || []);
    };

    fetchAdoptions();
  }, []);

  return (
    <div className="min-h-screen ">
      <div className="text-center mt-9">
        <h1 className="text-4xl  mb-4 trocchi-font">Adopt, Don't Shop!</h1>
        <p className="text-2xl">Our friends who</p>
        <p className="text-2xl">are looking for a home</p>
      </div>

      <div className="flex-1 px-16 pt-16 overflow-x-auto container mx-auto ">
        <div className="grid grid-cols-3 gap-2 ml-20 ">
          {adoptions?.map((adoption) => (
            <AdoptionCard
              key={uuid()}
              image={adoption.image}
              name={adoption.name}
              description={adoption.description}
            />
          ))}
        </div>
      </div>

      {/* donation optional Section */}
      <div className="flex justify-center space-x-9 h-[400px]  mb-9 px-60 mt-32">
        <div className="flex bg-blue container mx-auto rounded-[88px] px-20 ">
          <div className="ml-20">
            <img className="w-[70%]" src="images/goldy.png" alt="" />
          </div>
          <div className=" py-20 text-white">
            <h1>In addition, you can also </h1>
            <h1>make a donation for these </h1>
            <h1>fur babies</h1>
            <button className="w-[80%] py-3 text-white text-2xl rounded-[30px] mt-7 bg-[#1A8990] transition-transform duration-200 ease-in-out transform hover:scale-90">
              <Link to="/donation">Make Donations</Link>
            </button>
          </div>
        </div>
      </div>

      <div className="bg-[#FBCA00] h-[100px] flex justify-between ">
        <p className="py-9 text-xl ml-9 poppins-font">
          Disclaimer: The donation feature is voluntary and not mandatory for
          using our pet grooming services.
        </p>
        <img src="images/bgadopt.jpg" alt="" />
      </div>
    </div>
  );
};

export default AdoptionDetails;
