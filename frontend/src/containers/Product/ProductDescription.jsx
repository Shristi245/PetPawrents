import React, { useState, useEffect } from "react";
import axios from "axios";
import { MdStar } from "react-icons/md";
import { HiOutlineArrowCircleRight } from "react-icons/hi";

const ProductDetails = () => {
  const [description, setDescription] = useState("");

  useEffect(() => {
    const fetchProductDescription = async () => {
      try {
        const response = await axios.get("/api/product/1/description"); // Assuming product ID is 1
        setDescription(response.data.description);
      } catch (error) {
        console.error("Error fetching product description:", error);
      }
    };

    fetchProductDescription();
  }, []);

  return (
    <div>
      <div className="p-3 max-w-7xl m-auto">
        <div className="mt-6 sm:mt-10">
          <div>
            <div className="grid gird-cols-1 md:grid-cols-3 sm:grid-cols-2 gap-6 h-max">
              {/* Product Image */}
              <div className="overflow-hidden rounded-xl">
                {/* <img
                  src="https://i.imgur.com/zryxaH8.jpg"
                  alt="Product-Image"
                  className="w-full"
                ></img> */}
              </div>
              {/* Product Details */}
              <div className="flex flex-col justify-between">
                <div>
                  {/* Product Title */}
                  <h1 className="text-3xl text-red-500 font-semibold sm:text-4xl">
                    Burger
                  </h1>
                  {/* Product Description */}
                  <p className="mt-3 text-gray-600 text-md leading-6 text-justify sm:text-left sm:mt-4">
                    {description}
                  </p>
                  {/* Star Ratings */}
                  <span className="my-3 text-xl text-yellow-600 flex items-center gap-1 sm:my-4">
                    {Array.from({ length: 3 }).map((_, index) => (
                      <MdStar key={index} />
                    ))}
                  </span>
                  {/* Product Price */}
                  <span className="text-xl text-red-500 font-semibold sm:text-2xl">
                    $20
                  </span>
                </div>
                {/* Quantity Input and Order Button */}
                <div className=" ">
                  <div className="text-left flex flex-col gap-2 w-full">
                    {/* Quantity Label */}
                    <label className="font-semibold">Quantity</label>
                    {/* Quantity Input */}
                    <input
                      className="border border-gray-300 text-sm font-semibold mb-1 max-w-full w-full outline-none rounded-md m-0 py-3 px-4 md:py-3 md:px-4 md:mb-0 focus:border-red-500"
                      type="number"
                      defaultValue="1"
                      required
                    />
                  </div>
                  {/* Order Button */}
                  <div className="w-full text-left my-4">
                    <button
                      className="flex justify-center items-center gap-2 w-full py-3 px-4 bg-red-500 text-white text-md font-bold border border-red-500 rounded-md ease-in-out duration-150 shadow-slate-600 hover:bg-white hover:text-red-500 lg:m-0 md:px-6"
                      title="Confirm Order"
                    >
                      <span>Confirm Order</span>
                      <HiOutlineArrowCircleRight />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
