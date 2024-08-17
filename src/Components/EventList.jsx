// EventCardList.jsx
import React from 'react';
import EventCard from './EventCard';

const EventCardList = ({ events = [], onViewDetails }) => {
    return (
        <div>
            {events.length > 0 ? (
                events.map((event, index) => (
                    <div key={index} className="mb-6">
                        <EventCard {...event} onViewDetails={() => onViewDetails(event)} />
                    </div>
                ))
            ) : (
                <p>No events found.</p>
            )}
        </div>
    );
};

export default EventCardList;
