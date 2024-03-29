import React from "react";
import { Link } from "react-router-dom/cjs/react-router-dom.min";

const Footer = () => {
  return (
    <footer className="bg-[#56A6B8] pt-8">
      <div className="container mx-auto px-2 py-6 lg:py-4">
        <div className="md:flex  justify-around">
          {/* Logo and Address */}
          <div className="mb-6 md:mb-0 pt-9 w-[20rem]">
            <div className=" items-center">
              <span className="text-4xl ">Pet Pawrents</span>
              <p className="mt-3 text-black  text-lg">
                Get Your Pets Looking Fabulous
              </p>
              <p className=" text-black ">Kathmandu | Nepal</p>
            </div>

            <div className="pt-9">
              <img
                src="/images/final_logo.png"
                className="h-[8rem] me-3"
                alt="Pet Pawrents Logo"
              />
            </div>
          </div>

          {/* Navigation Links */}
          <div className="grid grid-cols-2 gap-8 sm:gap-6 sm:grid-cols-4 pt-4 px-2">
            <div class="ml-9">
              <h2 className="mb-6 text-2xl  uppercase ">Quick Links</h2>
              <ul className="text-black text-xl font-medium">
                <li className="mb-4">
                  <Link to="/" className="hover:underline">
                    Home
                  </Link>
                </li>

                <li className="mb-4">
                  <Link to="/contact" className="hover:underline">
                    Contact Us
                  </Link>
                </li>

                <li className="mb-4">
                  <Link to="/about" className="hover:underline">
                    About
                  </Link>
                </li>

                <li className="mb-4">
                  <Link to="/services" className="hover:underline">
                    Services
                  </Link>
                </li>
              </ul>
            </div>

            <div class="ml-9">
              <h2 className="mb-6 text-2xl uppercase ">Account</h2>
              <ul className="text-black  text-xl font-medium">
                <li className="mb-4">
                  <Link to="/login" className="hover:underline ">
                    Sign In
                  </Link>
                </li>
                <li>
                  <Link to="/register" className="hover:underline">
                    Sign Up
                  </Link>
                </li>
              </ul>
            </div>

            <div class="ml-9">
              <h2 className="mb-6 text-2xl  uppercase ">Services</h2>
              <ul className="text-black text-xl font-medium">
                <li className="mb-4">Grooming </li>
                <li className="mb-4">Vaccination </li>

                <li className="mb-4">Veterinary </li>

                <li className="mb-4">Pet Products </li>
              </ul>
            </div>

            <div class="ml-9">
              <h2 className="mb-6 text-2xl  uppercase ">Connect with us</h2>
              <ul className="text-black text-xl font-medium">
                <li className="mb-4">
                  <Link to="#" className="hover:underline">
                    Facebook
                  </Link>
                </li>
                <li>
                  <Link to="#" className="hover:underline">
                    Instagram
                  </Link>
                </li>
                <li>
                  <Link to="">Discord</Link>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div class="flex justify-end pt-6 ">
          <div class="flex mt-4 sm:mt-0 ">
            <a
              href="https://www.facebook.com/"
              class="text-gray-700 hover:text-gray-900 dark:hover:text-white"
            >
              <svg
                class="w-4 h-4"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 8 19"
              >
                <path
                  fill-rule="evenodd"
                  d="M6.135 3H8V0H6.135a4.147 4.147 0 0 0-4.142 4.142V6H0v3h2v9.938h3V9h2.021l.592-3H5V3.591A.6.6 0 0 1 5.592 3h.543Z"
                  clip-rule="evenodd"
                />
              </svg>
              <span class="sr-only">Facebook page</span>
            </a>
            <a
              href="https://discord.com/"
              class="text-gray-700 hover:text-gray-900 dark:hover:text-white ms-5"
            >
              <svg
                class="w-4 h-4"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 21 16"
              >
                <path d="M16.942 1.556a16.3 16.3 0 0 0-4.126-1.3 12.04 12.04 0 0 0-.529 1.1 15.175 15.175 0 0 0-4.573 0 11.585 11.585 0 0 0-.535-1.1 16.274 16.274 0 0 0-4.129 1.3A17.392 17.392 0 0 0 .182 13.218a15.785 15.785 0 0 0 4.963 2.521c.41-.564.773-1.16 1.084-1.785a10.63 10.63 0 0 1-1.706-.83c.143-.106.283-.217.418-.33a11.664 11.664 0 0 0 10.118 0c.137.113.277.224.418.33-.544.328-1.116.606-1.71.832a12.52 12.52 0 0 0 1.084 1.785 16.46 16.46 0 0 0 5.064-2.595 17.286 17.286 0 0 0-2.973-11.59ZM6.678 10.813a1.941 1.941 0 0 1-1.8-2.045 1.93 1.93 0 0 1 1.8-2.047 1.919 1.919 0 0 1 1.8 2.047 1.93 1.93 0 0 1-1.8 2.045Zm6.644 0a1.94 1.94 0 0 1-1.8-2.045 1.93 1.93 0 0 1 1.8-2.047 1.918 1.918 0 0 1 1.8 2.047 1.93 1.93 0 0 1-1.8 2.045Z" />
              </svg>
              <span class="sr-only">Discord community</span>
            </a>
            <a
              href="https://www.instagram.com/"
              class="text-gray-700 hover:text-gray-900 dark:hover:text-white ms-5"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="w-4 h-4"
                viewBox="0 0 512 512"
                fill="currentColor"
              >
                <path d="M394.6 0H117.4C52.7 0 0 52.7 0 117.4v277.2C0 459.3 52.7 512 117.4 512h277.2c64.7 0 117.4-52.7 117.4-117.4V117.4C512 52.7 459.3 0 394.6 0zm84.4 394.6c0 46.7-38 84.6-84.6 84.6H117.4c-46.7 0-84.6-38-84.6-84.6V117.4C32.8 70.7 70.7 32.8 117.4 32.8h277.2c46.7 0 84.6 38 84.6 84.6v277.2z" />
                <path d="M256 123c-73.6 0-133 59.4-133 133s59.4 133 133 133 133-59.4 133-133-59.4-133-133-133zm0 212.8c-47.9 0-86.8-38.9-86.8-86.8s38.9-86.8 86.8-86.8 86.8 38.9 86.8 86.8-38.9 86.8-86.8 86.8z" />
                <circle cx="390.5" cy="121.5" r="30.2" />
              </svg>
              <span class="sr-only">Instagram page</span>
            </a>
          </div>
        </div>
      </div>
      <div
        className="text-center p-3"
        style={{ backgroundColor: "rgba(0, 0, 0, 0.2)" }}
      >
        © 2023 Pet Pawrents. All Rights Reserved.
      </div>
    </footer>
  );
};
export default Footer;
