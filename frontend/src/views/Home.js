import React from 'react';


const Home = () => {
  return (
    <div className="bg-white min-h-screen">
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
      <div className='container mx-auto text-start mb-5'>
        <div className='bg-slate-500 py-8 flex-row px-20 rounded'>
          <div className="w-[100%] md:grid md:grid-cols-2 lg:grid-cols-2 gap-20 px-20 ">

            <div className="w-[100%] max-w-md mx-auto sm:mx-0 mb-8 sm:mb-0 ">
              <h1>01. Schedule Grooming</h1>      
              <p>Our web app allows you to easily schedule grooming appointments for your pets. Simply choose a date and time that works best for you, and our professional groomers will take care of the rest.</p>
              <br/>
            
              <h1>02. Online Payment Options</h1> 
              <p>Our web app provides secure online payment options, allowing you to conveniently pay for grooming services right from your device. Say goodbye to carrying cash or worrying about payment methods.</p>
              <br/>
            
              <h1>03. Real-Time Updates</h1> 
              <p>Stay informed about your pet's grooming session with real-time updates. Our web app sends you notifications regarding your pet's progress, ensuring transparency and peace of mind.</p>
            </div>
          
            <div className="w-[100%] max-w-md mx-auto sm:mx-0 lg:grid-cols-6 sm:mt-5">
              <img src="/images/calender.png" alt="" className="mx-auto" />
            </div>

          </div>
        </div>
      </div>


    </div>
  );
};

export default Home;



