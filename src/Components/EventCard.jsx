import React from 'react';

const EventCard = ({ date, location, title, tags, description, imageUrl, price, onViewDetails, user, onEdit, buttonText = 'View Details' }) => {
    return (
        <div className="bg-white bg-opacity-10 backdrop-blur-lg p-6 flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4 rounded-md">
            <div className="flex-shrink-0 shadow-lg shadow-black w-full md:w-72 h-56 overflow-hidden rounded-md">
                <img src={imageUrl} alt={title} className="w-full h-full object-cover" />
            </div>
            <div className="flex-grow max-h-56 overflow-y-auto">
                <h2 className="text-2xl font-bold">{title}</h2>
                <p className="text-sm">{new Date(date).toLocaleDateString()} - {location}</p>
                <p className="text-sm font-semibold">₹{price}</p> {/* Displaying the price */}
                <div className="flex flex-wrap space-x-2 my-2">
                    {tags.map((tag, index) => (
                        <span key={index} className="px-2 py-1 bg-white bg-opacity-10 backdrop-blur-lg rounded-full text-xs">{tag}</span>
                    ))}
                </div>
                {/* {console.log(user)} */}
                <p className="text-sm mb-2 line-clamp-3 overflow-hidden text-ellipsis">{description}</p>
                <div className="flex space-x-2">
                    {buttonText === 'Edit' ? (
                        <button
                            onClick={onEdit}
                            className="bg-pink-500 text-white px-4 py-2 rounded-lg"
                        >
                            Edit
                        </button>
                    ) : (
                        <button
                            onClick={onViewDetails}
                            className="bg-pink-500 text-white px-4 py-2 rounded-lg"
                        >
                            {buttonText}
                        </button>

                    )}
                </div>
            </div>
        </div>
    );
};

export default EventCard;
