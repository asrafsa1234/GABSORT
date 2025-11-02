import React from 'react';

interface WelcomeProps {
    onGetStarted: () => void;
}

const Welcome: React.FC<WelcomeProps> = ({ onGetStarted }) => {
    return (
        <div className="flex flex-col items-center justify-center h-screen text-center p-4 bg-gray-50">
            <div className="max-w-md">
                 <h1 className="text-4xl font-bold text-gray-800">
                    Welcome to 
                    <span className="text-5xl font-extrabold text-green-600 block mt-1">EcoScan</span>
                 </h1>
                 <p className="mt-4 text-lg text-gray-600">
                    Snap a photo of any item, and we'll tell you if it's recyclable and how to dispose of it responsibly.
                 </p>
                 <button
                    onClick={onGetStarted}
                    className="mt-8 px-8 py-3 bg-green-600 text-white font-bold rounded-full shadow-lg hover:bg-green-700 transition-transform transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50"
                 >
                    Get Started
                 </button>
            </div>
        </div>
    );
};

export default Welcome;
