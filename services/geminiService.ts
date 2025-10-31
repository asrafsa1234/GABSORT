import { GoogleGenAI, Type, GenerateContentResponse } from '@google/genai';
import { AnalysisResult } from '../types';

// According to the guidelines, the API key must be from process.env.API_KEY.
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

const responseSchema = {
    type: Type.OBJECT,
    properties: {
        itemName: { 
            type: Type.STRING,
            description: "The name of the item identified in the image."
        },
        recyclable: { 
            type: Type.STRING, 
            enum: ['Yes', 'No', 'Uncertain'],
            description: "Whether the item is recyclable."
        },
        recyclabilityScore: { 
            type: Type.NUMBER, 
            description: 'A score from 0 to 100 indicating how recyclable the item is. Higher is better.' 
        },
        instructions: { 
            type: Type.STRING, 
            description: 'Detailed recycling instructions if applicable, or proper disposal instructions if not.' 
        },
        alternatives: { 
            type: Type.ARRAY, 
            items: { type: Type.STRING }, 
            description: 'A list of eco-friendly alternatives to the item.' 
        },
        ecoFriendlyTip: { 
            type: Type.STRING, 
            description: 'A relevant eco-friendly tip related to the item or its category.' 
        },
    },
    required: ['itemName', 'recyclable', 'recyclabilityScore', 'instructions', 'alternatives', 'ecoFriendlyTip']
};

export const analyzeImage = async (base64ImageData: string, mimeType: string): Promise<AnalysisResult> => {
    try {
        const imagePart = {
            inlineData: {
                data: base64ImageData,
                mimeType: mimeType,
            },
        };

        const textPart = {
            text: `Analyze the object in this image. Identify the item, determine if it's recyclable, and provide instructions for disposal.
            Suggest eco-friendly alternatives and offer a relevant eco-tip. 
            Respond in JSON format according to the provided schema.`,
        };

        const response: GenerateContentResponse = await ai.models.generateContent({
            // Fix: Use a model that supports image and text inputs.
            model: 'gemini-2.5-flash',
            contents: { parts: [imagePart, textPart] },
            config: {
                responseMimeType: 'application/json',
                responseSchema: responseSchema,
                temperature: 0.2, // Lower temperature for more deterministic, factual responses
            },
        });
        
        // Fix: Correctly extract text from response.
        const resultText = response.text.trim();
        const resultJson = JSON.parse(resultText);
        
        return resultJson as AnalysisResult;

    } catch (error) {
        console.error("Error analyzing image with Gemini API:", error);
        throw new Error("Failed to get analysis from Gemini API. Please check your connection or API key.");
    }
};
