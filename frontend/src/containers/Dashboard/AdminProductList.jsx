import { Button, Typography } from "@material-tailwind/react";
import React, { useEffect, useState } from "react";
import AdminSideMenu from "../../Components/AdminSideMenu";
import { Link } from "react-router-dom/cjs/react-router-dom.min";
import ProductCard from "../../Components/ProductCard";
import { v4 as uuid } from "uuid";

const AdminProductList = () => {
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
    <div className="flex h-screen mb-32">
      <AdminSideMenu />

      <div className="flex-1 px-9 pt-16 overflow-x-auto">
        <div className="flex justify-between">
          <Typography variant="h4">Products</Typography>

          <Link to="/add-product">
            <Button>Add</Button>
          </Link>
        </div>

        <div className="grid grid-cols-3 gap-4">
          {products?.map((product) => (
            <ProductCard
              key={uuid()}
              image={product.image}
              title={product.title}
              price={product.price}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default AdminProductList;
