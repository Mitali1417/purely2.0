import { assistantAPI } from '@/api/assistant.api';
import { useState, useCallback } from 'react';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
  concernType?: 'skin' | 'hair' | 'body';
  severity?: 'mild' | 'moderate' | 'severe';
  tips?: string[];
  recommendedProducts?: any[];
}

interface ChatState {
  messages: Message[];
  isLoading: boolean;
  recommendedProducts: any[];
  concernType: 'skin' | 'hair' | 'body';
  severity: 'mild' | 'moderate' | 'severe';
}

export const useAssistantChat = () => {
  const [state, setState] = useState<ChatState>({
    messages: [
      {
        id: '1',
        role: 'assistant',
        content: "Hi! I’m Mira, here to guide you through your skin, hair, and body care journey. Ask me anything — I’ve got your back!",
        timestamp: new Date(),
        concernType: 'skin',
        severity: 'mild'
      }
    ],
    isLoading: false,
    recommendedProducts: [],
    concernType: 'skin',
    severity: 'mild'
  });

  const generateId = () => Math.random().toString(36).substr(2, 9);

  // Helper functions for concern analysis
  const determineConcernType = (message: string, tags: string[] = []): 'skin' | 'hair' | 'body' => {
    const messageLower = message.toLowerCase();
    const allText = [...tags, messageLower].join(' ').toLowerCase();
    
    const hairKeywords = ['hair', 'scalp', 'dandruff', 'bald', 'thinning', 'frizz', 'split ends', 'hair loss', 'shampoo', 'conditioner'];
    const bodyKeywords = ['body', 'back', 'chest', 'arms', 'legs', 'stretch marks', 'body acne', 'exfoliate', 'body lotion'];
    const skinKeywords = ['skin', 'face', 'acne', 'pimple', 'blackhead', 'whitehead', 'dry', 'oily', 'sensitive', 'wrinkle', 'dark spot', 'pigmentation', 'moisturizer', 'cleanser', 'serum'];
    
    const hairScore = hairKeywords.filter(keyword => allText.includes(keyword)).length;
    const bodyScore = bodyKeywords.filter(keyword => allText.includes(keyword)).length;
    const skinScore = skinKeywords.filter(keyword => allText.includes(keyword)).length;
    
    if (hairScore > bodyScore && hairScore > skinScore) return 'hair';
    if (bodyScore > skinScore) return 'body';
    return 'skin'; // default to skin
  };

  const determineSeverity = (message: string): 'mild' | 'moderate' | 'severe' => {
    const messageLower = message.toLowerCase();
    
    const severeKeywords = ['severe', 'severe', 'chronic', 'persistent', 'worsening', 'painful', 'bleeding', 'infected', 'urgent', 'emergency'];
    const moderateKeywords = ['moderate', 'some', 'occasional', 'sometimes', 'bothersome', 'noticeable'];
    
    const severeScore = severeKeywords.filter(keyword => messageLower.includes(keyword)).length;
    const moderateScore = moderateKeywords.filter(keyword => messageLower.includes(keyword)).length;
    
    if (severeScore > 0) return 'severe';
    if (moderateScore > 0) return 'moderate';
    return 'mild';
  };

  const generateTips = (message: string, concernType: 'skin' | 'hair' | 'body'): string[] => {
    const tips: string[] = [];
    
    switch (concernType) {
      case 'skin':
        tips.push('Use a gentle cleanser twice daily');
        tips.push('Apply moisturizer while skin is still damp');
        tips.push('Always use sunscreen during the day');
        break;
      case 'hair':
        tips.push('Use sulfate-free shampoo for gentle cleansing');
        tips.push('Apply conditioner from mid-length to ends');
        tips.push('Limit heat styling and use heat protectant');
        break;
      case 'body':
        tips.push('Exfoliate 2-3 times per week');
        tips.push('Moisturize immediately after showering');
        tips.push('Use gentle, fragrance-free products');
        break;
    }
    
    return tips;
  };

  const addMessage = useCallback((message: Omit<Message, 'id' | 'timestamp'>) => {
    const newMessage: Message = {
      ...message,
      id: generateId(),
      timestamp: new Date()
    };
    
    setState(prev => ({
      ...prev,
      messages: [...prev.messages, newMessage]
    }));
  }, []);

  const sendMessage = useCallback(async (userMessage: string) => {
    addMessage({ role: 'user', content: userMessage });
    setState(prev => ({ ...prev, isLoading: true }));

    try {
      const res = await assistantAPI.suggest({
        messages: [
          ...state.messages.map(m => ({ role: m.role, content: m.content })),
          { role: 'user', content: userMessage }
        ],
        filters: { category: '', search: userMessage }
      });

      const reply = res?.reply;
      const recommendations = res?.recommendations || [];
      const tags = res?.tags || [];

      const concernType = determineConcernType(userMessage, tags);
      const severity = determineSeverity(userMessage);
      const tips = generateTips(userMessage, concernType);

      addMessage({
        role: 'assistant',
        content: reply || "I understand your concern. Let me help you find the right products.",
        concernType,
        severity,
        tips,
        recommendedProducts: recommendations
      });

      setState(prev => ({
        ...prev,
        recommendedProducts: recommendations,
        concernType,
        severity
      }));

    } catch (error) {
      console.error('Error getting AI response:', error);
      addMessage({
        role: 'assistant',
        content: "I'm sorry, I'm having trouble processing your request right now. Please try again or describe your concern in a different way.",
        concernType: 'skin',
        severity: 'mild',
        tips: ['Try rephrasing your question', 'Be more specific about your concern', 'Check your internet connection']
      });
    } finally {
      setState(prev => ({ ...prev, isLoading: false }));
    }
  }, [addMessage, state.messages]);

  const sendQuickQuestion = useCallback(async (question: string) => {
    await sendMessage(question);
  }, [sendMessage]);

  const clearChat = useCallback(() => {
    setState({
      messages: [
        {
          id: '1',
          role: 'assistant',
          content: "Hi! I’m Mira, here to guide you through your skin, hair, and body care journey. Ask me anything — I’ve got your back!",
          timestamp: new Date(),
          concernType: 'skin',
          severity: 'mild'
        }
      ],
      isLoading: false,
      recommendedProducts: [],
      concernType: 'skin',
      severity: 'mild'
    });
  }, []);

  return {
    ...state,
    sendMessage,
    sendQuickQuestion,
    clearChat
  };
};
