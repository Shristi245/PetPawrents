import React, { useEffect, useState } from "react";
import ProductCard from "../../Components/ProductCard";
import { Typography } from "@material-tailwind/react"; // Assuming you have a Select component available
import { setItemsToCart } from "../../utils";
import { useDebounce } from "../../utils";
// import { Link } from "react-router-dom/cjs/react-router-dom.min";

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("All");
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
        setFilteredProducts(data || []); // Set initial filtered products state
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, []);

  useEffect(() => {
    const _searchText = debouncedSearchText.toLowerCase();
    const _filteredProducts = products.filter(({ title, category }) => {
      return (
        title.toLowerCase().includes(_searchText) ||
        category.toLowerCase().includes(_searchText)
      );
    });
    setFilteredProducts(_filteredProducts);
  }, [debouncedSearchText, products]);

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
    const filtered = products.filter((product) => {
      return category === "All"
        ? true
        : product.category.toLowerCase() === category.toLowerCase();
    });
    setFilteredProducts(filtered);
  };

  return (
    <div className=" bg-white min-h-screen">
      <div className="relative h-screen ">
        {/* Background Image */}
        <div
          className="absolute inset-0 mx-16 mt-3 mb-28 rounded-[80px]"
          style={{ backgroundImage: "url('images/goldie.png')" }}
        >
          <div className=" mt-60 space-y-2">
            <Typography className="flex justify-end mr-20 space-x-3">
              <h1 className="text-5xl font-bold text-white mt-5">Treat Your</h1>
              <h1 className="text-6xl font-extrabold text-black ">
                PAW PARTNER
              </h1>
            </Typography>
            <Typography className=" text-5xl font-bold text-white text-center ml-60">
              With The Best
            </Typography>
          </div>
        </div>
      </div>

      {/* Category Images Section */}
      <div className="grid lg:grid-cols-4 gap-3 md:grid-cols-2 container mx-auto">
        <div
          className="rounded-full bg-amber-400 h-44 w-44 ml-20 items-center transition-transform duration-300 ease-in-out transform hover:scale-110"
          onClick={() => handleCategoryChange("Food")}
        >
          <button>
            <img
              src="images/pet-food.png"
              className="h-24 w-24 ml-8 mt-9"
              alt=""
            />
          </button>
          <p className="font-semibold text-2xl text-center mt-16">Food</p>
        </div>
        <div
          className="rounded-full bg-amber-400 h-44 w-44 ml-20 transition-transform duration-300 ease-in-out transform hover:scale-110"
          onClick={() => handleCategoryChange("Toys")}
        >
          <button>
            <img
              src="images/toys.png"
              className="h-24 w-24 ml-12 mt-10"
              alt=""
            />
          </button>
          <p className="font-semibold text-2xl text-center mt-16">Toys</p>
        </div>
        <div
          className="rounded-full bg-amber-400 h-44 w-44 ml-20 transition-transform duration-300 ease-in-out transform hover:scale-110"
          onClick={() => handleCategoryChange("Cosmetics")}
        >
          <button>
            <img
              src="images/pet-shampoo.png"
              className="h-24 w-24 ml-12 mt-10"
              alt=""
            />
          </button>
          <p className="font-semibold text-2xl text-center mt-16">Cosmetics</p>
        </div>
        <div
          className="rounded-full bg-amber-400 h-44 w-44 ml-20 transition-transform duration-300 ease-in-out transform hover:scale-110"
          onClick={() => handleCategoryChange("Clothes")}
        >
          <button>
            <img
              src="images/t-shirt.png"
              className="h-24 w-24 ml-12 mt-10"
              alt=""
            />
          </button>
          <p className="font-semibold text-2xl text-center mt-16">Clothes</p>
        </div>
        {/* Add similar sections for other categories */}
      </div>

      {/* Product List Section */}
      <div className=" container mx-auto mt-20">
        <Typography
          variant="h4"
          className="text-center sticky top-0 bg-white z-30 py-5"
        >
          Products
        </Typography>
        <div className=" lg:ml-60 px-9 relative text-end">
          <input
            type="text"
            placeholder="Search Your Choice..."
            className="pl-8 pr-4 py-2 ml-80 w-[50%] border border-gray-300 rounded-lg focus:outline-none"
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
        <div className="grid lg:grid-cols-3 gap-9 p-8 ml-16 md:grid-cols-2">
          {filteredProducts.map((product) => (
            <ProductCard
              key={product.id}
              id={product.id}
              image={product.image}
              title={product.title}
              price={product.price}
              category={product.category}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductList;
