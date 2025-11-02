import { AnalysisResult } from '../types';

// Mock service that simulates the Gemini API without requiring an API key
export const analyzeImage = async (base64ImageData: string, mimeType: string): Promise<AnalysisResult> => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // Mock data - returns a generic recyclable item analysis
    const mockResult: AnalysisResult = {
        itemName: "Generic Recyclable Item",
        recyclable: "Yes",
        recyclabilityScore: 85,
        instructions: "This item can be recycled. Please clean it before placing in the recycling bin. Remove any labels or caps if applicable.",
        alternatives: [
            "Use reusable containers instead",
            "Choose products with minimal packaging",
            "Look for items made from recycled materials"
        ],
        ecoFriendlyTip: "Remember to rinse containers before recycling to prevent contamination. This helps ensure more items can be successfully recycled!"
    };
    
    return mockResult;
};
