import React, { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Send, Info, Smile } from 'lucide-react';
import { AlertCircle } from 'lucide-react';

interface InputAreaProps {
  onSendMessage: (message: string) => void;
  isPending: boolean;
  apiKeyError: string | null;
}

export function InputArea({ onSendMessage, isPending, apiKeyError }: InputAreaProps) {
  const [message, setMessage] = useState('');
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Auto-resize textarea based on content
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  }, [message]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim() === '' || isPending) return;
    
    onSendMessage(message);
    setMessage('');
    
    // Reset textarea height
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
    }
  };

  return (
    <div className="border-t border-gray-200 p-4 bg-white">
      {apiKeyError && (
        <div className="mb-4 p-3 bg-red-100 border-l-4 border-red-500 text-red-700">
          <div className="flex">
            <AlertCircle className="h-5 w-5 mr-2" />
            <span>{apiKeyError}</span>
          </div>
        </div>
      )}
      
      <form onSubmit={handleSubmit} className="flex items-end space-x-2">
        <div className="flex-1 relative">
          <textarea
            ref={textareaRef}
            className="w-full border border-gray-300 rounded-lg pl-4 pr-10 py-3 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent resize-none"
            placeholder="Type your message..."
            rows={1}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                handleSubmit(e);
              }
            }}
          />
          <button
            type="button"
            className="absolute right-3 bottom-3 text-gray-400 hover:text-gray-600"
            onClick={() => setMessage(message + '😊')}
          >
            <Smile className="h-5 w-5" />
          </button>
        </div>
        <Button
          type="submit"
          className="bg-primary hover:bg-indigo-700 text-white rounded-lg p-3 transition duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
          disabled={message.trim() === '' || isPending}
        >
          <Send className="h-5 w-5" />
        </Button>
      </form>
      
      <div className="flex justify-center mt-2">
        <button className="text-xs text-gray-500 hover:text-primary flex items-center">
          <Info className="h-4 w-4 mr-1" />
          Using GMGM OpenAI API
        </button>
      </div>
    </div>
  );
}

export default InputArea;
