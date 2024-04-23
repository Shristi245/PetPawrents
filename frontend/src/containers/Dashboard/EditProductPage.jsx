import React, { useEffect, useState } from "react";
import { updloadImageToFirebase } from "../../utils";
import { toast } from "react-toastify";
import AdminSideMenu from "../../Components/AdminSideMenu";
import { Link, useParams } from "react-router-dom/cjs/react-router-dom.min";
import {
  Button,
  Input,
  Typography,
  Select,
  Option,
} from "@material-tailwind/react";

const EditProductPage = () => {
  const { productID } = useParams();
  const defaultProductInfo = {
    title: "",
    category: "",
    description: "",
    price: 0,
  };

  const [productInfo, setProductInfo] = useState(defaultProductInfo);

  const [productImgFile, setProductIgFile] = useState();

  const [productImgFileUrl, setProductImgFileUrl] = useState();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProductInfo((prevInfo) => ({ ...prevInfo, [name]: value }));
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    try {
      const imgUrl = productImgFile
        ? await updloadImageToFirebase(productImgFile)
        : productImgFileUrl;

      const res = await fetch(
        `http://127.0.0.1:8000/products/update/${productID}/`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            ...productInfo,
            image: imgUrl,
          }),
        }
      );

      if (res.ok) {
        toast.success("Product details updated successfully");
        setProductIgFile("");
        return;
      }

      toast.error("Unable to add product");
    } catch (error) {
      console.error(error);
      toast.error(error.message);
    }
  };

  useEffect(() => {
    const fetchProductByID = async () => {
      const res = await fetch(`http://127.0.0.1:8000/product/${productID}/`);
      const data = await res.json();
      setProductInfo(data);
      setProductImgFileUrl(data.image);
    };
    fetchProductByID();
  }, [productID]);

  return (
    <div className="flex h-screen mb-32">
      <AdminSideMenu />

      <div className="flex-1 px-9 pt-16">
        <Link to="/admin-dashboard-products">
          <Button>Go Back</Button>
        </Link>

        <Typography variant="h4" className="mt-5">
          Edit Product
        </Typography>
        <form onSubmit={submitHandler}>
          <div className="space-y-5 mt-5">
            <Input
              label="Product Title"
              name="title"
              onChange={handleChange}
              value={productInfo.title}
              required
            />
            <Select
              label="Product Category"
              name="category"
              onChange={(value) => {
                handleChange({ target: { name: "category", value } });
              }}
              value={productInfo.category}
              required
            >
              <Option value="" disabled selected>
                Select Category
              </Option>
              <Option value="food">Food</Option>
              <Option value="clothes">Clothes</Option>
              <Option value="toys">Toys</Option>
              <Option value="cosmetics">Cosmetics</Option>

              {/* Add more categories here */}
            </Select>
            <Input
              label="Product Description"
              name="description"
              onChange={handleChange}
              value={productInfo.description}
              required
            />
            <Input
              label="Product Price"
              name="price"
              min={100}
              step={0.001}
              type="number"
              onChange={handleChange}
              value={productInfo.price}
              required
            />

            <div className="flex items-center">
              <div className="space-y-3">
                <p>Add Product Image</p>
                <input
                  type="file"
                  onChange={(e) => {
                    setProductIgFile(e.target.files[0]);
                    setProductImgFileUrl(
                      URL.createObjectURL(e.target.files[0])
                    );
                    e.target.value = "";
                  }}
                  accept="image/png,image/jpeg"
                />
              </div>
              <div className="w-[200px] h-[200px] border border-black">
                {productImgFileUrl && (
                  <img
                    src={productImgFileUrl}
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

export default EditProductPage;
