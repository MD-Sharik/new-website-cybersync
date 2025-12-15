import { GoogleGenAI } from "@google/genai";

const apiKey = process.env.API_KEY || '';

// Default instance for basic tasks (Chat)
const ai = new GoogleGenAI({ apiKey });

export const generateSecurityAdvice = async (userQuery: string): Promise<string> => {
  // Re-instantiate to ensure we capture any dynamically set env vars if the environment allows, 
  // though typically process.env is static. For "Key Selection" flows, we often need a fresh read if the framework hot-swaps it.
  // However, for the chat, we'll stick to the global or simple instance unless strictly needed.
  if (!process.env.API_KEY) {
    return "Demo Mode: API Key not configured. (In a real deployment, I would analyze your request using Gemini AI).";
  }

  try {
    const chatAi = new GoogleGenAI({ apiKey: process.env.API_KEY });
    const response = await chatAi.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: userQuery,
      config: {
        systemInstruction: `You are the Cyber Sync Genius, an advanced AI product expert for Cyber Sync. 
        Your role is to assist users with questions about our software portfolio: Maplesoft (Maple, MapleSim), IBM SPSS, Stata, SmartPLS, and our Enterprise Solutions.
        
        Your tone is professional, knowledgeable, and helpful.
        
        Key Knowledge Areas:
        - Maple: Math software for engineering and education.
        - MapleSim: System-level modeling and digital twins.
        - SPSS/Stata: Statistical analysis and data science.
        - Enterprise Services: Custom ERP, CRM, and AI development.
        
        Keep responses concise (under 100 words) and encourage users to "Request a Quote" or "Contact Sales" for pricing.`,
      }
    });

    return response.text || "I am analyzing your query. Please stand by.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "Connection to knowledge base interrupted. Please try again later.";
  }
};

export const generateImage = async (prompt: string, size: '1K' | '2K' | '4K'): Promise<string | null> => {
  // Create a fresh instance to ensure we use the user-selected key if applicable
  const currentKey = process.env.API_KEY;
  
  if (!currentKey) {
    throw new Error("API Key not found. Please select an API Key.");
  }

  const imageAi = new GoogleGenAI({ apiKey: currentKey });

  try {
    const response = await imageAi.models.generateContent({
      model: 'gemini-3-pro-image-preview',
      contents: {
        parts: [{ text: prompt }]
      },
      config: {
        imageConfig: {
          aspectRatio: "1:1", // Standard square aspect ratio
          imageSize: size
        }
      }
    });

    for (const part of response.candidates?.[0]?.content?.parts || []) {
      if (part.inlineData) {
        return `data:${part.inlineData.mimeType};base64,${part.inlineData.data}`;
      }
    }
    return null;

  } catch (error) {
    console.error("Image Gen Error:", error);
    throw error;
  }
};

export const editImage = async (imageBase64: string, prompt: string): Promise<string | null> => {
  // Extract base64 data and mime type from data URL
  const match = imageBase64.match(/^data:(image\/[a-z]+);base64,(.+)$/);
  if (!match) {
    throw new Error("Invalid image format. Please ensure it is a valid image file.");
  }
  const mimeType = match[1];
  const data = match[2];

  const currentKey = process.env.API_KEY;
  if (!currentKey) {
    throw new Error("API Key not found. Please select an API Key.");
  }

  const ai = new GoogleGenAI({ apiKey: currentKey });

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash-image',
      contents: {
        parts: [
          {
            inlineData: {
              data: data,
              mimeType: mimeType,
            },
          },
          {
            text: prompt,
          },
        ],
      },
    });

    for (const part of response.candidates?.[0]?.content?.parts || []) {
      if (part.inlineData) {
        return `data:${part.inlineData.mimeType};base64,${part.inlineData.data}`;
      }
    }
    return null;
  } catch (error) {
    console.error("Image Edit Error:", error);
    throw error;
  }
};