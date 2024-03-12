import React from "react";
import { Link } from "react-router-dom/cjs/react-router-dom.min";

const AdminSideMenu = () => {
  return (
    <>
      {/* Side Menu */}
      <div className="bg-[#56A6B8] text-white w-70 flex flex-col rounded-[30px] mt-16">
        {/* Sidebar Header */}
        <div className="mt-5 p-5  justify-center">
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
        <nav className=" ">
          <ul className="space-y-2 mt-6 px-9">
            <div className=" flex ">
              <img src="images/1.jpg" alt="" className="h-9 w-9" />
              <li className="px-4 py-2 text-[18px] hover:text-gray-600 flex ">
                <Link to="/admin-dashboard" alt="" className="w-full">
                  Dashboard
                </Link>
              </li>
            </div>

            <div className=" flex ">
              <img src="images/1.jpg" alt="" className="h-9 w-9" />
              <li className="px-4 py-2 text-[18px] hover:text-gray-600 flex ">
                <Link to="/admin-dashboard-users" alt="" className="w-full">
                  {" "}
                  Users
                </Link>
              </li>
            </div>

            <div className=" flex ">
              <img src="images/1.jpg" alt="" className="h-9 w-9" />
              <li className="px-4 py-2 text-[18px] hover:text-gray-600 flex ">
                Appointment
              </li>
            </div>

            <div className=" flex ">
              <img src="images/1.jpg" alt="" className="h-9 w-9" />
              <li className="px-4 py-2 text-[18px] hover:text-gray-600 flex ">
                <Link to="/admin-dashboard-products" alt="" className="w-full">
                  Products
                </Link>
              </li>
            </div>

            <div className=" flex ">
              <img src="images/1.jpg" alt="" className="h-9 w-9" />
              <li className="px-4 py-2 text-[18px] hover:text-gray-600 flex ">
                Adoption Details
              </li>
            </div>
          </ul>
        </nav>
      </div>
    </>
  );
};

export default AdminSideMenu;
