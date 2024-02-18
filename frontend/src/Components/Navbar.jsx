import React from 'react';

function Navbar() {
  return (
    <nav className="bg-[#FEC200] p-4 pr-5">
      <div className="container mx-auto flex flex-wrap items-center justify-between">
        {/* Left side links */}
        <div className="flex items-center  w-full lg:w-auto lg:flex-grow lg:text-start">
          <a href="/" className="text-white text-xl hover:bg-[#417EC5] px-4 md:py-3 md:px-6  py-1 rounded-[24px]   transition-transform duration-200 ease-in-out transform hover:scale-90">Home</a>
          <a href="/about" className="text-white  text-xl hover:bg-[#417EC5] px-4 md:py-3 md:px-6 py-1 rounded-[24px] transition-transform duration-200 ease-in-out transform hover:scale-90">About</a>
          <a href="/services" className="text-white  text-xl hover:bg-[#417EC5] px-4 md:py-3 md:px-6 py-1 rounded-[24px] transition-transform duration-200 ease-in-out transform hover:scale-90">Services</a>
          <a href="/contact" className="text-white  text-xl hover:bg-[#417EC5] px-4 md:py-3 md:px-6 py-1 rounded-[24px] transition-transform duration-200 ease-in-out transform hover:scale-90">Contact</a>
        </div>

        {/* Website logo */}
        <a href="/" className="text-white text-2xl font-bold my-4 mr-32 lg:my-0 ">
          <img src="/images/final_logo.png" alt="" className='h-[8rem]'/>
        </a>

        {/* Right side links */}
        <div className="flex items-center w-full lg:w-auto lg:flex-grow lg:items-center mr-11 justify-end space-x-5">
          <a href="" className="text-white mr-4">
            <img src="/images/wishlist.png" alt="" />
          </a>
          <a href="/login" className="text-white mr-4 text-xl hover:bg-[#417EC5] px-4 md:py-2 md:px-5 py-1 rounded-[24px] transition-transform duration-200 ease-in-out transform hover:scale-90">Login</a>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
