import React from 'react';

const AboutPage = () => {
  return (
    <div className=''>
        <div className="flex flex-col md:flex-row space-x-20 mt-9 mb-9 px-9">
            <div className="md:w-1/2 p-4 ml-16">
                <h1 className="text-3xl font-bold mb-4">About Us</h1>
                <p className="mb-2 text-[#673405]">
                    Pet Pawrents is a professional pet care business with a focus on research that is established in Nepal. At Pet Grooming, we are dedicated to providing pet owners with efficient and convenient grooming services. Our mission is to make the grooming process stress-free for both pets and their owners. With our web app, you can easily schedule appointments, make payments, and stay updated on your pet's grooming progress. Additionally, our donation feature allows you to support a great cause while getting your pet groomed. We believe that every pet deserves love, care, and a fabulous grooming experience. Join us in making a difference in the lives of abandoned and neglected pets.
                </p>
                <br/> 
                <p className='text-[#673405]'>
                    Pet Pawrents is a kind and considerate pet care business that offers pet owners in Nepal top-notch products and instruction. Our goal is to provide your pets with the best treatment possible and to provide you, the pet parent, with the tools you need to maintain the health and happiness of your furry friend. We provide a broad range of services, each specifically designed to address the individual requirements of your pet. Our services are made to make sure your pet gets the care and attention they need while also giving them a fun and safe experience.
                </p>
            </div>
            <div className="md:w-1/2 mt-14">
                <img src="images/about-image.jpg" alt="About Us" className="w-[70%] ml-20 rounded-[50px]" />
            </div>
        </div>

        <div className='container mx-auto px-32' >
            <div className="mt-12 mb-9 bg-[#FEC200] rounded py-1">
                <p className="text-lg  text-black text-center">We hope you find pet pawrents as interesting as we want it to be. Please feel free to reach out to us for any queries or suggestions.</p>   
            </div>
        </div>

    </div>

    
  );
};

export default AboutPage;
