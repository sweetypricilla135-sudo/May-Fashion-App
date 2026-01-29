
import { GoogleGenAI } from "@google/genai";

// Standard initialization as per SDK guidelines
const getAI = () => new GoogleGenAI({ apiKey: process.env.API_KEY });

/**
 * Generates futuristic styling advice for a product using Gemini.
 */
export const getStylingAdvice = async (productName: string, description: string) => {
  const ai = getAI();
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `You are a high-end AI fashion stylist for "May Fashion". Give 3 brief, futuristic styling tips for the item: "${productName}". The item is described as: ${description}. Keep it chic, tech-focused, and concise.`,
      config: {
        // When setting maxOutputTokens for Gemini 3, thinkingBudget must be included
        maxOutputTokens: 256,
        thinkingConfig: { thinkingBudget: 128 }
      }
    });
    // Correctly accessing the text property (not a method)
    return response.text || "Our stylists recommend pairing this with holographic accessories.";
  } catch (error) {
    console.error("Gemini Error:", error);
    return "Pair with chrome finishes and sleek silhouettes for a maximum tech-fashion statement.";
  }
};

/**
 * Conducts a chat session with the Help Desk AI assistant.
 */
export const chatWithHelpDesk = async (userMessage: string, history: {role: 'user'|'model', text: string}[]) => {
  const ai = getAI();
  try {
    const chat = ai.chats.create({
      model: 'gemini-3-flash-preview',
      config: {
        systemInstruction: `You are May, the AI assistant for May Fashion. We specialize in tech-infused clothing. You are helpful, sophisticated, and innovative. Help users with sizing, order tracking, and tech-fabric care.`,
      }
    });
    
    // Proper usage of sendMessage with required parameters
    const response = await chat.sendMessage({ message: userMessage });
    // Accessing text as a property
    return response.text || "I'm here to help with your fashion-tech journey.";
  } catch (error) {
    console.error("Gemini Chat Error:", error);
    return "I'm experiencing a minor sync issue. How else can I assist you with your outfit today?";
  }
};
