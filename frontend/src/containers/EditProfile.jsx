import React from 'react';

const UserProfile = () => {

    return (
        <div className="flex justify-center items-center h-screen bg-gray-100">
            <div className="bg-white p-8 rounded-lg shadow-md flex flex-col">
                {/* First div containing buttons */}
                <div className="flex flex-col mb-6">
                    <button className="bg-blue-500 text-white px-4 py-2 rounded-md mb-2">Button 1</button>
                    <button className="bg-blue-500 text-white px-4 py-2 rounded-md mb-2">Button 2</button>
                    <button className="bg-blue-500 text-white px-4 py-2 rounded-md mb-2">Button 3</button>
                </div>

                {/* Second div containing profile picture */}
                <div className="flex justify-center mb-6">
                    <img src="profile-pic.jpg" alt="Profile" className="w-24 h-24 rounded-full" />
                </div>

                {/* Third div containing user details */}
                <div className="flex flex-col items-center mb-6">
                    <h2 className="text-xl font-bold mb-2">Username</h2>
                    <p className="text-gray-600">Email: user@example.com</p>
                    <p className="text-gray-600">Location: City, Country</p>
                </div>
                {/* Edit button */}
                <button className="bg-blue-500 text-white px-4 py-2 rounded-md self-end">Edit</button>
            </div>
        </div>
    );
};

export default UserProfile;
