import { AnalysisResult } from '../types';

/**
 * Analyzes an image using Google Gemini AI via Vercel serverless function.
 * This keeps the API key secure on the server side.
 */
export const analyzeImage = async (base64ImageData: string, mimeType: string): Promise<AnalysisResult> => {
    try {
        // Call our Vercel serverless function
        const apiUrl = '/api/analyze-image';
        
        const response = await fetch(apiUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                base64ImageData,
                mimeType,
            }),
        });

        if (!response.ok) {
            const errorData = await response.json().catch(() => ({ error: 'Unknown error' }));
            throw new Error(errorData.error || `API error: ${response.status}`);
        }

        const result: AnalysisResult = await response.json();
        return result;

    } catch (error: any) {
        console.error("Error analyzing image:", error);
        throw new Error(error.message || "Failed to analyze image. Please check your connection and API key configuration.");
    }
};