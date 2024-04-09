import React, { useState } from "react";
import { Link } from "react-router-dom";
import { LayoutDashboard } from "lucide-react";
import { ShoppingCart } from "lucide-react";
import { CalendarCheck2 } from "lucide-react";
import { Users } from "lucide-react";
import { Dog } from "lucide-react";

const AdminSideMenu = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(true);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <>
      {/* Collapse Lines */}
      <div
        className="absolute top-30 left-0 p-2 cursor-pointer"
        onClick={toggleMenu}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className={`h-8 w-8 text-gray-600 ${isMenuOpen ? "rotate-180" : ""}`}
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fillRule="evenodd"
            d="M4 4h12a1 1 0 0 1 0 2H4a1 1 0 1 1 0-2zm0 5h12a1 1 0 1 1 0 2H4a1 1 0 0 1 0-2zm0 5h12a1 1 0 0 1 0 2H4a1 1 0 1 1 0-2z"
          />
        </svg>
      </div>
      {/* Side Menu */}
      <div
        className={`bg-[#56A6B8] text-white w-70 flex flex-col rounded-[30px] mt-16 ${
          isMenuOpen ? "" : "hidden"
        }`}
      >
        {/* Sidebar Header */}
        <div className="mt-5 p-5 justify-center">
          {/* Profile Picture */}
          <img
            className="w-16 h-16 rounded-full object-cover justify-center ml-20"
            src="images/1.jpg"
            alt="Profile"
          />
          {/* Profile Information */}
          <div className="text-center mt-2">
            <h2 className="text-lg font-semibold">Admin</h2>
            <p className="text-sm">admin@example.com</p>
          </div>
        </div>

        {/* Sidebar Menu */}
        <nav className="">
          <ul className="space-y-8 mt-6 px-9">
            <div className="flex">
              <LayoutDashboard />
              <li className="px-4 text-[18px] hover:text-gray-600 flex">
                <Link to="/admin-dashboard" alt="" className="w-full">
                  Dashboard
                </Link>
              </li>
            </div>

            <div className="flex">
              <Users />

              <li className="px-4  text-[18px] hover:text-gray-600 flex">
                <Link to="/admin-dashboard-users" alt="" className="w-full">
                  Users
                </Link>
              </li>
            </div>

            <div className="flex">
              <CalendarCheck2 />

              <li className="px-4  text-[18px] hover:text-gray-600 flex">
                <Link to="/admin-appointment" alt="" className="w-full">
                  Appointments
                </Link>
              </li>
            </div>

            <div className="flex">
              <ShoppingCart />

              <li className="px-4  text-[18px] hover:text-gray-600 flex">
                <Link to="/admin-dashboard-products" alt="" className="w-full">
                  Products
                </Link>
              </li>
            </div>

            <div className="flex">
              <Dog />
              <li className="px-4 text-[18px] hover:text-gray-600 flex">
                <Link to="/admin-dashboard-adoption" alt="" className="w-full">
                  Adoptions
                </Link>
              </li>
            </div>

            <div className="flex">
              <Dog />
              <li className="px-4 text-[18px] hover:text-gray-600 flex">
                <Link
                  to="/admin-dashboard-adoption-history"
                  alt=""
                  className="w-full"
                >
                  Adoption History
                </Link>
              </li>
            </div>

            <div className="flex">
              <Dog />
              <li className="px-4 text-[18px] hover:text-gray-600 flex">
                <Link to="/admin-order-list" alt="" className="w-full">
                  Orders
                </Link>
              </li>
            </div>
          </ul>
        </nav>
      </div>
    </>
  );
};

export default AdminSideMenu;
