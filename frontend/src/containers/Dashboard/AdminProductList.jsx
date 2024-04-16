import { Button, Typography } from "@material-tailwind/react";
import React, { useEffect, useState } from "react";
import AdminSideMenu from "../../Components/AdminSideMenu";
import { Link } from "react-router-dom/cjs/react-router-dom.min";
import ProductCard from "../../Components/ProductCard";
import { v4 as uuid } from "uuid";

const AdminProductList = () => {
  const [products, setProducts] = useState();
  const fetchProducts = async () => {
    const response = await fetch("http://127.0.0.1:8000/all/products/");
    const data = await response.json();
    console.log(data);
    setProducts(data || []);
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  // Function to update product information
  // const updateProduct = async (productId, newData) => {
  //   try {
  //     const response = await fetch(`http://127.0.0.1:8000/products/${productId}`, {
  //       method: "PUT",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify(newData),
  //     });
  //     if (response.ok) {
  //       // If update is successful, fetch products again to reflect changes
  //       fetchProducts();
  //       console.log("Product updated successfully!");
  //     } else {
  //       console.error("Failed to update product");
  //     }
  //   } catch (error) {
  //     console.error("Error updating product:", error);
  //   }
  // };
  return (
    <div className="flex h-screen mb-32">
      <AdminSideMenu />

      <div className="flex-1 px-9 overflow-x-auto ">
        <div className="sticky top-0 bg-white pt-14 mb-4 z-10">
          <div className="flex justify-between">
            <Typography variant="h4">Products</Typography>

            <Link to="/add-product">
              <Button>Add</Button>
            </Link>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-4">
          {products?.map((product) => (
            <ProductCard
              id={product.id}
              key={uuid()}
              image={product.image}
              title={product.title}
              price={product.price}
              fetchProducts={fetchProducts}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default AdminProductList;
