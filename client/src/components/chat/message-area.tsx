import React, { useEffect, useRef } from 'react';
import { type Message } from '@shared/schema';
import { MessageItem } from './message-item';
import { TypingIndicator } from '@/components/ui/typing-indicator';
import { AlertCircle } from 'lucide-react';

interface MessageAreaProps {
  messages: Message[];
  isLoading: boolean;
  error: string | null;
  clearError: () => void;
}

export function MessageArea({ messages, isLoading, error, clearError }: MessageAreaProps) {
  const messageEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Scroll to bottom when messages change or loading state changes
    messageEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading]);

  return (
    <div className="flex-1 p-4 overflow-y-auto scrollbar-hide" style={{ scrollbarWidth: 'none' }}>
      {messages.map((message) => (
        <MessageItem 
          key={message.id} 
          content={message.content} 
          role={message.role as 'user' | 'assistant'} 
          timestamp={message.timestamp} 
        />
      ))}

      {isLoading && (
        <div className="flex items-start mb-4">
          <div className="w-10 h-10 rounded-full bg-primary flex-shrink-0 flex items-center justify-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
            </svg>
          </div>
          <div className="ml-3 bg-gray-100 py-3 px-4 rounded-lg rounded-tl-none">
            <TypingIndicator />
          </div>
        </div>
      )}

      {error && (
        <div className="mb-4 p-3 bg-red-100 border-l-4 border-red-500 text-red-700">
          <div className="flex items-center">
            <AlertCircle className="h-5 w-5 mr-2" />
            <span>{error}</span>
          </div>
          <button 
            className="text-sm text-red-700 underline mt-1"
            onClick={clearError}
          >
            Dismiss
          </button>
        </div>
      )}
      
      {/* This element is used to scroll to the bottom of the messages */}
      <div ref={messageEndRef} />
    </div>
  );
}

export default MessageArea;
