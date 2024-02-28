// AdminDashboard.js
import React, { useState } from "react";

const AdminDashboard = () => {
    const [showDropdown, setShowDropdown] = useState(false);
  
 
  
    const toggleDropdown = () => {
      setShowDropdown(!showDropdown);
    };

  return (
    <div className="flex h-screen mb-32">
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
                        <img src="images/1.jpg" alt="" className="h-9 w-9"/>
                        <li className="px-4 py-2 text-[18px] hover:text-gray-600 flex ">
                        Dashboard
                        </li>
                    </div>

                    <div className=" flex "> 
                        <img src="images/1.jpg" alt="" className="h-9 w-9"/>
                        <li className="px-4 py-2 text-[18px] hover:text-gray-600 flex ">
                            <a href="/admin-dashboard-users" alt="" className="w-full"></a>Users
                        </li>
                    </div>

                    <div className=" flex "> 
                        <img src="images/1.jpg" alt="" className="h-9 w-9"/>
                        <li className="px-4 py-2 text-[18px] hover:text-gray-600 flex ">
                        Appointment
                        </li>
                    </div>

                    <div className=" flex "> 
                        <img src="images/1.jpg" alt="" className="h-9 w-9"/>
                        <li className="px-4 py-2 text-[18px] hover:text-gray-600 flex ">
                        Products
                        </li>
                    </div>

                    <div className=" flex "> 
                        <img src="images/1.jpg" alt="" className="h-9 w-9"/>
                        <li className="px-4 py-2 text-[18px] hover:text-gray-600 flex ">
                        Adoption Details
                        </li>
                    </div>
                   
                </ul>
            </nav>
           
        </div>
        {/* Main Content */}
        <div className="flex-1  px-9">
            <div className="p-4 flex items-center justify-between">
                {/* Search Bar */}
                <div className="relative  ">
                    <input
                    type="text"
                    className=" text-black text-xl px-3 py-1 rounded-full focus:outline-none"
                    placeholder="Type to search..."
                    />
                    <button className="absolute right-0 top-0 mt-1 mr-2">
                    <svg
                        className="h-6 w-6 text-black fill-current"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                    >
                        <path
                        d="M19.71 18.29l-5.47-5.47A5.93 5.93 0 0 0 14 10c0-3.31-2.69-6-6-6S2 6.69 2 10s2.69 6 6 6c1.3 0 2.49-.41 3.47-1.11l5.47 5.47c.39.39 1.02.39 1.41 0 .38-.39.39-1.02 0-1.41zM4 10c0-2.21 1.79-4 4-4s4 1.79 4 4-1.79 4-4 4-4-1.79-4-4z"
                        />
                    </svg>
                    </button>
                </div>
             
                {/* User Profile */}
                <div className="flex items-center">
                    <div className="relative">
                        <button className="text-white hover:text-amber-400 focus:outline-none" onClick={toggleDropdown}>
                            <img
                            className="w-12 h-12 rounded-full object-cover"
                            src="https://via.placeholder.com/150"
                            alt="Profile"
                            />
                        </button>
                        {showDropdown && (
                            <div className="absolute top-0 right-0 mt-10 bg-gray-700 text-white py-2 px-4 rounded-lg shadow-lg">
                            <button className="block w-full text-left hover:bg-gray-600 py-1" onClick={() => console.log("Account settings clicked")}>Account Settings</button>
                            <button className="block w-full text-left hover:bg-gray-600 py-1" onClick={() => console.log("Logout clicked")}>Logout</button>
                            </div>
                        )}
                    </div>
                </div>
            </div>
     
        </div>
    </div>
  );
};

export default AdminDashboard;
