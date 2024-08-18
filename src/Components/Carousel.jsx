import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

// Custom arrow components
const NextArrow = (props) => {
    const { className, style, onClick } = props;
    return (
        <div
            className={className}
            style={{ ...style, display: 'block', fontSize: '64px', right: '30px', zIndex: 1 }}
            onClick={onClick}
        >
            &#10095;
        </div>
    );
};

const PrevArrow = (props) => {
    const { className, style, onClick } = props;
    return (
        <div
            className={className}
            style={{ ...style, display: 'block', fontSize: '64px', left: '30px', zIndex: 1 }}
            onClick={onClick}
        >
            &#10094;
        </div>
    );
};

// Carousel settings
const carouselSettings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true,
    autoplay: true,
    autoplaySpeed: 2000,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
};

const slidesData = [
    {
        img: 'https://www.nu-techassociates.co.uk/wp-content/uploads/2015/04/DSC0210.jpg',
        title: 'Our IT Solutions',
        text: 'Agile ICO delivers professional and managed IT services to help your organization boost innovation and drive business value.'
    },
    {
        img: 'https://kwpkochieventmanagement.home.blog/wp-content/uploads/2019/10/birthday-party-organizer.jpg',
        title: 'Our Services',
        text: 'AICOPL is a global infotech company which provides Enterprise services to clients globally and end-to-end business solutions that leverage technology.'
    },
    {
        img: 'https://alphainstitute.co.in/wp-content/uploads/2017/05/hindu-outdoor-marriage-ceremony-indian-wedding-aisle-decor-destination-event-venue-marigold-aisle-decorations-fresh-floral-mandap-celebrity-wedding-columbus-cer-1024x683.jpg',
        title: 'Our Transformations',
        text: 'AICOPL is a global infotech company which provides Enterprise services to clients globally and end-to-end business solutions that leverage technology.'
    }
];

function Carousel() {
    return (
        <Slider {...carouselSettings}>
            {slidesData.map((slide, index) => (
                <div key={index} className="relative flex justify-center items-center h-full rounded-lg overflow-hidden">
                    <img src={slide.img} alt={`Slide ${index + 1}`} className="w-full h-auto rounded-lg" />
                    {(slide.title || slide.text) && (
                        <div className="absolute bottom-0 w-full flex justify-center items-center text-white p-4 lg:p-8">
                            <div className="bg-black bg-opacity-50 rounded-lg p-4 text-center">
                                {/* <h2 className="text-xl lg:text-3xl font-bold">{slide.title}</h2> */}
                                {/* <p className="text-sm lg:text-lg mt-2">{slide.text}</p> */}
                            </div>
                        </div>
                    )}
                </div>
            ))}
        </Slider>
    );
}

export default Carousel;
