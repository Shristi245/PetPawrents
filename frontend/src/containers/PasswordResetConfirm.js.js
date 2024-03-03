import React, { useState } from 'react';
import { useParams } from 'react-router-dom'; // Assuming you're using React Router for navigation

function PasswordResetConfirm() {
    const { uid, token } = useParams(); // Get uid and token from the URL params
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (newPassword !== confirmPassword) {
            setError('Passwords do not match');
            return;
        }

        try {
            // Send a request to your backend to confirm the password reset
            const response = await fetch('http://127.0.0.1:8000/password-reset/confirm/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    uid,
                    token,
                    new_password: newPassword,
                }),
            });

            if (response.ok) {
                // Password reset successful, redirect the user or show a success message
            } else {
                const data = await response.json();
                setError(data.detail || 'An error occurred');
            }
        } catch (error) {
            setError('An error occurred');
        }
    };

    return (
        <div>
            <h1>Reset Your Password</h1>
            <form onSubmit={handleSubmit}>
                <input
                    type="password"
                    placeholder="New Password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    required
                />
                <input
                    type="password"
                    placeholder="Confirm Password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                />
                {error && <p>{error}</p>}
                <button type="submit">Reset Password</button>
            </form>
        </div>
    );
}

export default PasswordResetConfirm;
