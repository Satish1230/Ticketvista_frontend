import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import EventCard from '../Components/EventCard';

const EventListPage = () => {
    const [data, setData] = useState([]);
    const [searchCity, setSearchCity] = useState('');
    const [searchEvent, setSearchEvent] = useState('');
    const navigate = useNavigate();

    const getEvents = async () => {
        try {
            const response = await fetch('https://ticketvista-backend.onrender.com/events');
            const eventData = await response.json();
            setData(eventData);
        } catch (error) {
            console.error('Error fetching events:', error);
        }
    };

    useEffect(() => {
        getEvents();
    }, []);

    const handleViewDetails = (event) => {
        navigate('/event-details', { state: { ...event } });
    };

    const handleCitySearchChange = (e) => {
        setSearchCity(e.target.value);
    };

    const handleEventSearchChange = (e) => {
        setSearchEvent(e.target.value);
    };

    const filteredData = data.filter((event) => {
        const cityMatch = searchCity === '' || (event.location && event.location.toLowerCase().includes(searchCity.toLowerCase()));
        const eventMatch = searchEvent === '' || (event.title && event.title.toLowerCase().includes(searchEvent.toLowerCase()));
        return cityMatch && eventMatch;
    });

    return (
        <div className="container mx-auto px-4 py-8 mt-6">
            <h1 className="text-3xl font-bold mb-6 text-center sm:text-left">Upcoming Events</h1>

            <div className="mb-4 flex flex-col space-y-2 sm:flex-row sm:space-y-0 sm:space-x-2">
                <input
                    type="text"
                    value={searchCity}
                    onChange={handleCitySearchChange}
                    placeholder="Search for a city or region"
                    className="bg-white bg-opacity-10 backdrop-blur-lg rounded px-4 py-2 w-full sm:w-1/2 lg:w-1/3"
                />
                <input
                    type="text"
                    value={searchEvent}
                    onChange={handleEventSearchChange}
                    placeholder="Search for Events"
                    className="bg-white bg-opacity-10 backdrop-blur-lg rounded px-4 py-2 w-full sm:w-1/2 lg:w-1/3"
                />
            </div>

            <div className='w-full'>
                {filteredData.length > 0 ? (
                    filteredData.map((event, index) => (
                        <div key={index} className="mb-6 w-full">
                            <EventCard {...event} onViewDetails={() => handleViewDetails(event)} />
                        </div>
                    ))
                ) : (
                    <p>No events found.</p>
                )}
            </div>
        </div>
    );
};

export default EventListPage;
