import React, { useState, useEffect } from 'react';
import InputMask from 'react-input-mask';
import Button from '../Components/Button';

const EventForm = ({ onSubmit, className, initialData, onDelete }) => {
    const [formData, setFormData] = useState({
        date: '',
        location: '',
        title: '',
        tags: '',
        speakers: '',
        time: '',
        venue: '',
        price: '',
        description: '',
        imageUrl: ''
    });

    useEffect(() => {
        if (initialData) {
            setFormData({
                date: initialData.date || '',
                location: initialData.location || '',
                title: initialData.title || '',
                tags: initialData.tags ? initialData.tags.join(', ') : '',
                speakers: initialData.speakers ? initialData.speakers.join(', ') : '',
                price: initialData.price || '',
                time: initialData.time || '',
                venue: initialData.venue || '',
                description: initialData.description || '',
                imageUrl: initialData.imageUrl || ''
            });
        }
    }, [initialData]);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit({
            ...formData,
            date: formatDate(formData.date) // Ensure date is in MM/DD/YYYY format
        });
    };

    const formatDate = (date) => {
        const [month, day, year] = date.split('/');
        return `${month.padStart(2, '0')}/${day.padStart(2, '0')}/${year}`;
    };

    const handleDelete = async () => {
        if (!initialData || !initialData._id) return;

        try {
            const response = await fetch(`https://ticketvista-backend.onrender.com/events/${initialData._id}`, {
                method: 'DELETE',
            });

            if (!response.ok) {
                throw new Error('Failed to delete event');
            }

            onDelete(initialData._id);
        } catch (error) {
            console.error('Error deleting event:', error);
        }
    };

    return (
        <form onSubmit={handleSubmit} className={`bg-white mt-12 bg-opacity-10 backdrop-blur-lg p-8 rounded-lg shadow-lg max-w-7xl ${className}`}>
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 md:gap-12">
                <div className="mb-4 md:mb-6">
                    <label className="block text-white text-md mb-2">Date</label>
                    <InputMask
                        mask="99/99/9999"
                        name="date"
                        value={formData.date}
                        onChange={handleChange}
                        placeholder="MM/DD/YYYY"
                        className="w-full p-3 md:p-4 border border-gray-300 rounded-lg text-black"
                        required
                    />
                </div>
                <div className="mb-4 md:mb-6">
                    <label className="block text-white text-md mb-2">Location</label>
                    <input
                        type="text"
                        name="location"
                        value={formData.location}
                        onChange={handleChange}
                        placeholder="Location"
                        className="w-full p-3 md:p-4 border border-gray-300 rounded-lg text-black"
                        required
                    />
                </div>
            </div>
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 md:gap-12">
                <div className="mb-4 md:mb-6">
                    <label className="block text-white text-md mb-2">Time</label>
                    <input
                        type="text"
                        name="time"
                        value={formData.time}
                        onChange={handleChange}
                        placeholder="2:00"
                        className="w-full p-3 md:p-4 border border-gray-300 rounded-lg text-black"
                        required
                    />
                </div>
                <div className="mb-4 md:mb-6">
                    <label className="block text-white text-md mb-2">Venue</label>
                    <input
                        type="text"
                        name="venue"
                        value={formData.venue}
                        onChange={handleChange}
                        placeholder="Talkatora Stadium"
                        className="w-full p-3 md:p-4 border border-gray-300 rounded-lg text-black"
                        required
                    />
                </div>
            </div>
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 md:gap-12">
                <div className="mb-4 md:mb-6">
                    <label className="block text-white text-md mb-2">Event Name</label>
                    <input
                        type="text"
                        name="title"
                        value={formData.title}
                        onChange={handleChange}
                        placeholder="Title"
                        className="w-full p-3 md:p-4 border border-gray-300 rounded-lg text-black"
                        required
                    />
                </div>
                <div className="mb-4 md:mb-6">
                    <label className="block text-white text-md mb-2">Tags (comma-separated)</label>
                    <input
                        type="text"
                        name="tags"
                        value={formData.tags}
                        onChange={handleChange}
                        placeholder="Sustainability, Green Tech"
                        className="w-full p-3 md:p-4 border border-gray-300 rounded-lg text-black"
                        required
                    />
                </div>
            </div>
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 md:gap-12">
                <div className="mb-4 md:mb-6">
                    <label className="block text-white text-md mb-2">Speakers (comma-separated)</label>
                    <input
                        type="text"
                        name="speakers"
                        value={formData.speakers}
                        onChange={handleChange}
                        placeholder="John Doe, Martin"
                        className="w-full p-3 md:p-4 border border-gray-300 rounded-lg text-black"
                        required
                    />
                </div>
                <div className="mb-4 md:mb-6">
                    <label className="block text-white text-md mb-2">Price</label>
                    <input
                        type="text"
                        name="price"
                        value={formData.price}
                        onChange={handleChange}
                        placeholder="999/-"
                        className="w-full p-3 md:p-4 border border-gray-300 rounded-lg text-black"
                        required
                    />
                </div>
            </div>
            <div className="mb-4 md:mb-6">
                <label className="block text-white text-md mb-2">Description</label>
                <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    placeholder="Description"
                    className="w-full p-3 md:p-4 border border-gray-300 rounded-lg text-black"
                    required
                />
            </div>
            <div className="mb-4 md:mb-6">
                <label className="block text-white text-md mb-2">Image URL</label>
                <input
                    type="url"
                    name="imageUrl"
                    value={formData.imageUrl}
                    onChange={handleChange}
                    placeholder="Image URL"
                    className="w-full p-3 md:p-4 border border-gray-300 rounded-lg text-black"
                    required
                />
            </div>
            <div className="flex flex-col md:flex-row md:justify-between gap-4">
                <Button
                    text={initialData ? "Edit Event" : "Add Event"}
                    className="w-full md:w-auto"
                />
                {initialData && (
                    <Button
                        text="Delete Event"
                        className="w-full md:w-auto bg-red-500"
                        onClick={handleDelete}
                    />
                )}
            </div>
        </form>
    );
};

export default EventForm;
