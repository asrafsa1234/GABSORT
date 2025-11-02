import type { VercelRequest, VercelResponse } from '@vercel/node';
import { GoogleGenAI, Type } from '@google/genai';

export default async function handler(
  request: VercelRequest,
  response: VercelResponse,
) {
  // Only allow POST requests
  if (request.method !== 'POST') {
    return response.status(405).json({ error: 'Method not allowed' });
  }

  try {
    // Get API key from environment variables
    const apiKey = process.env.GEMINI_API_KEY;
    
    if (!apiKey) {
      return response.status(500).json({ 
        error: 'GEMINI_API_KEY is not configured. Please add it in Vercel environment variables.' 
      });
    }

    const { base64ImageData, mimeType } = request.body;

    if (!base64ImageData || !mimeType) {
      return response.status(400).json({ 
        error: 'Missing required fields: base64ImageData and mimeType' 
      });
    }

    // Initialize Google AI
    const ai = new GoogleGenAI({ apiKey });

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
        category: {
          type: Type.STRING,
          enum: ['Recyclable', 'Organic', 'Hazardous', 'General Waste'],
          description: "Classify the item into one of the categories: Recyclable, Organic, Hazardous, or General Waste."
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
      required: ['itemName', 'recyclable', 'category', 'recyclabilityScore', 'instructions', 'alternatives', 'ecoFriendlyTip']
    };

    const imagePart = {
      inlineData: {
        data: base64ImageData,
        mimeType: mimeType,
      },
    };

    const textPart = {
      text: `Analyze the object in this image. Identify the item, determine if it's recyclable, and classify its category (Recyclable, Organic, Hazardous, or General Waste). 
        Provide a recyclability score. Give instructions for disposal, suggest eco-friendly alternatives, and offer a relevant eco-tip. 
        Respond in JSON format according to the provided schema.`,
    };

    // Call Google AI
    const aiResponse = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: { parts: [imagePart, textPart] },
      config: {
        responseMimeType: 'application/json',
        responseSchema: responseSchema,
        temperature: 0.2,
      },
    });

    const resultText = aiResponse.text.trim();
    const resultJson = JSON.parse(resultText);

    // Return the result
    return response.status(200).json(resultJson);

  } catch (error: any) {
    console.error('Error in analyze-image API:', error);
    return response.status(500).json({ 
      error: 'Failed to analyze image',
      message: error.message || 'Unknown error occurred'
    });
  }
}

