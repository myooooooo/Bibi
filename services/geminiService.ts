import { GoogleGenAI, Chat, GenerateContentResponse } from "@google/genai";
import { SYSTEM_INSTRUCTION } from '../constants';

let chatSession: Chat | null = null;

const getAiClient = () => {
  const apiKey = process.env.API_KEY;
  if (!apiKey) {
    console.warn("API_KEY not found in environment variables");
    return null;
  }
  return new GoogleGenAI({ apiKey });
};

export const initializeChat = async () => {
  const ai = getAiClient();
  if (!ai) return null;

  chatSession = ai.chats.create({
    model: 'gemini-2.5-flash',
    config: {
      systemInstruction: SYSTEM_INSTRUCTION,
    },
  });
  return chatSession;
};

export const sendMessageToGemini = async (message: string): Promise<string> => {
  if (!chatSession) {
    await initializeChat();
  }
  
  if (!chatSession) {
      return "Désolé, je ne peux pas me connecter au service d'IA pour le moment. Veuillez vérifier votre clé API.";
  }

  try {
    const result: GenerateContentResponse = await chatSession.sendMessage({
      message
    });
    return result.text || "Désolé, je n'ai pas compris.";
  } catch (error) {
    console.error("Gemini Error:", error);
    return "Une erreur est survenue lors de la communication avec l'assistant.";
  }
};
