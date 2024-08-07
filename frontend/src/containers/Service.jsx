import React from "react";

const ServicePage = () => {
  return (
    <div className="container mx-auto">
      {/* Grooming Services Section */}
      <div className="flex flex-col md:flex-row space-x-0 md:space-x-20 mt-9 mb-9 px-4 md:px-9">
        <div className="md:w-1/2">
          <h1 className="text-3xl font-bold mb-4">Grooming Services</h1>
          <p className="mb-2 text-xl">
            At Pet Pawrents, we provide grooming services tailored to your pet's
            needs, which not only enhance their appearance but also contribute
            to their overall health and well-being. Regular grooming is
            essential for maintaining a healthy coat, skin, and nails for your
            beloved furry friend.
            <br />
            <br />
            We understand that each pet has unique grooming needs, and our
            experienced groomers ensure that they receive personalized care and
            attention during their grooming session.
          </p>
        </div>

        <div className="md:w-1/2 mt-3 md:mt-0">
          <img
            src="images/service.png"
            alt="Grooming Services"
            className="w-full rounded-[50px] transition-transform duration-300 ease-in-out transform hover:scale-110"
          />
        </div>
      </div>

      {/* Vaccination Services Section */}
      <div className="flex flex-col md:flex-row space-x-0 md:space-x-20 mt-14 mb-9 px-4 md:px-9">
        <div className="md:w-1/2 px-9 ml-9">
          <img
            src="images/service-2.png"
            alt="Boarding Services"
            className="w-[350px] rounded-[50px] transition-transform duration-300 ease-in-out transform hover:scale-110"
          />
        </div>
        <div className="md:w-1/2">
          <h1 className="text-3xl font-bold mb-4">Vaccination</h1>
          <p className="mb-2 text-xl">
            Vaccination is vital for pets as it guards them against various
            diseases. By triggering the immune system to produce antibodies,
            vaccines provide active protection, reducing the risk of illness and
            preventing the spread of contagious diseases. This not only keeps
            individual pets healthy but also safeguards public health by
            preventing the transmission of diseases from animals to humans.
            <br />
            <br />
            At Pet Pawrents, we offer essential pet vaccination services to
            protect your furry companions from a range of diseases. Our
            vaccinations are tailored to your pet's needs, ensuring they stay
            healthy and happy. Trust us to provide the vital protection your pet
            deserves against preventable illnesses.
          </p>
        </div>
      </div>

      {/* Additional Sections */}
      <div className="flex flex-col md:flex-row space-x-0 md:space-x-20 mt-9 mb-9 px-4 md:px-9">
        <div className="md:w-1/2">
          <h1 className="text-3xl font-bold mb-4">Pet Products</h1>
          <p className="mb-2 text-xl">
            we offer a wide range of top-quality pet products and services to
            cater to every aspect of your pet's life. From luxurious cosmetics
            to keep your pets looking and feeling their best, to a delightful
            selection of toys to keep them entertained and engaged, we have it
            all.
            <br />
            <br />
            Our shelves are stocked with premium pet foods, ensuring your furry
            companions receive the nutrition they deserve. Additionally, we
            pride ourselves on our stylish collection of pet clothes, because we
            believe your pets deserve to flaunt their personalities with flair!
            At Pet Pawrents, we understand that pets are more than just
            animals—they're cherished family members. Join our community of pet
            lovers and let Pet Pawrents be your partner in creating a vibrant
            and joyful life for your furry companions.
          </p>
        </div>
        <div className="md:w-1/2 mt-3 md:mt-0">
          <img
            src="images/skate.png"
            alt="Boarding Services"
            className="w-[400px] rounded-[50px] ml-11 transition-transform duration-300 ease-in-out transform hover:scale-110"
          />
        </div>
      </div>

      <div className="flex flex-col md:flex-row space-x-0 md:space-x-20 mt-14 mb-9 px-4 md:px-9">
        <div className="md:w-1/2 px-9 ml-9">
          <img
            src="images/vet.png"
            alt="Boarding Services"
            className="w-[400px] rounded-[50px] transition-transform duration-300 ease-in-out transform hover:scale-110"
          />
        </div>
        <div className="md:w-1/2">
          <h1 className="text-3xl font-bold mb-4">Veterinary</h1>
          <p className="mb-2 text-xl">
            At Pet Pawrents, we are proud to have a team of specialized
            veterinary professionals dedicated to providing exemplary care for
            your furry companions. Our skilled veterinarians possess expertise
            in a range of specialties, ensuring that your pets receive the
            highest level of medical attention and treatment.
            <br />
            <br />
            Whether it's routine check-ups, surgical procedures, or advanced
            diagnostics, our veterinary professionals at Pet Pawrents are here
            to offer personalized care tailored to your pet's specific needs.
            Rest assured, your pet's health and well-being are in capable hands
            with our specialized team at Pet Pawrents.
          </p>
        </div>
      </div>
    </div>
  );
};

export default ServicePage;
