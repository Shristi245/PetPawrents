import React from 'react';


const Home = () => {
  return (
    <div className="bg-gray-100 min-h-screen">
      {/* Header Section */}
      <header className="bg-amber-400 text-white text-center py-16">
        <div className="container mx-auto">
          <h1 className="text-4xl font-bold mb-4">Welcome to Pet Grooming App</h1>
          <p className="text-lg">Your one-stop destination for pet care and grooming services.</p>
        </div>
      </header>

      {/* Features1 Section */}
      <section className="py-16">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl font-bold mb-8">Key Features</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="p-6 bg-white rounded-lg shadow-lg">
              <h3 className="text-xl font-bold mb-2">Grooming Services</h3>
              <p>Explore a variety of grooming services for your beloved pets.</p>
            </div>

            {/* Feature 2 */}
            <div className="p-6 bg-white rounded-lg shadow-lg">
              <h3 className="text-xl font-bold mb-2">Appointment Scheduling</h3>
              <p>Easily schedule grooming appointments and manage your pet's care.</p>
            </div>

            {/* Feature 3 */}
            <div className="p-6 bg-white rounded-lg shadow-lg">
              <h3 className="text-xl font-bold mb-2">Health Tracking</h3>
              <p>Keep track of your pet's health with reminders for vaccinations and checkups.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Call-to-Action Section */}
      <section className="bg-gray-800 text-white py-16">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">Get Started Today</h2>
          <p className="text-lg mb-8">Join our community of pet lovers and provide the best care for your furry friends.</p>
          <button className="bg-blue-500 text-white py-2 px-6 rounded-full">Sign Up</button>
        </div>
      </section>
    </div>
  );
};

export default Home;


