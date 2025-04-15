import React, { useState, useEffect } from 'react';
import { ChatHeader } from './chat-header';
import { MessageArea } from './message-area';
import { InputArea } from './input-area';
import { sendMessage, getMessages } from '@/lib/openai';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { type Message } from '@shared/schema';

export function ChatInterface() {
  const [error, setError] = useState<string | null>(null);
  const [apiKeyError, setApiKeyError] = useState<string | null>(null);
  
  const queryClient = useQueryClient();

  // Fetch messages
  const { data: messages = [], isLoading, isError } = useQuery({
    queryKey: ['/api/messages'],
    queryFn: getMessages,
  });

  // Send message mutation
  const { mutate, isPending } = useMutation({
    mutationFn: sendMessage,
    onSuccess: (data) => {
      if (data.error) {
        setError(data.error);
      }
      // Invalidate and refetch messages
      queryClient.invalidateQueries({ queryKey: ['/api/messages'] });
    },
    onError: (err: Error) => {
      console.error('Failed to send message:', err);
      
      // Check if it's an API key error
      if (err.message.includes('API key') || err.message.includes('authentication')) {
        setApiKeyError('Invalid API configuration. Please check your API key and try again.');
      } else {
        setError('Failed to send message. Please try again.');
      }
    },
  });

  const handleSendMessage = (content: string) => {
    mutate(content);
  };

  const clearError = () => {
    setError(null);
  };

  return (
    <div className="flex flex-col h-screen max-w-3xl mx-auto bg-white shadow-xl">
      <ChatHeader />
      <MessageArea 
        messages={messages} 
        isLoading={isPending} 
        error={error}
        clearError={clearError}
      />
      <InputArea 
        onSendMessage={handleSendMessage} 
        isPending={isPending}
        apiKeyError={apiKeyError}
      />
    </div>
  );
}

export default ChatInterface;
