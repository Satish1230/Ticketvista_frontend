// src/Components/Ticket.jsx
import React from 'react';

const Ticket = ({ eventName, eventDate, ticketNumber, eventImage }) => {
    return (
        <div className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 p-6 rounded-lg shadow-lg border border-transparent flex items-center mb-4 w-full">
            <div className="flex-shrink-0 w-32 h-32">
                <img src={eventImage} alt={`${eventName} poster`} className="w-full h-full object-cover rounded-lg shadow-lg" />
            </div>
            <div className="ml-6 flex-grow">
                <h3 className="text-2xl font-bold text-white mb-2">{eventName}</h3>
                <p className="text-sm text-gray-100 mb-1">Date: {eventDate}</p>
                <p className="text-sm text-gray-100">Ticket #: {ticketNumber}</p>
                <p className="text-sm text-gray-100">Ticket #: {ticketNumber}</p>

            </div>
        </div>
    );
};

export default Ticket;
