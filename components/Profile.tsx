import React from 'react';
import { HistoryItem } from '../types';

interface ProfileProps {
    history: HistoryItem[];
}

const Profile: React.FC<ProfileProps> = ({ history }) => {
    const totalScans = history.length;
    const totalPoints = history.reduce((sum, item) => sum + (item.points || 0), 0);

    return (
        <div className="space-y-4">
            <div className="bg-white rounded-lg shadow-md p-6 text-center">
                <h2 className="text-xl font-bold text-gray-800">Your Eco Stats</h2>
                <div className="mt-4 grid grid-cols-2 gap-4">
                    <div>
                        <p className="text-3xl font-bold text-green-600">{totalScans}</p>
                        <p className="text-sm text-gray-500">Total Items Scanned</p>
                    </div>
                    <div>
                        <p className="text-3xl font-bold text-green-600">{totalPoints}</p>
                        <p className="text-sm text-gray-500">Total Eco Points</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Profile;