import React, { useState } from 'react';


function BookAppointment() {
    const [formData, setFormData] = useState({
        fullName: '',
        phoneNumber: '',
        petType: 'dog',
        services: [],
        date: '',
        time: '',
      });
    
      const handleChange = (event) => {
        const { name, value, type } = event.target;
        setFormData((prevData) => ({
          ...prevData,
          [name]: type === 'checkbox' ? event.target.checked : value,
        }));
      };

      const handleSubmit = (event) => {
        event.preventDefault();
        // Handle form submission logic (e.g., send data to server)
        console.log('Form submitted:', formData);
      };
    
    
return(
    <div className='h-sreen bg-Black w-full'>
        <div className='container mx-auto mt-9 mb-9 h-[35rem]'>
            <div className='mx-9 bg-white text-center outline rounded h-[100%]'>
                <h1 className='mb-16 text-4xl' >Book Appointment</h1>
                <form onSubmit={handleSubmit} className="max-w-full px-32 mt-8 flex justify-between">
                    {/* First Column (Text Fields) */}
                    <div className="mb-6 ">
                        <div>
                            <input
                                type="text"
                                id="first_name"
                                name="first_name"
                                value={formData.first_name}
                                onChange={handleChange}
                                className="mt-1 p-2 block w-full text-2xl rounded-md bg-gray-100 border-transparent focus:border-gray-500 focus:bg-white focus:ring-0"
                                placeholder="Enter First Name"
                            />
                        </div>
                        {/* Add more input fields as needed */}

                        {/* Second Column (Select Options) */}
                        <div className='mt-16'>
                            <select
                                id="skin_type"
                                name="skin_type"
                                value={formData.skin_type}
                                onChange={handleChange}
                                className="mt-1 p-2 block w-full  text-2xl rounded-md bg-gray-100 border-transparent focus:border-gray-500 focus:bg-white focus:ring-0"
                            >
                                <option value="vaccination">Vaccination</option>
                                <option value="bathing">Bathing</option>
                                <option value="nail trimming">Nail Trimming</option>
                                <option value="vaccination"></option>



                                {/* Add more options as needed */}
                            </select>
                        </div>
                        {/* Add more select fields as needed */}
                    </div>


                    <div className="mb-6 mr-16">
                        <div>
                            <input
                                type="tel"
                                id="phone_number"
                                name="phone_number"
                                value={formData.first_name}
                                onChange={handleChange}
                                className="mt-1 p-2 block w-full text-2xl rounded-md bg-gray-100 border-transparent focus:border-gray-500 focus:bg-white focus:ring-0"
                                placeholder="555-555-5555"
                            />
                        </div>
                        {/* Add more input fields as needed */}

                        {/* Second Column (Select Options) */}
                        <div className='mt-16'>
                            <select
                                id="skin_type"
                                name="skin_type"
                                value={formData.skin_type}
                                onChange={handleChange}
                                className="mt-1 p-2 block w-full text-2xl rounded-md bg-gray-100 border-transparent focus:border-gray-500 focus:bg-white focus:ring-0"
                            >
                                <option value="">Select Skin Type</option>
                                <option value="dry">Dry</option>
                                {/* Add more options as needed */}
                            </select>
                        </div>
                        {/* Add more select fields as needed */}
                    </div>

                    {/* Pet Type section */}
                    <div className="mb-6 mr-9">
                        <label className="block text-3xl text-gray-700 mb-2" htmlFor="petType">
                        Pet Type
                        </label>
                        <select
                        className="rounded-md relative block w-full px-3 py-2 border border-gray-300 focus:outline-none focus:ring-indigo-500 focus:ring-2"
                        id="petType"
                        name="petType"
                        value={formData.petType}
                        onChange={handleChange}
                        >
                        <option value="dog">Dog</option>
                        <option value="cat">Cat</option>
                        <option value="other">Other</option>
                        </select>
                    </div>

                </form>


                 
               
            </div>
        </div>
    </div>
)

}

export default BookAppointment;