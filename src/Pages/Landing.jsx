import React from 'react';
import { useNavigate } from 'react-router-dom';
import Carousel from '../Components/Carousel';
import Card from '../Components/Card';

const Landing = () => {
    const navigate = useNavigate();

    const images = [
        '/path-to-your-image1.png',
        '/path-to-your-image2.png',
        '/path-to-your-image3.png',
    ];

    const cardsData = [
        {
            image: 'https://sumptuous-events.com/wp-content/uploads/2015/07/bachelor-party-.jpg',
            title: 'Bachelorette parties',
            description: 'Morbi accumsan cras feugiat euismod suspendisse purus. Laoreet mi leo id pretium.',
        },
        {
            image: 'https://res.cloudinary.com/hz3gmuqw6/image/upload/c_fill,f_auto,q_60,w_750/v1/goldenapron/633cca727175d',
            title: 'Christmas party',
            description: 'Nec scelerisque tristique sollicitudin purus pulvinar morbi ornare vestibulum.',
        },
    ];

    const handleBookEventClick = () => {
        navigate('/events');
    };

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-[#380c44] mt-6 text-white p-4 sm:p-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-6xl w-full">
                <div className="flex flex-col justify-center">
                    <h1 className="text-3xl sm:text-4xl md:text-6xl font-bold">
                        <span className="block">Organizing</span>
                        <span className="block text-pink-500">events for</span>
                        <span className="block text-pink-500">Gen-Z</span>
                    </h1>
                    <p className="mt-4 text-gray-300 text-sm sm:text-base md:text-lg">
                        Discover the latest in technology and innovation through our curated seminars and events. We focus on creating engaging experiences for youth. Join us to explore, learn, and be inspired.
                    </p>

                    <div className="mt-8 flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
                        <button
                            className="bg-pink-500 text-white px-6 py-3 rounded-full hover:bg-pink-600"
                            onClick={handleBookEventClick}
                        >
                            Book event
                        </button>
                    </div>
                </div>

                <div className="relative w-full">
                    <Carousel images={images} />
                </div>
            </div>

            {/* Render the cards below the carousel */}
            <div className="mt-16 w-full max-w-6xl">
                <h2 className="text-3xl sm:text-4xl font-bold mb-6 text-center">
                    Stay Tuned for...
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 h-80 gap-12">
                    {cardsData.map((card, index) => (
                        <Card
                            key={index}
                            image={card.image}
                            title={card.title}
                        />
                    ))}
                </div>
            </div>

            {/* Include the new text section */}
            <div className="mt-16 text-center w-full max-w-6xl">
                <h2 className="text-3xl sm:text-4xl font-bold">
                    We have many years of experience in{' '}
                    <span className="text-pink-500">organizing events</span>
                </h2>
                <div className="flex flex-col sm:flex-row justify-center mt-8 space-y-8 sm:space-y-0 sm:space-x-16">
                    <div>
                        <h3 className="text-5xl sm:text-6xl font-bold text-pink-500">1000</h3>
                        <p className="mt-2 text-lg sm:text-xl">completed projects</p>
                    </div>
                    <div>
                        <h3 className="text-5xl sm:text-6xl font-bold text-pink-500">60</h3>
                        <p className="mt-2 text-lg sm:text-xl">original concepts</p>
                    </div>
                    <div>
                        <h3 className="text-5xl sm:text-6xl font-bold text-pink-500">150</h3>
                        <p className="mt-2 text-lg sm:text-xl">regular customers</p>
                    </div>
                    <div>
                        <h3 className="text-5xl sm:text-6xl font-bold text-pink-500">5</h3>
                        <p className="mt-2 text-lg sm:text-xl">years of experience</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Landing;
