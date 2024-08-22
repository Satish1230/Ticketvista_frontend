import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import EventForm from './EventForm';
import EventCard from '../Components/EventCard';

const Myevents = () => {
    const [showForm, setShowForm] = useState(false);
    const [events, setEvents] = useState([]);  // Initialize as an empty array
    const [currentEvent, setCurrentEvent] = useState(null);
    const [user, setUser] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
            try {
                const parsedUser = JSON.parse(storedUser);
                console.log('Parsed user:', parsedUser); // Debugging statement
                setUser(parsedUser);
                if (parsedUser) {
                    fetchEvents(parsedUser);
                } else {
                    console.error('No email found for the user.');
                }
            } catch (error) {
                console.error('Error parsing user data:', error);
                navigate('/login'); // Redirect to login if user data is corrupted
            }
        } else {
            console.error('No user found in localStorage.');
            navigate('/login'); // Redirect to login page if user is not logged in
        }
    }, [navigate]);

    const fetchEvents = async (email) => {
        try {
            const response = await fetch(`http://localhost:3030/events/user/email`, { method: "POST", body: JSON.stringify({ email }), headers: { "Content-Type": "application/json" } });
            if (!response.ok) {
                throw new Error('Failed to fetch events');
            }
            const eventData = await response.json();
            if (Array.isArray(eventData)) {
                setEvents(eventData);
            } else {
                console.error('Unexpected data format:', eventData);
            }
        } catch (error) {
            console.error('Error fetching events:', error);
        }
    };

    const handleFormSubmit = async (data) => {
        try {
            let response;
            if (currentEvent) {
                response = await fetch(`http://localhost:3030/events/${currentEvent._id}`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(data),
                });

                if (!response.ok) {
                    throw new Error('Failed to update event');
                }

                const result = await response.json();
                setEvents(events.map(event => (event._id === currentEvent._id ? result.event : event)));
            } else {
                const storedUser = localStorage.getItem('user');
                const email = JSON.parse(storedUser);
                response = await fetch('http://localhost:3030/events', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ ...data, email }),
                });

                if (!response.ok) {
                    throw new Error('Failed to create event');
                }

                const result = await response.json();
                setEvents([...events, result.event]);
            }

            setShowForm(false);
        } catch (error) {
            console.error('Error submitting form:', error);
        }
    };

    const handleEditClick = (event) => {
        setCurrentEvent(event);
        setShowForm(true);
    };

    const handleDelete = (eventId) => {
        setEvents(events.filter(event => event._id !== eventId));
        setShowForm(false);
    };

    if (!user) {
        return <p>Loading...</p>; // Or redirect to login
    }

    return (
        <div className="p-8">
            {!showForm && (
                <div className="flex items-center mb-8 mt-8">
                    <img
                        src="https://png.pngtree.com/png-clipart/20191120/original/pngtree-add-icon-isolated-on-abstract-background-png-image_5073728.jpg"
                        alt="Add Event Logo"
                        className="w-12 h-12 rounded-full cursor-pointer mr-4"
                        onClick={() => {
                            setCurrentEvent(null);
                            setShowForm(!showForm);
                        }}
                    />
                    <h2 className="text-4xl font-bold">Create Your Events</h2>
                </div>
            )}

            {showForm ? (
                <div className="mx-auto">
                    <EventForm
                        onSubmit={handleFormSubmit}
                        initialData={currentEvent}
                        onDelete={handleDelete}
                    />
                </div>
            ) : (
                <div className="mt-8">
                    {events.length > 0 ? (
                        events.map((event, index) => (
                            <div key={index} className="mb-8">
                                <EventCard
                                    date={event.date}
                                    location={event.location}
                                    title={event.title}
                                    tags={Array.isArray(event.tags) ? event.tags : event.tags?.split(',') || []}
                                    description={event.description}
                                    imageUrl={event.imageUrl}
                                    onViewDetails={() => console.log('View details for', event.title)}
                                    onEdit={() => handleEditClick(event)}
                                    buttonText="Edit"
                                    className="w-full"
                                />
                            </div>
                        ))
                    ) : (
                        <p>No events found. Please create one.</p>
                    )}
                </div>
            )}
        </div>
    );
};

export default Myevents;
