import React from "react";

const DonationPage = () => {
  // const [amount, setAmount] = useState(100);

  // const handleAmountChange = (event) => {
  //   const newValue = parseInt(event.target.value);
  //   setAmount(newValue);
  // };

  // const handleSliderChange = (event) => {
  //   setAmount(parseInt(event.target.value));
  // };

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="max-w-5xl p-8 h-[80%] border rounded-[30px] flex">
        <div className="w-[80%]  mr-2 bg-white">
          <h1 className="text-4xl font-bold mb-4">DONATE NOW!!!</h1>
          <div className="flex space-x-3">
            <h1 className="text-3xl mb-4"> PETPAWRENTS </h1>
            <p className="mt-2 text-lg">fund collection</p>
          </div>

          <p className="text-lg mb-4 w-[70%]">
            At PetPawrents, we are dedicated to providing love, care, and
            shelter to animals in need. Your generous contribution helps us
            continue our mission and support animals on their journey to finding
            forever homes.
          </p>
          <br />
          <h1>How to donate</h1>
          <p className="text-lg mb-4 w-[70%]">
            To make a donation, Scan the QR code with your smartphone camera to
            access our donation page instantly. Your support is greatly
            appreciated!
          </p>
          {/* <img
            src="images/donate.jpg"
            alt=""
            className="w-full rounded-[30px]"
          /> */}
        </div>
        <div className="w-[30%] ml-20">
          <img
            src="images/esewa.png"
            alt="esewa"
            className="w-[80%] ml-7"
          ></img>
          <img src="images/qr.jpg" alt="QR Code" className="w-full h-auto" />
          <p className="text-center text-2xl">SCAN HERE</p>
        </div>
      </div>
    </div>
  );
};

export default DonationPage;
