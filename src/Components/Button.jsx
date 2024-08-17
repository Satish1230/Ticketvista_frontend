import React from 'react';

const Button = ({ text, onClick = () => { }, className = "" }) => {
    return (
        <button
            onClick={onClick}
            className={`bg-pink-500 text-white px-6 py-3 rounded-full hover:bg-pink-600 focus:outline-none focus:ring-2 focus:ring-pink-300 ${className}`}
        >
            {text}
        </button>
    );
};

export default Button;
