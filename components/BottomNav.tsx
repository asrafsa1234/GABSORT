import React from 'react';
import { AppView } from '../types';
import { HistoryIcon, MapIcon, ProfileIcon, ScanIcon } from './icons';

interface BottomNavProps {
    activeView: AppView;
    setView: (view: AppView) => void;
}

const BottomNav: React.FC<BottomNavProps> = ({ activeView, setView }) => {
    const navItems = [
        { name: 'history', icon: HistoryIcon, label: 'History' },
        { name: 'scanner', icon: ScanIcon, label: 'Scan' },
        { name: 'map', icon: MapIcon, label: 'Map' },
        { name: 'profile', icon: ProfileIcon, label: 'Profile' },
    ];

    return (
        <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-lg">
            <div className="flex justify-around max-w-lg mx-auto">
                {navItems.map((item) => (
                    <button
                        key={item.name}
                        onClick={() => setView(item.name as AppView)}
                        className={`flex flex-col items-center justify-center w-full pt-2 pb-1 text-sm
                            ${activeView === item.name
                                ? 'text-green-600'
                                : 'text-gray-500 hover:text-green-600'
                            }`}
                        aria-current={activeView === item.name ? 'page' : undefined}
                    >
                        <item.icon className="w-6 h-6 mb-1" />
                        <span>{item.label}</span>
                    </button>
                ))}
            </div>
        </nav>
    );
};

export default BottomNav;
