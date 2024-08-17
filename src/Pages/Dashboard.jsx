import React, { useEffect, useState } from 'react';
import Ticket from '../Components/Ticket';

const Dashboard = () => {
    const [tickets, setTickets] = useState([]);

    useEffect(() => {
        const fetchTickets = async () => {
            try {
                const response = await fetch('http://localhost:3030/api/tickets/get-tickets');
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
        <div className="p-8 mt-6">
            <h2 className="text-3xl font-bold mb-6">Your Tickets</h2>
            <div className="space-y-4">
                {tickets.length > 0 ? (
                    tickets.map((ticket) => (
                        <Ticket
                            key={ticket._id}
                            eventName={ticket.eventName}
                            eventDate={ticket.eventDate}
                            ticketNumber={ticket.ticketNumber}
                            eventImage={ticket.eventImage}
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
