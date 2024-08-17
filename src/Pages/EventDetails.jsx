import React from 'react';
import { useLocation } from 'react-router-dom';
import Button from '../Components/Button';

// Helper function to format the date
const formatDate = (dateString) => {
    if (!dateString) return "Date not available";
    const date = new Date(dateString);
    return date.toLocaleDateString('en-GB'); // Format to DD/MM/YYYY
};

const EventDetailsPage = () => {
    const location = useLocation();
    const { state } = location;

    const {
        date = "Date not available",
        location: eventLocation = "Location not available",
        title = "Title not available",
        description = "Description not available",
        imageUrl = "https://via.placeholder.com/500", // Fallback image URL
        price = "Price not available",
        venue = "Venue not available",
        speakers = "Speakers not available",
        time = "Time not available"
    } = state || {};

    if (!state) {
        return (
            <div className="container mx-auto px-4 py-8">
                <p className="text-center text-xl text-gray-600">No event details available. Please go back and select an event.</p>
            </div>
        );
    }

    const handleGetTickets = async () => {
        try {
            const response = await fetch('http://localhost:3030/api/tickets/issue-ticket', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    eventName: title,
                    eventDate: date,
                    ticketNumber: 'TICKET12345', // This should be dynamically generated
                    eventImage: imageUrl,

                }),
            });

            const result = await response.json();
            if (response.ok) {
                alert('Ticket issued successfully!');
            } else {
                alert('Failed to issue ticket: ' + result.error);
            }
        } catch (error) {
            console.error('Error issuing ticket:', error);
            alert('Error issuing ticket');
        }
    };

    return (
        <div className="mt-12 max-w-4xl mx-auto bg-white bg-opacity-10 backdrop-blur-lg rounded-2xl shadow-lg p-8">
            <div className="flex justify-center mb-8">
                <img src={imageUrl} alt={title} className="w-full h-80 object-cover rounded-lg " />
            </div>
            <h1 className="text-4xl font-extrabold mb-6 text-center text-pink-500">{title}</h1>

            <div className="mb-8 ">
                <p className="text-xl font-bold text-white mb-2">Date:</p>
                <p className="text-lg text-gray-200 mb-2">{formatDate(date)}</p>
                <p className="text-lg text-gray-200">{eventLocation}</p>
            </div>

            <div className="mb-8">
                <p className="text-xl font-semibold text-blue-800 mb-2">Price:</p>
                <p className="text-lg text-blue-700">{price}</p>
            </div>

            <div className="mb-8">
                <p className="text-xl font-semibold text-blue-800 mb-2">Venue:</p>
                <p className="text-lg text-blue-700">{venue}</p>
            </div>

            <div className="mb-8">
                <p className="text-xl font-semibold text-blue-800 mb-2">Time:</p>
                <p className="text-lg text-blue-700">{time}</p>
            </div>

            <div className="mb-8">
                <p className="text-xl font-semibold text-blue-800 mb-2">Speakers:</p>
                <p className="text-lg text-blue-700">{speakers}</p>
            </div>

            <div className="mb-8">
                <p className="text-xl font-semibold text-blue-800 mb-2">Description:</p>
                <p className="text-lg text-blue-700">{description}</p>
            </div>

            <div className="flex justify-center">
                <Button text="Get tickets" className="w-56 py-3 text-lg font-semibold " onClick={handleGetTickets} />
            </div>
        </div>
    );
};

export default EventDetailsPage;
