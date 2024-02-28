import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';


const UserList = () => {
    const [users, setUsers] = useState([]);
    const [showDropdown, setShowDropdown] = useState(false);


    const toggleDropdown = () => {
      setShowDropdown(!showDropdown);
    };

    useEffect(() => {        
        const fetchUsers = async () => {
            try {
                const response = await axios.get('http://127.0.0.1:8000/users/');
                setUsers(response.data);
            } catch (error) {
                console.error('Error fetching users:', error);
            }
        };
            fetchUsers();
    }, []);

// Function to handle edit action

    // Function to handle delete action
    const handleDelete = async (userId) => {
        console.log("Delete user with ID:", userId);
        try {
            // Send delete request to backend API
            await axios.delete(`http://127.0.0.1:8000/users/${userId}`);
            // Update users state to reflect deletion
            setUsers(users.filter(user => user.id !== userId));
            // Show success message
            console.log('User deleted successfully.');
        } catch (error) {
            console.error('Error deleting user:', error);
            // Add error handling logic here
            let errorMessage = 'Failed to delete user. Please try again.';
            // Check if specific error message can be provided based on error status
            if (error.response && error.response.status === 404) {
                errorMessage = 'User not found.';
            }
            // Display error message to user
            alert(errorMessage);
        }
    };

    return (
        <div className="flex h-screen mb-32">
            {/* Side Menu */}
            <div className="bg-[#56A6B8] text-white w-70 flex flex-col rounded-[30px] mt-16">
                {/* Sidebar Header */}
                <div className="mt-5 p-5  justify-center">
                    {/* Profile Picture */}
                    <img
                        className="w-16 h-16 rounded-full object-cover justify-center ml-20"
                        src="images/1.jpg"
                        alt="Profile"
                    />
                    {/* Profile Information */}
                    <div className="text-center mt-2">
                        <h2 className="text-lg font-semibold">Admin</h2>
                        <p className="text-sm">admin@example.com</p>
                    </div>
                </div>

                {/* Sidebar Menu */}
                <nav className=" ">
                    <ul className="space-y-2 mt-6 px-9">
                        <div className=" flex "> 
                            <img src="images/1.jpg" alt="" className="h-9 w-9"/>
                            <li className="px-4 py-2 text-[18px] hover:text-gray-600 flex ">
                            Dashboard
                            </li>
                        </div>

                        <div className=" flex "> 
                            <img src="images/1.jpg" alt="" className="h-9 w-9"/>
                            <li className="px-4 py-2 text-[18px] hover:text-gray-600 flex ">
                                <a href="/admin-dashboard-users" alt="" className="w-full"></a>Users
                            </li>
                        </div>

                        <div className=" flex "> 
                            <img src="images/1.jpg" alt="" className="h-9 w-9"/>
                            <li className="px-4 py-2 text-[18px] hover:text-gray-600 flex ">
                            Appointment
                            </li>
                        </div>

                        <div className=" flex "> 
                            <img src="images/1.jpg" alt="" className="h-9 w-9"/>
                            <li className="px-4 py-2 text-[18px] hover:text-gray-600 flex ">
                            Products
                            </li>
                        </div>

                        <div className=" flex "> 
                            <img src="images/1.jpg" alt="" className="h-9 w-9"/>
                            <li className="px-4 py-2 text-[18px] hover:text-gray-600 flex ">
                            Adoption Details
                            </li>
                        </div>
                    
                    </ul>
                </nav>
           
            </div>
            {/* Main Content */}
            <div className="flex-1  px-9">
                <div className="p-4 flex items-center justify-between">
                    {/* Search Bar */}
                    <div className="relative  ">
                        <input
                        type="text"
                        className=" text-black text-xl px-3 py-1 rounded-full focus:outline-none"
                        placeholder="Type to search..."
                        />
                        <button className="absolute right-0 top-0 mt-1 mr-2">
                        <svg
                            className="h-6 w-6 text-black fill-current"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                        >
                            <path
                            d="M19.71 18.29l-5.47-5.47A5.93 5.93 0 0 0 14 10c0-3.31-2.69-6-6-6S2 6.69 2 10s2.69 6 6 6c1.3 0 2.49-.41 3.47-1.11l5.47 5.47c.39.39 1.02.39 1.41 0 .38-.39.39-1.02 0-1.41zM4 10c0-2.21 1.79-4 4-4s4 1.79 4 4-1.79 4-4 4-4-1.79-4-4z"
                            />
                        </svg>
                        </button>
                    </div>
                
                    {/* User Profile */}
                    <div className="flex items-center">
                        <div className="relative">
                            <button className="text-white hover:text-amber-400 focus:outline-none" onClick={toggleDropdown}>
                                <img
                                className="w-12 h-12 rounded-full object-cover"
                                src="https://via.placeholder.com/150"
                                alt="Profile"
                                />
                            </button>
                            {showDropdown && (
                                <div className="absolute top-0 right-0 mt-10 bg-gray-700 text-white py-2 px-4 rounded-lg shadow-lg">
                                <button className="block w-full text-left hover:bg-gray-600 py-1" onClick={() => console.log("Account settings clicked")}>Account Settings</button>
                                <button className="block w-full text-left hover:bg-gray-600 py-1" onClick={() => console.log("Logout clicked")}>Logout</button>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
                

                  {/* Your main content goes here */}
                <h1 className="text-4xl ml-3">Users</h1>
                <div className="bg-amber-400  py-5">
                    <div className="overflow-x-auto">
                        <table className="table-auto w-full">
                            <thead>
                                <tr>
                                    <th className="px-4 py-2">SN</th>
                                    <th className="px-4 py-2">First Name</th>
                                    <th className="px-4 py-2">Last Name</th>
                                    <th className="px-4 py-2">Email</th>
                                    <th className="px-4 py-2">Phone Number</th>
                                    <th className="px-4 py-2">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {users.map((user, index) => (
                                    <tr key={user.id} className="text-left">
                                        <td className="px-4 py-2">{index + 1}</td>
                                        <td className="px-4 py-2">{user.first_name}</td>
                                        <td className="px-4 py-2">{user.last_name}</td>
                                        <td className="px-4 py-2">{user.email}</td>
                                        <td className="px-4 py-2">{user.phone_number}</td>
                                        <td className="px-4 py-2">
                                            <Link to={`/admin-dashboard-edituser/${user.id}`} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2">Edit</Link>
                                            <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded" onClick={() => handleDelete(user.id)}>Delete</button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>         
        </div>
    );
};

export default UserList;
