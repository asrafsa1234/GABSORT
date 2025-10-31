import React, { useState, useEffect } from 'react';

const tips = [
    "Carry a reusable water bottle to reduce plastic waste.",
    "Opt for cloth bags instead of plastic bags when shopping.",
    "Compost your food scraps to reduce landfill waste and enrich your soil.",
    "Donate old clothes and items instead of throwing them away.",
    "Avoid single-use plastics like straws, cutlery, and coffee cups.",
    "Repair broken items instead of replacing them.",
    "Choose products with minimal or recyclable packaging.",
    "Switch to rechargeable batteries to reduce hazardous waste."
];

const TipsCarousel: React.FC = () => {
    const [currentIndex, setCurrentIndex] = useState(0);

    const handleNext = () => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % tips.length);
    };

    const handlePrev = () => {
        setCurrentIndex((prevIndex) => (prevIndex - 1 + tips.length) % tips.length);
    };

    useEffect(() => {
        const timer = setInterval(() => {
            handleNext();
        }, 5000); 
        return () => clearInterval(timer);
    }, []);

    return (
        <div className="bg-white rounded-2xl shadow-xl p-4 relative overflow-hidden">
            <div className="flex items-center mb-2">
                 <svg className="w-6 h-6 text-green-500 mr-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                </svg>
                <h3 className="font-bold text-md text-gray-800">Eco Tip of the Day</h3>
            </div>
            
            <p className="text-gray-600 text-sm h-10 flex items-center">{tips[currentIndex]}</p>

            <div className="absolute bottom-2 right-2 flex items-center space-x-1">
                <button onClick={handlePrev} className="p-1 rounded-full bg-gray-100 hover:bg-gray-200" aria-label="Previous tip">
                    <svg className="w-4 h-4 text-gray-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                </button>
                <button onClick={handleNext} className="p-1 rounded-full bg-gray-100 hover:bg-gray-200" aria-label="Next tip">
                    <svg className="w-4 h-4 text-gray-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                </button>
            </div>
        </div>
    );
};

export default TipsCarousel;