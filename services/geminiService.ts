import { GoogleGenAI, Content } from "@google/genai";
import { Message, Role } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const generateEcaResponse = async (history: Message[], userMessage: string, systemInstruction: string): Promise<string> => {
  try {
    const contents: Content[] = history
      .filter(msg => msg.role !== Role.SYSTEM && !msg.isError)
      .map(msg => ({
        role: msg.role === Role.USER ? 'user' : 'model',
        parts: [{ text: msg.text }]
      }));

    contents.push({
      role: 'user',
      parts: [{ text: userMessage }]
    });

    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: contents,
      config: {
        systemInstruction: systemInstruction,
        temperature: 0.6, // Slightly lower for more precise legal advice
        maxOutputTokens: 4000, // Increased to prevent cut-offs for detailed legal explanations
      }
    });

    const text = response.text;
    if (!text) {
      throw new Error("응답을 생성하지 못했습니다.");
    }
    
    return text;

  } catch (error: any) {
    console.error("Gemini API Error:", error);
    return "죄송합니다. 시스템 통신 중 일시적인 오류가 발생했습니다. 잠시 후 다시 시도해 주십시오.";
  }
};