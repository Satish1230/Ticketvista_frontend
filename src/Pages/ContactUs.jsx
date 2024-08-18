import React from "react";
import Button from '../Components/Button';

const ContactUs = () => {
    return (
        <div className=" text-white py-12 px-6 md:px-12 lg:px-24">
            <div className="text-center">
                <h2 className="text-pink-400 text-lg">TicketVista</h2>
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mt-4">
                    Contact us <br />
                    if <span className="text-pink-400">you have</span> <br />
                    any questions
                </h1>
                <Button
                    text="+917328083647"
                    className="py-2 px-4 text-base md:text-lg font-semibold mt-14"

                />
            </div>


        </div>
    );
};

export default ContactUs;
