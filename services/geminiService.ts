
import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });

export const getAIHelp = async (prompt: string) => {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: prompt,
      config: {
        systemInstruction: "You are a helpful AI assistant for Online Vala, a digital service hub in Yevla, Nashik. Help users understand document requirements for services like PAN, Aadhaar, and Voting cards. Be polite, concise, and professional."
      }
    });
    return response.text;
  } catch (error) {
    console.error("Gemini API error:", error);
    return "I'm having trouble connecting to my brain right now. Please try again or call us directly!";
  }
};
