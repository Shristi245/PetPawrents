import React, { useState } from 'react';

const Home = () => {
  const [expandedService, setExpandedService] = useState(null);

   // Define the services array here
  const services = [
    {
      name: 'Pet Grooming',
      image: '/images/scissor.png',
      shortDescription: 'Our expert groomers use premium equipment to provide grooming services for your pet, ensuring they look and feel their best.',
      fullDescription: 'Our pet vaccination service offers essential vaccinations for your pets health and happiness, administered by our experienced team in a safe and comfortable environment.'
    },
    {
      name: 'Vaccination',
      image: '/images/vaccination.png',
      shortDescription: 'Our pet vaccination service offers essential vaccinations for your pets health and happiness, administered by our experienced team in a safe and comfortable environment. ',
      fullDescription: 'Full description for vaccination service.'
    },

    {
      name: 'Food',
      image: '/images/food.png',
      shortDescription: 'Short description for vaccination service.',
      fullDescription: 'Full description for vaccination service.'
    },

    {
      name: 'Veterinary',
      image: '/images/veterinary.png',
      shortDescription: 'Short description for vaccination service.',
      fullDescription: 'Full description for vaccination service.'
    },

    // Add more service objects as needed
  ];

  const handleToggleDescription = (serviceName) => {
    if (expandedService === serviceName) {
      // If the same service is clicked again, collapse its description
      setExpandedService(null);
    } else {
      // Otherwise, expand the clicked service's description
      setExpandedService(serviceName);
    }
  };

  return (
    <div className="bg-white min-h-screen">
      {/* Background Image */}
      <div className="relative h-screen">
        <div className="absolute inset-0 bg-cover" style={{ backgroundImage: "url('images/bg-home.png')" }}>
          {/* Content */}
          <div className="text-white text-start md:py-16 md:ml-44 lg:w-2/5 xl:w-2/5">
            <h2 className="lg:text-7xl md:text-5xl text-black mb-4">Your Pet is Part of our Family</h2>
            <p className="lg:text-2xl md:text-xl">Let us treat your pet like our family with the best service, care, and hospitality.</p>
            <br /><br />
            <button className="bg-[#417EC5] text-white text-xl py-2 px-4 md:py-3 md:px-6 rounded-[24px] mt-4 md:mt-8 hover:bg-[#673405]  animate-bounce">Book a Schedule</button>
          </div>

          {/* Buttons at the bottom-middle */}
          <div className="absolute bottom-0 left-0 right-0 flex flex-col md:flex-row justify-center items-center mb-8 p-9 md:space-x-14 md:ml-56">
            <button className="bg-[#417EC5] text-[#FDF99B] text-xl py-2 px-4 md:py-3 md:px-6 rounded-[24px] mb-4 md:mb-0 md:ml-0 hover:bg-[#673405] hover:text-white transition-transform duration-200 ease-in-out transform hover:scale-90">Learn More</button>
            <button className="bg-[#417EC5] text-[#FDF99B] text-xl py-2 px-4 md:py-3 md:px-9 rounded-[24px] hover:bg-[#673405] hover:text-white transition-transform duration-200 ease-in-out transform hover:scale-90">Adopt</button>
          </div>
        </div>
      </div>

      {/* Services Section */}
      <section className="py-16">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl font-bold mb-5">Our Services</h2>
          <p>“Comprehensive Pet Care: Our Dedication to Your Pets' Well-Being”</p>
          <br /><br />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12">
            {/* Service Cards */}
            {services.map((service, index) => (
              <div key={index} className="p-6 bg-white rounded-[39px] shadow-lg flex flex-col items-center">
                <img src={service.image} alt={service.name} className="mb-4" />
                <h3 className="text-xl font-bold mb-2">{service.name}</h3>
                <p className="mb-4 ">{expandedService === service.name ? service.fullDescription : service.shortDescription}</p>
                <button className="text-[#FEC200] mr-32" onClick={() => handleToggleDescription(service.name)}>
                  {expandedService === service.name ? 'Read Less...' : 'Read More...'}
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Call-to-Action Section */}
      <div className='px-12 mx-auto mb-5'>
        <div className=' py-2 flex-row bg-[#56A6B8] rounded-[50px] justify-between'>
          <div className="md:grid md:grid-cols-2 lg:grid-cols-2 gap-2 px-16 mb-9 ">
            <div className="w-[100%] max-w sm:mx-0 sm:mb-0 pt-20 ">
              <h1 className='text-[#673405]'>01. Schedule Grooming</h1>
              <br />
              <p className='text-xl text-[#EFF4F6]'>Our web app allows you to easily schedule grooming appointments for your pets. Simply choose a date and time that works best for you, and our professional groomers will take care of the rest.</p>
              <br />
              <h1 className='text-[#673405]'>02. Online Payment Options</h1>
              <br />
              <p className='text-xl text-[#EFF4F6]'>Our web app provides secure online payment options, allowing you to conveniently pay for grooming services right from your device. Say goodbye to carrying cash or worrying about payment methods.</p>
              <br />
              <h1 className='text-[#673405]'>03. Real-Time Updates</h1>
              <br />
              <p className='text-xl text-[#EFF4F6]'>Stay informed about your pet's grooming session with real-time updates. Our web app sends you notifications regarding your pet's progress, ensuring transparency and peace of mind.</p>
            </div>
            <div className="sm:mx-0 sm:mt-3 pt-9 px-9">
              <img src="/images/calender.png" alt="" className="rounded-[10px]  " />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
