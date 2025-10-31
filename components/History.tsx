import React from 'react';
import { HistoryItem } from '../types';

interface HistoryProps {
    history: HistoryItem[];
}

const History: React.FC<HistoryProps> = ({ history }) => {
    if (history.length === 0) {
        return (
            <div className="text-center p-8 text-gray-500">
                <p>Your scanning history is empty.</p>
                <p className="text-sm">Scanned items will appear here.</p>
            </div>
        );
    }

    return (
        <div className="space-y-4">
            {history.map((item) => (
                <div key={item.id} className="bg-white rounded-lg shadow-md p-4 flex items-center space-x-4">
                    <img src={item.image} alt={item.result.itemName} className="w-20 h-20 object-cover rounded-md" />
                    <div className="flex-grow">
                        <h3 className="font-bold text-lg text-gray-800">{item.result.itemName}</h3>
                        <p className={`text-sm font-semibold ${item.result.recyclable === 'Yes' ? 'text-green-600' : 'text-red-600'}`}>
                            {item.result.recyclable === 'Yes' ? 'Recyclable' : 'Not Recyclable'}
                        </p>
                        <p className="text-xs text-gray-500">
                            {new Date(item.timestamp).toLocaleString()}
                        </p>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default History;