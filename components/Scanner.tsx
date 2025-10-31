import React, { useState } from 'react';
import { AnalysisResult, HistoryItem } from '../types';
import { analyzeImage } from '../services/geminiService';
import ImageUploader from './ImageUploader';
import ResultDisplay from './ResultDisplay';
import TipsCarousel from './TipsCarousel';

interface ScannerProps {
    onAddToHistory: (item: Omit<HistoryItem, 'id' | 'timestamp'>) => void;
}

const Scanner: React.FC<ScannerProps> = ({ onAddToHistory }) => {
    const [image, setImage] = useState<{data: string, uri: string} | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [result, setResult] = useState<AnalysisResult | null>(null);
    const [error, setError] = useState<string | null>(null);

    const handleImageUpload = async (base64Data: string, mimeType: string) => {
        const fullDataUri = `data:${mimeType};base64,${base64Data}`;
        setImage({ data: base64Data, uri: fullDataUri });
        setIsLoading(true);
        setResult(null);
        setError(null);
        try {
            const analysisResult = await analyzeImage(base64Data, mimeType);
            setResult(analysisResult);
            onAddToHistory({
                image: fullDataUri,
                result: analysisResult,
                points: 10,
            });
        } catch (e: any) {
            console.error(e);
            setError(e.message || 'Failed to analyze image. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };

    const handleScanAgain = () => {
        setResult(null);
        setImage(null);
        setError(null);
    };

    return (
        <div className="relative">
            {error && (
                <div className="p-4 mb-4 text-sm text-red-800 bg-red-100 rounded-lg" role="alert">
                    <span className="font-medium">Error!</span> {error}
                </div>
            )}
            
            {!result && (
                <div className="space-y-4">
                    <ImageUploader 
                        onImageUpload={handleImageUpload} 
                        isLoading={isLoading} 
                        imagePreviewUrl={image?.uri} 
                    />
                    <TipsCarousel />
                </div>
            )}

            {result && image && <ResultDisplay result={result} onScanAgain={handleScanAgain} imageUri={image.uri} />}
        </div>
    );
};

export default Scanner;