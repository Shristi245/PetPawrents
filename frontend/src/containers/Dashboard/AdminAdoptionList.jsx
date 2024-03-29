import { Button, Typography } from "@material-tailwind/react";
import React, { useEffect, useState } from "react";
import AdminSideMenu from "../../Components/AdminSideMenu";
import { Link } from "react-router-dom/cjs/react-router-dom.min";
import { v4 as uuid } from "uuid";
import AdoptionCard from "../../Components/AdoptionCard";

const AdminAdoptionList = () => {
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
    <div className="flex h-screen mb-32">
      <AdminSideMenu />

      <div className="flex-1 px-9 pt-16 overflow-x-auto">
        <div className="flex justify-between">
          <Typography variant="h4">Adoption</Typography>

          <Link to="/add-product">
            <Button>Add</Button>
          </Link>
        </div>

        <div className="grid grid-cols-3 gap-4">
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
    </div>
  );
};

export default AdminAdoptionList;
