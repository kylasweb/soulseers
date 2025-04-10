
import { create } from 'zustand';

interface AIResponse {
  text: string;
  confidence: number;
  timestamp: number;
}

interface AIState {
  responses: AIResponse[];
  isProcessing: boolean;
  addResponse: (response: AIResponse) => void;
  setProcessing: (status: boolean) => void;
  clearResponses: () => void;
}

export const useAIStore = create<AIState>((set) => ({
  responses: [],
  isProcessing: false,
  addResponse: (response) => 
    set((state) => ({ 
      responses: [...state.responses, response] 
    })),
  setProcessing: (status) => 
    set({ isProcessing: status }),
  clearResponses: () => 
    set({ responses: [] })
}));

class AIService {
  async generateText(prompt: string): Promise<AIResponse> {
    try {
      const response = await window.puter.ai.chat(prompt);
      const aiResponse: AIResponse = {
        text: response,
        confidence: 1,
        timestamp: Date.now()
      };
      useAIStore.getState().addResponse(aiResponse);
      return aiResponse;
    } catch (error) {
      console.error('Error generating text:', error);
      throw error;
    }
  }

  async imageToText(imageUrl: string): Promise<AIResponse> {
    try {
      const response = await window.puter.ai.img2txt(imageUrl);
      const aiResponse: AIResponse = {
        text: response,
        confidence: 1,
        timestamp: Date.now()
      };
      useAIStore.getState().addResponse(aiResponse);
      return aiResponse;
    } catch (error) {
      console.error('Error converting image to text:', error);
      throw error;
    }
  }

  async textToSpeech(text: string): Promise<string> {
    try {
      const audioUrl = await window.puter.ai.txt2speech(text);
      return audioUrl;
    } catch (error) {
      console.error('Error converting text to speech:', error);
      throw error;
    }
  }

  async generateImage(prompt: string): Promise<string> {
    try {
      const imageUrl = await window.puter.ai.txt2img(prompt);
      return imageUrl;
    } catch (error) {
      console.error('Error generating image:', error);
      throw error;
    }
  }
}

export const aiService = new AIService(); 
