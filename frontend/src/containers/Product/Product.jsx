import React, { useEffect, useState } from "react";
import ProductCard from "../../Components/ProductCard";
import { v4 as uuid } from "uuid";
import { Typography, Select } from "@material-tailwind/react"; // Assuming you have a Select component available
import { setItemsToCart } from "../../utils";
import { useDebounce } from "../../utils";

// import { Link } from "react-router-dom/cjs/react-router-dom.min";

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);

  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedBrand, setSelectedBrand] = useState("All");
  const [searchText, setSearchText] = useState("");

  const debouncedSearchText = useDebounce(searchText);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch(`http://127.0.0.1:8000/all/products/`);
        if (!response.ok) {
          throw new Error("Failed to fetch products");
        }
        const data = await response.json();
        setProducts(data || []);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, []);

  const handleCategoryChange = (event) => {
    setSelectedCategory(event.target.value);
  };

  const handleBrandChange = (event) => {
    setSelectedBrand(event.target.value);
  };

  // const filteredProducts = products.filter(
  //   (product) =>
  //     (selectedCategory === "All" || product.category === selectedCategory) &&
  //     (selectedBrand === "All" || product.brand === selectedBrand)
  // );

  useEffect(() => {
    const _searchText = debouncedSearchText.toLowerCase();
    const _filteredProducts = products.filter(({ title, category, price }) => {
      return (
        title.toLowerCase().includes(_searchText) ||
        price.toLowerCase().includes(_searchText) ||
        category.toLowerCase().includes(_searchText)
      );
    });
    setFilteredProducts(_filteredProducts);
  }, [debouncedSearchText, products]);

  return (
    <div className=" bg-white min-h-screen">
      <div className="relative h-screen ">
        {/* Background Image */}
        <div
          className="absolute inset-0 mx-16 mt-3 mb-24 rounded-[80px]"
          style={{ backgroundImage: "url('images/goldie.png')" }}
        >
          <div className=" mt-56 space-y-2">
            <Typography className="flex justify-end mr-20 space-x-3">
              <h1 className="text-5xl font-bold text-white mt-5">Treat Your</h1>
              <h1 className="text-6xl font-extrabold text-black ">
                PAW PARTNER
              </h1>
            </Typography>
            <Typography className=" text-5xl font-bold text-white text-center ml-28">
              {" "}
              With The Best
            </Typography>
            <div className=" ml-60 px-9 relative">
              <input
                type="text"
                placeholder="Search Your Choice..."
                className="pl-8 pr-4 py-2 ml-80 w-[70%] border border-gray-300 rounded-lg focus:outline-none"
                onChange={(e) => setSearchText(e.target.value)}
              />
              <button>
                <img
                  src="images/search.png"
                  alt=""
                  className="absolute mr-12 top-1/2 right-4 transform -translate-y-1/2 w-6 h-6 cursor-pointer"
                />
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="flex">
        <div className="w-1/4 p-4">
          <Typography variant="h6" className="mb-4">
            Filter By:
          </Typography>
          <Select
            value={selectedCategory}
            onChange={handleCategoryChange}
            className="mb-4"
            color="lightBlue"
          >
            <option value="Food">Food</option>
            <option value="Toys">Toys</option>
            <option value="Cosmetics">Cosmetics</option>
            {/* Add more options for other categories */}
          </Select>
          <Select
            value={selectedBrand}
            onChange={handleBrandChange}
            className="mb-4"
            color="lightBlue"
          >
            <option value="All">All Brands</option>
            <option value="Brand1">Brand1</option>
            <option value="Brand2">Brand2</option>
            {/* Add more options for other brands */}
          </Select>
        </div>
        <div className="flex-1">
          <Typography variant="h4" className="text-center mt-6">
            Products
          </Typography>
          <div className="grid grid-cols-3 gap-9 p-8">
            {filteredProducts.map((product) => {
              return (
                <ProductCard
                  key={uuid()}
                  id={product.id}
                  image={product.image}
                  title={product.title}
                  price={product.price}
                  category={product.category}
                />
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductList;
