import React, { useState } from 'react';
import BottomNav from './components/BottomNav';
import History from './components/History';
import Map from './components/Map';
import Profile from './components/Profile';
import Scanner from './components/Scanner';
import Welcome from './components/Welcome';
import { HistoryItem, AppView } from './types';
import useLocalStorage from './hooks/useLocalStorage';

const App: React.FC = () => {
    const [view, setView] = useState<AppView>('welcome');
    const [history, setHistory] = useLocalStorage<HistoryItem[]>('scanHistory', []);
    
    const handleGetStarted = () => {
        setView('scanner');
    };

    const handleAddToHistory = (item: Omit<HistoryItem, 'id' | 'timestamp'>) => {
        const newItem: HistoryItem = {
            ...item,
            id: new Date().toISOString() + Math.random(),
            timestamp: new Date().toISOString(),
        };
        // Prevent duplicates and limit history size
        setHistory(prev => [newItem, ...prev.filter(h => h.id !== newItem.id)].slice(0, 50));
    };
    
    const renderView = () => {
        switch (view) {
            case 'scanner':
                return <Scanner onAddToHistory={handleAddToHistory} />;
            case 'history':
                return <History history={history} />;
            case 'map':
                return <Map />;
            case 'profile':
                return <Profile history={history} />;
            default:
                return <Welcome onGetStarted={handleGetStarted} />;
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 text-gray-800 font-sans">
            <div className="container mx-auto max-w-lg p-4 pb-20">
                {view === 'welcome' ? (
                     <Welcome onGetStarted={handleGetStarted} />
                ) : (
                    <>
                     <header className="text-center py-4">
                        <h1 className="text-2xl font-bold text-green-600 capitalize">{view}</h1>
                    </header>
                    <main>{renderView()}</main>
                    </>
                )}
            </div>
            {view !== 'welcome' && <BottomNav activeView={view} setView={setView} />}
        </div>
    );
};

export default App;