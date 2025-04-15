import { apiRequest } from './queryClient';
import { type Message } from '@shared/schema';

export interface UserMessage {
  content: string;
  role: 'user';
}

export interface AssistantMessage {
  content: string;
  role: 'assistant';
}

export interface MessageResponse {
  userMessage: Message;
  assistantMessage?: Message;
  error?: string;
}

export const sendMessage = async (content: string): Promise<MessageResponse> => {
  const response = await apiRequest('POST', '/api/messages', { content });
  return response.json();
};

export const getMessages = async (): Promise<Message[]> => {
  const response = await fetch('/api/messages', {
    credentials: 'include',
  });
  
  if (!response.ok) {
    throw new Error('Failed to fetch messages');
  }
  
  return response.json();
};
