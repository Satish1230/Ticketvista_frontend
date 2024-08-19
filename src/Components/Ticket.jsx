import React from 'react';

const Ticket = ({ eventName, eventDate, ticketNumber, eventImage, venue, location, time }) => {
    // Convert the eventDate to a JavaScript Date object
    const formattedDate = new Date(eventDate).toLocaleDateString('en-GB', {
        day: 'numeric',
        month: 'numeric',
        year: 'numeric',
    });

    return (
        <div className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 p-6 sm:p-8 rounded-lg shadow-lg border border-transparent flex flex-col sm:flex-row items-center mb-8 w-full max-w-5xl">
            <div className="flex-shrink-0 w-full sm:w-48 h-48 mb-4 sm:mb-0">
                <img src={eventImage} alt={`${eventName} poster`} className="w-full h-full object-cover rounded-lg shadow-lg" />
            </div>
            <div className="sm:ml-8 flex-grow text-center sm:text-left">
                <h3 className="text-2xl sm:text-4xl font-bold text-white mb-4">{eventName}</h3>
                <p className="text-md sm:text-lg text-gray-100 mb-2">Date: {formattedDate} </p>
                <p className="text-md sm:text-lg text-gray-100 mb-2">Time: {time}</p>
                <p className="text-md sm:text-lg text-gray-100 mb-2">Ticket #: {ticketNumber}</p>
                <p className="text-md sm:text-lg text-gray-100">Venue: {venue}, {location}</p>
            </div>
        </div>
    );
};

export default Ticket;
