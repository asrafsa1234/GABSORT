import React from 'react';
import { AnalysisResult } from '../types';

interface ResultDisplayProps {
    result: AnalysisResult;
    onScanAgain: () => void;
    imageUri: string;
}

const ResultDisplay: React.FC<ResultDisplayProps> = ({ result, onScanAgain, imageUri }) => {
    const { itemName, recyclable, recyclabilityScore, instructions, alternatives, ecoFriendlyTip } = result;

    const scoreColor = recyclabilityScore > 75 ? 'text-green-500' : recyclabilityScore > 40 ? 'text-yellow-500' : 'text-red-500';

    return (
        <div className="bg-white rounded-lg shadow-lg p-6 animate-fade-in space-y-4">
            <img src={imageUri} alt={itemName} className="w-full h-48 object-cover rounded-md mb-4" />

            <div className="text-center">
                <h2 className="text-2xl font-bold text-gray-900">{itemName}</h2>
                <div className={`mt-2 text-lg font-semibold ${recyclable === 'Yes' ? 'text-green-600' : 'text-red-600'}`}>
                    {recyclable === 'Yes' ? 'Recyclable' : 'Not Recyclable'}
                </div>
            </div>

            <div>
                <h3 className="font-semibold text-gray-700">Recyclability Score</h3>
                <div className="w-full bg-gray-200 rounded-full h-2.5 my-2">
                    <div className="bg-green-600 h-2.5 rounded-full" style={{ width: `${recyclabilityScore}%` }}></div>
                </div>
                <p className={`text-center font-bold text-xl ${scoreColor}`}>{recyclabilityScore}/100</p>
            </div>

            <div>
                <h3 className="font-semibold text-gray-700">Instructions</h3>
                <p className="text-gray-600 text-sm">{instructions}</p>
            </div>
            
            {alternatives && alternatives.length > 0 && (
                 <div>
                    <h3 className="font-semibold text-gray-700">Eco-Friendly Alternatives</h3>
                    <ul className="list-disc list-inside text-gray-600 text-sm space-y-1">
                        {alternatives.map((alt, index) => <li key={index}>{alt}</li>)}
                    </ul>
                </div>
            )}
            
            <div>
                 <h3 className="font-semibold text-gray-700">Eco Tip</h3>
                 <p className="text-gray-600 text-sm italic">"{ecoFriendlyTip}"</p>
            </div>

            <button
                onClick={onScanAgain}
                className="w-full mt-4 px-4 py-2 bg-green-600 text-white font-semibold rounded-lg shadow-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-75"
            >
                Scan Another Item
            </button>
        </div>
    );
};

export default ResultDisplay;