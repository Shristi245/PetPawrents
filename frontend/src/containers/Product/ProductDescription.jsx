import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { setItemsToCart } from "../../utils";
import { toast } from "react-toastify";

const ProductDetails = ({ image, title, price, description, category }) => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);

  const handleAddToCart = (item) => () => {
    setItemsToCart(item);
    toast.success("Item is added to the cart");
  };

  useEffect(() => {
    async function fetchProduct() {
      try {
        const response = await axios.get(
          `http://127.0.0.1:8000/product/${id}/`
        );
        setProduct(response.data);
      } catch (error) {
        console.error("Error fetching product:", error);
      }
    }

    fetchProduct();
  }, [id]);

  return (
    <div className="container mx-auto px-4 py-8">
      {product ? (
        <div className="flex flex-wrap items-center">
          <div className="w-full md:w-1/2 mb-4 md:mb-0">
            <img
              src={product.image}
              alt={product.title}
              className="rounded-lg"
            />
          </div>
          <div className="w-full md:w-1/2 md:pl-8">
            <h2 className="text-2xl font-semibold mb-4">{product.title}</h2>
            <p className="text-gray-700 mb-4">{product.description}</p>
            <p className="text-gray-700 mb-4">Category: {product.category}</p>
            <p className="text-gray-700 mb-4">Price: ${product.price}</p>
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              onClick={handleAddToCart({
                image,
                title,
                price,
                id,
                description,
                category,
              })}
            >
              Add to Cart
            </button>
          </div>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default ProductDetails;
