import React, { useEffect, useState } from 'react';
import Ticket from '../Components/Ticket';

const Dashboard = () => {
    const [tickets, setTickets] = useState([]);

    useEffect(() => {
        const fetchTickets = async () => {
            const storedUser = localStorage.getItem('user');
            const email = JSON.parse(storedUser);
            // console.log('Email:', email); // Debugging statement
            try {
                const response = await fetch('http://localhost:3030/api/tickets/get-tickets', { method: "POST", body: JSON.stringify({ email }), headers: { "Content-Type": "application/json" } });
                console.log('Response:', response); // Debugging statement
                if (response.ok) {
                    const data = await response.json();
                    setTickets(data);
                } else {
                    console.error('Failed to fetch tickets:', response.statusText);
                }
            } catch (error) {
                console.error('Error fetching tickets:', error);
            }
        };

        fetchTickets();
    }, []);

    return (
        <div className="p-8 mt-6"><div className=''>
            <h2 className="text-3xl font-bold mb-2">Your Tickets</h2>
            <p className=" mb-4 text-gray-400 text-sm sm:text-base md:text-lg">
                We would love to meet you at the event </p>
        </div>
            <div className="space-y-4">
                {tickets.length > 0 ? (
                    tickets.map((ticket) => (
                        <Ticket
                            key={ticket._id}
                            eventName={ticket.eventName}
                            eventDate={ticket.eventDate}
                            ticketNumber={ticket.ticketNumber}
                            eventImage={ticket.eventImage}
                            venue={ticket.venue}
                            time={ticket.time}
                            location={ticket.location}
                        />
                    ))
                ) : (
                    <p>No tickets available</p>
                )}
            </div>
        </div>
    );
};

export default Dashboard;
