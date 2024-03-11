/* global KhaltiCheckout */
import React, { useState } from "react";

const DonationPage = () => {
  const [amount, setAmount] = useState(100);

  const handleAmountChange = (event) => {
    const newValue = parseInt(event.target.value);
    setAmount(newValue);
  };

  const handleSliderChange = (event) => {
    setAmount(parseInt(event.target.value));
  };

  const handleDonate = () => {
    const config = {
      // Replace publicKey with your Khalti public key
      public_key: "your_khalti_public_key",
      product_identity: "donation",
      product_name: "Donation",
      amount: amount * 100, // Amount should be in paisa
    };

    const khaltiCheckout = new KhaltiCheckout(config);
    khaltiCheckout.show({ popup: true });
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen ">
      <div className=" bg-[#A5DD9B] px-9 py-9  rounded-[20px]  sm:w-[20%] lg:w-[40%] shadow transition ease-in-out delay-150 bg-blue-500 hover:-translate-y-1 hover:scale-110  duration-300">
        <h1 className="text-3xl font-bold text-center ">Donate Now</h1>
        <h2 className="text-xl mb-9 text-center">Choose A Donation Amount</h2>
        <div className="flex flex-col items-center space-y-4">
          <input
            type="number"
            min="0"
            placeholder="Enter amount"
            className="border border-gray-400 rounded-lg px-4 py-2 w-64"
            value={amount}
            onChange={handleAmountChange}
          />
          <input
            type="range"
            min="0"
            max="10000" // Adjust max value as needed
            step="100" // Increment by 100 Rs
            value={amount}
            onChange={handleSliderChange}
            className="w-64"
          />

          <button
            className="bg-white hover:bg-amber-400 text-black font-bold py-2 px-4 rounded flex text-xl"
            onClick={handleDonate}
          >
            Donate with{" "}
            <img
              src="images/khalti.png"
              alt="Khalti Logo"
              className="w-13 h-6 mr-2"
            />
          </button>

          <div>
            <img src="images/ref.png" alt="" className="rounded-[20px]" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default DonationPage;
