import React, { useState, useEffect } from 'react';

// Define a type for location coordinates
interface Coordinates {
    lat: number;
    lng: number;
}

// Define a type for a recycling center
interface RecyclingCenter {
    id: number;
    name: string;
    address: string;
    coordinates: Coordinates;
    distance?: number; // Optional distance from user, in kilometers
}

/**
 * Calculates the Haversine distance between two points on the Earth.
 * @param coords1 - The first coordinates {lat, lng}.
 * @param coords2 - The second coordinates {lat, lng}.
 * @returns The distance in kilometers.
 */
const getDistance = (coords1: Coordinates, coords2: Coordinates): number => {
    const R = 6371; // Radius of the Earth in km
    const dLat = (coords2.lat - coords1.lat) * (Math.PI / 180);
    const dLng = (coords2.lng - coords1.lng) * (Math.PI / 180);
    const a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(coords1.lat * (Math.PI / 180)) * Math.cos(coords2.lat * (Math.PI / 180)) *
        Math.sin(dLng / 2) * Math.sin(dLng / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c; // Distance in km
};

// Placeholder data for recycling centers
const recyclingCentersData: RecyclingCenter[] = [
    { id: 1, name: 'Eco-Friendly Recyclers', address: '123 Green Way, Chennai', coordinates: { lat: 13.0827, lng: 80.2707 } },
    { id: 2, name: 'SIDCO Industrial Estate', address: '26, Thirumazhisai, Chennai, Tamil Nadu 600124', coordinates: { lat: 13.05, lng: 80.05 } },
    { id: 3, name: 'Chennai Waste Management', address: '456 Recycle Ave, Chennai', coordinates: { lat: 13.01, lng: 80.23 } },
    { id: 4, name: 'Planet Savers Inc.', address: '789 Earth St, Chennai', coordinates: { lat: 13.1, lng: 80.15 } },
];

const Map: React.FC = () => {
    const [userLocation, setUserLocation] = useState<Coordinates | null>(null);
    const [sortedCenters, setSortedCenters] = useState<RecyclingCenter[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (!navigator.geolocation) {
            setError("Geolocation is not supported by your browser.");
            setLoading(false);
            return;
        }

        navigator.geolocation.getCurrentPosition(
            (position) => {
                const { latitude, longitude } = position.coords;
                const location = { lat: latitude, lng: longitude };
                setUserLocation(location);

                // Calculate distances and sort centers
                const centersWithDistance = recyclingCentersData.map(center => ({
                    ...center,
                    distance: getDistance(location, center.coordinates)
                }));
                
                centersWithDistance.sort((a, b) => (a.distance ?? 0) - (b.distance ?? 0));
                setSortedCenters(centersWithDistance);
                setLoading(false);
            },
            (err) => {
                setError(`Unable to retrieve your location: ${err.message}. Please enable location services.`);
                setLoading(false);
            }
        );
    }, []); // Empty dependency array means this runs once on mount

    if (loading) {
        return (
            <div className="text-center p-8 bg-white rounded-lg shadow-md">
                <p className="text-gray-600">Fetching your location...</p>
                 <div className="w-8 h-8 border-2 border-t-transparent border-green-500 rounded-full animate-spin mx-auto mt-4"></div>
            </div>
        );
    }
    
    if (error) {
        return (
             <div className="p-4 text-sm text-red-800 bg-red-100 rounded-lg shadow-md" role="alert">
                <span className="font-medium">Location Error!</span> {error}
            </div>
        );
    }

    return (
        <div className="space-y-4">
            {userLocation && (
                <div className="bg-white rounded-lg shadow-md p-4 text-center">
                    <h2 className="font-bold text-gray-800">Your Current Location</h2>
                    <p className="text-sm text-gray-600">
                        Latitude: <span className="font-mono text-green-600">{userLocation.lat.toFixed(4)}</span>
                    </p>
                    <p className="text-sm text-gray-600">
                        Longitude: <span className="font-mono text-green-600">{userLocation.lng.toFixed(4)}</span>
                    </p>
                </div>
            )}

            <h3 className="text-lg font-bold text-gray-700">Nearby Recycling Centers</h3>

            {sortedCenters.length > 0 ? (
                <div className="space-y-3">
                    {sortedCenters.map((center, index) => (
                        <div key={center.id} 
                             className={`bg-white rounded-lg shadow-md p-4 border-l-4 ${index === 0 ? 'border-green-500' : 'border-transparent'}`}>
                            <div className="flex justify-between items-center">
                                <div>
                                    <h4 className="font-bold text-gray-800">{center.name}</h4>
                                    <p className="text-xs text-gray-500">{center.address}</p>
                                </div>
                                <div className="text-right">
                                    <p className="font-bold text-green-600">{center.distance?.toFixed(2)} km</p>
                                    <p className="text-xs text-gray-500">away</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                 <div className="text-center p-8 text-gray-500 bg-white rounded-lg shadow-md">
                    <p>Could not find any recycling centers.</p>
                </div>
            )}
        </div>
    );
};

export default Map;
