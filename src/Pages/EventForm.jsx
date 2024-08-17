import React, { useState, useEffect } from 'react';
import Button from '../Components/Button';

const EventForm = ({ onSubmit, className, initialData, onDelete }) => {
    const [formData, setFormData] = useState({
        date: '',
        location: '',
        title: '',
        tags: '',
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
        onSubmit(formData);
    };

    // Handle event deletion
    const handleDelete = async () => {
        if (!initialData || !initialData._id) return;

        try {
            const response = await fetch(`http://localhost:3030/events/${initialData._id}`, {
                method: 'DELETE',
            });

            if (!response.ok) {
                throw new Error('Failed to delete event');
            }

            // Call the onDelete function passed as a prop to handle UI update
            onDelete(initialData._id);
        } catch (error) {
            console.error('Error deleting event:', error);
        }
    };

    return (
        <form onSubmit={handleSubmit} className={`bg-white mt-12 bg-opacity-10 backdrop-blur-lg p-6 rounded-lg shadow-lg w-96`}>
            <div className="mb-4">
                <label className="block text-white text-md mb-2">Date</label>
                <input
                    type="date"
                    name="date"
                    value={formData.date}
                    onChange={handleChange}
                    className="w-full p-3 border border-gray-300 rounded-lg text-black"
                    required
                />
            </div>
            <div className="mb-4">
                <label className="block text-white text-md mb-2">Location</label>
                <input
                    type="text"
                    name="location"
                    value={formData.location}
                    onChange={handleChange}
                    placeholder="Location"
                    className="w-full p-3 border border-gray-300 rounded-lg text-black"
                    required
                />
            </div>
            <div className="mb-4">
                <label className="block text-white text-md mb-2">Event Name</label>
                <input
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                    placeholder="Title"
                    className="w-full p-3 border border-gray-300 rounded-lg text-black"
                    required
                />
            </div>
            <div className="mb-4">
                <label className="block text-white text-md mb-2">Tags (comma-separated)</label>
                <input
                    type="text"
                    name="tags"
                    value={formData.tags}
                    onChange={handleChange}
                    placeholder="Sustainability, Green Tech"
                    className="w-full p-3 border border-gray-300 rounded-lg text-black"
                    required
                />
            </div>
            <div className="mb-4">
                <label className="block text-white text-md mb-2">Description</label>
                <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    placeholder="Description"
                    className="w-full p-3 border border-gray-300 rounded-lg text-black"
                    required
                />
            </div>
            <div className="mb-4">
                <label className="block text-white text-md mb-2">Image URL</label>
                <input
                    type="url"
                    name="imageUrl"
                    value={formData.imageUrl}
                    onChange={handleChange}
                    placeholder="Image URL"
                    className="w-full p-3 border border-gray-300 rounded-lg text-black"
                    required
                />
            </div>
            <div className="flex justify-between">
                <Button
                    text={initialData ? "Edit Event" : "Add Event"}
                    className="w-full"
                />
                {initialData && (
                    <Button
                        text="Delete Event"
                        className="w-full ml-4 bg-red-500"
                        onClick={handleDelete}
                    />
                )}
            </div>
        </form>
    );
};

export default EventForm;
