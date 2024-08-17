import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';

function Header() {
    const [selectedLink, setSelectedLink] = useState('/');
    const [menuOpen, setMenuOpen] = useState(false);
    const [user, setUser] = useState(null);
    const location = useLocation();
    const navigate = useNavigate();

    // Update selectedLink state when the location changes
    useEffect(() => {
        setSelectedLink(location.pathname);
        setMenuOpen(false); // Close menu on navigation
    }, [location.pathname]);

    // Check if user is logged in
    useEffect(() => {
        const loggedUser = localStorage.getItem('user');
        if (loggedUser) {
            setUser(JSON.parse(loggedUser));
        }
    }, []);

    const handleLogout = () => {
        localStorage.removeItem('user');
        setUser(null);
        navigate('/'); // Redirect to home after logout
    };

    return (
        <header className="fixed top-0 inset-x-0 bg-[#2c0038] shadow-lg z-50">
            <div className="container mx-auto px-10 py-4">
                <div className="flex items-center justify-between">
                    <div className="text-white text-2xl font-bold flex items-center">
                        <span>Ticket</span><span className="text-pink-500">Vista</span>
                    </div>
                    <button
                        className="lg:hidden text-white"
                        onClick={() => setMenuOpen(!menuOpen)}
                    >
                        <svg
                            className="w-8 h-8"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            {menuOpen ? (
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M6 18L18 6M6 6l12 12"
                                />
                            ) : (
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M4 6h16M4 12h16m-7 6h7"
                                />
                            )}
                        </svg>
                    </button>
                    <nav className={`flex-col space-y-4 lg:flex lg:flex-row lg:space-y-0 lg:space-x-8 ${menuOpen ? 'flex' : 'hidden'}`}>
                        <Link
                            to="/"
                            className={`nav-link relative ${selectedLink === '/' ? 'text-pink-500' : 'text-white hover:text-pink-500'}`}
                            onClick={() => setSelectedLink('/')}
                        >
                            Home
                        </Link>
                        {user && (
                            <Link
                                to="/myevents"
                                className={`nav-link relative ${selectedLink === '/myevents' ? 'text-pink-500' : 'text-white hover:text-pink-500'}`}
                                onClick={() => setSelectedLink('/myevents')}
                            >
                                My Events
                            </Link>
                        )}
                        <Link
                            to="/events"
                            className={`nav-link relative ${selectedLink === '/events' ? 'text-pink-500' : 'text-white hover:text-pink-500'}`}
                            onClick={() => setSelectedLink('/events')}
                        >
                            Explore
                        </Link>
                        {user && (
                            <Link
                                to="/dashboard"
                                className={`nav-link relative ${selectedLink === '/dashboard' ? 'text-pink-500' : 'text-white hover:text-pink-500'}`}
                                onClick={() => setSelectedLink('/dashboard')}
                            >
                                Dashboard
                            </Link>
                        )}
                        <Link
                            to="/contact"
                            className={`nav-link relative ${selectedLink === '/contact' ? 'text-pink-500' : 'text-white hover:text-pink-500'}`}
                            onClick={() => setSelectedLink('/contact')}
                        >
                            Contact
                        </Link>
                        {user ? (
                            <button
                                onClick={handleLogout}
                                className="bg-pink-500 text-white px-4 py-2 rounded-full"
                            >
                                Logout
                            </button>
                        ) : (
                            <Link
                                to="/login"
                                className={`bg-pink-500 text-white px-4 py-2 rounded-full`}
                                onClick={() => setSelectedLink('/login')}
                            >
                                Login
                            </Link>
                        )}
                    </nav>
                </div>
            </div>
        </header>
    );
}

export default Header;
