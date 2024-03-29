import React, { useContext } from "react";
// import { getLogInDetailsFromLocalStorage, logout } from "../utils";
import { Link } from "react-router-dom";
import AuthContext from "../context/AuthContext";

function Navbar() {
  const { user, logoutUser } = useContext(AuthContext);

  return (
    <nav className="bg-[#FEC200] p-4 ">
      <div className="container mx-auto flex flex-wrap items-center justify-between">
        {/* Left side links */}
        <div className="flex items-center   w-full lg:w-auto lg:flex-grow lg:text-start">
          <a
            href="/"
            className="text-white text-xl hover:bg-[#417EC5] px-4 md:py-3 md:px-6  py-1 rounded-[24px]   transition-transform duration-200 ease-in-out transform hover:scale-90"
          >
            Home
          </a>
          <a
            href="/about"
            className="text-white  text-xl hover:bg-[#417EC5] px-4 md:py-3 md:px-6 py-1 rounded-[24px] transition-transform duration-200 ease-in-out transform hover:scale-90"
          >
            About
          </a>
          <a
            href="/services"
            className="text-white  text-xl hover:bg-[#417EC5] px-4 md:py-3 md:px-6 py-1 rounded-[24px] transition-transform duration-200 ease-in-out transform hover:scale-90"
          >
            Services
          </a>
          <a
            href="/contact"
            className="text-white  text-xl hover:bg-[#417EC5] px-4 md:py-3 md:px-6 py-1 rounded-[24px] transition-transform duration-200 ease-in-out transform hover:scale-90"
          >
            Contact
          </a>
        </div>

        {/* Website logo */}
        <a
          href="/"
          className="text-white text-2xl font-bold my-4 mr-11 lg:my-0 "
        >
          <img
            src="/images/final_logo.png"
            alt=""
            className="h-[8rem] w-[15rem]"
          />
        </a>

        {/* Right side links */}
        <div className="flex items-center w-full lg:w-auto lg:flex-grow lg:items-center justify-end space-x-3">
          <Link to="/product" className="text-white mr-4">
            <img src="/images/wishlist.png" alt="" />
          </Link>
          {!!user ? (
            <Link
              to={`${
                user?.user_type === "ADMIN" ? "/admin-dashboard" : "/profile"
              }`}
            >
              <button className="text-white hover:text-black text-xl hover:bg-[#417EC5] px-4 md:py-2 md:px-5 py-1 rounded-[24px] transition-transform duration-200 ease-in-out transform hover:scale-90">
                {user?.user_type === "ADMIN" ? "Dashboard" : "Profile"}
              </button>
            </Link>
          ) : (
            <Link to="/register">
              <button className="text-white hover:text-black mr-28 text-xl hover:bg-[#417EC5]  md:py-2 md:px-5 py-1 rounded-[24px] transition-transform duration-200 ease-in-out transform hover:scale-90">
                Get Started
              </button>
            </Link>
          )}
          {!!user && (
            <button
              className="text-white hover:text-black mr-4 text-xl bg-[#417EC5]  hover:bg-white px-4 md:py-2 md:px-5 py-1 rounded-[24px] transition-transform duration-200 ease-in-out transform hover:scale-90"
              onClick={logoutUser}
            >
              Log Out
            </button>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
