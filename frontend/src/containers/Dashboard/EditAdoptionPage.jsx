import React, { useEffect, useState } from "react";
import { updloadImageToFirebase } from "../../utils";
import { toast } from "react-toastify";
import AdminSideMenu from "../../Components/AdminSideMenu";
import { Link, useParams } from "react-router-dom/cjs/react-router-dom.min";
import { Button, Input, Typography } from "@material-tailwind/react";

const EditAdoptionPage = () => {
  const { adoptionID } = useParams();

  const defaultAdoptionInfo = {
    name: "",
    description: "",
  };

  const [adoptionInfo, setAdoptionInfo] = useState(defaultAdoptionInfo);

  const [adoptionImgFile, setAdoptionIgFile] = useState();

  const [adoptionImgFileUrl, setAdoptionImgFileUrl] = useState();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setAdoptionInfo((prevInfo) => ({ ...prevInfo, [name]: value }));
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    try {
      const imgUrl = adoptionImgFile
        ? await updloadImageToFirebase(adoptionImgFile)
        : adoptionImgFileUrl;

      const res = await fetch(
        `http://127.0.0.1:8000/adoption/update/${adoptionID}/`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            ...adoptionInfo,
            image: imgUrl,
          }),
        }
      );

      console.log(res);

      if (res.ok) {
        toast.success("Adoption details updated successfully");
        setAdoptionIgFile("");
        return;
      }

      toast.error("Unable to add adoption details");
    } catch (error) {
      console.error(error);
      toast.error(error.message);
    }
  };

  useEffect(() => {
    const fetchProductByID = async () => {
      const res = await fetch(`http://127.0.0.1:8000/adoption/${adoptionID}/`);
      const data = await res.json();
      setAdoptionInfo(data);
      setAdoptionImgFileUrl(data.image);
    };
    fetchProductByID();
  }, [adoptionID]);

  return (
    <div className="flex h-screen mb-32">
      <AdminSideMenu />

      <div className="flex-1 px-9 pt-16">
        <Link to="/admin-dashboard-adoption">
          <Button>Go Back</Button>
        </Link>

        <Typography variant="h4" className="mt-5">
          Edit Adoption
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
              label="Description"
              name="description"
              type="text"
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
                    setAdoptionIgFile(e.target.files[0]);
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
            Update
          </Button>
        </form>
      </div>
    </div>
  );
};

export default EditAdoptionPage;
