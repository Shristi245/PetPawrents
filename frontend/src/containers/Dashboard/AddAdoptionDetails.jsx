import React, { useState } from "react";
import AdminSideMenu from "../../Components/AdminSideMenu";
import { Button, Input, Typography } from "@material-tailwind/react";
import { Link } from "react-router-dom/cjs/react-router-dom.min";
import { v4 as uuid } from "uuid";
import {
  getDownloadURL,
  ref as storageRef,
  uploadBytes,
} from "firebase/storage";
import storage from "../../config/firebaseConfig";
import { toast } from "react-toastify";

const AddAdoptionDetails = () => {
  const defaultAdoptionInfo = {
    name: "",
    description: "",
    updated_date: "",
  };

  const [adoptionInfo, setAdoptionInfo] = useState(defaultAdoptionInfo);

  const [adoptionImgFile, setAdoptionImgFile] = useState();

  const [adoptionImgFileUrl, setAdoptionImgFileUrl] = useState();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setAdoptionInfo((prevInfo) => ({ ...prevInfo, [name]: value }));
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    if (!adoptionImgFile) {
      toast.error("Please select an image");
      return;
    }

    const imageRef = storageRef(
      storage,
      `/files/${uuid()}_${adoptionImgFile.name}`
    );

    try {
      const snapshot = await uploadBytes(imageRef, adoptionImgFile);
      const url = await getDownloadURL(snapshot.ref);

      const res = await fetch("http://127.0.0.1:8000/add/adoptiondetails/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...adoptionInfo,
          image: url,
        }),
      });

      if (res.ok) {
        toast.success("Adoption details is added successfully");

        setAdoptionImgFile("");
        setAdoptionImgFileUrl("");
        setAdoptionInfo(defaultAdoptionInfo);

        return;
      }

      toast.error("Unable to add adoption details");
    } catch (error) {
      console.error(error);
      toast.error(error.message);
    }
  };

  return (
    <div className="flex h-screen mb-32">
      <AdminSideMenu />

      <div className="flex-1 px-9 pt-16">
        <Link to="/admin-dashboard-adoption">
          <Button>Go Back</Button>
        </Link>

        <Typography variant="h4" className="mt-5">
          Add Adoption Details
        </Typography>
        <form onSubmit={submitHandler}>
          <div className="space-y-5 mt-5">
            <Input
              label="Animal Name"
              name="name"
              onChange={handleChange}
              value={adoptionInfo.name}
              required
            />
            <Input
              label="Description about animal"
              name="description"
              onChange={handleChange}
              value={adoptionInfo.description}
              required
            />

            <div className="flex items-center">
              <div className="space-y-3">
                <p>Add Animal Image</p>
                <input
                  type="file"
                  onChange={(e) => {
                    setAdoptionImgFile(e.target.files[0]);
                    setAdoptionImgFileUrl(
                      URL.createObjectURL(e.target.files[0])
                    );
                    e.target.value = "";
                  }}
                  accept="image/png,image/jpeg"
                />
              </div>
              <div className="w-[200px] h-[200px] border border-black">
                {adoptionImgFileUrl && (
                  <img
                    src={adoptionImgFileUrl}
                    alt=""
                    className=" object-cover w-full h-full"
                  />
                )}
              </div>
            </div>
          </div>

          <Button color="black" className="mt-5" type="submit">
            Add
          </Button>
        </form>
      </div>
    </div>
  );
};

export default AddAdoptionDetails;
