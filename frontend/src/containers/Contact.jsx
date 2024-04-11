import React, { useState } from "react";

const ContactPage = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  // const [error, setError] = useState("");

  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   // Add validation for name, email, and message
  //   if (!name || !email || !message) {
  //     setError("Please fill in all fields.");
  //     return;
  //   }
  //   // Logic to send message
  //   console.log("Sending message...");
  //   // Reset form fields after submission
  //   setName("");
  //   setEmail("");
  //   setMessage("");
  // };

  return (
    <div className="container mx-auto p-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-5 mt-9">
          <h2 className="text-3xl text-[#1A8990]">Pet Pawrents</h2>
          <h2 className="text-5xl mb-4">Fill the form.</h2>
          {/* {error && <p className="text-red-500 mb-4">{error}</p>} */}
          <form action="https://formspree.io/f/mleqpkyy" method="post">
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="name"
              >
                Full Name
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="name"
                type="text"
                name="name"
                placeholder="Enter your name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="email"
              >
                Email Address
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="email"
                name="email"
                type="email"
                placeholder="Enter your email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="mb-6">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="message"
              >
                Message
              </label>
              <textarea
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="message"
                name="message"
                placeholder="Enter your message"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                required
              />
            </div>
            <div className="flex items-center justify-center">
              <button
                className="bg-blue hover:bg-blue-700 text-black hover:text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                type="submit"
              >
                Send Message
              </button>
            </div>

            <div className="mt-9 space-y-2">
              <p className="text-lg underline">Time</p>
              <p>Monday - Sunday (11:00 AM-6:OO PM)</p>
              <p>Saturday (CLOSED)</p>
            </div>
          </form>
        </div>
        <div>
          <div className=" p-11 rounded-[56px] bg-[#56A6B8] px-20">
            <h2 className="text-2xl text-[#FEC200] mb-4">Contact Us!</h2>
            <h2 className="text-2xl font-bold poppins-font mb-4">
              Pet Pawrents
            </h2>
            <p className="text-lg mb-8 flex space-x-6">
              <img src="images/location.png" alt="location"></img>
              <span>Kupondole, Lalitpur</span>
            </p>
            <p className="text-lg mb-8 flex space-x-5">
              <img className="h-5 mt-1" src="images/mail.png" alt="" />
              <span>Email: PetPawrents@gmail.com</span>
            </p>
            <p className="text-lg flex space-x-5">
              <img src="images/phone.png" alt="" />
              <span>Phone: 9840033624</span>
            </p>
          </div>
          <div className="mt-4 ml-5">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1909.2965882098185!2d85.31706777929193!3d27.686431162320723!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39eb19b4f2a244c3%3A0xb0fd31056d635952!2sJALABINAYAK%20MOBILE%20ANIMAL%20CLINIC!5e0!3m2!1sen!2snp!4v1711971905008!5m2!1sen!2snp"
              width="600"
              height="450"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Google Maps Embedded View"
            ></iframe>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
