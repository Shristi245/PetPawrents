    import axios from 'axios';
    import React, { useState, useEffect } from 'react';
    import { Redirect } from 'react-router-dom'; 
    const UserProfile = ({ user }) => {
    const [profile, setProfile] = useState(null);

    useEffect(() => {
        const fetchProfile = async () => {
        try {
            const response = await axios.get(`/api/profiles/${user.id}/`);
            setProfile(response.data);
        } catch (error) {
            console.error('Error fetching profile:', error);
        }
        };

        if (user && user.id) {
        fetchProfile();
        }
    }, [user]);

    if (!user) {
        // Redirect to login page if user is not authenticated
        return <Redirect to="/login" />;
    }


        
    return (
        <div className="flex  h-screen bg-gray-100">
        <div className="bg-white p-8 mt-9 w-full justify-between rounded-lg shadow-md flex">
            {/* First div containing buttons */}
            <div className="flex flex-col mb-6 ml-20">
            <button className="bg-blue-500 text-white bg-[#1E5547] hover:bg-[#1ED1B1] text-3xl px-4 py-2 rounded-[20px] mb-16">Profile</button>
            <button className="bg-blue-500 text-white bg-[#1E5547] hover:bg-[#1ED1B1] text-3xl px-9 py-2 rounded-[20px] mb-16">Edit Profile</button>
            <button className="bg-blue-500 text-white bg-[#1E5547] hover:bg-[#1ED1B1] text-3xl px-4 py-2 rounded-[20px] mb-16">View Orders</button>
            </div>
            {/* Second div containing profile picture */}
            <div className=" justify-center mb-6">
                {profile && (
                    <>
                    <img src={profile.image} alt="Profile" className="w-[100%] h-[30%] bg-gray-300 rounded-full" /> <br/>
                    <p className="text-xl font-bold">{profile.full_name}</p>
                    </>
                )}
            </div>
            {/* Third div containing user details */}
            {/* Third div containing user details */}
            <div className="flex flex-col items-center mb-6">
                {user && user.email && (
                    <p className="text-gray-600">Email: {user.email}</p>
                )}
                {user && user.phoneNumber && (
                    <p className="text-gray-600">Phone Number: {user.phoneNumber}</p>
                )}
                {/* Add more details as needed */}
            </div>
            {/* Edit button */}
            <button className="bg-blue-500 text-white px-4 py-2 rounded-md self-end">Edit</button>
        </div>
        </div>
    );
    };

    export default UserProfile;
