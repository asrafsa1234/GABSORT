import React, { useMemo } from 'react';
import { HistoryItem } from '../types';
import { GlobeIcon, HundredIcon, SparkleIcon, TargetIcon, TreeIcon, WaterDropIcon } from './icons';

interface ProfileProps {
    history: HistoryItem[];
}

const StatCard: React.FC<{ value: number | string; label: string }> = ({ value, label }) => (
    <div className="bg-green-50 p-4 rounded-xl text-center">
        <p className="text-3xl font-bold text-green-600">{value}</p>
        <p className="text-sm text-gray-600">{label}</p>
    </div>
);

const DonutChart: React.FC<{ data: { label: string; value: number; color: string }[] }> = ({ data }) => {
    const total = data.reduce((sum, item) => sum + item.value, 0);
    if (total === 0) {
        return <div className="w-40 h-40 bg-gray-200 rounded-full" />;
    }
    
    let cumulative = 0;
    const gradients = data.map(item => {
        const percent = (item.value / total) * 100;
        const start = cumulative;
        const end = cumulative + percent;
        cumulative = end;
        return `${item.color} ${start}% ${end}%`;
    });

    return (
        <div 
            className="w-40 h-40 rounded-full"
            style={{
                background: `conic-gradient(${gradients.join(', ')})`,
                mask: 'radial-gradient(transparent 55%, black 56%)',
                WebkitMask: 'radial-gradient(transparent 55%, black 56%)'
            }}
        />
    );
};

const AchievementCard: React.FC<{ Icon: React.FC<{className?: string}>, title: string, subtitle: string, unlocked: boolean }> = ({ Icon, title, subtitle, unlocked }) => (
    <div className={`p-4 rounded-xl text-center flex flex-col items-center justify-center transition-all duration-300 ${unlocked ? 'bg-white shadow-md' : 'bg-gray-100'}`}>
        <div className={`w-12 h-12 rounded-full flex items-center justify-center mb-2 ${unlocked ? 'bg-green-100' : 'bg-gray-200'}`}>
            <Icon className={`w-6 h-6 ${unlocked ? 'text-green-600' : 'text-gray-400'}`} />
        </div>
        <p className={`font-bold text-sm ${unlocked ? 'text-gray-800' : 'text-gray-500'}`}>{title}</p>
        <p className={`text-xs ${unlocked ? 'text-gray-500' : 'text-gray-400'}`}>{subtitle}</p>
    </div>
);

const Profile: React.FC<ProfileProps> = ({ history }) => {
    const stats = useMemo(() => {
        const totalScans = history.length;
        const totalPoints = history.reduce((sum, item) => sum + (item.points || 0), 0);
        const totalScore = history.reduce((sum, item) => sum + item.result.recyclabilityScore, 0);
        const avgConfidence = totalScans > 0 ? Math.round(totalScore / totalScans) : 0;
        
        const categoryCounts = history.reduce((acc, item) => {
            acc[item.result.category] = (acc[item.result.category] || 0) + 1;
            return acc;
        }, {} as Record<string, number>);

        return { totalScans, totalPoints, avgConfidence, categoryCounts };
    }, [history]);

    const chartData = [
        { label: 'Recyclable', value: stats.categoryCounts['Recyclable'] || 0, color: '#34d399' },
        { label: 'Organic', value: stats.categoryCounts['Organic'] || 0, color: '#f59e0b' },
        { label: 'Hazardous', value: stats.categoryCounts['Hazardous'] || 0, color: '#ef4444' },
    ];
    
    const achievements = {
        firstScan: stats.totalScans >= 1,
        ecoWarrior: stats.totalScans >= 10,
        planetSaver: stats.totalPoints >= 1000,
        perfectScore: history.some(item => item.result.recyclabilityScore === 100),
    };

    return (
        <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
                <StatCard value={stats.totalScans} label="Items Scanned" />
                <StatCard value={stats.totalPoints} label="Eco Points" />
            </div>

            <div className="bg-white rounded-xl shadow-lg p-4">
                <h3 className="font-bold text-gray-700">Average Confidence</h3>
                <div className="flex items-center space-x-4 mt-2">
                    <div className="w-full bg-gray-200 rounded-full h-2.5">
                        <div className="bg-green-500 h-2.5 rounded-full" style={{ width: `${stats.avgConfidence}%` }}></div>
                    </div>
                    <span className="font-bold text-green-600 text-lg">{stats.avgConfidence}%</span>
                </div>
            </div>
            
            <div className="bg-white rounded-xl shadow-lg p-4">
                 <h3 className="font-bold text-gray-700 mb-2">Category Distribution</h3>
                 <div className="flex items-center justify-around space-x-4">
                     <DonutChart data={chartData} />
                     <div className="space-y-2">
                         {chartData.map(item => (
                             <div key={item.label} className="flex items-center space-x-2">
                                 <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }}></div>
                                 <span className="text-sm text-gray-600">{item.label} ({item.value})</span>
                             </div>
                         ))}
                     </div>
                 </div>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-4">
                 <h3 className="font-bold text-gray-700 mb-2">Achievements</h3>
                 <div className="grid grid-cols-2 gap-3">
                     <AchievementCard Icon={TargetIcon} title="First Scan" subtitle="Completed your first scan" unlocked={achievements.firstScan} />
                     <AchievementCard Icon={SparkleIcon} title="Eco Warrior" subtitle="Scanned 10 items" unlocked={achievements.ecoWarrior} />
                     <AchievementCard Icon={GlobeIcon} title="Planet Saver" subtitle="Reached 1000 eco points" unlocked={achievements.planetSaver} />
                     <AchievementCard Icon={HundredIcon} title="Perfect Score" subtitle="Got 100% confidence" unlocked={achievements.perfectScore} />
                 </div>
            </div>

            <div className="bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-xl shadow-lg p-6">
                 <h3 className="font-bold text-xl mb-2">Your Environmental Impact</h3>
                 <p className="text-sm opacity-90 mb-4">Keep going! Every scan helps make the planet cleaner and greener.</p>
                 <div className="flex items-center justify-around">
                     <div className="text-center">
                         <TreeIcon className="w-8 h-8 mx-auto mb-1" />
                         <p className="font-bold">2 trees saved</p>
                     </div>
                      <div className="text-center">
                         <WaterDropIcon className="w-8 h-8 mx-auto mb-1" />
                         <p className="font-bold">36 liters conserved</p>
                     </div>
                 </div>
            </div>
        </div>
    );
};

export default Profile;