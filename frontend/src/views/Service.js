import React from 'react';

const ServicePage = () => {
  return (
    <div className='container mx-auto'>

      <div className="flex  md:flex-row  md:space-x-20 mt-9 mb-9 px-9  ">
        <div className="md:w-1/2 p-4">
          <h1 className="text-3xl font-bold mb-4 ">Grooming Services</h1>
          <p className="mb-2 text-xl ">
          At Pet Pawrents, we provide grooming services tailored to your pet's needs, which not only enhance their appearance but also contribute to their overall health and well-being. Regular grooming is essential for maintaining a healthy coat, skin, and nails for your beloved furry friend.
          <br/><br/>We understand that each pet has unique grooming needs, and our experienced groomers ensure that they receive personalized care and attention during their grooming session. 
          </p>        
        </div>

        <div className="md:w-1/2 mt-11 w-[100%]">
          <img src="images/service.png" alt="Grooming Services" className=" w-[100%] rounded-[50px] ml-16 transition-transform duration-300 ease-in-out transform hover:scale-110" />
        </div>
      </div>

      <div className="flex flex-col md:flex-row space-x-0 md:space-x-20 mt-32 mb-9 px-9">
        <div className="md:w-1/2 mt-12">
          <img src="images/boarding-image.jpg" alt="Boarding Services" className="w-full rounded-[50px]" />
        </div>
        <div className="md:w-1/2 p-4">
          <h1 className="text-3xl font-bold mb-4">Vaccination</h1>
          <p className="mb-2">
            Boarding Services paragraph 1...
          </p>
          <br/>
          <p>
            Boarding Services paragraph 2...
          </p>
        </div>
      </div>

      <div className="flex  md:flex-row  md:space-x-20 mt-9 mb-9 px-9  ">
        <div className="md:w-1/2 p-4">
          <h1 className="text-3xl font-bold mb-4 ">Grooming Services</h1>
          <p className="mb-2 text-center">
            Pet Pawrents is a professional pet care business with a focus on research that is established in Nepal. At Pet Grooming, we are dedicated to providing pet owners with efficient and convenient grooming services. Our mission is to make the grooming process stress-free for both pets and their owners. With our web app, you can easily schedule appointments, make payments, and stay updated on your pet's grooming progress. Additionally, our donation feature allows you to support a great cause while getting your pet groomed. We believe that every pet deserves love, care, and a fabulous grooming experience. Join us in making a difference in the lives of abandoned and neglected pets.
          </p>
        </div>

        <div className="md:w-1/2 mt-3 w-[50%]">
          <img src="images/service-1.png" alt="Grooming Services" className=" w-[50%] rounded-[50px] ml-16" />
        </div>
      </div>


   

      <div className="flex flex-col md:flex-row space-x-0 md:space-x-20 mt-9 mb-9 px-9">
        <div className="md:w-1/2 mt-14">
          <img src="images/boarding-image.jpg" alt="Boarding Services" className="w-full rounded-[50px]" />
        </div>
        <div className="md:w-1/2 p-4">
          <h1 className="text-3xl font-bold mb-4">Pet Products</h1>
          <p className="mb-2">
            Boarding Services paragraph 1...
          </p>
          <br/>
          <p>
            Boarding Services paragraph 2...
          </p>
        </div>
      </div>

      {/* Add more sections in a similar manner for other services */}
    </div>
  );
}

export default ServicePage;
