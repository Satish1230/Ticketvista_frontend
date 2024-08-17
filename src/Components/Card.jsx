// src/components/Card.jsx
import React from 'react';

const Card = ({ image, title, description }) => {
    return (
        <div className="bg-purple-800 rounded-lg overflow-hidden shadow-lg relative">
            <img src={image} alt={title} className="w-full h-full object-cover" />
            <div className="p-4 text-white absolute bottom-0 w-full bg-gradient-to-t from-black to-transparent">
                <h3 className="text-xl font-bold">{title}</h3>
                <p className="text-sm mt-2">{description}</p>
            </div>
        </div>
    );
};

export default Card;
