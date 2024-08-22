import React, { useState } from 'react';
import Button from '../Components/Button';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleLogin = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch('https://ticketvista-backend.onrender.com/api/users/login', { // Changed to /login
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || 'Something went wrong');
            }

            console.log(data.message);
            if (response.ok) {
                localStorage.setItem('user', JSON.stringify(data.user.email)); // Store user data in local storage
                // console.log(data.user.email);
                navigate('/myevents');
            }

        } catch (error) {
            // Handle errors
            setError(error.message);
        }
    };

    return (
        <div className="min-h-screen flex flex-col sm:flex-row items-center justify-center px-4 sm:px-6 lg:px-8 ">
            <div className="bg-white bg-opacity-10 backdrop-blur-lg flex flex-col md:flex-row rounded-3xl overflow-hidden max-w-6xl w-full mx-auto shadow-xl">

                {/* Left side */}
                <div className="ml-12 hidden md:flex flex-col items-center justify-center text-white p-12 md:w-1/2 lg:w-2/5">
                    <h2 className="text-3xl md:text-5xl font-extrabold mb-6">TicketVista</h2>
                    <p className="text-lg md:text-xl mb-4">Welcome Back!</p>
                    <div className="mt-10 flex flex-col justify-center">
                        <p className="text-base md:text-lg mb-4">Don’t have an account?</p>
                        <Button
                            text="Sign Up"
                            className="py-2 px-4 text-base md:text-lg font-semibold"
                            onClick={() => navigate('/signup')}
                        />
                    </div>
                </div>

                {/* Right side */}
                <div className="flex flex-col justify-center w-full md:w-1/2 lg:w-3/5 p-12">
                    {/* Moved Sign Up section to be visible on small screens */}
                    <div className="block md:hidden mb-6 text-center">
                        <p className="text-base md:text-lg mb-4">Don’t have an account?</p>
                        <Button
                            text="Sign Up"
                            className="py-2 px-4 text-base md:text-lg font-semibold"
                            onClick={() => navigate('/signup')}
                        />
                    </div>
                    <h2 className="text-2xl md:text-3xl font-bold text-white text-center mb-8">Sign In</h2>
                    <form className="space-y-6" onSubmit={handleLogin}>
                        <div>
                            <label className="block text-sm md:text-md text-white mb-2">Email</label>
                            <input
                                type="email"
                                placeholder="kabbloiate@gmail.com"
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
                        </div>
                        {error && <p className="text-red-500 text-center">{error}</p>}
                        <Button text="Sign In" className="w-full py-3 text-lg font-semibold" />
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Login;
