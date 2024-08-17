import React, { useState } from 'react';
import Button from '../Components/Button';
import { useNavigate } from 'react-router-dom';

const SignUp = () => {
    const navigate = useNavigate();
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [passwordError, setPasswordError] = useState('');

    // Function to validate password
    const validatePassword = (password) => {
        const minLength = 8;
        const hasUppercase = /[A-Z]/.test(password);
        const hasLowercase = /[a-z]/.test(password);
        const hasNumber = /\d/.test(password);
        const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);

        if (password.length < minLength) {
            return 'Password must be at least 8 characters long';
        }
        if (!hasUppercase) {
            return 'Password must contain at least one uppercase letter';
        }
        if (!hasLowercase) {
            return 'Password must contain at least one lowercase letter';
        }
        if (!hasNumber) {
            return 'Password must contain at least one number';
        }
        if (!hasSpecialChar) {
            return 'Password must contain at least one special character';
        }
        return '';
    };

    const handleSignUp = async (e) => {
        e.preventDefault();

        // Basic client-side validation
        if (!name || !email || !password) {
            setError('All fields are required');
            return;
        }

        // Validate password
        const passwordValidationError = validatePassword(password);
        if (passwordValidationError) {
            setPasswordError(passwordValidationError);
            return;
        }

        try {
            const response = await fetch('http://localhost:3030/api/users/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    name,
                    email,
                    password,
                }),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || 'Something went wrong');
            }

            // Handle successful registration
            console.log(data.message);
            if (response.ok) {
                localStorage.setItem('user', JSON.stringify(data.user.email)); // Store user data in local storage
                // console.log(data.user.email);
                navigate('/myevents');
            }

        }
        catch (error) {
            // Handle errors
            setError(error.message);
        }
    };

    return (
        <div className="min-h-screen flex flex-col sm:flex-row items-center justify-center px-4 sm:px-6 lg:px-8">
            <div className="bg-white bg-opacity-10 backdrop-blur-lg flex flex-col md:flex-row rounded-3xl overflow-hidden max-w-6xl w-full mx-auto shadow-xl">

                {/* Left side */}
                <div className="ml-12 hidden md:flex flex-col items-center justify-center text-white p-12 md:w-1/2 lg:w-2/5">
                    <h2 className="text-3xl md:text-5xl font-extrabold mb-6">TicketVista</h2>
                    <p className="text-lg md:text-xl mb-4">Welcome!</p>
                    <p className="text-base md:text-lg mt-2">Join us today.</p>
                    <div className="mt-10 flex flex-col justify-center">
                        <p className="text-base md:text-lg mb-4">Already have an account?</p>
                        <Button
                            text="Sign In"
                            className="py-2 px-4 text-base md:text-lg font-semibold"
                            onClick={() => navigate('/login')}
                        />
                    </div>
                </div>

                {/* Right side */}
                <div className="flex flex-col justify-center w-full md:w-1/2 lg:w-3/5 p-12">
                    {/* Moved Sign In section to be visible on small screens */}
                    <div className="block md:hidden mb-6 text-center">
                        <p className="text-base md:text-lg mb-4">Already have an account?</p>
                        <Button
                            text="Sign In"
                            className="py-2 px-4 text-base md:text-lg font-semibold"
                            onClick={() => navigate('/login')}
                        />
                    </div>
                    <h2 className="text-2xl md:text-3xl font-bold text-white text-center mb-8">Create Account</h2>
                    <form className="space-y-6" onSubmit={handleSignUp}>
                        <div>
                            <label className="block text-sm md:text-md text-white mb-2">Full Name</label>
                            <input
                                type="text"
                                placeholder="Your Name"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                className="w-full p-4 border border-gray-300 rounded-lg text-black focus:outline-none focus:ring-2 focus:ring-purple-500"
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-sm md:text-md text-white mb-2">Email</label>
                            <input
                                type="email"
                                placeholder="yourname@example.com"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-full p-4 border border-gray-300 rounded-lg text-black focus:outline-none focus:ring-2 focus:ring-purple-500"
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-sm md:text-md text-white mb-2">Password</label>
                            <input
                                type="password"
                                placeholder="Password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full p-4 border border-gray-300 rounded-lg text-black focus:outline-none focus:ring-2 focus:ring-purple-500"
                                required
                            />
                            {passwordError && <p className="text-red-500 mt-2">{passwordError}</p>}
                        </div>
                        {error && <p className="text-red-500">{error}</p>}
                        <Button text="Sign Up" className="w-full py-3 text-lg font-semibold" />
                    </form>
                </div>
            </div>
        </div>
    );
};

export default SignUp;
