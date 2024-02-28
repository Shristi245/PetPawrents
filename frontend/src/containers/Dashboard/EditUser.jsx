    import React, { useState, useEffect } from 'react';
    import axios from 'axios';
    import { useParams } from 'react-router-dom';

    const EditUser = () => {
        const { userId } = useParams(); // Get userId from URL params
        const [user, setUser] = useState({
            first_name: '',
            last_name: '',
            email: '',
            phone_number: ''
        });

        useEffect(() => {
            const fetchUser = async () => {
                try {
                    const response = await axios.get(`http:/users/${userId}`);
                    setUser(response.data);
                } catch (error) {
                    console.error('Error fetching user:', error);
                }
            };
            fetchUser();
        }, [userId]);

        const handleChange = (e) => {
            const { name, value } = e.target;
            setUser(prevState => ({
                ...prevState,
                [name]: value
            }));
        };

        const handleSubmit = async (e) => {
            e.preventDefault();
            try {
                await axios.put(`http:/users/${userId}`, user);
                // Redirect or display success message
            } catch (error) {
                console.error('Error updating user:', error);
            }
        };

        return (
            <div>
                <h1>Edit User</h1>
                <form onSubmit={handleSubmit}>
                    <div>
                        <label htmlFor="first_name">First Name:</label>
                        <input type="text" id="first_name" name="first_name" value={user.first_name} onChange={handleChange} />
                    </div>
                    <div>
                        <label htmlFor="last_name">Last Name:</label>
                        <input type="text" id="last_name" name="last_name" value={user.last_name} onChange={handleChange} />
                    </div>
                    <div>
                        <label htmlFor="email">Email:</label>
                        <input type="email" id="email" name="email" value={user.email} onChange={handleChange} />
                    </div>
                    <div>
                        <label htmlFor="phone_number">Phone Number:</label>
                        <input type="text" id="phone_number" name="phone_number" value={user.phone_number} onChange={handleChange} />
                    </div>
                    <button type="submit">Save</button>
                </form>
            </div>
        );
    };

    export default EditUser;
