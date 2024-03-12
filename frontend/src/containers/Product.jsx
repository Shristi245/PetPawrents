// ProductList.js
import React, { useEffect, useState } from "react";
import ProductCard from "../Components/ProductCard";
import { v4 as uuid } from "uuid";
import { Typography } from "@material-tailwind/react";

const ProductList = () => {
  const [products, setProducts] = useState();

  useEffect(() => {
    const fetchProducts = async () => {
      const response = await fetch("http://127.0.0.1:8000/all/products/");
      const data = await response.json();

      setProducts(data || []);
    };

    fetchProducts();
  }, []);
  return (
    <>
      <Typography variant="h4" className="text-center mt-6">
        Products
      </Typography>

      {/* Repeat the above structure for the other product categories */}
      <div className="grid grid-cols-4 gap-9 p-8">
        {products?.map((product) => (
          <ProductCard
            key={uuid()}
            image={product.image}
            title={product.title}
            price={product.price}
          />
        ))}
      </div>
    </>
  );
};

// ProductCard component

export default ProductList;
