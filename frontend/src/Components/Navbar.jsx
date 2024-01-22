import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="bg-amber-400 p-4">
    <div className="container mx-auto flex items-center justify-between ">
     

      {/* Navigation Links */}
        <div className="flex justify-items-start space-x-4 ">
            <Link to="/" className="text-white ">Home</Link>
            <Link to="/about" className="text-white">About</Link>
            <Link to="/services" className="text-white">Services</Link>
            <Link to="/contact" className="text-white">Contact</Link>
            {/* Add more links as needed */}
        </div>

    {/* App Logo */}
        <div className=""></div>
            <Link to="/" className="text-white flex items-center mx-auto ">
                <img src="/images/final_logo.png" alt="App Logo" className="h-[7rem] " />
            </Link>
        </div>

        <div className=" ">
            <Link to="/wishlist" className="text-white ">Wishlist</Link>
            <Link to="/login" className="text-white ">Login</Link>

            {/* Add more links as needed */}
        </div>

  </nav>

  );
};

export default Navbar;